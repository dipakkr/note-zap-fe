import { Sparkles, Bookmark, TrendingUp, Brain, ArrowRight, Heart, Repeat2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeatureShowcase = () => {
  const savedPosts = [
    {
      author: "@marketingguru",
      content: "The secret to 10x growth isn't working harder...",
      likes: "24.5K",
      retweets: "8.2K",
      saved: true
    },
    {
      author: "@techinnovator",
      content: "I spent $0 on ads and got 100K followers...",
      likes: "18.3K",
      retweets: "5.1K",
      saved: true
    },
    {
      author: "@startupfounder",
      content: "Here's what nobody tells you about scaling...",
      likes: "31.2K",
      retweets: "12.4K",
      saved: true
    },
  ];

  const generatedContent = {
    content: "The real secret to explosive growth? It's not about the hustle, it's about the system. Here's my 5-step framework that took me from 0 to 50K followers in 90 days...",
    viralScore: 94,
    predictedLikes: "15K-25K",
    bestTime: "9:00 AM EST"
  };

  return (
    <section className="section-padding wave-bg-bottom overflow-hidden">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Viral Engine</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700">Coming Soon</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Turn <span className="italic text-primary">viral inspiration</span> into
            <br />your own viral content
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Save posts that go viral. Our AI learns the patterns, hooks, and structures, then
            creates original content with higher chances of going viral.
          </p>
        </div>

        {/* Main Visual */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left: Saved Viral Posts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Bookmark className="h-5 w-5 text-primary" />
              <span className="font-semibold">Your Viral Bookmarks</span>
              <span className="ml-auto text-sm text-muted-foreground">3 posts saved</span>
            </div>

            {savedPosts.map((post, index) => (
              <div
                key={index}
                className="group relative rounded-xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20" />
                      <span className="font-medium text-sm">{post.author}</span>
                      <Bookmark className="h-4 w-4 text-primary fill-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 className="h-3 w-3" /> {post.retweets}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Learning indicator */}
                <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
              </div>
            ))}

            {/* AI Learning Indicator */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-medium">AI Learning Patterns</p>
                <p className="text-xs text-muted-foreground">Analyzing hooks, structure & engagement triggers</p>
              </div>
            </div>
          </div>

          {/* Right: Generated Content */}
          <div className="relative">
            {/* Connection Arrow */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center">
              <div className="h-px w-8 bg-gradient-to-r from-primary/50 to-primary" />
              <ArrowRight className="h-5 w-5 text-primary -ml-1" />
            </div>

            <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card to-primary/5 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">AI Generated Content</span>
                <span className="ml-auto flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  High Viral Potential
                </span>
              </div>

              <div className="rounded-xl bg-background p-4 mb-4">
                <p className="text-sm leading-relaxed">{generatedContent.content}</p>
              </div>

              {/* Viral Score */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-background">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary">{generatedContent.viralScore}%</p>
                  <p className="text-xs text-muted-foreground">Viral Score</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Heart className="h-4 w-4 text-pink-500" />
                  </div>
                  <p className="text-lg font-bold">{generatedContent.predictedLikes}</p>
                  <p className="text-xs text-muted-foreground">Predicted Likes</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-lg font-bold">{generatedContent.bestTime}</p>
                  <p className="text-xs text-muted-foreground">Best Time</p>
                </div>
              </div>

              <Button className="w-full gap-2 rounded-full" disabled>
                <Sparkles className="h-4 w-4" />
                Coming Soon
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" className="gap-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold" disabled>
            <Sparkles className="h-4 w-4" />
            Coming Soon - Join Waitlist
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">Be the first to know when this feature launches</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
