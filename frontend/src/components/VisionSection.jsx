import React from 'react'
import { Compass, Sparkles } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const EXPANSION_PATH = [
  { code: 'VIETNAM', name: 'Việt Nam', status: 'NỀN TẢNG NỘI ĐỊA', current: true },
  { code: 'SOUTH KOREA', name: 'Hàn Quốc', status: 'XUẤT KHẨU CHÍNH NGẠCH', current: true },
  { code: 'TAIWAN', name: 'Đài Loan', status: 'XUẤT KHẨU CHÍNH NGẠCH', current: true },
  { code: 'JAPAN', name: 'Nhật Bản', status: 'ĐỊNH HƯỚNG MỞ RỘNG', current: false },
  { code: 'ASIA', name: 'Thị Trường Châu Á', status: 'ĐỊNH HƯỚNG MỞ RỘNG', current: false },
]

const CORE_VALUES = [
  'QUALITY FIRST',
  'TRANSPARENCY',
  'INNOVATION',
  'SUSTAINABLE PARTNERSHIP',
  'CUSTOMER-CENTRIC APPROACH',
]

export default function VisionSection() {
  const ref = useReveal()

  return (
    <section id="tam-nhin" className="py-20 md:py-32 bg-white relative overflow-hidden border-t border-haq-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  08 / TẦM NHÌN & GIÁ TRỊ (FUTURE)
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase max-w-3xl leading-tight">
                TỪ THỊ TRƯỜNG VIỆT NAM <br />
                <span className="text-haq-red">ĐẾN NHỮNG TIÊU CHUẨN CAO HƠN</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-text-secondary max-w-md leading-relaxed">
              HAQ hướng tới trở thành doanh nghiệp tiên phong và dẫn đầu trong lĩnh vực sản xuất – phân phối đồ ăn vặt tại Việt Nam và mở rộng sang các thị trường tiêu chuẩn cao.
            </p>
          </div>

          {/* Expansion Path Horizontal Flow */}
          <div className="p-8 sm:p-10 rounded-3xl bg-haq-cream border border-haq-border shadow-2xs mb-12">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-haq-red uppercase mb-8">
              <Compass className="w-4 h-4" />
              <span>LỘ TRÌNH PHÁT TRIỂN THỊ TRƯỜNG CHIẾN LƯỢC</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {EXPANSION_PATH.map((item, idx) => (
                <div
                  key={item.code}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.current
                      ? 'bg-white border-haq-red shadow-xs'
                      : 'bg-white/70 border-haq-border border-dashed'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className={item.current ? 'text-haq-red font-bold' : 'text-haq-text-secondary'}>
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        item.current
                          ? 'bg-haq-red/10 text-haq-red'
                          : 'bg-haq-soft text-haq-text-secondary'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-haq-ink uppercase">
                    {item.name}
                  </h3>
                  <div className="text-[11px] font-mono text-haq-text-secondary mt-1">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values Typography Flow */}
          <div className="pt-8 border-t border-haq-border">
            <div className="text-xs font-mono font-bold tracking-widest text-haq-text-secondary uppercase mb-4 text-center">
              GIÁ TRỊ CỐT LÕI (CORE VALUES)
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {CORE_VALUES.map((val) => (
                <span
                  key={val}
                  className="px-5 py-2.5 rounded-full bg-haq-dark text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-haq-red transition-colors shadow-2xs"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
