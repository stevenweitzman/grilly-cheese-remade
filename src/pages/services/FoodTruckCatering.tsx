import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Users, Clock, CheckCircle } from "lucide-react";

const FoodTruckCatering = () => {
  const benefits = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Mobile Experience",
      description: "Our fully-equipped food truck brings the kitchen to your location, creating an interactive dining experience your guests will love."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Perfect for Any Size",
      description: "From intimate gatherings of 50 to large events of 1000+, our food truck service scales to meet your needs."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fresh & Hot",
      description: "Made-to-order grilled cheese sandwiches served hot off the grill, ensuring maximum quality and satisfaction."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Full Service",
      description: "We handle everything from setup to cleanup, letting you focus on enjoying your event."
    }
  ];

  const idealFor = [
    "Corporate events and team building",
    "Weddings and rehearsal dinners",
    "Festivals and community events",
    "Grand openings and promotional events",
    "Sporting events and tournaments",
    "School events and fundraisers"
  ];

  return (
    <>
      <SEOHead
        title="Food Truck Catering - Mobile Gourmet Grilled Cheese | NJ, PA, NY"
        description="Award-winning food truck catering service bringing gourmet grilled cheese to your event. Serving NJ, PA, NYC, MD, DE, and DC. Perfect for corporate events, weddings, festivals, and more."
        canonical="https://grillycheese.net/services/food-truck-catering"
        keywords="food truck catering, mobile catering, food truck hire, event food truck, wedding food truck, corporate food truck, NJ food truck"
      />
      <SEOSchema
        type="service"
        title="Food Truck Catering Services"
        description="Professional mobile food truck catering with gourmet grilled cheese sandwiches. Full-service catering for events of all sizes."
        url="https://grillycheese.net/services/food-truck-catering"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-accent/30">
              <p className="text-accent font-semibold text-sm">🚚 Mobile Catering Excellence</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Food Truck Catering
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Bring the award-winning Grilly Cheese experience directly to your event. Our iconic food truck serves up gourmet grilled cheese with a side of unforgettable memories.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '/#contact'}>
                Get Your Free Quote
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:8444745591">844-474-5591</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="container max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Food Truck Catering?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Book Your Date</h3>
                <p className="text-muted-foreground">Contact us with your event details and we'll check availability and discuss your menu preferences.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">We Arrive & Setup</h3>
                <p className="text-muted-foreground">Our truck arrives at your venue, sets up, and our team prepares for service. No stress for you!</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Serve & Enjoy</h3>
                <p className="text-muted-foreground">We serve your guests made-to-order grilled cheese, handle everything, and leave your venue clean.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Perfect For These Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {idealFor.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Serving the Tri-State Area & Beyond</h2>
            <p className="text-xl text-muted-foreground mb-6">
              New Jersey • Pennsylvania • New York City • Maryland • Delaware • Washington DC
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Major metros: Philadelphia, Baltimore, Princeton, Trenton, Queens, Brooklyn, Manhattan, Wilmington, and surrounding areas
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Our Food Truck?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a free quote and let's bring the Grilly Cheese experience to your next event!
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

export default FoodTruckCatering;