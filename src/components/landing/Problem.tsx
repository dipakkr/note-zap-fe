import { Search, FolderX, Clock } from "lucide-react";

const Problem = () => {
  const problems = [
    {
      icon: FolderX,
      label: "Tangled bookmarks",
    },
    {
      icon: Search,
      label: "Search frustration",
    },
    {
      icon: Clock,
      label: "Lost content",
    },
  ];

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stop losing hours searching for "that thing you saw last week"
          </h2>
          <p className="mt-6 text-md text-muted-foreground">
            You save interesting content but never find it again. Browser bookmarks
            are a mess. Notion is overkill. Your productivity suffers.
          </p>

          {/* Problem Icons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {problems.map((problem) => (
              <div
                key={problem.label}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <problem.icon className="h-8 w-8 text-destructive" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {problem.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
