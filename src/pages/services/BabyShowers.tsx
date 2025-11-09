import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Baby, Check, Calendar } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";

const BabyShowers = () => {
  return (
    <>
      <SEOHead
        title="Baby Shower Food Truck Catering | Unique & Memorable Baby Showers"
        description="Make your baby shower unforgettable with Grilly Cheese food truck catering. Award-winning comfort food, stress-free service. Perfect for backyard & venue celebrations. Book now!"
        canonical="https://grillycheese.net/services/baby-showers"
        keywords="baby shower food truck, baby shower catering, food truck baby shower, unique baby shower food, outdoor baby shower catering"
      />
      <SEOSchema
        type="service"
        serviceName="Baby Shower Catering"
        title="Baby Shower Food Truck Catering"
        url="https://grillycheese.net/services/baby-showers"
      />

      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />

        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <Baby className="h-4 w-4" /> Baby Shower Catering
                </p>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Baby Shower Food Truck Catering
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Celebrate the mom-to-be with delicious, Instagram-worthy food truck catering. Our award-winning grilled
                cheese and comfort food menu is perfect for baby showers of all sizes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Get Your Quote
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591">Call: 844-474-5591</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Grilly Cheese for Your Baby Shower
            </h2>

            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg">
                    <strong>Stress-Free Service:</strong> Let the mom-to-be enjoy her day while we handle all the food
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg">
                    <strong>Crowd-Pleasing Menu:</strong> Comfort food that everyone loves, with dietary accommodations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg">
                    <strong>Instagram-Worthy:</strong> Our colorful truck and food make perfect photo backdrops
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg">
                    <strong>Indoor/Outdoor Flexible:</strong> Perfect for backyard parties or venue celebrations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg">
                    <strong>All Group Sizes:</strong> From intimate gatherings to 200+ guests
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Baby Shower?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Make it memorable with award-winning food truck catering. Get your free quote in 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="tel:8444745591">Call/text: 844-474-5591</a>
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

export default BabyShowers;
