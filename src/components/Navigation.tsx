import { Phone, Menu, X, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Grilly Cheese
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {isHomePage ? (
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
            ) : (
              <Link to="/#about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
            )}
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors outline-none">
                Services <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/services/wedding-catering" className="cursor-pointer">
                    Wedding Catering
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/corporate-catering" className="cursor-pointer">
                    Corporate Events
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Locations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors outline-none">
                Locations <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/locations/new-jersey" className="cursor-pointer">
                    New Jersey
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/pennsylvania" className="cursor-pointer">
                    Pennsylvania
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/new-york-city" className="cursor-pointer">
                    New York City
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
              Blog
            </Link>

            {isHomePage ? (
              <>
                <a href="#packages" className="text-foreground hover:text-primary transition-colors">
                  Packages
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </>
            ) : (
              <>
                <Link to="/#packages" className="text-foreground hover:text-primary transition-colors">
                  Packages
                </Link>
                <Link to="/#contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </>
            )}
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
                Get Your Quote
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
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-background">
              <a 
                href={isHomePage ? "#contact" : "/#contact"}
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
                Get Your Quote
              </a>
            </Button>

            {isHomePage ? (
              <a
                href="#about"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            ) : (
              <Link
                to="/#about"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            )}

            {/* Services Submenu */}
            <div className="border-l-2 border-accent/30 pl-3">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Services</p>
              <Link
                to="/services/wedding-catering"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wedding Catering
              </Link>
              <Link
                to="/services/corporate-catering"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Corporate Events
              </Link>
            </div>

            {/* Locations Submenu */}
            <div className="border-l-2 border-accent/30 pl-3">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Locations</p>
              <Link
                to="/locations/new-jersey"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Jersey
              </Link>
              <Link
                to="/locations/pennsylvania"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pennsylvania
              </Link>
              <Link
                to="/locations/new-york-city"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                New York City
              </Link>
            </div>

            <Link
              to="/blog"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            {isHomePage ? (
              <>
                <a
                  href="#packages"
                  className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Packages
                </a>
                <a
                  href="#contact"
                  className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/#packages"
                  className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Packages
                </Link>
                <Link
                  to="/#contact"
                  className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}

            <Button asChild className="w-full mt-4" variant="outline">
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
