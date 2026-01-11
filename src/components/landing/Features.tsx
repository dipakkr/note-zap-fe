import { Zap, Users, UserPlus, Shield, Check } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container-tight">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
              <Zap className="h-3 w-3 text-background" />
            </div>
            <span className="font-medium">What You'll Love</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Social Media Superpowers,
            <br />
            <span className="italic text-primary">All in One Place.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Save time, collaborate better, and grow faster with
            <br />
            smart automation and AI-driven insights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Feature 1: One Click Everywhere */}
          <div className="rounded-2xl border bg-card p-8">
            <h3 className="text-xl font-bold">One Click. Everywhere.</h3>
            <p className="mt-2 text-muted-foreground">Save once. Access everywhere. Free up hours every week.</p>

            {/* Visual: Multi-platform illustration - hidden on mobile, compact on tablet */}
            <div className="mt-6 hidden sm:block aspect-[4/3] md:aspect-[4/3] rounded-xl border bg-gradient-to-br from-muted/30 to-muted/80 p-4 md:p-6 relative overflow-hidden">

              {/* Animated Connection Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Define paths that match the exact line positions */}
                  <path id="path-top-left" d="M 15 18 L 50 50" />
                  <path id="path-top-right" d="M 85 18 L 50 50" />
                  <path id="path-bottom-left" d="M 15 70 L 50 50" />
                  <path id="path-bottom-right" d="M 85 70 L 50 50" />
                </defs>

                {/* Top-left to center */}
                <line x1="15" y1="18" x2="50" y2="50" stroke="url(#lineGradient1)" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-70" vectorEffect="non-scaling-stroke" />

                {/* Top-right to center */}
                <line x1="85" y1="18" x2="50" y2="50" stroke="url(#lineGradient1)" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-70" vectorEffect="non-scaling-stroke" />

                {/* Bottom-left to center */}
                <line x1="15" y1="70" x2="50" y2="50" stroke="url(#lineGradient1)" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-70" vectorEffect="non-scaling-stroke" />

                {/* Bottom-right to center */}
                <line x1="85" y1="70" x2="50" y2="50" stroke="url(#lineGradient1)" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-70" vectorEffect="non-scaling-stroke" />

                {/* Animated dot: top-left to center */}
                <circle r="1.5" fill="#a855f7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                  <animateMotion dur="2.5s" repeatCount="indefinite">
                    <mpath href="#path-top-left" />
                  </animateMotion>
                </circle>

                {/* Animated dot: top-right to center */}
                <circle r="1.5" fill="#a855f7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.6s">
                    <mpath href="#path-top-right" />
                  </animateMotion>
                </circle>

                {/* Animated dot: bottom-left to center */}
                <circle r="1.5" fill="#a855f7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin="1.2s" />
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.2s">
                    <mpath href="#path-bottom-left" />
                  </animateMotion>
                </circle>

                {/* Animated dot: bottom-right to center */}
                <circle r="1.5" fill="#a855f7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin="1.8s" />
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.8s">
                    <mpath href="#path-bottom-right" />
                  </animateMotion>
                </circle>
              </svg>

              {/* Center hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 rounded-xl bg-primary shadow-xl shadow-primary/30 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>

              {/* Platform icons - just icons, no rectangles */}
              <div className="absolute top-6 left-6 flex flex-col items-center z-10">
                <img src="/chrome.svg" alt="Chrome" className="w-10 h-10" />
                <span className="text-[10px] text-muted-foreground mt-2">Chrome</span>
              </div>

              <div className="absolute top-6 right-6 flex flex-col items-center z-10">
                <img src="https://img.icons8.com/color/96/web.png" alt="Web App" className="w-10 h-10" />
                <span className="text-[10px] text-muted-foreground mt-2">Web App</span>
              </div>

              <div className="absolute bottom-16 left-6 flex flex-col items-center z-10">
                <img src="https://img.icons8.com/emoji/48/mobile-phone.png" alt="Mobile" className="w-10 h-10" />
                <span className="text-[10px] text-muted-foreground mt-2">Mobile</span>
              </div>

              <div className="absolute bottom-16 right-6 flex flex-col items-center z-10">
                <img src="https://img.icons8.com/fluency/48/desktop.png" alt="Desktop" className="w-10 h-10" />
                <span className="text-[10px] text-muted-foreground mt-2">Desktop</span>
              </div>

              {/* Platform badges bottom with margin */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
                <div className="flex gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border">
                  <img src="https://img.icons8.com/color/48/twitter--v1.png" alt="Twitter" className="w-7 h-7" />
                  <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" className="w-7 h-7" />
                  <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" className="w-7 h-7" />
                  <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Built for Teams */}
          <div className="rounded-2xl border bg-card p-8">
            <h3 className="text-xl font-bold">Built for Teams, Loved by Freelancers</h3>
            <p className="mt-2 text-muted-foreground">Invite unlimited team members, assign roles, and approve content seamlessly.</p>

            {/* Visual: Team collaboration illustration - hidden on mobile, compact on tablet */}
            <div className="mt-6 hidden sm:block aspect-[4/3] md:aspect-[4/3] rounded-xl border bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-6 relative overflow-hidden">
              {/* Team avatars with actual images */}
              <div className="absolute top-6 left-6 flex -space-x-2">
                <img
                  src="https://i.pravatar.cc/100?img=1"
                  alt="Team member"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <img
                  src="https://i.pravatar.cc/100?img=5"
                  alt="Team member"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <img
                  src="https://i.pravatar.cc/100?img=8"
                  alt="Team member"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-lg">+3</div>
              </div>

              {/* Role badges */}
              <div className="absolute top-6 right-4 space-y-2">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border text-xs">
                  <Shield className="w-3 h-3 text-blue-500" />
                  <span className="font-medium">Admin</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border text-xs">
                  <Users className="w-3 h-3 text-green-500" />
                  <span className="font-medium">Editor</span>
                </div>
              </div>

              {/* Invite card */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white rounded-xl shadow-xl border p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserPlus className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">Invite Team Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted/50 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                      colleague@company.com
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-medium shadow-lg shadow-primary/20">
                      Send Invite
                    </button>
                  </div>
                  {/* Success indicator */}
                  <div className="flex items-center gap-2 mt-3 text-xs text-green-600">
                    <Check className="w-3 h-3" />
                    <span>Invite sent.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
