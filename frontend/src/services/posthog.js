// PostHog Configuration with Env Vars or Graceful Fallback
const POSTHOG_KEY = import.meta.env?.VITE_POSTHOG_KEY || 'phc_demo_haq_food_analytics_key'
const POSTHOG_HOST = import.meta.env?.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

let posthog = null
let posthogLoadingPromise = null
let isInitialized = false

/**
 * Lazy async loader for PostHog client (eliminates 265KB from critical initial bundle)
 */
export async function getPostHogClient() {
  if (posthog) return posthog
  if (typeof window === 'undefined') return null
  if (!posthogLoadingPromise) {
    posthogLoadingPromise = import('posthog-js')
      .then((mod) => {
        posthog = mod.default || mod
        return posthog
      })
      .catch((err) => {
        console.warn('[PostHog] Dynamic load deferred:', err?.message || err)
        return null
      })
  }
  return posthogLoadingPromise
}

// Storage Key versioned to cleanly reset mock baseline to 100% real data
const VIEWS_STORAGE_KEY = 'haq_product_views_real_v1'
const ANALYTICS_COUNTERS_KEY = 'haq_analytics_realtime_counters_v1'

/**
 * Lấy bộ đếm tổng thể các chỉ số Real-time từ LocalStorage
 */
export function getRealtimeAnalyticsCounters() {
  if (typeof window === 'undefined') {
    return { visitors: 0, productViews: 0, productClicks: 0, ctaStarts: 0, pageViews: 0 }
  }
  try {
    const raw = localStorage.getItem(ANALYTICS_COUNTERS_KEY)
    if (!raw) {
      // Calculate from existing product views if any
      const pViews = getProductViewsMap()
      const initialPViewCount = Object.values(pViews).reduce((a, b) => a + Number(b || 0), 0)
      const initial = {
        visitors: initialPViewCount > 0 ? initialPViewCount + 2 : 1,
        productViews: initialPViewCount,
        productClicks: 0,
        ctaStarts: 0,
        pageViews: 1,
      }
      localStorage.setItem(ANALYTICS_COUNTERS_KEY, JSON.stringify(initial))
      return initial
    }
    const parsed = JSON.parse(raw)
    if (parsed.productClicks === undefined) {
      parsed.productClicks = 0
    }
    return parsed
  } catch (e) {
    return { visitors: 0, productViews: 0, productClicks: 0, ctaStarts: 0, pageViews: 0 }
  }
}

/**
 * Tăng bộ đếm cho một loại sự kiện cụ thể
 */
export function incrementAnalyticsCounter(key, amount = 1) {
  if (typeof window === 'undefined') return
  try {
    const counters = getRealtimeAnalyticsCounters()
    counters[key] = (counters[key] || 0) + amount
    localStorage.setItem(ANALYTICS_COUNTERS_KEY, JSON.stringify(counters))
    return counters
  } catch (e) {}
}

/**
 * Ghi nhận một phiên truy cập mới (Unique Visitor per Session)
 */
export function recordSessionVisit() {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin')) return

  try {
    const hasVisitedInThisSession = sessionStorage.getItem('haq_session_visit_recorded')
    if (!hasVisitedInThisSession) {
      sessionStorage.setItem('haq_session_visit_recorded', '1')
      incrementAnalyticsCounter('visitors', 1)
    }
    incrementAnalyticsCounter('pageViews', 1)
  } catch (e) {}
}

/**
 * Kiểm tra xem hiện tại có đang ở trang xem chi tiết sản phẩm hay không
 */
export function isCurrentlyOnProductPage() {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname
  return path.startsWith('/san-pham/') && path !== '/san-pham'
}

/**
 * Lấy thống kê lượt xem tất cả sản phẩm (100% dữ liệu thực tế từ lúc bắt đầu)
 */
export function getProductViewsMap() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(VIEWS_STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify({}))
      return {}
    }
    return JSON.parse(raw) || {}
  } catch (e) {
    return {}
  }
}

/**
 * Ghi nhận thêm 1 lượt xem cho sản phẩm (Chỉ tăng khi người dùng THỰC SỰ bấm xem)
 */
