import React from 'react'
import { Sparkles, Milestone, ArrowRight, Building2, Globe2, Truck, Award } from 'lucide-react'

const MILESTONES = [
  {
    year: '2021',
    title: 'Khởi đầu & Đặt nền móng',
    desc: 'Thành lập Công ty Cổ phần HAQ Hà Nội. Ra mắt dòng Bánh tráng trộn và Bánh tráng sấy giòn trên dây chuyền tự động.',
    icon: Building2,
    badge: 'ESTABLISHED',
  },
  {
    year: '2022',
    title: 'Mở rộng dải sản phẩm',
    desc: 'Phát triển các dòng bánh nướng thượng hạng (Bánh hạnh nhân, Bánh đậu xanh tươi) và đồ ăn vặt đóng gói ăn liền.',
    icon: Sparkles,
    badge: 'EXPANSION',
  },
  {
    year: '2023',
    title: 'Phủ sóng toàn quốc',
    desc: 'Hiện diện tại các chuỗi bán lẻ hàng đầu: WinMart, GO!, Tops Market, Circle K, GS25, Kmart, Bách Hóa Xanh.',
    icon: Truck,
    badge: 'NATIONAL REACH',
  },
  {
    year: '2024',
    title: 'Vươn tầm xuất khẩu',
    desc: 'Đạt chứng nhận an toàn thực phẩm ISO 22000 & HACCP, xuất khẩu chính ngạch sang thị trường Hàn Quốc và Đài Loan.',
    icon: Globe2,
    badge: 'GLOBAL EXPORT',
  },
  {
    year: '2025',
    title: 'Đối tác B2B & Nâng cấp công nghệ',
    desc: 'Mở rộng hợp tác OEM/ODM, nâng cấp công suất sấy nổ hiện đại và phát triển mạng lưới phân phối đa kênh quốc tế.',
    icon: Award,
    badge: 'STRATEGIC GROWTH',
  },
]

export default function JourneyTimeline() {
  return (
    <section
      id="hanh-trinh"
      aria-label="Hành trình phát triển HAQ FOOD"
      className="relative bg-white py-20 sm:py-28 border-b border-haq-border overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
              HÀNH TRÌNH PHÁT TRIỂN · COMPANY STORY
            </span>
            <span className="h-px w-10 bg-[#16A34A]" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
            HÀNH TRÌNH TỪ <span className="text-[#16A34A]">2021 ĐẾN NAY</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
            Mỗi cột mốc là một bước tiến vững chắc trong việc chuẩn hóa chất lượng,
            mở rộng quy mô công nghiệp và khẳng định giá trị nông sản chế biến Việt Nam.
          </p>
        </div>

        {/* 5-Step Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {MILESTONES.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.year}
                className="group relative bg-haq-sage/30 rounded-3xl p-6 border border-haq-border hover:border-[#16A34A] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Big Year Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink group-hover:text-[#16A34A] transition-colors tracking-tight">
                      {item.year}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white group-hover:bg-[#16A34A] group-hover:text-white text-haq-green-dark border border-haq-border flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="font-heading text-[10px] font-bold text-[#16A34A] uppercase tracking-wider mb-2">
                    {item.badge}
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-haq-ink uppercase leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-haq-text-secondary leading-relaxed mt-2.5 font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-haq-border flex items-center justify-between text-[10px] font-heading font-medium text-haq-text-secondary">
                  <span>MỐC 0{idx + 1}</span>
                  <span className="font-semibold text-haq-green-dark">HAQ FOOD</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
