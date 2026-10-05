import React from 'react';
import { MapPin, Heart, ArrowUpRight, Building } from 'lucide-react';
import { PulseEvent } from '../types';
import { AbstractEventVisual } from './AbstractEventVisual';

interface EventCardProps {
  event: PulseEvent;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string, e: React.MouseEvent) => void;
  onSelectEvent: (event: PulseEvent) => void;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isBookmarked,
  onToggleBookmark,
  onSelectEvent,
  featured = false
}) => {
  return (
    <div
      onClick={() => onSelectEvent(event)}
      className="stage-card group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Top Visual Graphic Area */}
      <div className="relative w-full overflow-hidden bg-[#0e1422]">
        <AbstractEventVisual
          eventId={event.id}
          theme={event.visualTheme}
          title={event.title}
          category={event.category}
          primaryColor={event.primaryColor}
          accentColor={event.accentColor}
          size={featured ? 'large' : 'medium'}
        />

        {/* Date Badge — Top Left Floating Flat Block */}
        <div className="absolute top-3 left-3 z-20 flex flex-col items-center justify-center min-w-[50px] px-2 py-1 rounded-lg bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-[#212c42] shadow-sm">
          <span className="text-[10px] font-bold text-rose-600 font-mono tracking-tight uppercase leading-none">
            {event.dateBadge.split(' ')[1] || 'OCT'}
          </span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white font-display leading-tight">
            {event.dateBadge.split(' ')[0] || '18'}
          </span>
        </div>

        {/* Top Right: Badges & Bookmark Action */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {event.badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                event.badge === 'Trending'
                  ? 'bg-rose-600 text-white'
                  : event.badge === 'Selling Fast'
                  ? 'bg-amber-600 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {event.badge}
            </span>
          )}

          <button
            onClick={(e) => onToggleBookmark(event.id, e)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
            className="p-1.5 rounded-lg bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-[#212c42] text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors shadow-sm cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                isBookmarked ? 'text-rose-600 fill-rose-600' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Organizer text line */}
          <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 mb-1 font-medium">
            <span className="text-rose-600 dark:text-rose-400 font-semibold">{event.category}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span className="truncate max-w-[170px] text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Building className="w-3 h-3 text-slate-400 shrink-0" />
              {event.organizer.name}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug line-clamp-1">
            {event.title}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
            {event.tagline}
          </p>
        </div>

        {/* Bottom Section: Venue, Neighborhood & Price */}
        <div className="pt-3 border-t border-slate-200 dark:border-[#212c42] flex items-center justify-between gap-2 mt-auto">
          {/* Venue & Neighborhood */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="truncate">
              {event.venue}, <strong className="text-slate-900 dark:text-slate-200">{event.neighborhood}</strong>
            </span>
          </div>

          {/* Starting Price & Action */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-normal leading-none">From</span>
              <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white tabular-nums">
                ₹{event.startingPrice}
              </span>
            </div>
            <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-[#1a2438] group-hover:bg-rose-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
