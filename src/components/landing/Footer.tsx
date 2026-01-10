import { Zap } from "lucide-react";

const Footer = () => {
  const columns = [
    {
      title: "Company",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact Us", href: "#" },
        { label: "Testimonials", href: "#" },
        { label: "Become an Affiliate (40%)", href: "#" },
        { label: "FAQs", href: "#faq" },
        { label: "Blog", href: "#" },
        { label: "API Docs", href: "#" },
      ],
    },

    {
      title: "Features",
      links: [
        { label: "AI Content Generator", href: "#" },
        { label: "Auto Caption Generator", href: "#" },
        { label: "Comment Management", href: "#" },
        { label: "Social Media Scheduling", href: "#" },
        { label: "Bulk Scheduling", href: "#" },
        { label: "AI Reply", href: "#" },
      ],
    },
    {
      title: "Platforms",
      links: [
        { label: "Twitter Scheduler", href: "#" },
        { label: "Facebook Scheduler", href: "#" },
        { label: "Instagram Scheduler", href: "#" },
        { label: "TikTok Scheduler", href: "#" },
        { label: "YouTube Scheduler", href: "#" },
        { label: "LinkedIn Scheduler", href: "#" },
      ],
    },
    {
      title: "Free Tools",
      links: [
        { label: "YouTube Video Downloader", href: "#" },
        { label: "YouTube Tags Generator", href: "#" },
        { label: "Hashtag Generator", href: "#" },
        { label: "Photo & Video Downloader", href: "#" },
        { label: "UTM Generator", href: "#" },
        { label: "Twitter Photo Resizer", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container-tight section-padding">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
                <Zap className="h-5 w-5 text-background" />
              </div>
              <span className="text-xl font-bold tracking-tight">PostZaper</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Plan, publish, and analyze across every platform.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X (Twitter)"
              >
                X
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-primary">{column.title}</h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <div className="flex flex-col gap-1 text-sm text-muted-foreground md:flex-row md:items-center">
            <p>© 2026 PostZaper • </p>
            <p>Built with Love by AxivionLabs</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
