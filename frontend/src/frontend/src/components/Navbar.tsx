import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Showcase", href: "#showcase" },
  { label: "Technology", href: "#technology" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group bg-transparent border-0 p-0"
          data-ocid="nav.logo"
        >
          <img
            src="/assets/logo-icon.png"
            alt="LensAI Logo"
            className="h-12 w-auto object-contain"
          />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              data-ocid={`nav.link.${link.label.toLowerCase()}`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 hover:shadow-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            data-ocid="nav.get_started_button"
          >
            Get Started
          </button>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile_menu_button"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/register");
                }}
                className="mt-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary/10 border border-primary/30 text-primary text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
