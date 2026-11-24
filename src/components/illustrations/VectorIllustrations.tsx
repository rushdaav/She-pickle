import React from 'react';

interface IllustrationProps {
  className?: string;
  size?: number;
}

// Hand-drawn Red Chilli (DUNKLY style: organic, slightly imperfect stroke, rich tones)
export const ChilliIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Green stem */}
    <path
      d="M62 18 C58 10 50 8 44 9 C43 14 47 18 51 22"
      stroke="#536B35"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M48 20 C42 22 36 21 34 26 C38 28 44 26 52 23"
      fill="#536B35"
    />
    {/* Chilli body */}
    <path
      d="M52 22 C62 30 72 46 68 64 C64 80 46 88 36 92 C34 93 32 91 33 89 C38 78 40 68 39 52 C38 38 42 28 52 22 Z"
      fill="#B52A24"
      stroke="#30231D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Body highlight */}
    <path
      d="M50 34 C56 42 58 54 54 68"
      stroke="#E2584A"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Small spice dots */}
    <circle cx="48" cy="50" r="1.5" fill="#FFF5E8" opacity="0.6" />
    <circle cx="44" cy="62" r="1.5" fill="#FFF5E8" opacity="0.6" />
  </svg>
);

// Hand-drawn Mango slice
export const MangoIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Mango leaf */}
    <path
      d="M32 26 C28 14 40 10 46 16 C48 22 42 28 32 26 Z"
      fill="#536B35"
      stroke="#30231D"
      strokeWidth="3"
    />
    {/* Mango fruit body */}
    <path
      d="M36 26 C52 18 78 26 82 48 C86 70 70 88 52 86 C32 84 20 66 22 46 C24 34 28 28 36 26 Z"
      fill="#E6B94D"
      stroke="#30231D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Golden blush & shadow */}
    <path
      d="M60 32 C74 44 76 64 66 78"
      stroke="#C98A19"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Light highlight */}
    <path
      d="M34 40 C34 52 40 68 50 76"
      stroke="#FFF5E8"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

// Hand-drawn Lemon slice
export const LemonIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Lemon rind */}
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="#E6B94D"
      stroke="#30231D"
      strokeWidth="3.5"
    />
    {/* White pith circle */}
    <circle cx="50" cy="50" r="33" fill="#FFF5E8" />
    {/* Inner pulp background */}
    <circle cx="50" cy="50" r="28" fill="#F8C946" stroke="#30231D" strokeWidth="2" />
    {/* Citrus segments */}
    <path d="M50 50 L50 24 M50 50 L72 34 M50 50 L72 66 M50 50 L50 76 M50 50 L28 66 M50 50 L28 34" stroke="#FFF5E8" strokeWidth="2.5" />
    {/* Lemon seed */}
    <ellipse cx="58" cy="42" rx="3" ry="5" transform="rotate(25 58 42)" fill="#30231D" />
  </svg>
);

// Hand-drawn Prawn
export const PrawnIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Prawn curved body */}
    <path
      d="M72 26 C84 38 82 58 70 70 C58 82 38 82 26 72 C18 64 20 54 28 52 C38 50 44 58 52 58 C62 58 68 48 64 36 C62 30 66 24 72 26 Z"
      fill="#D14836"
      stroke="#30231D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Segments */}
    <path d="M60 42 C66 48 62 56 56 56" stroke="#30231D" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M50 58 C52 68 46 74 38 72" stroke="#30231D" strokeWidth="2.5" strokeLinecap="round" />
    {/* Tail fan */}
    <path
      d="M26 72 C20 78 14 82 10 78 C12 72 18 68 22 66"
      fill="#B52A24"
      stroke="#30231D"
      strokeWidth="3"
    />
    {/* Eye */}
    <circle cx="70" cy="30" r="2.5" fill="#30231D" />
    {/* Antennae */}
    <path d="M72 26 C76 18 84 14 90 12" stroke="#30231D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Date Fruit
export const DateIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M32 30 C38 18 62 18 68 30 C76 44 74 68 64 80 C54 90 42 88 34 78 C24 64 24 44 32 30 Z"
      fill="#4E2A1C"
      stroke="#30231D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Creases & natural wrinkles */}
    <path d="M42 34 C44 48 40 64 44 76" stroke="#2E140C" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M56 36 C58 50 54 66 56 74" stroke="#2E140C" strokeWidth="2" strokeLinecap="round" />
    {/* Highlight shine */}
    <path d="M36 38 C34 48 36 60 40 68" stroke="#8A4A32" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// Hand-drawn Chicken piece / drumette
