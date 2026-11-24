import React, { useState } from 'react';
import { PickleProduct } from '../../types';

interface PickleJarVisualProps {
  product: PickleProduct;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'scroll';
  isLidOpen?: boolean;
  lidOffset?: number; // Y offset in pixels
  lidRotation?: number; // rotation in degrees
  showAroma?: boolean;
  className?: string;
}

export const PickleJarVisual: React.FC<PickleJarVisualProps> = ({
  product,
  size = 'md',
  isLidOpen = false,
  lidOffset = 0,
  lidRotation = 0,
  showAroma = false,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  // Dimensions based on size
  const dimensions = {
    sm: { width: 140, height: 180 },
    md: { width: 220, height: 280 },
    lg: { width: 290, height: 380 },
    hero: { width: 340, height: 440 },
    scroll: { width: 360, height: 460 },
  }[size];

  const actualLidY = isLidOpen ? -36 - lidOffset : -lidOffset;
  const actualLidRotate = isLidOpen ? -7 + lidRotation : lidRotation;

  const imageSrc = product.image || `/jars/${product.slug}.jpg`;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Subtle Aroma Steam & Floating Spice Sparkles */}
      {showAroma && (
        <div className="absolute -top-14 inset-x-0 flex justify-center items-center pointer-events-none z-30">
          <svg width="180" height="90" viewBox="0 0 180 90" fill="none" className="opacity-80 animate-pulse">
            <path
              d="M50 80 Q65 50 50 30 Q35 10 55 0"
              stroke={product.accentColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 6"
              className="animate-float"
            />
            <path
              d="M90 85 Q110 55 95 35 Q80 15 100 0"
              stroke="#E6B94D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="5 7"
              className="animate-float-delayed"
            />
            <path
              d="M130 80 Q115 50 130 30 Q145 10 125 0"
              stroke={product.accentColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 6"
              className="animate-float-reverse"
            />
          </svg>
        </div>
      )}

      {/* Real Commercial Food Photography Glass Jar */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <img
            src={imgFailed ? '/jars/beef-pickle.jpg' : imageSrc}
            alt={product.name}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(48,35,29,0.22)] transition-transform duration-500 hover:scale-105"
            style={{
              mixBlendMode: 'multiply',
            }}
          />

          {/* Interactive Animated Lid Twist & Lift */}
          {isLidOpen && (
            <div
              className="absolute top-[3%] inset-x-0 flex justify-center pointer-events-none transition-transform duration-500 ease-out z-20"
              style={{
                transform: `translateY(${actualLidY}px) rotate(${actualLidRotate}deg)`,
              }}
            >
              <svg
                width={dimensions.width * 0.58}
                height={dimensions.height * 0.16}
                viewBox="0 0 160 48"
                fill="none"
                className="drop-shadow-lg"
              >
                <defs>
                  <linearGradient id={`gold-lid-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C89D3A" />
                    <stop offset="25%" stopColor="#F5D77F" />
                    <stop offset="50%" stopColor="#A87A1E" />
                    <stop offset="75%" stopColor="#FDE9AA" />
                    <stop offset="100%" stopColor="#875F10" />
                  </linearGradient>
                </defs>
                {/* Lid Side */}
                <rect
                  x="8"
                  y="14"
                  width="144"
                  height="28"
                  rx="5"
                  fill={`url(#gold-lid-${product.id})`}
                  stroke="#30231D"
                  strokeWidth="2.5"
                />
                {/* Grip Ribs */}
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1={18 + i * 11}
                    y1="18"
                    x2={18 + i * 11}
                    y2="38"
                    stroke="#875F10"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ))}
                {/* Lid Top Chamfer */}
                <ellipse cx="80" cy="14" rx="72" ry="10" fill="#FFEA9F" stroke="#30231D" strokeWidth="2.5" />
                {/* Center Stamp */}
                <text
                  x="80"
                  y="17"
                  textAnchor="middle"
                  fontSize="7"
                  fontWeight="400"
                  fontFamily="'Bagel Fat One', cursive, sans-serif"
                  fill="#30231D"
                  letterSpacing="0.5"
                >
                  SHE PICKLE
                </text>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
