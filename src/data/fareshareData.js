export const TEAM_MEMBERS = [
  {
    name: "Prachi Vats",
    github: "https://github.com/Prachivats-21",
    rating: 5.0,
    avatarBg: "from-emerald-500 to-teal-700",
    initials: "PV"
  },
  {
    name: "Kaashvi Saini",
    github: "https://github.com/Kaashviw3spaces",
    rating: 4.95,
    avatarBg: "from-rose-500 to-pink-700",
    initials: "KS"
  },
  {
    name: "Ashwin Anand",
    github: "https://github.com/ashuwuin",
    rating: 4.90,
    avatarBg: "from-blue-500 to-indigo-700",
    initials: "AA"
  },
  {
    name: "Swapnil Pradhan",
    github: "https://github.com/suwupnil",
    rating: 4.92,
    avatarBg: "from-amber-500 to-orange-700",
    initials: "SP"
  },
  {
    name: "Akshat Kumar",
    github: "https://github.com/Akshat-xe",
    rating: 4.91,
    avatarBg: "from-purple-500 to-violet-700",
    initials: "AK"
  }
];

export const CORRIDORS = [
  {
    id: "all",
    label: "All Campus Pools",
    icon: "Sparkles"
  },
  {
    id: "igi_airport",
    label: "IGI Airport",
    destName: "IGI Airport Terminal 3 / 2",
    distanceKm: 44,
    timeMins: 65,
    uberEstimate: 1400,
    olaEstimate: 1350,
    metroFare: 60,
    metroNotes: "80 mins · 2 transfers · High luggage friction",
    peakHours: "Fri 3:00 PM – 7:00 PM"
  },
  {
    id: "ndls_railway",
    label: "NDLS Railway",
    destName: "New Delhi Railway Station (NDLS)",
    distanceKm: 31,
    timeMins: 50,
    uberEstimate: 900,
    olaEstimate: 880,
    metroFare: 50,
    metroNotes: "65 mins · Yellow Line switch · Crowded",
    peakHours: "Fri 4:00 PM – 8:00 PM"
  },
  {
    id: "mall_cybercity",
    label: "Mall / Cyber City",
    destName: "Cyber City / Sector 18 Mall",
    distanceKm: 14,
    timeMins: 25,
    uberEstimate: 450,
    olaEstimate: 430,
    metroFare: 30,
    metroNotes: "40 mins · Rapid Metro connector",
    peakHours: "Sat & Sun 1:00 PM – 6:00 PM"
  },
  {
    id: "isbt_shuttle",
    label: "Break Shuttle",
    destName: "Anand Vihar ISBT / Bus Hub",
    distanceKm: 28,
    timeMins: 45,
    uberEstimate: 800,
    olaEstimate: 780,
    metroFare: 50,
    metroNotes: "60 mins · Blue Line direct",
    peakHours: "Fri Evening & Holiday Breaks"
  }
];

