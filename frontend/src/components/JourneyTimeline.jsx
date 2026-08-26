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
      className="relative bg-haq-bone py-20 sm:py-28 border-b border-black/5 overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
              HÀNH TRÌNH PHÁT TRIỂN · COMPANY STORY
            </span>
            <span className="h-px w-10 bg-haq-red" />
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
            HÀNH TRÌNH TỪ <span className="text-haq-red">2021 ĐẾN 2025</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
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
                className="group relative bg-white rounded-3xl p-6 border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Big Year Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-haq-ink group-hover:text-haq-red transition-colors tracking-tight">
                      {item.year}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-haq-bone group-hover:bg-haq-red group-hover:text-white text-haq-ink flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-wider mb-2">
                    {item.badge}
                  </div>

                  <h3 className="font-heading font-black text-sm sm:text-base text-haq-ink uppercase leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-haq-ink/70 leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-haq-ink/40">
                  <span>MỐC 0{idx + 1}</span>
                  <span>HAQ FOOD</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
