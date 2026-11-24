import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PickleJarVisual } from '../jar/PickleJarVisual';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Check, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  onNavigateCheckout: () => void;
  onNavigateShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateCheckout, onNavigateShop }) => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
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

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  // WhatsApp Order message generator
  const getWhatsAppOrderUrl = () => {
    let msg = `*NEW ORDER - SHE PICKLE*\n\n`;
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.product.name}* (${item.selectedWeight}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    msg += `\n*Subtotal:* ₹${subtotal}`;
    if (discount > 0) msg += `\n*Discount (${appliedPromo}):* -₹${discount}`;
    msg += `\n*Shipping:* ${shippingFee === 0 ? 'FREE' : '₹' + shippingFee}`;
    msg += `\n*Grand Total:* ₹${total}`;
    msg += `\n\n_Please confirm my order and share delivery details!_`;

    return `https://wa.me/917034513689?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#30231D]/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF5E8] shadow-2xl flex flex-col border-l border-[#30231D]/15">
          {/* Header */}
          <div className="p-6 border-b border-[#30231D]/10 bg-[#FFFAF3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B52A24] text-white flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-[#30231D]">Your Pickle Pantry</h2>
                <p className="text-xs font-mono-tag text-[#30231D]/60">
                  {itemCount} {itemCount === 1 ? 'jar' : 'jars'} selected
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#30231D]/70 hover:text-[#B52A24] rounded-full hover:bg-[#30231D]/5 transition-colors"
              aria-label="Close cart"
            >
              <X size={22} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#536B35]/10 px-6 py-3 border-b border-[#536B35]/20">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs font-medium text-[#30231D]">
                Add <span className="font-bold text-[#B52A24]">₹{remainingForFreeShipping}</span> more for <span className="text-[#536B35] font-bold">FREE Doorstep Delivery</span>!
              </p>
            ) : (
              <p className="text-xs font-bold text-[#536B35] flex items-center gap-1.5">
                <Check size={14} className="stroke-[3]" /> You have unlocked FREE shipping across India!
              </p>
            )}
            <div className="w-full bg-[#30231D]/10 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#536B35] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-20 h-20 rounded-full bg-[#E6B94D]/20 flex items-center justify-center text-[#E6B94D] mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#30231D] mb-2">Your jar is empty!</h3>
                <p className="text-sm text-[#30231D]/70 mb-6 max-w-xs">
                  Nothing beats the craving of freshly cracked homemade pickles. Discover our 11 craft varieties!
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    onNavigateShop();
                  }}
                  className="bg-[#B52A24] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-[#8C1C17] transition-colors shadow-lg shadow-[#B52A24]/20 inline-flex items-center gap-2"
                >
                  EXPLORE OUR PICKLES <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#30231D]/10 shadow-sm flex gap-4 items-center"
                >
                  {/* Jar Thumbnail */}
                  <div className="w-16 h-20 bg-[#FFF5E8] rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-[#30231D]/5">
                    <PickleJarVisual product={item.product} size="sm" className="scale-75 origin-center" />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#30231D] truncate">
                          {item.product.name}
                        </h4>
                        <span className="inline-block px-2 py-0.5 text-[10px] font-mono-tag font-semibold rounded bg-[#30231D]/5 text-[#30231D]/80 mt-0.5">
                          {item.selectedWeight}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#30231D]/40 hover:text-[#B52A24] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#30231D]/20 rounded-full bg-[#FFF5E8] px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#30231D] p-1 hover:text-[#B52A24] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center font-mono-tag text-xs font-bold text-[#30231D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#30231D] p-1 hover:text-[#B52A24] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-display font-bold text-sm text-[#B52A24]">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#30231D]/10 bg-[#FFFAF3] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#30231D]/40" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Coupon: WELCOME10"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#30231D]/20 rounded-xl text-xs font-mono-tag uppercase placeholder:normal-case placeholder:text-[#30231D]/40 focus:outline-none focus:border-[#B52A24]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#30231D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#B52A24] transition-colors"
                >
                  APPLY
                </button>
              </form>

              {promoFeedback && (
                <p
                  className={`text-xs ${promoFeedback.success ? 'text-[#536B35] font-semibold' : 'text-[#B52A24]'
                    }`}
                >
                  {promoFeedback.message}
                </p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between bg-[#E6B94D]/20 px-3 py-1.5 rounded-lg text-xs font-mono-tag">
                  <span className="font-bold text-[#30231D]">Applied: {appliedPromo}</span>
                  <button onClick={removePromoCode} className="text-[#B52A24] underline hover:text-[#8C1C17]">
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculation Table */}
              <div className="space-y-1.5 text-xs text-[#30231D]/80 pt-2 border-t border-[#30231D]/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#30231D]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#536B35]">
                    <span>Discount</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-[#30231D]">
                    {shippingFee === 0 ? <span className="text-[#536B35]">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#30231D] pt-2 border-t border-[#30231D]/15">
                  <span className="font-display">Total</span>
                  <span className="text-[#B52A24] font-display text-lg">₹{total}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    closeCart();
                    onNavigateCheckout();
                  }}
                  className="w-full bg-[#B52A24] hover:bg-[#8C1C17] text-white py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#B52A24]/20 flex items-center justify-center gap-2 group"
                >
                  PROCEED TO SECURE CHECKOUT
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-full font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle size={16} />
                  ORDER INSTANTLY VIA WHATSAPP
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

