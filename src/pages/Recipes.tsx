import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SEOSchema from "@/components/SEOSchema";
import { SEOImageGallerySchema } from "@/components/SEOImageSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, ChefHat, Clock, Users, Flame, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import StickyCTABar from "@/components/StickyCTABar";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import NewsletterSignup from "@/components/NewsletterSignup";
import figBasilImage from "@/assets/fig-basil-grilled-cheese.jpg";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop";

const Recipes = () => {
  const signatureRecipes = [
    {
      name: "The Original",
      description: "A timeless favorite that elevated the classic grilled cheese to icon status. Perfect balance of creamy fresh mozzarella and sharp cheddar with the smoky richness of applewood bacon.",
      subtitle: "Mozzarella, Cheddar, Crispy Bacon on Sourdough",
      cookTime: "8-10 min",
      difficulty: "Easy",
      servings: "1",
      ingredients: ["2 slices thick-cut sourdough bread (3/4 inch)", "3 oz fresh mozzarella, thinly sliced", "2 oz sharp aged cheddar, thinly sliced", "2 slices applewood bacon, cooked crispy", "2 tbsp unsalted butter, softened", "Salt and pepper to taste"],
      tips: "Slice cheese thinly for faster, more even melting. Medium heat is crucial—too high burns bread before cheese melts.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/1a98da95-0e1d-480c-ada0-26929895ec92.png",
      popular: true,
      category: "Classic"
    },
    {
      name: "The Gourmet",
      description: "This sandwich transforms lunch into an event. Rich, buttery brie melts into velvety sweetness combined with sophisticated gruyere, while fig jam and delicate prosciutto add layers of complex flavor.",
      subtitle: "Brie, Gruyere, Fig Jam, Prosciutto on Artisan Bread",
      cookTime: "10-12 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices (1/2 inch) artisan bread", "3 oz brie cheese, thinly sliced", "2 oz aged gruyere cheese, thinly sliced", "2 thin slices premium prosciutto", "1.5 tbsp fig jam", "1.5 tbsp salted butter, softened"],
      tips: "Fig jam should be spread thinly—it's concentrated and sweet. Don't rush; medium-low heat ensures even melting.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3ad91353-1ba3-41a3-9c27-08b62587e8d8.png",
      popular: true,
      category: "Gourmet"
    },
    {
      name: "The Veggie",
      description: "Proof that vegetarian doesn't mean compromising on flavor. Roasted peppers provide sweetness, sautéed mushrooms add umami depth, and fresh spinach brings earthiness.",
      subtitle: "Roasted Peppers, Spinach, Mushrooms, Mozzarella on Ciabatta",
      cookTime: "10-12 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) ciabatta bread", "6 oz fresh mozzarella, sliced", "1/2 cup roasted red bell peppers", "1 cup fresh spinach", "4 oz mushrooms, thinly sliced", "2 tbsp olive oil, divided", "1 clove garlic, minced", "8-10 fresh basil leaves", "1.5 tbsp unsalted butter"],
      tips: "Vegetables must be cooked down and excess moisture removed. Pat peppers dry thoroughly.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/797bdbb5-192d-4bd1-80a0-91da3e54424a.png",
      popular: false,
      category: "Vegetarian"
    },
    {
      name: "The Jalapeño Popper",
      description: "For those who love heat with cheese. Roasted jalapeños lose their raw bite and develop sweet, smoky undertones that pair beautifully with creamy richness and crispy bacon.",
      subtitle: "Roasted Jalapeños, Cream Cheese, Cheddar, Bacon",
      cookTime: "8-10 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices thick-cut bread", "4 oz sharp cheddar cheese, sliced", "3 tbsp cream cheese, softened", "3-4 fresh jalapeños (roasted)", "3 slices bacon, cooked crispy", "1.5 tbsp unsalted butter, softened", "Optional: hot honey or sriracha"],
      tips: "Roasting mellows heat while developing flavor. Cream cheese provides moisture and richness to balance heat.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8c3e82a1-8a35-4944-a82c-02db51598789.png",
      popular: true,
      category: "Spicy"
    },
    {
      name: "The Fig & Basil",
      description: "Sweet, elegant, and unexpectedly sophisticated. Fresh basil brings herbal brightness while hot honey adds a sophisticated spicy-sweet finish.",
      subtitle: "Brie, Fig Jam, Fresh Basil, Hot Honey, Sesame Seeds",
      cookTime: "7-9 min",
      difficulty: "Easy",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) sourdough bread", "4 oz brie cheese, sliced thinly", "1.5 tbsp fig jam", "8-10 fresh basil leaves", "1-2 tsp raw sesame seeds", "1.5 tbsp honey (or hot honey)", "1.5 tbsp unsalted butter, softened"],
      tips: "Serve warm but not molten—flavors need to be distinguished. Quality fig jam makes huge difference.",
      image: figBasilImage,
      popular: false,
      category: "Seasonal"
    },
    {
      name: "The Avocado Dream",
      description: "Creamy meets sharp meets smoky. Perfectly ripe avocado provides luxurious richness while aged cheddar brings sharpness and smoked gouda adds depth.",
      subtitle: "Avocado, Cheddar, Gouda, Lime Zest on Artisan Bread",
      cookTime: "8-10 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) artisan bread", "1 perfectly ripe avocado", "2 oz sharp white cheddar, sliced", "2 oz smoked gouda, sliced", "1 lime (juiced and zested)", "2 tbsp mayonnaise"],
      tips: "Avocado must be perfectly ripe—too firm is mealy, too soft falls apart. Lime juice prevents browning AND brightens flavor.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/52616bea-777b-49f3-a912-d02386bdbc1a.png",
      popular: false,
      category: "Classic"
    },
    {
      name: "The Apple Brie",
      description: "A sophisticated autumn celebration on bread. Sweet, crispy apples contrast beautifully against creamy brie and sharp aged cheddar.",
      subtitle: "Brie, Crisp Apples, Aged Cheddar, Hot Honey, Fresh Thyme",
      cookTime: "8-10 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) sourdough bread", "4 oz brie cheese, sliced thinly", "2 oz aged sharp cheddar, sliced", "1/2 honeycrisp apple, thinly sliced", "1 tsp fresh thyme leaves", "1 tsp hot honey", "1.5 tbsp unsalted butter, softened"],
      tips: "Combination of two cheeses is crucial—brie for cream, cheddar for sharpness. Apple variety matters: honeycrisp for sweetness.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/9d9074ad-b9ad-46b4-b3bd-2b8631c710ee.png",
      popular: false,
      category: "Seasonal"
    },
    {
      name: "The Caramelized Onion & Rosemary",
      description: "Caramelized onions are liquid gold. Combined with nuttiness of gruyere and sharpness of white cheddar, this tastes like something from a French bistro.",
      subtitle: "Gruyere, White Cheddar, Caramelized Onions, Fresh Rosemary",
      cookTime: "10-12 min",
      difficulty: "Hard",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) artisan bread", "2 oz gruyere cheese, sliced", "2 oz sharp white cheddar, sliced", "1/2 cup caramelized onions", "1 tsp fresh rosemary, chopped", "1.5 tbsp unsalted butter, softened", "1/2 tsp balsamic vinegar (optional)"],
      tips: "Caramelizing onions takes 45 minutes to 1 hour—don't rush. Make onions in advance and store in refrigerator up to 1 week.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/f5fee0f2-1945-42f1-bcbe-751a1b4d6e3d.png",
      popular: false,
      category: "Gourmet"
    },
    {
      name: "The Truffle Indulgence",
      description: "Luxury on a plate. Creamy fontina melts into velvety richness while burrata's creamy center takes it over the top. Truffle oil adds earthy depth.",
      subtitle: "Fontina, Burrata, Truffle Oil, Wild Arugula, Brioche",
      cookTime: "8-10 min",
      difficulty: "Hard",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) brioche or challah bread", "3 oz fontina cheese, sliced", "2 oz burrata cheese", "1 tbsp premium truffle oil", "Handful of wild arugula (1.5 oz)", "1.5 tbsp unsalted butter, softened"],
      tips: "Brioche or challah is essential—regular bread undermines elegance. Truffle oil is potent—little goes a long way.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3e9261b7-14e1-4c8e-9cee-fbdf261b89a6.png",
      popular: true,
      category: "Premium"
    },
    {
      name: "The Spicy Sweet Peach",
      description: "Summer perfection. Sweet, juicy peaches provide brightness. Smoked cheddar adds savory depth while hot honey brings sophisticated spice.",
      subtitle: "Fresh Peach, Smoked Cheddar, Fontina, Hot Honey, Arugula",
      cookTime: "8-10 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) sourdough bread", "2 medium fresh peaches, sliced", "2 oz smoked cheddar, sliced", "2 oz fontina cheese, sliced", "Handful of fresh arugula (1.5 oz)", "1-2 tsp hot honey", "1.5 tbsp unsalted butter, softened"],
      tips: "Peaches must be perfectly ripe—underripe is mealy, overripe is mushy. Pat peaches dry to prevent sogginess.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/92062647-57f1-4015-8957-2650de982b11.png",
      popular: false,
      category: "Seasonal"
    },
    {
      name: "The BBQ Bacon & Cheddar",
      description: "Comfort food perfection. Crispy bacon meets sharp cheddar's bite. Sweet and tangy BBQ sauce adds complexity. Caramelized onions provide umami depth.",
      subtitle: "Sharp Cheddar, Crispy Bacon, Caramelized Onions, BBQ Sauce",
      cookTime: "10-12 min",
      difficulty: "Medium",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) thick-cut artisan bread", "3 oz sharp aged cheddar, sliced", "4 slices bacon, cooked very crispy", "1/3 cup caramelized onions", "2 tbsp quality BBQ sauce", "1.5 tbsp unsalted butter, softened"],
      tips: "BBQ sauce flavors vary—use one you love personally. Bacon must be crispy—floppy bacon gets lost.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/4251f341-3ca0-494d-92ba-363dd01915f0.png",
      popular: true,
      category: "Classic"
    },
    {
      name: "The Crispy Cheddar Crust",
      description: "Intentionally cook cheese on the bread exterior creating a crispy, salty crust. Inside, layers of melted sharp cheeses provide creamy richness.",
      subtitle: "Aged Cheddar, Sharp White Cheddar, Crispy Cheese Exterior",
      cookTime: "10-12 min",
      difficulty: "Hard",
      servings: "1",
      ingredients: ["2 slices (3/4 inch) thick-cut artisan bread", "3 oz aged sharp cheddar, sliced", "2 oz sharp white cheddar, sliced", "2 tbsp shredded sharp white cheddar (for exterior)", "2.5 tbsp unsalted butter, divided"],
      tips: "This advanced technique requires confidence and practice. Skillet must be quite hot so cheese crisps rather than melts.",
      image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8d258c37-9939-400d-ac70-404508954a6d.png",
      popular: false,
      category: "Premium"
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
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-border">
                  <div className="relative">
                    <img 
                      src={recipe.image} 
                      alt={`${recipe.name} grilled cheese sandwich - ${recipe.description.slice(0, 50)}`}
                      className="w-full h-48 object-cover"
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
                    <CardTitle className="text-xl flex items-center justify-between">
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