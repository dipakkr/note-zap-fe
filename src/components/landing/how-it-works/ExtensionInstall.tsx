import { useState, useEffect } from 'react';
import { MousePointer2, Check, Zap } from 'lucide-react';

const ExtensionInstall = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsHovering(true);
            setTimeout(() => {
                setIsInstalled(true);
                setTimeout(() => {
                    setIsHovering(false);
                    setIsInstalled(false);
                }, 2000);
            }, 600);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden relative group">

            {/* Browser Window mockup */}
            <div className="w-[85%] h-[80%] bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden text-left">
                {/* Browser Header */}
                <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-2 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="flex-1 ml-2 bg-white h-4 rounded-sm border border-gray-200 text-[8px] text-gray-400 flex items-center px-1">
                        chrome.google.com/webstore...
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col relative">
                    {/* Chrome Web Store Header simulation */}
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
                            <Zap size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-800">PostZaper</h3>
                            <p className="text-[10px] text-gray-500">The #1 Social Bookmark Manager</p>
                            <div className="flex gap-0.5 mt-1">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-400" />)}
                            </div>
                        </div>
                    </div>

                    {/* Install Button Area */}
                    <div className="flex justify-center mt-2">
                        <button
                            className={`
                                relative px-6 py-2 rounded-md text-xs font-medium transition-all duration-300
                                ${isInstalled
                                    ? 'bg-white border text-green-600 border-green-200'
                                    : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                }
                            `}
                        >
                            <span className={`transition-opacity duration-300 ${isInstalled ? 'opacity-0 absolute' : 'opacity-100'}`}>Add to Chrome</span>
                            <span className={`transition-opacity duration-300 flex items-center gap-1 ${isInstalled ? 'opacity-100' : 'opacity-0 absolute'}`}>
                                <Check size={12} /> Added
                            </span>
                        </button>
                    </div>

                    {/* Fake Reviews / Content */}
                    <div className="mt-6 space-y-2 opacity-50">
                        <div className="h-2 w-3/4 bg-gray-100 rounded" />
                        <div className="h-2 w-full bg-gray-100 rounded" />
                        <div className="h-2 w-5/6 bg-gray-100 rounded" />
                    </div>

                    {/* Cursor Animation */}
                    <div
                        className="absolute transition-all duration-700 ease-in-out pointer-events-none z-20"
                        style={{
                            top: isHovering ? '100px' : '180px',
                            left: isHovering ? '55%' : '85%',
                            opacity: 1
                        }}
                    >
                        <MousePointer2
                            className={`w-6 h-6 text-black fill-black stroke-white stroke-2 transition-transform duration-200 ${isInstalled ? 'scale-90' : 'scale-100'}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtensionInstall;
