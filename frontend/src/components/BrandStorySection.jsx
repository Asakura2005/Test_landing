import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import factoryImg from '../assets/hero-factory.jpg'

export default function BrandStorySection() {
  const ref = useReveal()

  return (
    <section id="gioi-thieu" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Label Header */}
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
              02 / ABOUT HAQ FOOD
            </span>
            <span className="h-px w-10 bg-haq-red" />
          </div>

          {/* Big Manifesto Headline */}
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-haq-ink tracking-tight uppercase max-w-4xl leading-[1.08]">
            CHÚNG TÔI TIN RẰNG <br className="hidden sm:inline" />
            <span className="text-haq-red">MỘT HƯƠNG VỊ TỐT</span> <br className="hidden sm:inline" />
            CÓ THỂ KẾT NỐI CON NGƯỜI.
          </h2>

          {/* Storytelling Content Grid */}
          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Authentic Factory Image Visual */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-xl bg-haq-ink group">
                <img
                  src={factoryImg}
                  alt="Dây chuyền sản xuất thực phẩm HAQ FOOD"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-haq-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
                  <span className="font-mono font-bold tracking-wider uppercase text-haq-gold">
                    HAQ PRODUCTION FACILITY · HANOI
                  </span>
                  <span className="text-white/70">ISO 22000 & HACCP</span>
                </div>
              </div>
            </div>

            {/* Right: Concise Editorial Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="text-base sm:text-lg text-haq-ink/80 leading-relaxed">
                Được thành lập từ năm 2021 tại Hà Nội, <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> theo đuổi sứ mệnh nâng tầm các món ăn vặt truyền thống Việt Nam thông qua quy trình chế biến hiện đại và kiểm soát chất lượng khép kín.
              </p>
              
              <p className="mt-4 text-sm sm:text-base text-haq-ink/65 leading-relaxed">
                Từ khâu chọn lọc nguyên liệu tự nhiên đến đóng gói đạt chuẩn ISO & HACCP, mỗi sản phẩm trao tay người tiêu dùng đều là kết tinh của sự tận tâm, đồng đều và an toàn trọn vẹn.
              </p>

              <div className="mt-8 pt-6 border-t border-black/10">
                <Link
                  to="/gioi-thieu"
                  className="group inline-flex items-center gap-2.5 font-heading font-extrabold text-xs sm:text-sm uppercase tracking-widest text-haq-red border-b-2 border-haq-red pb-1 hover:text-haq-ink hover:border-haq-ink transition-colors"
                >
                  <span>CÂU CHUYỆN CỦA CHÚNG TÔI</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
