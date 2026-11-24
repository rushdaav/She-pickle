import React from 'react';
import { PickleProduct } from '../../types';
import { PickleJarVisual } from '../jar/PickleJarVisual';
import {
  MangoIllustration,
  LemonIllustration,
  DateIllustration,
  PrawnIllustration,
  ChilliIllustration,
  ChickenIllustration,
} from '../illustrations/VectorIllustrations';
import { ArrowRight, Leaf, Flame } from 'lucide-react';

interface TwoWorldsSectionProps {
  products: PickleProduct[];
  onShopVeg: () => void;
  onShopNonVeg: () => void;
  onSelectProduct: (slug: string) => void;
}

export const TwoWorldsSection: React.FC<TwoWorldsSectionProps> = ({
  products,
  onShopVeg,
  onShopNonVeg,
  onSelectProduct,
}) => {
  const vegPickles = products.filter((p) => p.category === 'veg');
  const nonVegPickles = products.filter((p) => p.category === 'non-veg');

  return (
    <section className="py-20 lg:py-28 bg-[#FFF5E8] border-b border-[#30231D]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            DUAL HERITAGE
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#30231D] tracking-tight uppercase">
            TWO WORLDS <br />
            <span className="text-[#536B35]">OF FLAVOUR.</span>
          </h2>
          <p className="text-base text-[#30231D]/75 font-normal">
            Whether you crave the garden tartness of sun-cured fruits or the fiery umami crunch of slow-fried meats, we craft each recipe in completely segregated kitchens with heirloom spices.
          </p>
        </div>

        {/* Split Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
          {/* VEG WORLD (Left Column - Green & Yellow Tones) */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#F4F7EE] to-[#E9F0DE] border-2 border-[#536B35]/20 p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-lg group">
            {/* Decorative Vector Accents */}
            <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-70 transition-opacity">
              <MangoIllustration size={80} className="rotate-12" />
            </div>
            <div className="absolute bottom-16 right-4 opacity-25">
              <LemonIllustration size={60} className="-rotate-15" />
            </div>
            <div className="absolute top-1/2 left-4 opacity-20">
              <DateIllustration size={50} />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#536B35] text-white text-xs font-mono-tag font-bold">
                <Leaf size={14} /> 7 TRADITIONAL RECIPES
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#30231D] uppercase">
                VEG PICKLES
              </h3>

              <p className="text-sm text-[#30231D]/80 leading-relaxed max-w-md">
                Raw Mangoes, Arabian Dates, Sun-Ripened Lemons, Tamarind, Yam and Golden Raisins. Fermented slowly under direct sunlight with stone-ground yellow mustard and pure sesame oil.
              </p>

              {/* Jar Thumbnails Row */}
              <div className="pt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {vegPickles.slice(0, 4).map((veg) => (
                  <button
                    key={veg.id}
                    onClick={() => onSelectProduct(veg.slug)}
                    className="flex flex-col items-center bg-white/80 hover:bg-white p-3 rounded-2xl border border-[#536B35]/15 transition-all hover:-translate-y-1 shadow-sm shrink-0 w-28 text-center"
                  >
                    <div className="w-14 h-20 flex items-center justify-center">
                      <PickleJarVisual product={veg} size="sm" className="scale-65" />
                    </div>
                    <span className="font-display font-bold text-xs text-[#30231D] mt-1 truncate w-full">
                      {veg.shortName}
                    </span>
                    <span className="text-[10px] font-mono-tag text-[#536B35] font-semibold">
                      ₹{veg.weights[0].price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                onClick={onShopVeg}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#536B35] hover:bg-[#3B4D25] text-white font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 group-hover:translate-x-1"
              >
                <span>SHOP VEG PICKLES</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* NON-VEG WORLD (Right Column - Deep Chilli Red & Earthy Tones) */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#FDF1EF] to-[#FBE4E1] border-2 border-[#B52A24]/20 p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-lg group">
            {/* Decorative Vector Accents */}
            <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-70 transition-opacity">
              <PrawnIllustration size={80} className="-rotate-12" />
            </div>
            <div className="absolute bottom-16 right-6 opacity-25">
              <ChilliIllustration size={65} className="rotate-25" />
            </div>
            <div className="absolute top-1/2 left-4 opacity-20">
              <ChickenIllustration size={55} />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B52A24] text-white text-xs font-mono-tag font-bold">
                <Flame size={14} /> 4 ARTISANAL MEAT VARIETIES
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#30231D] uppercase">
                NON-VEG PICKLES
              </h3>

              <p className="text-sm text-[#30231D]/80 leading-relaxed max-w-md">
                Tender Prime Beef, Coastal Sea Prawns, Country Farm Chicken, and Deep-Sea Spiced Tuna. Slow-fried to crisp perfection and submerged in fiery roasted chilli marinades.
              </p>

              {/* Jar Thumbnails Row */}
              <div className="pt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {nonVegPickles.map((nonVeg) => (
                  <button
                    key={nonVeg.id}
                    onClick={() => onSelectProduct(nonVeg.slug)}
                    className="flex flex-col items-center bg-white/80 hover:bg-white p-3 rounded-2xl border border-[#B52A24]/15 transition-all hover:-translate-y-1 shadow-sm shrink-0 w-28 text-center"
                  >
                    <div className="w-14 h-20 flex items-center justify-center">
                      <PickleJarVisual product={nonVeg} size="sm" className="scale-65" />
                    </div>
                    <span className="font-display font-bold text-xs text-[#30231D] mt-1 truncate w-full">
                      {nonVeg.shortName}
                    </span>
                    <span className="text-[10px] font-mono-tag text-[#B52A24] font-semibold">
                      ₹{nonVeg.weights[0].price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <button
                onClick={onShopNonVeg}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#B52A24] hover:bg-[#8C1C17] text-white font-display font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 group-hover:translate-x-1"
              >
                <span>SHOP NON-VEG PICKLES</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

