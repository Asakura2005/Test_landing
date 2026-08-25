import React, { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { getProducts, getCategories } from '../services/supabase'
import { Link } from 'react-router-dom'
import ProductDetailModal from './ProductDetailModal'

export default function Products() {
  const ref = useReveal()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  
  const [activeTopCatId, setActiveTopCatId] = useState(null)
  const [activeSubCatId, setActiveSubCatId] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ])
        
        if (categoriesData) {
          const activeCats = categoriesData.filter(c => c.is_active)
          setCategories(activeCats)
          
          // Set initial active top category
          const topCats = activeCats.filter(c => !c.parent_id).sort((a,b) => a.sort_order - b.sort_order)
          if (topCats.length > 0) {
            setActiveTopCatId(topCats[0].id)
          }
        }

        if (productsData && productsData.length > 0) {
          setProducts(productsData)
        }
      } catch (err) {
        console.error("Lỗi fetch products/categories:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAll()
  }, [])

  // Derived state
  const topCategories = categories.filter(c => !c.parent_id).sort((a,b) => a.sort_order - b.sort_order)
  const activeTopCat = topCategories.find(c => c.id === activeTopCatId) || topCategories[0]
  const subCategories = categories.filter(c => c.parent_id === activeTopCat?.id).sort((a,b) => a.sort_order - b.sort_order)

  const filteredProducts = products.filter(p => {
    if (!activeTopCat) return false;
    if (activeSubCatId) {
      return p.category_id === activeSubCatId;
    }
    // "Tất cả": show all products that belong to any subcategory of the active top category
    return subCategories.some(sub => sub.id === p.category_id)
  })

  return (
    <section className="relative bg-haq-bone py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-site px-6 md:px-12">
        <div ref={ref} className="reveal">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-haq-red" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-haq-red">Sản phẩm HAQ</span>
            </div>
            <h2 className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-haq-ink md:text-6xl">Hương vị Việt,<br />được làm cho hôm nay.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-haq-ink/65">Những lựa chọn tiện lợi, an toàn và phù hợp cho từng khoảnh khắc thưởng thức.</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center h-64 items-center animate-pulse text-haq-ink/50">Đang tải sản phẩm...</div>
          ) : (
            <>
              {/* Top Category Tabs */}
              <div className="mb-14 flex flex-wrap justify-center gap-x-7 gap-y-3 border-y border-black/10 py-5">
                {topCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveTopCatId(cat.id)
                      setActiveSubCatId(null)
                    }}
                    className={`border-b-2 pb-1 font-heading text-sm font-bold uppercase tracking-[0.08em] transition-colors md:text-[15px] ${
                      activeTopCatId === cat.id
                        ? 'border-haq-red text-haq-red'
                        : 'border-transparent text-haq-ink/50 hover:border-haq-gold hover:text-haq-ink'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Wooden Story Banner */}
              {activeTopCat && (
                <div className="mx-auto mb-10 grid max-w-5xl gap-8 border-b border-black/10 pb-10 md:grid-cols-[0.7fr_1.3fr] md:items-start">
                  <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-haq-red">Bộ sưu tập<br />được chọn lọc</div>
                  <div>
                    <h2 className="font-heading text-3xl font-extrabold leading-[1.08] text-haq-ink md:text-5xl">
                      {activeTopCat.name}
                    </h2>
                    <div className="mt-5 max-w-3xl text-base leading-relaxed text-haq-ink/65 md:text-lg">
                      {activeTopCat.description ? (
                        activeTopCat.description.split('\n').map((para, i) => (
                          <p key={i} className="mb-4 last:mb-0">{para}</p>
                        ))
                      ) : (
                        <p>Sản phẩm được phát triển từ nguyên liệu chọn lọc, phù hợp với nhu cầu thưởng thức hiện đại.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Sub Categories Tabs */}
              {subCategories.length > 0 && (
                <div className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
                  <button
                    onClick={() => setActiveSubCatId(null)}
                    className={`text-sm font-bold transition-colors md:text-[15px] ${
                      activeSubCatId === null
                        ? 'text-haq-red'
                        : 'text-haq-ink/50 hover:text-haq-red'
                    }`}
                  >
                    Tất cả
                  </button>
                  {subCategories.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubCatId(sub.id)}
                      className={`text-sm font-bold transition-colors md:text-[15px] ${
                        activeSubCatId === sub.id
                          ? 'text-haq-red'
                          : 'text-haq-ink/50 hover:text-haq-red'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-7 md:gap-y-12 lg:grid-cols-4">
                  {filteredProducts.map(p => (
                    <Link 
                      to={`/san-pham/${p.slug || p.id}`}
                      key={p.id} 
                      className="group relative flex h-full cursor-pointer flex-col overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"
                    >
                      
                      {/* Weight Tag */}
                      {p.variants?.[0]?.size && (
                        <div className="absolute left-3 top-3 z-10 bg-haq-red px-2 py-1 text-xs font-bold text-white">
                          {p.variants[0].size}
                        </div>
                      )}
                      
                      {/* Image */}
                      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-[#f7f5ef] p-4 md:h-60">
                        {(p.images?.[0] || p.variants?.[0]?.img) ? (
                          <img 
                            src={p.images?.[0] || p.variants?.[0]?.img} 
                            alt={p.name} 
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="text-haq-ink/20 text-xs text-center border-2 border-dashed border-haq-ink/10 p-4 rounded w-full h-full flex items-center justify-center">
                            Chưa có ảnh
                          </div>
                        )}
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                      
                      {/* Info */}
                      <div className="flex flex-1 flex-col border-t border-black/5 bg-white p-4 text-left md:p-5">
                        <h3 className="mb-3 font-heading text-base font-bold leading-tight text-haq-ink transition-colors group-hover:text-haq-red md:text-lg">
                          {p.name}
                        </h3>
                        
                        <div className="mt-auto pt-3">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-haq-red md:text-sm">
                            Xem chi tiết <span>→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-haq-ink/50 text-lg">
                  Chưa có sản phẩm nào trong danh mục này.
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </section>
  )
}
