// Drop-Off Catering Pricing Engine
// This is a completely new item-based pricing model (not package-based)

// ============= CONFIGURABLE PRICING =============

// Item pricing by tier
export const ITEM_PRICING = {
  SANDWICH_STANDARD: 8.00,    // Just the Cheese, Just The Mozz, 3 Cheese Please, etc.
  SANDWICH_PREMIUM: 12.00,    // Grilly Cheesesteak, Margherita, Reuben Steiner, etc.
  HOT_DOG: 6.00,              // All hot dogs
  SIDE_PER_TRAY: 45.00,       // Fries, Cheese Fries, Tomato Soup, etc.
  DESSERT_PER_DOZEN: 24.00,   // Cookies, Mini Pies
  BEVERAGE_UNIT: 2.50,        // Coke, Sprite, Water, Iced Tea, etc.
} as const;

export type PricingTier = keyof typeof ITEM_PRICING;

// Bulk discount tiers (applies to entrées only)
export const BULK_DISCOUNT_TIERS = [
  { minQty: 1, maxQty: 24, discountPercent: 0 },
  { minQty: 25, maxQty: 49, discountPercent: 5 },
  { minQty: 50, maxQty: 99, discountPercent: 10 },
  { minQty: 100, maxQty: Infinity, discountPercent: 15 },
] as const;

// Delivery fee configuration
export const ORIGIN_ZIP = '08089';
export const FREE_DELIVERY_MILES = 10;
export const DELIVERY_PER_MILE_RATE = 1.50;

// Gratuity
export const GRATUITY_RATE = 0.10; // 10%

// Minimum food subtotal for drop-off orders
export const MIN_FOOD_SUBTOTAL = 350;

// Individual packaging fee
export const INDIVIDUAL_PACKAGING_FEE = 0.50; // $0.50 per item/serving
export const TRAY_SERVINGS = 15; // Each tray serves ~15, so packaging fee is $0.50 × 15

// Chafing dish fees
export const CHAFING_DISH_FEE_PER_10_ITEMS = 15.00; // $15 per 10 items
export const CHAFING_DISH_FEE_PER_TRAY = 15.00; // $15 per tray

// Gluten-free bread upcharge
export const GLUTEN_FREE_UPCHARGE = 2.00; // $2 per sandwich with GF bread

// ============= CART ITEM TYPE =============

export interface CartItem {
  itemId: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  isEntree: boolean;
  pricingTier: PricingTier;
}

// ============= PRICING BREAKDOWN TYPE =============

export interface DropoffPricingBreakdown {
  entreeSubtotal: number;
  entreeCount: number;
  bulkDiscountPercent: number;
  bulkDiscountAmount: number;
  discountedEntreeSubtotal: number;
  extrasSubtotal: number;
  foodSubtotal: number;
  packagingFee: number;
  chafingDishFee: number;
  glutenFreeFee: number;
  gratuity: number;
  deliveryFee: number;
  deliveryMilesOver10: number;
  finalTotal: number;
  isBelowMinimum: boolean;
  minimumRequired: number;
}

// ============= PRICING FUNCTIONS =============

/**
 * Get the unit price for a pricing tier
 */
export const getItemPrice = (pricingTier: PricingTier): number => {
  return ITEM_PRICING[pricingTier];
};

/**
 * Calculate the bulk discount tier based on entrée count
 */
export const getBulkDiscountTier = (entreeCount: number) => {
  return BULK_DISCOUNT_TIERS.find(
    tier => entreeCount >= tier.minQty && entreeCount <= tier.maxQty
  ) || BULK_DISCOUNT_TIERS[0];
};

/**
 * Calculate entrée subtotal from cart items
 */
export const calculateEntreeSubtotal = (cart: CartItem[]): { subtotal: number; count: number } => {
  const entrees = cart.filter(item => item.isEntree);
  const subtotal = entrees.reduce((sum, item) => sum + item.lineTotal, 0);
  const count = entrees.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, count };
};

/**
 * Calculate bulk discount amount
 */
export const calculateBulkDiscount = (
  entreeCount: number,
  entreeSubtotal: number
): { discountPercent: number; discountAmount: number } => {
  const tier = getBulkDiscountTier(entreeCount);
  const discountPercent = tier.discountPercent;
  const discountAmount = (entreeSubtotal * discountPercent) / 100;
  return { discountPercent, discountAmount };
};

/**
 * Calculate extras subtotal (sides, desserts, beverages)
 */
export const calculateExtrasSubtotal = (cart: CartItem[]): number => {
  const extras = cart.filter(item => !item.isEntree);
  return extras.reduce((sum, item) => sum + item.lineTotal, 0);
};

/**
 * Calculate delivery fee based on distance from origin zip (08089)
 * First 10 miles are free, then $1.50/mile for miles over 10
 */
