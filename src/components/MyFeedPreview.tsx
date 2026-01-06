import { Search } from 'lucide-react';

export default function MyFeedPreview() {
    return (
        <div className="mt-12 lg:mt-16 animate-fade-up animation-delay-400">
            <div className="relative max-w-6xl mx-auto">
                {/* Browser Chrome */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    {/* Feed Header */}
                    <div className="px-6 py-8 border-b border-gray-100">
                        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">My Feed</h2>
                                <p className="text-sm text-gray-500 mt-1">6 saved items to read.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search feed..."
                                        className="w-full sm:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                        readOnly
                                    />
                                    <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                                </div>
                                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                                    + New Bookmark
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-1 border-b border-gray-200 -mb-px overflow-x-auto">
                            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">
                                All Items
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 whitespace-nowrap">
                                🔗 LinkedIn
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 whitespace-nowrap">
                                𝕏 Twitter / X
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 whitespace-nowrap">
                                ⭐ Favorites
                            </button>
                        </div>
                    </div>

                    {/* Bookmark Cards Grid */}
                    <div className="p-6 bg-gray-50">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Card 1 - Twitter */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-900 text-sm">Tryggvi Rafn</div>
                                        <div className="text-xs text-gray-500">@EXM7777</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                    We took a brand new Shopify store from $0 to $100k+ per month.
                                    <br /><br />
                                    With just SEO.
                                    <br /><br />
                                    e-commerce brands waste months chasing blog traffic that doesn't convert...
                                </p>
                                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                                    <div className="text-xs text-gray-400">📊 Analytics Chart</div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                                    <span className="flex items-center gap-1">💬 28</span>
                                    <span className="flex items-center gap-1">🔄 0</span>
                                    <span className="flex items-center gap-1">❤️ 0</span>
                                    <span className="ml-auto text-blue-600 font-medium">𝕏 Twitter</span>
                                </div>
                            </div>

                            {/* Card 2 - LinkedIn */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-900 text-sm">Zishan Ashraf</div>
                                        <div className="text-xs text-gray-500">@benln</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                    claude code can now call your phone 📞
                                    <br /><br />
                                    voice is quietly becoming a big part of how i work.
                                    <br /><br />
                                    i use wispr flow to brain dump ideas...
                                </p>
                                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                                    <div className="text-xs text-gray-400">📱 Phone Screenshot</div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                                    <span className="flex items-center gap-1">💬 1</span>
                                    <span className="flex items-center gap-1">🔄 0</span>
                                    <span className="flex items-center gap-1">❤️ 0</span>
                                    <span className="ml-auto text-blue-700 font-medium">🔗 LinkedIn</span>
                                </div>
                            </div>

                            {/* Card 3 - Twitter with Video */}
                            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-900 text-sm flex items-center gap-1">
                                            Benjamin De Kraker
                                            <span className="text-blue-500">𝕏</span>
                                        </div>
                                        <div className="text-xs text-gray-500">@hayesdev_</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                    I built an AI Factory that uses Claude Code agents to build apps while I sleep.
                                    <br /><br />
                                    This is an automated "assembly line" pipeline...
                                </p>
                                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg mb-3 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-900 border-b-[6px] border-b-transparent ml-1"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                                    <span className="flex items-center gap-1">💬 75</span>
                                    <span className="flex items-center gap-1">🔄 40</span>
                                    <span className="flex items-center gap-1">❤️ 633</span>
                                    <span className="ml-auto text-blue-600 font-medium">𝕏 Twitter</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
