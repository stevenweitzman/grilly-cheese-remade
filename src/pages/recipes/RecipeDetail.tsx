import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Users, Flame, ChefHat, Phone, ArrowLeft, 
  CheckCircle2, Lightbulb, Star, Share2, Printer
} from "lucide-react";
import { getRecipeBySlug, getRelatedRecipes, Recipe } from "@/data/recipes";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default: return "bg-gray-100 text-gray-800";
  }
};

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? getRecipeBySlug(slug) : undefined;
  
  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  const relatedRecipes = getRelatedRecipes(slug!, 3);
  const canonicalUrl = `https://grillycheese.net/recipes/${recipe.slug}`;
  
  // Parse cook time for schema
  const cookMinutes = parseInt(recipe.cookTime.split('-')[1] || recipe.cookTime.replace(' min', ''));
  const prepMinutes = parseInt(recipe.prepTime.replace(' min', ''));
  const totalMinutes = cookMinutes + prepMinutes;

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "@id": canonicalUrl,
    "name": `${recipe.name} Grilled Cheese Recipe`,
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
    "prepTime": `PT${prepMinutes}M`,
    "cookTime": `PT${cookMinutes}M`,
    "totalTime": `PT${totalMinutes}M`,
    "recipeYield": `${recipe.servings} serving`,
    "recipeCategory": "Sandwich",
    "recipeCuisine": "American",
    "keywords": `grilled cheese recipe, ${recipe.name.toLowerCase()}, ${recipe.category.toLowerCase()}, gourmet sandwich, comfort food, ${recipe.subtitle.toLowerCase()}`,
    "recipeIngredient": recipe.ingredients,
    "recipeInstructions": recipe.instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": instruction
    })),
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
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://grillycheese.net"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Recipes",
        "item": "https://grillycheese.net/recipes"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": recipe.name,
        "item": canonicalUrl
      }
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recipe.name} Grilled Cheese Recipe`,
          text: recipe.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <>
      <SEOHead
        title={`${recipe.name} Grilled Cheese Recipe | Grilly Cheese`}
        description={`${recipe.description} Learn how to make this ${recipe.difficulty.toLowerCase()} ${recipe.category.toLowerCase()} grilled cheese in ${recipe.cookTime}. Full recipe with ingredients and step-by-step instructions.`}
        canonical={canonicalUrl}
        keywords={`${recipe.name.toLowerCase()} recipe, ${recipe.subtitle.toLowerCase()}, gourmet grilled cheese, ${recipe.category.toLowerCase()} sandwich recipe`}
        ogType="article"
        articlePublishedTime="2024-01-15"
        articleModifiedTime="2025-12-28"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(recipeSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen print:bg-white">
        <Navigation />
        
        {/* Breadcrumb */}
        <div className="pt-24 pb-4 bg-muted/30 print:hidden">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to="/recipes" className="hover:text-primary">Recipes</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{recipe.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-muted/30 print:py-4">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={`${recipe.name} grilled cheese sandwich`}
                  className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                {recipe.popular && (
                  <Badge className="absolute top-4 left-4 bg-accent text-background">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Fan Favorite
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="space-y-6">
                <Link 
                  to="/recipes" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary print:hidden"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all recipes
                </Link>

                <div>
                  <Badge className={`mb-3 ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.category}
                  </Badge>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
                    {recipe.name}
                  </h1>
                  <p className="text-lg text-accent font-medium">
                    {recipe.subtitle}
                  </p>
                </div>

                <p className="text-lg text-muted-foreground">
                  {recipe.description}
                </p>

                {/* Recipe Meta */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-2 shadow-sm">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Time</p>
                      <p className="font-semibold">{totalMinutes} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-2 shadow-sm">
                    <Flame className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="font-semibold">{recipe.difficulty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-2 shadow-sm">
                    <Users className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Servings</p>
                      <p className="font-semibold">{recipe.servings}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 print:hidden">
                  <Button onClick={handlePrint} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Recipe
                  </Button>
                  <Button onClick={handleShare} variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Content */}
        <section className="py-12 md:py-16 bg-background print:py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Ingredients */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 print:relative print:top-0">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <ChefHat className="h-5 w-5 text-accent" />
                      Ingredients
                    </h2>
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-foreground">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Instructions */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Instructions</h2>
                  <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-background font-bold flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <p className="text-foreground pt-1">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Pro Tips */}
                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-accent" />
                      Pro Tips from Grilly Cheese
                    </h3>
                    <p className="text-foreground">{recipe.tips}</p>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="bg-gradient-warm border-0 print:hidden">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Want Us to Make This For You?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Book Grilly Cheese for your next event and let our pros create the perfect {recipe.name} for your guests!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-accent hover:bg-accent/90 text-background" asChild>
                        <Link to="/#contact">Get a Free Quote</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <a href="tel:8444745591" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          844-474-5591
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Recipes */}
        <section className="py-12 md:py-16 bg-muted/30 print:hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedRecipes.map((related) => (
                <Link 
                  key={related.slug} 
                  to={`/recipes/${related.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                    <div className="relative">
                      <img
                        src={related.image}
                        alt={`${related.name} grilled cheese`}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                      <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
                        {related.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {related.subtitle}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {related.cookTime}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {related.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link to="/recipes">View All 12 Recipes</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        <StickyCTABar />
        <MobileStickyCTA />
      </div>
    </>
  );
};

export default RecipeDetail;
