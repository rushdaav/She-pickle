import React from 'react';
import {
  ClayBharaniIllustration,
  MustardSpicesIllustration,
  CurryLeafIllustration,
} from '../illustrations/VectorIllustrations';
import { Heart, Sun, Sparkles } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFAF3] border-b border-[#30231D]/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6B94D]/25 text-[#30231D] text-xs font-mono-tag font-bold">
              <Sparkles size={14} className="text-[#B52A24]" />
              FOUNDED ON AUTHENTICITY
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#30231D] uppercase tracking-tight leading-[0.94]">
              FROM OUR KITCHEN <br />
              <span className="text-[#B52A24]">TO YOUR TABLE.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#30231D]/80 leading-relaxed font-normal">
              <p>
                SHE PICKLE was born out of a simple, rebellious truth: authentic homemade pickles cannot be mass-produced in cold industrial factories. A genuine pickle demands patience, seasoned instinct, sun-curing jars on rooftops, and ingredients chosen by hand.
              </p>
              <p>
                Spearheaded by passionate women culinary artisans, our recipes honour deep-rooted regional traditions. We slow-fry prime tender meats, wild sea prawns, and crisp green orchard mangoes in small earthen vessels. Pure cold-pressed gingelly oil seals in the aroma, letting the rich spices bloom naturally over time.
              </p>
              <p className="font-serif-editorial italic text-lg sm:text-xl text-[#30231D] pt-2 border-l-2 border-[#B52A24] pl-4">
                &ldquo;Every jar we seal is an invitation to taste food the way it was meant to be made: bold, unadulterated, and full of heartfelt care.&rdquo;
              </p>
            </div>

            {/* Kitchen Pillars Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#30231D]/10">
              <div className="space-y-1">
                <Sun size={20} className="text-[#E6B94D]" />
                <h4 className="font-display font-bold text-xs uppercase text-[#30231D]">
                  Sun-Cured Jars
                </h4>
                <p className="text-[11px] text-[#30231D]/60">Aged under open sunlight</p>
              </div>

              <div className="space-y-1">
                <MustardSpicesIllustration size={28} />
                <h4 className="font-display font-bold text-xs uppercase text-[#30231D]">
                  Stone Ground
                </h4>
                <p className="text-[11px] text-[#30231D]/60">Fresh roasted spice blends</p>
              </div>

              <div className="space-y-1">
                <Heart size={20} className="text-[#B52A24]" />
                <h4 className="font-display font-bold text-xs uppercase text-[#30231D]">
                  Women Artisans
                </h4>
                <p className="text-[11px] text-[#30231D]/60">Handcrafted batch by batch</p>
              </div>
            </div>
          </div>

          {/* Editorial Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#30231D]/15 shadow-2xl bg-[#FFF5E8] p-8 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#E6B94D] p-2 border-2 border-[#30231D] shadow-lg flex items-center justify-center">
                <ClayBharaniIllustration size={72} />
              </div>

              <div className="space-y-2">
                <span className="font-mono-tag text-xs font-bold text-[#B52A24] uppercase tracking-wider">
                  ARTISANAL KITCHEN DIARY
                </span>
                <h3 className="font-display font-black text-2xl text-[#30231D] uppercase">
                  THE HERITAGE BATCH
                </h3>
                <p className="text-xs text-[#30231D]/70 max-w-xs mx-auto leading-relaxed">
                  No artificial vinegar concentrates. No food colourings. Just seasonal produce, cold-pressed gingelly oil, and spices passed down generations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#30231D]/10 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tag font-bold text-[#30231D]">
                  <span>LOCATION</span>
                  <span className="text-[#536B35]">KERALA, INDIA</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono-tag font-bold text-[#30231D]">
                  <span>OIL BASE</span>
                  <span className="text-[#B52A24]">100% GINGELLY (SESAME)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono-tag font-bold text-[#30231D]">
                  <span>PRESERVATIVE</span>
                  <span className="text-[#E6B94D]">ZERO CHEMICALS</span>
                </div>
              </div>

              <div className="flex justify-center">
                <CurryLeafIllustration size={44} className="opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

