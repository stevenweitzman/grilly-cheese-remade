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

const Pennsylvania = () => {
  const cities = [
    "Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading",
    "Scranton", "Bethlehem", "Lancaster", "Harrisburg", "York",
    "State College", "Wilkes-Barre", "Chester", "Easton", "Lebanon",
    "King of Prussia", "Norristown", "West Chester", "Bensalem", "Abington"
  ];

  return (
    <>
      <SEOHead
        title="Food Truck Catering Pennsylvania | PA Wedding & Corporate Events"
        description="Top-rated food truck catering in Pennsylvania. Serving Philadelphia, Pittsburgh, Lancaster & all PA regions. Award-winning grilled cheese. 4.9★ rated. Book your PA event today!"
        canonical="https://grillycheese.net/locations/pennsylvania"
        keywords="food truck catering PA, Pennsylvania food truck, catering Philadelphia, Pittsburgh catering, Lancaster food truck, wedding catering PA"
      />
      <SEOSchema 
        type="location" 
        locationName="Pennsylvania"
        title="Food Truck Catering Pennsylvania"
        url="https://grillycheese.net/locations/pennsylvania"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://grillycheese.net/locations/pennsylvania",
            "name": "Grilly Cheese - Pennsylvania Food Truck Catering",
            "image": "https://grillycheese.net/og-image.jpg",
            "description": "Award-winning food truck catering throughout Pennsylvania. Serving weddings, corporate events, and celebrations from Philadelphia to Pittsburgh.",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "PA",
              "addressCountry": "US"
            },
            "areaServed": cities.map(city => ({
              "@type": "City",
              "name": city,
              "addressRegion": "PA",
              "addressCountry": "US"
            })),
            "telephone": "+1-844-474-5591",
            "url": "https://grillycheese.net/locations/pennsylvania",
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
              "reviewCount": "450",
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
                  <MapPin className="h-4 w-4" /> Serving Pennsylvania Statewide
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Pennsylvania Food Truck Catering Excellence
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                From Philadelphia to Pittsburgh, we bring award-winning gourmet grilled cheese catering to your Pennsylvania event. Trusted for weddings, corporate gatherings, and celebrations across the Keystone State.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact">Get Free PA Quote</a>
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
              Pennsylvania&apos;s Favorite Food Truck
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">2,000+</div>
                <div className="text-muted-foreground">PA Events Catered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-muted-foreground">Fresh Ingredients</div>
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
                  <span className="text-lg"><strong>Statewide Coverage:</strong> From Philly to Pittsburgh, Erie to Lancaster - we travel throughout PA</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>PA Licensed:</strong> Fully certified and insured for Pennsylvania events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Flexible Service:</strong> Indoor and outdoor events, any season</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Local Partnerships:</strong> Trusted by PA venues, universities, and corporations</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Cities We Serve in Pennsylvania
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly cater events throughout Eastern, Central, and Western Pennsylvania
            </p>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cities.map((city, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent transition-colors">
                    <MapPin className="h-5 w-5 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">{city}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-muted-foreground mt-8">
                Not listed? <a href="tel:8444745591" className="text-accent hover:underline">Contact us</a> - we serve most of Pennsylvania!
              </p>
              
              <div className="mt-8 p-6 bg-card border border-border rounded-lg">
                <h3 className="font-bold text-lg mb-4 text-center">Explore Our PA County Pages</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/locations/bucks-county" className="text-accent hover:underline font-medium">Bucks County</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Trusted PA Venues & Partners
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Philadelphia Area</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Historic mansions & estates</li>
                  <li>• Art museum venues</li>
                  <li>• Waterfront locations</li>
                  <li>• Urban rooftop spaces</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Central PA</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Lancaster farmland venues</li>
                  <li>• Harrisburg corporate centers</li>
                  <li>• State parks & recreation areas</li>
                  <li>• Wine country locations</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Universities</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Penn State University</li>
                  <li>• University of Pennsylvania</li>
                  <li>• Temple University</li>
                  <li>• Carnegie Mellon</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate Parks</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• King of Prussia business district</li>
                  <li>• Pittsburgh tech campuses</li>
                  <li>• Suburban office parks</li>
                  <li>• Industrial event spaces</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Book Your Pennsylvania Event Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving events of all sizes across the Keystone State. Free quote in 2 hours.
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

export default Pennsylvania;
