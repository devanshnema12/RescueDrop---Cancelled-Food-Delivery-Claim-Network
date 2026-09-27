export type PlatformType = 'zomato' | 'swiggy' | 'all';

export type DietaryType = 'all' | 'veg' | 'non-veg';

export type UserRole = 'foodie' | 'rider' | 'restaurant';

export type ClaimType = 'pickup' | 'micro_delivery' | 'donate_shelter';

export interface OrderItem {
  name: string;
  quantity: number;
  isVeg: boolean;
  portionNotes?: string;
}

export interface CancelledOrder {
  id: string;
  orderNumber: string;
  platform: 'zomato' | 'swiggy';
  restaurantName: string;
  rating: number; // e.g. 4.4
  ratingCount: number; // e.g. 1420
  cuisine: string;
  restaurantAddress: string;
  distanceKm: number;
  locationArea: string;
  items: OrderItem[];
  originalPrice: number;
  rescuePrice: number;
  discountPercentage: number;
  cancellationReason: string;
  cancelledAgoMins: number; // e.g. 3 mins ago
  expiryTimeSeconds: number; // countdown remaining (e.g. 720 secs = 12 mins)
  tamperSealIntact: boolean;
  temperature: 'piping_hot' | 'warm_packed' | 'chilled';
  imageUrl: string;
  dietary: 'veg' | 'non-veg';
  riderBonusIncentive: number; // for delivery partners (e.g. ₹35 bonus)
  claimed: boolean;
  claimedBy?: string;
  claimCode?: string;
  claimType?: ClaimType;
  claimedAt?: string;
  deliveryEstimateMins?: number;
  coordinates: {
    latOffset: number; // relative for canvas/radar display (-100 to +100)
    lngOffset: number;
  };
}

export interface FilterState {
  platform: PlatformType;
  dietary: DietaryType;
  maxDistance: number; // in km
  minDiscount: number; // in %
  searchQuery: string;
  sortBy: 'distance' | 'discount' | 'expiry' | 'price' | 'rating';
}

export interface RescueStats {
  mealsRescued: number;
  kgFoodSaved: number;
  co2PreventedKg: number;
  moneySavedInr: number;
}
