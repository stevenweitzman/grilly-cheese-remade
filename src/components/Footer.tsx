import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/grilly-cheese-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <img 
              src={logo} 
              alt="Grilly Cheese Logo" 
              className="h-12 w-auto mb-3"
            />
            <p className="text-primary-foreground/80 text-sm mb-4">
              Award-winning food truck catering for NJ, PA, & NYC
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <MapPin className="h-4 w-4" />
                <span>Chesilhurst, NJ</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Phone className="h-4 w-4" />
                <a href="tel:8444745591" className="hover:text-accent transition-colors">
                  844-474-5591
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold text-lg mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/wedding-catering" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Wedding Catering
                </Link>
              </li>
              <li>
                <Link to="/services/corporate-catering" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link to="/services/baby-showers" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Baby Showers
                </Link>
              </li>
              <li>
                <Link to="/services/retirement-parties" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Retirement Parties
                </Link>
              </li>
              <li>
                <Link to="/services/film-set-catering" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Film/TV Set Catering
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h4 className="font-bold text-lg mb-3">Areas We Serve</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/locations/new-jersey" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  New Jersey
                </Link>
              </li>
              <li>
                <Link to="/locations/pennsylvania" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Pennsylvania
                </Link>
              </li>
              <li>
                <Link to="/locations/new-york-city" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  New York City
                </Link>
              </li>
              <li>
                <Link to="/locations/maryland" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Maryland
                </Link>
              </li>
              <li>
                <Link to="/locations/delaware" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Delaware
                </Link>
              </li>
              <li>
                <Link to="/locations/washington-dc" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Washington DC
                </Link>
              </li>
              <li>
                <Link to="/locations/long-island" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Long Island
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-lg mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/blog" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <Link to="/blog/food-truck-catering-nj-guide" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  NJ Catering Guide
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} Grilly Cheese Food Trucks. All rights reserved.
            </p>
            <p>
              Top 6 Grilled Cheese in the Nation - GrubHub 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
