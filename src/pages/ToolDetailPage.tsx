import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Zap,
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
    Type
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { toolsData } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Map icon strings to components (duplicated for now, could be util)
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

const ToolDetailPage = () => {
    const { slug } = useParams();
    const tool = toolsData.find(t => t.slug === slug);

    // Set page title for SEO
    useEffect(() => {
        if (tool) {
            document.title = `${tool.seoTitle} | PostZaper`;
            // Meta description tag updating would happen here in a real app (e.g. using react-helmet)
        }
    }, [tool]);

    if (!tool) {
        return <Navigate to="/tools" replace />;
    }

    const IconComponent = IconMap[tool.iconName] || Sparkles;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Breadcrumb & Navigation */}
                <div className="border-b bg-muted/20">
                    <div className="container-tight py-4">
                        <Link to="/tools" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to all tools
                        </Link>
                    </div>
                </div>

                {/* Hero / Tool Interface Section */}
                <section className="bg-gradient-to-b from-muted/30 to-background pt-12 pb-20">
                    <div className="container-tight max-w-4xl px-4 text-center">

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

                        {/* The Actual Tool Interface (Placeholder for common pattern) */}
                        <div className="bg-card border rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl mx-auto">
                            <div className="flex flex-col gap-4">
                                <div className="relative">
                                    <Input
                                        placeholder={
                                            tool.category === "Downloader" ? "Paste video URL here..." :
                                                tool.category === "Generator" ? "Enter keywords..." :
                                                    "Enter text or URL..."
                                        }
                                        className="h-14 text-lg px-6 rounded-xl border-2 focus-visible:ring-primary/20"
                                    />
                                    <div className="absolute right-2 top-2 bottom-2">
                                        <Button size="lg" className="h-full rounded-lg px-6 font-bold text-base shadow-md">
                                            {tool.category === "Downloader" ? "Download" : "Generate"}
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
                </section>

                {/* SEO Content Section */}
                <section className="py-20 section-padding">
                    <div className="container-tight max-w-4xl px-4">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <h2>Free {tool.title} Tool 2026</h2>
                            <p className="lead">{tool.seoDescription}</p>

                            <div className="my-12 grid gap-8 md:grid-cols-3">
                                <div className="flex flex-col gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-2">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold m-0">100% Free</h3>
                                    <p className="text-muted-foreground text-base m-0">Unlimited use with no hidden fees or subscriptions required.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold m-0">High Speed</h3>
                                    <p className="text-muted-foreground text-base m-0">Lightning fast processing ensures you get your results in seconds.</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold m-0">Secure & Safe</h3>
                                    <p className="text-muted-foreground text-base m-0">We respect your privacy. No data is stored on our servers.</p>
                                </div>
                            </div>

                            <h3>Why Choose Our {tool.title}?</h3>
                            <p>
                                In today's fast-paced social media landscape, efficiency is key. Our <strong>{tool.title}</strong> helps you streamline your workflow
                                by automating tedious tasks. Whether you're a content creator, marketer, or business owner, this tool is designed to save you time
                                and improve your content quality.
                            </p>
                            <p>
                                Unlike other tools that bombard you with ads or require sign-ups, PostZaper offers a clean, distraction-free experience.
                                We focus on delivering high-quality results instantly.
                            </p>

                            <h3>Key Features & Benefits</h3>
                            <ul>
                                <li><strong>Easy to Use:</strong> User-friendly interface designed for everyone.</li>
                                <li><strong>No Watermarks:</strong> Get clean results every time.</li>
                                <li><strong>Cross-Platform:</strong> Works on Desktop, Mobile, and Tablet.</li>
                                <li><strong>High Quality:</strong> We prioritize output quality for professional use.</li>
                            </ul>

                            <h3>How to Use This Tool</h3>
                            <ol>
                                <li>{tool.category === "Downloader" ? "Copy the URL of the video or content you want to download." : "Enter your input text or keywords in the field above."}</li>
                                <li>{tool.category === "Downloader" ? "Paste the link into the input box at the top of this page." : "Adjust any available settings to customize your result."}</li>
                                <li>Click the <strong>{tool.category === "Downloader" ? "Download" : "Generate"}</strong> button.</li>
                                <li>Wait a few seconds for our servers to process your request.</li>
                                <li>Save or copy your result and use it in your next viral post!</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                {tool.faqs.length > 0 && (
                    <section className="py-16 bg-muted/30">
                        <div className="container-tight max-w-3xl px-4">
                            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {tool.faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item - ${index} `}>
                                        <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                                {/* Generic FAQs added to all tools */}
                                <AccordionItem value="generic-1">
                                    <AccordionTrigger className="text-left font-semibold">Do I need to install any software?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        No, PostZaper tools are completely web-based. You can access them from any browser without installing extensions or software.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="generic-2">
                                    <AccordionTrigger className="text-left font-semibold">Is it safe to use this tool?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Yes, our site uses SSL encryption to ensure your connection is secure. We do not store your personal data or downloaded files.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </section>
                )}

                {/* Related Tools Footer */}
                <section className="py-20">
                    <div className="container-tight px-4">
                        <h2 className="text-2xl font-bold mb-8">Explore More Free Tools</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {toolsData.filter(t => t.id !== tool.id).slice(0, 8).map(t => (
                                <Link
                                    key={t.id}
                                    to={`/ tools / ${t.slug} `}
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
            </main>

            <Footer />
        </div>
    );
};

export default ToolDetailPage;
