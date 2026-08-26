import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PhoneCall } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="py-24 sm:py-28 bg-haq-sage/50 border-b border-haq-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 text-center max-w-3xl">
        <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#16A34A]">
          HAQ FOOD · ĐỒNG HÀNH & PHÁT TRIỂN
        </span>

        <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
          CÙNG KIẾN TẠO NHỮNG GIÁ TRỊ BỀN VỮNG
        </h2>

        <p className="mt-4 text-sm sm:text-base text-haq-text-secondary max-w-xl mx-auto leading-relaxed font-normal">
          Đồng hành cùng HAQ FOOD trong hành trình mang sản phẩm thực phẩm Việt Nam an toàn, chất lượng cao đến đông đảo người tiêu dùng trong nước và quốc tế.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/lien-he"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#13863d] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>LIÊN HỆ HỢP TÁC</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/san-pham"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-haq-sage text-haq-green-dark border border-haq-border text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-2xs"
          >
            <span>KHÁM PHÁ SẢN PHẨM</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
