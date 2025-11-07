import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-grilled-cheese.jpg";
import QuickQuoteForm from "@/components/QuickQuoteForm";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Golden, buttery grilled cheese sandwich with melted American cheese on thick-cut white bread - award-winning food truck catering in New Jersey"
            className="w-full h-full object-cover"
          />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl">
          <div className="max-w-4xl animate-fade-in">
          <div className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-accent/30">
            <p className="text-accent font-semibold text-sm">🏆 Top 6 Grilled Cheese in the Nation - GrubHub</p>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight">
            Gourmet Grilled Cheese
            <span className="block text-accent">On Wheels</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-4 font-medium">
            The ultimate food truck experience for NJ, PA, & NYC
          </p>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl">
            From intimate gatherings to corporate events, weddings to festivals - we bring award-winning grilled cheese, soups, and sides straight to your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 shadow-warm hover:shadow-xl transition-all hover:scale-105 animate-pulse"
              asChild
            >
              <a 
                href="#contact" 
                className="flex items-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'cta_click',
                      'cta_location': 'Hero',
                      'cta_text': 'Get Your Free Quote'
                    });
                  }
                }}
              >
                <Calendar className="h-6 w-6" />
                Get Your Free Quote
              </a>
            </Button>
          </div>

          <div className="bg-background/10 backdrop-blur-md p-6 rounded-xl border border-primary-foreground/20 inline-block">
            <div className="flex items-center gap-4">
              <div className="bg-accent rounded-full p-3">
                <Phone className="h-7 w-7 text-background" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-foreground/80">Ready to Book? Call Now:</p>
                <a 
                  href="tel:8444745591" 
                  className="text-3xl font-bold text-accent hover:text-accent/80 transition-colors block"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({
                        'event': 'phone_click',
                        'phone_location': 'Hero',
                        'phone_number': '844-474-5591'
                      });
                    }
                  }}
                >
                  844-474-5591
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Quote Form - Desktop Only */}
        <div className="hidden lg:block animate-fade-in">
          <QuickQuoteForm />
        </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
