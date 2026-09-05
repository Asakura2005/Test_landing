import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'

import factoryImg from '../assets/factory/factory_production.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'
import heroBanner1 from '../assets/herobanner/hero_banner_1.jpg'
import factoryHqImg from '../assets/about/factory_hq.jpg'
import riceFieldImg from '../assets/about/rice_field.jpg'
import labInspectionImg from '../assets/about/lab_inspection.jpg'
import cargoExportImg from '../assets/about/cargo_export.jpg'

/* ───────────────────────────────────────────────────────────────────
   Scroll Reveal Component — fade + slide up on viewport entry
   ─────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────────
   Data — Core Values (TÂM – TÍN – TINH)
   ─────────────────────────────────────────────────────────────────── */
const getCoreValues = (lang) => {
  if (lang === 'en') {
    return [
      { key: 'DEVOTION', title: 'PROFESSIONAL CONSCIENCE & CARE', tagline: 'Prioritizing genuine quality and human responsibility.', desc: 'Food nourishes human vitality directly. Every item is produced with the deepest care, just like meals prepared for our own families.', number: '01' },
      { key: 'INTEGRITY', title: 'TRANSPARENCY & RELIABILITY', tagline: 'Fulfilling commitments to clients and partners.', desc: 'Forging partnerships built on transparency, contract fidelity, punctual delivery, and unwavering consistency across batches.', number: '02' },
      { key: 'EXCELLENCE', title: 'INNOVATION & LOCAL VALUE', tagline: 'Continually elevating processes and Vietnamese agricultural value.', desc: 'Applying closed convection drying tech, standardizing traditional recipes, and augmenting added value for Vietnamese farms.', number: '03' },
    ]
  }
  if (lang === 'ko') {
    return [
      { key: '진심 (TÂM)', title: '식품에 대한 정성과 양심', tagline: '품질과 생명에 대한 책임을 최우선합니다.', desc: '음식은 사람의 몸으로 직접 들어갑니다. 내 가족의 식탁에 올리는 마음으로 정성을 다해 안전하게 제조합니다.', number: '01' },
      { key: '신뢰 (TÍN)', title: '정직과 변함없는 신뢰', tagline: '고객 및 B2B 파트너와의 약속을 지킵니다.', desc: '철저한 품질 일관성, 정확한 납기 준수 및 투명한 계약 이행으로 지속 가능한 비즈니스 파트너십을 만듭니다.', number: '02' },
      { key: '혁신 (TINH)', title: '기술 혁신과 농산물 가치 제고', tagline: '베트남 청정 농산물의 가치를 극대화합니다.', desc: '밀폐 대류 건조 기술을 접목하여 전통 제조법을 현대화하고 베트남 농산물의 글로벌 가치를 높입니다.', number: '03' },
    ]
  }
  return [
    { key: 'TÂM', title: 'ĐẠO ĐỨC & LƯƠNG TÂM NGHỀ NGHIỆP', tagline: 'Đặt chất lượng và trách nhiệm lên trước.', desc: 'Chúng tôi hiểu rằng thực phẩm đi trực tiếp vào cơ thể người dùng. Mọi sản phẩm xuất xưởng đều được kiểm soát với tinh thần trách nhiệm cao nhất, như chính món ăn chuẩn bị cho gia đình.', number: '01' },
    { key: 'TÍN', title: 'CHÍNH TRỰC & CAM KẾT VỮNG BỀN', tagline: 'Giữ trọn cam kết với khách hàng và đối tác.', desc: 'Xây dựng mối quan hệ dựa trên sự minh bạch, tôn trọng hợp đồng, đúng tiến độ giao hàng và giữ vững phẩm chất sản phẩm qua từng lô xuất xưởng.', number: '02' },
    { key: 'TINH', title: 'TINH HOA & ĐỔI MỚI LIÊN TỤC', tagline: 'Không ngừng hoàn thiện sản phẩm, quy trình và giá trị nông sản Việt.', desc: 'Ứng dụng công nghệ sấy sạch đối lưu, chuẩn hóa công thức chế biến truyền thống, nâng cao giá trị gia tăng cho nguồn nông sản địa phương.', number: '03' },
  ]
}

