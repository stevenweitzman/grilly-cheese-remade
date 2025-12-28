// Encyclopedia Data - Complete Grilled Cheese Encyclopedia Content

export interface CheeseInfo {
  name: string;
  category: string;
  meltingProperties: string;
  flavor: string;
  bestUses: string;
}

export interface BreadInfo {
  name: string;
  characteristics: string;
  bestPairings: string;
  thickness: string;
}

export interface SandwichInfo {
  name: string;
  origin: string;
  flag: string;
  description: string;
  keyIngredients: string[];
  image?: string;
}

export interface CookingMethod {
  name: string;
  icon: string;
  description: string;
  steps: string[];
  tips: string[];
  temperature?: string;
  time?: string;
}

export interface IngredientCategory {
  category: string;
  items: { name: string; description?: string }[];
  maxSelections?: number;
}

export interface EncyclopediaSection {
  id: string;
  title: string;
  icon: string;
}

export const encyclopediaSections: EncyclopediaSection[] = [
  { id: "introduction", title: "Introduction", icon: "BookOpen" },
  { id: "history", title: "History & Origins", icon: "History" },
  { id: "american-classic", title: "American Classic", icon: "Flag" },
  { id: "regional", title: "Regional Sandwiches", icon: "MapPin" },
  { id: "gourmet", title: "Gourmet Variations", icon: "Sparkles" },
  { id: "cheese-guide", title: "Cheese Guide", icon: "Circle" },
  { id: "bread-guide", title: "Bread Guide", icon: "Wheat" },
  { id: "cooking-methods", title: "Cooking Methods", icon: "Flame" },
  { id: "ingredient-matrix", title: "Ingredient Matrix", icon: "Grid3X3" },
  { id: "international", title: "International Sandwiches", icon: "Globe" },
  { id: "build-your-own", title: "Build Your Own", icon: "ChefHat" },
];

export const cheeseGuideData: CheeseInfo[] = [
  { name: "American Cheese", category: "Processed", meltingProperties: "Melts uniformly, very creamy", flavor: "Mild, buttery", bestUses: "Classic grilled cheese, kid-friendly" },
  { name: "Gruyère", category: "Alpine", meltingProperties: "Excellent melt, slightly oily", flavor: "Nutty, sweet, complex", bestUses: "Croque Monsieur, gourmet versions" },
  { name: "Emmental/Swiss", category: "Alpine", meltingProperties: "Good melt, forms strings", flavor: "Mild, slightly sweet, nutty", bestUses: "Patty melt, classic combos" },
  { name: "Sharp Cheddar", category: "Cheddar", meltingProperties: "Good melt when young, can become oily", flavor: "Sharp, tangy, bold", bestUses: "Classic American, hearty sandwiches" },
  { name: "White Cheddar", category: "Cheddar", meltingProperties: "Smooth melt", flavor: "Milder than sharp, creamy", bestUses: "Versatile, pairs with fruit" },
  { name: "Fontina", category: "Alpine", meltingProperties: "Excellent, very smooth", flavor: "Earthy, slightly mushroomy", bestUses: "Italian-style, vegetables" },
  { name: "Mozzarella", category: "Fresh", meltingProperties: "Very stretchy, gooey", flavor: "Mild, milky", bestUses: "Mozzarella in Carrozza, combo" },
  { name: "Brie", category: "Soft", meltingProperties: "Melts quickly, very creamy", flavor: "Buttery, earthy", bestUses: "Luxury versions, fruit pairings" },
  { name: "Goat Cheese", category: "Soft", meltingProperties: "Softens, doesn't fully melt", flavor: "Tangy, fresh", bestUses: "Mediterranean, vegetable-forward" },
  { name: "Smoked Gouda", category: "Smoked", meltingProperties: "Excellent, creamy melt", flavor: "Smoky, rich", bestUses: "Bacon combos, bold flavors" },
  { name: "Provolone", category: "Italian", meltingProperties: "Good melt, slightly stringy", flavor: "Mild to sharp depending on age", bestUses: "Italian sandwiches, meats" },
  { name: "Blue Cheese", category: "Aged", meltingProperties: "Softens, pungent when heated", flavor: "Strong, salty, pungent", bestUses: "Small amounts, with sweet elements" },
  { name: "Parmesan", category: "Aged", meltingProperties: "Doesn't melt smoothly, crisps", flavor: "Sharp, umami, salty", bestUses: "Topping for golden crust" },
  { name: "Comté", category: "Alpine", meltingProperties: "Excellent, smooth", flavor: "Fruity, slightly sweet", bestUses: "French-style, Croque Monsieur" },
];

