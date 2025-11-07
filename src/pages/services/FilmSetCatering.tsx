import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Film, Check, Calendar } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";

const FilmSetCatering = () => {
  return (
    <>
      <SEOHead
        title="Film & TV Set Food Truck Catering | Production Crew Catering Services"
        description="Professional film set food truck catering for TV, movies & commercial shoots. Fast service, flexible hours, crew-approved menu. Serving NJ, PA, NYC, MD, DE & DC. Book now!"
        canonical="https://grillycheese.net/services/film-set-catering"
        keywords="film set catering, TV production catering, movie set food truck, crew catering, production catering services, on-location catering"
      />
      <SEOSchema 
        type="service" 
        serviceName="Film & TV Set Catering"
        title="Film & TV Set Food Truck Catering"
        url="https://grillycheese.net/services/film-set-catering"
      />
      
      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />

        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <Film className="h-4 w-4" /> Film & TV Set Catering
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Film & TV Production Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Keep your crew fueled and happy with professional food truck catering for film and TV productions. Fast service, flexible hours, and crew-approved comfort food.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Get Your Quote
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591">Call: 844-474-5591</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Production Teams Choose Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Fast Service:</strong> Quick turnaround for lunch breaks and tight shooting schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Flexible Hours:</strong> Available for early call times, night shoots, and extended hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Fully Licensed & Insured:</strong> COI's ready for production requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Dietary Accommodations:</strong> Vegetarian, vegan, gluten-free options available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Multi-Day Bookings:</strong> Available for long-term shoots and recurring service</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Quiet Service:</strong> Mindful of filming and sound requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perfect for All Production Types
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-accent">Feature Films</h3>
                <p className="text-muted-foreground">Long-term catering for extended shoots</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-accent">TV Series</h3>
                <p className="text-muted-foreground">Recurring service for episodic productions</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-accent">Commercials</h3>
                <p className="text-muted-foreground">Quick service for fast-paced shoots</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-accent">Music Videos</h3>
                <p className="text-muted-foreground">Flexible catering for creative productions</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-accent">Documentaries</h3>
                <p className="text-muted-foreground">On-location service anywhere</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 text-accent">Photo Shoots</h3>
                <p className="text-muted-foreground">Professional catering for photography crews</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Production?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional food truck catering for film and TV sets. Get your free quote in 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="tel:8444745591">Call: 844-474-5591</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/#contact">Request Quote Online</a>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
        <FloatingQuoteButton />
      </div>
    </>
  );
};

export default FilmSetCatering;
