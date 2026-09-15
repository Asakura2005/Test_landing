'use client'

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
      title:
        language === 'en'
          ? 'Food Safety Management System'
          : language === 'ko'
          ? '식품안전경영시스템'
          : language === 'zh'
          ? '食品安全管理体系'
          : 'Hệ Thống Quản Lý An Toàn Thực Phẩm',
      issuer:
        language === 'en'
          ? 'International Certification'
          : language === 'ko'
          ? '국제 인증'
          : language === 'zh'
          ? '国际标准化认证'
          : 'Chứng nhận Quốc tế',
      desc:
        language === 'en'
          ? 'Closed clean drying line, strict temperature control and zero oil residue standards.'
          : language === 'ko'
          ? '전체 밀폐식 청정 건조 라인 및 가공 공정이 국제 표준을 준수합니다.'
          : language === 'zh'
          ? '全封闭洁净干燥生产线与深加工车间严格符合国际食品安全标准。'
          : 'Chứng nhận toàn bộ dây chuyền sản xuất sấy sạch và chế biến khép kín đạt tiêu chuẩn quốc tế.',
      // 👉 Gán ảnh chứng chỉ ISO vào đây: image: certIsoImg
      image: null,
      badge: 'ISO 22000',
      icon: Award,
    },
    {
      id: 'haccp',
      tag: 'STANDARD 02',
      code: 'HACCP CODEX',
      title:
        language === 'en'
          ? 'Critical Hazard Control'
          : language === 'ko'
          ? '위해요소중점관리기준 (HACCP)'
          : language === 'zh'
          ? '危害分析与关键控制点体系 (HACCP)'
          : 'Hệ Thống Phân Tích Mối Nguy & Điểm Kiểm Soát Tới Hạn',
      issuer:
        language === 'en'
          ? 'Codex Alimentarius'
          : language === 'ko'
          ? '국제 코덱스 규격'
          : language === 'zh'
          ? '国际食品法典委员会标准'
          : 'Tiêu chuẩn Codex Quốc tế',
      desc:
        language === 'en'
          ? 'Comprehensive biological, chemical, and physical risk prevention across processing stages.'
          : language === 'ko'
          ? '생물학적, 화학적, 물리적 위해 요소를 원천 차단하고 교차 오염을 방지합니다.'
          : language === 'zh'
          ? '全流程严格管控生物、化学与物理风险，彻底消除交叉污染隐患。'
          : 'Kiểm soát nghiêm ngặt rủi ro vi sinh, vật lý và hóa học; loại trừ hoàn toàn nguy cơ lây nhiễm chéo.',
      // 👉 Gán ảnh chứng chỉ HACCP vào đây: image: certHaccpImg
      image: null,
      badge: 'HACCP',
      icon: ShieldCheck,
    },
    {
      id: 'lab-test',
      tag: 'REPORT 03',
      code:
        language === 'en'
          ? 'LAB TEST REPORT'
          : language === 'ko'
          ? '공인 시험성적서'
          : language === 'zh'
          ? '权威质量检测报告'
          : 'PHIẾU KIỂM NGHIỆM',
      title:
        language === 'en'
          ? 'Microbiological & Chemical Test'
          : language === 'ko'
          ? '미생물 및 유해 화학 성분 정밀 분석'
          : language === 'zh'
          ? '微生物与重金属指标综合理化分析'
          : 'Phiếu Kết Quả Phân Tích Chỉ Tiêu Vi Sinh & Kim Loại',
      issuer:
        language === 'en'
          ? 'Independent Testing Lab'
          : language === 'ko'
          ? '공인 독립 시험연구기관'
          : language === 'zh'
          ? '独立第三方检验检测机构'
          : 'Phòng Kiểm Nghiệm Độc Lập',
      desc:
        language === 'en'
          ? 'Independent laboratory verification of moisture, heavy metals, and food safety standards.'
          : language === 'ko'
          ? '국가 기술 표준에 따른 미생물, 수분율 및 안전 지표 정밀 검사 완료.'
          : language === 'zh'
          ? '依照越南国家技术标准严格检定微生物、水分及各项理化安全指标。'
          : 'Kết quả kiểm nghiệm chỉ tiêu vi sinh, độ ẩm và các chỉ số an toàn theo quy chuẩn kỹ thuật quốc gia.',
      // 👉 Gán ảnh phiếu kết quả kiểm nghiệm vào đây: image: labTestImg
      image: null,
      badge:
        language === 'en'
          ? 'VERIFIED'
          : language === 'ko'
          ? '적합 판정'
          : language === 'zh'
          ? '合格认证'
          : 'ĐẠT CHUẨN',
      icon: FileCheck,
    },
    {
      id: 'vsattp',
      tag: 'LEGAL 04',
      code:
        language === 'en'
          ? 'FOOD SAFETY DOSSIER'
          : language === 'ko'
          ? '식품안전 규정 준수'
          : language === 'zh'
          ? '越南食品安全资质文件'
          : 'HỒ SƠ TỰ CÔNG BỐ',
      title:
        language === 'en'
          ? 'Regulatory Compliance & Product Dossier'
          : language === 'ko'
          ? '제품 자체 공시 및 식품안전위생 인증'
          : language === 'zh'
          ? '产品合规备案与食品卫生安全认证'
          : 'Hồ Sơ Tự Công Bố Sản Phẩm & Chứng Nhận VSATTP',
      issuer:
        language === 'en'
          ? 'Department of Food Safety'
          : language === 'ko'
          ? '식품안전관리당국'
          : language === 'zh'
          ? '越南食品安全监管局'
          : 'Cơ quan Quản lý ATTP',
      desc:
        language === 'en'
          ? '100% compliant documentation, legal safety certification, and full origin traceability.'
          : language === 'ko'
          ? '식품안전 적격 시설 인증서 완비 및 전체 제품군 원산지 이력 추적 코드 부여.'
          : language === 'zh'
          ? '具备完备的食品生产卫生合格资质证书、产品企业标准备案及源头溯源码。'
          : 'Đầy đủ giấy chứng nhận cơ sở đủ điều kiện ATTP, bản tự công bố sản phẩm và mã số truy xuất nguồn gốc.',
      // 👉 Gán ảnh giấy chứng nhận VSATTP / bản công bố vào đây: image: vsattpImg
      image: null,
      badge:
        language === 'en'
          ? 'OFFICIAL'
          : language === 'ko'
          ? '공식 규격'
          : language === 'zh'
          ? '法定合规'
          : 'HỢP QUY',
      icon: FileText,
    },
  ]

  return (
    <section className={`bg-white py-20 sm:py-28 border-t border-haq-border font-sans ${className}`}>
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="reveal max-w-3xl mb-14">
          <p className="font-heading text-xs tracking-[0.25em] uppercase text-[#16A34A] font-bold mb-3">
            {language === 'en'
              ? 'QUALITY ASSURANCE · CERTIFICATIONS'
              : language === 'ko'
              ? '생산 표준 및 품질 보증'
              : language === 'zh'
              ? '生产车间标准与国际权威资质'
              : 'TIÊU CHUẨN XƯỞNG & BẢO CHỨNG CHẤT LƯỢNG'}
          </p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink uppercase leading-snug">
            {language === 'en'
              ? 'ISO & HACCP COMPLIANCE ACROSS ALL LINES'
              : language === 'ko'
              ? '인증 포트폴리오 및 공인 시험 증빙'
              : language === 'zh'
              ? '资质认证档案与出厂质检凭证'
              : 'HỒ SƠ CHỨNG NHẬN & BẰNG CHỨNG KIỂM ĐỊNH'}
          </h2>
          <div className="mt-3 h-0.5 w-16 bg-[#16A34A]" />
          <p className="mt-4 text-sm text-haq-text-secondary leading-relaxed max-w-2xl">
            {language === 'en'
              ? 'Complete transparency with certified inspection documents, international food safety standards, and verified batch laboratory testing reports.'
              : language === 'ko'
              ? '품질 검사 증명서, 국제 식품 안전 규격 및 HAQ FOOD의 자체 공시 문서를 100% 투명하게 공개합니다.'
              : language === 'zh'
              ? '100% 透明公开质检凭证、国际食品安全认证与 HAQ FOOD 官方备案文件。'
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
                <div className="relative aspect-[4/3] sm:aspect-[3/4] bg-[#F8FAF8] border-b border-haq-border overflow-hidden flex items-center justify-center p-3">
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
                          {language === 'en'
                            ? 'View Certificate'
                            : language === 'ko'
                            ? '크게 보기'
                            : language === 'zh'
                            ? '点击放大查看'
                            : 'Phóng to xem'}
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
                          <span>
                            {language === 'en'
                              ? 'Click to inspect'
                              : language === 'ko'
                              ? '자세히 보기'
                              : language === 'zh'
                              ? '点击查看详情'
                              : 'Bấm để xem chi tiết'}
                          </span>
                        </div>
                      </div>

                      {/* Bottom status watermark */}
                      <div className="text-center pt-2 border-t border-haq-border/60">
                        <span className="text-[11px] sm:text-[9px] font-mono text-haq-text-secondary uppercase">
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
                    <p className="text-xs font-semibold text-haq-ink mb-2 leading-tight">
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
                      <span>
                        {language === 'en'
                          ? 'View'
                          : language === 'ko'
                          ? '보기'
                          : language === 'zh'
                          ? '查看'
                          : 'Xem'}
                      </span>
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
            <div className="px-6 py-4 border-b border-haq-border flex items-center justify-between gap-2 bg-[#FAFAF8]">
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
                {language === 'en'
                  ? 'Close'
                  : language === 'ko'
                  ? '닫기'
                  : language === 'zh'
                  ? '关闭'
                  : 'Đóng'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
