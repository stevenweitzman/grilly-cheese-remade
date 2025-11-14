import { Phone, Menu, X, Calendar, ChevronDown } from "lucide-react";
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
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Grilly Cheese - Award-winning food truck catering" 
              className="h-12 md:h-14 w-auto dark:hidden"
              width="120"
              height="84"
            />
            <img 
              src={logoWhite} 
              alt="Grilly Cheese - Award-winning food truck catering" 
              className="h-12 md:h-14 w-auto hidden dark:block"
              width="120"
              height="84"
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
            
            {/* Combined Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors outline-none">
                Menu <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg z-[60]">
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
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Locations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors outline-none">
                Locations <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border shadow-lg z-[60]">
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
          <div className="md:hidden pb-4 max-h-[calc(100vh-5rem)] overflow-y-auto animate-fade-in">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-background mb-3">
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

            <Accordion type="single" collapsible className="w-full">
              {/* Combined Menu Accordion */}
              <AccordionItem value="menu">
                <AccordionTrigger className="text-foreground hover:text-primary font-medium py-2">
                  Menu
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
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Locations Accordion */}
              <AccordionItem value="locations">
                <AccordionTrigger className="text-foreground hover:text-primary font-medium py-2">
                  Locations
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pl-4">
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
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
