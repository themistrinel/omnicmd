import React from 'react';

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: string;
  color?: string;
  shineColor?: string;
  disabled?: boolean;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = '',
  speed = '3.5s',
  color = '#94a3b8',
  shineColor = '#38bdf8',
  disabled = false,
}) => {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-block font-inherit bg-clip-text text-transparent animate-shine ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% 100%',
        animationDuration: speed,
      }}
    >
      {text}
    </span>
  );
};
