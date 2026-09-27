import React, { useState, useEffect } from 'react';
import { Zap, BellRing, Sparkles } from 'lucide-react';

interface LiveDropsTickerProps {
  onSimulateDrop: () => void;
}

const TICKER_ITEMS = [
  '⚡ Zomato Order #9410 cancelled at Meghana Foods Koramangala · Rescued in 4m',
  '⚡ Swiggy Order #5512 cancelled at Leon’s Burgers · 72% OFF claimed by customer',
  '⚡ Zomato Order #8831 cancelled at Punjab Grill Indiranagar · ₹165 flash pickup',
  '⚡ Swiggy Order #4190 cancelled at Anand Sweets · Rescued to Night Shelter by Rider',
  '⚡ 1,420+ meals diverted from Bengaluru landfills this week'
];

export const LiveDropsTicker: React.FC<LiveDropsTickerProps> = ({ onSimulateDrop }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-stone-900 text-stone-200 border-b border-stone-800 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Ticker Text */}
        <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
          <span className="flex items-center gap-1 text-amber-400 font-bold shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="uppercase tracking-wider text-[10px]">Live Network:</span>
          </span>
          <p className="truncate text-stone-300 font-medium transition-all duration-500 key={index}">
            {TICKER_ITEMS[index]}
          </p>
        </div>

        {/* Action Button: Simulate Cancel Drop */}
        <button
          onClick={onSimulateDrop}
          className="shrink-0 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 hover:border-amber-400/50 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
          title="Trigger a simulated cancelled order alert"
        >
          <BellRing className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulate Fresh Cancellation</span>
        </button>

      </div>
    </div>
  );
};
