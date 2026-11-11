import React, { useEffect, useRef, useState } from 'react';

export default function TrueFocus({
  sentence = 'SPLIT FARES. SAVE MONEY. TRAVEL SAFE ON CAMPUS.',
  manualMode = false,
  blurAmount = 3,
  borderColor = '#267256',
  glowColor = 'rgba(38, 114, 86, 0.35)',
  animationDuration = 1.3,
  pauseBetweenAnimations = 0.5,
  className = ''
}) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Auto cycling
  useEffect(() => {
    if (manualMode || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, isHovered, words.length, animationDuration, pauseBetweenAnimations]);

  // Update focus rectangle
  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex flex-wrap items-center gap-x-3 gap-y-2 select-none ${className}`}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gliding Focus Frame / Highlight Box */}
      <div
        className="pointer-events-none absolute rounded-xl transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          transform: `translate3d(${focusRect.x - 6}px, ${focusRect.y - 4}px, 0)`,
          width: `${focusRect.width + 12}px`,
          height: `${focusRect.height + 8}px`,
          border: `2px solid ${borderColor}`,
          backgroundColor: 'rgba(38, 114, 86, 0.08)',
          boxShadow: `0 0 20px ${glowColor}, inset 0 0 10px ${glowColor}`
        }}
      >
        {/* Futuristic corner brackets */}
        <span
          className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 rounded-tl-sm"
          style={{ borderColor }}
        />
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 rounded-tr-sm"
          style={{ borderColor }}
        />
        <span
          className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 rounded-bl-sm"
          style={{ borderColor }}
        />
        <span
          className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 rounded-br-sm"
          style={{ borderColor }}
        />
      </div>

      {/* Words List */}
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            onMouseEnter={() => {
              setIsHovered(true);
              setCurrentIndex(index);
            }}
            className="cursor-pointer transition-all duration-300 transform-gpu font-black tracking-tight"
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.42,
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
              color: isActive ? '#1A3D34' : '#1B1E1D'
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
