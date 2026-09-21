import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  separator?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  delay = 0,
  prefix = '',
  suffix = '',
  className = '',
  separator = ',',
}) => {
  const [value, setValue] = useState<number>(from);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  const formatNumber = useCallback(
    (num: number): string => {
      const fixed = num.toFixed(decimals);
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
    },
    [decimals, separator]
  );

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;

          const startTime = performance.now() + delay * 1000;
          const totalDuration = duration * 1000;

          const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

          const updateCounter = (currentTime: number) => {
            if (currentTime < startTime) {
              requestAnimationFrame(updateCounter);
              return;
            }

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentVal = from + (to - from) * easedProgress;

            setValue(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setValue(to);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [from, to, duration, delay]);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}
      {formatNumber(value)}
      {suffix}
    </span>
  );
};
