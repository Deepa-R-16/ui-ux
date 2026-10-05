import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { CHENNAI_NEIGHBORHOODS } from '../data/events';

export type DateFilterOption = 'All' | 'Today' | 'Tomorrow' | 'This Weekend' | 'Next Week';
export type PriceFilterOption = 'All' | 'Under ₹500' | '₹500 - ₹1000' | 'Above ₹1000';
export type SortOption = 'Recommended' | 'Popular' | 'Newest' | 'Price: Low to High';

interface EventFiltersProps {
  selectedDate: DateFilterOption;
  onDateChange: (date: DateFilterOption) => void;
  selectedArea: string;
  onAreaChange: (area: string) => void;
  selectedPrice: PriceFilterOption;
  onPriceChange: (price: PriceFilterOption) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  activeFilterCount: number;
  onResetFilters: () => void;
  totalResults: number;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  selectedDate,
  onDateChange,
  selectedArea,
  onAreaChange,
  selectedPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  activeFilterCount,
  onResetFilters,
  totalResults
}) => {
  return (
    <div className="w-full bg-white dark:bg-[#151c28] border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 shadow-sm transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Label */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 pr-2 border-r border-slate-200 dark:border-slate-800">
            <Filter className="w-3.5 h-3.5 text-rose-600" />
            <span>Filters:</span>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value as DateFilterOption)}
              className="appearance-none bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 pr-6 hover:border-slate-400 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="All">📅 Any Date</option>
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="This Weekend">This Weekend (18-20 Oct)</option>
              <option value="Next Week">Next Week</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[9px]">
              ▼
            </div>
          </div>

          {/* Area Filter */}
          <div className="relative">
            <select
              value={selectedArea}
              onChange={(e) => onAreaChange(e.target.value)}
              className="appearance-none bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 pr-6 hover:border-slate-400 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {CHENNAI_NEIGHBORHOODS.map((area) => (
                <option key={area} value={area}>
                  📍 {area === 'All Chennai' ? 'All Localities' : area}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[9px]">
              ▼
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="relative">
            <select
              value={selectedPrice}
              onChange={(e) => onPriceChange(e.target.value as PriceFilterOption)}
              className="appearance-none bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 pr-6 hover:border-slate-400 focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value="All">₹ Any Price</option>
              <option value="Under ₹500">Under ₹500</option>
              <option value="₹500 - ₹1000">₹500 - ₹1,000</option>
              <option value="Above ₹1000">Above ₹1,000</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[9px]">
              ▼
            </div>
          </div>

          {/* Reset Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>

        {/* Right Sorting & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-mono">
            <strong className="text-slate-900 dark:text-white font-semibold">{totalResults}</strong> events found
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="appearance-none bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-lg px-2.5 py-1.5 pr-6 hover:border-rose-500 focus:outline-none cursor-pointer"
              >
                <option value="Recommended">Recommended</option>
                <option value="Popular">Popular</option>
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-rose-600 text-[9px]">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
