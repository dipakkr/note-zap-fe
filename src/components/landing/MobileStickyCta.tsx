import { X } from "lucide-react";
import { useState, useEffect } from "react";

const MobileStickyCta = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the CTA after user scrolls past the hero section
            setHasScrolled(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible || !hasScrolled) return null;

    const handleClick = () => {
        // Redirect to Stripe payment link
        window.location.href = "https://buy.stripe.com/8x2bJ0c9X7Ey39Y9Ry2ZO08";
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-in slide-in-from-bottom duration-300">
            {/* Gradient background with brand purple theme */}
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 shadow-2xl shadow-purple-500/40">
                {/* Close button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-3 right-3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors border border-white/20"
                    aria-label="Close offer banner"
                >
                    <X size={12} />
                </button>

                <div className="px-5 py-4">
                    <button
                        onClick={handleClick}
                        className="w-full flex items-center justify-between gap-4"
                    >
                        {/* Left: Offer text */}
                        <div className="flex items-center gap-3">
                            <div className="text-left">
                                <p className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
                                    🚀 Launch Offer
                                </p>
                                <p className="text-xl font-extrabold text-white leading-tight tracking-tight">
                                    <span className="line-through text-white/50 text-base font-semibold mr-1.5">$99</span>
                                    <span className="text-white">$29</span>
                                    <span className="text-base font-semibold text-white/80">/year</span>
                                </p>
                                <p className="text-[10px] font-semibold text-amber-300 mt-0.5">
                                    ⚡ Only 100 spots at this price!
                                </p>
                            </div>
                        </div>

                        {/* Right: CTA Button - Solid Yellow for contrast */}
                        <div className="bg-amber-400 text-gray-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl shadow-amber-500/40 hover:bg-amber-300 transition-all active:scale-95 whitespace-nowrap">
                            Grab Deal →
                        </div>
                    </button>
                </div>

                {/* Subtle shimmer animation */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
        </div>
    );
};

export default MobileStickyCta;
