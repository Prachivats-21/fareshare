import React, { useState, useEffect } from 'react';

export default function SplitFlapText({
  text = '',
  className = '',
  charClassName = ''
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (text !== displayText) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayText(text);
        setIsFlipping(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [text, displayText]);

  return (
    <span className={`inline-flex items-center gap-0.5 perspective-[500px] ${className}`}>
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block px-1 py-0.5 rounded bg-[#1B1E1D] text-emerald-300 font-mono text-xs font-bold shadow-sm transition-all duration-300 transform-gpu ${
            isFlipping ? 'rotate-x-90 opacity-40 scale-95' : 'rotate-x-0 opacity-100 scale-100'
          } ${charClassName}`}
          style={{
            transitionDelay: `${index * 25}ms`,
            transformOrigin: '50% 50%'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
