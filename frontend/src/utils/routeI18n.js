/**
 * Route mapping table for multilingual SEO & seamless client-side switching
 */

export const ROUTE_DEFINITIONS = [
  {
    key: 'home',
    vi: '/',
    en: '/en',
    ko: '/ko',
    zh: '/zh',
  },
  {
    key: 'about',
    vi: '/gioi-thieu',
    en: '/en/about',
    ko: '/ko/about',
    zh: '/zh/about',
    aliases: ['/ve-chung-toi', '/ve-chung-toi/gioi-thieu', '/en/gioi-thieu', '/ko/gioi-thieu', '/zh/gioi-thieu'],
  },
  {
    key: 'history',
    vi: '/lich-su',
    en: '/en/history',
    ko: '/ko/history',
    zh: '/zh/history',
    aliases: ['/ve-chung-toi/lich-su', '/en/lich-su', '/ko/lich-su', '/zh/lich-su'],
  },
  {
    key: 'capabilities',
    vi: '/nang-luc',
    en: '/en/capabilities',
    ko: '/ko/capabilities',
    zh: '/zh/capabilities',
    aliases: ['/en/nang-luc', '/ko/nang-luc', '/zh/nang-luc'],
  },
  {
    key: 'products',
    vi: '/san-pham',
    en: '/en/products',
    ko: '/ko/products',
    zh: '/zh/products',
    aliases: ['/en/san-pham', '/ko/san-pham', '/zh/san-pham'],
  },
  {
    key: 'news',
    vi: '/tin-tuc',
    en: '/en/news',
    ko: '/ko/news',
    zh: '/zh/news',
    aliases: ['/en/tin-tuc', '/ko/tin-tuc', '/zh/tin-tuc'],
  },
  {
    key: 'careers',
    vi: '/tuyen-dung',
    en: '/en/careers',
    ko: '/ko/careers',
    zh: '/zh/careers',
    aliases: ['/en/tuyen-dung', '/ko/tuyen-dung', '/zh/tuyen-dung'],
  },
  {
    key: 'contact',
    vi: '/lien-he',
    en: '/en/contact',
    ko: '/ko/contact',
    zh: '/zh/contact',
    aliases: ['/en/lien-he', '/ko/lien-he', '/zh/lien-he'],
  },
  {
    key: 'policy',
    vi: '/chinh-sach',
    en: '/en/policy',
    ko: '/ko/policy',
    zh: '/zh/policy',
  },
  {
    key: 'privacy',
    vi: '/chinh-sach-bao-mat',
    en: '/en/privacy-policy',
    ko: '/ko/privacy-policy',
    zh: '/zh/privacy-policy',
  },
  {
    key: 'terms',
    vi: '/dieu-khoan-su-dung',
    en: '/en/terms-of-service',
    ko: '/ko/terms-of-service',
    zh: '/zh/terms-of-service',
  },
  {
    key: 'refund',
    vi: '/chinh-sach-doi-tra-hoan-tien',
    en: '/en/refund-policy',
    ko: '/ko/refund-policy',
    zh: '/zh/refund-policy',
  },
]

/**
 * Given the current pathname and target language ('vi' | 'en' | 'ko' | 'zh'),
 * compute the target pathname for seamless client-side navigation.
 */
export function getEquivalentRoute(currentPath = '/', targetLang = 'vi') {
  const normalized = currentPath.replace(/\/$/, '') || '/'

  // 1. Check dynamic product detail (/san-pham/:slug, /en/products/:slug, /ko/products/:slug, /zh/products/:slug)
  const productDetailMatch = normalized.match(/^(?:\/en\/products|\/ko\/products|\/zh\/products|\/san-pham|\/en\/san-pham|\/ko\/san-pham|\/zh\/san-pham)\/([^/]+)$/)
  if (productDetailMatch) {
    const slug = productDetailMatch[1]
    if (targetLang === 'en') return `/en/products/${slug}`
    if (targetLang === 'ko') return `/ko/products/${slug}`
    if (targetLang === 'zh') return `/zh/products/${slug}`
    return `/san-pham/${slug}`
  }

  // 2. Check dynamic news detail (/tin-tuc/:slug, /en/news/:slug, /ko/news/:slug, /zh/news/:slug)
  const newsDetailMatch = normalized.match(/^(?:\/en\/news|\/ko\/news|\/zh\/news|\/tin-tuc|\/en\/tin-tuc|\/ko\/tin-tuc|\/zh\/tin-tuc)\/([^/]+)$/)
  if (newsDetailMatch) {
    const slug = newsDetailMatch[1]
    if (targetLang === 'en') return `/en/news/${slug}`
    if (targetLang === 'ko') return `/ko/news/${slug}`
    if (targetLang === 'zh') return `/zh/news/${slug}`
    return `/tin-tuc/${slug}`
  }

  // 3. Match against static definitions
  for (const def of ROUTE_DEFINITIONS) {
    const matches = [def.vi, def.en, def.ko, def.zh, ...(def.aliases || [])]
    if (matches.includes(normalized)) {
      return def[targetLang] || def.vi
    }
  }

  // 4. Default fallback: Home or language prefix
  if (targetLang === 'en') return '/en'
  if (targetLang === 'ko') return '/ko'
  if (targetLang === 'zh') return '/zh'
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
    zh: `${origin}${getEquivalentRoute(currentPath, 'zh')}`,
    xDefault: `${origin}${getEquivalentRoute(currentPath, 'vi')}`,
  }
}

