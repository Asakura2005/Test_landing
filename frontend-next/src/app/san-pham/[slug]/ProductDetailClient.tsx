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
  const imageRef = useRef<HTMLDivElement>(null)

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100))
    setBackgroundPosition(`${x}% ${y}%`)
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
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-haq-cream/30 border border-haq-border cursor-crosshair shadow-inner"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              ref={imageRef}
            >
              {localizedProduct.tag && (
                <div className="absolute top-3.5 left-3.5 z-20 bg-[#16A34A] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {localizedProduct.tag}
                </div>
              )}

              {currentDisplayImage ? (
                <>
                  <img
                    src={currentDisplayImage}
                    alt={localizedProduct.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      const fallback = PRODUCT_IMAGE_MAP[localizedProduct.slug]
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback
                      }
                    }}
                    className={`w-full h-full object-contain p-8 transition-opacity duration-300 ${
                      isZooming ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                      isZooming ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      backgroundImage:
                        isZooming && currentDisplayImage ? `url("${currentDisplayImage}")` : 'none',
                      backgroundPosition: backgroundPosition,
                      backgroundSize: '200%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#fff',
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
          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col">
            <div className="mb-5">
              {localizedCategory && (
                <span className="text-xs font-heading font-bold text-haq-red uppercase tracking-wider block mb-2">
                  {localizedCategory.name}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-haq-ink !leading-[1.28] tracking-normal mb-2 uppercase">
                {localizedProduct.name}
              </h1>
              {language === 'vi' ? (
                localizedProduct.en_name && (
                  <p className="text-haq-text-secondary text-xs sm:text-sm font-heading font-normal">
                    {localizedProduct.en_name}
                  </p>
                )
              ) : (
                product.name &&
                product.name !== localizedProduct.name && (
                  <p className="text-haq-text-secondary text-xs sm:text-sm font-heading font-normal italic">
                    {product.name}
                  </p>
                )
              )}
            </div>

            <div className="text-xs sm:text-sm text-haq-text-secondary mb-6 leading-relaxed">
              {localizedProduct.description ? (
                <p>{localizedProduct.description}</p>
              ) : (
                <p>
                  {language === 'en'
                    ? 'Premium Vietnamese specialty snacks produced under stringently controlled ISO 22000 & HACCP standards.'
                    : language === 'ko'
                    ? 'ISO 22000 및 HACCP 표준에 따라 엄격하게 제조된 베트남 전통 스낵입니다.'
                    : language === 'zh'
                    ? '严格遵循 ISO 22000 与 HACCP 国际标准生产的越南经典风味伴手礼与零食。'
                    : 'Món quà tuyệt hảo mang hương vị truyền thống, được chế biến từ những nguyên liệu chọn lọc khắt khe nhất đạt chuẩn ISO 22000 & HACCP.'}
                </p>
              )}
            </div>

            {/* Net Weight Variant Selector */}
            {localizedProduct.variants && localizedProduct.variants.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold text-haq-ink shrink-0">
                  {t('product_detail.weight_label', 'Quy cách / Khối lượng')}:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {localizedProduct.variants.map((v: any, idx: number) => {
                    const isSelected = selectedVariantIndex === idx
                    const displaySize = v.size || v.name || `${idx + 1}`
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectVariant(idx)}
                        className={`rounded-full px-3.5 py-1 text-xs transition-all cursor-pointer border ${
                          isSelected
                            ? 'border-haq-red text-haq-red bg-haq-cream/60 font-bold ring-1 ring-haq-red/20 shadow-2xs'
                            : 'border-haq-border text-haq-ink hover:border-haq-red/60 bg-white'
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

            {/* Marketplace channels */}
            {hasAnyMarketplaceLink && (
              <div className="mb-6 pb-6 border-b border-haq-border/60">
                <p className="text-[11px] font-heading font-bold text-haq-text-secondary uppercase mb-2">
                  {language === 'en'
                    ? 'Retail channels'
                    : language === 'ko'
                    ? '구매 채널'
                    : language === 'zh'
                    ? '零售购买渠道'
                    : 'Kênh bán lẻ chính hãng'}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {marketplaceLinks.shopee && (
                    <a
                      href={marketplaceLinks.shopee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EE4D2D] hover:bg-[#e03d1d] text-white text-xs font-semibold shadow-2xs transition-all"
                    >
                      <span>Shopee Mall</span>
                    </a>
                  )}
                  {marketplaceLinks.lazada && (
                    <a
                      href={marketplaceLinks.lazada}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F146D] hover:bg-[#0c1055] text-white text-xs font-semibold shadow-2xs transition-all"
                    >
                      <span>Lazada LazMall</span>
                    </a>
                  )}
                  {marketplaceLinks.tiktok && (
                    <a
                      href={marketplaceLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black hover:bg-zinc-800 text-white text-xs font-semibold shadow-2xs transition-all"
                    >
                      <span>TikTok Shop</span>
                    </a>
                  )}
                  {marketplaceLinks.facebook && (
                    <a
                      href={marketplaceLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold shadow-2xs transition-all"
                    >
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Highlights */}
            {localizedProduct.highlights &&
              localizedProduct.highlights.length > 0 &&
              localizedProduct.highlights[0] !== '' && (
                <div className="mb-6 bg-haq-cream/50 p-4 sm:p-5 rounded-2xl border border-haq-border">
                  <h4 className="font-heading font-bold text-xs uppercase text-haq-ink mb-2.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>{t('product_detail.highlights_title', 'Điểm nổi bật')}</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-haq-text-secondary">
                    {localizedProduct.highlights.map((hl: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#16A34A] font-bold">✓</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* B2B Quotation CTA */}
            <div className="mt-auto pt-4">
              <Link
                href={`${getContactUrl(language)}?type=oem&product=${encodeURIComponent(
                  product.name || ''
                )}`}
                className="w-full sm:w-auto inline-flex bg-haq-red hover:bg-haq-red/90 text-white py-3.5 px-8 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t('product_detail.quote_btn', 'Nhận báo giá B2B & Đặt mẫu')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

      <Footer />
    </div>
  )
}
