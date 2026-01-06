import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';

const BLOG_POSTS = [
    {
        id: 'stop-hoarding-bookmarks',
        title: "Stop Hoarding, Start Curating: The Anti-Collector's Guide",
        excerpt: "Why having 5,000 unread bookmarks is actually hurting your productivity, and how to fix it.",
        date: "Jan 5, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1456324504439-367cee101252?auto=format&fit=crop&q=80&w=1000",
        category: "Productivity"
    },
    {
        id: 'knowledge-management-creators',
        title: "The Second Brain for Content Creators",
        excerpt: "How top creators use systems like PostZaper to never run out of content ideas.",
        date: "Dec 28, 2025",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000",
        category: "Knowledge Management"
    },
    {
        id: 'why-we-chose-one-time-payment',
        title: "Why We Chose a One-Time Payment Model",
        excerpt: "In a world of subscriptions, we decided to zig when everyone else zagged. Here's why.",
        date: "Dec 15, 2025",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
        category: "Company"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="h-6">
                            <Logo className="h-6 text-gray-900" />
                        </div>
                        <span className="font-bold text-lg">Blog</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Thoughts on productivity, curation, and building software.</h1>
                    <p className="text-xl text-gray-600">
                        We write about how to better manage the information flood.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <Link
                            to={`/blog/${post.id}`}
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-gray-900 rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-blue-600 font-semibold text-sm">
                                    Read Article
                                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
