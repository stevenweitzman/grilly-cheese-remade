// Types for catering order flow

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

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface CateringOrderFormData {
  // Step 1: Package Selection
  packageType: 'simple' | 'full';
  guestCount: number;
  
  // Step 2: Event Details
  eventName: string;
  eventDate: Date | null;
  eventTime: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  deliveryAddress: DeliveryAddress;
  distanceMiles: number;
  
  // Step 3: Menu Options
  selectedSandwiches: MenuSelection[];
  selectedHotDogs: MenuSelection[];
  dietaryOptions: DietaryOptions;
  includeDesserts: boolean;
  selectedDesserts: MenuSelection[];
  
  // Calculated values
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

export type OrderStep = 1 | 2 | 3 | 4 | 5;

export const ORDER_STEPS = [
  { step: 1, label: 'Package', description: 'Choose your package' },
  { step: 2, label: 'Event Details', description: 'Event information' },
  { step: 3, label: 'Menu', description: 'Select menu items' },
  { step: 4, label: 'Review', description: 'Review your order' },
  { step: 5, label: 'Payment', description: 'Complete payment' },
] as const;
