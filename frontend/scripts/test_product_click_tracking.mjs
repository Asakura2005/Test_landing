import assert from 'node:assert'

// Setup mock window, document, localStorage, sessionStorage before importing modules
const localStorageStore = {}
const sessionStorageStore = {}
const documentListeners = {}

try {
  Object.defineProperty(globalThis.navigator, 'userAgent', {
    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    configurable: true,
    writable: true,
  })
} catch (e) {}

globalThis.window = {
  navigator: globalThis.navigator,
  addEventListener: () => {},
  removeEventListener: () => {},
  location: {
    pathname: '/san-pham/banh-trang-say-gion-vi-cha-bong',
    hostname: 'haq.com.vn',
    href: 'https://haq.com.vn/san-pham/banh-trang-say-gion-vi-cha-bong',
    search: '',
    hash: '',
  },
}
globalThis.location = globalThis.window.location

globalThis.document = {
  referrer: '',
  addEventListener: (evt, handler) => {
    documentListeners[evt] = handler
  },
}

globalThis.localStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val) },
  removeItem: (key) => { delete localStorageStore[key] },
  clear: () => { for (const k in localStorageStore) delete localStorageStore[k] },
}

globalThis.sessionStorage = {
  getItem: (key) => sessionStorageStore[key] || null,
  setItem: (key, val) => { sessionStorageStore[key] = String(val) },
  removeItem: (key) => { delete sessionStorageStore[key] },
  clear: () => { for (const k in sessionStorageStore) delete sessionStorageStore[k] },
}

// Now import the posthog module and i18nData
const { 
  recordProductClick, 
  CANONICAL_PRODUCT_NAMES, 
  formatSlugToCanonicalTitle,
  getRealtimeAnalyticsCounters, 
  initGlobalProductClickListener,
  initPostHog,
} = await import('../src/services/posthog.js')
const { getLocalizedProduct } = await import('../src/utils/i18nData.js')

console.log('=== RUNNING COMPREHENSIVE PRODUCT CLICK TRACKING VERIFICATION ===\n')

let passedTests = 0

// TEST 1: Vietnamese Product Click - "Bánh Tráng Sấy Giòn Vị Chà Bông"
console.log('Test 1: Vietnamese Product Click - "Bánh Tráng Sấy Giòn Vị Chà Bông"')
const viProduct = {
  id: 'prod_chabong_01',
  name: 'Bánh Tráng Sấy Giòn Vị Chà Bông',
  slug: 'banh-trang-say-gion-vi-cha-bong',
  category: 'Bánh Tráng Sấy',
  price_min: 25000,
}

