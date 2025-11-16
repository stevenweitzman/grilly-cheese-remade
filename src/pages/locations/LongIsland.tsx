import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { MapPin, Check } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import { Helmet } from "react-helmet";

const LongIsland = () => {
  const areas = [
    "The Hamptons", "Montauk", "Sag Harbor", "Southampton", "East Hampton",
    "Huntington", "Northport", "Port Jefferson", "Stony Brook",
    "Garden City", "Great Neck", "Manhasset", "Roslyn",
    "Babylon", "Islip", "Riverhead", "Greenport"
  ];

  return (
    <>
      <SEOHead
        title="Food Truck Catering Long Island | Hamptons & Nassau County Events"
        description="Top-rated food truck catering on Long Island. Serving the Hamptons, Nassau & Suffolk Counties. Award-winning grilled cheese for weddings & events. Book now!"
        canonical="https://grillycheese.net/locations/long-island"
        keywords="food truck catering Long Island, Hamptons food truck, Nassau County catering, Suffolk County events, wedding catering Long Island"
      />
      <SEOSchema 
        type="location" 
        locationName="Long Island"
        title="Food Truck Catering Long Island"
        url="https://grillycheese.net/locations/long-island"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://grillycheese.net/locations/long-island",
            "name": "Grilly Cheese - Long Island Food Truck Catering",
            "image": "https://grillycheese.net/og-image.jpg",
            "description": "Top-rated food truck catering on Long Island. Serving Hamptons weddings, corporate events, and celebrations across Nassau and Suffolk Counties.",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "NY",
              "addressCountry": "US"
            },
            "areaServed": areas.map(area => ({
              "@type": "Place",
              "name": area,
              "addressRegion": "NY"
            })),
            "telephone": "+1-844-474-5591",
            "url": "https://grillycheese.net/locations/long-island",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "priceRange": "$$$",
            "servesCuisine": "American, Comfort Food, Grilled Cheese",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "250",
              "bestRating": "5"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" /> Serving All of Long Island
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Long Island&apos;s Premier Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for Hamptons weddings, corporate events, and celebrations. From Nassau to Suffolk County, we bring gourmet food to your event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact">Get Your LI Quote</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591">Call: 844-474-5591</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Long Island Loves Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Hamptons Specialist:</strong> Experienced with high-end events and luxury venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> COI's available for all Long Island venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Beach Event Expert:</strong> Perfect for waterfront weddings and beachside gatherings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Fast Response:</strong> Get your quote within 2 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Long Island Areas We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve events from the Hamptons to Nassau County and everywhere in between
            </p>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {areas.map((area, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent transition-colors">
                    <MapPin className="h-5 w-5 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">{area}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-muted-foreground mt-8">
                Don&apos;t see your area? <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> - we serve all of Long Island!
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Long Island Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving events of all sizes throughout Long Island. Get your free quote in 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="tel:8444745591">Call: 844-474-5591</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/#contact">Get Your Quote</a>
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

export default LongIsland;
