import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'

import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner3 from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

const SLIDES = [
  {
    image: heroBanner1,
    eyebrow: 'VIETNAMESE FOOD MANUFACTURER & DISTRIBUTOR',
    title: 'CHẤT LƯỢNG LÀ CỐT LÕI CỦA THƯƠNG HIỆU',
    subtext: 'HAQ FOOD — Doanh nghiệp sản xuất và phân phối thực phẩm Việt Nam, khẳng định uy tín qua từng dòng sản phẩm đạt chuẩn ISO 22000 & HACCP.',
  },
  {
    image: heroBanner2,
    eyebrow: 'TIÊU CHUẨN AN TOÀN & CÔNG NGHỆ KHÉP KÍN',
    title: 'HƯƠNG VỊ VIỆT CHO NGƯỜI TIÊU DÙNG HIỆN ĐẠI',
    subtext: 'Dây chuyền sấy giòn tự động, kết hợp tinh hoa gia vị truyền thống và quy chuẩn kiểm định nghiêm ngặt.',
  },
  {
    image: heroBanner3,
    eyebrow: 'BẢN SẮC ẨM THỰC · VƯƠN TẦM QUỐC TẾ',
    title: 'KẾT NỐI GIÁ TRỊ TỪ NÔNG SẢN ĐẾN THÀNH PHẨM',
    subtext: 'Đồng hành cùng chuỗi siêu thị lớn trong nước và mở rộng xuất khẩu sang Hàn Quốc, Đài Loan.',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  return (
    <section
      id="hero"
      aria-label="HAQ FOOD Hero Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[520px] xs:min-h-[580px] sm:min-h-[640px] lg:min-h-screen bg-haq-ink text-white overflow-hidden flex items-center justify-center pt-16 sm:pt-18 lg:pt-20"
    >
      {/* 1. Cinematic Background Slider */}
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform transition-all duration-1000 ease-out"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
          {/* Subtle Editorial Gradient Overlay for High Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-haq-ink via-transparent to-black/25" />
        </div>
      ))}

      {/* 2. Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-site px-5 sm:px-8 lg:px-12 w-full py-10 sm:py-14 lg:py-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 mb-3.5 sm:mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-haq-gold" />
            <span className="font-mono text-[8px] xs:text-[9px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-widest uppercase text-white/90">
              {SLIDES[current].eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight uppercase leading-[1.1] mb-3.5 sm:mb-5">
            {SLIDES[current].title}
          </h1>

          {/* Subtext */}
          <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal line-clamp-3 sm:line-clamp-none">
            {SLIDES[current].subtext}
          </p>

          {/* 2 Clear CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
            <Link
              to="/san-pham"
              className="inline-flex items-center justify-center gap-2 bg-haq-red hover:bg-white text-white hover:text-haq-ink text-[11px] sm:text-xs lg:text-sm font-heading font-black uppercase tracking-wider px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-98 sm:active:scale-102"
            >
              <span>KHÁM PHÁ SẢN PHẨM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/gioi-thieu"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-[11px] sm:text-xs lg:text-sm font-heading font-bold uppercase tracking-wider px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-full backdrop-blur-xs transition-all duration-300 active:scale-98"
            >
              <span>VỀ HAQ FOOD</span>
            </Link>
          </div>
        </div>
      </div>




      {/* 3. Slider Navigation Controls */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 hidden sm:flex items-center gap-3">
        <button
          type="button"
          onClick={prevSlide}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-haq-red text-white flex items-center justify-center border border-white/20 backdrop-blur-xs transition-all duration-200"
          aria-label="Slide trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-haq-red text-white flex items-center justify-center border border-white/20 backdrop-blur-xs transition-all duration-200"
          aria-label="Slide kế tiếp"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 4. Bottom Indicator Dots */}
      <div className="absolute bottom-8 left-6 sm:left-12 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'w-8 bg-haq-red' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Chuyển tới slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
