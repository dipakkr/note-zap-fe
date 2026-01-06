import { useState } from 'react';
import { Star, Trash2, ExternalLink, MessageCircle, Repeat2, Heart, MoreHorizontal, Play } from 'lucide-react';
import type { Bookmark } from '../services/bookmarkService';
import { formatDistanceToNow } from 'date-fns';
import { useTheme } from '../contexts/ThemeContext';

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
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BookmarkCard({ bookmark, onToggleFavorite, onDelete }: BookmarkCardProps) {
  const { theme } = useTheme();
  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [imageError, setImageError] = useState<Set<string>>(new Set());

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
    // For articles, extract domain
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
    return null;
  };

  const getSourceLabel = () => {
    switch (bookmark.type) {
      case 'tweet':
        return { text: 'Saved from Twitter', icon: '𝕏', color: 'text-gray-600' };
      case 'linkedin':
        return { text: 'Saved from LinkedIn', icon: '🔗', color: 'text-blue-600' };
      case 'article':
        return { text: 'Saved from Web', icon: '🌐', color: 'text-green-600' };
      default:
        return { text: 'Saved', icon: '📌', color: 'text-gray-600' };
    }
  };

  // Get media (images/videos) from tweet or linkedin data
  const getMedia = (): MediaItem[] => {
    if (bookmark.type === 'tweet' && bookmark.tweetData) {
      // Prefer images array, fall back to media array
      const images = bookmark.tweetData.images || [];
      const media = bookmark.tweetData.media || [];

      // Combine and deduplicate
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
  const source = getSourceLabel();
  const media = getMedia();
  const timeAgo = formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: false });

  const isLongContent = content && content.length > 280;
  const displayContent = showMore ? content : content?.slice(0, 280);

  // Filter out images that failed to load
  const validMedia = media.filter(m => !imageError.has(m.url || m.poster || ''));

  return (
    <div className={`rounded-xl p-5 transition-all duration-200 group ${theme === 'dark' ? 'bg-gray-800/50 ring-1 ring-gray-700/30 hover:ring-gray-600/50 hover:shadow-xl hover:shadow-black/20' : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg'}`}>
      {/* Author Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium overflow-hidden flex-shrink-0">
          {author.avatar ? (
            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg">{author.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{author.name}</span>
            {bookmark.type === 'tweet' && (
              <span className="text-blue-500">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </span>
            )}
          </div>
          <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{author.handle}</p>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition ${theme === 'dark' ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className={`absolute right-0 top-8 rounded-lg shadow-lg py-1 z-20 w-40 ${theme === 'dark' ? 'bg-gray-800 ring-1 ring-gray-700/30' : 'bg-white border border-gray-100'}`}>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setShowMenu(false)}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open original
                </a>
                <button
                  onClick={() => {
                    onToggleFavorite(bookmark.id);
                    setShowMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Star className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  {bookmark.isFavorite ? 'Unfavorite' : 'Add to favorites'}
                </button>
                <button
                  onClick={() => {
                    onDelete(bookmark.id);
                    setShowMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm ${theme === 'dark' ? 'text-red-400 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-50'}`}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {bookmark.type === 'article' && bookmark.title && (
          <h3 className={`font-semibold mb-2 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{bookmark.title}</h3>
        )}
        <p className={`text-[15px] leading-relaxed whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
          {displayContent}
          {isLongContent && !showMore && '...'}
        </p>
        {isLongContent && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-indigo-500 text-sm font-medium mt-1 hover:underline"
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Media Grid for tweets/linkedin */}
      {validMedia.length > 0 && (
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`block mb-4 rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900 ring-1 ring-gray-700/30' : 'border border-gray-100'}`}
        >
          {validMedia.length === 1 ? (
            // Single image
            <div className="relative">
              <img
                src={validMedia[0].url || validMedia[0].poster || ''}
                alt={validMedia[0].alt || ''}
                className="w-full h-48 object-cover hover:opacity-95 transition"
                onError={() => handleImageError(validMedia[0].url || validMedia[0].poster || '')}
              />
              {(validMedia[0].type === 'video' || validMedia[0].type === 'gif') && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          ) : validMedia.length === 2 ? (
            // Two images side by side
            <div className="grid grid-cols-2 gap-0.5">
              {validMedia.slice(0, 2).map((item, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={item.url || item.poster || ''}
                    alt={item.alt || ''}
                    className="w-full h-32 object-cover hover:opacity-95 transition"
                    onError={() => handleImageError(item.url || item.poster || '')}
                  />
                  {(item.type === 'video' || item.type === 'gif') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : validMedia.length === 3 ? (
            // Three images - one large, two small
            <div className="grid grid-cols-2 gap-0.5">
              <div className="row-span-2 relative">
                <img
                  src={validMedia[0].url || validMedia[0].poster || ''}
                  alt={validMedia[0].alt || ''}
                  className="w-full h-full object-cover hover:opacity-95 transition"
                  style={{ minHeight: '160px' }}
                  onError={() => handleImageError(validMedia[0].url || validMedia[0].poster || '')}
                />
              </div>
              {validMedia.slice(1, 3).map((item, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={item.url || item.poster || ''}
                    alt={item.alt || ''}
                    className="w-full h-20 object-cover hover:opacity-95 transition"
                    onError={() => handleImageError(item.url || item.poster || '')}
                  />
                </div>
              ))}
            </div>
          ) : validMedia.length >= 4 ? (
            // Four images grid
            <div className="grid grid-cols-2 gap-0.5">
              {validMedia.slice(0, 4).map((item, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={item.url || item.poster || ''}
                    alt={item.alt || ''}
                    className="w-full h-24 object-cover hover:opacity-95 transition"
                    onError={() => handleImageError(item.url || item.poster || '')}
                  />
                  {idx === 3 && validMedia.length > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="text-white font-semibold text-lg">+{validMedia.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </a>
      )}

      {/* Thumbnail for articles (fallback) */}
      {bookmark.type === 'article' && bookmark.thumbnail && validMedia.length === 0 && (
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`block mb-4 rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900 ring-1 ring-gray-700/30' : 'border border-gray-100'}`}
        >
          <img
            src={bookmark.thumbnail}
            alt={bookmark.title}
            className="w-full h-40 object-cover hover:opacity-95 transition"
          />
        </a>
      )}

      {/* Engagement Stats */}
      {stats && (
        <div className={`flex items-center gap-6 mb-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" />
            {stats.comments}
          </span>
          <span className="flex items-center gap-1.5">
            <Repeat2 className="w-4 h-4" />
            {stats.reposts}
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-4 h-4" />
            {stats.likes}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className={`flex items-center justify-between pt-3 border-t ${theme === 'dark' ? 'border-gray-700/30' : 'border-gray-100'}`}>
        <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>{source.icon}</span>
          <span>{source.text}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{timeAgo} ago</span>
          {bookmark.isFavorite && (
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          )}
        </div>
      </div>
    </div>
  );
}
