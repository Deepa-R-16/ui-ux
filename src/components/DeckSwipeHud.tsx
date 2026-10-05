import React from 'react';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import { DeckScreenIndex } from './PresentationDeckBar';

interface DeckSwipeHudProps {
  currentSlide: DeckScreenIndex;
  onSelectSlide: (slide: DeckScreenIndex) => void;
  totalSlides?: number;
}

export const DeckSwipeHud: React.FC<DeckSwipeHudProps> = ({
  currentSlide,
  onSelectSlide,
  totalSlides = 6
}) => {
  const titles = [
    'Discover & Spotlight',
    'Near You in Chennai',
    'Events Calendar',
    'Event Details Dossier',
    'Seating & Zone Tickets',
    'Confirmed Passes'
  ];

  return (
    <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-2xl bg-white/95 dark:bg-[#131b2b]/95 backdrop-blur-md border border-slate-200 dark:border-[#212c42] shadow-xl text-slate-800 dark:text-slate-100">
        {/* Previous */}
        <button
          onClick={() => {
            if (currentSlide > 0) onSelectSlide((currentSlide - 1) as DeckScreenIndex);
          }}
          disabled={currentSlide === 0}
          aria-label="Previous PPT page"
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1a253a] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          title="Previous (or swipe right)"
        >
          <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-slate-200" />
        </button>

        {/* PPT Slide Dots with Active Glow */}
        <div className="flex items-center gap-1.5 px-1">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectSlide(idx as DeckScreenIndex)}
                title={titles[idx] || `Page ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-2 bg-rose-600 shadow-sm'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
              />
            );
          })}
        </div>

        {/* Current Screen Title (Desktop only) */}
        <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>{titles[currentSlide]}</span>
        </div>

        {/* Next */}
        <button
          onClick={() => {
            if (currentSlide < totalSlides - 1) onSelectSlide((currentSlide + 1) as DeckScreenIndex);
          }}
          disabled={currentSlide === totalSlides - 1}
          aria-label="Next PPT page"
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1a253a] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          title="Next (or swipe left)"
        >
          <ChevronRight className="w-4 h-4 text-slate-700 dark:text-slate-200" />
        </button>

        {/* Minimal Swipe Hint */}
        <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400">
          <MoveHorizontal className="w-3 h-3 text-rose-600" />
          <span>Swipe ⇄</span>
        </div>
      </div>
    </div>
  );
};
