import { useState, useEffect } from 'react';
import { Search, Twitter, Globe, Linkedin, FileText } from 'lucide-react';

const InstantSearch = () => {
    const [searchText, setSearchText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Mock Data
    const allItems = [
        { id: 1, type: 'twitter', title: "10 AI Tools you need to try", icon: <Twitter size={14} className="text-blue-400" /> },
        { id: 2, type: 'linkedin', title: "My journey as a frontend dev", icon: <Linkedin size={14} className="text-blue-700" /> },
        { id: 3, type: 'web', title: "The future of Generative AI", icon: <Globe size={14} className="text-orange-500" /> },
        { id: 4, type: 'twitter', title: "React 19 features explained", icon: <Twitter size={14} className="text-blue-400" /> },
        { id: 5, type: 'web', title: "Best AI Prompting Guide", icon: <Globe size={14} className="text-orange-500" /> },
    ];

    useEffect(() => {
        const loop = async () => {
            // Wait a bit
            await new Promise(r => setTimeout(r, 1000));
            setIsTyping(true);

            // Type "AI "
            const phrase = "AI";
            for (let i = 0; i <= phrase.length; i++) {
                setSearchText(phrase.slice(0, i));
                await new Promise(r => setTimeout(r, 200));
            }

            setIsTyping(false);

            // Hold result
            await new Promise(r => setTimeout(r, 2000));

            // Backspace/Reset
            setSearchText("");
        };

        const interval = setInterval(loop, 4000);
        loop(); // Start immediately

        return () => clearInterval(interval);
    }, []);

    // Filter items based on simulated search
    const filteredItems = searchText
        ? allItems.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
        : allItems;

    return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-[320px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[220px] text-left">

                {/* Search Bar */}
                <div className="p-3 bg-white z-10">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2 text-gray-400" size={14} />
                        <input
                            type="text"
                            value={searchText}
                            readOnly
                            placeholder="Search bookmarks..."
                            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-100/80 rounded-lg focus:outline-none text-gray-800 placeholder:text-gray-400"
                        />
                        {/* Cursor Blinking */}
                        {isTyping && (
                            <div className="absolute left-[calc(2rem + 1ch)] top-2 h-4 w-0.5 bg-blue-500 animate-pulse"
                                style={{ left: `${35 + searchText.length * 8}px` }}
                            />
                        )}
                    </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-hidden p-2 space-y-2 bg-gray-50/50">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white p-2.5 rounded-xl shadow-sm flex items-center gap-3 animate-fade-in transition-all duration-300">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="h-3 w-3/4 bg-gray-100 rounded-sm mb-1.5" />
                                <div className="text-[10px] text-gray-500 truncate font-medium">{item.title}</div>
                            </div>
                        </div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 pb-4">
                            <FileText size={24} className="mb-2 opacity-50" />
                            <span className="text-xs">No results found</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default InstantSearch;
