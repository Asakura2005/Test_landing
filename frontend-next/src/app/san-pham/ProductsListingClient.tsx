'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  Home,
  ChevronRight,
  ArrowRight,
  Package,
  Layers,
  MapPin,
  Search,
  X,
  ArrowUpDown,
  ChevronLeft,
} from 'lucide-react'
import StickyNav from '@/components/StickyNav'
import Footer from '@/components/Footer'
import FloatingContactBar from '@/components/FloatingContactBar'
import {
  buildCategoryTree,
  findCategoryBySlug,
  filterProductsByDbCategory,
  DEFAULT_DB_CATEGORIES,
  resolveProductImage,
} from '@/data/productCategories'
import { useLanguage } from '@/context/LanguageContext'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getLocalizedCategory, getLocalizedProduct, getLocalizedProvince } from '@/utils/i18nData'
import { getProductDetailUrl, getProductsPageUrl, getHomeUrl } from '@/utils/routeI18n'

const ITEMS_PER_PAGE = 12

/* ─── Scroll Reveal Wrapper ─────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-[600ms] ease-out ${
        v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

interface ProductsListingClientProps {
  initialProducts?: any[]
  initialCategories?: any[]
}

export default function ProductsListingClient({
  initialProducts = [],
  initialCategories = [],
}: ProductsListingClientProps) {
  const { t, language } = useLanguage()
  const { trackProductClick } = useAnalytics()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const en = language === 'en'
  const ko = language === 'ko'
  const zh = language === 'zh'

  const currentCategorySlug = searchParams.get('category') || 'all'
  const currentSubCategorySlug = searchParams.get('sub') || null

  const [dbCategories] = useState<any[]>(
    initialCategories.length > 0 ? initialCategories : DEFAULT_DB_CATEGORIES
  )
  const [dbProducts] = useState<any[]>(initialProducts)

  // Search & Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'featured' | 'name_asc' | 'name_desc' | 'newest'>('featured')
  const [currentPage, setCurrentPage] = useState(1)

  const productsSectionRef = useRef<HTMLElement>(null)

  // Build category hierarchy
  const categoryTree = useMemo(() => {
    const rawTree = buildCategoryTree(dbCategories)
    return rawTree.map((root: any) => {
      const locRoot = getLocalizedCategory(root, language)
      if (locRoot.children && locRoot.children.length > 0) {
        locRoot.children = locRoot.children.map((c: any) => getLocalizedCategory(c, language))
      }
      return locRoot
    })
  }, [dbCategories, language])

  const activeRootCategory = useMemo(() => {
    for (const root of categoryTree) {
      if (root.slug === currentCategorySlug) return root
      if (root.children && root.children.some((c: any) => c.slug === currentCategorySlug)) return root
    }
    return categoryTree[0] || { id: 'all', slug: 'all', name: 'Tất cả', shortName: 'Tất cả', children: [] }
  }, [categoryTree, currentCategorySlug])

  const activeCategoryNode = useMemo(() => {
    const targetSlug = currentSubCategorySlug || currentCategorySlug
    return findCategoryBySlug(categoryTree, targetSlug)
  }, [categoryTree, currentCategorySlug, currentSubCategorySlug])

  // Update category URL params
  const handleRootCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
      params.delete('sub')
    } else {
      params.set('category', slug)
      params.delete('sub')
    }
    setCurrentPage(1)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const handleSubCategoryChange = (subSlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (activeRootCategory.slug !== 'all') {
      params.set('category', activeRootCategory.slug)
    }
    if (!subSlug) {
      params.delete('sub')
    } else {
      params.set('sub', subSlug)
    }
    setCurrentPage(1)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  // Filter and sort products
  const processedProducts = useMemo(() => {
    // 1. Category filter
    let list = filterProductsByDbCategory(
      dbProducts,
      currentCategorySlug,
      currentSubCategorySlug,
      categoryTree
    )

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((p: any) => {
        const name = (p.name || '').toLowerCase()
        const enName = (p.en_name || '').toLowerCase()
        const desc = (p.description || '').toLowerCase()
        const tag = (p.tag || '').toLowerCase()
        return name.includes(q) || enName.includes(q) || desc.includes(q) || tag.includes(q)
      })
    }

    // 3. Localize products
    let localized = list.map((p: any) => getLocalizedProduct(p, language))

    // 4. Sort
    localized.sort((a: any, b: any) => {
      if (sortBy === 'featured') {
        if (Boolean(b.is_pinned) !== Boolean(a.is_pinned)) {
          return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
        }
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      }
      if (sortBy === 'newest') {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      }
      if (sortBy === 'name_asc') {
        return (a.name || '').localeCompare(b.name || '')
      }
      if (sortBy === 'name_desc') {
        return (b.name || '').localeCompare(a.name || '')
      }
      return 0
    })

    return localized
  }, [
    dbProducts,
    currentCategorySlug,
    currentSubCategorySlug,
    categoryTree,
    searchQuery,
    sortBy,
    language,
  ])

  // Pagination calculation
  const totalItems = processedProducts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
    return processedProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE)
  }, [processedProducts, currentPage])

  // Reset page when search or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col relative">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">
        {/* ═══════════════════════════════════════════════════════════
            HEADER — Clean title + breadcrumb + category tabs
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            {/* Breadcrumb */}
            <div className="py-3 flex items-center gap-1.5 text-xs text-haq-text-secondary overflow-x-auto whitespace-nowrap border-b border-haq-border/50">
              <Link
                href={getHomeUrl(language)}
                className="hover:text-haq-red flex items-center gap-1 transition-colors"
              >
                <Home className="w-3 h-3" />
                <span>{t('products_page.breadcrumb_home', 'Trang chủ')}</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-haq-border" />
              <Link
                href={getProductsPageUrl(language)}
                onClick={() => handleRootCategoryChange('all')}
                className={`hover:text-haq-red transition-colors ${
                  currentCategorySlug === 'all' ? 'text-haq-red font-bold' : ''
                }`}
              >
                {t('products_page.breadcrumb_products', 'Sản phẩm')}
              </Link>
              {activeRootCategory.slug !== 'all' && (
                <>
                  <ChevronRight className="w-3 h-3 text-haq-border" />
                  <button
                    type="button"
                    onClick={() => handleSubCategoryChange(null)}
                    className={`hover:text-haq-red transition-colors cursor-pointer ${
                      !currentSubCategorySlug ? 'text-haq-red font-bold' : ''
                    }`}
                  >
                    {activeRootCategory.name}
                  </button>
                </>
              )}
              {currentSubCategorySlug && activeCategoryNode && (
                <>
                  <ChevronRight className="w-3 h-3 text-haq-border" />
                  <span className="text-haq-red font-bold truncate">{activeCategoryNode.name}</span>
                </>
              )}
            </div>

            {/* Title area */}
            <div className="py-8 sm:py-12">
              <p className="font-heading text-xs tracking-[0.2em] text-haq-ink uppercase mb-2">
                {t('products_page.eyebrow', 'HAQ FOOD · Danh mục sản phẩm')}
              </p>
              <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-haq-ink leading-snug">
                {activeCategoryNode.slug === 'all'
                  ? en
                    ? 'All Products'
                    : ko
                    ? '전체 제품'
                    : zh
                    ? '全部产品'
                    : 'Tất cả sản phẩm'
                  : activeCategoryNode.name}
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-haq-text-secondary max-w-2xl leading-relaxed">
                {activeCategoryNode.desc ||
                  activeRootCategory.desc ||
                  'Khám phá danh mục sản phẩm đồ ăn vặt đóng gói, hạt dinh dưỡng và nông sản chế biến đạt chuẩn ISO 22000 & HACCP.'}
              </p>
            </div>

            {/* Primary category tabs */}
            <div className="pb-0">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-haq-border -mb-px">
                {categoryTree.map((cat: any) => {
                  const isSelected = activeRootCategory.slug === cat.slug
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleRootCategoryChange(cat.slug)}
                      className={`px-4 sm:px-5 py-3 text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border-b-2 ${
                        isSelected
                          ? 'border-haq-red text-haq-red'
                          : 'border-transparent text-haq-text-secondary hover:text-haq-ink'
                      }`}
                    >
                      {cat.shortName || cat.name}
                      {cat.children && cat.children.length > 0 && (
                        <span className="ml-1 text-[10px] opacity-60">({cat.children.length})</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sub-category pills */}
            {activeRootCategory.children && activeRootCategory.children.length > 0 && (
              <div className="py-3 flex items-center gap-2 overflow-x-auto scrollbar-none border-t border-haq-border/40">
                <span className="text-[11px] font-heading font-bold text-haq-text-secondary uppercase mr-1 shrink-0 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-haq-red" />
                  <span>{en ? 'Filter:' : ko ? '분류:' : zh ? '筛选：' : 'Lọc:'}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleSubCategoryChange(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                    !currentSubCategorySlug
                      ? 'bg-haq-red text-white shadow-xs'
                      : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/80 border border-haq-border'
                  }`}
                >
                  {en
                    ? `All ${activeRootCategory.name}`
                    : ko
                    ? `${activeRootCategory.name} 전체`
                    : zh
                    ? `全部 ${activeRootCategory.name}`
                    : `Tất cả ${activeRootCategory.name}`}
                </button>

                {activeRootCategory.children.map((child: any) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleSubCategoryChange(child.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                      currentSubCategorySlug === child.slug
                        ? 'bg-haq-red text-white shadow-xs'
                        : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/80 border border-haq-border'
                    }`}
                  >
                    {child.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SEARCH & TOOLBAR SECTION
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#FAF9F6] border-b border-haq-border py-4">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-haq-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    en
                      ? 'Search products by name, tag...'
                      : ko
                      ? '제품명, 태그 검색...'
                      : zh
                      ? '按产品名称、标签搜索...'
                      : 'Tìm kiếm theo tên sản phẩm, đặc điểm...'
                  }
                  className="w-full pl-9 pr-9 py-2 bg-white border border-haq-border rounded-xl text-xs text-haq-ink placeholder:text-haq-text-secondary/60 focus:outline-none focus:border-haq-red focus:ring-1 focus:ring-haq-red/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-haq-text-secondary hover:text-haq-ink transition-colors p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort selector and Result count */}
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                <span className="text-haq-text-secondary shrink-0">
                  {en ? 'Showing' : ko ? '총' : zh ? '共显示' : 'Hiển thị'}{' '}
                  <strong className="text-haq-ink font-bold">{totalItems}</strong>{' '}
                  {en ? 'products' : ko ? '개' : zh ? '款' : 'sản phẩm'}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-haq-text-secondary" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-haq-border rounded-lg px-2.5 py-1.5 text-xs text-haq-ink font-medium focus:outline-none focus:border-haq-red cursor-pointer"
                  >
                    <option value="featured">
                      {en ? 'Featured' : ko ? '추천순' : zh ? '特色推荐' : 'Nổi bật'}
                    </option>
                    <option value="newest">
                      {en ? 'Newest' : ko ? '최신순' : zh ? '最新上架' : 'Mới nhất'}
                    </option>
                    <option value="name_asc">
                      {en ? 'Name: A-Z' : ko ? '이름: A-Z' : zh ? '名称：A-Z' : 'Tên: A-Z'}
                    </option>
                    <option value="name_desc">
                      {en ? 'Name: Z-A' : ko ? '이름: Z-A' : zh ? '名称：Z-A' : 'Tên: Z-A'}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            PRODUCTS GRID
            ═══════════════════════════════════════════════════════════ */}
        <section ref={productsSectionRef} className="bg-haq-cream/30 py-10 sm:py-14">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-16 text-center border border-haq-border max-w-xl mx-auto">
                <Package className="w-12 h-12 text-haq-border mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-haq-ink">
                  {searchQuery
                    ? en
                      ? 'No products matched your search'
                      : ko
                      ? '검색된 제품이 없습니다'
                      : zh
                      ? '未找到符合条件的产品'
                      : 'Không tìm thấy sản phẩm phù hợp'
                    : t('products_page.empty_title', 'Chưa có sản phẩm nào trong danh mục này')}
                </h3>
                <p className="text-xs text-haq-text-secondary mt-2">
                  {searchQuery
                    ? en
                      ? 'Please try different keywords or clear your search query.'
                      : ko
                      ? '다른 검색어를 입력하시거나 검색을 초기화해 보세요.'
                      : zh
                      ? '请尝试输入其他关键词或清空搜索框。'
                      : 'Vui lòng thử từ khóa khác hoặc xóa bộ lọc tìm kiếm.'
                    : t(
                        'products_page.empty_desc',
                        'Vui lòng chọn danh mục khác hoặc liên hệ hotline để nhận catalog chi tiết.'
                      )}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-5 py-2.5 bg-haq-cream border border-haq-border text-haq-ink text-xs font-heading font-bold rounded-full hover:bg-haq-border transition-colors cursor-pointer"
                    >
                      {en ? 'Clear search' : ko ? '검색어 지우기' : zh ? '清空搜索' : 'Xóa tìm kiếm'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRootCategoryChange('all')}
                    className="px-6 py-2.5 bg-haq-red text-white text-xs font-heading font-bold rounded-full hover:bg-haq-red/90 transition-colors cursor-pointer shadow-xs"
                  >
                    {t('products_page.all_tab', 'Xem tất cả sản phẩm')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {paginatedProducts.map((prod: any, idx: number) => {
                    const currentCatSlug = activeCategoryNode?.slug || activeRootCategory?.slug || 'all'
                    const productImg =
                      resolveProductImage(prod, currentCatSlug) ||
                      prod.images?.[0] ||
                      prod.image_url ||
                      prod.image ||
                      '/herobanner/hero_banner_1.jpg'
                    const detailSlug = prod.slug || prod.id

                    return (
                      <Reveal key={prod.id} delay={Math.min(idx * 50, 300)}>
                        <Link
                          href={getProductDetailUrl(detailSlug, language)}
                          onClick={() => trackProductClick(prod, 'product_grid')}
                          data-product-click="true"
                          data-product-id={prod.id}
                          data-product-slug={detailSlug}
                          data-product-name={prod.name}
                          data-product-canonical-name={prod.canonical_name || prod.name}
                          data-product-category={
                            prod.canonical_category ||
                            prod.categories?.name ||
                            activeRootCategory.name ||
                            'HAQ FOOD'
                          }
                          data-product-price={prod.price_min || prod.variants?.[0]?.price || 0}
                          data-product-location="product_grid"
                          className="group block bg-white rounded-2xl overflow-hidden border border-haq-border hover:border-haq-red/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                        >
                          {/* Image */}
                          <div className="relative h-56 sm:h-60 bg-haq-cream/40 flex items-center justify-center p-6 overflow-hidden">
                            <img
                              src={productImg}
                              alt={prod.name}
                              className="max-h-44 sm:max-h-48 w-auto max-w-full object-contain drop-shadow-xs transform group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {prod.is_pinned && (
                              <span className="absolute top-3 left-3 bg-[#16A34A] text-white font-heading text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                                {en ? 'Flagship' : ko ? '대표' : zh ? '核心' : 'Chủ lực'}
                              </span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center justify-between gap-1.5 mb-2">
                              <span className="text-[11px] font-heading font-bold text-haq-red uppercase tracking-wider truncate">
                                {prod.categories?.name || activeRootCategory.name || 'HAQ FOOD'}
                              </span>
                              {prod.provinces && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-haq-text-secondary font-medium bg-haq-cream px-2 py-0.5 rounded-full shrink-0">
                                  <MapPin className="w-2.5 h-2.5" />{' '}
                                  {getLocalizedProvince(prod.provinces, language).name}
                                </span>
                              )}
                            </div>

                            <h3 className="font-heading font-bold text-base text-haq-ink group-hover:text-haq-red transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
                              {prod.name}
                            </h3>

                            <p className="mt-2 text-xs text-haq-text-secondary leading-relaxed line-clamp-2 min-h-[2.25rem]">
                              {prod.description ||
                                (en
                                  ? 'Safely packaged, certified for food safety ISO 22000 & HACCP.'
                                  : ko
                                  ? '안전 포장 및 ISO 22000, HACCP 식품 안전 인증.'
                                  : zh
                                  ? '安全卫生包装，符合 ISO 22000 & HACCP 严苛食品安全标准。'
                                  : 'Sản phẩm đóng gói an toàn, đạt chuẩn ATTP ISO 22000 & HACCP.')}
                            </p>

                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-haq-border/40">
                              <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-haq-red group-hover:gap-2.5 transition-all">
                                <span>
                                  {en ? 'View details' : ko ? '상세 보기' : zh ? '查看详情' : 'Xem chi tiết'}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </Reveal>
                    )
                  })}
                </div>

                {/* ═══════════════════════════════════════════════════════════
                    PAGINATION CONTROLS
                    ═══════════════════════════════════════════════════════════ */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-haq-border">
                    <p className="text-xs text-haq-text-secondary">
                      {en ? 'Showing page' : ko ? '페이지' : zh ? '第' : 'Trang'}{' '}
                      <strong className="text-haq-ink font-bold">{currentPage}</strong>{' '}
                      {en ? 'of' : ko ? '/' : zh ? '页 / 共' : '/'}{' '}
                      <strong className="text-haq-ink font-bold">{totalPages}</strong>{' '}
                      {en ? 'pages' : ko ? '페이지' : zh ? '页' : 'trang'}
                    </p>

                    <div className="flex items-center gap-1.5">
                      {/* Previous Page */}
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-2 rounded-lg border border-haq-border text-xs font-heading font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:border-haq-red/50 transition-colors flex items-center gap-1"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {en ? 'Prev' : ko ? '이전' : zh ? '上一页' : 'Trước'}
                        </span>
                      </button>

                      {/* Numbered Page Buttons */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                        // Truncate logic for large page counts
                        if (
                          totalPages > 7 &&
                          pageNum !== 1 &&
                          pageNum !== totalPages &&
                          Math.abs(pageNum - currentPage) > 1
                        ) {
                          if (pageNum === 2 || pageNum === totalPages - 1) {
                            return (
                              <span key={pageNum} className="px-2 text-xs text-haq-text-secondary">
                                ...
                              </span>
                            )
                          }
                          return null
                        }

                        const isActive = pageNum === currentPage
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-9 h-9 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-haq-red text-white shadow-xs'
                                : 'bg-white border border-haq-border text-haq-ink hover:border-haq-red/50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}

                      {/* Next Page */}
                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-2 rounded-lg border border-haq-border text-xs font-heading font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:border-haq-red/50 transition-colors flex items-center gap-1"
                        aria-label="Next Page"
                      >
                        <span className="hidden sm:inline">
                          {en ? 'Next' : ko ? '다음' : zh ? '下一页' : 'Sau'}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