export const breadGuideData: BreadInfo[] = [
  { name: "Classic White", characteristics: "Soft, fine crumb, uniform slices", bestPairings: "American cheese, classic style", thickness: "Standard (½–¾ inch)" },
  { name: "Sourdough", characteristics: "Tangy, chewy, sturdy crust", bestPairings: "Gruyère, aged cheddar, gourmet", thickness: "Medium to thick" },
  { name: "Brioche", characteristics: "Rich, buttery, slightly sweet", bestPairings: "Brie, delicate cheeses, fruit", thickness: "Medium (¾ inch)" },
  { name: "Challah", characteristics: "Slightly sweet, eggy, golden", bestPairings: "Monte Cristo, sweet-savory", thickness: "Thick (1 inch)" },
  { name: "Ciabatta", characteristics: "Airy, chewy, excellent crust", bestPairings: "Mediterranean, Italian cheeses", thickness: "Split horizontally" },
  { name: "Rye Bread", characteristics: "Dense, distinctive flavor", bestPairings: "Patty melt, Swiss, caramelized onions", thickness: "Standard to thick" },
  { name: "Country/Artisan", characteristics: "Hearty, structured, rustic", bestPairings: "Multiple cheeses, premium fillings", thickness: "Thick (1–1.5 inch)" },
  { name: "Multigrain", characteristics: "Nutty, dense, nutritious", bestPairings: "Sharp cheddar, vegetables", thickness: "Standard" },
  { name: "Olive Bread", characteristics: "Mediterranean, olive-studded", bestPairings: "Goat cheese, feta, tomatoes", thickness: "Medium" },
  { name: "Focaccia", characteristics: "Flat, oily, herbed", bestPairings: "Italian cheeses, prosciutto", thickness: "Split horizontally" },
];

export const regionalSandwiches: SandwichInfo[] = [
  { 
    name: "Croque Monsieur", 
    origin: "France", 
    flag: "🇫🇷",
    description: "The king of gourmet grilled cheese. Gruyère and ham with creamy béchamel sauce, topped with more cheese and broiled until golden.",
    keyIngredients: ["Gruyère cheese", "Smoked ham", "Béchamel sauce", "Dijon mustard", "Parmesan"]
  },
  { 
    name: "Croque Madame", 
    origin: "France", 
    flag: "🇫🇷",
    description: "Same as Croque Monsieur but crowned with a perfectly fried egg on top for extra decadence.",
    keyIngredients: ["Gruyère cheese", "Ham", "Béchamel sauce", "Fried egg", "Butter"]
  },
  { 
    name: "Cheese Toastie", 
    origin: "United Kingdom", 
    flag: "🇬🇧",
    description: "British comfort food classic, often made in a toastie maker with cheddar and optional fillings like ham or chutney.",
    keyIngredients: ["Cheddar cheese", "Butter", "White bread", "Optional: Ham, tomato, chutney"]
  },
  { 
    name: "Mozzarella in Carrozza", 
    origin: "Italy", 
    flag: "🇮🇹",
    description: "Translation: 'Mozzarella in a Carriage.' Fresh mozzarella between bread, breaded and deep-fried to golden perfection.",
    keyIngredients: ["Fresh mozzarella", "White bread", "Egg", "Breadcrumbs", "Marinara sauce"]
  },
  { 
    name: "Quesadilla", 
    origin: "Mexico", 
    flag: "🇲🇽",
    description: "Melted cheese in a tortilla, griddled until crispy. Often includes meat, beans, or vegetables.",
    keyIngredients: ["Oaxaca or Chihuahua cheese", "Flour tortilla", "Salsa", "Sour cream"]
  },
  { 
    name: "Patty Melt", 
    origin: "United States", 
    flag: "🇺🇸",
    description: "A diner classic: ground beef patty with melted Swiss and caramelized onions on rye bread.",
    keyIngredients: ["Ground beef patty", "Swiss cheese", "Caramelized onions", "Rye bread"]
  },
  { 
    name: "Tuna Melt", 
    origin: "United States", 
    flag: "🇺🇸",
    description: "Creamy tuna salad with melted cheese, often served open-faced and broiled.",
    keyIngredients: ["Tuna salad", "Swiss or cheddar cheese", "Sourdough or rye bread"]
  },
  { 
    name: "Monte Cristo", 
    origin: "United States", 
    flag: "🇺🇸",
    description: "A decadent battered and fried sandwich with ham, turkey, and Swiss cheese, dusted with powdered sugar.",
    keyIngredients: ["Ham", "Turkey", "Swiss cheese", "Egg batter", "Powdered sugar", "Jam"]
  },
];

