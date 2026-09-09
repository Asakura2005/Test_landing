import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import { Award, ShieldCheck, FileCheck, FileText, ZoomIn, X, ExternalLink } from 'lucide-react'

// =========================================================================
// HƯỚNG DẪN ĐẨY ẢNH BẰNG CHỨNG KIỂM ĐỊNH:
// 1. Lưu file ảnh chứng thư / phiếu kiểm nghiệm vào: src/assets/quality/
//    (ví dụ: cert_iso.jpg, cert_haccp.jpg, test_report.jpg, vsattp.jpg)
// 2. Bỏ chú thích và import ảnh ở bên dưới:
//    import certIsoImg from '../assets/quality/cert_iso.jpg'
// 3. Điền biến ảnh vào trường `image` của từng mục trong mảng CERTS.
// =========================================================================

export default function Certifications({ className = '' }) {
  const ref = useReveal()
  const { language } = useLanguage()
  const isEn = language === 'en'

  // State quản lý xem ảnh phóng to (Lightbox)
  const [activeCert, setActiveCert] = useState(null)

  const CERTS = [
    {
      id: 'iso',
      tag: 'STANDARD 01',
      code: 'ISO 22000:2018',
      title: isEn ? 'Food Safety Management System' : 'Hệ Thống Quản Lý An Toàn Thực Phẩm',
      issuer: isEn ? 'International Certification' : 'Chứng nhận Quốc tế',
      desc: isEn 
        ? 'Closed convection drying line, strict temperature control and zero oil residue standards.' 
        : 'Chứng nhận toàn bộ dây chuyền sản xuất sấy đối lưu và chế biến khép kín đạt tiêu chuẩn quốc tế.',
      // 👉 Gán ảnh chứng chỉ ISO vào đây: image: certIsoImg
      image: null,
      badge: 'ISO 22000',
      icon: Award,
    },
    {
      id: 'haccp',
      tag: 'STANDARD 02',
      code: 'HACCP CODEX',
      title: isEn ? 'Critical Hazard Control' : 'Hệ Thống Phân Tích Mối Nguy & Điểm Kiểm Soát Tới Hạn',
      issuer: isEn ? 'Codex Alimentarius' : 'Tiêu chuẩn Codex Quốc tế',
      desc: isEn 
        ? 'Comprehensive biological, chemical, and physical risk prevention across processing stages.' 
        : 'Kiểm soát nghiêm ngặt rủi ro vi sinh, vật lý và hóa học; loại trừ hoàn toàn nguy cơ lây nhiễm chéo.',
      // 👉 Gán ảnh chứng chỉ HACCP vào đây: image: certHaccpImg
      image: null,
      badge: 'HACCP',
      icon: ShieldCheck,
    },
    {
      id: 'lab-test',
      tag: 'REPORT 03',
      code: isEn ? 'LAB TEST REPORT' : 'PHIẾU KIỂM NGHIỆM',
      title: isEn ? 'Microbiological & Chemical Test' : 'Phiếu Kết Quả Phân Tích Chỉ Tiêu Vi Sinh & Kim Loại',
      issuer: isEn ? 'Independent Testing Lab' : 'Phòng Kiểm Nghiệm Độc Lập',
      desc: isEn 
        ? 'Independent laboratory verification of moisture, heavy metals, and food safety standards.' 
        : 'Kết quả kiểm nghiệm chỉ tiêu vi sinh, độ ẩm và các chỉ số an toàn theo quy chuẩn kỹ thuật quốc gia.',
      // 👉 Gán ảnh phiếu kết quả kiểm nghiệm vào đây: image: labTestImg
      image: null,
      badge: isEn ? 'VERIFIED' : 'ĐẠT CHUẨN',
      icon: FileCheck,
    },
    {
      id: 'vsattp',
      tag: 'LEGAL 04',
      code: isEn ? 'FOOD SAFETY DOSSIER' : 'HỒ SƠ TỰ CÔNG BỐ',
      title: isEn ? 'Regulatory Compliance & Product Dossier' : 'Hồ Sơ Tự Công Bố Sản Phẩm & Chứng Nhận VSATTP',
      issuer: isEn ? 'Department of Food Safety' : 'Cơ quan Quản lý ATTP',
      desc: isEn 
        ? '100% compliant documentation, legal safety certification, and full origin traceability.' 
        : 'Đầy đủ giấy chứng nhận cơ sở đủ điều kiện ATTP, bản tự công bố sản phẩm và mã số truy xuất nguồn gốc.',
      // 👉 Gán ảnh giấy chứng nhận VSATTP / bản công bố vào đây: image: vsattpImg
      image: null,
      badge: isEn ? 'OFFICIAL' : 'HỢP QUY',
      icon: FileText,
    },
  ]

  return (
    <section className={`bg-white py-20 sm:py-28 border-t border-haq-border font-sans ${className}`}>
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="reveal max-w-3xl mb-14">
          <p className="font-heading text-xs tracking-[0.25em] uppercase text-[#16A34A] font-bold mb-3">
            {isEn ? 'QUALITY ASSURANCE · CERTIFICATIONS' : 'TIÊU CHUẨN XƯỞNG & BẢO CHỨNG CHẤT LƯỢNG'}
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink uppercase tracking-tight leading-tight">
            {isEn ? 'ISO & HACCP COMPLIANCE ACROSS ALL LINES' : 'HỒ SƠ CHỨNG NHẬN & BẰNG CHỨNG KIỂM ĐỊNH'}
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-[#16A34A]" />
          <p className="mt-4 text-sm text-haq-text-secondary leading-relaxed max-w-2xl">
            {isEn 
              ? 'Complete transparency with certified inspection documents, international food safety standards, and verified batch laboratory testing reports.'
              : 'Minh bạch 100% chứng thư kiểm định chất lượng, tiêu chuẩn an toàn thực phẩm quốc tế và hồ sơ tự công bố của HAQ FOOD.'}
          </p>
        </div>

        {/* Certificate Cards Grid — 4 Document Frames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CERTS.map((c, idx) => {
            const IconComponent = c.icon
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-haq-border overflow-hidden hover:border-[#16A34A]/50 hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* ── Document Frame Preview (Aspect Ratio 3:4 cho giấy chứng nhận) ── */}
                <div className="relative aspect-[3/4] bg-[#F8FAF8] border-b border-haq-border overflow-hidden flex items-center justify-center p-3">
                  {c.image ? (
                    /* Khi đã có ảnh chứng nhận */
                    <div 
                      onClick={() => setActiveCert(c)}
                      className="w-full h-full relative cursor-pointer group/img overflow-hidden rounded-lg border border-haq-border/60 shadow-xs bg-white"
                    >
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                        <span className="inline-flex items-center gap-1.5 bg-white text-haq-ink font-heading font-bold text-xs px-3.5 py-2 rounded-full shadow-md">
                          <ZoomIn className="w-3.5 h-3.5 text-[#16A34A]" />
                          {isEn ? 'View Certificate' : 'Phóng to xem'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Placeholder khung tài liệu khi chưa có ảnh */
                    <div 
                      onClick={() => setActiveCert(c)}
                      className="w-full h-full rounded-lg border-2 border-dashed border-[#16A34A]/25 bg-white p-5 flex flex-col justify-between cursor-pointer hover:border-[#16A34A] transition-colors relative group/placeholder"
                    >
                      {/* Top tag & badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded">
                          {c.badge}
                        </span>
                        <IconComponent className="w-5 h-5 text-[#16A34A]/40 group-hover/placeholder:text-[#16A34A] transition-colors" />
                      </div>

                      {/* Mock certificate layout lines */}
                      <div className="text-center py-4 space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-full bg-[#16A34A]/5 border border-[#16A34A]/20 flex items-center justify-center text-[#16A34A]">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="font-heading font-bold text-xs text-haq-ink uppercase tracking-wide">
                          {c.code}
                        </div>
                        <div className="text-[11px] text-haq-text-secondary leading-snug line-clamp-2 px-1">
                          {c.title}
                        </div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-heading font-bold text-[#16A34A] pt-2">
                          <ZoomIn className="w-3 h-3" />
                          <span>{isEn ? 'Click to inspect' : 'Bấm để xem chi tiết'}</span>
                        </div>
                      </div>

                      {/* Bottom status watermark */}
                      <div className="text-center pt-2 border-t border-haq-border/60">
                        <span className="text-[9px] font-mono text-haq-text-secondary uppercase">
                          {c.issuer}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Document Info ── */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#16A34A]">
                        {c.tag}
                      </span>
                      <span className="text-[10px] font-mono text-haq-text-secondary">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-sm text-haq-ink uppercase tracking-wide mb-1 leading-snug">
                      {c.code}
                    </h3>
                    <p className="text-xs font-semibold text-[#C89B3C] mb-2 leading-tight">
                      {c.title}
                    </p>
                    <p className="text-[11px] text-haq-text-secondary leading-relaxed line-clamp-3">
                      {c.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-haq-border/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-haq-text-secondary">
                      {c.issuer}
                    </span>
                    <button
                      onClick={() => setActiveCert(c)}
                      className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-[#16A34A] hover:text-[#0F5132] transition-colors cursor-pointer"
                    >
                      <span>{isEn ? 'View' : 'Xem'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Lightbox Modal xem tài liệu / ảnh chứng nhận phóng to ── */}
      {activeCert && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveCert(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-haq-border flex items-center justify-between bg-[#FAFAF8]">
              <div>
                <span className="text-[10px] font-heading font-bold text-[#16A34A] uppercase tracking-wider block">
                  {activeCert.tag} &middot; {activeCert.issuer}
                </span>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-haq-ink uppercase">
                  {activeCert.code} &mdash; {activeCert.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveCert(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-haq-ink transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-[#F4F8F4]/50 min-h-[360px]">
              {activeCert.image ? (
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="max-h-[65vh] w-auto object-contain rounded-lg border border-haq-border shadow-md"
                />
              ) : (
                <div className="text-center max-w-md py-8">
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-haq-ink uppercase mb-2">
                    {activeCert.code}
                  </h4>
                  <p className="text-xs text-haq-text-secondary leading-relaxed mb-4">
                    {activeCert.desc}
                  </p>
                  <div className="bg-white border border-dashed border-[#16A34A]/40 rounded-xl p-4 text-[12px] text-haq-ink/75 leading-relaxed text-left">
                    <p className="font-bold text-[#16A34A] mb-1">📌 Hướng dẫn cập nhật ảnh chứng thư này:</p>
                    <p className="text-[11px] text-haq-text-secondary">
                      1. Đặt ảnh chứng chỉ vào: <code className="bg-black/5 px-1.5 py-0.5 rounded text-[#0F5132]">src/assets/quality/</code><br />
                      2. Mở file <code className="bg-black/5 px-1.5 py-0.5 rounded text-[#0F5132]">src/components/Certifications.jsx</code> và import ảnh vào trường <code className="bg-black/5 px-1.5 py-0.5 rounded">image</code> của mục <strong>{activeCert.code}</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-haq-border bg-[#FAFAF8] flex items-center justify-between text-xs text-haq-text-secondary">
              <span>{activeCert.issuer}</span>
              <button
                onClick={() => setActiveCert(null)}
                className="font-heading font-bold text-[#16A34A] hover:underline cursor-pointer"
              >
                {isEn ? 'Close' : 'Đóng'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
