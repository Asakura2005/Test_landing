import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function BrandStatement() {
  return (
    <section id="gioi-thieu" className="py-14 sm:py-18 lg:py-20 bg-haq-sage/60 border-b border-haq-border relative overflow-hidden">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Huge 2021 Typography */}
          <div className="lg:col-span-4">
            <div className="font-heading font-extrabold text-6xl sm:text-7xl lg:text-8xl text-haq-green-dark/15 leading-none select-none tracking-tighter">
              2021
            </div>
            <div className="font-heading text-xs font-bold uppercase tracking-widest text-[#16A34A] mt-2">
              ESTABLISHED IN HANOI
            </div>
          </div>

          {/* Right Column: Concise Editorial Statement */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                VỀ HAQ FOOD · GIỚI THIỆU DOANH NGHIỆP
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-haq-ink leading-snug uppercase tracking-tight">
              Sản xuất & Phân phối Thực phẩm Đạt Chuẩn An Toàn Quốc Tế
            </h2>

            <p className="text-base sm:text-lg text-haq-text-secondary leading-relaxed max-w-2xl font-normal">
              Thành lập năm 2021, HAQ Hà Nội hoạt động trong lĩnh vực sản xuất và phân phối thực phẩm, hướng đến việc đưa các sản phẩm nông sản và ẩm thực Việt Nam chất lượng cao đến người tiêu dùng trong nước và nhiều thị trường quốc tế.
            </p>

            <div className="pt-2">
              <Link
                to="/gioi-thieu"
                className="inline-flex items-center gap-2.5 bg-[#16A34A] hover:bg-[#13863d] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>TÌM HIỂU THÊM VỀ CHÚNG TÔI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
