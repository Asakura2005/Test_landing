import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Cpu, ShieldCheck, Truck } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const STEPS = [
  {
    step: '01',
    title: 'NGUYÊN LIỆU',
    subtitle: 'Nguồn gốc minh bạch',
    desc: 'Lựa chọn nông sản, tôm, ớt và gia vị tự nhiên từ các vùng nguyên liệu đạt chuẩn chất lượng.',
    icon: Leaf,
  },
  {
    step: '02',
    title: 'SẢN XUẤT',
    subtitle: 'Công nghệ khép kín',
    desc: 'Hệ thống máy móc sấy giòn, phối trộn và đóng gói hiện đại, đảm bảo vệ sinh và giữ trọn hương vị.',
    icon: Cpu,
  },
  {
    step: '03',
    title: 'KIỂM SOÁT',
    subtitle: 'Chuẩn ISO & HACCP',
    desc: 'Kiểm nghiệm chỉ tiêu lý hóa vi sinh, lưu mẫu từng lô hàng và truy xuất nguồn gốc rõ ràng.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'PHÂN PHỐI',
    subtitle: 'Mạng lưới toàn quốc',
    desc: 'Cung ứng ổn định, nhanh chóng tới các chuỗi siêu thị, cửa hàng tiện lợi và đối tác quốc tế.',
    icon: Truck,
  },
]

export default function CapabilitiesSection() {
  const ref = useReveal()

  return (
    <section id="nang-luc" className="py-20 md:py-32 bg-haq-ink text-white relative overflow-hidden">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
                  03 / CAPABILITY
                </span>
                <span className="h-px w-10 bg-haq-gold" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
                TỪ NGUYÊN LIỆU <br />
                <span className="text-haq-gold">ĐẾN SẢN PHẨM</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
              Quy trình sản xuất 4 bước chuẩn mực tạo nên giá trị bền vững và niềm tin với các đối tác bán lẻ hàng đầu.
            </p>
          </div>

          {/* 4-Step Horizontal Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {STEPS.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="group bg-white/5 hover:bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-haq-gold/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-3xl font-black text-haq-gold">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-haq-gold/20 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-haq-gold" />
                      </div>
                    </div>

                    <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono font-bold text-haq-gold mt-1">
                      {item.subtitle}
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-white/40 group-hover:text-haq-gold transition-colors flex items-center justify-between">
                    <span>HAQ STANDARD</span>
                    <span>→</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Note & CTA */}
          <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs sm:text-sm text-white/80 font-medium">
              Sẵn sàng cung ứng sản lượng lớn và hỗ trợ gia công OEM/ODM theo yêu cầu đối tác.
            </div>
            <Link
              to="/gioi-thieu#nang-luc"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-haq-gold hover:text-white transition-colors shrink-0"
            >
              <span>TÌM HIỂU NĂNG LỰC SẢN XUẤT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
