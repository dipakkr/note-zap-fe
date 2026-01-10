import ExtensionInstall from "./how-it-works/ExtensionInstall";
import OneClickSave from "./how-it-works/OneClickSave";
import InstantSearch from "./how-it-works/InstantSearch";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Install extension",
      description:
        "Add our Chrome extension in 8 seconds. No signup required to start.",
      Component: <ExtensionInstall />,
    },
    {
      number: "2",
      title: "Save with one click",
      description:
        "Bookmark tweets, posts, and articles. We capture everything automatically.",
      Component: <OneClickSave />,
    },
    {
      number: "3",
      title: "Find in seconds",
      description:
        "Search your bookmarks and get results as you type. No folders needed.",
      Component: <InstantSearch />,
    },
  ];

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to organized bookmarks
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-[calc(50%+60px)] top-16 hidden h-0.5 w-[calc(100%-120px)] bg-border md:block" />
              )}

              {/* Step Image/Animation Container */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted shadow-sm transition-shadow hover:shadow-md">
                {step.Component}
              </div>

              {/* Step Content */}
              <h3 className="mt-6 text-xl font-semibold">
                {step.number}. {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
