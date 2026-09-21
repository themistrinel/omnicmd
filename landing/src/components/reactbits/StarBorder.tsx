import React from 'react';

interface StarBorderProps<T extends React.ElementType = 'button'> {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  innerClassName?: string;
}

export const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#38bdf8',
  speed = '4s',
  thickness = 1,
  backgroundColor = 'rgba(10, 13, 20, 0.95)',
  textColor = '#ffffff',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  innerClassName = '',
  children,
  ...rest
}: StarBorderProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-xl p-[1px] select-none group ${className}`}
      {...rest}
    >
      {/* Moving gradient star borders */}
      <div
        className="absolute w-[300%] h-[50%] opacity-80 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-80 top-[-10px] left-[-250%] rounded-full animate-star-movement-top pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />

      {/* Internal Content Container */}
      <div
        className={`relative z-10 w-full h-full rounded-[11px] border transition-all duration-200 ${innerClassName}`}
        style={{
          background: backgroundColor,
          color: textColor,
          borderColor,
        }}
      >
        {children}
      </div>
    </Component>
  );
};
