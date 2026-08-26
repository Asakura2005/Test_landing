import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Sparkles, Package } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { getProducts, getCategories } from '../services/supabase'
import ProductDetailModal from './ProductDetailModal'

export default function Products() {
  const ref = useReveal()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('ALL')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ])

        if (categoriesData) {
          const activeCats = categoriesData.filter((c) => c.is_active)
          setCategories(activeCats)
        }

        if (productsData && productsData.length > 0) {
          setProducts(productsData)
        }
      } catch (err) {
        console.error('Lỗi tải sản phẩm:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const topCategories = categories.filter((c) => !c.parent_id).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  const filteredProducts = products.filter((p) => {
    if (activeCategoryId === 'ALL') return true
    const childCatIds = categories
      .filter((c) => c.parent_id === activeCategoryId)
      .map((c) => c.id)
    return p.category_id === activeCategoryId || childCatIds.includes(p.category_id)
  })

  // Partition for Asymmetric Magazine Layout
  const featuredItem = filteredProducts[0]
  const secondaryItems = filteredProducts.slice(1, 5)

  return (
    <section id="san-pham" className="py-20 md:py-32 bg-haq-bone relative">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal">
          {/* Editorial Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  01 / PRODUCTS
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight">
                KHÁM PHÁ HƯƠNG VỊ
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/70 max-w-md leading-relaxed">
              Tuyển tập những món ăn vặt đặc trưng mang đậm hương vị Việt, kết hợp giữa bí quyết chế biến truyền thống và chuẩn mực an toàn hiện đại.
            </p>
          </div>

          {/* Category Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-black/10">
            <button
              onClick={() => setActiveCategoryId('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                activeCategoryId === 'ALL'
                  ? 'bg-haq-ink text-white'
                  : 'bg-white text-haq-ink/70 hover:text-haq-ink border border-black/5'
              }`}
            >
              TẤT CẢ SẢN PHẨM ({products.length})
            </button>
            {topCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  activeCategoryId === cat.id
                    ? 'bg-haq-ink text-white'
                    : 'bg-white text-haq-ink/70 hover:text-haq-ink border border-black/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Editorial Asymmetric Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 bg-white rounded-2xl h-[480px] animate-pulse border border-black/5" />
              <div className="lg:col-span-6 grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl h-[230px] animate-pulse border border-black/5" />
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-black/5 max-w-md mx-auto">
              <Package className="w-12 h-12 text-haq-ink/30 mx-auto mb-3" />
              <p className="text-haq-ink/70 font-medium">Danh mục đang được cập nhật sản phẩm mới.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left Featured Block (Spans 6 cols, full height magazine poster) */}
              {featuredItem && (
                <div
                  onClick={() => setSelectedProduct(featuredItem)}
                  className="lg:col-span-6 group bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-haq-red bg-haq-red/10 px-3 py-1 rounded-full">
                        {featuredItem.categories?.name || 'SẢN PHẨM TIÊU BIỂU'}
                      </span>
                      <span className="text-xs font-mono font-semibold text-haq-ink/50">
                        FEATURED
                      </span>
                    </div>

                    <div className="relative aspect-4/3 my-6 bg-haq-cream/30 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-black/5">
                      <img
                        src={featuredItem.variants?.[0]?.img || featuredItem.image_url}
                        alt={featuredItem.name}
                        className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-haq-ink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-haq-ink text-xs font-heading font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-haq-red" />
                          <span>Xem chi tiết</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink group-hover:text-haq-red transition-colors leading-tight">
                      {featuredItem.name}
                    </h3>
                    <p className="mt-3 text-sm text-haq-ink/75 line-clamp-3 leading-relaxed">
                      {featuredItem.short_description || featuredItem.description || 'Sản phẩm được phát triển từ nguyên liệu tự nhiên chọn lọc, quy trình đóng gói khép kín giữ trọn vị ngon đậm đà.'}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-heading font-extrabold text-haq-red uppercase tracking-wider">
                    <span>Khám phá chi tiết sản phẩm</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              )}

              {/* Right Stacked Grid (Spans 6 cols, 2x2 grid) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {secondaryItems.map((product) => {
                  const imageUrl = product.variants?.[0]?.img || product.image_url
                  return (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="group bg-white rounded-2xl p-5 border border-black/5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="relative aspect-square mb-4 bg-haq-cream/30 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-black/5">
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-sm border border-black/5">
                              {product.categories?.name || 'HAQ FOOD'}
                            </span>
                          </div>
                        </div>

                        <h4 className="font-heading font-extrabold text-base text-haq-ink group-hover:text-haq-red transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="mt-1.5 text-xs text-haq-ink/65 line-clamp-2 leading-relaxed">
                          {product.short_description || product.description || 'Hương vị thơm ngon, an toàn vệ sinh thực phẩm.'}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-heading font-bold text-haq-ink/70 group-hover:text-haq-red">
                        <span className="text-[11px] uppercase tracking-wider">Chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/san-pham"
              className="group inline-flex items-center gap-3 bg-haq-ink hover:bg-haq-red text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span>XEM TOÀN BỘ DANH MỤC ({products.length} SẢN PHẨM)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Integration */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  )
}
