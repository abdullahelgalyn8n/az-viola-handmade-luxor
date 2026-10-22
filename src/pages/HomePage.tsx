import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Truck,
  CreditCard,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { CATEGORIES, CategoryId, PRODUCTS, Product } from '../data/products';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  lang: Lang;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const DirArrow = isRtl ? ArrowLeft : ArrowRight;

  const [featuredTab, setFeaturedTab] = useState<CategoryId | 'all'>('all');
  const [carouselPage, setCarouselPage] = useState(0);

  const featuredPool = PRODUCTS.filter((p) =>
    featuredTab === 'all' ? p.featured : p.category === featuredTab
  );

  const itemsPerSlide = 4;
  const maxPage = Math.max(0, Math.ceil(featuredPool.length / itemsPerSlide) - 1);
  const safePage = Math.min(carouselPage, maxPage);
  const visibleFeatured = featuredPool.slice(
    safePage * itemsPerSlide,
    safePage * itemsPerSlide + itemsPerSlide
  );

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Storefront Hero Section */}
      <section className="relative overflow-hidden bg-[#1D150E]">
        <img
          src="/assets/products/hero-bg-clean.png"
          alt="Viola Handmade Luxor Artisan Candle"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        {/* High-contrast warm dark scrim for guaranteed WCAG AAA text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#160F0A]/92 via-[#1D140D]/80 to-[#1D140D]/55"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#EBC980]">
              {t.hero.kicker}
            </p>

            <h1
              className="font-serif-display font-bold text-white leading-[1.12] tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                textWrap: 'balance',
              }}
            >
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-[#EDE3D2] leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/shop"
                onClick={(e) => handleLink(e, '/shop')}
                className="px-7 py-3.5 rounded-xl bg-[#D4A048] hover:bg-[#C08D36] text-[#1A120B] font-bold text-sm inline-flex items-center gap-2.5 shadow-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>{t.hero.shopNow}</span>
                <DirArrow className="w-4 h-4" />
              </a>

              <a
                href="#browse-categories"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('browse-categories')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#EBC980]/50 text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                {t.hero.browseProducts}
              </a>
            </div>

            {/* Unboxed Trust Metadata Row */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#E5D8C3]">
              <span className="inline-flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#EBC980]" />
                {t.hero.badges.shipping}
              </span>
              <span aria-hidden="true" className="text-[#8F7A60]">
                ·
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#EBC980]" />
                {t.hero.badges.quality}
              </span>
              <span aria-hidden="true" className="text-[#8F7A60]">
                ·
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#EBC980]" />
                {t.hero.badges.support}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Strip (High-Contrast Light Mode) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white border border-[#DED2BC] rounded-2xl shadow-sm p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F3E9D8] border border-[#DFCEB2] flex items-center justify-center text-[#7A4D16] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.trustBar.deliveryTitle}
              </h2>
              <p className="text-xs text-[#544332] mt-1 leading-relaxed">
                {t.trustBar.deliveryDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F3E9D8] border border-[#DFCEB2] flex items-center justify-center text-[#7A4D16] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.trustBar.paymentTitle}
              </h2>
              <p className="text-xs text-[#544332] mt-1 leading-relaxed">
                {t.trustBar.paymentDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F3E9D8] border border-[#DFCEB2] flex items-center justify-center text-[#7A4D16] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.trustBar.supportTitle}
              </h2>
              <p className="text-xs text-[#544332] mt-1 leading-relaxed">
                {t.trustBar.supportDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F3E9D8] border border-[#DFCEB2] flex items-center justify-center text-[#7A4D16] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.trustBar.returnsTitle}
              </h2>
              <p className="text-xs text-[#544332] mt-1 leading-relaxed">
                {t.trustBar.returnsDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Browse Categories Section (Fixed Full-Bleed Circular Framing & High Contrast) */}
      <section
        id="browse-categories"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1510]">
            {t.home.browseCategories}
          </h2>
          <div className="w-16 h-0.5 bg-[#8A5A1E] mx-auto my-3" />
          <p className="text-sm text-[#544332]">{t.home.browseCategoriesSub}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/shop/${cat.slug}`}
              onClick={(e) => handleLink(e, `/shop/${cat.slug}`)}
              className="group bg-white border border-[#E2D7C3] hover:border-[#8A5A1E] rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 shadow-[0_2px_8px_rgba(28,21,16,0.03)]"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#DFCEB2] group-hover:border-[#8A5A1E] bg-[#F7F3EB] mb-4 transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name[lang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-base font-bold text-[#1C1510] group-hover:text-[#7C4D15] transition-colors">
                {cat.shortName[lang]}
              </h3>
              <p className="text-xs font-medium text-[#6B5843] mt-1">
                {cat.badge[lang]}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Section with Interactive Category Tabs & Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1510]">
              {t.home.featuredProducts}
            </h2>
            <p className="text-sm text-[#544332] mt-1">{t.home.featuredSub}</p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            {/* Segmented Category Filter Control */}
            <div className="flex items-center gap-1 p-1 bg-[#EFE7D8] border border-[#DED2BC] rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => {
                  setFeaturedTab('all');
                  setCarouselPage(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  featuredTab === 'all'
                    ? 'bg-[#2B2118] text-white shadow-xs'
                    : 'text-[#4A3828] hover:text-[#1C1510]'
                }`}
              >
                {t.nav.allProducts}
              </button>
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setFeaturedTab(cat.id);
                    setCarouselPage(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    featuredTab === cat.id
                      ? 'bg-[#2B2118] text-white shadow-xs'
                      : 'text-[#4A3828] hover:text-[#1C1510]'
                  }`}
                >
                  {cat.shortName[lang]}
                </button>
              ))}
            </div>

            <a
              href="/shop"
              onClick={(e) => handleLink(e, '/shop')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7C4D15] hover:text-[#59350B] whitespace-nowrap shrink-0"
            >
              <span>{t.home.viewAll}</span>
              <DirArrow className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4-Card Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleFeatured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        {maxPage > 0 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => setCarouselPage((p) => (p > 0 ? p - 1 : maxPage))}
              aria-label="Previous Featured Products"
              className="w-10 h-10 rounded-full bg-[#E8DEC9] hover:bg-[#7C4D15] text-[#2B2118] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              {isRtl ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <ArrowLeft className="w-4 h-4" />
              )}
            </button>
            <span className="text-xs font-bold text-[#544332] tabular-nums">
              {safePage + 1} / {maxPage + 1}
            </span>
            <button
              type="button"
              onClick={() => setCarouselPage((p) => (p < maxPage ? p + 1 : 0))}
              aria-label="Next Featured Products"
              className="w-10 h-10 rounded-full bg-[#7C4D15] hover:bg-[#5E380C] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              {isRtl ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </section>

      {/* 5. Dual Promotional Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Promo 1: Handmade Candles */}
          <div className="relative rounded-2xl overflow-hidden border border-[#DFCEB2] min-h-[260px] flex items-center">
            <img
              src="/assets/products/promo-bg-orange.png"
              alt={t.home.promo1Title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#261809]/90 via-[#38230C]/70 to-transparent"
              aria-hidden="true"
            />
            <div className="relative p-7 sm:p-9 max-w-md space-y-3 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-[#F4D084]">
                {t.home.promo1Kicker}
              </p>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold leading-tight">
                {t.home.promo1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EFE5D4] leading-relaxed">
                {t.home.promo1Desc}
              </p>
              <div className="pt-2">
                <a
                  href="/shop/candles"
                  onClick={(e) => handleLink(e, '/shop/candles')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1C1510] hover:bg-[#F5EFE4] text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
                >
                  <span>{t.home.shopOffers}</span>
                  <DirArrow className="w-3.5 h-3.5 text-[#7C4D15]" />
                </a>
              </div>
            </div>
          </div>

          {/* Promo 2: Botanical Soaps & Creations */}
          <div className="relative rounded-2xl overflow-hidden border border-[#DFCEB2] min-h-[260px] flex items-center">
            <img
              src="/assets/products/promo-bg-roses.png"
              alt={t.home.promo2Title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#281A12]/90 via-[#3A261A]/70 to-transparent"
              aria-hidden="true"
            />
            <div className="relative p-7 sm:p-9 max-w-md space-y-3 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-[#F4D084]">
                {t.home.promo2Kicker}
              </p>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold leading-tight">
                {t.home.promo2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EFE5D4] leading-relaxed">
                {t.home.promo2Desc}
              </p>
              <div className="pt-2">
                <a
                  href="/shop/soaps"
                  onClick={(e) => handleLink(e, '/shop/soaps')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1C1510] hover:bg-[#F5EFE4] text-xs font-bold shadow-sm transition-colors whitespace-nowrap"
                >
                  <span>{t.home.shopOffers}</span>
                  <DirArrow className="w-3.5 h-3.5 text-[#7C4D15]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
