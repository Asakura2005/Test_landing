import React, { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'

function AnimatedNumber({ target, suffix = '', isYear = false }) {
  const [count, setCount] = useState(isYear ? target : 0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isYear) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 1800
          const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, isYear])

  return (
    <span ref={ref} className="font-heading font-extrabold text-4xl sm:text-5xl text-haq-ink tracking-tight">
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useReveal()
  const { language } = useLanguage()
  const isEn = language === 'en'

  const STATS = [
    {
      num: 2021,
      suffix: '',
      isYear: true,
      label: isEn ? 'FOUNDED YEAR' : 'NĂM THÀNH LẬP',
      tag: '01',
      desc: isEn ? 'Established in Hanoi, pioneering standard packaged snacks' : 'Thành lập tại Hà Nội, tiên phong sản xuất đồ ăn vặt chuẩn vị'
    },
    {
      num: 7,
      suffix: '+',
      isYear: false,
      label: isEn ? 'RETAIL CHAINS' : 'CHUỖI BÁN LẺ HÀNG ĐẦU',
      tag: '02',
      desc: isEn ? 'WinMart, Big C, GO!, Circle K, GS25, Kmart, Bach Hoa Xanh' : 'WinMart, Big C, GO!, Circle K, GS25, Kmart, Bách Hóa Xanh'
    },
    {
      num: 2,
      suffix: '',
      isYear: false,
      label: isEn ? 'EXPORT MARKETS' : 'THỊ TRƯỜNG XUẤT KHẨU',
      tag: '03',
      desc: isEn ? 'Officially exported to South Korea & Taiwan' : 'Xuất khẩu chính ngạch sang Hàn Quốc và Đài Loan'
    },
    {
      num: 100,
      suffix: '%',
      isYear: false,
      label: isEn ? 'ISO & HACCP AUDITED' : 'TIÊU CHUẨN ISO & HACCP',
      tag: '04',
      desc: isEn ? 'Closed-loop clean drying with strict lot sample retention' : 'Quy trình sấy sạch khép kín, kiểm soát từ nguyên liệu đến lưu mẫu'
    }
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF8] border-t border-haq-border font-sans">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-[0.25em] block mb-3">
                {isEn ? 'OPERATIONAL CAPABILITY · SOCIAL PROOF' : 'QUY MÔ VẬN HÀNH · NĂNG LỰC DOANH NGHIỆP'}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink uppercase tracking-tight">
                {isEn ? 'PROVEN CAPABILITY & NATIONWIDE REACH' : 'CON SỐ THỰC TẾ & NĂNG LỰC CUNG ỨNG'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-haq-text-secondary max-w-md font-normal leading-relaxed">
              {isEn
                ? 'Building steady confidence with major modern retail channels and international export buyers through uncompromised quality.'
                : 'Khẳng định uy tín với các tập đoàn bán lẻ hiện đại và đối tác quốc tế qua quy trình kiểm soát chất lượng chuẩn hóa.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-haq-border border border-haq-border rounded-3xl overflow-hidden shadow-xs">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-[#FAFAF8] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                      METRIC {stat.tag}
                    </span>
                    <span className="font-heading font-black text-2xl text-haq-border select-none">
                      {stat.tag}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <AnimatedNumber target={stat.num} suffix={stat.suffix} isYear={stat.isYear} />
                  </div>

                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-haq-ink mb-2">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-haq-text-secondary font-normal text-xs leading-relaxed border-t border-haq-border/60 pt-4 mt-4">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
