import React, { useState } from 'react';
import { FaqItem } from '../../types';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Products', 'Ingredients', 'Ordering & Shipping', 'Storage'];

  const filteredFaqs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFF5E8] border-b border-[#30231D]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            CLARITY & CARE
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#30231D] uppercase tracking-tight">
            FREQUENTLY ASKED <br />
            <span className="text-[#B52A24]">QUESTIONS.</span>
          </h2>
          <p className="text-sm text-[#30231D]/75">
            Everything you need to know about our homemade ingredients, pantry storage, and door-to-door delivery.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tag font-bold transition-all ${selectedCategory === cat
                  ? 'bg-[#30231D] text-white shadow-sm'
                  : 'bg-white/80 border border-[#30231D]/10 text-[#30231D]/70 hover:bg-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#30231D]/10 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#30231D]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FFF5E8] flex items-center justify-center text-[#30231D] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#B52A24] text-white' : ''
                      }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#30231D]/75 leading-relaxed border-t border-[#30231D]/5 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-mono-tag font-semibold bg-[#30231D]/5 text-[#30231D]/60">
                      CATEGORY: {faq.category.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-white/60 border border-[#30231D]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#E6B94D]/30 flex items-center justify-center text-[#30231D]">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#30231D]">Have another question?</h4>
              <p className="text-xs text-[#30231D]/60">We are happy to chat and answer special dietary queries!</p>
            </div>
          </div>

          <a
            href="https://wa.me/917034513689?text=Hi%20SHE%20PICKLE%2C%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold font-mono-tag tracking-wider flex items-center gap-2 shadow-sm transition-colors"
          >
            <MessageCircle size={15} /> CHAT ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
};

