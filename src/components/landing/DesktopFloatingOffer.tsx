import { X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const DesktopFloatingOffer = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show the offer after user scrolls past the hero section
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
        <div className="fixed bottom-6 right-6 z-50 hidden lg:block animate-in slide-in-from-right duration-500">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-[320px]">
                {/* Close button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
                    aria-label="Close offer"
                >
                    <X size={12} />
                </button>

                {/* Purple header accent */}
                <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 px-5 py-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-white/80 uppercase tracking-wide">
                                🚀 Launch Offer
                            </p>
                            <p className="text-xs font-medium text-amber-300">
                                Only 100 spots at this price!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-extrabold text-gray-900">$29</span>
                        <span className="text-base font-medium text-gray-500">/year</span>
                        <span className="text-sm text-gray-400 line-through ml-1">$99</span>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
                            70% OFF
                        </span>
                    </div>

                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Unlimited bookmarks
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Chrome extension included
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Priority support
                        </li>
                    </ul>

                    <button
                        onClick={handleClick}
                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-bold text-sm hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30 active:scale-[0.98]"
                    >
                        Grab This Deal →
                    </button>

                    <p className="text-[10px] text-gray-400 text-center mt-3">
                        Secure payment via Stripe • Cancel anytime
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DesktopFloatingOffer;
