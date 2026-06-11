import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Showcase", href: "#showcase" },
  { label: "Technology", href: "#technology" },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-muted/30 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/assets/logo-icon.png"
              alt="LensAI Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid={`footer.link.${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                  data-ocid={`footer.social.${social.label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Copyright LensenticAI. All rights
            Preserved{" "}
            <a
              href="https://lensentic.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LensenticAI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
