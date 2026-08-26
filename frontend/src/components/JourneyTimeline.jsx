import React from 'react'
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const JOURNEY_MILESTONES = [
  {
    year: '2021',
    title: 'THÀNH LẬP & HOÀN THIỆN DÂY CHUYỀN',
    desc: 'Thành lập công ty; hoàn thiện dây chuyền sản xuất bánh tráng trộn và bắt đầu ký kết hợp đồng với nhiều đơn vị khách hàng.',
    tag: 'FOUNDATION',
  },
  {
    year: '2022',
    title: 'MỞ RỘNG DANH MỤC SẢN PHẨM',
    desc: 'Mở rộng các dòng sản phẩm đồ ăn vặt chủ lực: bánh đậu xanh, bánh hạnh nhân, bắp rang bơ và thịt khô.',
    tag: 'EXPANSION',
  },
  {
    year: '2023',
    title: 'PHỦ SÓNG CÁC CHUỖI BÁN LẺ LỚN',
    desc: 'Phủ sóng tại WinMart, GO!, Tops Market, Circle K, GS25, Kmart, Bách Hóa Xanh và Mega Market.',
    tag: 'DISTRIBUTION',
  },
  {
    year: '2024',
    title: 'XUẤT KHẨU QUỐC TẾ',
    desc: 'Chính thức xuất khẩu sang thị trường Hàn Quốc & Đài Loan với các tiêu chuẩn khắt khe.',
    tag: 'EXPORT',
  },
  {
    year: '2025',
    title: 'XÚC TIẾN THƯƠNG MẠI & HỘI CHỢ',
    desc: 'Tham gia Hội chợ Giao thương Việt – Trung, tiếp tục mở rộng quan hệ hợp tác và thị trường tiêu chuẩn cao.',
    tag: 'PARTNERSHIP',
  },
]

export default function JourneyTimeline() {
  const ref = useReveal()

  return (
    <section id="hanh-trinh" className="py-20 md:py-32 bg-haq-bone relative overflow-hidden border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  04 / OUR JOURNEY
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase">
                HÀNH TRÌNH PHÁT TRIỂN
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              Các cột mốc phát triển thực tế khẳng định năng lực sản xuất, quy mô phân phối và uy tín thương hiệu HAQ FOOD.
            </p>
          </div>

          {/* Timeline Grid (Horizontal on lg, Vertical on sm/md) */}
          <div className="relative">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-[28px] inset-x-8 h-0.5 bg-black/10 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
              {JOURNEY_MILESTONES.map((item, idx) => (
                <div
                  key={item.year}
                  className="group bg-white rounded-2xl p-6 border border-black/5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Dot & Year */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-heading font-black text-2xl sm:text-3xl text-haq-red">
                        {item.year}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-haq-ink/50 bg-haq-bone px-2 py-0.5 rounded-sm">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-haq-ink group-hover:text-haq-red transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xs text-haq-ink/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-haq-ink/40">
                    <span>HAQ MILESTONE</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-haq-red" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
