import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PackagesSection = () => {
  const simpleMenuItems = [
    { name: "Just the Cheese", description: "Perfectly melted American cheese on thick-cut white bread" },
    { name: "Just The Mozz", description: "Creamy mozzarella grilled to gooey perfection" },
    { name: "Bacon American Classic", description: "Crispy bacon meets melted American cheese" },
    { name: "Just The Cheddar", description: "Sharp cheddar melted between buttery bread" },
    { name: "3 Cheese Please", description: "Triple-cheese blend for the ultimate melt" },
    { name: "The American Dream", description: "Our signature American cheese masterpiece" },
    { name: "Hot Pig Dog", description: "Premium hot dog with cheddar & crispy bacon" },
    { name: "Just The Dog", description: "Classic all-beef hot dog, grilled to perfection" },
    { name: "Just The Cheese Dog", description: "Hot dog topped with melted cheese" },
    { name: "Kids' Grilled Cheese", description: "Kid-sized classic, made with love" }
  ];

  const fullMenuFavorites = [
    { name: "The Grilly Cheese", description: "A double decker with three thick slices of white bread, buttered and grilled with American cheese, topped with crisp bacon", favorite: true },
    { name: "Just the Cheese", description: "Two hearty slices of white bread buttered and grilled with white American cheeses" },
    { name: "The Grilly Cheesesteak", description: "The real deal Philly cheesesteak beef cooked fresh under melted American cheeses loaded onto thick slices of white bread", favorite: true },
    { name: "The Margherita", description: "Sourdough bread filled with mozzarella cheese, tomatoes and basil, buttered and grilled" },
    { name: "Joel's 2nd Favorite", description: "Two pieces of white bread buttered and grilled with yellow cheddar cheese and slices of ham" },
    { name: "Just The Mozzarella", description: "Two thick & hearty slices of white bread, buttered & grilled with mozzarella cheese" },
    { name: "The Reuben Steiner", description: "Sauerkraut and Swiss cheese melted onto rye bread, topped with Russian dressing and thin-shaved corned beef slices" },
    { name: "The Canoe In the Pines", description: "American cheeses melted onto one fat slice of white bread, buttered and grilled, then folded into a canoe-shaped sandwich" },
    { name: "Chicken Pickin'", description: "Thin slices of white buffalo chicken breast meat on buttered and grilled sourdough bread with bacon, tomatoes, lettuce, American cheese & mayo" },
    { name: "The Cluck Norris", description: "Buffalo chicken on sourdough, loaded with mozzarella, a slice of tomato, hot sauce, Russian dressing and basil. Buttered & grilled to a perfect crisp", favorite: true },
    { name: "Bacon American Classic", description: "Two thick & hearty slices of white bread, loaded with crispy bacon, buttered and grilled with American cheese" },
    { name: "Just The Cheddar", description: "Two thick & hearty slices of white bread, buttered & grilled with cheddar cheeses" },
    { name: "Three Cheese Please", description: "3-cheese sandwich with cheddar, American, & mozzarella on thick & hearty slices of white bread, buttered and grilled to a crisp" },
    { name: "The Swiss Pig", description: "Two fat slices of white bread loaded with ham & Swiss cheese, topped off with mustard, then buttered and grilled to a crisp" },
    { name: "Chickens, Pigs, & American Ranchers", description: "Buffalo chicken loaded with bacon melted under American cheese on white bread, grilled and buttered, topped with ranch dressing" },
    { name: "The American Dream", description: "2x American cheeses loaded on top of thick-cut bacon strips, topped with fresh sliced tomatoes, then grilled between two big slices of white bread" },
    { name: "Grilled Caprese", description: "Two slices of white bread loaded with mozzarella cheese, fresh sliced tomatoes, basil and balsamic vinegar" },
    { name: "BLTMACD", description: "Two fat slices of white bread grilled in butter and loaded with bacon, lettuce, tomatoes and a bit of mayo, American cheese" },
    { name: "The Russian Around", description: "Russian dressing drizzled onto Philly cheesesteak meat under melted American cheeses, grilled onto huge slices of sourdough bread" },
    { name: "Pleasin' Vegan", description: "Dairy-free 'cheese' made in-house loaded on vegan, gluten-free bread. Grilled in olive oil or imitation butter" },
    { name: "Kids", description: "A smaller grilled cheese sandwich with white bread and American cheeses" }
  ];

  const breakfastItems = [
    { name: "Breakfast Sandwich", description: "Eggs, cheese, and your choice of bacon or sausage on grilled bread" },
    { name: "Morning Melt", description: "Scrambled eggs with melted cheese on buttered toast" }
  ];

  const sides = [
    "Hand-cut, Homemade Fries",
    "Hand-cut Cheese Fries",
    "Homemade Tomato Soup",
    "Homemade Kettle Chips (upon request)",
    "Side Salad (upon request)"
  ];

  const desserts = [
    { name: "Homemade Chocolate Chip Cookies", description: "Baked fresh, absolutely delish" },
    { name: "Mini Individual Pies", description: "Seasonal varieties including cherry, blueberry, peach, apple, and pecan" }
  ];

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Award-Winning Catering Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Handcrafted grilled cheese sandwiches, made fresh on-site with premium ingredients. Crispy, golden, and absolutely irresistible.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-accent font-bold">⭐️ 4.9/5</span>
              <span className="text-muted-foreground">from 500+ reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-accent font-bold">🏆 Top 6</span>
              <span className="text-muted-foreground">Grilled Cheese in Nation</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-accent font-bold">🎉 2,500+</span>
              <span className="text-muted-foreground">Events Catered</span>
            </div>
          </div>

          {/* Urgency Banner */}
          <div className="inline-block bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-accent/40">
            <p className="text-foreground font-semibold text-sm">
              🔥 Limited Spring/Summer Availability - Book 2 months ahead for best dates
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {/* Simple Menu */}
          <div className="bg-card rounded-xl shadow-warm border-2 border-border p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-foreground mb-2">The Simple Menu</h3>
              <p className="text-muted-foreground mb-3">
                Perfect for casual gatherings and events. Each guest enjoys a golden, buttery grilled cheese sandwich or premium hot dog, crispy hand-cut fries, and their choice of beverage.
              </p>
              <p className="text-sm text-accent font-semibold">
                ✓ Made fresh on-site • Hand-grilled to order • Unlimited seconds on sides & drinks
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {simpleMenuItems.map((item, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-foreground font-semibold">{item.name}</span>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 mb-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="text-accent">🍟</span> Every Guest Gets:
              </h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span><strong>Hand-cut, Homemade Fries</strong> - Crispy golden perfection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span><strong>Homemade Tomato Soup</strong> - Rich, savory, made daily (upon request)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span><strong>Premium Beverages</strong> - Coke, Diet Coke, Sprite, or Bottled Water</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3 italic">
                "Best food truck at our corporate event. Guests kept coming back for more!" - Sarah M., Target
              </p>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              asChild
            >
              <a 
                href="#contact"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'package_interest',
                      'package_type': 'Simple Menu'
                    });
                  }
                }}
              >
                Request Simple Menu Quote
              </a>
            </Button>
          </div>

          {/* Full Menu */}
          <div className="bg-card rounded-xl shadow-warm border-2 border-accent p-8 hover:shadow-xl transition-all hover:-translate-y-1 relative">
            <div className="absolute -top-4 right-8 bg-accent text-background px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              MOST POPULAR
            </div>
            
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-foreground mb-2">The Full Menu</h3>
              <p className="text-muted-foreground mb-3">
                Our signature premium experience featuring gourmet creations like The Grilly Cheese and The Cluck Norris. Choose up to 10 artisan sandwiches, all hot dogs, and every side. Each bite is handcrafted, grilled to golden-brown perfection, and loaded with premium ingredients.
              </p>
              <p className="text-sm text-accent font-semibold">
                ✓ Gourmet ingredients • Chef-crafted recipes • Perfect for weddings & corporate events
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-accent fill-accent" />
                Guest Favorites - Most Ordered:
              </h4>
              <div className="space-y-2">
                {fullMenuFavorites.filter(item => item.favorite).map((item, index) => (
                  <div key={index} className="bg-accent/10 border border-accent/20 rounded-lg p-4 hover:bg-accent/20 transition-colors">
                    <div className="font-bold text-foreground flex items-center gap-2">
                      {item.name}
                      <span className="text-xs bg-accent text-background px-2 py-1 rounded-full">TOP PICK</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">
                "The Grilly Cheese changed my life. I'm not exaggerating." - Mike R., Wedding Guest
              </p>
            </div>

            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-background" 
              size="lg"
              asChild
            >
              <a 
                href="#contact"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                      'event': 'package_interest',
                      'package_type': 'Full Menu'
                    });
                  }
                }}
              >
                Request Full Menu Quote
              </a>
            </Button>
          </div>
        </div>

        {/* Full Menu Details */}
        <div className="max-w-6xl mx-auto bg-card rounded-xl shadow-warm border-2 border-border p-8 mb-8">
          <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
            Explore Our Full Menu
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-4">🧀 All Sandwiches</h4>
              <div className="space-y-3">
                {fullMenuFavorites.slice(0, 8).map((item, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-0">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      {item.name}
                      {item.favorite && <Star className="h-4 w-4 text-accent fill-accent" />}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-foreground mb-4 opacity-0">More</h4>
              <div className="space-y-3">
                {fullMenuFavorites.slice(8, 16).map((item, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-0">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      {item.name}
                      {item.favorite && <Star className="h-4 w-4 text-accent fill-accent" />}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-foreground mb-4 opacity-0">Even More</h4>
              <div className="space-y-3 mb-6">
                {fullMenuFavorites.slice(16).map((item, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-0">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      {item.name}
                      {item.favorite && <Star className="h-4 w-4 text-accent fill-accent" />}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-bold text-foreground mb-4">🍳 Breakfast</h4>
              <div className="space-y-3">
                {breakfastItems.map((item, index) => (
                  <div key={index} className="border-b border-border pb-3 last:border-0">
                    <div className="font-semibold text-foreground">{item.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-4">Hot Dogs</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Hot Pig Dog - with cheddar cheese and crispy bacon</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">The Grilly Dog - with American cheese and sauerkraut</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Just The Cheese Dog</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Just The Dog</span>
                </div>
              </div>

              <h4 className="text-xl font-bold text-foreground mb-4">🍟 Sides</h4>
              <div className="space-y-2 mb-6">
                {sides.map((side, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{side}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-bold text-foreground mb-4">🥤 Beverages</h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Coke</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Diet Coke</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Sprite</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Water</span>
                </div>
              </div>

              <h4 className="text-xl font-bold text-foreground mb-4">Desserts</h4>
              <div className="space-y-3">
                {desserts.map((dessert, index) => (
                  <div key={index}>
                    <div className="font-semibold text-foreground">{dessert.name}</div>
                    <div className="text-sm text-muted-foreground">{dessert.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 text-center border-2 border-border shadow-sm">
            <div className="text-3xl mb-3">🌱</div>
            <h4 className="font-bold text-foreground mb-2">Dietary Options</h4>
            <p className="text-sm text-muted-foreground">
              Gluten-free and vegan options available for up to 10 people (more upon request)
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 text-center border-2 border-border shadow-sm">
            <div className="text-3xl mb-3">🎨</div>
            <h4 className="font-bold text-foreground mb-2">Fully Customizable</h4>
            <p className="text-sm text-muted-foreground">
              Both packages can be customized to fit your event's specific needs and preferences
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 text-center border-2 border-border shadow-sm">
            <div className="text-3xl mb-3">🍪</div>
            <h4 className="font-bold text-foreground mb-2">Add Desserts</h4>
            <p className="text-sm text-muted-foreground">
              Enhance your package with homemade cookies or seasonal mini pies
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center bg-card border-2 border-border rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-bold text-foreground mb-1">Licensed & Insured</h4>
            <p className="text-sm text-muted-foreground">Fully certified food truck with health department approval</p>
          </div>
          <div className="text-center bg-card border-2 border-border rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-bold text-foreground mb-1">Award-Winning</h4>
            <p className="text-sm text-muted-foreground">Top 6 Grilled Cheese in the Nation - GrubHub 2024</p>
          </div>
          <div className="text-center bg-card border-2 border-border rounded-lg p-6 shadow-sm">
            <div className="text-3xl mb-2">💯</div>
            <h4 className="font-bold text-foreground mb-1">100% Fresh</h4>
            <p className="text-sm text-muted-foreground">All ingredients sourced daily. No frozen food, ever.</p>
          </div>
        </div>

        <div className="mt-8 text-center bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-8 border-2 border-accent/20">
          <p className="text-lg text-foreground mb-4 font-semibold">
            🌟 Special Dietary Needs? We've Got You Covered!
          </p>
          <p className="text-muted-foreground mb-2">
            Gluten-free bread, vegan cheese alternatives, and dairy-free options available. We can accommodate any dietary restriction for your guests.
          </p>
          <p className="text-sm text-accent font-semibold">
            Call us to create a custom menu for your event →
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
