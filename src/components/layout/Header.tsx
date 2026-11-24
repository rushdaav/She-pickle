import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const { openCart, itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Shop All', route: 'shop' },
    { label: 'Veg Pickles', route: 'shop-veg' },
    { label: 'Non-Veg Pickles', route: 'shop-non-veg' },
    { label: 'Our Story', route: 'story' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFF5E8]/85 backdrop-blur-md shadow-sm py-3 border-b border-[#30231D]/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand with Official Badge */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#E6B94D] bg-[#E6B94D] shadow-md group-hover:scale-105 transition-transform duration-300">
              <img
                src="/she-pickle-logo.jpg"
                alt="SHE PICKLE Official Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to stylized SVG emblem if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#30231D] group-hover:text-[#B52A24] transition-colors leading-none flex items-center gap-1.5">
                SHE PICKLE
                <span className="w-2 h-2 rounded-full bg-[#B52A24] inline-block"></span>
              </span>
              <span className="block text-[9px] font-mono-tag tracking-wider uppercase text-[#30231D]/70 font-semibold">
                A WOMEN&apos;S PRODUCT • HOMEMADE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#30231D]/10 shadow-sm">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNav(link.route)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#30231D] text-white shadow-sm'
                      : 'text-[#30231D]/80 hover:text-[#B52A24] hover:bg-[#FFF5E8]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Order & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNav('shop')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#FFF5E8] bg-[#B52A24] hover:bg-[#8C1C17] transition-all shadow-md shadow-[#B52A24]/20"
            >
              ORDER ONLINE <ArrowUpRight size={14} />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 sm:px-4 sm:py-2 rounded-full bg-[#30231D] text-white hover:bg-[#B52A24] transition-colors flex items-center gap-2 shadow-md"
              aria-label="View shopping cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline font-mono-tag text-xs font-bold">
                CART
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:relative sm:top-auto sm:right-auto bg-[#E6B94D] text-[#30231D] text-[11px] font-bold font-mono-tag w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-full bg-white/80 border border-[#30231D]/10 text-[#30231D] hover:text-[#B52A24]"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-[#30231D]/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FFF5E8] h-full shadow-2xl p-6 flex flex-col justify-between border-l border-[#30231D]/15">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#30231D]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E6B94D] bg-[#E6B94D]">
                    <img src="/she-pickle-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-display font-black text-lg text-[#30231D]">SHE PICKLE</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#30231D]/10 text-[#30231D]"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-2 py-6">
                {navLinks.map((link) => (
                  <button
                    key={link.route}
                    onClick={() => handleNav(link.route)}
                    className={`text-left px-4 py-3 rounded-xl font-display font-bold text-lg transition-colors ${
                      currentRoute === link.route
                        ? 'bg-[#B52A24] text-white'
                        : 'text-[#30231D] hover:bg-[#30231D]/5'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#30231D]/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full py-3 bg-[#30231D] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                VIEW PANTRY ({itemCount} JARS)
              </button>
              <p className="text-center text-[10px] font-mono-tag text-[#30231D]/60 uppercase">
                A WOMEN&apos;S PRODUCT • 100% HOMEMADE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

