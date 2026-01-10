import { Check, X, Minus, Zap, Crown } from "lucide-react";

const Comparison = () => {
  const features = [
    { name: "One-click save from social media", postzaper: true, browser: true, notion: false, pocket: true },
    { name: "Lightning fast search", postzaper: true, browser: false, notion: "partial", pocket: true },
    { name: "Saves full tweets & threads", postzaper: true, browser: false, notion: false, pocket: false },
    { name: "Rich previews & metadata", postzaper: true, browser: false, notion: false, pocket: true },
    { name: "Cross-device sync", postzaper: true, browser: "partial", notion: true, pocket: true },
    { name: "AI-powered content generation", postzaper: true, browser: false, notion: false, pocket: false },
    { name: "LinkedIn profile saving", postzaper: true, browser: false, notion: false, pocket: false },
    { name: "Bulk organization & tagging", postzaper: true, browser: false, notion: true, pocket: "partial" },
  ];

  const renderIcon = (value: boolean | string) => {
    if (value === true) {
      return (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
          <Check className="h-4 w-4 text-green-600" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-red-50">
          <X className="h-4 w-4 text-red-400" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-50">
        <Minus className="h-4 w-4 text-yellow-500" />
      </div>
    );
  };

  const competitors = [
    { key: "browser", name: "Browser", subtitle: "Bookmarks" },
    { key: "notion", name: "Notion", subtitle: "" },
    { key: "pocket", name: "Pocket", subtitle: "" },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-tight">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why PostZaper?</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            See how we <span className="italic text-primary">stack up</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            The only tool built specifically for saving and leveraging social media content
          </p>
        </div>

        {/* Comparison Cards - Desktop */}
        <div className="hidden lg:block mx-auto max-w-5xl">
          <div className="rounded-2xl border bg-card overflow-hidden shadow-lg">
            {/* Header Row */}
            <div className="grid grid-cols-5 border-b bg-muted/50">
              <div className="p-5 font-semibold text-muted-foreground">Features</div>
              <div className="p-5 text-center border-l border-r-2 border-r-primary/20 bg-primary/5 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-foreground">PostZaper</span>
                </div>
              </div>
              {competitors.map((comp) => (
                <div key={comp.key} className="p-5 text-center border-l">
                  <span className="font-medium text-muted-foreground">{comp.name}</span>
                  {comp.subtitle && (
                    <span className="block text-xs text-muted-foreground/70">{comp.subtitle}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={`grid grid-cols-5 ${index !== features.length - 1 ? 'border-b' : ''} hover:bg-muted/30 transition-colors`}
              >
                <div className="p-4 text-sm font-medium flex items-center">{feature.name}</div>
                <div className="p-4 flex justify-center items-center border-l border-r-2 border-r-primary/20 bg-primary/5">
                  {renderIcon(feature.postzaper)}
                </div>
                <div className="p-4 flex justify-center items-center border-l">
                  {renderIcon(feature.browser)}
                </div>
                <div className="p-4 flex justify-center items-center border-l">
                  {renderIcon(feature.notion)}
                </div>
                <div className="p-4 flex justify-center items-center border-l">
                  {renderIcon(feature.pocket)}
                </div>
              </div>
            ))}

            {/* Pricing Row */}
            <div className="grid grid-cols-5 border-t-2 bg-muted/30">
              <div className="p-5 font-semibold flex items-center">Pricing</div>
              <div className="p-5 text-center border-l border-r-2 border-r-primary/20 bg-primary/10">
                <div className="text-2xl font-bold text-primary">$29</div>
                <div className="text-xs text-muted-foreground">one-time payment</div>
              </div>
              <div className="p-5 text-center border-l">
                <div className="text-lg font-semibold text-muted-foreground">Free</div>
                <div className="text-xs text-muted-foreground">limited features</div>
              </div>
              <div className="p-5 text-center border-l">
                <div className="text-lg font-semibold text-muted-foreground">$10/mo</div>
                <div className="text-xs text-muted-foreground">per user</div>
              </div>
              <div className="p-5 text-center border-l">
                <div className="text-lg font-semibold text-muted-foreground">$5/mo</div>
                <div className="text-xs text-muted-foreground">premium tier</div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {/* PostZaper Card - Highlighted */}
          <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6 relative">
            <div className="absolute -top-3 left-4">
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-lg">PostZaper</div>
                <div className="text-2xl font-bold text-primary">$29 <span className="text-sm font-normal text-muted-foreground">one-time</span></div>
              </div>
            </div>
            <div className="space-y-2">
              {features.map((f) => (
                <div key={f.name} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 shrink-0" />
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Competitors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {competitors.map((comp) => (
              <div key={comp.key} className="rounded-xl border bg-card p-5">
                <div className="font-semibold mb-1">{comp.name}</div>
                <div className="text-sm text-muted-foreground mb-3">
                  {comp.key === "browser" && "Free (limited)"}
                  {comp.key === "notion" && "$10/mo"}
                  {comp.key === "pocket" && "$5/mo"}
                </div>
                <div className="space-y-1.5 text-xs">
                  {features.slice(0, 4).map((f) => (
                    <div key={f.name} className="flex items-center gap-1.5">
                      {f[comp.key as keyof typeof f] === true ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : f[comp.key as keyof typeof f] === false ? (
                        <X className="h-3 w-3 text-red-400" />
                      ) : (
                        <Minus className="h-3 w-3 text-yellow-500" />
                      )}
                      <span className="text-muted-foreground truncate">{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            ✨ Pay once, use forever. No subscriptions, no hidden fees.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
