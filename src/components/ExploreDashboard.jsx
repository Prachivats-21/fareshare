import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, ArrowLeft, Users, Clock, Search, 
  MapPin, Luggage, Star, CheckCircle, Send, X, ArrowUpRight,
  AlertCircle, MessageCircle, Wallet, Info, Check, Filter,
  Mic, MicOff, Languages, Volume2
} from 'lucide-react';
import { TEAM_MEMBERS, CORRIDORS, INITIAL_POOLS } from '../data/fareshareData';
import { playPop, playSuccess, playToggle } from '../utils/sound';
import confetti from 'canvas-confetti';

// Smart Bilingual Indic Intent Parser (English, Hindi, Hinglish)
function parseBilingualIntent(query) {
  if (!query || !query.trim()) return null;
  const q = query.toLowerCase().trim();

  // Common Hindi / Hinglish vocabulary
  const indicTokens = [
    "kal", "aaj", "parso", "shaam", "sham", "subah", "dopahar", "raat",
    "baje", "jana", "jaana", "chahiye", "samaan", "bag", "trolley", "ladki",
    "ladkiyan", "saath", "chalna", "bhai", "yaar", "gaadi", "adda",
    "vimanpattanam", "hawai adda", "rail gadi", "bhaari", "chota", "pakadna", "pakadni"
  ];

  const isHinglish = indicTokens.some(w => q.includes(w));

  // Determine Destination Corridor
  let corridorId = null;
  let destinationName = null;

  if (q.includes("airport") || q.includes("igi") || q.includes("t3") || q.includes("terminal") || q.includes("flight") || q.includes("hawai adda") || q.includes("vimanpattanam")) {
    corridorId = "igi_airport";
    destinationName = "IGI Airport Terminal 3";
  } else if (q.includes("ndls") || q.includes("railway") || q.includes("station") || q.includes("train") || q.includes("new delhi") || q.includes("rail gadi")) {
    corridorId = "ndls_railway";
    destinationName = "New Delhi Railway Station (NDLS)";
  } else if (q.includes("cyber") || q.includes("mall") || q.includes("sector 18") || q.includes("sec 18") || q.includes("noida") || q.includes("dlf") || q.includes("ambience")) {
    corridorId = "cyber_city";
    destinationName = "Cyber City / Sector 18";
  } else if (q.includes("isbt") || q.includes("anand vihar") || q.includes("bus adda") || q.includes("bus") || q.includes("shuttle") || q.includes("break")) {
    corridorId = "anand_vihar";
    destinationName = "Anand Vihar ISBT";
  }

  // Determine Luggage Fit
  let luggageType = null;
  if (q.includes("heavy") || q.includes("bhaari") || q.includes("2 trolley") || q.includes("2 bag") || q.includes("badi peti") || q.includes("bada bag")) {
    luggageType = "Heavy Luggage";
  } else if (q.includes("bag") || q.includes("suitcase") || q.includes("trolley") || q.includes("samaan") || q.includes("chota")) {
    luggageType = "Medium (1 Trolley)";
  }

  // Determine Girls-Only Intent
  const girlsIntent = q.includes("girl") || q.includes("female") || q.includes("ladki") || q.includes("ladkiyan") || q.includes("women");

  // Determine Time Intent
  let timeStr = null;
  if (q.includes("kal shaam") || q.includes("tomorrow evening")) timeStr = "Tomorrow Evening (~4-6 PM)";
  else if (q.includes("kal subah") || q.includes("tomorrow morning")) timeStr = "Tomorrow Morning (~7-9 AM)";
  else if (q.includes("friday") || q.includes("shukrawar")) timeStr = "Friday Departure";
  else if (q.includes("4 pm") || q.includes("4 baje")) timeStr = "Around 4:00 PM";
  else if (q.includes("weekend") || q.includes("sunday") || q.includes("ravivar")) timeStr = "Weekend Run";

  const summaryParts = [];
  if (destinationName) summaryParts.push(destinationName);
  if (timeStr) summaryParts.push(timeStr);
  if (luggageType) summaryParts.push(luggageType);
  if (girlsIntent) summaryParts.push("Girls-Only Circle");

  return {
    isHinglish,
    language: isHinglish ? 'Hinglish (Hindi + English)' : 'English',
    corridorId,
    destinationName,
    luggageType,
    girlsIntent,
    timeStr,
    summary: summaryParts.length > 0 ? summaryParts.join(' • ') : `Smart search for "${query}"`
  };
}

