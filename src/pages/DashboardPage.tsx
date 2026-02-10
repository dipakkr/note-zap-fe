import {
  BarChart2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon,
  Clock,
  Copy,
  Crown,
  Edit3,
  Filter,
  FolderPlus,
  Library,
  Linkedin,
  List,
  Loader2,
  LogOut,
  Menu,
  Moon,
  MoreVertical,
  Plus,
  Search,
  RefreshCw,
  Settings,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Twitter,
  Users,
  Wand2,
  LayoutGrid,
  Rows
} from 'lucide-react';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useClickOutside } from '../hooks/use-click-outside';
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
import CreatorUpgradeDialog from '../components/CreatorUpgradeDialog';
import { AnalyticsOverview } from '../components/analytics/AnalyticsOverview';
import { useAuth } from '../contexts/AuthContext';
import BookmarkPickerDialog from '../components/BookmarkPickerDialog';
import AuthorPickerDropdown from '../components/AuthorPickerDropdown';
import { bookmarkService, clusterService, contentStudioService, type Bookmark, type Cluster, type GeneratedPost, type ToneAuthor } from '../services/bookmarkService';
import { hasProAccess, isCreatorTier, getTierDisplayName } from '../lib/utils';

/** Render simple markdown (bold, italic) as React elements */
function renderMarkdown(text: string): React.ReactNode[] {
  // Split by **bold** and *italic* patterns
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      // **bold**
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      // *italic*
      parts.push(<em key={key++}>{match[3]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function useMasonryColumns() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setColumns(3); // lg
      } else if (width >= 640) {
        setColumns(2); // sm
      } else {
        setColumns(1); // mobile
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
}

// ─── Content Calendar View ───────────────────────────────────────────────────

function ContentCalendarView({ workspaceId }: { workspaceId: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarPosts, setCalendarPosts] = useState<GeneratedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [unschedulingId, setUnschedulingId] = useState<string | null>(null);
  const [viewingPost, setViewingPost] = useState<GeneratedPost | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    for (let i = startDow - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({ date: new Date(year, month + 1, d), isCurrentMonth: false });
    }
    return days;
  }, [year, month]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const start = calendarDays[0].date.toISOString();
        const end = calendarDays[calendarDays.length - 1].date.toISOString();
        const response = await contentStudioService.getCalendarPosts(workspaceId, start, end);
        setCalendarPosts(response.posts);
      } catch (error) {
        console.error('Failed to load calendar posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [workspaceId, year, month]);

  const postsByDate = useMemo(() => {
    const map = new Map<string, GeneratedPost[]>();
    for (const post of calendarPosts) {
      if (post.scheduledDate) {
        const key = new Date(post.scheduledDate).toLocaleDateString('en-CA'); // YYYY-MM-DD
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(post);
      }
    }
    return map;
  }, [calendarPosts]);

  const goToPrevMonth = () => { setCurrentDate(new Date(year, month - 1, 1)); setSelectedDay(null); };
  const goToNextMonth = () => { setCurrentDate(new Date(year, month + 1, 1)); setSelectedDay(null); };
  const goToToday = () => { setCurrentDate(new Date()); setSelectedDay(new Date()); };

  const handleUnschedule = async (postId: string) => {
    setUnschedulingId(postId);
    try {
      await contentStudioService.unschedulePost(postId);
      setCalendarPosts(prev => prev.filter(p => p.id !== postId));
      toast.success('Post removed from calendar');
    } catch {
      toast.error('Failed to unschedule post');
    } finally {
      setUnschedulingId(null);
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const isToday = (date: Date) => {
    const t = new Date();
    return date.getDate() === t.getDate() && date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear();
  };

  const selectedDayKey = selectedDay ? selectedDay.toLocaleDateString('en-CA') : null;
  const selectedDayPosts = selectedDayKey ? (postsByDate.get(selectedDayKey) || []) : [];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const totalScheduled = calendarPosts.length;

  return (
    <div className="py-4 px-2 lg:px-3">
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-130px)]">
        {/* Calendar Grid */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-black text-foreground">{monthNames[month]} {year}</h2>
              {totalScheduled > 0 && (
                <p className="text-[11px] text-muted-foreground mt-0.5">{totalScheduled} post{totalScheduled !== 1 ? 's' : ''} scheduled</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={goToToday} className="px-3 py-1.5 text-[11px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg border border-border transition">
                Today
              </button>
              <button onClick={goToPrevMonth} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={goToNextMonth} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {dayNames.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider py-2">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 border-t border-l border-border rounded-lg overflow-hidden flex-1">
            {loading ? (
              Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="min-h-[80px] border-r border-b border-border bg-card p-1.5 animate-pulse">
                  <div className="w-5 h-5 bg-muted rounded-full" />
                </div>
              ))
            ) : (
              calendarDays.map((day, i) => {
                const dateKey = day.date.toLocaleDateString('en-CA');
                const dayPosts = postsByDate.get(dateKey) || [];
                const isSelected = selectedDayKey === dateKey;
                const today = isToday(day.date);

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(day.date)}
                    className={`
                      relative min-h-[80px] lg:min-h-[90px] p-1.5 border-r border-b border-border text-left transition-all
                      ${!day.isCurrentMonth ? 'bg-muted/30 text-muted-foreground/40' : 'bg-card hover:bg-muted/30'}
                      ${isSelected ? 'ring-2 ring-primary ring-inset bg-primary/5' : ''}
                    `}
                  >
                    <span className={`
                      inline-flex items-center justify-center w-6 h-6 text-[11px] font-bold rounded-full
                      ${today ? 'bg-primary text-white' : ''}
                      ${isSelected && !today ? 'bg-primary/10 text-primary' : ''}
                    `}>
                      {day.date.getDate()}
                    </span>

                    {dayPosts.length > 0 && (
                      <div className="mt-0.5 space-y-0.5">
                        {dayPosts.slice(0, 2).map(post => (
                          <div
                            key={post.id}
                            className={`text-[8px] font-medium px-1 py-0.5 rounded truncate ${
                              post.platform === 'twitter'
                                ? 'bg-sky-500/10 text-sky-600'
                                : 'bg-blue-600/10 text-blue-600'
                            }`}
                          >
                            {post.content.substring(0, 25)}...
                          </div>
                        ))}
                        {dayPosts.length > 2 && (
                          <div className="text-[8px] font-bold text-muted-foreground px-1">
                            +{dayPosts.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Day Panel */}
        <div className="lg:w-[320px] lg:flex-shrink-0 flex flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <h3 className="text-xs font-bold text-foreground flex-1">
              {selectedDay
                ? selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                : 'Select a day'}
            </h3>
            {selectedDayPosts.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary">
                {selectedDayPosts.length}
              </span>
            )}
          </div>

          {!selectedDay ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-muted-foreground/40" />
              </div>
              <p className="text-[11px] font-semibold text-foreground mb-0.5">Click a day</p>
              <p className="text-[10px] text-muted-foreground text-center">to see scheduled posts</p>
            </div>
          ) : selectedDayPosts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-muted-foreground/40" />
              </div>
              <p className="text-[11px] font-semibold text-foreground mb-0.5">No posts scheduled</p>
              <p className="text-[10px] text-muted-foreground text-center">Schedule posts from Content Studio</p>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1 no-scrollbar">
              {selectedDayPosts.map(post => (
                <div key={post.id} onClick={() => setViewingPost(post)} className="px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      post.platform === 'twitter' ? 'bg-sky-500/10 text-sky-600' : 'bg-blue-600/10 text-blue-600'
                    }`}>
                      {post.platform === 'twitter' ? (
                        <><Twitter className="w-2.5 h-2.5" /> X</>
                      ) : (
                        <><Linkedin className="w-2.5 h-2.5" /> LinkedIn</>
                      )}
                    </span>
                    {post.source.clusterName && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary truncate max-w-[100px]">
                        {post.source.clusterName}
                      </span>
                    )}
                    {post.source.toneAuthorName && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/10 text-violet-600 truncate max-w-[100px]">
                        {post.source.toneAuthorName}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-foreground/80 leading-snug whitespace-pre-wrap line-clamp-4 mb-2">
                    {renderMarkdown(post.content)}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(post.content); }}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted rounded transition"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      Copy
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUnschedule(post.id); }}
                      disabled={unschedulingId === post.id}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition disabled:opacity-50"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                      {unschedulingId === post.id ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Detail Dialog */}
      <Dialog open={!!viewingPost} onOpenChange={(open) => { if (!open) setViewingPost(null); }}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-xl border-border bg-card shadow-2xl">
          {viewingPost && (
            <div>
              <div className="flex items-center gap-2 px-5 pt-5 pb-3 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  viewingPost.platform === 'twitter' ? 'bg-sky-500/10 text-sky-600' : 'bg-blue-600/10 text-blue-600'
                }`}>
                  {viewingPost.platform === 'twitter' ? <><Twitter className="w-3 h-3" /> X</> : <><Linkedin className="w-3 h-3" /> LinkedIn</>}
                </span>
                {viewingPost.source.clusterName && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary">{viewingPost.source.clusterName}</span>
                )}
                {viewingPost.source.toneAuthorName && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-violet-500/10 text-violet-600">Voice: {viewingPost.source.toneAuthorName}</span>
                )}
                {viewingPost.scheduledDate && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-500/10 text-green-600 ml-auto">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {new Date(viewingPost.scheduledDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>
              <div className="px-5 pb-4 max-h-[400px] overflow-y-auto">
                <p className="text-[15px] text-foreground whitespace-pre-wrap leading-relaxed">{renderMarkdown(viewingPost.content)}</p>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 border-t border-border bg-muted/20">
                <button
                  onClick={() => handleCopy(viewingPost.content)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button
                  onClick={() => { handleUnschedule(viewingPost.id); setViewingPost(null); }}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Content Studio View ─────────────────────────────────────────────────────

interface ContentStudioViewProps {
  workspaceId: string;
  clusters: Cluster[];
  bookmarks: Bookmark[];
}

function ContentStudioView({ workspaceId, clusters, bookmarks }: ContentStudioViewProps) {
  const [sourceMode, setSourceMode] = useState<'cluster' | 'bookmarks'>('cluster');
  const [selectedClusterId, setSelectedClusterId] = useState<string>('');
  const [selectedBookmarkIds, setSelectedBookmarkIds] = useState<string[]>([]);
  const [platform, setPlatform] = useState<'twitter' | 'linkedin'>('twitter');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [platformFilter, setPlatformFilter] = useState<'all' | 'twitter' | 'linkedin'>('all');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toneAuthors, setToneAuthors] = useState<ToneAuthor[]>([]);
  const [selectedToneAuthorKey, setSelectedToneAuthorKey] = useState<string | null>(null);
  const [toneAuthorsLoading, setToneAuthorsLoading] = useState(false);
  const [latestPostId, setLatestPostId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o-mini');
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [schedulingPostId, setSchedulingPostId] = useState<string | null>(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  // Load tone authors
  useEffect(() => {
    const loadAuthors = async () => {
      setToneAuthorsLoading(true);
      try {
        const { authors } = await bookmarkService.getAuthors(workspaceId);
        setToneAuthors(authors);
      } catch {
        // non-critical
      } finally {
        setToneAuthorsLoading(false);
      }
    };
    loadAuthors();
  }, [workspaceId]);

  // Load existing generated posts
  useEffect(() => {
    const loadPosts = async () => {
      setPostsLoading(true);
      try {
        const response = await contentStudioService.getPosts(workspaceId);
        setGeneratedPosts(response.posts);
      } catch (error) {
        console.error('Failed to load generated posts:', error);
      } finally {
        setPostsLoading(false);
      }
    };
    loadPosts();
  }, [workspaceId]);

  const handleGenerate = async () => {
    if (sourceMode === 'cluster' && !selectedClusterId) {
      toast.error('Please select a collection');
      return;
    }
    if (sourceMode === 'bookmarks' && selectedBookmarkIds.length === 0) {
      toast.error('Please select at least one bookmark');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await contentStudioService.generate({
        workspaceId,
        clusterId: sourceMode === 'cluster' ? selectedClusterId : undefined,
        bookmarkIds: sourceMode === 'bookmarks' ? selectedBookmarkIds : undefined,
        platform,
        contentType: 'post',
        toneAuthorKey: selectedToneAuthorKey || undefined,
        model: selectedModel,
      });
      setGeneratedPosts(prev => [...response.posts, ...prev]);
      if (response.posts.length > 0) {
        setLatestPostId(response.posts[0].id);
      }
      toast.success('Post generated!');
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Generation failed';
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleEditSave = async (postId: string) => {
    setSavingId(postId);
    try {
      const { post } = await contentStudioService.updatePost(postId, { content: editContent });
      setGeneratedPosts(prev => prev.map(p => (p.id === postId ? post : p)));
      setEditingPostId(null);
      toast.success('Post updated');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteClick = (postId: string) => {
    setDeletingPostId(postId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPostId) return;
    setIsDeletingPost(true);
    try {
      await contentStudioService.deletePost(deletingPostId);
      setGeneratedPosts(prev => prev.filter(p => p.id !== deletingPostId));
      toast.success('Post deleted');
      setDeleteDialogOpen(false);
    } catch {
      toast.error('Failed to delete');
    } finally {
      setIsDeletingPost(false);
      setDeletingPostId(null);
    }
  };

  const handleRegenerate = async (postId: string) => {
    setRegeneratingId(postId);
    try {
      const { post } = await contentStudioService.regeneratePost(postId);
      setGeneratedPosts(prev => prev.map(p => (p.id === postId ? post : p)));
      toast.success('Post regenerated');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Regeneration failed';
      toast.error(message);
    } finally {
      setRegeneratingId(null);
    }
  };

  const handleScheduleClick = (postId: string) => {
    setSchedulingPostId(postId);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduleDate(tomorrow.toISOString().split('T')[0]);
    setScheduleDialogOpen(true);
  };

  const handleScheduleConfirm = async () => {
    if (!schedulingPostId || !scheduleDate) return;
    setIsScheduling(true);
    try {
      const { post } = await contentStudioService.schedulePost(schedulingPostId, scheduleDate);
      setGeneratedPosts(prev => prev.map(p => (p.id === schedulingPostId ? post : p)));
      toast.success('Post scheduled to calendar');
      setScheduleDialogOpen(false);
    } catch {
      toast.error('Failed to schedule post');
    } finally {
      setIsScheduling(false);
      setSchedulingPostId(null);
    }
  };

  const filteredPosts = useMemo(() => {
    if (platformFilter === 'all') return generatedPosts;
    return generatedPosts.filter(p => p.platform === platformFilter);
  }, [generatedPosts, platformFilter]);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const selectedPost = generatedPosts.find(p => p.id === selectedPostId) || null;
  const latestPost = latestPostId ? generatedPosts.find(p => p.id === latestPostId) || null : null;

  const authorAvatarMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const a of toneAuthors) {
      if (a.avatar) map.set(a.authorKey, a.avatar);
    }
    return map;
  }, [toneAuthors]);


  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="py-6 px-4">
      {/* Two-panel layout */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel: Generation controls + latest post */}
        <div className="flex-1 min-w-0">
          {/* Generation Panel */}
          <div className="rounded-xl border border-border bg-card p-4 mb-5">
            {/* Row 1: Source toggle + dropdowns */}
            <div className="flex items-end gap-3 mb-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Source</label>
                <div className="flex bg-muted rounded-lg p-0.5 border border-border">
                  <button
                    onClick={() => setSourceMode('cluster')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${sourceMode === 'cluster' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Collection
                  </button>
                  <button
                    onClick={() => setSourceMode('bookmarks')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${sourceMode === 'bookmarks' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Bookmarks
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as 'twitter' | 'linkedin')}
                  className="bg-muted border border-border rounded-lg py-[7px] px-2.5 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                >
                  <option value="twitter">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-muted border border-border rounded-lg py-[7px] px-2.5 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                >
                  <option value="gpt-4o-mini">GPT-4o Mini</option>
                  <option value="gpt-4o">GPT-4o</option>
                </select>
              </div>
            </div>

            {/* Row 2: Cluster/Bookmark selector */}
            <div className="mb-3">
              {sourceMode === 'cluster' ? (
                <select
                  value={selectedClusterId}
                  onChange={e => setSelectedClusterId(e.target.value)}
                  className="w-full bg-muted border border-border rounded-lg py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition"
                >
                  <option value="">Select a collection...</option>
                  {clusters.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              ) : (
                <button
                  onClick={() => setIsPickerOpen(true)}
                  className="w-full flex items-center justify-between bg-muted border border-border rounded-lg py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition"
                >
                  <span>
                    {selectedBookmarkIds.length > 0
                      ? `${selectedBookmarkIds.length} bookmark${selectedBookmarkIds.length > 1 ? 's' : ''} selected`
                      : 'Select bookmarks...'}
                  </span>
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Row 3: Voice / Tone */}
            <div className="mb-4">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Voice / Tone (optional)</label>
              <AuthorPickerDropdown
                authors={toneAuthors}
                selectedAuthorKey={selectedToneAuthorKey}
                onSelect={setSelectedToneAuthorKey}
                isLoading={toneAuthorsLoading}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || (sourceMode === 'cluster' && !selectedClusterId) || (sourceMode === 'bookmarks' && selectedBookmarkIds.length === 0)}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Post
                </>
              )}
            </button>
          </div>

          {/* Latest Generated Post */}
          {latestPost && (
            <div className="rounded-xl border-2 border-primary/20 bg-card p-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Latest Generated</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{formatDate(latestPost.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  latestPost.platform === 'twitter' ? 'bg-sky-500/10 text-sky-600' : 'bg-blue-600/10 text-blue-600'
                }`}>
                  {latestPost.platform === 'twitter' ? <Twitter className="w-3 h-3" /> : <Linkedin className="w-3 h-3" />}
                  {latestPost.platform === 'twitter' ? 'Twitter' : 'LinkedIn'}
                </span>
                {latestPost.source.clusterName && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                    {latestPost.source.clusterName}
                  </span>
                )}
                {latestPost.source.toneAuthorName && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/10 text-violet-600">
                    Voice: {latestPost.source.toneAuthorName}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed mb-3 max-h-[200px] overflow-y-auto">
                {latestPost.content}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className={`text-[11px] font-medium ${latestPost.platform === 'twitter' && latestPost.content.length > 280 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {latestPost.content.length} chars
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(latestPost.content)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={() => setSelectedPostId(latestPost.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleRegenerate(latestPost.id)}
                    disabled={regeneratingId === latestPost.id}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition disabled:opacity-50"
                  >
                    {regeneratingId === latestPost.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                    Redo
                  </button>
                  <button
                    onClick={() => handleScheduleClick(latestPost.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
                  >
                    <Clock className="w-3 h-3" />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Generating skeleton */}
          {isGenerating && !latestPost && (
            <div className="rounded-xl border-2 border-primary/20 bg-card p-4 animate-pulse">
              <div className="flex items-center gap-2 mb-3">
                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Generating...</span>
              </div>
              <div className="space-y-2">
                <div className="h-3.5 bg-muted rounded w-full" />
                <div className="h-3.5 bg-muted rounded w-4/5" />
                <div className="h-3.5 bg-muted rounded w-2/3" />
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Post History — narrow sidebar */}
        <div className="lg:w-[280px] lg:flex-shrink-0 flex flex-col overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <h2 className="text-xs font-bold text-foreground">History</h2>
              {filteredPosts.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-muted text-muted-foreground">
                  {filteredPosts.length}
                </span>
              )}
            </div>
            <div className="flex bg-muted rounded-md p-0.5 border border-border">
              {(['all', 'twitter', 'linkedin'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setPlatformFilter(f)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-semibold transition-all ${platformFilter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {f === 'all' ? 'All' : f === 'twitter' ? 'X' : 'LI'}
                </button>
              ))}
            </div>
          </div>

          {postsLoading ? (
            <div className="p-2 space-y-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="rounded bg-muted/50 p-2 animate-pulse">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-10 h-3.5 bg-muted rounded-full" />
                    <div className="w-8 h-3 bg-muted rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2.5 bg-muted rounded w-full" />
                    <div className="h-2.5 bg-muted rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10 px-4">
              <Sparkles className="w-5 h-5 text-muted-foreground mb-2" />
              <p className="text-[11px] font-semibold text-foreground mb-0.5">No posts yet</p>
              <p className="text-[10px] text-muted-foreground text-center">Generate your first post</p>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1 no-scrollbar">
              {filteredPosts.map(post => {
                const postCharCount = post.content.length;
                const postOverLimit = post.platform === 'twitter' && postCharCount > 280;
                const isLatest = post.id === latestPostId;
                const authorAvatar = post.source.toneAuthorKey ? authorAvatarMap.get(post.source.toneAuthorKey) : undefined;
                return (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className={`w-full text-left px-3 py-2 border-b border-border/50 hover:bg-muted/50 transition-all group ${isLatest ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex gap-2">
                      {/* Author avatar */}
                      <div className="flex-shrink-0 pt-0.5">
                        {authorAvatar ? (
                          <img src={authorAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                        ) : (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                            post.platform === 'twitter' ? 'bg-sky-500/10 text-sky-600' : 'bg-blue-600/10 text-blue-600'
                          }`}>
                            {post.platform === 'twitter' ? 'X' : 'LI'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {post.source.toneAuthorName && (
                            <span className="text-[10px] font-semibold text-foreground truncate max-w-[90px]">
                              {post.source.toneAuthorName}
                            </span>
                          )}
                          {!post.source.toneAuthorName && post.source.clusterName && (
                            <span className="text-[10px] font-semibold text-foreground truncate max-w-[90px]">
                              {post.source.clusterName}
                            </span>
                          )}
                          {!post.source.toneAuthorName && !post.source.clusterName && post.source.sourceBookmarkTitle && (
                            <span className="text-[10px] font-semibold text-foreground truncate max-w-[90px]">
                              {post.source.sourceBookmarkTitle}
                            </span>
                          )}
                          <span className={`inline-flex items-center px-1 py-0.5 rounded text-[7px] font-bold ${
                            post.platform === 'twitter' ? 'bg-sky-500/10 text-sky-600' : 'bg-blue-600/10 text-blue-600'
                          }`}>
                            {post.platform === 'twitter' ? 'X' : 'LI'}
                          </span>
                          {post.scheduledDate && (
                            <span className="inline-flex items-center px-1 py-0.5 rounded text-[7px] font-bold bg-green-500/10 text-green-600" title={`Scheduled: ${new Date(post.scheduledDate).toLocaleDateString()}`}>
                              <Clock className="w-2 h-2 mr-0.5" />{new Date(post.scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                          <span className="text-[8px] text-muted-foreground ml-auto flex-shrink-0">{formatDate(post.createdAt)}</span>
                        </div>
                        <p className="text-[11px] text-foreground/70 leading-snug line-clamp-2 whitespace-pre-wrap">
                          {post.content}
                        </p>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className={`text-[9px] font-medium ${postOverLimit ? 'text-red-500' : 'text-muted-foreground/60'}`}>
                            {postCharCount}c
                          </span>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span
                              role="button"
                              onClick={(e) => { e.stopPropagation(); handleScheduleClick(post.id); }}
                              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition"
                              title="Schedule"
                            >
                              <Clock className="w-2.5 h-2.5" />
                            </span>
                            <span
                              role="button"
                              onClick={(e) => { e.stopPropagation(); handleCopy(post.content); }}
                              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition"
                            >
                              <Copy className="w-2.5 h-2.5" />
                            </span>
                            <span
                              role="button"
                              onClick={(e) => { e.stopPropagation(); handleDeleteClick(post.id); }}
                              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bookmark Picker Dialog */}
      <BookmarkPickerDialog
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        bookmarks={bookmarks}
        selectedIds={new Set(selectedBookmarkIds)}
        onConfirm={setSelectedBookmarkIds}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete generated post"
        description="This will permanently delete this generated post. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
        loading={isDeletingPost}
      />

      {/* Schedule Date Picker Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[340px] p-0 overflow-hidden rounded-xl border-border bg-card">
          <div className="px-5 pt-5 pb-2">
            <h3 className="text-sm font-bold text-foreground">Schedule Post</h3>
            <p className="text-xs text-muted-foreground mt-1">Choose a date for your content calendar.</p>
          </div>
          <div className="px-5 py-3">
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-muted border border-border rounded-lg py-2 px-3 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition"
            />
          </div>
          <div className="flex items-center gap-2 px-5 pb-5">
            <button
              onClick={() => setScheduleDialogOpen(false)}
              className="flex-1 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg border border-border transition"
            >
              Cancel
            </button>
            <button
              onClick={handleScheduleConfirm}
              disabled={!scheduleDate || isScheduling}
              className="flex-1 px-3 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isScheduling ? 'Scheduling...' : 'Schedule'}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Post Detail Popup */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => { if (!open) { setSelectedPostId(null); setEditingPostId(null); } }}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-xl border-border bg-card shadow-2xl">
          {selectedPost && (() => {
            const post = selectedPost;
            const isEditing = editingPostId === post.id;
            const isRegenerating = regeneratingId === post.id;
            const charCount = post.content.length;
            const isOverLimit = post.platform === 'twitter' && charCount > 280;
            const isCopied = copiedPostId === post.id;

            return (
              <div className="flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="flex items-center gap-1.5 px-5 pr-12 py-2.5 border-b border-border flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    post.platform === 'twitter' ? 'bg-sky-500/10 text-sky-600' : 'bg-blue-600/10 text-blue-600'
                  }`}>
                    {post.platform === 'twitter' ? <Twitter className="w-2.5 h-2.5" /> : <Linkedin className="w-2.5 h-2.5" />}
                    {post.platform === 'twitter' ? 'X' : 'LI'}
                  </span>
                  {post.source.clusterName && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-primary/10 text-primary truncate max-w-[120px]">
                      {post.source.clusterName}
                    </span>
                  )}
                  {post.source.sourceBookmarkTitle && !post.source.clusterName && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/10 text-amber-600 truncate max-w-[140px]" title={post.source.sourceBookmarkTitle}>
                      {post.source.sourceBookmarkTitle}
                    </span>
                  )}
                  {post.source.toneAuthorName && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-violet-500/10 text-violet-600 truncate max-w-[120px]">
                      {post.source.toneAuthorName}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground ml-auto">{formatDate(post.createdAt)}</span>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  {isEditing ? (
                    <div>
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        className="w-full bg-muted border border-border rounded-lg p-3.5 text-sm text-foreground resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition min-h-[140px]"
                        rows={6}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-[11px] font-medium ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
                          {editContent.length} chars{isOverLimit ? ' (over 280 limit)' : ''}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingPostId(null)}
                            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleEditSave(post.id)}
                            disabled={savingId === post.id}
                            className="px-4 py-1.5 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                          >
                            {savingId === post.id ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[15px] text-foreground whitespace-pre-wrap leading-relaxed">{renderMarkdown(post.content)}</p>
                      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                        <span className={`text-[11px] font-medium ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
                          {charCount} chars{isOverLimit ? ' (over 280)' : ''}
                        </span>
                        {post.generation.regenerationCount > 0 && (
                          <span className="text-[11px] text-muted-foreground">
                            Regenerated {post.generation.regenerationCount}x
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                {!isEditing && (
                  <div className="flex items-center gap-1.5 px-5 py-3.5 border-t border-border bg-muted/20">
                    <button
                      onClick={() => {
                        handleCopy(post.content);
                        setCopiedPostId(post.id);
                        setTimeout(() => setCopiedPostId(null), 2000);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                    >
                      {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => { setEditingPostId(post.id); setEditContent(post.content); }}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleRegenerate(post.id)}
                      disabled={isRegenerating}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition disabled:opacity-50"
                    >
                      {isRegenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                      Regenerate
                    </button>
                    <button
                      onClick={() => handleScheduleClick(post.id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Schedule
                    </button>
                    <button
                      onClick={() => { handleDeleteClick(post.id); setSelectedPostId(null); }}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
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
  onDeleteCluster: (clusterId: string, clusterName: string) => void;
  onRenameCluster: (clusterId: string, oldName: string, newName: string) => void;
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
  onDeleteCluster,
  onRenameCluster,
}: SidebarProps) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(userMenuRef, () => setShowUserMenu(false));
  const [editingClusterId, setEditingClusterId] = useState<string | null>(null);
  const [editingClusterName, setEditingClusterName] = useState('');

  return (
    <aside className={`
      fixed lg:relative z-[70] lg:z-0
      w-56 h-full border-r border-border flex flex-col bg-sidebar-background transition-all duration-300 ease-in-out
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Logo Header */}
        <div className="px-3 py-3">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group cursor-pointer">
              <img
                src="/logo-icon.svg"
                alt="PostZaper"
                className="w-6 h-6 rounded-md shadow-sm group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-sm font-black tracking-tight text-foreground">PostZaper</span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Nav */}
        <nav className="flex-1 overflow-y-auto px-2.5 space-y-3 no-scrollbar">
          <div>
            <button
              onClick={() => {
                setActiveFilter('insights');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] font-medium transition-all ${activeFilter === 'insights'
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Overview
            </button>
          </div>

          <div>
            <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest mb-1 px-2">Library</p>
            <div className="space-y-0.5">
              {filters.slice(0, 1).concat(filters.slice(5)).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] font-medium transition-all ${activeFilter === item.id
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest mb-1 px-2">Platforms</p>
            <div className="space-y-0.5">
              {filters.slice(1, 5).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveFilter(item.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] font-medium transition-all ${activeFilter === item.id
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest mb-1 px-2">Studio</p>
            <div className="space-y-0.5">
              {isCreatorTier(user?.subscription) ? (
                <>
                  <button
                    onClick={() => {
                      setActiveFilter('content-studio');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[12px] font-medium transition-all ${activeFilter === 'content-studio'
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className={`w-3.5 h-3.5 ${activeFilter === 'content-studio' ? 'animate-pulse' : ''}`} />
                      Content Studio
                    </div>
                    {activeFilter !== 'content-studio' && (
                      <span className="text-[8px] px-1 py-0.5 bg-primary/10 text-primary rounded font-bold uppercase">AI</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setActiveFilter('content-calendar');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[12px] font-medium transition-all ${activeFilter === 'content-calendar'
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Content Calendar
                    </div>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsUpgradeDialogOpen(true)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[12px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Content Studio
                  </div>
                  <span className="text-[8px] px-1 py-0.5 bg-orange-500/10 text-orange-500 rounded font-bold uppercase">Creator</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-1">
              <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest">Collections</p>
              <Plus
                className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground transition"
                onClick={() => setIsClusterAddOpen(true)}
              />
            </div>
            <div className="space-y-0.5">
              {clusters.map(cluster => (
                editingClusterId === cluster.id ? (
                  <div key={cluster.id} className="flex items-center gap-1.5 px-2 py-1">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cluster.color}`} />
                    <input
                      autoFocus
                      value={editingClusterName}
                      onChange={(e) => setEditingClusterName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const trimmed = editingClusterName.trim();
                          if (trimmed && trimmed !== cluster.name) {
                            onRenameCluster(cluster.id, cluster.name, trimmed);
                          }
                          setEditingClusterId(null);
                        } else if (e.key === 'Escape') {
                          setEditingClusterId(null);
                        }
                      }}
                      onBlur={() => {
                        const trimmed = editingClusterName.trim();
                        if (trimmed && trimmed !== cluster.name) {
                          onRenameCluster(cluster.id, cluster.name, trimmed);
                        }
                        setEditingClusterId(null);
                      }}
                      className="flex-1 min-w-0 text-[12px] font-medium bg-muted border border-border rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ) : (
                  <button
                    key={cluster.id}
                    onClick={() => setActiveFilter(cluster.name)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] font-medium transition-all group ${activeFilter.toLowerCase() === cluster.name.toLowerCase()
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cluster.color}`} />
                    <span className="flex-1 text-left truncate">{cluster.name}</span>
                    <Edit3
                      className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition flex-shrink-0"
                      onClick={(e) => { e.stopPropagation(); setEditingClusterId(cluster.id); setEditingClusterName(cluster.name); }}
                    />
                    <Trash2
                      className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition flex-shrink-0"
                      onClick={(e) => { e.stopPropagation(); onDeleteCluster(cluster.id, cluster.name); }}
                    />
                  </button>
                )
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Section - Fixed */}
      <div className="flex-shrink-0">
        {/* Upgrade CTA */}
        {!hasProAccess(user?.subscription) && (
          <div className="px-3 pb-2">
            <button
              onClick={() => setIsUpgradeDialogOpen(true)}
              className="w-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white p-2.5 rounded-lg shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all group flex items-center justify-center gap-2 hover:shadow-orange-500/40 hover:brightness-110"
            >
              <Crown className="w-3.5 h-3.5 fill-white/20" />
              <span className="text-[10px] font-black uppercase tracking-widest">Upgrade to Pro</span>
            </button>
          </div>
        )}

        {/* User Card */}
        <div className="px-2.5 py-2 border-t border-border bg-sidebar-background transition-colors duration-300">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-card border border-border shadow-sm">
            <div className="flex items-center gap-2 min-w-0 text-left">
              {user?.picture ? (
                <img src={user.picture} alt="" className="w-6 h-6 rounded-full border border-border" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold border border-border text-[10px]">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-[11px] font-semibold truncate">{user?.name || 'User'}</p>
                <p className="text-[9px] text-muted-foreground truncate">{hasProAccess(user?.subscription) ? `${getTierDisplayName(user?.subscription)} Member` : 'Free Plan'}</p>
              </div>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                onClick={toggleTheme}
                className="p-1 hover:bg-muted rounded-md transition text-muted-foreground hover:text-foreground"
                title={isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
              >
                {isDarkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              </button>
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`p-1 hover:bg-muted rounded-md ${showUserMenu ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                >
                  <MoreVertical className="w-3 h-3" />
                </button>

                {showUserMenu && (
                  <>
                    <div className="absolute bottom-full right-0 mb-2 w-44 bg-card rounded-lg shadow-xl border border-border py-1 z-50">
                      <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition"
                      >
                        <Settings className="w-3 h-3" />
                        Settings
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium text-destructive hover:bg-destructive/10 transition"
                      >
                        <LogOut className="w-3 h-3" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
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
  const [viewLayout, setViewLayout] = useState<'masonry' | 'feed'>('masonry');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingBookmarkId, setDeletingBookmarkId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'likes'>('newest');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'extension' | 'web'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'tweet' | 'thread' | 'linkedin' | 'article'>('all');
  const [authorFilter, setAuthorFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAuthorMenu, setShowAuthorMenu] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const numCols = useMasonryColumns();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [isClusterAddOpen, setIsClusterAddOpen] = useState(false);
  const [newClusterName, setNewClusterName] = useState('');
  const [newClusterColor, setNewClusterColor] = useState('bg-blue-500');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showClusterMenu, setShowClusterMenu] = useState(false);
  const [deleteClusterDialog, setDeleteClusterDialog] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });
  const [isDeletingCluster, setIsDeletingCluster] = useState(false);
  const [authorSearch, setAuthorSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');

  const activeCluster = clusters.find(c => c.name.toLowerCase() === activeFilter.toLowerCase());
  const activeFilterLabel = activeCluster ? activeCluster.name : activeFilter;

  const authorMenuRef = useRef<HTMLDivElement>(null);
  const tagMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const clusterMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(authorMenuRef, () => setShowAuthorMenu(false));
  useClickOutside(tagMenuRef, () => setShowTagMenu(false));
  useClickOutside(filterMenuRef, () => setShowFilterMenu(false));
  useClickOutside(clusterMenuRef, () => setShowClusterMenu(false));

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

  // Handle URL upgrade trigger
  useEffect(() => {
    if (searchParams.get('upgrade') === 'true') {
      setIsUpgradeDialogOpen(true);
      // Optional: Clean up URL
      const next = new URLSearchParams(searchParams);
      next.delete('upgrade');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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
      } else if (activeFilter === 'linkedin') {
        options.type = 'linkedin';
      } else if (activeFilter === 'profiles') {
        // For profiles, we need to fetch all types since profiles can be linkedin or twitter
        // We'll filter client-side for isProfile
      } else if (activeFilter === 'article') {
        options.type = 'article';
      } else if (activeFilter === 'thread') {
        options.type = 'thread';
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

  // Tone authors for Zap Wizard (loaded once at page level)
  const [pageToneAuthors, setPageToneAuthors] = useState<ToneAuthor[]>([]);
  useEffect(() => {
    if (!workspaceId) return;
    bookmarkService.getAuthors(workspaceId)
      .then(({ authors }) => setPageToneAuthors(authors))
      .catch(() => {});
  }, [workspaceId]);

  useEffect(() => {
    loadBookmarks();
    loadClusters();
    // Reset filters when main category changes
    setTypeFilter('all');
    setAuthorFilter('all');
    setSourceFilter('all');
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
      b.isProfile === true ||
      b.linkedinData?.isProfile === true ||
      b.linkedinProfileData !== undefined ||
      b.twitterProfileData !== undefined ||
      (b.type === 'twitter' && b.folder === 'profiles');
  };

  const displayBookmarks = useMemo(() => {
    let result = bookmarks.filter(bookmark => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      return (
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.description?.toLowerCase().includes(query) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(query)) ||
        bookmark.url.toLowerCase().includes(query)
      );
    });

    const safelyGetTime = (date?: string) => {
      if (!date) return 0;
      const timestamp = new Date(date).getTime();
      return isNaN(timestamp) ? 0 : timestamp;
    };

    if (activeFilter === 'favorites') {
      result = result.filter(b => b.isFavorite);
    } else if (activeFilter === 'profiles') {
      result = result.filter(isProfile);
    } else if (activeFilter === 'linkedin') {
      result = result.filter(b => !isProfile(b));
    } else if (activeFilter === 'all') {
      // Exclude profiles from the main feed
      result = result.filter(b => !isProfile(b));
    } else {
      // Check if it's a cluster filter
      const cluster = clusters.find(c => c.name.toLowerCase() === activeFilter.toLowerCase());
      if (cluster) {
        const clusterKeyword = cluster.name.toLowerCase();
        result = result.filter(b => {
          // Check if explicitly tagged
          if (b.tags?.includes(cluster.name)) return true;

          // Smart filter: check if content contains cluster name
          const contentToSearch = [
            b.title,
            b.description,
            b.tweetData?.content,
            b.tweetData?.author?.name,
            b.tweetData?.author?.handle,
            b.linkedinData?.content,
            b.linkedinData?.author?.name,
            b.threadData?.content,
            b.threadData?.author?.name,
            b.threadData?.author?.username,
            b.notes,
          ].filter(Boolean).join(' ').toLowerCase();

          return contentToSearch.includes(clusterKeyword);
        });
      }
    }

    // Apply Source Filter
    if (sourceFilter !== 'all') {
      result = result.filter(b => b.source === sourceFilter);
    }

    // Apply Type Filter (Only if activeFilter is 'all')
    if (activeFilter === 'all' && typeFilter !== 'all') {
      result = result.filter(b => b.type === typeFilter);
    }

    // Apply Author Filter
    if (authorFilter !== 'all') {
      result = result.filter(b => {
        const authorName =
          (b.type === 'tweet' && b.tweetData?.author?.name) ||
          (b.type === 'thread' && b.threadData?.author?.name) ||
          (b.type === 'linkedin' && b.linkedinData?.author?.name);
        return authorName === authorFilter;
      });
    }

    // Apply Tag Filter
    if (tagFilter !== 'all') {
      result = result.filter(b => b.tags?.includes(tagFilter));
    }

    // Apply Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'newest') {
        return safelyGetTime(b.createdAt) - safelyGetTime(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return safelyGetTime(a.createdAt) - safelyGetTime(b.createdAt);
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

    return result;
  }, [bookmarks, searchQuery, activeFilter, sourceFilter, typeFilter, authorFilter, tagFilter, sortBy, clusters]);


  // Get available tags for the current view
  const availableTags = useMemo(() => {
    let filtered = bookmarks;
    if (activeFilter === 'favorites') filtered = filtered.filter(b => b.isFavorite);
    else if (activeFilter === 'profiles') filtered = filtered.filter(isProfile);
    else if (activeFilter === 'linkedin') filtered = filtered.filter(b => !isProfile(b));
    else if (activeFilter === 'all') filtered = filtered.filter(b => !isProfile(b));

    // Quick type filter matching the list view
    if (activeFilter === 'all' && typeFilter !== 'all') filtered = filtered.filter(b => b.type === typeFilter);

    const tags = new Set<string>();
    filtered.forEach(b => {
      b.tags?.forEach(t => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [bookmarks, activeFilter, typeFilter]);


  // Get authors before filtering by author to populate the list - Memoized
  const availableAuthors = useMemo(() => {
    // We derive authors from the PARTIALLY filtered list (before author filter is applied)
    // to explicitly allow user to see all available authors for the current "View" (e.g. All Items/Linkedin).
    // However, simpler is just to calculate from 'displayBookmarks' if authorFilter wasn't applied?
    // Actually, standard UI pattern: Filter options should reflect the current dataset *ignoring* that specific filter.

    // For simplicity and speed without deep refactoring, let's just derive from the current filtered set 
    // OR if we want to be perfect, we should derive it from the 'result' just before 'Apply Author Filter' step above.
    // Given the constraints, I will derive it from the fully filtered list to match existing behavior logic visually seen in snippets
    // BUT wait, looking at the original code: 
    // It calculated availableAuthors using 'displayBookmarks' BEFORE 'Apply Author Filter' was run (lines 566 vs 574).
    // So I need to replicate that.

    // To do that inside useMemo, I might need to extract the 'pre-author-filter' list logic.
    // Or I can calculate it separately here efficiently.

    let filtered = bookmarks;
    if (activeFilter === 'favorites') filtered = filtered.filter(b => b.isFavorite);
    else if (activeFilter === 'profiles') filtered = filtered.filter(isProfile);
    else if (activeFilter === 'linkedin') filtered = filtered.filter(b => !isProfile(b));
    else if (activeFilter === 'all') filtered = filtered.filter(b => !isProfile(b));

    // Quick type filter check
    if (activeFilter === 'all' && typeFilter !== 'all') filtered = filtered.filter(b => b.type === typeFilter);

    return Array.from(new Set(filtered.map(b => {
      if (b.type === 'tweet') return b.tweetData?.author?.name;
      if (b.type === 'thread') return b.threadData?.author?.name;
      if (b.type === 'linkedin') return b.linkedinData?.author?.name;
      return null;
    }).filter(Boolean))) as string[];
  }, [bookmarks, activeFilter, typeFilter]);

  const filters = [
    { id: 'all', label: 'All Items', icon: <Library className="w-4 h-4" /> },
    { id: 'profiles', label: 'Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <span className="text-xs font-bold font-sans">In</span> },
    { id: 'tweet', label: 'Twitter / X', icon: <span className="text-xs font-bold font-sans">𝕏</span> },
    { id: 'thread', label: 'Threads', icon: <List className="w-4 h-4" /> },
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

  const handleRenameCluster = async (clusterId: string, oldName: string, newName: string) => {
    try {
      await clusterService.updateCluster(clusterId, { name: newName });
      setClusters(prev => prev.map(c => c.id === clusterId ? { ...c, name: newName } : c));
      // Update bookmarks that had the old cluster tag
      setBookmarks(prev => prev.map(b => ({
        ...b,
        tags: b.tags?.map((t: string) => t === oldName ? newName : t)
      })));
      // If the active filter was the old cluster name, update it
      if (activeFilter.toLowerCase() === oldName.toLowerCase()) {
        setActiveFilter(newName);
      }
      toast.success('Collection renamed');
    } catch {
      toast.error('Failed to rename collection');
    }
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
      toast.success('Collection created');
    } catch (error) {
      toast.error('Failed to create collection');
    }
  };

  const handleDeleteCluster = async () => {
    if (!deleteClusterDialog.id) return;
    setIsDeletingCluster(true);
    try {
      await clusterService.deleteCluster(deleteClusterDialog.id);
      setClusters(prev => prev.filter(c => c.id !== deleteClusterDialog.id));
      if (activeFilter.toLowerCase() === deleteClusterDialog.name.toLowerCase()) {
        setActiveFilter('all');
      }
      setDeleteClusterDialog({ open: false, id: '', name: '' });
      toast.success('Collection deleted');
    } catch {
      toast.error('Failed to delete collection');
    } finally {
      setIsDeletingCluster(false);
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

  const handleAssignSingleBookmarkToCluster = async (bookmarkId: string, clusterName: string) => {
    try {
      const bookmark = bookmarks.find(b => b.id === bookmarkId);
      if (bookmark) {
        const newTags = Array.from(new Set([...(bookmark.tags || []), clusterName]));
        await bookmarkService.updateBookmark(bookmarkId, { tags: newTags });
        setBookmarks(prev => prev.map(b =>
          b.id === bookmarkId ? { ...b, tags: newTags } : b
        ));
        toast.success(`Added to ${clusterName}`);
      }
    } catch (error) {
      toast.error('Failed to add to cluster');
    }
  };

  const handleRemoveClusterFromBookmark = async (bookmarkId: string, clusterName: string) => {
    try {
      const bookmark = bookmarks.find(b => b.id === bookmarkId);
      if (bookmark) {
        const newTags = (bookmark.tags || []).filter(t => t !== clusterName);
        await bookmarkService.updateBookmark(bookmarkId, { tags: newTags });
        setBookmarks(prev => prev.map(b =>
          b.id === bookmarkId ? { ...b, tags: newTags } : b
        ));
        toast.success(`Removed from ${clusterName}`);
      }
    } catch (error) {
      toast.error('Failed to remove from cluster');
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
        description="Your personal dashboard. Save, organize, and generate content from your X & LinkedIn bookmarks."
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
          onDeleteCluster={(id, name) => setDeleteClusterDialog({ open: true, id, name })}
          onRenameCluster={handleRenameCluster}
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
              {!(activeFilter === 'content-studio' || activeFilter === 'content-calendar') && (
                <>
                  <div className="relative group flex-1 sm:flex-none">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                      type="text"
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
                    className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:gap-2 bg-primary text-white text-[11px] font-bold sm:px-4 sm:py-2.5 rounded-full hover:bg-primary/90 shadow-sm shadow-primary/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Capture</span>
                  </button>
                </>
              )}
              <button
                onClick={loadBookmarks}
                disabled={loading}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition"
                title="Refresh Feed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth no-scrollbar">
            <div className="max-w-6xl mx-auto">
              {activeFilter === 'content-studio' ? (
                isCreatorTier(user?.subscription) ? (
                  <ContentStudioView workspaceId={workspaceId!} clusters={clusters} bookmarks={bookmarks} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-black text-foreground mb-2">Content Studio</h2>
                    <p className="text-sm text-muted-foreground mb-6 max-w-md">
                      Generate AI-powered posts from your saved content. Available on the Creator plan.
                    </p>
                    <button
                      onClick={() => setIsUpgradeDialogOpen(true)}
                      className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:brightness-110 transition-all"
                    >
                      Upgrade to Creator
                    </button>
                  </div>
                )
              ) : activeFilter === 'content-calendar' ? (
                isCreatorTier(user?.subscription) ? (
                  <ContentCalendarView workspaceId={workspaceId!} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <h2 className="text-xl font-black text-foreground mb-2">Content Calendar</h2>
                    <p className="text-sm text-muted-foreground mb-6 max-w-md">
                      Schedule and manage your content posts. Available on the Creator plan.
                    </p>
                    <button
                      onClick={() => setIsUpgradeDialogOpen(true)}
                      className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:brightness-110 transition-all"
                    >
                      Upgrade to Creator
                    </button>
                  </div>
                )
              ) : activeFilter === 'insights' ? (
                <AnalyticsOverview bookmarks={bookmarks} />
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                      <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-foreground tracking-tight capitalize">
                        {activeFilter === 'all' ? 'Your Feed' : activeFilterLabel.replace('-', ' ')}
                      </h1>
                      <p className="text-xs lg:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                        Discover and organize your saved {activeFilter === 'all' ? 'content' : activeFilterLabel.replace('-', ' ')}.
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 lg:gap-4 flex-wrap">
                      {/* View Layout Switcher */}
                      <div className="flex bg-muted rounded-lg p-1 border border-border">
                        <button
                          onClick={() => setViewLayout('masonry')}
                          className={`p-1.5 rounded-md transition-all ${viewLayout === 'masonry' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                          title="Masonry Grid"
                        >
                          <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewLayout('feed')}
                          className={`p-1.5 rounded-md transition-all ${viewLayout === 'feed' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                          title="Feed View"
                        >
                          <Rows className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Author Filter Dropdown - Hidden on mobile */}
                      <div className="relative hidden sm:block" ref={authorMenuRef}>
                        <button
                          onClick={() => { setShowAuthorMenu(!showAuthorMenu); setAuthorSearch(''); }}
                          className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${authorFilter !== 'all'
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-muted-foreground hover:bg-muted border border-transparent hover:border-border'
                            }`}
                        >
                          <Users className="w-4 h-4" />
                          <span className="max-w-[80px] sm:max-w-[100px] truncate">{authorFilter === 'all' ? 'People' : authorFilter}</span>
                        </button>

                        {showAuthorMenu && (
                          <>
                            <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl shadow-2xl border border-border py-2 z-50">
                              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Filter by Profile</p>
                              <div className="px-2 pb-1.5">
                                <div className="relative">
                                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                  <input
                                    type="text"
                                    placeholder="Search people..."
                                    value={authorSearch}
                                    onChange={e => setAuthorSearch(e.target.value)}
                                    className="w-full bg-muted border border-border rounded-lg py-1.5 pl-7 pr-2.5 text-[11px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
                                    autoFocus
                                  />
                                </div>
                              </div>
                              <div className="max-h-52 overflow-y-auto no-scrollbar space-y-0.5 px-1.5">
                                <button
                                  onClick={() => { setAuthorFilter('all'); setShowAuthorMenu(false); }}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${authorFilter === 'all' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                >
                                  All Profiles
                                </button>
                                {availableAuthors.sort().filter(a => !authorSearch || a.toLowerCase().includes(authorSearch.toLowerCase())).map(author => (
                                  <button
                                    key={author}
                                    onClick={() => { setAuthorFilter(author); setShowAuthorMenu(false); }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${authorFilter === author ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                  >
                                    {author}
                                  </button>
                                ))}
                                {availableAuthors.filter(a => !authorSearch || a.toLowerCase().includes(authorSearch.toLowerCase())).length === 0 && (
                                  <p className="px-2.5 py-2 text-[10px] text-muted-foreground italic text-center">No profiles found</p>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Tag Filter Dropdown */}
                      <div className="relative" ref={tagMenuRef}>
                        <button
                          onClick={() => { setShowTagMenu(!showTagMenu); setTagSearch(''); }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tagFilter !== 'all'
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-muted-foreground hover:bg-muted border border-transparent hover:border-border'
                            }`}
                        >
                          <Filter className="w-4 h-4" />
                          <span className="max-w-[100px] truncate">{tagFilter === 'all' ? 'Tags' : tagFilter}</span>
                        </button>

                        {showTagMenu && (
                          <>
                            <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl shadow-2xl border border-border py-2 z-50">
                              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Filter by Tag</p>
                              <div className="px-2 pb-1.5">
                                <div className="relative">
                                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                  <input
                                    type="text"
                                    placeholder="Search tags..."
                                    value={tagSearch}
                                    onChange={e => setTagSearch(e.target.value)}
                                    className="w-full bg-muted border border-border rounded-lg py-1.5 pl-7 pr-2.5 text-[11px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/30"
                                    autoFocus
                                  />
                                </div>
                              </div>
                              <div className="max-h-52 overflow-y-auto no-scrollbar space-y-0.5 px-1.5">
                                <button
                                  onClick={() => { setTagFilter('all'); setShowTagMenu(false); }}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${tagFilter === 'all' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                >
                                  All Tags
                                </button>
                                {availableTags.filter(t => !tagSearch || t.toLowerCase().includes(tagSearch.toLowerCase())).map(tag => (
                                  <button
                                    key={tag}
                                    onClick={() => { setTagFilter(tag); setShowTagMenu(false); }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${tagFilter === tag ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                                {availableTags.filter(t => !tagSearch || t.toLowerCase().includes(tagSearch.toLowerCase())).length === 0 && (
                                  <p className="px-2.5 py-2 text-[10px] text-muted-foreground italic text-center">No tags found</p>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Select button - Hidden on mobile */}
                      <button
                        onClick={() => setIsSelectionMode(!isSelectionMode)}
                        className={`hidden sm:flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isSelectionMode
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:bg-muted border border-transparent hover:border-border'
                          }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSelectionMode ? 'Cancel' : 'Select'}</span>
                      </button>
                      <div className="relative" ref={filterMenuRef}>
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

                              {/* Content Type Filter (Only shown in All Items) */}
                              {/* This section is removed from here and moved to a separate filter bar */}

                              {/* Author Filter */}
                              {/* This section is removed from here and moved to a separate filter bar */}
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
                                        // Don't close menu
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

                  {/* Content Type Filter Bar */}
                  {activeFilter === 'all' && (
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'tweet', label: 'Tweets' },
                        { id: 'thread', label: 'Threads' },
                        { id: 'linkedin', label: 'LinkedIn' },
                        { id: 'article', label: 'Articles' }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setTypeFilter(type.id as any)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border whitespace-nowrap ${typeFilter === type.id
                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                            : 'bg-card text-muted-foreground hover:bg-muted border-border hover:border-primary/20 hover:text-foreground'
                            }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {loading ? (
                    activeFilter === 'profiles' ? (
                      <ProfileTableSkeleton count={8} />
                    ) : (
                      <BookmarkGridSkeleton count={12} layout={viewLayout === 'feed' ? 'feed' : 'masonry'} />
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
                          href="https://chromewebstore.google.com/detail/ecfbdcdbijkebgkjjdolbnapnkdpfoid"
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
                    <div className={`
                      ${viewLayout === 'feed' ? 'max-w-2xl mx-auto flex flex-col gap-6' : 'flex gap-4 lg:gap-6 items-start'}
                    `}>
                      {viewLayout === 'feed' ? (
                        /* Feed View - Single Column Direct Map */
                        displayBookmarks.map(bookmark => (
                          <div key={bookmark.id} className="relative group/card w-full">
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
                              className={`transition-all duration-300 w-full ${selectedIds.has(bookmark.id) ? 'scale-[0.98] ring-2 ring-primary ring-offset-4 rounded-xl' : ''
                                }`}
                            >
                              <BookmarkCard
                                bookmark={bookmark}
                                clusters={clusters}
                                onToggleFavorite={handleToggleFavorite}
                                onDelete={handleDeleteClick}
                                onAssignCluster={handleAssignSingleBookmarkToCluster}
                                onRemoveCluster={handleRemoveClusterFromBookmark}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        /* Masonry View */
                        Array.from({ length: numCols }).map((_, colIndex) => (
                          <div key={colIndex} className="flex flex-col gap-4 lg:gap-6 flex-1 min-w-0">
                            {displayBookmarks
                              .filter((_, index) => index % numCols === colIndex)
                              .map((bookmark) => (
                                <div key={bookmark.id} className="relative group/card w-full">
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
                                    className={`transition-all duration-300 w-full ${selectedIds.has(bookmark.id) ? 'scale-[0.98] ring-2 ring-primary ring-offset-4 rounded-xl' : ''
                                      }`}
                                  >
                                    <BookmarkCard
                                      bookmark={bookmark}
                                      clusters={clusters}
                                      onToggleFavorite={handleToggleFavorite}
                                      onDelete={handleDeleteClick}
                                      onAssignCluster={handleAssignSingleBookmarkToCluster}
                                      onRemoveCluster={handleRemoveClusterFromBookmark}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div >

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
                    <div className="relative" ref={clusterMenuRef}>
                      <button
                        onClick={() => setShowClusterMenu(!showClusterMenu)}
                        className={`p-2.5 lg:px-4 lg:py-2.5 rounded-xl text-[11px] font-bold flex items-center gap-2 transition border ${showClusterMenu ? 'bg-white text-slate-900 border-white' : 'bg-white/10 hover:bg-white/20 text-white border-white/5'
                          }`}
                      >
                        <FolderPlus className={`w-4 h-4 ${showClusterMenu ? 'text-primary' : 'text-blue-400'}`} />
                        <span className="hidden sm:inline">Collection</span>
                      </button>

                      {showClusterMenu && (
                        <div className="absolute bottom-full mb-3 right-0 w-48 bg-card border border-border rounded-2xl shadow-2xl p-2 z-[60] overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 py-2 border-b border-border/50 mb-1">Select Collection</p>
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
                              <p className="px-3 py-4 text-[11px] text-muted-foreground text-center italic">No collections yet</p>
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
                <h2 className="text-xl font-black text-foreground tracking-tight">Create New Collection</h2>
                <p className="text-sm text-muted-foreground font-medium mt-1">Organize your saved content into topic-based collections.</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-foreground/70 ml-1">Collection Name</label>
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
                  Create Collection
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

        <ConfirmDialog
          open={deleteClusterDialog.open}
          onOpenChange={(open) => { if (!open) setDeleteClusterDialog({ open: false, id: '', name: '' }); }}
          title={`Delete "${deleteClusterDialog.name}" collection`}
          description="This will permanently delete this collection. Bookmarks in this collection will not be deleted."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleDeleteCluster}
          variant="destructive"
          loading={isDeletingCluster}
        />

        {hasProAccess(user?.subscription) && !isCreatorTier(user?.subscription) ? (
          <CreatorUpgradeDialog
            isOpen={isUpgradeDialogOpen}
            onClose={() => setIsUpgradeDialogOpen(false)}
          />
        ) : (
          <UpgradeDialog
            isOpen={isUpgradeDialogOpen}
            onClose={() => setIsUpgradeDialogOpen(false)}
          />
        )}

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
          workspaceId={workspaceId || undefined}
          toneAuthors={pageToneAuthors}
        />
      </div >
    </>
  );
}
