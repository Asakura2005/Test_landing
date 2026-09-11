import React, { useState, useEffect, useCallback, useRef } from 'react'
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
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    setIsPaused(true)
  }, [])

  const handleTouchMove = useCallback((e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }, [])

  const handleTouchEnd = useCallback(() => {
    const threshold = 50
    if (touchDeltaX.current > threshold) {
      // Swiped right → previous slide
      setCurrent((curr) => {
        setPrev(curr)
        return (curr - 1 + SLIDES.length) % SLIDES.length
      })
    } else if (touchDeltaX.current < -threshold) {
      // Swiped left → next slide
      setCurrent((curr) => {
        setPrev(curr)
        return (curr + 1) % SLIDES.length
      })
    }
    // Resume autoplay after brief delay
    setTimeout(() => setIsPaused(false), 3000)
  }, [])

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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-auto lg:h-[100dvh] bg-black overflow-hidden select-none"
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
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white hidden md:flex items-center justify-center backdrop-blur-xs border border-white/25 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95 pointer-events-auto"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Floating Next Button */}
      <button
        type="button"
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white hidden md:flex items-center justify-center backdrop-blur-xs border border-white/25 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95 pointer-events-auto"
        aria-label="Next banner"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Clean Bottom Indicator Dots — Tiny solid round dots (Green active, White inactive) */}
      <div className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 sm:gap-1.5 pointer-events-auto">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => goTo(i, e)}
            className="p-1 flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
            aria-label={`Banner ${i + 1}`}
          >
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 block ${
                i === current
                  ? 'bg-[#16A34A] ring-1 ring-white/60'
                  : 'bg-white/75 hover:bg-white shadow-xs'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