export const internationalSandwiches: SandwichInfo[] = [
  {
    name: "Francesinha",
    origin: "Portugal",
    flag: "🇵🇹",
    description: "The ultimate indulgence: meat and egg sandwich smothered in melted cheese and beer-tomato gravy, served on fries.",
    keyIngredients: ["Steak", "Sausage", "Ham", "Cheese sauce", "Beer-tomato sauce", "Fried egg"]
  },
  {
    name: "Khachapuri",
    origin: "Georgia",
    flag: "🇬🇪",
    description: "Boat-shaped bread filled with molten cheese and topped with a raw egg yolk that cooks in the residual heat.",
    keyIngredients: ["Suluguni cheese", "Feta", "Egg yolk", "Butter", "Bread dough"]
  },
  {
    name: "Zapiekanka",
    origin: "Poland",
    flag: "🇵🇱",
    description: "Open-faced baguette with mushrooms and cheese, a beloved Polish street food topped with ketchup.",
    keyIngredients: ["Baguette", "Mushrooms", "Cheese", "Onions", "Ketchup"]
  },
  {
    name: "Cheese Pide",
    origin: "Turkey",
    flag: "🇹🇷",
    description: "Turkish boat-shaped flatbread filled with stretchy melted cheese, similar to pizza.",
    keyIngredients: ["Mozzarella", "Feta", "Kasseri cheese", "Butter", "Pide dough"]
  },
  {
    name: "Paneer Pakora Sandwich",
    origin: "India",
    flag: "🇮🇳",
    description: "Spiced paneer cubes battered and fried between bread with chutneys.",
    keyIngredients: ["Paneer", "Gram flour batter", "Spices", "Bread", "Green chutney", "Tamarind chutney"]
  },
  {
    name: "Arepa de Queso",
    origin: "Venezuela/Colombia",
    flag: "🇻🇪",
    description: "Cornmeal flatbread stuffed with melted cheese, a staple breakfast item.",
    keyIngredients: ["Masarepa", "Queso de mano", "Butter", "Salt"]
  },
  {
    name: "Cheese Manakish",
    origin: "Lebanon",
    flag: "🇱🇧",
    description: "Flatbread topped with melted cheese and herbs like za'atar, baked in traditional ovens.",
    keyIngredients: ["Akkawi cheese", "Za'atar", "Olive oil", "Flatbread dough"]
  },
  {
    name: "Saganaki",
    origin: "Greece",
    flag: "🇬🇷",
    description: "Pan-fried kefalotyri cheese with a crispy exterior, served with crusty bread and lemon.",
    keyIngredients: ["Kefalotyri or Kasseri cheese", "Flour", "Olive oil", "Lemon", "Bread"]
  },
  {
    name: "Käse-Toast",
    origin: "Germany",
    flag: "🇩🇪",
    description: "Open-faced cheese toast, often broiled with ham and topped with paprika.",
    keyIngredients: ["Emmental cheese", "Toast bread", "Ham", "Butter", "Paprika"]
  },
  {
    name: "Cheese Corndog",
    origin: "South Korea",
    flag: "🇰🇷",
    description: "Cheese-filled, breaded, and deep-fried on a stick, coated in sugar for sweet-savory contrast.",
    keyIngredients: ["Mozzarella", "Hot dog batter", "Panko", "Sugar coating"]
  },
];

