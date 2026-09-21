import React, { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 8,
  characters = '01#@%&*!_+~^<>[]{}',
  className = '',
  parentClassName = '',
  animateOn = 'view',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const runDecryption = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          if (interval) clearInterval(interval);
        }
        iteration += 1 / (maxIterations / 2);
      }, speed);
    };

    if (animateOn === 'view' && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      runDecryption();
    } else if (animateOn === 'hover' && isHovered) {
      iteration = 0;
      runDecryption();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [text, speed, maxIterations, characters, animateOn, isHovered]);

  return (
    <span
      className={`inline-block select-none ${parentClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={text}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
};
