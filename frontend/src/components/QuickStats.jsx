import React from 'react'
import { ShieldCheck, CheckCircle2, FileCheck, Sparkles } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const TRUST_PILLARS = [
  {
    code: 'ISO 22000',
    title: 'HỆ THỐNG QUẢN LÝ',
    desc: 'Chứng nhận tiêu chuẩn quốc tế về an toàn vệ sinh thực phẩm.',
  },
  {
    code: 'HACCP',
    title: 'KIỂM SOÁT MỐI NGUY',
    desc: 'Quy trình kiểm soát rủi ro từ khâu nguyên liệu đến thành phẩm.',
  },
  {
    code: 'QUALITY CONTROL',
    title: 'LƯU MẪU TỪNG LÔ',
    desc: 'Kiểm tra cảm quan, vi sinh và lưu mẫu nghiêm ngặt trước khi xuất kho.',
  },
  {
    code: 'TRANSPARENCY',
    title: 'MINH BẠCH QUY TRÌNH',
    desc: 'Hệ thống truy xuất nguồn gốc rõ ràng, cam kết chất lượng đồng nhất.',
  },
]

export default function QuickStats() {
  const ref = useReveal()

  return (
    <section className="bg-haq-ink text-white py-14 sm:py-18 border-y border-white/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-4 h-4 text-haq-gold" />
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
              TIÊU CHUẨN CHẤT LƯỢNG & MINH BẠCH (TRUST & QUALITY)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {TRUST_PILLARS.map((item, idx) => (
              <div
                key={item.code}
                className={`flex flex-col justify-between ${idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''}`}
              >
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-haq-gold tracking-tight uppercase">
                    {item.code}
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider mt-2">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-white/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-haq-gold/80" />
                  <span>XÁC NHẬN CHÍNH THỨC</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
