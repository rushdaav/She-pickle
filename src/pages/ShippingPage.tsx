import React from 'react';
import { Truck, ShieldCheck, RefreshCw, ArrowLeft, PackageCheck } from 'lucide-react';

interface ShippingPageProps {
  onBack: () => void;
}

export const ShippingPage: React.FC<ShippingPageProps> = ({ onBack }) => {
  return (
    <div className="pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono-tag font-bold text-[#30231D]/70 hover:text-[#B52A24]"
        >
          <ArrowLeft size={16} /> BACK
        </button>

        <div className="space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            POLICIES & SAFETY
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#30231D] uppercase">
            SHIPPING & RETURNS
          </h1>
          <p className="text-sm text-[#30231D]/75">
            How we protect your glass jars during transit and ensure seamless doorstep delivery across India.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#30231D]/10 shadow-lg space-y-8 text-xs sm:text-sm text-[#30231D]/80 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-display font-black text-lg text-[#30231D] uppercase flex items-center gap-2">
              <PackageCheck size={20} className="text-[#536B35]" /> 1. Heavy-Duty Glass Packaging
            </h3>
            <p>
              Every SHE PICKLE glass jar is vacuum-sealed with a tamper-evident band and fitted into customized air-column bubble sleeves designed specifically for food glass packaging. The exterior carton is double-walled and taped with fragile-hazard indicators.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#30231D]/10">
            <h3 className="font-display font-black text-lg text-[#30231D] uppercase flex items-center gap-2">
              <Truck size={20} className="text-[#B52A24]" /> 2. Delivery Timelines & Charges
            </h3>
            <p>
              • <strong>Processing:</strong> Orders placed before 1:00 PM IST are freshly packed and dispatched within 24 hours (Monday to Saturday).
            </p>
            <p>
              • <strong>Transit Speed:</strong> Major metropolitan cities receive deliveries within 2 to 4 business days. Regional and interior destinations typically take 4 to 6 business days.
            </p>
            <p>
              • <strong>Shipping Fee:</strong> A flat shipping charge of ₹60 is applied on orders below ₹699. All orders of ₹699 and above qualify for <strong>FREE Doorstep Delivery</strong> across India.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#30231D]/10">
            <h3 className="font-display font-black text-lg text-[#30231D] uppercase flex items-center gap-2">
              <RefreshCw size={20} className="text-[#E6B94D]" /> 3. Damage Replacement Guarantee
            </h3>
            <p>
              Due to the perishable food nature of pickles, we do not accept general product returns once delivered. However, if your glass jar arrives broken, damaged, or unsealed during courier transit, we will immediately send a <strong>FREE replacement jar</strong> or issue a complete refund.
            </p>
            <p className="bg-[#FFF5E8] p-4 rounded-xl border border-[#30231D]/10 text-xs">
              <strong>How to report:</strong> Simply send a photo of the damaged package and your Order ID to our WhatsApp (+91 70345 13689) or email hello@shepickle.com within 48 hours of delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

