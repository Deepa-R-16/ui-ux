import React, { useState } from 'react';
import { Search, MapPin, Ticket, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentNeighborhood: string;
  onSelectNeighborhood: (neighborhood: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  favoriteCount: number;
  bookedTicketsCount: number;
  onOpenMyTickets: () => void;
  onOpenFavorites: () => void;
  onOpenNeighborhoodModal: () => void;
  onOpenProfile: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (newTheme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentNeighborhood,
  onSelectNeighborhood,
  searchQuery,
  onSearchChange,
  activeNav,
  onNavClick,
  favoriteCount,
  bookedTicketsCount,
  onOpenMyTickets,
  onOpenFavorites,
  onOpenNeighborhoodModal,
  onOpenProfile,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-[#212c42] shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 gap-3">
          {/* Brand Wordmark & Location */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <button
              onClick={() => onNavClick('Discover')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              {/* Bold Solid Color Block Badge */}
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-display font-extrabold text-base shadow-sm group-hover:bg-rose-700 transition-colors">
                M
              </div>

              <div>
                <div className="font-display font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  MADRAS<span className="text-rose-600">STAGE</span>
                </div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 dark:text-slate-400">
                  Chennai Live Scene
                </div>
              </div>
            </button>

            {/* Neighborhood Location Dropdown */}
            <button
              onClick={onOpenNeighborhoodModal}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b2b] hover:bg-slate-200 dark:hover:bg-[#1a2438] text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#212c42] shadow-sm transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span className="font-semibold truncate max-w-[130px]">
                {currentNeighborhood === 'All Chennai' ? 'All Chennai' : currentNeighborhood}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Center Search Input */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search real events, artists, sabhas..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100 dark:bg-[#131b2b] text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-[#212c42] shadow-sm focus:outline-none focus:border-rose-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Navigation & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { name: 'Discover', id: 'Discover' },
                { name: 'Categories', id: 'Categories' },
                { name: 'Near Me', id: 'Near Me' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeNav === item.id
                      ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#131b2b]'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* My Tickets Button */}
              <button
                onClick={onOpenMyTickets}
                className="relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131b2b] cursor-pointer"
              >
                <Ticket className="w-3.5 h-3.5 text-rose-600" />
                <span>My Tickets</span>
                {bookedTicketsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                    {bookedTicketsCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Bookmarks Counter Button */}
            <button
              onClick={onOpenFavorites}
              aria-label="Saved events"
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#131b2b] transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 dark:bg-white text-[10px] font-bold text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* UNIFIED THEME TOGGLE (Visible on Desktop and Mobile) */}
            <div className="flex items-center">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} size="compact" />
            </div>

            {/* Profile icon — Opens User Profile Modal */}
            <button
              onClick={onOpenProfile}
              aria-label="View user profile and preferences"
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b2b] text-slate-700 dark:text-slate-200 hover:border-rose-500 border border-slate-200 dark:border-[#212c42] shadow-sm transition-colors cursor-pointer"
              title="User Profile & Interests"
            >
              <User className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-semibold hidden sm:inline">Profile</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131b2b]"
              aria-label="Open mobile navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-[#212c42] space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Theme Mode</span>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} size="normal" />
            </div>

            <div className="flex items-center gap-2 px-1">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Chennai events..."
                className="w-full py-1.5 px-2 text-xs rounded-lg bg-slate-100 dark:bg-[#131b2b] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-[#212c42]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  onNavClick('Discover');
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-[#131b2b] text-left shadow-sm"
              >
                🏠 Discover Events
              </button>
              <button
                onClick={() => {
                  onOpenNeighborhoodModal();
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-[#131b2b] text-left shadow-sm"
              >
                📍 Change Locality
              </button>
              <button
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-[#131b2b] text-left shadow-sm"
              >
                👤 My Profile
              </button>
              <button
                onClick={() => {
                  onOpenMyTickets();
                  setMobileMenuOpen(false);
                }}
                className="p-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-[#131b2b] text-left flex items-center justify-between shadow-sm"
              >
                <span>🎟️ Booked Tickets</span>
                {bookedTicketsCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-rose-600 text-[10px] text-white font-bold">
                    {bookedTicketsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
