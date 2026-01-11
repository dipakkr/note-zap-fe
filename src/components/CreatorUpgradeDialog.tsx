import { Dialog, DialogContent } from './ui/dialog';
import { Check, ShieldCheck, Sparkles, Wand2 } from 'lucide-react';
import { STRIPE_LINKS } from '@/lib/constants';

interface CreatorUpgradeDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const CREATOR_FEATURES = [
    'Access to Creator Studio & Analytics',
    'Generate 300 AI posts/mo',
    'AI Content Repurposing (LinkedIn ↔ X)',
    'Viral trend analysis & hooks library',
    'Auto-create Swipe Files from bookmarks'
];

export default function CreatorUpgradeDialog({ isOpen, onClose }: CreatorUpgradeDialogProps) {
    const handleUpgrade = () => {
        window.location.href = STRIPE_LINKS.CREATOR_YEARLY;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] p-0 bg-card border-border shadow-2xl rounded-3xl overflow-hidden focus:outline-none ring-1 ring-purple-500/20">
                <div className="relative flex flex-col items-center">
                    {/* Header Background Effect - Purple/Gold for Creator */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />

                    <div className="relative px-8 pt-10 pb-8 flex flex-col items-center text-center w-full">
                        {/* Icon */}
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-purple-500/20 shadow-sm">
                            <Sparkles className="w-7 h-7 text-purple-600 fill-purple-600/10" />
                        </div>

                        {/* Title & Price */}
                        <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">Upgrade to Creator</h2>
                        <p className="text-muted-foreground font-medium mb-6 max-w-[280px]">
                            Supercharge your growth with AI-powered content creation tools.
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-8 bg-purple-50/50 p-1.5 pr-4 rounded-xl border border-purple-100">
                            <span className="bg-white shadow-sm border border-purple-100 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-900">
                                Yearly
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-foreground">$99</span>
                                <span className="text-xs font-semibold text-muted-foreground mr-1">/ year</span>
                            </div>
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                                BEST VALUE
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent mb-8" />

                        {/* Features List */}
                        <div className="w-full space-y-4 mb-8 text-left px-2">
                            {CREATOR_FEATURES.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-purple-600" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-medium text-foreground/90">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleUpgrade}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all mb-5 flex items-center justify-center gap-2 group"
                        >
                            <Wand2 className="w-4 h-4 fill-white/20 group-hover:fill-white/40 transition-colors" />
                            Unlock Creator Tools
                        </button>

                        <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 opacity-70">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Secure payment via Stripe • Cancel anytime
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