export function recordProductView(product) {
  if (!product || typeof window === 'undefined') return 0
  const slug = product.slug || product.id
  if (!slug) return 0

  try {
    const viewsMap = getProductViewsMap()
    const currentCount = Number(viewsMap[slug] || viewsMap[product.id] || 0)
    const newCount = currentCount + 1
    viewsMap[slug] = newCount
    if (product.id) viewsMap[product.id] = newCount
    localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(viewsMap))

    // Tăng tổng productViews vào bộ đếm realtime
    incrementAnalyticsCounter('productViews', 1)

    return newCount
  } catch (e) {
    return 0
  }
}

/**
 * Lấy danh sách Sản phẩm được xem nhiều nhất (Top Viewed Products)
 * Sắp xếp giảm dần theo lượt xem thực tế (0 nếu chưa có ai xem)
 */
export function getTopViewedProducts(products = [], limit = 5) {
  const viewsMap = getProductViewsMap()

  const enriched = (products || []).map((p) => {
    const slug = p.slug || p.id
    const views = Number(viewsMap[slug] || viewsMap[p.id] || 0)
    return {
      ...p,
      view_count: views,
    }
  })

  // Sắp xếp theo số lượt xem thực tế giảm dần
  return enriched.sort((a, b) => b.view_count - a.view_count).slice(0, limit)
}

/**
 * Danh mục chuẩn tên tiếng Việt (Canonical Names) cho toàn bộ sản phẩm
 * Giúp PostHog ghi nhận đồng nhất dữ liệu click sản phẩm xuyên suốt mọi ngôn ngữ (vi, en, ko, zh)
 */
