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
import { Link } from "react-router-dom";

const NewJersey = () => {
  const cities = [
    // Northern NJ (Near NYC)
    "Alpine", "Saddle River", "Short Hills", "Millburn", "Summit", "Ridgewood",
    "Montclair", "Glen Ridge", "Chatham", "Tenafly", "Englewood Cliffs", "Franklin Lakes",
    "Ho-Ho-Kus", "Bernardsville", "Far Hills",
    // Central NJ
    "Princeton", "Basking Ridge", "Rumson", "Colts Neck", "Holmdel",
    "Trenton", "Cherry Hill", "Camden", "Burlington", "Mount Laurel",
    "Voorhees", "Marlton", "Moorestown", "Medford", "Haddonfield",
    "Collingswood", "Pennsauken", "Deptford", "Gloucester",
    // Shore & South
    "Egg Harbor", "Atlantic City", "Vineland", "Millville", "Bridgeton",
    "Hamilton", "Ewing", "Lawrence", "Hopewell", "Pennington"
  ];

  return (
    <>
      <SEOHead
        title="Food Truck Catering New Jersey | NJ Wedding & Corporate Events"
        description="Top-rated food truck catering throughout New Jersey. Serving Princeton, Trenton, Cherry Hill & all NJ counties. Award-winning grilled cheese. 500+ 5-star reviews. Book now!"
        canonical="https://grillycheese.net/locations/new-jersey"
        keywords="food truck catering NJ, New Jersey food truck, catering Princeton NJ, Trenton catering, Cherry Hill food truck, wedding catering NJ"
      />
      <SEOSchema 
        type="location" 
        locationName="New Jersey"
        title="Food Truck Catering New Jersey"
        url="https://grillycheese.net/locations/new-jersey"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://grillycheese.net/locations/new-jersey",
            "name": "Grilly Cheese - New Jersey Food Truck Catering",
            "image": "https://grillycheese.net/og-image.jpg",
            "description": "Award-winning food truck catering throughout New Jersey. Serving weddings, corporate events, and celebrations across all NJ counties.",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "NJ",
              "addressCountry": "US"
            },
            "areaServed": cities.map(city => ({
              "@type": "City",
              "name": city,
              "addressRegion": "NJ",
              "addressCountry": "US"
            })),
            "telephone": "+1-844-474-5591",
            "url": "https://grillycheese.net/locations/new-jersey",
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
              "reviewCount": "500",
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
                  <MapPin className="h-4 w-4" /> Serving All of New Jersey
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                New Jersey&apos;s Premier Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for weddings, corporate events, and celebrations across the Garden State. From Princeton to the shore, we bring gourmet food to your event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="#contact">Get Your NJ Quote</a>
              </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591">Call: 844-474-5591</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us in NJ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why NJ Loves Grilly Cheese
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">2,500+</div>
                <div className="text-muted-foreground">NJ Events Catered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">4.9★</div>
                <div className="text-muted-foreground">Average Rating</div>
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
                  <span className="text-lg"><strong>Local Knowledge:</strong> We know the best venues, parks, and event spaces throughout New Jersey</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> COI's available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Weather Ready:</strong> We operate year-round with proper equipment for any NJ season</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Same-Day Service:</strong> Available for last-minute events based on availability</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Cities & Towns We Serve in New Jersey
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve events throughout Central, South, and parts of North New Jersey
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
                Don&apos;t see your city? <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> - we serve most of New Jersey!
              </p>
              
              <div className="mt-8 p-6 bg-card border border-border rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-center">Explore Our NJ County Pages</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/locations/camden-county" className="text-accent hover:underline font-medium">Camden County</Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to="/locations/burlington-county" className="text-accent hover:underline font-medium">Burlington County</Link>
                  <span className="text-muted-foreground">•</span>
                  <Link to="/locations/princeton" className="text-accent hover:underline font-medium">Princeton Area</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular New Jersey Venues We Work With
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Universities & Colleges</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Princeton University</li>
                  <li>• Rutgers University</li>
                  <li>• The College of New Jersey (TCNJ)</li>
                  <li>• Rowan University</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate Campuses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Johnson & Johnson</li>
                  <li>• Merck</li>
                  <li>• Bristol Myers Squibb</li>
                  <li>• TD Bank</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Parks & Recreation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Grounds For Sculpture</li>
                  <li>• Duke Farms</li>
                  <li>• Cooper River Park</li>
                  <li>• Mercer County Park</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Event Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Private estates & backyards</li>
                  <li>• Golf clubs & country clubs</li>
                  <li>• Wineries & breweries</li>
                  <li>• Historic sites</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your New Jersey Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving events of all sizes throughout the Garden State. Get your free quote in 2 hours.
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

export default NewJersey;
