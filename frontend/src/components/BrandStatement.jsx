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
    <section id="gioi-thieu" className="w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-white border-b border-haq-border relative overflow-hidden flex items-center justify-center py-16 sm:py-20 lg:py-0">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Left: Large 2021 */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="font-heading font-extrabold text-7xl sm:text-8xl lg:text-[10rem] text-haq-border/40 leading-none select-none tracking-tighter">
                2021
              </div>
              <div className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[#C89B3C] mt-3">
                {t('home.brand_statement.est', 'Thành lập tại Hà Nội')}
              </div>
            </Reveal>
          </div>

          {/* Right: Statement */}
          <div className="lg:col-span-8">
            <Reveal delay={150}>
              <p className="font-heading text-xs font-bold tracking-[0.2em] text-[#C89B3C] uppercase mb-4">
                {t('home.brand_statement.badge', 'Về HAQ Food · Giới thiệu')}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-haq-ink tracking-tight leading-[1.15]">
                {t('home.brand_statement.title', 'Sản xuất & Phân phối Thực phẩm Đạt Chuẩn An Toàn Quốc Tế')}
              </h2>
            </Reveal>

            <Reveal delay={450}>
              <p className="mt-5 text-base sm:text-lg text-haq-text-secondary leading-[1.8] max-w-2xl">
                {t('home.brand_statement.desc', 'Thành lập năm 2021, HAQ Hà Nội hoạt động trong lĩnh vực sản xuất và phân phối thực phẩm, hướng đến việc đưa các sản phẩm nông sản và ẩm thực Việt Nam chất lượng cao đến người tiêu dùng trong nước và nhiều thị trường quốc tế.')}
              </p>
            </Reveal>

            <Reveal delay={600}>
              <div className="mt-8">
                <Link
                  to="/gioi-thieu"
                  className="inline-flex items-center gap-2.5 bg-haq-ink hover:bg-[#0C1E15] text-white text-sm font-heading font-bold px-7 py-3.5 rounded-full transition-colors"
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