export const CANONICAL_PRODUCT_NAMES = {
  // Bánh tráng sấy giòn vị chà bông (và các biến thể slug)
  'banh-trang-say-gion-vi-cha-bong': 'Bánh Tráng Sấy Giòn Vị Chà Bông',
  'banh-trang-say-gion-vi-tra-bong': 'Bánh Tráng Sấy Giòn Vị Chà Bông',
  'banh-trang-say-gion-cha-bong': 'Bánh Tráng Sấy Giòn Vị Chà Bông',
  'banh-trang-say-cha-bong': 'Bánh Tráng Sấy Giòn Vị Chà Bông',

  // Bánh tráng sấy giòn vị bò
  'banh-trang-say-gion-vi-bo': 'Bánh Tráng Sấy Giòn Vị Bò',
  'banh-trang-say-gion-bo': 'Bánh Tráng Sấy Giòn Vị Bò',
  'banh-trang-say-bo': 'Bánh Tráng Sấy Giòn Vị Bò',
  'banh-trang-say-gion-vi-sa-te-bo': 'Bánh Tráng Sấy Giòn Vị Sa Tế Bò',
  'banh-trang-tron-sa-te-bo': 'Bánh Tráng Trộn Sa Tế Bò',

  // Bánh tráng sấy giòn vị tôm
  'banh-trang-say-gion-vi-tom': 'Bánh Tráng Sấy Giòn Vị Tôm',
  'banh-trang-say-gion-tom': 'Bánh Tráng Sấy Giòn Vị Tôm',
  'banh-trang-say-tom': 'Bánh Tráng Sấy Giòn Vị Tôm',
  'banh-trang-tron-vi-sa-te-tom': 'Bánh Tráng Trộn Sợi Sa Tế Tôm',
  'banh-trang-tron-sa-te-tom': 'Bánh Tráng Trộn Sợi Sa Tế Tôm',
  'banh-trang-cuon-sate-tom': 'Bánh Tráng Cuộn Sa Tế Tôm',

  // Bánh tráng sấy giòn vị phô mai
  'banh-trang-say-gion-phomai': 'Bánh Tráng Sấy Giòn Vị Phô Mai',
  'banh-trang-say-gion-vi-pho-mai': 'Bánh Tráng Sấy Giòn Vị Phô Mai',
  'banh-trang-say-thuc-cam': 'Bánh Tráng Sấy Thập Cẩm',
  'banh-trang-say-thap-cam': 'Bánh Tráng Sấy Thập Cẩm',

  // Bánh tráng trộn
  'banh-trang-tron-ga-la-chanh': 'Bánh Tráng Trộn Gà Lá Chanh',
  'banh-trang-tron-haq': 'Bánh Tráng Trộn HAQ',

  // Bánh đậu xanh, hạnh nhân, sữa dừa, dẻo
  'banh-dau-xanh-tuoi': 'Bánh Đậu Xanh Tươi',
  'banh-dau-xanh-vi-la-dua': 'Bánh Đậu Xanh Vị Lá Dứa',
  'banh-dau-xanh-tuoi-vi-dau-do': 'Bánh Đậu Xanh Tươi Vị Đậu Đỏ',
  'banh-dau-xanh-mix-vi': 'Bánh Đậu Xanh Tươi Mix Vị',
  'banh-dau-xanh-tuoi-mix-vi': 'Bánh Đậu Xanh Tươi Mix Vị',
  'banh-hanh-nhan': 'Bánh Hạnh Nhân Thượng Hạng',
  'banh-hanh-nhan-truyen-thong': 'Bánh Hạnh Nhân Truyền Thống',
  'banh-hanh-nhan-tra-xanh': 'Bánh Hạnh Nhân Trà Xanh',
  'banh-hanh-nhan-ca-cao': 'Bánh Hạnh Nhân Ca Cao',
  'banh-hanh-nhan-hon-hop': 'Bánh Hạnh Nhân Hỗn Hợp',
  'banh-sua-dua': 'Bánh Sữa Dừa Tươi',
  'banh-sua-dau': 'Bánh Sữa Đậu',
  'banh-cookies': 'Bánh Cookies Thượng Hạng',
  'banh-cha': 'Bánh Chả Truyền Thống Hà Nội',
  'banh-deo-khoai-mon-mochi-cha-bong-trung-muoi': 'Bánh Dẻo Khoai Môn Mochi Chà Bông Trứng Muối',
  'banh-deo-trung-muoi': 'Bánh Dẻo Trứng Muối',

  // Bắp rang bơ
  'bap-rang-bo-caramel': 'Bắp Rang Bơ Caramel',
  'bap-rang-bo-vi-pho-mai': 'Bắp Rang Bơ Phô Mai',
  'bap-rang-bo-pho-mai': 'Bắp Rang Bơ Phô Mai',
  'bap-rang-bo-matcha': 'Bắp Rang Bơ Matcha',
  'bap-rang-bo-vi-truyen-thong': 'Bắp Rang Bơ Truyền Thống',

  // Thịt sấy / khô bò
  'thit-bo-kho-chay-toi': 'Thịt Bò Khô Cháy Tỏi',
  'thit-heo-chay-toi': 'Thịt Heo Khô Cháy Tỏi',
  'kho-bo-sot-chanh': 'Khô Bò Sốt Chanh',
  'kho-vien-vi-bo': 'Khô Viên Vị Bò',
  'kho-soi-vi-bo': 'Khô Sợi Vị Bò',
}

/**
 * Chuyển slug thành Tên Tiêu Đề tiếng Việt không dấu chuẩn (Title Case) khi sản phẩm mới từ DB chưa có từ điển
 */
