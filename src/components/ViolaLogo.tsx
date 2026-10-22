import React from 'react';

interface ViolaLogoProps {
  variant?: 'header' | 'card' | 'footer';
  size?: 'sm' | 'md' | 'lg';
}

export const ViolaLogo: React.FC<ViolaLogoProps> = ({
  variant = 'header',
  size = 'md',
}) => {
  const isFooter = variant === 'footer';
  const isLarge = size === 'lg';

  const strokeColor = isFooter ? '#E6C37A' : '#8A5A1E';
  const flameColor = isFooter ? '#F5D48E' : '#B47B2A';
  const textColor = isFooter ? '#F7EFE2' : '#1E1610';
  const subColor = isFooter ? '#D7B982' : '#7A4E1A';

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${
        isLarge ? 'gap-2' : 'gap-0.5'
      }`}
    >
      <svg
        viewBox="0 0 120 78"
        className={
          isLarge
            ? 'w-28 h-20'
            : variant === 'footer'
            ? 'w-14 h-10'
            : 'w-12 h-8'
        }
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer left & right petals */}
        <path
          d="M60 68 C36 68, 16 56, 10 42 C24 41, 40 49, 60 68 Z"
          stroke={strokeColor}
          strokeWidth="2.2"
          fill={isFooter ? 'rgba(230,195,122,0.08)' : 'rgba(138,90,30,0.07)'}
        />
        <path
          d="M60 68 C84 68, 104 56, 110 42 C96 41, 80 49, 60 68 Z"
          stroke={strokeColor}
          strokeWidth="2.2"
          fill={isFooter ? 'rgba(230,195,122,0.08)' : 'rgba(138,90,30,0.07)'}
        />
        {/* Mid left & right petals */}
        <path
          d="M60 68 C40 60, 24 41, 24 22 C38 26, 50 42, 60 68 Z"
          stroke={strokeColor}
          strokeWidth="2.2"
          fill={isFooter ? 'rgba(230,195,122,0.12)' : 'rgba(138,90,30,0.10)'}
        />
        <path
          d="M60 68 C80 60, 96 41, 96 22 C82 26, 70 42, 60 68 Z"
          stroke={strokeColor}
          strokeWidth="2.2"
          fill={isFooter ? 'rgba(230,195,122,0.12)' : 'rgba(138,90,30,0.10)'}
        />
        {/* Center sacred lotus arch */}
        <path
          d="M60 68 C44 50, 42 24, 60 6 C78 24, 76 50, 60 68 Z"
          stroke={strokeColor}
          strokeWidth="2.4"
          fill={isFooter ? 'rgba(230,195,122,0.16)' : 'rgba(180,123,42,0.12)'}
        />
        {/* Candle Pillar inside lotus */}
        <rect
          x="54"
          y="34"
          width="12"
          height="32"
          rx="2"
          fill={flameColor}
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        {/* Melted wax drip detail */}
        <path
          d="M54 36 Q57 42 59 37 Q62 43 66 36"
          stroke={isFooter ? '#2B2118' : '#FFFDF9'}
          strokeWidth="1.6"
          fill="none"
        />
        {/* Candle Flame */}
        <path
          d="M60 15 C64 22, 64 29, 60 32 C56 29, 56 22, 60 15 Z"
          fill={flameColor}
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      </svg>
      <div className="text-center leading-none">
        <span
          className={`font-serif-display font-bold tracking-tight block ${
            isLarge ? 'text-4xl' : 'text-xl'
          }`}
          style={{ color: textColor }}
        >
          Viola
        </span>
        <span
          className={`font-semibold tracking-[0.18em] uppercase block ${
            isLarge ? 'text-xs mt-1' : 'text-[9px] mt-0.5'
          }`}
          style={{ color: subColor }}
        >
          HAND MADE LUXOR
        </span>
      </div>
    </div>
  );
};
