import { Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white pt-6 pb-16">

      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-200/50 to-purple-100/40 rounded-full blur-[120px] opacity-70" />
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-gradient-to-br from-blue-100/50 to-cyan-50/40 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] bg-gradient-to-br from-orange-100/40 to-yellow-50/30 rounded-full blur-[100px] opacity-50" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative floating shapes */}
        <div className="absolute top-[15%] left-[15%] w-4 h-4 rounded-full bg-purple-300/40" />
        <div className="absolute top-[25%] right-[25%] w-3 h-3 rounded-full bg-blue-300/40" />
        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 rounded-full bg-orange-300/40" />
      </div>

      <div className="container-tight z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-20">

        {/* LEFT COLUMN: Concise & Impactful Content */}
        <div className="flex-1 text-left space-y-6 max-w-lg lg:min-w-[480px]">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wide shadow-sm w-fit">
            <span>🚀</span> Join 500+ Early Adopters
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Save Once.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Find Forever.</span>
            </h1>
            <p className="text-md text-gray-600 leading-relaxed max-w-md">
              Capture posts, threads, and profiles from LinkedIn & X with one click.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>One-click capture from X & LinkedIn</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Turn bookmarks into a Knowledge Graph</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>AI-powered auto-organization</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 h-12 px-6 rounded-full text-base shadow-xl shadow-gray-200/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              onClick={() => window.open('https://chromewebstore.google.com/detail/ecfbdcdbijkebgkjjdolbnapnkdpfoid', '_blank')}
            >
              {/* Chrome Logo */}
              <img src="/chrome.svg" alt="Chrome" className="w-5 h-5" />
              Add to Chrome
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 pt-4 text-sm text-gray-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-500 gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <span className="font-medium text-gray-900 text-xs">Loved by 1k+ creators</span>
            </div>
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
