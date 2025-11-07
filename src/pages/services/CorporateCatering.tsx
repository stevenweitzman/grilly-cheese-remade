import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Check, Briefcase, TrendingUp, Clock } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";

const CorporateCatering = () => {
  return (
    <>
      <SEOHead
        title="Corporate Event Catering NJ | Food Truck for Office Events & Meetings"
        description="Professional food truck catering for corporate events, meetings & employee appreciation in NJ, PA & NYC. Trusted by Target, J&J, Princeton. Fast service, great food. Get quote!"
        canonical="https://grillycheese.net/services/corporate-catering"
        keywords="corporate catering, office lunch catering, employee appreciation catering, company event food truck, business catering NJ"
      />
      <SEOSchema 
        type="service" 
        serviceName="Corporate Event Catering"
        title="Corporate Event Catering"
        url="https://grillycheese.net/services/corporate-catering"
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
                  <Briefcase className="h-4 w-4" /> Trusted by Fortune 500 Companies
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Corporate Food Truck Catering That Impresses
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Elevate your company events, team meetings, and employee appreciation days with award-winning food truck catering. Trusted by Target, Johnson & Johnson, Princeton University, and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact">Get Corporate Quote</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591">Call: 844-474-5591</a>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Corporate Events</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent">50-500</div>
                  <div className="text-sm text-muted-foreground">Guests Served</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent">2-4hr</div>
                  <div className="text-sm text-muted-foreground">Service Window</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl font-bold text-accent">4.9★</div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Companies Choose Our Food Truck
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card border-2 border-border rounded-xl p-8">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Boost Employee Morale</h3>
                <p className="text-muted-foreground">
                  Nothing says &quot;we appreciate you&quot; like bringing in a top-rated food truck. Employees love the variety and experience.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Efficient Service</h3>
                <p className="text-muted-foreground">
                  Fast service means minimal disruption to your workday. We serve 100+ people per hour with hot, fresh food.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Professional & Reliable</h3>
                <p className="text-muted-foreground">
                  Licensed, insured, and experienced. We arrive on time, set up quickly, and handle everything professionally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perfect For These Corporate Events
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { title: "Team Meetings", description: "Lunch & learns, quarterly meetings, town halls" },
                { title: "Employee Appreciation", description: "Thank your team with an unexpected treat" },
                { title: "Client Events", description: "Impress clients with unique catering" },
                { title: "Company Picnics", description: "Summer outings, holiday parties, celebrations" },
                { title: "Office Lunches", description: "Regular or one-time office lunch catering" },
                { title: "Grand Openings", description: "Launch events, ribbon cuttings, open houses" },
                { title: "Trade Shows", description: "Conference catering, vendor appreciation" },
                { title: "Recruiting Events", description: "Career fairs, candidate interviews, onboarding" }
              ].map((event, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
                  <h3 className="font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-8">Trusted By Leading Companies</h2>
            <p className="text-muted-foreground mb-8">
              Target • Johnson & Johnson • Princeton University • Rutgers • Merck • Wells Fargo • Comcast
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your Corporate Event?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a free quote within 2 hours. Volume discounts available for recurring bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                <a href="tel:8444745591">Call: 844-474-5591</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/#contact">Get Free Quote</a>
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

export default CorporateCatering;
