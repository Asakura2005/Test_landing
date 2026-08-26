import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare, Factory } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

export default function CtaBanner() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-32 bg-haq-red text-white relative overflow-hidden">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={ref} className="reveal max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Factory className="w-3.5 h-3.5 text-haq-gold" />
            <span>B2B & OEM / ODM PARTNERSHIP</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.08]">
            BẠN ĐANG TÌM KIẾM <br />
            MỘT ĐỐI TÁC THỰC PHẨM?
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
            HAQ FOOD cung cấp sản phẩm đồ ăn vặt chất lượng cao và giải pháp sản xuất OEM/ODM phù hợp với nhu cầu của đối tác trong nước và quốc tế.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/lien-he"
              className="group inline-flex items-center gap-2.5 bg-white hover:bg-haq-ink text-haq-red hover:text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>TRAO ĐỔI VỚI HAQ FOOD</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#nang-luc"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-bold uppercase tracking-widest text-white border border-white/30 hover:border-white px-7 py-4 rounded-full transition-colors"
            >
              <span>XEM NĂNG LỰC SẢN XUẤT</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
