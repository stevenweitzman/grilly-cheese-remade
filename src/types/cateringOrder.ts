// Types for catering order flow (Drop-Off Catering - Item-Based Pricing)

import { PricingTier, DropoffPricingBreakdown, CartItem } from "@/lib/dropoff-pricing";

// Re-export for convenience
export type { CartItem, DropoffPricingBreakdown, PricingTier };

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

// Drop-Off Order Form Data (Cart-Based Model)
export interface DropoffOrderFormData {
  // Cart (replaces package + menu selection)
  cart: CartItem[];
  
  // Add-on options
  wantsIndividualPackaging: boolean;
  wantsPaperGoods: boolean; // plates, utensils, napkins
  wantsChafingDishes: boolean;
  glutenFreeCount: number; // Number of sandwiches to make gluten-free (+$2 each)
  
  // Event Details
  eventName: string;
  eventDate: Date | null;
  eventTime: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryAddress: DeliveryAddress;
  distanceMiles: number;
  
  // Special requests
  specialNotes: string;
  
  // Honeypot for bot detection (should remain empty)
  website: string;
  
  // Calculated at final step only
  pricingBreakdown: DropoffPricingBreakdown | null;
}

export const initialDropoffFormData: DropoffOrderFormData = {
  cart: [],
  wantsIndividualPackaging: false,
  wantsPaperGoods: false,
  wantsChafingDishes: false,
  glutenFreeCount: 0,
  eventName: '',
  eventDate: null,
  eventTime: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  deliveryAddress: {
    street: '',
    city: '',
    state: 'NJ',
    zip: '',
  },
  distanceMiles: 0,
  specialNotes: '',
  website: '', // honeypot - must remain empty
  pricingBreakdown: null,
};

// 5-step order flow
export type OrderStep = 1 | 2 | 3 | 4 | 5;

export const ORDER_STEPS = [
  { step: 1, label: 'Menu', description: 'Build your order' },
  { step: 2, label: 'Event', description: 'Date & time' },
  { step: 3, label: 'Delivery', description: 'Address' },
  { step: 4, label: 'Contact', description: 'Your info' },
  { step: 5, label: 'Submit', description: 'Review & confirm' },
] as const;

// ============= LEGACY TYPES (for backward compatibility with old orders) =============

export interface MenuSelection {
  itemId: string;
  name: string;
  estimatedCount?: number;
}

export interface DietaryOptions {
  glutenFreeCount: number;
  veganCount: number;
  specialNotes: string;
}

// Old package-based form data (kept for backward compatibility)
export interface CateringOrderFormData {
  packageType: 'simple' | 'full';
  guestCount: number;
  eventName: string;
  eventDate: Date | null;
  eventTime: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryAddress: DeliveryAddress;
  distanceMiles: number;
  selectedSandwiches: MenuSelection[];
  selectedHotDogs: MenuSelection[];
  dietaryOptions: DietaryOptions;
  includeDesserts: boolean;
  selectedDesserts: MenuSelection[];
  pricingBreakdown: {
    cateringSubtotal: number;
    dessertCost: number;
    gratuity: number;
    travelFee: number;
    total: number;
  } | null;
}

export const initialFormData: CateringOrderFormData = {
  packageType: 'simple',
  guestCount: 50,
  eventName: '',
  eventDate: null,
  eventTime: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  deliveryAddress: {
    street: '',
    city: '',
    state: 'NJ',
    zip: '',
  },
  distanceMiles: 0,
  selectedSandwiches: [],
  selectedHotDogs: [],
  dietaryOptions: {
    glutenFreeCount: 0,
    veganCount: 0,
    specialNotes: '',
  },
  includeDesserts: false,
  selectedDesserts: [],
  pricingBreakdown: null,
};
