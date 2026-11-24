import React, { useState, useEffect, useRef } from 'react';
import { PickleProduct } from '../../types';
import { PickleJarVisual } from '../jar/PickleJarVisual';
import { useCart } from '../../context/CartContext';
import {
  ChilliIllustration,
  MangoIllustration,
  LemonIllustration,
  PrawnIllustration,
  DateIllustration,
  StarAniseIllustration,
  CurryLeafIllustration,
  MustardSpicesIllustration,
} from '../illustrations/VectorIllustrations';
import {
  Flame,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Check,
} from 'lucide-react';

interface StickyScrollExperienceProps {
  products: PickleProduct[];
  onSelectProduct: (slug: string) => void;
}

export const StickyScrollExperience: React.FC<StickyScrollExperienceProps> = ({
  products,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<string>('250g');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProduct = products[activeIndex] || products[0];

  // Reset selected weight when active product changes if needed
  useEffect(() => {
    setSelectedWeight('250g');
  }, [activeIndex]);

  // Handle scroll trigger calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.scrollHeight - window.innerHeight;
      if (containerHeight <= 0) return;

      const scrolledAmount = -rect.top;
      if (scrolledAmount < 0) {
        setActiveIndex(0);
        return;
      }

      const progress = Math.min(1, Math.max(0, scrolledAmount / containerHeight));
      const newIndex = Math.min(
        products.length - 1,
        Math.floor(progress * products.length)
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products.length]);

  const handleWeightSelect = (weight: string) => {
    setSelectedWeight(weight);
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, selectedWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const currentPrice =
    currentProduct.weights.find((w) => w.weight === selectedWeight)?.price ||
    currentProduct.weights[0].price;

  // Render contextual floating illustrations based on category & active product
  const renderFloatingIngredients = () => {
    switch (currentProduct.id) {
      case 'beef-pickle':
      case 'chicken-pickle':
        return (
          <>
            <div className="absolute top-12 left-8 animate-float">
              <ChilliIllustration size={56} className="rotate-12" />
            </div>
            <div className="absolute bottom-16 right-10 animate-float-delayed">
              <CurryLeafIllustration size={58} className="-rotate-15" />
            </div>
            <div className="absolute top-20 right-12 animate-float-reverse">
              <StarAniseIllustration size={48} className="rotate-45" />
            </div>
          </>
        );
      case 'prawns-pickle':
      case 'tuna-pickle':
        return (
          <>
            <div className="absolute top-10 left-10 animate-float">
              <PrawnIllustration size={62} className="-rotate-12" />
            </div>
            <div className="absolute bottom-14 right-12 animate-float-delayed">
              <ChilliIllustration size={52} className="rotate-45" />
            </div>
            <div className="absolute top-24 right-8 animate-float-reverse">
              <MustardSpicesIllustration size={50} />
            </div>
          </>
        );
      case 'mango-pickle':
        return (
          <>
            <div className="absolute top-12 left-10 animate-float">
              <MangoIllustration size={64} className="rotate-25" />
            </div>
            <div className="absolute bottom-16 right-8 animate-float-delayed">
              <MustardSpicesIllustration size={52} />
            </div>
            <div className="absolute top-20 right-14 animate-float-reverse">
              <CurryLeafIllustration size={50} />
            </div>
          </>
        );
      case 'dates-pickle':
      case 'lemon-dates-pickle':
      case 'raisins-pickle':
        return (
          <>
            <div className="absolute top-12 left-10 animate-float">
              <DateIllustration size={58} className="-rotate-15" />
            </div>
            <div className="absolute bottom-14 right-10 animate-float-delayed">
              <LemonIllustration size={50} className="rotate-12" />
            </div>
            <div className="absolute top-20 right-12 animate-float-reverse">
              <StarAniseIllustration size={46} />
            </div>
          </>
        );
      case 'lemon-pickle':
      default:
        return (
          <>
            <div className="absolute top-12 left-10 animate-float">
              <LemonIllustration size={56} className="rotate-12" />
            </div>
            <div className="absolute bottom-16 right-10 animate-float-delayed">
              <ChilliIllustration size={50} className="-rotate-20" />
            </div>
            <div className="absolute top-20 right-12 animate-float-reverse">
              <MustardSpicesIllustration size={48} />
            </div>
          </>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${products.length * 105}vh` }}
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between transition-colors duration-700 bg-gradient-to-b from-[#251713] via-[#1B100D] to-[#120A08] text-[#FFF5E8]">
        {/* Dynamic Subtle Product Color Ambient Halo */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${currentProduct.accentColor}33 0%, transparent 70%)`,
          }}
        />

        {/* Section Header Strip */}
        <div className="relative z-30 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono-tag text-xs font-bold text-[#E6B94D] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E6B94D] animate-ping" />
              SECTION 02 • THE CRAVING CAROUSEL
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono-tag text-white/60">
              JAR {currentProduct.number} OF {String(products.length).padStart(2, '0')}
            </span>
            <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#E6B94D] h-full transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / products.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Stage Grid (Left Details - Center Jar - Right Ingredients & Add to Cart) */}
        <div className="relative z-20 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full">
            {/* LEFT COLUMN: Number, Category, Name & Tagline */}
            <div className="lg:col-span-4 text-left space-y-4 order-2 lg:order-1">
              {/* Product Number & Category Badge */}
              <div className="flex items-center gap-3">
                <span className="font-mono-tag text-3xl sm:text-4xl font-black text-[#E6B94D] opacity-90">
                  {currentProduct.number}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-mono-tag font-bold tracking-wider uppercase ${
                    currentProduct.category === 'veg'
                      ? 'bg-[#536B35] text-white'
                      : 'bg-[#B52A24] text-white'
                  }`}
                >
                  {currentProduct.category === 'veg' ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
                </span>
              </div>

              {/* Animated Product Heading */}
              <div className="overflow-hidden">
                <h2
                  key={`title-${currentProduct.id}`}
                  className="font-display font-black text-3xl sm:text-5xl lg:text-5xl tracking-tight text-white uppercase leading-[1.05] animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  {currentProduct.name}
                </h2>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-lg font-serif-editorial italic text-[#E6B94D] leading-snug">
                &ldquo;{currentProduct.tagline}&rdquo;
              </p>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-md">
                {currentProduct.description}
              </p>

              {/* Spice Meter */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-mono-tag text-white/60">SPICE INTENSITY:</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Flame
                      key={i}
                      size={16}
                      className={
                        i < currentProduct.spiceLevel
                          ? 'text-[#B52A24] fill-[#B52A24]'
                          : 'text-white/20'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: The Signature Sticky Jar Visual with Lid Twist-off */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative order-1 lg:order-2">
              {/* Floating ingredient illustrations */}
              <div className="absolute inset-0 pointer-events-none select-none">
                {renderFloatingIngredients()}
              </div>

              {/* Jar with animated lid open & aroma */}
              <div
                className="cursor-pointer transition-transform duration-500 hover:scale-105"
                onClick={() => onSelectProduct(currentProduct.slug)}
              >
                <PickleJarVisual
                  key={`jar-${currentProduct.id}`}
                  product={currentProduct}
                  size="scroll"
                  isLidOpen={true}
                  lidOffset={12}
                  showAroma={true}
                />
              </div>

              {/* View Full Product Link */}
              <button
                onClick={() => onSelectProduct(currentProduct.slug)}
                className="mt-2 text-xs font-mono-tag text-[#E6B94D] hover:text-white flex items-center gap-1 underline underline-offset-4"
              >
                VIEW FULL INGREDIENTS & REVIEWS <ArrowUpRight size={13} />
              </button>
            </div>

            {/* RIGHT COLUMN: Weight Selection, Price & Add To Cart CTA */}
            <div className="lg:col-span-4 space-y-5 order-3">
              {/* Ingredients Capsule Pills */}
              <div className="space-y-2">
                <span className="text-xs font-mono-tag text-[#E6B94D] uppercase font-bold tracking-wider">
                  KEY INGREDIENTS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProduct.ingredients.slice(0, 5).map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm"
                    >
                      {ing}
                    </span>
                  ))}
                  {currentProduct.ingredients.length > 5 && (
                    <span className="text-[11px] px-2 py-1 rounded-lg bg-white/5 text-white/60">
                      +{currentProduct.ingredients.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Size / Weight Selector */}
              <div className="space-y-2">
                <span className="text-xs font-mono-tag text-white/60 uppercase font-semibold">
                  SELECT JAR WEIGHT
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {currentProduct.weights.map((w) => {
                    const isSelected = selectedWeight === w.weight;
                    return (
                      <button
                        key={w.weight}
                        onClick={() => handleWeightSelect(w.weight)}
                        className={`py-2 px-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#E6B94D] border-[#E6B94D] text-[#30231D] font-bold shadow-lg shadow-[#E6B94D]/20'
                            : 'bg-white/5 border-white/15 text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="block font-mono-tag text-xs">{w.weight}</span>
                        <span className="block text-xs font-bold mt-0.5">₹{w.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-auto">
                  <span className="text-[10px] font-mono-tag text-white/50 uppercase block">
                    PRICE
                  </span>
                  <span className="font-display font-black text-3xl text-white">
                    ₹{currentPrice}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 w-full py-4 px-6 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl ${
                    addedAnimation
                      ? 'bg-[#536B35] text-white scale-95'
                      : 'bg-[#B52A24] hover:bg-[#8C1C17] text-white hover:shadow-[#B52A24]/30'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} />
                      <span>ADDED TO PANTRY!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>
              </div>

              {/* Flavor Promise */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2.5">
                <Sparkles size={16} className="text-[#E6B94D] shrink-0 mt-0.5" />
                <p className="text-[11px] text-white/70 leading-relaxed">
                  <strong className="text-white">Fresh Small Batch:</strong> Cured in pure cold-pressed gingelly oil. Sealed fresh in airtight glass jars.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Product Carousel Dots / Scrubber */}
        <div className="relative z-30 pb-6 px-4 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIndex(idx);
                  if (containerRef.current) {
                    const step = containerRef.current.scrollHeight / products.length;
                    window.scrollTo({
                      top: containerRef.current.offsetTop + idx * step + 10,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={`group px-2.5 py-1 rounded-full text-[11px] font-mono-tag font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                  activeIndex === idx
                    ? 'bg-[#E6B94D] text-[#30231D] shadow-md'
                    : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                }`}
              >
                <span>{p.number}</span>
                <span className="hidden md:inline">{p.shortName}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-white/50 text-xs font-mono-tag">
            <span>SCROLL TO DISCOVER NEXT JAR</span>
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

