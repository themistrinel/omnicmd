import React from 'react';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
  duration?: string;
  gap?: string;
  className?: string;
  children: React.ReactNode;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = true,
  reverse = false,
  applyMask = true,
  duration = '24s',
  gap = '20px',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`group/marquee relative flex overflow-hidden select-none ${
        vertical ? 'flex-col h-full' : 'flex-row w-full'
      } ${className}`}
      style={
        {
          '--duration': duration,
          '--gap': gap,
        } as React.CSSProperties
      }
      {...props}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={`marquee-track-${index}`}
          className={`flex shrink-0 items-center justify-around [gap:var(--gap)] ${
            vertical
              ? 'flex-col marquee-vertical'
              : 'flex-row marquee-horizontal'
          } ${pauseOnHover ? 'group-hover/marquee:[animation-play-state:paused]' : ''}`}
          style={reverse ? { animationDirection: 'reverse' } : undefined}
        >
          {children}
        </div>
      ))}

      {applyMask && (
        <>
          {vertical ? (
            <>
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#08090d] to-transparent z-10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#08090d] to-transparent z-10"
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#08090d] to-transparent z-10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#08090d] to-transparent z-10"
                aria-hidden="true"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
