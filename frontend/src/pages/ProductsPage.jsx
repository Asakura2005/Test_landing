import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Home, ChevronRight, ArrowRight, Sparkles, Filter, Package, ShieldCheck } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { PRODUCT_CATEGORIES, getCategoryBySlug, filterProductsByCategory } from '../data/productCategories'
import { getProducts } from '../services/supabase'

import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner3 from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

// Curated fallback products from Company Profile & assets
const FALLBACK_PRODUCTS = [
  {
    id: 'banh-trang-tron-haq',
    name: 'Bánh tráng trộn HAQ',
    slug: 'banh-trang-tron-haq',
    category: 'banh-trang',
    categoryName: 'BÁNH TRÁNG',
    description: 'Sản phẩm tiêu biểu từ năm 2021 với dây chuyền sấy giòn khép kín, kết hợp bò khô, tôm khô và gia vị đặc trưng.',
    images: [heroBanner1],
    tag: 'CHỦ LỰC 2021',
    pack: 'Gói 50g / 100g',
  },
  {
    id: 'banh-trang-say-gion-vi-tom',
    name: 'HOKI - Bánh tráng sấy giòn vị tôm',
    slug: 'Banh-trang-say-gion-vi-tom',
    category: 'banh-trang',
    categoryName: 'BÁNH TRÁNG',
    description: 'Bánh tráng giòn rụm đậm đà vị tôm biển tự nhiên, chuẩn vệ sinh an toàn thực phẩm.',
    images: [heroBanner1],
    tag: 'BÁN CHẠY',
    pack: 'Gói 45g',
  },
  {
    id: 'banh-trang-tron-ga-la-chanh',
    name: 'HOKI - Bánh tráng trộn gà lá chanh',
    slug: 'banh-trang-tron-ga-la-chanh',
    category: 'banh-trang',
    categoryName: 'BÁNH TRÁNG',
    description: 'Sợi bánh tráng dẻo thơm hòa quyện khô gà cay cay và hương lá chanh tươi mát.',
    images: [heroBanner1],
    tag: 'MỚI',
    pack: 'Hũ 150g',
  },
  {
    id: 'banh-hanh-nhan-cao-cap',
    name: 'Bánh hạnh nhân thượng hạng HAQ',
    slug: 'banh-hanh-nhan-cao-cap',
    category: 'banh',
    categoryName: 'BÁNH THƯỢNG HẠNG',
    description: 'Bánh nướng giòn tan bùi thơm hạt hạnh nhân tự nhiên, đáp ứng tiêu chuẩn xuất khẩu sang thị trường châu Á.',
    images: [heroBanner3],
    tag: 'XUẤT KHẨU',
    pack: 'Hộp 200g / 350g',
  },
  {
    id: 'banh-dau-xanh-truyen-thong',
    name: 'Bánh đậu xanh truyền thống HAQ',
    slug: 'banh-dau-xanh-truyen-thong',
    category: 'banh',
    categoryName: 'BÁNH THƯỢNG HẠNG',
    description: 'Đậu xanh tuyển chọn nguyên chất, độ ngọt thanh mát dịu, lưu giữ trọn vẹn hương vị truyền thống.',
    images: [heroBanner3],
    tag: 'TRUYỀN THỐNG',
    pack: 'Hộp 180g',
  },
  {
    id: 'bap-rang-bo-caramel',
    name: 'Bắp rang bơ Caramel nổ công nghệ cao',
    slug: 'bap-rang-bo-caramel',
    category: 'do-an-vat',
    categoryName: 'ĐỒ ĂN VẶT',
    description: 'Hạt bắp nổ tròn đều phủ đều sốt bơ đường caramel béo ngậy, giữ độ giòn lâu.',
    images: [heroBanner2],
    tag: 'HOT',
    pack: 'Hũ 80g / 120g',
  },
  {
    id: 'bap-rang-bo-pho-mai',
    name: 'Bắp rang bơ phô mai cao cấp',
    slug: 'bap-rang-bo-pho-mai',
    category: 'do-an-vat',
    categoryName: 'ĐỒ ĂN VẶT',
    description: 'Vị mặn bùi đậm đà của phô mai hòa cùng bắp nổ giòn rụm thích hợp cho mọi lứa tuổi.',
    images: [heroBanner2],
    tag: 'BÁN CHẠY',
    pack: 'Hũ 80g',
  },
  {
    id: 'thit-bo-kho-hao-hang',
    name: 'Thịt bò khô hảo hạng HAQ',
    slug: 'thit-bo-kho-hao-hang',
    category: 'do-an-kho',
    categoryName: 'ĐỒ ĂN KHÔ',
    description: 'Thịt bò tươi tẩm ướp gia vị sả ớt tự nhiên, sấy dẻo đậm đà, kiểm soát chất lượng từ khâu nguyên liệu.',
    images: [heroBanner1],
    tag: 'THƯỢNG HẠNG',
    pack: 'Gói 100g / 250g',
  },
  {
    id: 'thit-heo-kho-chay-toi',
    name: 'Thịt heo khô cháy tỏi',
    slug: 'thit-heo-kho-chay-toi',
    category: 'do-an-kho',
    categoryName: 'ĐỒ ĂN KHÔ',
    description: 'Thịt heo sạch kết hợp tỏi phi thơm giòn rụm và sốt gia vị cay ngọt hài hòa.',
    images: [heroBanner1],
    tag: 'YÊU THÍCH',
    pack: 'Gói 100g',
  },
]

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentCategorySlug = searchParams.get('category') || 'all'

  const [dbProducts, setDbProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch products from database
  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchDbProducts = async () => {
      try {
        setIsLoading(true)
        const data = await getProducts()
        if (data && data.length > 0) {
          setDbProducts(data)
        } else {
          setDbProducts(FALLBACK_PRODUCTS)
        }
      } catch (err) {
        console.warn('Lỗi lấy sản phẩm từ database, sử dụng fallback data:', err)
        setDbProducts(FALLBACK_PRODUCTS)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDbProducts()
  }, [])

  // Handle category tab change
  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: slug })
    }
  }

  const activeCategory = getCategoryBySlug(currentCategorySlug)

  // Filter products based on active category
  const allProductsList = dbProducts.length > 0 ? dbProducts : FALLBACK_PRODUCTS
  const filteredProducts = filterProductsByCategory(allProductsList, currentCategorySlug)

  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* 1. Breadcrumb Bar */}
        <div className="bg-white/60 border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs text-haq-ink/60">
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
              onClick={() => handleCategoryChange('all')}
              className={`hover:text-haq-red transition-colors ${
                currentCategorySlug === 'all' ? 'text-haq-red font-bold' : ''
              }`}
            >
              Sản phẩm
            </Link>
            {currentCategorySlug !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-black/30" />
                <span className="text-haq-red font-bold truncate">
                  {activeCategory.name}
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
                    HAQ FOOD · DANH MỤC SẢN PHẨM
                  </span>
                  <span className="h-px w-10 bg-haq-red" />
                </div>
                <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                  {activeCategory.slug === 'all' ? 'TẤT CẢ SẢN PHẨM' : activeCategory.name}
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-haq-ink/75 max-w-xl leading-relaxed">
                  {activeCategory.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-haq-ink/60 bg-haq-bone px-4 py-2.5 rounded-2xl border border-black/5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-haq-red" />
                <span>TIÊU CHUẨN ISO 22000 & HACCP</span>
              </div>
            </div>

            {/* 3. Horizontal Category Navigation Tabs (Single Source of Truth) */}
            <div className="mt-8 pt-6 border-t border-black/5">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-mono font-bold text-haq-ink/40 uppercase mr-2 flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                  <span>DANH MỤC:</span>
                </span>

                {PRODUCT_CATEGORIES.map((cat) => {
                  const isActive = currentCategorySlug === cat.slug
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`relative px-4 py-2 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-haq-red text-white shadow-sm'
                          : 'bg-haq-bone text-haq-ink/80 hover:bg-black/5 hover:text-haq-red'
                      }`}
                    >
                      <span>{cat.shortName || cat.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Products Grid */}
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
          <div className="flex items-center justify-between mb-8 text-xs font-mono text-haq-ink/60">
            <span>
              HIỂN THỊ <strong>{filteredProducts.length}</strong> SẢN PHẨM
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
                onClick={() => handleCategoryChange('all')}
                className="mt-6 px-6 py-2.5 bg-haq-red text-white text-xs font-heading font-bold uppercase rounded-full"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((prod) => {
                const productImg = prod.images?.[0] || prod.image || heroBanner1
                const detailSlug = prod.slug || prod.id

                return (
                  <div
                    key={prod.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative aspect-4/3 overflow-hidden bg-haq-bone p-4">
                        <img
                          src={productImg}
                          alt={prod.name}
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {prod.tag && (
                          <div className="absolute top-4 left-4 bg-haq-red text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-2xs">
                            {prod.tag}
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs font-mono text-[10px] font-bold text-haq-ink/70 px-2.5 py-1 rounded-full border border-black/5">
                          ISO 22000
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-6">
                        <div className="text-[10px] font-mono font-bold text-haq-red uppercase tracking-widest mb-1.5">
                          {prod.categories?.name || prod.categoryName || 'HAQ FOOD'}
                        </div>

                        <h3 className="font-heading font-black text-lg text-haq-ink group-hover:text-haq-red transition-colors uppercase leading-snug">
                          <Link to={`/san-pham/${detailSlug}`}>
                            {prod.name}
                          </Link>
                        </h3>

                        <p className="mt-2.5 text-xs text-haq-ink/70 leading-relaxed line-clamp-2">
                          {prod.description || 'Sản phẩm đóng gói an toàn, đạt chuẩn kiểm định an toàn vệ sinh thực phẩm.'}
                        </p>

                        {prod.pack && (
                          <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-1.5 text-xs text-haq-ink/60 font-mono">
                            <Package className="w-3.5 h-3.5 text-haq-ink/40" />
                            <span>Quy cách: {prod.pack}</span>
                          </div>
                        )}
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
