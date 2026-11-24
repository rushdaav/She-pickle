import React, { useState } from 'react';
import { ReviewItem } from '../../types';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';

interface CustomerReviewsProps {
  reviews: ReviewItem[];
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex] || reviews[0];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFAF3] border-b border-[#30231D]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-[#B52A24]">
            COMMUNITY APPETITE
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#30231D] uppercase tracking-tight">
            LOVE IN <br />
            <span className="text-[#B52A24]">EVERY JAR.</span>
          </h2>
          <p className="text-xs font-mono-tag text-[#30231D]/50 uppercase tracking-wider">
            [Sample Customer Testimonials • Replace with live customer feedback]
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-14 border border-[#30231D]/10 shadow-xl relative">
          {/* Large Decorative Quote Icon */}
          <div className="absolute top-6 right-8 text-[#E6B94D]/30 pointer-events-none">
            <Quote size={80} />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Rating Stars */}
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < current.rating
                      ? 'text-[#E6B94D] fill-[#E6B94D]'
                      : 'text-[#30231D]/20'
                  }
                />
              ))}
              <span className="ml-2 font-mono-tag text-xs font-bold text-[#30231D]">
                5.0 RATING
              </span>
            </div>

            {/* Review Quote */}
            <p className="font-serif-editorial text-xl sm:text-2xl md:text-3xl text-[#30231D] leading-snug italic">
              &ldquo;{current.review}&rdquo;
            </p>

            {/* Author details */}
            <div className="pt-4 border-t border-[#30231D]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-base text-[#30231D] flex items-center gap-1.5">
                  {current.author}
                  {current.verified && (
                    <CheckCircle2 size={16} className="text-[#536B35]" />
                  )}
                </h4>
                <p className="text-xs text-[#30231D]/60 font-mono-tag">
                  {current.location} • Verified Buyer
                </p>
              </div>

              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FFF5E8] border border-[#30231D]/10 text-xs font-mono-tag font-bold text-[#B52A24]">
                Loved: {current.pickleName}
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#30231D]/5">
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#B52A24]' : 'w-2 bg-[#30231D]/20'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full border border-[#30231D]/20 hover:bg-[#B52A24] hover:text-white hover:border-[#B52A24] text-[#30231D] flex items-center justify-center transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full border border-[#30231D]/20 hover:bg-[#B52A24] hover:text-white hover:border-[#B52A24] text-[#30231D] flex items-center justify-center transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

