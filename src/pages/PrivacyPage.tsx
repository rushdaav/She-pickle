import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="pt-28 pb-20 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono-tag font-bold text-[#30231D]/70 hover:text-[#B52A24]"
        >
          <ArrowLeft size={16} /> BACK
        </button>

        <div className="space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            LEGAL & TRUST
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#30231D] uppercase">
            PRIVACY POLICY & TERMS
          </h1>
          <p className="text-xs font-mono-tag text-[#30231D]/60">
            Last Updated: November 2026 • SHE PICKLE Artisanal Foods
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#30231D]/10 shadow-lg space-y-6 text-xs sm:text-sm text-[#30231D]/80 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-display font-black text-base text-[#30231D] uppercase flex items-center gap-2">
              <Shield size={16} className="text-[#536B35]" /> 1. Data Collection & Usage
            </h3>
            <p>
              SHE PICKLE collects customer details (Name, Shipping Address, Phone Number, Email) solely for the purpose of packing, dispatching, and tracking your artisanal pickle orders. We never sell, rent, or trade customer contact details to third parties.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#30231D]/10">
            <h3 className="font-display font-black text-base text-[#30231D] uppercase">
              2. Payment Security
            </h3>
            <p>
              All online payments are processed through secure, bank-grade encrypted payment gateways compliant with PCI-DSS standards. SHE PICKLE does not store card numbers, CVVs, or bank login credentials on our servers.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#30231D]/10">
            <h3 className="font-display font-black text-base text-[#30231D] uppercase">
              3. Food Safety & Batch Labeling
            </h3>
            <p>
              Our homemade pickles are prepared adhering to hygienic food processing standards with pure ingredients. Due to natural spice variations and weather conditions, slight natural variations in oil colour or tartness may occur between batches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

