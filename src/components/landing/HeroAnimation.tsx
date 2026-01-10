import { useEffect, useState } from "react";
import { Zap, Layout, FileText, User, Globe } from "lucide-react";

const ANIMATION_Cycle = [
    {
        id: 1,
        type: "bookmark",
        source: "LinkedIn Post",
        action: "Bookmark Post",
        icon: <FileText className="w-5 h-5 text-white" />,
        platformIcon: "bg-[#0077b5]",
        content: "Growth Engineering 101: How to scale...",
    },
    {
        id: 2,
        type: "profile",
        source: "Sarah Chen",
        action: "Save Profile",
        icon: <User className="w-5 h-5 text-white" />,
        platformIcon: "bg-[#0077b5]",
        content: "Product Designer at Stripe",
    },
    {
        id: 3,
        type: "bookmark",
        source: "Twitter Thread",
        action: "Bookmark Thread",
        icon: <FileText className="w-5 h-5 text-white" />,
        platformIcon: "bg-black",
        content: "10 AI tools you need to try in 2024...",
    },
    {
        id: 4,
        type: "profile",
        source: "Alex Dev",
        action: "Save Profile",
        icon: <User className="w-5 h-5 text-white" />,
        platformIcon: "bg-black",
        content: "Senior Frontend Engineer",
    },
    {
        id: 5,
        type: "web",
        source: "TheVerge Art.",
        action: "Web Article",
        icon: <Globe className="w-5 h-5 text-white" />,
        platformIcon: "bg-orange-600",
        content: "Review: The new M3 Macbook Air is...",
    },
    {
        id: 6,
        type: "web",
        source: "Design Insp.",
        action: "Web Page",
        icon: <Layout className="w-5 h-5 text-white" />,
        platformIcon: "bg-green-600",
        content: "Awwwards - Site of the Day",
    }
];

