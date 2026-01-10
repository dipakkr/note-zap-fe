import { Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white pt-6 pb-16">

      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
      </div>

      <div className="container-tight z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

        {/* LEFT COLUMN: Concise & Impactful Content */}
        <div className="flex-1 text-left space-y-6 max-w-xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wide shadow-sm animate-fade-in w-fit">
            <span>🏆</span> Product Hunt #1 Product of the Day
          </div>

          {/* Headline */}
          <div className="space-y-4 animate-fade-up animation-delay-100">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Save Once.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Find Forever.</span>
            </h1>
            <p className="text-md text-gray-600 leading-relaxed max-w-lg">
              The second brain for your social life. Capture posts, threads, and profiles from LinkedIn & X with one click.
            </p>
          </div>

          {/* Feature Checks - Minimal "Required" Content */}
          <div className="flex flex-col gap-2 text-gray-600 animate-fade-up animation-delay-200 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>One-click save from LinkedIn & Twitter</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Visualize your knowledge graph</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-up animation-delay-300">
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-gray-800 h-12 px-6 rounded-full text-base shadow-xl shadow-gray-200/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              onClick={() => window.open('https://chromewebstore.google.com/detail/postzaper-save-linkedin-t/hgecghfgpkhjjipffbnlgkdfbbpdjbiñ', '_blank')}
            >
              {/* Chrome ISO Logo */}
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0Z" fill="#F0F0F0" fillOpacity="0.01" />
                <path d="M24 22L44 26L24 46L4 26L24 22Z" fill="#2196F3" />
                <path d="M24 22L36 6H12L24 22Z" fill="#D32F2F" />
                <path d="M24 22L12 38H36L24 22Z" fill="#FBC02D" />
                {/* A simpler standardized Chrome Icon Structure */}
                <circle cx="24" cy="24" r="10" fill="white" />
                <path d="M23.9999 44C35.0456 44 43.9999 35.0457 43.9999 24C43.9999 12.9543 35.0456 4 23.9999 4C12.9542 4 3.99991 12.9543 3.99991 24C3.99991 35.0457 12.9542 44 23.9999 44Z" fill="white" fillOpacity="0.01" />
                <path d="M41.2727 24C41.2727 34.1205 32.5936 42.4308 22.2155 43.1491L13.5654 28.1666L23.9999 10.1111L34.4345 28.1666H17.1327" fill="#4CAF50" />
                <path d="M23.9999 10.1111L13.5654 28.1666L4.91537 13.1841C10.8988 2.82283 23.9999 2.10093 23.9999 10.1111Z" fill="#D32F2F" />
                <path d="M41.2727 24H23.9999L15.35 9.01755C26.7909 9.01755 37.4087 14.2882 41.2727 24Z" fill="#FBC02D" />
                <circle cx="24" cy="24" r="9" fill="white" />
                <circle cx="24" cy="24" r="7.5" fill="#4285F4" />
              </svg>
              Add to Chrome
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 rounded-full text-base border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all text-gray-700"
              onClick={() => navigate('/auth')}
            >
              Open Dashboard
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 pt-4 text-sm text-gray-500 animate-fade-up animation-delay-400">
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
              <span className="font-medium text-gray-900 text-xs">Loved by 25k+ creators</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Animation */}
        <div className="flex-1 w-full relative h-[400px] lg:h-[550px] flex items-center justify-center animate-fade-in lg:-mr-20 scale-90">
          <HeroAnimation />
        </div>

      </div>
    </section>
  );
};

export default Hero;
