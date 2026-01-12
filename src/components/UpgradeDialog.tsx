import { Dialog, DialogContent } from './ui/dialog';
import { Check, ShieldCheck, Crown, Star } from 'lucide-react';
import { STRIPE_LINKS } from '@/lib/constants';

interface UpgradeDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const FEATURES = [
    'Unlimited bookmarks & collections',
    'AI-powered search & smart filters',
    'Auto-sync Twitter/X & LinkedIn',
    'Export to Notion, CSV & JSON',
    'Priority support channel'
];

export default function UpgradeDialog({ isOpen, onClose }: UpgradeDialogProps) {
    const handleUpgrade = () => {
        window.location.href = STRIPE_LINKS.PRO_YEARLY;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] p-0 bg-card border-border shadow-2xl rounded-3xl overflow-hidden focus:outline-none">
                <div className="relative flex flex-col items-center">
                    {/* Header Background Effect */}
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                    <div className="relative px-8 pt-10 pb-8 flex flex-col items-center text-center w-full">
                        {/* Icon */}
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-primary/20 shadow-sm">
                            <Crown className="w-7 h-7 text-primary fill-primary/20" />
                        </div>

                        {/* Title & Price */}
                        <h2 className="text-2xl font-black text-foreground tracking-tight mb-2">Upgrade to Pro</h2>
                        <p className="text-muted-foreground font-medium mb-6 max-w-[280px]">
                            Unlock unlimited bookmarks, AI tools, and seamless integrations.
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-3 bg-muted/50 p-1.5 pr-4 rounded-xl border border-border/50">
                            <span className="bg-background shadow-sm border border-border px-3 py-1.5 rounded-lg text-sm font-bold text-foreground">
                                Yearly
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-foreground">$29</span>
                                <span className="text-xs font-semibold text-muted-foreground mr-1">/ year</span>
                            </div>
                            <span className="text-[10px] font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
                                SAVE 40%
                            </span>
                        </div>

                        {/* Urgency Text */}
                        <p className="text-xs font-bold text-orange-500 mb-6 animate-pulse">
                            🔥 Only 45 left at this price
                        </p>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                        {/* Features List */}
                        <div className="w-full space-y-4 mb-8 text-left px-2">
                            {FEATURES.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-medium text-foreground/90">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}


                        {/* Actions */}
                        <button
                            onClick={handleUpgrade}
                            className="w-full py-4 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all mb-5 flex items-center justify-center gap-2 group"
                        >
                            <Star className="w-4 h-4 fill-white/20 group-hover:fill-white/40 transition-colors" />
                            Unlock Pro Access
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
