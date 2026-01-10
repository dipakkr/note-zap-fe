import { Zap, ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "How is this different from browser bookmarks?",
      answer:
        "Browser bookmarks are like throwing papers in a drawer. PostZaper is like having a research assistant who organizes and finds everything for you. Plus: we capture full content (tweets, articles) before they're deleted, search actually works, syncs across devices, and it's a pretty interface you'll want to use.",
    },
    {
      question: "What happens if a tweet gets deleted?",
      answer:
        "We save the full tweet content when you bookmark it. Even if the original is deleted, you keep your copy.",
    },
    {
      question: "Can I import my existing bookmarks?",
      answer:
        "Yes! One-click import from Chrome, Firefox, Safari. We'll bring all your bookmarks (and their folders) into PostZaper.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "The web app is mobile-responsive. Native mobile apps coming Q2 2026. For now, save on desktop, read on mobile web.",
    },
    {
      question: "Is there a long-term commitment or cancellation fee?",
      answer: "No long-term commitment required. Cancel anytime with no fees.",
    },
    {
      question: "How does PostZaper's pricing work?",
      answer:
        "We offer flexible monthly and yearly plans. Yearly plans save you 20%. No hidden fees, no per-user charges.",
    },
    {
      question: "Is my data secure with PostZaper?",
      answer:
        "Absolutely. We use enterprise-grade encryption and never sell your data. Your privacy is our priority.",
    },
    {
      question: "Can I try PostZaper before committing to a paid plan?",
      answer:
        "Yes! Start with our free tier to explore the platform. Upgrade when you're ready for more features.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 === 1);

  return (
    <section id="faq" className="section-padding">
      <div className="container-tight">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-foreground">
              <Zap className="h-3 w-3 text-background" />
            </div>
            <span className="font-medium">Got Questions?</span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked
            <br />
            Questions
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of creators and teams scaling smarter
          </p>
        </div>

        {/* Two-column FAQ Grid */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, i) => {
              const index = i * 2;
              const isOpen = openItems.includes(index);
              return (
                <div
                  key={index}
                  className="rounded-xl border bg-card"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightFaqs.map((faq, i) => {
              const index = i * 2 + 1;
              const isOpen = openItems.includes(index);
              return (
                <div
                  key={index}
                  className="rounded-xl border bg-card"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