export const calculateDeliveryFee = (distanceMiles: number): { fee: number; milesOver10: number } => {
  const milesOver10 = Math.max(0, distanceMiles - FREE_DELIVERY_MILES);
  const fee = milesOver10 * DELIVERY_PER_MILE_RATE;
  return { fee, milesOver10 };
};

/**
 * Calculate individual packaging fee
 * $0.50 per individual item, $0.50 × servings for trays
 */
export const calculatePackagingFee = (cart: CartItem[]): number => {
  let fee = 0;
  for (const item of cart) {
    if (item.pricingTier === 'SIDE_PER_TRAY') {
      // Trays: $0.50 × servings (15) × quantity
      fee += INDIVIDUAL_PACKAGING_FEE * TRAY_SERVINGS * item.quantity;
    } else {
      // Individual items: $0.50 each
      fee += INDIVIDUAL_PACKAGING_FEE * item.quantity;
    }
  }
  return fee;
};

/**
 * Calculate chafing dish fee
 * $15 per 10 individual items, $15 per tray
 */
export const calculateChafingDishFee = (cart: CartItem[]): number => {
  let fee = 0;
  let individualItemCount = 0;
  
  for (const item of cart) {
    if (item.pricingTier === 'SIDE_PER_TRAY') {
      // Trays: $15 per tray
      fee += CHAFING_DISH_FEE_PER_TRAY * item.quantity;
    } else if (item.isEntree) {
      // Count individual entree items
      individualItemCount += item.quantity;
    }
  }
  
  // Add fee for individual items: $15 per 10 items (round up)
  if (individualItemCount > 0) {
    fee += Math.ceil(individualItemCount / 10) * CHAFING_DISH_FEE_PER_10_ITEMS;
  }
  
  return fee;
};

/**
 * Master pricing calculation function
 * Returns the complete pricing breakdown for the final step
 */
export const calculateDropoffPricing = (
  cart: CartItem[],
  distanceMiles: number,
  wantsIndividualPackaging: boolean = false,
  wantsChafingDishes: boolean = false,
  glutenFreeCount: number = 0
): DropoffPricingBreakdown => {
  // 1. Entrée subtotal
  const { subtotal: entreeSubtotal, count: entreeCount } = calculateEntreeSubtotal(cart);

  // 2. Bulk discount
  const { discountPercent: bulkDiscountPercent, discountAmount: bulkDiscountAmount } = 
    calculateBulkDiscount(entreeCount, entreeSubtotal);
  const discountedEntreeSubtotal = entreeSubtotal - bulkDiscountAmount;

  // 3. Extras subtotal
  const extrasSubtotal = calculateExtrasSubtotal(cart);

  // 4. Food subtotal
  const foodSubtotal = discountedEntreeSubtotal + extrasSubtotal;

  // 5. Minimum check
  const isBelowMinimum = foodSubtotal < MIN_FOOD_SUBTOTAL;

  // 6. Packaging fee (if requested)
  const packagingFee = wantsIndividualPackaging ? calculatePackagingFee(cart) : 0;

  // 7. Chafing dish fee (if requested)
  const chafingDishFee = wantsChafingDishes ? calculateChafingDishFee(cart) : 0;

  // 8. Gluten-free upcharge ($2 per GF sandwich)
  const glutenFreeFee = glutenFreeCount * GLUTEN_FREE_UPCHARGE;

  // 9. Gratuity (10% of food subtotal)
  const gratuity = foodSubtotal * GRATUITY_RATE;

  // 10. Delivery fee
  const { fee: deliveryFee, milesOver10: deliveryMilesOver10 } = calculateDeliveryFee(distanceMiles);

  // 11. Final total
  const finalTotal = foodSubtotal + packagingFee + chafingDishFee + glutenFreeFee + gratuity + deliveryFee;

  return {
    entreeSubtotal,
    entreeCount,
    bulkDiscountPercent,
    bulkDiscountAmount,
    discountedEntreeSubtotal,
    extrasSubtotal,
    foodSubtotal,
    packagingFee,
    chafingDishFee,
    glutenFreeFee,
    gratuity,
    deliveryFee,
    deliveryMilesOver10,
    finalTotal,
    isBelowMinimum,
    minimumRequired: MIN_FOOD_SUBTOTAL,
  };
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Create a cart item from menu item selection
 */
export const createCartItem = (
  itemId: string,
  name: string,
  category: string,
  quantity: number,
  pricingTier: PricingTier,
  isEntree: boolean
): CartItem => {
  const unitPrice = getItemPrice(pricingTier);
  return {
    itemId,
    name,
    category,
    quantity,
    unitPrice,
    lineTotal: unitPrice * quantity,
    isEntree,
    pricingTier,
  };
};

/**
 * Update quantity in cart item
 */
export const updateCartItemQuantity = (item: CartItem, newQuantity: number): CartItem => {
  return {
    ...item,
    quantity: newQuantity,
    lineTotal: item.unitPrice * newQuantity,
  };
};
