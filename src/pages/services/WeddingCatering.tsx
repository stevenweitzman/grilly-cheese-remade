import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Check, Heart, Camera, Users } from "lucide-react";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";

const WeddingCatering = () => {
  return (
    <>
      <SEOHead
        title="Wedding Food Truck Catering NJ, PA & NYC | Unique Wedding Catering"
        description="Make your wedding unforgettable with our gourmet food truck catering. Serve 50-500 guests in NJ, PA & NYC. Top 6 in nation. Custom menus, dietary options available. Book your date!"
        canonical="https://grillycheese.net/services/wedding-catering"
        keywords="wedding food truck, food truck wedding catering, unique wedding catering, outdoor wedding catering NJ, wedding reception food truck"
      />
      <SEOSchema 
        type="service" 
        serviceName="Wedding Food Truck Catering"
        title="Wedding Food Truck Catering"
        url="https://grillycheese.net/services/wedding-catering"
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
                  <Heart className="h-4 w-4" /> Perfect for Your Special Day
                </p>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Award-Winning Food Truck Catering for Your Wedding
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Turn your wedding reception into an unforgettable culinary experience. Our gourmet grilled cheese food truck serves 50-500 guests with handcrafted sandwiches, made fresh on-site.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <a href="#contact">Get Free Wedding Quote</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591">Call: 844-474-5591</a>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Serves 50-500 Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Custom Menu Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>2-Month Advance Booking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Couples Choose Our Food Truck
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card border-2 border-border rounded-xl p-8 hover:shadow-warm transition-all">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Unique & Memorable</h3>
                <p className="text-muted-foreground">
                  Your guests will talk about your wedding food for years. A food truck adds personality and excitement that traditional catering can&apos;t match.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8 hover:shadow-warm transition-all">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Camera className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instagram-Worthy</h3>
                <p className="text-muted-foreground">
                  Our beautifully designed truck becomes a stunning photo backdrop. Your wedding photos will be absolutely unique and social media-ready.
                </p>
              </div>

              <div className="bg-card border-2 border-border rounded-xl p-8 hover:shadow-warm transition-all">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Stress-Free Service</h3>
                <p className="text-muted-foreground">
                  We handle everything from setup to cleanup. You focus on celebrating while we serve fresh, hot food all night long.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Options */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Wedding Menu Packages
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                Choose from our curated wedding packages or create a custom menu
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border-2 border-border rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Simple Elegance</h3>
                  <p className="text-muted-foreground mb-6">
                    Perfect for intimate weddings and cocktail hours
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Classic grilled cheese selections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Hand-cut homemade fries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Premium beverages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>2-hour service window</span>
                    </li>
                  </ul>
                  <Button className="w-full" asChild>
                    <a href="#contact">Request Quote</a>
                  </Button>
                </div>

                <div className="bg-card border-2 border-accent rounded-xl p-8 relative">
                  <div className="absolute -top-4 right-8 bg-accent text-background px-4 py-2 rounded-full font-bold text-sm">
                    MOST POPULAR
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Premium Experience</h3>
                  <p className="text-muted-foreground mb-6">
                    The complete gourmet experience for your reception
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Full gourmet menu (up to 10 selections)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Signature sandwiches & hot dogs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Multiple side options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Dessert add-ons available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>4-hour service window</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent mt-0.5" />
                      <span>Vegan & gluten-free options</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-background" asChild>
                    <a href="#contact">Request Quote</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Couples Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &quot;Grilly Cheese made our wedding SO special! Our guests couldn&apos;t stop raving about the food. Best decision we made!&quot;
                </p>
                <p className="font-semibold">- Sarah & Mike</p>
                <p className="text-sm text-muted-foreground">June 2024 Wedding</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &quot;We wanted something unique and fun. The truck was a huge hit and the food was incredible. Everyone loved it!&quot;
                </p>
                <p className="font-semibold">- Jessica & Tom</p>
                <p className="text-sm text-muted-foreground">August 2024 Wedding</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &quot;From booking to the actual day, everything was seamless. The team was professional and the grilled cheese was amazing!&quot;
                </p>
                <p className="font-semibold">- Emily & Chris</p>
                <p className="text-sm text-muted-foreground">September 2024 Wedding</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make Your Wedding Unforgettable?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book now for 2025 weddings. Limited dates available for peak season.
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

export default WeddingCatering;
