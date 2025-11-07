import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Clock, DollarSign, CheckCircle } from "lucide-react";

const DropOffCatering = () => {
  const benefits = [
    {
      icon: <Package className="h-8 w-8" />,
      title: "Hassle-Free Delivery",
      description: "We deliver fully prepared, ready-to-serve grilled cheese sandwiches directly to your location."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time-Efficient",
      description: "Perfect for tight schedules or venues with limited space. Quick delivery, minimal setup required."
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Budget-Friendly",
      description: "Cost-effective option without sacrificing quality. Great value for corporate lunches and meetings."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Flexible Portions",
      description: "Order exactly what you need. We offer individual packaging or family-style platters."
    }
  ];

  const includedItems = [
    "Freshly made grilled cheese sandwiches",
    "Individual or bulk packaging",
    "Serving utensils and plates",
    "Napkins and condiments",
    "Setup instructions if needed",
    "Dietary labels for allergies"
  ];

  const idealFor = [
    "Corporate meetings and lunches",
    "Office parties and celebrations",
    "Small private gatherings at home",
    "Last-minute events",
    "Venues with kitchen restrictions",
    "Budget-conscious events"
  ];

  return (
    <>
      <SEOHead
        title="Drop-Off Catering - Ready-to-Serve Grilled Cheese | NJ, PA, NY"
        description="Convenient drop-off catering service with gourmet grilled cheese. Perfect for corporate lunches, office meetings, and private gatherings. Serving NJ, PA, NYC, and surrounding areas."
        canonical="https://grillycheese.net/services/drop-off-catering"
        keywords="drop-off catering, corporate lunch delivery, office catering, sandwich delivery, bulk catering, meeting catering"
      />
      <SEOSchema
        type="service"
        title="Drop-Off Catering Services"
        description="Hassle-free drop-off catering with freshly prepared gourmet grilled cheese sandwiches delivered to your location."
        url="https://grillycheese.net/services/drop-off-catering"
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-6xl mx-auto text-center">
            <div className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-accent/30">
              <p className="text-accent font-semibold text-sm">📦 Convenient & Delicious</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Drop-Off Catering
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get award-winning grilled cheese delivered directly to your door. Perfect for corporate events, office lunches, and gatherings where you want great food without the fuss.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Drop-Off Catering?</h2>
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

        {/* What's Included */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {includedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-background rounded-lg border">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Order Online</h3>
                <p className="text-muted-foreground">Choose your sandwiches, sides, and quantities. Tell us your delivery time.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">We Prepare</h3>
                <p className="text-muted-foreground">Our team freshly prepares your order to perfection.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">We Deliver</h3>
                <p className="text-muted-foreground">Hot, fresh food arrives at your specified time and location.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-xl font-semibold mb-2">You Enjoy!</h3>
                <p className="text-muted-foreground">Serve and enjoy. Minimal cleanup required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Perfect For These Occasions</h2>
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

        {/* Minimum Order */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Minimum Order Information</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Minimum order of 10 sandwiches for drop-off catering service.
                </p>
                <p className="text-muted-foreground">
                  Contact us for pricing and availability. We recommend ordering at least 24-48 hours in advance for best selection.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Place Your Order?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a free quote for drop-off catering and simplify your next event!
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

export default DropOffCatering;