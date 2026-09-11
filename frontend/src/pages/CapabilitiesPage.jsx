import React, { useState, useEffect, useRef } from 'react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'
import Certifications from '../components/Certifications'
import { Play } from 'lucide-react'

import heroFactoryImg from '../assets/kiem-soat-chat-luong.jpg'
import factoryHqImg from '../assets/may-tron-banh-trang.jpg'
import factoryImg from '../assets/Kho-banh-trang.jpg'
import cakeMoldingImg from '../assets/factory/may-tao-hinh-banh.jpg'
import bakedCakesImg from '../assets/factory/san-xuat-banh-nuong.jpg'
import distributionImg from '../assets/distribution/distribution_export.jpg'

import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/k-market.webp'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'
import lotteLogo from '../assets/pictures_doitac/lotte.png'

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
  { name: 'Lotte Mart', logo: lotteLogo },
  { name: 'Circle K', logo: circleKLogo },
  { name: 'GS25', logo: gs25Logo },
  { name: 'K-Market', logo: kmartLogo },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
]

/* ═══════════════════════════════════════════════════ */
export default function CapabilitiesPage() {
  const { t, language } = useLanguage()
  const en = language === 'en', ko = language === 'ko'

  // Video Quy trình sản xuất HAQ FOOD (Phát trực tiếp tại chỗ, chuẩn mp4)
  const processVideoSrc = '/videos/quy-trinh-san-xuat.mp4'
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handleStartPlay = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Playback error:', err)
      })
    }
  }

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
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink leading-snug mb-5">
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

            {/* Bộ 4 ảnh chi tiết dây chuyền máy móc & chế biến */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Reveal delay={200}>
                <div className="rounded-2xl overflow-hidden border border-haq-border shadow-xs bg-white group">
                  <img 
                    src={factoryHqImg} 
                    alt="Hệ thống máy móc chế biến" 
                    className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="rounded-2xl overflow-hidden border border-haq-border shadow-xs bg-white group">
                  <img 
                    src={factoryImg} 
                    alt="Khu vực dây chuyền sản xuất và lưu kho" 
                    className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="rounded-2xl overflow-hidden border border-haq-border shadow-xs bg-white group">
                  <img 
                    src={cakeMoldingImg} 
                    alt="Dây chuyền tạo hình và định lượng bánh tự động" 
                    className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
              </Reveal>

              <Reveal delay={350}>
                <div className="rounded-2xl overflow-hidden border border-haq-border shadow-xs bg-white group">
                  <img 
                    src={bakedCakesImg} 
                    alt="Quy trình nướng và kiểm soát chất lượng mẻ bánh" 
                    className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
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
                  <div className="h-px w-6 bg-white" />
                  <span className="font-heading text-xs font-bold text-white uppercase tracking-[0.2em]">
                    {en ? 'STANDARDIZED WORKFLOW' : ko ? '표준 제조 공정' : 'QUY CHUẨN VẬN HÀNH'}
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-snug">
                  Quy trình sản xuất <span className="text-white">6 công đoạn</span>
                </h2>
                <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl">
                  Hệ thống vận hành liên hoàn kiểm soát nhiệt ẩm và an toàn vệ sinh thực phẩm nghiêm ngặt từ khâu tiếp nhận nguyên liệu, chế biến kỹ thuật, tùy biến OEM/ODM đến đóng gói và xuất kho.
                </p>
              </Reveal>
            </div>

            {/* VIDEO SHOWCASE: Phát trực tiếp tại chỗ khi bấm, không mở cửa sổ modal */}
            <Reveal delay={100} className="mb-14 sm:mb-20">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                {/* 16:9 Cinema Container */}
                <div className="relative aspect-video max-h-[560px] w-full overflow-hidden flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    src={processVideoSrc}
                    poster={factoryImg}
                    controls={isPlaying}
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => {}}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full object-cover"
                  />

                  {/* Khi chưa bấm Play: Hiển thị poster và nút Play tròn (đã bỏ toàn bộ các nhãn chữ theo yêu cầu) */}
                  {!isPlaying && (
                    <div 
                      onClick={handleStartPlay}
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-black/40 hover:bg-black/25 transition-all group"
                    >
                      {/* Play Button */}
                      <div className="relative mb-3 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute -inset-3 rounded-full bg-[#16A34A]/30 animate-ping opacity-75" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center shadow-2xl shadow-[#16A34A]/50 transition-colors">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                        </div>
                      </div>
                      <span className="font-heading font-bold text-sm sm:text-base text-white tracking-wide uppercase drop-shadow-md">
                        {en ? 'Watch Production Process Video' : ko ? '공정 영상 시청' : 'Xem Video Quy Trình Sản Xuất'}
                      </span>
                    </div>
                  )}
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
                  <div className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/40 rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                        <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white/50 group-hover:text-white transition-colors">
                          {proc.step}
                        </span>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                          STEP {proc.step}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-[17px] text-white leading-snug mb-3 group-hover:text-white transition-colors">
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
              <span className="font-heading text-xs font-bold text-white uppercase tracking-[0.2em]">
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

      </main>
      <Footer />
    </div>
  )
}
