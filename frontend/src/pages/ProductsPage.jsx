import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import {
  buildCategoryTree,
  findCategoryBySlug,
  filterProductsByDbCategory,
  DEFAULT_DB_CATEGORIES,
  resolveProductImage,
} from '../data/productCategories'
import { getProducts, getCategories } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'
import { useAnalytics } from '../hooks/useAnalytics'
import { getLocalizedCategory, getLocalizedProduct, getLocalizedProvince } from '../utils/i18nData'
import { getProductDetailUrl, getProductsPageUrl, getHomeUrl } from '../utils/routeI18n'

import heroBanner1 from '../assets/herobanner/hero_banner_1.webp'

const ITEMS_PER_PAGE = 12


/* ─── Reveal ──────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-[600ms] ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function ProductsPage() {
  const { t, language } = useLanguage()
  const { trackProductClick } = useAnalytics()
  const en = language === 'en', ko = language === 'ko', zh = language === 'zh'
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategorySlug = searchParams.get('category') || 'all'
  const currentSubCategorySlug = searchParams.get('sub') || null

  const [dbCategories, setDbCategories] = useState(DEFAULT_DB_CATEGORIES)
  const [dbProducts, setDbProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Search & Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)

  const productsSectionRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [cats, prods] = await Promise.all([
          getCategories().catch(() => null),
          getProducts().catch(() => null),
        ])
        if (cats && cats.length > 0) setDbCategories(cats)
        if (prods && Array.isArray(prods)) {
          setDbProducts(prods)
        } else {
          setDbProducts([])
        }
      } catch (err) {
        console.warn('Lỗi khi tải dữ liệu sản phẩm từ DB:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const categoryTree = useMemo(() => {
    const rawTree = buildCategoryTree(dbCategories)
    return rawTree.map((root) => {
      const locRoot = getLocalizedCategory(root, language)
      if (locRoot.children && locRoot.children.length > 0) {
        locRoot.children = locRoot.children.map((c) => getLocalizedCategory(c, language))
      }
      return locRoot
    })
  }, [dbCategories, language])

  const activeRootCategory = useMemo(() => {
    for (const root of categoryTree) {
      if (root.slug === currentCategorySlug) return root
      if (root.children && root.children.some((c) => c.slug === currentCategorySlug)) return root
    }
    return (
      categoryTree[0] || {
        id: 'all',
        slug: 'all',
        name: en ? 'All Products' : ko ? '전체 제품' : zh ? '全部产品' : 'Tất cả sản phẩm',
        shortName: 'Tất cả',
        children: [],
      }
    )
  }, [categoryTree, currentCategorySlug, en, ko, zh])

  const activeCategoryNode = useMemo(() => {
    const targetSlug = currentSubCategorySlug || currentCategorySlug
    return findCategoryBySlug(categoryTree, targetSlug)
  }, [categoryTree, currentCategorySlug, currentSubCategorySlug])

  const handleRootCategoryChange = (slug) => {
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ category: slug })
    setCurrentPage(1)
  }

  const handleSubCategoryChange = (subSlug) => {
    if (!subSlug) setSearchParams({ category: activeRootCategory.slug })
    else setSearchParams({ category: activeRootCategory.slug, sub: subSlug })
    setCurrentPage(1)
  }

  // Filter and sort products
  const processedProducts = useMemo(() => {
    // 1. Category filter
    let list = filterProductsByDbCategory(dbProducts, currentCategorySlug, currentSubCategorySlug, categoryTree)

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((p) => {
        const name = (p.name || '').toLowerCase()
        const enName = (p.en_name || '').toLowerCase()
        const desc = (p.description || '').toLowerCase()
        const tag = (p.tag || '').toLowerCase()
        return name.includes(q) || enName.includes(q) || desc.includes(q) || tag.includes(q)
      })
    }

    // 3. Localize products
    let localized = list.map((p) => getLocalizedProduct(p, language))

    // 4. Sort
    localized.sort((a, b) => {
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
  }, [dbProducts, currentCategorySlug, currentSubCategorySlug, categoryTree, searchQuery, sortBy, language])

  // Pagination calculation
  const totalItems = processedProducts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
    return processedProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE)
  }, [processedProducts, currentPage])

  // Reset page when search, sort, or category filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy, currentCategorySlug, currentSubCategorySlug])

  // Safeguard: clamp currentPage if totalPages shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  const handlePageChange = (page) => {
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
              <Link to={getHomeUrl(language)} className="hover:text-haq-red flex items-center gap-1 transition-colors">
                <Home className="w-3 h-3" />
                <span>{t('products_page.breadcrumb_home', 'Trang chủ')}</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-haq-border" />
              <Link
                to={getProductsPageUrl(language)}
                onClick={() => handleRootCategoryChange('all')}
                className={`hover:text-haq-red transition-colors ${currentCategorySlug === 'all' ? 'text-haq-red font-bold' : ''}`}
              >
                {t('products_page.breadcrumb_products', 'Sản phẩm')}
              </Link>
              {activeRootCategory?.slug !== 'all' && (
                <>
                  <ChevronRight className="w-3 h-3 text-haq-border" />
                  <button
                    type="button"
                    onClick={() => handleSubCategoryChange(null)}
                    className={`hover:text-haq-red transition-colors cursor-pointer ${!currentSubCategorySlug ? 'text-haq-red font-bold' : ''}`}
                  >
                    {activeRootCategory?.name}
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
                {activeCategoryNode?.slug === 'all'
                  ? (en ? 'All Products' : ko ? '전체 제품' : zh ? '全部产品' : 'Tất cả sản phẩm')
                  : activeCategoryNode?.name}
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-haq-text-secondary max-w-2xl leading-relaxed">
                {activeCategoryNode?.desc ||
                  activeRootCategory?.desc ||
                  'Khám phá danh mục sản phẩm đồ ăn vặt đóng gói, hạt dinh dưỡng và nông sản chế biến đạt chuẩn ISO 22000 & HACCP.'}
              </p>
            </div>

            {/* Primary category tabs */}
            <div className="pb-0">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-haq-border -mb-px">
                {categoryTree.map((cat) => {
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
            {activeRootCategory?.children && activeRootCategory.children.length > 0 && (
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
                      ? 'bg-haq-red text-white shadow-sm'
                      : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/80 border border-haq-border'
                  }`}
                >
                  {en ? `All ${activeRootCategory?.name}` : ko ? `${activeRootCategory?.name} 전체` : zh ? `全部 ${activeRootCategory?.name}` : `Tất cả ${activeRootCategory?.name}`}
                </button>

                {activeRootCategory.children.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleSubCategoryChange(child.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                      currentSubCategorySlug === child.slug
                        ? 'bg-haq-red text-white shadow-sm'
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
                    aria-label={en ? 'Clear search' : ko ? '검색어 지우기' : zh ? '清空搜索' : 'Xóa tìm kiếm'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-haq-text-secondary hover:text-haq-ink transition-colors p-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded"
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
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label={en ? 'Sort products' : ko ? '제품 정렬' : zh ? '产品排序' : 'Sắp xếp sản phẩm'}
                    className="bg-white border border-haq-border rounded-lg px-2.5 py-1.5 text-xs text-haq-ink font-medium focus:outline-none focus:border-haq-red focus-visible:ring-1 focus-visible:ring-haq-red cursor-pointer"
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
            PRODUCTS GRID — 4-Column Food Brand Layout
            ═══════════════════════════════════════════════════════════ */}
        <section ref={productsSectionRef} className="bg-haq-cream/30 py-10 sm:py-14 scroll-mt-20 sm:scroll-mt-24">
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
                    className="px-6 py-2.5 bg-haq-red text-white text-xs font-heading font-bold rounded-full hover:bg-haq-red/90 transition-colors cursor-pointer shadow-sm"
                  >
                    {t('products_page.all_tab', 'Xem tất cả sản phẩm')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
                  {paginatedProducts.map((prod, idx) => {
                    const currentCatSlug = activeCategoryNode?.slug || activeRootCategory?.slug || 'all'
                    const productImg = resolveProductImage(prod, currentCatSlug) || prod.images?.[0] || prod.image_url || prod.image || heroBanner1
                    const detailSlug = prod.slug || prod.id
                    const rawWeight =
                      (prod.variants &&
                        prod.variants.length > 0 &&
                        (prod.variants[0]?.size ||
                          (prod.variants[0]?.name && prod.variants[0]?.name !== prod.name
                            ? prod.variants[0]?.name
                            : null))) ||
                      prod.weight ||
                      (prod.tag && !prod.is_pinned ? prod.tag : null)
                    const rawWeightStr = typeof rawWeight === 'number' ? `${rawWeight}g` : String(rawWeight || '').trim()
                    const weightBadge = rawWeightStr && rawWeightStr.length <= 20 ? rawWeightStr : null
                    const provObj = Array.isArray(prod.provinces) ? prod.provinces[0] : prod.provinces
                    const provName = provObj ? (getLocalizedProvince(provObj, language)?.name || provObj.name || '') : ''
                    const catObj = Array.isArray(prod.categories) ? prod.categories[0] : prod.categories
                    const catLocalized = catObj ? getLocalizedCategory(catObj, language) : null
                    const displayCategory = catLocalized?.name || catObj?.name || prod.category || activeRootCategory?.name || 'HAQ FOOD'
                    const canonicalCategory = prod.canonical_category || catObj?.name || prod.category || activeRootCategory?.name || 'HAQ FOOD'

                    return (
                      <Reveal key={prod.id} delay={Math.min(idx * 50, 300)} className="h-full">
                        <Link
                          to={getProductDetailUrl(detailSlug, language)}
                          onClick={() => trackProductClick(prod, 'product_grid')}
                          data-product-click="true"
                          data-product-id={prod.id}
                          data-product-slug={detailSlug}
                          data-product-name={prod.name}
                          data-product-canonical-name={prod.canonical_name || prod.name}
                          data-product-category={canonicalCategory}
                          data-product-price={prod.price_min || prod.variants?.[0]?.price || 0}
                          data-product-location="product_grid"
                          className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-haq-border hover:border-haq-red/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red focus-visible:ring-offset-2"
                        >
                          {/* Image Container: 1:1 Aspect Ratio (aspect-square) */}
                          <div className="relative w-full aspect-square bg-[#FAF9F6] overflow-hidden flex items-center justify-center">
                            <img
                              src={productImg}
                              alt={prod.name || 'HAQ FOOD'}
                              onError={(e) => {
                                e.currentTarget.onerror = null
                                e.currentTarget.src = heroBanner1
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                              loading="lazy"
                            />

                            {/* Badges Overlay */}
                            <div className="absolute top-2 sm:top-2.5 inset-x-2 sm:inset-x-2.5 flex items-start justify-between pointer-events-none z-10 gap-1.5">
                              <div className="min-w-0 max-w-[70px] sm:max-w-[90px]">
                                {prod.is_pinned && (
                                  <span className="inline-flex items-center bg-[#16A34A] text-white font-heading text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm max-w-full truncate">
                                    {en ? 'Flagship' : ko ? '대표' : zh ? '核心' : 'Chủ lực'}
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0 ml-auto max-w-[75px] sm:max-w-[110px] flex justify-end">
                                {weightBadge && (
                                  <span className="inline-flex items-center bg-white/90 backdrop-blur-sm text-haq-ink font-heading text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-haq-border/80 shadow-sm max-w-full truncate">
                                    {weightBadge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
                            <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-2">
                              <span className="text-[10px] sm:text-[11px] font-heading font-bold text-haq-red uppercase tracking-wider truncate">
                                {displayCategory}
                              </span>
                              {provName && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] text-haq-text-secondary font-medium bg-haq-cream px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                                  <span className="truncate max-w-[65px] sm:max-w-none">
                                    {provName}
                                  </span>
                                </span>
                              )}
                            </div>

                            <h3 className="font-heading font-bold text-xs sm:text-sm lg:text-base text-haq-ink group-hover:text-haq-red transition-colors leading-snug line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem] lg:min-h-[2.75rem]">
                              {prod.name}
                            </h3>

                            <div className="mt-auto pt-3 sm:pt-3.5 flex items-center justify-between border-t border-haq-border/40">
                              <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-heading font-bold text-haq-red group-hover:gap-2 sm:group-hover:gap-2.5 transition-all">
                                <span>{en ? 'View details' : ko ? '상세 보기' : zh ? '查看详情' : 'Xem chi tiết'}</span>
                                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
                        className="px-3 py-2 rounded-lg border border-haq-border text-xs font-heading font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:border-haq-red/50 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red focus-visible:ring-offset-1"
                        aria-label={en ? 'Previous page' : ko ? '이전 페이지' : zh ? '上一页' : 'Trang trước'}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">
                          {en ? 'Prev' : ko ? '이전' : zh ? '上一页' : 'Trước'}
                        </span>
                      </button>

                      {/* Numbered Page Buttons */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
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
                            aria-label={`${en ? 'Page' : ko ? '페이지' : zh ? '第' : 'Trang'} ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                            className={`w-9 h-9 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red focus-visible:ring-offset-1 ${
                              isActive
                                ? 'bg-haq-red text-white shadow-sm'
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
                        className="px-3 py-2 rounded-lg border border-haq-border text-xs font-heading font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:border-haq-red/50 transition-colors flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red focus-visible:ring-offset-1"
                        aria-label={en ? 'Next page' : ko ? '다음 페이지' : zh ? '下一页' : 'Trang sau'}
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
