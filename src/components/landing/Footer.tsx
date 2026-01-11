import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container-tight py-12 px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand Column */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="PostZaper" className="h-9" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Save, organize, and revisit your favorite content from Twitter and LinkedIn.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://twitter.com/postzaper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Follow on X (Twitter)"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            {/* Product Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Free Tools
                  </Link>
                </li>

              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 PostZaper · Built with ❤️ by AxivionLabs
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
