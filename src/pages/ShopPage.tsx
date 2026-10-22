import React, { useState, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { CATEGORIES, CategoryId, PRODUCTS, Product } from '../data/products';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import {
  DEFAULT_SHOP_FILTERS,
  ShopFilters,
  SortOption,
  filterAndSortProducts,
  paginateProducts,
} from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  lang: Lang;
  initialCategory?: CategoryId;
  initialSearchQuery?: string;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  lang,
  initialCategory,
  initialSearchQuery = '',
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [filters, setFilters] = useState<ShopFilters>({
    ...DEFAULT_SHOP_FILTERS,
    category: initialCategory ?? 'all',
    searchQuery: initialSearchQuery,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: initialCategory ?? 'all',
    }));
    setCurrentPage(1);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setFilters((prev) => ({
        ...prev,
        searchQuery: initialSearchQuery,
      }));
      setCurrentPage(1);
    }
  }, [initialSearchQuery]);

  const filteredProducts = filterAndSortProducts(PRODUCTS, filters);
  const { pageItems, totalPages, totalItems } = paginateProducts(
    filteredProducts,
    currentPage,
    perPage
  );

  const activeCategoryObj = CATEGORIES.find((c) => c.id === filters.category);

  const handleCategoryChange = (cat: CategoryId | 'all') => {
    setFilters((prev) => ({ ...prev, category: cat }));
    setCurrentPage(1);
    if (cat === 'all') {
      onNavigate('/shop');
    } else {
      onNavigate(`/shop/${cat}`);
    }
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_SHOP_FILTERS);
    setCurrentPage(1);
    onNavigate('/shop');
  };

  const getCategoryCount = (cat: CategoryId | 'all') => {
    if (cat === 'all') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === cat).length;
  };

  return (
    <div className="pb-20">
      {/* 1. High-Contrast Shop Header Banner with Live Search */}
      <section className="bg-gradient-to-b from-[#6B461B] via-[#7D5322] to-[#5E3C16] text-white py-12 sm:py-16 border-b border-[#4D3010]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {activeCategoryObj ? activeCategoryObj.name[lang] : t.shop.title}
          </h1>
          <p className="text-sm sm:text-base text-[#F4EAD8] max-w-2xl mx-auto">
            {activeCategoryObj
              ? activeCategoryObj.description[lang]
              : t.shop.subtitle}
          </p>

          {/* Search Input inside Banner */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative">
              <Search className="w-5 h-5 text-[#6B5843] absolute start-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    searchQuery: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                placeholder={t.shop.searchPlaceholder}
                aria-label={t.shop.searchPlaceholder}
                className="w-full h-12 sm:h-13 ps-12 pe-10 rounded-full bg-white text-[#1C1510] placeholder:text-[#6B5843] text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-[#E6C37A]"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, searchQuery: '' }));
                    setCurrentPage(1);
                  }}
                  aria-label="Clear search"
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EFE7D8] text-[#2B2118] flex items-center justify-center hover:bg-[#DED2BC] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog Container: Sidebar Filters + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (3 cols on desktop) */}
          <aside className="lg:col-span-3 bg-white border border-[#DED2BC] rounded-2xl p-5 sm:p-6 space-y-6 shadow-[0_2px_10px_rgba(28,21,16,0.03)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE4D3]">
              <div className="flex items-center gap-2 text-[#1C1510] font-bold text-base">
                <SlidersHorizontal className="w-4 h-4 text-[#7C4D15]" />
                <span>{t.shop.filterTitle}</span>
              </div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C4D15] hover:text-[#4F2F0A] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.shop.clearFilters}</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3 pb-5 border-b border-[#EDE4D3]">
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.shop.category}
              </h2>
              <div className="space-y-2">
                <label className="flex items-center justify-between gap-2 text-sm text-[#2B2118] cursor-pointer hover:text-[#7C4D15]">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shop-category"
                      checked={filters.category === 'all'}
                      onChange={() => handleCategoryChange('all')}
                      className="w-4 h-4 accent-[#7C4D15]"
                    />
                    <span className={filters.category === 'all' ? 'font-bold text-[#7C4D15]' : ''}>
                      {t.shop.allCategories}
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-[#6B5843] tabular-nums">
                    ({getCategoryCount('all')})
                  </span>
                </label>

                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between gap-2 text-sm text-[#2B2118] cursor-pointer hover:text-[#7C4D15]"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="shop-category"
                        checked={filters.category === cat.id}
                        onChange={() => handleCategoryChange(cat.id)}
                        className="w-4 h-4 accent-[#7C4D15]"
                      />
                      <span
                        className={
                          filters.category === cat.id
                            ? 'font-bold text-[#7C4D15]'
                            : ''
                        }
                      >
                        {cat.shortName[lang]}
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-[#6B5843] tabular-nums">
                      ({getCategoryCount(cat.id)})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3 pb-5 border-b border-[#EDE4D3]">
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.shop.priceRange}
              </h2>
              <input
                type="range"
                min={0}
                max={600}
                step={10}
                value={filters.maxPrice}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }));
                  setCurrentPage(1);
                }}
                aria-label={t.shop.priceRange}
                className="w-full accent-[#7C4D15] cursor-pointer"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5C4938] mb-1">
                    {t.shop.min}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={filters.maxPrice}
                    value={filters.minPrice}
                    onChange={(e) => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: Math.max(0, Number(e.target.value)),
                      }));
                      setCurrentPage(1);
                    }}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#D4C5AC] bg-[#FAF7F2] text-sm font-semibold text-[#1C1510] tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5C4938] mb-1">
                    {t.shop.max}
                  </label>
                  <input
                    type="number"
                    min={filters.minPrice}
                    max={1000}
                    value={filters.maxPrice}
                    onChange={(e) => {
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: Math.max(prev.minPrice, Number(e.target.value)),
                      }));
                      setCurrentPage(1);
                    }}
                    className="w-full h-9 px-2.5 rounded-lg border border-[#D4C5AC] bg-[#FAF7F2] text-sm font-semibold text-[#1C1510] tabular-nums"
                  />
                </div>
              </div>
              <p className="text-xs text-center font-semibold text-[#5C4938] tabular-nums">
                {filters.minPrice} — {filters.maxPrice} {t.shop.currency}
              </p>
            </div>

            {/* Minimum Rating Filter */}
            <div className="space-y-2.5 pb-5 border-b border-[#EDE4D3]">
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.shop.rating}
              </h2>
              {[4.5, 4, 3].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      minRating: prev.minRating === stars ? 0 : stars,
                    }));
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    filters.minRating === stars
                      ? 'bg-[#F3E9D8] font-bold text-[#1C1510] border border-[#C9A365]'
                      : 'text-[#4A3828] hover:bg-[#FAF6EE]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i <= Math.floor(stars)
                            ? 'fill-[#C28526] text-[#C28526]'
                            : 'text-[#C8B9A2]'
                        }`}
                      />
                    ))}
                    <span className="ms-1 tabular-nums">{stars}+</span>
                  </span>
                  <span>{t.shop.andUp}</span>
                </button>
              ))}
            </div>

            {/* Special Filters */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.shop.specialFilters}
              </h2>
              <label className="flex items-center gap-2.5 text-sm text-[#2B2118] cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      inStockOnly: e.target.checked,
                    }));
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 rounded accent-[#7C4D15]"
                />
                <span>{t.shop.inStockOnly}</span>
              </label>

              <label className="flex items-center gap-2.5 text-sm text-[#2B2118] cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onSaleOnly}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      onSaleOnly: e.target.checked,
                    }));
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 rounded accent-[#7C4D15]"
                />
                <span>{t.shop.onSale}</span>
              </label>

              <label className="flex items-center gap-2.5 text-sm text-[#2B2118] cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.featuredOnly}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      featuredOnly: e.target.checked,
                    }));
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 rounded accent-[#7C4D15]"
                />
                <span>{t.shop.featuredOnly}</span>
              </label>
            </div>
          </aside>

          {/* Right Product Catalog Area (9 cols on desktop) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Count + View Toggle + Sort Dropdown */}
            <div className="bg-white border border-[#DED2BC] rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-bold text-[#1C1510] tabular-nums">
                {totalItems} {t.shop.productsCount}
              </p>

              <div className="flex items-center gap-3">
                {/* Grid / List View Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#F4EDE1] border border-[#DED2BC]">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid View"
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#7C4D15] text-white'
                        : 'text-[#4A3828] hover:text-[#1C1510]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="List View"
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-[#7C4D15] text-white'
                        : 'text-[#4A3828] hover:text-[#1C1510]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Select */}
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SortOption,
                    }))
                  }
                  aria-label={t.shop.sortBy}
                  className="h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm font-semibold text-[#1C1510] focus:outline-none focus:border-[#7C4D15] cursor-pointer"
                >
                  <option value="newest">{t.shop.sortOptions.newest}</option>
                  <option value="featured">{t.shop.sortOptions.featured}</option>
                  <option value="price-asc">{t.shop.sortOptions['price-asc']}</option>
                  <option value="price-desc">{t.shop.sortOptions['price-desc']}</option>
                  <option value="rating-desc">{t.shop.sortOptions['rating-desc']}</option>
                </select>
              </div>
            </div>

            {/* Product Grid or Empty State */}
            {pageItems.length === 0 ? (
              <div className="bg-white border border-[#DED2BC] rounded-2xl p-12 text-center space-y-4">
                <p className="font-serif-display text-2xl font-bold text-[#1C1510]">
                  {t.shop.noResultsTitle}
                </p>
                <p className="text-sm text-[#544332] max-w-md mx-auto">
                  {t.shop.noResultsDesc}
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#7C4D15] hover:bg-[#5E380C] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {t.shop.clearFilters}
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {pageItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    viewMode={viewMode}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}

            {/* Pagination Bar */}
            {totalPages > 1 && (
              <nav
                className="pt-6 flex items-center justify-center gap-2"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 260, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 rounded-lg border border-[#D4C5AC] bg-white text-xs font-semibold text-[#2B2118] disabled:opacity-40 hover:bg-[#F4EDE1] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {isRtl ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                  <span>{t.shop.prev}</span>
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 260, behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-lg text-xs font-bold tabular-nums transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#7C4D15] text-white shadow-xs'
                          : 'bg-white border border-[#D4C5AC] text-[#2B2118] hover:bg-[#F4EDE1]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                )}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 260, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 rounded-lg border border-[#D4C5AC] bg-white text-xs font-semibold text-[#2B2118] disabled:opacity-40 hover:bg-[#F4EDE1] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{t.shop.next}</span>
                  {isRtl ? (
                    <ChevronLeft className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
