import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner3 from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

const SLIDES = [
  {
    id: 1,
    image: heroBanner1,
    alt: 'HAQ FOOD - Hoki Đa Dạng Hương Vị Bánh Tráng Việt',
    title: 'Hoki Đa Dạng Hương Vị Bánh Tráng Việt',
  },
  {
    id: 2,
    image: heroBanner2,
    alt: 'HAQ FOOD - Hoki Cùng Sẻ Chia, Cùng Trải Nghiệm Đa Dạng',
    title: 'Hoki Cùng Sẻ Chia, Cùng Trải Nghiệm',
  },
  {
    id: 3,
    image: heroBanner3,
    alt: 'HAQ FOOD - Bộ Sưu Tập Bánh Đậu Xanh Thượng Hạng',
    title: 'Bộ Sưu Tập Bánh Đậu Xanh Thượng Hạng',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  return (
    <section
      id="hero"
      aria-label="Hero Banner Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full pt-[72px] sm:pt-[76px] bg-[#F7F7F7] overflow-hidden select-none"
    >
      {/* Full-Bleed 100% Screen Width Banner Canvas */}
      <div className="relative w-full aspect-video min-h-[280px] sm:min-h-[420px] md:min-h-[540px] lg:min-h-[640px] xl:min-h-[720px] bg-[#F7F7F7] overflow-hidden flex items-center justify-center">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className={`w-full h-full object-cover object-center transform transition-transform duration-6000 ease-out ${
                idx === current ? 'scale-100' : 'scale-105'
              }`}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Previous Slide Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/20 hover:bg-haq-red text-white flex items-center justify-center backdrop-blur-xs transition-all duration-300 shadow-lg hover:scale-105"
          aria-label="Banner trước"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Next Slide Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/20 hover:bg-haq-red text-white flex items-center justify-center backdrop-blur-xs transition-all duration-300 shadow-lg hover:scale-105"
          aria-label="Banner kế tiếp"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Bottom Slide Indicator Pagination Dots */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/35 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 sm:w-10 bg-white' : 'w-2 sm:w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Chuyển tới slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
