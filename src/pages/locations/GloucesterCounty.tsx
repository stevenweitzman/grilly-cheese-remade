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

const GloucesterCounty = () => {
  const cities = [
    "Washington Township", "Deptford", "Woodbury", "Glassboro", "Williamstown",
    "Sewell", "Turnersville", "Pitman", "Swedesboro", "Woolwich",
    "Monroe Township", "Mullica Hill", "Clayton", "Franklinville", "Mantua",
    "Wenonah", "Paulsboro", "National Park", "Westville", "Greenwich Township"
  ];

  const faqs = [
    {
      question: "Do you serve all of Gloucester County, NJ?",
      answer: "Yes! We serve all municipalities in Gloucester County including Washington Township, Deptford, Woodbury, Glassboro, and surrounding areas. Our food truck is fully licensed and insured to operate throughout the county."
    },
    {
      question: "What's the minimum guest count for Gloucester County events?",
      answer: "For food truck catering in Gloucester County, we have a minimum of 50 guests. For smaller gatherings, our drop-off catering option is available with a minimum of 15 guests."
    },
    {
      question: "Can you cater at Rowan University or Glassboro events?",
      answer: "Absolutely! We frequently cater events at Rowan University, as well as corporate events and private parties throughout Glassboro. We handle all necessary permits and coordination."
    },
    {
      question: "How far in advance should I book for a Gloucester County event?",
      answer: "We recommend booking 4-6 weeks in advance for weekend events, especially during peak season (May-October). However, we can sometimes accommodate last-minute bookings based on availability."
    },
    {
      question: "Do you travel to Mullica Hill for weddings?",
      answer: "Yes! Mullica Hill is one of our favorite areas in Gloucester County. We've catered many weddings at local farms, wineries, and estate venues in the area. Contact us for specific venue requirements."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://grillycheese.net/locations/gloucester-county",
    "name": "Grilly Cheese - Gloucester County NJ Food Truck Catering",
    "image": "https://grillycheese.net/assets/grilly-cheese-logo.png",
    "description": "Award-winning food truck catering in Gloucester County, NJ. Serving Washington Township, Deptford, Woodbury, Glassboro and all Gloucester County towns for weddings, corporate events, and celebrations.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Washington Township",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.7473",
      "longitude": "-75.0554"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "39.7473",
        "longitude": "-75.0554"
      },
      "geoRadius": "20 mi"
    },
    "telephone": "+1-844-474-5591",
    "url": "https://grillycheese.net/locations/gloucester-county",
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
      "reviewCount": "500",
      "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Food Truck Catering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FoodService",
            "name": "Food Truck Catering",
            "description": "On-site food truck catering for events in Gloucester County"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FoodService",
            "name": "Drop-Off Catering",
            "description": "Delivered catering platters for smaller Gloucester County events"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FoodService",
            "name": "Wedding Catering",
            "description": "Full-service wedding catering at Gloucester County venues"
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
        "name": "New Jersey",
        "item": "https://grillycheese.net/locations/new-jersey"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Gloucester County",
        "item": "https://grillycheese.net/locations/gloucester-county"
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
        title="Food Truck Catering Gloucester County NJ | Deptford, Woodbury, Glassboro"
        description="Award-winning food truck catering in Gloucester County, NJ. Serving Washington Township, Deptford, Woodbury, Glassboro & all Gloucester County. 500+ 5-star reviews. Book now!"
        canonical="https://grillycheese.net/locations/gloucester-county"
        keywords="food truck catering Gloucester County, food truck Deptford, food truck Woodbury, catering Glassboro NJ, Washington Township food truck, Gloucester County wedding catering"
      />
      <Helmet>
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="Gloucester County" />
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
                <span className="text-foreground">Gloucester County</span>
              </nav>

              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" /> Gloucester County, New Jersey
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Gloucester County Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for weddings, corporate events, and celebrations throughout Gloucester County. From Deptford's business districts to Mullica Hill's charming farms, we bring gourmet food to your South Jersey event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="/#contact">Get Your Gloucester County Quote</a>
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
                <div className="text-3xl font-bold text-foreground mb-1">300+</div>
                <div className="text-muted-foreground text-sm">Gloucester County Events</div>
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
                <div className="text-3xl font-bold text-foreground mb-1">20+</div>
                <div className="text-muted-foreground text-sm">Towns Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Gloucester County Chooses Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Local Neighbors:</strong> We're based in nearby Chesilhurst, so Gloucester County is practically our backyard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> Fully licensed for all Gloucester County municipalities with COIs available for any venue</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Farm & Winery Experience:</strong> Extensive experience catering at Mullica Hill farms, wineries, and rustic venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Quick Response:</strong> Being local means fast quotes, easy site visits, and flexible scheduling</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Gloucester County Towns We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve all municipalities in Gloucester County, New Jersey
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
                Don&apos;t see your town? We serve all of Gloucester County! <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> to confirm service in your area.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular Gloucester County Venues We Work With
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Wedding Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Renault Winery</li>
                  <li>• Mullica Hill farms</li>
                  <li>• Valenzano Winery</li>
                  <li>• Local vineyards & orchards</li>
                  <li>• Private estates & barns</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Deptford business parks</li>
                  <li>• <a href="https://www.rowan.edu/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Rowan University</a></li>
                  <li>• Washington Township offices</li>
                  <li>• Industrial parks</li>
                  <li>• Tech company campuses</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Parks & Recreation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Red Bank Battlefield Park</li>
                  <li>• Scotland Run Park</li>
                  <li>• Gloucester County fairgrounds</li>
                  <li>• Community centers</li>
                  <li>• Sports complexes</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Unique Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Mullica Hill antique district</li>
                  <li>• Local breweries & taprooms</li>
                  <li>• Historic Woodbury</li>
                  <li>• Backyard celebrations</li>
                  <li>• Golf clubs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Gloucester County Catering FAQ
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
              <Link to="/locations/burlington-county" className="text-accent hover:underline">Burlington County</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/new-jersey" className="text-accent hover:underline">All of New Jersey</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/pennsylvania" className="text-accent hover:underline">Pennsylvania</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Gloucester County Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation quote for your Gloucester County wedding, corporate event, or celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="/#contact">Get Your Free Quote</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:8444745591" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  844-474-5591
                </a>
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

export default GloucesterCounty;
