import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Globe,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Heart,
  Link2,
  Check,
} from 'lucide-react';
import { CATEGORIES, CategoryId } from '../data/products';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import { RouteMatch } from '../utils/storeLogic';
import { ViolaLogo } from './ViolaLogo';

interface NavbarProps {
  lang: Lang;
  onToggleLang: () => void;
  currentRoute: RouteMatch;
  onNavigate: (path: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  currentRoute,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenSearch,
}) => {
  const t = TRANSLATIONS[lang];
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setCatOpen(false);
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch(searchInput);
    setSearchOpen(false);
  };

  const handleCopyUrl = () => {
    const fullUrl = `${window.location.origin}${currentRoute.path}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const isActive = (page: RouteMatch['page']) => currentRoute.page === page;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E4DAC8] shadow-[0_1px_3px_rgba(28,22,18,0.04)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark & Lotus Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-[#8A5A1E] rounded-lg py-1"
          aria-label="Viola Handmade Luxor Home"
        >
          <ViolaLogo variant="header" size="sm" />
        </a>

        {/* Zone 2: Main Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-[15px] font-semibold"
          aria-label="Primary Navigation"
        >
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              isActive('home')
                ? 'text-[#7C4D15] border-[#8A5A1E]'
                : 'text-[#2B2118] border-transparent hover:text-[#7C4D15]'
            }`}
          >
            {t.nav.home}
          </a>
          <a
            href="/shop"
            onClick={(e) => handleLinkClick(e, '/shop')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              isActive('shop') && !currentRoute.category
                ? 'text-[#7C4D15] border-[#8A5A1E]'
                : 'text-[#2B2118] border-transparent hover:text-[#7C4D15]'
            }`}
          >
            {t.nav.shop}
          </a>
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              isActive('about')
                ? 'text-[#7C4D15] border-[#8A5A1E]'
                : 'text-[#2B2118] border-transparent hover:text-[#7C4D15]'
            }`}
          >
            {t.nav.about}
          </a>
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              isActive('contact')
                ? 'text-[#7C4D15] border-[#8A5A1E]'
                : 'text-[#2B2118] border-transparent hover:text-[#7C4D15]'
            }`}
          >
            {t.nav.contact}
          </a>

          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCatOpen((prev) => !prev)}
              aria-expanded={catOpen}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors cursor-pointer ${
                isActive('shop') && currentRoute.category
                  ? 'text-[#7C4D15] border-[#8A5A1E]'
                  : 'text-[#2B2118] border-transparent hover:text-[#7C4D15]'
              }`}
            >
              <span>{t.nav.categories}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  catOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {catOpen && (
              <div className="absolute top-full mt-2 start-0 w-72 bg-[#FFFDF9] border border-[#DED2BC] rounded-xl shadow-xl py-2 z-50">
                <a
                  href="/shop"
                  onClick={(e) => handleLinkClick(e, '/shop')}
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#1E1610] hover:bg-[#F5EFE4] transition-colors"
                >
                  <span>{t.nav.allProducts}</span>
                  <span className="text-xs font-medium text-[#7A4E1A]">20</span>
                </a>
                <div className="my-1 border-t border-[#EAE0D0]" />
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/shop/${cat.slug}`}
                    onClick={(e) => handleLinkClick(e, `/shop/${cat.slug}`)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#2B2118] hover:bg-[#F5EFE4] transition-colors"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name[lang]}
                      className="w-8 h-8 rounded-md object-cover border border-[#DED2BC] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#1E1610] truncate">
                        {cat.name[lang]}
                      </p>
                      <p className="text-xs text-[#6B5A48] truncate">
                        {cat.badge[lang]}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Action Controls (Search, Language Switcher, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Copyable Direct Page Link Indicator */}
          <button
            type="button"
            onClick={handleCopyUrl}
            title={
              lang === 'ar'
                ? `نسخ رابط الصفحة: ${currentRoute.path}`
                : `Copy page link: ${currentRoute.path}`
            }
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F4EDE1] hover:bg-[#EAE0CE] border border-[#DCD0BC] text-xs font-mono text-[#4A3828] transition-colors cursor-pointer"
          >
            {copiedUrl ? (
              <Check className="w-3.5 h-3.5 text-[#1F6E43]" />
            ) : (
              <Link2 className="w-3.5 h-3.5 text-[#7C4D15]" />
            )}
            <span className="max-w-[150px] truncate" dir="ltr">
              {currentRoute.path}
            </span>
          </button>

          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label={lang === 'ar' ? 'بحث في المنتجات' : 'Search products'}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#2B2118] hover:bg-[#F4EDE1] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Switcher (English / عربي) */}
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
            className="h-10 px-3 inline-flex items-center gap-1.5 rounded-lg border border-[#D8CBB3] bg-[#FAF6EE] hover:bg-[#EFE6D5] text-sm font-semibold text-[#2B2118] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#7C4D15]" />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Wishlist Link */}
          <a
            href="/wishlist"
            onClick={(e) => handleLinkClick(e, '/wishlist')}
            aria-label={t.nav.wishlist}
            className="relative w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#2B2118] hover:bg-[#F4EDE1] transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#8A5A1E] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </a>

          {/* Cart Button */}
          <a
            href="/cart"
            onClick={(e) => handleLinkClick(e, '/cart')}
            aria-label={t.nav.cart}
            className="relative h-10 px-3.5 inline-flex items-center gap-2 rounded-lg bg-[#2B2118] hover:bg-[#3F3022] text-[#FAF7F2] text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#E6C37A]" />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            <span className="px-1.5 py-0.5 rounded bg-[#8A5A1E] text-white text-xs font-bold tabular-nums">
              {cartCount}
            </span>
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg text-[#2B2118] hover:bg-[#F4EDE1]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#E4DAC8] bg-[#FAF6EE] px-4 py-3">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6B5A48] absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                autoFocus
                className="w-full h-11 ps-10 pe-4 rounded-lg bg-white border border-[#D4C5AC] text-[#1E1610] placeholder:text-[#786652] text-sm focus:outline-none focus:border-[#7C4D15]"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-lg bg-[#7C4D15] hover:bg-[#633C0F] text-white text-sm font-semibold whitespace-nowrap cursor-pointer"
            >
              {lang === 'ar' ? 'بحث' : 'Search'}
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4DAC8] bg-[#FFFDF9] px-4 py-4 space-y-2">
          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#F4EDE1] text-xs font-mono text-[#4A3828]">
            <span dir="ltr">URL: {currentRoute.path}</span>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="font-sans font-semibold text-[#7C4D15]"
            >
              {copiedUrl ? (lang === 'ar' ? 'تم النسخ' : 'Copied') : lang === 'ar' ? 'نسخ الرابط' : 'Copy Link'}
            </button>
          </div>
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="block px-3 py-2.5 rounded-lg font-semibold text-[#1E1610] hover:bg-[#F4EDE1]"
          >
            {t.nav.home}
          </a>
          <a
            href="/shop"
            onClick={(e) => handleLinkClick(e, '/shop')}
            className="block px-3 py-2.5 rounded-lg font-semibold text-[#1E1610] hover:bg-[#F4EDE1]"
          >
            {t.nav.shop}
          </a>
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about')}
            className="block px-3 py-2.5 rounded-lg font-semibold text-[#1E1610] hover:bg-[#F4EDE1]"
          >
            {t.nav.about}
          </a>
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="block px-3 py-2.5 rounded-lg font-semibold text-[#1E1610] hover:bg-[#F4EDE1]"
          >
            {t.nav.contact}
          </a>
          <div className="pt-2 border-t border-[#E4DAC8]">
            <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6B5A48]">
              {t.nav.categories}
            </p>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`/shop/${cat.slug}`}
                onClick={(e) => handleLinkClick(e, `/shop/${cat.slug}`)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[#2B2118] hover:bg-[#F4EDE1]"
              >
                {cat.name[lang]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
