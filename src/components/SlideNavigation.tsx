import React from 'react';
import { ChevronLeft, ChevronRight, Compass, Calendar, Info, Layers, Ticket, Sparkles } from 'lucide-react';

export type SlideIndex = 1 | 2 | 3 | 4 | 5 | 6;

interface SlideNavigationProps {
  currentSlide: SlideIndex;
  onSelectSlide: (slide: SlideIndex) => void;
  selectedEventTitle?: string;
  bookedPassesCount: number;
}

export const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  onSelectSlide,
  selectedEventTitle,
  bookedPassesCount
}) => {
  const slides = [
    { id: 1 as SlideIndex, label: 'Discover', icon: Sparkles, desc: 'City Highlights' },
    { id: 2 as SlideIndex, label: 'Near You', icon: Compass, desc: 'Localities' },
    { id: 3 as SlideIndex, label: 'All Events', icon: Layers, desc: 'Calendar' },
    { id: 4 as SlideIndex, label: 'Details', icon: Info, desc: 'Lineup & Venue' },
    { id: 5 as SlideIndex, label: 'Seating', icon: Calendar, desc: 'Zone & Booking' },
    { id: 6 as SlideIndex, label: 'Passes', icon: Ticket, desc: 'Admission QR' },
  ];

  const handlePrev = () => {
    if (currentSlide > 1) {
      onSelectSlide((currentSlide - 1) as SlideIndex);
    }
  };

  const handleNext = () => {
    if (currentSlide < 6) {
      onSelectSlide((currentSlide + 1) as SlideIndex);
    }
  };

  const progressPercentage = ((currentSlide) / 6) * 100;

  return (
    <div className="sticky top-16 md:top-18 z-30 w-full bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-[#212c42] shadow-sm transition-colors">
      {/* Visual Slide Deck Progress Track (Top hairline) */}
      <div className="w-full h-1 bg-slate-100 dark:bg-[#131b2b] overflow-hidden">
        <div
          className="h-full bg-rose-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 py-2 px-3 sm:px-6">
        {/* Previous Slide Button */}
        <button
          onClick={handlePrev}
          disabled={currentSlide === 1}
          aria-label="Previous Slide"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            currentSlide === 1
              ? 'opacity-40 cursor-not-allowed text-slate-400 border border-transparent'
              : 'bg-slate-100 dark:bg-[#131b2b] text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 border border-slate-200 dark:border-[#212c42] shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev Slide</span>
        </button>

        {/* Slide Deck Tabs (Numbered Step Indicators) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {slides.map((s) => {
            const isActive = currentSlide === s.id;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSlide(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-rose-600 text-white font-bold ring-2 ring-rose-600/30'
                    : 'bg-slate-100 dark:bg-[#131b2b] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#212c42]'
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">Slide {s.id}</span>
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">{s.label}</span>
                {s.id === 6 && bookedPassesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[9px] font-extrabold flex items-center justify-center">
                    {bookedPassesCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Next Slide Button */}
        <button
          onClick={handleNext}
          disabled={currentSlide === 6}
          aria-label="Next Slide"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            currentSlide === 6
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
          }`}
        >
          <span className="hidden sm:inline">Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
