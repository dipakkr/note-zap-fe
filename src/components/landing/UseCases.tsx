import { Zap, Play } from "lucide-react";

const UseCases = () => {
  return (
    <section className="section-padding wave-bg">
      <div className="container-tight">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
              <Zap className="h-3 w-3 text-background" />
            </div>
            <span className="font-medium">Your Viral Content Engine</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Never Run Out of
            <br />
            Content Ideas
            <br />
            <span className="italic text-primary">Ever Again.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Choose templates that match your style, get AI-powered viral content
            ideas, and turn inspiration into posts that actually get engagement.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 space-y-6">
          {/* Viral Content Ideas Card */}
          <div className="rounded-2xl border bg-card p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left Content */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
                  <Zap className="h-5 w-5 text-background" />
                </div>

                <h3 className="mt-6 text-2xl font-bold md:text-3xl">
                  Template-Powered Ideas
                </h3>

                <p className="mt-4 text-muted-foreground">
                  Pick the content templates that resonate with you—threads, hooks,
                  storytelling formats, or viral frameworks. Our AI generates fresh
                  ideas tailored to your niche, so you always know what to post.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "50+ proven viral content templates",
                    "AI-generated ideas based on your niche",
                    "Trending hooks and opening lines",
                    "One-click post generation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right - Template Cards Demo */}
              <div className="rounded-xl border bg-background p-4 shadow-sm">
                {/* Templates Header */}
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="font-medium">Popular Templates</span>
                  <span className="text-xs text-primary cursor-pointer hover:underline">View All →</span>
                </div>

                {/* Template Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { name: "Thread Starter", icon: "🧵", color: "bg-purple-500/10", uses: "12.4k" },
                    { name: "Contrarian Take", icon: "🔥", color: "bg-orange-500/10", uses: "8.2k" },
                    { name: "Hook Generator", icon: "🪝", color: "bg-blue-500/10", uses: "15.1k" },
                    { name: "Storytelling", icon: "📖", color: "bg-green-500/10", uses: "6.8k" },
                  ].map((template) => (
                    <div
                      key={template.name}
                      className={`rounded-lg ${template.color} p-3 cursor-pointer hover:scale-[1.02] transition-transform border border-transparent hover:border-primary/20`}
                    >
                      <div className="text-2xl">{template.icon}</div>
                      <div className="mt-2 text-sm font-medium">{template.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{template.uses} uses</div>
                    </div>
                  ))}
                </div>

                {/* Quick Generate Button */}
                <button className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  ✨ Generate Idea
                </button>
              </div>
            </div>
          </div>


          {/* See It In Action - Video Section */}
          <div className="rounded-2xl border bg-card p-8 lg:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
                  <Zap className="h-3 w-3 text-background" />
                </div>
                <span className="font-medium">See it to Believe it</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold md:text-3xl">
                See PostZaper in Action
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Watch how creators use templates to generate viral content
                ideas in seconds—no more staring at a blank screen.
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="mx-auto mt-8 max-w-4xl">
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-muted to-secondary shadow-lg">
                {/* Fake Video Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110 cursor-pointer">
                      <Play className="h-6 w-6 ml-1" fill="currentColor" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      PostZaper Demo – Generate Viral Content Ideas with AI-Powered Templates
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-foreground">
                    <Zap className="h-3 w-3 text-background" />
                  </div>
                  <span className="text-xs font-medium">PostZaper Demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
