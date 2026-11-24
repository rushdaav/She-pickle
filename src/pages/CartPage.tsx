import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PickleJarVisual } from '../components/jar/PickleJarVisual';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ArrowLeft, MessageCircle } from 'lucide-react';

interface CartPageProps {
  onNavigateShop: () => void;
  onNavigateCheckout: () => void;
  onSelectProduct: (slug: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateShop,
  onNavigateCheckout,
  onSelectProduct,
}) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    shippingFee,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    total,
    freeShippingThreshold,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyPromoCode(couponCode);
    setFeedback(res);
    if (res.success) setCouponCode('');
  };

  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#30231D]/10">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-[#30231D] uppercase">
              SHOPPING PANTRY
            </h1>
            <p className="text-xs font-mono-tag text-[#30231D]/60 mt-1">
              {itemCount} {itemCount === 1 ? 'jar' : 'jars'} selected for dispatch
            </p>
          </div>

          <button
            onClick={onNavigateShop}
            className="text-xs font-mono-tag font-bold text-[#B52A24] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft size={16} /> ADD MORE PICKLES
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#30231D]/10 max-w-lg mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#E6B94D]/20 text-[#E6B94D] mx-auto flex items-center justify-center mb-6">
              <ShoppingBag size={40} />
            </div>
            <h2 className="font-display font-black text-2xl text-[#30231D] mb-2 uppercase">
              YOUR PANTRY IS EMPTY!
            </h2>
            <p className="text-sm text-[#30231D]/70 mb-8 leading-relaxed">
              Experience the bold flavours of authentic homemade pickles. Slow-cooked in cold-pressed oil with zero preservatives.
            </p>
            <button
              onClick={onNavigateShop}
              className="px-8 py-4 bg-[#B52A24] hover:bg-[#8C1C17] text-white rounded-full font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#B52A24]/20 inline-flex items-center gap-2"
            >
              EXPLORE OUR 11 PICKLES <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping banner */}
              <div className="bg-[#536B35]/15 border border-[#536B35]/25 rounded-2xl p-4 flex items-center justify-between text-xs font-mono-tag">
                {remainingForFreeShip > 0 ? (
                  <span>
                    Add <strong className="text-[#B52A24]">₹{remainingForFreeShip}</strong> more to unlock <strong className="text-[#536B35]">FREE Delivery</strong>!
                  </span>
                ) : (
                  <span className="font-bold text-[#536B35]">
                    🎉 You have unlocked FREE Doorstep Delivery!
                  </span>
                )}
                <span className="text-[#30231D]/60 hidden sm:inline">Pan-India Courier</span>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl p-6 border border-[#30231D]/10 shadow-sm divide-y divide-[#30231D]/10">
                {items.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex items-center gap-4 sm:gap-6">
                    {/* Visual */}
                    <div
                      onClick={() => onSelectProduct(item.product.slug)}
                      className="w-20 h-24 bg-[#FFF5E8] rounded-2xl flex items-center justify-center p-2 cursor-pointer hover:bg-[#FFFAF3] border border-[#30231D]/5 shrink-0"
                    >
                      <PickleJarVisual product={item.product} size="sm" className="scale-75" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            onClick={() => onSelectProduct(item.product.slug)}
                            className="font-display font-bold text-base text-[#30231D] hover:text-[#B52A24] cursor-pointer truncate"
                          >
                            {item.product.name}
                          </h3>
                          <span className="inline-block mt-0.5 text-[11px] font-mono-tag px-2 py-0.5 rounded bg-[#30231D]/5 text-[#30231D]/75 font-semibold">
                            {item.selectedWeight} • {item.product.category === 'veg' ? 'Veg' : 'Non-Veg'}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#30231D]/40 hover:text-[#B52A24] p-1.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#30231D]/20 rounded-full bg-[#FFF5E8] px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#30231D] hover:text-[#B52A24]"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center font-mono-tag text-xs font-bold text-[#30231D]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#30231D] hover:text-[#B52A24]"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono-tag text-[#30231D]/50 block text-right">
                            ₹{item.price} each
                          </span>
                          <span className="font-display font-bold text-base text-[#B52A24]">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs font-mono-tag pt-2">
                <button
                  onClick={clearCart}
                  className="text-[#30231D]/60 hover:text-[#B52A24] underline"
                >
                  Clear all items
                </button>
                <span className="text-[#30231D]/60">Prices inclusive of all taxes</span>
              </div>
            </div>

            {/* Order Summary & Checkout Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#30231D]/10 shadow-lg space-y-6">
              <h2 className="font-display font-black text-xl text-[#30231D] uppercase">
                ORDER SUMMARY
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#30231D]/40" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon: WELCOME10"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs font-mono-tag uppercase placeholder:normal-case placeholder:text-[#30231D]/40 focus:outline-none focus:border-[#B52A24]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#30231D] text-white rounded-xl text-xs font-bold hover:bg-[#B52A24] transition-colors"
                  >
                    APPLY
                  </button>
                </div>

                {feedback && (
                  <p
                    className={`text-xs ${
                      feedback.success ? 'text-[#536B35] font-semibold' : 'text-[#B52A24]'
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between bg-[#E6B94D]/20 px-3 py-1.5 rounded-lg text-xs font-mono-tag">
                    <span className="font-bold text-[#30231D]">Applied: {appliedPromo}</span>
                    <button onClick={removePromoCode} className="text-[#B52A24] underline">
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Breakdown */}
              <div className="space-y-3 text-xs text-[#30231D]/80 pt-4 border-t border-[#30231D]/10">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} jars)</span>
                  <span className="font-bold text-[#30231D]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#536B35]">
                    <span>Coupon Discount</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-[#30231D]">
                    {shippingFee === 0 ? <span className="text-[#536B35]">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#30231D] pt-3 border-t border-[#30231D]/10">
                  <span className="font-display">Total Amount</span>
                  <span className="text-[#B52A24] font-display text-2xl">₹{total}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={onNavigateCheckout}
                  className="w-full py-4 bg-[#B52A24] hover:bg-[#8C1C17] text-white rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#B52A24]/20 flex items-center justify-center gap-2 group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-[#30231D]/60">
                  Safe glass packaging guaranteed against transit breakages.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

