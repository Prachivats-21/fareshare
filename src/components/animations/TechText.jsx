import React, { useState, useEffect } from 'react';

const GLYPHS = '01#$X_//[]<>{}*+=~ABCDEF';

export default function TechText({
  text = '',
  className = '',
  scrambleSpeed = 40,
  revealDelay = 80
}) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval = null;
    let iteration = 0;
    const target = text.toUpperCase();

    interval = setInterval(() => {
      setDisplayText(
        target
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '.' || char === '\n') return char;
            if (index < iteration) {
              return target[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, isHovered, scrambleSpeed]);

  return (
    <span
      onMouseEnter={() => setIsHovered(!isHovered)}
      className={`font-black uppercase tracking-tight cursor-default transition-colors ${className}`}
    >
      {displayText || text.toUpperCase()}
    </span>
  );
}
