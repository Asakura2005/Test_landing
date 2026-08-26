import React from 'react'
import {
  ShieldCheck,
  Factory,
  Layers,
  Sparkles,
  Truck,
  FileCheck2,
  ArrowRight,
} from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import factoryImg from '../assets/hero-factory.jpg'

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Tiêu Chuẩn ISO & HACCP',
    desc: 'Nhà xưởng và toàn bộ quy trình sản xuất được kiểm định, đạt chuẩn quốc tế ISO 22000 và HACCP.',
  },
  {
    icon: FileCheck2,
    title: 'Kiểm Soát & Lưu Mẫu Nghiêm Ngặt',
    desc: 'Kiểm soát chặt chẽ từ khâu tuyển chọn nguyên liệu đầu vào đến quy trình lưu mẫu từng lô sản phẩm xuất xưởng.',
  },
  {
    icon: Factory,
    title: 'Công Suất Lớn & Ổn Định',
    desc: 'Khả năng đáp ứng các đơn hàng quy mô lớn, giao hàng liên tục và đúng tiến độ cho các chuỗi siêu thị.',
  },
  {
    icon: Sparkles,
    title: 'Sản Xuất Theo Yêu Cầu (OEM / ODM)',
    desc: 'Nhận nghiên cứu công thức, gia công sản phẩm và đóng gói bao bì theo nhận diện thương hiệu riêng của đối tác.',
  },
  {
    icon: Truck,
    title: 'Logistics & Phân Phối Minh Bạch',
    desc: 'Quy trình xuất kho, kiểm định và vận chuyển đồng bộ, đảm bảo chất lượng hàng hóa tươi mới nhất.',
  },
]

const PROCESS_STEPS = [
  { step: '01', title: 'NGUYÊN LIỆU', desc: 'Tuyển chọn nguồn nguyên liệu có chứng nhận an toàn và kiểm tra vi sinh.' },
  { step: '02', title: 'CHẾ BIẾN', desc: 'Dây chuyền sấy nổ và chế biến khép kín, kiểm soát nhiệt độ và độ ẩm chuẩn.' },
  { step: '03', title: 'KIỂM ĐỊNH', desc: 'Kiểm tra cảm quan, vi sinh và lưu mẫu truy xuất nguồn gốc từng lô.' },
  { step: '04', title: 'ĐÓNG GÓI', desc: 'Bao bì tiêu chuẩn kín khí, in hạn sử dụng rõ ràng bằng máy công nghiệp.' },
  { step: '05', title: 'PHÂN PHỐI', desc: 'Giao hàng đúng tiến độ đến các hệ thống siêu thị và cảng xuất khẩu.' },
]

export default function CapabilitiesSection() {
  const ref = useReveal()

  return (
    <section id="nang-luc" className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  05 / NĂNG LỰC SẢN XUẤT (CAPABILITIES)
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                NĂNG LỰC SẢN XUẤT & <br />
                <span className="text-haq-red">TIÊU CHUẨN CHẤT LƯỢNG</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              Dây chuyền sản xuất hiện đại, quy trình kiểm soát khép kín và năng lực gia công OEM/ODM hàng đầu.
            </p>
          </div>

          {/* 5 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                    idx === 0
                      ? 'bg-haq-bone border-haq-red/30 shadow-sm'
                      : 'bg-white border-black/5 hover:border-black/20 hover:shadow-lg'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-haq-red/10 text-haq-red flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-haq-ink/40 uppercase tracking-widest block mb-1">
                    PILLAR 0{idx + 1}
                  </span>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-haq-ink uppercase mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              )
            })}

            {/* Special 6th Card: OEM / ODM CTA box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-haq-ink text-white border border-black/10 shadow-xl flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold text-haq-gold uppercase tracking-widest block mb-1">
                  OEM / ODM SOLUTION
                </span>
                <h3 className="font-heading font-black text-xl text-white uppercase mb-3">
                  GIA CÔNG THEO YÊU CẦU
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Tùy biến hương vị, quy cách đóng gói và thiết kế thương hiệu riêng cho các nhà phân phối và chuỗi bán lẻ.
                </p>
              </div>
              <a
                href="#hop-tac"
                className="mt-6 inline-flex items-center gap-2 text-xs font-mono font-bold text-haq-gold hover:text-white uppercase tracking-wider transition-colors"
              >
                <span>TÌM HIỂU DỊCH VỤ OEM / ODM →</span>
              </a>
            </div>
          </div>

          {/* Horizontal Production Process Strip */}
          <div className="p-8 sm:p-10 rounded-3xl bg-haq-bone border border-black/5">
            <div className="text-xs font-mono font-bold tracking-widest text-haq-red uppercase mb-8">
              QUY TRÌNH KIỂM SOÁT SẢN XUẤT 5 BƯỚC KHÉP KÍN
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {PROCESS_STEPS.map((ps, idx) => (
                <div key={ps.step} className="relative">
                  <div className="text-2xl font-mono font-black text-haq-red mb-2">
                    {ps.step}
                  </div>
                  <h4 className="font-heading font-black text-sm text-haq-ink uppercase mb-1">
                    {ps.title}
                  </h4>
                  <p className="text-xs text-haq-ink/70 leading-relaxed">
                    {ps.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
