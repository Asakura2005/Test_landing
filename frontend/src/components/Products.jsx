import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner3 from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

const SECONDARY_PRODUCTS = [
  {
    name: 'BÁNH HẠNH NHÂN',
    category: 'BÁNH THƯỢNG HẠNG',
    desc: 'Giòn xốp, thơm bùi hạnh nhân tự nhiên, đáp ứng tiêu chuẩn xuất khẩu sang thị trường châu Á.',
    image: heroBanner3,
    link: '/san-pham',
  },
  {
    name: 'BÁNH ĐẬU XANH',
    category: 'BÁNH THƯỢNG HẠNG',
    desc: 'Hương vị thanh ngọt truyền thống, nguyên liệu đậu xanh tuyển chọn chuẩn an toàn thực phẩm.',
    image: heroBanner3,
    link: '/san-pham',
  },
  {
    name: 'BẮP RANG BƠ',
    category: 'ĐỒ ĂN VẶT',
    desc: 'Bắp nổ công nghệ cao hạt tròn đều, phủ caramel & phô mai thơm ngon giòn rụm.',
    image: heroBanner2,
    link: '/san-pham',
  },
  {
    name: 'THỊT KHÔ HẢO HẠNG',
    category: 'ĐỒ ĂN KHÔ',
    desc: 'Thịt bò và thịt heo tẩm ướp gia vị đậm đà tự nhiên, kiểm soát chất lượng nghiêm ngặt.',
    image: heroBanner1,
    link: '/san-pham',
  },
]

export default function Products() {
  const ref = useReveal()

  return (
    <section id="san-pham" className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  01 / SẢN PHẨM
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
                Các sản phẩm thực phẩm và đồ ăn vặt chất lượng cao do HAQ FOOD nghiên cứu và phát triển.
              </p>
              <Link
                to="/san-pham"
                className="group inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red border-b-2 border-haq-red pb-0.5 hover:text-haq-ink hover:border-haq-ink transition-colors"
              >
                <span>XEM TẤT CẢ SẢN PHẨM</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Editorial Asymmetric Grid: 1 Big Hero Product (Left) + 4 Stacked Grid (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Primary Visual Hero: Bánh Tráng Trộn HAQ (Spans 6 cols) */}
            <div className="lg:col-span-6 group bg-haq-bone rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="relative aspect-4/3 sm:aspect-16/11 overflow-hidden bg-haq-ink">
                <img
                  src={heroBanner1}
                  alt="Bánh tráng trộn HAQ"
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-haq-ink font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black/5 shadow-2xs">
                  SẢN PHẨM CHỦ LỰC
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 group-hover:bg-haq-red text-haq-ink group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest block mb-2">
                    BÁNH TRÁNG
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink group-hover:text-haq-red transition-colors uppercase leading-tight">
                    BÁNH TRÁNG TRỘN HAQ
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
                    Sản phẩm tiên phong làm nên thương hiệu HAQ FOOD từ năm 2021. Được sản xuất trên dây chuyền sấy giòn khép kín, kết hợp bò khô, tôm khô và gia vị đặc trưng chuẩn vị Việt Nam.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-haq-ink/60">TIÊU CHUẨN ISO · HACCP</span>
                  <Link
                    to="/san-pham"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red group-hover:underline"
                  >
                    <span>CHI TIẾT SẢN PHẨM →</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Secondary Products: 4 Compact Cards (Spans 6 cols in 2x2 grid) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SECONDARY_PRODUCTS.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className="group bg-haq-bone rounded-3xl p-5 border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-16/10 rounded-2xl overflow-hidden bg-white mb-4 shadow-2xs relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 group-hover:bg-haq-red text-haq-ink group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
                      </div>
                    </div>

                    <span className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-heading font-extrabold text-base text-haq-ink group-hover:text-haq-red transition-colors uppercase leading-snug">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-xs text-haq-ink/70 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold text-haq-ink/50 group-hover:text-haq-red">
                    <span>XEM THÊM</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