export const INITIAL_POOLS = [
  {
    id: "pool-1",
    departureTime: "Friday, 4:15 PM",
    matchScore: 98,
    origin: "Campus Gate 3",
    destination: "IGI Airport Terminal 3",
    corridorId: "igi_airport",
    poster: {
      name: "Prachi Vats",
      rating: "5.00 ★",
      avatarBg: "bg-emerald-600",
      initials: "PV"
    },
    bootSpace: "Medium Boot (1 Trolley)",
    tags: ["Campus Verified ID", "Safe Travel Circle", "1 Trolley Boot Space"],
    isGirlsOnly: false,
    soloCab: 1400,
    uberGo: 1400,
    olaMini: 1350,
    metroFare: 60,
    seatsTotal: 4,
    seatsOccupied: 3,
    farePerPerson: 350,
    savingsPercent: 75,
    aiRationale: "Prachi Vats is heading to IGI T3 right after lab. Splitting with 2 more peers drops your fare from ₹1,400 solo down to ₹350 each (75% savings) with guaranteed luggage boot space and verified student ID."
  },
  {
    id: "pool-2",
    departureTime: "Friday, 3:45 PM",
    matchScore: 92,
    origin: "Campus Gate 1",
    destination: "IGI Airport Terminal 3",
    corridorId: "igi_airport",
    poster: {
      name: "Kaashvi Saini",
      rating: "4.95 ★",
      avatarBg: "bg-pink-600",
      initials: "KS"
    },
    bootSpace: "Medium Boot (1 Bag Max)",
    tags: ["Girls Only Preference", "Flight T3 Express", "Verified Safe Circle"],
    isGirlsOnly: true,
    soloCab: 1400,
    uberGo: 1400,
    olaMini: 1350,
    metroFare: 60,
    seatsTotal: 4,
    seatsOccupied: 2,
    farePerPerson: 467,
    savingsPercent: 67,
    aiRationale: "Kaashvi Saini departs Campus Gate 1 for IGI T3 flights. Dedicated Girls-Only preference circle ensuring verified campus peer safety and direct terminal drop."
  },
  {
    id: "pool-3",
    departureTime: "Friday, 4:30 PM",
    matchScore: 88,
    origin: "Campus Main Gate",
    destination: "New Delhi Railway Station (NDLS)",
    corridorId: "ndls_railway",
    poster: {
      name: "Ashwin Anand",
      rating: "4.90 ★",
      avatarBg: "bg-blue-600",
      initials: "AA"
    },
    bootSpace: "Heavy Boot Space",
    tags: ["Train Catchers", "NDLS Express", "Heavy Luggage Friendly"],
    isGirlsOnly: false,
    soloCab: 900,
    uberGo: 900,
    olaMini: 880,
    metroFare: 50,
    seatsTotal: 4,
    seatsOccupied: 3,
    farePerPerson: 225,
    savingsPercent: 75,
    aiRationale: "Ashwin Anand is departing right after Session 4 for NDLS. Taking the 4th open seat drops everyone's fare to ₹225—saving ₹675 (75%) vs a solo cab, with zero metro interchange chaos."
  },
  {
    id: "pool-4",
    departureTime: "Friday, 3:45 PM",
    matchScore: 85,
    origin: "Campus North Gate",
    destination: "Anand Vihar ISBT / Bus Hub",
    corridorId: "isbt_shuttle",
    poster: {
      name: "Swapnil Pradhan",
      rating: "4.92 ★",
      avatarBg: "bg-amber-600",
      initials: "SP"
    },
    bootSpace: "Medium Boot",
    tags: ["Vande Bharat Connect", "Quiet Cab", "1 Suitcase Allowed"],
    isGirlsOnly: false,
    soloCab: 800,
    uberGo: 800,
    olaMini: 780,
    metroFare: 50,
    seatsTotal: 4,
    seatsOccupied: 2,
    farePerPerson: 267,
    savingsPercent: 67,
    aiRationale: "Swapnil Pradhan departing for Anand Vihar ISBT / Railway. Joining drops individual fare to ₹267, giving comfortable AC travel directly to the bus terminal."
  },
  {
    id: "pool-5",
    departureTime: "Friday, 5:30 PM",
    matchScore: 89,
    origin: "Campus Gate 2",
    destination: "IGI Airport Terminal 2 & 3",
    corridorId: "igi_airport",
    poster: {
      name: "Akshat Kumar",
      rating: "4.91 ★",
      avatarBg: "bg-purple-600",
      initials: "AK"
    },
    bootSpace: "Heavy Boot (SUV Booked)",
    tags: ["Evening Flights", "Dwarka Expressway", "2 Large Trolleys"],
    isGirlsOnly: false,
    soloCab: 1400,
    uberGo: 1400,
    olaMini: 1350,
    metroFare: 60,
    seatsTotal: 4,
    seatsOccupied: 2,
    farePerPerson: 467,
    savingsPercent: 67,
    aiRationale: "Akshat Kumar has reserved an SUV cab for evening airport departures via Dwarka Expressway with ample space for large suitcases."
  }
];
