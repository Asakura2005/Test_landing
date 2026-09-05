import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Globe2, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import exportVisualImg from '../assets/distribution/distribution_export.jpg'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-[800ms] ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function BrandVisualSection() {
  const { t } = useLanguage()

  return (
    <section className="relative w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-[#0C1E15] text-white overflow-hidden flex items-center justify-center py-16 sm:py-20 lg:py-0">
      {/* Background Cinematic Visual */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={exportVisualImg}
          alt="HAQ FOOD From Vietnam to Asia"
          className="w-full h-full object-cover opacity-25 filter grayscale-[20%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1E15] via-[#0C1E15]/90 to-[#0C1E15]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15] via-transparent to-[#0C1E15]/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <Globe2 className="w-4 h-4 text-[#C89B3C]" />
              <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-[#C89B3C]">
                {t('home.brand_visual.badge', 'Tầm nhìn quốc tế')}
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={150}>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-[1.15] mb-4 sm:mb-5">
              {t('home.brand_visual.title_1', 'Từ nông sản Việt')} <br className="hidden sm:block" />
              <span className="text-[#C89B3C]">{t('home.brand_visual.title_2', 'Vươn tầm Châu Á')}</span>
            </h2>
          </Reveal>

          {/* Markets Badge Row */}
          <Reveal delay={300}>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[
                { flag: '🇻🇳', name: 'Việt Nam' },
                { flag: '🇰🇷', name: 'Hàn Quốc' },
                { flag: '🇹🇼', name: 'Đài Loan' },
              ].map((m, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xs border border-white/15 rounded-full px-3.5 py-1 text-xs font-heading font-medium text-white/90"
                >
                  <span>{m.flag}</span>
                  <span>{m.name}</span>
                </span>
              ))}
            </div>
          </Reveal>

          {/* Editorial Description */}
          <Reveal delay={450}>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mb-8 font-normal">
              {t('home.brand_visual.desc', 'Không ngừng nâng cao chất lượng và quy chuẩn chế biến khép kín, HAQ FOOD tự hào mang hương vị thực phẩm truyền thống Việt Nam chất lượng cao tiếp cận các thị trường tiêu chuẩn khắt khe tại khu vực châu Á.')}
            </p>
          </Reveal>

          <Reveal delay={600}>
            <Link
              to="/gioi-thieu#phan-phoi"
              className="inline-flex items-center gap-2.5 bg-[#C89B3C] hover:bg-[#b58b32] text-[#0C1E15] text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>{t('home.brand_visual.cta', 'Tìm hiểu hệ thống phân phối')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
