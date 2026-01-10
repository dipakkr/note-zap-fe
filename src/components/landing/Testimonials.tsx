import { Star } from "lucide-react";

const Testimonials = () => {
  // Row 1 testimonials
  const row1 = [
    {
      quote:
        "PostZaper is an incredible tool, but what is even better is the support. It really does make a difference, and no issue is too much. They always go the extra mile.",
      name: "Ruben",
      initial: "RU",
      color: "bg-blue-500",
    },
    {
      quote:
        "@postzaper, simple powerful affordable and great founder who can help if needed @heyabdulmejid",
      name: "Hider Toula",
      initial: "HT",
      color: "bg-green-500",
    },
    {
      quote:
        "Switched over to @postzaper and really liking it so far. Easy to create queue slots and post with built-in analytics dashboard. Crazy amount of value for the pricing!",
      name: "Richard",
      initial: "R",
      color: "bg-purple-500",
    },
    {
      quote:
        "This tool has completely transformed how I manage my social content. The scheduling feature alone saves me hours every week!",
      name: "Sarah M.",
      initial: "SM",
      color: "bg-pink-500",
    },
    {
      quote:
        "Finally, a tool that understands creators. The bookmark + content generation workflow is genius.",
      name: "Alex Chen",
      initial: "AC",
      color: "bg-orange-500",
    },
  ];

  // Row 2 testimonials (moves opposite direction)
  const row2 = [
    {
      quote:
        "Best investment I've made for my personal brand. The analytics help me understand what works.",
      name: "Jordan K.",
      initial: "JK",
      color: "bg-teal-500",
    },
    {
      quote:
        "The AI features are next level. I can generate a week's worth of content in under an hour.",
      name: "Mike R.",
      initial: "MR",
      color: "bg-indigo-500",
    },
    {
      quote:
        "I've tried every social media tool out there. PostZaper is the only one that stuck. Clean UI, fast, reliable.",
      name: "Emma L.",
      initial: "EL",
      color: "bg-rose-500",
    },
    {
      quote:
        "Saving bookmarks and turning them into content ideas? Game changer for my content strategy.",
      name: "David W.",
      initial: "DW",
      color: "bg-cyan-500",
    },
    {
      quote:
        "The Chrome extension is so smooth. One click and it's saved. No friction at all.",
      name: "Lisa P.",
      initial: "LP",
      color: "bg-amber-500",
    },
  ];

  // Row 3 testimonials
  const row3 = [
    {
      quote:
        "Support team responded in 5 minutes and solved my issue immediately. That's rare these days.",
      name: "Chris B.",
      initial: "CB",
      color: "bg-emerald-500",
    },
    {
      quote:
        "My engagement has gone up 3x since I started using PostZaper's optimal posting times feature.",
      name: "Nina S.",
      initial: "NS",
      color: "bg-violet-500",
    },
    {
      quote:
        "Worth every penny. The lifetime deal was a no-brainer after the free trial.",
      name: "Tom H.",
      initial: "TH",
      color: "bg-sky-500",
    },
    {
      quote:
        "I manage 5 client accounts with PostZaper. The workspace feature keeps everything organized.",
      name: "Anna K.",
      initial: "AK",
      color: "bg-fuchsia-500",
    },
    {
      quote:
        "From bookmark to published post in 2 clicks. This is how productivity tools should work.",
      name: "James D.",
      initial: "JD",
      color: "bg-lime-500",
    },
  ];

  const TestimonialCard = ({ testimonial }: { testimonial: typeof row1[0] }) => (
    <div className="flex-shrink-0 w-[320px] mx-2">
      <div className="rounded-xl border bg-card p-5 h-full shadow-sm hover:shadow-md transition-shadow">
        {/* Stars */}
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Quote */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {testimonial.quote}
        </p>

        {/* Author */}
        <div className="mt-4 flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${testimonial.color} text-xs font-semibold text-white`}
          >
            {testimonial.initial}
          </div>
          <span className="text-sm font-medium">{testimonial.name}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="section-padding overflow-hidden bg-muted/30">
      <div className="container-tight mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by <span className="italic text-primary">Creators</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Join thousands of creators who trust PostZaper for their content workflow
        </p>
      </div>

      {/* Sliding Testimonials Container */}
      <div className="relative space-y-4">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 via-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 via-muted/30 to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Scrolls Left */}
        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((testimonial, index) => (
            <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Row 2 - Scrolls Right */}
        <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
          {[...row2, ...row2].map((testimonial, index) => (
            <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Row 3 - Scrolls Left (slower) */}
        <div className="flex animate-scroll-left-slow hover:[animation-play-state:paused]">
          {[...row3, ...row3].map((testimonial, index) => (
            <TestimonialCard key={`row3-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
