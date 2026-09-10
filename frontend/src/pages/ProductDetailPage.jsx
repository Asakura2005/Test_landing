import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug, getProducts } from '../services/supabase'
import { useAnalytics } from '../hooks/useAnalytics'
import { CheckCircle, Package, Calendar, Truck, ArrowRight, Home, ChevronRight, Plus, Minus } from 'lucide-react'
import Footer from '../components/Footer'
import StickyNav from '../components/StickyNav'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedProduct, getLocalizedCategory } from '../utils/i18nData'
import { PRODUCT_IMAGE_MAP } from '../data/productCategories'
import { getProductDetailUrl, getProductsPageUrl, getHomeUrl, getContactUrl } from '../utils/routeI18n'

/**
 * Trợ giúp giải quyết đường dẫn ảnh sản phẩm / variant an toàn
 * Sửa triệt để các đường dẫn thô chưa bundle (/src/assets/...) từ database
 */
function resolveSafeProductImage(imgUrl, slug) {
  if (imgUrl && typeof imgUrl === 'string') {
    if (imgUrl.startsWith('http') || imgUrl.startsWith('data:') || imgUrl.startsWith('blob:')) {
      return imgUrl
    }
    // Chỉ fallback sang PRODUCT_IMAGE_MAP nếu chuỗi ảnh là đường dẫn thô chưa bundle từ DB
    if (imgUrl.startsWith('/src/assets/') || imgUrl.startsWith('src/assets/')) {
      return (slug && PRODUCT_IMAGE_MAP[slug]) || imgUrl
    }
    return imgUrl
  }
  return (slug && PRODUCT_IMAGE_MAP[slug]) || ''
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const { trackProductView, trackContactClick } = useAnalytics()
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

  useEffect(() => {
    window.scrollTo(0, 0)
    let isMounted = true

    const fetchProduct = async () => {
      try {
        setIsLoading(true)
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
            resolveSafeProductImage(data.variants?.[0]?.img, data.slug) ||
            resolveSafeProductImage(data.images?.[0], data.slug) ||
            PRODUCT_IMAGE_MAP[data.slug] || ''
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

  const handleMouseMove = (e) => {
    if (!imageRef.current) return
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100))
    setBackgroundPosition(`${x}% ${y}%`)
  }

  const localizedProduct = useMemo(() => {
    return product ? getLocalizedProduct(product, language) : null
  }, [product, language])

  useEffect(() => {
    if (localizedProduct?.name) {
      document.title = `${localizedProduct.name} | HAQ FOOD`
    }
  }, [localizedProduct])

  const handleSelectVariant = (idx) => {
    setSelectedVariantIndex(idx)
    const targetVariant = localizedProduct?.variants?.[idx]
    const targetImg = 
      resolveSafeProductImage(targetVariant?.img, localizedProduct?.slug) ||
      resolveSafeProductImage(localizedProduct?.images?.[0], localizedProduct?.slug) ||
      PRODUCT_IMAGE_MAP[localizedProduct?.slug]
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

  // Combined gallery images (product images + variant images + fallback)
  const galleryImages = useMemo(() => {
    if (!localizedProduct) return []
    const list = []
    const baseFallback = PRODUCT_IMAGE_MAP[localizedProduct.slug]
    if (baseFallback) list.push(baseFallback)

    if (Array.isArray(localizedProduct.images)) {
      for (const raw of localizedProduct.images) {
        const safe = resolveSafeProductImage(raw, localizedProduct.slug)
        if (safe && !list.includes(safe)) list.push(safe)
      }
    }
    if (Array.isArray(localizedProduct.variants)) {
      for (const v of localizedProduct.variants) {
        const safe = resolveSafeProductImage(v.img, localizedProduct.slug)
        if (safe && !list.includes(safe)) list.push(safe)
      }
    }
    return list.length > 0 ? list : (baseFallback ? [baseFallback] : [])
  }, [localizedProduct])

  const currentDisplayImage = activeImage || galleryImages[0] || (localizedProduct ? PRODUCT_IMAGE_MAP[localizedProduct.slug] : '') || ''

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
        <div className="max-w-site mx-auto px-6 md:px-12 py-3.5 flex items-center gap-2 text-xs sm:text-sm text-haq-text-secondary">
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
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-haq-sage/20 border border-haq-border cursor-crosshair shadow-inner"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              ref={imageRef}
            >
              {localizedProduct.tag && (
                <div className="absolute top-4 left-4 z-20 bg-[#16A34A] text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  {localizedProduct.tag}
                </div>
              )}
              
              {currentDisplayImage ? (
                <>
                  {/* Normal Image */}
                  <img 
                    src={currentDisplayImage} 
                    alt={localizedProduct.name} 
                    onError={(e) => {
                      e.currentTarget.onerror = null // Tránh đệ quy vô tận
                      const fallback = PRODUCT_IMAGE_MAP[localizedProduct.slug]
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback
                      }
                    }}
                    className={`w-full h-full object-contain p-8 transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
                  />
                  {/* Zoom Image Overlay */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isZooming ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundImage: isZooming && currentDisplayImage ? `url("${currentDisplayImage}")` : 'none',
                      backgroundPosition: backgroundPosition,
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#fff'
                    }}
                  ></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-haq-text-secondary/40 italic">
                  {language === 'en' ? 'No image available' : language === 'ko' ? '사용 가능한 이미지가 없습니다' : 'Chưa có hình ảnh'}
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

          {/* Cột Phải: Thông tin */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 lg:px-16 py-10 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {localizedCategory && (
                  <span className="text-xs font-heading font-bold text-[#16A34A] uppercase tracking-wider block">{localizedCategory.name}</span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-haq-ink leading-normal mb-3 uppercase">
                {localizedProduct.name}
              </h1>
              {language === 'vi' ? (
                localizedProduct.en_name && (
                  <p className="text-haq-text-secondary text-sm font-heading font-normal">{localizedProduct.en_name}</p>
                )
              ) : (
                product.name && product.name !== localizedProduct.name && (
                  <p className="text-haq-text-secondary text-sm font-heading font-normal italic">{product.name}</p>
                )
              )}
            </div>


            <div className="prose prose-base text-haq-text-secondary text-justify mb-6 leading-relaxed font-normal">
              {localizedProduct.description ? (
                <p>{localizedProduct.description}</p>
              ) : (
                <p>
                  {language === 'en'
                    ? 'An exquisite gift carrying traditional flavors, crafted from stringently selected ingredients.'
                    : language === 'ko'
                    ? '엄선된 재료로 정성을 다해 만든 전통의 풍미를 담은 최고의 선물입니다.'
                    : 'Món quà tuyệt hảo mang hương vị truyền thống, được chế biến từ những nguyên liệu chọn lọc khắt khe nhất.'}
                </p>
              )}
            </div>

            {/* Selector Khối Lượng Tịnh */}
            {localizedProduct.variants && localizedProduct.variants.length > 0 && (
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="text-sm md:text-base font-semibold text-[#16A34A] shrink-0">
                  {t('product_detail.weight_label', 'Khối lượng tịnh')}:
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {localizedProduct.variants.map((v, idx) => {
                    const isSelected = selectedVariantIndex === idx
                    const displaySize = v.size || v.name || `${idx + 1}`
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectVariant(idx)}
                        className={`rounded-full px-4 py-1 text-sm md:text-base transition-all cursor-pointer select-none border ${
                          isSelected
                            ? 'border-[#16A34A] text-[#16A34A] bg-emerald-50/50 font-semibold shadow-2xs ring-1 ring-[#16A34A]/30'
                            : 'border-stone-300 text-stone-600 hover:border-[#16A34A]/70 hover:text-[#16A34A] bg-white'
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

            {/* Sàn TMĐT & Mạng xã hội (Chỉ hiển thị khi có link trong database) */}
            {hasAnyMarketplaceLink && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Shopee */}
                  {marketplaceLinks.shopee && (
                    <a
                      href={marketplaceLinks.shopee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EE4D2D] hover:bg-[#e03d1d] text-white text-xs font-heading font-semibold shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer select-none whitespace-nowrap"
                      title="Mua hàng trên Shopee"
                    >
                      <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
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
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F146D] hover:bg-[#0c1055] text-white text-xs font-heading font-semibold shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer select-none whitespace-nowrap"
                      title="Mua hàng trên Lazada"
                    >
                      <svg className="w-4 h-3.5 shrink-0" viewBox="0 0 68 55" fill="none">
                        <defs>
                          <linearGradient id="lzd-top-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF6E00" />
                            <stop offset="100%" stopColor="#FE2C55" />
                          </linearGradient>
                          <linearGradient id="lzd-right-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FE2C55" />
                            <stop offset="100%" stopColor="#2A1B6A" />
                          </linearGradient>
                          <linearGradient id="lzd-left-grad-page" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF8A00" />
                            <stop offset="100%" stopColor="#FF1968" />
                          </linearGradient>
                        </defs>
                        <path d="M33.74 54.72c-.48 0-.95-.12-1.37-.36C28.8 52.3 2.4 35.74 1.4 35.24c-.75-.35-1.27-1.08-1.36-1.91V10.11c-.02-.87.41-1.68 1.13-2.16L1.37 7.84C3.92 6.26 12.47 1.04 13.82.29c.31-.19.67-.29 1.03-.29.34 0 .67.09.97.25 0 0 11.96 7.8 13.8 8.5 1.28.58 2.68.88 4.1.86 1.6.03 3.18-.35 4.59-1.12C40.09 7.54 51.52.29 51.64.29c.29-.18.62-.27.96-.27.36 0 .71.1 1.02.29 1.56.86 12.16 7.35 12.61 7.64.75.45 1.2 1.26 1.19 2.13v23.22c-.08.83-.6 1.56-1.37 1.91-.99.55-27.31 17.1-30.95 19.12-.41.25-.88.38-1.36.38z" fill="url(#lzd-top-grad-page)" />
                        <path d="M33.6 54.72l.14-.01c.48 0 .95-.12 1.36-.35 3.57-2.07 29.96-18.62 30.95-19.13.77-.35 1.29-1.07 1.37-1.91V10.11c-.02-.4-.1-.78-.28-1.13L33.6 27.4v27.32z" fill="url(#lzd-right-grad-page)" />
                        <path d="M33.6 54.72l-.14-.01c-.48 0-.95-.12-1.36-.35-3.57-2.07-29.96-18.62-30.95-19.13-.77-.35-1.29-1.07-1.37-1.91V10.11c.02-.4.1-.78.28-1.13L33.6 27.4v27.32z" fill="url(#lzd-left-grad-page)" />
                      </svg>
                      <span>Lazada</span>
                    </a>
                  )}

                  {/* TikTok Shop */}
                  {marketplaceLinks.tiktok && (
                    <a
                      href={marketplaceLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#000000] hover:bg-[#1a1a1a] text-white text-xs font-heading font-semibold shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer select-none whitespace-nowrap"
                      title="Mua hàng trên TikTok Shop"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.61 6.27 6.33 6.33 0 0 0 6.33 6.31 6.34 6.34 0 0 0 6.32-6.31V8.75a8.27 8.27 0 0 0 4.21 1.39V6.69z" fill="#FFF" />
                        <path d="M16.5 8.75a8.27 8.27 0 0 0 4.21 1.39V6.69a4.83 4.83 0 0 1-3.77-4.25V2h-.44v6.75z" fill="#25F4EE" />
                        <path d="M12.37 15.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.61 6.27c0 .12 0 .24.01.36a6.34 6.34 0 0 1 5.86-3.88c.29 0 .58.04.86.12v3.46a2.89 2.89 0 0 0-.23-.08z" fill="#FE2C55" />
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
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-heading font-semibold shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer select-none whitespace-nowrap"
                      title="Đặt mua qua Facebook"
                    >
                      <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {localizedProduct.highlights && localizedProduct.highlights.length > 0 && localizedProduct.highlights[0] !== '' && (
              <div className="mb-8 bg-haq-sage p-5 rounded-2xl border border-haq-border">
                <h4 className="font-heading font-bold text-sm uppercase text-haq-ink mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span>{t('product_detail.highlights_title', 'Điểm nổi bật')}</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                  {localizedProduct.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-haq-text-secondary">
                      <span className="text-[#16A34A] mt-0.5 text-xs font-bold">✓</span> 
                      <span className="flex-1 font-medium">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <Link 
                to={`${getContactUrl(language)}?type=oem`}
                className="w-full md:w-auto inline-flex bg-[#16A34A] hover:bg-[#13863d] text-white py-4 px-10 rounded-full font-heading font-bold text-sm uppercase tracking-wider transition-all shadow-md items-center justify-center gap-3 group"
              >
                <span>{t('product_detail.quote_btn', 'Nhận báo giá B2B & Đặt mẫu')}</span>
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
                        {localizedProduct.storage_guide.split('\n').map((line, idx) => (
                          <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                            <span className="text-[#16A34A] mt-0.5 shrink-0">◆</span>
                            <span>{line}</span>
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
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {localizedRecommended.map(p => {
                const recImg = resolveSafeProductImage(p.images?.[0] || p.variants?.[0]?.img, p.slug) || PRODUCT_IMAGE_MAP[p.slug] || ''
                return (
                  <Link to={getProductDetailUrl(p.slug || p.id, language)} key={p.id} className="bg-white group overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 relative border border-haq-border hover:border-[#16A34A] flex flex-col h-full rounded-2xl">
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
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            const fallback = PRODUCT_IMAGE_MAP[p.slug]
                            if (fallback && e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback
                            }
                          }}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="text-haq-text-secondary/30 text-xs text-center border border-dashed border-haq-border p-4 rounded w-full h-full flex items-center justify-center">
                          {language === 'en' ? 'No image' : language === 'ko' ? '이미지 없음' : 'Chưa có ảnh'}
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

      <Footer />
    </div>
  )
}
