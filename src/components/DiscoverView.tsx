import React, { useState } from 'react';
import { Flame, Compass, Layers, MapPin } from 'lucide-react';
import { PulseEvent } from '../types';
import { EventCard } from './EventCard';
import { EventFilters, DateFilterOption, PriceFilterOption, SortOption } from './EventFilters';

interface DiscoverViewProps {
  events: PulseEvent[];
  filteredEvents: PulseEvent[];
  onSelectEvent: (event: PulseEvent) => void;
  bookmarks: string[];
  onToggleBookmark: (eventId: string, e: React.MouseEvent) => void;
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
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenNeighborhoodModal: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  events,
  filteredEvents,
  onSelectEvent,
  bookmarks,
  onToggleBookmark,
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
  selectedCategory,
  onSelectCategory,
  onOpenNeighborhoodModal
}) => {
  // Dedicated local neighborhood filter strictly for "Near You in Chennai" section
  const [nearYouArea, setNearYouArea] = useState<string>('All Chennai');

  // Curated list for Near You in Chennai: Shows one focused event list that ONLY updates when the user clicks a filter!
  const nearYouList = React.useMemo(() => {
    if (nearYouArea === 'All Chennai') {
      return events.slice(0, 4);
    }
    return events.filter((e) => e.neighborhood === nearYouArea);
  }, [events, nearYouArea]);

  // Featured marquee list (Top trending in Chennai)
  const trendingEvents = events.filter((e) => e.badge === 'Trending' || e.isFeatured);

  // Available neighborhoods for Near You quick filters
  const nearYouFilterTabs = [
    'All Chennai',
    'Alwarpet',
    'Nandanam',
    'Mylapore',
    'Chetpet',
    'Egmore',
    'Adyar',
    'Besant Nagar',
    'Island Grounds',
    'Guindy',
    'ECR',
  ];

  return (
    <div className="space-y-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* SECTION 1: TRENDING IN CHENNAI */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              <span>High Demand & Selling Fast</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trending in Chennai
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            The most sought-after concerts, Sabhas, comedy specials, and heritage events selling out across Madras.
          </p>
        </div>

        {/* 3-Column Marquee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingEvents.slice(0, 3).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isBookmarked={bookmarks.includes(event.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectEvent={onSelectEvent}
              featured={event.isFeatured}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: NEAR YOU IN CHENNAI (Single focused list updating on filter click) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] shadow-sm">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-rose-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" />
                <span>Hyperlocal Neighborhood Spotlight</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Near You in Chennai
              </h2>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Showing: <strong className="text-slate-900 dark:text-white">{nearYouArea}</strong> ({nearYouList.length} events)
            </div>
          </div>

          {/* Neighborhood filter chips: Clicking these updates the single list below */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {nearYouFilterTabs.map((hood) => {
              const isActive = nearYouArea === hood;
              return (
                <button
                  key={hood}
                  onClick={() => setNearYouArea(hood)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-rose-600 text-white'
                      : 'bg-white dark:bg-[#1a2336] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#2a3854] hover:border-slate-400'
                  }`}
                >
                  📍 {hood}
                </button>
              );
            })}
          </div>
        </div>

        {/* SINGLE FOCUSED EVENT LIST for Near You */}
        {nearYouList.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-[#0e1422] rounded-2xl border border-slate-200 dark:border-[#212c42] p-6 space-y-2 shadow-sm">
            <MapPin className="w-8 h-8 mx-auto text-slate-400" />
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
              No live events listed right now in {nearYouArea}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try exploring nearby localities like Alwarpet, Nandanam, or Besant Nagar.
            </p>
            <button
              onClick={() => setNearYouArea('All Chennai')}
              className="mt-2 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold shadow-sm hover:bg-rose-700 transition-colors"
            >
              View All Chennai Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nearYouList.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isBookmarked={bookmarks.includes(event.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectEvent={onSelectEvent}
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 3: ALL CHENNAI EVENTS & FILTER ENGINE */}
      <section id="all-events-section" className="pt-2">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-rose-600 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Full City Calendar</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Explore All Chennai Events
              </h2>
            </div>

            {selectedCategory !== 'All' && (
              <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 self-start sm:self-auto shadow-sm">
                <span>Category: <strong>{selectedCategory}</strong></span>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="font-bold ml-1 hover:text-slate-900 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Filtering and Sorting Bar */}
          <EventFilters
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            selectedArea={selectedArea}
            onAreaChange={onAreaChange}
            selectedPrice={selectedPrice}
            onPriceChange={onPriceChange}
            sortBy={sortBy}
            onSortChange={onSortChange}
            activeFilterCount={activeFilterCount}
            onResetFilters={onResetFilters}
            totalResults={filteredEvents.length}
          />
        </div>

        {/* Main Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-12 text-center space-y-4 my-8 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-[#1a2336] flex items-center justify-center text-slate-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              No matching events found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              We couldn't find events matching your active filters. Try clearing your filters or changing the locality.
            </p>
            <button
              onClick={onResetFilters}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm cursor-pointer transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isBookmarked={bookmarks.includes(event.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectEvent={onSelectEvent}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
