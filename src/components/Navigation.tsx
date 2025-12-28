import { Phone, Menu, X, Calendar, ChevronDown, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/grilly-cheese-logo.webp";
import logoWhite from "@/assets/grilly-cheese-logo-white.webp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Grilly Cheese - Award-winning food truck catering" 
              className="h-12 md:h-14 w-auto dark:hidden"
            />
            <img 
              src={logoWhite} 
              alt="Grilly Cheese - Award-winning food truck catering" 
              className="h-12 md:h-14 w-auto hidden dark:block"
            />
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
            
            <Link to="/auth" className="text-foreground hover:text-primary transition-colors">
              Client Portal
            </Link>
            
            {/* Services & Events Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors outline-none">
                Explore <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg z-[60] min-w-[200px]">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Services</div>
                <DropdownMenuItem asChild>
                  <Link to="/services/food-truck-catering" className="cursor-pointer">
                    Food Truck Catering
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/drop-off-catering" className="cursor-pointer">
                    Drop-Off Catering
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/services/pop-up-events" className="cursor-pointer">
                    Pop-Up Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Event Types</div>
                <DropdownMenuItem asChild>
                  <Link to="/events/wedding-catering" className="cursor-pointer">
                    Weddings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/events/corporate-catering" className="cursor-pointer">
                    Corporate Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/events/baby-showers" className="cursor-pointer">
                    Baby Showers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/events" className="cursor-pointer font-semibold">
                    View All Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Locations</div>
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
                <DropdownMenuItem asChild>
                  <Link to="/locations/maryland" className="cursor-pointer">
                    Maryland
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/delaware" className="cursor-pointer">
                    Delaware
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/washington-dc" className="cursor-pointer">
                    Washington DC
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/locations/long-island" className="cursor-pointer">
                    Long Island
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Resources</div>
                <DropdownMenuItem asChild>
                  <Link to="/blog" className="cursor-pointer">
                    Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  {isHomePage ? (
                    <a href="#packages" className="cursor-pointer">
                      Packages
                    </a>
                  ) : (
                    <Link to="/#packages" className="cursor-pointer">
                      Packages
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/recipes" className="text-foreground hover:text-primary transition-colors">
              Recipes
            </Link>

            {isHomePage ? (
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            ) : (
              <Link to="/#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            )}
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-background">
              <Link 
                to="/#contact"
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
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link 
                to="/order/drop-off"
                className="flex items-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'cta_click',
                      'cta_location': 'Navigation',
                      'cta_text': 'Order Catering'
                    });
                  }
                }}
              >
                <UtensilsCrossed className="h-4 w-4" />
                Order Catering
              </Link>
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
          <div className="md:hidden pb-4 max-h-[calc(100vh-5rem)] overflow-y-auto animate-fade-in">
            <div className="flex gap-2 mb-3">
              <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-background">
                <Link 
                  to="/#contact"
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
                  Get Quote
                </Link>
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <Link 
                  to="/order/drop-off"
                  className="flex items-center justify-center gap-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'cta_click',
                        'cta_location': 'Navigation Mobile',
                        'cta_text': 'Order Catering'
                      });
                    }
                  }}
                >
                  <UtensilsCrossed className="h-4 w-4" />
                  Order
                </Link>
              </Button>
            </div>

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

            <Link
              to="/auth"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Client Portal
            </Link>

            <Link
              to="/recipes"
              className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recipes
            </Link>

            <Accordion type="single" collapsible className="w-full">
              {/* Services & Events Accordion */}
              <AccordionItem value="explore">
                <AccordionTrigger className="text-foreground hover:text-primary font-medium py-2">
                  Explore
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pl-4">
                    <div className="text-xs font-semibold text-muted-foreground mb-1 mt-2">Services</div>
                    <Link
                      to="/services/food-truck-catering"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Food Truck Catering
                    </Link>
                    <Link
                      to="/services/drop-off-catering"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Drop-Off Catering
                    </Link>
                    <Link
                      to="/services/pop-up-events"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pop-Up Events
                    </Link>
                    <div className="border-t border-border my-2" />
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Event Types</div>
                    <Link
                      to="/events/wedding-catering"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Weddings
                    </Link>
                    <Link
                      to="/events/corporate-catering"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Corporate Events
                    </Link>
                    <Link
                      to="/events/baby-showers"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Baby Showers
                    </Link>
                    <div className="border-t border-border my-2" />
                    <Link
                      to="/events"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Events
                    </Link>
                    <div className="border-t border-border my-2" />
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Locations</div>
                    <Link
                      to="/locations/new-jersey"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      New Jersey
                    </Link>
                    <Link
                      to="/locations/pennsylvania"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pennsylvania
                    </Link>
                    <Link
                      to="/locations/new-york-city"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      New York City
                    </Link>
                    <Link
                      to="/locations/maryland"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Maryland
                    </Link>
                    <Link
                      to="/locations/delaware"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Delaware
                    </Link>
                    <Link
                      to="/locations/washington-dc"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Washington DC
                    </Link>
                    <Link
                      to="/locations/long-island"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Long Island
                    </Link>
                    <div className="border-t border-border my-2" />
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Resources</div>
                    <Link
                      to="/blog"
                      className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                    {isHomePage ? (
                      <a
                        href="#packages"
                        className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Packages
                      </a>
                    ) : (
                      <Link
                        to="/#packages"
                        className="block py-2 text-foreground hover:text-primary transition-colors text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Packages
                      </Link>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {isHomePage ? (
              <a
                href="#contact"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            ) : (
              <Link
                to="/#contact"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
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
