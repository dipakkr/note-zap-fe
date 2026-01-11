import { Dialog, DialogContent } from './ui/dialog';
import { useState } from 'react';
import type { Bookmark } from '../services/bookmarkService';
import { MessageCircle, Repeat2, Heart, X, Zap, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import CreatorUpgradeDialog from './CreatorUpgradeDialog';

interface PostDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    bookmark: Bookmark | null;
}

export default function PostDetailDialog({ isOpen, onClose, bookmark }: PostDetailDialogProps) {
    const [showCreatorUpgrade, setShowCreatorUpgrade] = useState(false);

    if (!bookmark) return null;

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
        return { name: 'Unknown', handle: '', avatar: null };
    };

    const getContent = () => {
        if (bookmark.type === 'tweet' && bookmark.tweetData?.content) return bookmark.tweetData.content;
        if (bookmark.type === 'linkedin' && bookmark.linkedinData?.content) return bookmark.linkedinData.content;
        return bookmark.description || bookmark.title;
    };

    const getStats = () => {
        if (bookmark.type === 'tweet' && bookmark.tweetData?.stats) {
            return {
                replies: bookmark.tweetData.stats.replies || 0,
                retweets: bookmark.tweetData.stats.retweets || 0,
                likes: bookmark.tweetData.stats.likes || 0,
            };
        }
        if (bookmark.type === 'linkedin' && bookmark.linkedinData?.stats) {
            return {
                replies: bookmark.linkedinData.stats.comments || 0,
                retweets: bookmark.linkedinData.stats.reposts || 0,
                likes: bookmark.linkedinData.stats.likes || 0,
            };
        }
        return null;
    };

    const getMedia = () => {
        if (bookmark.type === 'tweet' && bookmark.tweetData) {
            return [...(bookmark.tweetData.images || []), ...(bookmark.tweetData.media || [])];
        }
        if (bookmark.type === 'linkedin' && bookmark.linkedinData?.media) {
            return bookmark.linkedinData.media;
        }
        return [];
    };

    const author = getAuthorInfo();
    const content = getContent();
    const stats = getStats();
    const media = getMedia();
    const createdAt = new Date(bookmark.createdAt);
    const formattedDate = format(createdAt, 'h:mm a · MMM d, yyyy');

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-xl border-border bg-card shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col h-full max-h-[90vh]">
                    {/* Native Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-card/80 backdrop-blur-md z-10">
                        <h3 className="font-bold text-[15px]">{bookmark.type === 'tweet' ? 'Tweet' : 'Post'}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-muted rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 sm:p-5 scroll-smooth no-scrollbar">
                        {/* Author Section */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-11 h-11 rounded-full overflow-hidden bg-muted flex-shrink-0">
                                {author.avatar ? (
                                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-primary/10">
                                        {author.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-bold text-[14px] text-foreground truncate leading-tight">{author.name}</h4>
                                <p className="text-[13px] text-muted-foreground truncate leading-tight font-normal">{author.handle}</p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-4">
                            <p className="text-[15px] leading-[1.6] font-normal text-foreground whitespace-pre-wrap">
                                {content}
                            </p>

                            {media.length > 0 && (
                                <div className="rounded-xl overflow-hidden border border-border">
                                    {media.map((item: any, idx: number) => (
                                        <img
                                            key={idx}
                                            src={item.url || item.poster || item.src}
                                            alt=""
                                            className="w-full h-auto object-cover border-b last:border-b-0 border-border"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Timestamp */}
                            <div className="py-4 border-b border-border">
                                <span className="text-[14px] text-muted-foreground font-normal">
                                    {formattedDate}
                                </span>
                            </div>

                            {/* Engagement Stats Row */}
                            {stats && (
                                <div className="py-3 border-b border-border flex items-center gap-5">
                                    <div className="flex items-center gap-1.5 text-[14px] hover:underline cursor-pointer">
                                        <span className="font-bold text-foreground">{stats.retweets}</span>
                                        <span className="text-muted-foreground font-normal">{bookmark.type === 'tweet' ? 'Retweets' : 'Reposts'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[14px] hover:underline cursor-pointer">
                                        <span className="font-bold text-foreground">{stats.likes}</span>
                                        <span className="text-muted-foreground font-normal">Likes</span>
                                    </div>
                                </div>
                            )}

                            {/* Icon Action Row */}
                            <div className="py-3 flex items-center justify-between px-6 text-muted-foreground border-t border-border mt-2">
                                <button className="group flex items-center gap-1.5 hover:text-primary transition-colors">
                                    <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-medium">{stats?.replies || 0}</span>
                                </button>
                                <button className="group flex items-center gap-1.5 hover:text-emerald-500 transition-colors">
                                    <div className="p-2 rounded-full group-hover:bg-emerald-500/10 transition-colors">
                                        <Repeat2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-medium">{stats?.retweets || 0}</span>
                                </button>
                                <button className="group flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                                    <div className="p-2 rounded-full group-hover:bg-rose-500/10 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-medium">{stats?.likes || 0}</span>
                                </button>

                                {/* Remix Button - Centered Vertical Alignment */}
                                <button
                                    onClick={() => setShowCreatorUpgrade(true)}
                                    className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:scale-110"
                                    title="Remix with AI"
                                >
                                    <Zap className="w-5 h-5 fill-current" />
                                </button>

                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                                    title="View Original"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>

            <CreatorUpgradeDialog
                isOpen={showCreatorUpgrade}
                onClose={() => setShowCreatorUpgrade(false)}
            />
        </Dialog>
    );
}
