import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Compass, Handshake } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getContactPageUrl } from '../utils/routeI18n'

import heroBanner1 from '../assets/herobanner/hero_banner_1.webp'
import heroBanner2 from '../assets/herobanner/hero_banner_2.webp'
import heroBanner3 from '../assets/herobanner/hero_banner_3.webp'

const SLIDES = [
  {
    image: heroBanner1,
    alt: 'HAQ FOOD - Hệ Sinh Thái Sản Phẩm Đồ Ăn Vặt & Nông Sản',
    badge: 'GIẢI PHÁP TOÀN DIỆN OBM & ODM • ĐỒ ĂN VẶT & NÔNG SẢN VIỆT',
    titleMain: 'Nâng Tầm Tinh Hoa',
    titleAccent: 'Đặc Sản Nông Nghiệp Việt',
    desc: 'Chuyên phát triển thương hiệu (OBM) và thiết kế sản xuất theo yêu cầu (ODM) cho ngành hàng đồ ăn vặt & đặc sản đóng gói. Đồng hành từ nghiên cứu công thức độc quyền, thiết kế bao bì đến chuỗi nhà máy chuẩn ISO 22000 & HACCP.',
  },
  {
    image: heroBanner2,
    alt: 'HAQ FOOD - Bánh Đậu Xanh Tươi Truyền Thống Thượng Hạng',
    badge: 'DI SẢN ẨM THỰC TRUYỀN THỐNG • CÔNG NGHỆ KHÉP KÍN',
    titleMain: 'Hương Vị Nguyên Bản',
    titleAccent: 'Bánh Đậu Xanh Tươi Thượng Hạng',
    desc: 'Được chế biến từ những hạt đậu xanh thuần khiết tuyển chọn từ vùng nguyên liệu trù phú, kết hợp công thức gia truyền và công nghệ sấy vô trùng hiện đại giữ trọn vẹn độ tươi ngậy thanh tao.',
  },
  {
    image: heroBanner3,
    alt: 'HAQ FOOD - Chuẩn Mực Chất Lượng Phân Phối Toàn Quốc & Xuất Khẩu',
    badge: 'CHUẨN MỰC CHẤT LƯỢNG • VƯƠN TẦM QUỐC TẾ',
    titleMain: 'Chuỗi Cung Ứng Toàn Diện',
    titleAccent: 'Phân Phối Toàn Quốc & Xuất Khẩu',
    desc: 'Tự hào hiện diện tại hơn 10.000 điểm bán cùng các chuỗi bán lẻ hàng đầu WinMart, GO!, Circle K, GS25, LOTTE và xuất khẩu chính ngạch sang các thị trường khó tính Hàn Quốc, Đài Loan.',
  },
]

