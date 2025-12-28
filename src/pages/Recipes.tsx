import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, ChefHat, Clock, Users, Flame, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";

const Recipes = () => {
  const signatureRecipes = [
    {
      name: "The Grilly Cheese",
      description: "Our signature double-decker masterpiece with three thick slices of white bread, buttered and grilled with American cheese, topped with crisp bacon.",
      cookTime: "8-10 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["3 slices thick-cut white bread", "4 slices American cheese", "4 strips crispy bacon", "2 tbsp butter"],
      tips: "The secret is in the triple-layer technique. Butter both sides of the middle bread slice for maximum crispiness.",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop",
      popular: true,
      category: "Signature"
    },
    {
      name: "The Grilly Cheesesteak",
      description: "The real deal Philly cheesesteak beef cooked fresh under melted American cheeses loaded onto thick slices of white bread.",
      cookTime: "10-12 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices thick white bread", "4 oz ribeye steak, thinly sliced", "3 slices American cheese", "Butter for grilling"],
      tips: "Use thinly sliced ribeye and cook it quickly on high heat for authentic Philly flavor.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
      popular: true,
      category: "Signature"
    },
    {
      name: "The Cluck Norris",
      description: "Buffalo chicken on sourdough, loaded with mozzarella, a slice of tomato, hot sauce, Russian dressing and basil. Buttered & grilled to a perfect crisp.",
      cookTime: "10-12 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices sourdough bread", "4 oz buffalo chicken", "3 slices mozzarella", "1 slice tomato", "Hot sauce", "Russian dressing", "Fresh basil"],
      tips: "Don't skimp on the Russian dressing - it balances the heat from the buffalo sauce perfectly.",
      image: "https://images.unsplash.com/photo-1481070555726-e2fe8357571d?w=600&h=400&fit=crop",
      popular: true,
      category: "Signature"
    },
    {
      name: "Just The Cheese",
      description: "Two hearty slices of white bread buttered and grilled with white American cheese - pure comfort food perfection.",
      cookTime: "5-7 min",
      difficulty: "Easy",
      servings: "1",
      ingredients: ["2 slices thick white bread", "3 slices American cheese", "2 tbsp butter"],
      tips: "Low and slow is the key. Keep the heat medium-low to achieve that perfect golden crust without burning.",
      image: "https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=600&h=400&fit=crop",
      popular: false,
      category: "Classic"
    },
    {
      name: "The Margherita",
      description: "Sourdough bread filled with mozzarella cheese, fresh tomatoes and basil, buttered and grilled to Italian perfection.",
      cookTime: "7-9 min",
      difficulty: "Easy",
      servings: "1",
      ingredients: ["2 slices sourdough bread", "4 slices fresh mozzarella", "2 slices tomato", "Fresh basil leaves", "Balsamic glaze (optional)", "Butter"],
      tips: "Use room temperature tomatoes and pat them dry to prevent sogginess.",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
      popular: false,
      category: "Gourmet"
    },
    {
      name: "The Reuben Steiner",
      description: "Sauerkraut and Swiss cheese melted onto rye bread, topped with Russian dressing and thin-shaved corned beef slices.",
      cookTime: "8-10 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices rye bread", "4 oz corned beef, thinly sliced", "3 slices Swiss cheese", "1/4 cup sauerkraut, drained", "Russian dressing", "Butter"],
      tips: "Drain the sauerkraut well and warm the corned beef before assembling for best results.",
      image: "https://images.unsplash.com/photo-1485451456034-3f9391c6f769?w=600&h=400&fit=crop",
      popular: false,
      category: "Deli"
    },
    {
      name: "Three Cheese Please",
      description: "A 3-cheese blend of cheddar, American, and mozzarella on thick white bread, buttered and grilled to a crisp.",
      cookTime: "7-9 min",
      difficulty: "Easy",
      servings: "1",
      ingredients: ["2 slices thick white bread", "2 slices cheddar cheese", "2 slices American cheese", "2 slices mozzarella", "2 tbsp butter"],
      tips: "Layer the cheeses strategically - mozzarella in the middle for that perfect stretch.",
      image: "https://images.unsplash.com/photo-1539024549628-6bbee66a8495?w=600&h=400&fit=crop",
      popular: false,
      category: "Classic"
    },
    {
      name: "Pleasin' Vegan",
      description: "Dairy-free 'cheese' made in-house loaded on vegan, gluten-free bread. Grilled in olive oil or imitation butter.",
      cookTime: "7-9 min",
      difficulty: "Easy",
      servings: "1",
      ingredients: ["2 slices vegan gluten-free bread", "3 slices vegan cheese", "2 tbsp olive oil or vegan butter"],
      tips: "Vegan cheese melts differently - use a lid to help it melt through.",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop",
      popular: false,
      category: "Specialty"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <SEOHead
        title="Grilly Cheese Recipes | Gourmet Grilled Cheese Sandwich Recipes"
        description="Discover our award-winning grilled cheese recipes! Learn how to make The Grilly Cheese, Cluck Norris, and more signature sandwiches from NJ's top-rated food truck."
        canonical="https://grillycheese.net/recipes"
        keywords="grilled cheese recipes, gourmet grilled cheese, best grilled cheese recipe, comfort food recipes, food truck recipes"
      />
      <SEOSchema 
        type="service" 
        title="Grilly Cheese Recipes" 
        description="Award-winning grilled cheese recipes from NJ's top-rated food truck" 
        url="https://grillycheese.net/recipes" 
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Grilly Cheese Signature Recipes",
            "description": "Award-winning grilled cheese recipes from Grilly Cheese food truck",
            "numberOfItems": signatureRecipes.length,
            "itemListElement": signatureRecipes.map((recipe, index) => ({
              "@type": "Recipe",
              "position": index + 1,
              "name": recipe.name,
              "description": recipe.description,
              "cookTime": `PT${recipe.cookTime.replace("-", "").replace(" min", "M")}`,
              "recipeYield": recipe.servings,
              "recipeIngredient": recipe.ingredients,
              "author": {
                "@type": "Organization",
                "name": "Grilly Cheese"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500"
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
                Our Signature Grilled Cheese Recipes
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover the secrets behind our award-winning grilled cheese sandwiches. From classic comfort to gourmet creations, learn to make them at home!
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
                Our Most Popular Recipes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From our food truck to your kitchen - try making these crowd favorites at home!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {signatureRecipes.map((recipe, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-border">
                  <div className="relative">
                    <img 
                      src={recipe.image} 
                      alt={`${recipe.name} grilled cheese sandwich`}
                      className="w-full h-48 object-cover"
                      loading="lazy"
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
                    <CardTitle className="text-xl flex items-center justify-between">
                      {recipe.name}
                      <Badge className={getDifficultyColor(recipe.difficulty)}>
                        {recipe.difficulty}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
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

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Ingredients:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {recipe.ingredients.slice(0, 4).map((ingredient, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-accent">•</span>
                            {ingredient}
                          </li>
                        ))}
                        {recipe.ingredients.length > 4 && (
                          <li className="text-accent font-medium">+{recipe.ingredients.length - 4} more...</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3 text-xs">
                      <span className="font-semibold text-accent">Pro Tip:</span>{" "}
                      <span className="text-muted-foreground">{recipe.tips}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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