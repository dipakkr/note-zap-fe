import { Dialog, DialogContent } from './ui/dialog';
import { useState, useEffect } from 'react';
import type { Bookmark, GeneratedPost, ToneAuthor } from '../services/bookmarkService';
import { contentStudioService } from '../services/bookmarkService';
import AuthorPickerDropdown from './AuthorPickerDropdown';
import { Zap, Loader2, Copy, Check, Twitter, Linkedin, ChevronLeft, RefreshCw, ChevronRight, Clock, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ZapWizardDialogProps {
    isOpen: boolean;
    onClose: () => void;
    bookmark: Bookmark | null;
    workspaceId?: string;
    toneAuthors?: ToneAuthor[];
}

type WizardStep = 'select-platform' | 'generating-hooks' | 'pick-hook' | 'generating-post' | 'post-ready';

export default function ZapWizardDialog({ isOpen, onClose, bookmark, workspaceId, toneAuthors = [] }: ZapWizardDialogProps) {
    const [step, setStep] = useState<WizardStep>('select-platform');
    const [platform, setPlatform] = useState<'twitter' | 'linkedin'>('twitter');
    const [hooks, setHooks] = useState<string[]>([]);
    const [selectedHookIndex, setSelectedHookIndex] = useState<number | null>(0);
    const [customHook, setCustomHook] = useState('');
    const [useCustom, setUseCustom] = useState(false);
    const [generatedPost, setGeneratedPost] = useState<string | null>(null);
    const [generatedPostId, setGeneratedPostId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [history, setHistory] = useState<GeneratedPost[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
    const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);
    const [selectedToneAuthorKey, setSelectedToneAuthorKey] = useState<string | null>(null);

    // Auto-detect platform and auto-select matching tone author
    useEffect(() => {
        if (!bookmark || !isOpen) return;

        // Auto-detect platform
        if (bookmark.type === 'linkedin') {
            setPlatform('linkedin');
        } else {
            setPlatform('twitter');
        }

        // Auto-select tone author matching the bookmark's author
        if (toneAuthors.length > 0) {
            let authorName = '';
            let authorUsername = '';

            if (bookmark.type === 'tweet' && bookmark.tweetData?.author) {
                authorName = bookmark.tweetData.author.name || '';
                authorUsername = bookmark.tweetData.author.username || bookmark.tweetData.author.handle || '';
            } else if (bookmark.type === 'linkedin' && bookmark.linkedinData?.author) {
                authorName = bookmark.linkedinData.author.name || '';
                authorUsername = '';
            } else if (bookmark.type === 'thread' && bookmark.threadData?.tweets?.[0]?.author) {
                authorName = bookmark.threadData.tweets[0].author.name || '';
                authorUsername = bookmark.threadData.tweets[0].author.username || '';
            }

            if (authorName) {
                // Try exact key match (name||username)
                const key = authorName + '||' + authorUsername;
                const exact = toneAuthors.find(a => a.authorKey === key);
                if (exact) {
                    setSelectedToneAuthorKey(exact.authorKey);
                } else {
                    // Fallback: case-insensitive name match
                    const nameMatch = toneAuthors.find(a => a.name.toLowerCase() === authorName.toLowerCase());
                    if (nameMatch) {
                        setSelectedToneAuthorKey(nameMatch.authorKey);
                    }
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
        setHooks([]);
        setSelectedHookIndex(0);
        setCustomHook('');
        setUseCustom(false);
        setGeneratedPost(null);
        setGeneratedPostId(null);
        setCopied(false);
        setShowHistory(false);
        setExpandedHistoryId(null);
        setSelectedToneAuthorKey(null);
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

    const handleGenerateHooks = async () => {
        if (!bookmark || !workspaceId) return;
        setStep('generating-hooks');
        try {
            const response = await contentStudioService.generate({
                workspaceId,
                bookmarkIds: [bookmark.id],
                platform,
                contentType: 'hook',
                toneAuthorKey: selectedToneAuthorKey || undefined,
            });
            setHooks(response.hooks || []);
            setSelectedHookIndex(0);
            setUseCustom(false);
            setStep('pick-hook');
        } catch (error: any) {
            const message = error?.response?.data?.error || error?.message || 'Failed to generate hooks';
            toast.error(message);
            setStep('select-platform');
        }
    };

    const handleGeneratePost = async () => {
        if (!bookmark || !workspaceId) return;
        const hookText = useCustom ? customHook.trim() : (selectedHookIndex !== null ? hooks[selectedHookIndex] : '');
        if (!hookText) {
            toast.error('Please select a hook or write your own');
            return;
        }
        setStep('generating-post');
        try {
            const response = await contentStudioService.generate({
                workspaceId,
                bookmarkIds: [bookmark.id],
                platform,
                contentType: 'post',
                hookText,
                toneAuthorKey: selectedToneAuthorKey || undefined,
            });
            if (response.posts.length > 0) {
                setGeneratedPost(response.posts[0].content);
                setGeneratedPostId(response.posts[0].id);
                setHistory(prev => [response.posts[0], ...prev]);
            }
            setStep('post-ready');
        } catch (error: any) {
            const message = error?.response?.data?.error || error?.message || 'Failed to generate post';
            toast.error(message);
            setStep('pick-hook');
        }
    };

    const handleRegenerate = async () => {
        if (!generatedPostId) return;
        setStep('generating-post');
        try {
            const response = await contentStudioService.regeneratePost(generatedPostId);
            setGeneratedPost(response.post.content);
            setHistory(prev => prev.map(p => p.id === generatedPostId ? response.post : p));
            setStep('post-ready');
        } catch {
            toast.error('Regeneration failed');
            setStep('post-ready');
        }
    };

    const handleCopy = async (text: string, setFn?: (v: boolean) => void) => {
        try {
            await navigator.clipboard.writeText(text);
            if (setFn) setFn(true);
            toast.success('Copied to clipboard');
            if (setFn) setTimeout(() => setFn(false), 2000);
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
        if (diffDays < 7) return `${diffDays}d ago`;
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (!bookmark) return null;

    const preview = getBookmarkPreview();
    const isStep1 = ['select-platform', 'generating-hooks', 'pick-hook'].includes(step);
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
                            <h3 className="text-sm font-bold text-foreground leading-tight">Create Post</h3>
                            <span className="text-[10px] text-muted-foreground font-medium">
                                {isStep1 ? 'Step 1: Choose a hook' : 'Step 2: Generated post'}
                            </span>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Bookmark Preview */}
                        <div className="px-4 pt-3 pb-2">
                            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 border border-border">
                                <div className="w-5 h-5 rounded bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {bookmark.type === 'linkedin'
                                        ? <Linkedin className="w-3 h-3 text-blue-600" />
                                        : <Twitter className="w-3 h-3 text-sky-500" />
                                    }
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{preview.substring(0, 150)}{preview.length > 150 ? '...' : ''}</p>
                            </div>
                        </div>

                        {/* Platform Selector */}
                        {step === 'select-platform' && (
                            <div className="px-4 pb-3 space-y-3">
                                <div>
                                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Platform</label>
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
                                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Voice / Tone (optional)</label>
                                        <AuthorPickerDropdown
                                            authors={toneAuthors}
                                            selectedAuthorKey={selectedToneAuthorKey}
                                            onSelect={setSelectedToneAuthorKey}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 1: Generating Hooks Loading */}
                        {step === 'generating-hooks' && (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <Loader2 className="w-6 h-6 animate-spin text-primary mb-3" />
                                <p className="text-sm font-medium text-foreground">Generating hooks...</p>
                                <p className="text-xs text-muted-foreground mt-1">Creating 3 unique angles from this content</p>
                            </div>
                        )}

                        {/* Step 1: Pick Hook */}
                        {step === 'pick-hook' && (
                            <div className="px-4 pb-3">
                                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pick a hook to start with</p>
                                <div className="space-y-2 mb-3">
                                    {hooks.map((hook, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setSelectedHookIndex(i); setUseCustom(false); }}
                                            className={cn(
                                                'w-full text-left p-3 rounded-lg border transition-all',
                                                !useCustom && selectedHookIndex === i
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                                                    : 'border-border hover:border-primary/40 hover:bg-muted/50'
                                            )}
                                        >
                                            <div className="flex items-start gap-2.5">
                                                <div className={cn(
                                                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                                                    !useCustom && selectedHookIndex === i ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                                                )}>
                                                    {!useCustom && selectedHookIndex === i && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <p className="text-sm text-foreground leading-relaxed">{hook}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Hook */}
                                <div className="border-t border-border pt-3">
                                    <button
                                        onClick={() => { setUseCustom(true); setSelectedHookIndex(null); }}
                                        className={cn(
                                            'flex items-center gap-2 mb-2 text-xs font-semibold transition-colors',
                                            useCustom ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                        Or write your own hook
                                    </button>
                                    {useCustom && (
                                        <textarea
                                            value={customHook}
                                            onChange={e => setCustomHook(e.target.value)}
                                            placeholder="Type your hook or opening line..."
                                            className="w-full bg-muted border border-border rounded-lg p-2.5 text-sm text-foreground resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition placeholder:text-muted-foreground/50"
                                            rows={2}
                                            autoFocus
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Generating Post Loading */}
                        {step === 'generating-post' && (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                                <Loader2 className="w-6 h-6 animate-spin text-primary mb-3" />
                                <p className="text-sm font-medium text-foreground">Creating your post...</p>
                                <p className="text-xs text-muted-foreground mt-1">Building on your selected hook</p>
                            </div>
                        )}

                        {/* Step 2: Post Ready */}
                        {step === 'post-ready' && generatedPost && (
                            <div className="px-4 pb-3">
                                <div className="bg-muted/30 rounded-lg border border-border p-4 mb-3">
                                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{generatedPost}</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className={cn('text-[11px] font-medium', isOverLimit ? 'text-red-500' : 'text-muted-foreground')}>
                                            {charCount} chars{isOverLimit ? ' (over 280)' : ''}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                            {platform === 'twitter' ? <Twitter className="w-3 h-3" /> : <Linkedin className="w-3 h-3" />}
                                            {platform === 'twitter' ? 'Twitter' : 'LinkedIn'}
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
                                    Previous ({history.length})
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
                                onClick={handleGenerateHooks}
                                disabled={!workspaceId}
                                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition disabled:opacity-50"
                            >
                                <Zap className="w-4 h-4" />
                                Generate Hooks
                            </button>
                        )}

                        {step === 'pick-hook' && (
                            <>
                                <button
                                    onClick={() => setStep('select-platform')}
                                    className="flex items-center gap-1 px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg transition"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                    Back
                                </button>
                                <button
                                    onClick={handleGeneratePost}
                                    disabled={!useCustom && selectedHookIndex === null || (useCustom && !customHook.trim())}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition disabled:opacity-50"
                                >
                                    <Zap className="w-4 h-4" />
                                    Generate Post
                                </button>
                            </>
                        )}

                        {step === 'post-ready' && (
                            <>
                                <button
                                    onClick={resetWizard}
                                    className="flex items-center gap-1 px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg transition"
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                    Start Over
                                </button>
                                <button
                                    onClick={handleRegenerate}
                                    className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground bg-muted rounded-lg transition"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Regenerate
                                </button>
                                <button
                                    onClick={() => handleCopy(generatedPost!, setCopied)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Copy Post'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
