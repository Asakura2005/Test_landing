'use client'

import React, { useState, useRef, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Package,
  ArrowRight,
  Home,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle,
  Search,
  X,
} from 'lucide-react'
import StickyNav from '@/components/StickyNav'
import Footer from '@/components/Footer'
import FloatingContactBar from '@/components/FloatingContactBar'
import { useLanguage } from '@/context/LanguageContext'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getLocalizedProduct, getLocalizedCategory } from '@/utils/i18nData'
import {
  getProductDetailUrl,
  getProductsPageUrl,
  getHomeUrl,
  getContactUrl,
} from '@/utils/routeI18n'
import { PRODUCT_IMAGE_MAP } from '@/data/productCategories'

function resolveSafeProductImage(imgUrl?: any): string {
  if (imgUrl && typeof imgUrl === 'string') {
    return imgUrl
  }
  return ''
}

function formatTitleName(name: string): string {
  if (!name || typeof name !== 'string') return ''
  const trimmed = name.trim()
  if (trimmed === trimmed.toUpperCase() && /[A-ZÀ-Ỵ]/.test(trimmed)) {
    return trimmed.toLowerCase().replace(/(^|[\s\-_/])\S/g, char => char.toUpperCase())
  }
  return trimmed
}

interface ProductDetailClientProps {
  initialProduct: any
  recommendedProducts?: any[]
}

