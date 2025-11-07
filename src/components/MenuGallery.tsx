import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const MenuGallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-muted/20">
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

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => setSelectedItem(item)}
              className="bg-card border-2 border-border rounded-xl overflow-hidden cursor-pointer group"
              whileHover={{ 
                scale: 1.02,
                borderColor: "hsl(var(--accent))",
                boxShadow: "var(--shadow-warm)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="relative h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-6xl"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.imagePlaceholder}
                </motion.span>
                <div className="absolute top-3 right-3 flex flex-wrap gap-2 justify-end">
                  {item.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-accent/90 text-background">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.ingredients.slice(0, 3).map((ingredient, i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {ingredient}
                    </span>
                  ))}
                  {item.ingredients.length > 3 && (
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      +{item.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            Click any item to see full ingredients and nutritional info
          </p>
        </motion.div>
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
    </section>
  );
};

export default MenuGallery;
