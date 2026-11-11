import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, ArrowRight, Users, Clock, Compass, 
  CheckCircle2, X, MessageSquare, Wallet, ExternalLink, MapPin,
  Car, Navigation, Check
} from 'lucide-react';
import { TEAM_MEMBERS, CORRIDORS } from '../data/fareshareData';
import LetterHighlightStream from './animations/LetterHighlightStream';
import RotatingText from './animations/RotatingText';
import CountUp from './animations/CountUp';
import SpotlightCard from './animations/SpotlightCard';
import UserProfileDropdown from './UserProfileDropdown';

export default function LandingPage({ onLaunchApp }) {
  // Destination options for Hero Simulator
  const destinationCorridors = [
    {
      id: "igi",
      name: "IGI Airport T3",
      origin: "NST-RU Campus Gate 1",
      destination: "IGI Airport Terminal 3",
      distance: "44 KM • ~65 mins",
      tag: "T3 Flight Express",
      soloFare: 1400
    },
    {
      id: "ndls",
      name: "NDLS Railway",
      origin: "NST-RU Main Gate",
      destination: "New Delhi Railway (NDLS)",
      distance: "31 KM • ~50 mins",
      tag: "Train Catchers",
      soloFare: 900
    },
    {
      id: "cyber",
      name: "Cyber City Mall",
      origin: "NST-RU Clocktower",
      destination: "Cyber City / Sector 18",
      distance: "14 KM • ~25 mins",
      tag: "Weekend Run",
      soloFare: 450
    }
  ];

  const [activeCorridor, setActiveCorridor] = useState(destinationCorridors[0]);
  const [heroRiders, setHeroRiders] = useState(4);
  const [prevFare, setPrevFare] = useState(1400);

  // Modals for Credibility & Legal
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy' | 'feedback'
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Dynamic calculations for Hero Simulator
  const splitFare = Math.round(activeCorridor.soloFare / heroRiders);
  const savings = activeCorridor.soloFare - splitFare;
  const savingsPercent = Math.round((savings / activeCorridor.soloFare) * 100);

  const handleRiderChange = (count) => {
    setPrevFare(splitFare);
    setHeroRiders(count);
  };

  const handleCorridorChange = (c) => {
    setPrevFare(splitFare);
    setActiveCorridor(c);
  };

  // Team members with rich vibrant colors for their name icons
  const teamList = [
    { name: "Prachi Vats", bg: "from-emerald-500 to-teal-700 text-white shadow-emerald-500/20" },
    { name: "Kaashvi Saini", bg: "from-rose-500 to-pink-600 text-white shadow-rose-500/20" },
    { name: "Ashwin Anand", bg: "from-blue-500 to-indigo-600 text-white shadow-blue-500/20" },
    { name: "Swapnil Pradhan", bg: "from-amber-500 to-orange-600 text-white shadow-amber-500/20" },
    { name: "Akshat Kumar", bg: "from-purple-500 to-violet-700 text-white shadow-purple-500/20" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B1E1D] flex flex-col font-sans">
      {/* 1. Global Announcement Banner */}
      <div className="bg-gradient-to-r from-[#1A3D34] via-[#122A23] to-[#1A3D34] text-white py-2 px-4 text-xs font-medium text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold text-emerald-300">NST-RU Campus Exclusive</span>
        <span className="hidden sm:inline">• Hackathon Edition built by Team EnderMen for coNStruCT 2.0</span>
        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px] uppercase font-bold ml-1">
          Live Prototype
        </span>
      </div>

      {/* 2. Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A3D34] to-[#267256] text-white flex items-center justify-center font-bold text-base shadow-sm">
              FS
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-[#1B1E1D]">FareShare</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded ml-2 border border-emerald-200">
                NST-RU
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#525955]">
            <a href="#problem" className="hover:text-[#1A3D34] transition-colors">The Problem</a>
            <a href="#how-it-works" className="hover:text-[#1A3D34] transition-colors">How It Works</a>
            <a href="#multi-modal" className="hover:text-[#1A3D34] transition-colors">Transit Matrix</a>
            <a href="#team" className="hover:text-[#1A3D34] transition-colors">Team</a>
          </nav>

          {/* User Profile + Explore Live App CTA */}
          <div className="flex items-center gap-3">
            <UserProfileDropdown />
            <button
              onClick={onLaunchApp}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A3D34] hover:bg-[#132E27] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Live App</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:py-20 max-w-7xl mx-auto w-full">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-100/60 via-amber-50/50 to-teal-100/40 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Statement with TechText in ALL CAPITAL LETTERS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EE] border border-[#D0E2D8] text-xs font-bold text-[#1A3D34]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI-POWERED CAMPUS TRAVEL OMNIBOX</span>
            </div>

            {/* Continuous Letter-by-Letter Highlighting (Video / Lyric Style) - Just the 2 lines */}
            <div className="py-2">
              <LetterHighlightStream
                lines={[
                  "SPLIT CABS.",
                  "SAVE MONEY."
                ]}
                charSpeedMs={50}
                holdAtEndMs={1400}
                className="text-4xl sm:text-6xl lg:text-[64px]"
              />
            </div>

            {/* Symmetrical & Even Subtitle */}
            <div className="text-base sm:text-lg text-[#525955] leading-relaxed max-w-2xl space-y-1.5">
              <p>
                Stop overpaying for solo cabs or spamming chaotic WhatsApp groups.
              </p>
              <p>
                Tell FareShare where you're heading to{' '}
                <span className="font-extrabold text-[#1A3D34] underline decoration-emerald-400 decoration-2 underline-offset-4 inline">
                  <RotatingText 
                    texts={[
                      "IGI Airport Terminal 3",
                      "NDLS Railway Station",
                      "Cyber City & Sector 18",
                      "Anand Vihar ISBT"
                    ]} 
                    interval={2400}
                  />
                </span>{' '}
                and our AI matches you with verified <span className="font-semibold text-emerald-800">@nst-ru.edu.in</span> campus peers in seconds.
              </p>
            </div>

            {/* Key Value Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#4B524E]">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E7E4DC] shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified .edu ID Only</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E7E4DC] shadow-sm">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Girls-Only Safe Circles</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#E7E4DC] shadow-sm">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>4-Hr Ephemeral Settlement</span>
              </div>
            </div>

          </div>

          {/* Right Hero: Modern Clean Live Fare Simulator Card (Redesigned Corridor UI) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-hero-live">
              
              {/* Header with live status */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE1]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D34]">Live Fare Simulator</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Save Up to 75%
                </span>
              </div>

              {/* REDESIGNED CORRIDOR JOURNEY UI (Clean, Spacious, No Clunky Letter Blocks) */}
              <div className="my-5 space-y-3">
                {/* 3 Corridor Selector Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F4F1EA] rounded-2xl border border-[#E7E4DC]">
                  {destinationCorridors.map((c) => {
                    const isSelected = activeCorridor.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleCorridorChange(c)}
                        className={`py-1.5 px-2 text-[11px] font-bold rounded-xl transition-all truncate ${
                          isSelected
                            ? 'bg-[#1A3D34] text-white shadow-sm'
                            : 'text-[#525955] hover:text-[#1B1E1D]'
                        }`}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>

                {/* Sleek Journey Route Visual */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E4DC] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    {/* Origin */}
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                      <div>
                        <span className="text-[10px] text-[#8C938F] uppercase font-bold block">Pickup Gate</span>
                        <span className="font-extrabold text-[#1B1E1D]">{activeCorridor.origin}</span>
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-2 text-right">
                      <div>
                        <span className="text-[10px] text-[#8C938F] uppercase font-bold block">Destination</span>
                        <span className="font-extrabold text-[#1B1E1D]">{activeCorridor.destination}</span>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-[#1A3D34] ring-4 ring-[#1A3D34]/10" />
                    </div>
                  </div>

                  {/* Route Meta & Solo Rate */}
                  <div className="pt-2.5 border-t border-[#E7E4DC] flex items-center justify-between text-xs text-[#6B726F]">
                    <span className="font-medium flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                      {activeCorridor.distance}
                    </span>
                    <span className="text-zinc-400 line-through">
                      Solo Cab: ₹{activeCorridor.soloFare}
                    </span>
                  </div>
                </div>
              </div>

              {/* Split Slider Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#525955]">Co-Riders in Pool:</span>
                  <span className="text-[#1A3D34] bg-[#EAF2EE] px-2.5 py-0.5 rounded-full">
                    {heroRiders} Students
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      onClick={() => handleRiderChange(count)}
                      className={`py-2 text-xs font-bold rounded-xl transition-all ${
                        heroRiders === count
                          ? 'bg-[#1A3D34] text-white shadow-sm scale-105'
                          : 'bg-[#F4F1EA] text-[#525955] hover:bg-[#E7E4DC]'
                      }`}
                    >
                      {count} {count === 1 ? 'Solo' : 'Riders'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Fare Split Receipt Box with CountUp */}
              <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-[#1A3D34] to-[#122A23] text-white shadow-inner">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-300 font-semibold tracking-wider uppercase">
                      YOUR PER-RIDER SHARE
                    </span>
                    <div className="text-4xl font-extrabold tracking-tight mt-1 text-white">
                      <CountUp from={prevFare} to={splitFare} prefix="₹" duration={500} />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[11px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                      {savingsPercent}% OFF SOLO
                    </span>
                    <div className="text-xs text-zinc-300 mt-1">
                      Save ₹{savings} / trip
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-emerald-900/40 text-[11px] text-zinc-300 flex items-center justify-between">
                  <span>Verified peer matching included</span>
                  <span className="text-emerald-300 font-semibold">1 Trolley boot space</span>
                </div>
              </div>

            </SpotlightCard>
          </div>

        </div>
      </section>

      {/* 4. Infinite Corridor Ticker */}
      <div className="w-full bg-[#1A3D34] text-white py-3 overflow-hidden border-y border-[#122A23]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2].map((group) => (
            <div key={group} className="flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-emerald-200">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                NST-RU GATE 1 ⇄ IGI AIRPORT T3 (₹350/RIDER)
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                MAIN GATE ⇄ NDLS RAILWAY STATION (₹225/RIDER)
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                CLOCKTOWER ⇄ CYBER CITY & MALL OF INDIA (₹113/RIDER)
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                HOSTEL 3 ⇄ BREAK SHUTTLE & ISBT (₹200/RIDER)
              </span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. The Problem: WhatsApp Chaos vs. FareShare AI */}
      <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#267256] bg-[#EAF2EE] px-3 py-1 rounded-full border border-[#D0E2D8]">
            01 • What's Broken
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1E1D] mt-3 tracking-tight">
            Campus travel coordination is broken.
          </h2>
          <p className="text-[#525955] text-sm sm:text-base mt-3">
            Students struggle to find trusted peers traveling the same route at the same time, ending up overpaying ₹1,000+ for solo rides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Left */}
          <SpotlightCard className="bg-white rounded-3xl p-8 border border-red-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Today: Scattered WhatsApp Groups
              </span>
              <X className="w-5 h-5 text-rose-500" />
            </div>

            <ul className="mt-6 space-y-4 text-sm text-[#525955]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                <span>Spamming 10+ hostel WhatsApp groups hoping someone is heading to the airport at the same hour.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                <span>Zero luggage coordination—finding out at the cab that 3 people brought 4 oversized suitcases with no boot space.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                <span>Unverified strangers and awkward payment chase-ups on Google Pay days after the ride.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                <span>Female students feeling uncomfortable joining unverified random co-riders.</span>
              </li>
            </ul>
          </SpotlightCard>

          {/* Card Right */}
          <SpotlightCard className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                With FareShare AI
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <ul className="mt-6 space-y-4 text-sm text-[#525955]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span><strong>Conversational Omnibox:</strong> Type in plain English—our AI instantly finds students on matching corridor schedules.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span><strong>Luggage Boot Guarantee:</strong> Pre-filtered for Medium (1 Trolley) or Heavy boot capacity so no one gets left behind.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span><strong>Girls-Only Safe Circles:</strong> One-tap verified female ride pooling with @nst-ru.edu.in authentication.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span><strong>Ephemeral Chat Drawer:</strong> Direct 4-hour settlement room that auto-purges student chats after the ride for privacy.</span>
              </li>
            </ul>
          </SpotlightCard>
        </div>
      </section>

      {/* 6. How It Works (3-Step Animated Process) */}
      <section id="how-it-works" className="py-16 bg-[#F4F1EA] border-y border-[#E7E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A3D34] bg-white px-3 py-1 rounded-full border border-[#E7E4DC]">
              02 • The 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1E1D] mt-3 tracking-tight">
              From hostel room to terminal in 3 clicks.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard className="bg-white rounded-3xl p-7 border border-[#E7E4DC] shadow-sm relative group hover:border-[#1A3D34] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2EE] text-[#1A3D34] flex items-center justify-center font-black text-lg mb-5">
                01
              </div>
              <h3 className="font-bold text-lg text-[#1B1E1D] mb-2">User opens it and...</h3>
              <p className="text-sm text-[#525955] leading-relaxed">
                Enters their destination, departure time, and luggage in natural plain English (e.g. <em>"Heading to IGI T3 this Friday at 4 PM"</em>).
              </p>
            </SpotlightCard>

            <SpotlightCard className="bg-white rounded-3xl p-7 border border-[#E7E4DC] shadow-sm relative group hover:border-[#1A3D34] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2EE] text-[#1A3D34] flex items-center justify-center font-black text-lg mb-5">
                02
              </div>
              <h3 className="font-bold text-lg text-[#1B1E1D] mb-2">The product...</h3>
              <p className="text-sm text-[#525955] leading-relaxed">
                Finds verified campus peers with similar routes, checks luggage fit, and displays estimated fare splits with transparent AI match rationales.
              </p>
            </SpotlightCard>

            <SpotlightCard className="bg-white rounded-3xl p-7 border border-[#E7E4DC] shadow-sm relative group hover:border-[#1A3D34] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2EE] text-[#1A3D34] flex items-center justify-center font-black text-lg mb-5">
                03
              </div>
              <h3 className="font-bold text-lg text-[#1B1E1D] mb-2">User walks away with...</h3>
              <p className="text-sm text-[#525955] leading-relaxed">
                A compatible travel partner, an instant shared cab, up to 75% savings, and a 4-hour settlement window to settle payments seamlessly.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* 7. Multi-Modal Transit Comparison Matrix */}
      <section id="multi-modal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#267256] bg-[#EAF2EE] px-3 py-1 rounded-full border border-[#D0E2D8]">
            03 • Why FareShare Wins
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1E1D] mt-3 tracking-tight">
            Door-to-door AC cab comfort at metro prices.
          </h2>
          <p className="text-[#525955] text-sm sm:text-base mt-3">
            Why drag suitcases through 2 metro lines when splitting a cab with 3 campus peers costs almost the same?
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E7E4DC] overflow-hidden shadow-soft-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF8F5] text-xs font-bold text-[#6B726F] uppercase border-b border-[#E7E4DC]">
                <tr>
                  <th className="py-4 px-6">Route / Corridor</th>
                  <th className="py-4 px-6">Solo Uber Go</th>
                  <th className="py-4 px-6">Solo Ola Mini</th>
                  <th className="py-4 px-6">Delhi Metro (DMRC)</th>
                  <th className="py-4 px-6 bg-[#EAF2EE] text-[#1A3D34] font-black">FareShare 4-Way Split</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE1] text-[#1B1E1D]">
                <tr className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-4 px-6 font-bold">
                    NST-RU ⇄ IGI Airport T3
                    <span className="block text-xs text-[#6B726F] font-normal">44 KM • ~65 mins</span>
                  </td>
                  <td className="py-4 px-6 text-[#525955]">₹1,400</td>
                  <td className="py-4 px-6 text-[#525955]">₹1,350</td>
                  <td className="py-4 px-6 text-[#525955]">
                    ₹60
                    <span className="block text-[11px] text-amber-700">80 mins • 2 line switches</span>
                  </td>
                  <td className="py-4 px-6 bg-[#EAF2EE]/60 font-black text-emerald-800 text-base">
                    ₹350 / rider
                    <span className="block text-[10px] font-bold text-emerald-600 uppercase">Save ₹1,050 (75%)</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-4 px-6 font-bold">
                    NST-RU ⇄ NDLS Railway
                    <span className="block text-xs text-[#6B726F] font-normal">31 KM • ~50 mins</span>
                  </td>
                  <td className="py-4 px-6 text-[#525955]">₹900</td>
                  <td className="py-4 px-6 text-[#525955]">₹880</td>
                  <td className="py-4 px-6 text-[#525955]">
                    ₹50
                    <span className="block text-[11px] text-amber-700">65 mins • Yellow line switch</span>
                  </td>
                  <td className="py-4 px-6 bg-[#EAF2EE]/60 font-black text-emerald-800 text-base">
                    ₹225 / rider
                    <span className="block text-[10px] font-bold text-emerald-600 uppercase">Save ₹675 (75%)</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-4 px-6 font-bold">
                    NST-RU ⇄ Cyber City / Mall
                    <span className="block text-xs text-[#6B726F] font-normal">14 KM • ~25 mins</span>
                  </td>
                  <td className="py-4 px-6 text-[#525955]">₹450</td>
                  <td className="py-4 px-6 text-[#525955]">₹430</td>
                  <td className="py-4 px-6 text-[#525955]">
                    ₹30
                    <span className="block text-[11px] text-amber-700">40 mins • Rapid connector</span>
                  </td>
                  <td className="py-4 px-6 bg-[#EAF2EE]/60 font-black text-emerald-800 text-base">
                    ₹113 / rider
                    <span className="block text-[10px] font-bold text-emerald-600 uppercase">Save ₹337 (75%)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. Team EnderMen Showcase (ONLY NAMES + COLORFUL AVATAR ICONS) */}
      <section id="team" className="py-16 bg-[#F4F1EA] border-y border-[#E7E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1A3D34] bg-white px-3 py-1 rounded-full border border-[#E7E4DC]">
              04 • Team EnderMen
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1E1D] mt-3 tracking-tight">
              The Creators
            </h2>
            <p className="text-[#525955] text-sm mt-2">
              Team EnderMen • coNStruCT 2.0
            </p>
          </div>

          {/* Clean minimalist cards displaying ONLY names with vibrant colored icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {teamList.map((member, i) => (
              <SpotlightCard 
                key={i} 
                className="bg-white rounded-3xl p-6 border border-[#E7E4DC] shadow-sm text-center flex flex-col items-center justify-center min-h-[140px] hover:border-[#1A3D34] hover:shadow-md transition-all hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${member.bg} flex items-center justify-center font-black text-base mb-3 shadow-md`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-extrabold text-base text-[#1B1E1D] tracking-tight">
                  {member.name}
                </h3>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Explore Live App / Prototype Showcase Section */}
      <section id="explore-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <SpotlightCard className="bg-gradient-to-br from-[#1A3D34] via-[#132E27] to-[#0D201B] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-emerald-900/40">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-6 backdrop-blur-sm border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE WORKING PROTOTYPE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Explore the Live Working Prototype
            </h2>

            <p className="text-emerald-100/85 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Step into the full FareShare dashboard. Switch student personas, search corridors with the Conversational Omnibox, simulate instant 4-way fare splits, and test the 4-hour ephemeral chat drawer.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-emerald-200 border border-white/10">
                ⚡ Conversational Omnibox
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-emerald-200 border border-white/10">
                🛡️ Verified @nst-ru.edu.in
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-pink-200 border border-pink-400/20">
                🌸 Girls-Only Safe Filter
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-emerald-200 border border-white/10">
                ⏳ 4h Ephemeral Chat
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-semibold text-emerald-200 border border-white/10">
                💳 Instant UPI Split
              </span>
            </div>

            {/* Big Launch Button */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onLaunchApp}
                className="group px-8 py-4 rounded-full bg-white text-[#1A3D34] hover:bg-emerald-50 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2.5 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Launch Explore Dashboard</span>
                <ArrowRight className="w-5 h-5 text-[#1A3D34] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* 10. Footer with Legal & Feedback Links */}
      <footer className="mt-auto bg-[#FAF8F5] border-t border-[#E7E4DC] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#6B726F]">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm text-[#1B1E1D]">FareShare</span>
            <span>•</span>
            <span>coNStruCT 2.0 Hackathon Edition</span>
            <span>•</span>
            <span>Team EnderMen</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-[#1A3D34] transition-colors"
            >
              Terms & Ride Conduct
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-[#1A3D34] transition-colors"
            >
              Privacy & Ephemeral Rules
            </button>
            <button
              onClick={() => setActiveModal('feedback')}
              className="hover:text-[#1A3D34] transition-colors flex items-center gap-1 text-emerald-800"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Give Feedback</span>
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Terms */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E4DC] shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#1B1E1D] mb-4">FareShare Campus Ride Guidelines</h3>
            <div className="space-y-4 text-xs text-[#525955] leading-relaxed">
              <p>
                <strong>1. Verified Students Only:</strong> Every rider and driver pool poster must possess a verified @nst-ru.edu.in email ID and valid student campus credentials.
              </p>
              <p>
                <strong>2. Punctuality:</strong> Be at the designated campus pickup gate at least 5 minutes prior to departure.
              </p>
              <p>
                <strong>3. Fair Fare Splitting:</strong> The calculated split amount must be settled via UPI within the 4-hour Ephemeral Grace Period.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-2.5 rounded-full bg-[#1A3D34] text-white text-xs font-bold"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Privacy */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E4DC] shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#1B1E1D] mb-4">Privacy & Ephemeral Chat Policy</h3>
            <div className="space-y-4 text-xs text-[#525955] leading-relaxed">
              <p>
                <strong>1. 4-Hour Auto-Purge:</strong> All coordination chat logs and route messages automatically expire and are purged 4 hours after trip completion.
              </p>
              <p>
                <strong>2. Phone Number Masking:</strong> Personal mobile numbers are never displayed publicly. Communication occurs strictly inside our Ephemeral Chat Drawer.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-2.5 rounded-full bg-[#1A3D34] text-white text-xs font-bold"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Feedback */}
      {activeModal === 'feedback' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E4DC] shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#1B1E1D] mb-2">Campus Feedback & Hub Request</h3>
            {feedbackSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-800 text-center font-bold text-sm">
                🎉 Thank you! Your feedback has been sent to Team EnderMen.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFeedbackSent(true);
                  setTimeout(() => {
                    setActiveModal(null);
                    setFeedbackSent(false);
                  }, 1800);
                }}
                className="space-y-4 text-xs"
              >
                <input
                  required
                  placeholder="Your Name & Hostel"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E4DC] bg-[#FAF8F5]"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Please add a route from NST-RU to Connaught Place..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E4DC] bg-[#FAF8F5]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#1A3D34] text-white text-xs font-bold"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
