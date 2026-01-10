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
            <span className="font-medium">Power Meets Simplicity</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Smarter Tool.
            <br />
            Simpler Workflow.
            <br />
            <span className="italic text-primary">Stronger Results.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Powerful tools designed to simplify your workflow, boost engagement, and
            keep your content engine running smoothly.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 space-y-6">
          {/* Plan & Schedule Card */}
          <div className="rounded-2xl border bg-card p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left Content */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
                  <Zap className="h-5 w-5 text-background" />
                </div>

                <h3 className="mt-6 text-2xl font-bold md:text-3xl">
                  Plan & Schedule
                </h3>

                <p className="mt-4 text-muted-foreground">
                  Powerful scheduling tool designed to help you plan ahead, stay
                  consistent, and grow without chaos. Queue your content for optimal
                  times and let automation handle the rest.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Visual content calendar",
                    "Best time to post suggestions",
                    "Bulk scheduling support",
                    "Draft and approval workflow",
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

              {/* Right - Calendar Demo */}
              <div className="rounded-xl border bg-background p-4 shadow-sm">
                {/* Calendar Header */}
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg border px-3 py-1 text-sm">Today</button>
                    <span className="text-sm text-muted-foreground">+</span>
                  </div>
                  <span className="font-medium">September 2025</span>
                </div>

                {/* Calendar Grid */}
                <div className="mt-4">
                  {/* Days Header */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="py-2">{day}</div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="mt-2 grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 6 + 1;
                      const hasContent = [2, 3, 4, 5, 9, 10, 11, 12, 16, 17, 18, 19].includes(day);
                      const isCurrentMonth = day > 0 && day <= 30;

                      return (
                        <div
                          key={i}
                          className={`aspect-square rounded-lg p-1 text-xs ${isCurrentMonth ? "" : "text-muted-foreground/30"
                            }`}
                        >
                          <div className="text-right">{isCurrentMonth ? day : ""}</div>
                          {hasContent && isCurrentMonth && (
                            <div className="mt-1 space-y-0.5">
                              <div className="h-1 rounded-full bg-primary/60" />
                              <div className="h-1 rounded-full bg-blue-400/60" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                A single workspace that connects your content,
                your team, and your schedule.
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
                      PostZaper Demo – Schedule & Manage All Your Social Media in One Place
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
