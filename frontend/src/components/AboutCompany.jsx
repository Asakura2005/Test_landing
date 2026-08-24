import React from 'react'
import { useReveal } from '../hooks/useReveal'

const VALUES = [
  'Chất lượng là nền tảng – Quality First.',
  'Minh bạch quy trình – Transparency.',
  'Đổi mới sản phẩm – Innovation.',
  'Hợp tác bền vững – Sustainable Partnership.',
  'Lấy khách hàng làm trung tâm – Customer-centric Approach.',
]

const TIMELINE = [
  { year: '2021', text: 'Thành lập công ty; hoàn thiện dây chuyền bánh tráng trộn và ký kết khách hàng đầu tiên.' },
  { year: '2022', text: 'Mở rộng sang bánh đậu xanh, bánh hạnh nhân, bắp rang bơ và thịt khô.' },
  { year: '2023', text: 'Phủ sóng tại Go, WinMart, Circle K, GS25, Kmart, Bách Hóa Xanh.' },
  { year: '2024', text: 'Xuất khẩu sang Hàn Quốc và Đài Loan.' },
  { year: '2025', text: 'Tham gia Hội chợ Giao thương Việt – Trung.' },
]

const DISTRIBUTION = [
  'WinMart', 'Big C – GO!', 'Circle K',
  'GS25', 'Kmart', 'Bách Hóa Xanh',
]

export default function AboutCompany() {
  const ref = useReveal()

  return (
    <section className="bg-white py-24 md:py-32 border-y border-black/10">
      <div className="mx-auto max-w-site px-6 md:px-12">
        <div ref={ref} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-haq-red" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-red">
                Về HAQ Hà Nội
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-haq-ink">
              CÔNG TY CỔ PHẦN HAQ HÀ NỘI
            </h2>
            <p className="mt-8 text-lg leading-[1.7] text-haq-ink/70">
              HAQ Hà Nội được thành lập trong bối cảnh thị trường thực phẩm ngày càng yêu cầu cao
              về an toàn thực phẩm, tính minh bạch, chất lượng sản phẩm và sự đa dạng về khẩu vị.
            </p>
            <p className="mt-4 text-lg leading-[1.7] text-haq-ink/70">
              Công ty hướng tới các sản phẩm đồ ăn vặt mang hương vị Việt Nam, phù hợp nhu cầu của
              người tiêu dùng hiện đại và các đối tác phân phối B2B. Triết lý xuyên suốt của doanh nghiệp là <strong>“Chất lượng là cốt lõi của thương hiệu”</strong>.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Thành lập', '2021'],
                ['Thị trường', 'VN · KR · TW'],
                ['Chứng nhận', 'ISO · HACCP'],
                ['Mô hình', 'OEM · ODM'],
              ].map(([label, value]) => (
                <div key={label} className="border border-black/10 p-5 bg-haq-bone/40 hover:bg-haq-ink hover:text-white group transition-colors">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-haq-ink/50 group-hover:text-white/60 transition-colors">{label}</div>
                  <div className="mt-2 font-heading font-extrabold text-xl text-haq-ink group-hover:text-white transition-colors break-words">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-12 mt-16 lg:mt-0">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs tracking-widest uppercase text-haq-orange font-bold">Định Hướng</span>
                <span className="h-px flex-1 bg-black/10" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-haq-ink mb-6">Tầm Nhìn & Sứ Mệnh</h3>
              <p className="text-haq-ink/75 leading-[1.8] text-lg">
                Trở thành doanh nghiệp tiên phong và dẫn đầu trong lĩnh vực sản xuất – phân phối đồ ăn vặt tại Việt Nam. Xây dựng thương hiệu bảo chứng cho chất lượng, an toàn vệ sinh và năng lực cung ứng vững vàng cho kênh bán lẻ hiện đại (MT).
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs tracking-widest uppercase text-haq-orange font-bold">Giá Trị Cốt Lõi</span>
                <span className="h-px flex-1 bg-black/10" />
              </div>
              <div className="space-y-5">
                {VALUES.map((v, i) => (
                  <div key={i} className="flex items-center gap-5 border-b border-black/5 pb-5 last:border-0 hover:pl-2 transition-all duration-300">
                    <span className="font-mono font-bold text-haq-red shrink-0 text-sm">0{i + 1}</span>
                    <span className="font-medium text-haq-ink/80 text-base">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <a 
              href="/company-profile" 
              className="inline-flex items-center gap-2 text-haq-red font-bold hover:text-haq-orange transition-colors group mt-4 text-lg"
            >
              Khám phá năng lực cốt lõi
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-16 border-t border-black/10">
          <div className="bg-haq-bone p-8 md:p-12">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-haq-red font-bold mb-8">Hành trình phát triển</div>
            <div className="space-y-6">
              {TIMELINE.map((item) => (
                <div key={item.year} className="grid grid-cols-[80px_1fr] gap-4 items-start group">
                  <div className="font-heading font-extrabold text-2xl text-haq-ink group-hover:text-haq-orange transition-colors">{item.year}</div>
                  <p className="text-haq-ink/75 leading-[1.7] text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-haq-bone p-8 md:p-12">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-haq-red font-bold mb-8">Hệ thống phân phối</div>
            <p className="text-haq-ink/75 leading-[1.8] text-lg mb-8">
              HAQ Hà Nội hiện diện tại nhiều chuỗi bán lẻ lớn trong nước và đang mở rộng sang thị trường quốc tế
              như Hàn Quốc, Đài Loan; đồng thời hướng tới Nhật Bản và các thị trường châu Á tiêu chuẩn cao.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {DISTRIBUTION.map((item) => (
                <span key={item} className="px-5 py-2.5 bg-white border border-black/10 text-sm font-semibold text-haq-ink/80 hover:bg-haq-ink hover:text-white transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-haq-ink/75 leading-[1.8]">
              Công ty là đối tác của nhiều hệ thống như WinMart, Circle K, GS25, Kmart, GO!
              và Bách Hóa Xanh.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