export const cookingMethods: CookingMethod[] = [
  {
    name: "Skillet Method (Classic)",
    icon: "PanFrying",
    description: "The traditional stovetop method using a standard or cast iron skillet for even browning and crispy crust.",
    temperature: "Medium heat",
    time: "2-3 minutes per side",
    steps: [
      "Heat skillet over medium heat for 3-5 minutes",
      "Butter one side of each bread slice generously",
      "Place bread butter-side down in heated skillet",
      "Add cheese to the unbuttered side immediately",
      "Cook until bottom is golden brown (1-2 minutes)",
      "Close sandwich and flip to second side",
      "Cook until cheese is melted and both sides are golden",
    ],
    tips: [
      "Listen for a gentle sizzle - indicates proper temperature",
      "Cover the pan briefly if cheese needs more time to melt",
      "Don't press too hard or you'll squeeze out the cheese",
      "Room temperature cheese melts more evenly",
    ]
  },
  {
    name: "Cast Iron Skillet",
    icon: "Circle",
    description: "Cast iron provides superior heat retention and develops an exceptional crust with even browning.",
    temperature: "Medium to medium-low",
    time: "2-4 minutes per side",
    steps: [
      "Preheat cast iron over medium heat for 5+ minutes",
      "Use slightly more butter than with regular pans",
      "Place assembled sandwich in preheated pan",
      "Let cook undisturbed for 2-3 minutes",
      "Check for deep golden color before flipping",
      "Flip and repeat on second side",
    ],
    tips: [
      "Cast iron stays hot - reduce heat if bread browns too fast",
      "The weight of cast iron helps press the sandwich naturally",
      "Well-seasoned pans require less butter",
      "Creates the best crust of any method",
    ]
  },
  {
    name: "Panini Press",
    icon: "ChefHat",
    description: "Electric press cooks both sides simultaneously with consistent pressure for professional results.",
    temperature: "Medium-high preset",
    time: "2-4 minutes total",
    steps: [
      "Preheat panini press for 5 minutes",
      "Butter or mayo both outer sides of bread",
      "Assemble sandwich with cheese",
      "Place on preheated press",
      "Close top gently - don't crush",
      "Cook until indicator light or golden brown",
    ],
    tips: [
      "Don't over-press thin sandwiches",
      "Great for thicker, multi-ingredient sandwiches",
      "Creates beautiful grill marks",
      "Faster than skillet method",
    ]
  },
  {
    name: "Oven-Finished Method",
    icon: "Flame",
    description: "Perfect for Croque Monsieur style: pan-sear first, then finish under broiler for bubbly cheese top.",
    temperature: "375°F oven, then broiler",
    time: "10-15 min oven + 2-3 min broiler",
    steps: [
      "Pan-fry sandwich until lightly golden (2-3 min per side)",
      "Transfer to baking sheet",
      "Top with additional sauce and cheese",
      "Bake at 375°F for 10-15 minutes",
      "Switch to broiler for 2-3 minutes until golden and bubbly",
      "Watch carefully - broiler can burn quickly",
    ],
    tips: [
      "Essential for Croque Monsieur style sandwiches",
      "Creates restaurant-quality presentation",
      "Allows for multiple cheese layers",
      "Great for cooking multiple sandwiches at once",
    ]
  },
  {
    name: "Griddle Method",
    icon: "Grid3X3",
    description: "Ideal for cooking multiple sandwiches at once, commonly used in food trucks and commercial kitchens.",
    temperature: "Medium heat (325-350°F)",
    time: "2-3 minutes per side",
    steps: [
      "Preheat flat griddle to 325-350°F",
      "Butter bread generously on outer sides",
      "Place sandwiches with space between each",
      "Cook without pressing for 2-3 minutes",
      "Flip when golden and cheese begins melting",
      "Remove when both sides are evenly golden",
    ],
    tips: [
      "Maintain consistent temperature across surface",
      "Don't crowd the griddle",
      "Great for high-volume production",
      "Use a press weight for extra crispiness",
    ]
  },
];

