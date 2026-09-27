import React, { useState, useMemo } from 'react';
import { CancelledOrder, FilterState, UserRole, ClaimType, RescueStats } from './types/rescue';
import { INITIAL_ORDERS, INITIAL_STATS } from './data/mockCancelledOrders';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { OrderCard } from './components/OrderCard';
import { RadarMap } from './components/RadarMap';
import { ClaimModal } from './components/ClaimModal';
import { ClaimPassModal } from './components/ClaimPassModal';
import { BroadcastModal } from './components/BroadcastModal';
import { ImpactTracker } from './components/ImpactTracker';
import { MyClaimsView } from './components/MyClaimsView';
import { LiveDropsTicker } from './components/LiveDropsTicker';
import { playOrderDropChime, playClaimSuccessSound, playTapSound } from './utils/audio';
import { ShieldCheck, Sparkles, AlertCircle, Compass, CheckCircle2, Bike } from 'lucide-react';

export default function App() {
  const [orders, setOrders] = useState<CancelledOrder[]>(INITIAL_ORDERS);
  const [claims, setClaims] = useState<CancelledOrder[]>([]);
  const [stats, setStats] = useState<RescueStats>(INITIAL_STATS);

  const [currentTab, setCurrentTab] = useState<'feed' | 'radar' | 'impact' | 'my-claims'>('feed');
  const [userRole, setUserRole] = useState<UserRole>('foodie');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Bengaluru - Koramangala / HSR');

  // Modals state
  const [selectedOrderForClaim, setSelectedOrderForClaim] = useState<CancelledOrder | null>(null);
  const [selectedOrderForPass, setSelectedOrderForPass] = useState<CancelledOrder | null>(null);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  // Toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    platform: 'all',
    dietary: 'all',
    maxDistance: 4.0,
    minDiscount: 50,
    searchQuery: '',
    sortBy: 'distance'
  });

  // Filter & sort logic
  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        if (o.claimed) return false;
        if (filter.platform !== 'all' && o.platform !== filter.platform) return false;
        if (filter.dietary !== 'all' && o.dietary !== filter.dietary) return false;
        if (o.distanceKm > filter.maxDistance) return false;
        if (filter.searchQuery.trim() !== '') {
          const q = filter.searchQuery.toLowerCase();
          const matchRestaurant = o.restaurantName.toLowerCase().includes(q);
          const matchCuisine = o.cuisine.toLowerCase().includes(q);
          const matchArea = o.locationArea.toLowerCase().includes(q);
          const matchItems = o.items.some((i) => i.name.toLowerCase().includes(q));
          if (!matchRestaurant && !matchCuisine && !matchArea && !matchItems) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'distance') return a.distanceKm - b.distanceKm;
        if (filter.sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (filter.sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
        if (filter.sortBy === 'expiry') return a.expiryTimeSeconds - b.expiryTimeSeconds;
        if (filter.sortBy === 'price') return a.rescuePrice - b.rescuePrice;
        return 0;
      });
  }, [orders, filter]);

  // Handle claim trigger
  const handleOpenClaim = (order: CancelledOrder) => {
    if (soundEnabled) playTapSound();
    setSelectedOrderForClaim(order);
  };

  // Handle confirm claim
  const handleConfirmClaim = (
    order: CancelledOrder,
    claimType: ClaimType,
    details: { customerName: string; phone: string; address: string }
  ) => {
    if (soundEnabled) playClaimSuccessSound();

    const claimCode = String(Math.floor(1000 + Math.random() * 9000));
    const claimedOrder: CancelledOrder = {
      ...order,
      claimed: true,
      claimCode,
      claimType,
      claimedBy: details.customerName,
      claimedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update orders list
    setOrders((prev) => prev.map((o) => (o.id === order.id ? claimedOrder : o)));
    setClaims((prev) => [claimedOrder, ...prev]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      mealsRescued: prev.mealsRescued + 1,
      kgFoodSaved: +(prev.kgFoodSaved + 0.85).toFixed(1),
      co2PreventedKg: +(prev.co2PreventedKg + 2.1).toFixed(1),
      moneySavedInr: prev.moneySavedInr + (order.originalPrice - order.rescuePrice)
    }));

    setSelectedOrderForClaim(null);
    setSelectedOrderForPass(claimedOrder);

    showToast(`Claim confirmed! OTP: ${claimCode} generated for ${order.restaurantName}`);
  };

  // Handle broadcast from modal
  const handleBroadcast = (newOrder: CancelledOrder) => {
    if (soundEnabled) playOrderDropChime();
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`⚡ New cancelled order dropped at ${newOrder.restaurantName}! (${newOrder.discountPercentage}% OFF)`);
  };

  // Handle simulate fresh drop
  const handleSimulateDrop = () => {
    if (soundEnabled) playOrderDropChime();

    const sampleSimulations = [
      {
        restaurantName: 'Behrouz Biryani Royale',
        rating: 4.5,
        ratingCount: 2950,
        cuisine: 'Royal Mughlai Biryani',
        locationArea: 'Koramangala 4th Block',
        items: [{ name: 'Dum Gosht Biryani (Serves 2)', quantity: 1, isVeg: false, portionNotes: 'With Gulab Jamun & Mirchi Salan' }],
        originalPrice: 620,
        rescuePrice: 180,
        discountPercentage: 71,
        cancellationReason: 'Customer mistakenly placed order to wrong branch, cancelled 4m post-dum preparation.',
        dietary: 'non-veg' as const,
        platform: 'zomato' as const,
        imageUrl: '/src/assets/images/food_biryani_pot_1790485807743.jpg'
      },
      {
        restaurantName: 'Truffles Bistro',
        rating: 4.7,
        ratingCount: 5120,
        cuisine: 'American Burgers & Steaks',
        locationArea: 'St. Marks Road CBD',
        items: [{ name: 'All American Cheese Burger + Fries', quantity: 1, isVeg: false, portionNotes: 'Freshly grilled patty & jalapeno mayo' }],
        originalPrice: 480,
        rescuePrice: 135,
        discountPercentage: 72,
        cancellationReason: 'Customer gate passcode did not work, phone switched off.',
        dietary: 'non-veg' as const,
        platform: 'swiggy' as const,
        imageUrl: '/src/assets/images/food_artisan_burger_fries_1790485852822.jpg'
      },
      {
        restaurantName: 'Nagarjuna Andhra Style',
        rating: 4.4,
        ratingCount: 3410,
        cuisine: 'Pure Veg Andhra Meals',
        locationArea: 'Residency Road',
        items: [{ name: 'Paneer Sholay Kebab & Biryani Combo', quantity: 1, isVeg: true, portionNotes: 'Gunpowder rice & curd included' }],
        originalPrice: 450,
        rescuePrice: 125,
        discountPercentage: 72,
        cancellationReason: 'Rider met flat tire near brigade road; hot order reassigned for nearby customer pickup.',
        dietary: 'veg' as const,
        platform: 'zomato' as const,
        imageUrl: '/src/assets/images/food_paneer_tikka_platter_1790485838214.jpg'
      }
    ];

    const pick = sampleSimulations[Math.floor(Math.random() * sampleSimulations.length)];
    const simOrder: CancelledOrder = {
      id: `sim-${Date.now()}`,
      orderNumber: `${pick.platform === 'zomato' ? 'ZOM' : 'SWG'}-${Math.floor(10000 + Math.random() * 90000)}`,
      platform: pick.platform,
      restaurantName: pick.restaurantName,
      rating: pick.rating,
      ratingCount: pick.ratingCount,
      cuisine: pick.cuisine,
      restaurantAddress: `${pick.locationArea}, Bengaluru`,
      distanceKm: +(0.7 + Math.random() * 1.8).toFixed(1),
      locationArea: pick.locationArea,
      items: pick.items,
      originalPrice: pick.originalPrice,
      rescuePrice: pick.rescuePrice,
      discountPercentage: pick.discountPercentage,
      cancellationReason: pick.cancellationReason,
      cancelledAgoMins: 1,
      expiryTimeSeconds: 780,
      tamperSealIntact: true,
      temperature: 'piping_hot',
      imageUrl: pick.imageUrl,
      dietary: pick.dietary,
      riderBonusIncentive: 45,
      claimed: false,
      coordinates: {
        latOffset: Math.floor((Math.random() - 0.5) * 80),
        lngOffset: Math.floor((Math.random() - 0.5) * 80)
      }
    };

    setOrders((prev) => [simOrder, ...prev]);
    showToast(`⚡ Alert: Just cancelled at ${simOrder.restaurantName}! Available for ₹${simOrder.rescuePrice}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col">
      
      {/* App Top Bar Contract */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenBroadcast={() => setIsBroadcastOpen(true)}
        claimedCount={claims.length}
      />

      {/* Real-time Drops Alert Ticker */}
      <LiveDropsTicker onSimulateDrop={handleSimulateDrop} />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-800 flex items-center gap-3 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
          <p className="text-xs font-semibold">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* TAB 1: Live Feed View */}
        {currentTab === 'feed' && (
          <div className="space-y-6">
            
            {/* Hero Explainer & Quick Action Banner */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-stone-800">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-Time Cancelled Food Rescue Network</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Hot meals prepared, cancelled mid-way. Rescued by you at 70% OFF.
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  When a Zomato or Swiggy order gets cancelled after cooking, we immediately broadcast it to nearby foodies and delivery partners before it goes to waste. Sealed & verified.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  onClick={() => setCurrentTab('radar')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Open Radar Scanner</span>
                </button>
                <button
                  onClick={handleSimulateDrop}
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>⚡ Simulate Cancellation</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              totalCount={filteredOrders.length}
            />

            {/* Orders Grid */}
            {filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onClaim={handleOpenClaim}
                    userRole={userRole}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
                <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="text-base font-bold text-stone-900">
                  No active cancelled meals match your filter
                </h3>
                <p className="text-xs text-stone-500">
                  Try broadening your distance slider or resetting dietary preference.
                </p>
                <button
                  onClick={() =>
                    setFilter({
                      platform: 'all',
                      dietary: 'all',
                      maxDistance: 5.0,
                      minDiscount: 50,
                      searchQuery: '',
                      sortBy: 'distance'
                    })
                  }
                  className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: Geo Radar Map View */}
        {currentTab === 'radar' && (
          <div className="space-y-6">
            <RadarMap
              orders={orders}
              onSelectOrder={handleOpenClaim}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        )}

        {/* TAB 3: Green Impact View */}
        {currentTab === 'impact' && <ImpactTracker stats={stats} />}

        {/* TAB 4: My Claims View */}
        {currentTab === 'my-claims' && (
          <MyClaimsView
            claims={claims}
            onOpenPass={(order) => setSelectedOrderForPass(order)}
            onExplore={() => setCurrentTab('feed')}
          />
        )}

      </main>

      {/* Claim Confirmation Modal */}
      <ClaimModal
        order={selectedOrderForClaim}
        isOpen={Boolean(selectedOrderForClaim)}
        onClose={() => setSelectedOrderForClaim(null)}
        onConfirmClaim={handleConfirmClaim}
        userRole={userRole}
      />

      {/* Digital Pickup Pass & OTP Modal */}
      <ClaimPassModal
        order={selectedOrderForPass}
        isOpen={Boolean(selectedOrderForPass)}
        onClose={() => setSelectedOrderForPass(null)}
      />

      {/* Broadcast Cancelled Order Modal */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        onBroadcast={handleBroadcast}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="font-bold text-white">RescueDrop</span>
            <span>·</span>
            <span>Zomato Food Rescue & Swiggy GreenBite Claim Network</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Official Zero-Waste Initiative</span>
            <span>·</span>
            <span>FSSAI Certified Packaging Seals</span>
            <span>·</span>
            <span>Verified Cloud Kitchen Network</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
