import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'

import factoryImg from '../assets/factory/factory_production.jpg'
import labImg from '../assets/quality/quality_control_lab.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import distributionImg from '../assets/distribution/distribution_export.jpg'

import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'

/* ─── Reveal ──────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el) } }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-[800ms] ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function CapabilitiesPage() {
  const { t, language } = useLanguage()
  const en = language === 'en', ko = language === 'ko'
  const [activeStep, setActiveStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  useEffect(() => { setTimeout(() => setHeroReady(true), 100) }, [])

  // Auto-cycle QC steps
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5)
    }, 4000)
    return () => clearInterval(timer)
  }, [paused])

  // When user clicks a step manually, pause then resume after 8s
  const handleStepClick = (idx) => {
    setActiveStep(idx)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  const qualitySteps = useMemo(() => [
    { step: '01', name: en ? 'Raw Material Control' : ko ? '원재료 입고 검사' : 'Kiểm soát Nguyên liệu', desc: en ? 'Sensory evaluation, moisture testing, pesticide residue and origin traceability checks for each lot of agri-produce, spices and packaging prior to warehousing.' : ko ? '입고 전 모든 농산물, 향신료 및 포장재에 대해 관능 검사, 수분율 측정, 잔류물 및 원산지 이력 추적을 철저히 실시합니다.' : 'Đánh giá cảm quan, kiểm tra độ ẩm, dư lượng và nguồn gốc xuất xứ của từng lô nông sản, gia vị và bao bì trước khi nhập kho.' },
    { step: '02', name: en ? 'Lab Testing & Safety' : ko ? '연구소 안전성 검증' : 'Kiểm nghiệm Phòng Lab', desc: en ? 'Microbiological analysis, heavy metal assays, and national technical food safety parameter verification.' : ko ? '국가 기술 규격에 따라 미생물 수치, 중금속 및 식품 안전 위생 기준을 정밀 분석합니다.' : 'Xét nghiệm chỉ tiêu vi sinh, kim loại nặng và các tiêu chuẩn an toàn vệ sinh thực phẩm theo quy chuẩn kỹ thuật quốc gia.' },
    { step: '03', name: en ? 'Closed Production' : ko ? '밀폐형 클린 공정' : 'Chế biến Khép kín', desc: en ? 'Automated production inside positive-pressure cleanrooms, sterile protective suits, and precisely modulated drying temperatures.' : ko ? '양압 클린룸 내 자동화 생산 라인, 무균 방호복 착용 및 정밀한 건조 온도 제어로 안전을 보장합니다.' : 'Quy trình sản xuất tự động trong phòng sạch, công nhân trang bị đồ bảo hộ vô trùng, kiểm soát nhiệt độ sấy chuẩn xác.' },
    { step: '04', name: en ? 'Batch Sample Storage' : ko ? '로트별 검체 보관' : 'Lưu mẫu Từng lô', desc: en ? 'Every production lot is archived in an independent inspection facility throughout shelf-life for 100% full traceability.' : ko ? '출고되는 모든 생산 로트의 검체는 유통기한 동안 독립 검사 시설에 보관되어 철저한 역추적이 가능합니다.' : 'Mỗi lô thành phẩm xuất xưởng đều được lưu mẫu tại phòng kiểm định độc lập trong suốt hạn sử dụng để truy xuất nguồn gốc.' },
    { step: '05', name: en ? 'Sealed Packaging & Distribution' : ko ? '밀봉 포장 및 유통' : 'Đóng gói & Phân phối', desc: en ? 'Multi-layer barrier packaging, QR traceability, and clear expiry dates ready for supermarket distribution and international export.' : ko ? '다층 방습 포장과 QR 이력 코드, 선명한 유통기한 표기로 대형 유통망 및 해외 수출에 즉각 대응합니다.' : 'Bao bì nhiều lớp chống ẩm, in mã QR truy xuất và hạn sử dụng rõ ràng, sẵn sàng cung ứng cho chuỗi bán lẻ và xuất khẩu.' },
  ], [language])

  const PARTNERS = [
    { name: 'WinMart', logo: winmartLogo },
    { name: 'GO!', logo: goLogo },
    { name: 'Circle K', logo: circleKLogo },
    { name: 'GS25', logo: gs25Logo },
    { name: 'K-Market', logo: kmartLogo },
    { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
  ]

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col relative">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">

        {/* ═══════════════════════════════════════════════════════════
            HERO — Split: text left + factory image right
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-haq-border overflow-hidden">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[70vh]">
              {/* Text side */}
              <div className="flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
                <p className={`font-heading text-xs tracking-[0.25em] text-[#C89B3C] uppercase mb-5 transition-all duration-700 delay-200 ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                  {t('capabilities.badge', 'Năng lực doanh nghiệp')}
                </p>
                <h1 className={`font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.25rem] text-haq-ink tracking-tight leading-[1.1] transition-all duration-700 delay-[400ms] ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
                  {en ? 'Manufacturing & Quality Control' : ko ? '생산 시설 및 품질 관리' : 'Năng lực sản xuất & Kiểm soát chất lượng'}
                </h1>
                <p className={`mt-5 text-sm sm:text-base text-haq-text-secondary leading-[1.8] transition-all duration-700 delay-[600ms] ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                  {t('capabilities.subtitle', 'Hạ tầng nhà máy hiện đại đạt chuẩn ISO 22000 & HACCP, dây chuyền sấy giòn khép kín, phòng kiểm định độc lập và năng lực gia công OEM/ODM toàn diện cho đối tác.')}
                </p>

                {/* Quick capability pills */}
                <div className={`mt-8 flex flex-wrap gap-2.5 transition-all duration-700 delay-[800ms] ${heroReady ? 'opacity-100' : 'opacity-0'}`}>
                  {[
                    en ? 'ISO 22000' : 'ISO 22000',
                    en ? 'HACCP Codex' : 'HACCP Codex',
                    en ? 'Cleanroom' : ko ? '클린룸' : 'Phòng sạch',
                    'OEM / ODM',
                  ].map((pill) => (
                    <span key={pill} className="font-heading text-[11px] font-bold text-haq-red border border-haq-red/25 px-3.5 py-1.5 rounded-full">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image side — full height, no border */}
              <div className={`relative hidden lg:block transition-all duration-1000 delay-300 ${heroReady ? 'opacity-100' : 'opacity-0 translate-x-12'}`}>
                <img src={factoryImg} alt="Nhà máy HAQ FOOD" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent w-24" />
              </div>
              {/* Mobile image */}
              <div className="lg:hidden rounded-2xl overflow-hidden mb-8">
                <img src={factoryImg} alt="Nhà máy HAQ FOOD" className="w-full aspect-video object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            KEY FIGURES — Horizontal number strip
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#0C1E15] text-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
              {[
                { val: '100%', label: en ? 'Automated drying & mixing' : ko ? '혼합·건조 자동화' : 'Tự động hóa sấy & trộn' },
                { val: en ? 'CLEANROOM' : ko ? '클린룸' : 'PHÒNG SẠCH', label: en ? 'Positive-pressure sterile' : ko ? '양압 무균 환경' : 'Vô trùng áp suất dương' },
                { val: '5', label: en ? 'QC control steps' : ko ? '품질 관리 단계' : 'Bước kiểm soát KCS' },
                { val: 'OEM', label: en ? 'Full-service manufacturing' : ko ? '풀서비스 위탁 제조' : 'Gia công trọn gói' },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 100} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-[#C89B3C]">{s.val}</div>
                  <div className="text-xs text-white/50 mt-1">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            NHÀ MÁY — Immersive full-width + capabilities grid
            ═══════════════════════════════════════════════════════════ */}
        <section id="nha-may" className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <Reveal>
                  <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em]">
                    01 — {en ? 'Manufacturing' : ko ? '제조 시설' : 'Năng lực nhà máy'}
                  </span>
                  <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink tracking-tight leading-tight mt-2">
                    {t('capabilities.cleanroom_title', 'Dây chuyền khép kín chuẩn ISO 22000')}
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <p className="mt-4 text-sm text-haq-text-secondary leading-[1.8]">
                    {t('capabilities.cleanroom_desc', 'Hệ thống máy sấy nhiệt đối lưu, buồng sấy nổ công nghệ cao và máy đóng gói nhiều lớp giúp bảo toàn hương vị tự nhiên và độ giòn đặc trưng của từng mẻ bánh.')}
                  </p>
                </Reveal>

                {/* 2x2 capability highlights */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { val: '100%', label: en ? 'Automated mixing & drying' : ko ? '혼합·건조 자동화' : 'Tự động hóa trộn & sấy' },
                    { val: en ? 'Cleanroom' : ko ? '클린룸' : 'Phòng sạch', label: en ? 'Positive pressure sterile' : ko ? '양압 무균 환경' : 'Vô trùng áp suất dương' },
                    { val: 'ISO', label: en ? '22000:2018 Certified' : ko ? '22000:2018 인증' : '22000:2018' },
                    { val: 'HACCP', label: en ? 'Codex Alimentarius' : ko ? 'Codex 규격' : 'Codex Alimentarius' },
                  ].map((c, i) => (
                    <Reveal key={i} delay={300 + i * 80}>
                      <div className="bg-haq-cream/60 rounded-xl p-5 border border-haq-border/60">
                        <div className="font-heading font-extrabold text-xl text-haq-red">{c.val}</div>
                        <div className="text-xs text-haq-text-secondary mt-1">{c.label}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal delay={200}>
                <div className="rounded-2xl overflow-hidden">
                  <img src={factoryImg} alt="Nhà máy sản xuất" className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            QC — Interactive 5-step stepper
            ═══════════════════════════════════════════════════════════ */}
        <section id="chat-luong" className="py-20 sm:py-28 bg-haq-cream/40 border-y border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal>
              <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em]">
                02 — {en ? 'Quality Control' : ko ? '품질 관리' : 'Kiểm soát chất lượng'}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink tracking-tight mt-2 mb-4">
                {t('capabilities.process_title', 'Quy trình kiểm soát 5 bước nghiêm ngặt')}
              </h2>
              <p className="text-sm text-haq-text-secondary max-w-xl mb-12">
                {en ? 'Applying strict HACCP and ISO 22000 standards across every stage from raw ingredient selection to certified sample archiving.'
                  : ko ? '원료 선별부터 보관 검체 인증까지 모든 단계에 HACCP 및 ISO 22000 규격을 철저히 적용합니다.'
                  : 'Áp dụng quy chuẩn HACCP và ISO 22000 trong mọi công đoạn từ tuyển chọn nguyên liệu đến lưu mẫu bảo chứng.'}
              </p>
            </Reveal>

            {/* Horizontal step selector (desktop) */}
            <Reveal delay={150}>
              <div className="hidden lg:flex items-stretch gap-0 mb-12 bg-white rounded-2xl border border-haq-border overflow-hidden">
                {qualitySteps.map((item, idx) => (
                  <button
                    key={item.step}
                    onClick={() => handleStepClick(idx)}
                    className={`flex-1 py-5 px-4 text-center cursor-pointer transition-all border-b-2 ${
                      activeStep === idx
                        ? 'bg-haq-cream/60 border-haq-red text-haq-ink'
                        : 'border-transparent text-haq-text-secondary hover:bg-haq-cream/30'
                    }`}
                  >
                    <div className={`font-heading font-extrabold text-2xl ${activeStep === idx ? 'text-haq-red' : 'text-haq-border'}`}>{item.step}</div>
                    <div className="font-heading font-bold text-xs mt-1 uppercase tracking-wide">{item.name}</div>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Step content + image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                {/* Mobile: vertical step list */}
                <div className="lg:hidden space-y-3 mb-8">
                  {qualitySteps.map((item, idx) => (
                    <button
                      key={item.step}
                      onClick={() => handleStepClick(idx)}
                      className={`w-full text-left p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${
                        activeStep === idx
                          ? 'bg-white border border-haq-red shadow-sm'
                          : 'bg-white/50 border border-haq-border/50'
                      }`}
                    >
                      <span className={`font-heading font-extrabold text-lg shrink-0 ${activeStep === idx ? 'text-haq-red' : 'text-haq-border'}`}>{item.step}</span>
                      <span className={`font-heading font-bold text-sm ${activeStep === idx ? 'text-haq-ink' : 'text-haq-text-secondary'}`}>{item.name}</span>
                    </button>
                  ))}
                </div>

                {/* Active step detail */}
                <div className="bg-white rounded-2xl p-8 border border-haq-border">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-heading font-extrabold text-4xl text-haq-red">{qualitySteps[activeStep].step}</span>
                    <span className="h-px flex-1 bg-haq-border" />
                    <span className="text-xs text-haq-text-secondary">{en ? `Step ${qualitySteps[activeStep].step} of 05` : ko ? `${qualitySteps[activeStep].step} / 05단계` : `Bước ${qualitySteps[activeStep].step} / 05`}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-haq-ink mb-3">
                    {qualitySteps[activeStep].name}
                  </h3>
                  <p className="text-sm text-haq-text-secondary leading-[1.8]">
                    {qualitySteps[activeStep].desc}
                  </p>
                </div>
              </div>

              <Reveal delay={200}>
                <div className="rounded-2xl overflow-hidden">
                  <img src={labImg} alt="Phòng lab kiểm nghiệm" className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            OEM / ODM — Text right + image left (reversed from nhà máy)
            ═══════════════════════════════════════════════════════════ */}
        <section id="oem-odm" className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image left */}
              <Reveal>
                <div className="rounded-2xl overflow-hidden">
                  <img src={b2bImg} alt="OEM/ODM Partnership" className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700" />
                </div>
              </Reveal>

              {/* Text right */}
              <div>
                <Reveal delay={150}>
                  <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em]">
                    03 — {en ? 'Contract Manufacturing' : ko ? 'OEM/ODM 제조' : 'Gia công thực phẩm'}
                  </span>
                  <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink tracking-tight leading-tight mt-2">
                    {t('capabilities.oem_title', 'Dịch vụ gia công OEM / ODM chuyên nghiệp')}
                  </h2>
                </Reveal>
                <Reveal delay={300}>
                  <p className="mt-4 text-sm text-haq-text-secondary leading-[1.8]">
                    {t('capabilities.oem_desc', 'Đồng hành cùng các thương hiệu bán lẻ, chuỗi F&B và nhà phân phối phát triển các dòng sản phẩm bánh tráng và đồ ăn vặt đóng gói riêng.')}
                  </p>
                </Reveal>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      title: en ? 'Regulatory Dossier & Lab Testing' : ko ? '자가품질검사 및 신고 서류 지원' : 'Hỗ trợ hồ sơ tự công bố & Kiểm nghiệm',
                      desc: en ? 'Comprehensive guidance on legal compliance, microbiological testing, and quality declaration.' : ko ? '법적 행정 절차, 미생물 시험 및 품질 적합 인증을 전폭적으로 지원합니다.' : 'Tư vấn đầy đủ thủ tục pháp lý, kiểm nghiệm vi sinh và công bố chất lượng.',
                    },
                    {
                      title: en ? 'Custom Packaging & Bespoke Recipes' : ko ? '포장 규격 및 맞춤형 시즈닝 개발' : 'Tùy biến bao bì & công thức gia vị',
                      desc: en ? 'Flexible zipper pouch sizing, aluminum foil canisters, gift sets, and regional taste calibration.' : ko ? '스탠딩 지퍼백, 알루미늄 캔, 선물용 박스 및 현지 맞춤형 풍미를 유연하게 제공합니다.' : 'Linh hoạt kích cỡ túi zip, hũ nắp nhôm, hộp quà tặng và khẩu vị vùng miền.',
                    },
                  ].map((item, i) => (
                    <Reveal key={i} delay={450 + i * 120}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-1" />
                        <div>
                          <h4 className="font-heading font-bold text-sm text-haq-ink">{item.title}</h4>
                          <p className="text-xs text-haq-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            PHÂN PHỐI — Full-width panorama + partner logos
            ═══════════════════════════════════════════════════════════ */}
        <section id="phan-phoi" className="bg-[#0C1E15] text-white py-20 sm:py-28 relative overflow-hidden">
          {/* Background image */}
          <img src={distributionImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0C1E15]/70" />

          <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal>
              <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em]">
                04 — {en ? 'Distribution & Export' : ko ? '유통 및 수출' : 'Phân phối & Xuất khẩu'}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2 max-w-xl">
                {en ? 'Retail Network & International Export' : ko ? '전국 유통망 및 해외 수출 네트워크' : 'Mạng lưới bán lẻ & Xuất khẩu quốc tế'}
              </h2>
              <p className="mt-4 text-sm text-white/50 max-w-lg leading-relaxed">
                {en ? 'Present across 3,000+ retail stores in Vietnam with official exports to South Korea and Taiwan.' : ko ? '베트남 전역 3,000개 이상의 매장 입점 및 한국, 대만 정식 수출 진행 중.' : 'Hiện diện tại hơn 3.000 điểm bán lẻ tại Việt Nam và xuất khẩu chính ngạch sang Hàn Quốc, Đài Loan.'}
              </p>
            </Reveal>

            {/* Partner logos on dark */}
            <Reveal delay={200}>
              <div className="mt-14 grid grid-cols-3 sm:grid-cols-6 gap-4">
                {PARTNERS.map((p, i) => (
                  <div key={i} className="h-20 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors">
                    <img src={p.logo} alt={p.name} className="max-h-9 max-w-full object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Export markets */}
            <Reveal delay={350}>
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { flag: '🇻🇳', name: en ? 'Vietnam — Nationwide' : ko ? '베트남 — 전국' : 'Việt Nam — Toàn quốc' },
                  { flag: '🇰🇷', name: en ? 'South Korea' : ko ? '한국' : 'Hàn Quốc' },
                  { flag: '🇹🇼', name: en ? 'Taiwan' : ko ? '대만' : 'Đài Loan' },
                ].map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/80">
                    <span className="text-lg">{m.flag}</span>
                    <span className="font-heading font-bold text-xs">{m.name}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA — Contact partnership
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 text-center">
            <Reveal>
              <div className="max-w-2xl mx-auto">
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink tracking-tight">
                  {en ? 'Partner with HAQ Food' : ko ? 'HAQ FOOD와의 비즈니스 파트너십' : 'Hợp tác doanh nghiệp cùng HAQ Food'}
                </h2>
                <p className="mt-4 text-sm text-haq-text-secondary leading-relaxed">
                  {en ? 'Contact our sales and OEM/ODM team directly to receive product catalogs and distributor policies.' : ko ? '영업 및 OEM/ODM 담당 부서로 직접 문의하시면 카탈로그와 유통 정책을 안내해 드립니다.' : 'Liên hệ trực tiếp với bộ phận kinh doanh & OEM/ODM để nhận catalog và chính sách đại lý.'}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/lien-he"
                    className="w-full sm:w-auto px-8 py-4 bg-haq-red text-white font-heading font-bold text-sm rounded-full hover:bg-haq-red/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{en ? 'Contact us' : ko ? '문의하기' : 'Liên hệ hợp tác'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/san-pham"
                    className="w-full sm:w-auto px-8 py-4 text-haq-ink font-heading font-bold text-sm rounded-full border border-haq-border hover:bg-haq-cream transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{en ? 'View products' : ko ? '제품 보기' : 'Xem sản phẩm'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