export function formatSlugToCanonicalTitle(slug) {
  if (!slug || typeof slug !== 'string') return ''
  const clean = slug.trim().toLowerCase()
  if (CANONICAL_PRODUCT_NAMES[clean]) {
    return CANONICAL_PRODUCT_NAMES[clean]
  }
  return clean
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

let lastTrackedProductClick = { key: '', time: 0, source: 'none' }
let isGlobalListenerAttached = false
let initPromise = null

/**
 * Khởi tạo PostHog
 * QUY TẮC BẢO MẬT & TỐI ƯU GHI HÌNH / THU THẬP SỰ KIỆN:
 * - TUYỆT ĐỐI KHÔNG ghi hình tại Trang Admin (/admin/*).
 * - TẮT Autocapture tự động toàn bộ trang web (autocapture: false) để tránh gây nhiễu dữ liệu.
 * - CHỈ THU THẬP click và tương tác đối với sản phẩm (thông qua recordProductClick & global product listener).
 * - disable_session_recording: true để không quay toàn bộ trang web một cách tự động, chỉ bật quay phiên khi có tương tác sản phẩm.
 */
export async function initPostHog() {
  if (typeof window === 'undefined') return null
  if (isInitialized && posthog) {
    initGlobalProductClickListener()
    return posthog
  }
  if (initPromise) return initPromise

  initPromise = (async () => {
    const client = await getPostHogClient()
    if (!client) {
      initGlobalProductClickListener()
      captureAndPersistUTMs()
      return null
    }

    try {
      if (client.__loaded || isInitialized) {
        isInitialized = true
        initGlobalProductClickListener()
        return client
      }

      if (POSTHOG_KEY && POSTHOG_KEY !== 'phc_demo_haq_food_analytics_key') {
        client.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          autocapture: false, // TẮT autocapture toàn web: chỉ ghi nhận click sản phẩm có chủ đích
          capture_pageview: 'always', // Tự động ghi nhận lượt xem trang
          capture_pageleave: true,
          disable_session_recording: true, // Không tự động ghi hình toàn bộ trang web, chỉ ghi hình theo ngữ cảnh sản phẩm
          disable_surveys: true, // Tắt tải surveys.js (tiết kiệm 34 KiB)
          capture_dead_clicks: false, // Tắt dead clicks autocapture (tiết kiệm 8 KiB)
          capture_performance: false, // Tắt web vitals polyfill script (tiết kiệm 6 KiB và loại bỏ array-at polyfill cũ)
          session_recording: {
            maskAllInputs: true, // Che thông tin nhạy cảm ở các ô nhập liệu
          },
          persistence: 'localStorage+cookie',
          before_send: (event) => {
            const path = typeof window !== 'undefined' ? window.location.pathname : ''
            const currentUrl = event?.properties?.['$current_url'] || ''
            const currentPath = event?.properties?.['$pathname'] || ''

            // 1. Loại trừ hoàn toàn 100% trang Admin để bảo mật dữ liệu quản trị
            if (
              path.startsWith('/admin') || 
              currentPath.startsWith('/admin') || 
              currentUrl.includes('/admin')
            ) {
              return null
            }

            // 2. Chặn toàn bộ $autocapture generic clicks (loại bỏ nhiễu click ngoài sản phẩm)
            if (event?.event === '$autocapture') {
              return null
            }

            return event
          },
          loaded: (ph) => {
            try {
              const host = window.location.hostname
              ph.register({
                site_domain: host,
                is_production: host.includes('haq.com.vn'),
              })
            } catch (e) {}
            captureAndPersistUTMs()
          },
        })
      }
      isInitialized = true
    } catch (err) {
      console.warn('PostHog initialization warning:', err?.message || err)
    }

    initGlobalProductClickListener()
    captureAndPersistUTMs()
    return client
  })()

  return initPromise
}

/**
 * Ghi nhận Pageview khi chuyển trang trong React Router
 */
export function trackPageView(pathname) {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin')) return
  try {
    if (posthog && typeof posthog.capture === 'function') {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        pathname: pathname || window.location.pathname,
        site_domain: window.location.hostname,
      })
    }
  } catch (e) {}
}

/**
 * Kích hoạt PostHog Session Recording & Tracking ĐẶC THÙ KHI XEM SẢN PHẨM
 * Ví dụ: Khi truy cập /san-pham/banh-dau-xanh-vi-la-dua hoặc mở modal sản phẩm
 */
export function startProductSessionRecording(product) {
  if (!product || typeof window === 'undefined') return

  // 1. Tăng biến đếm lượt xem thực tế (+1)
  const newViews = recordProductView(product)

  // 2. Kích hoạt PostHog Session Recording CHỈ CHO PHIÊN XEM SẢN PHẨM NÀY
  try {
    if (posthog && typeof posthog.startSessionRecording === 'function') {
      posthog.startSessionRecording()
    }
    if (posthog && typeof posthog.register === 'function') {
      posthog.register({
        last_product_viewed: product.name,
        last_product_slug: product.slug,
        last_product_category: product.category || product.categories?.name || '',
      })
    }
  } catch (e) {
    console.debug('PostHog Session Recording trigger:', e)
  }

  // 3. Gửi sự kiện product_view chuẩn hóa
  captureEvent('product_view', {
    product_id: product.id,
    product_name: product.name,
    product_slug: product.slug,
    category: product.category || product.categories?.name || 'Nông sản chế biến',
    price_min: product.price_min || product.variants?.[0]?.price || 0,
    total_views_lifetime: newViews,
    page_url: window.location.href,
  })
}

