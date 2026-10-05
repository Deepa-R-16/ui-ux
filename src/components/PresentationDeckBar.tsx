import React from 'react';
import { ChevronLeft, ChevronRight, Compass, Calendar, Info, Layers, Ticket, Sparkles, MoveHorizontal } from 'lucide-react';

export type DeckScreenIndex = 0 | 1 | 2 | 3 | 4 | 5;

interface PresentationDeckBarProps {
  currentSlide: DeckScreenIndex;
  onSelectSlide: (slide: DeckScreenIndex) => void;
  selectedEventTitle?: string;
  bookedPassesCount: number;
}

export const PresentationDeckBar: React.FC<PresentationDeckBarProps> = ({
  currentSlide,
  onSelectSlide,
  selectedEventTitle,
  bookedPassesCount
}) => {
  const screens = [
    { id: 0 as DeckScreenIndex, label: 'Discover', icon: Sparkles },
    { id: 1 as DeckScreenIndex, label: 'Near You', icon: Compass },
    { id: 2 as DeckScreenIndex, label: 'Calendar', icon: Layers },
    { id: 3 as DeckScreenIndex, label: 'Event Dossier', icon: Info },
    { id: 4 as DeckScreenIndex, label: 'Seating & Booking', icon: Calendar },
    { id: 5 as DeckScreenIndex, label: 'Passes', icon: Ticket },
  ];

  const handlePrev = () => {
    if (currentSlide > 0) {
      onSelectSlide((currentSlide - 1) as DeckScreenIndex);
    }
  };

  const handleNext = () => {
    if (currentSlide < 5) {
      onSelectSlide((currentSlide + 1) as DeckScreenIndex);
    }
  };

  const progressPercent = ((currentSlide + 1) / 6) * 100;

  return (
    <div className="sticky top-16 md:top-18 z-30 w-full bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-[#212c42] shadow-sm transition-colors select-none">
      {/* PPT Slide Progress Track */}
      <div className="w-full h-1 bg-slate-100 dark:bg-[#131b2b] overflow-hidden">
        <div
          className="h-full bg-rose-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 py-2 px-3 sm:px-6">
        {/* PPT Prev button */}
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          aria-label="Previous PPT Page"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            currentSlide === 0
              ? 'opacity-30 cursor-not-allowed text-slate-400'
              : 'bg-slate-100 dark:bg-[#131b2b] text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 border border-slate-200 dark:border-[#212c42] shadow-sm active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Minimal PPT Slide Stage Dots & Labels */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {screens.map((s) => {
            const isActive = currentSlide === s.id;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSlide(s.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-600 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#131b2b]'
                }`}
                title={s.label}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  {s.id === 3 && selectedEventTitle ? 'Dossier' : s.label}
                </span>
                {s.id === 5 && bookedPassesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-black flex items-center justify-center">
                    {bookedPassesCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* PPT Next button */}
        <button
          onClick={handleNext}
          disabled={currentSlide === 5}
          aria-label="Next PPT Page"
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
            currentSlide === 5
              ? 'opacity-30 cursor-not-allowed text-slate-400'
              : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:scale-95'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
