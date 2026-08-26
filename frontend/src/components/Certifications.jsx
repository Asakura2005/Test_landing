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
    <section className="bg-haq-cream py-24 md:py-32 border-t border-haq-border">
      <div className="mx-auto max-w-site px-6 md:px-12">
        {/* Header */}
        <div ref={ref} className="reveal max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-haq-red" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-red">
              Bảo Chứng Chất Lượng
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-[-0.02em] text-haq-ink leading-[1.05]">
            Minh bạch tuyệt đối —
            <br />
            từ nguyên liệu đến đóng gói.
          </h2>
          <p className="mt-6 text-lg text-haq-text-secondary leading-[1.6]">
            Mỗi lô sản xuất được kiểm định và truy xuất nguồn gốc theo tiêu chuẩn quốc tế.
            Con dấu bảo chứng được khắc trực tiếp vào quy trình của chúng tôi.
          </p>
        </div>

        {/* Cert grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-haq-border border border-haq-border">
          {CERTS.map(({ code, label, Icon }) => (
            <div
              key={code}
              className="group bg-haq-cream p-8 md:p-10 flex flex-col min-h-[220px] hover:bg-white transition-colors"
            >
              <Icon className="w-8 h-8 text-haq-red mb-12" strokeWidth={1.6} />
              <div>
                <div className="font-heading font-extrabold text-xl md:text-2xl text-haq-ink tracking-tight">
                  {code}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-haq-text-secondary mt-3 leading-relaxed">
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
