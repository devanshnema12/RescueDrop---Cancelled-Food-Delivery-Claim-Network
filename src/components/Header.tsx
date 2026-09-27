import React from 'react';
import { Volume2, VolumeX, ShieldCheck, Bike, Utensils, Store, PlusCircle } from 'lucide-react';
import { UserRole } from '../types/rescue';

interface HeaderProps {
  currentTab: 'feed' | 'radar' | 'impact' | 'my-claims';
  setCurrentTab: (tab: 'feed' | 'radar' | 'impact' | 'my-claims') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenBroadcast: () => void;
  claimedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  soundEnabled,
  setSoundEnabled,
  onOpenBroadcast,
  claimedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      {/* Primary Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setCurrentTab('feed'); }}
            className="text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-lg shadow-sm">
              ⚡
            </span>
            <span>RescueDrop</span>
          </a>
          <span className="hidden sm:inline-block text-xs font-medium text-stone-400 border-l border-stone-700 pl-3">
            Zomato & Swiggy Food Rescue Hub
          </span>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
          <button
            onClick={() => setCurrentTab('feed')}
            className={`transition-colors cursor-pointer py-1 ${
              currentTab === 'feed'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Live Drops
          </button>
          <button
            onClick={() => setCurrentTab('radar')}
            className={`transition-colors cursor-pointer py-1 ${
              currentTab === 'radar'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Radar Map
          </button>
          <button
            onClick={() => setCurrentTab('impact')}
            className={`transition-colors cursor-pointer py-1 ${
              currentTab === 'impact'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Green Impact
          </button>
          <button
            onClick={() => setCurrentTab('my-claims')}
            className={`transition-colors cursor-pointer py-1 relative ${
              currentTab === 'my-claims'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            My Claims
            {claimedCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-amber-500 text-stone-950 font-bold rounded-full">
                {claimedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Actions & Sound toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound audio alert toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            title={soundEnabled ? 'Alert sounds active' : 'Alert sounds muted'}
            aria-label="Toggle alert sounds"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Broadcast Cancelled Order CTA */}
          <button
            onClick={onOpenBroadcast}
            className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Post Cancelled Order</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>
      </div>

      {/* Secondary Bar: Mode Switcher & Safety Guarantee */}
      <div className="bg-stone-950/80 border-t border-stone-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Role Switcher */}
          <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
            <span className="text-stone-400 px-2 py-0.5 font-medium hidden sm:inline">View as:</span>
            <button
              onClick={() => setUserRole('foodie')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                userRole === 'foodie'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Foodie Buyer</span>
            </button>
            <button
              onClick={() => setUserRole('rider')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                userRole === 'rider'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery Partner</span>
            </button>
            <button
              onClick={() => setUserRole('restaurant')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                userRole === 'restaurant'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Kitchen / Merchant</span>
            </button>
          </div>

          {/* Tamper Seal & Quality Assurance Marker */}
          <div className="hidden lg:flex items-center gap-2 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Tamper-Proof Sealed Packaging · Pre-checked by Cloud Kitchen Partners</span>
          </div>

          {/* Mobile view subnav quick links */}
          <div className="flex md:hidden items-center gap-3 text-stone-300">
            <button
              onClick={() => setCurrentTab('feed')}
              className={`py-1 ${currentTab === 'feed' ? 'text-amber-400 font-bold' : ''}`}
            >
              Feed
            </button>
            <button
              onClick={() => setCurrentTab('radar')}
              className={`py-1 ${currentTab === 'radar' ? 'text-amber-400 font-bold' : ''}`}
            >
              Radar
            </button>
            <button
              onClick={() => setCurrentTab('impact')}
              className={`py-1 ${currentTab === 'impact' ? 'text-amber-400 font-bold' : ''}`}
            >
              Impact
            </button>
            <button
              onClick={() => setCurrentTab('my-claims')}
              className={`py-1 ${currentTab === 'my-claims' ? 'text-amber-400 font-bold' : ''}`}
            >
              Claims {claimedCount > 0 && `(${claimedCount})`}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
