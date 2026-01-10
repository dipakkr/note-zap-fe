import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Check,
    ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toolsData } from "@/data/tools";
import SEO from "@/components/SEO";

import ToolCard from "@/components/tools/ToolCard";

const ToolsHubPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const categories = Array.from(new Set(toolsData.map(t => t.category)));

    const filteredTools = toolsData.filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <>
            <SEO
                title="100+ Free Social Media Tools - Downloaders, Generators & More"
                description="Professional-grade marketing tools for content creators. Download videos, generate UTM links, create hashtags, and more - all completely free. No registration required."
                keywords="free social media tools, youtube downloader, instagram downloader, hashtag generator, utm builder, tiktok downloader, twitter tools"
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
                <div className="container-tight px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
                            100+ Free Social Media Tools
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                            Professional-grade marketing tools for content creators, marketers, and businesses.
                            Download videos, generate UTM links, optimize content, and more - all completely free.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                                <Check className="h-3.5 w-3.5 text-green-500" /> No registration required
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                                <Check className="h-3.5 w-3.5 text-green-500" /> Always free
                            </span>
                        </div>

                        {/* Search Bar */}
                        <div className="mx-auto max-w-xl relative">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search for a tool..."
                                    className="h-12 w-full rounded-xl border-2 border-muted bg-card pl-12 pr-4 text-base shadow-sm transition-all focus:border-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid Section */}
            <section className="bg-muted/30 py-16">
                <div className="container-tight px-4">

                    {searchQuery ? (
                        // Search Results View
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
                        // Standard View
                        <div className="space-y-24">
                            {/* Most Popular Tools */}
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-center mb-10">Most Popular Tools</h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {toolsData.filter(t => ['youtube-downloader', 'instagram-downloader', 'tiktok-downloader'].includes(t.id)).map((tool) => (
                                        <ToolCard key={tool.id} tool={tool} />
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="space-y-20">
                                {categories.map(category => {
                                    const categoryTools = toolsData.filter(t => t.category === category);
                                    if (categoryTools.length === 0) return null;

                                    // Special Layout for Downloaders
                                    if (category === "Downloader") {
                                        return (
                                            <div key={category} id="downloaders">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                                                    <h2 className="text-2xl font-bold tracking-tight">Video Downloaders</h2>
                                                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md">40+ Platforms</span>
                                                </div>

                                                {/* Featured Downloader Card */}
                                                <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border p-8 relative overflow-hidden group">
                                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                        <div className="space-y-4 max-w-2xl">
                                                            <h3 className="text-2xl font-bold text-foreground">All-in-One Social Media Downloader</h3>
                                                            <p className="text-muted-foreground text-lg">
                                                                Download videos and photos from any social media platform with a single tool. Supports YouTube, TikTok, Instagram, Facebook, and 40+ more platforms.
                                                            </p>
                                                            <div className="flex flex-wrap gap-2 pt-2">
                                                                {['YouTube', 'TikTok', 'Instagram', '+40 More'].map(platform => (
                                                                    <span key={platform} className="bg-background/80 backdrop-blur text-sm font-medium px-4 py-1.5 rounded-full border shadow-sm">
                                                                        {platform}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="shrink-0">
                                                            <Link to="/tools/social-media-photo-video-downloader" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow transition-transform hover:scale-105 active:scale-95">
                                                                Try Now <ArrowRight className="ml-2 h-4 w-4" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                    {categoryTools.map((tool) => (
                                                        <ToolCard key={tool.id} tool={tool} />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }

                                    const categoryTitles: Record<string, string> = {
                                        "Downloader": "Video Downloaders",
                                        "Generator": "Generators",
                                        "Utility": "Utilities",
                                        "AI": "AI Tools",
                                        "Formatter": "Text Formatters",
                                        "Analytics": "Analytics"
                                    };

                                    return (
                                        <div key={category} id={category.toLowerCase()}>
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                                                <h2 className="text-2xl font-bold tracking-tight">{categoryTitles[category] || `${category}s`}</h2>
                                                <div className="h-px bg-border flex-grow mt-1 opacity-50"></div>
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

        </>
    );
};

export default ToolsHubPage;
