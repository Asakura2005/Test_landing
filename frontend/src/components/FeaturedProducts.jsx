import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getProducts } from '../services/supabase'
import { getTopViewedProducts } from '../services/posthog'
import { getLocalizedProduct } from '../utils/i18nData'

const STATIC_TEXT = {
  vi: { tag: '✦ Sản phẩm nổi bật ✦', title: 'Dòng Sản Phẩm Nổi Bật', subtitle: 'Sản phẩm được khách hàng yêu thích nhất.', cta: 'Xem tất cả sản phẩm', signatureBadge: '★ Signature', detail: 'Chi tiết', ctaCard: { stat: '50+', label: 'Mặt hàng', action: 'Xem tất cả' } },
  en: { tag: '✦ Top Products ✦', title: 'Featured Products', subtitle: 'Most loved by our customers.', cta: 'View all products', signatureBadge: '★ Signature', detail: 'Details', ctaCard: { stat: '50+', label: 'Items', action: 'View all' } },
  ko: { tag: '✦ 인기 제품 ✦', title: '인기 제품', subtitle: '고객이 가장 사랑하는 제품.', cta: '모든 제품 보기', signatureBadge: '★ 시그니처', detail: '상세보기', ctaCard: { stat: '50+', label: '제품', action: '모두 보기' } },
  zh: { tag: '✦ 热门产品 ✦', title: '特色产品', subtitle: '最受客户喜爱的产品。', cta: '查看所有产品', signatureBadge: '★ 经典招牌', detail: '详情', ctaCard: { stat: '50+', label: '产品', action: '查看全部' } },
}

const getProductImage = (p) => p?.variants?.[0]?.img || p?.images?.[0] || p?.image_url || p?.image || ''

function SkeletonCard({ className = '', delay = '' }) {
  return (
    <div style={delay ? { transitionDelay: delay } : undefined} className={`bento-reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-white rounded-2xl border border-haq-border/70 p-6 flex flex-col justify-between animate-pulse ${className}`}>
      <div className="aspect-[3/4] bg-soft-cream/70 rounded-xl mb-4 w-full" />
      <div className="space-y-2.5">
        <div className="h-3.5 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3.5 bg-gray-200 rounded w-full" />
      </div>
      <div className="h-3.5 bg-gray-100 rounded w-1/3 mt-4" />
    </div>
  )
}

