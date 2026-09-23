import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const STATS_DATA = {
  vi: [
    { target: 2021, suffix: '', label: 'Năm thành lập', isYear: true },
    { target: 50, suffix: '+', label: 'Sản phẩm' },
    { target: 7, suffix: '+', label: 'Chuỗi bán lẻ' },
    { target: 3, suffix: '', label: 'Thị trường XK' },
  ],
  en: [
    { target: 2021, suffix: '', label: 'Founded Year', isYear: true },
    { target: 50, suffix: '+', label: 'Products & SKUs' },
    { target: 7, suffix: '+', label: 'Retail Chains' },
    { target: 3, suffix: '', label: 'Export Markets' },
  ],
  ko: [
    { target: 2021, suffix: '', label: '설립 연도', isYear: true },
    { target: 50, suffix: '+', label: '제품 라인업' },
    { target: 7, suffix: '+', label: '유통 파트너사' },
    { target: 3, suffix: '', label: '글로벌 수출국' },
  ],
  zh: [
    { target: 2021, suffix: '', label: '创立年份', isYear: true },
    { target: 50, suffix: '+', label: '核心产品' },
    { target: 7, suffix: '+', label: '连锁零售合作' },
    { target: 3, suffix: '', label: '海外出口市场' },
  ],
}

function StatCounterItem({ target, suffix, label, isYear = false, isIntersecting }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isIntersecting) return

    let startTime = null
    const duration = 1500 // 1.5 seconds

    const startVal = isYear ? Math.max(0, target - 50) : 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const rawProgress = Math.min(elapsed / duration, 1)

      // easeOutCubic: 1 - (1 - t)^3
      const easeOut = 1 - Math.pow(1 - rawProgress, 3)
      const current = Math.floor(startVal + (target - startVal) * easeOut)

      setValue(current)

      if (rawProgress < 1) {
        requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    const animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [isIntersecting, target, isYear])

  return (
    <div className="flex flex-col items-center justify-center py-2 sm:py-3 px-2 text-center">
      <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-none">
        <span>{value}</span>
        {suffix && <span className="text-gold text-base sm:text-lg lg:text-xl ml-0.5">{suffix}</span>}
      </div>
      <p className="mt-1 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-white/60">
        {label}
      </p>
    </div>
  )
}

export default function StatsStrip() {
  const { language } = useLanguage()
  const stats = STATS_DATA[language] || STATS_DATA.vi

  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-deep py-3 sm:py-4 overflow-hidden border-t border-b border-white/5"
    >
      {/* Subtle diagonal ambient gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-haq-green-dark/15 via-transparent to-gold/10"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-column grid (2x2 on mobile, 4 cols on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`
                relative
                ${idx % 2 === 0 ? 'border-r border-white/5' : ''}
                ${idx < 2 ? 'border-b lg:border-b-0 border-white/5' : ''}
                ${idx < 3 ? 'lg:border-r lg:border-white/5' : 'lg:border-r-0'}
              `}
            >
              <StatCounterItem
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                isYear={stat.isYear}
                isIntersecting={isVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
