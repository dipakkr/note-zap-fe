import { useState } from 'react';
import { Star, Trash2, ExternalLink, MessageCircle, Repeat2, Heart, MoreHorizontal, Play, List } from 'lucide-react';
import type { Bookmark } from '../services/bookmarkService';
import { formatDistanceToNow } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

interface MediaItem {
  type: 'image' | 'video' | 'gif';
  url: string;
  alt?: string;
  poster?: string;
  videoUrl?: string;
  src?: string;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  clusters: any[]; // User clusters to match tags against
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BookmarkCard({ bookmark, clusters = [], onToggleFavorite, onDelete }: BookmarkCardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imageError, setImageError] = useState<Set<string>>(new Set());

  const isProfileType = () => {
    return bookmark.tags?.includes('profile') ||
      bookmark.linkedinData?.isProfile === true ||
      bookmark.linkedinProfileData !== undefined;
  };

  const getAuthorInfo = () => {
    if (bookmark.type === 'tweet' && bookmark.tweetData?.author) {
      return {
        name: bookmark.tweetData.author.name || 'Unknown',
        handle: bookmark.tweetData.author.handle ? `@${bookmark.tweetData.author.handle}` : '',
        avatar: bookmark.tweetData.author.avatar,
      };
    }
    if (bookmark.type === 'linkedin' && bookmark.linkedinData?.author) {
      return {
        name: bookmark.linkedinData.author.name || 'Unknown',
        handle: bookmark.linkedinData.author.headline || '',
        avatar: bookmark.linkedinData.author.avatar,
      };
    }
    if (bookmark.type === 'thread' && bookmark.threadData?.author) {
      return {
        name: bookmark.threadData.author.name || 'Unknown',
        handle: bookmark.threadData.author.username ? `@${bookmark.threadData.author.username}` : '',
        avatar: bookmark.threadData.author.avatar,
      };
    }
    try {
      const url = new URL(bookmark.url);
      return {
        name: url.hostname.replace('www.', ''),
        handle: '',
        avatar: bookmark.favicon,
      };
    } catch {
      return { name: 'Article', handle: '', avatar: null };
    }
  };

  const getContent = () => {
    if (bookmark.type === 'tweet' && bookmark.tweetData?.content) {
      return bookmark.tweetData.content;
    }
    if (bookmark.type === 'linkedin' && bookmark.linkedinData?.content) {
      return bookmark.linkedinData.content;
    }
    if (bookmark.type === 'thread' && bookmark.threadData?.content) {
      return bookmark.threadData.content;
    }
    return bookmark.description || bookmark.title;
  };

  const getEngagementStats = () => {
    if (bookmark.type === 'tweet' && bookmark.tweetData?.stats) {
      return {
        comments: bookmark.tweetData.stats.replies || 0,
        reposts: bookmark.tweetData.stats.retweets || 0,
        likes: bookmark.tweetData.stats.likes || 0,
      };
    }
    if (bookmark.type === 'linkedin' && bookmark.linkedinData?.stats) {
      return {
        comments: bookmark.linkedinData.stats.comments || 0,
        reposts: bookmark.linkedinData.stats.reposts || 0,
        likes: bookmark.linkedinData.stats.likes || 0,
      };
    }
    if (bookmark.type === 'thread' && bookmark.threadData?.stats) {
      return {
        comments: bookmark.threadData.stats.replies || 0,
        reposts: bookmark.threadData.stats.retweets || 0,
        likes: bookmark.threadData.stats.likes || 0,
      };
    }
    return null;
  };

  const getMedia = (): MediaItem[] => {
    if (bookmark.type === 'tweet' && bookmark.tweetData) {
      const images = bookmark.tweetData.images || [];
      const media = bookmark.tweetData.media || [];
      const allMedia: MediaItem[] = [];
      const seenUrls = new Set<string>();

      [...images, ...media].forEach((item: MediaItem) => {
        const url = item.url || item.poster || '';
        if (url && !seenUrls.has(url) && !url.startsWith('blob:')) {
          seenUrls.add(url);
          allMedia.push(item);
        }
      });
      return allMedia;
    }
    if (bookmark.type === 'thread' && bookmark.threadData) {
      const images = bookmark.threadData.images || [];
      const media = bookmark.threadData.media || [];
      const allMedia: MediaItem[] = [];
      const seenUrls = new Set<string>();

      [...images, ...media].forEach((item: MediaItem) => {
        const url = item.url || item.poster || '';
        if (url && !seenUrls.has(url) && !url.startsWith('blob:')) {
          seenUrls.add(url);
          allMedia.push(item);
        }
      });
      return allMedia;
    }
    if (bookmark.type === 'linkedin' && bookmark.linkedinData?.media) {
      return bookmark.linkedinData.media;
    }
    return [];
  };

  const handleImageError = (url: string) => {
    setImageError(prev => new Set(prev).add(url));
  };

