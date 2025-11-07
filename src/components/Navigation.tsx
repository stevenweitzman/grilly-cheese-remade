import { Phone, Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Grilly Cheese
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#packages" className="text-foreground hover:text-primary transition-colors">
              Packages
            </a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-background">
              <a 
                href="#contact"
                className="flex items-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'cta_click',
                      'cta_location': 'Navigation',
                      'cta_text': 'Get Free Quote'
                    });
                  }
                }}
              >
                <Calendar className="h-4 w-4" />
                Get Free Quote
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a 
                href="tel:8444745591" 
                className="flex items-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'phone_click',
                      'phone_location': 'Navigation',
                      'phone_number': '844-474-5591'
                    });
                  }
                }}
              >
                <Phone className="h-4 w-4" />
                844-474-5591
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-background mb-2">
              <a 
                href="#contact"
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'cta_click',
                      'cta_location': 'Navigation Mobile',
                      'cta_text': 'Get Free Quote'
                    });
                  }
                }}
              >
                <Calendar className="h-4 w-4" />
                Get Free Quote
              </a>
            </Button>
            <a
              href="#about"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#packages"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Packages
            </a>
            <a
              href="#faq"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button asChild className="w-full">
              <a 
                href="tel:8444745591" 
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'phone_click',
                      'phone_location': 'Navigation Mobile',
                      'phone_number': '844-474-5591'
                    });
                  }
                }}
              >
                <Phone className="h-4 w-4" />
                844-474-5591
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
