import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import heroBanner1 from '../assets/herobanner/hero_banner_1.jpg'
import heroBanner2 from '../assets/herobanner/hero_banner_2.jpg'
import heroBanner3 from '../assets/herobanner/hero_banner_3.jpg'

const SLIDES = [
  { image: heroBanner1, alt: 'HAQ FOOD - Hệ Sinh Thái Sản Phẩm' },
  { image: heroBanner2, alt: 'HAQ FOOD - Bánh Đậu Xanh Tươi Truyền Thống' },
  { image: heroBanner3, alt: 'HAQ FOOD - Hương Vị Việt Tinh Túy' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((nextIdx, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrent((curr) => {
      setPrev(curr)
      return nextIdx
    })
  }, [])

  const next = useCallback((e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrent((curr) => {
      setPrev(curr)
      return (curr + 1) % SLIDES.length
    })
  }, [])

  const prevSlide = useCallback((e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrent((curr) => {
      setPrev(curr)
      return (curr - 1 + SLIDES.length) % SLIDES.length
    })
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((curr) => {
        setPrev(curr)
        return (curr + 1) % SLIDES.length
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section
      id="hero"
      aria-label="HAQ FOOD Hero Banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[100dvh] bg-black overflow-hidden select-none"
    >
      {/* Seamless Direct Cross-Fade Slides (No background flash) */}
      {SLIDES.map((slide, idx) => {
        const isCurrent = idx === current
        const isPrevious = idx === prev

        // Current slide fades in on top (z-10)
        // Previous slide stays 100% visible underneath (z-0) so background never flashes
        // Other slides are hidden (-z-10)
        let zClass = '-z-10'
        let opacityClass = 'opacity-0 pointer-events-none'

        if (isCurrent) {
          zClass = 'z-10'
          opacityClass = 'opacity-100'
        } else if (isPrevious) {
          zClass = 'z-0'
          opacityClass = 'opacity-100 pointer-events-none'
        }

        return (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${zClass} ${opacityClass}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-[center_35%]"
              loading="eager"
              decoding="async"
            />
          </div>
        )
      })}

      {/* Floating Prev Button */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs border border-white/25 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95 pointer-events-auto"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Button */}
      <button
        type="button"
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs border border-white/25 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95 pointer-events-auto"
        aria-label="Next banner"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Clean Bottom Indicator Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg pointer-events-auto">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => goTo(i, e)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'w-8 bg-[#16A34A]' : 'w-2.5 bg-white/50 hover:bg-white/90'
            }`}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
