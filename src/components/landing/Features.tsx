import { Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "One Click. Everywhere.",
      description: "Save once. Access everywhere. Free up hours every week.",
    },
    {
      title: "Built for Teams, Loved by Freelancers",
      description: "Invite unlimited team members, assign roles, and approve content seamlessly.",
      hasDemo: true,
    },
  ];

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
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-2xl border bg-card p-8"
            >
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>

              {/* Placeholder for feature demo/image */}
              <div className="mt-6 aspect-[4/3] rounded-xl border bg-muted/50 p-4">
                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  {feature.hasDemo ? (
                    <>
                      <div className="w-full space-y-2">
                        <div className="text-sm font-medium text-foreground">Invite Team Members</div>
                        <div className="h-2 w-3/4 rounded bg-muted" />
                        <div className="h-2 w-1/2 rounded bg-muted" />
                      </div>
                      <div className="mt-4 flex w-full items-center gap-2 rounded-lg border bg-background p-3">
                        <div className="flex-1 text-xs text-muted-foreground">example@domain.com</div>
                        <div className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground">
                          Send Invite
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm font-medium">Posting to these accounts</div>
                      <div className="flex gap-2">
                        {["X", "IG", "FB", "in"].map((icon) => (
                          <div key={icon} className="h-8 w-8 rounded-lg border bg-background text-center text-xs leading-8">
                            {icon}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
