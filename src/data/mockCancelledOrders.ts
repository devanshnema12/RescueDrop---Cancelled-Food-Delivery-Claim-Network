import { CancelledOrder } from '../types/rescue';

export const INITIAL_ORDERS: CancelledOrder[] = [
  {
    id: 'ord-res-101',
    orderNumber: 'ZOM-74921',
    platform: 'zomato',
    restaurantName: 'Meghana Foods',
    rating: 4.5,
    ratingCount: 3820,
    cuisine: 'Andhra Biryani & Starters',
    restaurantAddress: '124, 1st Block, Koramangala, Bengaluru',
    distanceKm: 0.8,
    locationArea: 'Koramangala 1st Block',
    items: [
      { name: 'Special Chicken Biryani (Family Pack)', quantity: 1, isVeg: false, portionNotes: 'Serves 2-3, spicy mirchi ka salan & raita included' },
      { name: 'Paneer 65 Hot Crispy Bites', quantity: 1, isVeg: true, portionNotes: 'Tossed with curry leaves & green chillies' }
    ],
    originalPrice: 680,
    rescuePrice: 199,
    discountPercentage: 71,
    cancellationReason: 'Customer phone unreachable after 4 calls at society gate; delivery rider waited 12 mins.',
    cancelledAgoMins: 4,
    expiryTimeSeconds: 680, // ~11 mins remaining
    tamperSealIntact: true,
    temperature: 'piping_hot',
    imageUrl: '/src/assets/images/food_biryani_pot_1790485807743.jpg',
    dietary: 'non-veg',
    riderBonusIncentive: 45,
    claimed: false,
    coordinates: {
      latOffset: 25,
      lngOffset: -30
    }
  },
  {
    id: 'ord-res-102',
    orderNumber: 'SWG-88319',
    platform: 'swiggy',
    restaurantName: 'Punjab Grill Royale',
    rating: 4.4,
    ratingCount: 2190,
    cuisine: 'North Indian & Mughlai',
    restaurantAddress: '80 Feet Road, Indiranagar, Bengaluru',
    distanceKm: 1.4,
    locationArea: 'Indiranagar 12th Main',
    items: [
      { name: 'Murgh Makhani (Butter Chicken)', quantity: 1, isVeg: false, portionNotes: 'Rich cashew gravy with tandoori pulled chicken' },
      { name: 'Garlic Butter Naan (2 pcs)', quantity: 1, isVeg: true, portionNotes: 'Clay oven baked with fresh coriander' },
      { name: 'Jeera Rice Bowl', quantity: 1, isVeg: true }
    ],
    originalPrice: 590,
    rescuePrice: 165,
    discountPercentage: 72,
    cancellationReason: 'Customer mistakenly selected old home address (Whitefield) instead of office address.',
    cancelledAgoMins: 6,
    expiryTimeSeconds: 540, // 9 mins remaining
    tamperSealIntact: true,
    temperature: 'piping_hot',
    imageUrl: '/src/assets/images/food_butter_chicken_naan_1790485821968.jpg',
    dietary: 'non-veg',
    riderBonusIncentive: 40,
    claimed: false,
    coordinates: {
      latOffset: -45,
      lngOffset: 35
    }
  },
  {
    id: 'ord-res-103',
    orderNumber: 'ZOM-90241',
    platform: 'zomato',
    restaurantName: 'Udupi Krishna Grand',
    rating: 4.3,
    ratingCount: 1640,
    cuisine: 'Pure Veg Tandoori & South Indian',
    restaurantAddress: '27th Main, Sector 1, HSR Layout, Bengaluru',
    distanceKm: 2.1,
    locationArea: 'HSR Layout Sector 1',
    items: [
      { name: 'Tandoori Malai Paneer Tikka (8 pcs)', quantity: 1, isVeg: true, portionNotes: 'Smoked marinated cottage cheese with mint chutney' },
      { name: 'Stuffed Kulcha with Chole', quantity: 2, isVeg: true },
      { name: 'Gulab Jamun (2 pcs)', quantity: 1, isVeg: true }
    ],
    originalPrice: 460,
    rescuePrice: 120,
    discountPercentage: 74,
    cancellationReason: 'Order cancelled by customer due to sudden meeting travel reschedule.',
    cancelledAgoMins: 8,
    expiryTimeSeconds: 430, // 7 mins remaining
    tamperSealIntact: true,
    temperature: 'piping_hot',
    imageUrl: '/src/assets/images/food_paneer_tikka_platter_1790485838214.jpg',
    dietary: 'veg',
    riderBonusIncentive: 35,
    claimed: false,
    coordinates: {
      latOffset: -65,
      lngOffset: -50
    }
  },
  {
    id: 'ord-res-104',
    orderNumber: 'SWG-55102',
    platform: 'swiggy',
    restaurantName: "Leon's Burgers & Wings",
    rating: 4.6,
    ratingCount: 4210,
    cuisine: 'Gourmet American Burgers',
    restaurantAddress: 'Church Street, Central Business District, Bengaluru',
    distanceKm: 2.8,
    locationArea: 'Church Street CBD',
    items: [
      { name: 'Crispy Smashed Double Cheeseburger', quantity: 1, isVeg: false, portionNotes: 'Loaded cheddar, caramelized onions, secret sauce' },
      { name: 'Peri Peri Masala Crinkle Fries', quantity: 1, isVeg: true },
      { name: 'Chocolate Thick Shake', quantity: 1, isVeg: true }
    ],
    originalPrice: 520,
    rescuePrice: 145,
    discountPercentage: 72,
    cancellationReason: 'Accidental double payment submission by user; duplicate order cancelled after packing.',
    cancelledAgoMins: 3,
    expiryTimeSeconds: 740, // ~12 mins remaining
    tamperSealIntact: true,
    temperature: 'warm_packed',
    imageUrl: '/src/assets/images/food_artisan_burger_fries_1790485852822.jpg',
    dietary: 'non-veg',
    riderBonusIncentive: 50,
    claimed: false,
    coordinates: {
      latOffset: 60,
      lngOffset: 45
    }
  },
  {
    id: 'ord-res-105',
    orderNumber: 'ZOM-41883',
    platform: 'zomato',
    restaurantName: 'Anand Sweets & Chaat',
    rating: 4.2,
    ratingCount: 1890,
    cuisine: 'Pure Veg Delicacies & Chaat',
    restaurantAddress: 'Commercial Street, Tasker Town, Bengaluru',
    distanceKm: 3.2,
    locationArea: 'Commercial Street',
    items: [
      { name: 'Dahi Puri & Raj Kachori Platter', quantity: 1, isVeg: true, portionNotes: 'Sweet & tangy tamarind curd delight' },
      { name: 'Chole Bhature Deluxe (2 pcs)', quantity: 1, isVeg: true, portionNotes: 'Hot puffed bhature with spiced rawalpindi chole' },
      { name: 'Kesari Rabdi Jalebi (100g)', quantity: 1, isVeg: true }
    ],
    originalPrice: 420,
    rescuePrice: 110,
    discountPercentage: 74,
    cancellationReason: 'Delivery rider got flat tire near signal; kitchen repacked fresh for fast nearby pickup.',
    cancelledAgoMins: 7,
    expiryTimeSeconds: 490,
    tamperSealIntact: true,
    temperature: 'piping_hot',
    imageUrl: '/src/assets/images/food_paneer_tikka_platter_1790485838214.jpg',
    dietary: 'veg',
    riderBonusIncentive: 35,
    claimed: false,
    coordinates: {
      latOffset: 15,
      lngOffset: 70
    }
  }
];

export const CITY_LOCATIONS = [
  { name: 'Bengaluru - Koramangala / HSR', city: 'Bengaluru', activeRescues: 18 },
  { name: 'Bengaluru - Indiranagar / CBD', city: 'Bengaluru', activeRescues: 14 },
  { name: 'Mumbai - Bandra / Khar West', city: 'Mumbai', activeRescues: 22 },
  { name: 'Delhi NCR - Cyber Hub & Connaught Place', city: 'Delhi NCR', activeRescues: 29 },
  { name: 'Hyderabad - Madhapur / Hitech City', city: 'Hyderabad', activeRescues: 16 }
];

export const INITIAL_STATS = {
  mealsRescued: 14280,
  kgFoodSaved: 7850,
  co2PreventedKg: 19625,
  moneySavedInr: 3420000
};
