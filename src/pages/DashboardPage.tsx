import {
  CheckCircle2,
  ChevronRight,
  X as CloseIcon,
  Crown,
  Filter,
  FolderPlus,
  Library,
  LogOut,
  Menu,
  Moon,
  MoreVertical,
  Plus,
  Repeat2,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  Users,
  Wand2,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import AddBookmarkDialog from '../components/AddBookmarkDialog';
import BookmarkCard from '../components/BookmarkCard';
import PostDetailDialog from '../components/PostDetailDialog';
import ProfileDetailDialog from '../components/ProfileDetailDialog';
import ProfilesTable from '../components/ProfilesTable';
import SettingsDialog from '../components/SettingsDialog';
import SEO from '../components/SEO';
import { ConfirmDialog } from '../components/ui/confirm-dialog';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { BookmarkGridSkeleton, ProfileTableSkeleton } from '../components/ui/skeleton';
import UpgradeDialog from '../components/UpgradeDialog';
import { useAuth } from '../contexts/AuthContext';
import { bookmarkService, clusterService, type Bookmark, type Cluster } from '../services/bookmarkService';

function ContentStudioView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-4 lg:py-8 px-4 text-center max-w-5xl mx-auto animate-fade-in overflow-hidden">
      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 lg:mb-5 animate-pulse shadow-inner ring-1 ring-primary/20 shrink-0">
        <Sparkles className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
      </div>

      <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight mb-3 uppercase shrink-0">Content Studio</h2>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-amber-500/20 shadow-sm shrink-0">
        <Zap className="w-3 h-3 fill-current" />
        Coming Soon
      </div>

      <p className="text-sm lg:text-base text-muted-foreground mb-8 max-w-2xl leading-relaxed font-medium shrink-0">
        The ultimate workspace for transforming your saved insights into viral content. Harness the power of AI to bridge the gap between inspiration and publication.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left w-full mb-8 shrink-0">
        <div className="p-4 lg:p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Wand2 className="w-5 h-5 text-blue-500" />
          </div>
          <h4 className="font-bold text-base text-foreground mb-1.5">AI Hook Generator</h4>
          <p className="text-[12px] text-muted-foreground leading-relaxed">Convert your saved bookmarks into catchy hooks for Twitter and LinkedIn instantly.</p>
        </div>

        <div className="p-4 lg:p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Repeat2 className="w-5 h-5 text-purple-500" />
          </div>
          <h4 className="font-bold text-base text-foreground mb-1.5">Cluster Remix</h4>
          <p className="text-[12px] text-muted-foreground leading-relaxed">Turn your clusters of research into full-length threads or thought-leadership articles.</p>
        </div>

        <div className="p-4 lg:p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5 text-emerald-500" />
          </div>
          <h4 className="font-bold text-base text-foreground mb-1.5">Tone Matching</h4>
          <p className="text-[12px] text-muted-foreground leading-relaxed">AI that learns your writing style and applies it to new content based on your saved library.</p>
        </div>
      </div>

      <div className="p-6 lg:p-7 bg-primary rounded-2xl text-white overflow-hidden relative group cursor-pointer shadow-xl shadow-primary/20 w-full shrink-0">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black mb-1">Want early access?</h3>
            <p className="text-white/80 text-xs font-medium">Join 500+ creators waiting for the Studio Beta.</p>
          </div>
          <button className="px-6 py-3 bg-white text-primary rounded-xl font-black text-[11px] lg:text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shrink-0">
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: { id: string; label: string; icon: React.ReactNode }[];
  clusters: Cluster[];
  user: { name?: string; picture?: string; subscription?: string } | null;
  isDarkMode: boolean;
  toggleTheme: () => void;
  showUserMenu: boolean;
  setShowUserMenu: (show: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  setIsUpgradeDialogOpen: (open: boolean) => void;
  setIsClusterAddOpen: (open: boolean) => void;
  handleSignOut: () => void;
}

function Sidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeFilter,
  setActiveFilter,
  filters,
  clusters,
  user,
  isDarkMode,
  toggleTheme,
  showUserMenu,
  setShowUserMenu,
  setIsSettingsOpen,
  setIsUpgradeDialogOpen,
  setIsClusterAddOpen,
  handleSignOut,
}: SidebarProps) {
  return (
    <aside className={`
      fixed lg:relative z-[70] lg:z-0
      w-64 h-full border-r border-border flex flex-col bg-sidebar-background transition-all duration-300 ease-in-out
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <a href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <img
              src="/logo-icon.svg"
              alt="PostZaper"
              className="w-8 h-8 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-lg font-black tracking-tight text-foreground">PostZaper</span>
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-6">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-3">Library</p>
            <div className="space-y-1">
              {filters.slice(0, 1).concat(filters.slice(5)).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === item.id
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-3">Platforms</p>
            <div className="space-y-1">
              {filters.slice(1, 5).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === item.id
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-3">Studio</p>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveFilter('content-studio');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === 'content-studio'
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className={`w-4 h-4 ${activeFilter === 'content-studio' ? 'animate-pulse' : ''}`} />
                  Content Studio
                </div>
                {activeFilter !== 'content-studio' && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-600 rounded-full font-black uppercase tracking-tighter">Soon</span>
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-3 mb-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Clusters</p>
              <Plus
                className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground transition"
                onClick={() => setIsClusterAddOpen(true)}
              />
            </div>
            <div className="space-y-1">
              {clusters.map(cluster => (
                <button
                  key={cluster.id}
                  onClick={() => setActiveFilter(cluster.name)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all group ${activeFilter.toLowerCase() === cluster.name.toLowerCase()
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full ${cluster.color}`} />
                  <span className="flex-1 text-left truncate">{cluster.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Upgrade CTA */}
      {user?.subscription !== 'pro' && (
        <div className="px-4 mt-auto">
          <button
            onClick={() => setIsUpgradeDialogOpen(true)}
            className="w-full bg-[#634400] hover:bg-[#4f46e5] text-white p-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all group flex items-center justify-center gap-2.5"
          >
            <Crown className="w-4 h-4 fill-white/20" />
            <span className="text-[11px] font-black uppercase tracking-widest">Upgrade to Pro</span>
          </button>
        </div>
      )}

      {/* User Card */}
      <div className="mt-auto p-4 border-t border-border bg-sidebar-background transition-colors duration-300">
        <div className="flex items-center justify-between p-2 rounded-xl bg-card border border-border shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0 text-left">
            {user?.picture ? (
              <img src={user.picture} alt="" className="w-8 h-8 rounded-full border border-border" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold border border-border text-xs">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">{user?.name || 'User'}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.subscription === 'pro' ? 'Pro Member' : 'Free Plan'}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-1.5 hover:bg-muted rounded-lg transition text-muted-foreground hover:text-foreground"
              title={isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`p-1.5 hover:bg-muted rounded-lg ${showUserMenu ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-card rounded-xl shadow-xl border border-border py-1.5 z-50">
                    <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function DashboardPage() {
  const { user, workspaceId, signOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get('type') || 'all';
  const detailId = searchParams.get('detailId');

  const setActiveFilter = (type: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('type', type);
    setSearchParams(next);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingBookmarkId, setDeletingBookmarkId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'likes'>('newest');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'extension' | 'web'>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [isClusterAddOpen, setIsClusterAddOpen] = useState(false);
  const [newClusterName, setNewClusterName] = useState('');
  const [newClusterColor, setNewClusterColor] = useState('bg-blue-500');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showClusterMenu, setShowClusterMenu] = useState(false);

  const activeCluster = clusters.find(c => c.name.toLowerCase() === activeFilter.toLowerCase());
  const activeFilterLabel = activeCluster ? activeCluster.name : activeFilter;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const loadClusters = async () => {
    if (!workspaceId) return;
    try {
      const fetchedClusters = await clusterService.getClusters(workspaceId);
      setClusters(fetchedClusters);
    } catch (error) {
      console.error('Failed to load clusters:', error);
    }
  };

  const loadBookmarks = async () => {
    if (!workspaceId) return;

    setLoading(true);
    try {
      const options: { type?: string; folder?: string } = {};

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
    loadClusters();
  }, [workspaceId, activeFilter]);

  const handleToggleFavorite = async (id: string) => {
    try {
      await bookmarkService.toggleFavorite(id);
      setBookmarks(prev =>
        prev.map(b => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
      );
      toast.success('Bookmark updated');
    } catch (error) {
      toast.error('Failed to update bookmark');
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

  let displayBookmarks = [...filteredBookmarks].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (activeFilter === 'favorites') {
    displayBookmarks = displayBookmarks.filter(b => b.isFavorite);
  } else if (activeFilter === 'profiles') {
    displayBookmarks = displayBookmarks.filter(isProfile);
  } else if (activeFilter === 'linkedin') {
    displayBookmarks = displayBookmarks.filter(b => !isProfile(b));
  } else {
    // Check if it's a cluster filter
    const cluster = clusters.find(c => c.name.toLowerCase() === activeFilter.toLowerCase());
    if (cluster) {
      displayBookmarks = displayBookmarks.filter(b => b.tags?.includes(cluster.name));
    }
  }

  // Apply Source Filter
  if (sourceFilter !== 'all') {
    displayBookmarks = displayBookmarks.filter(b => b.source === sourceFilter);
  }

  // Apply Sorting
  displayBookmarks = [...displayBookmarks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'likes') {
      const getLikes = (bk: Bookmark) => {
        if (bk.type === 'tweet') return bk.tweetData?.stats?.likes || 0;
        if (bk.type === 'linkedin') return bk.linkedinData?.stats?.likes || 0;
        return 0;
      };
      return getLikes(b) - getLikes(a);
    }
    return 0;
  });

  const filters = [
    { id: 'all', label: 'All Items', icon: <Library className="w-4 h-4" /> },
    { id: 'profiles', label: 'Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <span className="text-xs font-bold font-sans">In</span> },
    { id: 'tweet', label: 'Twitter / X', icon: <span className="text-xs font-bold font-sans">𝕏</span> },
    { id: 'article', label: 'Articles', icon: <Search className="w-4 h-4" /> },
    { id: 'favorites', label: 'Favorites', icon: <Star className="w-4 h-4" /> },
  ];

  const handleToggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (!isSelectionMode) setIsSelectionMode(true);
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
    setIsSelectionMode(false);
  };

  const handleCloseDetailDialog = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('detailId');
    setSearchParams(next);
  };

  const handleCreateCluster = async () => {
    if (!newClusterName.trim() || !workspaceId) return;

    try {
      const cluster = await clusterService.createCluster({
        workspaceId,
        name: newClusterName.trim(),
        color: newClusterColor
      });
      setClusters(prev => [...prev, cluster]);
      setNewClusterName('');
      setIsClusterAddOpen(false);
      toast.success('Cluster created');
    } catch (error) {
      toast.error('Failed to create cluster');
    }
  };

  const handleAssignToCluster = async (clusterName: string) => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => {
        const bookmark = bookmarks.find(b => b.id === id);
        if (bookmark) {
          const newTags = Array.from(new Set([...(bookmark.tags || []), clusterName]));
          return bookmarkService.updateBookmark(id, { tags: newTags });
        }
        return Promise.resolve();
      }));

      setBookmarks(prev => prev.map(b =>
        ids.includes(b.id)
          ? { ...b, tags: Array.from(new Set([...(b.tags || []), clusterName])) }
          : b
      ));

      setSelectedIds(new Set());
      setIsSelectionMode(false);
      setShowClusterMenu(false);
      toast.success(`Items added to ${clusterName}`);
    } catch (error) {
      toast.error('Failed to assign cluster');
    }
  };

  const selectedBookmark = detailId ? bookmarks.find(b => b.id === detailId) : null;
  const isSelectedProfile = !!(selectedBookmark && (
    selectedBookmark.tags?.includes('profile') ||
    selectedBookmark.linkedinData?.isProfile === true ||
    selectedBookmark.linkedinProfileData !== undefined
  ));

  return (
    <>
      <SEO
        title="Dashboard - PostZaper"
        description="Your personal bookmark dashboard. Organize, search, and revisit your saved content from Twitter and LinkedIn."
        noIndex={true}
      />
      <div className="flex h-screen bg-background font-sans text-foreground transition-colors duration-300 overflow-hidden relative">
        {/* MOBILE OVERLAY */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] lg:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filters={filters}
          clusters={clusters}
          user={user}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          setIsSettingsOpen={setIsSettingsOpen}
          setIsUpgradeDialogOpen={setIsUpgradeDialogOpen}
          setIsClusterAddOpen={setIsClusterAddOpen}
          handleSignOut={handleSignOut}
        />

        {/* MAIN CONTENT */}
        < main className="flex-1 flex flex-col bg-background transition-colors duration-300 overflow-hidden relative w-full" >
          <header className="h-16 border-b border-border px-4 lg:px-8 flex items-center justify-between bg-background shrink-0 transition-colors duration-300 sticky top-0 z-50">
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                <Library className="w-4 h-4" />
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-sm font-semibold text-foreground capitalize">
                  {activeFilterLabel === 'all' ? 'Library' : activeFilterLabel.replace('-', ' ')}
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border mx-2" />

            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <div className={`relative group flex-1 sm:flex-none ${activeFilter === 'content-studio' ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  disabled={activeFilter === 'content-studio'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full sm:w-48 lg:w-64 bg-muted border-none rounded-full py-2 lg:py-2.5 pl-9 pr-4 lg:pr-12 text-[11px] font-medium focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all placeholder:text-muted-foreground text-foreground"
                  placeholder={`Search...`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 hidden lg:flex items-center pointer-events-none">
                  <kbd className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-medium text-muted-foreground">
                    ⌘K
                  </kbd>
                </div>
              </div>
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className={`flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:gap-2 bg-primary text-white text-[11px] font-bold sm:px-4 sm:py-2.5 rounded-full hover:bg-primary/90 shadow-sm shadow-primary/20 ${activeFilter === 'content-studio' ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Capture</span>
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth no-scrollbar">
            <div className="max-w-6xl mx-auto">
              {activeFilter === 'content-studio' ? (
                <ContentStudioView />
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <h1 className="text-xl lg:text-2xl font-black text-foreground tracking-tight capitalize">
                        {activeFilter === 'all' ? 'Your Feed' : activeFilterLabel.replace('-', ' ')}
                      </h1>
                      <p className="text-xs lg:text-sm text-muted-foreground mt-1">
                        Discover and organize your saved {activeFilter === 'all' ? 'content' : activeFilterLabel.replace('-', ' ')}.
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-4">
                      <button
                        onClick={() => setIsSelectionMode(!isSelectionMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isSelectionMode
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:bg-muted border border-transparent hover:border-border'
                          }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSelectionMode ? 'Cancel' : 'Multi-select'}</span>
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowFilterMenu(!showFilterMenu)}
                          className={`p-2 rounded-lg transition ${showFilterMenu
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                          <Filter className="w-4 h-4" />
                        </button>

                        {showFilterMenu && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowFilterMenu(false)} />
                            <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-2xl shadow-2xl border border-border py-3 z-50">
                              <div className="px-4 py-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Sort By</p>
                                <div className="space-y-1">
                                  {[
                                    { id: 'newest', label: 'Recently Added' },
                                    { id: 'oldest', label: 'Oldest' },
                                    { id: 'likes', label: 'Most Popular' }
                                  ].map(option => (
                                    <button
                                      key={option.id}
                                      onClick={() => {
                                        setSortBy(option.id as any);
                                        setShowFilterMenu(false);
                                      }}
                                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${sortBy === option.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="h-px bg-border my-2" />
                              <div className="px-4 py-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Source</p>
                                <div className="space-y-1">
                                  {[
                                    { id: 'all', label: 'All Sources' },
                                    { id: 'extension', label: 'Extension Only' },
                                    { id: 'web', label: 'Web Only' }
                                  ].map(option => (
                                    <button
                                      key={option.id}
                                      onClick={() => {
                                        setSourceFilter(option.id as any);
                                        setShowFilterMenu(false);
                                      }}
                                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${sourceFilter === option.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    activeFilter === 'profiles' ? (
                      <ProfileTableSkeleton count={5} />
                    ) : (
                      <BookmarkGridSkeleton count={6} />
                    )
                  ) : displayBookmarks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-muted/30 rounded-3xl border border-dashed border-border">
                      <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border">
                        <Star className="w-8 h-8 text-muted" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {searchQuery ? 'No results found' : 'Start Bookmarking Posts'}
                      </h3>
                      <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
                        {searchQuery
                          ? 'We couldn\'t find anything matching your search. Try a different term.'
                          : 'Install our Chrome extension to save posts from LinkedIn & Twitter with one click.'}
                      </p>
                      {!searchQuery && (
                        <a
                          href="https://chromewebstore.google.com/detail/postzaper-save-linkedin-t/hgecghfgpkhjjipffbnlgkdfbbpdjbiñ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-5 py-3 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        >
                          <img src="/chrome.svg" alt="Chrome" className="w-5 h-5" />
                          Install Chrome Extension
                        </a>
                      )}
                    </div>
                  ) : activeFilter === 'profiles' ? (
                    <ProfilesTable
                      profiles={displayBookmarks}
                      onToggleFavorite={handleToggleFavorite}
                      onDelete={handleDeleteClick}
                      onProfileClick={(id) => {
                        const next = new URLSearchParams(searchParams);
                        next.set('detailId', id);
                        setSearchParams(next);
                      }}
                    />
                  ) : (
                    <div className="masonry-grid">
                      {displayBookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="masonry-item relative group/card">
                          {isSelectionMode && (
                            <div
                              className={`absolute top-4 left-4 z-40 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${selectedIds.has(bookmark.id)
                                ? 'bg-primary border-primary'
                                : 'bg-card border-border opacity-60 group-hover/card:opacity-100 shadow-sm'
                                }`}
                              onClick={() => handleToggleSelection(bookmark.id)}
                            >
                              {selectedIds.has(bookmark.id) && <Plus className="w-4 h-4 text-white rotate-45" />}
                            </div>
                          )}
                          <div
                            className={`transition-all duration-300 ${selectedIds.has(bookmark.id) ? 'scale-[0.98] ring-2 ring-primary ring-offset-4 rounded-xl' : ''
                              }`}
                          >
                            <BookmarkCard
                              bookmark={bookmark}
                              clusters={clusters}
                              onToggleFavorite={handleToggleFavorite}
                              onDelete={handleDeleteClick}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* FLOATING ACTION BAR */}
          {
            selectedIds.size > 0 && (
              <div className="fixed bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg lg:w-auto">
                <div className="bg-slate-900 border border-white/10 dark:bg-card dark:border-border text-white rounded-2xl p-2 pl-4 lg:pl-6 flex items-center justify-between lg:justify-start gap-4 lg:gap-6 shadow-2xl ring-1 ring-black/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] lg:text-xs font-bold text-white/90 whitespace-nowrap">
                      {selectedIds.size} post{selectedIds.size > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={handleClearSelection}
                      className="text-[9px] lg:text-[10px] text-gray-400 hover:text-white transition text-left"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="hidden xs:block h-8 w-px bg-white/10 mx-1 lg:mx-2" />
                  <div className="flex gap-2 relative">
                    <div className="relative">
                      <button
                        onClick={() => setShowClusterMenu(!showClusterMenu)}
                        className={`p-2.5 lg:px-4 lg:py-2.5 rounded-xl text-[11px] font-bold flex items-center gap-2 transition border ${showClusterMenu ? 'bg-white text-slate-900 border-white' : 'bg-white/10 hover:bg-white/20 text-white border-white/5'
                          }`}
                      >
                        <FolderPlus className={`w-4 h-4 ${showClusterMenu ? 'text-primary' : 'text-blue-400'}`} />
                        <span className="hidden sm:inline">Cluster</span>
                      </button>

                      {showClusterMenu && (
                        <div className="absolute bottom-full mb-3 right-0 w-48 bg-card border border-border rounded-2xl shadow-2xl p-2 z-[60] overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 py-2 border-b border-border/50 mb-1">Select Cluster</p>
                          <div className="max-h-48 overflow-y-auto no-scrollbar">
                            {clusters.map(cluster => (
                              <button
                                key={cluster.id}
                                onClick={() => handleAssignToCluster(cluster.name)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium text-foreground hover:bg-muted transition-colors text-left"
                              >
                                <div className={`w-2 h-2 rounded-full ${cluster.color}`} />
                                <span className="truncate">{cluster.name}</span>
                              </button>
                            ))}
                            {clusters.length === 0 && (
                              <p className="px-3 py-4 text-[11px] text-muted-foreground text-center italic">No clusters yet</p>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setIsClusterAddOpen(true);
                              setShowClusterMenu(false);
                            }}
                            className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold text-primary hover:bg-primary/5 transition-colors border-t border-border/50"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Create New
                          </button>
                        </div>
                      )}
                    </div>

                    <button className="px-4 py-2.5 lg:px-5 lg:py-2.5 bg-gradient-to-r from-primary to-purple-500 hover:scale-105 rounded-xl text-[11px] font-black flex items-center gap-2.5 transition shadow-lg shadow-primary/25 group text-white">
                      <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="hidden xs:inline">Generate</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          {/* Cluster Add Dialog */}
          <Dialog open={isClusterAddOpen} onOpenChange={setIsClusterAddOpen}>
            <DialogContent className="sm:max-w-md p-0 gap-0 bg-card border-border shadow-2xl rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent p-6 pb-8 border-b border-border/50">
                <div className="w-12 h-12 rounded-xl bg-background border border-border shadow-sm flex items-center justify-center mb-4 text-primary">
                  <FolderPlus className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-foreground tracking-tight">Create New Cluster</h2>
                <p className="text-sm text-muted-foreground font-medium mt-1">Organize your saved content into topic-based collections.</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-foreground/70 ml-1">Cluster Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FolderPlus className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                      type="text"
                      autoFocus
                      value={newClusterName}
                      onChange={(e) => setNewClusterName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateCluster()}
                      className="w-full bg-muted/50 border border-border rounded-xl pl-9 pr-4 py-3 text-sm font-medium focus:ring-2 ring-primary/20 focus:bg-background transition-all outline-none"
                      placeholder="e.g. SaaS Growth Hooks"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-foreground/70 ml-1">Label Color</label>
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      { name: 'Blue', color: 'bg-blue-500' },
                      { name: 'Purple', color: 'bg-purple-500' },
                      { name: 'Amber', color: 'bg-amber-500' },
                      { name: 'Emerald', color: 'bg-emerald-500' },
                      { name: 'Rose', color: 'bg-rose-500' },
                      { name: 'Indigo', color: 'bg-indigo-500' },
                    ].map(item => (
                      <button
                        key={item.color}
                        onClick={() => setNewClusterColor(item.color)}
                        className={`aspect-square rounded-xl ${item.color} transition-all duration-200 shadow-sm relative overflow-hidden group ${newClusterColor === item.color ? 'ring-2 ring-offset-2 ring-offset-background ring-foreground scale-105 shadow-md' : 'hover:scale-105 opacity-80 hover:opacity-100'
                          }`}
                        title={item.name}
                        type="button"
                      >
                        {newClusterColor === item.color && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/10 animate-in zoom-in duration-200">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/30 border-t border-border flex gap-3 justify-end">
                <button
                  onClick={() => setIsClusterAddOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted border border-transparent hover:border-border transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCluster}
                  disabled={!newClusterName.trim()}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Cluster
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </main >

        {workspaceId && (
          <>
            <AddBookmarkDialog
              isOpen={isAddDialogOpen}
              onClose={() => setIsAddDialogOpen(false)}
              onSuccess={loadBookmarks}
              workspaceId={workspaceId}
            />
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
          </>
        )
        }

        <UpgradeDialog
          isOpen={isUpgradeDialogOpen}
          onClose={() => setIsUpgradeDialogOpen(false)}
        />

        <SettingsDialog
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onOpenUpgrade={() => setIsUpgradeDialogOpen(true)}
        />

        <ProfileDetailDialog
          isOpen={!!detailId && isSelectedProfile}
          onClose={handleCloseDetailDialog}
          bookmark={selectedBookmark || null}
        />

        <PostDetailDialog
          isOpen={!!detailId && !isSelectedProfile}
          onClose={handleCloseDetailDialog}
          bookmark={selectedBookmark || null}
        />
      </div>
    </>
  );
}
