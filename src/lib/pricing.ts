// Pricing calculations for Drop-Off Catering

export type PackageType = 'simple' | 'full';

export interface PricingTier {
  minGuests: number;
  pricePerPerson: number;
}

export interface PackageConfig {
  name: string;
  description: string;
  tiers: PricingTier[];
  minimumCharge?: number;
  maxSandwichSelections?: number;
}

// Package configurations based on PDF
export const packageConfigs: Record<PackageType, PackageConfig> = {
  simple: {
    name: 'Simple Menu',
    description: 'One grilled cheese sandwich or hot dog, one side, one drink. Guests can revisit for a second side and drink.',
    tiers: [
      { minGuests: 75, pricePerPerson: 14 },
      { minGuests: 50, pricePerPerson: 17 },
    ],
    minimumCharge: 1050, // $1,050 minimum for events under 50 guests
  },
  full: {
    name: 'Full Menu',
    description: 'One entrée, one side, one drink. Guests can revisit for a second side and drink. Choose up to 10 sandwiches from our full menu.',
    tiers: [
      { minGuests: 75, pricePerPerson: 22 },
      { minGuests: 40, pricePerPerson: 28 },
    ],
    maxSandwichSelections: 10,
  },
};

// Origin zip code for travel calculations
export const ORIGIN_ZIP = '08089';
export const BASE_TRAVEL_FEE = 150; // $150 for up to 50 miles
export const BASE_TRAVEL_MILES = 50;
export const EXTRA_MILE_RATE = 1.5; // $1.50 per additional mile (round-trip)
export const GRATUITY_RATE = 0.10; // 10% gratuity
export const DESSERT_PRICE_PER_PERSON = 4; // $4/person for desserts
export const DEFAULT_GLUTEN_FREE_LIMIT = 10;

// Get price per person based on guest count and package
export const getPricePerPerson = (packageType: PackageType, guestCount: number): number | null => {
  const config = packageConfigs[packageType];
  
  // Find the applicable tier (sorted by minGuests descending)
  const sortedTiers = [...config.tiers].sort((a, b) => b.minGuests - a.minGuests);
  
  for (const tier of sortedTiers) {
    if (guestCount >= tier.minGuests) {
      return tier.pricePerPerson;
    }
  }
  
  // Below minimum - return lowest tier price for calculation purposes
  if (config.tiers.length > 0) {
    return config.tiers[config.tiers.length - 1].pricePerPerson;
  }
  
  return null;
};

// Check if guest count is below minimum
export const isBelowMinimum = (packageType: PackageType, guestCount: number): boolean => {
  const config = packageConfigs[packageType];
  const lowestTier = [...config.tiers].sort((a, b) => a.minGuests - b.minGuests)[0];
  return guestCount < lowestTier.minGuests;
};

// Get minimum guest count for package
export const getMinimumGuestCount = (packageType: PackageType): number => {
  const config = packageConfigs[packageType];
  const lowestTier = [...config.tiers].sort((a, b) => a.minGuests - b.minGuests)[0];
  return lowestTier.minGuests;
};

// Calculate base catering subtotal
export const calculateCateringSubtotal = (
  packageType: PackageType,
  guestCount: number
): number => {
  const config = packageConfigs[packageType];
  const pricePerPerson = getPricePerPerson(packageType, guestCount);
  
  if (!pricePerPerson) return 0;
  
  const calculatedTotal = pricePerPerson * guestCount;
  
  // Apply minimum charge if applicable
  if (config.minimumCharge && calculatedTotal < config.minimumCharge) {
    return config.minimumCharge;
  }
  
  return calculatedTotal;
};

// Calculate travel fee based on distance
export const calculateTravelFee = (distanceMiles: number): number => {
  if (distanceMiles <= BASE_TRAVEL_MILES) {
    return BASE_TRAVEL_FEE;
  }
  
  const extraMiles = distanceMiles - BASE_TRAVEL_MILES;
  // Round-trip calculation
  const extraFee = extraMiles * 2 * EXTRA_MILE_RATE;
  
  return BASE_TRAVEL_FEE + extraFee;
};

// Calculate dessert add-on cost
export const calculateDessertCost = (guestCount: number, includeDesserts: boolean): number => {
  if (!includeDesserts) return 0;
  return guestCount * DESSERT_PRICE_PER_PERSON;
};

// Calculate gratuity (10% on subtotal + add-ons, before travel)
export const calculateGratuity = (subtotal: number, addOns: number): number => {
  return (subtotal + addOns) * GRATUITY_RATE;
};

// Full pricing breakdown
export interface PricingBreakdown {
  packageType: PackageType;
  guestCount: number;
  pricePerPerson: number | null;
  cateringSubtotal: number;
  dessertCost: number;
  subtotalWithAddOns: number;
  gratuity: number;
  travelFee: number;
  total: number;
  isBelowMinimum: boolean;
  minimumApplied: boolean;
}

export const calculateFullPricing = (
  packageType: PackageType,
  guestCount: number,
  distanceMiles: number,
  includeDesserts: boolean = false
): PricingBreakdown => {
  const config = packageConfigs[packageType];
  const pricePerPerson = getPricePerPerson(packageType, guestCount);
  const belowMinimum = isBelowMinimum(packageType, guestCount);
  
  const calculatedSubtotal = pricePerPerson ? pricePerPerson * guestCount : 0;
  const cateringSubtotal = calculateCateringSubtotal(packageType, guestCount);
  const minimumApplied = config.minimumCharge ? calculatedSubtotal < config.minimumCharge : false;
  
  const dessertCost = calculateDessertCost(guestCount, includeDesserts);
  const subtotalWithAddOns = cateringSubtotal + dessertCost;
  const gratuity = calculateGratuity(cateringSubtotal, dessertCost);
  const travelFee = calculateTravelFee(distanceMiles);
  
  const total = subtotalWithAddOns + gratuity + travelFee;
  
  return {
    packageType,
    guestCount,
    pricePerPerson,
    cateringSubtotal,
    dessertCost,
    subtotalWithAddOns,
    gratuity,
    travelFee,
    total,
    isBelowMinimum: belowMinimum,
    minimumApplied,
  };
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Deposit configuration (configurable for future use)
export const DEPOSIT_PERCENTAGE = 1.0; // 100% = full payment, 0.5 = 50% deposit
export const calculateDeposit = (total: number): number => {
  return total * DEPOSIT_PERCENTAGE;
};
