import React from 'react';
import { X, MapPin, Check, Compass } from 'lucide-react';
import { CHENNAI_NEIGHBORHOODS } from '../data/events';

interface NeighborhoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNeighborhood: string;
  onSelect: (neighborhood: string) => void;
}

export const NeighborhoodModal: React.FC<NeighborhoodModalProps> = ({
  isOpen,
  onClose,
  selectedNeighborhood,
  onSelect
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 shadow-2xl text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-rose-600 text-xs font-mono font-semibold uppercase mb-1">
            <Compass className="w-4 h-4" />
            <span>Chennai Localities & Sabhas</span>
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Select Your Neighborhood
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Filter live music, theatre prosceniums, sabhas, and comedy stages in your part of Chennai.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[60vh] overflow-y-auto pr-1">
          {CHENNAI_NEIGHBORHOODS.map((hood) => {
            const isSelected = selectedNeighborhood === hood;
            return (
              <button
                key={hood}
                onClick={() => {
                  onSelect(hood);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 text-rose-700 dark:text-rose-400 font-bold'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <MapPin
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-rose-600' : 'text-slate-400'
                    }`}
                  />
                  {isSelected && <Check className="w-3.5 h-3.5 text-rose-600" />}
                </div>
                <span className="text-xs leading-tight">
                  {hood}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
