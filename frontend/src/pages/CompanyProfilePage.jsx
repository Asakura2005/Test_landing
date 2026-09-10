import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useMagneticSectionScroll } from '../hooks/useMagneticSectionScroll'

import visionBgImg from '../assets/about/vision_mission_bg.jpg'
import loiTheBgImg from '../assets/about/loi-the-bg.jpg'
import riceFieldImg from '../assets/business/trung-bay-sp.jpeg'
import labInspectionImg from '../assets/business/congtac.jpeg'
import cargoExportImg from '../assets/may-tron-banh-trang.jpg'
import factoryProductionImg from '../assets/factory/thanh-pham.jpg'
import qualityControlImg from '../assets/factory/nha-kho.jpg'
import b2bPartnershipImg from '../assets/business/Hop-tac-nongtraiviet.jpg'
import coreValuesImg from '../assets/core_values_pentagon.jpg'

/* ─── Dữ liệu Thư viện Ảnh Thực tế HAQ FOOD (Mở Modal) ─── */
const GALLERY_ITEMS = [
  { src: riceFieldImg, title: 'Không gian trưng bày sản phẩm HAQ FOOD', category: 'Showroom & Phân phối' },
  { src: labInspectionImg, title: 'Phòng kiểm nghiệm & R&D', category: 'Nghiên cứu & Kiểm soát' },
  { src: qualityControlImg, title: 'Kiểm soát chất lượng kho hàng', category: 'Kho vận & Bảo quản' },
  { src: factoryProductionImg, title: 'Dây chuyền sấy khép kín ISO – HACCP', category: 'Công nghệ sản xuất' },
  { src: cargoExportImg, title: 'Đóng gói & Vận hành xuất khẩu', category: 'Phân phối & Xuất khẩu' },
]

/* ─── Reveal on Scroll ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.unobserve(el) } },
      { threshold: 0.12 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════ */
