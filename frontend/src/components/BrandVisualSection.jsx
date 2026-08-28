import React from 'react'
import { Link } from 'react-router-dom'
import { Globe2, ArrowRight } from 'lucide-react'
import exportVisualImg from '../assets/distribution/distribution_export.jpg'

export default function BrandVisualSection() {
  return (
    <section className="relative w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-[#0C1E15] text-white overflow-hidden flex items-center justify-center py-16 sm:py-20 lg:py-0">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src={exportVisualImg}
          alt="HAQ FOOD From Vietnam to Asia"
          className="w-full h-full object-cover opacity-30 filter grayscale-[15%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1E15] via-[#0C1E15]/90 to-[#0C1E15]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15] via-transparent to-[#0C1E15]/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 mb-4 sm:mb-5">
            <Globe2 className="w-4 h-4 text-[#C89B3C]" />
            <span className="font-heading text-xs font-bold tracking-wider uppercase text-white/95">
              TẦM NHÌN QUỐC TẾ · INTERNATIONAL REACH
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-[1.15] mb-3 sm:mb-4">
            TỪ NÔNG SẢN VIỆT <br className="hidden sm:block" />
            <span className="text-[#C89B3C]">VƯƠN TẦM CHÂU Á</span>
          </h2>

          {/* Markets Line */}
          <div className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-[#16A34A] mb-4 sm:mb-5">
            VIỆT NAM · HÀN QUỐC · ĐÀI LOAN
          </div>

          {/* Editorial Description */}
          <p className="text-xs sm:text-sm lg:text-base text-white/85 leading-relaxed max-w-2xl mb-7 sm:mb-8 font-normal">
            Không ngừng nâng cao chất lượng và quy chuẩn chế biến khép kín, HAQ FOOD tự hào mang hương vị thực phẩm truyền thống Việt Nam chất lượng cao tiếp cận các thị trường tiêu chuẩn khắt khe tại khu vực châu Á.
          </p>

          <Link
            to="/gioi-thieu#phan-phoi"
            className="inline-flex items-center gap-2.5 bg-[#16A34A] hover:bg-[#13863d] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>TÌM HIỂU HỆ THỐNG PHÂN PHỐI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
