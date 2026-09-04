/**
 * Route mapping table for multilingual SEO & seamless client-side switching
 */

export const ROUTE_DEFINITIONS = [
  {
    key: 'home',
    vi: '/',
    en: '/en',
    ko: '/ko',
  },
  {
    key: 'about',
    vi: '/gioi-thieu',
    en: '/en/about',
    ko: '/ko/about',
    aliases: ['/ve-chung-toi', '/ve-chung-toi/gioi-thieu', '/en/gioi-thieu', '/ko/gioi-thieu'],
  },
  {
    key: 'history',
    vi: '/lich-su',
    en: '/en/history',
    ko: '/ko/history',
    aliases: ['/ve-chung-toi/lich-su', '/en/lich-su', '/ko/lich-su'],
  },
  {
    key: 'capabilities',
    vi: '/nang-luc',
    en: '/en/capabilities',
    ko: '/ko/capabilities',
    aliases: ['/en/nang-luc', '/ko/nang-luc'],
  },
  {
    key: 'products',
    vi: '/san-pham',
    en: '/en/products',
    ko: '/ko/products',
    aliases: ['/en/san-pham', '/ko/san-pham'],
  },
  {
    key: 'news',
    vi: '/tin-tuc',
    en: '/en/news',
    ko: '/ko/news',
    aliases: ['/en/tin-tuc', '/ko/tin-tuc'],
  },
  {
    key: 'contact',
    vi: '/lien-he',
    en: '/en/contact',
    ko: '/ko/contact',
    aliases: ['/en/lien-he', '/ko/lien-he'],
  },
  {
    key: 'policy',
    vi: '/chinh-sach',
    en: '/en/policy',
    ko: '/ko/policy',
  },
  {
    key: 'privacy',
    vi: '/chinh-sach-bao-mat',
    en: '/en/privacy-policy',
    ko: '/ko/privacy-policy',
  },
  {
    key: 'terms',
    vi: '/dieu-khoan-su-dung',
    en: '/en/terms-of-service',
    ko: '/ko/terms-of-service',
  },
  {
    key: 'refund',
    vi: '/chinh-sach-doi-tra-hoan-tien',
    en: '/en/refund-policy',
    ko: '/ko/refund-policy',
  },
]

/**
 * Given the current pathname and target language ('vi' | 'en' | 'ko'),
 * compute the target pathname for seamless client-side navigation.
 */
export function getEquivalentRoute(currentPath = '/', targetLang = 'vi') {
  const normalized = currentPath.replace(/\/$/, '') || '/'

  // 1. Check dynamic product detail (/san-pham/:slug, /en/products/:slug, /ko/products/:slug)
  const productDetailMatch = normalized.match(/^(?:\/en\/products|\/ko\/products|\/san-pham|\/en\/san-pham|\/ko\/san-pham)\/([^/]+)$/)
  if (productDetailMatch) {
    const slug = productDetailMatch[1]
    if (targetLang === 'en') return `/en/products/${slug}`
    if (targetLang === 'ko') return `/ko/products/${slug}`
    return `/san-pham/${slug}`
  }

  // 2. Check dynamic news detail (/tin-tuc/:slug, /en/news/:slug, /ko/news/:slug)
  const newsDetailMatch = normalized.match(/^(?:\/en\/news|\/ko\/news|\/tin-tuc|\/en\/tin-tuc|\/ko\/tin-tuc)\/([^/]+)$/)
  if (newsDetailMatch) {
    const slug = newsDetailMatch[1]
    if (targetLang === 'en') return `/en/news/${slug}`
    if (targetLang === 'ko') return `/ko/news/${slug}`
    return `/tin-tuc/${slug}`
  }

  // 3. Match against static definitions
  for (const def of ROUTE_DEFINITIONS) {
    const matches = [def.vi, def.en, def.ko, ...(def.aliases || [])]
    if (matches.includes(normalized)) {
      return def[targetLang] || def.vi
    }
  }

  // 4. Default fallback: Home or language prefix
  if (targetLang === 'en') return '/en'
  if (targetLang === 'ko') return '/ko'
  return '/'
}

/**
 * Get all alternate hreflang URLs for current path
 */
export function getAlternateHreflangUrls(currentPath = '/', origin = 'https://haq.com.vn') {
  return {
    vi: `${origin}${getEquivalentRoute(currentPath, 'vi')}`,
    en: `${origin}${getEquivalentRoute(currentPath, 'en')}`,
    ko: `${origin}${getEquivalentRoute(currentPath, 'ko')}`,
    xDefault: `${origin}${getEquivalentRoute(currentPath, 'vi')}`,
  }
}
