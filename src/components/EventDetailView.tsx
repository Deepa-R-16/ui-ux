import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Check,
  ShieldCheck,
  Ticket,
  ChevronRight,
  Info,
  Building,
  Mail,
  Phone,
  Globe,
  Award
} from 'lucide-react';
import { PulseEvent, TicketType, SelectedTicketBooking } from '../types';
import { AbstractEventVisual } from './AbstractEventVisual';
import { InteractiveVenueMap } from './InteractiveVenueMap';

interface EventDetailViewProps {
  event: PulseEvent;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
  onProceedToCheckout: (bookings: SelectedTicketBooking[], subtotal: number, bookingFee: number, total: number) => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onProceedToCheckout
}) => {
  // Booking state: Quantities per ticket id
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    event.tickets.forEach((t, idx) => {
      initial[t.id] = idx === 0 ? 2 : 0; // Default: 2 tickets selected as requested
    });
    return initial;
  });

  // Currently focused zone ID
  const [activeZoneId, setActiveZoneId] = useState<string>(event.tickets[0]?.zoneId || 'zone-general');

  // Share link feedback toast
  const [shareToast, setShareToast] = useState(false);

  // Ref to scroll to booking ticket area
  const bookingRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const handleScrollToBooking = () => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [ticketId]: next };
    });

    const ticket = event.tickets.find((t) => t.id === ticketId);
    if (ticket && delta > 0) {
      setActiveZoneId(ticket.zoneId);
    }
  };

  const handleZoneSelectFromMap = (zoneId: string) => {
    setActiveZoneId(zoneId);
    const correspondingTicket = event.tickets.find((t) => t.zoneId === zoneId);
    if (correspondingTicket && (quantities[correspondingTicket.id] || 0) === 0) {
      setQuantities((prev) => ({
        ...prev,
        [correspondingTicket.id]: 1
      }));
    }
  };

  // Calculations
  const totalSelectedTicketsCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  const subtotal = event.tickets.reduce((sum, ticket) => {
    const qty = quantities[ticket.id] || 0;
    return sum + qty * ticket.price;
  }, 0);

  const bookingFee = totalSelectedTicketsCount > 0 ? totalSelectedTicketsCount * 40 : 0;
  const grandTotal = subtotal + bookingFee;

  const handleContinuePayment = () => {
    if (totalSelectedTicketsCount === 0) return;

    const selectedList: SelectedTicketBooking[] = event.tickets
      .filter((t) => (quantities[t.id] || 0) > 0)
      .map((t) => ({
        ticketId: t.id,
        ticketName: t.name,
        price: t.price,
        quantity: quantities[t.id],
        zoneId: t.zoneId
      }));

    onProceedToCheckout(selectedList, subtotal, bookingFee, grandTotal);
  };

  return (
    <div className="min-h-screen pb-24 text-slate-900 dark:text-slate-100 bg-white dark:bg-[#0b0f19] transition-colors">
      {/* Toast alert */}
      {shareToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium text-xs shadow-md flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-500" />
          <span>Event link copied to clipboard!</span>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <div className="sticky top-16 md:top-18 z-30 bg-white dark:bg-[#0b0f19] border-b border-slate-200 dark:border-[#212c42] shadow-sm py-3 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Back to events */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b2b] hover:bg-slate-200 dark:hover:bg-[#1a2438] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#212c42] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to events</span>
          </button>

          {/* Title breadcrumb */}
          <div className="hidden md:block text-xs font-mono text-slate-500 truncate max-w-sm">
            Discover <span className="text-slate-300 dark:text-slate-600">/</span> {event.category} <span className="text-slate-300 dark:text-slate-600">/</span>{' '}
            <span className="text-slate-900 dark:text-white font-semibold">{event.title}</span>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(event.id)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-[#131b2b] text-slate-700 dark:text-slate-300 hover:text-rose-600 border border-slate-200 dark:border-[#212c42] shadow-sm transition-colors cursor-pointer"
              title="Bookmark Event"
            >
              <Heart
                className={`w-4 h-4 ${isBookmarked ? 'text-rose-600 fill-rose-600' : ''}`}
              />
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b2b] text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-rose-600 border border-slate-200 dark:border-[#212c42] shadow-sm transition-colors cursor-pointer"
              title="Share event"
            >
              <Share2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* EVENT HEADER HERO BANNER - Flat Color Blocks */}
        <div className="relative rounded-3xl bg-slate-100 dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] overflow-hidden shadow-sm mb-10">
          {/* Top visual graphic */}
          <div className="relative w-full h-52 sm:h-64 lg:h-72 overflow-hidden bg-[#0e1422]">
            <AbstractEventVisual
              eventId={event.id}
              theme={event.visualTheme}
              title={event.title}
              category={event.category}
              primaryColor={event.primaryColor}
              accentColor={event.accentColor}
              size="hero"
            />

            {/* Category tag */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-slate-900 text-white border border-slate-700 shadow-sm">
                {event.category}
              </span>
              {event.badge && (
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-600 text-white shadow-sm">
                  {event.badge}
                </span>
              )}
            </div>
          </div>

          {/* Marquee Header Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                {/* Event Title */}
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
                  {event.title}
                </h1>

                {/* Subtitle / Tagline */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mb-6 leading-relaxed">
                  "{event.tagline}"
                </p>

                {/* Event Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-slate-200 dark:border-[#212c42]">
                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center shrink-0 shadow-sm border border-rose-200/50 dark:border-rose-900/50">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block leading-tight">Date</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">{event.fullDate}</span>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-200/70 dark:bg-[#1a2336] text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-sm border border-slate-300/50 dark:border-[#2a3854]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block leading-tight">Time</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">{event.timeString}</span>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center gap-3 sm:col-span-2 md:col-span-1">
                    <div className="w-9 h-9 rounded-lg bg-slate-200/70 dark:bg-[#1a2336] text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-sm border border-slate-300/50 dark:border-[#2a3854]">
                      <MapPin className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block leading-tight">Venue</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[200px] block">
                        {event.venue}, {event.neighborhood}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Primary CTA */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] shadow-sm">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Starting From</span>
                  <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                    ₹{event.startingPrice}{' '}
                    <span className="text-xs font-normal text-slate-500 font-sans">onwards</span>
                  </div>
                </div>

                <button
                  onClick={handleScrollToBooking}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Book Tickets</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Event Details & Organization (Col 1 to 7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* 1. ABOUT THE EVENT */}
            <section className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 sm:p-7 shadow-sm">
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-5 rounded-full bg-rose-600" />
                <span>About The Event</span>
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {event.descriptionParagraphs.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </section>

            {/* 2. EVENT ORGANIZATION DETAILS */}
            <section className="rounded-2xl bg-white dark:bg-[#131b2b] border-2 border-rose-600/40 p-6 sm:p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#212c42]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold shadow-sm">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        {event.organizer.name}
                      </h3>
                      {event.organizer.isVerified && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                          <Check className="w-3 h-3" />
                          <span>Verified Organizer</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      Organizing live arts in Chennai since {event.organizer.establishedYear} · {event.organizer.eventsHosted}+ Events Staged
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#0e1422] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#212c42] self-start sm:self-auto shadow-sm">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{event.organizer.rating} / 5.0 Rating</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 my-4 leading-relaxed">
                {event.organizer.description}
              </p>

              {/* Official Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] flex items-center gap-2 truncate shadow-sm">
                  <Mail className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span className="truncate">{event.organizer.contactEmail}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] flex items-center gap-2 truncate shadow-sm">
                  <Phone className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span className="truncate">{event.organizer.contactPhone}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] flex items-center gap-2 truncate shadow-sm">
                  <Globe className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span className="truncate font-mono">{event.organizer.website}</span>
                </div>
              </div>
            </section>

            {/* 3. ARTIST LINE-UP (Text-Only Cards) */}
            <section className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-5 rounded-full bg-slate-900 dark:bg-white" />
                  <span>Line-Up & Performers</span>
                </h2>
                <span className="text-xs font-mono text-slate-500">
                  {event.lineup.length} Acts Scheduled
                </span>
              </div>

              {/* Text-only performer cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {event.lineup.map((artist, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#0e1422] border border-slate-200 dark:border-[#212c42] flex flex-col justify-between gap-2 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                        <span className="text-rose-600 font-bold uppercase">{artist.role}</span>
                        <span>{artist.timeSlot}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {artist.name}
                      </h4>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {artist.genre}
                      </div>
                    </div>

                    {artist.bio && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-[#212c42] pt-2">
                        {artist.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. TIMINGS TIMELINE */}
            <section className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 sm:p-7 shadow-sm">
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="w-2 h-5 rounded-full bg-rose-600" />
                <span>Event Schedule & Timings</span>
              </h2>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300 dark:before:bg-[#212c42]">
                {event.schedule.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full bg-rose-600 shadow-sm" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xs font-bold text-rose-600">
                          {item.time}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">—</span>
                        <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                          {item.activity}
                        </h4>
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. VENUE & LOCATION MAP */}
            <InteractiveVenueMap
              venueName={event.venue}
              neighborhood={event.neighborhood}
              selectedZoneId={activeZoneId}
              onSelectZone={handleZoneSelectFromMap}
              tickets={event.tickets}
              selectedTicketsCount={totalSelectedTicketsCount}
              totalPrice={grandTotal}
            />
          </div>

          {/* RIGHT COLUMN: Ticket Selection & Live Booking Summary */}
          <div ref={bookingRef} className="lg:col-span-5 sticky top-28 space-y-6">
            {/* TICKET TYPES CONTAINER */}
            <div className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-rose-600" />
                  <span>Select Tickets</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {totalSelectedTicketsCount} selected
                </span>
              </div>

              {/* Ticket Cards List */}
              <div className="space-y-3.5">
                {event.tickets.map((ticket) => {
                  const qty = quantities[ticket.id] || 0;

                  return (
                    <div
                      key={ticket.id}
                      className={`p-4 rounded-xl border transition-all ${
                        qty > 0
                          ? 'border-rose-600 bg-rose-50/50 dark:bg-rose-950/20 shadow-sm'
                          : 'border-slate-200 dark:border-[#212c42] bg-slate-50 dark:bg-[#0e1422]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                              {ticket.name}
                            </h4>
                            {ticket.availability === 'Filling Fast' && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400">
                                Filling Fast
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {ticket.description}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-display text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                            ₹{ticket.price}
                          </span>
                        </div>
                      </div>

                      {/* Benefits list */}
                      <ul className="my-2.5 space-y-1 text-xs text-slate-600 dark:text-slate-300 border-y border-slate-200 dark:border-[#212c42] py-2">
                        {ticket.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-500 font-medium">Quantity</span>
                        <div className="flex items-center gap-2 bg-white dark:bg-[#131b2b] p-1 rounded-lg border border-slate-200 dark:border-[#212c42] shadow-sm">
                          <button
                            onClick={() => handleQuantityChange(ticket.id, -1)}
                            disabled={qty === 0}
                            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold cursor-pointer ${
                              qty === 0 ? 'text-slate-300 dark:text-slate-600' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1a2336]'
                            }`}
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold w-5 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(ticket.id, 1)}
                            disabled={qty >= 10}
                            className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1a2336] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LIVE BOOKING SUMMARY CARD */}
            <div className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 shadow-sm">
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-3">
                Booking Summary
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-[#212c42] pb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Event:</span>
                  <span className="text-slate-900 dark:text-white font-semibold text-right">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Venue:</span>
                  <span className="text-slate-900 dark:text-white text-right">
                    {event.dateBadge}, {event.venue}
                  </span>
                </div>

                {event.tickets
                  .filter((t) => (quantities[t.id] || 0) > 0)
                  .map((t) => (
                    <div key={t.id} className="flex justify-between text-slate-900 dark:text-slate-100 font-medium">
                      <span>
                        {t.name} ({quantities[t.id]} × ₹{t.price}):
                      </span>
                      <span className="font-mono">
                        ₹{(quantities[t.id] * t.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}

                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-[#212c42]">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    Facility & GST (18%)
                    <Info className="w-3 h-3 text-slate-400" />
                  </span>
                  <span className="font-mono">₹{bookingFee.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="pt-3 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-slate-500 block font-mono">Total Payable</span>
                  <span className="font-display text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Instant Digital Pass</span>
                  </span>
                </div>
              </div>

              {/* Continue to Payment CTA */}
              <button
                onClick={handleContinuePayment}
                disabled={totalSelectedTicketsCount === 0}
                className={`w-full py-3.5 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  totalSelectedTicketsCount > 0
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-slate-200 dark:bg-[#1a2336] text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Continue to Payment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
