import React, { useState } from 'react';
import { PickleProduct, ReviewItem } from '../types';
import { PickleJarVisual } from '../components/jar/PickleJarVisual';
import { useCart } from '../context/CartContext';
import {
  Flame,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  Clock,
  Sparkles,
  Utensils,
  Sun,
  Star,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: PickleProduct;
  allProducts: PickleProduct[];
  reviews: ReviewItem[];
  onBack: () => void;
  onSelectProduct: (slug: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  reviews,
  onBack,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weights[0].weight);
  const [quantity, setQuantity] = useState(1);
  const [isLidOpen, setIsLidOpen] = useState(true);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const weightOption =
    product.weights.find((w) => w.weight === selectedWeight) || product.weights[0];
  const totalPrice = weightOption.price * quantity;

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const productReviews = reviews.filter(
    (r) => r.pickleName.toLowerCase() === product.name.toLowerCase()
  );

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const getWhatsAppMessageUrl = () => {
    const text = `Hi SHE PICKLE! I'd like to order: *${product.name}* (${selectedWeight}) x ${quantity} = ₹${totalPrice}. Please share payment and delivery details.`;
    return `https://wa.me/917034513689?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back Button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono-tag font-bold text-[#30231D]/70 hover:text-[#B52A24] transition-colors"
          >
            <ArrowLeft size={16} /> BACK TO STORE
          </button>
        </div>

        {/* Product Showcase Master Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#30231D]/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Interactive Pickle Jar Stage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-[#FFFAF3] rounded-3xl p-8 border border-[#30231D]/10 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Jar Visual */}
              <div className="my-4 transition-transform duration-500 hover:scale-105">
                <PickleJarVisual
                  product={product}
                  size="hero"
                  isLidOpen={isLidOpen}
                  showAroma={isLidOpen}
                />
              </div>

              {/* Lid & Aroma Toggle Button */}
              <button
                onClick={() => setIsLidOpen(!isLidOpen)}
                className="mt-4 px-4 py-1.5 rounded-full bg-white border border-[#30231D]/15 text-xs font-mono-tag font-bold text-[#30231D] hover:bg-[#30231D] hover:text-white transition-colors flex items-center gap-2 shadow-sm"
              >
                <Sparkles size={14} className="text-[#E6B94D]" />
                {isLidOpen ? 'CLOSE JAR LID' : 'TWIST OPEN & RELEASE AROMA'}
              </button>
            </div>

            {/* Quality Seals Row */}
            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <div className="bg-[#FFF5E8] p-3 rounded-2xl border border-[#30231D]/10 text-center">
                <ShieldCheck size={20} className="text-[#536B35] mx-auto mb-1" />
                <span className="font-display font-bold text-xs text-[#30231D] block">
                  Zero Preservatives
                </span>
                <span className="text-[10px] text-[#30231D]/60 font-mono-tag">
                  Natural oil curing
                </span>
              </div>

              <div className="bg-[#FFF5E8] p-3 rounded-2xl border border-[#30231D]/10 text-center">
                <Clock size={20} className="text-[#B52A24] mx-auto mb-1" />
                <span className="font-display font-bold text-xs text-[#30231D] block">
                  {product.shelfLife.split(' ')[0]} {product.shelfLife.split(' ')[1]} Shelf Life
                </span>
                <span className="text-[10px] text-[#30231D]/60 font-mono-tag">
                  Glass jar packed
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details, Weights, Pricing, & Add to Cart */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badges */}
            <div className="flex items-center gap-3">
              <span className="font-mono-tag text-xs font-black text-[#30231D]/40">
                RECIPE #{product.number}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono-tag font-bold uppercase tracking-wider ${product.category === 'veg'
                    ? 'bg-[#536B35] text-white'
                    : 'bg-[#B52A24] text-white'
                  }`}
              >
                {product.category === 'veg' ? '100% VEGETARIAN' : 'NON-VEGETARIAN'}
              </span>
              <span className="text-xs font-mono-tag text-[#E6B94D] bg-[#30231D] px-2.5 py-0.5 rounded-full font-bold">
                A WOMEN&apos;S PRODUCT
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-[#30231D] uppercase tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-base sm:text-lg font-serif-editorial italic text-[#B52A24]">
                &ldquo;{product.tagline}&rdquo;
              </p>
            </div>

            {/* Spice Intensity */}
            <div className="flex items-center gap-3 py-2 border-y border-[#30231D]/10">
              <span className="text-xs font-mono-tag font-bold text-[#30231D]/70 uppercase">
                SPICE INTENSITY:
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Flame
                    key={i}
                    size={18}
                    className={
                      i < product.spiceLevel
                        ? 'text-[#B52A24] fill-[#B52A24]'
                        : 'text-[#30231D]/20'
                    }
                  />
                ))}
              </div>
              <span className="text-xs font-mono-tag text-[#30231D]/60 font-semibold">
                ({product.spiceLevel} / 5 Level)
              </span>
            </div>

            {/* Flavor Profile */}
            <div className="p-4 rounded-2xl bg-[#FFF5E8] border border-[#30231D]/10">
              <span className="text-[10px] font-mono-tag font-bold text-[#B52A24] uppercase tracking-wider block mb-1">
                FLAVOUR PROFILE & PALATE EXPERIENCE
              </span>
              <p className="text-sm text-[#30231D] font-medium leading-relaxed">
                {product.flavorProfile}
              </p>
            </div>

            {/* Full Story Description */}
            <p className="text-sm text-[#30231D]/80 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Weight Picker */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-mono-tag">
                <span className="font-bold text-[#30231D] uppercase">SELECT PACKAGING SIZE</span>
                <span className="text-[#30231D]/60">Air-tight Glass Jar</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.weights.map((w) => {
                  const isSelected = selectedWeight === w.weight;
                  return (
                    <button
                      key={w.weight}
                      onClick={() => setSelectedWeight(w.weight)}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${isSelected
                          ? 'border-[#B52A24] bg-[#B52A24] text-white shadow-md shadow-[#B52A24]/20'
                          : 'border-[#30231D]/15 bg-white text-[#30231D] hover:bg-[#FFF5E8]'
                        }`}
                    >
                      <span className="block font-mono-tag text-xs font-bold">{w.weight}</span>
                      <span className="block font-display font-black text-base mt-0.5">
                        ₹{w.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Price */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#30231D]/10">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono-tag font-bold text-[#30231D] uppercase">
                  QUANTITY:
                </span>
                <div className="flex items-center border border-[#30231D]/20 rounded-full bg-[#FFF5E8] px-3 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#30231D] hover:text-[#B52A24]"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-mono-tag text-sm font-bold text-[#30231D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#30231D] hover:text-[#B52A24]"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-tag text-[#30231D]/50 uppercase block text-right">
                  TOTAL AMOUNT
                </span>
                <span className="font-display font-black text-3xl text-[#B52A24]">
                  ₹{totalPrice}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-display font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl ${addedAnimation
                    ? 'bg-[#536B35] text-white scale-98'
                    : 'bg-[#B52A24] hover:bg-[#8C1C17] text-white shadow-[#B52A24]/30'
                  }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={20} />
                    <span>JAR ADDED TO PANTRY!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>ADD TO CART • ₹{totalPrice}</span>
                  </>
                )}
              </button>

              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle size={17} />
                ORDER DIRECTLY VIA WHATSAPP
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Tabs: Ingredients, Aromas, Pairings, Storage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Ingredients list */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#30231D]/10 shadow-sm space-y-4">
            <h3 className="font-display font-black text-lg text-[#30231D] uppercase flex items-center gap-2">
              <Sun size={18} className="text-[#E6B94D]" /> INGREDIENTS
            </h3>
            <ul className="space-y-2 text-xs text-[#30231D]/80">
              {product.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B52A24]" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aroma notes & pairings */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#30231D]/10 shadow-sm space-y-4">
            <h3 className="font-display font-black text-lg text-[#30231D] uppercase flex items-center gap-2">
              <Utensils size={18} className="text-[#536B35]" /> MEAL PAIRINGS
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono-tag font-bold text-[#30231D]/50 uppercase block mb-1">
                  BEST SERVED WITH:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.pairingSuggestions.map((pair, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#FFF5E8] px-2.5 py-1 rounded-lg text-[#30231D] border border-[#30231D]/10"
                    >
                      {pair}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-tag font-bold text-[#30231D]/50 uppercase block mb-1">
                  AROMA NOTES:
                </span>
                <p className="text-xs text-[#30231D]/80">
                  {product.aromaNotes.join(' • ')}
                </p>
              </div>
            </div>
          </div>

          {/* Storage & Pantry Care */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#30231D]/10 shadow-sm space-y-4">
            <h3 className="font-display font-black text-lg text-[#30231D] uppercase flex items-center gap-2">
              <Clock size={18} className="text-[#B52A24]" /> STORAGE & CARE
            </h3>
            <p className="text-xs text-[#30231D]/80 leading-relaxed">
              {product.storageAdvice}
            </p>
            <div className="p-3 bg-[#FFFAF3] rounded-xl border border-[#30231D]/10 text-xs">
              <span className="font-bold text-[#30231D] block">Natural Preserving Tip:</span>
              <span className="text-[#30231D]/70">
                Always ensure the surface oil covers the ingredients. Never use a wet spoon.
              </span>
            </div>
          </div>
        </div>

        {/* Customer Reviews for this Pickle */}
        {productReviews.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl p-8 border border-[#30231D]/10 shadow-sm">
            <h3 className="font-display font-black text-xl text-[#30231D] uppercase mb-4">
              CUSTOMER THOUGHTS ON {product.name.toUpperCase()}
            </h3>
            <div className="space-y-4">
              {productReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-[#FFFAF3] rounded-2xl border border-[#30231D]/10">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-[#E6B94D] fill-[#E6B94D]" />
                    ))}
                    <span className="text-xs font-mono-tag font-bold text-[#30231D] ml-2">
                      {rev.author}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#30231D]/80 italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Pickles */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display font-black text-2xl text-[#30231D] uppercase mb-6">
              MORE {product.category === 'veg' ? 'VEGETARIAN' : 'NON-VEGETARIAN'} FLAVOURS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel.slug)}
                  className="bg-white rounded-3xl p-5 border border-[#30231D]/10 shadow-sm hover:shadow-xl transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <div className="w-16 h-20 flex items-center justify-center shrink-0">
                    <PickleJarVisual product={rel} size="sm" className="scale-75" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#30231D] group-hover:text-[#B52A24] transition-colors truncate">
                      {rel.name}
                    </h4>
                    <span className="text-xs font-mono-tag text-[#B52A24] font-bold">
                      from ₹{rel.weights[0].price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

