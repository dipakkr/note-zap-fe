import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Youtube,
    Hash,
    FileText,
    Download,
    Link as LinkIcon,
    Image as ImageIcon,
    Twitter,
    Linkedin,
    Instagram,
    Sparkles,
    Video,
    Type,
    Copy,
    Check
} from "lucide-react";

import { toolsData, type Tool } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";

// Map icon strings to components
const IconMap: Record<string, any> = {
    Youtube,
    Hash,
    FileText,
    Download,
    Link: LinkIcon,
    ImageIcon,
    Twitter,
    Linkedin,
    Instagram,
    Sparkles,
    Video,
    Type
};

const SUPPORTED_PLATFORMS = [
    "Instagram", "TikTok", "YouTube", "Twitter/X", "Facebook", "Pinterest",
    "Threads", "LinkedIn", "Reddit", "Tumblr", "Telegram", "Bluesky",
    "Snapchat", "Vimeo", "Dailymotion", "Bilibili", "SoundCloud", "Spotify",
    "Mixcloud", "Deezer", "Bandcamp", "Imgur", "CapCut", "Douyin",
    "Kuaishou", "QQ Video", "ESPN", "IMDB", "ShareChat", "Likee",
    "TED", "SohuTV", "Xiaohongshu", "Ixigua", "Weibo", "National",
    "Castbox", "MediaFire"
];

