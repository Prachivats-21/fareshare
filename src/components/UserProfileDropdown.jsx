import React, { useState, useRef, useEffect } from 'react';
import { 
  User, ChevronDown, Edit3, Compass, Receipt, ShieldCheck, 
  PhoneCall, X, Check, Star, MapPin, Calendar, Clock, ArrowUpRight
} from 'lucide-react';

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'trips' | 'transactions' | 'safety'
  const dropdownRef = useRef(null);

  // User state
  const [userProfile, setUserProfile] = useState({
    name: "Prachi Vats",
    email: "prachi.vats@nst-ru.edu.in",
    hostel: "Hostel 3 (Girls)",
    room: "Room 312",
    phone: "+91 98765 43210",
    rating: "5.00 ★",
    tripsCount: 14,
    totalSaved: "₹4,200",
    preference: "Quiet ride, 1 Trolley max"
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button in Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#E7E4DC] text-xs font-semibold text-[#1B1E1D] shadow-xs transition-all hover:border-[#1A3D34]"
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-[10px] shadow-xs">
            PV
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white absolute -bottom-0.5 -right-0.5" />
        </div>
        <span className="hidden sm:inline font-bold">Prachi Vats</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header Summary Card */}
          <div className="px-5 py-3 border-b border-[#F0ECE1]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-[#EAF2EE] px-2 py-0.5 rounded-full border border-[#D0E2D8] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Campus Verified
              </span>
              <span className="text-xs font-bold text-amber-600">{userProfile.rating}</span>
            </div>
            
            <div className="font-extrabold text-base text-[#1B1E1D] mt-2">
              {userProfile.name}
            </div>
            <div className="text-xs text-[#6B726F]">
              {userProfile.email}
            </div>
            <div className="text-[11px] text-[#525955] mt-1 font-medium">
              {userProfile.hostel} • {userProfile.room}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-[#F0ECE1] text-center">
              <div className="bg-[#FAF8F5] p-1.5 rounded-xl border border-[#E7E4DC]">
                <span className="text-[10px] text-[#8C938F] uppercase font-bold">Trips Done</span>
                <div className="text-sm font-extrabold text-[#1B1E1D]">{userProfile.tripsCount}</div>
              </div>
              <div className="bg-[#FAF8F5] p-1.5 rounded-xl border border-[#E7E4DC]">
                <span className="text-[10px] text-[#8C938F] uppercase font-bold">Total Saved</span>
                <div className="text-sm font-extrabold text-emerald-700">{userProfile.totalSaved}</div>
              </div>
            </div>
          </div>

          {/* Sub-Category Action Items */}
          <div className="px-2 py-2 space-y-1 text-xs font-semibold text-[#525955]">
            <button
              onClick={() => {
                setActiveModal('edit');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-[#FAF8F5] hover:text-[#1B1E1D] transition-colors text-left"
            >
              <Edit3 className="w-4 h-4 text-emerald-700" />
              <span>Edit Profile & Preferences</span>
            </button>

            <button
              onClick={() => {
                setActiveModal('trips');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-[#FAF8F5] hover:text-[#1B1E1D] transition-colors text-left"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Trips So Far (14 Completed)</span>
            </button>

            <button
              onClick={() => {
                setActiveModal('transactions');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-[#FAF8F5] hover:text-[#1B1E1D] transition-colors text-left"
            >
              <Receipt className="w-4 h-4 text-amber-600" />
              <span>Transaction & UPI History</span>
            </button>

            <button
              onClick={() => {
                setActiveModal('safety');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-[#FAF8F5] hover:text-[#1B1E1D] transition-colors text-left"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>Campus SOS & Safety Circles</span>
            </button>
          </div>

        </div>
      )}

      {/* MODAL 1: Edit Profile */}
      {activeModal === 'edit' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E7E4DC] shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#EAF2EE] text-[#1A3D34] flex items-center justify-center font-bold">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#1B1E1D]">Edit Student Profile</h3>
                <span className="text-[11px] text-[#6B726F]">Update campus details & ride preferences</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveModal(null);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-[10px] font-bold text-[#1B1E1D] uppercase">Full Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#1B1E1D] uppercase">Hostel & Room</label>
                <input
                  type="text"
                  value={`${userProfile.hostel}, ${userProfile.room}`}
                  onChange={(e) => setUserProfile({ ...userProfile, hostel: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#1B1E1D] uppercase">Phone (Masked in Ephemeral Chat)</label>
                <input
                  type="text"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#1B1E1D] uppercase">Ride Preferences</label>
                <input
                  type="text"
                  value={userProfile.preference}
                  onChange={(e) => setUserProfile({ ...userProfile, preference: e.target.value })}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F5] focus:outline-none focus:border-[#1A3D34]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#1A3D34] hover:bg-[#132E27] text-white font-bold transition-all shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Trips So Far */}
      {activeModal === 'trips' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E4DC] shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#1B1E1D] mb-1">Your Trips So Far</h3>
            <p className="text-xs text-[#6B726F] mb-5">
              14 completed campus pools • Total saved: <strong className="text-emerald-700">₹4,200</strong>
            </p>

            <div className="space-y-3">
              {[
                {
                  route: "Campus Gate 1 ➔ IGI Airport Terminal 3",
                  date: "Nov 08, 2026 • 4:15 PM",
                  coRiders: "Kaashvi S., Swapnil P., Driver",
                  farePaid: "₹350",
                  saved: "₹1,050",
                  status: "Completed"
                },
                {
                  route: "Main Campus Gate ➔ NDLS Railway Station",
                  date: "Nov 01, 2026 • 5:00 PM",
                  coRiders: "Ashwin A., Akshat K., 1 other",
                  farePaid: "₹225",
                  saved: "₹675",
                  status: "Completed"
                },
                {
                  route: "Hostel 3 Gate ➔ Cyber City / Mall of India",
                  date: "Oct 26, 2026 • 2:30 PM",
                  coRiders: "Kaashvi Saini, 2 others",
                  farePaid: "₹113",
                  saved: "₹337",
                  status: "Completed"
                }
              ].map((trip, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E4DC] text-xs">
                  <div className="flex items-center justify-between font-extrabold text-[#1B1E1D]">
                    <span>{trip.route}</span>
                    <span className="text-emerald-800 bg-[#EAF2EE] px-2 py-0.5 rounded-full text-[10px]">
                      {trip.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B726F] mt-1 flex items-center justify-between">
                    <span>{trip.date}</span>
                    <span className="font-semibold text-[#1A3D34]">You Paid: {trip.farePaid}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#E7E4DC] text-[11px] text-[#525955] flex justify-between">
                    <span>With: {trip.coRiders}</span>
                    <span className="text-emerald-700 font-bold">Saved {trip.saved}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Transaction History */}
      {activeModal === 'transactions' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#E7E4DC] shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#1B1E1D] mb-1">Transaction & UPI History</h3>
            <p className="text-xs text-[#6B726F] mb-5">
              Verified UPI splits settled during 4-hour Ephemeral Grace Periods.
            </p>

            <div className="space-y-3">
              {[
                {
                  desc: "IGI Airport T3 4-Way Cab Split",
                  ref: "UPI/3194829182/OKAXIS",
                  date: "08 Nov, 4:45 PM",
                  amount: "- ₹350",
                  type: "debit",
                  method: "Google Pay"
                },
                {
                  desc: "NDLS Train Connect Peer Split (from Akshat)",
                  ref: "UPI/3189201923/PAYTM",
                  date: "01 Nov, 5:40 PM",
                  amount: "+ ₹225",
                  type: "credit",
                  method: "PhonePe"
                },
                {
                  desc: "Cyber City Weekend Mall Split",
                  ref: "UPI/3180291029/OKHDFCBANK",
                  date: "26 Oct, 3:15 PM",
                  amount: "- ₹113",
                  type: "debit",
                  method: "UPI Direct"
                }
              ].map((tx, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E4DC] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#1B1E1D]">{tx.desc}</div>
                    <div className="text-[10px] text-[#8C938F] font-mono mt-0.5">{tx.ref} • {tx.method}</div>
                    <div className="text-[10px] text-[#6B726F] mt-0.5">{tx.date}</div>
                  </div>
                  <div className={`font-black text-sm ${tx.type === 'credit' ? 'text-emerald-700' : 'text-[#1B1E1D]'}`}>
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Safety & SOS */}
      {activeModal === 'safety' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E7E4DC] shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#1B1E1D] mb-2">Campus SOS & Safety Support</h3>
            <p className="text-xs text-[#6B726F] mb-4">
              Direct emergency helplines for Campus students while traveling.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                <div className="font-bold text-rose-900">Campus Campus Security Main Desk</div>
                <div className="text-rose-700 font-mono mt-0.5">+91 11 2670 9999 (24/7 Gate Patrol)</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-pink-50 border border-pink-200">
                <div className="font-bold text-pink-900">Women Student Safety Cell & Hostel Patrol</div>
                <div className="text-pink-700 font-mono mt-0.5">+91 99999 11211 (Dedicated Warden Line)</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="font-bold text-emerald-900">Delhi Police Women Helpline</div>
                <div className="text-emerald-700 font-mono mt-0.5">Dial 1091 or 112</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
