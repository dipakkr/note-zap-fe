import { ArrowRight } from 'lucide-react';

export default function VisualWorkflowSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        See it in action
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Watch how easy it is to save and organize your favorite content from anywhere on the web
                    </p>
                </div>

                {/* Step 1: Install Extension */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            01
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Install the Chrome Extension</h3>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center p-3">
                                        <img src="/chrome.svg" alt="Chrome" className="w-full h-full" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 text-lg">PostZaper Extension</h4>
                                        <p className="text-sm text-gray-500">Save bookmarks with one click</p>
                                    </div>
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                        Add to Chrome
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        ⭐⭐⭐⭐⭐ 4.9 rating
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span>10,000+ users</span>
                                    <span className="text-gray-300">•</span>
                                    <span>Featured by Chrome</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2: Save from Twitter */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            02
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Save content with one click</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Twitter Post Mockup */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-gray-900">Sahil Bloom</span>
                                        <span className="text-blue-500">✓</span>
                                        <span className="text-gray-500 text-sm">@SahilBloom</span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                        The 5 mental models that changed my life:
                                        <br /><br />
                                        1. First Principles Thinking
                                        <br />
                                        2. Inversion
                                        <br />
                                        3. Second-Order Thinking
                                        <br />
                                        4. Occam's Razor
                                        <br />
                                        5. Eisenhower Matrix
                                        <br /><br />
                                        A thread to level up your decision-making 🧵
                                    </p>
                                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                                        <span>💬 445</span>
                                        <span>🔄 1.2K</span>
                                        <span>❤️ 8.5K</span>
                                        <span>📊 125K</span>
                                    </div>
                                </div>
                            </div>
                            {/* Bookmark Button Overlay */}
                            <div className="relative -mt-2">
                                <div className="absolute right-0 top-0">
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
                                        <span className="text-sm font-semibold">📌 Save to PostZaper</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Process Arrow & Description */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-blue-600">
                                <div className="hidden md:block">
                                    <ArrowRight className="w-12 h-12" />
                                </div>
                                <div className="md:hidden">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-t-[20px] border-t-blue-600 border-r-[12px] border-r-transparent"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Click anywhere on the tweet</h4>
                                        <p className="text-sm text-gray-600">The extension detects the content automatically</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Bookmark button appears</h4>
                                        <p className="text-sm text-gray-600">One click to save the entire thread with metadata</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-blue-600 text-sm font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Instantly synced</h4>
                                        <p className="text-sm text-gray-600">Available across all your devices immediately</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3: View in Dashboard */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            03
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Access from your beautiful dashboard</h3>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                            {/* Dashboard Header */}
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-gray-900">My Feed</h4>
                                    <p className="text-xs text-gray-500">7 saved items to read</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-600">
                                        🔍 Search
                                    </div>
                                    <div className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold">
                                        + New Bookmark
                                    </div>
                                </div>
                            </div>

                            {/* Saved Bookmark Card */}
                            <div className="p-6">
                                <div className="bg-white rounded-xl border-2 border-blue-200 p-5 shadow-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                                            Just Saved ✓
                                        </div>
                                        <span className="text-xs text-gray-500">2 seconds ago</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-gray-900 text-sm">Sahil Bloom</span>
                                                <span className="text-xs text-gray-500">@SahilBloom</span>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-3">
                                                The 5 mental models that changed my life: 1. First Principles Thinking 2. Inversion...
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">𝕏 Twitter</span>
                                                <span>💬 445</span>
                                                <span>❤️ 8.5K</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