/* ───────────────────────────────────────────────────────────────────
   Data — Production Process (7 steps)
   ─────────────────────────────────────────────────────────────────── */
const getProductionProcess = (lang) => {
  if (lang === 'en') {
    return [
      { step: '01', title: 'Farm Sourcing', desc: 'Selecting fresh Vietnamese agricultural produce meeting strict standards.' },
      { step: '02', title: 'Sanitizing & Prep', desc: 'Thorough washing, peeling, and slicing in controlled cleanrooms.' },
      { step: '03', title: 'Seasoning & Blend', desc: 'Marinated with proprietary recipes preserving traditional Vietnamese zest.' },
      { step: '04', title: 'Convection Drying', desc: 'Closed-loop thermal circulation drying locking in crunch and natural color.' },
      { step: '05', title: 'QC Inspection', desc: 'Multi-stage sorting, moisture check, crispness test, and microbial evaluation.' },
      { step: '06', title: 'Barrier Packaging', desc: 'Sealed in aluminum foil barrier bags with batch traceability barcodes.' },
      { step: '07', title: 'Storage & Dispatch', desc: 'Standard climate warehouse storage ready for domestic and international dispatch.' },
    ]
  }
  if (lang === 'ko') {
    return [
      { step: '01', title: '청정 원재료 선별', desc: '베트남 우수 농가에서 엄선한 최상급 농산물 선별.' },
      { step: '02', title: '세척 및 전처리', desc: '위생적인 시설에서 정밀 세척, 절단 및 살균 전처리.' },
      { step: '03', title: '독자 배합 및 조미', desc: '전통 풍미를 살린 HAQ 독자 레시피로 균일 조미.' },
      { step: '04', title: '열풍 대류 건조', desc: '최신 밀폐 대류 건조 기술로 바삭함과 고유 색상 보존.' },
      { step: '05', title: 'KCS 품질 검수', desc: '이물 선별, 수분율 측정, 바삭함 및 미생물 안전 검사.' },
      { step: '06', title: '무균 진공 포장', desc: '다층 알루미늄 파우치 밀폐 포장 및 생산 로트 인쇄.' },
      { step: '07', title: '보관 및 신속 출고', desc: '온습도 관리 물류창고 보관 및 국내외 정식 출고.' },
    ]
  }
  return [
    { step: '01', title: 'Tuyển chọn nông sản', desc: 'Lựa chọn nguyên liệu nông sản Việt Nam đạt chuẩn chất lượng.' },
    { step: '02', title: 'Sơ chế & làm sạch', desc: 'Quy trình rửa sạch, gọt cắt và khử trùng trong môi trường kiểm soát.' },
    { step: '03', title: 'Chế biến & tẩm ướp', desc: 'Phối trộn gia vị công thức độc quyền, giữ nguyên hương vị truyền thống.' },
    { step: '04', title: 'Sấy giòn khép kín', desc: 'Ứng dụng công nghệ sấy đối lưu tiên tiến, giữ màu sắc và độ giòn tự nhiên.' },
    { step: '05', title: 'Kiểm tra KCS', desc: 'Sàng lọc tạp chất, kiểm tra độ ẩm, độ giòn và cảm quan vi sinh.' },
    { step: '06', title: 'Đóng gói hút chân không', desc: 'Đóng gói màng nhôm bảo quản kín khí, in hạn sử dụng và mã vạch.' },
    { step: '07', title: 'Lưu kho & Phân phối', desc: 'Bảo quản kho tiêu chuẩn xuất xưởng nội địa và xuất khẩu quốc tế.' },
  ]
}

/* ───────────────────────────────────────────────────────────────────
   Data — Product Categories
   ─────────────────────────────────────────────────────────────────── */
