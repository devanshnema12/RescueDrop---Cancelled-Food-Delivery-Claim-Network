import React, { useState } from 'react';
import { CancelledOrder, ClaimType, UserRole } from '../types/rescue';
import { X, ShieldCheck, MapPin, Footprints, Bike, HeartHandshake, CheckCircle2, QrCode } from 'lucide-react';

interface ClaimModalProps {
  order: CancelledOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmClaim: (order: CancelledOrder, claimType: ClaimType, details: { customerName: string; phone: string; address: string }) => void;
  userRole: UserRole;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  order,
  isOpen,
  onClose,
  onConfirmClaim,
  userRole
}) => {
  if (!isOpen || !order) return null;

  const [claimType, setClaimType] = useState<ClaimType>(
    userRole === 'rider' ? 'micro_delivery' : 'pickup'
  );
  const [customerName, setCustomerName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('+91 98450 12890');
  const [address, setAddress] = useState('Flat 402, Sunshine Apts, 5th Cross, Koramangala');
  const [agreedToSealCheck, setAgreedToSealCheck] = useState(true);

  const deliveryFee = claimType === 'micro_delivery' ? 20 : 0;
  const donationDiscount = claimType === 'donate_shelter' ? Math.max(0, order.rescuePrice - 30) : order.rescuePrice;
  const finalPrice = claimType === 'donate_shelter' ? 99 : order.rescuePrice + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToSealCheck) {
      alert('Please confirm that you will inspect the tamper-proof packaging seal at pickup.');
      return;
    }
    onConfirmClaim(order, claimType, { customerName, phone, address });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  order.platform === 'zomato' ? 'bg-rose-600' : 'bg-orange-500'
                }`}
              >
                {order.platform === 'zomato' ? 'Zomato Food Rescue' : 'Swiggy GreenBite'}
              </span>
              <span className="text-xs text-amber-400 font-mono">#{order.orderNumber}</span>
            </div>
            <h2 className="text-lg font-bold mt-1 text-white">
              Claim Cancelled Meal · {order.restaurantName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Order Summary Snapshot */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{order.restaurantAddress}</span>
              </span>
              <span className="font-mono text-stone-800 font-bold">{order.distanceKm} km away</span>
            </div>
            <div className="text-xs text-stone-700 divide-y divide-stone-200/60 pt-1">
              {order.items.map((it, idx) => (
                <div key={idx} className="py-1 flex items-center justify-between">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="text-[11px] text-stone-500">{it.isVeg ? '🟢 Pure Veg' : '🔴 Non-Veg'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rescue Method Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Choose Rescue Method:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              {/* Option 1: Walk-in Pickup */}
              <button
                type="button"
                onClick={() => setClaimType('pickup')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  claimType === 'pickup'
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Footprints className={`w-4 h-4 ${claimType === 'pickup' ? 'text-amber-600' : 'text-stone-500'}`} />
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">FREE</span>
                  </div>
                  <div className="font-bold text-xs text-stone-900 mt-2">Self Pickup</div>
                  <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Pick up at restaurant counter in 15 mins
                  </div>
                </div>
              </button>

              {/* Option 2: Flash Micro Delivery */}
              <button
                type="button"
                onClick={() => setClaimType('micro_delivery')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  claimType === 'micro_delivery'
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Bike className={`w-4 h-4 ${claimType === 'micro_delivery' ? 'text-amber-600' : 'text-stone-500'}`} />
                    <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">+₹20</span>
                  </div>
                  <div className="font-bold text-xs text-stone-900 mt-2">Flash Delivery</div>
                  <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Rider drops off at your door in 12 mins
                  </div>
                </div>
              </button>

              {/* Option 3: Donate to Shelter */}
              <button
                type="button"
                onClick={() => setClaimType('donate_shelter')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  claimType === 'donate_shelter'
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <HeartHandshake className={`w-4 h-4 ${claimType === 'donate_shelter' ? 'text-rose-600' : 'text-stone-500'}`} />
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">NGO</span>
                  </div>
                  <div className="font-bold text-xs text-stone-900 mt-2">Feed Shelter</div>
                  <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Direct to Robin Hood Army / Feeding India
                  </div>
                </div>
              </button>

            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number (for Claim OTP)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {claimType === 'micro_delivery' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery Drop Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Street, Apartment, Gate Number"
                />
              </div>
            )}
          </div>

          {/* Tamper Seal & Anti-Waste Policy Checklist */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="seal-agree"
              checked={agreedToSealCheck}
              onChange={(e) => setAgreedToSealCheck(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="seal-agree" className="text-xs text-stone-600 leading-snug cursor-pointer">
              I understand this is a freshly prepared, cancelled order with an intact tamper-evident seal. I agree to show my 4-digit verification OTP upon pickup.
            </label>
          </div>

          {/* Pricing Calculation */}
          <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Original Restaurant Price:</span>
              <span className="line-through tabular-nums">₹{order.originalPrice}</span>
            </div>
            <div className="flex justify-between font-semibold text-stone-800">
              <span>Rescue Drop Price ({order.discountPercentage}% OFF):</span>
              <span className="tabular-nums">₹{order.rescuePrice}</span>
            </div>
            {claimType === 'micro_delivery' && (
              <div className="flex justify-between text-stone-600">
                <span>Rider Micro-Delivery Fee:</span>
                <span className="tabular-nums">+₹20</span>
              </div>
            )}
            {claimType === 'donate_shelter' && (
              <div className="flex justify-between text-rose-600 font-semibold">
                <span>Subsidized NGO Rescue Rate:</span>
                <span className="tabular-nums">₹99 fixed</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-stone-900 border-t border-stone-200 pt-2">
              <span>Total Payable at Pickup / Online:</span>
              <span className="text-base text-amber-600 tabular-nums">₹{finalPrice}</span>
            </div>
          </div>

          {/* Submit Claim Button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Generate Pickup Pass</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
