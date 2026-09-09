import React, { useState, useEffect, useRef } from 'react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'
import Certifications from '../components/Certifications'
import { Play, Film, X } from 'lucide-react'

import heroFactoryImg from '../assets/hero-factory.jpg'
import factoryHqImg from '../assets/about/factory_hq.jpg'
import factoryImg from '../assets/factory/factory_production.jpg'
import distributionImg from '../assets/distribution/distribution_export.jpg'

import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'

/* ─── Reveal ─────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-[900ms] ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const PARTNERS = [
  { name: 'WinMart', logo: winmartLogo },
  { name: 'GO!', logo: goLogo },
  { name: 'Circle K', logo: circleKLogo },
  { name: 'GS25', logo: gs25Logo },
  { name: 'K-Market', logo: kmartLogo },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
]

/* ═══════════════════════════════════════════════════ */
export default function CapabilitiesPage() {
  const { t, language } = useLanguage()
  const en = language === 'en', ko = language === 'ko'

  // =========================================================================
  // VIDEO QUY TRÌNH SẢN XUẤT:
  // Khi có video, bạn có thể:
  // 1. Đặt file vào thư mục public hoặc src/assets (ví dụ: '/videos/quy-trinh.mp4')
  // 2. Điền đường dẫn vào biến `processVideoSrc` bên dưới:
  // =========================================================================
  const processVideoSrc = null // Ví dụ: '/videos/quy-trinh-san-xuat.mp4' hoặc link YouTube
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">

        {/* ──────────────────────────────────────────
            1. TIÊU ĐỀ TRANG & BỘ ẢNH NHÀ MÁY (PHONG CÁCH BẢO MINH: ẢNH RÕ NÉT, KHÔNG CHỮ ĐÈ)
        ────────────────────────────────────────── */}
        <section className="bg-white pt-10 sm:pt-14 pb-14 sm:pb-20">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            
            {/* Header Text (sạch sẽ, thanh lịch, không đè lên máy móc) */}
            <div className="max-w-3xl mb-10 sm:mb-14">
              <Reveal>
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="h-px w-6 bg-[#16A34A]" />
                  <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-[0.2em]">
                    {en ? 'MANUFACTURING & QUALITY' : ko ? '생산 및 품질 관리' : 'NĂNG LỰC SẢN XUẤT · HAQ FOOD'}
                  </span>
                </div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight leading-tight mb-5">
                  {en 
                    ? 'Advanced Production Technology & Quality Control' 
                    : ko 
                    ? '현대식 생산 기술 및 품질 관리' 
                    : 'Công nghệ sản xuất tiên tiến & Kiểm soát chất lượng'}
                </h1>
                <p className="text-sm sm:text-base text-haq-text-secondary leading-[1.8] max-w-2xl">
                  {en
                    ? 'Investing systematically in modern industrial machinery and closed-loop workflows, HAQ FOOD standardizes each processing stage to preserve signature flavors and meet the most rigorous international food safety standards.'
                    : ko
                    ? '현대적인 산업 기계와 폐쇄형 공정에 체계적으로 투자하여 시그니처 풍미를 보존하고 가장 엄격한 국제 식품 안전 기준을 충족합니다.'
                    : 'Đầu tư đồng bộ vào hệ thống máy móc công nghiệp hiện đại và quy trình khép kín, HAQ FOOD chuẩn hóa từng công đoạn chế biến nhằm bảo toàn hương vị thơm ngon đặc trưng và đáp ứng các tiêu chuẩn an toàn thực phẩm khắt khe nhất.'}
                </p>
              </Reveal>
            </div>

            {/* Ảnh Nhà Máy To & Rõ Nét (Không có chữ đè lên, nhìn thấy rõ máy móc & công nhân) */}
            <Reveal delay={150}>
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-md bg-haq-cream mb-6">
                <img 
                  src={heroFactoryImg} 
                  alt="Dây chuyền đóng gói khép kín HAQ FOOD" 
                  className="w-full aspect-[16/9] sm:aspect-[21/9] object-cover" 
                />
              </div>
            </Reveal>

            {/* 2 ảnh chi tiết dây chuyền máy móc */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Reveal delay={200}>
                <div className="rounded-2xl overflow-hidden border border-haq-border shadow-xs bg-white">
                  <img 
                    src={factoryHqImg} 
                    alt="Hệ thống máy móc chế biến" 
                    className="w-full aspect-[16/10] object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="p-4 sm:p-5 bg-white border-t border-haq-border/60">
                    <span className="font-heading font-bold text-xs sm:text-sm uppercase text-haq-ink block mb-0.5">
                      Hệ thống chiết rót &amp; phối trộn tự động
                    </span>
                    <span className="text-[11px] text-haq-text-secondary">
                      Vận hành theo tiêu chuẩn phòng sạch áp suất dương
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="rounded-2xl overflow-hidden border border-haq-border shadow-xs bg-white">
                  <img 
                    src={factoryImg} 
                    alt="Khu vực dây chuyền sản xuất" 
                    className="w-full aspect-[16/10] object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="p-4 sm:p-5 bg-white border-t border-haq-border/60">
                    <span className="font-heading font-bold text-xs sm:text-sm uppercase text-haq-ink block mb-0.5">
                      Dây chuyền đóng gói thành phẩm
                    </span>
                    <span className="text-[11px] text-haq-text-secondary">
                      Định lượng chính xác, kiểm soát vệ sinh nghiêm ngặt
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ──────────────────────────────────────────
            3. QUY TRÌNH SẢN XUẤT 6 CÔNG ĐOẠN (KÈM VIDEO SHOWCASE)
        ────────────────────────────────────────── */}
        <section id="quy-trinh" className="py-20 sm:py-28 bg-[#0C1E15] text-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            
            {/* Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <Reveal>
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="h-px w-6 bg-[#C89B3C]" />
                  <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em]">
                    {en ? 'STANDARDIZED WORKFLOW' : ko ? '표준 제조 공정' : 'QUY CHUẨN VẬN HÀNH'}
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  Quy trình sản xuất <span className="text-[#C89B3C]">6 công đoạn</span>
                </h2>
                <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl">
                  Hệ thống vận hành liên hoàn kiểm soát nhiệt ẩm và an toàn vệ sinh thực phẩm nghiêm ngặt từ khâu tiếp nhận nguyên liệu, chế biến kỹ thuật, tùy biến OEM/ODM đến đóng gói và xuất kho.
                </p>
              </Reveal>
            </div>

            {/* VIDEO SHOWCASE FRAME (Hiện tại hiển thị ảnh sắc nét, có nút Play, sẵn sàng đổi sang video) */}
            <Reveal delay={100} className="mb-14 sm:mb-20">
              <div 
                onClick={() => setShowVideoModal(true)}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group cursor-pointer"
              >
                {/* 16:9 Cinema Container */}
                <div className="relative aspect-video max-h-[560px] w-full overflow-hidden flex items-center justify-center">
                  <img
                    src={factoryImg}
                    alt="Video quy trình sản xuất HAQ FOOD"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[11px] font-heading font-bold text-white uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                      Video quy trình sản xuất
                    </span>
                    <span className="bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-md text-[10px] font-mono text-white/80 uppercase tracking-wider hidden sm:inline-block">
                      Dây chuyền tự động khép kín
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="relative mb-3.5 group-hover:scale-110 transition-transform duration-300">
                      {/* Outer pulse ring */}
                      <div className="absolute -inset-3 rounded-full bg-[#16A34A]/30 animate-ping opacity-75" />
                      {/* Play Button */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center shadow-2xl shadow-[#16A34A]/50 transition-colors">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                      </div>
                    </div>
                    <span className="font-heading font-bold text-sm sm:text-base text-white tracking-wide uppercase drop-shadow-md">
                      Xem Video Công Đoạn Sản Xuất
                    </span>
                    <span className="text-[11px] sm:text-xs text-white/70 mt-1 font-sans">
                      (Bấm để xem thước phim vận hành thực tế tại nhà xưởng)
                    </span>
                  </div>

                  {/* Bottom Bar Info */}
                  <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 flex items-end justify-between">
                    <div className="max-w-lg hidden sm:block">
                      <div className="text-[11px] font-mono text-[#C89B3C] font-bold uppercase tracking-wider mb-0.5">
                        HAQ FOOD &middot; FACTORY PROCESS
                      </div>
                      <div className="text-xs text-white/80">
                        Khép kín từ khâu nguyên liệu đầu vào đến thành phẩm đóng gói xuất xưởng
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/50 uppercase ml-auto">
                      ISO 22000 &middot; HACCP
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 6 Bước Chi Tiết — Bố cục 3 cột x 2 hàng */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[
                {
                  step: '01',
                  title: 'Tiếp nhận và kiểm soát nguyên liệu đầu vào',
                  desc: 'Toàn bộ nguồn nguyên liệu và gia vị được kiểm soát chặt chẽ về nguồn gốc và chất lượng trước khi đưa vào sản xuất.',
                },
                {
                  step: '02',
                  title: 'Phối trộn và chế biến kỹ thuật',
                  desc: 'Sử dụng hệ thống máy trộn inox công nghiệp chuyên dụng để phối trộn nguyên phụ liệu đồng đều, chuẩn hóa công thức theo quy chuẩn kỹ thuật.',
                },
                {
                  step: '03',
                  title: 'Tùy biến công thức theo đối tác (OEM/ODM)',
                  desc: 'Linh hoạt điều chỉnh khẩu vị, tỷ lệ gia vị và quy cách thành phẩm theo yêu cầu đặt hàng riêng của từng đối tác.',
                },
                {
                  step: '04',
                  title: 'Đóng gói trên dây chuyền',
                  desc: 'Sản phẩm được định lượng và đóng gói thành phẩm (hũ nhựa, túi zip) trên băng chuyền kiểm soát vệ sinh nghiêm ngặt.',
                },
                {
                  step: '05',
                  title: 'Kiểm định chất lượng và lưu mẫu (Strict QC)',
                  desc: 'Tiến hành kiểm tra chất lượng thành phẩm theo từng lô và bắt buộc lưu mẫu đối chứng đầy đủ để phục vụ truy xuất nguồn gốc.',
                },
                {
                  step: '06',
                  title: 'Lưu kho và xuất kho minh bạch',
                  desc: 'Hàng hóa được sắp xếp tại khu vực lưu trữ quy chuẩn, phân loại khoa học theo kệ hàng, vận hành theo quy trình xuất kho minh bạch nhằm đáp ứng các đơn hàng lớn và liên tục.',
                },
              ].map((proc, i) => (
                <Reveal key={proc.step} delay={i * 60}>
                  <div className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-[#C89B3C]/40 rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                        <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#C89B3C]/50 group-hover:text-[#C89B3C] transition-colors">
                          {proc.step}
                        </span>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                          STEP {proc.step}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-[17px] text-white leading-snug mb-3 group-hover:text-[#C89B3C] transition-colors">
                        {proc.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-white/60 leading-relaxed">
                        {proc.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────
            4. TIÊU CHUẨN XƯỞNG & BẢO CHỨNG CHẤT LƯỢNG
        ────────────────────────────────────────── */}
        <Certifications />


        {/* ──────────────────────────────────────────
            5. PHÂN PHỐI & XUẤT KHẨU (MARQUEE CHẠY CHẠY)
        ────────────────────────────────────────── */}
        <section id="phan-phoi" className="bg-[#0C1E15] text-white py-20 sm:py-28 relative overflow-hidden">
          {/* Background image */}
          <img src={distributionImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0C1E15]/75" />

          <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal>
              <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em]">
                {en ? 'Distribution & Export' : ko ? '유통 및 수출' : 'Phân phối & Xuất khẩu'}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2 max-w-xl">
                {en ? 'Retail Network & International Export' : ko ? '전국 유통망 및 해외 수출 네트워크' : 'Mạng lưới bán lẻ & Xuất khẩu quốc tế'}
              </h2>
              <p className="mt-4 text-sm text-white/50 max-w-lg leading-relaxed">
                {en
                  ? 'Present across 3,000+ retail stores in Vietnam with official exports to South Korea and Taiwan.'
                  : ko
                  ? '베트남 전역 3,000개 이상의 매장 입점 및 한국, 대만 정식 수출 진행 중.'
                  : 'Hiện diện tại hơn 3.000 điểm bán lẻ tại Việt Nam và xuất khẩu chính ngạch sang Hàn Quốc, Đài Loan.'}
              </p>
            </Reveal>

            {/* Partner logos — infinite horizontal marquee */}
            <Reveal delay={200}>
              <style>{`
                @keyframes marquee-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>
              <div
                className="mt-14 overflow-hidden group"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                }}
              >
                <div
                  className="flex w-max gap-8 group-hover:[animation-play-state:paused]"
                  style={{ animation: 'marquee-scroll 18s linear infinite' }}
                >
                  {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
                    <div
                      key={i}
                      className="h-20 w-44 shrink-0 flex items-center justify-center p-3 bg-white/95 rounded-xl shadow-xs"
                    >
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="max-h-12 max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Export markets */}
            <Reveal delay={350}>
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { code: 'vn', name: en ? 'Vietnam — Nationwide' : ko ? '베트남 — 전국' : 'Việt Nam — Toàn quốc' },
                  { code: 'kr', name: en ? 'South Korea' : ko ? '한국' : 'Hàn Quốc' },
                  { code: 'tw', name: en ? 'Taiwan' : ko ? '대만' : 'Đài Loan' },
                ].map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/80">
                    <img src={`https://flagcdn.com/24x18/${m.code}.png`} alt={m.name} className="w-6 h-4 object-cover rounded-sm" />
                    <span className="font-heading font-bold text-xs">{m.name}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

      {/* ── Video Player Modal ── */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-[#0C1E15] border border-white/15 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span className="font-heading font-bold text-sm text-white uppercase tracking-wide">
                  Video Quy Trình Sản Xuất &middot; HAQ FOOD
                </span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {processVideoSrc ? (
                <video
                  src={processVideoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6">
                  <img
                    src={factoryImg}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="relative z-10 max-w-md bg-black/75 backdrop-blur-md border border-white/15 p-6 sm:p-8 rounded-2xl">
                    <div className="w-14 h-14 rounded-full bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 flex items-center justify-center mx-auto mb-3">
                      <Film className="w-7 h-7" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-white uppercase mb-2">
                      Khung phát Video sẵn sàng
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed mb-5">
                      Hiện tại đang hiển thị ảnh đại diện dây chuyền sản xuất. Khi bạn có file video (.mp4) hoặc link YouTube, chỉ cần đưa link vào biến <code className="bg-white/15 text-[#C89B3C] px-1.5 py-0.5 rounded font-mono text-[11px]">processVideoSrc</code> trong code để phát trực tiếp.
                    </p>
                    <button
                      onClick={() => setShowVideoModal(false)}
                      className="px-6 py-2.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
                    >
                      Đã hiểu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      </main>
      <Footer />
    </div>
  )
}
