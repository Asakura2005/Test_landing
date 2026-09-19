import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug, getProducts } from '../services/supabase'
import { useAnalytics } from '../hooks/useAnalytics'
import { CheckCircle, Package, Calendar, Truck, ArrowRight, Home, ChevronRight, Plus, Minus, Search, X } from 'lucide-react'
import Footer from '../components/Footer'
import StickyNav from '../components/StickyNav'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedProduct, getLocalizedCategory } from '../utils/i18nData'
import { getProductDetailUrl, getProductsPageUrl, getHomeUrl, getContactUrl } from '../utils/routeI18n'
import { PRODUCT_IMAGE_MAP } from '../data/productCategories'
import { generateProductSchema } from '../utils/productSchema'

/**
 * Trợ giúp giải quyết đường dẫn ảnh sản phẩm / variant an toàn
 */
function resolveSafeProductImage(imgUrl) {
  if (imgUrl && typeof imgUrl === 'string') {
    return imgUrl
  }
  return ''
}

/**
 * Chuẩn hóa tên sản phẩm: Không viết hoa toàn bộ gây chói mắt, chuyển sang chữ hoa chữ thường thanh lịch
 */
function formatTitleName(name) {
  if (!name || typeof name !== 'string') return ''
  const trimmed = name.trim()
  if (trimmed === trimmed.toUpperCase() && /[A-ZÀ-Ỵ]/.test(trimmed)) {
    return trimmed.toLowerCase().replace(/(^|[\s\-_/])\S/g, char => char.toUpperCase())
  }
  return trimmed
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const { trackProductView, trackContactClick, trackProductClick } = useAnalytics()
  const [product, setProduct] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState('')
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  
  // For zoom effect
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%')
  const [isZooming, setIsZooming] = useState(false)
  const imageRef = useRef(null)
  const [openAccordion, setOpenAccordion] = useState(null) // null | 'info' | 'ingredients' | 'storage'
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  useEffect(() => {
    window.scrollTo(0, 0)
    let isMounted = true

    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setProduct(null)
        setSelectedVariantIndex(0)
        setIsZooming(false)
        setBackgroundPosition('0% 0%')
        setOpenAccordion(null)

        // Lấy chi tiết sản phẩm từ database Supabase
        const data = await getProductBySlug(slug)

        if (!isMounted) return

        setProduct(data)

        if (data) {
          trackProductView(data)

          // Khởi tạo ảnh active an toàn
          const initialImg = 
            resolveSafeProductImage(data.variants?.[0]?.img) ||
            resolveSafeProductImage(data.images?.[0]) ||
            resolveSafeProductImage(data.image_url) ||
            resolveSafeProductImage(data.image) || ''
          setActiveImage(initialImg)

          // Lấy danh sách sản phẩm tương tự (tối đa 4 sản phẩm)
          try {
            const allProds = await getProducts()
            if (Array.isArray(allProds) && allProds.length > 0) {
              const otherProducts = allProds.filter(p => p && p.id !== data.id && p.slug !== data.slug)
              const sameCategory = otherProducts.filter(p => p.category_id === data.category_id)
              const fallbackProducts = otherProducts.filter(p => p.category_id !== data.category_id)
              if (isMounted) {
                setRecommended([...sameCategory, ...fallbackProducts].slice(0, 4))
              }
            } else if (isMounted) {
              setRecommended([])
            }
          } catch (recErr) {
            if (isMounted) {
              setRecommended([])
            }
          }
        } else {
          setActiveImage('')
          setRecommended([])
        }
      } catch (err) {
        console.error("Lỗi fetch chi tiết sản phẩm:", err)
        if (isMounted) {
          setProduct(null)
          setActiveImage('')
          setRecommended([])
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      isMounted = false
    }
  }, [slug])

  const lastTouchTimeRef = useRef(0)

  const handleTouchStart = () => {
    lastTouchTimeRef.current = Date.now()
    setIsZooming(false)
  }

  const handleMouseMove = (e) => {
    if (Date.now() - lastTouchTimeRef.current < 800) {
      setIsZooming(false)
      return
    }
    if (!imageRef.current) return
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100))
    setBackgroundPosition(`${x}% ${y}%`)
  }

  const handleMouseEnter = (e) => {
    if (Date.now() - lastTouchTimeRef.current < 800) {
      return
    }
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return
    }
    setIsZooming(true)
    handleMouseMove(e)
  }

  const localizedProduct = useMemo(() => {
    return product ? getLocalizedProduct(product, language) : null
  }, [product, language])

  // Dynamic SEO Meta Tags & Schema.org Product Structured Data
  useEffect(() => {
    const SCRIPT_ID = 'product-schema-ld'
    const BREADCRUMB_SCRIPT_ID = 'product-breadcrumb-ld'
    const removeScript = () => {
      const el = document.getElementById(SCRIPT_ID)
      if (el) el.remove()
      const bEl = document.getElementById(BREADCRUMB_SCRIPT_ID)
      if (bEl) bEl.remove()
    }

    if (!product || !localizedProduct) {
      removeScript()
      if (!isLoading) {
        document.title = `${language === 'en' ? 'Product Not Found' : language === 'ko' ? '제품을 찾을 수 없습니다' : language === 'zh' ? '产品不存在' : 'Sản phẩm không tồn tại'} | HAQ FOOD`
        const robotsMeta = document.querySelector('meta[name="robots"]')
        if (robotsMeta) {
          robotsMeta.setAttribute('content', 'noindex, nofollow')
        }
      }
      return
    }

    // Ensure robots is indexable for valid product
    const robotsMeta = document.querySelector('meta[name="robots"]')
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    }

    const prodName = (localizedProduct.name || product.name || 'Sản phẩm').trim()
    const pageTitle = `${prodName} | HAQ FOOD`
    document.title = pageTitle

    // 1. Meta description
    const rawDesc = localizedProduct.description || localizedProduct.short_description || localizedProduct.highlights?.join(', ') || product.description || ''
    const cleanDesc = rawDesc
      .replace(/<[^>]*>?/gm, '')
      .replace(/&[a-z0-9#]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 200)

    const finalDesc = cleanDesc || `${prodName} — CÔNG TY CỔ PHẦN HAQ HÀ NỘI (HAQ FOOD). Sản phẩm đồ ăn vặt chất lượng cao đạt chuẩn ISO 22000 & HACCP.`

    const updateMetaTag = (attr, key, content) => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    updateMetaTag('name', 'description', finalDesc)

    // 2. Open Graph & Twitter Card Image
    const fallbackImage = 'https://haq.com.vn/favicon.jpg'
    let prodImage = 
      resolveSafeProductImage(activeImage) ||
      resolveSafeProductImage(localizedProduct.variants?.[selectedVariantIndex]?.img) ||
      resolveSafeProductImage(localizedProduct.images?.[0]) ||
      resolveSafeProductImage(localizedProduct.image_url) ||
      resolveSafeProductImage(localizedProduct.image) ||
      fallbackImage

    if (prodImage && !prodImage.startsWith('http://') && !prodImage.startsWith('https://')) {
      prodImage = `https://haq.com.vn${prodImage.startsWith('/') ? '' : '/'}${prodImage}`
    }

    const currentUrl = typeof window !== 'undefined'
      ? `https://haq.com.vn${window.location.pathname.replace(/\/+$/, '')}`
      : `https://haq.com.vn/san-pham/${product.slug}`

    updateMetaTag('property', 'og:title', pageTitle)
    updateMetaTag('property', 'og:description', finalDesc)
    updateMetaTag('property', 'og:image', prodImage)
    updateMetaTag('property', 'og:type', 'product')
    updateMetaTag('property', 'og:url', currentUrl)

    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', pageTitle)
    updateMetaTag('name', 'twitter:description', finalDesc)
    updateMetaTag('name', 'twitter:image', prodImage)

    // 3. Schema.org Product JSON-LD Script
    const productSchema = generateProductSchema(product, {
      localizedProduct,
      activeImage,
      selectedVariantIndex,
      currentUrl,
      language
    })

    if (productSchema) {
      let scriptEl = document.getElementById(SCRIPT_ID)
      if (!scriptEl) {
        scriptEl = document.createElement('script')
        scriptEl.id = SCRIPT_ID
        scriptEl.type = 'application/ld+json'
        document.head.appendChild(scriptEl)
      }
      scriptEl.textContent = JSON.stringify(productSchema)
    } else {
      removeScript()
    }

    // 4. Schema.org BreadcrumbList JSON-LD Script
    const homeName = language === 'en' ? 'Home' : language === 'ko' ? '홈' : language === 'zh' ? '首页' : 'Trang chủ'
    const productsName = language === 'en' ? 'Products' : language === 'ko' ? '제품' : language === 'zh' ? '产品' : 'Sản phẩm'
    const locCat = localizedProduct?.categories ? getLocalizedCategory(localizedProduct.categories, language) : null

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeName,
        item: `https://haq.com.vn${getHomeUrl(language)}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: productsName,
        item: `https://haq.com.vn${getProductsPageUrl(language)}`
      }
    ]

    if (locCat?.name) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: breadcrumbItems.length + 1,
        name: locCat.name,
        item: `https://haq.com.vn${getProductsPageUrl(language)}`
      })
    }

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: breadcrumbItems.length + 1,
      name: prodName,
      item: currentUrl
    })

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    }

    let bScriptEl = document.getElementById(BREADCRUMB_SCRIPT_ID)
    if (!bScriptEl) {
      bScriptEl = document.createElement('script')
      bScriptEl.id = BREADCRUMB_SCRIPT_ID
      bScriptEl.type = 'application/ld+json'
      document.head.appendChild(bScriptEl)
    }
    bScriptEl.textContent = JSON.stringify(breadcrumbSchema)

    return () => {
      removeScript()
      const robots = document.querySelector('meta[name="robots"]')
      if (robots) {
        robots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
      }
    }
  }, [product, localizedProduct, activeImage, selectedVariantIndex, slug, language, isLoading])

  const handleSelectVariant = (idx) => {
    setSelectedVariantIndex(idx)
    const targetVariant = localizedProduct?.variants?.[idx]
    const targetImg = 
      resolveSafeProductImage(targetVariant?.img) ||
      resolveSafeProductImage(localizedProduct?.images?.[0]) ||
      resolveSafeProductImage(localizedProduct?.image_url) ||
      resolveSafeProductImage(localizedProduct?.image) || ''
    if (targetImg) {
      setActiveImage(targetImg)
    }
  }

  const localizedCategory = useMemo(() => {
    return localizedProduct?.categories ? getLocalizedCategory(localizedProduct.categories, language) : null
  }, [localizedProduct, language])

  const localizedRecommended = useMemo(() => {
    return recommended.map(p => getLocalizedProduct(p, language))
  }, [recommended, language])

  const marketplaceLinks = useMemo(() => {
    let custom = {}
    if (product?.box_spec && typeof product.box_spec === 'string' && product.box_spec.trim().startsWith('{')) {
      try {
        custom = JSON.parse(product.box_spec)
      } catch (e) {}
    }
    return {
      shopee: (custom.shopee || product?.shopee_url || '').trim(),
      lazada: (custom.lazada || product?.lazada_url || '').trim(),
      tiktok: (custom.tiktok || product?.tiktok_url || '').trim(),
      facebook: (custom.facebook || product?.facebook_url || '').trim()
    }
  }, [product])

  const hasAnyMarketplaceLink = useMemo(() => {
    return Boolean(marketplaceLinks.shopee || marketplaceLinks.lazada || marketplaceLinks.tiktok || marketplaceLinks.facebook)
  }, [marketplaceLinks])

  // Combined gallery images (product images + variant images)
  const galleryImages = useMemo(() => {
    if (!localizedProduct) return []
    const list = []

    if (Array.isArray(localizedProduct.images)) {
      for (const raw of localizedProduct.images) {
        const safe = resolveSafeProductImage(raw)
        if (safe && !list.includes(safe)) list.push(safe)
      }
    }
    if (Array.isArray(localizedProduct.variants)) {
      for (const v of localizedProduct.variants) {
        const safe = resolveSafeProductImage(v.img)
        if (safe && !list.includes(safe)) list.push(safe)
      }
    }
    if (localizedProduct.image_url) {
      const safe = resolveSafeProductImage(localizedProduct.image_url)
      if (safe && !list.includes(safe)) list.push(safe)
    }
    if (localizedProduct.image) {
      const safe = resolveSafeProductImage(localizedProduct.image)
      if (safe && !list.includes(safe)) list.push(safe)
    }
    return list
  }, [localizedProduct])

  const currentDisplayImage = activeImage || galleryImages[0] || resolveSafeProductImage(localizedProduct?.image_url) || resolveSafeProductImage(localizedProduct?.image) || ''

  // Trạng thái đang tải: Hiển thị khung Skeleton sang trọng trên nền haq-cream, không giật màn hình
  if (isLoading) {
    return (
      <main className="min-h-screen bg-haq-cream font-sans">
        <StickyNav />
        <div className="max-w-site mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="bg-white rounded-3xl border border-haq-border shadow-xl p-8 md:p-12 animate-pulse flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-1/2 aspect-square bg-haq-sage/20 rounded-2xl flex items-center justify-center">
              <Package className="w-16 h-16 text-[#16A34A]/30 animate-bounce" />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="h-5 bg-haq-sage/30 rounded w-1/4"></div>
              <div className="h-10 bg-haq-sage/40 rounded w-3/4"></div>
              <div className="h-24 bg-haq-sage/20 rounded"></div>
              <div className="h-14 bg-haq-sage/30 rounded w-1/2"></div>
              <div className="h-32 bg-haq-sage/20 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Trường hợp slug không tồn tại cả ở Supabase lẫn trong catalog chuẩn
  if (!product || !localizedProduct) {
    return (
      <main className="min-h-screen bg-haq-cream font-sans">
        <StickyNav />
        <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-[#16A34A] shadow-sm">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-haq-green-dark mb-4">
            {t('product_detail.not_found_title', 'Sản phẩm không tồn tại')}
          </h1>
          <p className="mb-8 text-haq-text-secondary max-w-md">
            {t('product_detail.not_found_desc', 'Có thể sản phẩm đã bị xóa hoặc đường dẫn không chính xác. Mời bạn tham quan danh mục sản phẩm của HAQ FOOD.')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={getProductsPageUrl(language)} className="px-7 py-3.5 bg-[#16A34A] hover:bg-[#13863d] text-white font-heading font-bold rounded-full transition-colors shadow-md">
              {t('product_detail.view_all_products', 'Xem tất cả sản phẩm')}
            </Link>
            <Link to={getHomeUrl(language)} className="px-7 py-3.5 bg-white border border-haq-border hover:border-[#16A34A] text-haq-ink font-heading font-bold rounded-full transition-colors">
              {t('product_detail.back_home', 'Về trang chủ')}
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-haq-cream pt-24 text-haq-ink font-sans selection:bg-haq-green selection:text-white">
      <StickyNav />
      {/* Breadcrumbs */}
      <div className="bg-white/90 border-b border-haq-border">
        <div className="max-w-site mx-auto px-6 md:px-12 py-3.5 flex items-center gap-2 text-xs sm:text-sm text-haq-text-secondary overflow-x-auto whitespace-nowrap">
          <Link to={getHomeUrl(language)} className="hover:text-haq-green-dark flex items-center gap-1">
            <Home className="w-4 h-4"/> {t('product_detail.breadcrumb_home', 'Trang chủ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-haq-border" />
          <Link to={getProductsPageUrl(language)} className="hover:text-haq-green-dark">
            {t('product_detail.breadcrumb_products', 'Sản phẩm')}
          </Link>
          {localizedCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-haq-border" />
              <span className="text-haq-ink font-medium">{localizedCategory.name}</span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-haq-border" />
          <span className="text-haq-green-dark font-bold truncate">{localizedProduct.name}</span>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="bg-white rounded-3xl border border-haq-border shadow-xl overflow-hidden flex flex-col lg:flex-row mb-16">
          
          {/* Cột Trái: Ảnh */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-haq-border">
            {/* Main Image with Zoom */}
            <div 
              className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-haq-border cursor-crosshair shadow-sm group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchStart}
              ref={imageRef}
            >
              {localizedProduct.tag && (
                <div className="absolute top-4 left-4 z-30 bg-[#16A34A] text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md pointer-events-none select-none">
                  {localizedProduct.tag}
                </div>
              )}

              {/* Nút kính lúp phóng to ảnh góc dưới bên phải (tránh che Logo ở góc trên) */}
              {currentDisplayImage && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLightboxOpen(true)
                  }}
                  className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-haq-ink hover:text-[#16A34A] border border-haq-border shadow-md flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                  title={language === 'en' ? 'Enlarge image' : 'Phóng to ảnh'}
                  aria-label="Phóng to ảnh"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
              
              {currentDisplayImage ? (
                <>
                  {/* Normal Image - Object-Contain trọn vẹn 100%, không bị zoom cắt xén logo */}
                  <img 
                    src={currentDisplayImage} 
                    alt={localizedProduct.name} 
                    onError={(e) => {
                      const fallback = PRODUCT_IMAGE_MAP[localizedProduct.slug]
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback
                      }
                    }}
                    className={`relative z-10 w-full h-full object-contain p-2 sm:p-4 transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
                  />
                  {/* Zoom Image Overlay */}
                  <div 
                    className={`absolute inset-0 z-20 transition-opacity duration-300 pointer-events-none ${isZooming ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundImage: currentDisplayImage ? `url("${currentDisplayImage.replace(/"/g, '%22')}")` : 'none',
                      backgroundPosition: backgroundPosition,
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#ffffff'
                    }}
                  ></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-haq-text-secondary/40 italic">
                  {language === 'en' ? 'No image available' : language === 'ko' ? '사용 가능한 이미지가 없습니다' : language === 'zh' ? '暂无图片' : 'Chưa có hình ảnh'}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2 custom-scrollbar">
                {galleryImages.map((img, idx) => {
                  const isCurrent = currentDisplayImage === img
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveImage(img)
                        if (localizedProduct?.variants && localizedProduct.variants.length > 0) {
                          const matchedIdx = localizedProduct.variants.findIndex(v => {
                            const safeV = resolveSafeProductImage(v.img, localizedProduct.slug)
                            return safeV === img
                          })
                          if (matchedIdx !== -1) {
                            setSelectedVariantIndex(matchedIdx)
                          }
                        }
                      }}
                      className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-colors bg-white cursor-pointer ${
                        isCurrent ? 'border-[#16A34A] shadow-xs ring-2 ring-[#16A34A]/20' : 'border-haq-border hover:border-[#16A34A]/50'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`thumb-${idx}`} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          const fallback = PRODUCT_IMAGE_MAP[localizedProduct.slug]
                          if (fallback && e.currentTarget.src !== fallback) {
                            e.currentTarget.src = fallback
                          }
                        }}
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Cột Phải: Thông tin sản phẩm */}
          <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Tag Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {localizedCategory && (
                  <span className="text-[11px] font-heading font-semibold text-[#16A34A] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                    {localizedCategory.name}
                  </span>
                )}
                {localizedProduct.tag && (
                  <span className="text-[10px] font-heading font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wide">
                    {localizedProduct.tag}
                  </span>
                )}
              </div>

              {/* Tên sản phẩm - Cỡ chữ vừa vặn thanh lịch, không viết hoa toàn bộ */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-haq-ink leading-snug mb-2 tracking-tight">
                {formatTitleName(localizedProduct.name)}
              </h1>

              {/* Tên tiếng Anh */}
              {language === 'vi' ? (
                localizedProduct.en_name && (
                  <p className="text-haq-text-secondary text-xs sm:text-sm font-normal italic mb-4">
                    {localizedProduct.en_name}
                  </p>
                )
              ) : (
                product.name && product.name !== localizedProduct.name && (
                  <p className="text-haq-text-secondary text-xs sm:text-sm font-normal italic mb-4">
                    {product.name}
                  </p>
                )
              )}

              {/* Đoạn mô tả ngắn */}
              <div className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed mb-6 font-normal">
                {localizedProduct.description ? (
                  <p>{localizedProduct.description}</p>
                ) : (
                  <p>
                    {language === 'en'
                      ? 'An exquisite gift carrying traditional flavors, crafted from stringently selected ingredients.'
                      : language === 'ko'
                      ? '엄선된 재료로 정성을 다해 만든 전통 của 풍미를 담은 최고의 선물입니다.'
                      : language === 'zh'
                      ? '甄选优质食材，承载经典风味的精选伴手礼。'
                      : 'Món quà tuyệt hảo mang hương vị truyền thống, được chế biến từ những nguyên liệu chọn lọc khắt khe nhất đạt chuẩn ISO 22000 & HACCP.'}
                  </p>
                )}
              </div>

              {/* Bảng thông số sản phẩm tinh tế kiểu Bảo Minh */}
              <div className="py-4 border-y border-haq-border/80 my-5 space-y-3.5">
                {/* Khối lượng tịnh */}
                {localizedProduct.variants && localizedProduct.variants.length > 0 && (
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <span className="text-haq-text-secondary font-medium w-28 shrink-0">
                      {t('product_detail.weight_label', 'Khối lượng tịnh')}:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {localizedProduct.variants.map((v, idx) => {
                        const isSelected = selectedVariantIndex === idx
                        const displaySize = v.size || v.name || `${idx + 1}`
                        if (localizedProduct.variants.length === 1) {
                          return (
                            <span
                              key={idx}
                              className="text-xs font-medium text-haq-ink px-3 py-1 rounded-full bg-haq-cream/80 border border-haq-border/80"
                            >
                              {displaySize}
                            </span>
                          )
                        }
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectVariant(idx)}
                            className={`rounded-full px-3.5 py-1 text-xs transition-all cursor-pointer select-none border ${
                              isSelected
                                ? 'border-haq-ink text-haq-ink bg-neutral-100 font-semibold shadow-2xs'
                                : 'border-haq-border text-haq-text-secondary hover:border-haq-ink/40 bg-white font-medium'
                            }`}
                            title={v.pack ? `${displaySize} - ${v.pack}` : displaySize}
                          >
                            {displaySize}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Hạn sử dụng */}
                {localizedProduct.shelf_life && (
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <span className="text-haq-text-secondary font-medium w-28 shrink-0">
                      {t('product_detail.shelf_life', 'Hạn sử dụng')}:
                    </span>
                    <span className="text-xs font-medium text-haq-ink px-3 py-1 rounded-full bg-haq-cream/80 border border-haq-border/80">
                      {localizedProduct.shelf_life}
                    </span>
                  </div>
                )}
              </div>

              {/* Kênh phân phối & mua lẻ chính hãng (Tối giản, trang nhã) */}
              {hasAnyMarketplaceLink && (
                <div className="mb-6 pt-1">
                  <p className="text-[11px] font-heading font-semibold text-haq-text-secondary uppercase tracking-wider mb-2.5">
                    {t('product_detail.retail_channels', 'Kênh mua sắm chính hãng:')}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Shopee */}
                    {marketplaceLinks.shopee && (
                      <a
                        href={marketplaceLinks.shopee}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProductClick(localizedProduct, 'marketplace_shopee', { channel: 'shopee', outbound_url: marketplaceLinks.shopee })}
                        data-product-click="true"
                        data-product-id={product.id}
                        data-product-slug={product.slug}
                        data-product-name={localizedProduct.name}
                        data-product-canonical-name={localizedProduct.canonical_name || product.name}
                        data-product-category={localizedProduct.categories?.name || localizedProduct.category || ''}
                        data-product-location="marketplace_shopee"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#EE4D2D]/30 text-[#EE4D2D] bg-[#EE4D2D]/5 hover:bg-[#EE4D2D] hover:text-white text-xs font-medium transition-all shadow-2xs hover:shadow-sm"
                        title="Mua hàng trên Shopee"
                      >
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M19.5 7.5h-2.25V6.75C17.25 3.85 14.9 1.5 12 1.5S6.75 3.85 6.75 6.75v.75H4.5C3.67 7.5 3 8.17 3 9l1.45 12.35A2.25 2.25 0 0 0 6.68 23.5h10.64a2.25 2.25 0 0 0 2.23-2.15L21 9c0-.83-.67-1.5-1.5-1.5zm-11.25-.75c0-2.07 1.68-3.75 3.75-3.75s3.75 1.68 3.75 3.75v.75h-7.5v-.75zm7.3 8.35c-.45.45-1.07.7-1.85.8-.2.03-.4.04-.6.04-.6 0-1.12-.13-1.56-.4-.44-.26-.7-.66-.78-1.2h1.4c.05.25.18.44.38.56.2.13.48.19.82.19.4 0 .7-.08.9-.24.2-.16.3-.37.3-.64 0-.24-.08-.44-.24-.59-.16-.15-.47-.29-.93-.42l-.56-.16c-.82-.23-1.4-.52-1.75-.87-.35-.35-.52-.81-.52-1.38 0-.62.24-1.11.71-1.47.47-.36 1.1-.54 1.88-.54.34 0 .66.05.95.14.3.1.55.24.75.43.2.19.34.42.42.7.08.28.11.58.11.91h-1.38c-.03-.28-.13-.49-.3-.63-.17-.14-.42-.21-.75-.21-.35 0-.62.07-.8.21-.18.14-.27.33-.27.57 0 .22.08.4.24.54.16.14.47.27.93.4l.56.16c.86.25 1.46.56 1.8.93.34.37.51.84.51 1.41 0 .68-.24 1.22-.72 1.62z" />
                        </svg>
                        <span>Shopee</span>
                      </a>
                    )}

                    {/* Lazada */}
                    {marketplaceLinks.lazada && (
                      <a
                        href={marketplaceLinks.lazada}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProductClick(localizedProduct, 'marketplace_lazada', { channel: 'lazada', outbound_url: marketplaceLinks.lazada })}
                        data-product-click="true"
                        data-product-id={product.id}
                        data-product-slug={product.slug}
                        data-product-name={localizedProduct.name}
                        data-product-canonical-name={localizedProduct.canonical_name || product.name}
                        data-product-category={localizedProduct.categories?.name || localizedProduct.category || ''}
                        data-product-location="marketplace_lazada"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#0F146D]/30 text-[#0F146D] bg-[#0F146D]/5 hover:bg-[#0F146D] hover:text-white text-xs font-medium transition-all shadow-2xs hover:shadow-sm"
                        title="Mua hàng trên Lazada"
                      >
                        <span className="font-bold text-[10px] uppercase">Lazada</span>
                      </a>
                    )}

                    {/* TikTok Shop */}
                    {marketplaceLinks.tiktok && (
                      <a
                        href={marketplaceLinks.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProductClick(localizedProduct, 'marketplace_tiktok', { channel: 'tiktok', outbound_url: marketplaceLinks.tiktok })}
                        data-product-click="true"
                        data-product-id={product.id}
                        data-product-slug={product.slug}
                        data-product-name={localizedProduct.name}
                        data-product-canonical-name={localizedProduct.canonical_name || product.name}
                        data-product-category={localizedProduct.categories?.name || localizedProduct.category || ''}
                        data-product-location="marketplace_tiktok"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-300 text-neutral-800 bg-neutral-50 hover:bg-black hover:text-white text-xs font-medium transition-all shadow-2xs hover:shadow-sm"
                        title="Mua hàng trên TikTok Shop"
                      >
                        <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.61 6.27 6.33 6.33 0 0 0 6.33 6.31 6.34 6.34 0 0 0 6.32-6.31V8.75a8.27 8.27 0 0 0 4.21 1.39V6.69z" />
                        </svg>
                        <span>TikTok Shop</span>
                      </a>
                    )}

                    {/* Facebook */}
                    {marketplaceLinks.facebook && (
                      <a
                        href={marketplaceLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProductClick(localizedProduct, 'marketplace_facebook', { channel: 'facebook', outbound_url: marketplaceLinks.facebook })}
                        data-product-click="true"
                        data-product-id={product.id}
                        data-product-slug={product.slug}
                        data-product-name={localizedProduct.name}
                        data-product-canonical-name={localizedProduct.canonical_name || product.name}
                        data-product-category={localizedProduct.categories?.name || localizedProduct.category || ''}
                        data-product-location="marketplace_facebook"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#1877F2]/30 text-[#1877F2] bg-[#1877F2]/5 hover:bg-[#1877F2] hover:text-white text-xs font-medium transition-all shadow-2xs hover:shadow-sm"
                        title="Đặt mua qua Facebook"
                      >
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Facebook</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Điểm nổi bật (Highlights) */}
              {localizedProduct.highlights && localizedProduct.highlights.length > 0 && localizedProduct.highlights[0] !== '' && (
                <div className="mb-6 bg-[#F8FAF8] p-4 rounded-xl border border-emerald-100">
                  <h4 className="font-heading font-bold text-xs uppercase text-haq-ink mb-2.5 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>{t('product_detail.highlights_title', 'Điểm nổi bật')}</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-haq-text-secondary">
                    {localizedProduct.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#16A34A] font-bold">✓</span> 
                        <span className="font-medium">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA: Liên hệ tư vấn */}
            <div className="pt-4 border-t border-haq-border/60">
              <Link
                to={getContactUrl(language)}
                className="w-full sm:w-auto inline-flex bg-[#16A34A] hover:bg-[#13863d] text-white py-3.5 px-8 rounded-full font-heading font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t('product_detail.contact_btn', 'Liên hệ tư vấn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* === THÔNG TIN CHI TIẾT SẢN PHẨM: Đặt bên dưới form chính, phía trên Sản phẩm tương tự === */}
        {(localizedProduct.shelf_life || localizedProduct.certifications || localizedProduct.ingredients || localizedProduct.storage_guide) && (
          <div className="bg-white rounded-3xl border border-haq-border shadow-lg p-6 md:p-10 mb-16">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-haq-ink mb-6 uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-2.5 h-6 bg-[#16A34A] rounded-full inline-block" />
              {t('product_detail.details_title', 'Thông tin chi tiết sản phẩm')}
            </h3>

            <div className="space-y-4">
              {/* Accordion 1: Thông tin sản phẩm */}
              {(localizedProduct.shelf_life || localizedProduct.certifications) && (
                <div className="border border-haq-border rounded-2xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 'info' ? null : 'info')}
                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-haq-sage/30 transition-colors"
                  >
                    <span className="font-heading font-bold text-sm md:text-base text-haq-ink">
                      {t('product_detail.accordion_info', 'Thông tin sản phẩm')}
                    </span>
                    {openAccordion === 'info' ? (
                      <Minus className="w-5 h-5 text-haq-text-secondary shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-haq-text-secondary shrink-0" />
                    )}
                  </button>
                  {openAccordion === 'info' && (
                    <div className="px-6 pb-6 pt-2 border-t border-haq-border">
                      <div className="pt-3 space-y-3 text-sm text-haq-text-secondary">
                        <div>
                          <span className="font-bold text-haq-ink">{t('product_detail.manufacturing_date', 'Ngày sản xuất:')}</span>{' '}
                          {t('product_detail.manufacturing_date_value', 'In trên bao bì sản phẩm.')}
                        </div>
                        {localizedProduct.shelf_life && (
                          <div>
                            <span className="font-bold text-haq-ink">{t('product_detail.shelf_life_label', 'Hạn sử dụng:')}</span>{' '}
                            {localizedProduct.shelf_life}
                          </div>
                        )}
                        {localizedProduct.certifications && (
                          <div>
                            <span className="font-bold text-haq-ink">{t('product_detail.certifications_label', 'Chứng nhận:')}</span>{' '}
                            {localizedProduct.certifications}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 2: Thành phần của sản phẩm */}
              {localizedProduct.ingredients && (
                <div className="border border-haq-border rounded-2xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')}
                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-haq-sage/30 transition-colors"
                  >
                    <span className="font-heading font-bold text-sm md:text-base text-haq-ink">
                      {t('product_detail.accordion_ingredients', 'Thành phần của sản phẩm')}
                    </span>
                    {openAccordion === 'ingredients' ? (
                      <Minus className="w-5 h-5 text-haq-text-secondary shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-haq-text-secondary shrink-0" />
                    )}
                  </button>
                  {openAccordion === 'ingredients' && (
                    <div className="px-6 pb-6 pt-2 border-t border-haq-border">
                      <p className="pt-3 text-sm text-haq-text-secondary leading-relaxed whitespace-pre-line">
                        {localizedProduct.ingredients}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 3: Hướng dẫn sử dụng & Bảo quản */}
              {localizedProduct.storage_guide && (
                <div className="border border-haq-border rounded-2xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(openAccordion === 'storage' ? null : 'storage')}
                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-haq-sage/30 transition-colors"
                  >
                    <span className="font-heading font-bold text-sm md:text-base text-haq-ink">
                      {t('product_detail.accordion_storage', 'Hướng dẫn sử dụng & Bảo quản')}
                    </span>
                    {openAccordion === 'storage' ? (
                      <Minus className="w-5 h-5 text-haq-text-secondary shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-haq-text-secondary shrink-0" />
                    )}
                  </button>
                  {openAccordion === 'storage' && (
                    <div className="px-6 pb-6 pt-2 border-t border-haq-border">
                      <div className="pt-3 text-sm text-haq-text-secondary leading-relaxed">
                        {localizedProduct.storage_guide
                          .split(/\r?\n/)
                          .map(line => line.trim())
                          .filter(Boolean)
                          .map((line, idx) => (
                            <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                              <span className="text-[#16A34A] mt-0.5 shrink-0">◆</span>
                              <span>{line.replace(/^[-•*◆]\s*/, '')}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cùng loại */}
        {localizedRecommended.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink mb-2 uppercase tracking-tight">
                {t('product_detail.similar_products', 'Sản phẩm tương tự')}
              </h3>
              <div className="w-12 h-1 bg-[#16A34A] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {localizedRecommended.map(p => {
                const recImg = resolveSafeProductImage(p.images?.[0] || p.variants?.[0]?.img || p.image_url || p.image)
                return (
                  <Link 
                    to={getProductDetailUrl(p.slug || p.id, language)} 
                    key={p.id}
                    onClick={() => trackProductClick(p, 'product_detail_similar')}
                    data-product-click="true"
                    data-product-id={p.id}
                    data-product-slug={p.slug || p.id}
                    data-product-name={p.name}
                    data-product-canonical-name={p.canonical_name || p.name}
                    data-product-category={p.canonical_category || p.categories?.name || p.category || ''}
                    data-product-price={p.price_min || p.variants?.[0]?.price || 0}
                    data-product-location="product_detail_similar"
                    className="bg-white group overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 relative border border-haq-border hover:border-[#16A34A] flex flex-col h-full rounded-2xl"
                  >
                    {p.tag && (
                      <div className="absolute top-3 left-3 bg-[#16A34A] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 z-10 rounded-full shadow-2xs">
                        {p.tag}
                      </div>
                    )}
                    
                    <div className="h-40 sm:h-48 md:h-56 w-full flex items-center justify-center p-4 bg-haq-sage/20 relative overflow-hidden border-b border-haq-border">
                      {recImg ? (
                        <img 
                          src={recImg} 
                          alt={p.name} 
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="text-haq-text-secondary/30 text-xs text-center border border-dashed border-haq-border p-4 rounded w-full h-full flex items-center justify-center">
                          {language === 'en' ? 'No image' : language === 'ko' ? '이미지 없음' : language === 'zh' ? '暂无图片' : 'Chưa có ảnh'}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 flex flex-col items-center justify-center flex-1 text-center bg-white">
                      <h3 className="font-heading font-bold text-haq-ink text-sm sm:text-base mb-1 uppercase leading-snug group-hover:text-[#16A34A] transition-colors line-clamp-2">
                        {p.name}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Preview Modal */}
      {isLightboxOpen && currentDisplayImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title={language === 'en' ? 'Close' : 'Đóng'}
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="relative max-w-4xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={currentDisplayImage} 
              alt={localizedProduct.name}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
