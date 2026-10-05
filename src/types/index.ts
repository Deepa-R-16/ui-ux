export type EventCategory =
  | 'Music'
  | 'Comedy'
  | 'Theatre'
  | 'Art & Culture'
  | 'Workshops'
  | 'Movies'
  | 'Sports'
  | 'Festivals'
  | 'Networking'
  | 'Family'
  | 'Lifestyle'
  | 'Trending';

export type ChennaiArea =
  | 'Nandanam'
  | 'Chetpet'
  | 'Egmore'
  | 'Adyar'
  | 'Besant Nagar'
  | 'Velachery'
  | 'Island Grounds'
  | 'Guindy'
  | 'Alwarpet'
  | 'ECR'
  | 'Mylapore'
  | 'Nungambakkam'
  | 'T. Nagar'
  | 'Anna Nagar';

export interface ArtistLineup {
  name: string;
  role: string;
  genre: string;
  timeSlot: string;
  bio?: string;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  availability: 'Available' | 'Filling Fast' | 'Sold Out';
  zoneId: string;
}

export interface EventScheduleItem {
  time: string;
  activity: string;
  description?: string;
}

export interface EventOrganizer {
  name: string;
  isVerified: boolean;
  establishedYear: number;
  contactEmail: string;
  contactPhone: string;
  website: string;
  description: string;
  eventsHosted: number;
  rating: number;
}

export interface PulseEvent {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  dateBadge: string; // e.g. "18 OCT"
  fullDate: string; // e.g. "Saturday, 18 October 2026"
  timeString: string; // e.g. "6:30 PM – 10:30 PM"
  venue: string;
  neighborhood: ChennaiArea;
  fullAddress: string;
  startingPrice: number;
  badge?: 'Trending' | 'Selling Fast' | 'Exclusive' | 'Editor Pick';
  rating: number;
  reviewCount: number;
  visualTheme: 'waveform' | 'comedy-pop' | 'theatre-curtain' | 'craft-geometry' | 'marina-wave' | 'indie-rock' | 'festival-prismatic' | 'network-nodes' | 'carnatic-pulse' | 'run-track';
  primaryColor: string;
  accentColor: string;
  descriptionParagraphs: string[];
  lineup: ArtistLineup[];
  schedule: EventScheduleItem[];
  tickets: TicketType[];
  organizer: EventOrganizer;
  metroStationNearby: string;
  landmarks: string[];
  isFeatured?: boolean;
}

export interface SelectedTicketBooking {
  ticketId: string;
  ticketName: string;
  price: number;
  quantity: number;
  zoneId: string;
}

export interface BookedPass {
  bookingId: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  neighborhood: string;
  tickets: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  bookedAt: string;
  qrPayload: string;
  gate: string;
  zone: string;
}
