import React from 'react';
import { X, Heart, ArrowRight } from 'lucide-react';
import { PulseEvent } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteEvents: PulseEvent[];
  onSelectEvent: (event: PulseEvent) => void;
  onRemoveFavorite: (eventId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteEvents,
  onSelectEvent,
  onRemoveFavorite
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 shadow-2xl text-slate-900 dark:text-slate-100 my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-[#212c42] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Saved Events
              </h2>
              <p className="text-xs text-slate-500">
                {favoriteEvents.length} bookmarked event{favoriteEvents.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto py-3.5 space-y-2.5 flex-1 pr-1">
          {favoriteEvents.length === 0 ? (
            <div className="text-center py-10 space-y-1.5">
              <p className="text-slate-500 text-xs">You haven't saved any events yet.</p>
              <p className="text-slate-400 text-[11px]">
                Click the heart icon on any event card to save it for quick booking.
              </p>
            </div>
          ) : (
            favoriteEvents.map((event) => (
              <div
                key={event.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectEvent(event);
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-600">
                    <span>{event.category}</span>
                    <span>·</span>
                    <span>{event.dateBadge}</span>
                  </div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-rose-600 transition-colors">
                    {event.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 truncate">
                    {event.venue}, {event.neighborhood} · From ₹{event.startingPrice}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectEvent(event);
                    }}
                    className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(event.id)}
                    aria-label="Remove saved event"
                    className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
