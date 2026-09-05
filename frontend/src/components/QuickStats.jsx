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

const DEFAULT_PILLARS = [
  { num: '01', label: 'CHẤT LƯỢNG', title: 'Chất Lượng Đồng Nhất', desc: 'Kiểm soát chặt chẽ từ nguyên liệu đầu vào, quy trình chế biến khép kín đến từng lô sản phẩm xuất xưởng.' },
  { num: '02', label: 'TIÊU CHUẨN QUỐC TẾ', title: 'An Toàn Thực Phẩm', desc: 'Hệ thống quản lý chất lượng đạt chuẩn quốc tế ISO 22000 và HACCP, đảm bảo độ an toàn tuyệt đối.' },
  { num: '03', label: 'GIA CÔNG THEO YÊU CẦU', title: 'Giải Pháp Gia Công', desc: 'Năng lực sản xuất linh hoạt theo yêu cầu đối tác, hỗ trợ trọn gói từ công thức, bao bì đến hồ sơ công bố.' },
]

export default function QuickStats() {
  const { t } = useLanguage()

  const rawPillars = t('home.quick_stats.pillars', null)
  const pillars = (Array.isArray(rawPillars) && rawPillars.length > 0) ? rawPillars : DEFAULT_PILLARS

  return (
    <section id="nang-luc" className="w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-haq-cream/40 border-b border-haq-border flex items-center justify-center py-14 sm:py-18 lg:py-0">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div>
            <Reveal>
              <p className="font-heading text-xs font-bold tracking-[0.2em] text-[#C89B3C] uppercase mb-2">
                {t('home.quick_stats.badge', 'Tiêu chuẩn & Năng lực')}
              </p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink tracking-tight leading-tight">
                {t('home.quick_stats.title', 'Nền tảng sản xuất vững chắc')}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Link
              to="/nang-luc"
              className="inline-flex items-center gap-2 text-sm font-heading font-bold text-haq-red hover:text-haq-ink transition-colors group"
            >
              <span>{t('home.quick_stats.view_detail', 'Xem chi tiết năng lực')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* 3 Pillars — gap-px border technique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-haq-border rounded-2xl overflow-hidden">
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.num} delay={idx * 120}>
              <Link
                to="/nang-luc"
                className="group bg-white p-7 sm:p-8 lg:p-10 flex flex-col h-full hover:bg-haq-cream/30 transition-colors"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-heading font-extrabold text-4xl sm:text-5xl text-haq-red">
                    {pillar.num}
                  </span>
                  <span className="font-heading text-[10px] font-bold tracking-[0.2em] text-haq-text-secondary uppercase">
                    {pillar.label}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-haq-ink mb-2">
                  {pillar.title}
                </h3>

                <p className="text-sm text-haq-text-secondary leading-[1.8] flex-1">
                  {pillar.desc}
                </p>

                <div className="mt-6 pt-5 border-t border-haq-border">
                  <span className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-haq-red group-hover:gap-2.5 transition-all">
                    <span>{t('home.quick_stats.learn_more', 'Tìm hiểu thêm')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
