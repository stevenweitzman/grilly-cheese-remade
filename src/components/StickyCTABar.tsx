import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

const StickyCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const contactSection = document.getElementById("contact");
      const scrollPosition = window.scrollY;

      if (isDismissed) return;

      // Show after scrolling past hero
      if (scrollPosition > heroHeight) {
        // Hide when contact section is in view
        if (contactSection) {
          const contactPosition = contactSection.getBoundingClientRect().top;
          setIsVisible(contactPosition > 100);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-40 animate-fade-in">
      <div className="bg-accent/95 backdrop-blur-md shadow-warm border-b-2 border-accent">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-background" />
              <p className="text-background font-semibold text-sm md:text-base">
                Ready to book? Get your free event quote in 2 hours!
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                asChild
                className="hidden sm:flex"
              >
                <a
                  href="#contact"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'cta_click',
                        'cta_location': 'Sticky Bar',
                        'cta_text': 'Get Free Quote'
                      });
                    }
                  }}
                >
                  Get Quote
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
                className="hidden sm:flex bg-background/10 border-background/30 text-background hover:bg-background/20"
              >
                <Link
                  to="/order/drop-off"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'cta_click',
                        'cta_location': 'Sticky Bar',
                        'cta_text': 'Order Catering'
                      });
                    }
                  }}
                  className="flex items-center gap-1"
                >
                  <UtensilsCrossed className="h-4 w-4" />
                  Order Catering
                </Link>
              </Button>
              <button
                onClick={handleDismiss}
                className="text-background hover:text-background/80 transition-colors p-1"
                aria-label="Dismiss banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;
