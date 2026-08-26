import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

export default function CtaBanner() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-28 bg-haq-red text-white relative overflow-hidden">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={ref} className="reveal max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-haq-gold" />
            <span>KẾT NỐI DOANH NGHIỆP</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.08]">
            SẴN SÀNG ĐỒNG HÀNH <br />
            CÙNG HAQ FOOD?
          </h2>

          <p className="mt-6 text-sm sm:text-base text-white/85 max-w-xl leading-relaxed">
            HAQ FOOD cung cấp sản phẩm chất lượng và giải pháp sản xuất theo yêu cầu (OEM/ODM) phù hợp với các đối tác phân phối và bán lẻ trên toàn quốc.
          </p>

          <div className="mt-10">
            <Link
              to="/lien-he"
              className="group inline-flex items-center gap-2.5 bg-white hover:bg-haq-ink text-haq-red hover:text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>LIÊN HỆ</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