const DownloaderView = ({ tool }: { tool: Tool }) => {
    const [url, setUrl] = useState("");
    const [pasting, setPasting] = useState(false);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
            setPasting(true);
            setTimeout(() => setPasting(false), 1000);
        } catch (err) {
            console.error('Failed to read clipboard');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-background pt-16 pb-20 dark:from-blue-950/20 dark:to-background">
                <div className="container-tight max-w-4xl px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 dark:bg-blue-500/20 dark:text-blue-300">
                        <Download className="w-3 h-3" />
                        Free Social Media Downloader
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-foreground">
                        {tool.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                        Instagram, YouTube, TikTok, Twitter & More. Download videos, photos, and audio content in high quality without watermarks - completely free.
                    </p>

                    {/* Main Input Area */}
                    <div className="bg-card border shadow-2xl rounded-2xl p-4 md:p-6 max-w-3xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-grow">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    <LinkIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Paste any social media URL here..."
                                    className="w-full h-14 pl-12 pr-24 rounded-xl border-2 border-muted bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-lg"
                                />
                                <button
                                    onClick={handlePaste}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-muted text-xs font-bold hover:bg-muted/80 transition-colors flex items-center gap-1.5 text-muted-foreground"
                                >
                                    {pasting ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    Paste
                                </button>
                            </div>
                            <button className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 whitespace-nowrap">
                                <Download className="w-5 h-5" />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Supported Platforms Grid */}
            <section className="py-16 border-b border-border/50">
                <div className="container-tight px-4 max-w-5xl">
                    <h2 className="text-center text-2xl font-bold mb-10">Supported Platforms</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {SUPPORTED_PLATFORMS.map(platform => (
                            <div key={platform} className="flex items-center gap-2 p-3 rounded-xl border bg-card hover:border-primary/50 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                                <span className="text-sm font-medium truncate">{platform}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-muted/30">
                <div className="container-tight px-4 max-w-5xl">
                    <h2 className="text-3xl font-black text-center mb-12">How to Download Social Media Content</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Copy the URL", desc: "Go to your desired social media post and copy the link." },
                            { step: "2", title: "Paste & Analyze", desc: "Paste the URL into our downloader tool above." },
                            { step: "3", title: "Choose Quality", desc: "Select your preferred video quality and format." },
                            { step: "4", title: "Download", desc: "Click download to save the content to your device." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-6 rounded-2xl bg-card border shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-lg mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO & Features Content */}
            <section className="py-20">
                <div className="container-tight px-4 max-w-4xl prose prose-lg dark:prose-invert">
                    <h2 className="text-3xl font-bold">Why Choose Our Social Media Downloader?</h2>
                    <p>
                        Our comprehensive social media downloader is the ultimate tool for downloading content from all major platforms
                        including Instagram, TikTok, Twitter, YouTube, and Facebook. Download videos, photos, and audio content in
                        high quality without watermarks - completely free.
                    </p>
                    <p>
                        Perfect for content creators, digital marketers, social media managers, researchers, and anyone who wants
                        to save social media content for offline viewing, content repurposing, or backup purposes.
                    </p>

                    <h3 className="mt-12 mb-6 text-2xl font-bold">Key Features & Benefits</h3>
                    <div className="grid sm:grid-cols-2 gap-6 not-prose">
                        {[
                            { title: "No Watermarks", desc: "Download clean videos and images without platform watermarks." },
                            { title: "High Quality", desc: "Original quality preservation up to 4K resolution." },
                            { title: "Bulk Download", desc: "Download multiple files simultaneously." },
                            { title: "No Registration", desc: "Use instantly without creating accounts." },
                            { title: "Mobile Friendly", desc: "Works perfectly on all devices and browsers." },
                            { title: "Fast & Secure", desc: "Quick downloads with SSL encryption." }
                        ].map((feat, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card/50">
                                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-base mb-1">{feat.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-snug">{feat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="mt-12 text-2xl font-bold">Supported File Formats & Quality Options</h3>
                    <div className="grid sm:grid-cols-2 gap-8 not-prose mt-6">
                        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
                            <h4 className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-300 mb-4">
                                <Video className="w-5 h-5" /> Video Formats
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> MP4 (most compatible)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> MOV (Apple devices)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> AVI (Windows compatible)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Quality: 240p to 4K</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900">
                            <h4 className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-300 mb-4">
                                <ImageIcon className="w-5 h-5" /> Image & Audio
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> JPG/JPEG (photos)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> PNG (transparent images)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> MP3 (audio extraction)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> High Res Originals</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-muted border-l-4 border-primary">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <ShieldCheck className="w-5 h-5 text-primary" /> Privacy, Security & Legal Compliance
                        </h4>
                        <p className="text-sm text-muted-foreground mb-0">
                            We prioritize your privacy and security. Our tool only processes publicly available social media content and doesn't store any downloaded files on our servers. All downloads are processed securely with SSL encryption.
                            <br /><br />
                            <strong>Important:</strong> Please ensure you have the right to download and use any content before saving it. Always respect copyright laws, intellectual property rights, and platform terms of service.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section from User Copy */}
            <section className="py-16 bg-muted/30">
                <div className="container-tight max-w-3xl px-4">
                    <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
                    <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
                        Find answers to common questions about downloading videos from social media platforms.
                    </p>
                    <Accordion type="single" collapsible className="w-full bg-card rounded-xl border shadow-sm px-6 py-2">
                        {[
                            { q: "Is this social media downloader really free?", a: "Yes, our social media downloader is completely free to use with no hidden fees, subscription requirements, or credit card needed. You can download unlimited videos, photos, and audio from Instagram, TikTok, Twitter, YouTube, Facebook, and 40+ other platforms without any cost." },
                            { q: "Can I download private social media content?", a: "No, our tool only works with publicly available content that doesn't require login or special permissions. We respect user privacy and platform terms of service." },
                            { q: "What's the maximum video quality I can download?", a: "You can download videos up to the original quality available from the source platform, including 4K resolution when available. Quality depends on what the original uploader shared." },
                            { q: "Do downloaded videos have watermarks?", a: "No, all downloads are watermark-free. Unlike many other downloaders, we extract the original media files directly from the platform servers ensuring clean downloads." },
                            { q: "Which platforms are supported?", a: "We support 40+ platforms including Instagram, TikTok, YouTube, Twitter/X, Facebook, Pinterest, Vimeo, Reddit, LinkedIn, Snapchat, and many more." },
                            { q: "Does this work on mobile devices?", a: "Yes, our downloader is fully mobile-friendly and works perfectly on smartphones and tablets (iOS and Android) via any browser." }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`}>
                                <AccordionTrigger className="text-left font-bold text-base">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/20 ml-2">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </div>
    );
};

const ToolDetailPage = () => {
    const { slug } = useParams();
    const tool = toolsData.find(t => t.slug === slug);

    // Set page title for SEO and scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
        if (tool) {
            document.title = `${tool.seoTitle} | PostZaper`;
        }
    }, [tool]);

    if (!tool) {
        return <Navigate to="/tools" replace />;
    }

    // Use specific layout for generic downloader or individual downloaders if desired
    // For now, applying to the 'All-in-One' specifically, or potentially all category='Downloader'
    // but the copy provided was very specific to the 'All-in-One' multi-platform utility.
    // Let's us the DownloaderView for ALL downloaders to give them this premium feel,
    // but the 'Supported Platforms' list is most accurate for the generic one.
    // We can make it adaptive or just use for category "Downloader".
    if (tool.category === "Downloader") {
        return (

            <>
                <SEO
                    title={tool.seoTitle}
                    description={tool.seoDescription}
                    keywords={`${tool.title}, free downloader, video download, social media downloader`}
                />
                <DownloaderView tool={tool} />
                {/* Related Tools Footer */}
                <section className="py-20 border-t">
                    <div className="container-tight px-4">
                        <h2 className="text-2xl font-bold mb-8">Explore More Free Tools</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {toolsData.filter(t => t.id !== tool.id).slice(0, 8).map(t => (
                                <Link
                                    key={t.id}
                                    to={`/tools/${t.slug}`}
                                    className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors flex items-center gap-3"
                                >
                                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center shrink-0">
                                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <span className="text-sm font-medium line-clamp-2">{t.title}</span>
                                </Link>
                            ))}
                            <Link
                                to="/tools"
                                className="p-4 rounded-xl border border-dashed bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 text-primary font-medium"
                            >
                                View All Tools <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        );

    }

    const IconComponent = IconMap[tool.iconName] || Sparkles;

    // Default View for Generators/Utilities
    return (
        <>
            <SEO
                title={tool.seoTitle}
                description={tool.seoDescription}
                keywords={`${tool.title}, free tool, social media tool, ${tool.category.toLowerCase()}`}
            />
            {/* Hero / Tool Interface Section */}
            <section className="bg-gradient-to-b from-muted/30 to-background pt-12 pb-20">
                <div className="container-tight max-w-4xl px-4">
                    <div className="mb-6">
                        <Link to="/tools" className="inline-flex items-center justify-center p-2 rounded-full bg-background border shadow-sm hover:bg-muted transition-colors" title="Back to all tools">
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Link>
                    </div>
                    <div className="text-center">

                        {/* Tool Header */}
                        <div className="flex justify-center mb-6">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <IconComponent className="h-8 w-8 text-primary" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-6">
                            {tool.title}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                            {tool.shortDescription}
                        </p>

                        {/* The Actual Tool Interface */}
                        <div className="bg-card border rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl mx-auto">
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <Input
                                        placeholder={
                                            tool.category === "Generator" ? "Enter keywords..." :
                                                "Enter text or URL..."
                                        }
                                        className="h-14 text-lg px-6 rounded-xl border-2 focus-visible:ring-primary/20"
                                    />
                                    <div className="absolute right-2 top-2 bottom-2">
                                        <Button size="lg" className="h-full rounded-lg px-6 font-bold text-base shadow-md">
                                            {tool.category === "Generator" ? "Generate" : "Submit"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Secondary Actions / Helper text */}
                                <p className="text-xs text-muted-foreground mt-2">
                                    No registration required. By using this tool you agree to our Terms of Service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-20 section-padding">
                <div className="container-tight max-w-4xl px-4">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Free {tool.title} Tool 2026</h2>
                        <p className="lead">{tool.seoDescription}</p>

                        {/* Generic filler content for non-downloaders */}
                        <p>
                            Efficiently manage your social media tasks with our free {tool.title}.
                            Designed for creators and marketers to boost productivity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Tools Footer (Duplicated layout - could be componentized) */}
            <section className="py-20 border-t">
                <div className="container-tight px-4">
                    <h2 className="text-2xl font-bold mb-8">Explore More Free Tools</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {toolsData.filter(t => t.id !== tool.id).slice(0, 8).map(t => (
                            <Link
                                key={t.id}
                                to={`/tools/${t.slug}`}
                                className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors flex items-center gap-3"
                            >
                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center shrink-0">
                                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <span className="text-sm font-medium line-clamp-2">{t.title}</span>
                            </Link>
                        ))}
                        <Link
                            to="/tools"
                            className="p-4 rounded-xl border border-dashed bg-muted/30 hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 text-primary font-medium"
                        >
                            View All Tools <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </ >
    );

};

export default ToolDetailPage;
