import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp, MapPin, CheckCircle } from "lucide-react";

const PopUpEvents = () => {
  const benefits = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Create Buzz",
      description: "Generate excitement and foot traffic with an unexpected gourmet food experience at your location."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Brand Activation",
      description: "Perfect for product launches, grand openings, and promotional campaigns that need memorable impact."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Flexible Location",
      description: "We can pop up virtually anywhere - parking lots, storefronts, parks, office complexes, and more."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Turnkey Solution",
      description: "We handle permits, setup, service, and breakdown. You just enjoy the success of your event."
    }
  ];

  const idealFor = [
    "Grand openings and ribbon cuttings",
    "Product launches and brand activations",
    "Retail store special events",
    "Office complex lunch programs",
    "Real estate open houses",
    "Promotional campaigns",
    "Seasonal pop-up markets",
    "Community gatherings"
  ];

  const whatWeProvide = [
    "Full food truck setup and staffing",
    "Professional, branded experience",
    "Social media-worthy presentation",
    "Customizable menu options",
    "Flexible service hours (2-4 hour minimum)",
    "Help with permit applications if needed"
  ];

  return (
    <>
      <SEOHead
        title="Pop-Up Food Truck Events - Create Buzz with Grilly Cheese | NJ, PA, NY"
        description="Book our food truck for pop-up events, grand openings, and promotional campaigns. Create excitement and draw crowds with award-winning grilled cheese. Serving NJ, PA, NYC, and beyond."
        canonical="https://grillycheese.net/services/pop-up-events"
        keywords="pop-up food truck, food truck rental, promotional food truck, grand opening catering, brand activation, mobile catering"
      />
      <SEOSchema
        type="service"
        title="Pop-Up Event Food Truck Services"
        description="Professional pop-up food truck service for grand openings, brand activations, and promotional events."
        url="https://grillycheese.net/services/pop-up-events"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-accent/30">
              <p className="text-accent font-semibold text-sm">⚡ Make an Impact</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Pop-Up Food Truck Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Turn heads and draw crowds with a surprise food truck experience. Perfect for grand openings, promotional campaigns, and creating memorable brand moments.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Why Pop-Up Events Work</h2>
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

        {/* What We Provide */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What We Provide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {whatWeProvide.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Pop-Up Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🏢</div>
                  <h3 className="text-xl font-semibold mb-2">Corporate Campus</h3>
                  <p className="text-muted-foreground">
                    Weekly pop-ups at a major pharmaceutical company bringing lunch to 200+ employees each visit.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl font-semibold mb-2">Retail Grand Opening</h3>
                  <p className="text-muted-foreground">
                    Drew 500+ visitors to a new store opening, creating buzz and driving foot traffic all day.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">🏘️</div>
                  <h3 className="text-xl font-semibold mb-2">Real Estate Development</h3>
                  <p className="text-muted-foreground">
                    Monthly pop-ups at new housing developments attracting potential buyers with great food.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Perfect For These Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {idealFor.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Section */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Planning Your Pop-Up</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">📅 Timing</h3>
                    <p className="text-muted-foreground">Book at least 2-3 weeks in advance. Minimum 2-hour service window.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">📍 Location</h3>
                    <p className="text-muted-foreground">Need parking space for our truck (approx. 30ft). We help with permit coordination.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">💰 Pricing</h3>
                    <p className="text-muted-foreground">Custom quotes based on duration, location, and expected volume. Contact us for details.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create a Pop-Up Moment?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our food truck can make your event unforgettable!
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

export default PopUpEvents;