export const ChickenIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Bone */}
    <path d="M30 68 L16 82 M14 80 C11 78 8 82 10 86 C12 88 16 88 18 84" stroke="#FFF5E8" strokeWidth="5" strokeLinecap="round" />
    <path d="M30 68 L16 82" stroke="#30231D" strokeWidth="3" strokeLinecap="round" />
    {/* Meat drumette */}
    <path
      d="M32 66 C24 54 28 36 42 26 C58 14 78 22 84 38 C90 54 78 72 62 76 C46 80 36 74 32 66 Z"
      fill="#C45728"
      stroke="#30231D"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Roasted golden spice crust */}
    <path d="M48 32 C60 30 72 38 74 50" stroke="#E6B94D" strokeWidth="3" strokeLinecap="round" />
    <circle cx="56" cy="46" r="2" fill="#30231D" opacity="0.6" />
    <circle cx="66" cy="58" r="2" fill="#30231D" opacity="0.6" />
  </svg>
);

// Hand-drawn Curry Leaves sprig
export const CurryLeafIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Stem */}
    <path d="M16 84 Q48 54 84 18" stroke="#30231D" strokeWidth="3" strokeLinecap="round" />
    {/* Leaf 1 */}
    <path d="M84 18 C78 28 66 26 62 20 C64 12 76 10 84 18 Z" fill="#536B35" stroke="#30231D" strokeWidth="2.5" />
    {/* Leaf 2 */}
    <path d="M68 32 C60 42 48 38 46 30 C50 24 62 24 68 32 Z" fill="#536B35" stroke="#30231D" strokeWidth="2.5" />
    {/* Leaf 3 */}
    <path d="M52 48 C44 58 32 54 30 46 C34 40 46 40 52 48 Z" fill="#536B35" stroke="#30231D" strokeWidth="2.5" />
    {/* Leaf 4 */}
    <path d="M38 64 C30 74 18 70 16 62 C20 56 32 56 38 64 Z" fill="#536B35" stroke="#30231D" strokeWidth="2.5" />
  </svg>
);

// Hand-drawn Star Anise
export const StarAniseIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g transform="translate(50,50)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <path
            d="M-8 -6 C-12 -22 0 -36 0 -36 C0 -36 12 -22 8 -6 Z"
            fill="#4E2A1C"
            stroke="#30231D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="-20" r="3" fill="#D4A336" stroke="#30231D" strokeWidth="1" />
        </g>
      ))}
      <circle cx="0" cy="0" r="8" fill="#30231D" />
    </g>
  </svg>
);

// Hand-drawn Mustard Seeds & Spices cluster
export const MustardSpicesIllustration: React.FC<IllustrationProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Mustard cluster dots */}
    <circle cx="36" cy="40" r="6" fill="#E6B94D" stroke="#30231D" strokeWidth="2.5" />
    <circle cx="52" cy="32" r="5" fill="#30231D" stroke="#30231D" strokeWidth="2" />
    <circle cx="64" cy="44" r="7" fill="#E6B94D" stroke="#30231D" strokeWidth="2.5" />
    <circle cx="48" cy="54" r="6" fill="#30231D" stroke="#30231D" strokeWidth="2" />
    <circle cx="34" cy="62" r="5" fill="#E6B94D" stroke="#30231D" strokeWidth="2.5" />
    <circle cx="62" cy="66" r="6" fill="#B52A24" stroke="#30231D" strokeWidth="2" />
    <circle cx="76" cy="56" r="4" fill="#E6B94D" stroke="#30231D" strokeWidth="1.5" />
  </svg>
);

// Traditional Ceramic Bharani (Pickle jar)
export const ClayBharaniIllustration: React.FC<IllustrationProps> = ({ className = '', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Lid handle knob */}
    <ellipse cx="50" cy="18" rx="8" ry="4" fill="#30231D" stroke="#30231D" strokeWidth="2" />
    {/* Lid dome */}
    <path d="M30 28 C30 20 70 20 70 28 Z" fill="#E6B94D" stroke="#30231D" strokeWidth="3" />
    {/* Cloth tie & cord */}
    <rect x="26" y="28" width="48" height="6" rx="3" fill="#B52A24" stroke="#30231D" strokeWidth="2" />
    <path d="M68 32 C74 38 78 48 76 54" stroke="#B52A24" strokeWidth="3" strokeLinecap="round" />
    {/* Bharani jar top half (cream glazed porcelain) */}
    <path
      d="M28 34 C20 44 20 54 20 60 L80 60 C80 54 80 44 72 34 Z"
      fill="#FFF5E8"
      stroke="#30231D"
      strokeWidth="3.5"
    />
    {/* Bharani jar bottom half (dark terracotta brown) */}
    <path
      d="M20 60 C20 74 28 88 50 88 C72 88 80 74 80 60 Z"
      fill="#4E2A1C"
      stroke="#30231D"
      strokeWidth="3.5"
    />
    {/* Decorative line */}
    <path d="M22 60 L78 60" stroke="#30231D" strokeWidth="3" />
  </svg>
);

// Fun Sparkles / Flavor Burst
export const SparkleIllustration: React.FC<IllustrationProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M25 0 C25 15 35 25 50 25 C35 25 25 35 25 50 C25 35 15 25 0 25 C15 25 25 15 25 0 Z"
      fill="#E6B94D"
      stroke="#30231D"
      strokeWidth="2"
    />
  </svg>
);

