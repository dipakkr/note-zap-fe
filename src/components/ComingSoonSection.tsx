import { Sparkles, TrendingUp, Brain, Zap } from 'lucide-react';

export default function ComingSoonSection() {
    const upcomingFeatures = [
        {
            icon: Brain,
            title: "AI Content Suggestions",
            description: "Get personalized content recommendations based on your interests and reading patterns.",
            status: "Coming Q2 2026",
            gradient: "from-purple-400 to-pink-600"
        },
        {
            icon: TrendingUp,
            title: "Trending Pattern Analysis",
            description: "Discover what topics are trending in your saved content and predict viral patterns.",
            status: "Coming Q2 2026",
            gradient: "from-blue-400 to-cyan-600"
        },
        {
            icon: Sparkles,
            title: "Smart Content Creation",
            description: "Generate engaging posts based on trending topics and your unique style to go viral.",
            status: "Coming Q3 2026",
            gradient: "from-orange-400 to-red-600"
        },
        {
            icon: Zap,
            title: "Intelligent Summaries",
            description: "Get AI-powered summaries of long articles and threads to save time.",
            status: "Coming Q3 2026",
            gradient: "from-green-400 to-emerald-600"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-6 border border-white/20">
                        <Sparkles className="w-4 h-4" />
                        Coming Soon
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        The future of intelligent bookmarking
                    </h2>
                    <p className="text-base text-gray-300 max-w-2xl mx-auto">
                        We're building AI-powered features to help you discover, create, and share content that resonates
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                    {upcomingFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                        >
                            <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium">{feature.status}</span>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Visual Preview - Content Creation Example */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">Sneak Peek: AI Content Generator</h3>
                            <p className="text-sm text-gray-300">
                                Based on your saved bookmarks and trending patterns, we'll help you create viral content
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Input */}
                            <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-white">Your Interests</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Startups</span>
                                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">AI</span>
                                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Productivity</span>
                                        <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">Marketing</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-xs text-gray-400 mb-2">Trending Pattern Detected:</p>
                                        <p className="text-sm text-gray-300">"AI productivity tools" 📈 +245% engagement</p>
                                    </div>
                                </div>
                            </div>

                            {/* Output */}
                            <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10 relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-white">AI Generated Post</span>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-200 leading-relaxed">
                                        5 AI tools that 10x'd my productivity:
                                        <br /><br />
                                        1. Claude for code reviews ✨
                                        <br />
                                        2. NotebookLM for research 📚
                                        <br />
                                        3. Perplexity for quick answers ⚡
                                        <br />
                                        4. Cursor for development 💻
                                        <br />
                                        5. PostZaper for saving insights 📌
                                        <br /><br />
                                        Which one should I explore in a thread? 🧵
                                    </p>
                                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                                        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-semibold">
                                            85% Viral Score
                                        </span>
                                        <span className="text-xs text-gray-400">Based on 1,250 similar posts</span>
                                    </div>
                                </div>

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-300 mb-4">Want early access to these features?</p>
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Join the Waitlist
                    </button>
                </div>
            </div>
        </section>
    );
}