const getProductCategories = (lang) => {
  if (lang === 'en') {
    return [
      { title: 'HOKI Rice Paper Snacks', subtitle: 'Crispy Vietnamese Rice Paper', desc: 'Premium crispy rice paper snacks seasoned with authentic Vietnamese spices.', img: catBanhTrangImg, badge: 'SIGNATURE' },
      { title: 'Traditional Baked Snacks', subtitle: 'Heritage Recipes', desc: 'Artisanal baked treats combined with modern hygiene for irresistible crunch and aroma.', img: catBanhImg, badge: 'TRADITIONAL' },
      { title: 'Dried Agricultural Foods', subtitle: 'Selected Farm Produce', desc: 'Nutrient-rich dried local agricultural produce serving retail and food service industries.', img: catDoAnKhoImg, badge: 'NATURAL' },
    ]
  }
  if (lang === 'ko') {
    return [
      { title: 'HOKI 크리스피 라이스페이퍼', subtitle: '베트남 정통 라이스페이퍼 스낵', desc: '베트남 본연의 깊은 풍미를 바삭하게 살린 프리미엄 라이스페이퍼 스낵.', img: catBanhTrangImg, badge: '시그니처' },
      { title: '전통 구운 과자', subtitle: '고소하고 바삭한 전통 과자', desc: '현대식 위생 설비로 구워낸 고소하고 안전한 베트남 전통 베이커리 스낵.', img: catBanhImg, badge: '전통 비법' },
      { title: '건조 농산물', subtitle: '엄선된 베트남 청정 농산물', desc: '자연 원재료의 영양을 온전히 보존한 프리미엄 건조 농산물 라인업.', img: catDoAnKhoImg, badge: '자연주의' },
    ]
  }
  return [
    { title: 'Bánh Tráng Sấy HOKI', subtitle: 'Bánh tráng sấy giòn đậm vị Việt', desc: 'Dòng sản phẩm bánh tráng sấy giòn cao cấp, hương vị đậm đà nguyên bản Việt Nam.', img: catBanhTrangImg, badge: 'TIÊU BIỂU' },
    { title: 'Bánh Nướng Truyền Thống', subtitle: 'Hương vị thơm bùi tự nhiên', desc: 'Bánh nướng thủ công kết hợp công nghệ hiện đại, thơm ngon và an toàn tuyệt đối.', img: catBanhImg, badge: 'GIA TRUYỀN' },
    { title: 'Nông Sản Sấy Khô', subtitle: 'Nông sản Việt chọn lọc', desc: 'Nông sản sấy khô giữ nguyên dưỡng chất, phục vụ tiêu dùng trong nước và công nghiệp thực phẩm.', img: catDoAnKhoImg, badge: 'TỰ NHIÊN' },
  ]
}

