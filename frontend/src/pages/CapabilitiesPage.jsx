import React, { useState, useEffect, useRef } from 'react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'
import Certifications from '../components/Certifications'
import { Play } from 'lucide-react'

import heroFactoryImg from '../assets/kiem-soat-chat-luong.webp'
import factoryHqImg from '../assets/may-tron-banh-trang.webp'
import factoryImg from '../assets/Kho-banh-trang.webp'
import cakeMoldingImg from '../assets/factory/may-tao-hinh-banh.webp'
import bakedCakesImg from '../assets/factory/san-xuat-banh-nuong.webp'
import distributionImg from '../assets/distribution/distribution_export.webp'

import winmartLogo from '../assets/pictures_doitac/winmart.webp'
import goLogo from '../assets/pictures_doitac/go!.webp'
import circleKLogo from '../assets/pictures_doitac/Circle_K.webp'
import gs25Logo from '../assets/pictures_doitac/gs25.webp'
import kmartLogo from '../assets/pictures_doitac/k-market.webp'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.webp'
import lotteLogo from '../assets/pictures_doitac/lotte.webp'

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
  { name: 'WinMart', logo: winmartLogo, className: 'max-h-10 sm:max-h-12' },
  { name: 'GO!', logo: goLogo, className: 'max-h-11 sm:max-h-13' },
  { name: 'Lotte Mart', logo: lotteLogo, className: 'max-h-14 sm:max-h-18 scale-115' },
  { name: 'Circle K', logo: circleKLogo, className: 'max-h-10 sm:max-h-12' },
  { name: 'GS25', logo: gs25Logo, className: 'max-h-10 sm:max-h-12' },
  { name: 'K-Market', logo: kmartLogo, className: 'max-h-11 sm:max-h-13' },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo, className: 'max-h-9 sm:max-h-11' },
]

