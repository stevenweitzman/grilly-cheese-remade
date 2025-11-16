import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { MapPin, Check, Building2 } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import { Helmet } from "react-helmet";

const NewYorkCity = () => {
  const boroughs = [
    { name: "Manhattan", areas: "Midtown, Downtown, Upper East/West Side" },
    { name: "Brooklyn", areas: "Williamsburg, DUMBO, Park Slope, Red Hook" },
    { name: "Queens", areas: "Long Island City, Astoria, Flushing" },
    { name: "Bronx", areas: "South Bronx, Riverdale" },
    { name: "Staten Island", areas: "North Shore, Mid-Island" }
  ];

  return (
    <>
      <SEOHead
        title="Food Truck Catering NYC | New York City Wedding & Corporate Events"
        description="Award-winning food truck catering in NYC. Serving Manhattan, Brooklyn, Queens & all 5 boroughs. Perfect for NYC weddings, corporate events & parties. Book your NYC event now!"
        canonical="https://grillycheese.net/locations/new-york-city"
        keywords="food truck catering NYC, New York City food truck, Manhattan catering, Brooklyn food truck, corporate catering NYC, wedding catering New York"
      />
      <SEOSchema 
        type="location" 
        locationName="New York City"
        title="Food Truck Catering New York City"
        url="https://grillycheese.net/locations/new-york-city"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://grillycheese.net/locations/new-york-city",
            "name": "Grilly Cheese - New York City Food Truck Catering",
            "image": "https://grillycheese.net/og-image.jpg",
            "description": "Award-winning food truck catering across all five NYC boroughs. Serving weddings, corporate events, and celebrations throughout New York City.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "New York City",
              "addressRegion": "NY",
              "addressCountry": "US"
            },
            "areaServed": boroughs.map(borough => ({
              "@type": "City",
              "name": borough.name,
              "addressRegion": "NY",
              "addressCountry": "US"
            })),
            "telephone": "+1-844-474-5591",
            "url": "https://grillycheese.net/locations/new-york-city",
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
              "ratingValue": "5.0",
              "reviewCount": "350",
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
                  <Building2 className="h-4 w-4" /> Serving All 5 NYC Boroughs
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                NYC&apos;s Premier Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Bring award-winning gourmet grilled cheese catering to your New York City event. From Manhattan rooftops to Brooklyn warehouses, we serve unforgettable food across all five boroughs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact">Get Free NYC Quote</a>
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
              Why NYC Chooses Grilly Cheese
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">1,500+</div>
                <div className="text-muted-foreground">NYC Events Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">5★</div>
                <div className="text-muted-foreground">Average NYC Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">Top 6</div>
                <div className="text-muted-foreground">In the Nation</div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>NYC Logistics Expert:</strong> We navigate permits, parking, and city regulations seamlessly</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>All Boroughs:</strong> Manhattan, Brooklyn, Queens, Bronx, and Staten Island coverage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Rooftop Ready:</strong> Experienced with challenging NYC venues and tight spaces</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Fast Service:</strong> Serve 100+ guests per hour - perfect for NYC pace</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Boroughs We Serve */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Serving All NYC Boroughs & Neighborhoods
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              From Manhattan skyscrapers to Brooklyn warehouses - we bring gourmet catering everywhere in NYC
            </p>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {boroughs.map((borough, i) => (
                  <div key={i} className="bg-card border-2 border-border rounded-lg p-6 hover:border-accent transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-6 w-6 text-accent" />
                      <h3 className="font-bold text-lg">{borough.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{borough.areas}</p>
                  </div>
                ))}
                <div className="bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Greater NYC Area</h3>
                  <p className="text-sm text-muted-foreground">Also serving Westchester, Long Island, and parts of Northern NJ adjacent to NYC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NYC Venue Types */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perfect for NYC Venues
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Manhattan Locations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Rooftop terraces & sky lounges</li>
                  <li>• Corporate office buildings</li>
                  <li>• Art galleries & museums</li>
                  <li>• Loft spaces & penthouses</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Brooklyn Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Warehouse event spaces</li>
                  <li>• Waterfront locations</li>
                  <li>• Industrial chic venues</li>
                  <li>• Brownstone backyards</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Outdoor Spaces</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Central Park events</li>
                  <li>• Brooklyn Bridge Park</li>
                  <li>• Riverside parks</li>
                  <li>• Private gardens</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate NYC</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Tech startup offices</li>
                  <li>• Financial district buildings</li>
                  <li>• Media company events</li>
                  <li>• Creative agency spaces</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NYC-Specific Benefits */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              NYC Event Expertise
            </h2>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  Permits & Regulations
                </h3>
                <p className="text-muted-foreground">
                  We handle all NYC food truck permits, parking authorizations, and venue compliance. You don&apos;t worry about paperwork.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  Tight Space Solutions
                </h3>
                <p className="text-muted-foreground">
                  Experienced with NYC&apos;s challenging logistics - narrow streets, loading docks, and limited parking. We make it work.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  Fast NYC Pace
                </h3>
                <p className="text-muted-foreground">
                  Quick service that matches New York&apos;s energy. We keep lines moving while maintaining quality.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  Weather Contingency
                </h3>
                <p className="text-muted-foreground">
                  Rain or shine, we operate year-round. NYC weather doesn&apos;t stop us from serving amazing food.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your NYC Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving all five boroughs with award-winning food truck catering. Get your free quote in 2 hours.
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

export default NewYorkCity;