export const buildYourOwnIngredients: IngredientCategory[] = [
  {
    category: "Bread",
    maxSelections: 2,
    items: [
      { name: "Classic White", description: "Soft, classic texture" },
      { name: "Sourdough", description: "Tangy, sturdy" },
      { name: "Brioche", description: "Rich, buttery" },
      { name: "Ciabatta", description: "Airy, chewy" },
      { name: "Rye", description: "Dense, distinctive" },
      { name: "Challah", description: "Slightly sweet, eggy" },
      { name: "Country Loaf", description: "Hearty, rustic" },
      { name: "Multigrain", description: "Nutty, nutritious" },
    ]
  },
  {
    category: "Spread",
    maxSelections: 2,
    items: [
      { name: "Butter", description: "Classic choice" },
      { name: "Mayonnaise", description: "Extra browning" },
      { name: "Garlic Butter", description: "Aromatic" },
      { name: "Herb Butter", description: "Rosemary & thyme" },
      { name: "Aioli", description: "Garlicky" },
      { name: "Truffle Butter", description: "Luxurious" },
      { name: "Dijon Mustard", description: "Tangy kick" },
      { name: "Sriracha Mayo", description: "Spicy heat" },
    ]
  },
  {
    category: "Primary Cheese",
    maxSelections: 2,
    items: [
      { name: "American", description: "Melts perfectly" },
      { name: "Sharp Cheddar", description: "Bold & tangy" },
      { name: "White Cheddar", description: "Mild & creamy" },
      { name: "Gruyère", description: "Nutty, Swiss" },
      { name: "Swiss", description: "Mild, classic" },
      { name: "Smoked Gouda", description: "Rich, smoky" },
      { name: "Fontina", description: "Earthy, smooth" },
      { name: "Provolone", description: "Mild Italian" },
    ]
  },
  {
    category: "Secondary Cheese",
    maxSelections: 1,
    items: [
      { name: "Mozzarella", description: "Stretchy, mild" },
      { name: "Brie", description: "Creamy, buttery" },
      { name: "Goat Cheese", description: "Tangy, fresh" },
      { name: "Blue Cheese", description: "Bold, pungent" },
      { name: "Parmesan", description: "Crispy topping" },
      { name: "None", description: "Keep it simple" },
    ]
  },
  {
    category: "Protein",
    maxSelections: 2,
    items: [
      { name: "Crispy Bacon", description: "Smoky crunch" },
      { name: "Prosciutto", description: "Salty, delicate" },
      { name: "Ham", description: "Classic pairing" },
      { name: "Pulled Pork", description: "Hearty, BBQ" },
      { name: "Grilled Chicken", description: "Lean protein" },
      { name: "Crab", description: "Luxury seafood" },
      { name: "Roast Beef", description: "Savory, rich" },
      { name: "None", description: "Vegetarian option" },
    ]
  },
  {
    category: "Vegetables",
    maxSelections: 3,
    items: [
      { name: "Caramelized Onions", description: "Sweet & savory" },
      { name: "Roasted Peppers", description: "Smoky sweetness" },
      { name: "Fresh Tomato", description: "Bright, juicy" },
      { name: "Sun-dried Tomato", description: "Intense flavor" },
      { name: "Baby Spinach", description: "Fresh greens" },
      { name: "Arugula", description: "Peppery bite" },
      { name: "Jalapeños", description: "Spicy kick" },
      { name: "Avocado", description: "Creamy texture" },
    ]
  },
  {
    category: "Flavor Enhancer",
    maxSelections: 2,
    items: [
      { name: "Balsamic Glaze", description: "Sweet & tangy" },
      { name: "Hot Honey", description: "Sweet heat" },
      { name: "Fig Jam", description: "Luxurious sweetness" },
      { name: "Apple Slices", description: "Crisp & fresh" },
      { name: "Pesto", description: "Herby, bright" },
      { name: "Pickle Chips", description: "Tangy crunch" },
      { name: "Fresh Herbs", description: "Aromatic finish" },
      { name: "None", description: "Classic simplicity" },
    ]
  },
  {
    category: "Cooking Method",
    maxSelections: 1,
    items: [
      { name: "Skillet", description: "Classic stovetop" },
      { name: "Cast Iron", description: "Premium crust" },
      { name: "Panini Press", description: "Even cooking" },
      { name: "Griddle", description: "High volume" },
      { name: "Oven-Finished", description: "Bubbly top" },
    ]
  },
];

