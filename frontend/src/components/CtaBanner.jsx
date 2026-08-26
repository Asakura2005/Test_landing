import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PhoneCall } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="py-24 sm:py-28 bg-haq-cream border-b border-haq-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 text-center max-w-3xl">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-haq-red">
          HAQ FOOD · PARTNERSHIP
        </span>

        <h2 className="mt-3 font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
          CÙNG TẠO NÊN NHỮNG GIÁ TRỊ TỐT ĐẸP
        </h2>

        <p className="mt-4 text-sm sm:text-base text-haq-text-secondary max-w-xl mx-auto leading-relaxed">
          Đồng hành cùng HAQ FOOD trong hành trình mang sản phẩm thực phẩm Việt chất lượng cao đến đông đảo người tiêu dùng.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/lien-he"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-haq-red hover:bg-haq-dark text-white text-xs sm:text-sm font-heading font-black uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span>LIÊN HỆ HAQ FOOD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/san-pham"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-haq-soft text-haq-ink border border-haq-border text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>KHÁM PHÁ SẢN PHẨM</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
