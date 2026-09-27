import React from 'react';
import { CancelledOrder } from '../types/rescue';
import { QrCode, MapPin, Footprints, Bike, HeartHandshake, CheckCircle2, Clock } from 'lucide-react';

interface MyClaimsViewProps {
  claims: CancelledOrder[];
  onOpenPass: (order: CancelledOrder) => void;
  onExplore: () => void;
}

export const MyClaimsView: React.FC<MyClaimsViewProps> = ({
  claims,
  onOpenPass,
  onExplore
}) => {
  if (claims.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm my-8">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center text-2xl mb-4">
          🍱
        </div>
        <h3 className="text-xl font-bold text-stone-900">No active meal claims yet</h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-xs mx-auto leading-relaxed">
          When you rescue a cancelled meal from Zomato or Swiggy, your digital OTP and pickup verification passes will appear here.
        </p>
        <button
          onClick={onExplore}
          className="mt-6 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-sm"
        >
          Explore Live Cancelled Drops
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
          My Rescued Meals & Pickup Passes
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Show your 4-digit OTP or QR code at the restaurant counter for instant handover.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {claims.map((order) => {
          const isZomato = order.platform === 'zomato';
          return (
            <div
              key={order.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-stone-300 transition-colors"
            >
              {/* Card top */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${
                        isZomato ? 'bg-[#E23744]' : 'bg-[#FC8019]'
                      }`}
                    >
                      {isZomato ? 'Zomato' : 'Swiggy'}
                    </span>
                    <span className="text-xs font-mono text-stone-500">#{order.orderNumber}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mt-1">
                    {order.restaurantName}
                  </h3>
                  <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{order.restaurantAddress}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                    OTP: {order.claimCode || '8429'}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    Paid ₹{order.rescuePrice}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 text-xs text-stone-700 divide-y divide-stone-200/50">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-1 flex items-center justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status info */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  {order.claimType === 'micro_delivery' ? (
                    <>
                      <Bike className="w-4 h-4 text-sky-600" />
                      <span>Flash Rider Delivery</span>
                    </>
                  ) : order.claimType === 'donate_shelter' ? (
                    <>
                      <HeartHandshake className="w-4 h-4 text-rose-600" />
                      <span>En route to Shelter</span>
                    </>
                  ) : (
                    <>
                      <Footprints className="w-4 h-4 text-amber-600" />
                      <span>Self Counter Pickup</span>
                    </>
                  )}
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Claim Confirmed</span>
                </span>
              </div>

              {/* Pass view action */}
              <button
                onClick={() => onOpenPass(order)}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Open Digital Pickup Pass & QR</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
