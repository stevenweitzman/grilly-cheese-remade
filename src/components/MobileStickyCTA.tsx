import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

const MobileStickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const contactSection = document.getElementById("contact");
      const scrollPosition = window.scrollY;

      // Show after scrolling past hero
      if (scrollPosition > heroHeight * 0.5) {
        // Hide when contact section is in view
        if (contactSection) {
          const contactPosition = contactSection.getBoundingClientRect().top;
          setIsVisible(contactPosition > 150);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 animate-fade-in">
      <div className="bg-background/95 dark:bg-background/98 backdrop-blur-md border-t-2 border-accent shadow-warm p-3">
        <div className="flex gap-2">
          <Button
            asChild
            className="flex-1 bg-accent hover:bg-accent/90 text-background"
            size="lg"
          >
            <a
              href="#contact"
              className="flex items-center justify-center gap-2"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    'event': 'cta_click',
                    'cta_location': 'Mobile Sticky Bottom',
                    'cta_text': 'Get Quote'
                  });
                }
              }}
            >
              <Calendar className="h-5 w-5" />
              Get Quote
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex-1 border-accent/50 hover:border-accent hover:bg-accent/10"
          >
            <a
              href="tel:8444745591"
              className="flex items-center justify-center gap-2"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                  (window as any).dataLayer.push({
                    'event': 'phone_click',
                    'phone_location': 'Mobile Sticky Bottom',
                    'phone_number': '844-474-5591'
                  });
                }
              }}
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
