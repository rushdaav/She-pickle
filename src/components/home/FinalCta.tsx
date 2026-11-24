import React from 'react';
import { PickleProduct } from '../../types';
import { PickleJarVisual } from '../jar/PickleJarVisual';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  products: PickleProduct[];
  onShopAll: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ products, onShopAll }) => {
  const showcaseJars = [
    products.find((p) => p.id === 'beef-pickle') || products[0],
    products.find((p) => p.id === 'mango-pickle') || products[4],
    products.find((p) => p.id === 'prawns-pickle') || products[1],
    products.find((p) => p.id === 'dates-pickle') || products[5],
  ];

  return (
    <section className="relative pt-20 pb-28 bg-gradient-to-b from-[#FFF5E8] to-[#251713] text-[#30231D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B52A24] text-white text-xs font-mono-tag font-bold mb-6 shadow-md">
          <Sparkles size={14} className="text-[#E6B94D]" />
          READY FOR A BOLD BITE?
        </div>

        {/* Large Headline */}
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase max-w-5xl mx-auto leading-[0.92]">
          YOUR NEXT FAVOURITE <br />
          <span className="text-[#B52A24]">PICKLE IS JUST</span> <br />
          <span className="text-stroke-brown sm:text-[#30231D]">A JAR AWAY.</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-[#30231D]/80 max-w-xl mx-auto font-normal">
          Crafted in small batches with cold-pressed oil and heirloom spices.
          Delivered in safely cushioned glass packaging across India.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onShopAll}
            className="px-10 py-5 rounded-full bg-[#B52A24] hover:bg-[#8C1C17] text-white font-display font-black text-base tracking-wider uppercase shadow-2xl shadow-[#B52A24]/40 hover:-translate-y-1 transition-all flex items-center gap-3 group"
          >
            <span>SHOP ALL PICKLES (11)</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Beautiful Overlapping Jars Arrangement */}
        <div className="mt-14 sm:mt-20 flex items-end justify-center -space-x-8 sm:-space-x-14 max-w-4xl mx-auto">
          {showcaseJars.map((jar, idx) => {
            const isCenter = idx === 1 || idx === 2;
            return (
              <div
                key={jar.id}
                className={`transition-all duration-500 hover:scale-110 hover:z-30 cursor-pointer ${
                  isCenter ? 'z-20 -translate-y-4' : 'z-10 opacity-90'
                }`}
                onClick={onShopAll}
              >
                <PickleJarVisual product={jar} size="md" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

