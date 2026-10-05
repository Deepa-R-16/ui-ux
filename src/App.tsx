import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CHENNAI_EVENTS } from './data/events';
import { PulseEvent, SelectedTicketBooking, BookedPass } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryChips } from './components/CategoryChips';
import { PresentationDeckBar, DeckScreenIndex } from './components/PresentationDeckBar';
import { DeckSwipeHud } from './components/DeckSwipeHud';
import { EventCard } from './components/EventCard';
import { EventFilters, DateFilterOption, PriceFilterOption, SortOption } from './components/EventFilters';
import { EventDetailView } from './components/EventDetailView';
import { InteractiveVenueMap } from './components/InteractiveVenueMap';
import { CheckoutModal } from './components/CheckoutModal';
import { MyTicketsModal } from './components/MyTicketsModal';
import { UserProfileModal } from './components/UserProfileModal';
import { FavoritesModal } from './components/FavoritesModal';
import { NeighborhoodModal } from './components/NeighborhoodModal';
import { Footer } from './components/Footer';
import {
  Compass,
  Ticket,
  Heart,
  Home,
  ArrowRight,
  Flame,
  Layers,
  Sparkles,
  Calendar,
  MapPin,
  Check,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  User,
  Info,
  MoveHorizontal
} from 'lucide-react';

