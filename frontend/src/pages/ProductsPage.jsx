import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Home, ChevronRight, ArrowRight, Filter, Package, Layers, MapPin } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import {
  buildCategoryTree,
  findCategoryBySlug,
  filterProductsByDbCategory,
  DEFAULT_DB_CATEGORIES,
} from '../data/productCategories'
import { getProducts, getCategories } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedCategory, getLocalizedProduct, getLocalizedProvince } from '../utils/i18nData'

import heroBanner1 from '../assets/herobanner/hero_banner_1.jpg'
import banhTrangSayTomImg from '../assets/products/banh_trang_say_tom_50g.jpg'
import banhTrangSayBoImg from '../assets/products/banh_trang_say_bo_50g.jpg'
import banhTrangSayChaBongImg from '../assets/products/banh_trang_say_cha_bong_50g.jpg'
import banhTrangCuonGaImg from '../assets/products/banh_trang_cuon_ga_la_chanh_100g.jpg'
import banhTrangSaTeTomImg from '../assets/products/banh_trang_soi_sa_te_tom_100g.jpg'
import banhHanhNhanImg from '../assets/products/banh_hanh_nhan_truyen_thong_130g.jpg'
import banhHanhNhanTraXanhImg from '../assets/products/banh_hanh_nhan_tra_xanh_130g.jpg'
import banhDauXanhImg from '../assets/products/banh_dau_xanh_tuoi_250g.jpg'
import banhDauXanhLaDuaImg from '../assets/products/banh_dau_xanh_la_dua_250g.jpg'
import banhDauXanhMixViImg from '../assets/products/banh_dau_xanh_mix_vi_250g.jpg'
import banhSuaDuaImg from '../assets/products/banh_sua_dua_130g.jpg'
import catDoAnVatImg from '../assets/categories/category_do_an_vat.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'

