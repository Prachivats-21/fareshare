import React, { useEffect, useState } from 'react';

export default function BlurText({
  text = '',
  delay = 120,
  className = '',
  animateBy = 'words', // 'words' | 'letters'
}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInView(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`inline-block ${className}`}>
      {elements.map((el, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700 ease-[cubic-bezier(0.2,0.65,0.3,0.9)]"
          style={{
            transitionDelay: `${i * delay}ms`,
            filter: inView ? 'blur(0px)' : 'blur(12px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0px)' : 'translateY(16px)',
            marginRight: animateBy === 'words' ? '0.28em' : '0'
          }}
        >
          {el === ' ' ? '\u00A0' : el}
        </span>
      ))}
    </span>
  );
}
