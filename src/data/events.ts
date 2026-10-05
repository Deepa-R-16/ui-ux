import { PulseEvent } from '../types';

export const CHENNAI_NEIGHBORHOODS: string[] = [
  'All Chennai',
  'Nandanam',
  'Alwarpet',
  'Mylapore',
  'Chetpet',
  'Egmore',
  'Adyar',
  'Besant Nagar',
  'Velachery',
  'Island Grounds',
  'Guindy',
  'ECR',
  'Anna Nagar',
  'T. Nagar',
];

export const CATEGORIES_LIST = [
  { id: 'Music', label: 'Music & Concerts', icon: '🎵', count: 18 },
  { id: 'Comedy', label: 'Stand-up Comedy', icon: '😂', count: 9 },
  { id: 'Theatre', label: 'Stage & Drama', icon: '🎭', count: 7 },
  { id: 'Art & Culture', label: 'Classical & Heritage', icon: '🎨', count: 14 },
  { id: 'Workshops', label: 'Craft & Workshops', icon: '🎓', count: 11 },
  { id: 'Sports', label: 'Marathons & Fitness', icon: '🏃', count: 8 },
  { id: 'Festivals', label: 'Folk & Food Festivals', icon: '🎉', count: 12 },
  { id: 'Networking', label: 'Tech & Meetups', icon: '💼', count: 5 },
  { id: 'Lifestyle', label: 'Beachside & Wellness', icon: '❤️', count: 13 },
  { id: 'Trending', label: 'Trending This Week', icon: '🔥', count: 15 },
] as const;

