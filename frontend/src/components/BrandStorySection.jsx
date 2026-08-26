import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Award } from 'lucide-react'
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
              01 / ABOUT HAQ FOOD
            </span>
            <span className="h-px w-10 bg-haq-red" />
          </div>

          {/* Big Manifesto Heading */}
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-haq-ink tracking-tight uppercase max-w-4xl leading-[1.08]">
            MỘT DOANH NGHIỆP THỰC PHẨM <br className="hidden sm:inline" />
            <span className="text-haq-red">MANG HƯƠNG VỊ VIỆT ĐẾN</span> <br className="hidden sm:inline" />
            THỊ TRƯỜNG TRONG VÀ NGOÀI NƯỚC.
          </h2>

          {/* Storytelling Grid */}
          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Authentic Factory Image */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-xl bg-haq-ink group">
                <img
                  src={factoryImg}
                  alt="Nhà máy sản xuất HAQ FOOD tại Hà Nội"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-haq-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between text-xs">
                  <span className="font-mono font-bold tracking-wider uppercase text-haq-gold">
                    HAQ PRODUCTION FACILITY · HANOI
                  </span>
                  <span className="text-white/80 font-mono">ISO 22000 & HACCP</span>
                </div>
              </div>
            </div>

            {/* Right: Verified Narrative from Company Profile */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="text-base sm:text-lg text-haq-ink/85 leading-relaxed">
                <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> được thành lập năm 2021, hoạt động trong lĩnh vực sản xuất – phân phối thực phẩm, đồ ăn vặt đóng gói và cung ứng thực phẩm cho thị trường nội địa và xuất khẩu.
              </p>
              
              <p className="mt-4 text-sm sm:text-base text-haq-ink/70 leading-relaxed">
                HAQ FOOD là doanh nghiệp tập trung vào các sản phẩm đồ ăn vặt chuẩn vị Việt, chú trọng an toàn, minh bạch nguồn gốc và chất lượng đồng đều trong từng lô sản phẩm.
              </p>

              <div className="mt-8 pt-6 border-t border-black/10">
                <Link
                  to="/gioi-thieu"
                  className="group inline-flex items-center gap-2.5 font-heading font-extrabold text-xs sm:text-sm uppercase tracking-widest text-haq-red border-b-2 border-haq-red pb-1 hover:text-haq-ink hover:border-haq-ink transition-colors"
                >
                  <span>TÌM HIỂU VỀ HAQ FOOD</span>
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
