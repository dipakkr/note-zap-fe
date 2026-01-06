import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut, Star, Search, RefreshCw, Settings, ChevronDown, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { bookmarkService, type Bookmark } from '../services/bookmarkService';
import BookmarkCard from '../components/BookmarkCard';
import AddBookmarkDialog from '../components/AddBookmarkDialog';
import Logo from '../components/Logo';


export default function DashboardPage() {
  const { user, workspaceId, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-white text-slate-900'}`}>
      {/* Minimal Navbar */}
      <nav className={`backdrop-blur-md  sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-950/90 border-gray-900' : 'bg-white/80 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="h-8">
                <Logo className={`h-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`} />
              </div>
            </a>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-full transition border ${theme === 'dark' ? 'hover:bg-gray-800 border-transparent hover:border-gray-700' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'}`}
                >
                  {user?.picture ? (
                    <img src={user.picture || ''} alt="" className={`w-8 h-8 rounded-full border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`} />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border ${theme === 'dark' ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-slate-100 text-slate-600 border-gray-200'}`}>
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0" onClick={() => setShowUserMenu(false)} />
                    <div className={`absolute right-0 mt-2 w-60 rounded-xl shadow-xl py-1.5 z-50 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700/50 shadow-black/20' : 'bg-white border border-gray-100 shadow-gray-200/50'}`}>
                      <div className={`px-4 py-3 border-b mb-1 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-50'}`}>
                        <p className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user?.name || 'User'}</p>
                        <p className={`text-xs truncate mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
                        {user?.subscription === 'pro' && (
                          <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] rounded-full font-semibold tracking-wide ${theme === 'dark' ? 'bg-white text-gray-900' : 'bg-slate-900 text-white'}`}>
                            PRO
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => { }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={handleSignOut}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition ${theme === 'dark' ? 'text-red-400 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-50'}`}
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
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>My Feed</h1>
            <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{displayBookmarks.length} saved items to read.</p>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search feed..."
                className={`w-full sm:w-64 pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 transition-all ${theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:ring-gray-700 focus:border-gray-600'
                  : 'bg-gray-50/50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-black/5 focus:border-gray-300 focus:bg-white'
                  }`}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadBookmarks}
                className={`p-2.5 rounded-xl transition border ${theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-gray-200'
                  }`}
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${theme === 'dark'
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/10'
                  }`}
              >
                + New Bookmark
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`flex items-center gap-1 mb-8  overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 ${theme === 'dark' ? 'border-gray-900' : 'border-gray-200'}`}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${activeFilter === filter.id
                ? 'border-b-2 border-blue-500 text-blue-500'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 rounded-lg'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg'
                }`}
            >
              {filter.icon && <span className="text-base">{filter.icon}</span>}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bookmarks Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`rounded-xl p-5 ${theme === 'dark' ? 'bg-gray-900/30 border-gray-900' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
                  <div className="space-y-2 flex-1">
                    <div className={`h-4 w-24 rounded animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
                    <div className={`h-3 w-16 rounded animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className={`h-4 w-full rounded animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
                  <div className={`h-4 w-[90%] rounded animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
                  <div className={`h-4 w-[60%] rounded animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
                </div>
              </div>
            ))}
          </div>
        ) : displayBookmarks.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-32 text-center rounded-3xl ${theme === 'dark' ? 'bg-gray-900/30 ring-1 ring-dashed ring-gray-700/30' : 'bg-gray-50/50 border border-dashed border-gray-200'}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white shadow-sm border border-gray-100'}`}>
              <Star className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {searchQuery ? 'No results found' : 'Your feed is empty'}
            </h3>
            <p className={`max-w-sm mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {searchQuery
                ? 'We couldn\'t find anything matching your search. Try a different term.'
                : 'Start saving content from Twitter, LinkedIn, and the web using our browser extension.'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className={`px-6 py-3 rounded-xl font-semibold transition ${theme === 'dark' ? 'bg-gray-800/50 ring-1 ring-gray-700/30 text-white hover:bg-gray-700/50' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm'}`}
              >
                Add Your First Bookmark
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Footer */}
      <footer className={`border-t mt-auto ${theme === 'dark' ? 'border-gray-900 bg-gray-900/20' : 'border-gray-100 bg-gray-50/50'}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>PostZaper</span>
              <span className="text-sm text-gray-400">© 2024</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link to="/privacy" className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Privacy Policy</Link>
              <Link to="/terms" className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Terms of Service</Link>
              <Link to="/blog" className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Blog</Link>
              <Link to="/about" className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>About</Link>
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
    </div>
  );
}
