import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import coreValuesPentagonImg from '../assets/core_values_pentagon.jpg'

export default function VisionSection({ className = '' }) {
  const ref = useReveal()
  const { t } = useLanguage()

  return (
    <section
      id="tam-nhin"
      className={`font-sans scroll-mt-20 ${className}`}
    >
      <div ref={ref} className="reveal">

        {/* ═══════════════════════════════════════════════════════
            TẦM NHÌN + SỨ MỆNH — 2 columns full-bleed (Symmetrical & Balanced)
            ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* TẦM NHÌN */}
          <div className="bg-[#0C1E15] text-white px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 flex flex-col justify-between">
            <div className="max-w-xl mx-auto lg:mx-0 w-full">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="h-px w-6 bg-[#16A34A]" />
                <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#16A34A] uppercase">
                  Tầm nhìn
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-snug tracking-tight mb-6 min-h-[4rem]">
                Trở thành doanh nghiệp tiên phong sản xuất và phân phối đồ ăn vặt tại Việt Nam, vươn tầm các thị trường tiêu chuẩn cao.
              </h3>

              <div className="h-px w-full bg-white/10 mb-6" />

              <div className="space-y-3.5">
                {[
                  {
                    title: 'Thị trường nội địa',
                    desc: 'Dẫn đầu ngành hàng đồ ăn vặt với hệ thống phân phối sâu rộng phủ sóng trên toàn quốc.',
                  },
                  {
                    title: 'Vươn tầm quốc tế',
                    desc: 'Mở rộng xuất khẩu chính ngạch sang Nhật Bản, Hàn Quốc và các thị trường tiềm năng châu Á.',
                  },
                  {
                    title: 'Chuẩn mực tiên phong',
                    desc: 'Đầu tư công nghệ hiện đại, chuẩn hóa chất lượng và nâng tầm giá trị nông sản Việt Nam.',
                  },
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-[#16A34A] font-bold shrink-0 mt-0.5">&mdash;</span>
                    <p className="text-white/80 leading-relaxed text-sm">
                      <strong className="font-heading font-bold text-white mr-1.5">{point.title}:</strong>
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SỨ MỆNH */}
          <div className="bg-[#F4F8F4] text-haq-ink px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 flex flex-col justify-between">
            <div className="max-w-xl mx-auto lg:mx-0 w-full">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="h-px w-6 bg-[#C89B3C]" />
                <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#C89B3C] uppercase">
                  Sứ mệnh
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-haq-ink leading-snug tracking-tight mb-6 min-h-[4rem]">
                Mang đến sản phẩm ngon – an toàn – đạt chuẩn, đáp ứng nhu cầu ngày càng cao của người tiêu dùng và đối tác.
              </h3>

              <div className="h-px w-full bg-haq-border mb-6" />

              <div className="space-y-3.5">
                {[
                  {
                    title: 'Sản phẩm ngon',
                    desc: 'Giữ trọn vị đậm đà, giòn rụm từ bí quyết và công thức ẩm thực truyền thống Việt Nam.',
                  },
                  {
                    title: 'An toàn tuyệt đối',
                    desc: 'Nguồn nguyên liệu sạch, không dầu chiên tồn dư, kiểm soát nghiêm ngặt các chỉ tiêu vi sinh.',
                  },
                  {
                    title: 'Đạt chuẩn quốc tế',
                    desc: 'Quy trình sản xuất khép kín, chuẩn hóa toàn diện theo chứng nhận ISO 22000 & HACCP.',
                  },
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-[#C89B3C] font-bold shrink-0 mt-0.5">&mdash;</span>
                    <p className="text-haq-text-secondary leading-relaxed text-sm">
                      <strong className="font-heading font-bold text-haq-ink mr-1.5">{point.title}:</strong>
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            GIÁ TRỊ CỐT LÕI
            ═══════════════════════════════════════════════════════ */}
        <div className="bg-white border-t border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-14 sm:py-20">

            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-6 bg-[#C89B3C]" />
                <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#C89B3C] uppercase">
                  Nền tảng văn hóa doanh nghiệp
                </span>
                <div className="h-px w-6 bg-[#C89B3C]" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink uppercase tracking-tight">
                5 giá trị cốt lõi
              </h3>
            </div>

            <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
              <img
                src={coreValuesPentagonImg}
                alt="HAQ FOOD - 5 giá trị cốt lõi"
                className="w-full block"
                style={{ maxHeight: '480px', objectFit: 'contain', objectPosition: 'center' }}
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { num: '01', title: 'Chất lượng là nền tảng', desc: 'Kiểm soát từ nguyên liệu đến thành phẩm, đảm bảo mọi lô hàng đạt chuẩn đồng nhất.' },
                { num: '02', title: 'Minh bạch quy trình', desc: 'Công khai nguồn gốc xuất xứ, quy trình sản xuất và chứng nhận an toàn thực phẩm.' },
                { num: '03', title: 'Đổi mới sản phẩm', desc: 'Nghiên cứu công thức mới, cải tiến bao bì và ứng dụng công nghệ sấy sạch hiện đại.' },
                { num: '04', title: 'Hợp tác bền vững', desc: 'Xây dựng quan hệ lâu dài với nhà cung cấp và khách hàng trên nguyên tắc cùng phát triển.' },
                { num: '05', title: 'Khách hàng là trung tâm', desc: 'Lắng nghe phản hồi, đáp ứng nhanh và đặt trải nghiệm người dùng lên hàng đầu.' },
              ].map((val) => (
                <div
                  key={val.num}
                  className="bg-[#FAFAF8] rounded-xl p-5 sm:p-6 border border-haq-border hover:border-[#16A34A]/30 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-heading font-extrabold text-2xl block mb-3 text-haq-border">
                      {val.num}
                    </span>
                    <h4 className="font-heading font-bold text-[13px] text-haq-ink uppercase tracking-wide mb-2 leading-snug">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-[12px] text-haq-text-secondary leading-relaxed mt-2">{val.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
