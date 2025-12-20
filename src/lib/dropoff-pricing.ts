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
export const BASE_DELIVERY_FEE = 50.00; // Base delivery fee
export const FREE_DELIVERY_MILES = 10;
export const DELIVERY_PER_MILE_RATE = 1.50; // Per mile rate after free miles

// Gratuity
export const GRATUITY_RATE = 0.10; // 10%

// Minimum food subtotal for drop-off orders
export const MIN_FOOD_SUBTOTAL = 200;

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
 * Base fee of $50 + $1.50/mile for miles over 10
 */
export const calculateDeliveryFee = (distanceMiles: number): { fee: number; milesOver10: number } => {
  const milesOver10 = Math.max(0, distanceMiles - FREE_DELIVERY_MILES);
  const distanceFee = milesOver10 * DELIVERY_PER_MILE_RATE;
  const fee = BASE_DELIVERY_FEE + distanceFee;
  return { fee, milesOver10 };
};

/**
 * Master pricing calculation function
 * Returns the complete pricing breakdown for the final step
 */
export const calculateDropoffPricing = (
  cart: CartItem[],
  distanceMiles: number
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

  // 6. Gratuity (10% of food subtotal)
  const gratuity = foodSubtotal * GRATUITY_RATE;

  // 7. Delivery fee
  const { fee: deliveryFee, milesOver10: deliveryMilesOver10 } = calculateDeliveryFee(distanceMiles);

  // 8. Final total
  const finalTotal = foodSubtotal + gratuity + deliveryFee;

  return {
    entreeSubtotal,
    entreeCount,
    bulkDiscountPercent,
    bulkDiscountAmount,
    discountedEntreeSubtotal,
    extrasSubtotal,
    foodSubtotal,
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
