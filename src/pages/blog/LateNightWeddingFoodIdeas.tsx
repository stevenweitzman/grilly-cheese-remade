import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import BlogArticleSchema from "@/components/blog/BlogArticleSchema";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Calendar, Clock, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";

const LateNightWeddingFoodIdeas = () => {
  const foodIdeas = [
    {
      name: "Gourmet Grilled Cheese",
      why: "Comfort food that's easy to eat while dancing. Customizable with different cheeses and toppings.",
      bestFor: "Any wedding style, especially casual and rustic venues"
    },
    {
      name: "Tacos & Burritos",
      why: "Build-your-own stations keep guests engaged. Easy to accommodate dietary restrictions.",
      bestFor: "Outdoor weddings, summer events, casual celebrations"
    },
    {
      name: "Sliders & Mini Burgers",
      why: "Classic crowd-pleaser that's easy to eat. Works for all ages.",
      bestFor: "Backyard weddings, brewery venues, casual receptions"
    },
    {
      name: "Pizza",
      why: "Universally loved, shareable, and satisfying. Great for large groups.",
      bestFor: "Late-night after-parties, casual venues, younger crowds"
    },
    {
      name: "Mac & Cheese Bar",
      why: "Ultimate comfort food with endless topping options. Very photogenic.",
      bestFor: "Fall/winter weddings, comfort food themes"
    },
    {
      name: "French Fries & Loaded Tots",
      why: "Perfect late-night snack. Customizable with various toppings.",
      bestFor: "Any wedding, especially as an add-on to other food"
    },
    {
      name: "Donuts & Churros",
      why: "Sweet ending to the night. Great for photos and Instagram.",
      bestFor: "Dessert course replacement, after-party treats"
    },
    {
      name: "BBQ Sandwiches",
      why: "Hearty and satisfying. Appeals to meat lovers.",
      bestFor: "Southern-style weddings, outdoor venues, fall events"
    }
  ];

  return (
    <>
      <SEOHead
        title="10 Best Late Night Wedding Food Ideas [2025 Guide]"
        description="Discover the best late night wedding food ideas that guests love. From gourmet grilled cheese to tacos, find the perfect late night snack for your reception."
        canonical="https://grillycheese.net/blog/late-night-wedding-food-ideas"
        keywords="late night wedding food, wedding late night snacks, wedding after party food, best wedding food ideas"
        ogType="article"
        articlePublishedTime="2025-12-27T10:00:00Z"
        articleModifiedTime="2025-12-28T10:00:00Z"
      />
      <SEOSchema type="blog" title="Best Late Night Wedding Food Ideas" description="Top late night wedding food ideas for your reception" url="https://grillycheese.net/blog/late-night-wedding-food-ideas" />
      
      <BlogArticleSchema
        headline="10 Best Late Night Wedding Food Ideas [2025 Guide]"
        description="Discover the best late night wedding food ideas that guests love. From gourmet grilled cheese to tacos, find the perfect late night snack for your reception."
        datePublished="2025-12-27"
        dateModified="2025-12-28"
        url="https://grillycheese.net/blog/late-night-wedding-food-ideas"
      />

      <div className="min-h-screen">
        <Navigation />
        
        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>

              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  10 Best Late Night Wedding Food Ideas Your Guests Will Love
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    December 27, 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    6 min read
                  </span>
                </div>
              </header>

              <QuickAnswerBox 
                answer="The best late night wedding foods are gourmet grilled cheese, tacos, sliders, and pizza. Serve comfort food 2-3 hours after dinner (around 10 PM-midnight) to keep guests energized for dancing. Food trucks are the most popular way to serve late night wedding snacks."
              />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8">
                  Late night wedding food has become a must-have at modern receptions. Here are the best options to keep your guests happy and dancing all night long.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  What Is the Best Late Night Food for a Wedding?
                </h2>
                <p className="text-muted-foreground mb-8">
                  The best late night wedding foods are <strong className="text-foreground">comfort foods that are easy to eat while standing or dancing</strong>. Think handheld items that don't require utensils and satisfy hungry guests who've been celebrating for hours.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
                  Top 8 Late Night Wedding Food Ideas
                </h2>

                <div className="space-y-6 my-8">
                  {foodIdeas.map((idea, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <span className="bg-accent text-background w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        {idea.name}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        <strong className="text-foreground">Why it works:</strong> {idea.why}
                      </p>
                      <p className="text-sm text-accent flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        Best for: {idea.bestFor}
                      </p>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  When Should Late Night Wedding Food Be Served?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Serve late night food 2-3 hours after dinner, typically between 10 PM and midnight.</strong> This timing gives guests a boost of energy right when they need it most for dancing and celebrating.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  Why Use a Food Truck for Late Night Wedding Food?
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                  <li><strong className="text-foreground">Fresh, made-to-order food</strong> that's hot and delicious</li>
                  <li><strong className="text-foreground">Entertainment value</strong> – guests love watching their food made</li>
                  <li><strong className="text-foreground">Self-contained service</strong> – no extra plates or cleanup</li>
                  <li><strong className="text-foreground">Memorable experience</strong> guests will talk about for years</li>
                  <li><strong className="text-foreground">Cost-effective</strong> compared to adding another catering course</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  How Much Does Late Night Wedding Food Cost?
                </h2>
                <p className="text-muted-foreground mb-6">
                  <strong className="text-foreground">Late night wedding food typically costs $10-25 per person with a food truck.</strong> For a 100-guest wedding, budget $1,000-$2,500 for late night snacks. This is often less than adding a dessert course through your main caterer.
                </p>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-accent/10 rounded-xl border-2 border-accent/20 text-center">
                <h2 className="text-2xl font-bold mb-4">Add Late Night Food to Your Wedding</h2>
                <p className="text-muted-foreground mb-6">
                  Make your reception unforgettable with gourmet grilled cheese
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                    <a href="/#contact">Get Your Free Quote</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:8444745591" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call 844-474-5591
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <RelatedArticles currentSlug="late-night-wedding-food-ideas" category="Weddings" />

        <Footer />
      </div>
    </>
  );
};

export default LateNightWeddingFoodIdeas;
