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
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <span className={`inline-block relative overflow-hidden align-baseline ${className}`}>
      <span
        className={`inline-block transition-all duration-300 transform-gpu ${
          fadeState === 'in'
            ? 'translate-y-0 opacity-100 filter-none'
            : '-translate-y-4 opacity-0 blur-sm'
        }`}
      >
        {texts[index]}
      </span>
    </span>
  );
}