export const CHENNAI_EVENTS: PulseEvent[] = [
  {
    id: 'moonlight-music-fest',
    slug: 'moonlight-music-fest',
    title: 'Moonlight Music Fest',
    tagline: "An evening of independent music, live performances and Chennai's creative energy.",
    category: 'Music',
    dateBadge: '18 OCT',
    fullDate: 'Saturday, 18 October 2026',
    timeString: '6:30 PM – 10:30 PM',
    venue: 'YMCA Grounds',
    neighborhood: 'Nandanam',
    fullAddress: 'YMCA Grounds, Anna Salai, Nandanam, Chennai, Tamil Nadu 600035',
    startingPrice: 799,
    badge: 'Trending',
    rating: 4.9,
    reviewCount: 342,
    visualTheme: 'waveform',
    primaryColor: '#7c3aed',
    accentColor: '#f43f5e',
    metroStationNearby: 'Nandanam Metro (Blue Line) — Gate 2 (300m walk)',
    landmarks: ['Opposite YMCA College of Physical Education', 'Near Anna Salai Flyover', 'Fans Entry Gate B'],
    isFeatured: true,
    organizer: {
      name: 'Unwind Center & Indie Madras Live',
      isVerified: true,
      establishedYear: 1998,
      contactEmail: 'contact@unwindcenter.org',
      contactPhone: '+91 44 2461 4050',
      website: 'www.unwindcenter.org',
      description: 'Pioneers of the live band scene in South India since 1998, fostering underground rock, indie songwriters, and acoustic festivals across Madras.',
      eventsHosted: 140,
      rating: 4.9
    },
    descriptionParagraphs: [
      "Chennai's premier open-air independent music gathering takes over the lush expanses of YMCA Grounds this October. Bringing together the freshest sonic voices across Tamil indie, neo-Carnatic fusion, synth-pop, and ambient rock, Moonlight Music Fest is an ode to the city's unapologetic musical soul.",
      'Experience dynamic acoustic stages under the starlit coastal sky, artisan street food curated by iconic local kitchens, bespoke merchandise by homegrown designers, and an electrifying communal rhythm that defines modern Madras culture.',
      'Designed for music purists and festival wanderers alike, the venue is divided into pristine acoustic zones with concert-grade L-Acoustics arrays, immersive stage illuminations, and zero-compromise crowd comfort.'
    ],
    lineup: [
      {
        name: 'The Marina Collective',
        role: 'Headliner',
        genre: 'Tamil Alt-Rock & Ambient',
        timeSlot: '8:45 PM – 10:30 PM',
        bio: 'Chennai-born sextet pioneering breezy Tamil coastal rock with driving guitar hooks and resonant poetic lyricism.'
      },
      {
        name: 'Kaber & The Rhythm Band',
        role: 'Co-Headliner',
        genre: 'Neo-Folk & Satirical Groove',
        timeSlot: '7:45 PM – 8:30 PM',
        bio: 'Raw, energetic social storytelling fused with punchy acoustic riffs and infectious live audience call-and-response.'
      },
      {
        name: 'Soundari Synth Project',
        role: 'Special Act',
        genre: 'Electronic Carnatic Beats',
        timeSlot: '7:00 PM – 7:40 PM',
        bio: 'Hypnotic veena textures colliding with modular analog synthesizers and UK garage sub-bass.'
      },
      {
        name: 'Adyar River Jam',
        role: 'Opening Act',
        genre: 'Indie Soul / Lo-Fi',
        timeSlot: '6:30 PM – 7:00 PM',
        bio: 'Warm soulful vocal harmonies and jazz-infused percussion warming up the grounds as gates open.'
      }
    ],
    schedule: [
      { time: '6:30 PM', activity: 'Gates Open', description: 'Entry begins at Gate 2 (Anna Salai) and Gate 4 (Parking side). Food village opens.' },
      { time: '7:00 PM', activity: 'Opening Act', description: 'Adyar River Jam & Soundari Synth Project kick off the warm twilight session.' },
      { time: '8:00 PM', activity: 'Main Performance', description: 'Kaber & The Rhythm Band take the main stage followed by The Marina Collective.' },
      { time: '10:30 PM', activity: 'Event Ends', description: 'Encore finale, merchandise stalls, and curated night tram/metro shuttles.' }
    ],
    tickets: [
      {
        id: 'ticket-gen',
        name: 'General Entry',
        price: 799,
        description: 'Standing access across the open festival lawn with full stage sightlines.',
        benefits: [
          'Access to main festival grass lawn',
          'Access to artisanal Food & Beverage Village',
          'Free water refill stations throughout the venue',
          'Standard entry via Gate 2'
        ],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'ticket-prem',
        name: 'Premium',
        price: 1499,
        description: 'Priority zone with closer viewing deck and expedited bar service.',
        benefits: [
          'Dedicated mid-tier viewing enclosure closer to stage',
          'Fast-track festival security lane (Gate 1B)',
          'Dedicated beverage counters with shorter wait lines',
          'Complimentary commemorative festival fabric wristband'
        ],
        availability: 'Filling Fast',
        zoneId: 'zone-premium'
      },
      {
        id: 'ticket-vip',
        name: 'VIP',
        price: 2499,
        description: 'Front-stage tiered seating with hospitality lounge and backstage merch kit.',
        benefits: [
          'Elevated front-row seating zone directly facing the stage',
          'Exclusive Air-Conditioned VIP Hospitality Lounge access',
          'Complimentary curated Chennai snack box & beverages',
          'Official Moonlight Music Fest screen-printed poster & t-shirt',
          'Dedicated valet parking pass at YMCA Gate 1'
        ],
        availability: 'Filling Fast',
        zoneId: 'zone-vip'
      }
    ]
  },
  {
    id: 'margazhi-sanjay-live',
    slug: 'margazhi-sanjay-live',
    title: 'Margazhi Season 2026: Sanjay Subrahmanyan Live',
    tagline: 'The pinnacle of classical Carnatic vocal virtuosity at the historic Music Academy auditorium.',
    category: 'Art & Culture',
    dateBadge: '22 OCT',
    fullDate: 'Thursday, 22 October 2026',
    timeString: '6:00 PM – 9:00 PM',
    venue: 'The Music Academy',
    neighborhood: 'Alwarpet',
    fullAddress: 'The Music Academy, TTK Road, Royapettah, Alwarpet, Chennai 600014',
    startingPrice: 500,
    badge: 'Selling Fast',
    rating: 5.0,
    reviewCount: 680,
    visualTheme: 'carnatic-pulse',
    primaryColor: '#b45309',
    accentColor: '#dc2626',
    metroStationNearby: 'Teynampet Metro (800m) / AG-DMS Metro (1km)',
    landmarks: ['TTK Road junction', 'Near Narada Gana Sabha and Chamiers Cafe'],
    organizer: {
      name: 'The Music Academy Madras',
      isVerified: true,
      establishedYear: 1928,
      contactEmail: 'boxoffice@musicacademymadras.in',
      contactPhone: '+91 44 2811 2231',
      website: 'www.musicacademymadras.in',
      description: 'Established in 1928, The Music Academy is the global sanctuary for Indian classical Carnatic music, hosting the century-old Margazhi festival.',
      eventsHosted: 1200,
      rating: 5.0
    },
    descriptionParagraphs: [
      'Experience the electrifying vocal genius of Sangita Kalanidhi Sanjay Subrahmanyan on the hallowed wooden stage of The Music Academy Madras.',
      'Accompanied by S. Varadarajan on violin, Neyveli B. Venkatesh on mridangam, and Dr. S. Karthick on ghatam, this concert journeys through rare Tamil compositions, intricate ragam-tanam-pallavi, and sublime devotional viruthams.',
      'The auditorium is revered across the globe for pin-drop acoustics, zero-reverb clarity, and an audience steeped in classical connoisseurship.'
    ],
    lineup: [
      { name: 'Sanjay Subrahmanyan', role: 'Vocal Maestro', genre: 'Carnatic Classical Vocal', timeSlot: '6:00 PM – 9:00 PM' },
      { name: 'S. Varadarajan', role: 'Violin Accompaniment', genre: 'Carnatic Violin', timeSlot: '6:00 PM – 9:00 PM' },
      { name: 'Neyveli B. Venkatesh', role: 'Mridangam Solo', genre: 'Percussion', timeSlot: '6:00 PM – 9:00 PM' }
    ],
    schedule: [
      { time: '5:15 PM', activity: 'Foyer Coffee & Traditional Tiffin Service' },
      { time: '6:00 PM', activity: 'Varnam & Concert Invocations' },
      { time: '7:30 PM', activity: 'Main Ragam-Tanam-Pallavi (RTP)' },
      { time: '8:15 PM', activity: 'Tani Avartanam (Percussion Conclave)' },
      { time: '8:45 PM', activity: 'Tamil Devaram & Mangalam' }
    ],
    tickets: [
      {
        id: 'mam-balcony',
        name: 'Balcony Tier',
        price: 500,
        description: 'First floor tiered seating with unobstructed view and pristine acoustic balance.',
        benefits: ['Padded balcony seat', 'Official lyrics booklet', 'Tea coupon'],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'mam-stalls',
        name: 'Center Stalls',
        price: 1200,
        description: 'Ground floor middle rows directly aligned with center stage.',
        benefits: ['Prime ground orchestra seat', 'Fast-track foyer check-in'],
        availability: 'Filling Fast',
        zoneId: 'zone-premium'
      },
      {
        id: 'mam-donor',
        name: 'Patron Row (Rows A-C)',
        price: 2500,
        description: 'Front donor rows with complimentary Margazhi season guide.',
        benefits: ['First 3 rows VIP reserved', 'Academy archive centenary publication', 'VIP lounge access'],
        availability: 'Sold Out',
        zoneId: 'zone-vip'
      }
    ]
  },
  {
    id: 'chennai-laugh-lab',
    slug: 'chennai-laugh-lab',
    title: 'Evam Standup Tamasha: Live Galatta',
    tagline: 'An unfiltered, rib-tickling stand-up special roasting Chennai life, auto drivers, and IT corridor living.',
    category: 'Comedy',
    dateBadge: '20 OCT',
    fullDate: 'Tuesday, 20 October 2026',
    timeString: '7:30 PM – 9:45 PM',
    venue: 'Sir Mutha Venkatasubba Concert Hall',
    neighborhood: 'Chetpet',
    fullAddress: 'Sir Mutha Venkatasubba Concert Hall, 13/1 Harrington Rd, Chetpet, Chennai 600031',
    startingPrice: 499,
    badge: 'Selling Fast',
    rating: 4.8,
    reviewCount: 420,
    visualTheme: 'comedy-pop',
    primaryColor: '#ea580c',
    accentColor: '#f43f5e',
    metroStationNearby: 'Chetpet Railway (400m) & Kilpauk Metro (1.2km)',
    landmarks: ['Inside Lady Andal Campus', 'Harrington Road dining precinct'],
    organizer: {
      name: 'Evam Standup Tamasha',
      isVerified: true,
      establishedYear: 2003,
      contactEmail: 'shows@evam.in',
      contactPhone: '+91 98402 36826',
      website: 'www.evam.in',
      description: "South India's most celebrated comedy and performing arts circuit, nurturing Tamil stand-up stalwarts like Karthik Kumar and Alexander Babu.",
      eventsHosted: 850,
      rating: 4.8
    },
    descriptionParagraphs: [
      'Get ready for non-stop laughter as Chennai’s favourite comedy institution brings their blockbuster showcase to Sir Mutha Venkatasubba Concert Hall.',
      'From surviving auto-rickshaw negotiations at Chennai Central to the quirks of engineering campus placements in OMR, Karthik Kumar, Jagan Krishnan, and Praveen Kumar deliver pure comedic gold.',
      'Sir Mutha Hall offers plush air-conditioned theater seating, world-class acoustics, and great sightlines from every row.'
    ],
    lineup: [
      { name: 'Karthik Kumar (KK)', role: 'Headliner', genre: 'Tamil/English Observational', timeSlot: '8:45 PM – 9:45 PM' },
      { name: 'Jagan Krishnan', role: 'Musical Comedy', genre: 'Kollywood & Synth Satire', timeSlot: '8:05 PM – 8:40 PM' },
      { name: 'Praveen Kumar', role: 'Opening Act', genre: 'Relatable Family Stand-up', timeSlot: '7:30 PM – 8:00 PM' }
    ],
    schedule: [
      { time: '7:00 PM', activity: 'Auditorium Doors Open' },
      { time: '7:30 PM', activity: 'Opening Set by Praveen Kumar' },
      { time: '8:05 PM', activity: 'Musical Comedy by Jagan Krishnan' },
      { time: '8:45 PM', activity: 'Karthik Kumar Live Hour' },
      { time: '9:45 PM', activity: 'Audience Interaction & Curtain Call' }
    ],
    tickets: [
      {
        id: 'cll-balcony',
        name: 'Balcony View',
        price: 499,
        description: 'Clear elevated view of the comedy stage from the upper circle.',
        benefits: ['Cushioned theater seat', 'Crystal-clear speech audio'],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'cll-stalls',
        name: 'Prime Stalls',
        price: 899,
        description: 'Lower auditorium floor seats near the comics.',
        benefits: ['Direct eye-level view', 'Chance of comic banter', 'Express entry'],
        availability: 'Available',
        zoneId: 'zone-premium'
      },
      {
        id: 'cll-front',
        name: 'Front Row VIP',
        price: 1499,
        description: 'First 2 rows for audience members who dare to get roasted.',
        benefits: ['Closest seats to the comic', 'Free cold brew beverage', 'Signed poster'],
        availability: 'Filling Fast',
        zoneId: 'zone-vip'
      }
    ]
  },
  {
    id: 'stories-under-the-lights',
    slug: 'stories-under-the-lights',
    title: 'The Madras Players: Stories Under The Lights',
    tagline: 'An evocative period drama reviving 1940s harbour folklore and historic Madras memories.',
    category: 'Theatre',
    dateBadge: '24 OCT',
    fullDate: 'Saturday, 24 October 2026',
    timeString: '7:00 PM – 9:00 PM',
    venue: 'Museum Theatre',
    neighborhood: 'Egmore',
    fullAddress: 'Government Museum Complex, Pantheon Rd, Egmore, Chennai 600008',
    startingPrice: 350,
    badge: 'Exclusive',
    rating: 4.7,
    reviewCount: 195,
    visualTheme: 'theatre-curtain',
    primaryColor: '#be185d',
    accentColor: '#7c3aed',
    metroStationNearby: 'Egmore Metro Station (550m)',
    landmarks: ['Inside Government Museum Complex', 'Pantheon Road cultural hub'],
    organizer: {
      name: 'The Madras Players',
      isVerified: true,
      establishedYear: 1955,
      contactEmail: 'secretariat@themadrasplayers.org',
      contactPhone: '+91 44 2827 8980',
      website: 'www.themadrasplayers.org',
      description: "Founded in 1955, The Madras Players is the oldest surviving English-language theatre group in Asia, with over 300 landmark productions staged across 7 decades.",
      eventsHosted: 320,
      rating: 4.9
    },
    descriptionParagraphs: [
      'Step into the Victorian proscenium architecture of Egmore Museum Theatre—built in 1896—for a spellbinding production exploring intertwining destinies in 1940s Madras harbour.',
      'Featuring evocative lighting design, live acoustic strings, and nuanced ensemble acting, this play celebrates the enduring charm of Old Madras.',
      'The venue’s semicircular amphitheatre seating and wooden acoustics offer an intimate connection between actor and spectator.'
    ],
    lineup: [
      { name: 'The Madras Players Repertory', role: 'Ensemble Cast', genre: 'Historical Drama', timeSlot: '7:00 PM – 9:00 PM' }
    ],
    schedule: [
      { time: '6:30 PM', activity: 'Heritage Foyer Entry Opens' },
      { time: '7:00 PM', activity: 'Act I Begins' },
      { time: '7:55 PM', activity: '15-Minute Foyer Intermission' },
      { time: '8:10 PM', activity: 'Act II & Climax' },
      { time: '9:00 PM', activity: 'Director Q&A on Stage' }
    ],
    tickets: [
      {
        id: 'sutl-gallery',
        name: 'Heritage Gallery',
        price: 350,
        description: 'Circular heritage wooden gallery with atmospheric vintage feel.',
        benefits: ['Classic wooden theatre seating', 'Programme booklet included'],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'sutl-orchestra',
        name: 'Orchestra Stalls',
        price: 650,
        description: 'Central floor seating with pristine audio-visual sightlines.',
        benefits: ['Padded orchestra stall seat', 'Direct view of stage expressions'],
        availability: 'Available',
        zoneId: 'zone-premium'
      }
    ]
  },
  {
    id: 'create-and-coffee-backyard',
    slug: 'create-and-coffee-backyard',
    title: 'Backyard Adyar: Craft, Linocut & Filter Coffee',
    tagline: 'Tactile linoleum stamp carving, artisan sourdough, and slow pour-over coffee tastings.',
    category: 'Workshops',
    dateBadge: '25 OCT',
    fullDate: 'Sunday, 25 October 2026',
    timeString: '10:00 AM – 1:30 PM',
    venue: 'Backyard Chennai',
    neighborhood: 'Adyar',
    fullAddress: 'Backyard, 53 1st Main Rd, Gandhi Nagar, Adyar, Chennai 600020',
    startingPrice: 599,
    badge: 'Editor Pick',
    rating: 4.9,
    reviewCount: 160,
    visualTheme: 'craft-geometry',
    primaryColor: '#059669',
    accentColor: '#d97706',
    metroStationNearby: 'Kasturba Nagar MRTS (650m) & Adyar Depot (800m)',
    landmarks: ['Gandhi Nagar 1st Main Road', 'Near Ambika Appalam signal'],
    organizer: {
      name: 'Backyard Community Spaces',
      isVerified: true,
      establishedYear: 2016,
      contactEmail: 'hello@backyardchennai.in',
      contactPhone: '+91 73584 58117',
      website: 'www.backyardchennai.in',
      description: 'An iconic anti-cafe and community makerspace in Adyar where creative individuals gather for acoustic jams, zine workshops, and community dinners.',
      eventsHosted: 210,
      rating: 4.8
    },
    descriptionParagraphs: [
      'Spend a tranquil Sunday morning at Backyard Adyar blending tactile craftwork with South Indian specialty coffee cultures.',
      'Under the guidance of master printmakers, design and hand-carve linocut blocks, ink botanical motifs, and press your artwork onto organic canvas tote bags to take home.',
      'All archival materials, organic inks, fresh bakes from local artisanal ovens, and unlimited cold brews are included with registration.'
    ],
    lineup: [
      { name: 'Ananya Ramesh', role: 'Printmaker & Guide', genre: 'Linocut & Textile Design', timeSlot: '10:00 AM – 1:30 PM' },
      { name: 'BrewCraft Roasters', role: 'Coffee Curators', genre: 'Single-Origin Estate Tasting', timeSlot: '11:15 AM – 11:45 AM' }
    ],
    schedule: [
      { time: '10:00 AM', activity: 'Welcome Pour-over & Studio Tour' },
      { time: '10:30 AM', activity: 'Design & Gouge Carving Workshop' },
      { time: '11:45 AM', activity: 'Ink Mixing & Proofing on Hand-made Paper' },
      { time: '12:30 PM', activity: 'Tote Bag Printing & Take-home Finishing' }
    ],
    tickets: [
      {
        id: 'cac-pass',
        name: 'Workshop Pass + Complete Kit',
        price: 599,
        description: 'Full pass including lino tools, archival ink, and canvas tote.',
        benefits: ['Complete linocut carving kit to take home', '2 Organic canvas tote bags', 'Unlimited specialty filter coffee'],
        availability: 'Filling Fast',
        zoneId: 'zone-general'
      },
      {
        id: 'cac-duo',
        name: 'Duo Workbench (For 2)',
        price: 1099,
        description: 'Special companion registration for two creators.',
        benefits: ['2 Full workshop kits', 'Reserved shared crafting bench', 'Specialty coffee tasting flight'],
        availability: 'Available',
        zoneId: 'zone-premium'
      }
    ]
  },
  {
    id: 'marina-sunset-sessions',
    slug: 'marina-sunset-sessions',
    title: 'Bessie Sunset Acoustics: Bay of Bengal Beats',
    tagline: 'Acoustic guitarists, chill ambient soundscapes, and barefoot beach sunset vibes.',
    category: 'Lifestyle',
    dateBadge: '26 OCT',
    fullDate: 'Monday, 26 October 2026',
    timeString: '5:00 PM – 9:00 PM',
    venue: 'Beachside Experience Deck',
    neighborhood: 'Besant Nagar',
    fullAddress: 'Besant Nagar Beach Promenade, 6th Avenue, Besant Nagar, Chennai 600090',
    startingPrice: 299,
    badge: 'Trending',
    rating: 4.8,
    reviewCount: 512,
    visualTheme: 'marina-wave',
    primaryColor: '#0284c7',
    accentColor: '#f43f5e',
    metroStationNearby: 'Thiruvanmiyur MRTS (1.8km) / Direct MTC Bus connectivity',
    landmarks: ['Near Karl Schmidt Memorial', 'Besant Nagar 6th Avenue'],
    organizer: {
      name: 'Coromandel Coastal Arts Syndicate',
      isVerified: true,
      establishedYear: 2018,
      contactEmail: 'ocean@coromandelarts.org',
      contactPhone: '+91 94440 18920',
      website: 'www.coromandelarts.org',
      description: 'Dedicated to outdoor cultural experiences celebrating the coastline of Madras through sunset acoustics, coastal cleanups, and seaside cinema.',
      eventsHosted: 95,
      rating: 4.8
    },
    descriptionParagraphs: [
      'Feel the rhythmic ebb and flow of the Bay of Bengal as golden hour turns into an indigo evening over Elliot’s Beach.',
      'Sip on iced hibiscus teas and tender coconut cold brews while relaxing on bohemian floor cushions, listening to gentle acoustic guitars synced with the evening tide.',
      'A zero-waste gathering celebrating community music and the timeless tranquility of Bessie Beach.'
    ],
    lineup: [
      { name: 'Karthik S & Coastal Strings', role: 'Live Acoustic', genre: 'Fingerstyle Guitar & Ambient Flute', timeSlot: '5:30 PM – 7:00 PM' },
      { name: 'DJ Soundari Sunset', role: 'Downtempo Set', genre: 'Balearic Ambient House', timeSlot: '7:00 PM – 9:00 PM' }
    ],
    schedule: [
      { time: '5:00 PM', activity: 'Beachside Lounges Open' },
      { time: '5:30 PM', activity: 'Live Flute & Acoustic Ambient Set' },
      { time: '6:15 PM', activity: 'Golden Hour Sunset Climax' },
      { time: '7:00 PM', activity: 'Twilight Downtempo Session' }
    ],
    tickets: [
      {
        id: 'mss-sunset',
        name: 'Sunset Lawn Pass',
        price: 299,
        description: 'Seaside deck access with direct ocean view.',
        benefits: ['Entry to seaside lounge deck', '1 Complimentary tender coconut drink'],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'mss-cabana',
        name: 'Boho Cabana Experience',
        price: 699,
        description: 'Reserved low-table cabana seating with warm lanterns.',
        benefits: ['Dedicated cabana for you & friends', 'Snack platter included', 'Priority service'],
        availability: 'Filling Fast',
        zoneId: 'zone-premium'
      }
    ]
  },
  {
    id: 'chennai-sangamam-food-fest',
    slug: 'chennai-sangamam-food-fest',
    title: 'Chennai Sangamam: Namma Ooru Thiruvizha',
    tagline: '120+ authentic traditional food stalls, live Parai folk arts, and night bazaar.',
    category: 'Festivals',
    dateBadge: '1 NOV',
    fullDate: 'Sunday, 1 November 2026',
    timeString: '11:00 AM – 10:00 PM',
    venue: 'Island Grounds',
    neighborhood: 'Island Grounds',
    fullAddress: 'Island Grounds, Anna Salai near Muthuswamy Bridge, Park Town, Chennai 600009',
    startingPrice: 199,
    badge: 'Trending',
    rating: 4.8,
    reviewCount: 920,
    visualTheme: 'festival-prismatic',
    primaryColor: '#c2410c',
    accentColor: '#be185d',
    metroStationNearby: 'Government Estate Metro (700m) & Chennai Central (1.2km)',
    landmarks: ['Muthuswamy Bridge', 'Opposite Chennai Fort station'],
    organizer: {
      name: 'Tamil Nadu Tourism Development & Art Council',
      isVerified: true,
      establishedYear: 2007,
      contactEmail: 'sangamam@tamilnadutourism.org',
      contactPhone: '+91 44 2538 3333',
      website: 'www.tamilnadutourism.tn.gov.in',
      description: 'The official cultural council organizing South India’s largest annual open-air folk arts, dance, and gastronomic festival.',
      eventsHosted: 180,
      rating: 4.9
    },
    descriptionParagraphs: [
      'The biggest cultural festival in Tamil Nadu returns to Island Grounds! Taste authentic Ambur & Thalappakatti mutton biryanis, Chettinad crab roasts, piping hot filter coffee, and traditional millets tiffin.',
      'Witness mesmerizing live Parai Attam, Oyilattam, Karagattam, and Silambam martial arts performed by 300+ grassroots folk troupes from across Tamil Nadu.',
      'Features a night crafts bazaar showcasing Kanchipuram weaves, Thanjavur art plates, and terracotta pottery.'
    ],
    lineup: [
      { name: 'Madras Parai Isai Troupe', role: 'Folk Headliner', genre: 'Traditional Parai & Thappu Drums', timeSlot: '4:00 PM & 7:30 PM' },
      { name: 'Chettinad Heritage Kitchens', role: 'Culinary Master', genre: 'Live Woodfire Cooking Demo', timeSlot: '2:00 PM – 3:30 PM' }
    ],
    schedule: [
      { time: '11:00 AM', activity: 'Food Gates & Tasting Trails Open' },
      { time: '2:00 PM', activity: 'Chef Masterclass Live on Main Stage' },
      { time: '5:00 PM', activity: 'Folk Parade & Parai Drum Flag-off' },
      { time: '8:00 PM', activity: 'Live Tamil Folk Fusion Ensemble' }
    ],
    tickets: [
      {
        id: 'cfc-entry',
        name: 'Single Day Carnival Pass',
        price: 199,
        description: 'All-day festival entry with access to all cultural stages.',
        benefits: ['Access to all 120 food stalls', 'Entry to live folk performances', 'Free kids cultural games'],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'cfc-foodie',
        name: 'Foodie Tasting Passport',
        price: 599,
        description: 'Entry pass + ₹500 redeemable food credit on festival RFID wristband.',
        benefits: ['Festival entry', '₹500 redeemable credits across any food stall', 'Skip-the-line tasting booths'],
        availability: 'Available',
        zoneId: 'zone-premium'
      }
    ]
  },
  {
    id: 'saarang-iit-madras',
    slug: 'saarang-iit-madras',
    title: 'IIT Madras Saarang: Choreo Night & Rock Show',
    tagline: 'Asia’s largest ISO-certified student cultural festival under the stars at the Open Air Theatre.',
    category: 'Music',
    dateBadge: '3 NOV',
    fullDate: 'Tuesday, 3 November 2026',
    timeString: '5:30 PM – 10:30 PM',
    venue: 'Open Air Theatre (OAT)',
    neighborhood: 'Guindy',
    fullAddress: 'IIT Madras Campus, Sardar Patel Road, Guindy, Chennai 600036',
    startingPrice: 399,
    badge: 'Exclusive',
    rating: 4.9,
    reviewCount: 840,
    visualTheme: 'network-nodes',
    primaryColor: '#4f46e5',
    accentColor: '#059669',
    metroStationNearby: 'Guindy Metro Station (1.2km) / IIT Main Gate MTC Bus Stop',
    landmarks: ['Inside lush IIT Madras campus', 'Near Gajendra Circle'],
    organizer: {
      name: 'IIT Madras Cultural Affairs Team',
      isVerified: true,
      establishedYear: 1974,
      contactEmail: 'saarang@iitm.ac.in',
      contactPhone: '+91 44 2257 8000',
      website: 'www.saarang.org',
      description: "Organized entirely by students of IIT Madras since 1974, Saarang draws over 70,000 visitors annually, making it one of the premier college cultural festivals in India.",
      eventsHosted: 50,
      rating: 4.9
    },
    descriptionParagraphs: [
      'Enter the serene green sanctuary of IIT Madras for their legendary Open Air Theatre (OAT) pro-shows.',
      'Saarang combines electrifying national college choreography battles with high-energy independent rock bands, creating an unforgettable campus festival atmosphere.',
      'Food stalls from across Chennai, interactive gaming pavilions, and tree-lined campus walkways complete the celebration.'
    ],
    lineup: [
      { name: 'Oorka & Avial Reunion', role: 'Rock Headliner', genre: 'Alternative Rock', timeSlot: '8:30 PM – 10:30 PM' },
      { name: 'All-India Choreo Finals', role: 'Dance Showcase', genre: 'Contemporary & Urban Hip-Hop', timeSlot: '6:00 PM – 8:00 PM' }
    ],
    schedule: [
      { time: '4:30 PM', activity: 'IIT Main Gate Security & Shuttle Buses' },
      { time: '5:30 PM', activity: 'OAT Gates Open' },
      { time: '6:00 PM', activity: 'Choreo Night Finals' },
      { time: '8:30 PM', activity: 'Pro-Rock Live Concert' }
    ],
    tickets: [
      {
        id: 'iit-gen',
        name: 'Student & General Pass',
        price: 399,
        description: 'General tiered amphitheatre bowl seating.',
        benefits: ['OAT entry', 'Campus shuttle access from Main Gate', 'Access to Saarang food court'],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'iit-vip',
        name: 'Front Pit Pass',
        price: 899,
        description: 'Standing pit directly in front of the OAT stage.',
        benefits: ['Front-stage pit access', 'Official Saarang festival t-shirt', 'Express gate entry'],
        availability: 'Filling Fast',
        zoneId: 'zone-vip'
      }
    ]
  },
  {
    id: 'madras-heritage-walk',
    slug: 'madras-heritage-walk',
    title: 'Madras Heritage Walk: Mylapore Temple Tank to San Thome',
    tagline: 'A guided morning architectural walk uncovering 500 years of colonial and Dravidian histories.',
    category: 'Art & Culture',
    dateBadge: '7 NOV',
    fullDate: 'Saturday, 7 November 2026',
    timeString: '6:30 AM – 9:00 AM',
    venue: 'Kapaleeshwarar Temple Tank',
    neighborhood: 'Mylapore',
    fullAddress: 'Kapaleeshwarar Temple Tank Sannadhi St, Mylapore, Chennai 600004',
    startingPrice: 350,
    badge: 'Editor Pick',
    rating: 4.9,
    reviewCount: 310,
    visualTheme: 'carnatic-pulse',
    primaryColor: '#7c3aed',
    accentColor: '#d97706',
    metroStationNearby: 'Thirumayilai MRTS Station (300m)',
    landmarks: ['Mylapore Temple Tank North Mada St', 'Near Rayar Mess'],
    organizer: {
      name: 'Madras Heritage Trust & S. Muthiah Guild',
      isVerified: true,
      establishedYear: 1999,
      contactEmail: 'walks@madrasheritagetrust.in',
      contactPhone: '+91 98400 55112',
      website: 'www.madrasheritagetrust.in',
      description: 'Preserving and chronicling the architectural, social, and literary heritage of Chennai through scholar-guided walking tours and archival research.',
      eventsHosted: 480,
      rating: 4.9
    },
    descriptionParagraphs: [
      'Join renowned urban historians as dawn breaks over the ancient Kapaleeshwarar temple tank. Walk through the agraharam lanes of Mylapore, observing centuries-old colonial thinnai architecture and Kolam courtyard traditions.',
      'The walk concludes at the neo-Gothic Basilica of Our Lady of Good Voyage in San Thome, followed by hot filter coffee and crispy ghee podi dosas at historic Rayar’s Mess.',
      'Audio receivers with individual sanitized headsets ensure crystal-clear historical commentary throughout the route.'
    ],
    lineup: [
      { name: 'Dr. Chithra Madhavan', role: 'Historian & Walk Lead', genre: 'Temple Architecture & Heritage', timeSlot: '6:30 AM – 9:00 AM' }
    ],
    schedule: [
      { time: '6:15 AM', activity: 'Assembly at Temple Tank East Gate & Audio Receiver Distribution' },
      { time: '6:30 AM', activity: 'Dravidian Architecture & Tank Water Systems' },
      { time: '7:45 AM', activity: 'Portuguese San Thome Portuguese Colony Trail' },
      { time: '8:45 AM', activity: 'Traditional Tiffin Breakfast at Rayar Mess' }
    ],
    tickets: [
      {
        id: 'mhw-pass',
        name: 'Heritage Walk Pass',
        price: 350,
        description: 'Complete guided walk with audio headset and heritage booklet.',
        benefits: ['Wireless audio receiver for tour guide', 'Archival walking map booklet', 'Rayar Mess filter coffee & breakfast included'],
        availability: 'Filling Fast',
        zoneId: 'zone-general'
      }
    ]
  },
  {
    id: 'east-coast-night-run-10k',
    slug: 'east-coast-night-run-10k',
    title: 'Chennai Runners: East Coast Night Run 10K',
    tagline: 'Neon night run along the scenic coastal promenade of Chennai’s East Coast Road.',
    category: 'Sports',
    dateBadge: '10 NOV',
    fullDate: 'Tuesday, 10 November 2026',
    timeString: '8:30 PM – 11:30 PM',
    venue: 'Coastal Promenade',
    neighborhood: 'ECR',
    fullAddress: 'ECR Coastal Promenade, Akkarai Beach Strip, ECR, Chennai 600119',
    startingPrice: 550,
    badge: 'Selling Fast',
    rating: 4.8,
    reviewCount: 380,
    visualTheme: 'run-track',
    primaryColor: '#0284c7',
    accentColor: '#059669',
    metroStationNearby: 'Thiruvanmiyur Depot (Connecting shuttles provided)',
    landmarks: ['Akkarai Beach toll plaza', 'ECR coastal drive'],
    organizer: {
      name: 'Chennai Runners Syndicate',
      isVerified: true,
      establishedYear: 2006,
      contactEmail: 'info@chennairunners.in',
      contactPhone: '+91 44 4210 1234',
      website: 'www.chennairunners.in',
      description: "The non-profit runner collective behind the famous Chennai Marathon, promoting running as a healthy lifestyle across 20 city chapters.",
      eventsHosted: 110,
      rating: 4.9
    },
    descriptionParagraphs: [
      'Lace up your running shoes for an exhilarating nocturnal run under the coastal stars. The cool evening sea breeze, illuminated cheer stations, and hydration pods line the traffic-free 10K stretch.',
      'Every finisher receives an embossed metal medal, technical dry-fit jersey, RFID electronic timing chip, and hot South Indian recovery tiffin.'
    ],
    lineup: [
      { name: 'Chennai Runners Marshals', role: 'Race Pacers', genre: '10K / 5K Pace Groups', timeSlot: '8:30 PM Flag-off' }
    ],
    schedule: [
      { time: '7:30 PM', activity: 'Bib Verification & Dynamic Warm-up' },
      { time: '8:30 PM', activity: '10K Wave 1 Flag-off' },
      { time: '9:00 PM', activity: '5K Fun Run Flag-off' },
      { time: '10:30 PM', activity: 'Podium Medal Ceremony & Post-run Recovery Tiffin' }
    ],
    tickets: [
      {
        id: 'ecr-5k',
        name: '5K Fun Run Pass',
        price: 550,
        description: 'Non-timed scenic coastal jog with neon glow bands.',
        benefits: ['Finisher medal', 'Dry-fit running jersey', 'Hydration & snacks'],
        availability: 'Available',
        zoneId: 'zone-general'
      },
      {
        id: 'ecr-10k',
        name: '10K Timed Challenge',
        price: 799,
        description: 'RFID chip-timed 10K course with official certificate.',
        benefits: ['Electronic timing bib', 'Exclusive finisher metal medal', 'Hydration & recovery breakfast', 'Finisher certificate'],
        availability: 'Filling Fast',
        zoneId: 'zone-premium'
      }
    ]
  }
];
