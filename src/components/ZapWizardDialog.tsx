import { Dialog, DialogContent } from './ui/dialog';
import { useState, useEffect } from 'react';
import type { Bookmark, GeneratedPost, ToneAuthor } from '../services/bookmarkService';
import { contentStudioService } from '../services/bookmarkService';
import AuthorPickerDropdown from './AuthorPickerDropdown';
import { Zap, Loader2, Copy, Check, Twitter, Linkedin, ChevronLeft, RefreshCw, Clock, ChevronRight, Sparkles, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ZapWizardDialogProps {
    isOpen: boolean;
    onClose: () => void;
    bookmark: Bookmark | null;
    workspaceId?: string;
    toneAuthors?: ToneAuthor[];
    onUpgradeRequired?: () => void;
}

type WizardStep = 'select-platform' | 'generating' | 'post-ready';

export default function ZapWizardDialog({ isOpen, onClose, bookmark, workspaceId, toneAuthors = [], onUpgradeRequired }: ZapWizardDialogProps) {
    const [step, setStep] = useState<WizardStep>('select-platform');
    const [platform, setPlatform] = useState<'twitter' | 'linkedin'>('twitter');
    const [generatedPost, setGeneratedPost] = useState<string | null>(null);
    const [generatedPostId, setGeneratedPostId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [hasCopiedOnce, setHasCopiedOnce] = useState(false); // persists for share nudge
    const [history, setHistory] = useState<GeneratedPost[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
    const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);
    const [selectedToneAuthorKey, setSelectedToneAuthorKey] = useState<string | null>(null);
    const [includeAttribution, setIncludeAttribution] = useState(true);
    const [copiedLink, setCopiedLink] = useState(false);

    // Auto-detect platform and auto-select matching tone author
    useEffect(() => {
        if (!bookmark || !isOpen) return;

        if (bookmark.type === 'linkedin') {
            setPlatform('linkedin');
        } else {
            setPlatform('twitter');
        }

        if (toneAuthors.length > 0) {
            let authorName = '';
            let authorUsername = '';

            if (bookmark.type === 'tweet' && bookmark.tweetData?.author) {
                authorName = bookmark.tweetData.author.name || '';
                authorUsername = bookmark.tweetData.author.username || bookmark.tweetData.author.handle || '';
            } else if (bookmark.type === 'linkedin' && bookmark.linkedinData?.author) {
                authorName = bookmark.linkedinData.author.name || '';
            } else if (bookmark.type === 'thread' && bookmark.threadData?.tweets?.[0]?.author) {
                authorName = bookmark.threadData.tweets[0].author.name || '';
                authorUsername = bookmark.threadData.tweets[0].author.username || '';
            }

            if (authorName) {
                const key = authorName + '||' + authorUsername;
                const exact = toneAuthors.find(a => a.authorKey === key);
                if (exact) {
                    setSelectedToneAuthorKey(exact.authorKey);
                } else {
                    const nameMatch = toneAuthors.find(a => a.name.toLowerCase() === authorName.toLowerCase());
                    if (nameMatch) setSelectedToneAuthorKey(nameMatch.authorKey);
                }
            }
        }
    }, [bookmark, isOpen, toneAuthors]);

    // Load history
    useEffect(() => {
        if (!bookmark || !workspaceId || !isOpen) return;
        contentStudioService.getPosts(workspaceId, { bookmarkId: bookmark.id, limit: 10 })
            .then(res => setHistory(res.posts))
            .catch(() => {});
    }, [bookmark, workspaceId, isOpen]);

    const resetWizard = () => {
        setStep('select-platform');
        setGeneratedPost(null);
        setGeneratedPostId(null);
        setCopied(false);
        setCopiedLink(false);
        setHasCopiedOnce(false);
        setShowHistory(false);
        setExpandedHistoryId(null);
        setSelectedToneAuthorKey(null);
    };

    const handleShareOnTwitter = () => {
        const zapUrl = `${window.location.origin}/z/${generatedPostId}`;
        const text = `Just generated this post in seconds with @PostZaper ⚡\n\n${zapUrl}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleCopyZapLink = async () => {
        const zapUrl = `${window.location.origin}/z/${generatedPostId}`;
        await navigator.clipboard.writeText(zapUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        toast.success('Link copied!');
    };

    const handleClose = () => {
        resetWizard();
        onClose();
    };

    const getBookmarkPreview = () => {
        if (!bookmark) return '';
        if (bookmark.type === 'tweet' && bookmark.tweetData?.content) return bookmark.tweetData.content;
        if (bookmark.type === 'linkedin' && bookmark.linkedinData?.content) return bookmark.linkedinData.content;
        if (bookmark.type === 'thread' && bookmark.threadData?.content) return bookmark.threadData.content;
        return bookmark.description || bookmark.title || '';
    };

    // Single-click generation — no intermediate hook step
    const handleZap = async () => {
        if (!bookmark || !workspaceId) return;
        setStep('generating');
        try {
            const response = await contentStudioService.generate({
                workspaceId,
                bookmarkIds: [bookmark.id],
                platform,
                contentType: 'post',
                toneAuthorKey: selectedToneAuthorKey || undefined,
            });
            if (response.posts.length > 0) {
                setGeneratedPost(response.posts[0].content);
                setGeneratedPostId(response.posts[0].id);
                setHistory(prev => [response.posts[0], ...prev]);
            }
            setStep('post-ready');
        } catch (error: any) {
            if (error?.status === 403) {
                handleClose();
                onUpgradeRequired?.();
                return;
            }
            const message = error?.data?.error || error?.data?.message || error?.message || 'Failed to generate post';
            toast.error(message);
            setStep('select-platform');
        }
    };

    const handleDifferentAngle = async () => {
        if (!generatedPostId) return;
        setStep('generating');
        try {
            const response = await contentStudioService.regeneratePost(generatedPostId);
            setGeneratedPost(response.post.content);
            setHistory(prev => prev.map(p => p.id === generatedPostId ? response.post : p));
            setStep('post-ready');
        } catch (error: any) {
            if (error?.status === 403) {
                handleClose();
                onUpgradeRequired?.();
                return;
            }
            toast.error('Failed to regenerate');
            setStep('post-ready');
        }
    };

    const handleCopy = async (text: string, setFn?: (v: boolean) => void) => {
        try {
            const textToCopy = includeAttribution ? `${text}\n\n— Made with PostZaper` : text;
            await navigator.clipboard.writeText(textToCopy);
            if (setFn) {
                setFn(true);
                setHasCopiedOnce(true); // persists so share nudge stays visible
                setTimeout(() => setFn(false), 2000);
            }
            toast.success('Copied to clipboard');
        } catch {
            toast.error('Failed to copy');
        }
    };

    const formatTimeAgo = (dateStr: string) => {
        const d = new Date(dateStr);
        const diffMs = Date.now() - d.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHrs = Math.floor(diffMins / 60);
        if (diffHrs < 24) return `${diffHrs}h ago`;
        const diffDays = Math.floor(diffHrs / 24);
        return diffDays < 7 ? `${diffDays}d ago` : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (!bookmark) return null;

    const preview = getBookmarkPreview();
    const charCount = generatedPost?.length || 0;
    const isOverLimit = platform === 'twitter' && charCount > 280;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-xl border-border bg-card shadow-2xl">
                <div className="flex flex-col max-h-[85vh]">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-primary fill-primary/20" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-foreground leading-tight">Zap to Post</h3>
                            <span className="text-[10px] text-muted-foreground font-medium">
                                {step === 'select-platform' && 'Choose platform & generate'}
                                {step === 'generating' && 'Crafting your post...'}
                                {step === 'post-ready' && 'Your post is ready'}
                            </span>
                        </div>
                        {step === 'post-ready' && (
                            <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                <Check className="w-3 h-3 text-green-600" />
                                <span className="text-[10px] font-bold text-green-600">Ready</span>
                            </div>
                        )}
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Bookmark Preview — always shown */}
                        <div className="px-4 pt-3 pb-2">
                            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 border border-border">
                                <div className="w-5 h-5 rounded bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {bookmark.type === 'linkedin'
                                        ? <Linkedin className="w-3 h-3 text-blue-600" />
                                        : <Twitter className="w-3 h-3 text-sky-500" />
                                    }
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                                    {preview.substring(0, 150)}{preview.length > 150 ? '...' : ''}
                                </p>
                            </div>
                        </div>

                        {/* Step: Select Platform */}
                        {step === 'select-platform' && (
                            <div className="px-4 pb-3 space-y-3">
                                <div>
                                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                                        Post to
                                    </label>
                                    <div className="flex bg-muted rounded-lg p-0.5 border border-border w-fit">
                                        <button
                                            onClick={() => setPlatform('twitter')}
                                            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all', platform === 'twitter' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
                                        >
                                            <Twitter className="w-3.5 h-3.5" /> X / Twitter
                                        </button>
                                        <button
                                            onClick={() => setPlatform('linkedin')}
                                            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all', platform === 'linkedin' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
                                        >
                                            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                                        </button>
                                    </div>
                                </div>
                                {toneAuthors.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                                            Voice / Tone <span className="font-normal normal-case">(optional)</span>
                                        </label>
                                        <AuthorPickerDropdown
                                            authors={toneAuthors}
                                            selectedAuthorKey={selectedToneAuthorKey}
                                            onSelect={setSelectedToneAuthorKey}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step: Generating */}
                        {step === 'generating' && (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <div className="relative mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center animate-bounce">
                                        <Sparkles className="w-2.5 h-2.5 text-white" />
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-foreground">Crafting your post...</p>
                                <p className="text-xs text-muted-foreground mt-1 text-center max-w-[200px]">
                                    AI is reading the content and writing something great
                                </p>
                            </div>
                        )}

                        {/* Step: Post Ready */}
                        {step === 'post-ready' && generatedPost && (
                            <div className="px-4 pb-3">
                                <div className="bg-muted/30 rounded-lg border border-border p-4 mb-3">
                                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{generatedPost}</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className={cn('text-[11px] font-medium', isOverLimit ? 'text-red-500' : 'text-muted-foreground')}>
                                            {charCount} chars{isOverLimit ? ' (over 280 limit)' : ''}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground ml-auto">
                                            {platform === 'twitter' ? <Twitter className="w-3 h-3" /> : <Linkedin className="w-3 h-3" />}
                                            {platform === 'twitter' ? 'Twitter / X' : 'LinkedIn'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* History Section */}
                        {history.length > 0 && (step === 'select-platform' || step === 'post-ready') && (
                            <div className="px-4 pb-3">
                                <button
                                    onClick={() => setShowHistory(!showHistory)}
                                    className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
                                >
                                    <Clock className="w-3.5 h-3.5" />
                                    Previous versions ({history.length})
                                    <ChevronRight className={cn('w-3 h-3 transition-transform', showHistory && 'rotate-90')} />
                                </button>
                                {showHistory && (
                                    <div className="rounded-lg border border-border bg-card divide-y divide-border overflow-hidden">
                                        {history.map(item => (
                                            <div key={item.id}>
                                                <button
                                                    onClick={() => setExpandedHistoryId(expandedHistoryId === item.id ? null : item.id)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted/50 transition-colors"
                                                >
                                                    {item.platform === 'twitter'
                                                        ? <Twitter className="w-3 h-3 text-sky-500 flex-shrink-0" />
                                                        : <Linkedin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                    }
                                                    <span className="flex-1 text-[11px] text-foreground truncate">{item.content.replace(/\n/g, ' ').substring(0, 50)}...</span>
                                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{formatTimeAgo(item.createdAt)}</span>
                                                </button>
                                                {expandedHistoryId === item.id && (
                                                    <div className="px-3 pb-2.5 pt-0.5 bg-muted/30">
                                                        <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed mb-2">{item.content}</p>
                                                        <button
                                                            onClick={() => { handleCopy(item.content); setCopiedHistoryId(item.id); setTimeout(() => setCopiedHistoryId(null), 2000); }}
                                                            className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold bg-primary text-white rounded-md hover:bg-primary/90 transition"
                                                        >
                                                            {copiedHistoryId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                            {copiedHistoryId === item.id ? 'Copied' : 'Copy'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="px-4 py-3 border-t border-border bg-muted/20 flex items-center gap-2">
                        {step === 'select-platform' && (
                            <button
                                onClick={handleZap}
                                disabled={!workspaceId}
                                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition disabled:opacity-50 shadow-sm shadow-primary/30"
                            >
                                <Zap className="w-4 h-4 fill-white/20" />
                                Zap to {platform === 'twitter' ? 'Twitter' : 'LinkedIn'}
                            </button>
                        )}

                        {step === 'post-ready' && (
                            <>
                                <button
                                    onClick={resetWizard}
                                    className="flex items-center gap-1 px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg transition"
                                    title="Start over"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                    New
                                </button>
                                <button
                                    onClick={handleDifferentAngle}
                                    className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted rounded-lg transition"
                                    title="Try a different angle"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Different angle
                                </button>
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <button
                                        onClick={() => handleCopy(generatedPost!, setCopied)}
                                        className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied!' : 'Copy Post'}
                                    </button>
                                    <label className="flex items-center justify-center gap-1.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={includeAttribution}
                                            onChange={e => setIncludeAttribution(e.target.checked)}
                                            className="w-3 h-3 rounded accent-primary"
                                        />
                                        <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition">Add PostZaper credit</span>
                                    </label>
                                    {/* Share nudge — appears after first copy and stays visible */}
                                    {hasCopiedOnce && generatedPostId && (
                                        <div className="flex items-center gap-1.5 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                            <span className="text-[10px] text-muted-foreground">Share?</span>
                                            <button
                                                onClick={handleShareOnTwitter}
                                                className="flex items-center gap-1 px-2 py-1 bg-gray-900 text-white rounded text-[10px] font-bold hover:bg-gray-800 transition"
                                            >
                                                <Twitter className="w-2.5 h-2.5" /> Tweet it
                                            </button>
                                            <button
                                                onClick={handleCopyZapLink}
                                                className="flex items-center gap-1 px-2 py-1 bg-muted border border-border text-foreground rounded text-[10px] font-semibold hover:bg-muted/80 transition"
                                            >
                                                {copiedLink ? <Check className="w-2.5 h-2.5" /> : <Link2 className="w-2.5 h-2.5" />}
                                                {copiedLink ? 'Copied!' : 'Copy link'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
