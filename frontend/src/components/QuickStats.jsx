import React from 'react'
import { useReveal } from '../hooks/useReveal'

const STATS = [
  {
    value: '2021',
    label: 'FOUNDED',
    sublabel: 'Năm thành lập doanh nghiệp tại Hà Nội',
  },
  {
    value: 'ISO',
    label: 'CERTIFIED',
    sublabel: 'Chứng nhận Hệ thống Quản lý Chất lượng ISO 22000',
  },
  {
    value: 'HACCP',
    label: 'CERTIFIED',
    sublabel: 'Tiêu chuẩn An toàn Vệ sinh Thực phẩm quốc tế',
  },
  {
    value: '03+',
    label: 'MARKETS',
    sublabel: 'Việt Nam (nội địa), Hàn Quốc & Đài Loan (xuất khẩu)',
  },
]

export default function QuickStats() {
  const ref = useReveal()

  return (
    <section className="bg-haq-ink text-white py-14 sm:py-16 border-y border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div
          ref={ref}
          className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''}`}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-haq-gold tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] font-bold tracking-widest text-white/50 uppercase">
                  {stat.label}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/70 leading-relaxed max-w-xs">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
