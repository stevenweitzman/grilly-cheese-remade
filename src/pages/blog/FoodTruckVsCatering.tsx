import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import BlogArticleSchema from "@/components/blog/BlogArticleSchema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";

const FoodTruckVsCatering = () => {
  return (
    <>
      <SEOHead
        title="Food Trucks vs. Full-service Catering | Grilly Cheese"
        description="Compare food trucks to traditional catering. Discover the benefits of hiring a food truck for your event and why it might be the perfect choice."
        canonical="https://grillycheese.net/blog/food-trucks-vs-catering"
        keywords="food truck vs catering, catering comparison, event catering options, food truck benefits"
        ogType="article"
        articlePublishedTime="2023-06-10T10:00:00Z"
        articleModifiedTime="2025-12-28T10:00:00Z"
      />
      <SEOSchema 
        type="blog" 
        title="Food Trucks vs. Full-service Catering"
        url="https://grillycheese.net/blog/food-trucks-vs-catering"
      />
      <BlogArticleSchema
        headline="Food Trucks vs. Full-service Catering"
        description="Compare food trucks to traditional catering. Discover the benefits of hiring a food truck for your event and why it might be the perfect choice."
        datePublished="2023-06-10"
        dateModified="2025-12-28"
        url="https://grillycheese.net/blog/food-trucks-vs-catering"
      />
      
      <div className="min-h-screen">
        <Navigation />

        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <Link to="/blog" className="inline-flex items-center text-accent hover:underline mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <span className="text-sm text-muted-foreground">March 27, 2023</span>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                  Food Trucks vs. Full-service Catering
                </h1>
                <p className="text-xl text-muted-foreground">
                  Why food trucks are becoming the preferred choice for events
                </p>
              </div>

              <div className="mb-10 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop" 
                  alt="Elegant catering setup with food presentation"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="eager"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <QuickAnswerBox 
                  answer="Food trucks offer a unique guest experience, menu variety, customization, venue flexibility, lower costs (often 30-50% less), and faster service compared to traditional catering. They're ideal for casual events, outdoor venues, and creating memorable dining experiences."
                />

                <p className="text-lg">
                  Hiring a food truck instead of a full-service caterer has several benefits, including:
                </p>

                <div className="grid gap-6 my-8">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Check className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">1. Unique and Fun Experience</h3>
                        <p className="text-muted-foreground mb-0">
                          Food trucks offer a unique and fun experience for guests, which can make your event more memorable.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Check className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">2. Variety of Menu Options</h3>
                        <p className="text-muted-foreground mb-0">
                          Food trucks often specialize in a specific type of cuisine, which means you can offer your guests a wider variety of menu options than you might get with a traditional caterer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Check className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">3. Customizable Menus</h3>
                        <p className="text-muted-foreground mb-0">
                          Many food trucks are flexible and can customize their menu to suit your event's specific needs and preferences.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Check className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">4. Convenience</h3>
                        <p className="text-muted-foreground mb-0">
                          Food trucks are self-contained and don't require access to a kitchen or dining area, which means they can be set up in a variety of locations, both indoor and outdoor.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Check className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">5. Lower Cost</h3>
                        <p className="text-muted-foreground mb-0">
                          Food trucks can be a more affordable option than a full-service caterer, especially for smaller events or those with a tight budget.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <Check className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">6. Faster Service</h3>
                        <p className="text-muted-foreground mb-0">
                          Food trucks are designed to serve food quickly and efficiently, which means your guests won't have to wait long to be served.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg">
                  Overall, hiring a food truck can be a great option for those looking for a unique and convenient catering experience that offers a variety of menu options at a reasonable cost.
                </p>

                <div className="bg-accent/10 border-l-4 border-accent p-6 my-8">
                  <h3 className="text-xl font-bold mb-3">The Bottom Line</h3>
                  <p className="mb-0">
                    While traditional catering has its place, food trucks offer flexibility, entertainment value, and authentic cuisine that can transform your event from ordinary to extraordinary. Plus, guests love the interactive experience of ordering from a food truck!
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Try the Food Truck Experience?</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  See why thousands choose food truck catering for their events
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                    <a href="/#contact">Get Your Quote</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:8444745591">Call: 844-474-5591</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default FoodTruckVsCatering;
