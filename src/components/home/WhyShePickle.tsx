import React from 'react';
import {
  ClayBharaniIllustration,
  ChilliIllustration,
  StarAniseIllustration,
  MustardSpicesIllustration,
} from '../illustrations/VectorIllustrations';

export const WhyShePickle: React.FC = () => {
  const values = [
    {
      num: '01',
      title: 'NO ADDED PRESERVATIVES',
      desc: 'Homemade pickle goodness cured naturally using cold-pressed gingelly oil, rock salt, and natural brewed vinegar. No synthetic chemicals.',
      illustration: <ClayBharaniIllustration size={60} />,
      accent: '#536B35',
    },
    {
      num: '02',
      title: 'NO ADDED COLOURS',
      desc: 'Zero artificial food dyes or brighteners. That deep radiant red and warm yellow hue comes 100% from stone-ground Kashmiri chillies and turmeric.',
      illustration: <ChilliIllustration size={60} className="rotate-12" />,
      accent: '#B52A24',
    },
    {
      num: '03',
      title: 'BOLD HEIRLOOM FLAVOURS',
      desc: 'A diverse selection of 11 distinct vegetarian and non-vegetarian varieties, crafted to ignite cravings and elevate everyday meals.',
      illustration: <StarAniseIllustration size={60} className="rotate-45" />,
      accent: '#E6B94D',
    },
    {
      num: '04',
      title: 'SLOW-COOKED WITH CARE',
      desc: 'Crafted in small batches by women culinary artisans. Each ingredient is hand-picked, hand-cut, and tempered with unhurried precision.',
      illustration: <MustardSpicesIllustration size={60} />,
      accent: '#30231D',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFAF3] border-b border-[#30231D]/10 relative overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#30231D" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            HONEST CRAFT
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#30231D] tracking-tight uppercase leading-[0.95]">
            GOOD INGREDIENTS. <br />
            <span className="text-[#B52A24]">NOTHING EXTRA.</span>
          </h2>
          <p className="text-base text-[#30231D]/75 font-normal max-w-xl mx-auto">
            We believe commercial shortcuts ruin the soul of a pickle. Here is our unwavering promise to your dining table.
          </p>
        </div>

        {/* 4 Brand Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((v) => (
            <div
              key={v.num}
              className="bg-white rounded-3xl p-8 border border-[#30231D]/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-tag text-2xl font-black text-[#30231D]/30 group-hover:text-[#B52A24] transition-colors">
                    {v.num}
                  </span>
                  <div className="p-2 rounded-2xl bg-[#FFF5E8] group-hover:scale-110 transition-transform">
                    {v.illustration}
                  </div>
                </div>

                <h3 className="font-display font-black text-lg text-[#30231D] tracking-tight uppercase mb-3">
                  {v.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#30231D]/70 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#30231D]/10 flex items-center justify-between">
                <span className="text-[10px] font-mono-tag uppercase tracking-wider text-[#30231D]/50 font-bold">
                  SHE PICKLE STANDARDS
                </span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v.accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

