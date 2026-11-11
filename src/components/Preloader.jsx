import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    // Elliot Eriksson inspired pacing & easing
    const startTime = Date.now();
    const duration = 2000; // 2.0s clean progression

    const update = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Smooth cubic-bezier(0.19, 1, 0.22, 1) style easing
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const val = Math.floor(eased * 100);
      setProgress(val);

      if (t < 1) {
        requestAnimationFrame(update);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsWiping(true);
          setTimeout(() => {
            onComplete();
          }, 850); // curtain wipe transition duration
        }, 200);
      }
    };

    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  const handleSkip = () => {
    setIsWiping(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-[#0C0C0C] text-[#FAF8F5] select-none flex flex-col justify-between p-6 sm:p-12 lg:p-16 transition-all cursor-pointer"
      style={{
        clipPath: isWiping ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)',
        transition: 'clip-path 0.85s cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'clip-path'
      }}
    >
      {/* Top Bar: Editorial Branding */}
      <div className="flex items-center justify-between text-xs tracking-wider uppercase text-zinc-400 font-medium">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-bold tracking-widest">CAMPUS RIDE POOLING • ALL COLLEGES</span>
        </div>
        <div className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-[11px]">
          [ TAP ANYWHERE TO SKIP ]
        </div>
      </div>

      {/* Center Hero: Elliot Eriksson style signature horizontal line grid */}
      <div className="my-auto w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline border-b border-zinc-800 pb-6">
          <div className="md:col-span-5 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white">
            FareShare
          </div>
          <div className="md:col-span-4 text-xs sm:text-sm text-zinc-400 tracking-wide uppercase font-semibold">
            Campus AI Ride-Pooling<br />
            <span className="text-zinc-600 font-normal">coNStruCT 2.0 Hackathon</span>
          </div>
          <div className="md:col-span-3 text-right text-xs sm:text-sm font-mono text-zinc-400">
            Delhi-NCR, IN<br />
            <span className="text-emerald-400">@nst-ru.edu.in</span>
          </div>
        </div>

        {/* Minimal Progress Bar (Hairline with Neon Emerald Fill) */}
        <div className="space-y-3">
          <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex items-baseline justify-between text-xs font-mono text-zinc-500">
            <span>INDEXING CORRIDORS: IGI AIRPORT • NDLS • CYBER CITY • ISBT</span>
            <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
        <span>Team EnderMen</span>
        <span>© 2026 FareShare Mobility</span>
      </div>
    </div>
  );
}
