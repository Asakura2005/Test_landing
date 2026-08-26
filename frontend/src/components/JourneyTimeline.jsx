import React from 'react'
import { Calendar, Flag, CheckCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const MILESTONES = [
  {
    year: '2021',
    tag: 'FOUNDATION',
    title: 'Thành Lập Doanh Nghiệp',
    desc: 'Thành lập công ty; hoàn thiện dây chuyền sản xuất bánh tráng trộn và bắt đầu ký kết hợp đồng với nhiều đơn vị khách hàng.',
    highlight: true,
  },
  {
    year: '2022',
    tag: 'EXPANSION',
    title: 'Mở Rộng Danh Mục Sản Phẩm',
    desc: 'Bổ sung các dòng sản phẩm chiến lược: bánh đậu xanh, bánh hạnh nhân, bắp rang bơ, thịt khô cao cấp.',
  },
  {
    year: '2023',
    tag: 'RETAIL CHAINS',
    title: 'Phủ Sóng Hệ Thống Bán Lẻ Lớn',
    desc: 'Hiện diện vững chắc tại WinMart, GO!, Tops Market, Circle K, GS25, Kmart, Bách Hóa Xanh, Mega Market.',
  },
  {
    year: '2024',
    tag: 'EXPORT',
    title: 'Xuất Khẩu Hàn Quốc & Đài Loan',
    desc: 'Mở rộng thị trường xuất khẩu sang Hàn Quốc và Đài Loan, đáp ứng đầy đủ tiêu chuẩn kiểm định an toàn nghiêm ngặt.',
  },
  {
    year: '2025',
    tag: 'GLOBAL REACH',
    title: 'Xúc Tiến Thương Mại Quốc Tế',
    desc: 'Tham gia Hội chợ Giao thương Việt – Trung 2025, định hướng mở rộng thị trường sang Nhật Bản và các nước châu Á.',
  },
]

export default function JourneyTimeline() {
  const ref = useReveal()

  return (
    <section id="hanh-trinh" className="py-20 md:py-32 bg-haq-bone relative border-t border-black/10 overflow-hidden">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  04 / HÀNH TRÌNH (OUR JOURNEY)
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                HÀNH TRÌNH KHẲNG ĐỊNH <br />
                <span className="text-haq-red">VỊ THẾ (2021 – 2025)</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              Từng bước xây dựng năng lực sản xuất, khẳng định chất lượng tại thị trường Việt Nam và vươn ra quốc tế.
            </p>
          </div>

          {/* Desktop Horizontal / Mobile Vertical Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[28px] left-6 right-6 h-0.5 bg-black/15 z-0" />

            {MILESTONES.map((item, idx) => (
              <div
                key={item.year}
                className="relative z-10 flex flex-col justify-between group"
              >
                {/* Year Marker Node */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-base shadow-sm border transition-all duration-300 ${
                      item.highlight
                        ? 'bg-haq-red text-white border-haq-red shadow-haq-red/20'
                        : 'bg-white text-haq-ink border-black/10 group-hover:border-haq-red group-hover:text-haq-red group-hover:shadow-md'
                    }`}
                  >
                    {item.year}
                  </div>
                  <span className="md:hidden font-mono text-xs font-bold tracking-wider text-haq-red uppercase">
                    {item.tag}
                  </span>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl p-6 border border-black/5 group-hover:border-black/20 shadow-2xs group-hover:shadow-lg transition-all duration-300 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="hidden md:block font-mono text-[10px] font-bold tracking-widest text-haq-red uppercase mb-2">
                      {item.tag}
                    </span>
                    <h3 className="font-heading font-extrabold text-base text-haq-ink group-hover:text-haq-red transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs text-haq-ink/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-haq-ink/40">
                    <span>CỘT MỐC 0{idx + 1}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-haq-red/60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