const TICKER_ITEMS = ['WinMart', 'Circle K', 'GS25', 'Bách Hóa Xanh', 'K-Market', 'ISO 22000', 'HACCP', 'OEM / ODM', 'Hàn Quốc', 'Đài Loan']

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function CompanyProfilePage() {
  const { t, language } = useLanguage()
  const CORE_VALUES = getCoreValues(language)
  const PRODUCTION_PROCESS = getProductionProcess(language)
  const PRODUCT_CATEGORIES = getProductCategories(language)

  // Hero entrance animation
  const [heroReady, setHeroReady] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Parallax scroll
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col relative">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">

        {/* ═══════════════════════════════════════════════════════════════
            HERO — Cinematic full-width + parallax + staggered text
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0C1E15]">
          {/* Parallax background image */}
          <img
            src={factoryHqImg}
            alt="HAQ FOOD Factory"
            className={`absolute inset-0 w-full h-[120%] object-cover will-change-transform transition-transform duration-[6000ms] ease-out ${heroReady ? 'scale-100' : 'scale-110'}`}
            style={{ transform: `translateY(${scrollY * 0.25}px) scale(${heroReady ? 1 : 1.1})`, opacity: 0.35 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1E15] via-[#0C1E15]/80 to-transparent" />

          <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-20 w-full">
            <div className="max-w-2xl">
              <p className={`font-heading text-xs tracking-[0.25em] text-[#C89B3C] uppercase mb-8 transition-all duration-700 delay-200 ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {t('profile.hero_location', 'Hà Nội, Việt Nam')}
              </p>

              <h1 className={`font-heading font-extrabold text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.9] transition-all duration-700 delay-[400ms] ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {t('profile.hero_title', 'HAQ FOOD')}
              </h1>

              <p className={`mt-6 text-lg sm:text-xl text-white/80 font-medium leading-snug max-w-lg transition-all duration-700 delay-[600ms] ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {t('profile.hero_sub', 'Doanh nghiệp sản xuất & xuất khẩu thực phẩm Việt Nam')}
              </p>

              <p className={`mt-4 text-sm text-white/45 leading-relaxed max-w-md transition-all duration-700 delay-[800ms] ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {t('profile.hero_desc', 'Công ty Cổ phần HAQ Hà Nội là doanh nghiệp sản xuất và phân phối thực phẩm chế biến đóng gói tại Việt Nam. Chúng tôi kết hợp nguồn nông sản địa phương với quy trình sản xuất sấy sạch khép kín, hướng tới tiêu chuẩn an toàn và nâng tầm giá trị ẩm thực Việt.')}
              </p>

              <div className={`mt-10 transition-all duration-700 delay-[1000ms] ${heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <a
                  href="#tong-quan"
                  className="inline-flex items-center gap-2.5 bg-white text-haq-ink px-7 py-3.5 rounded-full font-heading font-bold text-sm tracking-wide hover:bg-haq-cream transition-colors cursor-pointer"
                >
                  <span>{t('profile.hero_cta', 'Tìm hiểu về HAQ Food')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1200ms] ${heroReady ? 'opacity-60' : 'opacity-0'}`}>
            <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TICKER — Scrolling partner & certification band
            ═══════════════════════════════════════════════════════════════ */}
        <div className="py-4 bg-haq-cream border-b border-haq-border overflow-hidden">
          <div className="flex animate-ticker">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center shrink-0">
                {TICKER_ITEMS.map((item, j) => (
                  <React.Fragment key={j}>
                    <span className="font-heading text-[11px] font-bold text-haq-ink/70 uppercase tracking-[0.15em] whitespace-nowrap px-6">{item}</span>
                    <span className="text-haq-border text-xs">✦</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            KEY STATS — 4 chỉ số nổi bật
            ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-14 sm:py-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
              {[
                { num: '2021', label: language === 'en' ? 'Established in Hanoi' : language === 'ko' ? '하노이 설립' : 'Thành lập tại Hà Nội' },
                { num: 'ISO', label: language === 'en' ? '22000 & HACCP Certified' : language === 'ko' ? '22000 & HACCP 인증' : '22000 & HACCP' },
                { num: '3+', label: language === 'en' ? 'Export Markets' : language === 'ko' ? '수출 시장' : 'Thị trường xuất khẩu' },
                { num: 'OEM', label: language === 'en' ? 'Private Label Ready' : language === 'ko' ? 'OEM/ODM 맞춤 제조' : 'Gia công nhãn hàng riêng' },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="font-heading font-extrabold text-4xl sm:text-5xl text-haq-red tracking-tight">{s.num}</div>
                  <div className="text-sm text-haq-text-secondary mt-2">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TỔNG QUAN — Text + Photo grid
            ═══════════════════════════════════════════════════════════════ */}
        <section id="tong-quan" className="py-20 sm:py-32 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
              {/* Text column */}
              <div>
                <Reveal>
                  <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-haq-ink tracking-tight leading-tight">
                    {t('profile.sec1_title', 'Công ty Cổ phần HAQ Hà Nội')}
                  </h2>
                </Reveal>
                <Reveal delay={150}>
                  <p className="mt-6 text-base text-haq-text-secondary leading-[1.8]">
                    {t('profile.sec1_desc', 'Thành lập từ năm 2021 tại Thủ đô Hà Nội, Công ty Cổ phần HAQ Hà Nội là đơn vị sản xuất và phân phối thực phẩm chế biến đóng gói. Doanh nghiệp làm chủ công nghệ sấy sạch đối lưu, tập trung vào các dòng bánh tráng sấy giòn, bánh nướng truyền thống và nông sản sấy, phục vụ hệ thống siêu thị, đại lý trên toàn quốc và thị trường xuất khẩu.')}
                  </p>
                </Reveal>

                {/* Inline facts */}
                <Reveal delay={300}>
                  <dl className="mt-10 space-y-5 text-sm border-t border-haq-border pt-8">
                    {[
                      [t('profile.fact_legal_name_label', 'Tên pháp nhân'), t('profile.fact_legal_name', 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI')],
                      [t('profile.fact_tax_label', 'Mã số thuế'), t('profile.fact_tax_val', '0109675204')],
                      [t('profile.fact_hq_label', 'Trụ sở'), t('profile.fact_hq_val', 'Thành phố Hà Nội, Việt Nam')],
                      [t('profile.fact_scope_label', 'Lĩnh vực'), t('profile.fact_scope_val', 'Sản xuất, chế biến sâu và bảo quản thực phẩm: Bánh tráng sấy giòn cao cấp (HOKI), bánh nướng hạnh nhân, bánh sữa dừa, bánh đậu xanh tươi và nông sản sấy khô.')],
                    ].map(([label, value], i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:gap-6">
                        <dt className="font-heading font-semibold text-haq-text-secondary text-xs uppercase tracking-wider shrink-0 sm:w-28 mb-1 sm:mb-0">{label}</dt>
                        <dd className="text-haq-ink leading-relaxed">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              {/* Photo grid */}
              <div className="space-y-4">
                <Reveal delay={200}>
                  <div className="rounded-2xl overflow-hidden">
                    <img src={factoryHqImg} alt="Cơ sở sản xuất HAQ FOOD" className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700" />
                  </div>
                </Reveal>
                <div className="grid grid-cols-2 gap-4">
                  <Reveal delay={350}>
                    <div className="rounded-xl overflow-hidden">
                      <img src={riceFieldImg} alt="Vùng nguyên liệu" className="w-full aspect-square object-cover hover:scale-[1.03] transition-transform duration-700" />
                    </div>
                  </Reveal>
                  <Reveal delay={450}>
                    <div className="rounded-xl overflow-hidden">
                      <img src={labInspectionImg} alt="Kiểm soát chất lượng" className="w-full aspect-square object-cover hover:scale-[1.03] transition-transform duration-700" />
                    </div>
                  </Reveal>
                </div>
                <Reveal delay={500}>
                  <p className="text-xs text-haq-text-secondary px-1">
                    {t('profile.photo_caption', 'Cơ sở sản xuất HAQ FOOD tại Hà Nội: Quy trình kiểm soát khép kín từ tuyển chọn nguyên liệu, chế biến sấy sạch đối lưu đến đóng gói bao bì màng nhôm tiệt trùng.')}
                  </p>
                </Reveal>
              </div>
            </div>

            {/* 3 Năng lực cốt lõi */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-haq-border rounded-2xl overflow-hidden">
              {(t('profile.core_caps') || [
                { num: '01', title: 'Sấy Sạch Đối Lưu Khép Kín', desc: 'Ứng dụng công nghệ sấy tuần hoàn nhiệt kín, kiểm soát chính xác nhiệt độ và độ ẩm, giữ trọn độ giòn xốp tự nhiên mà không tồn dư dầu chiên.' },
                { num: '02', title: 'Liên Kết Nông Sản Bản Địa', desc: 'Ưu tiên kết nối và thu mua nguồn nông sản Việt Nam sạch, rõ ràng nguồn gốc xuất xứ, kiểm nghiệm định kỳ các chỉ tiêu vi sinh và an toàn thực phẩm.' },
                { num: '03', title: 'Gia Công OEM / ODM Linh Hoạt', desc: 'Hỗ trợ đối tác chuỗi bán lẻ và xuất khẩu từ khâu R&D phát triển hương vị, gửi mẫu thử, thiết kế quy cách đóng gói đến hoàn tất hồ sơ tự công bố.' },
              ]).map((c, i) => (
                <Reveal key={i} delay={i * 150} className="bg-white p-8 sm:p-10">
                  <span className="font-heading text-3xl font-extrabold text-haq-border">{c.num}</span>
                  <h4 className="font-heading font-bold text-base text-haq-ink mt-3 mb-3">{c.title}</h4>
                  <p className="text-sm text-haq-text-secondary leading-relaxed">{c.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FULL-WIDTH IMAGE DIVIDER — Product hero banner
            ═══════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden">
          <img
            src={heroBanner1}
            alt="Sản phẩm HAQ FOOD"
            className="w-full h-72 sm:h-96 lg:h-[480px] object-cover"
            style={{ transform: `translateY(${(scrollY - 1200) * 0.1}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CÂU CHUYỆN + GIÁ TRỊ CỐT LÕI — Sticky image layout
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            {/* Story statement */}
            <Reveal>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-haq-ink tracking-tight leading-[1.1] max-w-4xl">
                {t('profile.sec2_title_1', 'Mỗi sản phẩm')}{' '}
                {t('profile.sec2_title_2', 'đều bắt đầu')}{' '}
                <span className="text-haq-red">{t('profile.sec2_title_3', 'từ tự nhiên.')}</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24">
              <Reveal delay={150}>
                <p className="text-lg text-haq-ink leading-[1.8] font-medium">
                  {t('profile.sec2_desc_1', 'Chúng tôi tin rằng thực phẩm ngon phải bắt đầu từ nguyên liệu tốt, quy trình đúng và con người có trách nhiệm. HAQ FOOD không ngừng đổi mới để mang đến những sản phẩm tiện lợi, an toàn và giữ trọn hương vị truyền thống Việt Nam.')}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-base text-haq-text-secondary leading-[1.8]">
                  {t('profile.sec2_desc_2', 'Chúng tôi xây dựng chuỗi giá trị khép kín từ khâu tuyển chọn nguyên liệu tươi sạch tại các vùng nông nghiệp trọng điểm cho đến dây chuyền sấy giòn đối lưu và đóng gói tiệt trùng, phục vụ khách hàng tiêu dùng và xuất khẩu.')}
                </p>
              </Reveal>
            </div>

            {/* TÂM – TÍN – TINH: Sticky image + scrolling values */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Sticky image (desktop) */}
              <div className="hidden lg:block relative">
                <div className="sticky top-24 pr-16">
                  <div className="rounded-2xl overflow-hidden">
                    <img src={factoryImg} alt="Sản xuất HAQ FOOD" className="w-full aspect-[3/4] object-cover" />
                  </div>
                  <p className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em] mt-6">
                    {t('profile.sec2_values_tag', 'Triết lý vận hành')}
                  </p>
                </div>
              </div>

              {/* Mobile image */}
              <div className="lg:hidden mb-10">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden">
                    <img src={factoryImg} alt="Sản xuất HAQ FOOD" className="w-full aspect-video object-cover" />
                  </div>
                  <p className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-[0.2em] mt-4">
                    {t('profile.sec2_values_tag', 'Triết lý vận hành')}
                  </p>
                </Reveal>
              </div>

              {/* Scrolling values */}
              <div>
                {CORE_VALUES.map((val, idx) => (
                  <Reveal key={val.key}>
                    <div className={`py-14 lg:py-20 ${idx < CORE_VALUES.length - 1 ? 'border-b border-haq-border' : ''}`}>
                      <div className="flex items-baseline gap-4 mb-5">
                        <span className="font-heading font-extrabold text-5xl sm:text-6xl text-haq-red leading-none">{val.key}</span>
                        <span className="font-heading text-sm font-bold text-[#C89B3C]">{val.number}</span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-haq-ink uppercase tracking-wide mb-2">{val.title}</h4>
                      <p className="text-sm text-haq-red font-medium mb-4">{val.tagline}</p>
                      <p className="text-sm text-haq-text-secondary leading-[1.8]">{val.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            QUY TRÌNH — Dark section + KCS
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-32 bg-[#0C1E15] text-white overflow-hidden">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-2xl">
                {t('profile.sec4_title', 'Quy trình sản xuất')}{' '}
                <span className="text-[#C89B3C]">{language === 'en' ? '7 stages' : language === 'ko' ? '7단계' : '7 công đoạn'}</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 text-sm sm:text-base text-white/50 leading-relaxed max-w-xl">
                {t('profile.sec4_desc', 'Hệ thống vận hành liên hoàn kiểm soát nhiệt ẩm và an toàn vệ sinh thực phẩm nghiêm ngặt từ khâu nguyên liệu đầu vào đến thành phẩm đóng gói xuất xưởng.')}
              </p>
            </Reveal>

            {/* Desktop: Horizontal steps */}
            <div className="hidden lg:grid grid-cols-7 gap-5 mt-16">
              {PRODUCTION_PROCESS.map((proc, i) => (
                <Reveal key={proc.step} delay={i * 80}>
                  <div className="group">
                    <div className="font-heading font-extrabold text-4xl text-[#C89B3C]/30 group-hover:text-[#C89B3C] transition-colors duration-300 mb-3">
                      {proc.step}
                    </div>
                    <div className="h-px w-full bg-white/10 group-hover:bg-[#C89B3C]/60 transition-colors duration-300 mb-4" />
                    <h3 className="font-heading font-bold text-sm text-white mb-2 leading-snug">{proc.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/65 transition-colors duration-300">{proc.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Mobile: Vertical */}
            <div className="lg:hidden space-y-5 mt-12">
              {PRODUCTION_PROCESS.map((proc, i) => (
                <Reveal key={proc.step} delay={i * 60}>
                  <div className="flex gap-5">
                    <span className="font-heading font-extrabold text-2xl text-[#C89B3C]/60 shrink-0 w-8">{proc.step}</span>
                    <div className="border-l border-white/10 pl-5 pb-2">
                      <h3 className="font-heading font-bold text-sm text-white">{proc.title}</h3>
                      <p className="text-xs text-white/40 mt-1 leading-relaxed">{proc.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* KCS Section */}
            <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal>
                <div className="rounded-2xl overflow-hidden">
                  <img src={cargoExportImg} alt="Xuất khẩu HAQ FOOD" className="w-full aspect-[4/3] object-cover" />
                </div>
              </Reveal>
              <div>
                <Reveal delay={150}>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                    {t('profile.sec3_kcs_title_1', 'Chuẩn hóa')}{' '}
                    <span className="text-[#C89B3C]">{t('profile.sec3_kcs_title_2', 'chất lượng đồng nhất.')}</span>
                  </h3>
                </Reveal>

                <div className="mt-8 space-y-5">
                  {(t('profile.sec3_kcs_points') || [
                    { title: 'Vệ Sinh An Toàn Thực Phẩm Tuyệt Đối', desc: 'Quy trình kiểm soát nghiêm ngặt từ trang phục công nhân đến khu vực chế biến.' },
                    { title: 'Độ Đồng Đều Sản Phẩm Cao', desc: 'Công nghệ tự động hóa kiểm soát nhiệt độ sấy, đảm bảo chất lượng đồng nhất giữa các lô.' },
                    { title: 'Kiểm Tra KCS Độc Lập', desc: 'Mọi lô hàng trước khi xuất kho đều phải vượt qua bài kiểm tra cảm quan và vi sinh.' },
                  ]).map((point, pIdx) => (
                    <Reveal key={pIdx} delay={300 + pIdx * 120}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#C89B3C] shrink-0 mt-1" />
                        <div>
                          <h4 className="font-heading font-bold text-sm text-white">{point.title}</h4>
                          <p className="text-xs text-white/40 mt-0.5">{point.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={650}>
                  <div className="flex flex-wrap gap-2.5 mt-8">
                    {['ISO 22000', 'HACCP', 'OEM/ODM'].map((cert) => (
                      <span key={cert} className="font-heading text-[11px] font-bold uppercase tracking-wider text-[#C89B3C] border border-[#C89B3C]/30 px-4 py-2 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SẢN PHẨM — Photo-forward cards + Export
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-32 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
              <Reveal>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight">
                  {t('profile.sec5_title', 'Sản phẩm tiêu biểu')}
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <Link
                  to="/san-pham"
                  className="inline-flex items-center gap-2 text-sm font-heading font-bold text-haq-red hover:underline cursor-pointer shrink-0"
                >
                  <span>{t('profile.sec5_all_btn', 'Xem tất cả sản phẩm')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {PRODUCT_CATEGORIES.map((prod, idx) => (
                <Reveal key={idx} delay={idx * 150}>
                  <Link to="/san-pham" className="group cursor-pointer block hover:-translate-y-1.5 transition-transform duration-300">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                      <img
                        src={prod.img}
                        alt={prod.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-heading text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-haq-ink px-3 py-1 rounded-full">
                          {prod.badge}
                        </span>
                      </div>
                    </div>
                    <p className="font-heading text-xs text-[#C89B3C] tracking-wider mb-1">{prod.subtitle}</p>
                    <h3 className="font-heading font-bold text-xl text-haq-ink group-hover:text-haq-red transition-colors mb-2">{prod.title}</h3>
                    <p className="text-sm text-haq-text-secondary leading-relaxed">{prod.desc}</p>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Export */}
            <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal>
                <div className="rounded-2xl overflow-hidden">
                  <img src={exportImg} alt="Xuất khẩu thực phẩm" className="w-full aspect-[16/10] object-cover hover:scale-[1.02] transition-transform duration-700" />
                </div>
              </Reveal>
              <div>
                <Reveal delay={150}>
                  <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink tracking-tight leading-tight">
                    {t('profile.sec6_title_1', 'Từ Việt Nam')}<br />
                    <span className="text-haq-red">{t('profile.sec6_title_2', 'vươn ra thế giới.')}</span>
                  </h3>
                </Reveal>
                <Reveal delay={300}>
                  <p className="mt-5 text-sm text-haq-text-secondary leading-[1.8]">
                    {t('profile.sec6_desc', 'HAQ FOOD định hướng phát triển mạnh mẽ trên thị trường quốc tế, đưa các sản phẩm nông sản chế biến đậm đà bản sắc Việt Nam đến với đối tác và người tiêu dùng toàn cầu.')}
                  </p>
                </Reveal>
                <Reveal delay={450}>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {(t('profile.sec6_markets') || [
                      { region: 'NỘI ĐỊA', country: 'Việt Nam' },
                      { region: 'ĐÔNG BẮC Á', country: 'Hàn Quốc' },
                      { region: 'ĐÔNG Á', country: 'Đài Loan' },
                    ]).map((m, idx) => (
                      <div key={idx} className="text-center py-4 bg-haq-cream rounded-xl">
                        <div className="font-heading text-[10px] text-haq-text-secondary uppercase tracking-wider">{m.region}</div>
                        <div className="font-heading font-bold text-sm text-haq-ink mt-0.5">{m.country}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CTA — Liên hệ hợp tác
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-24 sm:py-40 bg-[#0C1E15] text-white relative overflow-hidden">
          {/* Subtle background image */}
          <img
            src={riceFieldImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-[#0C1E15]/80" />

          <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12 text-center">
            <Reveal>
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.05]">
                  {t('profile.cta_title_1', 'Cùng kiến tạo')}{' '}
                  <span className="text-[#C89B3C]">{t('profile.cta_title_2', 'giá trị nông sản Việt')}</span>
                </h2>

                <p className="mt-8 text-sm sm:text-base text-white/50 leading-relaxed max-w-xl mx-auto">
                  {t('profile.cta_desc', 'Chúng tôi luôn sẵn sàng đồng hành cùng các đối tác phân phối, chuỗi bán lẻ và doanh nghiệp có nhu cầu gia công OEM/ODM thực phẩm chất lượng cao.')}
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/lien-he"
                    className="w-full sm:w-auto px-8 py-4 bg-white text-haq-ink font-heading font-bold text-sm rounded-full hover:bg-haq-cream transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('profile.cta_btn', 'Liên hệ với HAQ Food')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/san-pham"
                    className="w-full sm:w-auto px-8 py-4 text-white font-heading font-bold text-sm rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('common.explore', 'Khám phá sản phẩm')}</span>
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
