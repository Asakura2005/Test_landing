import React from 'react'
import { useReveal } from '../hooks/useReveal'

const STATS = [
  {
    number: '2021',
    label: 'Năm Thành Lập & Phát Triển',
    subtext: 'Thương hiệu thực phẩm HAQ FOOD',
  },
  {
    number: 'ISO · HACCP',
    label: 'Chuẩn Mực Chất Lượng',
    subtext: 'Quy trình kiểm soát an toàn nghiêm ngặt',
  },
  {
    number: '63',
    label: 'Tỉnh Thành Phân Phối',
    subtext: 'Phủ sóng chuỗi bán lẻ toàn quốc',
  },
  {
    number: '02+',
    label: 'Thị Trường Quốc Tế',
    subtext: 'Xuất khẩu sang Hàn Quốc & Đài Loan',
  },
]

export default function QuickStats() {
  const ref = useReveal()

  return (
    <section className="py-10 md:py-14 bg-white border-y border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div
          ref={ref}
          className="reveal grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-black/10"
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`pt-4 sm:pt-0 lg:px-6 flex flex-col justify-center ${
                idx % 2 === 1 ? 'sm:border-l border-black/10 lg:border-l-0 sm:pl-6' : ''
              }`}
            >
              <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-haq-ink tracking-tight">
                {stat.number}
              </div>
              <div className="mt-1.5 font-heading font-extrabold text-xs sm:text-sm text-haq-red uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="mt-0.5 text-xs text-haq-ink/60">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
