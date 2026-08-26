import React, { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Home, ChevronRight, ArrowRight, Filter, Package, ShieldCheck, Layers } from 'lucide-react'
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

  // Build hierarchical category tree
  const categoryTree = useMemo(() => {
    return buildCategoryTree(dbCategories)
  }, [dbCategories])

  // Active root category node
  const activeRootCategory = useMemo(() => {
    // Check if the currentCategorySlug is a child, find its parent
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

  // Filter products based on selected category & subcategory
  const filteredProducts = useMemo(() => {
    return filterProductsByDbCategory(
      dbProducts,
      currentCategorySlug,
      currentSubCategorySlug,
      categoryTree
    )
  }, [dbProducts, currentCategorySlug, currentSubCategorySlug, categoryTree])

  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header with Live Categories */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* 1. Breadcrumb Bar */}
        <div className="bg-white/60 border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs text-haq-ink/60 overflow-x-auto whitespace-nowrap">
            <Link
              to="/"
              className="hover:text-haq-red flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-black/30" />
            <Link
              to="/san-pham"
              onClick={() => handleRootCategoryChange('all')}
              className={`hover:text-haq-red transition-colors ${
                currentCategorySlug === 'all' ? 'text-haq-red font-bold' : ''
              }`}
            >
              Sản phẩm
            </Link>

            {activeRootCategory.slug !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-black/30" />
                <button
                  type="button"
                  onClick={() => handleSubCategoryChange(null)}
                  className={`hover:text-haq-red transition-colors ${
                    !currentSubCategorySlug ? 'text-haq-red font-bold' : ''
                  }`}
                >
                  {activeRootCategory.name}
                </button>
              </>
            )}

            {currentSubCategorySlug && activeCategoryNode && (
              <>
                <ChevronRight className="w-3 h-3 text-black/30" />
                <span className="text-haq-red font-bold truncate">
                  {activeCategoryNode.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 2. Page Header */}
        <div className="bg-white border-b border-black/5 py-10 sm:py-14">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                    HAQ FOOD · DANH MỤC TỪ DATABASE
                  </span>
                  <span className="h-px w-10 bg-haq-red" />
                </div>
                <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                  {activeCategoryNode.slug === 'all'
                    ? 'TẤT CẢ SẢN PHẨM'
                    : activeCategoryNode.name}
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-haq-ink/75 max-w-xl leading-relaxed">
                  {activeCategoryNode.desc || activeRootCategory.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-haq-ink/60 bg-haq-bone px-4 py-2.5 rounded-2xl border border-black/5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-haq-red" />
                <span>TIÊU CHUẨN ISO 22000 & HACCP</span>
              </div>
            </div>

            {/* 3. Level 1: Primary Category Tabs (Fetched Dynamically from DB) */}
            <div className="mt-8 pt-6 border-t border-black/5">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-mono font-bold text-haq-ink/40 uppercase mr-2 flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>DANH MỤC:</span>
                </span>

                {categoryTree.map((cat) => {
                  const isSelected = activeRootCategory.slug === cat.slug
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleRootCategoryChange(cat.slug)}
                      className={`relative px-4 py-2 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-haq-red text-white shadow-sm scale-102'
                          : 'bg-haq-bone text-haq-ink/80 hover:bg-black/5 hover:text-haq-red'
                      }`}
                    >
                      <span>{cat.shortName || cat.name}</span>
                      {cat.children && cat.children.length > 0 && (
                        <span className="ml-1.5 text-[10px] opacity-75">
                          ({cat.children.length})
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. Level 2: Sub-Category Pills (e.g. Bánh tráng -> Bánh tráng sấy & Bánh tráng trộn) */}
            {activeRootCategory.children && activeRootCategory.children.length > 0 && (
              <div className="mt-4 pt-3 border-t border-dashed border-black/10 flex items-center gap-2 overflow-x-auto pb-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="text-[11px] font-mono font-bold text-haq-red uppercase mr-2 flex items-center gap-1 shrink-0">
                  <Layers className="w-3 h-3" />
                  <span>PHÂN LOẠI {activeRootCategory.name}:</span>
                </span>

                {/* Sub-tab: Tất cả trong danh mục cha */}
                <button
                  type="button"
                  onClick={() => handleSubCategoryChange(null)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    !currentSubCategorySlug
                      ? 'bg-haq-ink text-white shadow-2xs'
                      : 'bg-white text-haq-ink/70 hover:bg-black/5 hover:text-haq-ink border border-black/10'
                  }`}
                >
                  Tất cả {activeRootCategory.name}
                </button>

                {/* Các danh mục con cụ thể */}
                {activeRootCategory.children.map((child) => {
                  const isChildActive = currentSubCategorySlug === child.slug
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => handleSubCategoryChange(child.slug)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                        isChildActive
                          ? 'bg-haq-red text-white shadow-2xs'
                          : 'bg-white text-haq-ink/70 hover:bg-black/5 hover:text-haq-ink border border-black/10'
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
          <div className="flex items-center justify-between mb-8 text-xs font-mono text-haq-ink/60">
            <span>
              HIỂN THỊ <strong>{filteredProducts.length}</strong> SẢN PHẨM
              {currentSubCategorySlug ? ` (${activeCategoryNode.name})` : ''}
            </span>
            <span>HAQ FOOD HANOI JSC</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-black/5 shadow-2xs">
              <Package className="w-12 h-12 text-haq-ink/20 mx-auto mb-4" />
              <h3 className="font-heading font-bold text-lg text-haq-ink uppercase">
                Chưa có sản phẩm nào trong danh mục này
              </h3>
              <p className="text-xs text-haq-ink/60 mt-1">
                Vui lòng chọn danh mục khác hoặc liên hệ hotline để nhận catalog chi tiết.
              </p>
              <button
                type="button"
                onClick={() => handleRootCategoryChange('all')}
                className="mt-6 px-6 py-2.5 bg-haq-red text-white text-xs font-heading font-bold uppercase rounded-full"
              >
                Xem tất cả sản phẩm
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
                    className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative aspect-4/3 overflow-hidden bg-haq-bone/60 flex items-center justify-center p-3 sm:p-4">
                        <img
                          src={productImg}
                          alt={prod.name}
                          className="w-full h-full object-contain filter drop-shadow-xs transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {prod.is_pinned && (
                          <div className="absolute top-3.5 left-3.5 bg-haq-red text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                            CHỦ LỰC
                          </div>
                        )}
                      </div>

                      {/* Product Content */}
                      <div className="p-6">
                        <div className="text-[10px] font-mono font-bold text-haq-red uppercase tracking-widest mb-1.5">
                          {prod.categories?.name ||
                            activeRootCategory.name ||
                            'HAQ FOOD'}
                        </div>

                        <h3 className="font-heading font-black text-lg text-haq-ink group-hover:text-haq-red transition-colors uppercase leading-snug">
                          <Link to={`/san-pham/${detailSlug}`}>
                            {prod.name}
                          </Link>
                        </h3>

                        <p className="mt-2.5 text-xs text-haq-ink/70 leading-relaxed line-clamp-2">
                          {prod.description ||
                            'Sản phẩm đóng gói an toàn, đạt chuẩn kiểm định an toàn vệ sinh thực phẩm.'}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 pt-0">
                      <Link
                        to={`/san-pham/${detailSlug}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-haq-bone hover:bg-haq-red text-haq-ink hover:text-white text-xs font-heading font-extrabold uppercase tracking-wider py-3 rounded-2xl transition-all duration-200"
                      >
                        <span>CHI TIẾT SẢN PHẨM</span>
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