export default function App() {
  // Theme state: 'dark' or 'light', persisted in localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Synchronize theme to <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('dark', 'light');
    body.classList.remove('dark', 'light');

    root.classList.add(theme);
    body.classList.add(theme);

    root.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);

    root.style.colorScheme = theme;

    try {
      localStorage.setItem('madras-stage-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
  };

  // PPT DECK SCREEN INDEX: 0 to 5
  // 0: Discover & Headliners
  // 1: Near You in Chennai (Localities & Sabhas)
  // 2: All Events Calendar & Categories
  // 3: Event Dossier (Details & Lineup)
  // 4: Seating & Ticket Booking
  // 5: Confirmed Digital Passes
  const [currentSlide, setCurrentSlide] = useState<DeckScreenIndex>(0);

  // Swipe / Drag gesture state for PPT-like horizontal moving
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const wheelLock = useRef<boolean>(false);

  // Currently selected event
  const [selectedEvent, setSelectedEvent] = useState<PulseEvent>(
    () => CHENNAI_EVENTS.find((e) => e.id === 'moonlight-music-fest') || CHENNAI_EVENTS[0]
  );

  // Active top navigation tab
  const [activeNav, setActiveNav] = useState('Discover');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Neighborhood filter
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Chennai');

  // Dedicated single-list filter for Slide 1 (Near You in Chennai)
  const [nearYouArea, setNearYouArea] = useState<string>('All Chennai');

  // Date filter
  const [selectedDate, setSelectedDate] = useState<DateFilterOption>('All');

  // Price filter
  const [selectedPrice, setSelectedPrice] = useState<PriceFilterOption>('All');

  // Sort order
  const [sortBy, setSortBy] = useState<SortOption>('Recommended');

  // Bookmarked event IDs
  const [bookmarks, setBookmarks] = useState<string[]>([
    'margazhi-sanjay-live',
    'moonlight-music-fest'
  ]);

  // Booked Passes state (Real example ticket pass)
  const [bookedPasses, setBookedPasses] = useState<BookedPass[]>([
    {
      bookingId: 'MS-CHE-7219-2026',
      eventId: 'margazhi-sanjay-live',
      eventTitle: 'Margazhi Season 2026: Sanjay Subrahmanyan Live',
      date: 'Thursday, 22 October 2026',
      time: '6:00 PM – 9:00 PM',
      venue: 'The Music Academy',
      neighborhood: 'Alwarpet',
      tickets: [
        { name: 'Center Stalls', quantity: 2, price: 1200 }
      ],
      totalAmount: 2480,
      attendeeName: 'Deepak Sundaram',
      attendeeEmail: 'deepak.sundaram@chennai.in',
      attendeePhone: '+91 98401 23456',
      bookedAt: '5 Oct 2026',
      qrPayload: 'MADRAS-STAGE:margazhi-sanjay-live:2TICKETS',
      gate: 'Main Foyer (TTK Road Entrance)',
      zone: 'Center Stalls'
    }
  ]);

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMyTicketsOpen, setIsMyTicketsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);

  // Seating & Booking tickets state for selected event
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'ticket-gen': 2,
    'ticket-prem': 0,
    'ticket-vip': 0
  });

  const [activeZoneId, setActiveZoneId] = useState<string>('zone-general');

  // Temporary checkout payload
  const [checkoutPayload, setCheckoutPayload] = useState<{
    bookings: SelectedTicketBooking[];
    subtotal: number;
    bookingFee: number;
    total: number;
  }>({
    bookings: [],
    subtotal: 0,
    bookingFee: 0,
    total: 0
  });

  // Slide navigation with smooth scroll to top
  const goToSlide = (slideIndex: DeckScreenIndex) => {
    setCurrentSlide(slideIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation for PPT slides (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' && currentSlide < 5) {
        goToSlide((currentSlide + 1) as DeckScreenIndex);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        goToSlide((currentSlide - 1) as DeckScreenIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Touch Swipe Gesture Handlers (Mobile PPT slide movement)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;

    // Check if horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if ((currentSlide === 0 && diffX > 0) || (currentSlide === 5 && diffX < 0)) {
        setDragOffset(diffX * 0.25); // Edge resistance
      } else {
        setDragOffset(diffX);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragOffset < -55 && currentSlide < 5) {
      goToSlide((currentSlide + 1) as DeckScreenIndex);
    } else if (dragOffset > 55 && currentSlide > 0) {
      goToSlide((currentSlide - 1) as DeckScreenIndex);
    }
    setDragOffset(0);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Desktop Mouse Drag Gesture Handlers (Click and drag to slide PPT)
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, select, textarea, [data-interactive="true"]')) {
      return;
    }
    mouseStartX.current = e.clientX;
    isMouseDown.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const diffX = e.clientX - mouseStartX.current;
    if ((currentSlide === 0 && diffX > 0) || (currentSlide === 5 && diffX < 0)) {
      setDragOffset(diffX * 0.25);
    } else {
      setDragOffset(diffX);
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;
    setIsDragging(false);
    if (dragOffset < -65 && currentSlide < 5) {
      goToSlide((currentSlide + 1) as DeckScreenIndex);
    } else if (dragOffset > 65 && currentSlide > 0) {
      goToSlide((currentSlide - 1) as DeckScreenIndex);
    }
    setDragOffset(0);
    mouseStartX.current = null;
  };

  // Trackpad horizontal swipe
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (wheelLock.current) return;
      if (e.deltaX > 40 && currentSlide < 5) {
        wheelLock.current = true;
        goToSlide((currentSlide + 1) as DeckScreenIndex);
        setTimeout(() => { wheelLock.current = false; }, 450);
      } else if (e.deltaX < -40 && currentSlide > 0) {
        wheelLock.current = true;
        goToSlide((currentSlide - 1) as DeckScreenIndex);
        setTimeout(() => { wheelLock.current = false; }, 450);
      }
    }
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (eventId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  // Open event detail view (Screen 3)
  const handleSelectEvent = (event: PulseEvent) => {
    setSelectedEvent(event);
    const initial: Record<string, number> = {};
    event.tickets.forEach((t, idx) => {
      initial[t.id] = idx === 0 ? 2 : 0;
    });
    setQuantities(initial);
    setActiveZoneId(event.tickets[0]?.zoneId || 'zone-general');
    goToSlide(3);
  };

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [ticketId]: next };
    });
    const ticket = selectedEvent.tickets.find((t) => t.id === ticketId);
    if (ticket && delta > 0) {
      setActiveZoneId(ticket.zoneId);
    }
  };

  const handleZoneSelectFromMap = (zoneId: string) => {
    setActiveZoneId(zoneId);
    const correspondingTicket = selectedEvent.tickets.find((t) => t.zoneId === zoneId);
    if (correspondingTicket && (quantities[correspondingTicket.id] || 0) === 0) {
      setQuantities((prev) => ({
        ...prev,
        [correspondingTicket.id]: 1
      }));
    }
  };

  // Pricing calculations
  const totalSelectedTicketsCount = Object.values(quantities).reduce((a, b) => a + b, 0);
  const subtotal = selectedEvent.tickets.reduce((sum, ticket) => {
    const qty = quantities[ticket.id] || 0;
    return sum + qty * ticket.price;
  }, 0);
  const bookingFee = totalSelectedTicketsCount > 0 ? totalSelectedTicketsCount * 40 : 0;
  const grandTotal = subtotal + bookingFee;

  const handleProceedToCheckout = () => {
    if (totalSelectedTicketsCount === 0) return;
    const selectedList: SelectedTicketBooking[] = selectedEvent.tickets
      .filter((t) => (quantities[t.id] || 0) > 0)
      .map((t) => ({
        ticketId: t.id,
        ticketName: t.name,
        price: t.price,
        quantity: quantities[t.id],
        zoneId: t.zoneId
      }));

    setCheckoutPayload({ bookings: selectedList, subtotal, bookingFee, total: grandTotal });
    setIsCheckoutOpen(true);
  };

  const handleBookingConfirmed = (newPass: BookedPass) => {
    setBookedPasses((prev) => [newPass, ...prev]);
    goToSlide(5); // Move to Digital Passes screen
  };

  // Top Nav clicks
  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'Discover') {
      goToSlide(0);
    } else if (nav === 'Near Me') {
      goToSlide(1);
    } else if (nav === 'Categories') {
      goToSlide(2);
    }
  };

  // Filtering for Screen 2 (All Events Calendar)
  const filteredEvents = useMemo(() => {
    return CHENNAI_EVENTS.filter((event) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesVenue = event.venue.toLowerCase().includes(query);
        const matchesNeighborhood = event.neighborhood.toLowerCase().includes(query);
        const matchesCategory = event.category.toLowerCase().includes(query);
        const matchesOrganizer = event.organizer.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesVenue && !matchesNeighborhood && !matchesCategory && !matchesOrganizer) {
          return false;
        }
      }

      if (selectedCategory !== 'All' && selectedCategory !== 'Trending') {
        if (event.category !== selectedCategory) return false;
      }

      if (selectedNeighborhood !== 'All Chennai') {
        if (event.neighborhood !== selectedNeighborhood) return false;
      }

      if (selectedDate === 'This Weekend') {
        if (!event.dateBadge.includes('18') && !event.dateBadge.includes('20') && !event.dateBadge.includes('22') && !event.dateBadge.includes('24') && !event.dateBadge.includes('25')) {
          return false;
        }
      } else if (selectedDate === 'Next Week') {
        if (!event.dateBadge.includes('26') && !event.dateBadge.includes('1 NOV') && !event.dateBadge.includes('3 NOV')) {
          return false;
        }
      }

      if (selectedPrice === 'Under ₹500') {
        if (event.startingPrice >= 500) return false;
      } else if (selectedPrice === '₹500 - ₹1000') {
        if (event.startingPrice < 500 || event.startingPrice > 1000) return false;
      } else if (selectedPrice === 'Above ₹1000') {
        if (event.startingPrice <= 1000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.startingPrice - b.startingPrice;
      if (sortBy === 'Popular') return b.reviewCount - a.reviewCount;
      if (sortBy === 'Newest') return b.id.localeCompare(a.id);
      if (a.isFeatured) return -1;
      return b.rating - a.rating;
    });
  }, [searchQuery, selectedCategory, selectedNeighborhood, selectedDate, selectedPrice, sortBy]);

  // List for Screen 1 (Near You in Chennai)
  const nearYouList = useMemo(() => {
    if (nearYouArea === 'All Chennai') {
      return CHENNAI_EVENTS.slice(0, 4);
    }
    return CHENNAI_EVENTS.filter((e) => e.neighborhood === nearYouArea);
  }, [nearYouArea]);

  const nearYouFilterTabs = [
    'All Chennai',
    'Alwarpet',
    'Nandanam',
    'Mylapore',
    'Chetpet',
    'Egmore',
    'Adyar',
    'Besant Nagar',
    'Island Grounds',
    'Guindy',
    'ECR',
  ];

  const bookmarkedEventObjects = useMemo(() => {
    return CHENNAI_EVENTS.filter((e) => bookmarks.includes(e.id));
  }, [bookmarks]);

  return (
    <div
      data-theme={theme}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'dark bg-[#0b0f19] text-slate-100' : 'light bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* 1. GLOBAL HEADER */}
      <Header
        currentNeighborhood={selectedNeighborhood}
        onSelectNeighborhood={setSelectedNeighborhood}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        favoriteCount={bookmarks.length}
        bookedTicketsCount={bookedPasses.length}
        onOpenMyTickets={() => goToSlide(5)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenNeighborhoodModal={() => setIsNeighborhoodOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. PPT DECK BAR (Top hairline progress & clean stages) */}
      <PresentationDeckBar
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
        selectedEventTitle={selectedEvent.title}
        bookedPassesCount={bookedPasses.length}
      />

      {/* 3. CONTINUOUS HORIZONTAL PRESENTATION CANVAS (PPT Slide Swiper) */}
      <main
        className="flex-1 w-full overflow-hidden relative cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Horizontal Slide Track: moves horizontally like PPT presentation */}
        <div
          className="flex w-full select-none"
          style={{
            transform: `translate3d(calc(-${currentSlide * 100}% + ${dragOffset}px), 0, 0)`,
            transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.18, 0.9, 0.28, 1)',
            willChange: 'transform'
          }}
        >
          {/* ======================================================== */}
          {/* SCREEN 0: DISCOVER & CITY SPOTLIGHT HEADLINERS */}
          {/* ======================================================== */}
          <div className="w-full min-w-full flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Hero Section */}
              <Hero
                onExploreClick={() => goToSlide(2)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                currentNeighborhood={selectedNeighborhood}
                onOpenNeighborhoodModal={() => setIsNeighborhoodOpen(true)}
                onSelectQuickTag={(tag) => {
                  setNearYouArea(tag);
                  goToSlide(1);
                }}
              />

              {/* Marquee Headliners */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                      High Demand Tickets
                    </div>
                    <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                      Trending Right Now in Chennai
                    </h2>
                  </div>
                  <button
                    onClick={() => goToSlide(2)}
                    className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View All 11 Events</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CHENNAI_EVENTS.filter((e) => e.badge === 'Trending' || e.isFeatured).slice(0, 3).map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isBookmarked={bookmarks.includes(event.id)}
                      onToggleBookmark={handleToggleBookmark}
                      onSelectEvent={handleSelectEvent}
                      featured={event.isFeatured}
                    />
                  ))}
                </div>
              </div>

              {/* Swipe Left Prompt */}
              <div className="pt-4 flex items-center justify-center">
                <button
                  onClick={() => goToSlide(1)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#131b2b] hover:bg-slate-200 dark:hover:bg-[#1a253a] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#212c42] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <MoveHorizontal className="w-4 h-4 text-rose-600" />
                  <span>Swipe left to explore neighborhood stages</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCREEN 1: NEAR YOU IN CHENNAI (HYPERLOCAL DISCOVERY) */}
          {/* ======================================================== */}
          <div className="w-full min-w-full flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Near You Single-List Filter Box */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                      Hyperlocal Neighborhood Spotlight
                    </div>
                    <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                      Near You in Chennai
                    </h2>
                  </div>

                  <div className="text-xs text-slate-500 font-mono">
                    Active Area: <strong className="text-slate-900 dark:text-white">{nearYouArea}</strong> ({nearYouList.length} events)
                  </div>
                </div>

                {/* Neighborhood selection chips: updates this single list */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {nearYouFilterTabs.map((hood) => {
                    const isActive = nearYouArea === hood;
                    return (
                      <button
                        key={hood}
                        onClick={() => setNearYouArea(hood)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shadow-sm ${
                          isActive
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 dark:bg-[#0e1422] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#212c42] hover:border-slate-400'
                        }`}
                      >
                        📍 {hood}
                      </button>
                    );
                  })}
                </div>

                {/* Focused Single Event List for Near You */}
                {nearYouList.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 dark:bg-[#0e1422] rounded-xl border border-slate-200 dark:border-[#212c42] p-6 space-y-2">
                    <MapPin className="w-8 h-8 mx-auto text-slate-400" />
                    <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                      No live events in {nearYouArea} right now
                    </h4>
                    <p className="text-xs text-slate-500">
                      Check nearby neighborhoods like Alwarpet, Nandanam, or Besant Nagar.
                    </p>
                    <button
                      onClick={() => setNearYouArea('All Chennai')}
                      className="mt-2 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold shadow-sm"
                    >
                      View All Chennai Events
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
                    {nearYouList.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        isBookmarked={bookmarks.includes(event.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onSelectEvent={handleSelectEvent}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Swipe Left Prompt */}
              <div className="pt-2 flex items-center justify-center">
                <button
                  onClick={() => goToSlide(2)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#131b2b] hover:bg-slate-200 dark:hover:bg-[#1a253a] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#212c42] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <MoveHorizontal className="w-4 h-4 text-rose-600" />
                  <span>Swipe left to browse full 11-event calendar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCREEN 2: COMPLETE CITY CALENDAR & CATEGORIES */}
          {/* ======================================================== */}
          <div className="w-full min-w-full flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Category horizontal selector */}
              <CategoryChips
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />

              {/* Filter toolbar */}
              <EventFilters
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedArea={selectedNeighborhood}
                onAreaChange={setSelectedNeighborhood}
                selectedPrice={selectedPrice}
                onPriceChange={setSelectedPrice}
                sortBy={sortBy}
                onSortChange={setSortBy}
                activeFilterCount={0}
                onResetFilters={() => {
                  setSelectedCategory('All');
                  setSelectedNeighborhood('All Chennai');
                  setSelectedDate('All');
                  setSelectedPrice('All');
                  setSearchQuery('');
                }}
                totalResults={filteredEvents.length}
              />

              {/* Events Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isBookmarked={bookmarks.includes(event.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectEvent={handleSelectEvent}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCREEN 3: EVENT DETAILS & ORGANIZER PROFILE */}
          {/* ======================================================== */}
          <div className="w-full min-w-full flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Event Detail View */}
              <EventDetailView
                event={selectedEvent}
                onBack={() => goToSlide(2)}
                isBookmarked={bookmarks.includes(selectedEvent.id)}
                onToggleBookmark={handleToggleBookmark}
                onProceedToCheckout={() => goToSlide(4)}
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCREEN 4: SEATING LAYOUT & ZONE SELECTION */}
          {/* ======================================================== */}
          <div className="w-full min-w-full flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#212c42]">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-rose-600 block">
                    {selectedEvent.venue} · {selectedEvent.neighborhood}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Select Your Admission Zone &amp; Tickets
                  </h2>
                </div>

                <button
                  onClick={() => goToSlide(3)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b2b] text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-[#212c42] cursor-pointer"
                >
                  ← Back to Details
                </button>
              </div>

              {/* Interactive Layout & Zone Selection Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Interactive Venue Map */}
                <div className="lg:col-span-7">
                  <InteractiveVenueMap
                    venueName={selectedEvent.venue}
                    neighborhood={selectedEvent.neighborhood}
                    selectedZoneId={activeZoneId}
                    onSelectZone={handleZoneSelectFromMap}
                    tickets={selectedEvent.tickets}
                    selectedTicketsCount={totalSelectedTicketsCount}
                    totalPrice={grandTotal}
                  />
                </div>

                {/* Tickets Selector & Live Summary */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 shadow-sm">
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-3">
                      Choose Tickets &amp; Quantities
                    </h3>

                    <div className="space-y-3">
                      {selectedEvent.tickets.map((t) => {
                        const qty = quantities[t.id] || 0;
                        return (
                          <div
                            key={t.id}
                            className={`p-3.5 rounded-xl border transition-all ${
                              qty > 0
                                ? 'border-rose-600 bg-rose-50/60 dark:bg-rose-950/20'
                                : 'border-slate-200 dark:border-[#212c42] bg-slate-50 dark:bg-[#0e1422]'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <div className="font-display font-bold text-sm text-slate-900 dark:text-white">
                                  {t.name}
                                </div>
                                <div className="text-[11px] text-slate-500">{t.description}</div>
                              </div>
                              <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                                ₹{t.price}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-[#212c42]">
                              <span className="text-xs text-slate-500">Tickets</span>
                              <div className="flex items-center gap-2 bg-white dark:bg-[#131b2b] p-1 rounded-lg border border-slate-200 dark:border-[#212c42]">
                                <button
                                  onClick={() => handleQuantityChange(t.id, -1)}
                                  disabled={qty === 0}
                                  className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
                                >
                                  -
                                </button>
                                <span className="font-mono text-xs font-bold w-5 text-center">{qty}</span>
                                <button
                                  onClick={() => handleQuantityChange(t.id, 1)}
                                  disabled={qty >= 10}
                                  className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary Box */}
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#212c42] space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Subtotal ({totalSelectedTicketsCount} tickets):</span>
                        <span className="font-mono font-semibold text-slate-900 dark:text-white">
                          ₹{subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>GST &amp; Facility Fee:</span>
                        <span className="font-mono">₹{bookingFee.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-[#212c42]">
                        <span>Total:</span>
                        <span className="font-mono text-rose-600 text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                      </div>

                      <button
                        onClick={handleProceedToCheckout}
                        disabled={totalSelectedTicketsCount === 0}
                        className="w-full mt-3 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>Continue to Payment (₹{grandTotal.toLocaleString('en-IN')})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCREEN 5: DIGITAL PASSES & QR CODES */}
          {/* ======================================================== */}
          <div className="w-full min-w-full flex-shrink-0 px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="rounded-2xl bg-white dark:bg-[#131b2b] border border-slate-200 dark:border-[#212c42] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Official Madras Stage Admission Passes
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {bookedPasses.length} active digital pass{bookedPasses.length !== 1 ? 'es' : ''} saved to your device.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToSlide(0)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0e1422] text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#212c42]"
                    >
                      Explore More Events
                    </button>
                    <button
                      onClick={() => setIsProfileOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white shadow-sm"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>My Profile Hub</span>
                    </button>
                  </div>
                </div>

                {/* Passes List */}
                <div className="space-y-4">
                  {bookedPasses.map((pass) => (
                    <div
                      key={pass.bookingId}
                      className="rounded-xl bg-[#0e1422] text-white p-5 border border-slate-700 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                            M
                          </div>
                          <span className="font-display font-bold text-xs uppercase tracking-wider">
                            MADRAS STAGE OFFICIAL PASS
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-900 self-start sm:self-auto">
                          ID: {pass.bookingId}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                        <div className="sm:col-span-2 space-y-1.5">
                          <h3 className="font-display font-bold text-base leading-snug">
                            {pass.eventTitle}
                          </h3>
                          <div className="text-xs text-slate-300">
                            📅 {pass.date}
                          </div>
                          <div className="text-xs text-slate-300">
                            ⏰ {pass.time}
                          </div>
                          <div className="text-xs text-slate-300">
                            📍 {pass.venue}, {pass.neighborhood}
                          </div>
                          <div className="pt-1.5 text-xs text-slate-200">
                            Pass Holder: <strong className="text-white">{pass.attendeeName}</strong>
                          </div>
                          <div className="text-[11px] text-emerald-400 font-mono">
                            Entry Gate: {pass.gate}
                          </div>
                        </div>

                        {/* QR Pattern */}
                        <div className="flex flex-col items-center justify-center p-2 rounded bg-white text-slate-900 self-center">
                          <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
                            <rect width="80" height="80" fill="white" />
                            <rect x="5" y="5" width="22" height="22" fill="black" />
                            <rect x="8" y="8" width="16" height="16" fill="white" />
                            <rect x="11" y="11" width="10" height="10" fill="black" />
                            <rect x="53" y="5" width="22" height="22" fill="black" />
                            <rect x="56" y="8" width="16" height="16" fill="white" />
                            <rect x="59" y="11" width="10" height="10" fill="black" />
                            <rect x="5" y="53" width="22" height="22" fill="black" />
                            <rect x="8" y="56" width="16" height="16" fill="white" />
                            <rect x="11" y="59" width="10" height="10" fill="black" />
                            <rect x="32" y="8" width="8" height="8" fill="black" />
                            <rect x="42" y="14" width="8" height="8" fill="black" />
                            <rect x="32" y="32" width="16" height="16" fill="black" />
                            <rect x="52" y="32" width="10" height="10" fill="black" />
                            <rect x="32" y="56" width="12" height="12" fill="black" />
                            <rect x="50" y="56" width="16" height="16" fill="black" />
                          </svg>
                          <span className="text-[8px] font-mono font-bold mt-0.5 text-slate-800">
                            SCAN AT GATE
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. FLOATING DECK SWIPE HUD (Presentation Remote Control) */}
      <DeckSwipeHud
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
        totalSlides={6}
      />

      {/* 5. MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white dark:bg-[#0b0f19] border-t border-slate-200 dark:border-[#212c42] shadow-sm flex items-center justify-around h-14 px-2">
        <button
          onClick={() => goToSlide(0)}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium cursor-pointer ${
            currentSlide === 0 ? 'text-rose-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Discover</span>
        </button>

        <button
          onClick={() => goToSlide(1)}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium cursor-pointer ${
            currentSlide === 1 ? 'text-rose-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Near You</span>
        </button>

        <button
          onClick={() => goToSlide(2)}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium cursor-pointer ${
            currentSlide === 2 ? 'text-rose-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Calendar</span>
        </button>

        <button
          onClick={() => goToSlide(5)}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium cursor-pointer relative ${
            currentSlide === 5 ? 'text-rose-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Passes</span>
          {bookedPasses.length > 0 && (
            <span className="absolute top-0.5 right-4 w-4 h-4 rounded-full bg-rose-600 text-white font-bold text-[9px] flex items-center justify-center shadow-sm">
              {bookedPasses.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium text-slate-500 cursor-pointer"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </nav>

      {/* MODALS */}
      <CheckoutModal
        event={selectedEvent}
        bookings={checkoutPayload.bookings}
        subtotal={checkoutPayload.subtotal}
        bookingFee={checkoutPayload.bookingFee}
        total={checkoutPayload.total}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        bookedPasses={bookedPasses}
        favoritesCount={bookmarks.length}
        onOpenFavorites={() => {
          setIsProfileOpen(false);
          setIsFavoritesOpen(true);
        }}
        onGoToSlide={(slide) => {
          setIsProfileOpen(false);
          goToSlide((slide - 1) as DeckScreenIndex);
        }}
        theme={theme}
      />

      <MyTicketsModal
        isOpen={isMyTicketsOpen}
        onClose={() => setIsMyTicketsOpen(false)}
        passes={bookedPasses}
        onExploreMore={() => {
          setIsMyTicketsOpen(false);
          goToSlide(0);
        }}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteEvents={bookmarkedEventObjects}
        onSelectEvent={handleSelectEvent}
        onRemoveFavorite={(id) => handleToggleBookmark(id)}
      />

      <NeighborhoodModal
        isOpen={isNeighborhoodOpen}
        onClose={() => setIsNeighborhoodOpen(false)}
        selectedNeighborhood={selectedNeighborhood}
        onSelect={(n) => {
          setSelectedNeighborhood(n);
          setNearYouArea(n);
          goToSlide(1);
        }}
      />

      {/* FOOTER */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          goToSlide(2);
        }}
        onSelectNeighborhood={(n) => {
          setSelectedNeighborhood(n);
          setNearYouArea(n);
          goToSlide(1);
        }}
      />
    </div>
  );
}
