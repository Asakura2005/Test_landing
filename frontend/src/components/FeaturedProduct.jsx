import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Check, Award } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { getProducts } from '../services/supabase'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

export default function FeaturedProduct() {
  const ref = useReveal()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const list = await getProducts()
        if (list && list.length > 0) {
          const featured = list.find((p) => p.is_pinned) || list[0]
          setProduct(featured)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetch()
  }, [])

  const displayImg =
    product?.variants?.[0]?.img || product?.image_url || heroBanner2
  const title = product?.name || 'HOKI – BÁNH TRÁNG SẤY GIÒN & TRỘN SỢI'

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-haq-red" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
              FEATURED PRODUCT SPOTLIGHT
            </span>
            <span className="h-px w-8 bg-haq-red" />
          </div>

          {/* Product Big Headline */}
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-haq-ink tracking-tight uppercase max-w-3xl leading-tight">
            {title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-haq-ink/70 max-w-2xl leading-relaxed">
            Dòng sản phẩm chủ lực mang đậm hương vị ẩm thực đường phố Việt Nam, được chế biến với tiêu chuẩn vệ sinh an toàn khắt khe và công nghệ sấy giòn đột phá.
          </p>

          {/* Large Hero Poster Visual */}
          <div className="relative my-10 w-full max-w-4xl bg-haq-bone rounded-3xl p-6 sm:p-12 border border-black/5 shadow-lg overflow-hidden group">
            <div className="relative aspect-16/9 sm:aspect-21/9 flex items-center justify-center">
              <img
                src={displayImg}
                alt={title}
                className="max-h-full max-w-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Poster Corner Badges */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-black/5 text-xs font-mono font-bold text-haq-ink shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-haq-gold" />
              <span>CÔNG THỨC ĐỘC QUYỀN HAQ FOOD</span>
            </div>

            <div className="hidden sm:flex absolute bottom-6 right-6 items-center gap-2 bg-haq-red text-white px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase shadow-sm">
              <Award className="w-3.5 h-3.5 text-haq-gold" />
              <span>TIÊU CHUẨN ISO · HACCP</span>
            </div>
          </div>

          {/* Key Product Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl text-left my-4">
            {[
              { title: 'Nguyên Liệu Tuyển Chọn', desc: '100% tôm, ớt hiểm và bò khô tự nhiên chất lượng' },
              { title: 'Giòn Rụm Đậm Vị', desc: 'Công nghệ sấy ráo dầu, giữ trọn độ giòn lâu dài' },
              { title: 'Đóng Gói Tiện Lợi', desc: 'Bao bì zip và hũ nhựa kín khí, bảo quản hoàn hảo' },
            ].map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-haq-bone border border-black/5">
                <div className="flex items-center gap-2 font-heading font-extrabold text-sm text-haq-ink">
                  <Check className="w-4 h-4 text-haq-red shrink-0" />
                  <span>{feat.title}</span>
                </div>
                <p className="text-xs text-haq-ink/65 mt-1">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Minimalist CTA */}
          <div className="mt-8">
            <Link
              to="/san-pham"
              className="group inline-flex items-center gap-3 text-sm font-heading font-extrabold uppercase tracking-widest text-haq-red border-b-2 border-haq-red pb-1.5 hover:text-haq-ink hover:border-haq-ink transition-colors"
            >
              <span>KHÁM PHÁ CHI TIẾT SẢN PHẨM</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
