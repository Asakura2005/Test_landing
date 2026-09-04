import React, { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Home, ChevronRight, ArrowRight, Filter, Package, ShieldCheck, Layers, MapPin } from 'lucide-react'
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

import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import banhTrangSayTomImg from '../assets/products/banh_trang_say_tom_50g.jpg'
import banhTrangSayBoImg from '../assets/products/banh_trang_say_bo_50g.jpg'
import banhTrangSayChaBongImg from '../assets/products/banh_trang_say_cha_bong_50g.jpg'
import banhTrangCuonGaImg from '../assets/products/banh_trang_cuon_ga_la_chanh_100g.jpg'
import banhTrangSaTeTomImg from '../assets/products/banh_trang_soi_sa_te_tom_100g.jpg'
import banhHanhNhanImg from '../assets/products/banh_hanh_nhan_truyen_thong_130g.jpg'
import banhHanhNhanTraXanhImg from '../assets/products/banh_hanh_nhan_tra_xanh_130g.jpg'
import banhDauXanhImg from '../assets/products/banh_dau_xanh_tuoi_250g.jpg'
import banhSuaDuaImg from '../assets/products/banh_sua_dua_130g.jpg'
import catDoAnVatImg from '../assets/categories/category_do_an_vat.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'

// Local product image map by slug
const PRODUCT_IMAGE_MAP = {
  'banh-trang-say-gion-vi-tom': banhTrangSayTomImg,
  'Banh-trang-say-gion-vi-tom': banhTrangSayTomImg,
  'banh-trang-say-bo-50g': banhTrangSayBoImg,
  'banh-trang-say-cha-bong-50g': banhTrangSayChaBongImg,
  'banh-trang-tron-ga-la-chanh': banhTrangCuonGaImg,
  'banh-trang-tron-sa-te-tom': banhTrangSaTeTomImg,
  'banh-trang-tron-haq': banhTrangSaTeTomImg,
  'banh-hanh-nhan-truyen-thong-130g': banhHanhNhanImg,
  'banh-hanh-nhan-cao-cap': banhHanhNhanImg,
  'banh-hanh-nhan-tra-xanh-130g': banhHanhNhanTraXanhImg,
  'banh-dau-xanh-tuoi-250g': banhDauXanhImg,
  'banh-dau-xanh-truyen-thong': banhDauXanhImg,
  'banh-sua-dua-130g': banhSuaDuaImg,
  'bap-rang-bo-caramel': catDoAnVatImg,
  'bap-rang-bo-pho-mai': catDoAnVatImg,
  'thit-bo-kho-hao-hang': catDoAnKhoImg,
  'thit-heo-kho-chay-toi': catDoAnKhoImg,
}

