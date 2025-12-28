import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import BlogArticleSchema from "@/components/blog/BlogArticleSchema";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Calendar, Clock, ChefHat, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import QuickAnswerBox from "@/components/blog/QuickAnswerBox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SignatureGrilledCheeseSandwiches = () => {
  const signatures = [
    {
      name: "The Grilly Cheese",
      description: "Our namesake double-decker with three thick slices of white bread, buttered and grilled with American cheese, topped with crisp bacon.",
      whyItsSpecial: "The triple-layer design means double the cheese, double the crunch, and perfectly crispy bacon in every bite.",
      pairsWith: "Tomato soup, hand-cut fries",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop"
    },
    {
      name: "The Grilly Cheesesteak",
      description: "Real deal Philly cheesesteak beef cooked fresh under melted American cheese on thick white bread.",
      whyItsSpecial: "We use thinly sliced ribeye cooked to order, giving you authentic Philly flavor in grilled cheese form.",
      pairsWith: "Cheese fries, pickles",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop"
    },
    {
      name: "The Cluck Norris",
      description: "Buffalo chicken on sourdough with mozzarella, tomato, hot sauce, Russian dressing, and basil.",
      whyItsSpecial: "Named for its kick! The Russian dressing perfectly balances the buffalo heat while the basil adds freshness.",
      pairsWith: "Ranch dipping sauce, celery sticks",
      image: "https://images.unsplash.com/photo-1481070555726-e2fe8357571d?w=600&h=400&fit=crop"
    },
    {
      name: "The Reuben Steiner",
      description: "Sauerkraut and Swiss on rye bread with Russian dressing and thin-shaved corned beef.",
      whyItsSpecial: "A grilled cheese twist on the classic deli Reuben - tangy, savory, and satisfying.",
      pairsWith: "Pickle spear, kettle chips",
      image: "https://images.unsplash.com/photo-1485451456034-3f9391c6f769?w=600&h=400&fit=crop"
    },
    {
      name: "The Margherita",
      description: "Sourdough with mozzarella, fresh tomatoes, and basil - Italian-inspired perfection.",
      whyItsSpecial: "Simple ingredients done right. We use fresh mozzarella and basil for authentic Italian flavor.",
      pairsWith: "Balsamic glaze, side salad",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop"
    }
  ];

  return (
    <>
      <SEOHead
        title="5 Signature Grilled Cheese Sandwiches You Need to Try | Grilly Cheese"
        description="Discover the award-winning signature grilled cheese sandwiches from NJ's top-rated food truck. From The Grilly Cheese to The Cluck Norris - find your new favorite!"
        canonical="https://grillycheese.net/blog/signature-grilled-cheese-sandwiches"
        keywords="signature grilled cheese, best grilled cheese sandwiches, gourmet grilled cheese, food truck menu, grilly cheese menu"
        ogType="article"
        articlePublishedTime="2025-12-28T10:00:00Z"
        articleModifiedTime="2025-12-28T10:00:00Z"
      />
      <SEOSchema type="blog" title="Signature Grilled Cheese Sandwiches" description="Award-winning signature grilled cheese sandwiches" url="https://grillycheese.net/blog/signature-grilled-cheese-sandwiches" />

      <BlogArticleSchema
        headline="5 Signature Grilled Cheese Sandwiches You Need to Try"
        description="Discover the award-winning signature grilled cheese sandwiches from NJ's top-rated food truck."
        datePublished="2025-12-28"
        dateModified="2025-12-28"
        url="https://grillycheese.net/blog/signature-grilled-cheese-sandwiches"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Grilly Cheese Signature Sandwiches",
            "description": "Award-winning signature grilled cheese sandwiches",
            "numberOfItems": signatures.length,
            "itemListElement": signatures.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "description": item.description
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        <article className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>

              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <ChefHat className="h-5 w-5 text-accent" />
                  <span className="text-accent font-semibold">Menu Guide</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  5 Signature Grilled Cheese Sandwiches You Need to Try
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    December 28, 2025
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    6 min read
                  </span>
                </div>
              </header>

              <div className="mb-10 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&h=600&fit=crop" 
                  alt="Assortment of gourmet grilled cheese sandwiches"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="eager"
                />
              </div>

              <QuickAnswerBox 
                answer="Our 5 most popular signatures: The Grilly Cheese (double-decker with bacon), The Grilly Cheesesteak (Philly-style), The Cluck Norris (buffalo chicken), The Reuben Steiner (corned beef on rye), and The Margherita (Italian-inspired). All made fresh on our food truck with premium ingredients!"
              />

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-8">
                  We've served over 2,500 events across New Jersey, Pennsylvania, and New York. Here are the sandwiches that keep our customers coming back – and the stories behind each one.
                </p>

                {signatures.map((sandwich, index) => (
                  <Card key={index} className="mb-8 overflow-hidden border-2 border-border">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img 
                          src={sandwich.image} 
                          alt={`${sandwich.name} grilled cheese sandwich`}
                          className="w-full h-48 md:h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="md:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-2xl font-bold text-foreground">{sandwich.name}</h2>
                          {index === 0 && (
                            <Badge className="bg-accent text-background">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              #1 Seller
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">{sandwich.description}</p>
                        
                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <h3 className="font-semibold text-foreground mb-1">Why It's Special:</h3>
                          <p className="text-sm text-muted-foreground">{sandwich.whyItsSpecial}</p>
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-semibold text-accent">Pairs well with:</span>{" "}
                          <span className="text-muted-foreground">{sandwich.pairsWith}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  The Full Menu Experience
                </h2>
                <p className="text-muted-foreground mb-6">
                  Beyond our signatures, we offer a full menu of over 20 grilled cheese creations, plus hand-cut fries, homemade tomato soup, and fresh desserts. Our <Link to="/#packages" className="text-accent hover:underline">Full Menu package</Link> lets your guests choose from up to 10 sandwiches for the ultimate grilled cheese experience.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
                  Dietary Options Available
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                  <li><strong className="text-foreground">Gluten-free bread:</strong> Available for any sandwich (up to 10 guests standard)</li>
                  <li><strong className="text-foreground">Vegan cheese:</strong> Made in-house, available on request</li>
                  <li><strong className="text-foreground">Vegetarian options:</strong> Many sandwiches are meat-free or can be customized</li>
                </ul>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 bg-accent/10 rounded-xl border-2 border-accent/20 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Try Our Signatures?</h2>
                <p className="text-muted-foreground mb-6">
                  Book Grilly Cheese for your next event and let your guests experience these award-winning sandwiches!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                    <Link to="/#contact">Get a Free Quote</Link>
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

        <RelatedArticles currentSlug="signature-grilled-cheese-sandwiches" category="Recipes" />

        <Footer />
      </div>
    </>
  );
};

export default SignatureGrilledCheeseSandwiches;