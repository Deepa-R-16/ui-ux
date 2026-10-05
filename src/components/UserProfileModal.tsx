import React, { useState } from 'react';
import {
  X,
  User,
  MapPin,
  Mail,
  Phone,
  Ticket,
  ShieldCheck,
  Heart,
  Bell,
  CreditCard,
  ChevronRight,
  Sparkles,
  QrCode,
  Download,
  Calendar,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { BookedPass } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookedPasses: BookedPass[];
  favoritesCount: number;
  onOpenFavorites: () => void;
  onSelectPass?: (pass: BookedPass) => void;
  onGoToSlide?: (slide: 1 | 2 | 3 | 4 | 5 | 6) => void;
  theme: 'dark' | 'light';
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  bookedPasses,
  favoritesCount,
  onOpenFavorites,
  onSelectPass,
  onGoToSlide,
  theme
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'tickets' | 'settings'>('profile');
  const [userName, setUserName] = useState('Deepak Sundaram');
  const [userPhone, setUserPhone] = useState('+91 98401 23456');
  const [userEmail, setUserEmail] = useState('deepak.sundaram@chennai.in');
  const [userArea, setUserArea] = useState('Alwarpet, Chennai');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Margazhi Season Sabhas',
    'Tamil Indie Rock',
    'Standup Comedy',
    'Heritage Walks'
  ]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-5 sm:p-6 shadow-2xl text-slate-900 dark:text-slate-100 my-6 max-h-[92vh] flex flex-col">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          aria-label="Close profile modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1a253a] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Identity Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-[#212c42]">
          <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-display font-extrabold text-xl shadow-sm shrink-0">
            DS
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
                {userName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Patron</span>
              </span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
              <span>Member ID: #CHE-9921</span>
              <span>·</span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold">450 Madras Points</span>
              <span>·</span>
              <span>{userArea}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Profile vs Booked Passes vs Preferences */}
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-[#212c42] py-2 mt-2">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'profile'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a253a]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Account</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'tickets'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a253a]'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Booked Passes ({bookedPasses.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'settings'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a253a]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Preferences</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-4 pr-1">
          {/* TAB 1: PROFILE & ACCOUNT DETAILS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Quick Membership Card */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 block font-bold">
                      CHENNAI CULTURAL PATRON · GOLD PASS
                    </span>
                    <h3 className="font-display font-extrabold text-base tracking-tight mt-1">{userName}</h3>
                    <p className="text-[11px] text-slate-300 font-mono mt-0.5">Primary Sabha: Music Academy, Alwarpet</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-display font-black text-sm">
                    M
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                  <span>VALID THRU: 12/2027</span>
                  <span>CARD # 4802 · 9921 · 0026</span>
                </div>
              </div>

              {/* Editable Personal Form */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (for SMS Passes)
                    </label>
                    <input
                      type="text"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Chennai Residence Locality
                    </label>
                    <input
                      type="text"
                      value={userArea}
                      onChange={(e) => setUserArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Saved UPI / Payment Shortcut */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Default Payment Gateway
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-slate-900 dark:text-white">UPI: deepak.sundaram@okaxis</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-between pt-2">
                {saveSuccess ? (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">Auto-saved to local Chennai session</span>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: BOOKED PASSES & ADMISSION TICKETS */}
          {activeTab === 'tickets' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Confirmed Event Passes ({bookedPasses.length})
                </span>
                {onGoToSlide && (
                  <button
                    onClick={() => {
                      onClose();
                      onGoToSlide(6);
                    }}
                    className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Passes Deck (Slide 6)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {bookedPasses.length === 0 ? (
                <div className="text-center py-8 p-4 rounded-xl bg-slate-50 dark:bg-[#0e1422] border border-dashed border-slate-300 dark:border-slate-700">
                  <Ticket className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">No active passes yet</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Select any event in Slide 1, 2, or 3 and confirm your booking.
                  </p>
                </div>
              ) : (
                bookedPasses.map((pass) => (
                  <div
                    key={pass.bookingId}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] space-y-2 hover:border-rose-500 transition-colors shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                          {pass.bookingId}
                        </span>
                        <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mt-1">
                          {pass.eventTitle}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono text-emerald-600">
                          ₹{pass.totalAmount}
                        </span>
                        <span className="text-[10px] block text-slate-400">Paid online</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="truncate">{pass.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="truncate">{pass.venue}, {pass.neighborhood}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[11px] font-medium text-slate-500">
                        Zone: <strong className="text-slate-800 dark:text-slate-200">{pass.zone || 'General Entry'}</strong> · Gate: {pass.gate || 'Main Entrance'}
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          if (onGoToSlide) onGoToSlide(6);
                        }}
                        className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                      >
                        <QrCode className="w-3 h-3" />
                        <span>Show QR Pass</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: CULTURAL PREFERENCES & NOTIFICATIONS */}
          {activeTab === 'settings' && (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                  My Chennai Cultural Interests
                </h4>
                <p className="text-[11px] text-slate-500 mb-3">
                  Click to add or remove what events you want highlighted on your Madras Stage deck.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    'Margazhi Season Sabhas',
                    'Tamil Indie Rock',
                    'Standup Comedy',
                    'Heritage Walks',
                    'Pottery & Workshops',
                    'Food & Folk Festivals',
                    'College Fests (Saarang/Waves)',
                    'Night Running 10K',
                    'Beach Acoustic Sessions'
                  ].map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-[#0e1422] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#212c42] hover:border-rose-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="pt-3 border-t border-slate-200 dark:border-[#212c42] space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">
                  Notification Channels
                </h4>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] cursor-pointer">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">WhatsApp Ticket Delivery</span>
                    <span className="text-[10px] text-slate-500">Receive QR passes directly on your WhatsApp</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={(e) => setWhatsappAlerts(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] cursor-pointer">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">SMS Gate Reminders</span>
                    <span className="text-[10px] text-slate-500">Get 2-hour before gate opening notifications</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#212c42] flex items-center justify-between mt-2">
          <button
            onClick={() => {
              onClose();
              onOpenFavorites();
            }}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 flex items-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>Saved Wishlist ({favoritesCount})</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#1a253a] hover:bg-slate-200 dark:hover:bg-[#253450] text-slate-800 dark:text-slate-100 font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
