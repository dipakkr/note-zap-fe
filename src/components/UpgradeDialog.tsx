import {
    Dialog,
    DialogContent,
} from './ui/dialog';
import {
    Sparkles,
    CheckCircle2,
    Zap,
    Chrome,
    Search,
    Download,
    Bookmark,
    RefreshCcw,
    ShieldCheck,
    Lock
} from 'lucide-react';

interface UpgradeDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const PRO_BENEFITS = [
    {
        icon: <Bookmark className="w-4 h-4 text-blue-500" />,
        title: 'Unlimited bookmarks',
        description: 'Never worry about storage limits again.'
    },
    {
        icon: <Chrome className="w-4 h-4 text-purple-500" />,
        title: 'Pro extension access',
        description: 'One-click save from any webpage instantly.'
    },
    {
        icon: <RefreshCcw className="w-4 h-4 text-emerald-500" />,
        title: 'Smart sync & auto-capture',
        description: 'Sync Twitter/X, LinkedIn & blogs automatically.'
    },
    {
        icon: <Search className="w-4 h-4 text-amber-500" />,
        title: 'Advanced AI filters',
        description: 'Search by date, source, and AI-predicted intent.'
    },
    {
        icon: <Download className="w-4 h-4 text-cyan-500" />,
        title: 'Full export toolkit',
        description: 'Take your data anywhere with CSV/JSON exports.'
    }
];

export default function UpgradeDialog({ isOpen, onClose }: UpgradeDialogProps) {
    const handleUpgrade = () => {
        window.location.href = 'https://buy.stripe.com/test_placeholder';
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[540px] p-0 bg-background border-border overflow-hidden rounded-[2rem] shadow-2xl">
                {/* Immersive Glass Background Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative p-8 lg:p-10">
                    {/* Header Section */}
                    <div className="relative z-10 flex flex-col items-center text-center mb-10">
                        <div className="p-3 bg-primary/10 rounded-2xl mb-6 shadow-inner ring-1 ring-primary/20">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <div className="inline-flex items-center gap-2 mb-3">
                            <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase">PostZaper PRO</h2>
                            <span className="px-2.5 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/30">Most Popular</span>
                        </div>
                        <p className="text-base text-muted-foreground font-medium max-w-[320px]">
                            Everything you need to save smarter and build your high-frequency content library.
                        </p>
                    </div>

                    {/* Pricing Highlight Card */}
                    <div className="relative z-10 p-6 rounded-3xl bg-muted/50 border border-border/50 mb-10 flex items-center justify-between overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <h3 className="text-sm font-black text-foreground uppercase tracking-wider mb-1">Yearly Access</h3>
                            <p className="text-xs text-muted-foreground font-medium">Billed annually at $39</p>
                        </div>
                        <div className="relative flex flex-col items-end">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-foreground">$39</span>
                                <span className="text-xs text-muted-foreground font-bold">/ YEAR</span>
                            </div>
                            <span className="text-[10px] font-bold text-primary italic">Save 40% vs monthly</span>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <div className="relative z-10 space-y-5 mb-11">
                        <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60 text-center">Unlock Premium Capabilities</p>
                        <div className="grid gap-4">
                            {PRO_BENEFITS.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4 group cursor-default">
                                    <div className="shrink-0 w-10 h-10 bg-card border border-border shadow-sm rounded-xl flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                        {benefit.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="text-[13px] font-black text-foreground uppercase tracking-tight">{benefit.title}</h4>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className="text-[11px] text-muted-foreground font-medium leading-normal">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="relative z-10 flex flex-col gap-4">
                        <button
                            onClick={handleUpgrade}
                            className="w-full py-4.5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 group"
                        >
                            <Lock className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                            Activate Pro Membership
                        </button>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-6 opacity-60">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                    STRIPE SECURE
                                </div>
                                <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground italic">
                                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                    INSTANT SETUP
                                </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground font-medium underline underline-offset-4 decoration-border">Cancel or downgrade any time from dashboard</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
