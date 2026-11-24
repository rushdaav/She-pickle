import React, { useState, useEffect } from 'react';
import { PRODUCTS, REVIEWS, FAQS } from './data/products';
import { PickleProduct } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

// Homepage Sections
import { HeroSection } from './components/home/HeroSection';
import { StickyScrollExperience } from './components/home/StickyScrollExperience';
import { TwoWorldsSection } from './components/home/TwoWorldsSection';
import { WhyShePickle } from './components/home/WhyShePickle';
import { ProductCollection } from './components/home/ProductCollection';
import { OurStory } from './components/home/OurStory';
import { FoodMoments } from './components/home/FoodMoments';
import { CustomerReviews } from './components/home/CustomerReviews';
import { FaqSection } from './components/home/FaqSection';
import { FinalCta } from './components/home/FinalCta';

// Dedicated Sub-Pages
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { StoryPage } from './pages/StoryPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ShippingPage } from './pages/ShippingPage';
import { PrivacyPage } from './pages/PrivacyPage';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('beef-pickle');
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  const selectedProduct =
    PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderData: any) => {
    setConfirmedOrder(orderData);
    setCurrentRoute('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E8] text-[#30231D] selection:bg-[#B52A24] selection:text-white">
      {/* Universal Floating Header */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Cart Drawer */}
      <CartDrawer
        onNavigateCheckout={() => handleNavigate('checkout')}
        onNavigateShop={() => handleNavigate('shop')}
      />

      {/* Main Routed View */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            {/* 01. Hero Section */}
            <HeroSection
              featuredProduct={PRODUCTS[0]}
              onExplore={() => {
                const el = document.getElementById('scroll-experience');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onShop={() => handleNavigate('shop')}
            />

            {/* 02. Signature Sticky Scroll Pickle Jar Experience */}
            <div id="scroll-experience">
              <StickyScrollExperience
                products={PRODUCTS}
                onSelectProduct={handleSelectProduct}
              />
            </div>

            {/* 03. Two Worlds of Flavour (Veg vs Non-Veg split) */}
            <TwoWorldsSection
              products={PRODUCTS}
              onShopVeg={() => handleNavigate('shop-veg')}
              onShopNonVeg={() => handleNavigate('shop-non-veg')}
              onSelectProduct={handleSelectProduct}
            />

            {/* 04. Why SHE Pickle? (Good ingredients. Nothing extra.) */}
            <WhyShePickle />

            {/* 05. Product Collection Grid with Category Filters */}
            <ProductCollection
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
            />

            {/* 06. Our Story (From our kitchen to your table) */}
            <OurStory />

            {/* 07. Food Moments (Every meal deserves a little extra) */}
            <FoodMoments />

            {/* 08. Customer Reviews (Love in every jar) */}
            <CustomerReviews reviews={REVIEWS} />

            {/* 09. FAQ Section */}
            <FaqSection faqs={FAQS} />

            {/* 10. Final Bold CTA */}
            <FinalCta
              products={PRODUCTS}
              onShopAll={() => handleNavigate('shop')}
            />
          </>
        )}

        {currentRoute === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            categoryFilter="all"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'shop-veg' && (
          <ShopPage
            products={PRODUCTS}
            categoryFilter="veg"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'shop-non-veg' && (
          <ShopPage
            products={PRODUCTS}
            categoryFilter="non-veg"
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            reviews={REVIEWS}
            onBack={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'cart' && (
          <CartPage
            onNavigateShop={() => handleNavigate('shop')}
            onNavigateCheckout={() => handleNavigate('checkout')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutPage
            onBackToCart={() => handleNavigate('cart')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentRoute === 'order-confirmation' && (
          <OrderConfirmationPage
            orderData={confirmedOrder}
            onContinueShopping={() => handleNavigate('shop')}
          />
        )}

        {currentRoute === 'story' && (
          <StoryPage onNavigateShop={() => handleNavigate('shop')} />
        )}

        {currentRoute === 'contact' && <ContactPage />}

        {currentRoute === 'faq' && <FaqPage onBack={() => handleNavigate('home')} />}

        {currentRoute === 'shipping' && (
          <ShippingPage onBack={() => handleNavigate('home')} />
        )}

        {currentRoute === 'privacy' && (
          <PrivacyPage onBack={() => handleNavigate('home')} />
        )}
      </main>

      {/* 11. Universal Brand Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
export default App;