const viClickResult = recordProductClick(viProduct, 'product_grid', { language: 'vi' })
assert(viClickResult !== null, 'Click result should not be null')
assert.strictEqual(viClickResult.product_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông')
assert.strictEqual(viClickResult.canonical_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông')
assert.strictEqual(viClickResult.product_slug, 'banh-trang-say-gion-vi-cha-bong')
assert.strictEqual(viClickResult.language, 'vi')
assert.strictEqual(viClickResult.click_location, 'product_grid')
assert.strictEqual(viClickResult.target_url, '/san-pham/banh-trang-say-gion-vi-cha-bong')
assert.strictEqual(viClickResult.price_min, 25000)
console.log('  -> PASS: Correct canonical name, localized name, language, slug, and location.')
passedTests++

// TEST 2: 600ms Click Deduplication
console.log('\nTest 2: 600ms Click Deduplication (Prevent double tracking from card onClick + global listener)')
const immediateDuplicate = recordProductClick(viProduct, 'global_link', { language: 'vi' })
assert.strictEqual(immediateDuplicate, null, 'Immediate duplicate click within 600ms must return null')
console.log('  -> PASS: Duplicate click within 600ms was successfully ignored.')
passedTests++

// TEST 3: Multi-language Support (EN, KO, ZH) retains Canonical Name
console.log('\nTest 3: Multi-language Support (EN, KO, ZH) retains Canonical Name')
// English
const enLocalized = getLocalizedProduct(viProduct, 'en')
assert(enLocalized.name !== viProduct.name, 'Localized EN name should differ from Vietnamese')
assert.strictEqual(enLocalized.canonical_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông', 'Canonical name must stay Vietnamese')

// Wait 650ms to exceed dedupe threshold
await new Promise(r => setTimeout(r, 650))

const enClickResult = recordProductClick(enLocalized, 'product_grid', { language: 'en' })
assert(enClickResult !== null, 'EN click result should not be null after delay')
assert.strictEqual(enClickResult.canonical_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông', 'Canonical name must be Vietnamese')
assert.strictEqual(enClickResult.product_name, enLocalized.name, 'Product name must be localized English')
assert.strictEqual(enClickResult.language, 'en')
assert.strictEqual(enClickResult.target_url, '/en/products/banh-trang-say-gion-vi-cha-bong')
console.log(`  -> PASS (EN): product_name="${enClickResult.product_name}", canonical_name="${enClickResult.canonical_name}"`)

// Korean
await new Promise(r => setTimeout(r, 650))
const koLocalized = getLocalizedProduct(viProduct, 'ko')
const koClickResult = recordProductClick(koLocalized, 'nav_megamenu', { language: 'ko' })
assert.strictEqual(koClickResult.canonical_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông')
assert.strictEqual(koClickResult.language, 'ko')
console.log(`  -> PASS (KO): product_name="${koClickResult.product_name}", canonical_name="${koClickResult.canonical_name}"`)

// Chinese
await new Promise(r => setTimeout(r, 650))
const zhLocalized = getLocalizedProduct(viProduct, 'zh')
const zhClickResult = recordProductClick(zhLocalized, 'featured_spotlight', { language: 'zh' })
assert.strictEqual(zhClickResult.canonical_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông')
assert.strictEqual(zhClickResult.language, 'zh')
console.log(`  -> PASS (ZH): product_name="${zhClickResult.product_name}", canonical_name="${zhClickResult.canonical_name}"`)
passedTests++

// TEST 4: Dynamic Products from DB (not pre-defined in static dictionary)
console.log('\nTest 4: Dynamic / Future Product from DB (not in static dictionary)')
const dynamicDbProduct = {
  id: 'prod_future_custom_99',
  name: 'Bánh Tráng Sấy Rong Biển Sốt Tiêu',
  slug: 'banh-trang-say-rong-bien-sot-tieu',
  category: 'Bánh Tráng Sấy',
  price_min: 32000,
}

await new Promise(r => setTimeout(r, 650))
const dynamicViClick = recordProductClick(dynamicDbProduct, 'product_grid', { language: 'vi' })
assert.strictEqual(dynamicViClick.canonical_name, 'Bánh Tráng Sấy Rong Biển Sốt Tiêu')
assert.strictEqual(dynamicViClick.product_name, 'Bánh Tráng Sấy Rong Biển Sốt Tiêu')
assert.strictEqual(dynamicViClick.product_slug, 'banh-trang-say-rong-bien-sot-tieu')

await new Promise(r => setTimeout(r, 650))
const dynamicEn = getLocalizedProduct(dynamicDbProduct, 'en')
const dynamicEnClick = recordProductClick(dynamicEn, 'product_grid', { language: 'en' })
assert.strictEqual(dynamicEnClick.canonical_name, 'Bánh Tráng Sấy Rong Biển Sốt Tiêu')
console.log('  -> PASS: Dynamic product without static dictionary entry cleanly preserves canonical name across languages.')
passedTests++

// TEST 5: Security / Route Exclusion - Admin pages should NEVER track product clicks
console.log('\nTest 5: Security Route Exclusion - /admin path clicks dropped')
globalThis.window.location.pathname = '/admin/products'
const adminClick = recordProductClick(viProduct, 'admin_table', { language: 'vi' })
assert.strictEqual(adminClick, null, 'Clicks from /admin must be strictly dropped')
globalThis.window.location.pathname = '/san-pham'
console.log('  -> PASS: Admin path interactions are safely excluded from tracking.')
passedTests++

// TEST 6: Realtime Counter Increment
console.log('\nTest 6: Realtime Counter Verification')
const counters = getRealtimeAnalyticsCounters()
assert(counters.productClicks > 0, 'productClicks counter must be incremented')
console.log(`  -> PASS: Realtime counters record ${counters.productClicks} product clicks.`)
passedTests++

// TEST 7: Lead/Session Storage Context Persistence
console.log('\nTest 7: Lead Context Persistence (sessionStorage)')
const savedLeadContext = JSON.parse(sessionStorageStore['haq_last_viewed_product'])
assert(savedLeadContext !== null, 'Lead context must be stored in sessionStorage')
assert.strictEqual(savedLeadContext.canonical_name, 'Bánh Tráng Sấy Rong Biển Sốt Tiêu')
console.log('  -> PASS: Contact form / lead submission context contains clicked product data.')
passedTests++

// TEST 8: Global Delegated Click Listener with Dynamic HTML Links
console.log('\nTest 8: Global Delegated Click Listener on Unwired Links / HTML')
initGlobalProductClickListener()
assert(typeof documentListeners['click'] === 'function', 'Document click listener must be registered')

await new Promise(r => setTimeout(r, 650))
const prevClicks = getRealtimeAnalyticsCounters().productClicks

const mockDynamicAnchor = {
  getAttribute: (attr) => {
    if (attr === 'href') return '/san-pham/banh-trang-nuong-mam-ruoc-moi'
    return null
  },
  querySelector: (sel) => ({ textContent: 'Bánh Tráng Nướng Mắm Ruốc Mới' }),
}
mockDynamicAnchor.closest = (sel) => {
  if (sel.includes('/san-pham/')) return mockDynamicAnchor
  return null
}
const mockInnerSpan = {
  closest: (sel) => mockDynamicAnchor.closest(sel),
}

// Simulate user clicking on inner span of product link
documentListeners['click']({ target: mockInnerSpan })

const newClicks = getRealtimeAnalyticsCounters().productClicks
assert.strictEqual(newClicks, prevClicks + 1, 'Global click listener must increment productClicks counter')

const lastLogged = JSON.parse(localStorageStore['haq_analytics_event_logs'])[0]
assert.strictEqual(lastLogged.product_slug, 'banh-trang-nuong-mam-ruoc-moi')
assert.strictEqual(lastLogged.product_name, 'Bánh Tráng Nướng Mắm Ruốc Mới')
console.log('  -> PASS: Global delegated listener intercepted unwired link and recorded product click.')
passedTests++

// TEST 9: Noise Exclusion - Generic page clicks must be ignored
console.log('\nTest 9: Noise Exclusion - Generic Non-Product Clicks')
const noiseTarget = {
  closest: () => null, // Not a product card or link
}
const beforeNoiseCount = getRealtimeAnalyticsCounters().productClicks
documentListeners['click']({ target: noiseTarget })
const afterNoiseCount = getRealtimeAnalyticsCounters().productClicks
assert.strictEqual(beforeNoiseCount, afterNoiseCount, 'Non-product clicks must NOT increment productClicks')
console.log('  -> PASS: Non-product clicks across the site are completely ignored.')
passedTests++

// TEST 10: React Priority over DOM Fallback (Upgrade Mechanism)
console.log('\nTest 10: React Priority over DOM Fallback (Rich metadata preserved when DOM listener triggers first)')
await new Promise(r => setTimeout(r, 650))
const richProduct = {
  id: 'prod_rich_01',
  name: 'Crispy Rice Paper (Special)',
  canonical_name: 'Bánh Tráng Sấy Đặc Biệt',
  slug: 'banh-trang-say-dac-biet',
  category: 'Bánh Tráng',
  price_min: 45000,
}

// 1. Fallback listener fires first (source: 'dom_fallback') with minimal info
const fallbackResult = recordProductClick({
  id: 'prod_rich_01',
  slug: 'banh-trang-say-dac-biet',
  name: 'Crispy Rice Paper (Special)',
}, 'global_link', { source: 'dom_fallback', language: 'en' })
assert(fallbackResult !== null, 'Fallback click should be recorded')
assert.strictEqual(fallbackResult.price_min, 0, 'Fallback had no price')

// 2. React onClick fires 2ms later with RICH object (source: 'react')
const reactResult = recordProductClick(richProduct, 'product_grid', { source: 'react', language: 'en' })
assert(reactResult !== null, 'React click MUST NOT be blocked by preceding fallback within 600ms!')
assert.strictEqual(reactResult.price_min, 45000, 'Rich price_min must be preserved')
assert.strictEqual(reactResult.canonical_name, 'Bánh Tráng Sấy Đặc Biệt', 'Rich canonical name must be preserved')
assert.strictEqual(reactResult.click_location, 'product_grid', 'React location must be preserved')
console.log('  -> PASS: React handler successfully upgrades fallback record and preserves full metadata.')
passedTests++

// TEST 11: URL with Query Parameters and Hashes Slug Extraction
console.log('\nTest 11: Complex URL with query params and hash correctly extracts slug & canonical name')
await new Promise(r => setTimeout(r, 650))
const complexAnchor = {
  getAttribute: (attr) => {
    if (attr === 'href') return '/san-pham/banh-trang-say-gion-vi-cha-bong?ref=facebook&utm_campaign=summer#reviews'
    return null
  },
  querySelector: () => ({ textContent: 'Bánh Tráng Sấy Giòn Vị Chà Bông' }),
}
complexAnchor.closest = (sel) => complexAnchor

documentListeners['click']({ target: complexAnchor })
const complexLogged = JSON.parse(localStorageStore['haq_analytics_event_logs'])[0]
assert.strictEqual(complexLogged.product_slug, 'banh-trang-say-gion-vi-cha-bong')
assert.strictEqual(complexLogged.canonical_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông')
console.log('  -> PASS: Complex URL query and hash correctly parsed to extract slug and canonical name.')
passedTests++

// TEST 12: Repeated localization calls preserve canonical_name
console.log('\nTest 12: Repeated getLocalizedProduct calls preserve canonical_name')
const rawDb = { id: 'p_10', name: 'Bánh Đậu Xanh Tươi', slug: 'banh-dau-xanh-tuoi' }
const loc1 = getLocalizedProduct(rawDb, 'en')
assert.strictEqual(loc1.canonical_name, 'Bánh Đậu Xanh Tươi')
// Call again with already-localized product (simulating React rerenders)
const loc2 = getLocalizedProduct(loc1, 'en')
assert.strictEqual(loc2.canonical_name, 'Bánh Đậu Xanh Tươi', 'Repeated localization must not overwrite canonical_name')
console.log('  -> PASS: Canonical name idempotency preserved across repeated localization passes.')
passedTests++

// TEST 13: formatSlugToCanonicalTitle fallback for new DB products without static entry
console.log('\nTest 13: formatSlugToCanonicalTitle fallback formatting')
const formatted = formatSlugToCanonicalTitle('banh-trang-say-rong-bien-chay')
assert.strictEqual(formatted, 'Banh Trang Say Rong Bien Chay')
const mapped = formatSlugToCanonicalTitle('banh-trang-say-gion-vi-cha-bong')
assert.strictEqual(mapped, 'Bánh Tráng Sấy Giòn Vị Chà Bông')
console.log('  -> PASS: Slug title formatting correctly produces readable canonical identifiers.')
passedTests++

// TEST 14: Marketplace purchase intent click tracking
console.log('\nTest 14: Marketplace Outbound Click Tracking')
await new Promise(r => setTimeout(r, 650))
const marketplaceClick = recordProductClick(viProduct, 'marketplace_shopee', {
  channel: 'shopee',
  outbound_url: 'https://shopee.vn/product/12345',
  language: 'vi'
})
assert(marketplaceClick !== null, 'Marketplace click must be captured')
assert.strictEqual(marketplaceClick.click_location, 'marketplace_shopee')
assert.strictEqual(marketplaceClick.channel, 'shopee')
assert.strictEqual(marketplaceClick.canonical_name, 'Bánh Tráng Sấy Giòn Vị Chà Bông')
console.log('  -> PASS: Marketplace purchase intent click recorded with complete product context.')
passedTests++

console.log(`\n========================================`)
console.log(`ALL ${passedTests} TEST SUITES PASSED PERFECTLY!`)
console.log(`========================================`)
