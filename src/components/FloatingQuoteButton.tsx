import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const FloatingQuoteButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const contactSection = document.getElementById("contact");
      const scrollPosition = window.scrollY;

      // Show after scrolling past hero
      if (scrollPosition > heroHeight) {
        // Hide when contact section is in view
        if (contactSection) {
          const contactPosition = contactSection.getBoundingClientRect().top;
          setIsVisible(contactPosition > 200);
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
    <div className="hidden md:block fixed right-6 bottom-6 z-40 animate-fade-in">
      <Button
        asChild
        size="lg"
        className="bg-accent hover:bg-accent/90 text-background shadow-warm hover:shadow-xl transition-all hover:scale-105 rounded-full px-6 py-6"
      >
        <a
          href="#contact"
          className="flex items-center gap-2"
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
              (window as any).dataLayer.push({
                'event': 'cta_click',
                'cta_location': 'Floating Button',
                'cta_text': 'Quick Quote'
              });
            }
          }}
        >
          <Calendar className="h-5 w-5" />
          Quick Quote
        </a>
      </Button>
    </div>
  );
};

export default FloatingQuoteButton;
