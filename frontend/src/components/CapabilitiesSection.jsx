import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, CheckCircle, Factory, PackageCheck, Truck, ArrowDown } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const PILLARS = [
  {
    num: '01',
    title: 'ISO – HACCP',
    subtitle: 'Chứng nhận tiêu chuẩn quốc tế',
    desc: 'Hệ thống nhà xưởng và dây chuyền sản xuất đạt chứng nhận ISO 22000 và HACCP nghiêm ngặt.',
  },
  {
    num: '02',
    title: 'QUALITY CONTROL',
    subtitle: 'Kiểm soát đa tầng',
    desc: 'Kiểm tra chất lượng từ khâu tiếp nhận nguyên liệu, giám sát quá trình chế biến đến lưu mẫu từng lô xuất xưởng.',
  },
  {
    num: '03',
    title: 'LARGE PRODUCTION',
    subtitle: 'Quy mô sản lượng lớn',
    desc: 'Dây chuyền máy móc hiện đại đáp ứng ổn định và liên tục các đơn đặt hàng số lượng lớn của chuỗi bán lẻ.',
  },
  {
    num: '04',
    title: 'OEM / ODM',
    subtitle: 'Gia công theo yêu cầu',
    desc: 'Cung cấp dịch vụ nghiên cứu công thức, gia công sản phẩm và đóng gói bao bì theo tiêu chuẩn riêng của đối tác.',
  },
  {
    num: '05',
    title: 'TRANSPARENT LOGISTICS',
    subtitle: 'Xuất kho minh bạch',
    desc: 'Quy trình lưu kho bảo quản tiêu chuẩn, quản lý lô date rõ ràng và truy xuất nguồn gốc nhanh chóng.',
  },
]

const PROCESS_STEPS = [
  { step: '01', name: 'RAW MATERIAL', desc: 'Nguyên liệu tự nhiên chọn lọc' },
  { step: '02', name: 'QUALITY CONTROL', desc: 'Kiểm định chất lượng đầu vào' },
  { step: '03', name: 'PRODUCTION', desc: 'Chế biến & đóng gói khép kín' },
  { step: '04', name: 'STORAGE', desc: 'Lưu kho & bảo quản chuẩn ISO' },
  { step: '05', name: 'DISTRIBUTION', desc: 'Vận chuyển & phân phối toàn quốc' },
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
                  05 / PRODUCTION
                </span>
                <span className="h-px w-10 bg-haq-gold" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
                TỪ NGUYÊN LIỆU <br />
                <span className="text-haq-gold">ĐẾN SẢN PHẨM</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
              Quy trình sản xuất khép kín và năng lực cung ứng chuẩn mực từ hồ sơ năng lực chính thức của HAQ FOOD.
            </p>
          </div>

          {/* Process Timeline Bar */}
          <div className="mb-14 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs font-mono font-bold tracking-widest text-haq-gold uppercase mb-4">
              QUY TRÌNH KIỂM SOÁT SẢN XUẤT
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PROCESS_STEPS.map((ps, idx) => (
                <div key={ps.step} className="flex flex-col">
                  <div className="flex items-center gap-2 text-haq-gold font-mono text-xs font-bold">
                    <span>{ps.step}</span>
                    <span className="h-px w-6 bg-haq-gold/40" />
                    {idx < 4 && <span className="hidden lg:inline text-white/30 text-xs">→</span>}
                  </div>
                  <div className="text-sm font-heading font-bold text-white mt-1">
                    {ps.name}
                  </div>
                  <div className="text-xs text-white/60 mt-0.5">
                    {ps.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Production Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="group bg-white/5 hover:bg-white/10 rounded-2xl p-7 border border-white/10 hover:border-haq-gold/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-haq-gold">
                      {pillar.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">
                      CAPABILITY
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-haq-gold mt-1">
                    {pillar.subtitle}
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-white/40 group-hover:text-haq-gold transition-colors flex items-center justify-between">
                  <span>HAQ STANDARD</span>
                  <span>✓</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note & CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-xs sm:text-sm text-white/80 font-medium">
              Sẵn sàng hợp tác OEM/ODM và cung ứng đơn hàng phân phối lớn trên toàn quốc & quốc tế.
            </div>
            <Link
              to="/lien-he"
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-haq-gold hover:text-white transition-colors shrink-0"
            >
              <span>LIÊN HỆ HỢP TÁC OEM / ODM</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
