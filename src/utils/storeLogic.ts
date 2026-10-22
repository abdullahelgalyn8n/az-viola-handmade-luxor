import { CategoryId, Product } from '../data/products';

export type SortOption =
  | 'newest'
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc';

export interface ShopFilters {
  category: CategoryId | 'all';
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  featuredOnly: boolean;
  sortBy: SortOption;
}

export const DEFAULT_SHOP_FILTERS: ShopFilters = {
  category: 'all',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 600,
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
  featuredOnly: false,
  sortBy: 'newest',
};

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  originalSubtotal: number;
  productDiscountSavings: number;
  promoDiscount: number;
  shippingFee: number;
  freeShippingRemaining: number;
  total: number;
}

export const FREE_SHIPPING_THRESHOLD = 600;
export const STANDARD_SHIPPING_FEE = 65;

export function filterAndSortProducts(
  products: Product[],
  filters: ShopFilters
): Product[] {
  const q = filters.searchQuery.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (filters.category !== 'all' && p.category !== filters.category) {
      return false;
    }
    if (p.price < filters.minPrice || p.price > filters.maxPrice) {
      return false;
    }
    if (filters.minRating > 0 && p.rating < filters.minRating) {
      return false;
    }
    if (filters.inStockOnly && !p.inStock) {
      return false;
    }
    if (filters.onSaleOnly && !p.discountPercent) {
      return false;
    }
    if (filters.featuredOnly && !p.featured) {
      return false;
    }
    if (q.length > 0) {
      const hay = [
        p.name.en,
        p.name.ar,
        p.subtitle.en,
        p.subtitle.ar,
        p.description.en,
        p.description.ar,
        p.specs.scentOrFinish.en,
        p.specs.scentOrFinish.ar,
        p.category,
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    case 'featured':
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
      break;
    case 'newest':
    default:
      break;
  }

  return sorted;
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  perPage: number
): {
  pageItems: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
} {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    pageItems: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems,
  };
}

export function calculateCartSummary(
  items: CartItem[],
  promoCode?: string
): CartSummary {
  let itemCount = 0;
  let subtotal = 0;
  let originalSubtotal = 0;

  for (const item of items) {
    const qty = Math.max(0, item.quantity);
    itemCount += qty;
    subtotal += item.product.price * qty;
    originalSubtotal += (item.product.originalPrice ?? item.product.price) * qty;
  }

  const productDiscountSavings = Math.max(0, originalSubtotal - subtotal);
  const normalizedCode = (promoCode ?? '').trim().toUpperCase();
  const promoDiscount =
    normalizedCode === 'LUXOR10' || normalizedCode === 'VIOLA10'
      ? Math.round(subtotal * 0.1)
      : 0;

  const afterPromo = Math.max(0, subtotal - promoDiscount);
  const shippingFee =
    itemCount === 0 || afterPromo >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - afterPromo);
  const total = afterPromo + shippingFee;

  return {
    itemCount,
    subtotal,
    originalSubtotal,
    productDiscountSavings,
    promoDiscount,
    shippingFee,
    freeShippingRemaining,
    total,
  };
}

export type RouteMatch =
  | { page: 'home'; path: string }
  | { page: 'shop'; category?: CategoryId; path: string }
  | { page: 'product'; slug: string; path: string }
  | { page: 'about'; path: string }
  | { page: 'contact'; path: string }
  | { page: 'cart'; path: string }
  | { page: 'wishlist'; path: string }
  | { page: 'faq'; path: string }
  | { page: 'privacy'; path: string }
  | { page: 'terms'; path: string };

const VALID_CATEGORIES: CategoryId[] = [
  'candles',
  'soaps',
  'pharaonic-magnets',
  'concrete-art',
  'fire-extinguishers',
];

