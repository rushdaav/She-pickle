import React from 'react';
import {
  ClayBharaniIllustration,
  MustardSpicesIllustration,
  ChilliIllustration,
  CurryLeafIllustration,
} from '../components/illustrations/VectorIllustrations';
import { Heart, Sun, Award, ShieldCheck, ArrowRight } from 'lucide-react';

interface StoryPageProps {
  onNavigateShop: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigateShop }) => {
  return (
    <div className="pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            HERITAGE & CRAFT
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-[#30231D] uppercase tracking-tight leading-[0.95]">
            FROM OUR KITCHEN <br />
            <span className="text-[#B52A24]">TO YOUR TABLE.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#30231D]/80 font-serif-editorial italic">
            &ldquo;We don&apos;t make pickles for factory shelves. We make them for families who crave the real taste of home.&rdquo;
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#30231D]/10 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
            <ClayBharaniIllustration size={160} />
          </div>

          <div className="space-y-6 text-sm sm:text-base text-[#30231D]/80 leading-relaxed font-normal relative z-10">
            <p className="first-letter:text-5xl first-letter:font-black first-letter:font-display first-letter:text-[#B52A24] first-letter:mr-2 first-letter:float-left">
              SHE PICKLE was founded with a fierce commitment to keeping the vanishing art of homemade pickle making alive. In an age dominated by industrial additives, synthetic vinegar, and artificial colouring dyes, our kitchen stands firmly as a sanctuary of authentic flavour.
            </p>

            <p>
              Every jar begins with local seasonal harvests: crispy green raw mangoes from small orchards, sun-ripened lemons, plump Arabian dates, and fresh catches of sea prawns and tender prime meats. There are no automated conveyor belts. Instead, each vegetable and meat morsel is hand-inspected, cut with seasoned knives, and slowly cured.
            </p>

            <div className="my-8 p-6 rounded-2xl bg-[#FFF5E8] border-l-4 border-[#B52A24] space-y-2">
              <h4 className="font-display font-black text-base text-[#30231D] uppercase">
                THE COLD-PRESSED GINGELLY DIFFERENCE
              </h4>
              <p className="text-xs sm:text-sm text-[#30231D]/80">
                Unlike mass-market brands that cut costs using neutral refined palm oil, we exclusively use 100% pure cold-pressed gingelly (sesame) oil. This imparts an unmistakable nutty fragrance, carries the deep warmth of roasted Kashmiri chillies, and preserves the pickle naturally without chemicals.
              </p>
            </div>

            <p>
              As a women-led artisanal initiative, our recipes are living archives of regional family secrets passed down across generations. Each batch is tempered with precision: roasted mustard seeds crackling in hot oil, whole curry leaves releasing their fragrant oils, and hand-pounded Tellicherry black pepper rounding out the spice.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#30231D]/10 relative z-10">
            <div className="space-y-2 text-center p-4 rounded-2xl bg-[#FFFAF3]">
              <Sun size={24} className="text-[#E6B94D] mx-auto" />
              <h4 className="font-display font-bold text-sm text-[#30231D] uppercase">
                Natural Sun-Curing
              </h4>
              <p className="text-xs text-[#30231D]/60">
                Aged under natural sunlight in ceramic bharanis
              </p>
            </div>

            <div className="space-y-2 text-center p-4 rounded-2xl bg-[#FFFAF3]">
              <ShieldCheck size={24} className="text-[#536B35] mx-auto" />
              <h4 className="font-display font-bold text-sm text-[#30231D] uppercase">
                Zero Chemicals
              </h4>
              <p className="text-xs text-[#30231D]/60">
                Preserved only with rock salt, vinegar, and oil
              </p>
            </div>

            <div className="space-y-2 text-center p-4 rounded-2xl bg-[#FFFAF3]">
              <Heart size={24} className="text-[#B52A24] mx-auto" />
              <h4 className="font-display font-bold text-sm text-[#30231D] uppercase">
                Women Artisans
              </h4>
              <p className="text-xs text-[#30231D]/60">
                Supporting traditional culinary livelihoods
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Explore */}
        <div className="text-center pt-6">
          <button
            onClick={onNavigateShop}
            className="px-10 py-5 bg-[#B52A24] hover:bg-[#8C1C17] text-white rounded-full font-display font-black text-sm uppercase tracking-wider shadow-xl shadow-[#B52A24]/30 inline-flex items-center gap-2 group transition-all"
          >
            <span>TASTE OUR HOMEMADE CREATIONS (11)</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

