import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Package, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { getProducts, getCategories } from '../services/supabase'

import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner3 from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

const CATEGORY_TILES = [
  {
    id: 'banh-trang',
    label: 'BÁNH TRÁNG',
    title: 'Bánh Tráng Sấy & Trộn Sợi',
    desc: 'Đa dạng vị bò, tôm, phô mai và sốt me cay béo ngậy chuẩn vị Sài Gòn.',
    image: heroBanner1,
    accent: 'border-l-4 border-haq-red',
    tag: 'SIGNATURE 2021',
  },
  {
    id: 'banh-dau-xanh',
    label: 'BÁNH THƯỢNG HẠNG',
    title: 'Bánh Đậu Xanh & Hạnh Nhân',
    desc: 'Hương vị thanh ngọt truyền thống, chất lượng xuất khẩu sang Hàn Quốc & Đài Loan.',
    image: heroBanner3,
    accent: 'border-l-4 border-haq-gold',
    tag: 'EXPORT QUALITY',
  },
  {
    id: 'do-an-vat',
    label: 'ĐỒ ĂN VẶT',
    title: 'Bắp Rang Bơ & Snack Giòn',
    desc: 'Công nghệ sấy nổ hiện đại, phủ caramel bơ sữa thơm ngon cho mọi lứa tuổi.',
    image: heroBanner2,
    accent: 'border-l-4 border-[#D97706]',
    tag: 'TRENDING SNACK',
  },
  {
    id: 'thit-kho',
    label: 'THỊT KHÔ',
    title: 'Thịt Khô Hảo Hạng',
    desc: 'Thịt bò, heo tẩm ướp gia vị tự nhiên đậm đà, kiểm soát an toàn nghiêm ngặt.',
    image: heroBanner1,
    accent: 'border-l-4 border-haq-ink',
    tag: 'PREMIUM FOOD',
  },
]

export default function Products() {
  const ref = useReveal()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const productsData = await getProducts()
        if (productsData) setProducts(productsData)
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="san-pham" className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  01 / SẢN PHẨM (PRODUCT DISCOVERY)
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                KHÁM PHÁ <br />
                <span className="text-haq-red">DANH MỤC SẢN PHẨM</span>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <p className="text-sm sm:text-base text-haq-ink/75 max-w-md md:text-right leading-relaxed mb-4">
                Các dòng sản phẩm thực phẩm và đồ ăn vặt chất lượng cao do HAQ FOOD nghiên cứu và phát triển.
              </p>
              <Link
                to="/san-pham"
                className="group inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red border-b-2 border-haq-red pb-0.5 hover:text-haq-ink hover:border-haq-ink transition-colors"
              >
                <span>XEM TẤT CẢ SẢN PHẨM ({products.length || '20+'})</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Large Visual Category Tiles (Asymmetric Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORY_TILES.map((cat) => (
              <Link
                key={cat.id}
                to="/san-pham"
                className="group relative bg-haq-bone rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Image Container with 1.03x Zoom on Hover */}
                <div className="relative aspect-4/3 overflow-hidden bg-haq-ink">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-haq-ink font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-black/5 shadow-2xs">
                    {cat.tag}
                  </div>
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 group-hover:bg-haq-red text-haq-ink group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-haq-red uppercase tracking-widest block mb-1.5">
                      {cat.label}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-haq-ink group-hover:text-haq-red transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs text-haq-ink/70 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold text-haq-ink/60 group-hover:text-haq-red">
                    <span>KHÁM PHÁ NHÓM</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Filter Pill Navigation */}
          <div className="mt-12 p-4 rounded-2xl bg-haq-bone border border-black/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-haq-ink/60 uppercase">
              <Sparkles className="w-4 h-4 text-haq-red" />
              <span>TIÊU CHUẨN AN TOÀN VÀ ĐÓNG GÓI</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-xs font-mono font-semibold text-haq-ink/80 border border-black/5">
                ISO 22000
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-mono font-semibold text-haq-ink/80 border border-black/5">
                HACCP
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-mono font-semibold text-haq-ink/80 border border-black/5">
                BAO BÌ KÍN TIÊU CHUẨN
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-mono font-semibold text-haq-ink/80 border border-black/5">
                OEM / ODM SẴN SÀNG
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
