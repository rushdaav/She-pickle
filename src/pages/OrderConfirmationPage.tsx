import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, ArrowRight, Printer } from 'lucide-react';

interface OrderConfirmationPageProps {
  orderData: any;
  onContinueShopping: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderData,
  onContinueShopping,
}) => {
  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B52A24', '#E6B94D', '#536B35', '#30231D'],
      });
    } catch {
      // safe fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!orderData) {
    return (
      <div className="pt-32 pb-20 bg-[#FFF5E8] min-h-screen text-center">
        <h2 className="font-display font-bold text-2xl text-[#30231D]">No recent order found</h2>
        <button
          onClick={onContinueShopping}
          className="mt-4 px-6 py-2.5 bg-[#B52A24] text-white rounded-full text-xs font-bold"
        >
          EXPLORE STORE
        </button>
      </div>
    );
  }

  const { orderId, date, customer, items, subtotal, discount, shipping, total, paymentMethod } =
    orderData;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppSupportUrl = () => {
    const text = `Hi SHE PICKLE! I just placed order *#${orderId}*. Could you share the courier tracking update when dispatched?`;
    return `https://wa.me/917034513689?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Celebration Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#30231D]/10 shadow-2xl text-center space-y-4 relative overflow-hidden mb-8">
          <div className="w-20 h-20 rounded-full bg-[#536B35]/15 text-[#536B35] flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={44} className="stroke-[2.5]" />
          </div>

          <span className="font-mono-tag text-xs font-bold text-[#536B35] tracking-widest uppercase block">
            ORDER CONFIRMED & RECEIVED
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#30231D] uppercase tracking-tight">
            THANK YOU, {customer.fullName.split(' ')[0].toUpperCase()}!
          </h1>

          <p className="text-sm text-[#30231D]/75 max-w-lg mx-auto leading-relaxed">
            Your homemade pickle jars are now queued for small-batch inspection and cushioned glass packaging. A confirmation receipt has been sent to <span className="font-bold text-[#30231D]">{customer.email}</span>.
          </p>

          <div className="inline-block p-3 rounded-2xl bg-[#FFF5E8] border border-[#30231D]/10 text-xs font-mono-tag mt-2">
            <span className="text-[#30231D]/60">ORDER ID: </span>
            <strong className="text-[#B52A24] font-black text-base">{orderId}</strong>
            <span className="mx-2 text-[#30231D]/30">•</span>
            <span className="text-[#30231D]/60">DATE: </span>
            <strong className="text-[#30231D] font-bold">{date}</strong>
          </div>
        </div>

        {/* Dispatch Timeline Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#30231D]/10 shadow-md mb-8">
          <h3 className="font-display font-bold text-sm text-[#30231D] uppercase tracking-wider mb-6">
            KITCHEN TO DOORSTEP JOURNEY
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
            <div className="space-y-1 relative">
              <span className="w-7 h-7 rounded-full bg-[#536B35] text-white flex items-center justify-center text-xs font-bold font-mono-tag">
                1
              </span>
              <h4 className="font-display font-bold text-xs text-[#30231D] pt-2">Order Queued</h4>
              <p className="text-[11px] text-[#30231D]/60">Payment acknowledged</p>
            </div>

            <div className="space-y-1 relative">
              <span className="w-7 h-7 rounded-full bg-[#E6B94D] text-[#30231D] flex items-center justify-center text-xs font-bold font-mono-tag">
                2
              </span>
              <h4 className="font-display font-bold text-xs text-[#30231D] pt-2">Batch Inspection</h4>
              <p className="text-[11px] text-[#30231D]/60">Curing & air seal check</p>
            </div>

            <div className="space-y-1 relative">
              <span className="w-7 h-7 rounded-full bg-[#30231D]/10 text-[#30231D]/60 flex items-center justify-center text-xs font-bold font-mono-tag">
                3
              </span>
              <h4 className="font-display font-bold text-xs text-[#30231D] pt-2">Glass Cushioning</h4>
              <p className="text-[11px] text-[#30231D]/60">Bubble wrap packaging</p>
            </div>

            <div className="space-y-1 relative">
              <span className="w-7 h-7 rounded-full bg-[#30231D]/10 text-[#30231D]/60 flex items-center justify-center text-xs font-bold font-mono-tag">
                4
              </span>
              <h4 className="font-display font-bold text-xs text-[#30231D] pt-2">Courier Delivery</h4>
              <p className="text-[11px] text-[#30231D]/60">Arriving to your doorstep</p>
            </div>
          </div>
        </div>

        {/* Invoice Summary Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#30231D]/10 shadow-md mb-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#30231D]/10">
            <h3 className="font-display font-black text-lg text-[#30231D] uppercase">
              ORDERED JARS BREAKDOWN
            </h3>
            <button
              onClick={handlePrint}
              className="text-xs font-mono-tag font-bold text-[#B52A24] hover:underline flex items-center gap-1.5"
            >
              <Printer size={15} /> PRINT RECEIPT
            </button>
          </div>

          <div className="divide-y divide-[#30231D]/10">
            {items.map((item: any) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#30231D] text-sm">{item.product.name}</h4>
                  <span className="text-[11px] font-mono-tag text-[#30231D]/60">
                    Weight: {item.selectedWeight} • Qty: {item.quantity}
                  </span>
                </div>
                <span className="font-mono-tag font-bold text-[#30231D] text-sm">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-[#30231D]/10 space-y-2 text-xs text-[#30231D]/80">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-[#30231D]">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#536B35]">
                <span>Coupon Savings</span>
                <span className="font-bold">-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-bold text-[#30231D]">
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode</span>
              <span className="font-mono-tag uppercase font-bold text-[#30231D]">
                {paymentMethod === 'razorpay'
                  ? 'Online UPI / NetBanking'
                  : paymentMethod === 'whatsapp'
                    ? 'WhatsApp Direct Coordination'
                    : 'Cash On Delivery'}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#30231D] pt-3 border-t border-[#30231D]/10">
              <span className="font-display">Total Amount Paid</span>
              <span className="text-[#B52A24] font-display text-2xl">₹{total}</span>
            </div>
          </div>

          {/* Delivery Address Snapshot */}
          <div className="p-4 rounded-2xl bg-[#FFF5E8] border border-[#30231D]/10 text-xs space-y-1">
            <span className="font-mono-tag font-bold text-[#30231D] uppercase block">
              DISPATCH DESTINATION:
            </span>
            <p className="text-[#30231D]/80 font-medium">
              {customer.fullName} • {customer.phone}
            </p>
            <p className="text-[#30231D]/70">
              {customer.address}, {customer.city}, {customer.state} - {customer.pincode}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppSupportUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle size={18} /> TRACK ORDER ON WHATSAPP
          </a>

          <button
            onClick={onContinueShopping}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#30231D] hover:bg-[#B52A24] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>CONTINUE SHOPPING</span> <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

