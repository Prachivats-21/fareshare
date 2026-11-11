import React, { useState, useEffect } from 'react';

export default function RotatingText({
  texts = [],
  interval = 2600,
  className = ''
}) {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in'); // 'in' | 'out'

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFadeState('in');
      }, 250);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <span className={`inline align-baseline ${className}`}>
      <span
        className={`inline transition-opacity duration-250 ${
          fadeState === 'in' ? 'opacity-100' : 'opacity-20'
        }`}
      >
        {texts[index]}
      </span>
    </span>
  );
}
