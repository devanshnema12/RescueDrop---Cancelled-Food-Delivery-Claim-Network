import React, { useState, useEffect, useMemo } from 'react';
import { CancelledOrder, UserRole } from '../types/rescue';
import { Clock, ShieldCheck, MapPin, Sparkles, Bike, HeartHandshake, Star, Flame, AlertTriangle } from 'lucide-react';

interface OrderCardProps {
  order: CancelledOrder;
  onClaim: (order: CancelledOrder) => void;
  userRole: UserRole;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onClaim, userRole }) => {
  // Anchor countdown to absolute epoch timestamp to guarantee drift-free real-time accuracy
  const targetExpiryTimestamp = useMemo(() => {
    return Date.now() + (order.expiryTimeSeconds || 600) * 1000;
  }, [order.id, order.expiryTimeSeconds]);

  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    return Math.max(0, Math.floor((targetExpiryTimestamp - Date.now()) / 1000));
  });

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, Math.floor((targetExpiryTimestamp - Date.now()) / 1000));
      setSecondsLeft(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetExpiryTimestamp]);

  const totalWindow = 900; // 15 minutes window baseline
  const progressPercent = Math.min(100, Math.max(0, (secondsLeft / totalWindow) * 100));

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isExpiringSoon = secondsLeft > 0 && secondsLeft < 300; // under 5 mins
  const isExpired = secondsLeft === 0;

  const isZomato = order.platform === 'zomato';

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div>
        {/* Card Media Header with Image */}
        <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
          <img
            src={order.imageUrl}
            alt={order.restaurantName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Platform & Discount Scrim Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className={`text-xs font-bold text-white px-2.5 py-1 rounded-md shadow-sm ${
                isZomato ? 'bg-[#E23744]' : 'bg-[#FC8019]'
              }`}
            >
              {isZomato ? 'Zomato Rescue' : 'Swiggy GreenBite'}
            </span>
            <span className="text-xs font-bold bg-stone-900/90 text-amber-300 px-2 py-1 rounded-md shadow-sm">
              {order.discountPercentage}% OFF
            </span>
          </div>

          {/* Real-Time Live Expiry Countdown Badge on Image */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-xs font-bold tracking-tight shadow-md backdrop-blur-md border ${
                isExpired
                  ? 'bg-stone-950/90 text-stone-400 border-stone-700'
                  : isExpiringSoon
                  ? 'bg-rose-950/90 text-rose-300 border-rose-600/80 animate-pulse'
                  : 'bg-stone-950/85 text-amber-300 border-stone-800'
              }`}
            >
              <Clock
                className={`w-3.5 h-3.5 ${
                  isExpired ? 'text-stone-400' : isExpiringSoon ? 'text-rose-400' : 'text-amber-400'
                }`}
              />
              <span className="tabular-nums">
                {isExpired
                  ? 'EXPIRED'
                  : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`}
              </span>
            </div>
          </div>

          {/* Tamper Seal & Temperature Strip */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tamper Seal Intact</span>
            </span>
            <span className="text-stone-300">
              {order.temperature === 'piping_hot' ? '🔥 Piping Hot' : '📦 Warm Packed'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          
          {/* Restaurant & Distance */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="text-base font-bold text-stone-900 truncate">
                  {order.restaurantName}
                </h3>
                {order.rating && (
                  <div
                    className="flex items-center gap-0.5 bg-emerald-700 text-white text-[11px] font-bold px-1.5 py-0.5 rounded shadow-2xs shrink-0 tabular-nums"
                    title={`${order.rating.toFixed(1)} out of 5 stars`}
                  >
                    <span>{order.rating.toFixed(1)}</span>
                    <Star className="w-2.5 h-2.5 fill-current text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs font-mono font-medium text-stone-500 whitespace-nowrap shrink-0">
                {order.distanceKm} km away
              </span>
            </div>
            
            {/* Unboxed metadata line with typographic bullet separators */}
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
              {order.ratingCount && (
                <>
                  <span>{(order.ratingCount).toLocaleString()} reviews</span>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <span>{order.cuisine}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{order.locationArea}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-700 font-medium">#{order.orderNumber}</span>
            </div>
          </div>

          {/* Itemized Contents */}
          <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 space-y-1.5">
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Cancelled Order Items:
            </div>
            {order.items.map((item, index) => (
              <div key={index} className="flex items-baseline justify-between text-xs text-stone-700">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center shrink-0 ${
                      item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    ></span>
                  </span>
                  <span className="font-medium">
                    {item.quantity} × {item.name}
                  </span>
                </span>
                {item.portionNotes && (
                  <span className="text-[11px] text-stone-400 truncate max-w-[120px]">
                    {item.portionNotes}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Why was it cancelled? */}
          <div className="text-xs text-stone-600 bg-amber-50/70 border border-amber-200/60 rounded-lg p-2.5 leading-relaxed">
            <span className="font-semibold text-amber-950">Reason: </span>
            <span>{order.cancellationReason}</span>
          </div>

          {/* Dedicated Real-Time Visual Countdown Timer Module */}
          <div
            className={`rounded-xl p-3 border transition-colors ${
              isExpired
                ? 'bg-stone-100 border-stone-200 text-stone-500'
                : isExpiringSoon
                ? 'bg-rose-50/80 border-rose-200/90 text-rose-900'
                : 'bg-amber-50/50 border-amber-200/70 text-stone-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                {isExpired ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-stone-400" />
                    <span>Rescue Window Closed</span>
                  </>
                ) : isExpiringSoon ? (
                  <>
                    <Flame className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
                    <span className="text-rose-700">Closing Fast — Claim Now!</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-stone-700">Hot Food Rescue Window:</span>
                  </>
                )}
              </div>

              {/* Segmented Digital Clock Display */}
              <div className="flex items-center gap-1 font-mono tabular-nums text-xs font-black">
                <span
                  className={`px-1.5 py-0.5 rounded shadow-2xs ${
                    isExpired
                      ? 'bg-stone-200 text-stone-600'
                      : isExpiringSoon
                      ? 'bg-rose-600 text-white'
                      : 'bg-stone-900 text-amber-300'
                  }`}
                >
                  {String(mins).padStart(2, '0')}m
                </span>
                <span className="text-stone-400 font-bold">:</span>
                <span
                  className={`px-1.5 py-0.5 rounded shadow-2xs ${
                    isExpired
                      ? 'bg-stone-200 text-stone-600'
                      : isExpiringSoon
                      ? 'bg-rose-600 text-white'
                      : 'bg-stone-900 text-amber-300'
                  }`}
                >
                  {String(secs).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Dynamic Progress Bar with Real-Time Remaining Indicator */}
            <div className="w-full bg-stone-200/80 h-2 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full transition-all duration-1000 ${
                  isExpired
                    ? 'w-0'
                    : isExpiringSoon
                    ? 'bg-gradient-to-r from-orange-500 to-rose-600'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500'
                }`}
                style={{
                  width: `${progressPercent}%`
                }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1 font-mono">
              <span>{Math.round(progressPercent)}% fresh temperature window</span>
              <span>{isExpired ? 'Disposed' : `${mins}m ${secs}s left`}</span>
            </div>
          </div>

          {/* Rider Bounty View if role is rider */}
          {userRole === 'rider' && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-900">
              <span className="flex items-center gap-1.5 font-medium">
                <Bike className="w-4 h-4 text-blue-700" />
                <span>Rider Rescue Compensation:</span>
              </span>
              <span className="font-bold text-blue-700 font-mono">
                +₹{order.riderBonusIncentive} bonus
              </span>
            </div>
          )}

        </div>
      </div>

      {/* Card Footer with Pricing and Action */}
      <div className="p-4 pt-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-stone-900 tabular-nums">
              ₹{order.rescuePrice}
            </span>
            <span className="text-xs text-stone-400 line-through tabular-nums">
              ₹{order.originalPrice}
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            Save ₹{order.originalPrice - order.rescuePrice}
          </span>
        </div>

        <button
          onClick={() => onClaim(order)}
          disabled={order.claimed || isExpired}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm ${
            order.claimed || isExpired
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : 'bg-stone-900 hover:bg-stone-800 text-white hover:shadow'
          }`}
        >
          {isExpired ? (
            <span>Window Expired</span>
          ) : userRole === 'rider' ? (
            <>
              <Bike className="w-4 h-4 text-amber-400" />
              <span>Claim & Deliver</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Claim Meal</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
