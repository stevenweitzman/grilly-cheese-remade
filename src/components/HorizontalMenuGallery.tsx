import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalMenuGallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  const menuItems = [
    {
      name: "The Grilly Cheese",
      description: "A double decker with three thick slices of white bread, buttered and grilled with American cheese, topped with crisp bacon",
      ingredients: ["American Cheese", "Crispy Bacon", "White Bread", "Butter"],
      tags: ["Signature", "Most Popular"],
      imagePlaceholder: "🧀🥓"
    },
    {
      name: "The Cluck Norris",
      description: "Buffalo chicken on sourdough, loaded with mozzarella, tomato, hot sauce, Russian dressing and basil",
      ingredients: ["Buffalo Chicken", "Mozzarella", "Sourdough", "Hot Sauce"],
      tags: ["Spicy", "Fan Favorite"],
      imagePlaceholder: "🐔🌶️"
    },
    {
      name: "The Grilly Cheesesteak",
      description: "The real deal Philly cheesesteak beef cooked fresh under melted American cheeses loaded onto thick slices of white bread",
      ingredients: ["Philly Beef", "American Cheese", "White Bread", "Grilled Fresh"],
      tags: ["Signature", "Hearty"],
      imagePlaceholder: "🥩🧀"
    },
    {
      name: "The Margherita",
      description: "Sourdough bread filled with mozzarella cheese, tomatoes and basil, buttered and grilled",
      ingredients: ["Fresh Mozzarella", "Tomatoes", "Basil", "Sourdough"],
      tags: ["Vegetarian", "Light"],
      imagePlaceholder: "🍅🌿"
    },
    {
      name: "Pleasin' Vegan",
      description: "Dairy-free 'cheese' made in-house loaded on vegan, gluten-free bread",
      ingredients: ["House-Made Vegan Cheese", "GF Bread", "Plant-Based"],
      tags: ["Vegan", "Gluten-Free"],
      imagePlaceholder: "🌱💚"
    },
    {
      name: "Hand-Cut Fries",
      description: "Crispy golden fries, hand-cut daily and cooked to perfection",
      ingredients: ["Fresh Potatoes", "Sea Salt", "Hand-Cut"],
      tags: ["Side", "Classic"],
      imagePlaceholder: "🍟"
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-16 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Explore Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every item handcrafted, grilled fresh on-site, and made with premium ingredients
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border-2 border-border hover:border-accent hidden md:block"
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border-2 border-border hover:border-accent hidden md:block"
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </motion.button>

          {/* Scrollable Menu */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex-none w-80 snap-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  onClick={() => setSelectedItem(item)}
                  className="bg-card border-2 border-border rounded-xl overflow-hidden cursor-pointer h-full"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "hsl(var(--accent))",
                    boxShadow: "var(--shadow-warm)",
                    rotateY: 5,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="relative h-64 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center overflow-hidden"
                  >
                    <motion.span 
                      className="text-7xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.imagePlaceholder}
                    </motion.span>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
                      {item.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-accent/90 text-background">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.slice(0, 3).map((ingredient, i) => (
                        <span key={i} className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                          {ingredient}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">
                          +{item.ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                style={{ 
                  scaleX: scrollXProgress,
                  transformOrigin: "left"
                }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Scroll to explore more →
            </p>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-32 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center rounded-lg mb-4">
                <span className="text-6xl">{selectedItem.imagePlaceholder}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{selectedItem.name}</h3>
              <p className="text-muted-foreground mb-4">{selectedItem.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-foreground mb-2">Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients.map((ingredient: string, i: number) => (
                    <span key={i} className="text-sm bg-accent/10 px-3 py-1 rounded-full text-foreground border border-accent/20">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Fresh Promise:</strong> Made to order on-site at your event. We never pre-make our sandwiches—everything is grilled fresh when you order it.
                </p>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HorizontalMenuGallery;
