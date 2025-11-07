import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Award, Check, Calendar } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";

const RetirementParties = () => {
  return (
    <>
      <SEOHead
        title="Retirement Party Food Truck Catering | Memorable Send-Off Celebrations"
        description="Celebrate retirement milestones with Grilly Cheese food truck catering. Award-winning comfort food for corporate & private retirement parties. Stress-free service. Book now!"
        canonical="https://grillycheese.net/services/retirement-parties"
        keywords="retirement party food truck, retirement catering, food truck retirement party, corporate retirement party catering"
      />
      <SEOSchema 
        type="service" 
        serviceName="Retirement Party Catering"
        title="Retirement Party Food Truck Catering"
        url="https://grillycheese.net/services/retirement-parties"
      />
      
      <div className="min-h-screen">
        <Navigation />
        <StickyCTABar />

        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-accent/30">
                <p className="text-accent font-semibold text-sm flex items-center gap-2 justify-center">
                  <Award className="h-4 w-4" /> Retirement Party Catering
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Retirement Party Food Truck Catering
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Send them off in style! Our award-winning food truck creates a memorable, fun atmosphere for retirement celebrations. Perfect for corporate send-offs and private parties.
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
              Why Choose Grilly Cheese for Retirement Parties
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Corporate Approved:</strong> COI's available, professional service for workplace events</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Memorable Experience:</strong> Food truck creates a fun, casual atmosphere everyone enjoys</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Stress-Free Planning:</strong> We handle setup, service, and cleanup</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>Indoor/Outdoor Options:</strong> Flexible service for any venue or location</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg"><strong>All Party Sizes:</strong> From small team celebrations to company-wide events</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Retirement Party?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create a memorable send-off with award-winning food truck catering. Get your free quote in 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="tel:8444745591">Call: 844-474-5591</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/#contact">Request Quote Online</a>
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

export default RetirementParties;
