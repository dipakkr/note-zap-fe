import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        "Community support",
      ],
    },
    {
      name: "Pro",
      badge: "Most Popular",
      description: "Everything you need to save smarter",
      price: "$39",
      priceLabel: "per year",
      highlighted: true,
      features: [
        "Everything in Free, plus:",
        "Unlimited bookmarks",
        "Chrome extension (one-click save)",
        "Auto-save from Twitter, LinkedIn & blogs",
        "Advanced search (filters, date ranges)",
        "Rich link previews",
        "Bulk import browser bookmarks",
        "Export to CSV/JSON",
        "Priority support (24hr response)",
      ],
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
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-card p-6 flex flex-col h-full ${plan.highlighted ? "border-2 border-primary shadow-lg" : ""
                }`}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                {plan.badge && (
                  <span className="rounded-full bg-foreground px-3 py-0.5 text-xs font-medium text-background">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="ml-2 text-sm text-muted-foreground">{plan.priceLabel}</span>
              </div>

              <ul className="mt-6 space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-auto w-full rounded-full ${plan.highlighted ? "bg-primary" : "bg-foreground"
                  }`}
              >
                {plan.price === "$0" ? "Get Started Free" : "Start Free Trial"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
