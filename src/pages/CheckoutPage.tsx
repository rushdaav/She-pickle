import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PickleJarVisual } from '../components/jar/PickleJarVisual';
import {
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface CheckoutPageProps {
  onBackToCart: () => void;
  onOrderSuccess: (orderData: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToCart, onOrderSuccess }) => {
  const { items, subtotal, shippingFee, discount, total, appliedPromo, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Kerala',
    pincode: '',
    notes: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'whatsapp' | 'cod'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const expressFee = deliveryMethod === 'express' ? 50 : 0;
  const finalPayable = total + expressFee;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required for tracking';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City / Town is required';
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Valid 6-digit postal PIN code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    const orderId = `SHE-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      customer: formData,
      items: [...items],
      subtotal,
      discount,
      appliedPromo,
      shipping: shippingFee + expressFee,
      total: finalPayable,
      paymentMethod,
    };

    if (paymentMethod === 'whatsapp') {
      let msg = `*NEW WHATSAPP DIRECT ORDER: #${orderId}*\n\n`;
      msg += `*Customer:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n`;
      msg += `*ITEMS:*\n`;
      items.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.product.name} (${item.selectedWeight}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
      });
      msg += `\n*Total Payable:* ₹${finalPayable}\n*Delivery:* ${deliveryMethod.toUpperCase()}\n\nPlease confirm dispatch!`;

      const waUrl = `https://wa.me/917034513689?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');

      setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        onOrderSuccess(orderDetails);
      }, 1000);
      return;
    }

    // Razorpay / Online Payment Simulation
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      onOrderSuccess(orderDetails);
    }, 1800);
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 bg-[#FFF5E8] min-h-screen text-center">
        <h2 className="font-display font-bold text-2xl text-[#30231D] mb-4">
          Your cart is currently empty
        </h2>
        <button
          onClick={onBackToCart}
          className="px-6 py-2.5 bg-[#B52A24] text-white rounded-full text-xs font-bold"
        >
          RETURN TO SHOP
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Back */}
        <button
          onClick={onBackToCart}
          className="inline-flex items-center gap-2 text-xs font-mono-tag font-bold text-[#30231D]/70 hover:text-[#B52A24] mb-8"
        >
          <ArrowLeft size={16} /> BACK TO PANTRY CART
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Customer Information & Delivery Address Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#30231D]/10 shadow-lg space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6B94D]/25 text-xs font-mono-tag font-bold text-[#30231D] mb-2">
                <Lock size={12} className="text-[#536B35]" /> 256-BIT ENCRYPTED CHECKOUT
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#30231D] uppercase">
                DELIVERY DETAILS
              </h1>
              <p className="text-xs text-[#30231D]/65 mt-1">
                Enter your exact shipping destination for safe cushioned glass jar packaging.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-6">
              {/* Customer Contact */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[#30231D] border-b border-[#30231D]/10 pb-2">
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ayesha Rahman"
                      className={`w-full px-4 py-2.5 bg-[#FFF5E8] border rounded-xl text-xs text-[#30231D] focus:outline-none ${
                        errors.fullName ? 'border-[#B52A24]' : 'border-[#30231D]/15 focus:border-[#B52A24]'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-[#B52A24] mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      Phone Number (for Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-4 py-2.5 bg-[#FFF5E8] border rounded-xl text-xs text-[#30231D] focus:outline-none ${
                        errors.phone ? 'border-[#B52A24]' : 'border-[#30231D]/15 focus:border-[#B52A24]'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-[#B52A24] mt-1 block">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                    Email Address (for Order Invoice & Tracking) *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ayesha@example.com"
                    className={`w-full px-4 py-2.5 bg-[#FFF5E8] border rounded-xl text-xs text-[#30231D] focus:outline-none ${
                      errors.email ? 'border-[#B52A24]' : 'border-[#30231D]/15 focus:border-[#B52A24]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-[#B52A24] mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4 pt-2">
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[#30231D] border-b border-[#30231D]/10 pb-2">
                  2. Shipping Address
                </h3>

                <div>
                  <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                    House / Flat No., Building & Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Villa 12, Coconut Grove Lane, Panampilly Nagar"
                    className={`w-full px-4 py-2.5 bg-[#FFF5E8] border rounded-xl text-xs text-[#30231D] focus:outline-none ${
                      errors.address ? 'border-[#B52A24]' : 'border-[#30231D]/15 focus:border-[#B52A24]'
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[10px] text-[#B52A24] mt-1 block">{errors.address}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Kochi"
                      className={`w-full px-4 py-2.5 bg-[#FFF5E8] border rounded-xl text-xs text-[#30231D] focus:outline-none ${
                        errors.city ? 'border-[#B52A24]' : 'border-[#30231D]/15 focus:border-[#B52A24]'
                      }`}
                    />
                    {errors.city && (
                      <span className="text-[10px] text-[#B52A24] mt-1 block">{errors.city}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      State *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs text-[#30231D] focus:outline-none focus:border-[#B52A24]"
                    >
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Other Indian State">Other Indian State</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="682036"
                      className={`w-full px-4 py-2.5 bg-[#FFF5E8] border rounded-xl text-xs text-[#30231D] focus:outline-none ${
                        errors.pincode ? 'border-[#B52A24]' : 'border-[#30231D]/15 focus:border-[#B52A24]'
                      }`}
                    />
                    {errors.pincode && (
                      <span className="text-[10px] text-[#B52A24] mt-1 block">{errors.pincode}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tag font-bold text-[#30231D] mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Leave with security / Call upon arrival"
                    className="w-full px-4 py-2 bg-[#FFF5E8] border border-[#30231D]/15 rounded-xl text-xs text-[#30231D] focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[#30231D] border-b border-[#30231D]/10 pb-2">
                  3. Shipping Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-[#536B35] bg-[#536B35]/5 shadow-sm'
                        : 'border-[#30231D]/10 bg-white hover:bg-[#FFF5E8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-xs text-[#30231D] flex items-center gap-1.5">
                        <Truck size={14} className="text-[#536B35]" /> Standard Safe Transit
                      </span>
                      <span className="font-mono-tag text-xs font-bold text-[#536B35]">
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#30231D]/60">3 - 5 business days delivery</p>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-[#B52A24] bg-[#B52A24]/5 shadow-sm'
                        : 'border-[#30231D]/10 bg-white hover:bg-[#FFF5E8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-xs text-[#30231D] flex items-center gap-1.5">
                        <Truck size={14} className="text-[#B52A24]" /> Express Air Priority
                      </span>
                      <span className="font-mono-tag text-xs font-bold text-[#B52A24]">
                        ₹{shippingFee + 50}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#30231D]/60">1 - 2 business days dispatch</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[#30231D] border-b border-[#30231D]/10 pb-2">
                  4. Payment Mode
                </h3>

                <div className="space-y-2.5">
                  <div
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#B52A24] bg-[#B52A24]/5 shadow-sm'
                        : 'border-[#30231D]/10 bg-white hover:bg-[#FFF5E8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} className="text-[#B52A24]" />
                      <div>
                        <span className="font-display font-bold text-xs text-[#30231D] block">
                          Instant UPI / Cards / NetBanking (Razorpay Architecture)
                        </span>
                        <span className="text-[10px] text-[#30231D]/60">
                          Google Pay, PhonePe, Paytm, All Major Cards
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'razorpay' && <CheckCircle2 size={18} className="text-[#B52A24]" />}
                  </div>

                  <div
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'whatsapp'
                        ? 'border-[#25D366] bg-[#25D366]/5 shadow-sm'
                        : 'border-[#30231D]/10 bg-white hover:bg-[#FFF5E8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} className="text-[#25D366]" />
                      <div>
                        <span className="font-display font-bold text-xs text-[#30231D] block">
                          Order Directly via WhatsApp
                        </span>
                        <span className="text-[10px] text-[#30231D]/60">
                          Connect with kitchen coordinator for custom assistance
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'whatsapp' && <CheckCircle2 size={18} className="text-[#25D366]" />}
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-[#30231D] bg-[#30231D]/5 shadow-sm'
                        : 'border-[#30231D]/10 bg-white hover:bg-[#FFF5E8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={20} className="text-[#536B35]" />
                      <div>
                        <span className="font-display font-bold text-xs text-[#30231D] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[10px] text-[#30231D]/60">
                          Pay cash or UPI upon doorstep parcel receipt
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 size={18} className="text-[#30231D]" />}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary & Place Order Action */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#30231D]/10 shadow-lg space-y-6 sticky top-28">
            <h2 className="font-display font-black text-xl text-[#30231D] uppercase">
              JAR SUMMARY ({items.length})
            </h2>

            {/* Item Thumbnails */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-12 bg-[#FFF5E8] rounded-lg flex items-center justify-center p-1 shrink-0 border border-[#30231D]/10">
                      <PickleJarVisual product={item.product} size="sm" className="scale-50" />
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-[#30231D] block truncate">{item.product.name}</span>
                      <span className="text-[10px] font-mono-tag text-[#30231D]/60">
                        {item.selectedWeight} x {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono-tag font-bold text-[#30231D] shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-[#30231D]/80 pt-4 border-t border-[#30231D]/10">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#30231D]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#536B35]">
                  <span>Coupon Savings ({appliedPromo})</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Packaging & Doorstep Delivery</span>
                <span className="font-bold text-[#30231D]">
                  {shippingFee === 0 ? <span className="text-[#536B35]">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              {expressFee > 0 && (
                <div className="flex justify-between text-[#B52A24]">
                  <span>Express Priority Upgrade</span>
                  <span className="font-bold">+₹{expressFee}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-[#30231D] pt-3 border-t border-[#30231D]/10">
                <span className="font-display">Total Payable</span>
                <span className="text-[#B52A24] font-display text-2xl">₹{finalPayable}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 bg-[#B52A24] hover:bg-[#8C1C17] text-white rounded-full font-display font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#B52A24]/20 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? (
                  <span className="animate-pulse">PROCESSING YOUR ARTISANAL JARS...</span>
                ) : paymentMethod === 'whatsapp' ? (
                  <>
                    <MessageCircle size={18} />
                    <span>CONFIRM & SEND ON WHATSAPP • ₹{finalPayable}</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>PAY NOW SECURELY • ₹{finalPayable}</span>
                  </>
                )}
              </button>

              <div className="p-3 bg-[#FFFAF3] rounded-2xl border border-[#30231D]/10 text-[11px] text-[#30231D]/70 space-y-1">
                <p className="flex items-center gap-1.5 font-bold text-[#30231D]">
                  <ShieldCheck size={14} className="text-[#536B35]" /> Safe Transit Guarantee:
                </p>
                <p>
                  Every jar is padded with bubble-air cushions and tamper-evident heat seals. Any in-transit damage is instantly replaced free of cost!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

