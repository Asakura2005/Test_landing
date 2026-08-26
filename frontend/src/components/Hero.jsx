import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

const SLIDES = [
  {
    id: 1,
    image: heroBanner2,
    alt: 'HAQ FOOD - Hoki Đa Dạng Hương Vị Bánh Tráng Việt',
    tag: 'CAMPAIGN BANNER 01',
    subtitle: 'HOKI · ĐA DẠNG HƯƠNG VỊ BÁNH TRÁNG VIỆT',
    description: 'Bộ sưu tập Bánh Tráng Sấy Giòn & Bánh Tráng Trộn Sợi Sa Tế Tôm công thức đậm đà.',
  },
  {
    id: 2,
    image: heroBanner1,
    alt: 'HAQ FOOD - Hoki Cùng Sẻ Chia, Cùng Trải Nghiệm Đa Dạng',
    tag: 'CAMPAIGN BANNER 02',
    subtitle: 'HOKI · TRỌN VỊ CHIA SẺ, RỘN RÃ TỪNG KHOẢNH KHẮC',
    description: 'Hương vị snack truyền thống kết hợp tiêu chuẩn sản xuất hiện đại và an toàn.',
  },
]

export default function Hero() {
  const ref = useReveal()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  const slide = SLIDES[current]

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative pt-[84px] pb-8 md:pt-[94px] md:pb-12 bg-haq-bone overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Top Editorial Metadata Bar */}
          <div className="flex items-center justify-between py-2.5 mb-3 border-b border-black/10 text-xs font-mono font-bold tracking-widest text-haq-ink/60 uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-haq-red animate-pulse" />
              <span className="text-haq-ink font-heading font-extrabold tracking-wider">HAQ FOOD</span>
              <span className="text-black/20">|</span>
              <span className="hidden sm:inline">PREMIUM VIETNAMESE SNACK BRAND</span>
            </div>

            <div className="flex items-center gap-4">
              <span>{slide.tag}</span>
              <span className="text-black/20">|</span>
              <span className="text-haq-red font-bold">
                0{current + 1} <span className="text-haq-ink/30">/ 0{SLIDES.length}</span>
              </span>
            </div>
          </div>

          {/* Main Visual Banner Canvas (16:9 Uncropped Presentation) */}
          <div className="relative w-full aspect-16/9 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-white border border-black/5">
            {SLIDES.map((item, idx) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className={`w-full h-full object-contain md:object-cover object-center transform transition-transform duration-7000 ease-out ${
                    idx === current ? 'scale-100' : 'scale-105'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}

            {/* Slider Navigation Arrows Floating on Hero */}
            <div className="absolute inset-y-0 inset-x-3 md:inset-x-6 z-20 flex items-center justify-between pointer-events-none">
              <button
                onClick={prevSlide}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-haq-ink hover:text-haq-red flex items-center justify-center shadow-lg backdrop-blur-xs transition-all duration-200 border border-black/10 hover:scale-105"
                aria-label="Banner trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-haq-ink hover:text-haq-red flex items-center justify-center shadow-lg backdrop-blur-xs transition-all duration-200 border border-black/10 hover:scale-105"
                aria-label="Banner tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Editorial Caption & Action Bar */}
          <div className="mt-4 pt-4 border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-haq-red uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.subtitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-haq-ink/70 mt-1 max-w-xl">
                {slide.description}
              </p>
            </div>

            {/* Minimalist Editorial CTAs */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <Link
                to="/san-pham"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-haq-red border-b-2 border-haq-red pb-1 hover:text-haq-ink hover:border-haq-ink transition-all"
              >
                <span>KHÁM PHÁ SẢN PHẨM</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/gioi-thieu"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-haq-ink/75 hover:text-haq-red transition-colors"
              >
                <span>VỀ HAQ FOOD</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
