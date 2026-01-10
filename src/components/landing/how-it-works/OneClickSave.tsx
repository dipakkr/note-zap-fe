import { useState, useEffect } from 'react';
import { MousePointer2, MoreHorizontal, MessageSquare, Repeat2, Heart, Zap, Bookmark } from 'lucide-react';

const OneClickSave = () => {
    const [step, setStep] = useState(0); // 0: idle, 1: approach, 2: click, 3: saving, 4: saved

    useEffect(() => {
        const interval = setInterval(() => {
            // Sequence
            setStep(1); // Move cursor to button
            setTimeout(() => setStep(2), 600); // Click
            setTimeout(() => setStep(3), 800); // Saving animation
            setTimeout(() => setStep(4), 1600); // Saved state
            setTimeout(() => setStep(0), 4000); // Reset
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden relative">

            {/* Social Post Mockup */}
            <div className={`w-[85%] bg-white rounded-xl shadow-sm border border-gray-200 p-4 relative text-left transition-all duration-500 ${step === 3 ? 'scale-[0.98] opacity-80' : 'scale-100'}`}>

                {/* User Header */}
                <div className="flex gap-3 mb-3">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div className="flex-1">
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-gray-900">Alex Developer</span>
                            <span className="text-blue-500 text-[10px]"><Zap size={12} fill="currentColor" /></span>
                        </div>
                        <div className="text-xs text-gray-500">@alex_builds</div>
                    </div>
                    <MoreHorizontal className="text-gray-300" size={16} />
                </div>

                {/* Content */}
                <div className="mb-4">
                    <p className="text-sm text-gray-800 leading-relaxed">
                        Just found the ultimate bookmark manager for X & LinkedIn! 🚀 <br />
                        Saves everything in one click. <span className="text-blue-500">#productivity #devtools</span>
                    </p>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between text-gray-400 mt-2 pt-2 border-t border-gray-50">
                    <MessageSquare size={16} />
                    <Repeat2 size={16} />
                    <Heart size={16} />

                    {/* The Save Target */}
                    <div className="relative">
                        <div
                            className={`
                                relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300
                                ${step >= 3 ? 'bg-purple-100 text-purple-600 scale-110' : 'hover:bg-gray-100 text-gray-400'}
                            `}
                        >
                            {step >= 3 ? <Zap size={18} className="fill-current" /> : <Bookmark size={18} />}
                        </div>

                        {/* Success Badge Pop */}
                        <div className={`
                            absolute -top-8 -right-2 bg-purple-600 text-white text-[10px] py-1 px-2 rounded-lg shadow-lg whitespace-nowrap
                            transition-all duration-500 transform
                            ${step >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-75'}
                        `}>
                            Saved to PostZaper!
                        </div>
                    </div>
                </div>
            </div>

            {/* Cursor Actor */}
            <div
                className="absolute transition-all duration-500 ease-in-out pointer-events-none z-20"
                style={{
                    top: step === 0 ? '50%' : step >= 1 ? '72%' : '50%',
                    left: step === 0 ? '80%' : step >= 1 ? '82%' : '80%',
                }}
            >
                <MousePointer2
                    className={`
                        w-6 h-6 text-black fill-black stroke-white stroke-2 
                        transition-transform duration-100
                        ${step === 2 ? 'scale-75 translate-y-1' : 'scale-100'}
                    `}
                />
            </div>

        </div>
    );
};

export default OneClickSave;
