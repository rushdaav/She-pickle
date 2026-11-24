import React from 'react';
import { Utensils, Sparkles } from 'lucide-react';

export const FoodMoments: React.FC = () => {
  const pairings = [
    {
      title: 'HOT GHEE RICE & BEEF PICKLE',
      meal: 'Comfort Sunday Feast',
      desc: 'Steaming hot fragrant kaima or basmati rice tossed with pure golden cow ghee, paired with crunchy dark tender beef pickle chunks.',
      tag: 'MEAT LOVER PAIRING',
      bg: 'from-[#3A1412] to-[#250D0C]',
      accent: '#B52A24',
    },
    {
      title: 'THE ROYAL KERALA SADHYA',
      meal: 'Festival Dining',
      desc: 'Rich feast served on a fresh green plantain leaf with Heritage Mango, Sun-Cured Lemon, and Sweet & Spicy Dates pickle.',
      tag: 'TRADITIONAL BANQUET',
      bg: 'from-[#2B3819] to-[#18210C]',
      accent: '#536B35',
    },
    {
      title: 'FLAKY POROTTA & PRAWNS CRUNCH',
      meal: 'Evening Cravings',
      desc: 'Tear open a hot, layered crispy Malabar porotta and scoop up spicy wild sea prawns bathed in tangy coconut vinegar gravy.',
      tag: 'STREET STYLE CRAVING',
      bg: 'from-[#381611] to-[#220B07]',
      accent: '#D14836',
    },
    {
      title: 'CURD RICE & SUN-CURED LEMON',
      meal: 'Soulful Everyday Bowl',
      desc: 'Chilled creamy yogurt rice tempered with green chillies, curry leaves, and a punchy bite of tender sun-cured yellow lemon pickle.',
      tag: 'DAILY COMFORT',
      bg: 'from-[#3B3012] to-[#221B08]',
      accent: '#E6B94D',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFF5E8] border-b border-[#30231D]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            DAILY RITUALS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#30231D] uppercase tracking-tight leading-[0.95]">
            EVERY MEAL <br />
            <span className="text-[#B52A24]">DESERVES A LITTLE EXTRA.</span>
          </h2>
          <p className="text-base text-[#30231D]/75 font-normal max-w-xl mx-auto">
            From royal feast tables to quiet late-night curd rice bowls, here is how SHE PICKLE turns every ordinary meal into a celebration.
          </p>
        </div>

        {/* Editorial Pairing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pairings.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 bg-gradient-to-br ${p.bg} text-[#FFF5E8] flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group border border-white/10`}
            >
              <div className="relative z-10 space-y-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-mono-tag font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: p.accent }}
                >
                  {p.tag}
                </span>

                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-tight pt-2">
                  {p.title}
                </h3>

                <p className="text-xs font-serif-editorial italic text-[#E6B94D]">
                  {p.meal}
                </p>

                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>

              <div className="pt-6 relative z-10 flex items-center justify-between border-t border-white/10 mt-6">
                <span className="text-[11px] font-mono-tag text-white/60 flex items-center gap-1.5">
                  <Utensils size={13} className="text-[#E6B94D]" /> PAIRING #0{idx + 1}
                </span>
                <Sparkles size={16} className="text-[#E6B94D] group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

