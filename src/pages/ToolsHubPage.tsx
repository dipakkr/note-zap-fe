import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Search
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { toolsData } from "@/data/tools";
import { Input } from "@/components/ui/input";

import ToolCard from "@/components/tools/ToolCard";

const ToolsHubPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(toolsData.map(t => t.category)));

    const filteredTools = toolsData.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
                <div className="container-tight px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            100+ Free Social Media Tools
                        </h1>
                        <p className="mt-6 text-xl text-muted-foreground">
                            A complete suite of free tools to create, edit, convert, and optimize<br className="hidden sm:block" /> your social media content.
                        </p>

                        {/* Search Bar */}
                        <div className="mx-auto mt-10 max-w-xl relative">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search for a tool..."
                                    className="h-14 w-full rounded-2xl border-2 border-muted bg-card pl-12 pr-4 text-lg shadow-sm transition-all focus:border-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category Pills */}
                        <div className="mt-8 flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedCategory === null
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    }`}
                            >
                                All Tools
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedCategory === cat
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container-tight px-4">

                    {searchQuery ? (
                        // Search Results View (Flat Grid)
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredTools.length > 0 ? (
                                filteredTools.map((tool) => (
                                    <ToolCard key={tool.id} tool={tool} />
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-muted-foreground">
                                    <p className="text-lg">No tools found matching "{searchQuery}".</p>
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="mt-4 text-primary hover:underline"
                                    >
                                        Clear search
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Categorized View (SEO Optimized)
                        <div className="space-y-20">
                            {categories.map(category => {
                                const categoryTools = toolsData.filter(t => t.category === category);
                                if (categoryTools.length === 0) return null;

                                return (
                                    <div key={category} id={category.toLowerCase()}>
                                        <div className="flex items-center gap-4 mb-8">
                                            <h2 className="text-2xl font-bold tracking-tight">{category}s</h2>
                                            <div className="h-px bg-border flex-grow"></div>
                                        </div>
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {categoryTools.map((tool) => (
                                                <ToolCard key={tool.id} tool={tool} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </section>

            {/* SEO Link Farm / Popular Searches (Mimicking PostSyncer Structure) */}
            <section className="py-16 border-t font-sans">
                <div className="container-tight px-4">
                    <h3 className="text-lg font-bold mb-6">Popular Searches</h3>
                    <div className="grid gap-y-3 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-sm text-muted-foreground">
                        <Link to="/tools/youtube-video-downloader" className="hover:text-primary hover:underline">Download YouTube 4K</Link>
                        <Link to="/tools/youtube-shorts-downloader" className="hover:text-primary hover:underline">Save YT Shorts</Link>
                        <Link to="/tools/instagram-reel-downloader" className="hover:text-primary hover:underline">Instagram Video Saver</Link>
                        <Link to="/tools/tiktok-video-downloader" className="hover:text-primary hover:underline">TikTok No Watermark</Link>
                        <Link to="/tools/twitter-photo-resizer" className="hover:text-primary hover:underline">Twitter Header Size</Link>
                        <Link to="/tools/linkedin-text-formatter" className="hover:text-primary hover:underline">Bold Text Generator</Link>
                        <Link to="/tools/hashtag-generator" className="hover:text-primary hover:underline">Best Instagram Hashtags</Link>
                        <Link to="/tools/utm-generator" className="hover:text-primary hover:underline">Campaign URL Builder</Link>
                        <Link to="/tools/twitter-thread-maker" className="hover:text-primary hover:underline">Thread Writer</Link>
                        <Link to="/tools/linkedin-photo-resizer" className="hover:text-primary hover:underline">LinkedIn Banner Size</Link>
                        <Link to="/tools/ai-post-hook-generator" className="hover:text-primary hover:underline">Viral Hook Generator</Link>
                        <Link to="/tools/youtube-tags-generator" className="hover:text-primary hover:underline">YouTube SEO Tags</Link>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-20">
                <div className="container-tight max-w-4xl px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Why use our free tools?</h2>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                        PostZaper provides a comprehensive suite of utilities designed to streamline your content creation process.
                        Whether you need to download assets, generate tags, or format your text, our tools are fast, free, and secure.
                        We don't require registration for basic use, allowing you to get your work done instantly.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ToolsHubPage;
