import React, { useState, useEffect } from 'react';
import {
  Star,
  ShoppingBag,
  MessageCircle,
  Heart,
  Check,
  ArrowLeft,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, Product, ProductReview } from '../data/products';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  slug: string;
  lang: Lang;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  lang,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const product =
    PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS[0];

  const categoryObj = CATEGORIES.find((c) => c.id === product.category);
  const variants = product.variants?.[lang] ?? [product.specs.scentOrFinish[lang]];

  const [selectedVariant, setSelectedVariant] = useState<string>(variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(product.reviews);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [whatsAppPreview, setWhatsAppPreview] = useState<string | null>(null);

  useEffect(() => {
    const v = product.variants?.[lang] ?? [product.specs.scentOrFinish[lang]];
    setSelectedVariant(v[0]);
    setQuantity(1);
    setLocalReviews(product.reviews);
    setWhatsAppPreview(null);
  }, [product, lang]);

  const isWishlisted = wishlistIds.includes(product.id);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVariant);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const handleDirectWhatsApp = () => {
    const text =
      lang === 'ar'
        ? `مرحباً فيولا هاند ميد الأقصر، أرغب في طلب:\n• ${product.name.ar} (${selectedVariant})\n• الكمية: ${quantity}\n• السعر: ${product.price * quantity} ج.م\nالرابط: ${window.location.origin}/product/${product.slug}`
        : `Hello Viola Handmade Luxor, I would like to order:\n• ${product.name.en} (${selectedVariant})\n• Quantity: ${quantity}\n• Total: ${product.price * quantity} EGP\nLink: ${window.location.origin}/product/${product.slug}`;
    setWhatsAppPreview(text);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewText.trim()) return;
    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      authorAr: reviewAuthor.trim(),
      rating: reviewRating,
      date: new Date().toISOString().slice(0, 10),
      comment: {
        en: reviewText.trim(),
        ar: reviewText.trim(),
      },
    };
    setLocalReviews((prev) => [newRev, ...prev]);
    setReviewAuthor('');
    setReviewText('');
  };

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb & Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#5C4938]">
        <nav className="flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-[#7C4D15] font-medium"
          >
            {t.nav.home}
          </a>
          <span>/</span>
          <a
            href="/shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/shop');
            }}
            className="hover:text-[#7C4D15] font-medium"
          >
            {t.nav.shop}
          </a>
          {categoryObj && (
            <>
              <span>/</span>
              <a
                href={`/shop/${categoryObj.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/shop/${categoryObj.slug}`);
                }}
                className="hover:text-[#7C4D15] font-medium"
              >
                {categoryObj.shortName[lang]}
              </a>
            </>
          )}
          <span>/</span>
          <span className="font-bold text-[#1C1510] truncate max-w-[240px]">
            {product.name[lang]}
          </span>
        </nav>

        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-1.5 font-semibold text-[#7C4D15] hover:text-[#4F2F0A] cursor-pointer"
        >
          <BackIcon className="w-4 h-4" />
          <span>{t.productDetail.backToShop}</span>
        </button>
      </div>

      {/* Contiguous Purchase Module (2-Column Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Sticky Product Image Frame */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#DED2BC] shadow-sm">
            <img
              src={product.image}
              alt={product.name[lang]}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.discountPercent && (
              <span className="absolute top-4 start-4 px-3 py-1 rounded-lg bg-[#6E4414] text-white text-xs font-bold tabular-nums shadow">
                -{product.discountPercent}%
              </span>
            )}
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label="Toggle Wishlist"
              className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/95 border border-[#DED2BC] flex items-center justify-center text-[#2B2118] shadow-sm cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : ''
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-[#4A3828]">
            <div className="bg-white border border-[#E2D7C3] rounded-xl p-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7C4D15] shrink-0" />
              <span className="font-semibold">{t.about.locationBadge}</span>
            </div>
            <div className="bg-white border border-[#E2D7C3] rounded-xl p-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7C4D15] shrink-0" />
              <span className="font-semibold">100% Handmade</span>
            </div>
            <div className="bg-white border border-[#E2D7C3] rounded-xl p-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1F6E43] shrink-0" />
              <span className="font-semibold text-[#1F6E43]">{t.shop.inStock}</span>
            </div>
          </div>
        </div>

        {/* Right: Purchase & Craftsmanship Module */}
        <div className="lg:col-span-6 bg-white border border-[#DED2BC] rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_2px_12px_rgba(28,21,16,0.03)]">
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-[#65523D]">
            <span className="font-bold uppercase tracking-wider text-[#7C4D15]">
              {categoryObj?.name[lang]}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 font-bold text-[#1C1510] tabular-nums">
              <Star className="w-4 h-4 fill-[#C28526] text-[#C28526]" />
              {product.rating.toFixed(1)}
            </span>
            <span className="tabular-nums">
              ({product.reviewsCount + localReviews.length - product.reviews.length}{' '}
              {t.shop.reviews})
            </span>
          </div>

          <div>
            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#1C1510] leading-tight">
              {product.name[lang]}
            </h1>
            <p className="text-sm font-medium text-[#6B5843] mt-1.5">
              {product.subtitle[lang]}
            </p>
          </div>

          {/* Price Block */}
          <div className="flex items-baseline gap-3 pt-1 tabular-nums">
            <span className="text-3xl font-extrabold text-[#1C1510]">
              {product.price} {t.shop.currency}
            </span>
            {product.originalPrice && (
              <span className="text-base text-[#7D6B57] line-through">
                {product.originalPrice} {t.shop.currency}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#3D3024] leading-relaxed">
            {product.description[lang]}
          </p>

          {/* Scent / Finish Selector */}
          <div className="space-y-2.5 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3828]">
              {t.productDetail.chooseVariant}
            </label>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    selectedVariant === v
                      ? 'bg-[#2B2118] text-white border-[#2B2118]'
                      : 'bg-[#FAF7F2] text-[#2B2118] border-[#D4C5AC] hover:border-[#7C4D15]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Primary Action Buttons */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center border border-[#D4C5AC] rounded-xl bg-[#FAF7F2] h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-full text-lg font-bold text-[#2B2118] hover:bg-[#EFE7D8] rounded-s-xl cursor-pointer"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-sm text-[#1C1510] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-full text-lg font-bold text-[#2B2118] hover:bg-[#EFE7D8] rounded-e-xl cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 h-12 px-6 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  addedFeedback
                    ? 'bg-[#1F6E43] text-white'
                    : 'bg-[#7C4D15] hover:bg-[#5E380C] text-white'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.shop.added}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {t.productDetail.addToCart} · {product.price * quantity}{' '}
                      {t.shop.currency}
                    </span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full h-11 px-5 rounded-xl bg-[#F3E9D8] hover:bg-[#E6D7BE] border border-[#C9A365] text-[#2B2118] font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#16A34A]" />
              <span>{t.productDetail.orderWhatsApp} (+201070090679)</span>
            </button>

            {whatsAppPreview && (
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-xs text-[#14532D] space-y-2">
                <p className="font-bold">
                  {lang === 'ar'
                    ? 'تم تجهيز طلب واتساب المباشر لـ فيولا هاند ميد الأقصر:'
                    : 'Direct WhatsApp Order Prepared for Viola Handmade Luxor:'}
                </p>
                <pre className="whitespace-pre-wrap font-sans bg-white/80 p-2.5 rounded border border-[#BBF7D0]">
                  {whatsAppPreview}
                </pre>
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="pt-4 border-t border-[#EDE4D3] space-y-3">
            <h2 className="text-sm font-bold text-[#1C1510]">
              {t.productDetail.specifications}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE0D0]">
                <dt className="text-[#6B5843] font-medium">
                  {t.productDetail.weight}
                </dt>
                <dd className="text-[#1C1510] font-bold mt-0.5 tabular-nums">
                  {product.specs.weight}
                </dd>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE0D0]">
                <dt className="text-[#6B5843] font-medium">
                  {t.productDetail.dimensions}
                </dt>
                <dd className="text-[#1C1510] font-bold mt-0.5 tabular-nums">
                  {product.specs.dimensions}
                </dd>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE0D0]">
                <dt className="text-[#6B5843] font-medium">
                  {t.productDetail.materials}
                </dt>
                <dd className="text-[#1C1510] font-bold mt-0.5">
                  {product.specs.material[lang]}
                </dd>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE0D0]">
                <dt className="text-[#6B5843] font-medium">
                  {t.productDetail.origin}
                </dt>
                <dd className="text-[#1C1510] font-bold mt-0.5">
                  {t.productDetail.originValue}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Add Review Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#E2D7C3]">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1510]">
            {t.productDetail.customerReviews} ({localReviews.length})
          </h2>

          {localReviews.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white border border-[#DED2BC] text-sm text-[#544332]">
              {lang === 'ar'
                ? 'كن أول من يشارك تجربته مع هذه القطعة الفنية من الأقصر!'
                : 'Be the first to share your experience with this handcrafted Luxor piece!'}
            </div>
          ) : (
            <div className="space-y-4">
              {localReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-white border border-[#DED2BC] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1C1510]">
                      {lang === 'ar' ? rev.authorAr : rev.author}
                    </span>
                    <span className="text-xs text-[#6B5843] tabular-nums">
                      {rev.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i <= rev.rating
                            ? 'fill-[#C28526] text-[#C28526]'
                            : 'text-[#D4C5AC]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#3D3024] leading-relaxed">
                    {rev.comment[lang]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Review Form */}
        <div className="lg:col-span-5 bg-white border border-[#DED2BC] rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-[#1C1510]">
            {t.productDetail.writeReview}
          </h3>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A3828] mb-1">
                {t.productDetail.yourName}
              </label>
              <input
                type="text"
                required
                value={reviewAuthor}
                onChange={(e) => setReviewAuthor(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3828] mb-1">
                {t.productDetail.yourRating}
              </label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="w-full h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm font-semibold text-[#1C1510]"
              >
                <option value={5}>★★★★★ (5/5)</option>
                <option value={4}>★★★★☆ (4/5)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A3828] mb-1">
                {t.productDetail.yourComment}
              </label>
              <textarea
                rows={3}
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={t.productDetail.yourComment}
                className="w-full p-3 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510]"
              />
            </div>
            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-[#2B2118] hover:bg-[#7C4D15] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {t.productDetail.submitReview}
            </button>
          </form>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="space-y-6 pt-4">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1510]">
            {t.productDetail.relatedProducts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                lang={lang}
                isWishlisted={wishlistIds.includes(item.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={(p) => onAddToCart(p, 1)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