export default function FeaturedProducts() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const t = STATIC_TEXT[language] || STATIC_TEXT.vi
  const containerRef = useRef(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getProducts()
      .then((allProducts) => {
        if (!isMounted) return
        const list = allProducts || []
        const topViewed = getTopViewedProducts(list, 3)
        setProducts(topViewed.length > 0 ? topViewed : list.slice(0, 3))
      })
      .catch((err) => console.error('Failed to load featured products:', err))
      .finally(() => { if (isMounted) setLoading(false) })
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    const rootEl = containerRef.current
    if (!rootEl) return
    const cards = rootEl.querySelectorAll('.bento-reveal-item')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8')
          entry.target.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [loading, products])

  const goToProduct = (p) => {
    if (!p) return
    const langPrefix = language === 'vi' ? '' : `${language}/`
    navigate(`/${langPrefix}san-pham/${p.slug}`)
  }

  const goToAllProducts = () => {
    const langPrefix = language === 'vi' ? '' : `${language}/`
    navigate(`/${langPrefix}san-pham`)
  }

  const [p1, p2, p3] = products
  const loc1 = p1 ? getLocalizedProduct(p1, language) : null
  const loc2 = p2 ? getLocalizedProduct(p2, language) : null
  const loc3 = p3 ? getLocalizedProduct(p3, language) : null

  return (
    <section ref={containerRef} className="relative w-full py-10 lg:py-14 bg-warm-cream overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 0L48 24L24 48L0 24z' fill='none' stroke='%23C8A355' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-1.5 text-gold font-semibold uppercase tracking-widest text-[11px] md:text-xs mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{t.tag}</span>
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-haq-ink leading-tight tracking-tight">{t.title}</h2>
          <p className="mt-2 text-xs sm:text-sm text-haq-text-secondary leading-relaxed max-w-xl mx-auto">{t.subtitle}</p>
          <div className="flex items-center justify-center gap-2.5 mt-3.5">
            <span className="w-8 h-px bg-gold/40" />
            <span className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0" />
            <span className="w-8 h-px bg-gold/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
          {/* Card 1: Large Signature Product (col-span-5, row-span-2) */}
          {loading || !p1 ? (
            <SkeletonCard className="md:col-span-2 lg:col-span-5 lg:row-span-2 min-h-[420px]" />
          ) : (
            <div
              onClick={() => goToProduct(p1)}
              className="bento-reveal-item opacity-0 translate-y-8 transition-all duration-700 ease-out md:col-span-2 lg:col-span-5 lg:row-span-2 bg-white rounded-2xl border border-haq-border/70 hover:border-gold/60 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              <div className="relative aspect-[3/4] max-h-[340px] bg-[#FAF9F6] flex items-center justify-center overflow-hidden border-b border-haq-border/40">
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-deep text-gold text-[11px] font-semibold uppercase tracking-wider shadow-md">
                  <Star className="w-2.5 h-2.5 fill-gold text-gold" />
                  {t.signatureBadge}
                </span>
                <img
                  src={getProductImage(p1)}
                  alt={loc1?.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-haq-green text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] font-bold text-haq-green uppercase tracking-wider block mb-1">{loc1?.category || loc1?.categories?.name || ''}</span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-haq-ink group-hover:text-haq-green transition-colors duration-200">{loc1?.name}</h3>
                  {loc1?.description && <p className="mt-2 text-xs sm:text-[13px] text-haq-text-secondary leading-relaxed line-clamp-2">{loc1.description}</p>}
                </div>
                <div className="mt-4 pt-3 border-t border-haq-border/60 flex items-center justify-between text-xs text-haq-text-secondary">
                  <span className="font-medium">{p1?.packaging_spec || p1?.variants?.[0]?.pack || p1?.variants?.[0]?.size || ''}</span>
                  <span className="inline-flex items-center gap-1 text-gold font-semibold group-hover:translate-x-1 transition-transform duration-200">
                    {t.detail} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Wide Product Card (col-span-7, row-span-1) */}
          {loading || !p2 ? (
            <SkeletonCard delay="100ms" className="md:col-span-2 lg:col-span-7 lg:row-span-1" />
          ) : (
            <div
              onClick={() => goToProduct(p2)}
              style={{ transitionDelay: '100ms' }}
              className="bento-reveal-item opacity-0 translate-y-8 transition-all duration-700 ease-out md:col-span-2 lg:col-span-7 lg:row-span-1 bg-white rounded-2xl border border-haq-border/70 hover:border-gold/60 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 grid grid-cols-1 sm:grid-cols-12 overflow-hidden cursor-pointer group"
            >
              <div className="sm:col-span-5 bg-[#FAF9F6] aspect-[3/4] sm:aspect-auto flex items-center justify-center overflow-hidden border-b sm:border-b-0 sm:border-r border-haq-border/40">
                <img
                  src={getProductImage(p2)}
                  alt={loc2?.name}
                  loading="lazy"
                  className="w-full h-full max-h-48 sm:max-h-none object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-haq-green uppercase tracking-wider block mb-1">{loc2?.category || loc2?.categories?.name || ''}</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-haq-ink group-hover:text-haq-green transition-colors duration-200">{loc2?.name}</h3>
                  {loc2?.description && <p className="mt-1.5 text-xs text-haq-text-secondary leading-relaxed line-clamp-2">{loc2.description}</p>}
                </div>
                <div className="mt-4 pt-3 border-t border-haq-border/60 flex items-center justify-between text-xs text-haq-text-secondary">
                  <span className="font-medium">{p2?.packaging_spec || p2?.variants?.[0]?.pack || p2?.variants?.[0]?.size || ''}</span>
                  <span className="inline-flex items-center gap-1 text-gold font-semibold group-hover:translate-x-1 transition-transform duration-200">
                    {t.detail} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Third Product Card (col-span-3, row-span-1) */}
          {loading || !p3 ? (
            <SkeletonCard delay="200ms" className="md:col-span-1 lg:col-span-3 lg:row-span-1" />
          ) : (
            <div
              onClick={() => goToProduct(p3)}
              style={{ transitionDelay: '200ms' }}
              className="bento-reveal-item opacity-0 translate-y-8 transition-all duration-700 ease-out md:col-span-1 lg:col-span-3 lg:row-span-1 bg-white rounded-2xl border border-haq-border/70 hover:border-gold/60 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              <div className="aspect-[3/4] max-h-[220px] bg-[#FAF9F6] flex items-center justify-center overflow-hidden border-b border-haq-border/40">
                <img
                  src={getProductImage(p3)}
                  alt={loc3?.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] font-bold text-haq-green uppercase tracking-wider block mb-0.5">{loc3?.category || loc3?.categories?.name || ''}</span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-haq-ink group-hover:text-haq-green transition-colors duration-200 leading-snug line-clamp-2">{loc3?.name}</h3>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-haq-border/60 flex items-center justify-between text-xs text-haq-text-secondary">
                  <span className="text-[10px] font-medium">{p3?.packaging_spec || p3?.variants?.[0]?.pack || p3?.variants?.[0]?.size || ''}</span>
                  <ArrowRight className="w-3 h-3 text-gold group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          )}

          {/* Card 4: Green Gradient CTA Card (col-span-4, row-span-1) */}
          <div
            onClick={goToAllProducts}
            style={{ transitionDelay: '300ms' }}
            className="bento-reveal-item opacity-0 translate-y-8 transition-all duration-700 ease-out md:col-span-1 lg:col-span-4 lg:row-span-1 relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-deep via-[#0e2c1e] to-haq-green-dark border border-gold/30 hover:border-gold shadow-md hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between text-white overflow-hidden cursor-pointer group"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-haq-green/20 blur-2xl pointer-events-none" aria-hidden="true" />
            <div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-light tracking-tight">{t.ctaCard.stat}</span>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-gold group-hover:text-deep transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 text-gold-light group-hover:text-deep transition-colors duration-300" />
                </div>
              </div>
              <h4 className="font-semibold text-sm sm:text-base text-white mt-2">{t.ctaCard.label}</h4>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-light group-hover:text-white transition-colors duration-200">{t.ctaCard.action}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-light group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-8 lg:mt-10">
          <button
            type="button"
            onClick={goToAllProducts}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-[1.5px] border-gold text-gold font-semibold text-xs sm:text-sm hover:bg-gold hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer active:scale-95 group"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