/**
 * Dừng ghi hình PostHog khi người dùng đóng modal sản phẩm hoặc rời trang sản phẩm
 */
export function stopProductSessionRecording() {
  try {
    if (posthog && typeof posthog.stopSessionRecording === 'function') {
      posthog.stopSessionRecording()
    }
  } catch (e) {}
}

/**
 * Ghi nhận sự kiện click vào sản phẩm cụ thể (Product Click Event & Session Record)
 * Thu thập chính xác thông tin click sản phẩm, phân tích đa ngôn ngữ và loại bỏ click rác toàn trang
 */
export function recordProductClick(product, location = 'product_catalog', extraProps = {}) {
  if (!product || typeof window === 'undefined') return null
  if (window.location.pathname.startsWith('/admin')) return null

  const slug = String(product.slug || product.productId || (typeof product === 'string' ? product : '') || product.id || '').trim()
  const id = String(product.id || product.productId || slug).trim()
  const dedupeKey = slug || id
  const callSource = extraProps?.source || (location === 'global_link' ? 'dom_fallback' : 'react')

  // Cơ chế chống trùng lặp sự kiện click sản phẩm trong vòng 600ms
  // Nếu lượt click trước là dom_fallback và lượt này đến từ React (dữ liệu phong phú hơn), cho phép ghi nhận đè
  const now = Date.now()
  if (dedupeKey && lastTrackedProductClick.key === dedupeKey && (now - lastTrackedProductClick.time < 600)) {
    if (lastTrackedProductClick.source === 'dom_fallback' && callSource === 'react') {
      // Cho phép React handler bổ sung / nâng cấp dữ liệu chuẩn
    } else {
      return null
    }
  }
  if (dedupeKey) {
    lastTrackedProductClick = { key: dedupeKey, time: now, source: callSource }
  }

  // Nhận diện ngôn ngữ hiện tại của người dùng
  const detectedLanguage = extraProps?.language || 
    (typeof window !== 'undefined' ? (
      window.location.pathname.startsWith('/en') ? 'en' :
      window.location.pathname.startsWith('/ko') ? 'ko' :
      window.location.pathname.startsWith('/zh') ? 'zh' :
      localStorage.getItem('haq_language') || 'vi'
    ) : 'vi')

  // Xác định tên hiển thị hiện tại theo ngôn ngữ
  const localizedName = product.name || product.title || CANONICAL_PRODUCT_NAMES[slug] || formatSlugToCanonicalTitle(slug) || slug

  // Xác định tên chuẩn tiếng Việt (Canonical Name) xuyên suốt mọi ngôn ngữ
  // Tuyệt đối không để tên chuẩn tiếng Việt bị biến thành tiếng Anh/Hàn/Trung khi chuyển ngôn ngữ
  const canonicalName = product.canonical_name || 
    product._originalName || 
    product.vi_name || 
    CANONICAL_PRODUCT_NAMES[slug] || 
    (detectedLanguage === 'vi' ? localizedName : formatSlugToCanonicalTitle(slug))

  // Danh mục sản phẩm
  const category = product.category || 
    product.categories?.name || 
    product.category_name || 
    extraProps?.category || 
    'Sản phẩm HAQ FOOD'

  const canonicalCategory = product.canonical_category || 
    product.categories?.name || 
    category

  // Đường dẫn đích
  const targetUrl = product.href || 
    extraProps?.target_url || 
    (slug ? (
      detectedLanguage === 'en' ? `/en/products/${slug}` :
      detectedLanguage === 'ko' ? `/ko/products/${slug}` :
      detectedLanguage === 'zh' ? `/zh/products/${slug}` :
      `/san-pham/${slug}`
    ) : window.location.pathname)

  const payload = {
    product_id: id,
    product_slug: slug,
    product_name: localizedName,
    canonical_name: canonicalName,
    category: category,
    canonical_category: canonicalCategory,
    language: detectedLanguage,
    click_location: location,
    target_url: targetUrl,
    price_min: Number(product.price_min || product.variants?.[0]?.price || 0),
    ...extraProps,
  }

  // 1. Tăng counter realtime productClicks
  incrementAnalyticsCounter('productClicks', 1)

  // 2. Kích hoạt PostHog Session Recording và register context
  try {
    if (posthog && typeof posthog.startSessionRecording === 'function') {
      posthog.startSessionRecording()
    }
    if (posthog && typeof posthog.register === 'function') {
      posthog.register({
        last_product_clicked: canonicalName,
        last_product_clicked_localized: localizedName,
        last_product_slug: slug,
        last_product_category: category,
        last_click_location: location,
      })
    }
  } catch (e) {
    console.debug('PostHog product click session recording trigger:', e)
  }

  // 3. Lưu vào sessionStorage để lead form hoặc đơn hàng mang theo context
  try {
    sessionStorage.setItem('haq_last_viewed_product', JSON.stringify({
      id: id,
      name: localizedName,
      canonical_name: canonicalName,
      slug: slug,
      category: category,
      clicked_at: new Date().toISOString(),
      location: location,
    }))
  } catch (e) {}

  // 4. Bắn sự kiện product_click chuẩn hóa vào PostHog
  return captureEvent('product_click', payload)
}

