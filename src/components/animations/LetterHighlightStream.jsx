import React, { useState, useEffect } from 'react';

export default function LetterHighlightStream({
  lines = [
    "SPLIT FARES. SAVE MONEY.",
    "TRAVEL SAFE ON CAMPUS."
  ],
  charSpeedMs = 50,
  holdAtEndMs = 1500,
  className = ""
}) {
  // Flatten characters across all lines to create a continuous stream
  const fullText = lines.join(' ');
  const totalChars = fullText.length;
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  useEffect(() => {
    let timer = null;

    if (activeCharIndex < totalChars) {
      timer = setTimeout(() => {
        setActiveCharIndex((prev) => prev + 1);
      }, charSpeedMs);
    } else {
      // Reached the end, hold like a video, then loop back
      timer = setTimeout(() => {
        setActiveCharIndex(0);
      }, holdAtEndMs);
    }

    return () => clearTimeout(timer);
  }, [activeCharIndex, totalChars, charSpeedMs, holdAtEndMs]);

  // Map each line's characters to global character index
  let charCounter = 0;

  return (
    <div className={`space-y-1 select-none font-sans ${className}`}>
      {lines.map((line, lineIdx) => {
        const lineChars = line.split('');
        const lineStartIndex = charCounter;
        charCounter += lineChars.length + 1; // +1 for space between lines

        return (
          <div key={lineIdx} className="block leading-[1.08] tracking-tight">
            {lineChars.map((char, charIdx) => {
              const globalIndex = lineStartIndex + charIdx;
              const isPast = globalIndex < activeCharIndex;
              const isCurrent = globalIndex === activeCharIndex;

              return (
                <span
                  key={charIdx}
                  className={`inline-block transition-all duration-150 transform-gpu ${
                    isCurrent
                      ? 'text-emerald-600 scale-[1.12] -translate-y-0.5 font-black drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]'
                      : isPast
                      ? lineIdx === 0
                        ? 'text-[#1B1E1D] font-black'
                        : 'text-[#1A3D34] font-black'
                      : 'text-[#C5BFB5] font-extrabold opacity-40'
                  }`}
                  style={{
                    textShadow: isCurrent 
                      ? '0 0 14px rgba(16, 185, 129, 0.6)' 
                      : isPast 
                      ? 'none' 
                      : 'none'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
