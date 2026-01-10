import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Free Tools", href: "/tools" },
  ];

  const handleLogin = () => navigate('/login');
  const handleDashboard = () => navigate('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-tight flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="PostZaper" className="h-10" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Button size="sm" className="gap-2 rounded-full bg-primary px-5 font-medium" onClick={handleDashboard}>
                My Feed
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="font-medium" onClick={handleLogin}>
                Login
              </Button>
              <Button size="sm" className="gap-2 rounded-full bg-primary px-5 font-medium" onClick={handleLogin}>
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container-tight flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <Button size="sm" className="gap-2 rounded-full bg-primary font-medium" onClick={() => { handleDashboard(); setIsMenuOpen(false); }}>
                  My Feed
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="justify-start font-medium" onClick={() => { handleLogin(); setIsMenuOpen(false); }}>
                    Login
                  </Button>
                  <Button size="sm" className="gap-2 rounded-full bg-primary font-medium" onClick={() => { handleLogin(); setIsMenuOpen(false); }}>
                    Start Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
