import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { getCategories, getProducts } from '../services/supabase'
import { DEFAULT_DB_CATEGORIES } from '../data/productCategories'

// Default fallback images for categories / products
import banhTrangSayImg from '../assets/products/banh_trang_say_tom_50g.jpg'
import banhTrangTronImg from '../assets/products/banh_trang_soi_sa_te_tom_100g.jpg'
import banhDauXanhImg from '../assets/products/banh_dau_xanh_tuoi_250g.jpg'
import banhHanhNhanImg from '../assets/products/banh_hanh_nhan_truyen_thong_130g.jpg'
import banhSuaDuaImg from '../assets/products/banh_sua_dua_130g.jpg'
import catDoAnVatImg from '../assets/categories/category_do_an_vat.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

// Category image map lookup by slug or keywords
const CATEGORY_IMAGE_LOOKUP = {
  'banh-trang': banhTrangSayImg,
  'banh-trang-say': banhTrangSayImg,
  'banh-trang-tron': banhTrangTronImg,
  'banh-hanh-nhan': banhHanhNhanImg,
  'banh-dau-xanh': banhDauXanhImg,
  'banh-khac': banhDauXanhImg,
  'banh-sua': banhSuaDuaImg,
  'banh-deo': banhHanhNhanImg,
  'bap-rang-bo': catDoAnVatImg,
  'thot-kho': catDoAnKhoImg,
  'thit-kho': catDoAnKhoImg,
}

export default function Products() {
  const [categories, setCategories] = useState(DEFAULT_DB_CATEGORIES)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const [cats, prods] = await Promise.all([
          getCategories().catch(() => null),
          getProducts().catch(() => null),
        ])

        if (isMounted) {
          if (cats && cats.length > 0) {
            setCategories(cats)
          }
          if (prods && prods.length > 0) {
            setProducts(prods)
          }
        }
      } catch (err) {
        console.warn('Lỗi khi tải danh mục từ database:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  // Chuẩn bị danh sách danh mục hiển thị dạng tròn:
  // Nếu danh mục có con (như Bánh tráng -> Bánh tráng sấy, Bánh tráng trộn), ta hiển thị các danh mục con hoặc danh mục cha độc lập
  const displayCategories = React.useMemo(() => {
    // Tách cha và con
    const childCategories = categories.filter((c) => c.parent_id !== null && c.slug !== 'all')
    const parentCategoriesWithoutChildren = categories.filter(
      (c) =>
        c.parent_id === null &&
        c.slug !== 'all' &&
        !categories.some((child) => child.parent_id === c.id)
    )

    // Kết hợp các danh mục cụ thể (bao gồm danh mục con như Bánh tráng sấy, Bánh tráng trộn và các danh mục cha không chia nhỏ)
    let combined = [...childCategories, ...parentCategoriesWithoutChildren]

    // Nếu không có danh mục con thì lấy tất cả danh mục cha
    if (combined.length === 0) {
      combined = categories.filter((c) => c.slug !== 'all')
    }

    // Sắp xếp theo sort_order nếu có
    combined.sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99))

    return combined.map((cat) => {
      // Tìm ảnh sản phẩm đại diện từ DB products thuộc category này nếu có
      let representativeImage = null
      if (products && products.length > 0) {
        const matchedProduct = products.find(
          (p) =>
            p.category_id === cat.id ||
            p.categories?.slug === cat.slug ||
            p.category_slug === cat.slug
        )
        if (matchedProduct?.image_url) {
          representativeImage = matchedProduct.image_url
        }
      }

      // Fallback sang mapping local nếu chưa có ảnh từ DB
      if (!representativeImage) {
        representativeImage =
          CATEGORY_IMAGE_LOOKUP[cat.slug] ||
          CATEGORY_IMAGE_LOOKUP[cat.slug?.replace(/-/g, '_')] ||
          banhTrangSayImg
      }

      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: representativeImage,
        link: `/san-pham?category=${cat.slug}`,
      }
    })
  }, [categories, products])

  return (
    <section id="san-pham" className="py-20 sm:py-28 bg-white border-b border-black/5">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header kiểu Orion */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase">
            SẢN PHẨM
          </h2>
          <p className="mt-3 text-sm sm:text-base text-haq-ink/70 italic font-serif">
            HAQ FOOD luôn đặt chất lượng và an toàn hàng đầu cho từng sản phẩm
          </p>
        </div>

        {/* Circular Product Category Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-haq-ink/50">
            <Loader2 className="w-8 h-8 animate-spin text-haq-red" />
            <span className="font-mono text-xs uppercase tracking-widest">Đang tải danh mục sản phẩm...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 sm:gap-12 lg:gap-14 justify-items-center">
            {displayCategories.map((item) => (
              <Link
                key={item.id || item.slug}
                to={item.link}
                className="group flex flex-col items-center text-center w-full max-w-[160px] xs:max-w-[200px] sm:max-w-[240px]"
              >
                {/* Outer Circle Container */}
                <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full bg-linear-to-b from-[#f8f9fa] to-[#efefef] border border-black/5 shadow-2xs group-hover:shadow-xl group-hover:border-haq-red/20 group-hover:bg-white transition-all duration-400 flex items-center justify-center p-3 xs:p-4 relative overflow-hidden">
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-full bg-radial from-transparent to-black/5 opacity-50 pointer-events-none" />

                  {/* Product Pack Floating in Circle */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain filter drop-shadow-md transform transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Category Name Below Circle */}
                <h3 className="mt-3 xs:mt-5 font-heading font-black text-xs xs:text-sm sm:text-base text-haq-ink uppercase tracking-tight group-hover:text-haq-red transition-colors duration-200 line-clamp-2">
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>

        )}

        {/* Bottom CTA to Full Catalog */}
        <div className="mt-16 sm:mt-20 text-center">
          <Link
            to="/san-pham"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-haq-ink text-white hover:bg-haq-red text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <span>XEM TẤT CẢ SẢN PHẨM</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
