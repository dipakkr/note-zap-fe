import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Star, Search, RefreshCw, Settings, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { bookmarkService, type Bookmark } from '../services/bookmarkService';
import BookmarkCard from '../components/BookmarkCard';
import ProfilesTable from '../components/ProfilesTable';
import AddBookmarkDialog from '../components/AddBookmarkDialog';
import { ConfirmDialog } from '../components/ui/confirm-dialog';

export default function DashboardPage() {
  const { user, workspaceId, signOut } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingBookmarkId, setDeletingBookmarkId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const loadBookmarks = async () => {
    if (!workspaceId) return;

    setLoading(true);
    try {
      const options: { type?: string; folder?: string } = {};

      // Apply type filter
      if (activeFilter === 'tweet') {
        options.type = 'tweet';
      } else if (activeFilter === 'linkedin' || activeFilter === 'profiles') {
        options.type = 'linkedin';
      } else if (activeFilter === 'article') {
        options.type = 'article';
      } else if (activeFilter === 'favorites') {
        options.folder = 'favorites';
      }

      const response = await bookmarkService.getBookmarks(workspaceId, options);
      setBookmarks(response.bookmarks);
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
      toast.error('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, [workspaceId, activeFilter]);

  const handleToggleFavorite = async (id: string) => {
    try {
      await bookmarkService.toggleFavorite(id);

      // Optimistic update
      setBookmarks(prev =>
        prev.map(b => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
      );

      toast.success('Bookmark updated');
    } catch (error) {
      toast.error('Failed to update bookmark');
      // Revert on error
      loadBookmarks();
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingBookmarkId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBookmarkId) return;

    setIsDeleting(true);
    try {
      await bookmarkService.deleteBookmark(deletingBookmarkId);
      setBookmarks(prev => prev.filter(b => b.id !== deletingBookmarkId));
      toast.success('Bookmark deleted');
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete bookmark');
    } finally {
      setIsDeleting(false);
      setDeletingBookmarkId(null);
    }
  };

  // Helper to check if bookmark is a profile
  const isProfile = (b: Bookmark) => {
    return b.tags?.includes('profile') ||
      b.linkedinData?.isProfile === true ||
      b.linkedinProfileData !== undefined;
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      bookmark.title.toLowerCase().includes(query) ||
      bookmark.description?.toLowerCase().includes(query) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(query)) ||
      bookmark.url.toLowerCase().includes(query)
    );
  });

  // Filter for favorites and profiles
  let displayBookmarks = filteredBookmarks;
  if (activeFilter === 'favorites') {
    displayBookmarks = filteredBookmarks.filter(b => b.isFavorite);
  } else if (activeFilter === 'profiles') {
    displayBookmarks = filteredBookmarks.filter(isProfile);
  } else if (activeFilter === 'linkedin') {
    // Exclude profiles from LinkedIn posts view
    displayBookmarks = filteredBookmarks.filter(b => !isProfile(b));
  }

  const filters = [
    { id: 'all', label: 'All Items', icon: null },
    { id: 'profiles', label: 'Profiles', icon: '👤' },
    { id: 'linkedin', label: 'LinkedIn', icon: '🔗' },
    { id: 'tweet', label: 'Twitter / X', icon: '𝕏' },
    { id: 'favorites', label: 'Favorites', icon: '⭐' },
  ];

  return (

    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* Minimal Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="text-white text-sm">📌</span>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">PostZaper</span>
            </a>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-50 transition border border-transparent hover:border-gray-100"
              >
                {user?.picture ? (
                  <img src={user.picture || ''} alt="" className="w-8 h-8 rounded-full border border-gray-100" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-semibold border border-gray-200">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 py-1.5 z-50">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="font-medium text-slate-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                      {user?.subscription === 'pro' && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-slate-900 text-white text-[10px] rounded-full font-semibold tracking-wide">
                          PRO
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => { }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">My Feed</h1>
            <p className="text-gray-500 mt-2 text-lg">{displayBookmarks.length} saved items to read.</p>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feed..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black/5 focus:border-gray-300 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadBookmarks}
                className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition border border-transparent hover:border-gray-200"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-900 text-white border border-transparent rounded-xl text-sm font-semibold hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10 transition-all active:scale-95"
              >
                + New Bookmark
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-gray-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${activeFilter === filter.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
            >
              {filter.icon && <span className="text-base">{filter.icon}</span>}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bookmarks Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading your feed...</p>
          </div>
        ) : displayBookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <Star className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery ? 'No results found' : 'Your feed is empty'}
            </h3>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              {searchQuery
                ? 'We couldn\'t find anything matching your search. Try a different term.'
                : 'Start saving content from Twitter, LinkedIn, and the web using our browser extension.'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
              >
                Add Your First Bookmark
              </button>
            )}
          </div>
        ) : activeFilter === 'profiles' ? (
          <ProfilesTable
            profiles={displayBookmarks}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteClick}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-auto bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">PostZaper</span>
              <span className="text-sm text-gray-400">© 2024</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Blog</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">About</a>
            </div>

            <div className="flex gap-4">
              {/* Social placeholders could go here */}
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">Twitter</span>
                {/* Twitter Icon SVG could go here */}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Add Bookmark Dialog */}
      {workspaceId && (
        <AddBookmarkDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSuccess={loadBookmarks}
          workspaceId={workspaceId || ''}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete bookmark"
        description="This action cannot be undone. The bookmark will be permanently removed from your collection."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
        loading={isDeleting}
      />
    </div>
  );
}
