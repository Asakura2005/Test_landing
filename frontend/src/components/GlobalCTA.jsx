import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { getContactUrl } from '../utils/routeI18n'

/**
 * Scroll reveal wrapper using IntersectionObserver
 */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/**
 * GlobalCTA Component
 * Full-width CTA section with dark background (#0C1E15) and subtle diamond pattern overlay (opacity 0.025).
 * Gold top gradient border (3px).
 * Generous spacing: py-20 lg:py-32
 */
export default function GlobalCTA() {
  const { t, language } = useLanguage()

  const flagPills = [
    { flag: '🇻🇳', label: t('home.global_cta.vietnam', 'Việt Nam') },
    { flag: '🇰🇷', label: t('home.global_cta.korea', 'Hàn Quốc') },
    { flag: '🇹🇼', label: t('home.global_cta.taiwan', 'Đài Loan') },
  ]

  return (
    <section
      aria-label={t('home.global_cta.badge', '✦ Tầm nhìn quốc tế ✦')}
      className="relative w-full bg-deep text-white py-12 lg:py-16 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 3px Gold top gradient border */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent pointer-events-none"
      />

      {/* Subtle diamond pattern overlay at opacity 0.025 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23C8A355' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Tag: Gold text uppercase */}
        <Reveal delay={0}>
          <span className="inline-block font-heading text-[11px] sm:text-xs font-bold tracking-[0.2em] text-gold uppercase mb-2">
            {t('home.global_cta.badge', '✦ Tầm nhìn quốc tế ✦')}
          </span>
        </Reveal>

        {/* Heading: Playfair Display serif, white */}
        <Reveal delay={120}>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight tracking-tight max-w-2xl">
            {t('home.global_cta.heading', 'Từ Nông Sản Việt — Vươn Tầm Châu Á')}
          </h2>
        </Reveal>

        {/* Flag pills row */}
        <Reveal delay={240}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 my-4 sm:my-5">
            {flagPills.map((pill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-white/80 font-medium backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.1] hover:border-white/[0.15] cursor-default"
              >
                <span className="text-sm sm:text-base leading-none">{pill.flag}</span>
                <span>{pill.label}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* CTA button: green rounded-full pill with hover shadow and transition */}
        <Reveal delay={360}>
          <Link
            to={getContactUrl(language)}
            className="inline-flex items-center gap-2 bg-haq-green hover:bg-haq-green-dark text-white text-xs sm:text-sm font-heading font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-[0_4px_20px_rgba(22,163,74,0.35)] hover:shadow-[0_8px_30px_rgba(22,163,74,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t('home.global_cta.btn', 'Liên hệ hợp tác')}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
