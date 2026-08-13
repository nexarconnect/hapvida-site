import React, { useEffect, useRef, useState } from 'react';

export default function CountUpNumber({ value = 0, duration = 1400 }) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    
    // Extrai número com segurança
    const numericValue = parseFloat(
      String(value).replace(/[^\d.]/g, '') || '0'
    );
    
    const isDecimal = String(value).includes('.');

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;

      setDisplayValue(
        isDecimal ? current.toFixed(1) : Math.floor(current)
      );

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    frame = requestAnimationFrame(update);

    // rAF pauses on backgrounded/hidden tabs (and some prerender/crawler
    // contexts never advance frames at all), which left this stuck mid-count.
    // Force the final value once duration has elapsed regardless of frames.
    const fallback = setTimeout(() => setDisplayValue(value), duration + 100);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(fallback);
    };
  }, [value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}