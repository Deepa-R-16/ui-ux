import React from 'react';
import { MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onSelectNeighborhood: (neighborhood: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectNeighborhood
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#080d16] border-t border-slate-200 dark:border-[#212c42] text-slate-600 dark:text-slate-400 pt-12 pb-10 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200 dark:border-[#212c42]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-display font-extrabold text-sm">
                M
              </div>
              <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                MADRAS<span className="text-rose-600">STAGE</span>
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              "Find your next Chennai moment."
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              The premier live event discovery and ticketing platform for Chennai. Connecting music lovers, sabha audiences, theatre troupes, and comedy audiences with authentic Madras experiences.
            </p>

            <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Built for the cultural soul of Chennai, Tamil Nadu</span>
            </div>
          </div>

          {/* Neighborhoods Column */}
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
              Chennai Localities
            </h4>
            <ul className="space-y-1.5 text-xs">
              {['Alwarpet', 'Mylapore', 'Nandanam', 'Besant Nagar', 'Adyar', 'Chetpet', 'Egmore', 'Guindy', 'ECR'].map((hood) => (
                <li key={hood}>
                  <button
                    onClick={() => onSelectNeighborhood(hood)}
                    className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left"
                  >
                    {hood}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
              Event Disciplines
            </h4>
            <ul className="space-y-1.5 text-xs">
              {['Music & Concerts', 'Stand-up Comedy', 'Theatre & Drama', 'Classical & Sabhas', 'Hands-on Workshops', 'Food Festivals', 'Night 10K Runs'].map((cat, i) => (
                <li key={i}>
                  <button
                    onClick={() => onSelectCategory(cat.split(' ')[0])}
                    className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizers Column */}
          <div>
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
              For Organizers
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#partner" onClick={(e) => { e.preventDefault(); alert("Madras Stage Box Office partnership opened."); }} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Host an Event in Chennai
                </a>
              </li>
              <li>
                <a href="#sabhas" onClick={(e) => { e.preventDefault(); alert("Sabha & Venue Network: The Music Academy, Sir Mutha Hall, Museum Theatre, Island Grounds."); }} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Sabha & Venue Network
                </a>
              </li>
              <li>
                <a href="#ticketing" onClick={(e) => { e.preventDefault(); alert("Instant QR gate check-in & RFID admissions enabled."); }} className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  RFID Gate Ticketing
                </a>
              </li>
            </ul>

            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 Madras Stage. All rights reserved. Made with pride in Chennai.
          </div>
          <div className="flex items-center gap-3">
            <span>Dark & White Theme</span>
            <span>·</span>
            <span>Real Chennai Events & Organizers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
