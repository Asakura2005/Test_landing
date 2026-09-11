import React, { useState, useEffect, useMemo } from 'react'
import { X, CheckCircle, Package, Calendar, Truck, ArrowRight } from 'lucide-react'
import { useAnalytics } from '../hooks/useAnalytics'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedProduct } from '../utils/i18nData'

export default function ProductDetailModal({ product: rawProduct, onClose }) {
  const { t, language } = useLanguage()
  const { trackProductView, trackContactClick, stopProductSessionRecording } = useAnalytics()
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
  const [activeImage, setActiveImage] = useState('')

  const product = useMemo(() => {
    return rawProduct ? getLocalizedProduct(rawProduct, language) : null
  }, [rawProduct, language])

  // Prevent body scroll when modal is open and track product view
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (product) {
      trackProductView(product)
      setSelectedVariantIndex(0)
      const safeInitImg = 
        product.variants?.[0]?.img ||
        product.images?.[0] ||
        product.image_url ||
        product.image || ''
      setActiveImage(safeInitImg)
    }
    return () => {
      document.body.style.overflow = 'unset'
      if (typeof stopProductSessionRecording === 'function') {
        stopProductSessionRecording()
      }
    }
  }, [product, trackProductView, stopProductSessionRecording])

  const modalGalleryImages = useMemo(() => {
    if (!product) return []
    const list = []
    if (Array.isArray(product.images)) {
      list.push(...product.images.filter(Boolean))
    }
    if (Array.isArray(product.variants)) {
      for (const v of product.variants) {
        if (v.img && !list.includes(v.img)) {
          list.push(v.img)
        }
      }
    }
    if (product.image_url && !list.includes(product.image_url)) {
      list.push(product.image_url)
    }
    if (product.image && !list.includes(product.image)) {
      list.push(product.image)
    }
    return list
  }, [product])

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

  if (!product) return null

  const handleSelectVariant = (idx) => {
    setSelectedVariantIndex(idx)
    const v = product?.variants?.[idx]
    const targetImg = v?.img || product?.images?.[0] || PRODUCT_IMAGE_MAP[product?.slug]
    if (targetImg) {
      setActiveImage(targetImg)
    }
  }

  // Handle CTA click
  const handleCTA = () => {
    onClose()
    // Scroll to lead form section or contact section
    const leadForm = document.getElementById('contact')
    if (leadForm) {
      leadForm.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/lien-he?type=products'
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-full flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 bg-black/30 md:bg-haq-sage/40 backdrop-blur-sm hover:bg-[#16A34A] hover:text-white rounded-full flex items-center justify-center transition-colors text-white md:text-haq-ink border border-white/30 md:border-haq-border cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-2/5 lg:w-1/2 bg-white p-4 md:p-8 flex flex-col items-center justify-center relative min-h-[200px] md:min-h-0 border-b md:border-b-0 md:border-r border-haq-border">
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-20 bg-[#16A34A] text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
              {product.tag}
            </div>
          )}

          {activeImage ? (
            <img 
              src={activeImage} 
              alt={product.name} 
              className="relative z-10 w-full max-h-[28vh] md:max-h-[50vh] object-contain drop-shadow-xl transition-all duration-200" 
            />
          ) : (
            <div className="relative z-10 text-haq-text-secondary font-bold border-2 border-dashed border-haq-border p-8 rounded-xl flex items-center justify-center w-full h-48">
              {t('product_detail.no_image', 'Chưa có hình ảnh')}
            </div>
          )}

          {/* Modal Gallery Thumbnails */}
          {modalGalleryImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full pb-1 z-10">
              {modalGalleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveImage(img)
                    if (product?.variants && product.variants.length > 0) {
                      const matchedIdx = product.variants.findIndex(v => v.img === img)
                      if (matchedIdx !== -1) {
                        setSelectedVariantIndex(matchedIdx)
                      } else if (img === (product.images?.[0] || product.image_url || product.image)) {
                        const v0Img = product.variants[0]?.img
                        if (!v0Img || v0Img === img) {
                          setSelectedVariantIndex(0)
                        }
                      }
                    }
                  }}
                  className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-all bg-white cursor-pointer ${
                    activeImage === img ? 'border-[#16A34A] ring-1 ring-[#16A34A]' : 'border-haq-border hover:border-[#16A34A]/50'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`thumb-${idx}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div 
          data-scrollable-panel="true"
          className="w-full md:w-3/5 lg:w-1/2 p-6 md:p-8 lg:p-10 overflow-y-auto font-sans"
        >
          {/* Category & Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs font-heading font-bold text-[#16A34A] uppercase tracking-wider block">{product.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-haq-ink uppercase leading-normal">
              {product.name}
            </h2>
            {product.en_name && (
              <p className="text-haq-text-secondary text-sm mt-1">{product.en_name}</p>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm md:prose-base text-haq-text-secondary text-justify mb-6 leading-relaxed font-normal">
            {product.description ? (
              <p>{product.description}</p>
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
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-sm md:text-base font-semibold text-[#16A34A] shrink-0">
                {t('product_detail.weight_label', 'Khối lượng tịnh')}:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {product.variants.map((v, idx) => {
                  const isSelected = selectedVariantIndex === idx
                  const displaySize = v.size || v.name || `${idx + 1}`
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectVariant(idx)}
                      className={`rounded-full px-3.5 py-1 text-sm md:text-base transition-all cursor-pointer select-none border ${
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
                        <linearGradient id="lzd-top-grad-modal" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF6E00" />
                          <stop offset="100%" stopColor="#FE2C55" />
                        </linearGradient>
                        <linearGradient id="lzd-right-grad-modal" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FE2C55" />
                          <stop offset="100%" stopColor="#2A1B6A" />
                        </linearGradient>
                        <linearGradient id="lzd-left-grad-modal" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF8A00" />
                          <stop offset="100%" stopColor="#FF1968" />
                        </linearGradient>
                      </defs>
                      <path d="M33.74 54.72c-.48 0-.95-.12-1.37-.36C28.8 52.3 2.4 35.74 1.4 35.24c-.75-.35-1.27-1.08-1.36-1.91V10.11c-.02-.87.41-1.68 1.13-2.16L1.37 7.84C3.92 6.26 12.47 1.04 13.82.29c.31-.19.67-.29 1.03-.29.34 0 .67.09.97.25 0 0 11.96 7.8 13.8 8.5 1.28.58 2.68.88 4.1.86 1.6.03 3.18-.35 4.59-1.12C40.09 7.54 51.52.29 51.64.29c.29-.18.62-.27.96-.27.36 0 .71.1 1.02.29 1.56.86 12.16 7.35 12.61 7.64.75.45 1.2 1.26 1.19 2.13v23.22c-.08.83-.6 1.56-1.37 1.91-.99.55-27.31 17.1-30.95 19.12-.41.25-.88.38-1.36.38z" fill="url(#lzd-top-grad-modal)" />
                      <path d="M33.6 54.72l.14-.01c.48 0 .95-.12 1.36-.35 3.57-2.07 29.96-18.62 30.95-19.13.77-.35 1.29-1.07 1.37-1.91V10.11c-.02-.4-.1-.78-.28-1.13L33.6 27.4v27.32z" fill="url(#lzd-right-grad-modal)" />
                      <path d="M33.6 54.72l-.14-.01c-.48 0-.95-.12-1.36-.35-3.57-2.07-29.96-18.62-30.95-19.13-.77-.35-1.29-1.07-1.37-1.91V10.11c.02-.4.1-.78.28-1.13L33.6 27.4v27.32z" fill="url(#lzd-left-grad-modal)" />
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

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && product.highlights[0] !== '' && (
            <div className="mb-6 bg-haq-sage/20 p-4 rounded-2xl border border-haq-border">
              <h4 className="font-heading font-bold text-haq-ink mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                {t('product_detail.highlights_title', 'Điểm nổi bật')}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {product.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-haq-text-secondary">
                    <span className="text-[#16A34A] mt-0.5 text-xs font-bold">✓</span> 
                    <span className="flex-1 font-medium">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-auto pt-4 border-t border-haq-border flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleCTA}
              className="flex-1 bg-[#16A34A] text-white py-3.5 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0F5132] transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t('product_detail.quote_btn', 'Nhận báo giá Sỉ / Đại lý')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase text-haq-ink bg-haq-sage/30 hover:bg-haq-sage/60 transition-colors border border-haq-border cursor-pointer"
            >
              {t('common.close', 'Đóng')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
