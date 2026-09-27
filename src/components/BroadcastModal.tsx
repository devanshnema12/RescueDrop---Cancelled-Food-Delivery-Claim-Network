import React, { useState } from 'react';
import { CancelledOrder } from '../types/rescue';
import { X, Send, Store, AlertCircle, Sparkles } from 'lucide-react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcast: (newOrder: CancelledOrder) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  onBroadcast
}) => {
  if (!isOpen) return null;

  const [platform, setPlatform] = useState<'zomato' | 'swiggy'>('zomato');
  const [restaurantName, setRestaurantName] = useState('Empire Restaurant');
  const [cuisine, setCuisine] = useState('Mughlai & Biryani');
  const [locationArea, setLocationArea] = useState('Indiranagar 100ft Road');
  const [itemName, setItemName] = useState('Chicken Biryani + Guntur Chicken');
  const [dietary, setDietary] = useState<'veg' | 'non-veg'>('non-veg');
  const [originalPrice, setOriginalPrice] = useState(540);
  const [rescuePrice, setRescuePrice] = useState(160);
  const [cancellationReason, setCancellationReason] = useState(
    'Customer cancelled 5 minutes post-prep due to delayed rain traffic'
  );

  const handlePriceChange = (orig: number) => {
    setOriginalPrice(orig);
    setRescuePrice(Math.round(orig * 0.3)); // 70% off default
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const discountPercentage = Math.round(
      ((originalPrice - rescuePrice) / originalPrice) * 100
    );

    const randomId = `ord-broadcast-${Date.now()}`;
    const orderNumber = `${platform === 'zomato' ? 'ZOM' : 'SWG'}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    const newOrder: CancelledOrder = {
      id: randomId,
      orderNumber,
      platform,
      restaurantName,
      rating: 4.4,
      ratingCount: 1250,
      cuisine,
      restaurantAddress: `${locationArea}, Bengaluru`,
      distanceKm: +(0.6 + Math.random() * 1.5).toFixed(1),
      locationArea,
      items: [
        {
          name: itemName,
          quantity: 1,
          isVeg: dietary === 'veg',
          portionNotes: 'Freshly packed in kitchen container'
        }
      ],
      originalPrice,
      rescuePrice,
      discountPercentage,
      cancellationReason,
      cancelledAgoMins: 1,
      expiryTimeSeconds: 840, // 14 mins
      tamperSealIntact: true,
      temperature: 'piping_hot',
      imageUrl:
        dietary === 'veg'
          ? '/src/assets/images/food_paneer_tikka_platter_1790485838214.jpg'
          : '/src/assets/images/food_biryani_pot_1790485807743.jpg',
      dietary,
      riderBonusIncentive: 40,
      claimed: false,
      coordinates: {
        latOffset: Math.floor((Math.random() - 0.5) * 80),
        lngOffset: Math.floor((Math.random() - 0.5) * 80)
      }
    };

    onBroadcast(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">Broadcast Cancelled Order</h2>
              <p className="text-xs text-stone-400">
                Notify hungry foodies & nearby riders before food cools
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Platform Toggle */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Source Delivery App:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPlatform('zomato')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  platform === 'zomato'
                    ? 'bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#E23744]"></span>
                <span>Zomato Food Rescue</span>
              </button>
              <button
                type="button"
                onClick={() => setPlatform('swiggy')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  platform === 'swiggy'
                    ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500'
                    : 'border-stone-200 text-stone-600 hover:border-stone-300'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#FC8019]"></span>
                <span>Swiggy GreenBite</span>
              </button>
            </div>
          </div>

          {/* Restaurant & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                required
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Location Area
              </label>
              <input
                type="text"
                value={locationArea}
                onChange={(e) => setLocationArea(e.target.value)}
                required
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Items & Dietary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Food Dish / Box Items
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. 1x Butter Paneer, 2x Naan"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Dietary
              </label>
              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value as 'veg' | 'non-veg')}
                className="w-full text-xs px-2.5 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="veg">🟢 Pure Veg</option>
                <option value="non-veg">🔴 Non-Veg</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Original Price (₹)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                min="50"
                required
                className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Rescue Price (60-80% off)
              </label>
              <input
                type="number"
                value={rescuePrice}
                onChange={(e) => setRescuePrice(Number(e.target.value))}
                min="20"
                required
                className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono font-bold text-amber-600"
              />
            </div>
          </div>

          {/* Cancellation Reason */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Cancellation Reason (Transparency)
            </label>
            <input
              type="text"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="text-[11px] text-stone-500 flex items-start gap-1.5 pt-1">
            <AlertCircle className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span>
              Broadcasting will immediately transmit a high-priority geo-alert to nearby app users within 3.5 km.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2 px-3 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Cancelled Meal</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
