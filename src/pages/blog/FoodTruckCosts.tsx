import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import BlogArticleSchema from "@/components/blog/BlogArticleSchema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";

const FoodTruckCosts = () => {
  return (
    <>
      <SEOHead
        title="What Are the Costs for Booking A Food Truck? | Grilly Cheese"
        description="Understand all the costs involved in booking a food truck for your event. Learn about base costs, travel fees, service charges, and more."
        canonical="https://grillycheese.net/blog/food-truck-costs"
        keywords="food truck costs, food truck pricing, catering costs, event budget, food truck fees"
        ogType="article"
        articlePublishedTime="2023-08-15T10:00:00Z"
        articleModifiedTime="2025-12-28T10:00:00Z"
      />
      <SEOSchema 
        type="blog" 
        title="What Are the Costs for Booking A Food Truck?"
        url="https://grillycheese.net/blog/food-truck-costs"
      />
      <BlogArticleSchema
        headline="What Are the Costs for Booking A Food Truck?"
        description="Understand all the costs involved in booking a food truck for your event. Learn about base costs, travel fees, service charges, and more."
        datePublished="2023-08-15"
        dateModified="2025-12-28"
        url="https://grillycheese.net/blog/food-truck-costs"
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
                  What Are the Costs for Booking A Food Truck?
                </h1>
                <p className="text-xl text-muted-foreground">
                  A comprehensive breakdown of all costs to consider when hiring a food truck
                </p>
              </div>

              <div className="mb-10 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop" 
                  alt="Calculator and budget planning for event catering"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="eager"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <QuickAnswerBox 
                  answer="Food truck booking costs include: base food cost ($15-35/person), travel fees for distant venues, service fees for setup/cleanup, sales tax, 10% gratuity, and any add-on services. Get a detailed quote to understand your total event cost."
                />

                <h2>Costs to Consider When Booking a Food Truck</h2>
                <p>
                  When hiring a food truck, there are several costs to consider, including:
                </p>

                <div className="grid gap-6 my-8">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">1. Base Cost</h3>
                        <p className="text-muted-foreground">
                          The base cost of the food truck will typically include the cost of the food, any required staff, and the cost to rent the truck itself. This can range from a few hundred dollars to a few thousand dollars, depending on the size of the truck and the menu options.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">2. Travel Fees</h3>
                        <p className="text-muted-foreground">
                          If the food truck needs to travel a significant distance to reach your event, there may be additional travel fees to consider. These fees will vary depending on the distance traveled and the location of your event.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">3. Service Fees</h3>
                        <p className="text-muted-foreground">
                          Some food trucks may charge a service fee to cover the cost of set up, breakdown, and clean up after the event. This fee can range from a flat fee to a percentage of the total cost.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">4. Sales Tax</h3>
                        <p className="text-muted-foreground">
                          Depending on your location and the food truck's location, you may need to pay sales tax on the food and services provided.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">5. Gratuity</h3>
                        <p className="text-muted-foreground">
                          It is customary to tip the staff working the food truck, so be sure to budget for a gratuity when calculating the total cost.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">6. Additional Services</h3>
                        <p className="text-muted-foreground">
                          If you require additional services, such as a DJ or entertainment, the food truck may be able to provide these services for an additional fee.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg">
                  Overall, the total cost of hiring a food truck will depend on a variety of factors, including the size of the truck, the menu options, the location, and any additional services required. It's important to <Link to="/#contact" className="text-accent hover:underline font-semibold">get a detailed quote</Link> from the food truck before booking to ensure that you have an accurate idea of the total cost.
                </p>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Get a Transparent Quote Today</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  No hidden fees. Clear pricing for your event.
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

export default FoodTruckCosts;
