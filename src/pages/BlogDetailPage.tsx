import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin } from 'lucide-react';
import { useEffect } from 'react';
import SEO from '@/components/SEO';


const BLOG_CONTENT: Record<string, any> = {
    'stop-hoarding-bookmarks': {
        title: "Stop Hoarding, Start Curating: The Anti-Collector's Guide",
        excerpt: "Why having 5,000 unread bookmarks is actually hurting your productivity, and how to fix it.",
        date: "Jan 5, 2026",
        readTime: "5 min read",
        author: "Deepak Kumar",
        authorRole: "Founder",
        image: "https://images.unsplash.com/photo-1456324504439-367cee101252?auto=format&fit=crop&q=80&w=1000",
        content: `
      <p>We've all been there. You see an interesting article, a useful thread, or a LinkedIn post that resonates. You hit "bookmark" or "save" and tell yourself, <em>"I'll read this later."</em></p>
      
      <p>But "later" never comes.</p>
      
      <p>Before you know it, you have thousands of bookmarks buried in your browser, Twitter profile, or LinkedIn saved items. They aren't a knowledge base; they are a graveyard of good intentions.</p>

      <h2>The Collector's Fallacy</h2>
      <p>There's a psychological phenomenon called the "Collector's Fallacy." It's the feeling that "collecting" information is the same as acquiring knowledge. It isn't.</p>
      
      <p>When you bookmark something, you get a small dopamine hit. You feel like you've done something productive. But unless you process that information, it's useless.</p>

      <h2>How to Break the Cycle</h2>
      <h3>1. The "One Touch" Rule</h3>
      <p>Don't just save blindly. When you save something, add a note immediately. Why are you saving this? What project is it for? If you can't answer that in 10 seconds, don't save it.</p>

      <h3>2. Use a Central Inbox</h3>
      <p>The problem with native bookmarks is that they are scattered. Twitter bookmarks live on Twitter. LinkedIn saved posts live on LinkedIn. You need one place—a "Central Inbox"—where everything goes. That's exactly why we built PostZaper.</p>

      <h3>3. Schedule "Processing" Time</h3>
      <p>Set aside 15 minutes a week to review your inbox. Delete what no longer sparks joy. Tag what is useful. Archive what you've read.</p>
      
      <p>Stop hoarding. Start curating. Your brain will thank you.</p>
    `
    },
    'knowledge-management-creators': {
        title: "The Second Brain for Content Creators",
        excerpt: "How top creators use systems like PostZaper to never run out of content ideas.",
        date: "Dec 28, 2025",
        readTime: "7 min read",
        author: "Deepak Kumar",
        authorRole: "Founder",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000",
        content: `
      <p>Every creator faces the same problem: The blank page.</p>
      <p>But the best creators don't start from scratch. They start from abundance. They have a system for capturing ideas, quotes, and inspirations as they consume content.</p>
      
      <h2>Input vs. Output</h2>
      <p>Your output quality is directly correlated to your input quality. If you consume junk, you'll produce junk. If you consume high-quality signals and <em>capture</em> them, you'll have a goldmine of ideas.</p>

      <p>Tiago Forte calls this a "Second Brain." We call it common sense for the digital age.</p>
    `
    },
    'why-we-chose-one-time-payment': {
        title: "Why We Chose a One-Time Payment Model",
        excerpt: "In a world of subscriptions, we decided to zig when everyone else zagged. Here's why.",
        date: "Dec 15, 2025",
        readTime: "4 min read",
        author: "Deepak Kumar",
        authorRole: "Founder",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
        content: `
      <p>Subscription fatigue is real. Everything is a monthly fee now. Your music, your movies, your doorbell, your heated seats.</p>
      
      <p>We decided to go against the grain.</p>
      
      <h2>Software as a Tool, Not a Landlord</h2>
      <p>We believe simple utilities should be owned, not rented. When you buy a hammer, you don't pay a monthly fee to keep using it.</p>
      
      <p>PostZaper is a tool. You buy it, you use it. Simple.</p>
    `
    }
};

export default function BlogDetailPage() {
    const { id } = useParams();
    const post = id ? BLOG_CONTENT[id] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="min-h-screen grid place-items-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <Link to="/blog" className="text-blue-600 hover:underline">Return to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={post.title}
                description={post.excerpt || post.title}
                ogType="article"
                ogImage={post.image}
            />
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                <div className="mb-8">
                    <Link to="/blog" className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>
                <header className="mb-12">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between border-t border-b border-gray-100 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                {post.author[0]}
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{post.author}</div>
                                <div className="text-sm text-gray-500">{post.authorRole}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[400px] object-cover rounded-2xl mb-12 shadow-lg"
                />

                <div
                    className="prose prose-lg prose-blue max-w-none text-gray-700 prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-16 pt-10 border-t border-gray-100 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to start curating?</h3>
                    <p className="text-gray-600 mb-8">Join thousands of smart curators using PostZaper today.</p>
                    <Link to="/" className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg hover:shadow-xl">
                        Get PostZaper
                    </Link>
                </div>
            </article>
        </>
    );
}
