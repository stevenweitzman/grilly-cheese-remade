import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { SEOImageGallerySchema } from "@/components/SEOImageSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, ChefHat, Clock, Users, Flame, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import { signatureRecipes } from "@/data/recipes";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop";

const Recipes = () => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Image gallery for SEO
  const recipeImages = signatureRecipes.map(recipe => ({
    url: recipe.image.replace('w=600&h=400', 'w=1200&h=800'),
    width: 1200,
    height: 800,
    alt: `${recipe.name} grilled cheese sandwich`,
    caption: recipe.description,
    name: recipe.name
  }));

  return (
    <>
      <SEOHead
        title="Gourmet Grilled Cheese Recipes | 12 Premium Recipes from Grilly Cheese"
        description="Master 12 gourmet grilled cheese recipes from classic to premium. The Original, The Gourmet, The Truffle Indulgence, and more - complete with pro tips and ingredients."
        canonical="https://grillycheese.net/recipes"
        keywords="gourmet grilled cheese recipes, best grilled cheese recipe, artisan grilled cheese, brie grilled cheese, truffle grilled cheese, food truck recipes"
        ogImageWidth={1200}
        ogImageHeight={630}
      />
      <SEOSchema 
        type="service" 
        title="Grilly Cheese Recipes" 
        description="Award-winning grilled cheese recipes from NJ's top-rated food truck" 
        url="https://grillycheese.net/recipes" 
      />
      <SEOImageGallerySchema 
        images={recipeImages}
        name="Grilly Cheese Signature Recipe Gallery"
        description="Award-winning grilled cheese sandwich recipes from NJ's top-rated food truck"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Grilly Cheese Signature Recipes",
            "description": "Award-winning grilled cheese recipes from Grilly Cheese food truck",
            "url": "https://grillycheese.net/recipes",
            "numberOfItems": signatureRecipes.length,
            "itemListElement": signatureRecipes.map((recipe, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Recipe",
                "@id": `https://grillycheese.net/recipes#${recipe.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
                "name": `${recipe.name} Grilled Cheese`,
                "description": recipe.description,
                "image": [
                  recipe.image.startsWith('http') ? recipe.image : `https://grillycheese.net${recipe.image}`
                ],
                "author": {
                  "@type": "Organization",
                  "name": "Grilly Cheese",
                  "url": "https://grillycheese.net"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Grilly Cheese",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://grillycheese.net/assets/grilly-cheese-logo.png"
                  }
                },
                "datePublished": "2024-01-15",
                "dateModified": "2025-12-28",
                "prepTime": "PT5M",
                "cookTime": `PT${recipe.cookTime.split('-')[1]?.replace(' min', '') || recipe.cookTime.replace('-', '').replace(' min', '')}M`,
                "totalTime": `PT${parseInt(recipe.cookTime.split('-')[1] || recipe.cookTime.replace(' min', '')) + 5}M`,
                "recipeYield": `${recipe.servings} serving`,
                "recipeCategory": "Sandwich",
                "recipeCuisine": "American",
                "keywords": `grilled cheese, ${recipe.name.toLowerCase()}, ${recipe.category.toLowerCase()}, gourmet sandwich, comfort food`,
                "recipeIngredient": recipe.ingredients,
                "recipeInstructions": [
                  {
                    "@type": "HowToStep",
                    "name": "Prepare ingredients",
                    "text": `Gather all ingredients: ${recipe.ingredients.slice(0, 3).join(', ')}, and remaining items. Slice cheese thinly for even melting.`
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Butter the bread",
                    "text": "Spread softened butter evenly on the outside of each bread slice. This creates the golden, crispy exterior."
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Layer the fillings",
                    "text": `On the unbuttered side, layer the cheese and fillings. ${recipe.tips}`
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Cook to perfection",
                    "text": `Heat a skillet over medium heat. Cook for ${recipe.cookTime}, flipping halfway through, until bread is golden brown and cheese is melted.`
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Serve",
                    "text": "Let rest for 1 minute before cutting. Serve immediately while warm and gooey."
                  }
                ],
                "nutrition": {
                  "@type": "NutritionInformation",
                  "servingSize": "1 sandwich"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "ratingCount": "500",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "suitableForDiet": recipe.category === "Vegetarian" ? "https://schema.org/VegetarianDiet" : undefined
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-warm">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <ChefHat className="h-3 w-3 mr-1" />
                Award-Winning Recipes
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Premium Gourmet Grilled Cheese Recipes
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Elevating the classic comfort food to extraordinary heights. 12 artisan recipes from classic to premium - master the art of the perfect grilled cheese.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                  <Link to="/#contact">Book Us for Your Event</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:8444745591" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    844-474-5591
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-muted-foreground">from 500+ reviews</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">🏆</span>
                <span className="text-muted-foreground">Top 6 Grilled Cheese in America</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">🎉</span>
                <span className="font-semibold">2,500+</span>
                <span className="text-muted-foreground">Events Catered</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                12 Gourmet Recipes to Master
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From our food truck to your kitchen - classic, gourmet, seasonal, and premium creations to try at home!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {signatureRecipes.map((recipe, index) => (
                <Link 
                  key={index} 
                  to={`/recipes/${recipe.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-border h-full">
                    <div className="relative">
                      <img 
                        src={recipe.image.startsWith('/src') ? recipe.image.replace('/src', '') : recipe.image} 
                        alt={`${recipe.name} grilled cheese sandwich - ${recipe.description.slice(0, 50)}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        width={600}
                        height={400}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                      {recipe.popular && (
                        <Badge className="absolute top-3 right-3 bg-accent text-background">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Fan Favorite
                        </Badge>
                      )}
                      <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                        {recipe.category}
                      </Badge>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl flex items-center justify-between group-hover:text-accent transition-colors">
                        {recipe.name}
                        <Badge className={getDifficultyColor(recipe.difficulty)}>
                          {recipe.difficulty}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-xs text-accent font-medium mb-2 italic">
                        {recipe.subtitle}
                      </p>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {recipe.description}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {recipe.cookTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {recipe.servings} serving
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-4 w-4" />
                          Grilled
                        </span>
                      </div>

                      <div className="flex items-center text-accent text-sm font-medium group-hover:underline">
                        View Full Recipe
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <NewsletterSignup source="recipes" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want the Real Thing at Your Event?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Home recipes are great, but nothing beats fresh-off-the-grill from our food truck. Let us cater your next event!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
                <Link to="/#contact">Get a Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/#packages">View Catering Packages</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <StickyCTABar />
        <MobileStickyCTA />
        <FloatingQuoteButton />
      </div>
    </>
  );
};

export default Recipes;