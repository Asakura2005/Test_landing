import React from 'react'
import { ShieldCheck, Award, Settings, Search } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const CERTS = [
  { code: 'ISO', label: 'Quản lý chất lượng & an toàn', Icon: ShieldCheck },
  { code: 'HACCP', label: 'Phân tích mối nguy điểm tới hạn', Icon: Award },
  { code: 'OEM/ODM', label: 'Sản xuất theo yêu cầu đối tác', Icon: Settings },
  { code: 'MINH BẠCH', label: 'Kiểm soát chặt chẽ nguyên liệu', Icon: Search },
]

export default function Certifications() {
  const ref = useReveal()

  return (
    <section className="bg-haq-sage/40 py-24 md:py-32 border-t border-haq-border">
      <div className="mx-auto max-w-site px-6 md:px-12">
        {/* Header */}
        <div ref={ref} className="reveal max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-[#16A34A]" />
            <span className="font-heading text-xs tracking-wider uppercase text-[#16A34A] font-bold">
              BẢO CHỨNG CHẤT LƯỢNG · CERTIFICATIONS
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight text-haq-ink leading-[1.1]">
            Minh bạch tuyệt đối —
            <br />
            từ nguyên liệu đến đóng gói.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-haq-text-secondary leading-relaxed font-normal">
            Mỗi lô sản xuất được kiểm định và truy xuất nguồn gốc theo tiêu chuẩn quốc tế.
            Con dấu bảo chứng chất lượng được duy trì nghiêm ngặt trong mọi khâu vận hành.
          </p>
        </div>

        {/* Cert grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-haq-border border border-haq-border rounded-3xl overflow-hidden shadow-2xs">
          {CERTS.map(({ code, label, Icon }) => (
            <div
              key={code}
              className="group bg-white p-8 md:p-10 flex flex-col min-h-[220px] hover:bg-haq-sage/30 transition-colors"
            >
              <Icon className="w-8 h-8 text-[#16A34A] mb-12 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
              <div>
                <div className="font-heading font-bold text-xl md:text-2xl text-haq-ink tracking-tight">
                  {code}
                </div>
                <div className="font-heading text-xs uppercase tracking-wider text-haq-text-secondary mt-3 leading-relaxed font-medium">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
