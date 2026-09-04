import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const { language, switchLanguage, currentLangObj } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const timerRef = useRef(null)

  // Debounced hover handling so accidental sweeps across screen corner don't flash the menu
  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIsOpen(true)
    }, 100)
  }

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 220)
  }

  // Support click/touch toggle
  const handleToggle = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsOpen((prev) => !prev)
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[9990] select-none font-sans"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dropdown list: absolutely positioned above the trigger pill with smooth slide-up ('kéo ra') transition */}
      <div
        className={`absolute bottom-full right-0 pb-2.5 transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none invisible'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-gray-200/90 p-2.5 min-w-[175px] overflow-hidden">
          <div className="space-y-1">
            {LANGUAGES.map((item) => {
              const isActive = item.code === language
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    switchLanguage(item.code, navigate, location.pathname)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#E8F3EE] text-[#0F5132] font-bold'
                      : 'text-[#0C1E15] hover:bg-gray-50 hover:text-[#0F5132]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FlagIcon code={item.code} className="w-5 h-3.5 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-[#0F5132] shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Trigger Pill */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label="Chọn ngôn ngữ"
        className={`flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-full shadow-md border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5132] ${
          isOpen
            ? 'border-[#0F5132] shadow-lg scale-105 ring-2 ring-[#0F5132]/20'
            : 'border-gray-300 hover:border-[#0F5132]'
        }`}
      >
        <FlagIcon code={currentLangObj.code} className="w-5 h-3.5 shrink-0" />
        <span className="text-xs font-heading font-bold text-[#0C1E15] uppercase tracking-wider">
          {currentLangObj.code.toUpperCase()}
        </span>
      </button>
    </div>
  )
}

/**
 * Header Language Switcher for StickyNav (topbar)
 */
export function HeaderLanguageSwitcher() {
  const { language, switchLanguage, currentLangObj } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
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
                    switchLanguage(item.code, navigate, location.pathname)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-heading font-medium transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#E8F3EE] text-[#0F5132] font-bold'
                      : 'text-[#0C1E15] hover:bg-gray-50 hover:text-[#0F5132]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon code={item.code} className="w-4 h-3 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />}
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
