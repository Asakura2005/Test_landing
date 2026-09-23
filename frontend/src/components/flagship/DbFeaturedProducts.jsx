import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Download, Sparkles, Tag, ShieldCheck, MapPin } from 'lucide-react'
import { getProducts } from '../../services/supabase'
import { useLanguage } from '../../context/LanguageContext'
import { getLocalizedProduct, getLocalizedCategory, getLocalizedProvince } from '../../utils/i18nData'
import { resolveProductImage } from '../../data/productCategories'
import { getProductDetailUrl, getProductsPageUrl } from '../../utils/routeI18n'

export default function DbFeaturedProducts() {
  const { language, t } = useLanguage()
  const navigate = useNavigate()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  useEffect(() => {
    let isMounted = true
    getProducts()
      .then((data) => {
        if (isMounted) {
          setAllProducts(data || [])
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error('Lỗi tải sản phẩm từ Database:', err)
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  // Trích xuất các danh mục duy nhất từ danh sách sản phẩm thật
  const categories = useMemo(() => {
    const cats = new Map()
    cats.set('ALL', language === 'en' ? 'All Products' : language === 'ko' ? '모든 제품' : language === 'zh' ? '全部产品' : 'Tất Cả Sản Phẩm')
    
    allProducts.forEach((p) => {
      const catObj = Array.isArray(p.categories) ? p.categories[0] : p.categories
      const catLocalized = catObj ? getLocalizedCategory(catObj, language) : null
      const catName = catLocalized?.name || catObj?.name || p.category || ''
      const catSlug = catObj?.slug || (typeof p.category === 'string' ? p.category.toLowerCase().replace(/\s+/g, '-') : '')
      if (catSlug && catName && !cats.has(catSlug)) {
        cats.set(catSlug, catName)
      }
    })
    return Array.from(cats.entries()).map(([slug, name]) => ({ slug, name }))
  }, [allProducts, language])

  // Lọc sản phẩm theo danh mục chọn
  const displayedProducts = useMemo(() => {
    let list = allProducts
    if (selectedCategory !== 'ALL') {
      list = list.filter((p) => {
        const catObj = Array.isArray(p.categories) ? p.categories[0] : p.categories
        const catSlug = catObj?.slug || (typeof p.category === 'string' ? p.category.toLowerCase().replace(/\s+/g, '-') : '')
        return catSlug === selectedCategory
      })
    }
    // Lấy tối đa 8 sản phẩm nổi bật
    return list.slice(0, 8)
  }, [allProducts, selectedCategory])

  return (
    <section
      id="he-sinh-thai-san-pham"
      aria-label="Danh Mục Thực Phẩm & Đồ Ăn Vặt Đóng Gói"
      className="py-16 sm:py-24 bg-[#FAF9F6] text-[#11261B] border-t border-[#D8E5DA]/60"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-6 sm:pb-8 border-b border-[#D8E5DA]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#0F5132] font-bold text-xs uppercase tracking-wider mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                <span>{t('products.catalog_badge', 'HỆ SINH THÁI NÔNG SẢN & ĐẶC SẢN CHỦ LỰC')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0C1E15] tracking-tight">
                {t('products.catalog_title', 'Sản Phẩm Nổi Bật')}
              </h2>
            </div>

            {/* Quick Catalog Link */}
            <Link
              to={getProductsPageUrl(language)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F5132] hover:text-[#16A34A] transition-colors pb-1 self-start sm:self-end group cursor-pointer"
            >
              <span>{language === 'en' ? 'View all products' : language === 'ko' ? '전체 제품 보기' : language === 'zh' ? '查看全部产品' : 'Xem toàn bộ catalog'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Dynamic Category Filter Tabs - Dedicated Full-Width Row */}
          {categories.length > 1 && (
            <div className="mt-5 pt-4 border-t border-[#D8E5DA]/60">
              <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none overscroll-x-contain">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#52665A] shrink-0 mr-1.5 hidden md:inline-flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0F5132]" />
                  <span>{language === 'en' ? 'Filter:' : language === 'ko' ? '분류:' : language === 'zh' ? '筛选:' : 'Lọc danh mục:'}</span>
                </span>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.slug
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 select-none ${
                        isActive
                          ? 'bg-[#0F5132] text-white shadow-md shadow-[#0F5132]/25 scale-[1.02]'
                          : 'bg-white hover:bg-[#F0F5F2] text-[#52665A] hover:text-[#0C1E15] border border-[#D8E5DA] shadow-2xs hover:border-[#0F5132]/40'
                      }`}
                    >
                      {cat.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid from Real Database */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-6 border border-neutral-200 animate-pulse h-80 flex flex-col justify-between">
                <div className="h-44 bg-neutral-100 rounded-2xl w-full" />
                <div className="space-y-2 pt-4">
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-3 bg-neutral-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 text-sm">
            Đang cập nhật danh sách sản phẩm từ hệ thống...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 pt-8 sm:pt-10">
            {displayedProducts.map((p) => {
              const loc = getLocalizedProduct(p, language)
              const imgSrc = resolveProductImage(p)
              const detailUrl = getProductDetailUrl(p.slug || p.id, language)

              const catObj = Array.isArray(p.categories) ? p.categories[0] : p.categories
              const catLocalized = catObj ? getLocalizedCategory(catObj, language) : null
              const displayCategory = catLocalized?.name || catObj?.name || p.category || 'HAQ FOOD'

              const provObj = Array.isArray(p.provinces) ? p.provinces[0] : p.provinces
              const provName = provObj ? (getLocalizedProvince(provObj, language)?.name || provObj.name || '') : ''

              const rawWeight =
                (p.variants &&
                  p.variants.length > 0 &&
                  (p.variants[0]?.size ||
                    (p.variants[0]?.name && p.variants[0]?.name !== p.name
                      ? p.variants[0]?.name
                      : null))) ||
                p.weight ||
                (p.tag && !p.is_pinned ? p.tag : null)
              const rawWeightStr = typeof rawWeight === 'number' ? `${rawWeight}g` : String(rawWeight || '').trim()
              const weightBadge = rawWeightStr && rawWeightStr.length <= 20 ? rawWeightStr : null

              return (
                <Link
                  key={p.id || p.slug}
                  to={detailUrl}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-haq-border hover:border-[#0F5132] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative focus:outline-none"
                >
                  {/* Image Box 1:1 Aspect Ratio (Square) */}
                  <div className="relative w-full aspect-square bg-[#FAF9F6] overflow-hidden flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={loc.name}
                      width="300"
                      height="300"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.src = '/assets/stitch/product_showcase_1.png'
                      }}
                    />
                    {weightBadge && (
                      <div className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 z-10 pointer-events-none">
                        <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-haq-ink font-heading text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-haq-border/80 shadow-xs">
                          {weightBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Details */}
                  <div className="p-3.5 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-2">
                        <span className="text-[10px] sm:text-[11px] font-heading font-bold text-[#0F5132] uppercase tracking-wider truncate">
                          {displayCategory}
                        </span>
                        {provName && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-haq-text-secondary font-medium bg-haq-cream px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                            <MapPin className="w-2.5 h-2.5 shrink-0 text-[#0F5132]" />
                            <span className="truncate max-w-[65px] sm:max-w-none">
                              {provName}
                            </span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-haq-ink group-hover:text-[#0F5132] transition-colors leading-snug line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem]">
                        {loc.name}
                      </h3>
                    </div>

                    <div className="mt-3 pt-3 sm:pt-3.5 flex items-center justify-between border-t border-haq-border/40">
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-heading font-bold text-[#0F5132] group-hover:gap-2 sm:group-hover:gap-2.5 transition-all">
                        <span>{language === 'en' ? 'View details' : language === 'ko' ? '상세 보기' : language === 'zh' ? '查看详情' : 'Xem chi tiết'}</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* View All Products Link */}
        <div className="text-center mt-8">
          <Link
            to={getProductsPageUrl(language)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-50 text-[#0F5132] border border-[#0F5132]/40 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all"
          >
            <span>{t('products.view_all', 'Xem toàn bộ 50+ sản phẩm')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Master Catalog Download Banner from Stitch */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#00281d] to-[#003527] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-[#fe932c]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 sm:gap-5 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#fe932c] text-white flex items-center justify-center shrink-0 shadow-lg">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h4 className="text-lg sm:text-2xl font-bold">
                Tải Toàn Bộ Hồ Sơ Danh Mục Sản Phẩm
              </h4>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                (HAQ Food B2B Product Catalog 2025 • Đầy đủ quy cách đóng gói, thông số thùng &amp; giá sỉ đối tác)
              </p>
            </div>
          </div>

          <a
            href="/assets/stitch/logo_haq.png"
            download="HAQ_FOOD_Catalog_2025.png"
            className="inline-flex items-center gap-2.5 bg-white text-[#003527] hover:bg-[#fe932c] hover:text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all shadow-lg shrink-0 relative z-10 cursor-pointer"
          >
            <span>Tải Catalog B2B (PDF 18MB)</span>
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