export default function ExploreDashboard({ onBackToStory }) {
  // Active Logged-in Persona
  const [selectedPersona, setSelectedPersona] = useState(TEAM_MEMBERS[0]); // Prachi Vats
  
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCorridor, setActiveCorridor] = useState('all');
  const [girlsOnlyFilter, setGirlsOnlyFilter] = useState(false);

  // Microphone Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState('');

  // Handle Speech Recognition / Microphone Toggle
  const handleToggleVoice = () => {
    playPop();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser fallback: simulate voice input with realistic bilingual queries
      const sampleQueries = [
        "Kal shaam 4 baje IGI Airport T3 jaana hai 1 trolley ke sath",
        "Heading to New Delhi Railway Station this Friday around 4 PM",
        "Sector 18 Cyber City mall chalna hai Sunday afternoon",
        "Friday shaam ko NDLS train pakadni hai"
      ];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setIsListening(true);
      setVoiceNotice('Listening... बोलिए (Recording in Hindi/English)');
      setTimeout(() => {
        setSearchQuery(randomQuery);
        setIsListening(false);
        setVoiceNotice('');
        playSuccess();
      }, 1200);
      return;
    }

    if (isListening) {
      setIsListening(false);
      setVoiceNotice('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN'; // Recognizes Indian English & Hindi seamlessly
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice('Listening... बोलिए (Speak in English, Hindi, or Hinglish)');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setSearchQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition notice:", event.error);
        setIsListening(false);
        setVoiceNotice('');
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          // Provide instant fallback prompt
          setSearchQuery("Kal shaam 4 baje IGI Airport T3 jaana hai 1 trolley ke sath");
          playSuccess();
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setVoiceNotice('');
        playSuccess();
      };

      recognition.start();
    } catch (err) {
      console.warn("Speech API error:", err);
      setIsListening(false);
      setVoiceNotice('');
      setSearchQuery("Kal shaam 4 baje IGI Airport T3 jaana hai 1 trolley ke sath");
    }
  };

  // Live Pools State
  const [pools, setPools] = useState(INITIAL_POOLS);
  const [requestedPools, setRequestedPools] = useState({}); // { [poolId]: true }

  // Ephemeral Chat Drawer State (Section 5.4 in DESIGN.md)
  const [activeChatPool, setActiveChatPool] = useState(null);
  const [chatLifecycleStage, setChatLifecycleStage] = useState('upcoming'); // 'upcoming' | 'transit' | 'grace' | 'expired'
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Prachi Vats",
      text: "Hey everyone! I'll be waiting at Hostel 3 Gate right at 4:10 PM. Cab is booked (Silver Dzire DL 1Z 4021).",
      time: "4:02 PM",
      isCurrentUser: false
    },
    {
      id: 2,
      sender: "Kaashvi Saini",
      text: "Awesome, putting my trolley in the boot right now!",
      time: "4:05 PM",
      isCurrentUser: false
    }
  ]);
  const [newChatText, setNewChatText] = useState('');
  const [upiSettled, setUpiSettled] = useState(false);

  // New Pool Modal State
  const [showPostPoolModal, setShowPostPoolModal] = useState(false);
  const [newPoolDestination, setNewPoolDestination] = useState('IGI Airport Terminal 3');
  const [newPoolTime, setNewPoolTime] = useState('Tomorrow, 4:00 PM');
  const [newPoolLuggage, setNewPoolLuggage] = useState('Medium Boot (1 Trolley)');

  // Simulator State inside Dashboard
  const [simCorridor, setSimCorridor] = useState(CORRIDORS[1]); // IGI Airport
  const [simRiders, setSimRiders] = useState(4);

  // Bilingual AI Intent Parsing
  const bilingualIntent = parseBilingualIntent(searchQuery);

  // Filter Logic with Smart Bilingual Intent Matching
  const filteredPools = pools.filter((pool) => {
    // Corridor filter
    if (activeCorridor !== 'all' && pool.corridorId !== activeCorridor) {
      return false;
    }
    // Girls-only safe filter (or if detected in conversational query)
    if ((girlsOnlyFilter || (bilingualIntent && bilingualIntent.girlsIntent)) && !pool.isGirlsOnly) {
      return false;
    }
    // Search query matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDest = pool.destination.toLowerCase().includes(q);
      const matchOrigin = pool.origin.toLowerCase().includes(q);
      const matchPoster = pool.poster.name.toLowerCase().includes(q);
      const matchRationale = pool.aiRationale.toLowerCase().includes(q);

      // Semantic Bilingual Corridor & Destination Matching
      const matchIntentCorridor = bilingualIntent?.corridorId && pool.corridorId === bilingualIntent.corridorId;
      const matchIntentDest = bilingualIntent?.destinationName && pool.destination.toLowerCase().includes(bilingualIntent.destinationName.toLowerCase());

      return matchDest || matchOrigin || matchPoster || matchRationale || matchIntentCorridor || matchIntentDest;
    }
    return true;
  });

  // Handle Request to Pool
  const handleRequestPool = (pool) => {
    playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setRequestedPools((prev) => ({ ...prev, [pool.id]: true }));
    setActiveChatPool(pool);
  };

  // Handle Sending Chat
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    playPop();
    const msg = {
      id: Date.now(),
      sender: selectedPersona.name,
      text: newChatText.trim(),
      time: "Just now",
      isCurrentUser: true
    };
    setChatMessages((prev) => [...prev, msg]);
    setNewChatText('');
  };

  // Handle Creating a New Pool
  const handleCreatePool = (e) => {
    e.preventDefault();
    playSuccess();
    const created = {
      id: `pool-${Date.now()}`,
      departureTime: newPoolTime,
      matchScore: 95,
      origin: `${selectedPersona.hostel} Gate`,
      destination: newPoolDestination,
      corridorId: "igi_airport",
      poster: {
        name: selectedPersona.name,
        hostel: selectedPersona.hostel,
        rating: `${selectedPersona.rating.toFixed(2)} ★`,
        avatarBg: selectedPersona.avatarBg,
        initials: selectedPersona.initials
      },
      bootSpace: newPoolLuggage,
      tags: ["Campus Verified ID", "Newly Created Pool"],
      isGirlsOnly: selectedPersona.hostel.includes("Girls"),
      soloCab: 1400,
      uberGo: 1400,
      olaMini: 1350,
      metroFare: 60,
      seatsTotal: 4,
      seatsOccupied: 1,
      farePerPerson: 350,
      savingsPercent: 75,
      aiRationale: `${selectedPersona.name} posted a new departure pool from ${selectedPersona.hostel} Gate to ${newPoolDestination}. Estimated 4-way split drops fare to ₹350 each.`
    };
    setPools([created, ...pools]);
    setShowPostPoolModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B1E1D] flex flex-col font-sans">
      
      {/* 1. Dashboard Sub-Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E7E4DC] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playPop();
                onBackToStory();
              }}
              className="p-2 rounded-full hover:bg-[#F4F1EA] text-[#525955] hover:text-[#1B1E1D] transition-colors"
              title="Return to Story Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-[#1B1E1D]">FareShare</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-[#EAF2EE] border border-[#D0E2D8] px-2 py-0.5 rounded-full">
                NST-RU CAMPUS EXCLUSIVE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setShowPostPoolModal(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A3D34] hover:bg-[#132E27] text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>+ Post Ride Pool</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Persona Switcher Carousel (Section A from Design Guide) */}
      <div className="bg-[#FFFFFF] border-b border-[#E7E4DC] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#6B726F]">
            <Users className="w-4 h-4 text-[#1A3D34]" />
            <span className="uppercase tracking-wider">SWITCH ACTIVE STUDENT:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {TEAM_MEMBERS.map((member) => {
              const isActive = selectedPersona.name === member.name;
              return (
                <button
                  key={member.name}
                  onClick={() => {
                    playPop();
                    setSelectedPersona(member);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1A3D34] text-white shadow-sm ring-2 ring-[#1A3D34]/20'
                      : 'bg-white text-[#525955] border border-[#E7E4DC] hover:border-[#1A3D34]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#FAF8F5] text-[#1B1E1D]'
                  }`}>
                    {member.initials}
                  </span>
                  <span>{member.name.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-75">({member.hostel.split('(')[0].trim()})</span>
                  {isActive && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">

        {/* Hero Banner with Conversational Omnibox */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-[#EAF2EE] px-2.5 py-0.5 rounded-full border border-[#D0E2D8]">
                TEAM ENDERMEN • LIVE RIDE POOLING
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B1E1D] mt-2 tracking-tight">
                Active NST-RU Departure Pools
              </h1>
            </div>
            <div className="text-xs text-[#6B726F] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Logged in as: <strong>{selectedPersona.name}</strong> ({selectedPersona.hostel})</span>
            </div>
          </div>

          {/* Conversational Travel Omnibox (Section B from Spec) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E7E4DC] shadow-soft-card space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold uppercase tracking-wider text-[#1A3D34] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  CONVERSATIONAL TRAVEL OMNIBOX (SPEAK NATURALLY)
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 bg-[#EAF2EE] border border-[#D0E2D8] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Languages className="w-3 h-3 text-emerald-600" />
                  Bilingual AI (English + Hinglish)
                </span>
              </div>
              <button
                onClick={() => {
                  playPop();
                  setSearchQuery("Kal shaam 4 baje IGI Airport T3 jaana hai 1 trolley ke sath");
                }}
                className="text-emerald-700 hover:text-emerald-900 font-semibold text-xs transition-colors hidden sm:inline"
              >
                Load {selectedPersona.name.split(' ')[0]}'s typical trip →
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8C938F]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Kal shaam 4 baje IGI Airport T3 jaana hai, or Heading to NDLS with 1 bag..."
                  className="w-full pl-12 pr-28 py-3.5 text-xs sm:text-sm rounded-2xl bg-[#FAF8F5] border border-[#E7E4DC] focus:outline-none focus:border-[#1A3D34] text-[#1B1E1D]"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-2 py-1 text-zinc-400 hover:text-black text-xs font-bold"
                    >
                      Clear
                    </button>
                  )}

                  {/* Microphone Voice Input Button */}
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    title={isListening ? "Listening... click to stop" : "Speak in Hindi, Hinglish, or English"}
                    className={`p-2 rounded-xl transition-all flex items-center gap-1.5 ${
                      isListening 
                        ? 'bg-rose-500 text-white animate-pulse shadow-md ring-2 ring-rose-400' 
                        : 'text-[#525955] hover:text-[#1A3D34] hover:bg-[#EAF2EE] border border-transparent hover:border-[#D0E2D8]'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        <span className="text-[10px] font-bold">बोलिए</span>
                        <Mic className="w-4 h-4 animate-bounce" />
                      </>
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => playSuccess()}
                className="px-6 py-3.5 rounded-2xl bg-[#1A3D34] hover:bg-[#132E27] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>AI Match Rides</span>
              </button>
            </div>

            {/* Voice Listening Active Notice */}
            {isListening && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between animate-pulse">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <strong>Microphone Active:</strong> {voiceNotice || "Listening... Speak your ride in Hindi, Hinglish, or English"}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-white px-2 py-0.5 rounded-full border border-rose-200">
                  Live Voice Input
                </span>
              </div>
            )}

            {/* Bilingual AI Semantic Result Interpretation Chip */}
            {bilingualIntent && searchQuery.trim() && (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EAF2EE] border border-[#D0E2D8] text-xs text-[#1A3D34] animate-fadeIn">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1A3D34] text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Languages className="w-3 h-3 text-emerald-300" />
                    {bilingualIntent.isHinglish ? '🇮🇳 Hinglish AI Parsed' : '🌐 Bilingual AI Matched'}
                  </span>
                  <span className="font-medium text-[#2C3833]">
                    <strong>Interpreted:</strong> {bilingualIntent.summary}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-[#D0E2D8] hidden sm:inline">
                  {filteredPools.length} pool{filteredPools.length === 1 ? '' : 's'} available
                </span>
              </div>
            )}

            {/* Quick Route Prompts including Bilingual Hinglish Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-bold text-[#8C938F] uppercase text-[11px]">Quick Prompts:</span>
              {[
                { label: "IGI Airport", q: "IGI Airport" },
                { label: "NDLS Railway Station", q: "NDLS Railway" },
                { label: "🇮🇳 Kal shaam airport", q: "Kal shaam 4 baje IGI airport jaana hai 1 trolley ke sath" },
                { label: "🇮🇳 NDLS train pakadni", q: "Friday shaam ko NDLS train pakadni hai" },
                { label: "🇮🇳 Sector 18 Mall", q: "Sector 18 Cyber City mall chalna hai" },
                { label: "🌸 Girls-Only Pool", q: "Only girls safe circle for airport" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    playPop();
                    setSearchQuery(item.q);
                  }}
                  className="px-3 py-1 rounded-full bg-[#FAF8F5] hover:bg-[#F4F1EA] text-[#525955] border border-[#E7E4DC] text-xs font-medium transition-colors"
                >
                  [{item.label}]
                </button>
              ))}
            </div>

            {/* Corridor Filters & Girls-Only Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0ECE1]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-[#8C938F] uppercase">Corridor:</span>
                {CORRIDORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      playPop();
                      setActiveCorridor(c.id);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeCorridor === c.id
                        ? 'bg-[#1A3D34] text-white shadow-sm'
                        : 'bg-white text-[#525955] border border-[#E7E4DC] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Girls-Only Safe Filter Toggle */}
              <button
                onClick={() => {
                  playToggle();
                  setGirlsOnlyFilter(!girlsOnlyFilter);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  girlsOnlyFilter
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-white text-[#525955] border border-pink-200 hover:border-pink-500'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Girls-Only Safe Filter</span>
                <span className={`w-2 h-2 rounded-full ${girlsOnlyFilter ? 'bg-white' : 'bg-pink-400'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Active Departure Pools Bento Grid (Section C from Spec) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8C938F] uppercase tracking-wider">
              {filteredPools.length} POOLS MATCHING YOUR CRITERIA
            </span>
            {girlsOnlyFilter && (
              <span className="text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                Filtered: Girls-Only Circles
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.map((pool) => {
              const isRequested = requestedPools[pool.id];
              return (
                <div
                  key={pool.id}
                  className="bg-white rounded-3xl p-6 border border-[#E7E4DC] shadow-soft-card flex flex-col justify-between hover:border-[#1A3D34] transition-all hover:shadow-md"
                >
                  <div>
                    {/* Top Header: Departure & Match Score */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE1]">
                      <span className="text-xs font-bold text-[#1A3D34] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E7E4DC]">
                        DEP • {pool.departureTime}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-[#EAF2EE] px-2.5 py-1 rounded-full border border-[#D0E2D8] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        {pool.matchScore}% Match
                      </span>
                    </div>

                    {/* Route Well (Origin -> Destination) */}
                    <div className="my-4 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E4DC]">
                      <div className="text-[10px] text-[#8C938F] font-bold uppercase tracking-wider">
                        ORIGIN GATE ➔ DESTINATION HUB
                      </div>
                      <div className="font-bold text-sm text-[#1B1E1D] mt-1 flex items-center justify-between">
                        <span>{pool.origin.replace("NST-RU Campus ", "")}</span>
                        <span className="text-emerald-700">➔</span>
                        <span>{pool.destination}</span>
                      </div>
                    </div>

                    {/* Poster Profile */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${pool.poster.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                          {pool.poster.initials}
                        </div>
                        <div>
                          <div className="font-bold text-[#1B1E1D] flex items-center gap-1">
                            <span>{pool.poster.name}</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div className="text-[11px] text-[#6B726F]">
                            {pool.poster.hostel} • {pool.poster.rating}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-[#525955] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E7E4DC] flex items-center gap-1">
                          <Luggage className="w-3 h-3 text-zinc-500" />
                          {pool.bootSpace.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {pool.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold text-[#525955] bg-[#F4F1EA] px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {pool.isGirlsOnly && (
                        <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                          Girls Only Safe
                        </span>
                      )}
                    </div>

                    {/* AI Rationale Box */}
                    <div className="mt-4 p-3 rounded-2xl bg-[#EAF2EE]/60 border border-[#D0E2D8] text-[11px] text-[#1A3D34] leading-relaxed">
                      <span className="font-bold uppercase tracking-wider block text-[10px] text-emerald-800 mb-0.5">
                        ✨ AI Rationale:
                      </span>
                      {pool.aiRationale}
                    </div>

                    {/* Multi-Modal Comparison Strip (Uber / Ola / Metro) */}
                    <div className="mt-4 pt-3 border-t border-[#F0ECE1] grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-[#6B726F]">
                      <div className="bg-[#FAF8F5] p-1.5 rounded-xl border border-[#E7E4DC]">
                        <span>Uber Go</span>
                        <div className="font-bold text-[#1B1E1D]">₹{pool.uberGo}</div>
                      </div>
                      <div className="bg-[#FAF8F5] p-1.5 rounded-xl border border-[#E7E4DC]">
                        <span>Ola Mini</span>
                        <div className="font-bold text-[#1B1E1D]">₹{pool.olaMini}</div>
                      </div>
                      <div className="bg-[#FAF8F5] p-1.5 rounded-xl border border-[#E7E4DC]">
                        <span>DMRC Metro</span>
                        <div className="font-bold text-[#1B1E1D]">₹{pool.metroFare}</div>
                      </div>
                    </div>
                  </div>

                  {/* Fare Split & Action Footer */}
                  <div className="mt-5 pt-4 border-t border-[#F0ECE1]">
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#8C938F] uppercase">YOUR FARESHARE SPLIT</span>
                        <div className="text-2xl font-black text-[#1A3D34]">
                          ₹{pool.farePerPerson}
                          <span className="text-xs font-normal text-zinc-400 line-through ml-2">₹{pool.soloCab} solo</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-emerald-800 bg-[#EAF2EE] px-2 py-0.5 rounded-full border border-[#D0E2D8]">
                          Save {pool.savingsPercent}%
                        </span>
                        <div className="text-[11px] text-[#6B726F] mt-1">
                          {pool.seatsTotal - pool.seatsOccupied} of {pool.seatsTotal} seats open
                        </div>
                      </div>
                    </div>

                    {isRequested ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            playPop();
                            setActiveChatPool(pool);
                          }}
                          className="flex-1 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Joined • Open Chat</span>
                        </button>
                        <button
                          onClick={() => {
                            playPop();
                            setRequestedPools((prev) => ({ ...prev, [pool.id]: false }));
                          }}
                          className="px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7E4DC] text-xs font-bold text-[#525955] hover:text-black"
                        >
                          Leave
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRequestPool(pool)}
                        className="w-full py-2.5 rounded-full bg-[#1A3D34] hover:bg-[#132E27] text-white text-xs font-bold tracking-wide transition-all shadow-sm"
                      >
                        Request to Pool (₹{pool.farePerPerson}) ↗
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Interactive Campus Fare-Split Simulator (Section D from Spec) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E4DC] shadow-soft-card">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#267256] bg-[#EAF2EE] px-3 py-1 rounded-full border border-[#D0E2D8]">
              02 • ROUTE-MATCHING & FARE-SPLIT ENGINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1E1D] mt-2">
              Interactive Campus Fare-Split Simulator
            </h2>
            <p className="text-xs sm:text-sm text-[#525955] mt-1">
              Select an NST-RU route corridor and drag the student count to inspect real-time per-student fare reduction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-xs font-bold text-[#1B1E1D] uppercase tracking-wider block mb-2">
                  Step 1 • Pick a Corridor Hub
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {CORRIDORS.filter(c => c.id !== 'all').map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        playPop();
                        setSimCorridor(c);
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        simCorridor.id === c.id
                          ? 'border-[#1A3D34] bg-[#EAF2EE]/50 shadow-sm'
                          : 'border-[#E7E4DC] bg-[#FAF8F5] hover:bg-[#F4F1EA]'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#1B1E1D]">{c.label}</div>
                      <div className="text-[11px] text-[#6B726F] mt-0.5">{c.distanceKm} km • ~{c.timeMins} mins</div>
                      <div className="text-[11px] font-bold text-emerald-800 mt-1">Solo: ₹{c.uberEstimate}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-[#1B1E1D] uppercase tracking-wider">Step 2 • Drag Co-Rider Count:</span>
                  <span className="text-[#1A3D34] bg-[#EAF2EE] px-2.5 py-0.5 rounded-full">
                    {simRiders} Students Sharing
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => {
                    const price = Math.round(simCorridor.uberEstimate / count);
                    return (
                      <button
                        key={count}
                        onClick={() => {
                          playPop();
                          setSimRiders(count);
                        }}
                        className={`p-3 rounded-2xl text-center border transition-all ${
                          simRiders === count
                            ? 'bg-[#1A3D34] text-white border-[#1A3D34] shadow-sm'
                            : 'bg-[#FAF8F5] text-[#525955] border-[#E7E4DC] hover:bg-[#F4F1EA]'
                        }`}
                      >
                        <div className="text-xs font-bold">{count} {count === 1 ? 'Solo' : 'Peers'}</div>
                        <div className="text-[11px] font-semibold mt-1">₹{price}/ea</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E4DC] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#6B726F]">Peak Departure Window:</span>
                  <div className="font-bold text-[#1B1E1D]">{simCorridor.peakHours}</div>
                </div>
                <button
                  onClick={() => {
                    playPop();
                    setSearchQuery(simCorridor.label);
                  }}
                  className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  Find {simCorridor.label} Pools <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Receipt (Hero Card Style from DESIGN.md) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1A3D34] to-[#122A23] text-white rounded-3xl p-6 sm:p-7 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-900/50">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE FARE RECEIPT
                </span>
                <span className="text-xs font-bold text-zinc-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                  {simCorridor.label}
                </span>
              </div>

              <div className="space-y-3 my-5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Solo Uber Go Cab</span>
                  <span className="font-mono line-through text-zinc-400">₹{simCorridor.uberEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Solo Ola Mini Cab</span>
                  <span className="font-mono line-through text-zinc-400">₹{simCorridor.olaEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delhi Metro (DMRC)</span>
                  <span className="font-mono text-amber-300">₹{simCorridor.metroFare} (80 mins)</span>
                </div>
                <div className="pt-2 border-t border-emerald-900/40 flex justify-between font-bold text-emerald-300">
                  <span>FareShare 4-Way Pool</span>
                  <span className="text-white text-base">₹{Math.round(simCorridor.uberEstimate / simRiders)} / student</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-emerald-500/20">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                      YOU SAVE PER TRIP
                    </span>
                    <div className="text-3xl font-black text-white mt-0.5">
                      ₹{simCorridor.uberEstimate - Math.round(simCorridor.uberEstimate / simRiders)}
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-emerald-400 text-[#1A3D34] px-2.5 py-1 rounded-full">
                    {Math.round(((simCorridor.uberEstimate - Math.round(simCorridor.uberEstimate / simRiders)) / simCorridor.uberEstimate) * 100)}% OFF SOLO
                  </span>
                </div>
                <div className="mt-3 text-[11px] text-zinc-300 pt-3 border-t border-white/10">
                  🎉 4 weekend trips/month saves ~₹{(simCorridor.uberEstimate - Math.round(simCorridor.uberEstimate / simRiders)) * 4} per semester month.
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* 6. SLIDE-OVER EPHEMERAL CHAT DRAWER (Section 5.4 in DESIGN.md) */}
      {activeChatPool && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E7E4DC] animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div>
              <div className="p-4 sm:p-5 border-b border-[#E7E4DC] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-[#1B1E1D]">Trip Coordination</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ID: {activeChatPool.id}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B726F] mt-0.5">
                    {activeChatPool.origin.replace("NST-RU Campus ", "")} ➔ {activeChatPool.destination}
                  </div>
                </div>
                <button
                  onClick={() => setActiveChatPool(null)}
                  className="p-2 rounded-full hover:bg-[#FAF8F5] text-[#525955]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 4-Stage Lifecycle Status Bar (from DESIGN.md Section 5.4) */}
              <div className="p-3 bg-[#FAF8F5] border-b border-[#E7E4DC]">
                <div className="text-[10px] font-bold text-[#8C938F] uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>LIFECYCLE STATUS:</span>
                  <span className="text-zinc-400">Click below to simulate stages:</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'upcoming', label: 'Upcoming', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
                    { id: 'transit', label: 'In Transit', color: 'bg-blue-50 text-blue-800 border-blue-300' },
                    { id: 'grace', label: 'Grace (4h)', color: 'bg-amber-50 text-amber-800 border-amber-300' },
                    { id: 'expired', label: 'Expired', color: 'bg-zinc-100 text-zinc-600 border-zinc-300' }
                  ].map((stage) => (
                    <button
                      key={stage.id}
                      onClick={() => {
                        playPop();
                        setChatLifecycleStage(stage.id);
                      }}
                      className={`py-1 text-[10px] font-bold rounded-lg border text-center transition-all ${
                        chatLifecycleStage === stage.id
                          ? `${stage.color} ring-1 ring-[#1A3D34]`
                          : 'bg-white text-zinc-400 border-[#E7E4DC]'
                      }`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>

                <div className="mt-2 text-[11px] text-[#525955] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {chatLifecycleStage === 'upcoming' && <span>Departs at {activeChatPool.departureTime}</span>}
                  {chatLifecycleStage === 'transit' && <span>Ride in progress via Dwarka Expressway</span>}
                  {chatLifecycleStage === 'grace' && <span className="font-bold text-amber-800">Grace Period: Settle ₹{activeChatPool.farePerPerson} via UPI</span>}
                  {chatLifecycleStage === 'expired' && <span className="text-zinc-400">Chat sealed and auto-purged for student privacy</span>}
                </div>
              </div>
            </div>

            {/* Chat Messages Well */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]/50">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-semibold text-[#8C938F] mb-0.5">
                    {msg.sender} • {msg.time}
                  </span>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-xs leading-relaxed ${
                      msg.isCurrentUser
                        ? 'bg-[#1A3D34] text-white rounded-2xl rounded-br-sm'
                        : 'bg-white text-[#1B1E1D] border border-[#E7E4DC] rounded-2xl rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* UPI Quick Settlement Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mt-4">
                <div className="flex items-center justify-between font-bold">
                  <span>Settle Cab Fare (₹{activeChatPool.farePerPerson})</span>
                  <Wallet className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-[11px] text-amber-800 mt-1">
                  Pay to: <strong>prachi@okaxis</strong> (Hostel 3)
                </div>
                <button
                  onClick={() => {
                    playSuccess();
                    setUpiSettled(true);
                  }}
                  className={`w-full mt-2.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    upiSettled
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1A3D34] hover:bg-[#132E27] text-white'
                  }`}
                >
                  {upiSettled ? '✓ Fare Paid via UPI' : 'Mark ₹' + activeChatPool.farePerPerson + ' Paid via UPI'}
                </button>
              </div>
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-[#E7E4DC] bg-white flex gap-2">
              <input
                type="text"
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="Type a message to co-riders..."
                disabled={chatLifecycleStage === 'expired'}
                className="flex-1 px-4 py-2.5 text-xs rounded-full border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={chatLifecycleStage === 'expired' || !newChatText.trim()}
                className="p-2.5 rounded-full bg-[#1A3D34] hover:bg-[#132E27] text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. POST NEW POOL MODAL */}
      {showPostPoolModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E7E4DC] shadow-2xl relative">
            <button
              onClick={() => setShowPostPoolModal(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#1A3D34] text-white flex items-center justify-center font-bold text-xs">
                FS
              </span>
              <div>
                <h3 className="font-extrabold text-base text-[#1B1E1D]">Post a Campus Ride Pool</h3>
                <span className="text-[11px] text-[#6B726F]">Posting as {selectedPersona.name} ({selectedPersona.hostel})</span>
              </div>
            </div>

            <form onSubmit={handleCreatePool} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#1B1E1D] uppercase text-[10px]">Destination Hub</label>
                <select
                  value={newPoolDestination}
                  onChange={(e) => setNewPoolDestination(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34] font-semibold"
                >
                  <option>IGI Airport Terminal 3</option>
                  <option>New Delhi Railway Station (NDLS)</option>
                  <option>Cyber City / Sector 18 Mall</option>
                  <option>Anand Vihar ISBT / Bus Hub</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1B1E1D] uppercase text-[10px]">Departure Date & Time</label>
                <input
                  type="text"
                  value={newPoolTime}
                  onChange={(e) => setNewPoolTime(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34]"
                  placeholder="e.g. Friday, 4:30 PM"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1E1D] uppercase text-[10px]">Boot Luggage Space</label>
                <select
                  value={newPoolLuggage}
                  onChange={(e) => setNewPoolLuggage(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34] font-semibold"
                >
                  <option>Medium Boot (1 Trolley)</option>
                  <option>Heavy Boot (2 Trolleys / SUV)</option>
                  <option>Light Boot (Backpack Only)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#1A3D34] hover:bg-[#132E27] text-white font-bold transition-all shadow-md"
                >
                  Publish Ride Pool ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
