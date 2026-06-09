import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function CountUpNumber({ value = 0, duration = 1400 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

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
    
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}