export default function CompanyProfilePage() {
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)

  // Initialize Progressive Magnetic / Resistance Section Scroll (chuẩn như ở Home page)
  useMagneticSectionScroll({
    headerHeight: 76,
    enabled: selectedImgIndex === null,
    sectionSelector: '[data-profile-section]',
    footerSelector: '[data-section="footer"]',
  })

  // Keyboard navigation & scroll lock for Modal
  useEffect(() => {
    if (selectedImgIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImgIndex(null)
      if (e.key === 'ArrowRight') setSelectedImgIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)
      if (e.key === 'ArrowLeft') setSelectedImgIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImgIndex])

  return (
    <div className="min-h-screen bg-white text-haq-text-primary font-body flex flex-col relative selection:bg-haq-green-dark selection:text-white">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">

        {/* ════════════════════════════════════════════════════
            SECTION 1 — TỔNG QUAN DOANH NGHIỆP TRỌN VẸN 100VH
            Gọn gàng, vừa vặn 1 màn hình, chắt lọc súc tích
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="overview"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] bg-white border-b border-haq-border flex flex-col justify-center py-4 lg:py-0 overflow-hidden box-border"
        >
          <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-16 w-full">
            
            {/* Breadcrumb tinh gọn */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-haq-text-secondary mb-2 lg:mb-2.5">
              <Link to="/" className="hover:text-haq-green font-medium transition-colors">Trang chủ</Link>
              <span className="text-haq-border">/</span>
              <span className="text-haq-ink font-semibold">Giới thiệu</span>
            </nav>

            {/* Bố cục 2 cột chính trong 100vh */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
              
              {/* CỘT TRÁI: Định vị & Câu chuyện doanh nghiệp (7 cột) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <Reveal delay={40}>
                  <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-heading font-bold text-[#0F5132] uppercase tracking-[0.18em] mb-1.5 sm:mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#0F5132]" />
                    Công ty Cổ phần HAQ Hà Nội
                  </div>

                  <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-haq-ink uppercase tracking-tight leading-[1.15] mb-2">
                    Chất lượng<br />vượt niềm tin
                  </h1>

                  <p className="text-sm sm:text-base lg:text-[17px] font-heading text-[#0F5132] font-bold mb-2.5 sm:mb-3 leading-snug">
                    Tiên phong chuẩn hóa đồ ăn vặt & nông sản Việt theo tiêu chuẩn quốc tế
                  </p>

                  <div className="space-y-2 sm:space-y-2.5 text-haq-ink/85 text-xs sm:text-[13.5px] lg:text-[14.5px] leading-relaxed text-left">
                    <p className="text-pretty">
                      Thành lập năm 2021, <strong>Công ty Cổ phần HAQ Hà Nội</strong> là đơn vị sản xuất và phân phối uy tín trong ngành thực phẩm đóng gói chuẩn vị Việt, nổi bật với hai dòng thế mạnh chủ lực là <strong>bánh nướng</strong> và <strong>bánh tráng</strong>. Ứng dụng dây chuyền chế biến hiện đại đạt chuẩn <strong>ISO 22000 & HACCP</strong>, HAQ nâng tầm thức quà truyền thống vào chuỗi cung ứng chuyên nghiệp cùng cam kết khắt khe về <strong>An toàn – Minh bạch – Chất lượng cao</strong>.
                    </p>
                    <p className="text-pretty">
                      Hiện nay, sản phẩm HAQ Food tự hào hiện diện tại hơn <strong>7 chuỗi siêu thị hàng đầu Việt Nam</strong> (WinMart, GO!, Tops Market, Circle K, GS25, Bách Hóa Xanh...); đồng thời xuất khẩu chính ngạch sang <strong>Hàn Quốc, Đài Loan</strong> và không ngừng mở rộng ra thị trường quốc tế.
                    </p>
                  </div>

                  {/* 3 Chỉ số năng lực cốt lõi — Vừa vặn 1 màn hình, tạo bảo chứng tín nhiệm */}
                  <div className="mt-3.5 sm:mt-4 pt-3 border-t border-haq-border/80 grid grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <div className="font-heading font-extrabold text-lg sm:text-xl lg:text-[22px] text-[#0F5132] tracking-tight">2021</div>
                      <div className="text-[11px] sm:text-xs text-haq-text-secondary leading-snug mt-0.5">Khởi dựng nền móng</div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-lg sm:text-xl lg:text-[22px] text-[#0F5132] tracking-tight">07+</div>
                      <div className="text-[11px] sm:text-xs text-haq-text-secondary leading-snug mt-0.5">Hệ thống đại siêu thị</div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-lg sm:text-xl lg:text-[22px] text-[#0F5132] tracking-tight">ISO & HACCP</div>
                      <div className="text-[11px] sm:text-xs text-haq-text-secondary leading-snug mt-0.5">Quy chuẩn quốc tế</div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* CỘT PHẢI: Ảnh showroom thực tế (Click mở Modal xem chi tiết) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <Reveal delay={80}>
                  <div
                    onClick={() => setSelectedImgIndex(0)}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-haq-border bg-white group cursor-pointer"
                    title="Nhấn để xem ảnh phóng to"
                  >
                    <img
                      src={riceFieldImg}
                      alt="Không gian trưng bày sản phẩm HAQ FOOD"
                      className="w-full h-[260px] sm:h-[320px] lg:h-[360px] xl:h-[400px] max-h-[50vh] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs px-3.5 py-1.5 rounded-full font-medium backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                        <span>⤢</span> Nhấn để xem ảnh lớn
                      </span>
                    </div>


                  </div>
                </Reveal>
              </div>

            </div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            MODAL XEM ẢNH THỰC TẾ CAO CẤP (LIGHTBOX)
            ════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {selectedImgIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
              {/* Backdrop mờ */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedImgIndex(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-5xl w-full bg-black/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Nút Đóng nổi góc trên */}
                <button
                  onClick={() => setSelectedImgIndex(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors text-base font-bold cursor-pointer shadow-lg border border-white/20"
                  title="Đóng (ESC)"
                >
                  ✕
                </button>

                {/* Khung ảnh chính */}
                <div className="relative bg-black flex items-center justify-center min-h-[320px] max-h-[82vh] p-2 sm:p-4">
                  <img
                    src={GALLERY_ITEMS[selectedImgIndex].src}
                    alt=""
                    className="max-h-[80vh] w-auto max-w-full object-contain mx-auto rounded-lg"
                  />

                  {/* Nút Prev */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImgIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors text-xl font-bold cursor-pointer shadow-lg border border-white/10 z-20"
                    title="Ảnh trước (Mũi tên trái)"
                  >
                    ‹
                  </button>

                  {/* Nút Next */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImgIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors text-xl font-bold cursor-pointer shadow-lg border border-white/10 z-20"
                    title="Ảnh sau (Mũi tên phải)"
                  >
                    ›
                  </button>

                  {/* Số thứ tự ảnh tinh tế ở góc dưới */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-xs font-mono text-white/80 border border-white/10 pointer-events-none">
                    0{selectedImgIndex + 1} / 0{GALLERY_ITEMS.length}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


        {/* ════════════════════════════════════════════════════
            SECTION 3 — TẦM NHÌN & SỨ MỆNH (100VH)
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="vision-mission"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] relative overflow-hidden border-b border-[#0F5132]/10 flex flex-col justify-center py-6 lg:py-0 lg:overflow-hidden box-border"
        >
          {/* Background image — watercolor texture */}
          <img
            src={visionBgImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          <div className="relative z-10 mx-auto max-w-site px-5 sm:px-8 lg:px-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16 items-center">

              {/* Tầm nhìn */}
              <Reveal>
                <div>
                  <p className="text-xs sm:text-[13px] font-heading font-bold tracking-widest text-[#0F5132] uppercase mb-2">
                    Tầm nhìn phát triển
                  </p>
                  <h3 className="font-heading font-black text-lg sm:text-xl xl:text-2xl text-[#0C1E15] leading-snug mb-3.5">
                    Trở thành doanh nghiệp tiên phong sản xuất và phân phối đồ ăn vặt tại Việt Nam, vươn tầm thị trường quốc tế.
                  </h3>
                  <div className="h-px w-full bg-[#0C1E15]/15 mb-3.5" />
                  <ul className="space-y-2.5">
                    {[
                      ['Thị trường nội địa', 'Dẫn đầu ngành hàng đồ ăn vặt với hệ thống phân phối sâu rộng phủ sóng trên toàn quốc.'],
                      ['Vươn tầm quốc tế', 'Mở rộng xuất khẩu chính ngạch sang Nhật Bản, Hàn Quốc và các thị trường tiềm năng châu Á.'],
                      ['Chuẩn mực tiên phong', 'Xây dựng thương hiệu bảo chứng cho chất lượng, an toàn vệ sinh và năng lực cung ứng vững vàng.'],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm lg:text-[15px]">
                        <span className="text-[#0F5132] mt-0.5 shrink-0 font-bold">—</span>
                        <p className="text-[#1C2E24] leading-relaxed">
                          <strong className="text-[#0C1E15] font-semibold mr-1">{title}:</strong>
                          {desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Sứ mệnh */}
              <Reveal delay={100}>
                <div>
                  <p className="text-xs sm:text-[13px] font-heading font-bold tracking-widest text-[#0F5132] uppercase mb-2">
                    Sứ mệnh cốt lõi
                  </p>
                  <h3 className="font-heading font-black text-lg sm:text-xl xl:text-2xl text-[#0C1E15] leading-snug mb-3.5">
                    Mang đến sản phẩm ngon – an toàn – đạt chuẩn, đáp ứng nhu cầu ngày càng cao của người tiêu dùng và đối tác.
                  </h3>
                  <div className="h-px w-full bg-[#0C1E15]/15 mb-3.5" />
                  <ul className="space-y-2.5">
                    {[
                      ['Sản phẩm ngon', 'Giữ trọn vị đậm đà, giòn rụm từ bí quyết và công thức ẩm thực truyền thống Việt Nam.'],
                      ['An toàn tuyệt đối', 'Nguồn nguyên liệu sạch, không dầu chiên tồn dư, kiểm soát nghiêm ngặt các chỉ tiêu vi sinh.'],
                      ['Đạt chuẩn quốc tế', 'Quy trình sản xuất khép kín, chuẩn hóa toàn diện theo chứng nhận ISO 22000 & HACCP.'],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm lg:text-[15px]">
                        <span className="text-[#0F5132] mt-0.5 shrink-0 font-bold">—</span>
                        <p className="text-[#1C2E24] leading-relaxed">
                          <strong className="text-[#0C1E15] font-semibold mr-1">{title}:</strong>
                          {desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            SECTION 4 — 5 GIÁ TRỊ CỐT LÕI (100VH)
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="core-values"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] bg-white border-b border-haq-border flex flex-col justify-start pt-5 sm:pt-7 lg:pt-8 pb-4 lg:pb-6 lg:overflow-hidden box-border"
        >
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full flex-1 flex flex-col">
            <Reveal>
              <div className="text-center mb-2 sm:mb-3">
                <p className="text-xs sm:text-[13px] font-heading font-bold tracking-widest text-[#0F5132] uppercase mb-1">
                  Nền tảng văn hóa doanh nghiệp
                </p>
                <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-haq-ink tracking-tight uppercase">
                  5 Giá trị cốt lõi
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100} className="flex-1 flex items-center justify-center min-h-0">
              <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto flex items-center justify-center h-full">
                <img
                  src={coreValuesImg}
                  alt="HAQ FOOD — 5 Giá trị cốt lõi: Chất lượng, Minh bạch, Đổi mới, Hợp tác bền vững, Lấy khách hàng làm trung tâm"
                  className="w-auto max-w-full h-auto max-h-[60vh] sm:max-h-[66vh] lg:max-h-[70vh] xl:max-h-[73vh] object-contain mx-auto drop-shadow-sm"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            SECTION 5 — CAM KẾT & ĐỊNH HƯỚNG (100VH)
            ════════════════════════════════════════════════════ */}
        <section
          data-profile-section
          data-section="commitment"
          className="min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] bg-white overflow-hidden flex flex-col justify-center border-b border-haq-border box-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
            {/* Cột ảnh (5 cột) */}
            <div className="order-2 lg:order-1 lg:col-span-5 relative min-h-[260px] lg:min-h-0 h-full">
              <img
                src={b2bPartnershipImg}
                alt="Hợp tác đối tác HAQ FOOD"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Cột chữ (7 cột) với nền giấy thảo mộc xanh tự nhiên */}
            <div className="order-1 lg:order-2 lg:col-span-7 relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 py-8 lg:py-0 flex flex-col justify-center">
              {/* Background texture thảo mộc xanh */}
              <img
                src={loiTheBgImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                loading="lazy"
              />
              {/* Lớp phủ sáng nhẹ (35%) làm dịu vân giấy, giúp chữ mực than nổi sắc nét và êm mắt */}
              <div className="absolute inset-0 bg-white/35 backdrop-blur-[0.5px] pointer-events-none" />

              <div className="relative z-10 max-w-xl">
                <Reveal delay={60}>
                  <div>
                    <p className="text-xs sm:text-[13px] font-heading font-extrabold tracking-widest text-[#0B3B24] uppercase mb-1.5">
                      Tầm nhìn dài hạn
                    </p>
                    <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0C1E15] tracking-tight uppercase leading-tight mb-4 sm:mb-5">
                      Cam kết & Định hướng
                    </h2>
                    <div className="space-y-2.5 sm:space-y-3">
                      {[
                        ['An toàn & Minh bạch tuyệt đối', 'Truy xuất 100% nguồn gốc nguyên liệu sạch, tuân thủ nghiêm ngặt ISO 22000 & HACCP trong mọi khâu sản xuất.'],
                        ['Liên tục cải tiến & Đổi mới', 'Phát triển các dòng thức quà ăn vặt tốt cho sức khỏe, ít dầu chiên, bảo tồn độ giòn thơm tự nhiên.'],
                        ['Chuẩn hóa vận hành & Chuỗi cung ứng', 'Quy trình xuất nhập kho đồng bộ, đáp ứng tiêu chuẩn khắt khe của các đại siêu thị và kênh phân phối toàn quốc.'],
                        ['Chinh phục tiêu chuẩn quốc tế', 'Không ngừng hoàn thiện quy trình để mở rộng thị phần tại Nhật Bản, Hàn Quốc và khu vực.'],
                        ['Phát triển thương hiệu bền vững', 'Gắn kết bền vững cùng nông dân bản địa, nâng cao giá trị gia tăng cho nông sản Việt Nam.'],
                      ].map(([title, desc], i) => (
                        <div key={i} className="flex gap-3 sm:gap-3.5 items-start">
                          <span className="font-heading font-extrabold text-sm sm:text-base text-[#0B3B24] shrink-0 w-5 sm:w-6 select-none pt-0.5">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h4 className="font-heading font-bold text-xs sm:text-sm lg:text-[15px] text-[#0C1E15] leading-snug">{title}</h4>
                            <p className="text-[11px] sm:text-xs lg:text-[13.5px] text-[#16291e] font-medium mt-0.5 leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer data-section="footer">
        <Footer />
      </footer>
    </div>
  )
}
