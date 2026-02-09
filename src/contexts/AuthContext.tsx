import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService, type BookmarkUser } from '../services/bookmarkService';
import { toast } from 'sonner';

interface AuthContextType {
  user: BookmarkUser | null;
  workspaceId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BookmarkUser | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [extensionAvailable, setExtensionAvailable] = useState(false);

  const syncWithBackend = async (fbUser: User) => {
    // Prevent concurrent auth attempts
    if (isAuthenticating) return;
    setIsAuthenticating(true);

    try {
      // Get Firebase token for initial login/register API call
      const firebaseToken = await fbUser.getIdToken();
      localStorage.setItem('bookmark_auth_token', firebaseToken);

      // Try login first (existing user)
      try {
        const response = await authService.login(fbUser.uid);
        // Replace Firebase token with our JWT for all subsequent API calls
        if (response.accessToken) {
          localStorage.setItem('bookmark_auth_token', response.accessToken);
        }
        setUser(response.user);
        setWorkspaceId(response.workspaceId);
        syncExtensionStorage(response, response.accessToken || firebaseToken);
        return;
      } catch (loginError: unknown) {
        // If login fails, try to register (new user)
        const error = loginError as { status?: number };
        if (error.status === 404 || error.status === 401) {
          console.log('User not found, registering...');
        } else {
          throw loginError;
        }
      }

      // Register new user
      const response = await authService.register({
        firebaseUid: fbUser.uid,
        email: fbUser.email || '',
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        picture: fbUser.photoURL || undefined,
      });
      // Replace Firebase token with our JWT
      if (response.accessToken) {
        localStorage.setItem('bookmark_auth_token', response.accessToken);
      }
      setUser(response.user);
      setWorkspaceId(response.workspaceId);
      syncExtensionStorage(response, response.accessToken || firebaseToken);
    } catch (error) {
      console.error('Failed to sync with backend:', error);
      setUser(null);
      setWorkspaceId(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const syncExtensionStorage = (response: { user: BookmarkUser; workspaceId: string; refreshToken?: string }, token: string) => {
    // Store refresh token in localStorage as backup
    if (response.refreshToken) {
      localStorage.setItem('bookmark_refresh_token', response.refreshToken);
    }

    // Method 1: Direct chrome.storage access (works in extension popup/options page)
    const chromeApi = (globalThis as { chrome?: { storage?: { local: { set: (data: Record<string, unknown>) => void } } } }).chrome;
    if (chromeApi?.storage) {
      chromeApi.storage.local.set({
        bookmark_manager_auth: { ...response.user, accessToken: token },
        bookmark_workspace_id: response.workspaceId,
        bookmark_refresh_token: response.refreshToken,
      });
      console.log('[Bookmark Manager] Auth synced via chrome.storage');
      return;
    }

    // Method 2: Dispatch custom event for content script bridge (works in web app)
    if (typeof window !== 'undefined') {
      console.log('[Bookmark Manager] Dispatching auth sync event for extension');

      const isExtAvailable = extensionAvailable || (window as any).__BOOKMARK_MANAGER_EXTENSION__;

      if (isExtAvailable) {
        const handleResult = (event: Event) => {
          const customEvent = event as CustomEvent<{ success: boolean; error?: string }>;
          window.removeEventListener('bookmark-manager-auth-sync-result', handleResult);
          if (customEvent.detail.success) {
            toast.success('Extension synced! You can now use the extension.');
          } else {
            toast.error('Failed to sync with extension: ' + (customEvent.detail.error || 'Unknown error'));
          }
        };
        window.addEventListener('bookmark-manager-auth-sync-result', handleResult);

        setTimeout(() => {
          window.removeEventListener('bookmark-manager-auth-sync-result', handleResult);
        }, 5000);
      }

      window.dispatchEvent(new CustomEvent('bookmark-manager-auth-sync', {
        detail: {
          user: response.user,
          workspaceId: response.workspaceId,
          accessToken: token,
          refreshToken: response.refreshToken
        }
      }));

      if (!isExtAvailable) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('source') === 'extension') {
          toast.info('Please reload the extension and this page, then log in again.', { duration: 2000 });
        }
      }
    }
  };

  const refreshUser = async () => {
    if (!auth.currentUser) return;
    await syncWithBackend(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        await syncWithBackend(fbUser);
      } else {
        setUser(null);
        setWorkspaceId(null);
        localStorage.removeItem('bookmark_auth_token');
      }

      setLoading(false);
    });

    // Handle extension events
    const handleExtensionReady = () => setExtensionAvailable(true);
    const handleExtensionLogout = () => {
      console.log('[Bookmark Manager] Received logout event from extension');
      signOut();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('bookmark-manager-extension-ready', handleExtensionReady);
      window.addEventListener('bookmark-manager-extension-logout', handleExtensionLogout);

      if ((window as any).__BOOKMARK_MANAGER_EXTENSION__) {
        setExtensionAvailable(true);
      }
    }

    return () => {
      unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('bookmark-manager-extension-ready', handleExtensionReady);
        window.removeEventListener('bookmark-manager-extension-logout', handleExtensionLogout);
      }
    };
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setWorkspaceId(null);
    localStorage.removeItem('bookmark_auth_token');
    localStorage.removeItem('bookmark_refresh_token');

    // Clear extension storage - Method 1: Direct access
    const chromeApi = (globalThis as { chrome?: { storage?: { local: { remove: (keys: string[]) => void } } } }).chrome;
    if (chromeApi?.storage) {
      chromeApi.storage.local.remove(['bookmark_manager_auth', 'bookmark_workspace_id', 'bookmark_refresh_token']);
      return;
    }

    // Method 2: Dispatch event for content script bridge
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bookmark-manager-auth-clear'));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspaceId,
        loading,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