export function parseRoute(pathname: string): RouteMatch {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/home') {
    return { page: 'home', path: '/' };
  }
  if (clean === '/shop') {
    return { page: 'shop', path: '/shop' };
  }
  if (clean.startsWith('/shop/')) {
    const cat = clean.slice('/shop/'.length) as CategoryId;
    if (VALID_CATEGORIES.includes(cat)) {
      return { page: 'shop', category: cat, path: `/shop/${cat}` };
    }
    return { page: 'shop', path: '/shop' };
  }
  if (clean.startsWith('/product/')) {
    const slug = clean.slice('/product/'.length);
    return { page: 'product', slug, path: `/product/${slug}` };
  }
  if (clean === '/about' || clean === '/about-us') {
    return { page: 'about', path: '/about' };
  }
  if (clean === '/contact' || clean === '/contact-us') {
    return { page: 'contact', path: '/contact' };
  }
  if (clean === '/cart' || clean === '/checkout') {
    return { page: 'cart', path: '/cart' };
  }
  if (clean === '/wishlist') {
    return { page: 'wishlist', path: '/wishlist' };
  }
  if (clean === '/faq') {
    return { page: 'faq', path: '/faq' };
  }
  if (clean === '/privacy' || clean === '/privacy-policy') {
    return { page: 'privacy', path: '/privacy' };
  }
  if (clean === '/terms' || clean === '/terms-and-conditions') {
    return { page: 'terms', path: '/terms' };
  }
  return { page: 'home', path: '/' };
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  summary: CartSummary,
  customer: { name: string; phone: string; city: string; address: string; notes?: string },
  lang: 'en' | 'ar'
): string {
  const lines: string[] = [];
  if (lang === 'ar') {
    lines.push('✨ *طلب جديد من متجر فيولا هاند ميد الأقصر* ✨');
    lines.push('');
    lines.push(`👤 *العميل:* ${customer.name}`);
    lines.push(`📱 *الهاتف:* ${customer.phone}`);
    lines.push(`📍 *المدينة/العنوان:* ${customer.city} - ${customer.address}`);
    if (customer.notes) lines.push(`📝 *ملاحظات:* ${customer.notes}`);
    lines.push('');
    lines.push('🛍️ *المنتجات المطلوبة:*');
    for (const item of items) {
      const v = item.selectedVariant ? ` (${item.selectedVariant})` : '';
      lines.push(
        `• ${item.product.name.ar}${v} × ${item.quantity} = ${item.product.price * item.quantity} ج.م`
      );
    }
    lines.push('');
    lines.push(`💰 *المجموع الفرعي:* ${summary.subtotal} ج.م`);
    if (summary.promoDiscount > 0) {
      lines.push(`🎁 *خصم الكوبون:* -${summary.promoDiscount} ج.م`);
    }
    lines.push(
      `🚚 *الشحن:* ${summary.shippingFee === 0 ? 'مجاني' : `${summary.shippingFee} ج.م`}`
    );
    lines.push(`✅ *الإجمالي النهائي:* ${summary.total} ج.م`);
  } else {
    lines.push('✨ *New Order — Viola Handmade Luxor* ✨');
    lines.push('');
    lines.push(`👤 *Customer:* ${customer.name}`);
    lines.push(`📱 *Phone:* ${customer.phone}`);
    lines.push(`📍 *Address:* ${customer.city} - ${customer.address}`);
    if (customer.notes) lines.push(`📝 *Notes:* ${customer.notes}`);
    lines.push('');
    lines.push('🛍️ *Order Items:*');
    for (const item of items) {
      const v = item.selectedVariant ? ` (${item.selectedVariant})` : '';
      lines.push(
        `• ${item.product.name.en}${v} × ${item.quantity} = ${item.product.price * item.quantity} EGP`
      );
    }
    lines.push('');
    lines.push(`💰 *Subtotal:* ${summary.subtotal} EGP`);
    if (summary.promoDiscount > 0) {
      lines.push(`🎁 *Promo Discount:* -${summary.promoDiscount} EGP`);
    }
    lines.push(
      `🚚 *Shipping:* ${summary.shippingFee === 0 ? 'Free' : `${summary.shippingFee} EGP`}`
    );
    lines.push(`✅ *Total Amount:* ${summary.total} EGP`);
  }
  return lines.join('\n');
}
