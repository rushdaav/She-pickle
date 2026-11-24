import React from 'react';
import { FaqSection } from '../components/home/FaqSection';
import { FAQS } from '../data/products';
import { ArrowLeft } from 'lucide-react';

interface FaqPageProps {
  onBack: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onBack }) => {
  return (
    <div className="pt-28 pb-12 bg-[#FFF5E8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono-tag font-bold text-[#30231D]/70 hover:text-[#B52A24] mb-4"
        >
          <ArrowLeft size={16} /> BACK
        </button>
      </div>
      <FaqSection faqs={FAQS} />
    </div>
  );
};

