import React from 'react';
import { MapPin, Navigation, Volume2, Users } from 'lucide-react';
import { TicketType } from '../types';

interface InteractiveVenueMapProps {
  venueName: string;
  neighborhood: string;
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
  tickets: TicketType[];
  selectedTicketsCount: number;
  totalPrice: number;
}

export const InteractiveVenueMap: React.FC<InteractiveVenueMapProps> = ({
  venueName,
  neighborhood,
  selectedZoneId,
  onSelectZone,
  tickets,
  selectedTicketsCount,
  totalPrice
}) => {
  const isZoneSelected = (zoneId: string) => selectedZoneId === zoneId;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Visual Seating & Zone Layout - Flat Color Blocks */}
      <div className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-5 md:p-6 shadow-sm">
        {/* Header & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <span>Acoustic Seating & Floor Layout</span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
                Click zone to select
              </span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Live auditorium & lawn configuration mapped for {venueName}, {neighborhood}
            </p>
          </div>

          {/* Status Legend */}
          <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-[11px]">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-rose-300"></span>
              <span className="text-[11px]">Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="text-[11px]">Sold Out</span>
            </div>
          </div>
        </div>

        {/* Visual Seating / Zone Canvas */}
        <div className="relative max-w-xl mx-auto flex flex-col items-center gap-3.5 py-3 select-none">
          {/* THE STAGE - Flat Solid Dark Block */}
          <div className="w-full max-w-md py-3 px-6 rounded-t-2xl bg-slate-900 text-white text-center shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <Volume2 className="w-4 h-4 text-rose-500" />
              <span className="font-display font-extrabold tracking-widest text-xs uppercase">
                ★ MAIN CONCERT PROSCENIUM / STAGE ★
              </span>
              <Volume2 className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Concert-Grade Acoustic Audio Arrays & Projections
            </div>
          </div>

          {/* ZONE 1: VIP ZONE */}
          <button
            onClick={() => onSelectZone('zone-vip')}
            className={`w-full max-w-sm p-3.5 rounded-xl border transition-all cursor-pointer text-left shadow-sm ${
              isZoneSelected('zone-vip')
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 ring-1 ring-rose-500'
                : 'bg-slate-50 dark:bg-[#0e1422] border-slate-200 dark:border-[#212c42] hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isZoneSelected('zone-vip') ? 'bg-rose-600 ring-2 ring-rose-300' : 'bg-rose-500'
                  }`}
                />
                <div>
                  <div className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>VIP Zone (Tiered Front Enclosure)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400">
                      ₹2,499
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Front-row views, air-conditioned hospitality lounge & valet
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                  isZoneSelected('zone-vip')
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 dark:bg-[#1a2336] text-slate-700 dark:text-slate-300'
                }`}
              >
                {isZoneSelected('zone-vip') ? 'Active' : 'Select'}
              </span>
            </div>
          </button>

          {/* ZONE 2: PREMIUM ZONE */}
          <button
            onClick={() => onSelectZone('zone-premium')}
            className={`w-full max-w-md p-3.5 rounded-xl border transition-all cursor-pointer text-left shadow-sm ${
              isZoneSelected('zone-premium')
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 ring-1 ring-rose-500'
                : 'bg-slate-50 dark:bg-[#0e1422] border-slate-200 dark:border-[#212c42] hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isZoneSelected('zone-premium') ? 'bg-rose-600 ring-2 ring-rose-300' : 'bg-slate-400'
                  }`}
                />
                <div>
                  <div className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Premium Zone (Priority Viewing Stalls)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-[#1a2336] text-slate-700 dark:text-slate-300">
                      ₹1,499
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Elevated sightlines, priority entry lanes & express refreshment bar
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                  isZoneSelected('zone-premium')
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 dark:bg-[#1a2336] text-slate-700 dark:text-slate-300'
                }`}
              >
                {isZoneSelected('zone-premium') ? 'Active' : 'Select'}
              </span>
            </div>
          </button>

          {/* ZONE 3: GENERAL ENTRY */}
          <button
            onClick={() => onSelectZone('zone-general')}
            className={`w-full max-w-lg p-3.5 rounded-xl border transition-all cursor-pointer text-left shadow-sm ${
              isZoneSelected('zone-general')
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 ring-1 ring-rose-500'
                : 'bg-slate-50 dark:bg-[#0e1422] border-slate-200 dark:border-[#212c42] hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isZoneSelected('zone-general') ? 'bg-rose-600 ring-2 ring-rose-300' : 'bg-emerald-500'
                  }`}
                />
                <div>
                  <div className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>General Zone (Open Lawn / Stalls)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400">
                      ₹799
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Full open-air grass access, food village & full sound clarity
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                  isZoneSelected('zone-general')
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 dark:bg-[#1a2336] text-slate-700 dark:text-slate-300'
                }`}
              >
                {isZoneSelected('zone-general') ? 'Active' : 'Select'}
              </span>
            </div>
          </button>
        </div>

        {/* Live Active Selection Bar */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#212c42] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Users className="w-4 h-4 text-rose-600" />
            <span>
              <strong className="text-slate-900 dark:text-white font-bold">{selectedTicketsCount}</strong> ticket{selectedTicketsCount !== 1 ? 's' : ''} selected
            </span>
            <span>·</span>
            <span>
              Total: <strong className="text-slate-900 dark:text-white font-mono font-bold">₹{totalPrice.toLocaleString('en-IN')}</strong>
            </span>
          </div>

          <span className="text-slate-500 text-[11px]">
            Zone syncs with ticket selector
          </span>
        </div>
      </div>

      {/* 2. Stylized CSS-based Mini Location Map */}
      <div className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Venue Connectivity & Directions</span>
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {venueName}, {neighborhood}, Chennai
            </p>
          </div>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(venueName + ' ' + neighborhood + ' Chennai')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-sm transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Stylized Clean Vector Map Layout */}
        <div className="relative w-full h-40 rounded-xl bg-[#0e1422] border border-slate-200 dark:border-[#212c42] overflow-hidden flex items-center justify-center p-4">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Arterial Corridors */}
            <path d="M-20 160 L200 80 L450 35 L700 0" stroke="#334155" strokeWidth="16" />
            <path d="M-20 160 L200 80 L450 35 L700 0" stroke="#64748b" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M-10 140 L210 65 L460 20 L700 -10" stroke="#0284c7" strokeWidth="4" />
            <line x1="280" y1="180" x2="210" y2="60" stroke="#334155" strokeWidth="10" />
          </svg>

          {/* Nandanam / Central Metro station callout */}
          <div className="absolute top-6 left-1/4 -translate-x-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-sky-400 text-[10px] font-mono text-sky-200 shadow-sm">
            <span>🚇 Chennai Metro Blue Line (Gate 2)</span>
          </div>

          {/* Venue Marker */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-md border-2 border-white">
              <MapPin className="w-3.5 h-3.5 fill-white" />
            </div>
            <div className="mt-1 px-2.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-center shadow-sm">
              <span className="text-xs font-bold text-white block font-display">
                {venueName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {neighborhood}, Chennai
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
