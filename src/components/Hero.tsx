import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-grilled-cheese.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Delicious grilled cheese sandwich"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            The Ultimate Food Truck in NJ, PA, & NYC
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4">
            Your go-to <span className="text-accent font-semibold">grilled cheese food truck</span> for events of all sizes.
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            Grilled cheese, soup, hot dogs, and more! Delivery to your door or catering for your special event.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-warm hover:shadow-xl transition-all"
              asChild
            >
              <a href="#contact" className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book the Food Truck
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6"
              asChild
            >
              <a href="https://grillycheese.dine.online/" target="_blank" rel="noopener noreferrer">
                Order Online
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-3 text-primary-foreground/90">
            <Phone className="h-6 w-6 text-accent" />
            <div>
              <p className="text-sm font-medium">Food Truck Booking:</p>
              <a 
                href="tel:8444745591" 
                className="text-2xl font-bold hover:text-accent transition-colors"
              >
                844-474-5591
              </a>
            </div>
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
