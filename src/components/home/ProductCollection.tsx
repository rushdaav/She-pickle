import React, { useState } from 'react';
import { PickleProduct, ProductCategory } from '../../types';
import { PickleJarVisual } from '../jar/PickleJarVisual';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Eye, Flame, Check } from 'lucide-react';

interface ProductCollectionProps {
  products: PickleProduct[];
  onSelectProduct: (slug: string) => void;
  initialFilter?: 'all' | ProductCategory;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  products,
  onSelectProduct,
  initialFilter = 'all',
}) => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<'all' | ProductCategory>(initialFilter);
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  const getSelectedWeight = (productId: string) => {
    return selectedWeights[productId] || '250g';
  };

  const handleSelectWeight = (productId: string, weight: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleQuickAdd = (product: PickleProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const weight = getSelectedWeight(product.id);
    addToCart(product, weight, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFF5E8] border-b border-[#30231D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
              ARTISANAL SHELF
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#30231D] uppercase tracking-tight">
              THE COMPLETE <br />
              COLLECTION.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white/70 p-1.5 rounded-full border border-[#30231D]/10 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono-tag transition-all ${
                filter === 'all'
                  ? 'bg-[#30231D] text-white shadow-sm'
                  : 'text-[#30231D]/70 hover:text-[#B52A24]'
              }`}
            >
              ALL PICKLES ({products.length})
            </button>
            <button
              onClick={() => setFilter('veg')}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono-tag transition-all ${
                filter === 'veg'
                  ? 'bg-[#536B35] text-white shadow-sm'
                  : 'text-[#30231D]/70 hover:text-[#536B35]'
              }`}
            >
              VEGETARIAN (7)
            </button>
            <button
              onClick={() => setFilter('non-veg')}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono-tag transition-all ${
                filter === 'non-veg'
                  ? 'bg-[#B52A24] text-white shadow-sm'
                  : 'text-[#30231D]/70 hover:text-[#B52A24]'
              }`}
            >
              NON-VEGETARIAN (4)
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const currentWeight = getSelectedWeight(product.id);
            const weightOption =
              product.weights.find((w) => w.weight === currentWeight) || product.weights[0];
            const isAdded = !!addedIds[product.id];

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.slug)}
                className="group bg-white rounded-3xl p-5 border border-[#30231D]/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                <div>
                  {/* Top Badges (Number + Veg/NonVeg) */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-tag text-xs font-black text-[#30231D]/30 group-hover:text-[#B52A24] transition-colors">
                      #{product.number}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold uppercase tracking-wider ${
                        product.category === 'veg'
                          ? 'bg-[#536B35]/10 text-[#536B35]'
                          : 'bg-[#B52A24]/10 text-[#B52A24]'
                      }`}
                    >
                      {product.category === 'veg' ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>

                  {/* Jar Presentation Stage */}
                  <div className="h-60 bg-[#FFFAF3] rounded-2xl flex items-center justify-center relative overflow-hidden my-3 border border-[#30231D]/5 group-hover:bg-[#FFF5E8] transition-colors">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      <PickleJarVisual product={product} size="md" />
                    </div>

                    {/* Quick View Hover Pill */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-white shadow-md text-[#30231D] flex items-center justify-center hover:bg-[#B52A24] hover:text-white transition-colors">
                        <Eye size={15} />
                      </div>
                    </div>
                  </div>

                  {/* Product Title & Spice Indicator */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-display font-black text-lg text-[#30231D] tracking-tight group-hover:text-[#B52A24] transition-colors truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center shrink-0">
                        <Flame size={14} className="text-[#B52A24] fill-[#B52A24]" />
                        <span className="text-[10px] font-mono-tag font-bold text-[#30231D]/70 ml-0.5">
                          {product.spiceLevel}/5
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#30231D]/65 line-clamp-2 mt-1 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Weight Selector Pills */}
                  <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#30231D]/10">
                    <span className="text-[10px] font-mono-tag text-[#30231D]/50 uppercase">
                      SIZE:
                    </span>
                    {product.weights.map((w) => {
                      const isSelected = currentWeight === w.weight;
                      return (
                        <button
                          key={w.weight}
                          onClick={(e) => handleSelectWeight(product.id, w.weight, e)}
                          className={`text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded-md transition-colors ${
                            isSelected
                              ? 'bg-[#30231D] text-white'
                              : 'bg-[#FFF5E8] text-[#30231D]/70 hover:bg-[#30231D]/10'
                          }`}
                        >
                          {w.weight}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price & Add to Cart Footer */}
                <div className="mt-5 pt-3 border-t border-[#30231D]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono-tag text-[#30231D]/50 uppercase block">
                      PRICE ({currentWeight})
                    </span>
                    <span className="font-display font-black text-xl text-[#30231D]">
                      ₹{weightOption.price}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`px-4 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md ${
                      isAdded
                        ? 'bg-[#536B35] text-white'
                        : 'bg-[#B52A24] hover:bg-[#8C1C17] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>ADDED</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>ADD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

