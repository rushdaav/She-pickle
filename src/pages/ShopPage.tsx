import React, { useState, useMemo } from 'react';
import { PickleProduct, ProductCategory } from '../types';
import { PickleJarVisual } from '../components/jar/PickleJarVisual';
import { useCart } from '../context/CartContext';
import { Search, Flame, ShoppingBag, Eye, Check } from 'lucide-react';

interface ShopPageProps {
  products: PickleProduct[];
  categoryFilter?: 'all' | ProductCategory;
  onSelectProduct: (slug: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  categoryFilter = 'all',
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | ProductCategory>(categoryFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'spice'>('featured');
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat = activeTab === 'all' || p.category === activeTab;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.weights[0].price - b.weights[0].price;
        if (sortBy === 'price-desc') return b.weights[0].price - a.weights[0].price;
        if (sortBy === 'spice') return b.spiceLevel - a.spiceLevel;
        return 0; // default order
      });
  }, [products, activeTab, searchQuery, sortBy]);

  const getWeight = (id: string) => selectedWeights[id] || '250g';

  const handleSelectWeight = (id: string, weight: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedWeights((prev) => ({ ...prev, [id]: weight }));
  };

  const handleQuickAdd = (product: PickleProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const weight = getWeight(product.id);
    addToCart(product, weight, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            AUTHENTIC SMALL BATCH STORE
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-[#30231D] uppercase tracking-tight">
            EXPLORE ALL <br />
            <span className="text-[#B52A24]">11 CRAFT RECIPES.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#30231D]/75">
            Slow-cooked in cold-pressed gingelly oil with zero artificial preservatives or colors.
            Pick your favourite weight and enjoy fresh doorstep delivery.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#30231D]/10 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-[#FFF5E8] p-1.5 rounded-full border border-[#30231D]/10 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono-tag font-bold transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#30231D] text-white shadow-sm'
                  : 'text-[#30231D]/70 hover:text-[#B52A24]'
              }`}
            >
              ALL ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('veg')}
              className={`px-4 py-2 rounded-full text-xs font-mono-tag font-bold transition-all whitespace-nowrap ${
                activeTab === 'veg'
                  ? 'bg-[#536B35] text-white shadow-sm'
                  : 'text-[#30231D]/70 hover:text-[#536B35]'
              }`}
            >
              VEGETARIAN (7)
            </button>
            <button
              onClick={() => setActiveTab('non-veg')}
              className={`px-4 py-2 rounded-full text-xs font-mono-tag font-bold transition-all whitespace-nowrap ${
                activeTab === 'non-veg'
                  ? 'bg-[#B52A24] text-white shadow-sm'
                  : 'text-[#30231D]/70 hover:text-[#B52A24]'
              }`}
            >
              NON-VEG (4)
            </button>
          </div>

          {/* Search Input & Sort Options */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search input */}
            <div className="relative w-full sm:w-60">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#30231D]/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mango, beef, lemon..."
                className="w-full pl-9 pr-3 py-2 bg-[#FFF5E8] border border-[#30231D]/15 rounded-full text-xs font-mono-tag placeholder:text-[#30231D]/40 focus:outline-none focus:border-[#B52A24]"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2 bg-[#FFF5E8] border border-[#30231D]/15 rounded-full text-xs font-mono-tag font-semibold text-[#30231D] focus:outline-none focus:border-[#B52A24]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="spice">Spice: Highest First</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono-tag text-[#30231D]/60">
          <span>SHOWING {filtered.length} OF {products.length} PICKLES</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#B52A24] underline hover:text-[#8C1C17]"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#30231D]/10 max-w-md mx-auto">
            <h3 className="font-display font-bold text-xl text-[#30231D] mb-2">No pickles found</h3>
            <p className="text-xs text-[#30231D]/70 mb-4">
              Try searching for different ingredients like mango, beef, ginger, dates or prawns.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-6 py-2.5 bg-[#B52A24] text-white rounded-full text-xs font-bold uppercase"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const currentWeight = getWeight(product.id);
              const weightOpt =
                product.weights.find((w) => w.weight === currentWeight) || product.weights[0];
              const isAdded = !!addedIds[product.id];

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product.slug)}
                  className="group bg-white rounded-3xl p-5 border border-[#30231D]/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Header */}
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

                    {/* Jar Preview Stage */}
                    <div className="h-60 bg-[#FFFAF3] rounded-2xl flex items-center justify-center relative overflow-hidden my-3 border border-[#30231D]/5 group-hover:bg-[#FFF5E8] transition-colors">
                      <div className="transition-transform duration-500 group-hover:scale-110">
                        <PickleJarVisual product={product} size="md" />
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-white shadow-md text-[#30231D] flex items-center justify-center hover:bg-[#B52A24] hover:text-white transition-colors">
                          <Eye size={15} />
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-display font-black text-lg text-[#30231D] tracking-tight truncate group-hover:text-[#B52A24] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center shrink-0">
                          <Flame size={14} className="text-[#B52A24] fill-[#B52A24]" />
                          <span className="text-[10px] font-mono-tag font-bold text-[#30231D]/70 ml-0.5">
                            {product.spiceLevel}/5
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#30231D]/65 line-clamp-2 mt-1">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Weight options */}
                    <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#30231D]/10">
                      <span className="text-[10px] font-mono-tag text-[#30231D]/50 uppercase">
                        SIZE:
                      </span>
                      {product.weights.map((w) => (
                        <button
                          key={w.weight}
                          onClick={(e) => handleSelectWeight(product.id, w.weight, e)}
                          className={`text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded-md transition-colors ${
                            currentWeight === w.weight
                              ? 'bg-[#30231D] text-white'
                              : 'bg-[#FFF5E8] text-[#30231D]/70 hover:bg-[#30231D]/10'
                          }`}
                        >
                          {w.weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add Footer */}
                  <div className="mt-5 pt-3 border-t border-[#30231D]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono-tag text-[#30231D]/50 uppercase block">
                        PRICE ({currentWeight})
                      </span>
                      <span className="font-display font-black text-xl text-[#30231D]">
                        ₹{weightOpt.price}
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
        )}
      </div>
    </div>
  );
};

