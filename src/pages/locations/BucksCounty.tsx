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

const BucksCounty = () => {
  const cities = [
    "Doylestown", "New Hope", "Newtown", "Yardley", "Bristol",
    "Langhorne", "Levittown", "Morrisville", "Perkasie", "Quakertown",
    "Warrington", "Warminster", "Bensalem", "Middletown", "Northampton",
    "Richboro", "Southampton", "Chalfont", "Sellersville", "Dublin"
  ];

  const faqs = [
    {
      question: "Do you serve all of Bucks County, PA?",
      answer: "Yes! We serve all municipalities in Bucks County including Doylestown, New Hope, Newtown, Yardley, and surrounding areas. Our food truck is fully licensed and insured to operate throughout Pennsylvania."
    },
    {
      question: "What's the minimum guest count for Bucks County events?",
      answer: "For food truck catering in Bucks County, we have a minimum of 50 guests. For smaller gatherings, our drop-off catering option is available with a minimum of 15 guests."
    },
    {
      question: "Can you cater at wineries and farms in Bucks County?",
      answer: "Absolutely! We frequently cater events at Bucks County wineries, farms, and estates including wedding venues along the Delaware River. We handle all necessary coordination with venue requirements."
    },
    {
      question: "How far in advance should I book for a Bucks County event?",
      answer: "We recommend booking 4-6 weeks in advance for weekend events, especially during peak wedding season (May-October). However, we can sometimes accommodate last-minute bookings based on availability."
    },
    {
      question: "Is there a travel fee for Bucks County?",
      answer: "Bucks County is within our standard service area from South Jersey. Travel fees may apply for venues in Upper Bucks County. Contact us for a specific quote based on your venue location."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://grillycheese.net/locations/bucks-county",
    "name": "Grilly Cheese - Bucks County PA Food Truck Catering",
    "image": "https://grillycheese.net/assets/grilly-cheese-logo.png",
    "description": "Award-winning food truck catering in Bucks County, PA. Serving Doylestown, New Hope, Newtown, Yardley and all Bucks County towns for weddings, corporate events, and celebrations.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Doylestown",
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.3101",
      "longitude": "-75.1299"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "40.3101",
        "longitude": "-75.1299"
      },
      "geoRadius": "30 mi"
    },
    "telephone": "+1-844-474-5591",
    "url": "https://grillycheese.net/locations/bucks-county",
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
            "description": "On-site food truck catering for events in Bucks County"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FoodService",
            "name": "Drop-Off Catering",
            "description": "Delivered catering platters for smaller Bucks County events"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FoodService",
            "name": "Wedding Catering",
            "description": "Full-service wedding catering at Bucks County venues"
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
        "name": "Pennsylvania",
        "item": "https://grillycheese.net/locations/pennsylvania"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bucks County",
        "item": "https://grillycheese.net/locations/bucks-county"
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
        title="Food Truck Catering Bucks County PA | Doylestown, New Hope, Newtown"
        description="Award-winning food truck catering in Bucks County, PA. Serving Doylestown, New Hope, Newtown, Yardley & all Bucks County. 500+ 5-star reviews. Book now!"
        canonical="https://grillycheese.net/locations/bucks-county"
        keywords="food truck catering Bucks County, food truck Doylestown, food truck New Hope, catering Newtown PA, Yardley food truck, Bucks County wedding catering"
      />
      <Helmet>
        <meta name="geo.region" content="US-PA" />
        <meta name="geo.placename" content="Bucks County" />
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
                <Link to="/locations/pennsylvania" className="hover:text-accent">Pennsylvania</Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Bucks County</span>
              </nav>

              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" /> Bucks County, Pennsylvania
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Bucks County Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for weddings, corporate events, and celebrations throughout Bucks County. From New Hope's charm to Doylestown's elegance, we bring gourmet food to your Pennsylvania event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="/#contact">Get Your Bucks County Quote</a>
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
                <div className="text-3xl font-bold text-foreground mb-1">200+</div>
                <div className="text-muted-foreground text-sm">Bucks County Events</div>
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
              Why Bucks County Chooses Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Wedding Specialists:</strong> We've catered dozens of weddings at Bucks County's premier venues including farms, wineries, and historic estates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> Fully licensed for Pennsylvania with COIs available for any venue requirement</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Venue Relationships:</strong> Established partnerships with popular Bucks County wedding and event venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Delaware River Corridor:</strong> Convenient access to all venues along the scenic Delaware River from Yardley to New Hope</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Bucks County Towns We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve all municipalities in Bucks County, Pennsylvania
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
                Don&apos;t see your town? We serve all of Bucks County! <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> to confirm service in your area. Plan your event at <a href="https://www.visitbuckscounty.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Visit Bucks County</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular Bucks County Venues We Work With
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Wedding Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• HollyHedge Estate</li>
                  <li>• Tyler Arboretum</li>
                  <li>• The Inn at Barley Sheaf Farm</li>
                  <li>• Crossing Vineyards</li>
                  <li>• Historic hotels in New Hope</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Doylestown business parks</li>
                  <li>• Langhorne corporate campuses</li>
                  <li>• Newtown office complexes</li>
                  <li>• Bensalem industrial parks</li>
                  <li>• Warrington tech centers</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Wineries & Farms</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Crossing Vineyards & Winery</li>
                  <li>• Sand Castle Winery</li>
                  <li>• Rose Bank Winery</li>
                  <li>• Local farm venues</li>
                  <li>• Orchard event spaces</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Parks & Outdoor</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Peace Valley Park</li>
                  <li>• Tyler State Park</li>
                  <li>• Core Creek Park</li>
                  <li>• Delaware River waterfront</li>
                  <li>• Private estates & backyards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Bucks County Catering FAQ
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

        {/* Related Blog Posts */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-center mb-6">Learn More About Bucks County Catering</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/blog/wedding-food-truck-catering-bucks-county-pa" className="text-accent hover:underline">Wedding Food Truck Guide for Bucks County</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/blog/how-much-does-it-cost-to-book-a-food-truck" className="text-accent hover:underline">Food Truck Pricing Guide</Link>
            </div>
          </div>
        </section>

        {/* Cross-links to Other Locations */}
        <section className="py-12 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold text-center mb-6">Also Serving Nearby Areas</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/locations/pennsylvania" className="text-accent hover:underline">All of Pennsylvania</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/new-jersey" className="text-accent hover:underline">New Jersey</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/locations/new-york-city" className="text-accent hover:underline">New York City</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Bucks County Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation quote for your Bucks County wedding, corporate event, or celebration.
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

export default BucksCounty;
