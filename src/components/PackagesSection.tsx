import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const PackagesSection = () => {
  const simpleMenuItems = [
    "Just the Cheese",
    "Just The Mozz",
    "Bacon American Classic",
    "Just The Cheddar",
    "3 Cheese Please",
    "The American Dream",
    "Hot Pig Dog",
    "Just The Dog",
    "Just The Cheese Dog",
    "Kids' Grilled Cheese"
  ];

  const fullMenuFavorites = [
    { name: "The Grilly Cheese", description: "A double decker with three thick slices of white bread, buttered and grilled with American cheese, topped with crisp bacon", favorite: true },
    { name: "The Grilly Cheesesteak", description: "The real deal Philly cheesesteak beef cooked fresh under melted American cheeses loaded onto thick slices of white bread", favorite: true },
    { name: "The Cluck Norris", description: "Buffalo chicken on sourdough, loaded with mozzarella, tomato, hot sauce, Russian dressing and basil", favorite: true },
    { name: "The Margherita", description: "Sourdough bread filled with mozzarella cheese, tomatoes and basil, buttered and grilled" },
    { name: "The Reuben Steiner", description: "Sauerkraut and Swiss cheese melted onto rye bread, topped with Russian dressing and thin-shaved corned beef" },
    { name: "Chicken Pickin'", description: "Thin slices of white buffalo chicken breast on sourdough with bacon, tomatoes, lettuce, American cheese & mayo" },
    { name: "The Swiss Pig", description: "Two fat slices of white bread loaded with ham & Swiss cheese, topped with mustard" },
    { name: "BLTMACD", description: "Two fat slices of white bread loaded with bacon, lettuce, tomatoes, mayo, and American cheese" },
    { name: "The Russian Around", description: "Russian dressing drizzled onto Philly cheesesteak meat under melted American cheeses on sourdough" },
    { name: "Pleasin' Vegan", description: "Dairy-free 'cheese' made in-house loaded on vegan, gluten-free bread" }
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
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Catering Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our Simple Menu or Full Menu packages, both featuring award-winning grilled cheese sandwiches, hot dogs, and fresh sides
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {/* Simple Menu */}
          <div className="bg-card rounded-xl shadow-warm border-2 border-border p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-foreground mb-2">The Simple Menu</h3>
              <p className="text-muted-foreground">
                Perfect for casual gatherings and events. Guests enjoy a gourmet grilled cheese sandwich or hot dog, a side, and a drink. Guests are welcome to revisit for a 2nd side and drink.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {simpleMenuItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 mb-6">
              <h4 className="font-semibold text-lg mb-3">Includes:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Hand-cut, Homemade Fries</li>
                <li>• Homemade Tomato Soup (upon request)</li>
                <li>• Choice of Coke, Diet Coke, Sprite, or Bottled Water</li>
              </ul>
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
              <p className="text-muted-foreground">
                Our premium package with access to our complete menu. Pick up to 10 sandwiches from our full menu, plus all hot dogs and sides. Perfect for weddings, corporate events, and special celebrations.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-accent fill-accent" />
                Customer Favorites:
              </h4>
              <div className="space-y-2">
                {fullMenuFavorites.filter(item => item.favorite).map((item, index) => (
                  <div key={index} className="bg-accent/10 rounded-lg p-3">
                    <div className="font-semibold text-foreground">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
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
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-foreground mb-4">Signature Sandwiches</h4>
              <div className="space-y-3">
                {fullMenuFavorites.map((item, index) => (
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

              <h4 className="text-xl font-bold text-foreground mb-4">Sides & Beverages</h4>
              <div className="space-y-2 mb-6">
                {sides.map((side, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{side}</span>
                  </div>
                ))}
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

        <div className="mt-12 text-center bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-8 border-2 border-accent/20">
          <p className="text-lg text-muted-foreground mb-4">
            <strong className="text-foreground">Fun Fact:</strong> The average American consumes roughly 30.6 lbs of cheese every year!
          </p>
          <p className="text-muted-foreground">
            We always offer gluten-free options and can accommodate dietary restrictions. Contact us to discuss your specific needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
