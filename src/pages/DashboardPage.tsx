import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Star, Search, RefreshCw, Settings, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { bookmarkService, type Bookmark } from '../services/bookmarkService';
import BookmarkCard from '../components/BookmarkCard';
import AddBookmarkDialog from '../components/AddBookmarkDialog';

export default function DashboardPage() {
  const { user, workspaceId, signOut } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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
      if (activeFilter === 'tweet' || activeFilter === 'linkedin' || activeFilter === 'article') {
        options.type = activeFilter;
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return;

    try {
      await bookmarkService.deleteBookmark(id);
      setBookmarks(prev => prev.filter(b => b.id !== id));
      toast.success('Bookmark deleted');
    } catch (error) {
      toast.error('Failed to delete bookmark');
    }
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

  // Filter for favorites
  const displayBookmarks = activeFilter === 'favorites' 
    ? filteredBookmarks.filter(b => b.isFavorite)
    : filteredBookmarks;

  const filters = [
    { id: 'all', label: 'All Items', icon: null },
    { id: 'linkedin', label: 'LinkedIn', icon: '🔗' },
    { id: 'tweet', label: 'Twitter / X', icon: '𝕏' },
    { id: 'favorites', label: 'Favorites', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Minimal Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📌</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">BookmarkHub</span>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition"
              >
                {user?.picture ? (
                  <img src={user.picture} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                )}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      {user?.subscription === 'pro' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs rounded-full font-medium">
                          PRO
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {}}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Feed</h1>
            <p className="text-gray-500 mt-1">{displayBookmarks.length} saved items to read.</p>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feed..."
                className="w-64 pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <button
              onClick={loadBookmarks}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Manage
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-gray-200">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
                activeFilter === filter.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {filter.icon && <span>{filter.icon}</span>}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bookmarks Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500">Loading your feed...</p>
            </div>
          </div>
        ) : displayBookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Star className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No results found' : 'Your feed is empty'}
            </h3>
            <p className="text-gray-500 max-w-md mb-6">
              {searchQuery
                ? 'Try a different search term'
                : 'Start saving content from Twitter, LinkedIn, and articles using the browser extension.'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Add Your First Bookmark
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayBookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Bookmark Dialog */}
      {workspaceId && (
        <AddBookmarkDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSuccess={loadBookmarks}
          workspaceId={workspaceId}
        />
      )}
    </div>
  );
}
