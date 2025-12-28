import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { MapPin, Check, Phone, Star, Users, Award } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CamdenCounty = () => {
  const cities = [
    "Cherry Hill", "Haddonfield", "Voorhees", "Collingswood", "Marlton",
    "Merchantville", "Audubon", "Bellmawr", "Gloucester City", "Lindenwold",
    "Winslow", "Berlin", "Sicklerville", "Clementon", "Pine Hill",
    "Stratford", "Barrington", "Runnemede", "Haddon Heights", "Haddon Township",
    "Oaklyn", "Lawnside", "Magnolia", "Somerdale", "Hi-Nella"
  ];

  const faqs = [
    {
      question: "Do you serve all of Camden County, NJ?",
      answer: "Yes! We serve all 37 municipalities in Camden County including Cherry Hill, Haddonfield, Voorhees, Collingswood, and surrounding areas. Our food truck is fully licensed and insured to operate throughout the county."
    },
    {
      question: "What's the minimum guest count for Camden County events?",
      answer: "For food truck catering in Camden County, we have a minimum of 50 guests. For smaller gatherings, our drop-off catering option is available with a minimum of 15 guests."
    },
    {
      question: "Can you cater at Cooper River Park?",
      answer: "Absolutely! We frequently cater events at Cooper River Park, as well as other popular Camden County venues like Haddon Heights Stadium, local breweries, and private estates. We handle all necessary permits."
    },
    {
      question: "How far in advance should I book for a Camden County event?",
      answer: "We recommend booking 4-6 weeks in advance for weekend events, especially during peak season (May-October). However, we can sometimes accommodate last-minute bookings based on availability."
    },
    {
      question: "Do you provide certificates of insurance for Camden County venues?",
      answer: "Yes, we provide COIs for all Camden County venues that require them. Just let us know the venue requirements and we'll have the certificate ready before your event."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://grillycheese.net/locations/camden-county",
    "name": "Grilly Cheese - Camden County Food Truck Catering",
    "image": "https://grillycheese.net/og-image.jpg",
    "description": "Award-winning food truck catering in Camden County, NJ. Serving Cherry Hill, Haddonfield, Voorhees, Collingswood and all Camden County towns for weddings, corporate events, and celebrations.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cherry Hill",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9346",
      "longitude": "-75.0307"
    },
    "areaServed": cities.map(city => ({
      "@type": "City",
      "name": city,
      "addressRegion": "NJ",
      "addressCountry": "US"
    })),
    "telephone": "+1-844-474-5591",
    "url": "https://grillycheese.net/locations/camden-county",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "servesCuisine": ["American", "Comfort Food", "Grilled Cheese"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Food Truck Catering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Food Truck Catering",
            "description": "On-site food truck catering for events in Camden County"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Drop-Off Catering",
            "description": "Delivered catering platters for smaller Camden County events"
          }
        }
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://grillycheese.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://grillycheese.net/locations/new-jersey"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Camden County",
        "item": "https://grillycheese.net/locations/camden-county"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="Food Truck Catering Camden County NJ | Cherry Hill, Haddonfield, Voorhees"
        description="Award-winning food truck catering in Camden County, NJ. Serving Cherry Hill, Haddonfield, Voorhees, Collingswood & all Camden County. 500+ 5-star reviews. Book now!"
        canonical="https://grillycheese.net/locations/camden-county"
        keywords="food truck catering Camden County, food truck Cherry Hill, food truck Haddonfield, catering Voorhees NJ, Collingswood food truck, Camden County wedding catering"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-accent">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/locations/new-jersey" className="hover:text-accent">New Jersey</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Camden County</span>
              </nav>

              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" /> Camden County, New Jersey
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Camden County Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for weddings, corporate events, and celebrations throughout Camden County. From Cherry Hill to Collingswood, we bring gourmet food to your South Jersey event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="/#contact">Get Your Camden County Quote</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call: 844-474-5591
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">500+</div>
                <div className="text-muted-foreground text-sm">Camden County Events</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">4.9★</div>
                <div className="text-muted-foreground text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">Top 6</div>
                <div className="text-muted-foreground text-sm">In the Nation</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">25+</div>
                <div className="text-muted-foreground text-sm">Towns Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Camden County Chooses Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Local Expertise:</strong> We know Camden County inside and out - from Cherry Hill's corporate parks to Haddonfield's historic downtown venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> Fully licensed for all Camden County municipalities with COIs available for any venue</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Venue Relationships:</strong> Established partnerships with Cooper River Park, local breweries, and top Camden County wedding venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Quick Response:</strong> Being based in South Jersey means fast quotes and flexible scheduling for Camden County events</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Camden County Towns We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve all 37 municipalities in Camden County, New Jersey
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
                Don&apos;t see your town? We serve all of Camden County! <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> to confirm service in your area.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular Camden County Venues We Work With
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Parks & Outdoor Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Cooper River Park</li>
                  <li>• Haddon Heights Stadium</li>
                  <li>• Camden County Boathouse</li>
                  <li>• Newton Lake Park</li>
                  <li>• Hopkins Pond</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate Campuses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Cherry Hill Office Parks</li>
                  <li>• Subaru of America HQ</li>
                  <li>• TD Bank Corporate</li>
                  <li>• Lockheed Martin</li>
                  <li>• American Water</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Breweries & Restaurants</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Tonewood Brewing</li>
                  <li>• Lunacy Brewing</li>
                  <li>• Double Nickel Brewing</li>
                  <li>• Local venues in Collingswood</li>
                  <li>• Haddonfield restaurants</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Event Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Adventure Aquarium (nearby)</li>
                  <li>• Private estates & backyards</li>
                  <li>• Golf clubs & country clubs</li>
                  <li>• Community centers</li>
                  <li>• School & university events</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Camden County Catering FAQ
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Cross-links to Other Locations */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-center mb-6">Also Serving Nearby Areas</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/locations/burlington-county" className="text-accent hover:underline">Burlington County</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/new-jersey" className="text-accent hover:underline">All of New Jersey</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/pennsylvania" className="text-accent hover:underline">Pennsylvania</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Camden County Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From Cherry Hill corporate lunches to Haddonfield weddings, we're Camden County's favorite food truck caterer. Get your free quote in 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="/#contact">Get Your Free Quote</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:8444745591">Call: 844-474-5591</a>
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

export default CamdenCounty;
