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

const BurlingtonCounty = () => {
  const cities = [
    "Mount Laurel", "Moorestown", "Medford", "Burlington City", "Marlton",
    "Evesham", "Cinnaminson", "Delran", "Riverside", "Palmyra",
    "Bordentown", "Pemberton", "Browns Mills", "Willingboro", "Lumberton",
    "Shamong", "Southampton", "Westampton", "Eastampton", "Mount Holly",
    "Hainesport", "Maple Shade", "Tabernacle", "Medford Lakes", "Riverton"
  ];

  const faqs = [
    {
      question: "Do you serve all of Burlington County, NJ?",
      answer: "Yes! We serve all 40 municipalities in Burlington County, NJ's largest county by area. From Mount Laurel to Bordentown, Moorestown to Medford, we bring our award-winning food truck to events throughout the county."
    },
    {
      question: "What's the minimum guest count for Burlington County events?",
      answer: "For food truck catering in Burlington County, we have a minimum of 50 guests. For smaller gatherings, our drop-off catering option is available with a minimum of 15 guests and is perfect for office lunches or intimate parties."
    },
    {
      question: "Can you cater at Historic Smithville?",
      answer: "Absolutely! We've catered numerous events at Historic Smithville and other popular Burlington County venues. We're familiar with venue requirements and can provide all necessary permits and insurance certificates."
    },
    {
      question: "Do you serve the Pinelands area of Burlington County?",
      answer: "Yes! We serve Shamong, Tabernacle, Woodland Township, and other Pinelands communities. The beautiful outdoor settings in the Pine Barrens make for amazing food truck events."
    },
    {
      question: "How do I book for a Mount Laurel corporate event?",
      answer: "Simply fill out our quote form or call us directly. We've catered for many Mount Laurel corporate campuses and can provide COIs for any venue. Corporate lunch events are one of our specialties!"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://grillycheese.net/locations/burlington-county",
    "name": "Grilly Cheese - Burlington County Food Truck Catering",
    "image": "https://grillycheese.net/og-image.jpg",
    "description": "Award-winning food truck catering in Burlington County, NJ. Serving Mount Laurel, Moorestown, Medford, Marlton and all Burlington County towns for weddings, corporate events, and celebrations.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mount Laurel",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9340",
      "longitude": "-74.8910"
    },
    "areaServed": cities.map(city => ({
      "@type": "City",
      "name": city,
      "addressRegion": "NJ",
      "addressCountry": "US"
    })),
    "telephone": "+1-844-474-5591",
    "url": "https://grillycheese.net/locations/burlington-county",
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
      "reviewCount": "143",
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
            "description": "On-site food truck catering for events in Burlington County"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Drop-Off Catering",
            "description": "Delivered catering platters for smaller Burlington County events"
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
        "name": "Burlington County",
        "item": "https://grillycheese.net/locations/burlington-county"
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
        title="Food Truck Catering Burlington County NJ | Mount Laurel, Moorestown, Medford"
        description="Award-winning food truck catering in Burlington County, NJ. Serving Mount Laurel, Moorestown, Medford, Marlton & all Burlington County. 500+ 5-star reviews. Book now!"
        canonical="https://grillycheese.net/locations/burlington-county"
        keywords="food truck catering Burlington County, food truck Mount Laurel, catering Moorestown NJ, Medford food truck, Marlton catering, Burlington County wedding catering"
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
                <span className="text-foreground">Burlington County</span>
              </nav>

              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" /> Burlington County, New Jersey
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Burlington County Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for weddings, corporate events, and celebrations throughout New Jersey's largest county. From Mount Laurel to the Pinelands, we bring gourmet food to your event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="/#contact">Get Your Burlington County Quote</a>
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
                <div className="text-3xl font-bold text-foreground mb-1">400+</div>
                <div className="text-muted-foreground text-sm">Burlington County Events</div>
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
                <div className="text-3xl font-bold text-foreground mb-1">40+</div>
                <div className="text-muted-foreground text-sm">Towns Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Burlington County Chooses Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>County Coverage:</strong> We serve all 40 municipalities in NJ's largest county - from Mount Laurel's corporate parks to Medford's rural venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Diverse Venues:</strong> Experience with Historic Smithville, Pinelands outdoor events, golf clubs, breweries, and corporate campuses</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> Fully licensed for all Burlington County municipalities with COIs available for any venue</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Local Knowledge:</strong> We know the best spots and venue requirements throughout Burlington County</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Burlington County Towns We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve all 40 municipalities in Burlington County, New Jersey's largest county
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
                Don&apos;t see your town? We serve all of Burlington County! <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> to confirm service in your area.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular Burlington County Venues We Work With
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Historic & Unique Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Historic Smithville</li>
                  <li>• Smithville Mansion</li>
                  <li>• Kirby's Mill</li>
                  <li>• Batsto Village</li>
                  <li>• Rancocas State Park</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate Campuses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Mount Laurel Corporate Center</li>
                  <li>• Burlington Corporate Parks</li>
                  <li>• Moorestown Office Parks</li>
                  <li>• Joint Base MDL (civilian events)</li>
                  <li>• Tech companies along Route 73</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Breweries & Wineries</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Village Idiot Brewing</li>
                  <li>• Spellbound Brewing</li>
                  <li>• Valenzano Winery</li>
                  <li>• Sharrott Winery</li>
                  <li>• Local taprooms & venues</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Golf & Country Clubs</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Moorestown Field Club</li>
                  <li>• Medford Lakes Country Club</li>
                  <li>• Rancocas Golf Club</li>
                  <li>• Burlington Country Club</li>
                  <li>• Private estates & farms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Burlington County Catering FAQ
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
              <Link to="/locations/camden-county" className="text-accent hover:underline">Camden County</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/princeton" className="text-accent hover:underline">Princeton Area</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/new-jersey" className="text-accent hover:underline">All of New Jersey</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Burlington County Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From Mount Laurel corporate events to Medford weddings, we're Burlington County's favorite food truck caterer. Get your free quote in 2 hours.
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

export default BurlingtonCounty;
