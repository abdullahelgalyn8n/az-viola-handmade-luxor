import React, { useState } from 'react';
import {
  Trash2,
  ShoppingBag,
  MessageCircle,
  CheckCircle2,
  Truck,
  Heart,
  HelpCircle,
  Shield,
  FileText,
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import {
  CartItem,
  calculateCartSummary,
  buildWhatsAppOrderMessage,
} from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

interface CartPageProps {
  lang: Lang;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  lang,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState(
    lang === 'ar' ? 'الأقصر' : 'Luxor'
  );
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedReceipt, setConfirmedReceipt] = useState<{
    orderId: string;
    total: number;
    whatsappMessage: string;
  } | null>(null);

  const summary = calculateCartSummary(items, appliedPromo);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setFormError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم ورقم الموبايل والعنوان بالتفصيل لإتمام الطلب.'
          : 'Please enter your full name, mobile number, and delivery address.'
      );
      return;
    }
    setFormError(null);
    const msg = buildWhatsAppOrderMessage(
      items,
      summary,
      {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        city: customerCity.trim(),
        address: customerAddress.trim(),
        notes: customerNotes.trim(),
      },
      lang
    );
    setConfirmedReceipt({
      orderId: `VLX-${Math.floor(1000 + Math.random() * 9000)}`,
      total: summary.total,
      whatsappMessage: msg,
    });
    onClearCart();
  };

  if (confirmedReceipt) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white border border-[#DED2BC] rounded-2xl p-8 text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#16A34A]/15 text-[#16A34A] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C1510]">
            {t.cart.orderConfirmedTitle} ({confirmedReceipt.orderId})
          </h1>
          <p className="text-sm text-[#4A3828] max-w-md mx-auto">
            {t.cart.orderConfirmedDesc}
          </p>
          <div className="text-start bg-[#FAF7F2] border border-[#E2D7C3] rounded-xl p-4 text-xs text-[#2B2118] font-mono whitespace-pre-wrap">
            {confirmedReceipt.whatsappMessage}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="px-6 py-3 rounded-xl bg-[#7C4D15] hover:bg-[#5E380C] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {t.cart.exploreShop}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1510]">
        {t.cart.title} ({summary.itemCount})
      </h1>

      {items.length === 0 ? (
        <div className="bg-white border border-[#DED2BC] rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F3E9D8] text-[#7C4D15] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1510]">
            {t.cart.emptyTitle}
          </h2>
          <p className="text-sm text-[#544332] max-w-md mx-auto">
            {t.cart.emptyDesc}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="px-6 py-3 rounded-xl bg-[#7C4D15] hover:bg-[#5E380C] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {t.cart.exploreShop}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {/* Free Shipping Progress Banner */}
            <div className="bg-[#F3E9D8] border border-[#D8C5A4] rounded-xl p-4 flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#2B2118]">
              <Truck className="w-5 h-5 text-[#7C4D15] shrink-0" />
              <span>
                {summary.freeShippingRemaining === 0
                  ? t.cart.freeShippingUnlocked
                  : t.cart.freeShippingProgress.replace(
                      '{amount}',
                      String(summary.freeShippingRemaining)
                    )}
              </span>
            </div>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border border-[#DED2BC] rounded-2xl p-4 sm:p-5 flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name[lang]}
                  className="w-20 h-20 rounded-xl object-cover border border-[#E2D7C3] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/product/${item.product.slug}`)}
                    className="text-sm sm:text-base font-bold text-[#1C1510] hover:text-[#7C4D15] text-start truncate block w-full cursor-pointer"
                  >
                    {item.product.name[lang]}
                  </button>
                  <p className="text-xs text-[#6B5843] mt-0.5">
                    {item.selectedVariant ?? item.product.specs.scentOrFinish[lang]}
                  </p>
                  <p className="text-sm font-extrabold text-[#7C4D15] mt-1 tabular-nums">
                    {item.product.price} {t.shop.currency}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center border border-[#D4C5AC] rounded-lg bg-[#FAF7F2] h-9">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      className="w-8 h-full font-bold text-[#2B2118] hover:bg-[#EFE7D8] cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#1C1510] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="w-8 h-full font-bold text-[#2B2118] hover:bg-[#EFE7D8] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    aria-label={`Remove ${item.product.name[lang]}`}
                    className="p-2 rounded-lg text-[#991B1B] hover:bg-[#FEF2F2] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary & Checkout Form */}
          <div className="lg:col-span-5 bg-white border border-[#DED2BC] rounded-2xl p-6 space-y-6 shadow-xs">
            {/* Promo Code */}
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={t.cart.promoPlaceholder}
                className="flex-1 h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-xs font-semibold text-[#1C1510] uppercase"
              />
              <button
                type="button"
                onClick={() => setAppliedPromo(promoInput)}
                className="px-4 h-10 rounded-lg bg-[#2B2118] text-white text-xs font-bold hover:bg-[#7C4D15] transition-colors cursor-pointer"
              >
                {t.cart.apply}
              </button>
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-2.5 text-sm border-b border-[#EDE4D3] pb-4 tabular-nums">
              <div className="flex justify-between text-[#4A3828]">
                <span>{t.cart.subtotal}</span>
                <span className="font-bold text-[#1C1510]">
                  {summary.subtotal} {t.shop.currency}
                </span>
              </div>
              {summary.productDiscountSavings > 0 && (
                <div className="flex justify-between text-[#1F6E43]">
                  <span>{t.cart.savings}</span>
                  <span className="font-bold">
                    -{summary.productDiscountSavings} {t.shop.currency}
                  </span>
                </div>
              )}
              {summary.promoDiscount > 0 && (
                <div className="flex justify-between text-[#1F6E43]">
                  <span>LUXOR10 (10%)</span>
                  <span className="font-bold">
                    -{summary.promoDiscount} {t.shop.currency}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#4A3828]">
                <span>{t.cart.shipping}</span>
                <span className="font-bold text-[#1C1510]">
                  {summary.shippingFee === 0
                    ? t.cart.free
                    : `${summary.shippingFee} ${t.shop.currency}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#1C1510] pt-2 border-t border-[#EDE4D3]">
                <span>{t.cart.total}</span>
                <span>
                  {summary.total} {t.shop.currency}
                </span>
              </div>
            </div>

            {/* Customer Delivery Form */}
            <form onSubmit={handleCheckout} className="space-y-3.5" noValidate>
              <h2 className="text-sm font-bold text-[#1C1510]">
                {t.cart.checkoutTitle}
              </h2>

              {formError && (
                <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs font-semibold text-[#991B1B]">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#2B2118] mb-1">
                  {t.cart.customerName} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2B2118] mb-1">
                    {t.cart.customerPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2B2118] mb-1">
                    {t.cart.customerCity}
                  </label>
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B2118] mb-1">
                  {t.cart.customerAddress} *
                </label>
                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B2118] mb-1">
                  {t.cart.customerNotes}
                </label>
                <input
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#7C4D15] hover:bg-[#5E380C] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.cart.completeOrderWhatsApp}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface WishlistPageProps {
  lang: Lang;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (path: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  lang,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang];
  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1510]">
          {t.nav.wishlist} ({savedProducts.length})
        </h1>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white border border-[#DED2BC] rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F3E9D8] text-[#7C4D15] flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <p className="text-base font-bold text-[#1C1510]">
            {lang === 'ar'
              ? 'قائمة المفضلة فارغة حالياً'
              : 'You have not saved any favorites yet'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="px-6 py-3 rounded-xl bg-[#7C4D15] hover:bg-[#5E380C] text-white text-xs font-bold cursor-pointer"
          >
            {t.cart.exploreShop}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface LegalPageProps {
  page: 'faq' | 'privacy' | 'terms';
  lang: Lang;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  page,
  lang,
  onNavigate,
}) => {
  const isAr = lang === 'ar';

  const content = {
    faq: {
      icon: HelpCircle,
      title: isAr ? 'الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions (FAQ)',
      subtitle: isAr
        ? 'كل ما تود معرفته عن منتجات فيولا هاند ميد الأقصر والشحن والطلبات الخاصة'
        : 'Everything you need to know about Viola Handmade Luxor products, shipping & custom orders',
      items: isAr
        ? [
            {
              q: 'هل الشموع مصنوعة من شمع طبيعي آمن؟',
              a: 'نعم، جميع شموع فيولا مصنوعة يدوياً في الأقصر من شمع الصويا الطبيعي ١٠٠٪ وشمع العسل النقي مع فتائل قطنية وخشبية خالية من الرصاص وزيوت عطرية آمنة تماماً.',
            },
            {
              q: 'كم يستغرق توصيل الطلبات داخل مصر؟',
              a: 'يتم التوصيل داخل الأقصر خلال ٢٤ ساعة، وإلى القاهرة والإسكندرية وباقي المحافظات خلال ٢ إلى ٤ أيام عمل في تغليف مبطن ومؤمّن.',
            },
            {
              q: 'هل يمكن تنفيذ توزيعات وهدايا خاصة للأفراح والفنادق؟',
              a: 'بالتأكيد! نوفر أسعاراً خاصة وتخصيصاً للألوان والعطور والأسماء لتوزيعات الخطوبة والزفاف والبازارات السياحية والفنادق.',
            },
          ]
        : [
            {
              q: 'Are your candles made with 100% natural wax?',
              a: 'Yes! Every Viola candle is hand-poured in our Luxor studio using 100% natural soy wax and pure beeswax with lead-free cotton or wooden wicks and premium essential oils.',
            },
            {
              q: 'How long does shipping take across Egypt?',
              a: 'Same-day or next-day delivery inside Luxor, and 2–4 business days to Cairo, Alexandria, and all Egyptian governorates with shock-proof artisan packaging.',
            },
            {
              q: 'Do you accept custom bridal favors or hotel wholesale orders?',
              a: 'Absolutely. Reach out via our Contact page or WhatsApp (+201070090679) for custom scents, engraved tags, and wholesale pricing.',
            },
          ],
    },
    privacy: {
      icon: Shield,
      title: isAr ? 'سياسة الخصوصية' : 'Privacy Policy',
      subtitle: isAr
        ? 'التزامنا بحماية بياناتك الشخصية عند التسوق من فيولا هاند ميد الأقصر'
        : 'How Viola Handmade Luxor protects your personal information and order details',
      items: isAr
        ? [
            {
              q: 'البيانات التي نجمعها',
              a: 'نجمع فقط البيانات الضرورية لتوصيل طلبك بنجاح (الاسم، رقم الهاتف، والعنوان) ولا نقوم بمشاركتها مع أي طرف ثالث إلا شركة الشحن المعتمدة.',
            },
            {
              q: 'أمان التواصل والمدفوعات',
              a: 'تتم جميع طلبات الدفع عند الاستلام أو عبر القنوات البنكية الرسمية الموثقة لمتجر فيولا هاند ميد الأقصر.',
            },
          ]
        : [
            {
              q: 'Information We Collect',
              a: 'We only collect the contact and delivery details necessary to fulfill your handmade order (Name, Phone Number, Delivery Address). We never sell your data.',
            },
            {
              q: 'Order Security',
              a: 'All orders are verified directly with our Luxor workshop team via WhatsApp or phone prior to dispatch.',
            },
          ],
    },
    terms: {
      icon: FileText,
      title: isAr ? 'الشروط والأحكام' : 'Terms & Conditions',
      subtitle: isAr
        ? 'ضمان الجودة وسياسة الاستبدال والاسترجاع لمدة ٣٠ يوماً'
        : 'Artisan quality guarantee and 30-day replacement & return policy',
      items: isAr
        ? [
            {
              q: 'طبيعة الصناعة اليدوية',
              a: 'نظراً لأن جميع منتجاتنا تُصب وتُنحت يدوياً في الأقصر، قد توجد فروق لونية طفيفة تزيد كل قطعة تفرداً وأصالة.',
            },
            {
              q: 'سياسة الاستبدال والاسترجاع (٣٠ يوماً)',
              a: 'في حال وصول أي قطعة متضررة من الشحن أو غير مطابقة للمواصفات، نقوم باستبدالها فوراً مجاناً أو استرداد كامل المبلغ خلال ٣٠ يوماً.',
            },
          ]
        : [
            {
              q: 'Handcrafted Uniqueness',
              a: 'Because each candle, soap, and Pharaonic relief is individually hand-poured and finished in Luxor, subtle natural variations are a hallmark of authentic artisan craft.',
            },
            {
              q: '30-Day Replacement & Return Policy',
              a: 'If any item arrives damaged in transit, contact us within 30 days for a free immediate replacement or full refund.',
            },
          ],
    },
  }[page];

  const IconComp = content.icon;

  return (
    <div className="pb-20 space-y-12">
      <section className="bg-gradient-to-b from-[#6B461B] via-[#7D5322] to-[#5E3C16] text-white py-14 border-b border-[#4D3010]">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-3">
          <IconComp className="w-8 h-8 text-[#F3D28A] mx-auto" />
          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold">
            {content.title}
          </h1>
          <p className="text-sm sm:text-base text-[#F5EAD8]">
            {content.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {content.items.map((item) => (
          <div
            key={item.q}
            className="bg-white border border-[#DED2BC] rounded-2xl p-6 space-y-2 shadow-xs"
          >
            <h2 className="text-base font-bold text-[#1C1510]">{item.q}</h2>
            <p className="text-sm text-[#3D3024] leading-relaxed">{item.a}</p>
          </div>
        ))}

        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="px-6 py-3 rounded-xl bg-[#2B2118] hover:bg-[#7C4D15] text-white text-xs font-bold cursor-pointer"
          >
            {isAr ? 'العودة إلى المتجر' : 'Return to Shop'}
          </button>
        </div>
      </div>
    </div>
  );
};
