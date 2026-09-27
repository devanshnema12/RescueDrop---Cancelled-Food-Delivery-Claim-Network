import React from 'react';
import { FilterState, PlatformType, DietaryType } from '../types/rescue';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  setFilter,
  totalCount
}) => {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      
      {/* Top Row: Search and Quick Segmented Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            placeholder="Search cancelled biryani, pizza, burger, restaurant..."
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 bg-stone-50/50"
          />
        </div>

        {/* Platform Segmented Control */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setFilter((prev) => ({ ...prev, platform: 'all' }))}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter.platform === 'all'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Platforms
          </button>
          <button
            onClick={() => setFilter((prev) => ({ ...prev, platform: 'zomato' }))}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              filter.platform === 'zomato'
                ? 'bg-[#E23744] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span>Zomato</span>
          </button>
          <button
            onClick={() => setFilter((prev) => ({ ...prev, platform: 'swiggy' }))}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              filter.platform === 'swiggy'
                ? 'bg-[#FC8019] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span>Swiggy</span>
          </button>
        </div>

      </div>

      {/* Bottom Row: Dietary, Distance slider, and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
        
        {/* Dietary Toggle */}
        <div className="flex items-center gap-1.5">
          <span className="text-stone-500 font-medium">Dietary:</span>
          {(['all', 'veg', 'non-veg'] as DietaryType[]).map((d) => (
            <button
              key={d}
              onClick={() => setFilter((prev) => ({ ...prev, dietary: d }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filter.dietary === d
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {d === 'all' ? 'All Meals' : d === 'veg' ? '🟢 Pure Veg' : '🔴 Non-Veg'}
            </button>
          ))}
        </div>

        {/* Distance Slider */}
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-500 font-medium">Max Distance:</span>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={filter.maxDistance}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, maxDistance: Number(e.target.value) }))
            }
            className="w-20 sm:w-28 accent-amber-500 cursor-pointer"
          />
          <span className="font-mono font-bold text-stone-800">{filter.maxDistance} km</span>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-stone-500 font-medium">Sort by:</span>
          <select
            value={filter.sortBy}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                sortBy: e.target.value as FilterState['sortBy']
              }))
            }
            className="bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
          >
            <option value="distance">Nearest Distance</option>
            <option value="rating">Top Rated (★)</option>
            <option value="discount">Highest Discount</option>
            <option value="expiry">Closing Soonest</option>
            <option value="price">Lowest Price</option>
          </select>
        </div>

        {/* Total Active Drops */}
        <div className="text-stone-500 font-medium">
          <span className="font-bold text-stone-900 font-mono">{totalCount}</span> active drops nearby
        </div>

      </div>

    </div>
  );
};
