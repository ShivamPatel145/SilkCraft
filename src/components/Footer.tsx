import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Catalog", href: "/catalog" },
        { label: "Orders", href: "/orders" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Business",
      links: [
        { label: "Admin Portal", href: "/admin" },
        { label: "POS System", href: "/pos" },
        { label: "Inventory", href: "/inventory" },
        { label: "Reports", href: "/reports" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Returns", href: "/returns" },
        { label: "Track Order", href: "/track" },
        { label: "Size Guide", href: "/size-guide" },
      ],
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-primary-foreground" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 12c0-9 9-9 9 0s9-9 9 0-9 9-9 0-9 9-9 0z" />
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-xl gradient-hero bg-clip-text text-transparent">
                    SilkCraft
                  </span>
                  <p className="text-xs text-muted-foreground font-medium">
                    Premium Saree Collection
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Your trusted partner in traditional elegance. Premium collection of 
                handwoven silk sarees with modern business management tools.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@silkcraft.com" className="hover:text-primary transition-colors">
                    info@silkcraft.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-2">
                {[
                  { Icon: Facebook, label: "Facebook", href: "#" },
                  { Icon: Instagram, label: "Instagram", href: "#" },
                  { Icon: Twitter, label: "Twitter", href: "#" },
                  { Icon: Youtube, label: "YouTube", href: "#" }
                ].map(({ Icon, label, href }, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-9 h-9 hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <a href={href} aria-label={label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-foreground text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SilkCraft. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;