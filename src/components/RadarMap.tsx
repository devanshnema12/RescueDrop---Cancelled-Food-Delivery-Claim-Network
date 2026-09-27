import React, { useState } from 'react';
import { CancelledOrder } from '../types/rescue';
import { Navigation, Compass, MapPin, Zap, Flame, ShieldAlert, ArrowRight, Star } from 'lucide-react';

interface RadarMapProps {
  orders: CancelledOrder[];
  onSelectOrder: (order: CancelledOrder) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const RadarMap: React.FC<RadarMapProps> = ({
  orders,
  onSelectOrder,
  selectedCity,
  setSelectedCity
}) => {
  const [activePin, setActivePin] = useState<CancelledOrder | null>(orders[0] || null);
  const activeOrders = orders.filter((o) => !o.claimed);

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 text-stone-100 shadow-xl overflow-hidden">
      {/* Header of Radar Map */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Live Geo-Radar: Cancelled Meal Scanner
            </h2>
          </div>
          <p className="text-xs text-stone-400 mt-0.5">
            Scanning 3.5 km radius around your location for freshly abandoned orders
          </p>
        </div>

        {/* Location Selector */}
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-stone-800 text-stone-200 border border-stone-700 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="Bengaluru - Koramangala / HSR">Bengaluru - Koramangala / HSR</option>
            <option value="Bengaluru - Indiranagar / CBD">Bengaluru - Indiranagar / CBD</option>
            <option value="Mumbai - Bandra / Khar West">Mumbai - Bandra / Khar West</option>
            <option value="Delhi NCR - Cyber Hub & CP">Delhi NCR - Cyber Hub & CP</option>
            <option value="Hyderabad - Madhapur / Hitech">Hyderabad - Madhapur / Hitech</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Radar Screen on Left, Active Selection on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        
        {/* Radar View Container */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-stone-950 border-2 border-stone-800 shadow-inner flex items-center justify-center overflow-hidden">
            
            {/* Concentric distance rings */}
            <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-stone-800/80 pointer-events-none flex items-start justify-center pt-1">
              <span className="text-[10px] text-stone-500 font-mono">3.0 km</span>
            </div>
            <div className="absolute w-[60%] h-[60%] rounded-full border border-stone-800/90 pointer-events-none flex items-start justify-center pt-1">
              <span className="text-[10px] text-stone-500 font-mono">2.0 km</span>
            </div>
            <div className="absolute w-[35%] h-[35%] rounded-full border border-stone-800/90 pointer-events-none flex items-start justify-center pt-1">
              <span className="text-[10px] text-stone-500 font-mono">1.0 km</span>
            </div>

            {/* Crosshair grid lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-stone-800/60"></div>
              <div className="h-full w-px bg-stone-800/60 absolute"></div>
            </div>

            {/* Radar sweep beam animation */}
            <div
              className="absolute w-full h-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 290deg, rgba(245, 158, 11, 0.08) 330deg, rgba(245, 158, 11, 0.25) 360deg)',
                animation: 'spin 6s linear infinite'
              }}
            ></div>

            {/* User Center Pulse */}
            <div className="relative z-10 w-5 h-5 rounded-full bg-sky-500 border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              <div className="absolute w-12 h-12 rounded-full border border-sky-400/40 animate-ping pointer-events-none"></div>
            </div>

            {/* Active order pins on radar */}
            {activeOrders.map((order) => {
              // Convert coordinates to CSS position percentage (center is 50%, 50%)
              const leftPercent = 50 + order.coordinates.lngOffset * 0.4;
              const topPercent = 50 + order.coordinates.latOffset * 0.4;
              const isSelected = activePin?.id === order.id;
              const isZomato = order.platform === 'zomato';

              return (
                <button
                  key={order.id}
                  onClick={() => setActivePin(order)}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute z-20 group transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  title={`${order.restaurantName} - ₹${order.rescuePrice}`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring ping */}
                    <span
                      className={`absolute w-8 h-8 rounded-full opacity-60 animate-pulse ${
                        isZomato ? 'bg-rose-500' : 'bg-orange-500'
                      }`}
                    ></span>

                    {/* Pin badge */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shadow-md border-2 ${
                        isSelected
                          ? 'border-amber-300 ring-2 ring-amber-400'
                          : 'border-white'
                      } ${isZomato ? 'bg-rose-600' : 'bg-orange-500'}`}
                    >
                      {isZomato ? 'Z' : 'S'}
                    </div>

                    {/* Small distance label */}
                    <span className="absolute -bottom-4 bg-stone-900/90 text-[9px] font-mono text-stone-200 px-1 rounded border border-stone-700 whitespace-nowrap">
                      {order.distanceKm}km
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-400 mt-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Your Location
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              Zomato Rescue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              Swiggy Rescue
            </span>
          </div>
        </div>

        {/* Selected Order Detail Pane on Right */}
        <div className="lg:col-span-5 bg-stone-950/70 border border-stone-800 rounded-xl p-5">
          {activePin ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        activePin.platform === 'zomato'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-orange-950 text-orange-300 border border-orange-800'
                      }`}
                    >
                      {activePin.platform === 'zomato' ? 'Zomato Food Rescue' : 'Swiggy GreenBite'}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {activePin.discountPercentage}% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <h3 className="text-lg font-bold text-white">
                      {activePin.restaurantName}
                    </h3>
                    {activePin.rating && (
                      <div className="flex items-center gap-0.5 bg-emerald-700 text-white text-[11px] font-bold px-1.5 py-0.5 rounded tabular-nums">
                        <span>{activePin.rating.toFixed(1)}</span>
                        <Star className="w-2.5 h-2.5 fill-current text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>{activePin.locationArea}</span>
                    <span className="text-stone-600">·</span>
                    <span className="font-mono text-amber-400">{activePin.distanceKm} km away</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black text-amber-400 tabular-nums">
                    ₹{activePin.rescuePrice}
                  </div>
                  <div className="text-xs text-stone-500 line-through tabular-nums">
                    ₹{activePin.originalPrice}
                  </div>
                </div>
              </div>

              {/* Food Photo preview */}
              <div className="relative h-32 rounded-lg overflow-hidden border border-stone-800">
                <img
                  src={activePin.imageUrl}
                  alt={activePin.restaurantName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-xs font-medium text-stone-200 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Freshly prepared {activePin.cancelledAgoMins} mins ago · Sealed</span>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-stone-900/60 rounded-lg p-3 border border-stone-800/80 space-y-1.5">
                <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Abandoned Box Contents:
                </div>
                {activePin.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-stone-300">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-sm border ${
                          item.isVeg ? 'border-emerald-500 bg-emerald-500' : 'border-rose-500 bg-rose-500'
                        }`}
                      ></span>
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                    </span>
                    {item.portionNotes && (
                      <span className="text-stone-500 text-[11px] truncate max-w-[120px]">
                        {item.portionNotes}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Cancellation Reason Notice */}
              <div className="text-xs text-stone-400 bg-stone-900/40 p-2.5 rounded-lg border border-stone-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-300">Cancel Reason: </span>
                  <span>{activePin.cancellationReason}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectOrder(activePin)}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <span>Claim This Cancelled Box</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500">
              <Navigation className="w-8 h-8 mx-auto mb-2 text-stone-600 animate-pulse" />
              <p className="text-sm">Click any radar node to inspect cancelled meal</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
