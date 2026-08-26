import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function BrandStatement() {
  return (
    <section id="gioi-thieu" className="py-24 sm:py-32 bg-haq-bone border-b border-black/5 relative overflow-hidden">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Huge 2021 Typography */}
          <div className="lg:col-span-4">
            <div className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl text-haq-ink/15 leading-none select-none tracking-tighter">
              2021
            </div>
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-haq-red mt-2">
              ESTABLISHED IN HANOI
            </div>
          </div>

          {/* Right Column: Concise Editorial Statement */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                VỀ HAQ FOOD · ABOUT US
              </span>
              <span className="h-px w-10 bg-haq-red" />
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-haq-ink leading-snug uppercase tracking-tight">
              Sản xuất & Phân phối Thực phẩm Đạt Chuẩn An Toàn Quốc Tế
            </h2>

            <p className="text-base sm:text-lg text-haq-ink/80 leading-relaxed max-w-2xl font-medium">
              Thành lập năm 2021, HAQ Hà Nội hoạt động trong lĩnh vực sản xuất và phân phối thực phẩm, hướng đến việc đưa các sản phẩm Việt Nam chất lượng cao đến người tiêu dùng trong nước và nhiều thị trường quốc tế.
            </p>

            <div className="pt-2">
              <Link
                to="/gioi-thieu"
                className="inline-flex items-center gap-2.5 bg-haq-ink hover:bg-haq-red text-white text-xs sm:text-sm font-heading font-black uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>VỀ CHÚNG TÔI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
