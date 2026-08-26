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
    <section id="nang-luc" className="py-24 sm:py-32 bg-white border-b border-haq-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
                TIÊU CHUẨN & NĂNG LỰC · CAPABILITY
              </span>
              <span className="h-px w-10 bg-[#16A34A]" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.num}
                className="group bg-haq-sage rounded-3xl p-8 sm:p-10 border border-haq-border hover:border-[#16A34A] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-[#16A34A]">
                      {pillar.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-haq-border flex items-center justify-center text-haq-ink shadow-2xs group-hover:bg-[#16A34A] group-hover:text-white group-hover:border-[#16A34A] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="font-heading text-xs font-bold uppercase tracking-wider text-haq-text-secondary mb-1">
                    {pillar.label}
                  </div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-haq-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-haq-border">
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
