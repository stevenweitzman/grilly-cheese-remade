// Menu items for Drop-Off Catering based on Grilly Cheese Event Packages

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'sandwich' | 'hotdog' | 'side' | 'beverage' | 'dessert';
  availableIn: ('simple' | 'full')[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  hasGlutenFreeOption?: boolean;
}

// Simple Menu Sandwiches
export const simpleMenuSandwiches: MenuItem[] = [
  {
    id: 'just-the-cheese',
    name: 'Just the Cheese',
    description: 'Classic American cheese on buttery grilled bread',
    category: 'sandwich',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'just-the-mozz',
    name: 'Just The Mozz',
    description: 'Fresh mozzarella cheese on buttery grilled bread',
    category: 'sandwich',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'bacon-american-classic',
    name: 'Bacon American Classic',
    description: 'Crispy bacon with American cheese on buttery grilled bread',
    category: 'sandwich',
    availableIn: ['simple', 'full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'just-the-cheddar',
    name: 'Just The Cheddar',
    description: 'Sharp cheddar cheese on buttery grilled bread',
    category: 'sandwich',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: '3-cheese-please',
    name: '3 Cheese Please',
    description: 'American, cheddar, and mozzarella cheese blend',
    category: 'sandwich',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'american-dream',
    name: 'The American Dream',
    description: 'American cheese with our special seasoning blend',
    category: 'sandwich',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'kids-grilled-cheese',
    name: 'Kids Grilled Cheese',
    description: 'Smaller portion perfect for little ones',
    category: 'sandwich',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
];

// Full Menu Exclusive Sandwiches
export const fullMenuSandwiches: MenuItem[] = [
  {
    id: 'grilly-cheese',
    name: 'Grilly Cheese',
    description: 'Our signature sandwich with a special cheese blend and secret sauce',
    category: 'sandwich',
    availableIn: ['full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'grilly-cheesesteak',
    name: 'Grilly Cheesesteak',
    description: 'Philly-style cheesesteak with grilled onions and melted cheese',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'Fresh mozzarella, tomato, and basil with balsamic glaze',
    category: 'sandwich',
    availableIn: ['full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'joels-2nd-favorite',
    name: "Joel's 2nd Favorite",
    description: 'A house favorite with bacon, tomato, and special sauce',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'reuben-steiner',
    name: 'Reuben Steiner',
    description: 'Corned beef, Swiss cheese, sauerkraut, and Russian dressing',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'canoe-in-the-pines',
    name: 'Canoe In The Pines',
    description: 'Pine Barrens inspired with cranberry and brie',
    category: 'sandwich',
    availableIn: ['full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'chicken-pickin',
    name: 'Chicken Pickin',
    description: 'Grilled chicken with melted cheese and special seasoning',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'cluck-norris',
    name: 'Cluck Norris',
    description: 'Spicy buffalo chicken with blue cheese crumbles',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'swiss-pig',
    name: 'Swiss Pig',
    description: 'Ham and Swiss cheese with honey mustard',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'grilled-caprese',
    name: 'Grilled Caprese',
    description: 'Fresh mozzarella, tomato, basil, and olive oil',
    category: 'sandwich',
    availableIn: ['full'],
    isVegetarian: true,
    hasGlutenFreeOption: true,
  },
  {
    id: 'bltmacd',
    name: 'BLTMACD',
    description: 'Bacon, lettuce, tomato, mac and cheese all grilled together',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'russian-around',
    name: 'The Russian Around',
    description: 'Russian dressing with turkey and Swiss',
    category: 'sandwich',
    availableIn: ['full'],
    hasGlutenFreeOption: true,
  },
  {
    id: 'pleasin-vegan',
    name: 'Pleasin Vegan',
    description: 'Vegan cheese with grilled vegetables',
    category: 'sandwich',
    availableIn: ['full'],
    isVegan: true,
    hasGlutenFreeOption: true,
  },
];

// All sandwiches combined
export const allSandwiches: MenuItem[] = [...simpleMenuSandwiches, ...fullMenuSandwiches];

// Hot Dogs (available in both menus)
export const hotDogs: MenuItem[] = [
  {
    id: 'hot-pig-dog',
    name: 'Hot Pig Dog',
    description: 'All-beef hot dog wrapped in bacon',
    category: 'hotdog',
    availableIn: ['simple', 'full'],
  },
  {
    id: 'just-the-dog',
    name: 'Just The Dog',
    description: 'Classic all-beef hot dog',
    category: 'hotdog',
    availableIn: ['simple', 'full'],
  },
  {
    id: 'just-the-cheese-dog',
    name: 'Just The Cheese Dog',
    description: 'All-beef hot dog with melted cheese',
    category: 'hotdog',
    availableIn: ['simple', 'full'],
  },
  {
    id: 'grilly-dog',
    name: 'Grilly Dog',
    description: 'Our signature hot dog with all the fixings',
    category: 'hotdog',
    availableIn: ['full'],
  },
];

// Sides
export const sides: MenuItem[] = [
  {
    id: 'hand-cut-fries',
    name: 'Hand-Cut Homemade Fries',
    description: 'Fresh-cut and fried to golden perfection',
    category: 'side',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    isVegan: true,
  },
  {
    id: 'cheese-fries',
    name: 'Hand-Cut Cheese Fries',
    description: 'Fresh-cut fries topped with melted cheese',
    category: 'side',
    availableIn: ['full'],
    isVegetarian: true,
  },
  {
    id: 'tomato-soup',
    name: 'Homemade Tomato Soup',
    description: 'Creamy homemade tomato soup (upon request)',
    category: 'side',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
  },
  {
    id: 'kettle-chips',
    name: 'Homemade Kettle Chips',
    description: 'Crispy kettle-cooked chips',
    category: 'side',
    availableIn: ['full'],
    isVegetarian: true,
    isVegan: true,
  },
  {
    id: 'side-salad',
    name: 'Side Salad',
    description: 'Fresh mixed greens with house dressing',
    category: 'side',
    availableIn: ['full'],
    isVegetarian: true,
  },
];

// Beverages
export const beverages: MenuItem[] = [
  {
    id: 'coke',
    name: 'Coke',
    description: 'Classic Coca-Cola',
    category: 'beverage',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    isVegan: true,
  },
  {
    id: 'sprite',
    name: 'Sprite',
    description: 'Lemon-lime soda',
    category: 'beverage',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    isVegan: true,
  },
  {
    id: 'diet-coke',
    name: 'Diet Coke',
    description: 'Diet Coca-Cola',
    category: 'beverage',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    isVegan: true,
  },
  {
    id: 'bottled-water',
    name: 'Bottled Water',
    description: 'Refreshing bottled water',
    category: 'beverage',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
    isVegan: true,
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    description: 'Fresh brewed iced tea',
    category: 'beverage',
    availableIn: ['full'],
    isVegetarian: true,
    isVegan: true,
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    description: 'Rich and creamy hot chocolate',
    category: 'beverage',
    availableIn: ['full'],
    isVegetarian: true,
  },
];

// Desserts (Add-ons only)
export const desserts: MenuItem[] = [
  {
    id: 'chocolate-chip-cookies',
    name: 'Homemade Chocolate Chip Cookies',
    description: 'Fresh-baked chocolate chip cookies',
    category: 'dessert',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
  },
  {
    id: 'mini-cherry-pie',
    name: 'Mini Cherry Pie',
    description: 'Individual cherry pie (seasonal)',
    category: 'dessert',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
  },
  {
    id: 'mini-blueberry-pie',
    name: 'Mini Blueberry Pie',
    description: 'Individual blueberry pie (seasonal)',
    category: 'dessert',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
  },
  {
    id: 'mini-peach-pie',
    name: 'Mini Peach Pie',
    description: 'Individual peach pie (seasonal)',
    category: 'dessert',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
  },
  {
    id: 'mini-apple-pie',
    name: 'Mini Apple Pie',
    description: 'Individual apple pie (seasonal)',
    category: 'dessert',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
  },
  {
    id: 'mini-pecan-pie',
    name: 'Mini Pecan Pie',
    description: 'Individual pecan pie (seasonal)',
    category: 'dessert',
    availableIn: ['simple', 'full'],
    isVegetarian: true,
  },
];

// Get available items by package type
export const getMenuItemsByPackage = (packageType: 'simple' | 'full') => {
  return {
    sandwiches: allSandwiches.filter(item => item.availableIn.includes(packageType)),
    hotDogs: hotDogs.filter(item => item.availableIn.includes(packageType)),
    sides: sides.filter(item => item.availableIn.includes(packageType)),
    beverages: beverages.filter(item => item.availableIn.includes(packageType)),
    desserts: desserts.filter(item => item.availableIn.includes(packageType)),
  };
};
