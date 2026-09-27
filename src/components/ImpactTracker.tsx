import React from 'react';
import { RescueStats } from '../types/rescue';
import { Leaf, Award, Users, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface ImpactTrackerProps {
  stats: RescueStats;
}

export const ImpactTracker: React.FC<ImpactTrackerProps> = ({ stats }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Impact Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900/60 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            <Leaf className="w-3.5 h-3.5" />
            Zero Food Waste Mission
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Rescuing Cancelled Meals, One Box at a Time.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every day in India, thousands of freshly cooked meals from Zomato and Swiggy are discarded when customers cancel mid-delivery or go unreachable. RescueDrop connects restaurants, delivery partners, and local foodies to rescue hot food instantly.
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Quantitative Proof Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Meals Rescued
          </div>
          <div className="text-3xl font-black text-stone-900 font-mono tabular-nums">
            {stats.mealsRescued.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 font-medium">
            +184 rescued in last 24h
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Fresh Food Diverted
          </div>
          <div className="text-3xl font-black text-stone-900 font-mono tabular-nums">
            {(stats.kgFoodSaved / 1000).toFixed(1)}k kg
          </div>
          <div className="text-xs text-stone-500">
            Solid waste prevented from landfills
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            CO2e Emissions Saved
          </div>
          <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums">
            {(stats.co2PreventedKg / 1000).toFixed(1)}k kg
          </div>
          <div className="text-xs text-emerald-600 font-medium">
            Equivalent to 840 trees planted
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Foodie Savings
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono tabular-nums">
            ₹{(stats.moneySavedInr / 100000).toFixed(1)}L+
          </div>
          <div className="text-xs text-stone-500">
            Average 72% discount per meal
          </div>
        </div>

      </div>

      {/* How It Works Explanatory Section */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="max-w-xl">
          <h3 className="text-xl font-bold text-stone-900">
            How Zomato & Swiggy Food Rescue Works
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Built on official food safety protocols & rapid tamper-evident verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="space-y-2.5 p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 font-black flex items-center justify-center text-sm">
              01
            </div>
            <h4 className="text-sm font-bold text-stone-900">
              Kitchen Preparation & Cancellation
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              When an order is cooked and packed, but the customer cancels or becomes unreachable at the gate, the restaurant or rider broadcasts the order into the rescue pool.
            </p>
          </div>

          <div className="space-y-2.5 p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 font-black flex items-center justify-center text-sm">
              02
            </div>
            <h4 className="text-sm font-bold text-stone-900">
              15-Minute Geo-Radar Broadcast
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nearby foodies and delivery partners within 3.5 km receive an alert offering the hot, intact meal at a 60%–80% markdown before the countdown closes.
            </p>
          </div>

          <div className="space-y-2.5 p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 font-black flex items-center justify-center text-sm">
              03
            </div>
            <h4 className="text-sm font-bold text-stone-900">
              OTP Handover & Zero Waste
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              The buyer presents their digital OTP at the restaurant counter or receives flash delivery. The restaurant recovers food costs, riders get delivery bounties, and zero food is wasted.
            </p>
          </div>

        </div>
      </div>

      {/* Community NGO Partners */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
            <HeartHandshake className="w-5 h-5 text-rose-500" />
            <span>Community Shelter Rescue Network</span>
          </div>
          <p className="text-xs text-stone-500 max-w-xl">
            Don’t need the meal yourself? When claiming, select "Feed Shelter" and our delivery riders will transport the meal directly to local partner night shelters via Feeding India and Robin Hood Army.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-2xs">
            Robin Hood Army
          </span>
          <span className="text-xs font-semibold text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-2xs">
            Feeding India
          </span>
        </div>
      </div>

    </div>
  );
};
