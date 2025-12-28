export interface Recipe {
  slug: string;
  name: string;
  description: string;
  subtitle: string;
  cookTime: string;
  prepTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: string;
  ingredients: string[];
  tips: string;
  image: string;
  popular: boolean;
  category: string;
  instructions: string[];
}

export const signatureRecipes: Recipe[] = [
  {
    slug: "the-original",
    name: "The Original",
    description: "A timeless favorite that elevated the classic grilled cheese to icon status. Perfect balance of creamy fresh mozzarella and sharp cheddar with the smoky richness of applewood bacon.",
    subtitle: "Mozzarella, Cheddar, Crispy Bacon on Sourdough",
    cookTime: "8-10 min",
    prepTime: "5 min",
    difficulty: "Easy",
    servings: "1",
    ingredients: [
      "2 slices thick-cut sourdough bread (3/4 inch)",
      "3 oz fresh mozzarella, thinly sliced",
      "2 oz sharp aged cheddar, thinly sliced",
      "2 slices applewood bacon, cooked crispy",
      "2 tbsp unsalted butter, softened",
      "Salt and pepper to taste"
    ],
    tips: "Slice cheese thinly for faster, more even melting. Medium heat is crucial—too high burns bread before cheese melts.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/1a98da95-0e1d-480c-ada0-26929895ec92.png",
    popular: true,
    category: "Classic",
    instructions: [
      "Cook bacon until crispy, then set aside on paper towels to drain.",
      "Slice mozzarella and cheddar into thin, even slices for optimal melting.",
      "Spread softened butter generously on the outside of each bread slice.",
      "On the unbuttered side of one slice, layer half the mozzarella, then cheddar, then bacon, then remaining cheeses.",
      "Top with the second bread slice, buttered side facing out.",
      "Heat a skillet over medium heat. Place sandwich and cook 4-5 minutes per side.",
      "Press gently with a spatula. Flip when golden brown and cheese begins melting.",
      "Remove when both sides are golden and cheese is fully melted. Let rest 1 minute before cutting."
    ]
  },
  {
    slug: "the-gourmet",
    name: "The Gourmet",
    description: "This sandwich transforms lunch into an event. Rich, buttery brie melts into velvety sweetness combined with sophisticated gruyere, while fig jam and delicate prosciutto add layers of complex flavor.",
    subtitle: "Brie, Gruyere, Fig Jam, Prosciutto on Artisan Bread",
    cookTime: "10-12 min",
    prepTime: "5 min",
    difficulty: "Medium",
    servings: "1",
    ingredients: [
      "2 slices (1/2 inch) artisan bread",
      "3 oz brie cheese, thinly sliced",
      "2 oz aged gruyere cheese, thinly sliced",
      "2 thin slices premium prosciutto",
      "1.5 tbsp fig jam",
      "1.5 tbsp salted butter, softened"
    ],
    tips: "Fig jam should be spread thinly—it's concentrated and sweet. Don't rush; medium-low heat ensures even melting.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3ad91353-1ba3-41a3-9c27-08b62587e8d8.png",
    popular: true,
    category: "Gourmet",
    instructions: [
      "Remove brie from refrigerator 15 minutes before cooking for easier slicing.",
      "Slice brie and gruyere into thin, even pieces.",
      "Spread butter on the outside of both bread slices.",
      "On the unbuttered side of one slice, spread a thin layer of fig jam.",
      "Layer brie, then prosciutto, then gruyere on top.",
      "Close with the second slice, buttered side out.",
      "Cook over medium-low heat for 5-6 minutes per side until golden.",
      "The lower heat ensures the brie melts fully without burning the bread."
    ]
  },
  {
    slug: "the-veggie",
    name: "The Veggie",
    description: "Proof that vegetarian doesn't mean compromising on flavor. Roasted peppers provide sweetness, sautéed mushrooms add umami depth, and fresh spinach brings earthiness.",
    subtitle: "Roasted Peppers, Spinach, Mushrooms, Mozzarella on Ciabatta",
    cookTime: "10-12 min",
    prepTime: "15 min",
    difficulty: "Medium",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) ciabatta bread",
      "6 oz fresh mozzarella, sliced",
      "1/2 cup roasted red bell peppers",
      "1 cup fresh spinach",
      "4 oz mushrooms, thinly sliced",
      "2 tbsp olive oil, divided",
      "1 clove garlic, minced",
      "8-10 fresh basil leaves",
      "1.5 tbsp unsalted butter"
    ],
    tips: "Vegetables must be cooked down and excess moisture removed. Pat peppers dry thoroughly.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/797bdbb5-192d-4bd1-80a0-91da3e54424a.png",
    popular: false,
    category: "Vegetarian",
    instructions: [
      "Sauté mushrooms in 1 tbsp olive oil over medium-high heat until golden and moisture evaporates, about 5 minutes.",
      "Add garlic and spinach, cook until wilted. Season with salt and pepper. Set aside to cool slightly.",
      "Pat roasted peppers dry with paper towels to remove excess moisture.",
      "Butter the outside of both bread slices.",
      "Layer half the mozzarella, then peppers, mushroom-spinach mixture, basil leaves, and remaining mozzarella.",
      "Close the sandwich and cook over medium heat for 5-6 minutes per side.",
      "Press gently to help the cheese melt and bind the vegetables.",
      "Serve immediately while the mozzarella is stretchy and melted."
    ]
  },
  {
    slug: "the-jalapeno-popper",
    name: "The Jalapeño Popper",
    description: "For those who love heat with cheese. Roasted jalapeños lose their raw bite and develop sweet, smoky undertones that pair beautifully with creamy richness and crispy bacon.",
    subtitle: "Roasted Jalapeños, Cream Cheese, Cheddar, Bacon",
    cookTime: "8-10 min",
    prepTime: "10 min",
    difficulty: "Medium",
    servings: "1",
    ingredients: [
      "2 slices thick-cut bread",
      "4 oz sharp cheddar cheese, sliced",
      "3 tbsp cream cheese, softened",
      "3-4 fresh jalapeños (roasted)",
      "3 slices bacon, cooked crispy",
      "1.5 tbsp unsalted butter, softened",
      "Optional: hot honey or sriracha"
    ],
    tips: "Roasting mellows heat while developing flavor. Cream cheese provides moisture and richness to balance heat.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8c3e82a1-8a35-4944-a82c-02db51598789.png",
    popular: true,
    category: "Spicy",
    instructions: [
      "Roast jalapeños under broiler or over open flame until charred, about 5 minutes. Let cool, then slice.",
      "Cook bacon until very crispy. Drain and set aside.",
      "Spread cream cheese on the inside of one bread slice.",
      "Butter the outside of both slices.",
      "Layer cheddar, roasted jalapeños, bacon, and more cheddar on the cream cheese side.",
      "Close and cook over medium heat for 4-5 minutes per side.",
      "Drizzle with hot honey after cooking if desired.",
      "Let rest 1 minute before cutting to let the cream cheese set slightly."
    ]
  },
  {
    slug: "the-fig-and-basil",
    name: "The Fig & Basil",
    description: "Sweet, elegant, and unexpectedly sophisticated. Fresh basil brings herbal brightness while hot honey adds a sophisticated spicy-sweet finish.",
    subtitle: "Brie, Fig Jam, Fresh Basil, Hot Honey, Sesame Seeds",
    cookTime: "7-9 min",
    prepTime: "5 min",
    difficulty: "Easy",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) sourdough bread",
      "4 oz brie cheese, sliced thinly",
      "1.5 tbsp fig jam",
      "8-10 fresh basil leaves",
      "1-2 tsp raw sesame seeds",
      "1.5 tbsp honey (or hot honey)",
      "1.5 tbsp unsalted butter, softened"
    ],
    tips: "Serve warm but not molten—flavors need to be distinguished. Quality fig jam makes huge difference.",
    image: "/src/assets/fig-basil-grilled-cheese.jpg",
    popular: false,
    category: "Seasonal",
    instructions: [
      "Let brie come to room temperature for easier slicing and faster melting.",
      "Butter the outside of both bread slices.",
      "Spread fig jam on the inside of one slice.",
      "Layer brie slices, then fresh basil leaves on top of the jam.",
      "Sprinkle sesame seeds over the basil.",
      "Close with second slice and cook over medium heat for 3-4 minutes per side.",
      "Remove from heat and immediately drizzle with honey.",
      "Cut and serve while still warm—the honey should glisten on top."
    ]
  },
  {
    slug: "the-avocado-dream",
    name: "The Avocado Dream",
    description: "Creamy meets sharp meets smoky. Perfectly ripe avocado provides luxurious richness while aged cheddar brings sharpness and smoked gouda adds depth.",
    subtitle: "Avocado, Cheddar, Gouda, Lime Zest on Artisan Bread",
    cookTime: "8-10 min",
    prepTime: "5 min",
    difficulty: "Medium",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) artisan bread",
      "1 perfectly ripe avocado",
      "2 oz sharp white cheddar, sliced",
      "2 oz smoked gouda, sliced",
      "1 lime (juiced and zested)",
      "2 tbsp mayonnaise"
    ],
    tips: "Avocado must be perfectly ripe—too firm is mealy, too soft falls apart. Lime juice prevents browning AND brightens flavor.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/52616bea-777b-49f3-a912-d02386bdbc1a.png",
    popular: false,
    category: "Classic",
    instructions: [
      "Halve the avocado and remove the pit. Slice into thin pieces.",
      "Toss avocado slices with lime juice and zest to prevent browning and add brightness.",
      "Spread mayonnaise on the outside of both bread slices (creates extra-crispy crust).",
      "Layer white cheddar, avocado slices, then smoked gouda on one slice.",
      "Season with a pinch of salt and pepper.",
      "Close and cook over medium heat for 4-5 minutes per side.",
      "Press very gently—you don't want to squish the avocado.",
      "Serve immediately while cheese is melted and avocado is still creamy."
    ]
  },
  {
    slug: "the-apple-brie",
    name: "The Apple Brie",
    description: "A sophisticated autumn celebration on bread. Sweet, crispy apples contrast beautifully against creamy brie and sharp aged cheddar.",
    subtitle: "Brie, Crisp Apples, Aged Cheddar, Hot Honey, Fresh Thyme",
    cookTime: "8-10 min",
    prepTime: "5 min",
    difficulty: "Medium",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) sourdough bread",
      "4 oz brie cheese, sliced thinly",
      "2 oz aged sharp cheddar, sliced",
      "1/2 honeycrisp apple, thinly sliced",
      "1 tsp fresh thyme leaves",
      "1 tsp hot honey",
      "1.5 tbsp unsalted butter, softened"
    ],
    tips: "Combination of two cheeses is crucial—brie for cream, cheddar for sharpness. Apple variety matters: honeycrisp for sweetness.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/9d9074ad-b9ad-46b4-b3bd-2b8631c710ee.png",
    popular: false,
    category: "Seasonal",
    instructions: [
      "Slice apple very thinly using a mandoline or sharp knife for even cooking.",
      "Butter the outside of both bread slices.",
      "Layer brie on one slice, then arrange apple slices in a single layer.",
      "Add cheddar on top of apples, then sprinkle with fresh thyme.",
      "Close the sandwich and cook over medium heat for 4-5 minutes per side.",
      "The apples will soften slightly while retaining some crunch.",
      "Drizzle with hot honey immediately after removing from heat.",
      "Let rest 1 minute, then cut and serve."
    ]
  },
  {
    slug: "the-caramelized-onion-and-rosemary",
    name: "The Caramelized Onion & Rosemary",
    description: "Caramelized onions are liquid gold. Combined with nuttiness of gruyere and sharpness of white cheddar, this tastes like something from a French bistro.",
    subtitle: "Gruyere, White Cheddar, Caramelized Onions, Fresh Rosemary",
    cookTime: "10-12 min",
    prepTime: "60 min",
    difficulty: "Hard",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) artisan bread",
      "2 oz gruyere cheese, sliced",
      "2 oz sharp white cheddar, sliced",
      "1/2 cup caramelized onions",
      "1 tsp fresh rosemary, chopped",
      "1.5 tbsp unsalted butter, softened",
      "1/2 tsp balsamic vinegar (optional)"
    ],
    tips: "Caramelizing onions takes 45 minutes to 1 hour—don't rush. Make onions in advance and store in refrigerator up to 1 week.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/f5fee0f2-1945-42f1-bcbe-751a1b4d6e3d.png",
    popular: false,
    category: "Gourmet",
    instructions: [
      "For caramelized onions: Slice 2 large onions thinly. Cook in butter over low heat for 45-60 minutes, stirring occasionally.",
      "Add a splash of balsamic vinegar at the end for depth. Let cool.",
      "Butter the outside of both bread slices.",
      "Layer gruyere on one slice, then spread caramelized onions evenly.",
      "Sprinkle fresh rosemary over the onions, then top with white cheddar.",
      "Close and cook over medium-low heat for 5-6 minutes per side.",
      "The slow cooking melts the gruyere into the sweet onions perfectly.",
      "Let rest 2 minutes before cutting—this sandwich is very rich."
    ]
  },
  {
    slug: "the-truffle-indulgence",
    name: "The Truffle Indulgence",
    description: "Luxury on a plate. Creamy fontina melts into velvety richness while burrata's creamy center takes it over the top. Truffle oil adds earthy depth.",
    subtitle: "Fontina, Burrata, Truffle Oil, Wild Arugula, Brioche",
    cookTime: "8-10 min",
    prepTime: "5 min",
    difficulty: "Hard",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) brioche or challah bread",
      "3 oz fontina cheese, sliced",
      "2 oz burrata cheese",
      "1 tbsp premium truffle oil",
      "Handful of wild arugula (1.5 oz)",
      "1.5 tbsp unsalted butter, softened"
    ],
    tips: "Brioche or challah is essential—regular bread undermines elegance. Truffle oil is potent—little goes a long way.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/3e9261b7-14e1-4c8e-9cee-fbdf261b89a6.png",
    popular: true,
    category: "Premium",
    instructions: [
      "Use room temperature burrata for easier handling and faster melting.",
      "Butter the outside of both brioche slices.",
      "Layer fontina on one slice, leaving space in the center.",
      "Place burrata in the center—it will spread when heated.",
      "Drizzle truffle oil over the cheeses.",
      "Cook over medium-low heat for 4-5 minutes per side. Brioche browns quickly.",
      "After cooking, open the sandwich and add fresh arugula.",
      "The residual heat will slightly wilt the arugula. Close and serve immediately."
    ]
  },
  {
    slug: "the-spicy-sweet-peach",
    name: "The Spicy Sweet Peach",
    description: "Summer perfection. Sweet, juicy peaches provide brightness. Smoked cheddar adds savory depth while hot honey brings sophisticated spice.",
    subtitle: "Fresh Peach, Smoked Cheddar, Fontina, Hot Honey, Arugula",
    cookTime: "8-10 min",
    prepTime: "5 min",
    difficulty: "Medium",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) sourdough bread",
      "2 medium fresh peaches, sliced",
      "2 oz smoked cheddar, sliced",
      "2 oz fontina cheese, sliced",
      "Handful of fresh arugula (1.5 oz)",
      "1-2 tsp hot honey",
      "1.5 tbsp unsalted butter, softened"
    ],
    tips: "Peaches must be perfectly ripe—underripe is mealy, overripe is mushy. Pat peaches dry to prevent sogginess.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/92062647-57f1-4015-8957-2650de982b11.png",
    popular: false,
    category: "Seasonal",
    instructions: [
      "Choose peaches that give slightly when pressed but aren't soft.",
      "Slice peaches and pat dry with paper towels to remove excess juice.",
      "Butter the outside of both bread slices.",
      "Layer fontina, then peach slices, then smoked cheddar.",
      "Cook over medium heat for 4-5 minutes per side.",
      "After cooking, open and add fresh arugula for peppery contrast.",
      "Drizzle with hot honey and close.",
      "Serve immediately—this sandwich is best while peaches are warm."
    ]
  },
  {
    slug: "the-bbq-bacon-and-cheddar",
    name: "The BBQ Bacon & Cheddar",
    description: "Comfort food perfection. Crispy bacon meets sharp cheddar's bite. Sweet and tangy BBQ sauce adds complexity. Caramelized onions provide umami depth.",
    subtitle: "Sharp Cheddar, Crispy Bacon, Caramelized Onions, BBQ Sauce",
    cookTime: "10-12 min",
    prepTime: "10 min",
    difficulty: "Medium",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) thick-cut artisan bread",
      "3 oz sharp aged cheddar, sliced",
      "4 slices bacon, cooked very crispy",
      "1/3 cup caramelized onions",
      "2 tbsp quality BBQ sauce",
      "1.5 tbsp unsalted butter, softened"
    ],
    tips: "BBQ sauce flavors vary—use one you love personally. Bacon must be crispy—floppy bacon gets lost.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/4251f341-3ca0-494d-92ba-363dd01915f0.png",
    popular: true,
    category: "Classic",
    instructions: [
      "Cook bacon until very crispy—it should shatter when bent.",
      "If making fresh caramelized onions, cook over low heat for 45 minutes.",
      "Butter the outside of both bread slices.",
      "Spread BBQ sauce on the inside of one slice.",
      "Layer half the cheddar, all the bacon, onions, then remaining cheddar.",
      "Cook over medium heat for 5-6 minutes per side.",
      "The BBQ sauce may caramelize slightly—this adds flavor.",
      "Let rest 1 minute before cutting to prevent fillings from sliding."
    ]
  },
  {
    slug: "the-crispy-cheddar-crust",
    name: "The Crispy Cheddar Crust",
    description: "Intentionally cook cheese on the bread exterior creating a crispy, salty crust. Inside, layers of melted sharp cheeses provide creamy richness.",
    subtitle: "Aged Cheddar, Sharp White Cheddar, Crispy Cheese Exterior",
    cookTime: "10-12 min",
    prepTime: "5 min",
    difficulty: "Hard",
    servings: "1",
    ingredients: [
      "2 slices (3/4 inch) thick-cut artisan bread",
      "3 oz aged sharp cheddar, sliced",
      "2 oz sharp white cheddar, sliced",
      "2 tbsp shredded sharp white cheddar (for exterior)",
      "2.5 tbsp unsalted butter, divided"
    ],
    tips: "This advanced technique requires confidence and practice. Skillet must be quite hot so cheese crisps rather than melts.",
    image: "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8d258c37-9939-400d-ac70-404508954a6d.png",
    popular: false,
    category: "Premium",
    instructions: [
      "Butter one side of each bread slice as usual.",
      "Assemble sandwich with sliced cheeses between the unbuttered sides.",
      "Heat skillet over medium-high heat—slightly hotter than normal.",
      "Add 1 tbsp butter to pan. When sizzling, add sandwich buttered-side down.",
      "Immediately sprinkle 1 tbsp shredded cheddar around the edges of the sandwich.",
      "Cook 3-4 minutes until the shredded cheese forms a crispy, lacy crust.",
      "Flip carefully, add remaining butter and shredded cheese, repeat on other side.",
      "The result should have a dramatic, crispy cheese 'skirt' on both sides."
    ]
  }
];

export const getRecipeBySlug = (slug: string): Recipe | undefined => {
  return signatureRecipes.find(recipe => recipe.slug === slug);
};

export const getRelatedRecipes = (currentSlug: string, limit: number = 3): Recipe[] => {
  const current = getRecipeBySlug(currentSlug);
  if (!current) return signatureRecipes.slice(0, limit);
  
  // Get recipes from same category first, then fill with popular ones
  const sameCategory = signatureRecipes.filter(
    r => r.slug !== currentSlug && r.category === current.category
  );
  const popular = signatureRecipes.filter(
    r => r.slug !== currentSlug && r.popular && r.category !== current.category
  );
  const others = signatureRecipes.filter(
    r => r.slug !== currentSlug && !r.popular && r.category !== current.category
  );
  
  return [...sameCategory, ...popular, ...others].slice(0, limit);
};
