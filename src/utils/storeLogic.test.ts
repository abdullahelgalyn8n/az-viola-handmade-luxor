import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import {
  DEFAULT_SHOP_FILTERS,
  filterAndSortProducts,
  paginateProducts,
  calculateCartSummary,
  parseRoute,
  buildWhatsAppOrderMessage,
} from './storeLogic';

test('parseRoute resolves dedicated URLs for every page and category', () => {
  assert.deepEqual(parseRoute('/'), { page: 'home', path: '/' });
  assert.deepEqual(parseRoute('/shop'), { page: 'shop', path: '/shop' });
  assert.deepEqual(parseRoute('/shop/candles'), {
    page: 'shop',
    category: 'candles',
    path: '/shop/candles',
  });
  assert.deepEqual(parseRoute('/product/queen-nefertiti-sunset-medallion-candle'), {
    page: 'product',
    slug: 'queen-nefertiti-sunset-medallion-candle',
    path: '/product/queen-nefertiti-sunset-medallion-candle',
  });
  assert.deepEqual(parseRoute('/about'), { page: 'about', path: '/about' });
  assert.deepEqual(parseRoute('/contact'), { page: 'contact', path: '/contact' });
  assert.deepEqual(parseRoute('/cart'), { page: 'cart', path: '/cart' });
  assert.deepEqual(parseRoute('/faq'), { page: 'faq', path: '/faq' });
});

test('filterAndSortProducts filters by category, price, sale, and bilingual search query', () => {
  const candles = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_SHOP_FILTERS,
    category: 'candles',
  });
  assert.ok(candles.length >= 8);
  assert.ok(candles.every((p) => p.category === 'candles'));

  const onSale = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_SHOP_FILTERS,
    onSaleOnly: true,
  });
  assert.ok(onSale.length >= 6);
  assert.ok(onSale.every((p) => (p.discountPercent ?? 0) > 0));

  const arabicSearch = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_SHOP_FILTERS,
    searchQuery: 'نفرتيتي',
  });
  assert.ok(arabicSearch.length >= 2);

  const sortedByPrice = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_SHOP_FILTERS,
    sortBy: 'price-asc',
  });
  for (let i = 1; i < sortedByPrice.length; i++) {
    assert.ok(sortedByPrice[i].price >= sortedByPrice[i - 1].price);
  }
});

test('paginateProducts returns expected slice and page boundaries', () => {
  const page1 = paginateProducts(PRODUCTS, 1, 9);
  assert.equal(page1.pageItems.length, 9);
  assert.equal(page1.currentPage, 1);
  assert.equal(page1.totalPages, Math.ceil(PRODUCTS.length / 9));
});

test('calculateCartSummary computes subtotal, promo discount, and free shipping threshold', () => {
  const item1 = PRODUCTS[0]; // 100 EGP
  const item2 = PRODUCTS.find((p) => p.id === 'p-magnet-bronze')!; // 350 EGP (orig 500)

  const summary = calculateCartSummary(
    [
      { product: item1, quantity: 1 },
      { product: item2, quantity: 1 },
    ],
    'LUXOR10'
  );

  assert.equal(summary.itemCount, 2);
  assert.equal(summary.subtotal, 450);
  assert.equal(summary.originalSubtotal, 600);
  assert.equal(summary.productDiscountSavings, 150);
  assert.equal(summary.promoDiscount, 45);
  assert.equal(summary.shippingFee, 65);
  assert.equal(summary.total, 450 - 45 + 65);

  const msg = buildWhatsAppOrderMessage(
    [{ product: item1, quantity: 2 }],
    calculateCartSummary([{ product: item1, quantity: 2 }]),
    { name: 'Amr', phone: '01070090679', city: 'Luxor', address: 'Karnak St' },
    'ar'
  );
  assert.ok(msg.includes('Amr'));
  assert.ok(msg.includes(item1.name.ar));
});
