import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { MapPin, Check } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";

const WashingtonDC = () => {
  const areas = [
    "Capitol Hill", "Georgetown", "Dupont Circle", "Adams Morgan",
    "Columbia Heights", "U Street", "Navy Yard", "Penn Quarter",
    "Foggy Bottom", "Logan Circle", "Shaw", "H Street Corridor",
    "Arlington VA", "Alexandria VA", "Bethesda MD", "Silver Spring MD"
  ];

  return (
    <>
      <SEOHead
        title="Food Truck Catering Washington DC | Corporate & Event Catering"
        description="Premier food truck catering in Washington DC. Serving government, corporate events & celebrations. Award-winning grilled cheese. Licensed & insured. Book now!"
        canonical="https://grillycheese.net/locations/washington-dc"
        keywords="food truck catering DC, Washington DC food truck, corporate catering DC, event catering Washington, wedding food truck DC"
      />
      <SEOSchema 
        type="location" 
        locationName="Washington DC"
        title="Food Truck Catering Washington DC"
        url="https://grillycheese.net/locations/washington-dc"
      />
      
      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <MapPin className="h-4 w-4" /> Serving Washington DC Metro
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Washington DC&apos;s Premier Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Award-winning grilled cheese catering for government events, corporate functions, weddings, and celebrations. Serving DC, Northern Virginia, and Maryland suburbs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact">Get Your DC Quote</a>
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
              Why DC Loves Grilly Cheese
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Government Event Expert:</strong> Experienced with federal buildings & security protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Licensed & Insured:</strong> COI's available for all DC venues and government facilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Metro Area Coverage:</strong> Serving DC, Arlington, Alexandria & Maryland suburbs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Fast Response:</strong> Get your quote within 2 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              DC Metro Areas We Serve
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We proudly serve events throughout Washington DC and surrounding Virginia & Maryland areas
            </p>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {areas.map((area, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent transition-colors">
                    <MapPin className="h-5 w-5 text-accent mx-auto mb-2" />
                    <div className="font-semibold text-sm">{area}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-muted-foreground mt-8">
                Don&apos;t see your area? <a href="tel:8444745591" className="text-accent hover:underline">Call us</a> - we serve all of DC metro!
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your DC Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Serving government, corporate & private events throughout DC metro. Get your free quote in 2 hours.
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

export default WashingtonDC;
