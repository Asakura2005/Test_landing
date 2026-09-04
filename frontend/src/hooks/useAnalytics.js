import { useEffect, useCallback } from 'react'
import { 
  captureEvent, 
  initPostHog, 
  getCurrentTrackingContext,
  startProductSessionRecording,
  stopProductSessionRecording,
  getTopViewedProducts,
  getProductViewsMap
} from '../services/posthog'

/**
 * Custom Hook chuẩn hóa toàn bộ hành động Tracking trên HAQ FOOD
 */
export function useAnalytics() {
  useEffect(() => {
    initPostHog()
  }, [])

  // 1. Theo dõi khi người dùng xem sản phẩm (Product View + Trigger PostHog Session Recording)
  const trackProductView = useCallback((product) => {
    if (!product) return

    // Lưu ngay sản phẩm vừa xem vào sessionStorage để gắn vào Lead nếu gửi form
    try {
      const pContext = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category || (product.categories && product.categories.name) || '',
        price_min: product.price_min || (product.variants && product.variants[0]?.price) || 0,
        viewed_at: new Date().toISOString(),
      }
      sessionStorage.setItem('haq_last_viewed_product', JSON.stringify(pContext))
    } catch (e) {}

    // Bắt đầu Session Recording và ghi nhận View Count cụ thể cho sản phẩm này
    startProductSessionRecording(product)
  }, [])

  // 2. Theo dõi khi người dùng click vào thẻ sản phẩm (Product Click)
  const trackProductClick = useCallback((product, location = 'home_list') => {
    if (!product) return
    captureEvent('product_click', {
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      click_location: location,
    })
  }, [])

  // 3. Theo dõi khi người dùng tìm kiếm sản phẩm (Product Search)
  const trackProductSearch = useCallback((keyword, resultsCount = 0) => {
    if (!keyword) return
    captureEvent('product_search', {
      search_keyword: keyword.trim().toLowerCase(),
      results_count: resultsCount,
    })
  }, [])

  // 4. Theo dõi khi lọc hoặc xem danh mục (Category View)
  const trackCategoryView = useCallback((categoryName) => {
    if (!categoryName) return
    captureEvent('category_view', {
      category_name: categoryName,
    })
  }, [])

  // 5. Theo dõi khi người dùng bắt đầu tương tác với Form Báo giá (Contact Form Start)
  const trackContactFormStart = useCallback((productContext = null) => {
    captureEvent('contact_form_start', {
      interest_product: productContext?.name || 'Tư vấn chung',
    })
  }, [])

  // 6. Theo dõi khi người dùng submit Form Báo giá thành công (Contact Form Submit / Lead Created)
  const trackContactFormSubmit = useCallback((leadData) => {
    captureEvent('contact_form_submit', {
      lead_id: leadData.id,
      customer_name: leadData.full_name,
      customer_company: leadData.company,
      need_type: leadData.need,
      product_name: leadData.last_product_name || 'Tư vấn chung',
    })

    // Bắn event định danh Lead
    captureEvent('lead_created', {
      lead_id: leadData.id,
      need: leadData.need,
      source: leadData.utm_source || 'direct',
      campaign: leadData.utm_campaign || '',
    })
  }, [])

  // 7. Theo dõi khi bấm vào các nút liên hệ trực tiếp (Hotline, Zalo, Catalogue download)
  const trackContactClick = useCallback((type = 'hotline', target = '') => {
    captureEvent('contact_click', {
      contact_channel: type, // 'hotline', 'zalo', 'catalogue_download', 'map_province'
      target_info: target,
    })
  }, [])

  return {
    trackProductView,
    trackProductClick,
    trackProductSearch,
    trackCategoryView,
    trackContactFormStart,
    trackContactFormSubmit,
    trackContactClick,
    stopProductSessionRecording,
    getCurrentTrackingContext,
    getTopViewedProducts,
    getProductViewsMap,
  }
}

export default useAnalytics
