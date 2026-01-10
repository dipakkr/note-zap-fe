import {
    Youtube,
    Hash,
    FileText,
    Download,
    Link,
    Twitter,
    Linkedin,
    Instagram,
    MousePointer2,
    ArrowRight,
    Sparkles,
    Video,
    Type
} from "lucide-react";

const tools = [
    {
        title: "YouTube Video Downloader",
        description: "Download high-quality YouTube videos in MP4 and MP3 formats for offline viewing.",
        icon: <Youtube className="h-6 w-6 text-[#FF0000]" />,
        href: "#",
        tag: "Video"
    },
    {
        title: "YouTube Tags Generator",
        description: "Generate SEO-optimized tags for your YouTube videos to skyrocket your views.",
        icon: <Hash className="h-6 w-6 text-[#FF0000]" />,
        href: "#",
        tag: "SEO"
    },
    {
        title: "YouTube AI Description",
        description: "Create compelling video descriptions with AI that improve engagement and ranking.",
        icon: <Sparkles className="h-6 w-6 text-[#FF0000]" />,
        href: "#",
        tag: "AI"
    },
    {
        title: "Hashtag Generator",
        description: "Find the best hashtags for Twitter, Instagram, and LinkedIn to broaden your reach.",
        icon: <Hash className="h-6 w-6 text-primary" />,
        href: "#",
        tag: "Social"
    },
    {
        title: "Photo & Video Downloader",
        description: "All-in-one downloader for Instagram Reels, Facebook Videos, and Pinterest Pins.",
        icon: <Download className="h-6 w-6 text-primary" />,
        href: "#",
        tag: "Media"
    },
    {
        title: "UTM Generator",
        description: "Track your marketing campaigns with clean and professional UTM parameters.",
        icon: <Link className="h-6 w-6 text-primary" />,
        href: "#",
        tag: "Utility"
    },
    {
        title: "Twitter Photo Resizer",
        description: "Perfectly resize your images for Twitter posts, headers, and profile photos.",
        icon: <Twitter className="h-6 w-6 text-[#1DA1F2]" />,
        href: "#",
        tag: "Graphics"
    },
    {
        title: "LinkedIn Photo Resizer",
        description: "Optimize your LinkedIn profile and banner images with our pro resizing tool.",
        icon: <Linkedin className="h-6 w-6 text-[#0A66C2]" />,
        href: "#",
        tag: "Graphics"
    },
    {
        title: "Pinterest Photo Resizer",
        description: "Create perfectly sized Pinterest pins and board covers in seconds.",
        icon: <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E60023] text-white text-[10px] font-bold">P</div>,
        href: "#",
        tag: "Graphics"
    },
    {
        title: "Twitter Thread Maker",
        description: "Draft, organize, and preview your Twitter threads before they go live.",
        icon: <FileText className="h-6 w-6 text-[#1DA1F2]" />,
        href: "#",
        tag: "Content"
    },
    {
        title: "LinkedIn Text Formatter",
        description: "Add Bold, Italic, and Unicode styles to your LinkedIn posts for better visibility.",
        icon: <Type className="h-6 w-6 text-[#0A66C2]" />,
        href: "#",
        tag: "Format"
    },
    {
        title: "Instagram Reel Downloader",
        description: "Fast and reliable tool to save high-resolution Instagram reels to your device.",
        icon: <Instagram className="h-6 w-6 text-[#E4405F]" />,
        href: "#",
        tag: "Media"
    },
    {
        title: "TikTok Video Downloader",
        description: "Download TikTok videos without watermark in HD quality for reposting.",
        icon: <Video className="h-6 w-6 text-foreground" />,
        href: "#",
        tag: "Media"
    },
    {
        title: "AI Post Hook Generator",
        description: "Struggling with the first line? Let AI generate scroll-stopping hooks for you.",
        icon: <Sparkles className="h-6 w-6 text-primary" />,
        href: "#",
        tag: "AI"
    }
];

const FreeTools = () => {
    return (
        <section id="free-tools" className="section-padding bg-muted/30">
            <div className="container-tight">
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm shadow-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-primary">
                            <Sparkles className="h-3 w-3 text-primary-foreground" />
                        </div>
                        <span className="font-medium">Free Resources</span>
                    </div>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Free Tools to Supercharge Your
                        <br />
                        <span className="italic text-primary underline decoration-primary/30 underline-offset-8">Content Workflow.</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                        Everything you need to create, optimize, and share your social media content—completely free.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tools.map((tool, index) => (
                        <a
                            key={index}
                            href={tool.href}
                            className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div className="rounded-xl bg-muted/50 p-2.5 transition-colors group-hover:bg-primary/5">
                                    {tool.icon}
                                </div>
                                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                                    {tool.tag}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{tool.title}</h3>
                            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                {tool.description}
                            </p>

                            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                Try Tool <ArrowRight className="h-3 w-3" />
                            </div>
                        </a>
                    ))}

                    {/* Call to action card */}
                    <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted p-6 text-center transition-all hover:border-primary/30 hover:bg-primary/[0.02]">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Discover 100+ More</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            We're constantly building new tools to help you grow.
                        </p>
                        <a href="/tools" className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                            Explore All <MousePointer2 className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                {/* SEO Catch-all Footer */}
                <div className="mt-20 rounded-3xl bg-foreground p-8 text-background sm:p-12">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h3 className="text-2xl font-bold italic sm:text-3xl">Ready to take your social game to the next level?</h3>
                            <p className="mt-4 text-muted-foreground">
                                Thousands of creators use PostZaper to manage their entire social presence from one simple dashboard. Join them today.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 lg:justify-end">
                            <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 font-bold backdrop-blur-sm transition-all hover:bg-white/20">
                                Learn More
                            </button>
                            <button className="rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground shadow-xl shadow-primary/40 transition-all hover:scale-105 active:scale-95">
                                Join PostZaper Free
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FreeTools;