const HeroAnimation = () => {
    const [cycleIndex, setCycleIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCycleIndex((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const activeItemIndex = (cycleIndex + 1) % ANIMATION_Cycle.length;

    return (
        <div className="relative w-full max-w-[1300px] mx-auto h-[550px] flex items-center justify-center gap-10 mt-0">

            {/* Connection Layer (Behind) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                    <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <path
                    d="M 260 230 C 320 230, 400 180, 580 180"
                    fill="none"
                    stroke="url(#flowGradient)"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                    className="animate-dash-flow opacity-60"
                    strokeLinecap="round"
                />
            </svg>

            {/* --- ZONE 1: Source (Left Side) --- */}
            <div className="hidden lg:flex flex-col w-[260px] h-[500px] relative z-10 scale-90 origin-center [transform:perspective(800px)_rotateY(15deg)_rotateX(5deg)]" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute w-full h-full">
                    {[-1, 0, 1, 2, 3].map((offset) => {
                        const virtualIndex = cycleIndex + offset;
                        const itemIndex = (virtualIndex % ANIMATION_Cycle.length + ANIMATION_Cycle.length) % ANIMATION_Cycle.length;
                        const item = ANIMATION_Cycle[itemIndex];

                        let style = "";
                        // Offsets
                        if (offset === -1) style = "translate-y-[-120px] opacity-0 scale-90 z-0";
                        else if (offset === 0) style = "translate-y-[40px] opacity-40 scale-90 z-10 blur-[1px]";
                        else if (offset === 1) style = "translate-y-[180px] opacity-100 scale-100 z-30 shadow-xl border-purple-200"; // Active
                        else if (offset === 2) style = "translate-y-[320px] opacity-40 scale-90 z-20 blur-[1px]";
                        else if (offset === 3) style = "translate-y-[460px] opacity-0 scale-90 z-10";

                        return (
                            <div
                                key={virtualIndex}
                                className={`absolute left-0 right-0 transition-all duration-700 ease-in-out ${style}`}
                            >
                                <SourceCard item={item} isActive={offset === 1} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- ZONE 3: Destination (Right Side - Premium Dashboard) --- */}
            <div className="hidden lg:flex flex-1 h-full min-w-[450px] items-center justify-center z-10 origin-left">
                <div className="w-full h-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex">

                    {/* Sidebar */}
                    <div className="w-20 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-6 gap-6">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-200"><Zap className="text-white w-5 h-5" /></div>
                        <div className="w-full h-[1px] bg-gray-200 my-2" />
                        <div className="p-2 rounded-lg bg-purple-50 text-purple-600"><Layout size={18} /></div>
                        <div className="p-2 rounded-lg text-gray-400"><FileText size={18} /></div>
                        <div className="p-2 rounded-lg text-gray-400"><User size={18} /></div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white p-6 relative flex flex-col">
                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <h3 className="text-base font-bold text-gray-800">Saved Items</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[10px] font-medium text-gray-600">All</span>
                                <span className="px-2 py-0.5 bg-white border border-gray-200 rounded-full text-[10px] font-medium text-gray-400">Favs</span>
                            </div>
                        </div>

                        {/* Grid of Cards */}
                        <div className="grid grid-cols-2 gap-4">

                            {/* Card 1: The Active Animated One (Span 2) */}
                            <div className="col-span-2 bg-white rounded-xl p-3 border border-purple-200 shadow-sm flex items-start gap-3 relative overflow-hidden group">
                                <div className={`absolute inset-0 bg-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-purple-500`} />

                                <div className={`w-10 h-10 rounded-lg ${ANIMATION_Cycle[activeItemIndex].platformIcon} flex items-center justify-center text-white shadow-sm z-10`}>
                                    {ANIMATION_Cycle[activeItemIndex].icon}
                                </div>
                                <div className="flex-1 z-10 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-semibold text-gray-800 truncate">{ANIMATION_Cycle[activeItemIndex].source}</h4>
                                        <span className="text-[9px] text-purple-600 font-medium bg-purple-50 px-1.5 py-0.5 rounded-full shrink-0">Now</span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{ANIMATION_Cycle[activeItemIndex].content}</p>
                                </div>
                            </div>

                            {/* Grid Item 2: Static */}
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3 opacity-60">
                                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm shrink-0"><Globe size={16} /></div>
                                <div className="flex-1 min-w-0">
                                    <div className="h-2 w-24 bg-gray-200 rounded mb-1.5" />
                                    <div className="h-1.5 w-32 bg-gray-200 rounded" />
                                </div>
                            </div>

                            {/* Grid Item 3: Static */}
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3 opacity-60">
                                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white shadow-sm shrink-0"><User size={16} /></div>
                                <div className="flex-1 min-w-0">
                                    <div className="h-2 w-20 bg-gray-200 rounded mb-1.5" />
                                    <div className="h-1.5 w-16 bg-gray-200 rounded" />
                                </div>
                            </div>

                            {/* Grid Item 4: Static */}
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3 opacity-40">
                                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-sm shrink-0"><FileText size={16} /></div>
                                <div className="flex-1 min-w-0">
                                    <div className="h-2 w-28 bg-gray-200 rounded mb-1.5" />
                                    <div className="h-1.5 w-24 bg-gray-200 rounded" />
                                </div>
                            </div>

                            {/* Grid Item 5: Static */}
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center gap-3 opacity-40">
                                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white shadow-sm shrink-0"><Layout size={16} /></div>
                                <div className="flex-1 min-w-0">
                                    <div className="h-2 w-16 bg-gray-200 rounded mb-1.5" />
                                    <div className="h-1.5 w-20 bg-gray-200 rounded" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component for the Source Card (Left side)
const SourceCard = ({ item, isActive }: { item: typeof ANIMATION_Cycle[0], isActive: boolean }) => (
    <div className={`w-full bg-white/80 backdrop-blur-md rounded-xl p-4 border transition-colors duration-300
        ${isActive ? 'border-purple-300 shadow-lg shadow-purple-500/10 scale-100' : 'border-white/40 shadow-sm'}
    `}>
        <div className="flex items-center justify-between mb-2">
            <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${item.platformIcon}`}>
                {item.icon}
                <span>{item.action}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="text-sm font-semibold text-gray-800">{item.source}</div>
        <div className="text-xs text-gray-500 truncate mt-1">{item.content}</div>
    </div>
);

export default HeroAnimation;