const PRODUCT_IMAGE_MAP = {
  'banh-trang-say-gion-vi-tom': banhTrangSayTomImg,
  'Banh-trang-say-gion-vi-tom': banhTrangSayTomImg,
  'banh-trang-say-bo-50g': banhTrangSayBoImg,
  'banh-trang-say-gion-vi-bo': banhTrangSayBoImg,
  'banh-trang-say-cha-bong-50g': banhTrangSayChaBongImg,
  'Banh-trang-say-gion-vi-tra-bong': banhTrangSayChaBongImg,
  'banh-trang-say-gion-vi-tra-bong': banhTrangSayChaBongImg,
  'banh-trang-tron-ga-la-chanh': banhTrangCuonGaImg,
  'banh-trang-tron-sa-te-tom': banhTrangSaTeTomImg,
  'banh-trang-tron-haq': banhTrangSaTeTomImg,
  'banh-dau-xanh-vi-la-dua': banhDauXanhLaDuaImg,
  'banh-dau-xanh-tuoi-mix-vi': banhDauXanhMixViImg,
  'banh-dau-xanh-tuoi': banhDauXanhImg,
  'banh-dau-xanh-tuoi-250g': banhDauXanhImg,
  'banh-dau-xanh-truyen-thong': banhDauXanhImg,
  'banh-hanh-nhan-truyen-thong-130g': banhHanhNhanImg,
  'banh-hanh-nhan-cao-cap': banhHanhNhanImg,
  'banh-hanh-nhan-tra-xanh-130g': banhHanhNhanTraXanhImg,
  'banh-sua-dua-130g': banhSuaDuaImg,
  'bap-rang-bo-caramel': catDoAnVatImg,
  'bap-rang-bo-pho-mai': catDoAnVatImg,
  'thit-bo-kho-hao-hang': catDoAnKhoImg,
  'thit-heo-kho-chay-toi': catDoAnKhoImg,
}

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
  const en = language === 'en', ko = language === 'ko'
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategorySlug = searchParams.get('category') || 'all'
  const currentSubCategorySlug = searchParams.get('sub') || null

  const [dbCategories, setDbCategories] = useState(DEFAULT_DB_CATEGORIES)
  const [dbProducts, setDbProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
        if (prods && prods.length > 0) setDbProducts(prods)
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
    return categoryTree[0]
  }, [categoryTree, currentCategorySlug])

  const activeCategoryNode = useMemo(() => {
    const targetSlug = currentSubCategorySlug || currentCategorySlug
    return findCategoryBySlug(categoryTree, targetSlug)
  }, [categoryTree, currentCategorySlug, currentSubCategorySlug])

  const handleRootCategoryChange = (slug) => {
    if (slug === 'all') setSearchParams({})
    else setSearchParams({ category: slug })
  }

  const handleSubCategoryChange = (subSlug) => {
    if (!subSlug) setSearchParams({ category: activeRootCategory.slug })
    else setSearchParams({ category: activeRootCategory.slug, sub: subSlug })
  }

  const filteredProducts = useMemo(() => {
    const rawList = filterProductsByDbCategory(dbProducts, currentCategorySlug, currentSubCategorySlug, categoryTree)
    return rawList.map((p) => getLocalizedProduct(p, language))
  }, [dbProducts, currentCategorySlug, currentSubCategorySlug, categoryTree, language])

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
              <Link to="/" className="hover:text-haq-red flex items-center gap-1 transition-colors">
                <Home className="w-3 h-3" />
                <span>{t('products_page.breadcrumb_home', 'Trang chủ')}</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-haq-border" />
              <Link
                to="/san-pham"
                onClick={() => handleRootCategoryChange('all')}
                className={`hover:text-haq-red transition-colors ${currentCategorySlug === 'all' ? 'text-haq-red font-bold' : ''}`}
              >
                {t('products_page.breadcrumb_products', 'Sản phẩm')}
              </Link>
              {activeRootCategory.slug !== 'all' && (
                <>
                  <ChevronRight className="w-3 h-3 text-haq-border" />
                  <button
                    type="button"
                    onClick={() => handleSubCategoryChange(null)}
                    className={`hover:text-haq-red transition-colors cursor-pointer ${!currentSubCategorySlug ? 'text-haq-red font-bold' : ''}`}
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
            <div className="py-10 sm:py-14">
              <p className="font-heading text-xs tracking-[0.2em] text-[#C89B3C] uppercase mb-3">
                {t('products_page.eyebrow', 'HAQ FOOD · Danh mục sản phẩm')}
              </p>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight leading-tight">
                {activeCategoryNode.slug === 'all'
                  ? (en ? 'All Products' : ko ? '전체 제품' : 'Tất cả sản phẩm')
                  : activeCategoryNode.name}
              </h1>
              <p className="mt-3 text-sm text-haq-text-secondary max-w-xl leading-relaxed">
                {activeCategoryNode.desc || activeRootCategory.desc}
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
                      className={`px-5 py-3 text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border-b-2 ${
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
              <div className="py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[11px] font-heading font-bold text-haq-text-secondary uppercase mr-1 shrink-0 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-haq-red" />
                  <span>{en ? 'Filter:' : ko ? '분류:' : 'Lọc:'}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleSubCategoryChange(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                    !currentSubCategorySlug
                      ? 'bg-haq-red text-white'
                      : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/80 border border-haq-border'
                  }`}
                >
                  {en ? `All ${activeRootCategory.name}` : ko ? `${activeRootCategory.name} 전체` : `Tất cả ${activeRootCategory.name}`}
                </button>

                {activeRootCategory.children.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleSubCategoryChange(child.slug)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all cursor-pointer ${
                      currentSubCategorySlug === child.slug
                        ? 'bg-haq-red text-white'
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
            PRODUCTS GRID — Cards with hover lift
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-haq-cream/30 py-10 sm:py-14">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            {/* Result count */}
            <div className="flex items-center justify-between mb-8 text-xs">
              <span className="text-haq-text-secondary">
                {en ? 'Showing' : ko ? '총' : 'Hiển thị'}{' '}
                <strong className="text-haq-ink">{filteredProducts.length}</strong>{' '}
                {en ? 'products' : ko ? '개 제품' : 'sản phẩm'}
                {currentSubCategorySlug && activeCategoryNode ? ` — ${activeCategoryNode.name}` : ''}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-haq-border">
                <Package className="w-12 h-12 text-haq-border mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-haq-ink">
                  {t('products_page.empty_title', 'Chưa có sản phẩm nào trong danh mục này')}
                </h3>
                <p className="text-xs text-haq-text-secondary mt-2">
                  {t('products_page.empty_desc', 'Vui lòng chọn danh mục khác hoặc liên hệ hotline để nhận catalog chi tiết.')}
                </p>
                <button
                  type="button"
                  onClick={() => handleRootCategoryChange('all')}
                  className="mt-6 px-6 py-2.5 bg-haq-red text-white text-xs font-heading font-bold rounded-full hover:bg-haq-red/90 transition-colors cursor-pointer"
                >
                  {t('products_page.all_tab', 'Xem tất cả sản phẩm')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {filteredProducts.map((prod, idx) => {
                  const productImg = PRODUCT_IMAGE_MAP[prod.slug] || prod.images?.[0] || prod.image || heroBanner1
                  const detailSlug = prod.slug || prod.id

                  return (
                    <Reveal key={prod.id} delay={Math.min(idx * 60, 360)}>
                      <Link
                        to={`/san-pham/${detailSlug}`}
                        className="group block bg-white rounded-2xl overflow-hidden border border-haq-border hover:border-haq-red/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                      >
                        {/* Image */}
                        <div className="relative h-56 sm:h-60 bg-haq-cream/40 flex items-center justify-center p-6 overflow-hidden">
                          <img
                            src={productImg}
                            alt={prod.name}
                            className="max-h-44 sm:max-h-48 w-auto max-w-full object-contain drop-shadow-sm transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {prod.is_pinned && (
                            <span className="absolute top-3 left-3 bg-[#C89B3C] text-white font-heading text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                              {en ? 'Flagship' : ko ? '대표' : 'Chủ lực'}
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
                                <MapPin className="w-2.5 h-2.5" /> {getLocalizedProvince(prod.provinces, language).name}
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-base text-haq-ink group-hover:text-haq-red transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
                            {prod.name}
                          </h3>

                          <p className="mt-2 text-xs text-haq-text-secondary leading-relaxed line-clamp-2 min-h-[2.25rem]">
                            {prod.description || (en ? 'Safely packaged, certified for food safety.' : ko ? '안전 포장 및 식품 안전 인증.' : 'Sản phẩm đóng gói an toàn, đạt chuẩn ATTP.')}
                          </p>

                          <div className="mt-auto pt-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-haq-red group-hover:gap-2.5 transition-all">
                              <span>{en ? 'View details' : ko ? '상세 보기' : 'Xem chi tiết'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
