import React, { createContext, useContext, useState, useEffect } from 'react';
import { PickleProduct, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: PickleProduct, selectedWeight: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  total: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 699;
const STANDARD_SHIPPING_FEE = 60;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('she_pickle_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('she_pickle_promo');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('she_pickle_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('she_pickle_promo', appliedPromo);
      } else {
        localStorage.removeItem('she_pickle_promo');
      }
    } catch (e) {
      console.error('Error saving promo:', e);
    }
  }, [appliedPromo]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: PickleProduct, selectedWeight: string, quantity = 1) => {
    const weightOpt = product.weights.find((w) => w.weight === selectedWeight) || product.weights[0];
    const itemId = `${product.id}-${weightOpt.weight}`;

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === itemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            product,
            selectedWeight: weightOpt.weight,
            quantity,
            price: weightOpt.price,
          },
        ];
      }
    });

    setIsOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      return { success: true, message: '10% Welcome discount applied!' };
    }
    if (clean === 'PICKLELOVE') {
      setAppliedPromo('PICKLELOVE');
      return { success: true, message: '15% Pickle Love discount applied!' };
    }
    if (clean === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      return { success: true, message: 'Free Shipping unlocked!' };
    }
    return { success: false, message: 'Invalid coupon code. Try WELCOME10' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedPromo === 'WELCOME10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'PICKLELOVE') {
    discount = Math.round(subtotal * 0.15);
  }

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || appliedPromo === 'FREESHIP';
  const shippingFee = subtotal === 0 || qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingFee,
        discount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