export default function Hero() {
  const { language } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [loadRemainingSlides, setLoadRemainingSlides] = useState(false)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)

  // Lazy load slides 2 & 3 after initial render
  useEffect(() => {
    const timer = setTimeout(() => setLoadRemainingSlides(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Auto slide interval (6 seconds)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((curr) => {
        setPrev(curr)
        setLoadRemainingSlides(true)
        return (curr + 1) % SLIDES.length
      })
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  const goTo = useCallback((nextIdx, e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setLoadRemainingSlides(true)
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
    setLoadRemainingSlides(true)
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
    setLoadRemainingSlides(true)
    setCurrent((curr) => {
      setPrev(curr)
      return (curr - 1 + SLIDES.length) % SLIDES.length
    })
  }, [])

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
      prevSlide()
    } else if (touchDeltaX.current < -threshold) {
      next()
    }
    setTimeout(() => setIsPaused(false), 3000)
  }, [next, prevSlide])

  const currentSlide = SLIDES[current]

  return (
    <section
      id="hero"
      aria-label="HAQ FOOD Flagship Hero Banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[640px] sm:min-h-[700px] lg:h-[100dvh] bg-[#001710] overflow-hidden select-none flex flex-col justify-between pt-20 lg:pt-0"
    >
      {/* 1. LAYER CHỨA ẢNH BANNER THẬT CỦA USER (Cross-Fade Slides) */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, idx) => {
          const isCurrent = idx === current
          const isPrevious = idx === prev

          let zClass = '-z-10'
          let opacityClass = 'opacity-0 pointer-events-none'

          if (isCurrent) {
            zClass = 'z-10'
            opacityClass = 'opacity-100'
          } else if (isPrevious) {
            zClass = 'z-0'
            opacityClass = 'opacity-100 pointer-events-none'
          }

          const shouldRenderImg = idx === 0 || loadRemainingSlides || isCurrent || isPrevious

          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${zClass} ${opacityClass}`}
            >
              {shouldRenderImg ? (
                <img
                  src={slide.image}
                  alt={slide.alt}
                  width="1920"
                  height="1080"
                  className="w-full h-full object-cover object-[center_35%] scale-100 transition-transform duration-1000 ease-out"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={idx === 0 ? 'high' : 'low'}
                  decoding={idx === 0 ? 'sync' : 'async'}
                />
              ) : null}
            </div>
          )
        })}

        {/* 2. LAYER GRADIENT QUANG HỌC CHUẨN STITCH (Đảm bảo chữ đọc rõ 100% trên mọi loại ảnh) */}
        {/* Lớp phủ bên trái: Tối dần để chữ nổi bật */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001710]/95 via-[#00281d]/85 sm:via-[#00281d]/75 to-transparent/30 z-10 pointer-events-none" />
        {/* Lớp phủ từ dưới lên: Giữ sự liền mạch với phần thân trang */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001710] via-transparent to-[#002117]/60 z-10 pointer-events-none" />
        {/* Hiệu ứng ánh sáng ngọc bích tỏa nhẹ */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(16,185,129,0.18),transparent_60%)] z-10 pointer-events-none" />
      </div>

      {/* 3. NỘI DUNG CHỮ & NÚT BẤM CHUẨN THIẾT KẾ STITCH */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center py-10 lg:py-16">
        <div className="max-w-3xl flex flex-col gap-4 sm:gap-6">
          {/* Eyebrow Tag với đèn radar nhấp nháy */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 px-3.5 sm:px-4 py-1.5 rounded-full w-fit shadow-xl">
            <span className="flex h-2.5 w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe932c] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fe932c]" />
            </span>
            <span className="font-bold text-[10px] sm:text-xs tracking-[0.16em] uppercase text-[#b0f0d6] truncate">
              {currentSlide.badge}
            </span>
          </div>

          {/* Monumental Headline với gradient ánh vàng Stitch */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.14] tracking-tight">
            {currentSlide.titleMain} <br />
            <span className="bg-gradient-to-r from-[#ffdcc3] via-[#fe932c] to-[#ffd7a0] bg-clip-text text-transparent">
              {currentSlide.titleAccent}
            </span>
          </h1>

          {/* Compelling Narrative */}
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
            {currentSlide.desc}
          </p>

          {/* Dual CTAs: Khám Phá Bản Đồ Vùng Nguyên Liệu & Hợp Tác B2B OBM/ODM */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              href="#he-sinh-thai-dac-san"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#fe932c] to-[#e07b1a] hover:from-[#e07b1a] hover:to-[#c8660e] text-white font-bold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-[0_8px_25px_rgba(254,147,44,0.4)] hover:shadow-[0_12px_32px_rgba(254,147,44,0.6)] hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
            >
              <span>Khám Phá Bản Đồ Vùng Nguyên Liệu</span>
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform" />
            </a>

            <Link
              to={getContactPageUrl(language)}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-white font-semibold text-xs sm:text-sm md:text-base px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdcc3]" />
              <span>Hợp Tác Phát Triển OBM &amp; ODM</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. MŨI TÊN ĐIỀU HƯỚNG SLIDE TRÁI / PHẢI (Kính mờ thanh lịch) */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white hidden md:flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
        aria-label="Slide trước"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white hidden md:flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
        aria-label="Slide tiếp theo"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* 5. THANH ĐIỀU HƯỚNG SLIDE BÊN DƯỚI (Chấm dot + thanh tiến trình) */}
      <div className="relative z-30 max-w-[1400px] w-full mx-auto px-5 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => goTo(i, e)}
              className="p-1 cursor-pointer transition-all"
              aria-label={`Chuyển tới slide ${i + 1}`}
            >
              <span
                className={`block h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 sm:w-10 bg-[#fe932c] shadow-[0_0_12px_rgba(254,147,44,0.8)]'
                    : 'w-2 sm:w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-white/60 font-mono tracking-wider">
          <span className="text-[#fe932c] font-bold">0{current + 1}</span>
          <span>/</span>
          <span>0{SLIDES.length}</span>
        </div>
      </div>
    </section>
  )
}
