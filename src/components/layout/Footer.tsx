import React from 'react';
import { ArrowUp, Heart, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#30231D] text-[#FFF5E8] pt-16 pb-10 border-t border-[#30231D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E6B94D] bg-[#E6B94D] shadow-md">
                <img src="/she-pickle-logo.jpg" alt="SHE PICKLE Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-display text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  SHE PICKLE
                  <span className="w-2 h-2 rounded-full bg-[#B52A24] inline-block"></span>
                </span>
                <span className="block text-[10px] font-mono-tag tracking-widest uppercase text-[#E6B94D] font-bold">
                  A WOMEN&apos;S PRODUCT • 100% HOMEMADE
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FFF5E8]/70 leading-relaxed max-w-sm pt-2">
              Combining traditional homemade pickle culture with modern premium packaging. Slow-cooked in cold-pressed gingelly oil with zero artificial preservatives, zero added colors, and unmatched bold flavor.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B52A24] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="https://wa.me/917034513689"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#E6B94D]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF5E8]/80 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Shop All Pickles (11)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop-veg')} className="hover:text-white transition-colors">
                  Vegetarian Pickles (7)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop-non-veg')} className="hover:text-white transition-colors">
                  Non-Vegetarian Pickles (4)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  FAQ & Storage Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Support */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#E6B94D]">
              Care & Help
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF5E8]/80 font-medium">
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-white transition-colors">
                  Shipping & Safe Delivery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-white transition-colors">
                  Returns & Replacements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Wholesale & Bulk Gifting
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Editable placeholders as requested) */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#E6B94D]">
              Direct Kitchen
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF5E8]/80">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-[#E6B94D] shrink-0 mt-0.5" />
                <span>SHE PICKLE Kitchens, Kerala, India (Editable Address)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-[#E6B94D] shrink-0" />
                <span>+91 70345 13689</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[#E6B94D] shrink-0" />
                <span>connect@rushdaav.com</span>
              </li>
              <li className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-[#E6B94D]/15 text-[#E6B94D] font-mono-tag text-[10px] font-bold">
                  BATCH DISPATCH MON-SAT
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF5E8]/50">
          <p className="flex items-center gap-1 text-center sm:text-left">
            © {new Date().getFullYear()} SHE PICKLE. Crafted with <Heart size={12} className="text-[#B52A24] fill-[#B52A24]" /> by Women Artisans.
          </p>

          <div className="flex items-center gap-4">
            <span className="font-mono-tag text-[11px] text-[#E6B94D]">NO PRESERVATIVES • NO ARTIFICIAL COLOURS</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-[#B52A24] text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
