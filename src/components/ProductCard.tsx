import React, { useState } from 'react';
import { Star, ShoppingBag, Check, Heart, Eye } from 'lucide-react';
import { CATEGORIES, Product } from '../data/products';
import { Lang, TRANSLATIONS } from '../i18n/translations';

interface ProductCardProps {
  product: Product;
  lang: Lang;
  viewMode?: 'grid' | 'list';
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  viewMode = 'grid',
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const categoryObj = CATEGORIES.find((c) => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.shortName[lang] : product.category;
  const productUrl = `/product/${product.slug}`;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(productUrl);
  };

  if (viewMode === 'list') {
    return (
      <article className="group bg-white border border-[#E2D7C3] rounded-2xl overflow-hidden hover:border-[#B58942] transition-all duration-200 flex flex-col sm:flex-row">
        <a
          href={productUrl}
          onClick={handleCardClick}
          className="relative sm:w-72 aspect-[4/3] bg-[#F7F3EB] shrink-0 overflow-hidden block"
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name[lang]}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#EFE7D8] text-[#6B5A48] p-4 text-center font-serif-display text-lg">
              {product.name[lang]}
            </div>
          )}

          {product.discountPercent && (
            <span className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-[#6E4414] text-white text-xs font-bold tabular-nums shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
        </a>

        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Clean unboxed metadata */}
            <div className="flex items-center justify-between gap-2 text-xs text-[#65523D] mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold uppercase tracking-wider text-[#7C4D15]">
                  {categoryName}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#1E1610] tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-[#C28526] text-[#C28526]" />
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[#6E5C49] tabular-nums">
                  ({product.reviewsCount} {t.shop.reviews})
                </span>
              </div>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist: ${product.name[lang]}`}
                className="p-1.5 rounded-lg text-[#5C4938] hover:bg-[#F5EFE4] transition-colors cursor-pointer"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : ''
                  }`}
                />
              </button>
            </div>

            <a
              href={productUrl}
              onClick={handleCardClick}
              className="block text-lg font-bold text-[#1C1510] hover:text-[#7C4D15] transition-colors"
            >
              {product.name[lang]}
            </a>
            <p className="text-sm text-[#544332] mt-1 line-clamp-2">
              {product.description[lang]}
            </p>
            <p className="text-xs text-[#6B5A48] mt-2">
              {product.specs.scentOrFinish[lang]} · {product.specs.weight}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#EDE5D7] flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2 tabular-nums">
              <span className="text-xl font-bold text-[#1C1510]">
                {product.price}
              </span>
              <span className="text-xs font-bold text-[#5C4938]">
                {t.shop.currency}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#85725E] line-through ms-1">
                  {product.originalPrice} {t.shop.currency}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={productUrl}
                onClick={handleCardClick}
                className="px-3.5 py-2 rounded-lg border border-[#D5C7B0] text-xs font-semibold text-[#2B2118] hover:bg-[#F5EFE4] transition-colors whitespace-nowrap"
              >
                {t.shop.viewDetails}
              </a>
              <button
                type="button"
                onClick={handleAdd}
                className={`px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  added
                    ? 'bg-[#1F6E43] text-white'
                    : 'bg-[#7C4D15] hover:bg-[#613B0E] text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.shop.added}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t.shop.addToCart}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border border-[#E2D7C3] rounded-2xl overflow-hidden hover:border-[#B58942] hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Product 4:3 Image Container */}
      <div className="relative aspect-[4/3] bg-[#F7F3EB] overflow-hidden">
        <a
          href={productUrl}
          onClick={handleCardClick}
          className="block w-full h-full"
          aria-label={product.name[lang]}
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name[lang]}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#EFE7D8] text-[#6B5A48] p-4 text-center font-serif-display text-lg">
              {product.name[lang]}
            </div>
          )}
        </a>

        {/* Single High-Contrast Discount Tag */}
        {product.discountPercent && (
          <span className="absolute top-3 start-3 px-2.5 py-1 rounded-md bg-[#6E4414] text-white text-xs font-bold tabular-nums shadow-sm pointer-events-none">
            {product.discountPercent}%-
          </span>
        )}

        {/* Wishlist & Quick View Buttons */}
        <div className="absolute top-3 end-3 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={`${isWishlisted ? 'Remove from' : 'Save to'} wishlist: ${product.name[lang]}`}
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-[#DED2BC] flex items-center justify-center text-[#2B2118] shadow-sm transition-transform hover:scale-105 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : ''
              }`}
            />
          </button>
          <a
            href={productUrl}
            onClick={handleCardClick}
            aria-label={`${t.shop.viewDetails}: ${product.name[lang]}`}
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-[#DED2BC] flex items-center justify-center text-[#2B2118] shadow-sm transition-transform hover:scale-105"
          >
            <Eye className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata: Rating · Category */}
          <div className="flex items-center gap-1.5 text-xs text-[#65523D] mb-1.5">
            <span className="inline-flex items-center gap-1 font-bold text-[#1C1510] tabular-nums">
              <Star className="w-3.5 h-3.5 fill-[#C28526] text-[#C28526]" />
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[#6E5C49] tabular-nums">
              ({product.reviewsCount} {t.shop.reviews})
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#7C4D15] truncate">
              {categoryName}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-[16px] font-bold text-[#1C1510] leading-snug line-clamp-1 group-hover:text-[#7C4D15] transition-colors">
            <a href={productUrl} onClick={handleCardClick}>
              {product.name[lang]}
            </a>
          </h3>

          {/* Scent / Material Subtitle */}
          <p className="text-xs text-[#5A4836] mt-1 line-clamp-1">
            {product.subtitle[lang]}
          </p>
        </div>

        {/* Price & Add to Cart Row */}
        <div className="mt-4 pt-3.5 border-t border-[#EFE7D8] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 tabular-nums whitespace-nowrap">
            <span className="text-lg font-extrabold text-[#1C1510]">
              {product.price}
            </span>
            <span className="text-xs font-bold text-[#4A3828]">
              {t.shop.currency}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#7D6B57] line-through ms-1 whitespace-nowrap">
                {product.originalPrice} {t.shop.currency}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`${t.shop.addToCart}: ${product.name[lang]}`}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              added
                ? 'bg-[#1F6E43] text-white'
                : 'bg-[#2B2118] hover:bg-[#7C4D15] text-[#FAF7F2]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{t.shop.added}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#E6C37A]" />
                <span>{t.shop.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
