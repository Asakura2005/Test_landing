import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Sparkles, Package } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { getProducts, getCategories } from '../services/supabase'
import ProductDetailModal from './ProductDetailModal'
import bannerRicePaper from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import bannerMungBean from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

// Key products defined in Company Profile
const KEY_PRODUCTS_PROFILE = [
  {
    key: 'banh-trang-tron',
    name: 'BÁNH TRÁNG TRỘN HAQ',
    sub: 'HAQ MIXED RICE PAPER',
    desc: 'Sản phẩm chủ lực gắn liền với sự hình thành công ty từ năm 2021, đa dạng vị Bò Sa Tế, Tôm Cay và Chà Bông.',
    image: bannerRicePaper,
    isHero: true,
  },
  {
    key: 'banh-hanh-nhan',
    name: 'BÁNH HẠNH NHÂN',
    sub: 'ALMOND COOKIES',
    desc: 'Bánh nướng thơm bùi vị hạnh nhân tự nhiên, giòn tan thanh ngọt.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop',
  },
  {
    key: 'banh-dau-xanh',
    name: 'BÁNH ĐẬU XANH',
    sub: 'MUNG BEAN CAKE',
    desc: 'Bánh đậu xanh tươi truyền thống, mix vị độc đáo và lá dứa thanh mát.',
    image: bannerMungBean,
  },
  {
    key: 'bap-rang-bo',
    name: 'BẮP RANG BƠ',
    sub: 'POPCORN',
    desc: 'Bắp rang bơ giòn rụm đậm vị phô mai và caramel.',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=800&auto=format&fit=crop',
  },
  {
    key: 'thit-kho',
    name: 'THỊT KHÔ',
    sub: 'BEEF JERKY',
    desc: 'Thịt bò và thịt heo sấy khô đậm đà gia vị truyền thống hảo hạng.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  },
]

export default function Products() {
  const ref = useReveal()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
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
          setCategories(categoriesData.filter((c) => c.is_active))
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

  // Find corresponding DB product for modal
  const openModalForProfileItem = (item) => {
    const matched = products.find((p) =>
      p.name?.toLowerCase().includes(item.name.toLowerCase().replace('haq', '').trim())
    )
    if (matched) {
      setSelectedProduct(matched)
    } else {
      // Mock object for detail modal
      setSelectedProduct({
        id: item.key,
        name: item.name,
        image_url: item.image,
        description: item.desc,
        short_description: item.sub,
        categories: { name: 'KEY PRODUCTS' },
      })
    }
  }

  const heroItem = KEY_PRODUCTS_PROFILE[0]
  const subItems = KEY_PRODUCTS_PROFILE.slice(1)

  return (
    <section id="san-pham" className="py-20 md:py-32 bg-haq-bone relative">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal">
          {/* Editorial Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  02 / PRODUCTS
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase">
                NHỮNG SẢN PHẨM <br />
                <span className="text-haq-red">TẠO NÊN HAQ FOOD</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              Danh mục các dòng sản phẩm đồ ăn vặt chủ lực được phát triển và kiểm soát chất lượng chuẩn ISO & HACCP bởi HAQ FOOD.
            </p>
          </div>

          {/* Editorial Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Col: Hero Product (Spans 6 cols) */}
            <div
              onClick={() => openModalForProfileItem(heroItem)}
              className="lg:col-span-6 group bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-haq-red bg-haq-red/10 px-3 py-1 rounded-full">
                    SIGNATURE PRODUCT
                  </span>
                  <span className="text-xs font-mono font-semibold text-haq-ink/50">
                    EST. 2021
                  </span>
                </div>

                <div className="relative aspect-4/3 my-6 bg-haq-bone rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-black/5">
                  <img
                    src={heroItem.image}
                    alt={heroItem.name}
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

                <div className="text-xs font-mono font-bold text-haq-ink/50 tracking-wider uppercase mb-1">
                  {heroItem.sub}
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink group-hover:text-haq-red transition-colors leading-tight">
                  {heroItem.name}
                </h3>
                <p className="mt-3 text-sm text-haq-ink/75 leading-relaxed">
                  {heroItem.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-heading font-extrabold text-haq-red uppercase tracking-wider">
                <span>Khám phá sản phẩm</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Right Col: Staggered 2x2 Grid (Spans 6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {subItems.map((item) => (
                <div
                  key={item.key}
                  onClick={() => openModalForProfileItem(item)}
                  className="group bg-white rounded-2xl p-5 border border-black/5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-square mb-4 bg-haq-bone rounded-xl overflow-hidden flex items-center justify-center p-3 border border-black/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-sm border border-black/5">
                          KEY PRODUCT
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono font-bold text-haq-ink/50 uppercase tracking-wider mb-0.5">
                      {item.sub}
                    </div>
                    <h4 className="font-heading font-extrabold text-base text-haq-ink group-hover:text-haq-red transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="mt-1.5 text-xs text-haq-ink/70 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-heading font-bold text-haq-ink/70 group-hover:text-haq-red">
                    <span className="text-[11px] uppercase tracking-wider">Chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/san-pham"
              className="group inline-flex items-center gap-3 bg-haq-ink hover:bg-haq-red text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>XEM TOÀN BỘ DANH MỤC SẢN PHẨM</span>
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