export default function ProductDetailClient({
  initialProduct,
  recommendedProducts = [],
}: ProductDetailClientProps) {
  const { t, language } = useLanguage()
  const { trackProductView, trackProductClick } = useAnalytics()

  const [product] = useState<any>(initialProduct)
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<'info' | 'ingredients' | 'storage' | null>(null)

  // Zoom state
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%')
  const [isZooming, setIsZooming] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  const localizedProduct = useMemo(() => {
    return product ? getLocalizedProduct(product, language) : null
  }, [product, language])

  // Track product view on mount
  useEffect(() => {
    if (product) {
      trackProductView(product)
    }
  }, [product, trackProductView])

  // Combined gallery images
  const galleryImages = useMemo(() => {
    if (!localizedProduct) return []
    const list: string[] = []

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

  const [activeImage, setActiveImage] = useState<string>(() => {
    return (
      resolveSafeProductImage(initialProduct?.variants?.[0]?.img) ||
      resolveSafeProductImage(initialProduct?.images?.[0]) ||
      resolveSafeProductImage(initialProduct?.image_url) ||
      resolveSafeProductImage(initialProduct?.image) ||
      ''
    )
  })

  const currentDisplayImage =
    activeImage ||
    galleryImages[0] ||
    resolveSafeProductImage(localizedProduct?.image_url) ||
    resolveSafeProductImage(localizedProduct?.image) ||
    ''

  const lastTouchTimeRef = useRef<number>(0)

  const handleTouchStart = () => {
    lastTouchTimeRef.current = Date.now()
    setIsZooming(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Date.now() - lastTouchTimeRef.current < 800) {
      return
    }
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return
    }
    setIsZooming(true)
    handleMouseMove(e)
  }

  const handleSelectVariant = (idx: number) => {
    setSelectedVariantIndex(idx)
    const targetVariant = localizedProduct?.variants?.[idx]
    const targetImg =
      resolveSafeProductImage(targetVariant?.img) ||
      resolveSafeProductImage(localizedProduct?.images?.[0]) ||
      resolveSafeProductImage(localizedProduct?.image_url) ||
      resolveSafeProductImage(localizedProduct?.image) ||
      ''
    if (targetImg) {
      setActiveImage(targetImg)
    }
  }

  const localizedCategory = useMemo(() => {
    return localizedProduct?.categories ? getLocalizedCategory(localizedProduct.categories, language) : null
  }, [localizedProduct, language])

  const localizedRecommended = useMemo(() => {
    return (recommendedProducts || []).map((p) => getLocalizedProduct(p, language))
  }, [recommendedProducts, language])

  const marketplaceLinks = useMemo(() => {
    let custom: any = {}
    if (
      product?.box_spec &&
      typeof product.box_spec === 'string' &&
      product.box_spec.trim().startsWith('{')
    ) {
      try {
        custom = JSON.parse(product.box_spec)
      } catch (e) {}
    }
    return {
      shopee: (custom.shopee || product?.shopee_url || '').trim(),
      lazada: (custom.lazada || product?.lazada_url || '').trim(),
      tiktok: (custom.tiktok || product?.tiktok_url || '').trim(),
      facebook: (custom.facebook || product?.facebook_url || '').trim(),
    }
  }, [product])

  const hasAnyMarketplaceLink = Boolean(
    marketplaceLinks.shopee ||
      marketplaceLinks.lazada ||
      marketplaceLinks.tiktok ||
      marketplaceLinks.facebook
  )

  if (!product || !localizedProduct) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] font-sans flex flex-col">
        <StickyNav />
        <div className="flex-1 pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-[#16A34A] shadow-xs">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-haq-ink mb-3">
            {t('product_detail.not_found_title', 'Sản phẩm không tồn tại')}
          </h1>
          <p className="mb-8 text-xs sm:text-sm text-haq-text-secondary max-w-md leading-relaxed">
            {t(
              'product_detail.not_found_desc',
              'Có thể sản phẩm đã bị xóa hoặc đường dẫn không chính xác. Mời bạn tham quan danh mục sản phẩm của HAQ FOOD.'
            )}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={getProductsPageUrl(language)}
              className="px-6 py-3 bg-[#16A34A] hover:bg-[#13863d] text-white font-heading font-bold text-xs rounded-full transition-colors shadow-xs"
            >
              {t('product_detail.view_all_products', 'Xem tất cả sản phẩm')}
            </Link>
            <Link
              href={getHomeUrl(language)}
              className="px-6 py-3 bg-white border border-haq-border hover:border-[#16A34A] text-haq-ink font-heading font-bold text-xs rounded-full transition-colors"
            >
              {t('product_detail.back_home', 'Về trang chủ')}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-[72px] sm:pt-[76px] text-haq-ink font-sans">
      <StickyNav />
      <FloatingContactBar />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-haq-border">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center gap-2 text-xs text-haq-text-secondary overflow-x-auto whitespace-nowrap">
          <Link
            href={getHomeUrl(language)}
            className="hover:text-haq-red flex items-center gap-1 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t('product_detail.breadcrumb_home', 'Trang chủ')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-haq-border" />
          <Link
            href={getProductsPageUrl(language)}
            className="hover:text-haq-red transition-colors"
          >
            {t('product_detail.breadcrumb_products', 'Sản phẩm')}
          </Link>
          {localizedCategory && (
            <>
              <ChevronRight className="w-3 h-3 text-haq-border" />
              <span className="text-haq-ink font-medium">{localizedCategory.name}</span>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-haq-border" />
          <span className="text-haq-red font-bold truncate">{localizedProduct.name}</span>
        </div>
      </div>

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14">
        {/* Main Product Box */}
        <div className="bg-white rounded-3xl border border-haq-border shadow-sm overflow-hidden flex flex-col lg:flex-row mb-14">
          {/* Left Column: Images & Zoom */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-haq-border">
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
                <div className="absolute top-3.5 left-3.5 z-30 bg-[#16A34A] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs pointer-events-none select-none">
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
                  className="absolute bottom-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-haq-ink hover:text-[#16A34A] border border-haq-border shadow-md flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95"
                  title={language === 'en' ? 'Enlarge image' : 'Phóng to ảnh'}
                  aria-label="Phóng to ảnh"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}

              {currentDisplayImage ? (
                <>
                  {/* Main Product Image - Object-Contain trọn vẹn 100%, không bị zoom cắt xén logo */}
                  <img
                    src={currentDisplayImage}
                    alt={localizedProduct.name}
                    onError={(e) => {
                      const fallback = PRODUCT_IMAGE_MAP[localizedProduct.slug]
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback
                      }
                    }}
                    className={`relative z-10 w-full h-full object-contain p-2 sm:p-4 transition-opacity duration-300 ${
                      isZooming ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  {/* Zoom Image Overlay */}
                  <div
                    className={`absolute inset-0 z-20 transition-opacity duration-300 pointer-events-none ${
                      isZooming ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      backgroundImage:
                        currentDisplayImage ? `url("${currentDisplayImage.replace(/"/g, '%22')}")` : 'none',
                      backgroundPosition: backgroundPosition,
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#ffffff',
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-haq-text-secondary/40 italic text-xs">
                  {language === 'en'
                    ? 'No image available'
                    : language === 'ko'
                    ? '사용 가능한 이미지가 없습니다'
                    : language === 'zh'
                    ? '暂无图片'
                    : 'Chưa có hình ảnh'}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2.5 mt-5 overflow-x-auto pb-1 scrollbar-none">
                {galleryImages.map((img, idx) => {
                  const isCurrent = currentDisplayImage === img
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveImage(img)
                        if (localizedProduct?.variants && localizedProduct.variants.length > 0) {
                          const matchedIdx = localizedProduct.variants.findIndex(
                            (v: any) => resolveSafeProductImage(v.img) === img
                          )
                          if (matchedIdx !== -1) {
                            setSelectedVariantIndex(matchedIdx)
                          }
                        }
                      }}
                      className={`w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all bg-white cursor-pointer ${
                        isCurrent
                          ? 'border-haq-red shadow-xs ring-2 ring-haq-red/20'
                          : 'border-haq-border hover:border-haq-red/50'
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

          {/* Right Column: Product Info & Actions */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
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
                product.name &&
                product.name !== localizedProduct.name && (
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
                      ? '엄선된 재료로 정성을 다해 만든 전통의 풍미를 담은 최고의 선물입니다.'
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
                      {localizedProduct.variants.map((v: any, idx: number) => {
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
              {localizedProduct.highlights &&
                localizedProduct.highlights.length > 0 &&
                localizedProduct.highlights[0] !== '' && (
                  <div className="mb-6 bg-[#F8FAF8] p-4 rounded-xl border border-emerald-100">
                    <h4 className="font-heading font-bold text-xs uppercase text-haq-ink mb-2.5 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>{t('product_detail.highlights_title', 'Điểm nổi bật')}</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-haq-text-secondary">
                      {localizedProduct.highlights.map((hl: string, idx: number) => (
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
                href={getContactUrl(language)}
                className="w-full sm:w-auto inline-flex bg-[#16A34A] hover:bg-[#13863d] text-white py-3.5 px-8 rounded-full font-heading font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg items-center justify-center gap-2 group hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t('product_detail.contact_btn', 'Liên hệ tư vấn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Accordions: Product Details */}
        {(localizedProduct.shelf_life ||
          localizedProduct.certifications ||
          localizedProduct.ingredients ||
          localizedProduct.storage_guide) && (
          <div className="bg-white rounded-3xl border border-haq-border shadow-sm p-6 sm:p-10 mb-14">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-haq-ink mb-6 uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-2.5 h-5 bg-haq-red rounded-full inline-block" />
              {t('product_detail.details_title', 'Thông tin chi tiết sản phẩm')}
            </h3>

            <div className="space-y-3">
              {/* Accordion 1: Thông tin sản phẩm */}
              {(localizedProduct.shelf_life || localizedProduct.certifications) && (
                <div className="border border-haq-border rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'info' ? null : 'info')
                    }
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-pointer hover:bg-haq-cream/30 transition-colors"
                  >
                    <span className="font-heading font-bold text-xs sm:text-sm text-haq-ink">
                      {t('product_detail.accordion_info', 'Thông tin sản phẩm')}
                    </span>
                    {openAccordion === 'info' ? (
                      <Minus className="w-4 h-4 text-haq-text-secondary shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-haq-text-secondary shrink-0" />
                    )}
                  </button>
                  {openAccordion === 'info' && (
                    <div className="px-5 pb-5 pt-2 border-t border-haq-border">
                      <div className="space-y-2 text-xs text-haq-text-secondary">
                        <div>
                          <span className="font-bold text-haq-ink">
                            {t('product_detail.manufacturing_date', 'Ngày sản xuất:')}
                          </span>{' '}
                          {t('product_detail.manufacturing_date_value', 'In trên bao bì sản phẩm.')}
                        </div>
                        {localizedProduct.shelf_life && (
                          <div>
                            <span className="font-bold text-haq-ink">
                              {t('product_detail.shelf_life_label', 'Hạn sử dụng:')}
                            </span>{' '}
                            {localizedProduct.shelf_life}
                          </div>
                        )}
                        {localizedProduct.certifications && (
                          <div>
                            <span className="font-bold text-haq-ink">
                              {t('product_detail.certifications_label', 'Chứng nhận:')}
                            </span>{' '}
                            {localizedProduct.certifications}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 2: Thành phần */}
              {localizedProduct.ingredients && (
                <div className="border border-haq-border rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'ingredients' ? null : 'ingredients')
                    }
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-pointer hover:bg-haq-cream/30 transition-colors"
                  >
                    <span className="font-heading font-bold text-xs sm:text-sm text-haq-ink">
                      {t('product_detail.accordion_ingredients', 'Thành phần của sản phẩm')}
                    </span>
                    {openAccordion === 'ingredients' ? (
                      <Minus className="w-4 h-4 text-haq-text-secondary shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-haq-text-secondary shrink-0" />
                    )}
                  </button>
                  {openAccordion === 'ingredients' && (
                    <div className="px-5 pb-5 pt-2 border-t border-haq-border">
                      <p className="text-xs text-haq-text-secondary leading-relaxed whitespace-pre-line">
                        {localizedProduct.ingredients}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Accordion 3: Hướng dẫn bảo quản */}
              {localizedProduct.storage_guide && (
                <div className="border border-haq-border rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'storage' ? null : 'storage')
                    }
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-pointer hover:bg-haq-cream/30 transition-colors"
                  >
                    <span className="font-heading font-bold text-xs sm:text-sm text-haq-ink">
                      {t('product_detail.accordion_storage', 'Hướng dẫn sử dụng & Bảo quản')}
                    </span>
                    {openAccordion === 'storage' ? (
                      <Minus className="w-4 h-4 text-haq-text-secondary shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-haq-text-secondary shrink-0" />
                    )}
                  </button>
                  {openAccordion === 'storage' && (
                    <div className="px-5 pb-5 pt-2 border-t border-haq-border">
                      <div className="text-xs text-haq-text-secondary leading-relaxed space-y-1.5">
                        {localizedProduct.storage_guide
                          .split(/\r?\n/)
                          .map((line: string) => line.trim())
                          .filter(Boolean)
                          .map((line: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#16A34A] shrink-0">◆</span>
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

        {/* Similar / Recommended Products */}
        {localizedRecommended.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-haq-ink mb-2 uppercase tracking-tight">
                {t('product_detail.similar_products', 'Sản phẩm cùng loại')}
              </h3>
              <div className="w-10 h-1 bg-haq-red mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {localizedRecommended.map((p: any) => {
                const recImg = resolveSafeProductImage(
                  p.images?.[0] || p.variants?.[0]?.img || p.image_url || p.image
                )
                return (
                  <Link
                    href={getProductDetailUrl(p.slug || p.id, language)}
                    key={p.id}
                    onClick={() => trackProductClick(p, 'product_detail_similar')}
                    className="bg-white group overflow-hidden border border-haq-border hover:border-haq-red hover:shadow-lg transition-all duration-300 flex flex-col h-full rounded-2xl"
                  >
                    <div className="h-40 sm:h-48 w-full flex items-center justify-center p-4 bg-haq-cream/30 relative overflow-hidden border-b border-haq-border">
                      {recImg ? (
                        <img
                          src={recImg}
                          alt={p.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-haq-text-secondary/30 text-xs text-center">
                          Chưa có ảnh
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 flex flex-col items-center justify-center flex-1 text-center bg-white">
                      <h4 className="font-heading font-bold text-haq-ink text-xs sm:text-sm uppercase leading-snug group-hover:text-haq-red transition-colors line-clamp-2">
                        {p.name}
                      </h4>
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