export const historyTimeline = [
  { year: "Ancient Rome", event: "Romans enjoy bread grilled with cheese, the earliest documented intersection of these ingredients." },
  { year: "14th Century", event: "Welsh Rarebit emerges in Britain — melted cheese poured over toasted bread." },
  { year: "1916", event: "James L. Kraft invents processed American cheese, revolutionizing cheese melting." },
  { year: "1928", event: "Wonder Bread introduces sliced bread, making sandwich preparation easier." },
  { year: "1930s", event: "The Great Depression establishes grilled cheese as an affordable staple meal." },
  { year: "1930s", event: "Automatic toasters invented, improving bread toasting consistency." },
  { year: "1940s", event: "WWII: Grilled cheese becomes a popular military ration and comfort food." },
  { year: "1950s", event: "Schools add grilled cheese to lunch programs, establishing it as an American classic." },
];

export const proTips = [
  { title: "Room Temperature Cheese", tip: "Let cheese come to room temperature before cooking for more even melting." },
  { title: "Mayo Magic", tip: "Use mayonnaise instead of butter on bread exterior for superior browning and a subtle tang." },
  { title: "Low and Slow", tip: "Medium-low heat gives cheese time to melt before bread burns." },
  { title: "Cover the Pan", tip: "A lid creates steam that melts cheese faster without burning bread." },
  { title: "Grate, Don't Slice", tip: "Grated cheese melts more evenly than slices." },
  { title: "Press Gently", tip: "Light pressure improves contact with the pan; heavy pressure squeezes out cheese." },
];

export const didYouKnow = [
  "The Croque Monsieur was first served in Parisian cafés in 1910.",
  "American cheese was invented specifically for consistent melting.",
  "National Grilled Cheese Day is celebrated on April 12th.",
  "The world's largest grilled cheese weighed 320 pounds.",
  "Adding a bit of mustard to the inside prevents sogginess and adds flavor.",
  "Grilled cheese pairs perfectly with tomato soup because the acidity cuts through the richness.",
  "The average American eats about 8 grilled cheese sandwiches per year.",
];

export const troubleshooting = [
  { problem: "Bread burns before cheese melts", solutions: ["Lower heat to medium-low", "Cover pan to trap steam", "Use thinner cheese slices or grated cheese"] },
  { problem: "Cheese doesn't melt evenly", solutions: ["Use room-temperature cheese", "Grate cheese instead of slicing", "Slice cheese thinner"] },
  { problem: "Sandwich falls apart when flipping", solutions: ["Use less filling", "Cook longer before first flip", "Let cheese set as 'glue' before flipping"] },
  { problem: "Bread is soggy inside", solutions: ["Pat wet ingredients dry before adding", "Don't add watery vegetables directly to bread", "Use less sauce"] },
  { problem: "Crust isn't golden enough", solutions: ["Increase heat slightly", "Use more butter or mayo on exterior", "Finish under broiler briefly"] },
];
