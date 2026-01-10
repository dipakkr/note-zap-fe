import { Zap, Calendar, Play } from "lucide-react";

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
                          className={`aspect-square rounded-lg p-1 text-xs ${
                            isCurrentMonth ? "" : "text-muted-foreground/30"
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

          {/* Two Column Cards */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Engage & Respond Card */}
            <div className="rounded-2xl border bg-card p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
                <Zap className="h-5 w-5 text-background" />
              </div>

              <h3 className="mt-6 text-xl font-bold">Engage & Respond</h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Manage comments and messages from all platforms in one unified inbox.
                Never miss an opportunity to connect with your audience.
              </p>

              {/* Demo UI */}
              <div className="mt-6 rounded-xl border bg-background p-4">
                <div className="space-y-3">
                  {[
                    { name: "Sarah M.", message: "Love this content! 🔥", time: "2m ago" },
                    { name: "Alex K.", message: "How do I get started?", time: "5m ago" },
                    { name: "Jordan L.", message: "This is exactly what I needed", time: "12m ago" },
                  ].map((comment, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                        {comment.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{comment.name}</span>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground truncate">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analyze & Grow Card */}
            <div className="rounded-2xl border bg-card p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
                <Zap className="h-5 w-5 text-background" />
              </div>

              <h3 className="mt-6 text-xl font-bold">Analyze & Grow</h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Track performance across all your platforms. Get insights that help
                you understand what works and optimize your content strategy.
              </p>

              {/* Demo Chart */}
              <div className="mt-6 rounded-xl border bg-background p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Engagement Overview</span>
                  <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>

                {/* Bar Chart Placeholder */}
                <div className="mt-4 flex items-end justify-between gap-2 h-24">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-sm bg-gradient-to-t from-primary/80 to-primary/40"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
                  {[
                    { label: "Impressions", value: "24.5K", change: "+12%" },
                    { label: "Engagement", value: "3.2K", change: "+8%" },
                    { label: "Followers", value: "+847", change: "+15%" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-lg font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="text-xs text-green-500">{stat.change}</div>
                    </div>
                  ))}
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