/**
 * Helper sinh đường dẫn chi tiết sản phẩm theo ngôn ngữ hiện tại
 */
export function getProductDetailUrl(slug, language = 'vi') {
  const cleanSlug = slug || ''
  if (language === 'en') return `/en/products/${cleanSlug}`
  if (language === 'ko') return `/ko/products/${cleanSlug}`
  if (language === 'zh') return `/zh/products/${cleanSlug}`
  return `/san-pham/${cleanSlug}`
}

/**
 * Helper sinh đường dẫn trang danh mục sản phẩm theo ngôn ngữ
 */
export function getProductsPageUrl(language = 'vi') {
  if (language === 'en') return '/en/products'
  if (language === 'ko') return '/ko/products'
  if (language === 'zh') return '/zh/products'
  return '/san-pham'
}

/**
 * Helper sinh đường dẫn trang chủ theo ngôn ngữ
 */
export function getHomeUrl(language = 'vi') {
  if (language === 'en') return '/en'
  if (language === 'ko') return '/ko'
  if (language === 'zh') return '/zh'
  return '/'
}

/**
 * Helper sinh đường dẫn trang liên hệ theo ngôn ngữ
 */
export function getContactUrl(language = 'vi') {
  if (language === 'en') return '/en/contact'
  if (language === 'ko') return '/ko/contact'
  if (language === 'zh') return '/zh/contact'
  return '/lien-he'
}

/**
 * Helper sinh đường dẫn trang giới thiệu theo ngôn ngữ
 */
export function getAboutUrl(language = 'vi') {
  if (language === 'en') return '/en/about'
  if (language === 'ko') return '/ko/about'
  if (language === 'zh') return '/zh/about'
  return '/gioi-thieu'
}

/**
 * Helper sinh đường dẫn trang lịch sử / dấu mốc theo ngôn ngữ
 */
export function getHistoryUrl(language = 'vi') {
  if (language === 'en') return '/en/history'
  if (language === 'ko') return '/ko/history'
  if (language === 'zh') return '/zh/history'
  return '/lich-su'
}

/**
 * Helper sinh đường dẫn trang năng lực sản xuất theo ngôn ngữ
 */
export function getCapabilitiesUrl(language = 'vi') {
  if (language === 'en') return '/en/capabilities'
  if (language === 'ko') return '/ko/capabilities'
  if (language === 'zh') return '/zh/capabilities'
  return '/nang-luc'
}

/**
 * Helper sinh đường dẫn trang tin tức theo ngôn ngữ
 */
export function getNewsUrl(language = 'vi') {
  if (language === 'en') return '/en/news'
  if (language === 'ko') return '/ko/news'
  if (language === 'zh') return '/zh/news'
  return '/tin-tuc'
}

/**
 * Helper sinh đường dẫn chi tiết bài viết theo ngôn ngữ
 */
export function getNewsDetailUrl(slug, language = 'vi') {
  const cleanSlug = slug || ''
  if (language === 'en') return `/en/news/${cleanSlug}`
  if (language === 'ko') return `/ko/news/${cleanSlug}`
  if (language === 'zh') return `/zh/news/${cleanSlug}`
  return `/tin-tuc/${cleanSlug}`
}

/**
 * Helper sinh đường dẫn trang tuyển dụng theo ngôn ngữ
 */
export function getCareersUrl(language = 'vi') {
  if (language === 'en') return '/en/careers'
  if (language === 'ko') return '/ko/careers'
  if (language === 'zh') return '/zh/careers'
  return '/tuyen-dung'
}

/**
 * Helper sinh đường dẫn chính sách hoàn tiền theo ngôn ngữ
 */
export function getRefundPolicyUrl(language = 'vi') {
  if (language === 'en') return '/en/refund-policy'
  if (language === 'ko') return '/ko/refund-policy'
  if (language === 'zh') return '/zh/refund-policy'
  return '/chinh-sach-doi-tra-hoan-tien'
}

/**
 * Helper sinh đường dẫn chính sách bảo mật theo ngôn ngữ
 */
export function getPrivacyPolicyUrl(language = 'vi') {
  if (language === 'en') return '/en/privacy-policy'
  if (language === 'ko') return '/ko/privacy-policy'
  if (language === 'zh') return '/zh/privacy-policy'
  return '/chinh-sach-bao-mat'
}

/**
 * Helper sinh đường dẫn điều khoản sử dụng theo ngôn ngữ
 */
export function getTermsUrl(language = 'vi') {
  if (language === 'en') return '/en/terms-of-service'
  if (language === 'ko') return '/ko/terms-of-service'
  if (language === 'zh') return '/zh/terms-of-service'
  return '/dieu-khoan-su-dung'
}

/**
 * Helper sinh đường dẫn chính sách / công bố sản phẩm theo ngôn ngữ
 */
export function getPolicyUrl(language = 'vi') {
  if (language === 'en') return '/en/policy'
  if (language === 'ko') return '/ko/policy'
  if (language === 'zh') return '/zh/policy'
  return '/chinh-sach'
}


