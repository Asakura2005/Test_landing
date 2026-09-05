import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

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

export default function CtaBanner() {
  const { t } = useLanguage()

  return (
    <section className="w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-haq-cream/50 border-b border-haq-border flex items-center justify-center py-16 sm:py-20 lg:py-0">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center w-full">
        <Reveal>
          <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#C89B3C]">
            {t('home.cta_banner.badge', 'HAQ FOOD · Đồng hành & Phát triển')}
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="mt-3 font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-haq-ink uppercase tracking-tight leading-tight">
            {t('home.cta_banner.title', 'Cùng kiến tạo những giá trị bền vững')}
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-4 text-sm sm:text-base text-haq-text-secondary max-w-xl mx-auto leading-relaxed font-normal">
            {t('home.cta_banner.desc', 'Đồng hành cùng HAQ FOOD trong hành trình mang sản phẩm thực phẩm Việt Nam an toàn, chất lượng cao đến đông đảo người tiêu dùng trong nước và quốc tế.')}
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/lien-he"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-haq-red hover:bg-[#0c3e27] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>{t('home.cta_banner.cta_contact', 'Liên hệ hợp tác')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/san-pham"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-haq-cream text-haq-ink border border-haq-border text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-2xs hover:shadow-xs"
            >
              <span>{t('home.cta_banner.cta_explore', 'Khám phá sản phẩm')}</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
