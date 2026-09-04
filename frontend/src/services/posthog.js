import posthog from 'posthog-js'

// PostHog Configuration with Env Vars or Graceful Fallback
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || 'phc_demo_haq_food_analytics_key'
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

let isInitialized = false

// Storage Key versioned to cleanly reset mock baseline to 100% real data
const VIEWS_STORAGE_KEY = 'haq_product_views_real_v1'
const ANALYTICS_COUNTERS_KEY = 'haq_analytics_realtime_counters_v1'

/**
 * Lấy bộ đếm tổng thể các chỉ số Real-time từ LocalStorage
 */
export function getRealtimeAnalyticsCounters() {
  if (typeof window === 'undefined') {
    return { visitors: 0, productViews: 0, ctaStarts: 0, pageViews: 0 }
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
        ctaStarts: 0,
        pageViews: 1,
      }
      localStorage.setItem(ANALYTICS_COUNTERS_KEY, JSON.stringify(initial))
      return initial
    }
    return JSON.parse(raw)
  } catch (e) {
    return { visitors: 0, productViews: 0, ctaStarts: 0, pageViews: 0 }
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
 * Khởi tạo PostHog
 * QUY TẮC BẢO MẬT & TỐI ƯU GHI HÌNH:
 * - TUYỆT ĐỐI KHÔNG ghi hình tại Trang chủ (Homepage: /) và Trang Admin (/admin/*).
 * - Mặc định TẮT hoàn toàn session recording (disable_session_recording: true).
 * - Chỉ bật ghi hình khi người dùng bấm vào xem chi tiết sản phẩm cụ thể.
 */
export function initPostHog() {
  if (typeof window === 'undefined' || isInitialized) return posthog

  try {
    if (POSTHOG_KEY && POSTHOG_KEY !== 'phc_demo_haq_food_analytics_key') {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: false, // Explicit tracking for clean B2B data
        capture_pageview: false, // Không tự động bắn pageview ở homepage
        capture_pageleave: true,
        disable_session_recording: true, // MẶC ĐỊNH TẮT TOÀN TRANG
        session_recording: {
          maskAllInputs: true,
        },
        persistence: 'localStorage+cookie',
        before_send: (event) => {
          const path = typeof window !== 'undefined' ? window.location.pathname : ''
          const currentUrl = event?.properties?.['$current_url'] || ''
          const currentPath = event?.properties?.['$pathname'] || ''

          // 1. Loại trừ hoàn toàn 100% trang Admin
          if (
            path.startsWith('/admin') || 
            currentPath.startsWith('/admin') || 
            currentUrl.includes('/admin')
          ) {
            return null
          }

          // 2. CHẶN TUYỆT ĐỐI GHI HÌNH TẠI HOMEPAGE VÀ CÁC TRANG KHÔNG PHẢI SẢN PHẨM
          // Toàn bộ các gói tin ghi hình session recording có tên sự kiện là '$snapshot'
          if (event?.event === '$snapshot') {
            const isProduct = 
              path.startsWith('/san-pham/') || 
              currentPath.startsWith('/san-pham/') || 
              currentUrl.includes('/san-pham/')

            // Nếu đang ở Homepage (/) hoặc các trang khác không phải chi tiết sản phẩm -> HỦY BỎ GÓI TIN GHI HÌNH
            if (!isProduct) {
              return null
            }
          }

          return event
        },
        loaded: (ph) => {
          // Nếu đang ở Trang chủ (/), chủ động dừng ghi hình nếu có
          const currentPath = window.location.pathname
          if (currentPath === '/' || currentPath === '' || currentPath.startsWith('/admin')) {
            try {
              if (typeof ph.stopSessionRecording === 'function') {
                ph.stopSessionRecording()
              }
            } catch (e) {}
          }
          captureAndPersistUTMs()
        },
      })
    }
    isInitialized = true
  } catch (err) {
    console.warn('PostHog initialization warning:', err.message)
  }

  captureAndPersistUTMs()
  return posthog
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
    if (posthog && posthog.__loaded) {
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
      if (posthog && posthog.__loaded) {
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

  const savedUTMs = JSON.parse(localStorage.getItem('haq_utm_data') || '{}')
  const sessionUTMs = JSON.parse(sessionStorage.getItem('haq_current_session_utm') || '{}')
  const sessionId = sessionStorage.getItem('haq_session_id') || ('sess_' + Date.now())
  const lastProduct = JSON.parse(sessionStorage.getItem('haq_last_viewed_product') || 'null')

  return {
    utm_source: sessionUTMs.utm_source || savedUTMs.utm_source || (document.referrer ? 'referral' : 'direct'),
    utm_medium: sessionUTMs.utm_medium || savedUTMs.utm_medium || '',
    utm_campaign: sessionUTMs.utm_campaign || savedUTMs.utm_campaign || '',
    utm_content: sessionUTMs.utm_content || savedUTMs.utm_content || '',
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
    if (posthog && posthog.__loaded) {
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
