import React, { useState } from 'react';
import { PickleProduct } from '../../types';
import { PickleJarVisual } from '../jar/PickleJarVisual';
import {
  ChilliIllustration,
  MangoIllustration,
  LemonIllustration,
  PrawnIllustration,
  DateIllustration,
  StarAniseIllustration,
  CurryLeafIllustration,
  MustardSpicesIllustration,
  SparkleIllustration,
} from '../illustrations/VectorIllustrations';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

interface HeroSectionProps {
  featuredProduct: PickleProduct;
  onExplore: () => void;
  onShop: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ featuredProduct, onExplore, onShop }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen pt-24 sm:pt-28 pb-12 overflow-hidden flex flex-col justify-between bg-[#FFF5E8]">
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#E6B94D]/25 via-[#B52A24]/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute top-12 left-10 w-96 h-96 bg-[#536B35]/10 rounded-full blur-3xl -z-10" />
      </div>

      {/* Floating Vector Ingredient Elements (DUNKLY inspired) */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
        {/* Floating Chilli top left */}
        <div className="absolute top-28 left-[6%] sm:left-[10%] animate-float">
          <ChilliIllustration size={64} className="rotate-12 drop-shadow-md" />
        </div>

        {/* Floating Lemon top right */}
        <div className="absolute top-24 right-[8%] sm:right-[12%] animate-float-delayed">
          <LemonIllustration size={58} className="-rotate-12 drop-shadow-md" />
        </div>

        {/* Floating Mango mid left */}
        <div className="absolute top-[48%] left-[4%] sm:left-[8%] animate-float-reverse">
          <MangoIllustration size={68} className="rotate-45 drop-shadow-md" />
        </div>

        {/* Floating Prawn mid right */}
        <div className="absolute top-[45%] right-[5%] sm:right-[9%] animate-float">
          <PrawnIllustration size={65} className="-rotate-25 drop-shadow-md" />
        </div>

        {/* Floating Date bottom left */}
        <div className="absolute bottom-24 left-[12%] animate-float-delayed hidden sm:block">
          <DateIllustration size={52} className="rotate-12 drop-shadow-md" />
        </div>

        {/* Floating Star Anise & Mustard bottom right */}
        <div className="absolute bottom-24 right-[14%] animate-float-reverse hidden sm:block">
          <StarAniseIllustration size={50} className="rotate-45 drop-shadow-md" />
        </div>

        <div className="absolute top-[38%] left-[22%] hidden lg:block opacity-60 animate-float">
          <CurryLeafIllustration size={52} className="-rotate-15" />
        </div>

        <div className="absolute top-[60%] right-[20%] hidden lg:block opacity-70 animate-float-delayed">
          <MustardSpicesIllustration size={48} />
        </div>

        {/* Sparkles */}
        <div className="absolute top-36 right-[28%] animate-pulse">
          <SparkleIllustration size={28} />
        </div>
        <div className="absolute bottom-36 left-[25%] animate-pulse">
          <SparkleIllustration size={22} />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex-1 flex flex-col items-center justify-center text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#30231D]/15 shadow-sm text-xs font-mono-tag font-bold text-[#30231D] mb-4 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-[#B52A24] animate-ping" />
          <span>AUTHENTIC ARTISANAL HOMEMADE RECIPES</span>
          <Award size={14} className="text-[#E6B94D]" />
        </div>

        {/* Oversized Headline (TONIC DRINKS + CAKELAB inspiration) */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#30231D] leading-[0.92] uppercase max-w-5xl">
          THE TASTE <br />
          <span className="text-[#B52A24] relative inline-block">
            THAT STAYS.
            {/* Playful underline accent */}
            <svg
              className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 text-[#E6B94D]"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M3 9C60 3 140 2 297 9"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle / Punchline */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#30231D]/80 max-w-2xl font-normal leading-relaxed">
          Homemade goodness. Bold flavours. A jar full of happiness.
          Slow-cooked in cold-pressed gingelly oil without shortcuts.
        </p>

        {/* Central Hero Pickle Jar Stage */}
        <div
          className="relative my-4 sm:my-6 cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onExplore}
        >
          {/* Jar with responsive sizing and lid opening on hover */}
          <PickleJarVisual
            product={featuredProduct}
            size="hero"
            isLidOpen={isHovered}
            showAroma={isHovered}
            className="transition-transform duration-500 group-hover:scale-105"
          />

          {/* Interactive Tooltip Callout */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#30231D] text-[#FFF5E8] px-3.5 py-1 rounded-full text-[11px] font-mono-tag font-bold whitespace-nowrap shadow-lg flex items-center gap-1.5 opacity-90 group-hover:bg-[#B52A24] transition-colors">
            <Sparkles size={12} className="text-[#E6B94D]" />
            <span>HOVER TO POP THE LID • {featuredProduct.shortName.toUpperCase()}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mt-2">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#B52A24] hover:bg-[#8C1C17] text-white font-display font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#B52A24]/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <span>EXPLORE OUR PICKLES</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onShop}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#FFFAF3] text-[#30231D] border-2 border-[#30231D]/15 font-display font-bold text-sm tracking-wider uppercase transition-all hover:-translate-y-0.5 shadow-sm"
          >
            SHOP ALL FLAVOURS (11)
          </button>
        </div>
      </div>

      {/* TONIC-DRINKS Style Infinite Horizontal Marquee Ticker */}
      <div className="mt-8 border-y-2 border-[#30231D] bg-[#E6B94D] py-3 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-display font-black text-sm sm:text-base tracking-widest text-[#30231D] uppercase">
          <span>100% HOMEMADE</span>
          <span>★</span>
          <span>NO ADDED PRESERVATIVES</span>
          <span>★</span>
          <span>ZERO ARTIFICIAL COLOURS</span>
          <span>★</span>
          <span>COLD-PRESSED GINGELLY OIL</span>
          <span>★</span>
          <span>TRADITIONAL HEIRLOOM RECIPES</span>
          <span>★</span>
          <span>VEG & NON-VEG VARIETIES</span>
          <span>★</span>
          <span>100% HOMEMADE</span>
          <span>★</span>
          <span>NO ADDED PRESERVATIVES</span>
          <span>★</span>
          <span>ZERO ARTIFICIAL COLOURS</span>
          <span>★</span>
          <span>COLD-PRESSED GINGELLY OIL</span>
          <span>★</span>
          <span>TRADITIONAL HEIRLOOM RECIPES</span>
          <span>★</span>
          <span>VEG & NON-VEG VARIETIES</span>
          <span>★</span>
        </div>
      </div>
    </section>
  );
};