/* ═══════════════════════════════════════════════════ */
export default function CapabilitiesPage() {
  const { t, language } = useLanguage()
  const en = language === 'en', ko = language === 'ko', zh = language === 'zh'

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
                    {en ? 'MANUFACTURING & QUALITY' : ko ? '생산 및 품질 관리' : zh ? '生产实力与品质管控' : 'NĂNG LỰC SẢN XUẤT · HAQ FOOD'}
                  </span>
                </div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink leading-snug mb-5">
                  {en 
                    ? 'Advanced Production Technology & Quality Control' 
                    : ko 
                    ? '현대식 생산 기술 및 품질 관리' 
                    : zh
                    ? '先进生产工艺与严苛品质管控'
                    : 'Công nghệ sản xuất tiên tiến & Kiểm soát chất lượng'}
                </h1>
                <p className="text-sm sm:text-base text-haq-text-secondary leading-[1.8] max-w-2xl">
                  {en
                    ? 'Investing systematically in modern industrial machinery and closed-loop workflows, HAQ FOOD standardizes each processing stage to preserve signature flavors and meet the most rigorous international food safety standards.'
                    : ko
                    ? '현대적인 산업 기계와 폐쇄형 공정에 체계적으로 투자하여 시그니처 풍미를 보존하고 가장 엄격한 국제 식품 안전 기준을 충족합니다.'
                    : zh
                    ? '全面投资现代化工业生产设备与全封闭式作业流程，HAQ FOOD 将每道工序标准化，全力锁住地道风味并严苛满足国际食品安全标准。'
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
                    {en ? 'STANDARDIZED WORKFLOW' : ko ? '표준 제조 공정' : zh ? '标准化生产工序' : 'QUY CHUẨN VẬN HÀNH'}
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-snug">
                  {en ? <>Standardized <span className="text-white">6-Stage Production</span></> : ko ? <>표준 제조 <span className="text-white">6단계 공정</span></> : zh ? <>标准化 <span className="text-white">6大生产工序</span></> : <>Quy trình sản xuất <span className="text-white">6 công đoạn</span></>}
                </h2>
                <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl">
                  {en
                    ? 'Continuous operating system strictly monitoring temperature, humidity and hygiene from raw material reception, precision processing, OEM/ODM customization to final packaging and dispatch.'
                    : ko
                    ? '원료 입고, 기술 가공, OEM/ODM 맞춤화부터 포장 및 출고까지 엄격한 온습도 관리와 식품 위생을 유지하는 연속 운영 시스템입니다.'
                    : zh
                    ? '流水线作业系统，从原料验收、工艺加工、OEM/ODM定制化到包装出库，全流程严控温湿度及食品卫生安全。'
                    : 'Hệ thống vận hành liên hoàn kiểm soát nhiệt ẩm và an toàn vệ sinh thực phẩm nghiêm ngặt từ khâu tiếp nhận nguyên liệu, chế biến kỹ thuật, tùy biến OEM/ODM đến đóng gói và xuất kho.'}
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
                        {en ? 'Watch Production Process Video' : ko ? '공정 영상 시청' : zh ? '观看生产工艺全景视频' : 'Xem Video Quy Trình Sản Xuất'}
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
                  title: en ? 'Raw Material Intake & Inspection' : ko ? '원재료 입고 및 품질 검사' : zh ? '原料验收与严格把控' : 'Tiếp nhận và kiểm soát nguyên liệu đầu vào',
                  desc: en ? 'All raw materials and spices are strictly verified for traceability and premium quality before entering production.' : ko ? '모든 원자재와 향신료는 생산에 투입되기 전 원산지와 품질을 철저히 검증합니다.' : zh ? '所有原辅料及调味料在投入生产前，均经过严格的源头溯源与品质抽检。' : 'Toàn bộ nguồn nguyên liệu và gia vị được kiểm soát chặt chẽ về nguồn gốc và chất lượng trước khi đưa vào sản xuất.',
                },
                {
                  step: '02',
                  title: en ? 'Mixing & Precision Processing' : ko ? '배합 및 정밀 가공' : zh ? '配比搅拌与精细加工' : 'Phối trộn và chế biến kỹ thuật',
                  desc: en ? 'Dedicated industrial stainless steel mixers blend ingredients evenly, standardizing recipes under rigorous technical parameters.' : ko ? '전용 산업용 스테인리스 믹서를 사용하여 원재료를 균일하게 배합하고 기술 표준에 따라 레시피를 정형화합니다.' : zh ? '采用专业食品级不锈钢混料机，确保原辅料均匀调配，严格按照技术标准实现配方标准化。' : 'Sử dụng hệ thống máy trộn inox công nghiệp chuyên dụng để phối trộn nguyên phụ liệu đồng đều, chuẩn hóa công thức theo quy chuẩn kỹ thuật.',
                },
                {
                  step: '03',
                  title: en ? 'Custom Formula Development (OEM/ODM)' : ko ? '맞춤형 레시피 조정 (OEM/ODM)' : zh ? '配方定制与研发 (OEM/ODM)' : 'Tùy biến công thức theo đối tác (OEM/ODM)',
                  desc: en ? 'Flexible adjustments to flavor profiles, spice ratios, and packaging specifications per private label partner requirements.' : ko ? '파트너사의 개별 주문 요구사항에 따라 풍미, 양념 비율, 완제품 규격을 유연하게 조정합니다.' : zh ? '根据品牌合作伙伴的定制需求，灵活调整口味风味、香料配比以及成品规格包装。' : 'Linh hoạt điều chỉnh khẩu vị, tỷ lệ gia vị và quy cách thành phẩm theo yêu cầu đặt hàng riêng của từng đối tác.',
                },
                {
                  step: '04',
                  title: en ? 'Automated Packaging Line' : ko ? '자동화 포장 라인' : zh ? '全自动化流水线包装' : 'Đóng gói trên dây chuyền',
                  desc: en ? 'Products are precisely measured and packaged (jars, zip pouches) along clean conveyers under strict hygiene protocols.' : ko ? '제품은 엄격한 위생 관리 컨베이어 라인에서 정량화되어 완제품(용기, 지퍼백)으로 포장됩니다.' : zh ? '产品在洁净输送线上完成精准计量与包装（食品罐、自封袋），执行严格卫生作业。' : 'Sản phẩm được định lượng và đóng gói thành phẩm (hũ nhựa, túi zip) trên băng chuyền kiểm soát vệ sinh nghiêm ngặt.',
                },
                {
                  step: '05',
                  title: en ? 'Strict Quality Control & Sample Retention' : ko ? '엄격한 품질 검사 및 샘플 보관' : zh ? '严苛质检与留样备查 (Strict QC)' : 'Kiểm định chất lượng và lưu mẫu (Strict QC)',
                  desc: en ? 'Batch-by-batch QA testing with mandatory sample retention for transparent traceability across all production runs.' : ko ? '각 로트별 완제품 품질 검사를 실시하고 원산지 추적을 위해 대조 샘플을 의무 보관합니다.' : zh ? '按批次对成品开展全面抽检与理化指标检测，强制留样备查，确保每一批次全链路可溯源。' : 'Tiến hành kiểm tra chất lượng thành phẩm theo từng lô và bắt buộc lưu mẫu đối chứng đầy đủ để phục vụ truy xuất nguồn gốc.',
                },
                {
                  step: '06',
                  title: en ? 'Standardized Storage & Dispatch' : ko ? '표준 보관 및 투명 출고' : zh ? '规范仓储与高效出库' : 'Lưu kho và xuất kho minh bạch',
                  desc: en ? 'Systematically organized in compliant warehouses with scientific shelf categorization, supporting massive continuous orders.' : ko ? '규격 창고에서 과학적으로 분류 보관되며, 대규모 연속 주문을 수용할 수 있는 투명한 출고 프로세스로 운영됩니다.' : zh ? '货物存放于标准化仓储空间，货架科学分区，高效透明的出库体系稳定保障大宗订单持续供应。' : 'Hàng hóa được sắp xếp tại khu vực lưu trữ quy chuẩn, phân loại khoa học theo kệ hàng, vận hành theo quy trình xuất kho minh bạch nhằm đáp ứng các đơn hàng lớn và liên tục.',
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
                {en ? 'Distribution & Export' : ko ? '유통 및 수출' : zh ? '渠道分销与海外出口' : 'Phân phối & Xuất khẩu'}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2 max-w-xl">
                {en ? 'Retail Network & International Export' : ko ? '전국 유통망 및 해외 수출 네트워크' : zh ? '全国零售网络与国际出口' : 'Mạng lưới bán lẻ & Xuất khẩu quốc tế'}
              </h2>
              <p className="mt-4 text-sm text-white/50 max-w-lg leading-relaxed">
                {en
                  ? 'Present across 3,000+ retail stores in Vietnam with official exports to South Korea and Taiwan.'
                  : ko
                  ? '베트남 전역 3,000개 이상의 매장 입점 및 한국, 대만 정식 수출 진행 중.'
                  : zh
                  ? '进驻越南超 3,000 家零售终端，并已实现对韩国、中国台湾的正关出口。'
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
                  className="flex w-max gap-8 sm:gap-12 group-hover:[animation-play-state:paused]"
                  style={{ animation: 'marquee-scroll 24s linear infinite' }}
                >
                  {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
                    <div
                      key={i}
                      className="h-16 sm:h-20 w-36 sm:w-48 shrink-0 flex items-center justify-center px-3 sm:px-4"
                    >
                      <img
                        src={p.logo}
                        alt={p.name}
                        className={`${p.className || 'max-h-10 sm:max-h-13'} max-w-full object-contain`}
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
                  { code: 'vn', name: en ? 'Vietnam — Nationwide' : ko ? '베트남 — 전국' : zh ? '越南 — 全国各省' : 'Việt Nam — Toàn quốc' },
                  { code: 'kr', name: en ? 'South Korea' : ko ? '한국' : zh ? '韩国' : 'Hàn Quốc' },
                  { code: 'tw', name: en ? 'Taiwan' : ko ? '대만' : zh ? '中国台湾' : 'Đài Loan' },
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
