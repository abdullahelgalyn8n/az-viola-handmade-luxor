import React, { useState, useEffect, useCallback } from 'react';
import { PRODUCTS, Product } from './data/products';
import { Lang, TRANSLATIONS } from './i18n/translations';
import {
  CartItem,
  RouteMatch,
  parseRoute,
} from './utils/storeLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import {
  CartPage,
  WishlistPage,
  LegalPage,
} from './pages/CartAndLegalPages';

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [route, setRoute] = useState<RouteMatch>(() =>
    parseRoute(window.location.pathname)
  );
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('viola_luxor_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('viola_luxor_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return ['p-candle-nefertiti', 'p-soap-grape'];
  });

  // Sync HTML dir and lang attributes for English (LTR) & Arabic (RTL)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Persist cart & wishlist
  useEffect(() => {
    try {
      localStorage.setItem('viola_luxor_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('viola_luxor_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Listen to browser Back/Forward buttons
  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update document title per page route
  useEffect(() => {
    const t = TRANSLATIONS[lang];
    let pageTitle = 'Viola Handmade Luxor';
    if (route.page === 'shop') {
      pageTitle = `${t.nav.shop} | Viola Handmade Luxor`;
    } else if (route.page === 'about') {
      pageTitle = `${t.nav.about} | Viola Handmade Luxor`;
    } else if (route.page === 'contact') {
      pageTitle = `${t.nav.contact} | Viola Handmade Luxor`;
    } else if (route.page === 'product') {
      const prod = PRODUCTS.find((p) => p.slug === route.slug);
      if (prod) {
        pageTitle = `${prod.name[lang]} | Viola Handmade Luxor`;
      }
    } else if (route.page === 'cart') {
      pageTitle = `${t.nav.cart} | Viola Handmade Luxor`;
    }
    document.title = pageTitle;
  }, [route, lang]);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(parseRoute(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedVariant?: string
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.product.id === product.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
          selectedVariant: selectedVariant ?? updated[existingIdx].selectedVariant,
        };
        return updated;
      }
      return [...prev, { product, quantity, selectedVariant }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleGlobalSearch = (query: string) => {
    setGlobalSearchQuery(query);
    navigate('/shop');
  };

  const totalCartItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1510] overflow-x-hidden">
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        currentRoute={route}
        onNavigate={navigate}
        cartCount={totalCartItems}
        wishlistCount={wishlistIds.length}
        onOpenSearch={handleGlobalSearch}
      />

      <main className="flex-1">
        {route.page === 'home' && (
          <HomePage
            lang={lang}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onNavigate={navigate}
          />
        )}

        {route.page === 'shop' && (
          <ShopPage
            lang={lang}
            initialCategory={route.category}
            initialSearchQuery={globalSearchQuery}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onNavigate={navigate}
          />
        )}

        {route.page === 'product' && (
          <ProductDetailPage
            slug={route.slug}
            lang={lang}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={navigate}
          />
        )}

        {route.page === 'about' && (
          <AboutPage lang={lang} onNavigate={navigate} />
        )}

        {route.page === 'contact' && <ContactPage lang={lang} />}

        {route.page === 'cart' && (
          <CartPage
            lang={lang}
            items={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onNavigate={navigate}
          />
        )}

        {route.page === 'wishlist' && (
          <WishlistPage
            lang={lang}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onNavigate={navigate}
          />
        )}

        {(route.page === 'faq' ||
          route.page === 'privacy' ||
          route.page === 'terms') && (
          <LegalPage page={route.page} lang={lang} onNavigate={navigate} />
        )}
      </main>

      <Footer lang={lang} onNavigate={navigate} />
    </div>
  );
}
