import React from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentNeighborhood: string;
  onOpenNeighborhoodModal: () => void;
  onSelectQuickTag: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  searchQuery,
  onSearchChange,
  currentNeighborhood,
  onOpenNeighborhoodModal,
  onSelectQuickTag
}) => {
  return (
    <section className="relative pt-8 pb-12 md:pt-14 md:pb-16 border-b border-slate-200 dark:border-[#212c42] bg-white dark:bg-[#0b0f19] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Location indicator & Live pulse pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#131b2b] text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#212c42] shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
            <button
              onClick={onOpenNeighborhoodModal}
              className="flex items-center gap-1.5 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span className="font-semibold text-slate-900 dark:text-white">
                {currentNeighborhood === 'All Chennai' ? 'Chennai, Tamil Nadu' : currentNeighborhood}
              </span>
              <span className="text-slate-500 dark:text-slate-400">· 14 Localities</span>
            </button>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4" style={{ textWrap: 'balance' }}>
            Something exciting is happening in{' '}
            <span className="text-rose-600 underline decoration-rose-600/30 underline-offset-4">
              Chennai.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Discover concerts, comedy nights, workshops, theatre, festivals and experiences happening across the city.
          </p>

          {/* Clean Search Input with Flat Bold Highlighting Action */}
          <div className="relative max-w-xl mx-auto mb-5">
            <div className="p-1.5 rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] shadow-sm flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center flex-1 w-full px-3 py-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search real events, artists, sabhas..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto p-1 sm:p-0">
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Real Chennai Discovery Hotspots */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Chennai Hubs:</span>
            {[
              { label: 'The Music Academy', tag: 'Alwarpet' },
              { label: 'YMCA Grounds', tag: 'Nandanam' },
              { label: 'Sir Mutha Chetpet', tag: 'Chetpet' },
              { label: 'Mylapore Tank', tag: 'Mylapore' },
              { label: 'Backyard Adyar', tag: 'Adyar' },
              { label: 'Bessie Beach', tag: 'Besant Nagar' },
            ].map((spot) => (
              <button
                key={spot.label}
                onClick={() => onSelectQuickTag(spot.tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#131b2b] hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-[#212c42] shadow-sm transition-colors cursor-pointer"
              >
                {spot.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