/**
 * Trình lắng nghe click toàn cục chuyên biệt cho sản phẩm
 * Tự động bắt mọi click vào thẻ sản phẩm, link sản phẩm mới thêm từ DB hoặc HTML,
 * kể cả khi người dùng không gắn onClick thủ công.
 */
export function initGlobalProductClickListener() {
  if (typeof window === 'undefined' || isGlobalListenerAttached) return
  isGlobalListenerAttached = true

  const handleDocumentClick = (event) => {
    try {
      const target = event.target
      if (!target || typeof target.closest !== 'function') return
      if (window.location.pathname.startsWith('/admin')) return

      // Look for explicit product click element or product link
      const productElement = target.closest('[data-product-click="true"], a[href*="/san-pham/"], a[href*="/products/"]')
      if (!productElement) return

      let slug = productElement.getAttribute('data-product-slug') || ''
      const id = productElement.getAttribute('data-product-id') || ''
      const name = productElement.getAttribute('data-product-name') || ''
      const canonicalName = productElement.getAttribute('data-product-canonical-name') || ''
      const category = productElement.getAttribute('data-product-category') || ''
      const price = productElement.getAttribute('data-product-price') || ''
      const location = productElement.getAttribute('data-product-location') || 'global_link'
      const href = productElement.getAttribute('href') || ''

      // If slug not explicitly on data-attribute, extract from href safely (removing hash, query, trailing slashes)
      if (!slug && href) {
        const cleanHref = href.split('?')[0].split('#')[0].replace(/\/+$/, '')
        const match = cleanHref.match(/(?:\/san-pham|\/products)\/([^/?#]+)/)
        if (match && match[1]) {
          try {
            slug = decodeURIComponent(match[1])
          } catch (e) {
            slug = match[1]
          }
        }
      }

      const dedupeKey = slug || id
      if (!dedupeKey) return

      // Deduplicate: if tracked in last 600ms, ignore
      const now = Date.now()
      if (lastTrackedProductClick.key === dedupeKey && (now - lastTrackedProductClick.time < 600)) {
        return
      }

      const detectedName = name || productElement.querySelector('h3, h2, h4, .product-title')?.textContent?.trim() || slug

      recordProductClick({
        id: id || slug,
        slug: slug,
        name: detectedName,
        canonical_name: canonicalName || undefined,
        category: category,
        price_min: price ? Number(price) : undefined,
        href: href || undefined,
      }, location, { source: 'dom_fallback' })
    } catch (e) {
      console.debug('[Analytics] Global product click tracking error:', e)
    }
  }

  // Sử dụng Bubble phase ({ capture: false }) để React synthetic handler (đặt tại #root) chạy trước,
  // ưu tiên các payload đầy đủ nhất từ React component. Listener này làm nhiệm vụ lưới bảo hiểm (safety net).
  document.addEventListener('click', handleDocumentClick, { capture: false })
}

/**
 * Bắt các tham số UTM từ URL và lưu trữ vào localStorage & sessionStorage
 */
export function captureAndPersistUTMs() {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/admin')) return

  const params = new URLSearchParams(window.location.search)
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const foundUTMs = {}
  let hasUTM = false

  utmKeys.forEach((key) => {
    const val = params.get(key)
    if (val) {
      foundUTMs[key] = val
      hasUTM = true
    }
  })

  if (hasUTM) {
    const trackingData = {
      ...foundUTMs,
      first_touch_timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
    }
    localStorage.setItem('haq_utm_data', JSON.stringify(trackingData))
    sessionStorage.setItem('haq_current_session_utm', JSON.stringify(foundUTMs))

    try {
      if (posthog && typeof posthog.register === 'function') {
        posthog.register(foundUTMs)
      }
    } catch (e) {}
  }

  if (!sessionStorage.getItem('haq_session_id')) {
    const newSessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now()
    sessionStorage.setItem('haq_session_id', newSessionId)
  }
}

/**
 * Lấy toàn bộ thông tin UTM & Session hiện tại để đính kèm vào Lead / Đơn hàng
 */
export function getCurrentTrackingContext() {
  if (typeof window === 'undefined') {
    return { utm_source: 'direct', session_id: 'ssr_session' }
  }

  let savedUTMs = {}
  let sessionUTMs = {}
  let sessionId = 'sess_' + Date.now()
  let lastProduct = null

  try {
    const rawSaved = localStorage.getItem('haq_utm_data')
    if (rawSaved && rawSaved !== 'undefined') savedUTMs = JSON.parse(rawSaved)
  } catch (e) {}

  try {
    const rawSession = sessionStorage.getItem('haq_current_session_utm')
    if (rawSession && rawSession !== 'undefined') sessionUTMs = JSON.parse(rawSession)
  } catch (e) {}

  try {
    sessionId = sessionStorage.getItem('haq_session_id') || ('sess_' + Date.now())
    const rawLastProd = sessionStorage.getItem('haq_last_viewed_product')
    if (rawLastProd && rawLastProd !== 'undefined') lastProduct = JSON.parse(rawLastProd)
  } catch (e) {}

  return {
    utm_source: sessionUTMs?.utm_source || savedUTMs?.utm_source || (document.referrer ? 'referral' : 'direct'),
    utm_medium: sessionUTMs?.utm_medium || savedUTMs?.utm_medium || '',
    utm_campaign: sessionUTMs?.utm_campaign || savedUTMs?.utm_campaign || '',
    utm_content: sessionUTMs?.utm_content || savedUTMs?.utm_content || '',
    session_id: sessionId,
    referrer: document.referrer || 'direct',
    last_product_id: lastProduct?.id || null,
    last_product_name: lastProduct?.name || '',
    last_product_category: lastProduct?.category || '',
  }
}

/**
 * Ghi nhận Event PostHog an toàn (Safe Wrapper)
 */
export function captureEvent(eventName, properties = {}) {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return null
  }

  const context = getCurrentTrackingContext()
  const payload = {
    ...context,
    ...properties,
    timestamp: new Date().toISOString(),
  }

  try {
    if (posthog && typeof posthog.capture === 'function') {
      posthog.capture(eventName, payload)
    }
  } catch (err) {
    console.debug(`[PostHog Track] ${eventName}:`, payload)
  }

  // Lưu lại local event log
  try {
    const rawLogs = localStorage.getItem('haq_analytics_event_logs') || '[]'
    const eventLogs = JSON.parse(rawLogs)
    eventLogs.unshift({ event: eventName, ...payload })
    if (eventLogs.length > 200) eventLogs.pop()
    localStorage.setItem('haq_analytics_event_logs', JSON.stringify(eventLogs))

    // Cập nhật các bộ đếm thời gian thực
    if (eventName === 'contact_form_start' || eventName === 'cta_click' || eventName === 'contact_click') {
      incrementAnalyticsCounter('ctaStarts', 1)
    }
  } catch (e) {}

  return payload
}

export default posthog