  const author = getAuthorInfo();
  const content = getContent();
  const stats = getEngagementStats();
  const media = getMedia();
  const timeAgo = formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: false });

  const isLongContent = content && content.length > 280;
  const displayContent = showMore ? content : content?.slice(0, 280);
  const validMedia = media.filter(m => !imageError.has(m.url || m.poster || ''));

  const getTypeInfo = () => {
    if (isProfileType()) return { label: 'Profile', color: 'bg-primary/10 text-primary' };
    if (bookmark.type === 'tweet') return { label: 'Tweet', color: 'bg-blue-500/10 text-blue-500' };
    if (bookmark.type === 'linkedin') return { label: 'LinkedIn Post', color: 'bg-indigo-500/10 text-indigo-500' };
    if (bookmark.type === 'article') return { label: 'Web Article', color: 'bg-emerald-500/10 text-emerald-500' };
    if (bookmark.type === 'thread') return { label: 'Thread', color: 'bg-purple-500/10 text-purple-500' };
    return { label: 'Website', color: 'bg-amber-500/10 text-amber-500' };
  };

  const typeInfo = getTypeInfo();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }

    if (isProfileType() || bookmark.type === 'tweet' || bookmark.type === 'linkedin' || bookmark.type === 'thread') {
      const next = new URLSearchParams(searchParams);
      next.set('detailId', bookmark.id);
      setSearchParams(next);
    } else {
      window.open(bookmark.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-card cursor-pointer rounded-xl border border-border p-5 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group active:scale-[0.99]"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-black overflow-hidden flex-shrink-0 shadow-sm">
          {author.avatar ? (
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg">{author.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground truncate">{author.name}</span>
            {bookmark.type === 'tweet' && (
              <span className="text-primary">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </span>
            )}
            {bookmark.type === 'thread' && (
              <span className="text-purple-500">
                <List className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground truncate font-medium">{author.handle}</p>
        </div>

        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg opacity-0 group-hover:opacity-100 transition duration-200"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} />
              <div className="absolute right-0 top-8 bg-card rounded-xl shadow-2xl border border-border py-1.5 z-20 w-44">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
                  onClick={(e) => { e.stopPropagation(); setShowMenu(false); }}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  Open original
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(bookmark.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
                >
                  <Star className={`w-3.5 h-3.5 ${bookmark.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                  {bookmark.isFavorite ? 'Unfavorite' : 'Add to favorites'}
                </button>
                <div className="h-px bg-border my-1" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(bookmark.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-4">
        {bookmark.type === 'article' && bookmark.title && (
          <h3 className="font-bold text-foreground mb-2 line-clamp-2 text-sm leading-snug">{bookmark.title}</h3>
        )}
        <p className="text-foreground/70 text-[14px] leading-relaxed whitespace-pre-wrap font-medium">
          {displayContent}
          {isLongContent && !showMore && '...'}
        </p>
        {isLongContent && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}
            className="text-primary text-xs font-bold mt-2 hover:underline decoration-2 underline-offset-4"
          >
            {showMore ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {validMedia.length > 0 && (
        <div className="block mb-5 rounded-xl overflow-hidden border border-border bg-muted/20">
          {validMedia.length === 1 ? (
            <div className="relative group/media">
              <img
                src={validMedia[0].url || validMedia[0].poster || ''}
                alt={validMedia[0].alt || ''}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                onError={() => handleImageError(validMedia[0].url || validMedia[0].poster || '')}
              />
              {(validMedia[0].type === 'video' || validMedia[0].type === 'gif') && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/media:bg-black/40 transition-colors">
                  <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-xl transform group-hover/media:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-slate-900 ml-0.5 fill-current" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`grid ${validMedia.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'} gap-0.5 h-48`}>
              {validMedia.slice(0, 4).map((item, idx) => (
                <div key={idx} className="relative h-full overflow-hidden">
                  <img
                    src={item.url || item.poster || ''}
                    alt={item.alt || ''}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(item.url || item.poster || '')}
                  />
                  {idx === 3 && validMedia.length > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                      <span className="text-white font-black text-sm">+{validMedia.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {stats && (
        <div className="flex items-center gap-5 mb-5 text-muted-foreground text-[12px] font-bold">
          <span className="flex items-center gap-1.5 hover:text-foreground transition cursor-pointer">
            <MessageCircle className="w-3.5 h-3.5" />
            {stats.comments}
          </span>
          <span className="flex items-center gap-1.5 hover:text-emerald-500 transition cursor-pointer">
            <Repeat2 className="w-3.5 h-3.5" />
            {stats.reposts}
          </span>
          <span className="flex items-center gap-1.5 hover:text-rose-500 transition cursor-pointer">
            <Heart className="w-3.5 h-3.5" />
            {stats.likes}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-2">
          <div className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${typeInfo.color} shadow-sm border border-transparent`}>
            {typeInfo.label}
          </div>

          {/* Cluster Tags */}
          {bookmark.tags?.map(tag => {
            const cluster = clusters.find(c => c.name === tag);
            if (!cluster) return null;
            return (
              <button
                key={cluster.id}
                onClick={(e) => {
                  e.stopPropagation();
                  const next = new URLSearchParams(searchParams);
                  next.set('type', cluster.name);
                  setSearchParams(next);
                }}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-bold border border-transparent hover:border-border transition-all group/tag ${cluster.color.replace('bg-', 'bg-opacity-10 text-').replace('500', '600')} dark:${cluster.color.replace('bg-', 'bg-opacity-20 text-').replace('500', '400')} bg-current/10`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${cluster.color}`} />
                {cluster.name}
              </button>
            );
          })}

          <span className="text-[10px] text-muted-foreground font-bold">{timeAgo} ago</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(bookmark.id); }}
            className={`p-1.5 rounded-lg hover:bg-muted transition-colors ${bookmark.isFavorite ? 'text-amber-400' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Star className={`w-3.5 h-3.5 ${bookmark.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(bookmark.id); }}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
            title="Delete bookmark"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
