import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Phone, MessageSquare } from "lucide-react";

const ServicesOverview = () => {
  const eventCategories = [
    {
      title: "Weddings & Celebrations",
      events: [
        {
          name: "Wedding Catering",
          icon: "💍",
          description: "Make your special day unforgettable with our gourmet grilled cheese catering. Customizable menus and elegant presentation.",
          link: "/events/wedding-catering",
          eventType: "wedding"
        },
        {
          name: "Engagement Parties",
          icon: "💝",
          description: "Celebrate your engagement with delicious comfort food that brings people together.",
          eventType: "engagement-party"
        },
        {
          name: "Anniversary Celebrations",
          icon: "🎊",
          description: "Mark another year of love with our specialty grilled cheese menu perfect for intimate or large gatherings.",
          eventType: "anniversary"
        },
        {
          name: "Bridal Showers",
          icon: "👰",
          description: "Treat the bride-to-be and guests to upscale comfort food they'll remember.",
          eventType: "bridal-shower"
        }
      ]
    },
    {
      title: "Milestone Events",
      events: [
        {
          name: "Bar & Bat Mitzvahs",
          icon: "✡️",
          description: "Celebrate this important milestone with customizable kosher-friendly options and crowd-pleasing favorites.",
          eventType: "bar-bat-mitzvah"
        },
        {
          name: "Sweet 16 Parties",
          icon: "🎂",
          description: "Make their 16th birthday unforgettable with fun, trendy grilled cheese creations teens love.",
          eventType: "sweet-16"
        },
        {
          name: "Quinceañeras",
          icon: "👑",
          description: "Celebrate this special coming-of-age with delicious food that honors tradition and creates memories.",
          eventType: "quinceanera"
        },
        {
          name: "Graduation Parties",
          icon: "🎓",
          description: "Celebrate academic achievements with comfort food that brings family and friends together.",
          eventType: "graduation"
        }
      ]
    },
    {
      title: "Corporate & Business",
      events: [
        {
          name: "Corporate Catering",
          icon: "🏢",
          description: "Elevate your business events with professional food truck catering. Perfect for meetings, conferences, and team building.",
          link: "/events/corporate-catering",
          eventType: "corporate-event"
        },
        {
          name: "Grand Openings",
          icon: "🎉",
          description: "Draw crowds to your grand opening with our eye-catching food truck and delicious menu.",
          eventType: "grand-opening"
        },
        {
          name: "Company Picnics",
          icon: "🌳",
          description: "Make your company outing memorable with hassle-free outdoor catering your team will love.",
          eventType: "company-picnic"
        }
      ]
    },
    {
      title: "Social Gatherings",
      events: [
        {
          name: "Baby Showers",
          icon: "👶",
          description: "Welcome the new arrival with comfort food that makes everyone feel at home.",
          link: "/events/baby-showers",
          eventType: "baby-shower"
        },
        {
          name: "Retirement Parties",
          icon: "🎈",
          description: "Honor years of dedication with a memorable celebration featuring everyone's favorite comfort food.",
          link: "/events/retirement-parties",
          eventType: "retirement-party"
        },
        {
          name: "Family Reunions",
          icon: "👨‍👩‍👧‍👦",
          description: "Bring the family together with food that appeals to all ages and dietary preferences.",
          eventType: "reunion"
        },
        {
          name: "Block Parties",
          icon: "🏘️",
          description: "Bring the neighborhood together with our mobile catering perfect for street celebrations.",
          eventType: "block-party"
        },
        {
          name: "Holiday Parties",
          icon: "🎄",
          description: "Celebrate the season with festive grilled cheese creations and seasonal specials.",
          eventType: "holiday-party"
        }
      ]
    },
    {
      title: "Community & Special Events",
      events: [
        {
          name: "Film & TV Set Catering",
          icon: "🎬",
          description: "Keep your cast and crew fueled with reliable, delicious catering for long production days.",
          link: "/events/film-set-catering",
          eventType: "film-tv-catering"
        },
        {
          name: "Fundraisers",
          icon: "💰",
          description: "Support your cause with crowd-pleasing food that draws attendees and maximizes donations.",
          eventType: "fundraiser"
        },
        {
          name: "School Events",
          icon: "🏫",
          description: "Make school events stress-free with kid-approved menus and efficient service.",
          eventType: "school-event"
        },
        {
          name: "Church Events",
          icon: "⛪",
          description: "Serve your congregation with quality food for fellowships, potlucks, and special occasions.",
          eventType: "church-event"
        },
        {
          name: "Sports Events",
          icon: "⚽",
          description: "Fuel athletes and fans with hearty, satisfying food perfect for game days.",
          eventType: "sports-event"
        },
        {
          name: "Festivals",
          icon: "🎪",
          description: "Stand out at festivals with our unique gourmet grilled cheese offerings that draw crowds.",
          eventType: "festival"
        }
      ]
    }
  ];

  const scrollToContact = (eventType: string) => {
    // Store event type in sessionStorage so the form can pre-select it
    sessionStorage.setItem('selectedEventType', eventType);
    window.location.href = '/#contact';
  };

  return (
    <>
      <SEOHead
        title="All Events We Cater - Weddings, Corporate, Parties & More"
        description="Discover all the events Grilly Cheese caters throughout NJ, PA, NY, MD, DE, and DC. From weddings and corporate events to bar mitzvahs and fundraisers - we do it all."
        canonical="https://grillycheese.net/events"
        keywords="food truck catering services, event catering, wedding catering, corporate catering, party catering, bar mitzvah catering, NJ catering services"
      />
      <SEOSchema
        type="service"
        title="Complete Event Catering Services"
        description="Professional food truck catering for all types of events including weddings, corporate functions, private parties, and community gatherings."
        url="https://grillycheese.net/events"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Events We Cater
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From intimate gatherings to large celebrations, Grilly Cheese brings gourmet comfort food to any occasion. 
              Serving New Jersey, Pennsylvania, New York, Maryland, Delaware, and Washington DC.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '/#contact'}>
                Get Your Free Quote
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:8444745591" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  844-474-5591
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="sms:8444745591" className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Text Us
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Event Categories */}
        <section className="py-16 px-4">
          <div className="container max-w-7xl mx-auto">
            {eventCategories.map((category, idx) => (
              <div key={idx} className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center">{category.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.events.map((event, eventIdx) => (
                    <Card key={eventIdx} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-4xl mb-3">{event.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          {event.description}
                        </p>
                        {event.link ? (
                          <Button asChild className="w-full">
                            <Link to={event.link}>Learn More</Link>
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            onClick={() => scrollToContact(event.eventType)}
                          >
                            Get Quote
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Grilly Cheese?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-xl font-semibold mb-2">Award-Winning Service</h3>
                <p className="text-muted-foreground">
                  Featured in major media outlets and loved by thousands of customers.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🍽️</div>
                <h3 className="text-xl font-semibold mb-2">Customizable Menus</h3>
                <p className="text-muted-foreground">
                  Dietary accommodations and custom creations to match your event perfectly.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">📍</div>
                <h3 className="text-xl font-semibold mb-2">Multi-State Coverage</h3>
                <p className="text-muted-foreground">
                  Serving NJ, PA, NY, MD, DE, and DC with reliable, professional service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Event?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a free quote and let's start planning your perfect event catering experience.
            </p>
            <Button size="lg" onClick={() => window.location.href = '/#contact'}>
              Request Your Free Quote
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServicesOverview;
