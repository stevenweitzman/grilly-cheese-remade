import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { MapPin, Check, Phone, Star, Users, Award, GraduationCap, Building2, Heart } from "lucide-react";
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

const Princeton = () => {
  const areas = [
    "Princeton", "Princeton Junction", "West Windsor", "Plainsboro",
    "Montgomery", "Lawrenceville", "Pennington", "Hopewell",
    "Skillman", "Rocky Hill", "Kingston", "Belle Mead",
    "Cranbury", "Hightstown", "East Windsor", "Hamilton"
  ];

  const faqs = [
    {
      question: "Do you cater at Princeton University?",
      answer: "Yes! We've catered numerous events at Princeton University including reunion events, department celebrations, and student organization gatherings. We're familiar with campus logistics and can work with university event coordinators."
    },
    {
      question: "What's the minimum guest count for Princeton area events?",
      answer: "For food truck catering in the Princeton area, we have a minimum of 50 guests. For smaller upscale gatherings, our drop-off catering option is available with a minimum of 15 guests."
    },
    {
      question: "Can you cater corporate events at Princeton-area tech companies?",
      answer: "Absolutely! We regularly cater for corporate campuses in the Princeton area including pharmaceutical companies, tech firms, and research institutions. We provide COIs for all corporate venues."
    },
    {
      question: "Do you cater Princeton-area weddings?",
      answer: "Yes! Princeton-area weddings are one of our specialties. We've catered at venues like Jasna Polana, local farms, and private estates. Our gourmet grilled cheese is a hit for cocktail hours and late-night snacks."
    },
    {
      question: "How far in advance should I book for a Princeton event?",
      answer: "We recommend booking 6-8 weeks in advance for weekend events in the Princeton area, especially during graduation season and peak wedding months. Corporate events can often be scheduled with shorter notice."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://grillycheese.net/locations/princeton",
    "name": "Grilly Cheese - Princeton NJ Food Truck Catering",
    "image": "https://grillycheese.net/og-image.jpg",
    "description": "Award-winning food truck catering in Princeton, NJ. Serving Princeton University events, corporate catering, and upscale weddings throughout the Princeton area.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Princeton",
      "addressRegion": "NJ",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.3573",
      "longitude": "-74.6672"
    },
    "areaServed": areas.map(area => ({
      "@type": "City",
      "name": area,
      "addressRegion": "NJ",
      "addressCountry": "US"
    })),
    "telephone": "+1-844-474-5591",
    "url": "https://grillycheese.net/locations/princeton",
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
      "reviewCount": "98",
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
            "name": "Princeton University Event Catering",
            "description": "Food truck catering for Princeton University events and reunions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Catering",
            "description": "Food truck catering for Princeton-area corporate campuses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Catering",
            "description": "Upscale food truck catering for Princeton-area weddings"
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
        "name": "Princeton",
        "item": "https://grillycheese.net/locations/princeton"
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
        title="Food Truck Catering Princeton NJ | Princeton University, Corporate & Weddings"
        description="Award-winning food truck catering in Princeton, NJ. Perfect for Princeton University events, corporate catering, and upscale weddings. 500+ 5-star reviews. Book now!"
        canonical="https://grillycheese.net/locations/princeton"
        keywords="food truck catering Princeton NJ, Princeton University catering, corporate catering Princeton, wedding food truck Princeton, Plainsboro catering, West Windsor food truck"
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
                <span className="text-foreground">Princeton</span>
              </nav>

              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" /> Princeton, New Jersey
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Princeton NJ Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for Princeton University events, corporate gatherings, and upscale weddings. Bringing gourmet comfort food to one of New Jersey's most prestigious communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="/#contact">Get Your Princeton Quote</a>
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
                <div className="text-muted-foreground text-sm">Princeton Events</div>
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
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">50+</div>
                <div className="text-muted-foreground text-sm">University Events</div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Princeton Event Specialties
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <GraduationCap className="h-12 w-12 text-accent" />
                </div>
                <h3 className="font-bold text-xl mb-3">University Events</h3>
                <p className="text-muted-foreground">
                  Princeton reunions, department celebrations, student organizations, and campus events. We know the campus and work seamlessly with university coordinators.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Building2 className="h-12 w-12 text-accent" />
                </div>
                <h3 className="font-bold text-xl mb-3">Corporate Catering</h3>
                <p className="text-muted-foreground">
                  Pharmaceutical companies, tech campuses, research institutions, and corporate headquarters. Perfect for employee appreciation and client events.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="h-12 w-12 text-accent" />
                </div>
                <h3 className="font-bold text-xl mb-3">Upscale Weddings</h3>
                <p className="text-muted-foreground">
                  Cocktail hours, late-night snacks, and rehearsal dinners at Princeton's finest venues. Gourmet comfort food for your special day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Princeton Chooses Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>University Experience:</strong> We've catered at Princeton University multiple times and understand campus event requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Corporate-Ready:</strong> Professional service for Bristol-Myers Squibb, NRG Energy, and other Princeton-area corporations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Upscale Presentation:</strong> Gourmet grilled cheese that matches Princeton's refined atmosphere</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Fully Licensed:</strong> COIs available for all Princeton-area venues and institutions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Princeton Area Towns We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We serve Princeton and all surrounding communities in Mercer and Somerset counties
            </p>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {areas.map((area, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent transition-colors">
                    <MapPin className="h-5 w-5 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">{area}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Venues */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular Princeton Area Venues We Work With
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Princeton University & Academic</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Princeton University Campus</li>
                  <li>• Institute for Advanced Study</li>
                  <li>• Princeton Theological Seminary</li>
                  <li>• Westminster Choir College</li>
                  <li>• Rider University (nearby)</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Corporate Campuses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Bristol-Myers Squibb</li>
                  <li>• NRG Energy</li>
                  <li>• Janssen Pharmaceuticals</li>
                  <li>• Educational Testing Service (ETS)</li>
                  <li>• Princeton Forrestal Center</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Wedding & Event Venues</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Jasna Polana</li>
                  <li>• Drumthwacket</li>
                  <li>• Laurita Winery</li>
                  <li>• Private estates</li>
                  <li>• Princeton area farms</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Parks & Recreation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Grounds For Sculpture</li>
                  <li>• Mercer County Park</li>
                  <li>• Princeton Battlefield State Park</li>
                  <li>• D&R Canal State Park</li>
                  <li>• Community parks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Princeton Catering FAQ
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
        <section className="py-12 bg-background">
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
              Ready to Book Your Princeton Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From Princeton University reunions to corporate events and elegant weddings, we bring award-winning food truck catering to the Princeton area. Get your free quote in 2 hours.
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

export default Princeton;
