import { MapPin, Briefcase, Sparkles, Wand2, X, StickyNote, Save, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { bookmarkService, type Bookmark, type LinkedInProfileData } from '../services/bookmarkService';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Dialog, DialogContent } from './ui/dialog';

interface ProfileDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    bookmark: Bookmark | null;
    onUpdate?: (bookmark: Bookmark) => void;
}

export default function ProfileDetailDialog({ isOpen, onClose, bookmark, onUpdate }: ProfileDetailDialogProps) {
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (bookmark) {
            setNotes(bookmark.notes || '');
            setHasChanges(false);
        }
    }, [bookmark]);

    const handleSaveNotes = async () => {
        if (!bookmark) return;
        setIsSaving(true);
        try {
            const { bookmark: updated } = await bookmarkService.updateBookmark(bookmark.id, { notes });
            setHasChanges(false);
            if (onUpdate) onUpdate(updated);
            toast.success('Notes saved');
        } catch (error) {
            toast.error('Failed to save notes');
        } finally {
            setIsSaving(false);
        }
    };
    const getProfileData = (b: Bookmark): LinkedInProfileData & { connectionDegree?: string, skills?: string[] } => {
        if (b.linkedinProfileData) return { ...b.linkedinProfileData, skills: [] };
        const li = b.linkedinData || {};
        const base = li.profileData || {};
        const author = li.author || {};

        let location = base.location || li.location || '';
        let content = li.content || b.description || '';
        let skills: string[] = [];

        // Deduplicate repeated content if found
        if (content) {
            // Common pattern in extension capture: blocks repeat twice
            const mid = Math.floor(content.length / 2);
            const firstHalf = content.substring(0, mid).trim();
            const secondHalf = content.substring(mid).trim();

            if (firstHalf === secondHalf) {
                content = firstHalf;
            } else {
                // Try to find a repeat by splitting on a common end/start marker
                // e.g. "get started. About"
                const repeatMarker = "get started.";
                if (content.includes(repeatMarker)) {
                    const parts = content.split(repeatMarker);
                    if (parts.length > 2) {
                        content = parts[0] + repeatMarker + parts[1];
                    }
                }
            }
        }

        // Extract skills if they are in the content (Top skills Leadership • ...)
        if (content.includes('Top skills')) {
            const parts = content.split('Top skills');
            const skillsSection = parts[parts.length - 1].trim();
            skills = skillsSection.split('•').map((s: string) => s.trim()).filter((s: string) => s && s.length < 30);
            // Clean up content to remove skills from about
            content = parts[0].trim();
        }

        // Clean up "About" prefix
        content = content.replace(/^About\s+/, '').trim();

        // Try to extract location from content if missing
        if (!location) {
            if (content.includes('Available globally from')) {
                const parts = content.split('Available globally from');
                if (parts.length > 1) {
                    location = parts[1].split('.')[0].split('\n')[0].trim();
                }
            } else if (content.includes('|')) {
                const parts = content.split('|');
                if (parts.length > 1) location = parts[parts.length - 1].trim();
            }
        }

        // Standardize connections count string
        let connCount = base.connectionsCount || li.connectionsCount || '';
        if (connCount && !connCount.toLowerCase().includes('connections')) {
            connCount = `${connCount} connections`;
        }

        return {
            name: base.name || author.name || b.title?.replace(' - LinkedIn Profile', '') || 'LinkedIn User',
            headline: base.headline || author.headline || b.description || '-',
            profilePhoto: base.profilePhoto || author.avatar || b.thumbnail || b.favicon || '',
            profileUrl: base.profileUrl || author.profileUrl || b.url,
            location: location,
            currentCompany: base.currentCompany || li.currentCompany || '',
            connectionsCount: connCount,
            followersCount: base.followersCount || li.followersCount || '',
            connectionDegree: base.connectionDegree || li.connectionDegree || '',
            website: base.website || li.website || '',
            about: content,
            skills: skills
        };
    };

    if (!bookmark) return null;
    const profile = getProfileData(bookmark);
    const savedDate = format(new Date(bookmark.createdAt), 'MMMM d, yyyy');

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-xl border-border bg-card shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col h-full max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-md border border-primary/20">Profile</span>
                            <span className="text-xs text-muted-foreground font-medium">LinkedIn Dossier</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-muted rounded-full transition-colors text-muted-foreground"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="px-6 py-6 overflow-y-auto no-scrollbar scroll-smooth">
                        {/* profile Identity */}
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-16 h-16 rounded-full border border-border bg-muted overflow-hidden flex-shrink-0 shadow-sm">
                                {profile.profilePhoto ? (
                                    <img src={profile.profilePhoto} alt={profile.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center font-bold text-primary bg-primary/10 text-xl">
                                        {profile.name?.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-[17px] font-bold tracking-tight truncate text-foreground">{profile.name}</h2>
                                    {profile.connectionDegree && (
                                        <span className="text-[11px] text-muted-foreground font-normal">
                                            · {profile.connectionDegree}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[12px] font-normal text-foreground/80 leading-tight mt-0.5">{profile.headline}</p>

                                <div className="flex flex-wrap items-center gap-x-1 mt-1.5 text-[11px] text-muted-foreground">
                                    {profile.connectionsCount && (
                                        <span className="font-bold text-primary hover:underline cursor-pointer">
                                            {profile.connectionsCount}
                                        </span>
                                    )}
                                    {profile.location && (
                                        <>
                                            {profile.connectionsCount && <span className="mx-0.5">·</span>}
                                            <span className="truncate max-w-[140px]">{profile.location}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <button
                                onClick={() => window.open(profile.profileUrl, '_blank')}
                                className="px-4 py-1.5 bg-primary text-white text-[12px] font-bold rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10"
                            >
                                Open in LinkedIn
                            </button>
                            <button className="px-4 py-1.5 bg-card border border-primary text-primary text-[12px] font-bold rounded-full hover:bg-primary/5 transition-all">
                                Contact Info
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Notes Section */}
                            <section className="bg-yellow-50/50 dark:bg-yellow-900/10 p-4 rounded-xl border border-yellow-200/50 dark:border-yellow-700/30">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-[13px] font-bold text-yellow-800 dark:text-yellow-500 flex items-center gap-2">
                                        <StickyNote className="w-3.5 h-3.5" />
                                        Private Notes
                                    </h3>
                                    {hasChanges && (
                                        <button
                                            onClick={handleSaveNotes}
                                            disabled={isSaving}
                                            className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500 text-white text-[10px] font-bold rounded-lg hover:bg-yellow-600 transition-all shadow-sm disabled:opacity-50"
                                        >
                                            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                            Save
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={notes}
                                    onChange={(e) => {
                                        setNotes(e.target.value);
                                        setHasChanges(true);
                                    }}
                                    placeholder="Add private notes about this profile..."
                                    className="w-full bg-transparent border-none p-0 text-[12px] text-foreground/80 placeholder:text-muted-foreground/50 focus:ring-0 resize-none min-h-[60px] leading-relaxed font-medium"
                                />
                            </section>
                            <section className="bg-muted/5 p-4 rounded-xl border border-border">
                                <h3 className="text-[13px] font-bold mb-2 text-foreground">About</h3>
                                <p className="text-[12px] leading-relaxed text-foreground/80 whitespace-pre-wrap font-medium">
                                    {profile.about}
                                </p>
                            </section>

                            {profile.skills && profile.skills.length > 0 && (
                                <section>
                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">Top Skills</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {profile.skills.map((skill, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-muted/50 border border-border text-[11px] font-medium rounded-full text-foreground/70">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {profile.currentCompany && (
                                    <div className="flex items-start gap-2.5 p-3 bg-muted/10 rounded-xl border border-border/50">
                                        <div className="p-1.5 bg-card rounded-lg border border-border">
                                            <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[11px] font-bold mb-0.5 text-foreground">Experience</h4>
                                            <p className="text-[11px] text-foreground/70 font-medium truncate">{profile.currentCompany}</p>
                                        </div>
                                    </div>
                                )}
                                {profile.location && (
                                    <div className="flex items-start gap-2.5 p-3 bg-muted/10 rounded-xl border border-border/50">
                                        <div className="p-1.5 bg-card rounded-lg border border-border">
                                            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[11px] font-bold mb-0.5 text-foreground">Location</h4>
                                            <p className="text-[11px] text-foreground/70 font-medium truncate">{profile.location}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-muted/30 border-t border-border mt-auto flex items-center justify-between px-6">
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            Saved on {savedDate}
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-[11px] font-bold rounded-lg hover:bg-primary/20 transition-all">
                            <Wand2 className="w-3.5 h-3.5" />
                            AI Insight
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
