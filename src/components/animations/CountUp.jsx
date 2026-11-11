import React, { useState, useEffect } from 'react';

export default function CountUp({
  to = 0,
  from = 0,
  duration = 800,
  prefix = '',
  suffix = '',
  className = ''
}) {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    let startTime = null;
    let animId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // ease-out expo
      const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.round(from + (to - from) * easeVal);
      setCurrent(val);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [to, from, duration]);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{current.toLocaleString()}{suffix}
    </span>
  );
}
