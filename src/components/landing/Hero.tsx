import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-white pt-6 pb-16">

      <div className="container-tight z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-20">

        {/* LEFT COLUMN */}
        <div className="flex-1 text-left space-y-6 max-w-lg lg:min-w-[480px]">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wide w-fit">
            <span>🔖</span> Bookmark manager for creators
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Save posts.<br />
              Find them<br />
              <span className="text-primary">instantly.</span>
            </h1>
            <p className="text-md text-gray-600 leading-relaxed max-w-md">
              One-click bookmarking from X and LinkedIn. Everything organized, searchable, and always at your fingertips — no more losing great content.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Save from X & LinkedIn with one click via Chrome extension</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Organize into collections and tag for easy retrieval</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Search across all your saved content in seconds</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 h-12 px-6 rounded-full text-base shadow-xl shadow-gray-200/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              onClick={() => window.open('https://chromewebstore.google.com/detail/ecfbdcdbijkebgkjjdolbnapnkdpfoid', '_blank')}
            >
              <img src="/chrome.svg" alt="Chrome" className="w-5 h-5" />
              Add to Chrome — It's Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 rounded-full text-base border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN: Animation - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex flex-1 w-full relative h-[400px] lg:h-[550px] items-center justify-center lg:-mr-10 scale-90">
          <HeroAnimation />
        </div>

      </div>
    </section>
  );
};

export default Hero;
