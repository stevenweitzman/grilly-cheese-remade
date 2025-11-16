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

const Maryland = () => {
  const cities = [
    "Baltimore", "Annapolis", "Bethesda", "Rockville", "Silver Spring",
    "Columbia", "Germantown", "Ellicott City", "Towson", "Gaithersburg",
    "Potomac", "Chevy Chase", "Glen Burnie", "Frederick", "Bowie",
    "Hagerstown", "Salisbury", "Ocean City", "Easton", "Westminster"
  ];

  return (
    <>
      <SEOHead
        title="Food Truck Catering Maryland | Baltimore & Annapolis Events"
        description="Premier food truck catering in Maryland. Serving Baltimore, Annapolis, Bethesda & all MD metro areas. Award-winning grilled cheese for weddings & corporate events. Book now!"
        canonical="https://grillycheese.net/locations/maryland"
        keywords="food truck catering Maryland, Baltimore food truck, Annapolis catering, Bethesda events, wedding catering MD"
      />
      <SEOSchema 
        type="location" 
        locationName="Maryland"
        title="Food Truck Catering Maryland"
        url="https://grillycheese.net/locations/maryland"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://grillycheese.net/locations/maryland",
            "name": "Grilly Cheese - Maryland Food Truck Catering",
            "image": "https://grillycheese.net/og-image.jpg",
            "description": "Premier food truck catering throughout Maryland. Serving weddings, corporate events, and celebrations across Baltimore, Annapolis, and all MD metro areas.",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "MD",
              "addressCountry": "US"
            },
            "areaServed": cities.map(city => ({
              "@type": "City",
              "name": city,
              "addressRegion": "MD",
              "addressCountry": "US"
            })),
            "telephone": "+1-844-474-5591",
            "url": "https://grillycheese.net/locations/maryland",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "priceRange": "$$",
            "servesCuisine": "American, Comfort Food, Grilled Cheese",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "300",
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
                  <MapPin className="h-4 w-4" /> Serving All of Maryland
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Maryland&apos;s Premier Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for weddings, corporate events, and celebrations across Maryland. From Baltimore to Annapolis, we bring gourmet food to your event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact">Get Your MD Quote</a>
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
              Why Maryland Loves Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Baltimore & DC Metro Expert:</strong> We know the best venues throughout Maryland</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> COI's available for all Maryland venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Year-Round Service:</strong> Operating in all seasons across Maryland</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Fast Response:</strong> Get your quote within 2 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Cities & Towns We Serve in Maryland
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve events throughout Baltimore metro and all of Maryland
            </p>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cities.map((city, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent transition-colors">
                    <MapPin className="h-5 w-5 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">{city}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-muted-foreground mt-8">
                Don&apos;t see your city? <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> - we serve all of Maryland!
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Maryland Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving events of all sizes throughout Maryland. Get your free quote in 2 hours.
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

export default Maryland;
