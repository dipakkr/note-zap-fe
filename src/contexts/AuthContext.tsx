import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService, type BookmarkUser } from '../services/bookmarkService';
import { toast } from 'sonner';

interface AuthContextType {
  user: BookmarkUser | null;
  firebaseUser: User | null;
  workspaceId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BookmarkUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [extensionAvailable, setExtensionAvailable] = useState(false);

  const syncWithBackend = async (fbUser: User) => {
    // Prevent concurrent auth attempts
    if (isAuthenticating) return;
    setIsAuthenticating(true);

    try {
      // Cache token FIRST before any API calls
      const token = await fbUser.getIdToken();
      localStorage.setItem('bookmark_auth_token', token);

      // Try login first (existing user)
      try {
        const response = await authService.login(fbUser.uid);
        setUser(response.user);
        setWorkspaceId(response.workspaceId);
        syncExtensionStorage(response, token);
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
      setUser(response.user);
      setWorkspaceId(response.workspaceId);
      syncExtensionStorage(response, token);
    } catch (error) {
      console.error('Failed to sync with backend:', error);
      setUser(null);
      setWorkspaceId(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const syncExtensionStorage = (response: { user: BookmarkUser; workspaceId: string }, token: string) => {
    // Method 1: Direct chrome.storage access (works in extension popup/options page)
    const chromeApi = (globalThis as { chrome?: { storage?: { local: { set: (data: Record<string, unknown>) => void } } } }).chrome;
    if (chromeApi?.storage) {
      chromeApi.storage.local.set({
        bookmark_manager_auth: { ...response.user, idToken: token },
        bookmark_workspace_id: response.workspaceId,
      });
      console.log('[Bookmark Manager] Auth synced via chrome.storage');
      return;
    }

    // Method 2: Dispatch custom event for content script bridge (works in web app)
    // The auth-bridge.js content script listens for this event and relays to extension
    if (typeof window !== 'undefined') {
      console.log('[Bookmark Manager] Dispatching auth sync event for extension');

      // Use state if available, otherwise check window
      const isExtAvailable = extensionAvailable || (window as any).__BOOKMARK_MANAGER_EXTENSION__;

      if (isExtAvailable) {
        // Listen for the result
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

        // Set timeout to clean up listener
        setTimeout(() => {
          window.removeEventListener('bookmark-manager-auth-sync-result', handleResult);
        }, 5000);
      }

      window.dispatchEvent(new CustomEvent('bookmark-manager-auth-sync', {
        detail: {
          user: response.user,
          workspaceId: response.workspaceId,
          idToken: token
        }
      }));

      // Show info toast if extension not detected
      if (!isExtAvailable) {
        // Check if user came from extension
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('source') === 'extension') {
          toast.info('Please reload the extension and this page, then log in again.', { duration: 6000 });
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
      setFirebaseUser(fbUser);

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

    // Handle token refresh request from extension
    const handleTokenRefreshRequest = async () => {
      console.log('[Bookmark Manager] Token refresh requested by extension');

      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error('[Bookmark Manager] No user logged in, cannot refresh token');
          window.dispatchEvent(new CustomEvent('bookmark-manager-token-refresh-result', {
            detail: { success: false, error: 'No user logged in' }
          }));
          return;
        }

        // Force refresh the token
        const token = await currentUser.getIdToken(true);

        // Sync to extension via event - use latest user/workspaceId from API
        // We need to fetch the latest data since this is triggered externally
        const response = await authService.getMe();

        // Sync to extension via event
        window.dispatchEvent(new CustomEvent('bookmark-manager-auth-sync', {
          detail: {
            user: response.user,
            workspaceId: response.workspaceId,
            idToken: token
          }
        }));

        // Also store in localStorage
        localStorage.setItem('bookmark_auth_token', token);

        console.log('[Bookmark Manager] Token refreshed successfully');
        window.dispatchEvent(new CustomEvent('bookmark-manager-token-refresh-result', {
          detail: { success: true }
        }));
      } catch (error) {
        console.error('[Bookmark Manager] Failed to refresh token:', error);
        window.dispatchEvent(new CustomEvent('bookmark-manager-token-refresh-result', {
          detail: { success: false, error: String(error) }
        }));
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('bookmark-manager-extension-ready', handleExtensionReady);
      window.addEventListener('bookmark-manager-extension-logout', handleExtensionLogout);
      window.addEventListener('bookmark-manager-token-refresh-request', handleTokenRefreshRequest);

      // Check initial state
      if ((window as any).__BOOKMARK_MANAGER_EXTENSION__) {
        setExtensionAvailable(true);
      }
    }

    return () => {
      unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('bookmark-manager-extension-ready', handleExtensionReady);
        window.removeEventListener('bookmark-manager-extension-logout', handleExtensionLogout);
        window.removeEventListener('bookmark-manager-token-refresh-request', handleTokenRefreshRequest);
      }
    };
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setWorkspaceId(null);
    localStorage.removeItem('bookmark_auth_token');

    // Clear extension storage - Method 1: Direct access
    const chromeApi = (globalThis as { chrome?: { storage?: { local: { remove: (keys: string[]) => void } } } }).chrome;
    if (chromeApi?.storage) {
      chromeApi.storage.local.remove(['bookmark_manager_auth', 'bookmark_workspace_id']);
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
        firebaseUser,
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
