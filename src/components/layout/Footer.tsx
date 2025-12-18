import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  CreditCard,
  Shield,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-12">
      {/* Newsletter Section */}
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">
                Yes! Send me exclusive offers and unique gift ideas
              </h3>
              <p className="text-primary-foreground/80">
                Join our community of 2 million+ makers and shoppers
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 rounded-full h-12 w-full md:w-72"
              />
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-6 font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Shop */}
          <div>
            <h4 className="font-display font-semibold mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Gift cards", "Craftsy Registry", "Sitemap", "Craftsy blog", "Craftsy United Kingdom"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="font-display font-semibold mb-4">Sell</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Sell on Craftsy", "Teams", "Forums", "Affiliates & Creators"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display font-semibold mb-4">About</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Craftsy, Inc.", "Policies", "Investors", "Careers", "Press", "Impact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display font-semibold mb-4">Help</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Help Centre", "Privacy settings", "Download the app"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & App */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-display font-semibold mb-4">Connect with us</h4>
            <div className="flex gap-2 mb-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="h-10 w-10 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center transition-all"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-accent" />
                <span>Secure transactions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="h-4 w-4 text-accent" />
                <span>Multiple payment options</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="h-4 w-4 text-accent" />
                <span>Eco-friendly packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Section */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-display text-2xl font-bold text-primary">
              Craftsy
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Globe className="h-4 w-4" />
              India
            </button>
            <span>|</span>
            <span>₹ (INR)</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {["Terms of Use", "Privacy", "Interest-based ads", "Local Shops", "Regions"].map((link) => (
                <a key={link} href="#" className="hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <span>© 2024 Craftsy, Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;