export default function ProductsPage() {
  const { t, language } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategorySlug = searchParams.get('category') || 'all'
  const currentSubCategorySlug = searchParams.get('sub') || null

  const [dbCategories, setDbCategories] = useState(DEFAULT_DB_CATEGORIES)
  const [dbProducts, setDbProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 1. Fetch Categories & Products from Database
  useEffect(() => {
    window.scrollTo(0, 0)
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [cats, prods] = await Promise.all([
          getCategories().catch(() => null),
          getProducts().catch(() => null),
        ])

        if (cats && cats.length > 0) {
          setDbCategories(cats)
        }
        if (prods && prods.length > 0) {
          setDbProducts(prods)
        }
      } catch (err) {
        console.warn('Lỗi khi tải dữ liệu sản phẩm từ DB:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Build hierarchical category tree with localization
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

  // Active root category node
  const activeRootCategory = useMemo(() => {
    for (const root of categoryTree) {
      if (root.slug === currentCategorySlug) return root
      if (root.children && root.children.some((c) => c.slug === currentCategorySlug)) {
        return root
      }
    }
    return categoryTree[0]
  }, [categoryTree, currentCategorySlug])

  // Active sub-category or specific node
  const activeCategoryNode = useMemo(() => {
    const targetSlug = currentSubCategorySlug || currentCategorySlug
    return findCategoryBySlug(categoryTree, targetSlug)
  }, [categoryTree, currentCategorySlug, currentSubCategorySlug])

  // Handle Root Category Switch
  const handleRootCategoryChange = (slug) => {
    if (slug === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: slug })
    }
  }

  // Handle Sub-Category Switch
  const handleSubCategoryChange = (subSlug) => {
    if (!subSlug) {
      setSearchParams({ category: activeRootCategory.slug })
    } else {
      setSearchParams({ category: activeRootCategory.slug, sub: subSlug })
    }
  }

  // Filter products based on selected category & subcategory and localize each product
  const filteredProducts = useMemo(() => {
    const rawList = filterProductsByDbCategory(
      dbProducts,
      currentCategorySlug,
      currentSubCategorySlug,
      categoryTree
    )
    return rawList.map((p) => getLocalizedProduct(p, language))
  }, [dbProducts, currentCategorySlug, currentSubCategorySlug, categoryTree, language])

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink font-sans flex flex-col relative selection:bg-haq-green selection:text-white">
      {/* Sticky Header with Live Categories */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px] pb-20">
        {/* 1. Breadcrumb Bar */}
        <div className="bg-white/90 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs text-haq-text-secondary overflow-x-auto whitespace-nowrap">
            <Link
              to="/"
              className="hover:text-haq-green-dark flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t('products_page.breadcrumb_home', 'Trang chủ')}</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-haq-border" />
            <Link
              to="/san-pham"
              onClick={() => handleRootCategoryChange('all')}
              className={`hover:text-haq-green-dark transition-colors ${
                currentCategorySlug === 'all' ? 'text-haq-green-dark font-bold' : ''
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
                  className={`hover:text-haq-green-dark transition-colors cursor-pointer ${
                    !currentSubCategorySlug ? 'text-haq-green-dark font-bold' : ''
                  }`}
                >
                  {activeRootCategory.name}
                </button>
              </>
            )}

            {currentSubCategorySlug && activeCategoryNode && (
              <>
                <ChevronRight className="w-3 h-3 text-haq-border" />
                <span className="text-haq-green-dark font-bold truncate">
                  {activeCategoryNode.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 2. Page Header */}
        <div className="bg-white border-b border-haq-border py-10 sm:py-14">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                    {t('products_page.eyebrow', 'HAQ FOOD · PRODUCTS CATALOG')}
                  </span>
                  <span className="h-px w-10 bg-[#16A34A]" />
                </div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                  {activeCategoryNode.slug === 'all'
                    ? t('products_page.all_products', 'TẤT CẢ SẢN PHẨM')
                    : activeCategoryNode.name}
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary max-w-xl leading-relaxed font-normal">
                  {activeCategoryNode.desc || activeRootCategory.desc}
                </p>
              </div>
            </div>

            {/* 3. Level 1: Primary Category Tabs (Fetched Dynamically from DB) */}
            <div className="mt-8 pt-6 border-t border-haq-border">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-heading font-bold text-haq-text-secondary uppercase mr-2 flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{t('products_page.category_label', 'DANH MỤC:')}</span>
                </span>

                {categoryTree.map((cat) => {
                  const isSelected = activeRootCategory.slug === cat.slug
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleRootCategoryChange(cat.slug)}
                      className={`relative px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-sm scale-102'
                          : 'bg-haq-sage text-haq-text-secondary border-haq-border hover:bg-haq-sage/80 hover:text-haq-green-dark'
                      }`}
                    >
                      <span>{cat.shortName || cat.name}</span>
                      {cat.children && cat.children.length > 0 && (
                        <span className="ml-1.5 text-[10px] opacity-80">
                          ({cat.children.length})
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. Level 2: Sub-Category Pills */}
            {activeRootCategory.children && activeRootCategory.children.length > 0 && (
              <div className="mt-4 pt-3 border-t border-dashed border-haq-border flex items-center gap-2 overflow-x-auto pb-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="text-[11px] font-heading font-bold text-haq-green-dark uppercase mr-2 flex items-center gap-1 shrink-0">
                  <Layers className="w-3 h-3 text-[#16A34A]" />
                  <span>
                    {language === 'en'
                      ? `FILTER ${activeRootCategory.name}:`
                      : language === 'ko'
                      ? `${activeRootCategory.name} 분류:`
                      : `PHÂN LOẠI ${activeRootCategory.name}:`}
                  </span>
                </span>

                {/* Sub-tab: Tất cả trong danh mục cha */}
                <button
                  type="button"
                  onClick={() => handleSubCategoryChange(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    !currentSubCategorySlug
                      ? 'bg-[#0F5132] text-white shadow-2xs'
                      : 'bg-white text-haq-text-secondary hover:bg-haq-sage hover:text-haq-green-dark border border-haq-border'
                  }`}
                >
                  {language === 'en'
                    ? `All ${activeRootCategory.name}`
                    : language === 'ko'
                    ? `${activeRootCategory.name} 전체`
                    : `Tất cả ${activeRootCategory.name}`}
                </button>

                {/* Các danh mục con cụ thể */}
                {activeRootCategory.children.map((child) => {
                  const isChildActive = currentSubCategorySlug === child.slug
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => handleSubCategoryChange(child.slug)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                        isChildActive
                          ? 'bg-[#16A34A] text-white shadow-2xs'
                          : 'bg-white text-haq-text-secondary hover:bg-haq-sage hover:text-haq-green-dark border border-haq-border'
                      }`}
                    >
                      {child.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* 5. Products Grid */}
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
          <div className="flex items-center justify-between mb-8 text-xs font-heading text-haq-text-secondary">
            <span>
              {language === 'en' ? 'SHOWING' : language === 'ko' ? '총' : 'HIỂN THỊ'}{' '}
              <strong className="text-haq-ink">{filteredProducts.length}</strong>{' '}
              {language === 'en' ? 'PRODUCTS' : language === 'ko' ? '개 제품' : 'SẢN PHẨM'}
              {currentSubCategorySlug ? ` (${activeCategoryNode.name})` : ''}
            </span>
            <span className="font-semibold text-haq-green-dark">HAQ FOOD HANOI JSC</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-haq-border shadow-2xs">
              <Package className="w-12 h-12 text-haq-text-secondary/40 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg text-haq-ink uppercase">
                {t('products_page.empty_title', 'Chưa có sản phẩm nào trong danh mục này')}
              </h3>
              <p className="text-xs text-haq-text-secondary mt-1">
                {t('products_page.empty_desc', 'Vui lòng chọn danh mục khác hoặc liên hệ hotline để nhận catalog chi tiết.')}
              </p>
              <button
                type="button"
                onClick={() => handleRootCategoryChange('all')}
                className="mt-6 px-6 py-2.5 bg-[#16A34A] hover:bg-[#13863d] text-white text-xs font-heading font-bold uppercase rounded-full transition-colors cursor-pointer"
              >
                {t('products_page.all_tab', 'Xem tất cả sản phẩm')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((prod) => {
                const productImg =
                  PRODUCT_IMAGE_MAP[prod.slug] ||
                  prod.images?.[0] ||
                  prod.image ||
                  heroBanner1
                const detailSlug = prod.slug || prod.id

                return (
                  <div
                    key={prod.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-haq-border hover:border-[#16A34A] shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div className="flex-1 flex flex-col">
                      {/* Product Image Frame */}
                      <div className="relative h-56 sm:h-60 bg-haq-sage/30 flex items-center justify-center p-6 border-b border-haq-border overflow-hidden">
                        <img
                          src={productImg}
                          alt={prod.name}
                          className="max-h-44 sm:max-h-48 w-auto max-w-full object-contain filter drop-shadow-sm transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {prod.is_pinned && (
                          <div className="absolute top-3.5 left-3.5 bg-[#C89B3C] text-white font-heading text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                            {language === 'en' ? 'FLAGSHIP' : language === 'ko' ? '대표 상품' : 'CHỦ LỰC'}
                          </div>
                        )}
                      </div>

                      {/* Product Content with Strict Height Locking */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Slot 1: Category Tag & Province Badge (Fixed Height) */}
                          <div className="flex items-center justify-between gap-1.5 h-5 mb-1.5 overflow-hidden">
                            <span className="text-[11px] font-heading font-bold text-[#16A34A] uppercase tracking-wider truncate">
                              {prod.categories?.name ||
                                activeRootCategory.name ||
                                'HAQ FOOD'}
                            </span>
                            {prod.provinces && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                                <MapPin className="w-2.5 h-2.5 text-emerald-600" /> {getLocalizedProvince(prod.provinces, language).name}
                              </span>
                            )}
                          </div>

                          {/* Slot 2: Product Name (Fixed 2-Line Height) */}
                          <h3 className="font-heading font-bold text-base text-haq-ink group-hover:text-[#16A34A] transition-colors leading-snug line-clamp-2 h-12 flex items-center">
                            <Link to={`/san-pham/${detailSlug}`}>
                              {prod.name}
                            </Link>
                          </h3>

                          {/* Slot 3: Description (Fixed 2-Line Height) */}
                          <p className="mt-2 text-xs text-haq-text-secondary leading-relaxed line-clamp-2 h-9 flex items-start font-normal">
                            {prod.description ||
                              (language === 'en'
                                ? 'Safely packaged, certified for food safety & hygiene.'
                                : language === 'ko'
                                ? '안전 포장 및 식품 안전 위생 기준 인증 완료.'
                                : 'Sản phẩm đóng gói an toàn, đạt chuẩn kiểm định an toàn vệ sinh thực phẩm.')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer (Always pinned to bottom) */}
                    <div className="p-6 pt-0 mt-auto">
                      <Link
                        to={`/san-pham/${detailSlug}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-haq-sage hover:bg-[#16A34A] text-haq-green-dark hover:text-white border border-haq-border text-xs font-heading font-bold uppercase tracking-wider py-3 rounded-full transition-all duration-200 shadow-2xs hover:shadow-md"
                      >
                        <span>{t('products_page.view_details', 'CHI TIẾT SẢN PHẨM')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  )
}
