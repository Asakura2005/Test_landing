import React, { useState, useRef, useEffect } from 'react'
import { useLanguage, LANGUAGES } from '../context/LanguageContext'
import { Check } from 'lucide-react'

// High-fidelity SVG Flags (avoids Windows emoji fallback to "KR / VN / US")
export function FlagIcon({ code, className = 'w-5 h-3.5' }) {
  if (code === 'vi') {
    return (
      <svg viewBox="0 0 30 20" className={`rounded-[2px] object-cover shadow-2xs ${className}`} aria-hidden="true">
        <rect width="30" height="20" fill="#DA251D" />
        <polygon
          points="15,4 16.5,8.8 21.5,8.8 17.5,11.8 19,16.5 15,13.5 11,16.5 12.5,11.8 8.5,8.8 13.5,8.8"
          fill="#FFFF00"
        />
      </svg>
    )
  }

  if (code === 'ko') {
    return (
      <svg viewBox="0 0 30 20" className={`rounded-[2px] object-cover shadow-2xs ${className}`} aria-hidden="true">
        <rect width="30" height="20" fill="#FFFFFF" />
        {/* Taegeuk circle */}
        <path d="M15,6 A4,4 0 0,1 15,14 A2,2 0 0,1 15,10 A2,2 0 0,0 15,6" fill="#CD2E3A" />
        <path d="M15,14 A4,4 0 0,1 15,6 A2,2 0 0,1 15,10 A2,2 0 0,0 15,14" fill="#0047A0" />
        {/* 4 Trigrams */}
        <g stroke="#000000" strokeWidth="0.7" strokeLinecap="round">
          {/* Top-left (Geon) */}
          <line x1="6" y1="5.5" x2="9" y2="7.5" />
          <line x1="6.8" y1="4.3" x2="9.8" y2="6.3" />
          <line x1="5.2" y1="6.7" x2="8.2" y2="8.7" />
          {/* Bottom-right (Gon) */}
          <line x1="21" y1="12.5" x2="24" y2="14.5" strokeDasharray="1.2 0.6" />
          <line x1="21.8" y1="11.3" x2="24.8" y2="13.3" strokeDasharray="1.2 0.6" />
          <line x1="20.2" y1="13.7" x2="23.2" y2="15.7" strokeDasharray="1.2 0.6" />
          {/* Top-right (Gam) */}
          <line x1="21" y1="7.5" x2="24" y2="5.5" strokeDasharray="1.2 0.6" />
          <line x1="21.8" y1="8.7" x2="24.8" y2="6.7" />
          <line x1="20.2" y1="6.3" x2="23.2" y2="4.3" strokeDasharray="1.2 0.6" />
          {/* Bottom-left (Ri) */}
          <line x1="6" y1="14.5" x2="9" y2="12.5" />
          <line x1="6.8" y1="15.7" x2="9.8" y2="13.7" strokeDasharray="1.2 0.6" />
          <line x1="5.2" y1="13.3" x2="8.2" y2="11.3" />
        </g>
      </svg>
    )
  }

  // en (USA)
  return (
    <svg viewBox="0 0 30 20" className={`rounded-[2px] object-cover shadow-2xs ${className}`} aria-hidden="true">
      {/* 13 Stripes */}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect
          key={i}
          x="0"
          y={(i * 20) / 13}
          width="30"
          height={20 / 13}
          fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
        />
      ))}
      {/* Blue Canton */}
      <rect width="12" height={(7 * 20) / 13} fill="#3C3B6E" />
      {/* White dots for stars */}
      <circle cx="3" cy="2.5" r="0.7" fill="#FFFFFF" />
      <circle cx="6" cy="2.5" r="0.7" fill="#FFFFFF" />
      <circle cx="9" cy="2.5" r="0.7" fill="#FFFFFF" />
      <circle cx="4.5" cy="5.2" r="0.7" fill="#FFFFFF" />
      <circle cx="7.5" cy="5.2" r="0.7" fill="#FFFFFF" />
      <circle cx="3" cy="8" r="0.7" fill="#FFFFFF" />
      <circle cx="6" cy="8" r="0.7" fill="#FFFFFF" />
      <circle cx="9" cy="8" r="0.7" fill="#FFFFFF" />
    </svg>
  )
}

/**
 * Floating Language Switcher matching the reference screenshot:
 * Positioned in bottom-right corner. When hovered, smoothly expands to reveal the list.
 */
export function FloatingLanguageSwitcher() {
  const { language, setLanguage, currentLangObj } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef(null)

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 250)
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-[9990] select-none font-sans"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown list appearing above / around the switcher on hover */}
      <div
        className={`transition-all duration-300 ease-out origin-bottom-right ${
          isHovered
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-haq-red/30 p-2 min-w-[150px] mb-2.5 overflow-hidden">
          <div className="space-y-1">
            {LANGUAGES.map((item) => {
              const isActive = item.code === language
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code)
                    setIsHovered(false)
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-haq-red/10 text-haq-red font-bold'
                      : 'text-haq-ink hover:bg-haq-cream hover:text-haq-red'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FlagIcon code={item.code} className="w-5 h-3.5 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-haq-red shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Trigger Pill */}
      <div
        className={`flex items-center gap-2 px-3.5 py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border transition-all cursor-pointer ${
          isHovered
            ? 'border-haq-red shadow-haq-red/20 scale-105'
            : 'border-haq-border hover:border-haq-red/50'
        }`}
      >
        <FlagIcon code={currentLangObj.code} className="w-5 h-3.5 shrink-0" />
        <span className="text-xs font-heading font-bold text-haq-ink uppercase tracking-wider">
          {currentLangObj.code.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

/**
 * Header Language Switcher for StickyNav (topbar)
 */
export function HeaderLanguageSwitcher() {
  const { language, setLanguage, currentLangObj } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef(null)

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  return (
    <div
      className="relative select-none font-sans"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-haq-border bg-haq-cream/50 hover:bg-white hover:border-haq-red/40 transition-all text-xs font-heading font-bold text-haq-ink cursor-pointer shadow-2xs"
        aria-label="Chọn ngôn ngữ"
      >
        <FlagIcon code={currentLangObj.code} className="w-4 h-3 shrink-0" />
        <span className="uppercase text-[11px] font-bold text-haq-ink">
          {currentLangObj.code}
        </span>
      </button>

      {/* Dropdown Card */}
      <div
        className={`absolute top-full right-0 mt-2 z-50 transition-all duration-200 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-haq-border p-2 min-w-[155px]">
          <div className="space-y-1">
            {LANGUAGES.map((item) => {
              const isActive = item.code === language
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-heading font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-haq-red/10 text-haq-red font-bold'
                      : 'text-haq-ink hover:bg-haq-cream hover:text-haq-red'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon code={item.code} className="w-4 h-3 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-haq-red shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatingLanguageSwitcher
