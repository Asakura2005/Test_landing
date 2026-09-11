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

export default function BrandStatement() {
  const { t } = useLanguage()

  return (
    <section id="gioi-thieu" className="w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-white border-b border-haq-border relative overflow-hidden flex items-center justify-center py-10 sm:py-14 lg:py-0">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-20 items-center">
          {/* Statement */}
          <div className="lg:col-span-10 lg:col-start-2">
            <Reveal delay={150}>
              <p className="font-heading text-xs font-bold tracking-[0.2em] text-[#16A34A] uppercase mb-3 sm:mb-4">
                {t('home.brand_statement.badge', 'Về HAQ Food · Giới thiệu')}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-haq-ink tracking-tight leading-snug pt-1">
                {t('home.brand_statement.title', 'Sản xuất & Phân phối Thực phẩm Đạt Chuẩn An Toàn Quốc Tế')}
              </h2>
            </Reveal>

            <Reveal delay={450}>
              <p className="mt-3.5 sm:mt-5 text-sm sm:text-lg text-haq-text-secondary leading-relaxed sm:leading-[1.8] max-w-2xl">
                {t('home.brand_statement.desc', 'Thành lập năm 2021, HAQ Hà Nội hoạt động trong lĩnh vực sản xuất và phân phối thực phẩm, hướng đến việc đưa các sản phẩm nông sản và ẩm thực Việt Nam chất lượng cao đến người tiêu dùng trong nước và nhiều thị trường quốc tế.')}
              </p>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-6 sm:mt-8">
                <Link
                  to="/gioi-thieu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-haq-ink hover:bg-[#0C1E15] text-white text-sm font-heading font-bold px-7 py-3.5 rounded-full transition-colors text-center"
                >
                  <span>{t('home.brand_statement.cta', 'Tìm hiểu thêm về chúng tôi')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
