import { Check, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STRIPE_LINKS } from "@/lib/constants";

const Pricing = () => {

  const plans = [
    {
      name: "Free",
      description: "Get started with the basics",
      price: "$0",
      priceLabel: "forever",
      features: [
        "Save up to 20 bookmarks",
        "3 collections",
        "Basic search",
        "Mobile web access",
      ],
    },
    {
      name: "Pro",
      badge: "",
      description: "Everything you need to save smarter",
      price: "$29",
      priceLabel: "per year",
      monthlyPrice: "$2.42",
      highlighted: true,
      features: [
        "Everything in Free, plus:",
        "Unlimited bookmarks",
        "Chrome extension (one-click save)",
        "Auto-save from Twitter, LinkedIn & blogs",
        "Advanced search (filters, date ranges)",
        "Rich link previews",
        "Priority support (24hr response)",
      ],
      buttonText: "Upgrade Now",
    },
    {
      name: "Creator",
      badge: "Coming Soon",
      badgeColor: "bg-purple-100 text-purple-700",
      description: "For serious content creators",
      price: "$99",
      priceLabel: "per year",
      monthlyPrice: "$8.25",
      features: [
        "Everything in Pro, plus:",
        "Access to Creator Studio",
        "Generate 500 AI posts/mo",
        "AI-powered viral content generation",
        "Content segmentation & repurposing",
        "Trend analysis & insights",
        "Auto create swipe files",
      ],
      buttonText: "Join Early Access",
      isWaitlist: true,
    },
  ];

  return (
    <section id="pricing" className="section-padding wave-bg">
      <div className="container-tight">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
              <Zap className="h-3 w-3 text-background" />
            </div>
            <span className="font-medium">Simple Pricing</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Invest in <span className="italic text-primary">Productivity</span>,
            <br />
            Not Complexity
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Simple, transparent pricing. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-3 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl ${plan.highlighted ? "border-2 border-primary shadow-lg scale-105 z-10" : "border-border/50"
                } ${plan.isWaitlist ? "bg-gradient-to-b from-white to-purple-50/50 border-purple-100" : ""}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                {plan.badge && (
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${plan.badgeColor || "bg-foreground text-background"}`}>
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>

              <div className="mt-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.priceLabel && <span className="text-sm text-muted-foreground font-medium">{plan.priceLabel}</span>}
                </div>
                {/* Monthly Equivalent Badge */}
                {plan.monthlyPrice && (
                  <div className="mt-2 inline-block bg-green-50 px-2 py-1 rounded text-xs font-bold text-green-700">
                    Just {plan.monthlyPrice}/mo
                  </div>
                )}
              </div>

              <div className="flex-1">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className={`mt-0.5 p-0.5 rounded-full ${plan.name === 'Creator' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                        {plan.name === 'Creator' && idx > 0 && String(feature).includes("AI") ? <Sparkles size={10} fill="currentColor" /> : <Check size={10} strokeWidth={4} />}
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                size="lg"
                className={`w-full rounded-full font-bold transition-all ${plan.highlighted
                  ? "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  : plan.isWaitlist
                    ? "bg-white text-purple-600 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                onClick={() => {
                  if (plan.name === "Pro") {
                    window.location.href = STRIPE_LINKS.PRO_YEARLY;
                  } else if (plan.name === "Creator") {
                    window.location.href = STRIPE_LINKS.CREATOR_YEARLY;
                  }
                }}
              >
                {plan.buttonText || (plan.price === "$0" ? "Get Started Free" : "Upgrade Now")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
