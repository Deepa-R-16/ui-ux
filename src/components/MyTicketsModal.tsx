import React from 'react';
import { X, Ticket, Calendar, MapPin, QrCode, ArrowRight } from 'lucide-react';
import { BookedPass } from '../types';

interface MyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  passes: BookedPass[];
  onExploreMore: () => void;
}

export const MyTicketsModal: React.FC<MyTicketsModalProps> = ({
  isOpen,
  onClose,
  passes,
  onExploreMore
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 sm:p-7 shadow-2xl text-slate-900 dark:text-slate-100 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-[#212c42] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                My Booked Passes & Tickets
              </h2>
              <p className="text-xs text-slate-500">
                {passes.length} confirmed digital admission pass{passes.length !== 1 ? 'es' : ''}
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

        {/* Content Area */}
        <div className="overflow-y-auto py-4 space-y-3.5 flex-1 pr-1">
          {passes.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Ticket className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">No passes yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't booked any event tickets yet. Explore Sanjay Subrahmanyan at The Music Academy, Evam Standup comedy, or Bessie sunset sessions!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMore();
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold text-xs shadow-sm hover:bg-rose-700 transition-colors"
              >
                <span>Discover Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            passes.map((pass) => (
              <div
                key={pass.bookingId}
                className="rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5 mb-2.5">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                      ID: {pass.bookingId}
                    </span>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-1">
                      {pass.eventTitle}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 self-start sm:self-auto">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{pass.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="truncate">{pass.venue}, {pass.neighborhood}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-lg bg-white dark:bg-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Pass Holder</span>
                    <strong className="text-slate-900 dark:text-white">{pass.attendeeName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Gate & Zone</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{pass.gate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Amount Paid</span>
                    <strong className="text-slate-900 dark:text-white font-mono">₹{pass.totalAmount.toLocaleString('en-IN')}</strong>
                  </div>

                  <button
                    onClick={() => alert(`Active QR Pass for #${pass.bookingId} - Entry valid at ${pass.gate}`)}
                    className="p-1.5 px-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Scan QR</span>
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
