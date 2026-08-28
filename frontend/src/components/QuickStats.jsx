import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Factory, Sparkles } from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    label: 'QUALITY',
    title: 'Chất Lượng Đồng Nhất',
    desc: 'Kiểm soát chặt chẽ từ nguyên liệu đầu vào, quy trình chế biến khép kín đến từng lô sản phẩm xuất xưởng.',
    icon: Sparkles,
  },
  {
    num: '02',
    label: 'ISO / HACCP',
    title: 'An Toàn Thực Phẩm',
    desc: 'Hệ thống quản lý chất lượng đạt chuẩn quốc tế ISO 22000 và HACCP, đảm bảo độ an toàn tuyệt đối.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    label: 'OEM / ODM',
    title: 'Giải Pháp Gia Công',
    desc: 'Năng lực sản xuất linh hoạt theo yêu cầu đối tác, hỗ trợ trọn gói từ công thức, bao bì đến hồ sơ công bố.',
    icon: Factory,
  },
]

export default function QuickStats() {
  return (
    <section id="nang-luc" className="w-full lg:h-[calc(100vh-72px)] lg:min-h-[580px] bg-white border-b border-haq-border flex items-center justify-center py-14 sm:py-18 lg:py-0">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 sm:mb-8 lg:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                TIÊU CHUẨN & NĂNG LỰC · CAPABILITY
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-haq-ink tracking-tight uppercase leading-tight">
              NỀN TẢNG SẢN XUẤT VỮNG CHẮC
            </h2>
          </div>

          <Link
            to="/nang-luc"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-bold text-[#16A34A] hover:text-[#0F5132] uppercase tracking-wider transition-colors group"
          >
            <span>XEM CHI TIẾT NĂNG LỰC</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.num}
                className="group bg-haq-sage rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-6 border border-haq-border hover:border-[#16A34A] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-[#16A34A]">
                      {pillar.num}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border border-haq-border flex items-center justify-center text-haq-ink shadow-2xs group-hover:bg-[#16A34A] group-hover:text-white group-hover:border-[#16A34A] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="font-heading text-[11px] sm:text-xs font-bold uppercase tracking-wider text-haq-text-secondary mb-1">
                    {pillar.label}
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-haq-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 border-t border-haq-border">
                  <Link
                    to="/nang-luc"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-[#16A34A] group-hover:text-[#0F5132] transition-colors"
                  >
                    <span>TÌM HIỂU THÊM</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
