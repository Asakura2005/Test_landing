import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'
import { useMagneticSectionScroll } from '../hooks/useMagneticSectionScroll'

import factoryImg from '../assets/business/congtac.webp'
import b2bImg from '../assets/business/trung-bay-sp.webp'
import exportImg from '../assets/factory/thanh-pham.webp'
import heroBanner1 from '../assets/herobanner/hero_banner_1.webp'
import nhaXuong2021Img from '../assets/factory/nha-xuong-2021.webp'
import catBanhImg from '../assets/factory/san-xuat-banh-nuong.webp'


/* ───────────────────────────────────────────────────────────────────
   Reveal — scroll-triggered fade + slide
   ─────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '', direction = 'up' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const hidden = {
    up: 'opacity-0 translate-y-8',
    left: 'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    none: 'opacity-0',
  }[direction]

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${visible ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function HistoryPage() {
  const { t, language } = useLanguage()
  const [activeYear, setActiveYear] = useState('2021')

  const chapters = useMemo(() => getChapters(language), [language])

  // Initialize Progressive Magnetic / Resistance Section Scroll (chuẩn như ở Home page)
  const { activeSectionId, scrollToSectionId } = useMagneticSectionScroll({
    headerHeight: 130,
    headerSelector: 'header, #history-sticky-nav-bar',
    sectionSelector: '[data-history-section]',
    footerSelector: '[data-section="footer"]',
  })

  // Auto-sync active year pill with current snapped section
  useEffect(() => {
    const found = chapters.find(
      (c) => c.id === activeSectionId || `year-${c.year}` === activeSectionId
    )
    if (found) {
      setActiveYear(found.year)
    }
  }, [activeSectionId, chapters])

  const scrollToChapter = (id, year) => {
    setActiveYear(year)
    scrollToSectionId(id)
  }

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col relative">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">

        {/* ═══════════════════════════════════════════════════════════
            STICKY YEAR NAV & TITLE BAR — Auto-highlights on scroll
            ═══════════════════════════════════════════════════════════ */}
        <div
          id="history-sticky-nav-bar"
          className="sticky top-[72px] sm:top-[76px] z-30 bg-white/95 backdrop-blur-md border-b border-haq-border shadow-xs"
        >
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between py-2.5 sm:py-3 gap-4">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-haq-red" />
                <h1 className="font-heading font-bold text-sm sm:text-base text-haq-ink tracking-tight m-0 flex items-center gap-2">
                  <span>{language === 'en' ? 'GROWTH JOURNEY' : language === 'ko' ? '성장의 여정' : language === 'zh' ? '企业发展历程' : 'HÀNH TRÌNH PHÁT TRIỂN'}</span>
                  <span className="text-haq-text-secondary/40 text-xs hidden sm:inline">•</span>
                  <span className="text-xs text-haq-text-secondary font-medium hidden sm:inline">2021 — 2026</span>
                </h1>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
                <Calendar className="w-3.5 h-3.5 text-haq-text-secondary shrink-0 mr-1" />
                {chapters.map((chap) => (
                  <button
                    key={chap.year}
                    type="button"
                    onClick={() => scrollToChapter(chap.id, chap.year)}
                    className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      activeYear === chap.year
                        ? 'bg-haq-red text-white shadow-sm'
                        : 'text-haq-text-secondary hover:bg-haq-cream hover:text-haq-ink'
                    }`}
                  >
                    {chap.year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CHAPTERS — 100VH Progressive Magnetic Sections
            ═══════════════════════════════════════════════════════════ */}
        {chapters.map((chap, idx) => {
          const isEven = idx % 2 === 0
          return (
            <section
              key={chap.id}
              id={chap.id}
              data-history-section
              data-section={chap.id}
              className={`min-h-[calc(100vh-130px)] lg:h-[calc(100vh-130px)] w-full relative flex flex-col justify-center py-8 lg:py-0 border-b border-haq-border/60 overflow-hidden box-border ${
                isEven ? 'bg-white' : 'bg-haq-cream/35'
              }`}
            >
              {/* Ambient Faint Background Image on Mobile — Rõ hơn, nhìn thấy được nhưng vẫn chìm ở nền */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none block lg:hidden overflow-hidden">
                <img
                  src={chap.image}
                  alt={`${chap.year} - ${chap.title} - HAQ FOOD`}
                  className={`w-full h-full object-cover ${chap.imagePosition || 'object-center'} opacity-[0.22] contrast-[1.05]`}
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 ${
                    isEven
                      ? 'bg-gradient-to-b from-white/15 via-white/40 to-white/80'
                      : 'bg-gradient-to-b from-haq-cream/15 via-haq-cream/40 to-haq-cream/80'
                  }`}
                />
              </div>

              <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full relative z-10">
                {/* Watermark year in background */}
                <div
                  className="absolute -top-6 sm:-top-8 right-4 lg:right-10 select-none pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  <span className="font-heading font-extrabold text-[5.5rem] sm:text-[7.5rem] lg:text-[9.5rem] xl:text-[11rem] leading-none text-haq-border/25 tracking-tighter">
                    {chap.year}
                  </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
                  {/* Image Column (Visible on Desktop only) */}
                  <div className={`hidden lg:block lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
                    <Reveal delay={80} direction={isEven ? 'left' : 'right'}>
                      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-haq-border/80 bg-white">
                        <img
                          src={chap.image}
                          alt={chap.title}
                          className={`w-full aspect-[4/3] max-h-[38vh] sm:max-h-[44vh] lg:max-h-[48vh] object-cover ${chap.imagePosition || 'object-center'} transition-transform duration-700 group-hover:scale-[1.03]`}
                          loading="lazy"
                        />
                      </div>
                    </Reveal>
                  </div>

                  {/* Content Column */}
                  <div className={`w-full lg:col-span-7 ${isEven ? '' : 'lg:order-1'}`}>
                    <Reveal delay={120}>
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                          {chap.phase}
                        </span>
                        <span className="h-px w-6 bg-haq-red/40" />
                        <span className="font-heading text-xs text-haq-text-secondary uppercase tracking-wider">
                          {chap.theme}
                        </span>
                      </div>
                    </Reveal>

                    <Reveal delay={200}>
                      <h2 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] text-haq-ink leading-snug mb-2">
                        {chap.title}
                      </h2>
                    </Reveal>

                    <Reveal delay={280}>
                      <p className="text-xs sm:text-sm text-haq-red font-medium leading-relaxed border-l-2 border-haq-red/40 pl-3 mb-2.5">
                        {chap.lead}
                      </p>
                    </Reveal>

                    <Reveal delay={360}>
                      <p className="text-xs sm:text-[13.5px] text-haq-text-secondary leading-relaxed mb-3.5">
                        {chap.desc}
                      </p>
                    </Reveal>

                    {/* Achievements: 2-column compact grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {chap.achievements.map((ach, aIdx) => (
                        <Reveal key={aIdx} delay={400 + aIdx * 50} direction="up">
                          <div className="flex items-start gap-2 bg-white/90 p-2.5 sm:p-3 rounded-xl border border-haq-border/80 shadow-2xs h-full">
                            <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                            <span className="text-xs text-haq-text-secondary leading-snug">{ach}</span>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* ═══════════════════════════════════════════════════════════
            CTA — Navigation to related pages (100VH Magnetic Section)
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="cta"
          data-history-section
          data-section="cta"
          className="min-h-[calc(100vh-130px)] lg:h-[calc(100vh-130px)] w-full bg-haq-cream/40 flex flex-col justify-center py-8 lg:py-0 border-b border-haq-border overflow-hidden box-border relative"
        >
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 w-full">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
                <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider mb-1.5 block">
                  {language === 'en' ? 'CONTINUE EXPLORING' : language === 'ko' ? '더 알아보기' : language === 'zh' ? '继续探索' : 'TIẾP TỤC KHÁM PHÁ'}
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink tracking-tight uppercase">
                  {language === 'en' ? 'Discover HAQ FOOD Ecosystem' : language === 'ko' ? 'HAQ FOOD 생태계 탐색' : language === 'zh' ? '探索 HAQ FOOD 产业生态' : 'Hệ Sinh Thái Thực Phẩm HAQ FOOD'}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Reveal direction="left">
                <Link
                  to="/gioi-thieu"
                  className="group bg-white p-7 sm:p-8 rounded-2xl border border-haq-border hover:border-haq-red/50 hover:shadow-lg transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="font-heading text-xs text-haq-text-secondary uppercase tracking-wider">
                      {language === 'en' ? 'Company Profile' : language === 'ko' ? '기업 소개' : language === 'zh' ? '企业介绍' : 'Giới thiệu'}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-haq-ink group-hover:text-haq-red transition-colors mt-1.5">
                      {language === 'en' ? 'Corporate Overview & Mission' : language === 'ko' ? '기업 개요 및 비전' : language === 'zh' ? '企业概况与品牌使命' : 'Tổng quan doanh nghiệp & Sứ mệnh'}
                    </h3>
                    <p className="text-xs sm:text-sm text-haq-text-secondary mt-2 leading-relaxed">
                      {language === 'en'
                        ? 'Discover our philosophy, vision, and core values.'
                        : language === 'ko'
                        ? 'HAQ FOOD의 경영 철학과 5대 핵심 가치를 확인하세요.'
                        : language === 'zh'
                        ? '深入了解 HAQ FOOD 的经营理念与五大核心价值观。'
                        : 'Tìm hiểu triết lý kinh doanh và 5 giá trị cốt lõi HAQ FOOD.'}
                    </p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-heading font-bold text-haq-red group-hover:translate-x-1 transition-transform">
                    <span>{language === 'en' ? 'View profile' : language === 'ko' ? '기업 소개 보기' : language === 'zh' ? '查看企业介绍' : 'Xem giới thiệu'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>

              <Reveal direction="right">
                <Link
                  to="/san-pham"
                  className="group bg-white p-7 sm:p-8 rounded-2xl border border-haq-border hover:border-haq-red/50 hover:shadow-lg transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="font-heading text-xs text-haq-text-secondary uppercase tracking-wider">
                      {language === 'en' ? 'Products' : language === 'ko' ? '제품' : language === 'zh' ? '产品中心' : 'Sản phẩm'}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-haq-ink group-hover:text-haq-red transition-colors mt-1.5">
                      {language === 'en' ? 'Product Catalog & Snack Lines' : language === 'ko' ? '제품 카탈로그 및 스낵 라인업' : language === 'zh' ? '产品目录与全系休闲零食' : 'Danh mục sản phẩm & Các dòng snack'}
                    </h3>
                    <p className="text-xs sm:text-sm text-haq-text-secondary mt-2 leading-relaxed">
                      {language === 'en'
                        ? 'Explore our full range of Vietnamese snacks and dried foods.'
                        : language === 'ko'
                        ? '베트남 프리미엄 스낵 및 건조식품 전체 라인업을 확인하세요.'
                        : language === 'zh'
                        ? '探索香脆米纸、烘焙糕点以及农副产品干制品全线产品。'
                        : 'Khám phá đầy đủ các dòng bánh tráng, đồ ăn vặt và nông sản sấy.'}
                    </p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-heading font-bold text-haq-red group-hover:translate-x-1 transition-transform">
                    <span>{language === 'en' ? 'View products' : language === 'ko' ? '제품 보기' : language === 'zh' ? '查看产品目录' : 'Xem sản phẩm'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
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

/* ═══════════════════════════════════════════════════════════════════
   DATA — Chapters (kept outside component for clarity)
   ═══════════════════════════════════════════════════════════════════ */
function getChapters(lang) {
  const en = lang === 'en'
  const ko = lang === 'ko'
  const zh = lang === 'zh'
  return [
    {
      id: 'year-2021', year: '2021',
      phase: en ? 'CHAPTER 01' : ko ? '제1장' : zh ? '第一章' : 'CHƯƠNG 01',
      theme: en ? 'ORIGINS & FOUNDATION' : ko ? '태동 및 기반 구축' : zh ? '源起与立基' : 'KHỞI NGUỒN & NỀN MÓNG',
      title: en ? 'Establishment & Operation of First Closed Drying Facility'
        : ko ? '회사 설립 및 1호 밀폐형 열풍 건조 공장 가동'
        : zh ? '公司成立与投产首座全封闭热风烘干车间'
        : 'Thành lập Công ty & Vận hành Xưởng Sấy Giòn Khép Kín Đầu Tiên',
      lead: en ? 'Rooted in the ambition to modernize and standardize traditional Vietnamese snacks using clean drying technology.'
        : ko ? '청결 건조 기술로 베트남 전통 간식을 현대화하고 표준화하겠다는 비전으로 출발했습니다.'
        : zh ? '立足于利用洁净烘干工艺将越南传统风味零食现代化与标准化的初心。'
        : 'Bắt đầu từ khát vọng hiện đại hóa và chuẩn hóa món ăn vặt truyền thống Việt Nam bằng công nghệ sấy sạch.',
      desc: en ? 'HAQ Hanoi Joint Stock Company was officially founded in Hanoi. The company invested in building a dedicated production plant with our first closed clean drying line, decisively solving food safety concerns and defining the HAQ FOOD brand.'
        : ko ? '베트남 하노이에 HAQ Hanoi Joint Stock Company가 공식 설립되었습니다. 당사는 제1호 밀폐형 청정 건조 라인을 구축하여 식품 위생 문제를 완벽히 해결하고 시장에서 HAQ FOOD 브랜드를 정립했습니다.'
        : zh ? 'HAQ河内股份公司在首都河内正式创立。企业重金投资建设专属标准化厂房，投产首条全封闭洁净烘干生产线，彻底解决食品安全痛点，奠定 HAQ FOOD 品牌的行业信誉。'
        : 'Công ty Cổ phần HAQ Hà Nội chính thức được thành lập tại Thủ đô Hà Nội. Doanh nghiệp đầu tư xây dựng nhà xưởng với dây chuyền sấy giòn khép kín đầu tiên, giải quyết triệt để bài toán an toàn vệ sinh thực phẩm và định hình thương hiệu HAQ FOOD trên thị trường.',
      achievements: en ? [
        'Officially established legal entity HAQ Hanoi Joint Stock Company.',
        'Inaugurated clean rice paper drying facility with closed-loop thermal heating system.',
        'Launched first flagship product line: Crispy dried rice paper in Beef, Shrimp & Sate flavors.',
        'Completed quality declaration and food safety certification under national standards.',
      ] : ko ? [
        'HAQ Hanoi Joint Stock Company 법인 공식 설립.',
        '밀폐 순환 가열 시스템을 갖춘 라이스페이퍼 클린 건조 공장 준공.',
        '첫 핵심 라인업 출시: 소고기맛, 새우맛, 사테맛 바삭 건조 라이스페이퍼.',
        '국가 규격에 부합하는 품질 신고 및 식품 위생 안전 인증 완료.',
      ] : zh ? [
        '正式注册成立 HAQ 河内股份公司独立法人。',
        '竣工投产采用封闭循环加热系统的洁净烤米纸烘干车间。',
        '推出首发核心明星产品线：牛肉味、鲜虾味及沙茶风味香脆米纸。',
        '完成符合越南国家标准的食品安全认证与全套产品质量备案。',
      ] : [
        'Chính thức thành lập pháp nhân Công ty Cổ phần HAQ Hà Nội.',
        'Khánh thành phân xưởng sấy bánh tráng sạch với hệ thống gia nhiệt khép kín.',
        'Ra mắt dòng sản phẩm chủ lực đầu tiên: Bánh tráng sấy giòn vị Bò, Tôm & Sa tế.',
        'Hoàn thiện hồ sơ công bố chất lượng và an toàn thực phẩm theo quy chuẩn nhà nước.',
      ],
      metric: en ? 'FOUNDED' : ko ? '설립' : zh ? '创立之年' : 'NĂNG KHỞI ĐẦU',
      metricVal: '2021',
      image: nhaXuong2021Img,
      imagePosition: 'object-[center_35%]',
    },
    {
      id: 'year-2022', year: '2022',
      phase: en ? 'CHAPTER 02' : ko ? '제2장' : zh ? '第二章' : 'CHƯƠNG 02',
      theme: en ? 'R&D & EXPANSION' : ko ? 'R&D 혁신 및 다각화' : zh ? '研发创新与多元拓展' : 'ĐỔI MỚI R&D & ĐA DẠNG HÓA',
      title: en ? 'R&D Investment & Expansion into 4 New Food Categories'
        : ko ? 'R&D 연구 투자 및 4대 신규 식품군 확장'
        : zh ? '持续加码研发与拓展 4 大全新食品品类'
        : 'Đầu tư R&D & Mở Rộng 4 Nhóm Thực Phẩm Mới',
      lead: en ? 'Elevating heritage recipes combined with advanced baking and drying systems to satisfy diverse consumer tastes.'
        : ko ? '전통 비법에 현대적 제빵 및 건조 기술을 접목하여 소비자의 다채로운 입맛을 충족시켰습니다.'
        : zh ? '升华传统家传配方，融合现代烘焙与低温脱水技术，满足消费者多元化味蕾。'
        : 'Nâng tầm công thức gia truyền kết hợp thiết bị chế biến và sấy hiện đại, đáp ứng đa dạng khẩu vị người tiêu dùng.',
      desc: en ? 'Heavily investing in our dedicated R&D lab to standardize clean agri-produce processing. HAQ FOOD broadened its catalog from rice paper to premium baked cookies, traditional mung bean cakes, and ready-to-eat dried meats, expanding to 15+ SKUs.'
        : ko ? 'R&D 전담 연구소에 과감히 투자하여 청정 농산물 가공 공정을 표준화했습니다. 라이스페이퍼에서 프리미엄 구운 과자, 전통 녹두과자, 건조 육류 간식으로 카테고리를 넓혀 총 15종 이상의 SKU를 구축했습니다.'
        : zh ? '大力投资建设独立 R&D 实验室，标准化洁净农产品加工工艺。HAQ FOOD 将产品线从传统烤米纸延伸至高端烘焙饼干、传统绿豆糕及开袋即食肉类干制品，SKU 扩充至 15+ 款。'
        : 'Đầu tư mạnh mẽ vào phòng nghiên cứu R&D, chuẩn hóa quy trình chế biến nông sản sạch. HAQ FOOD mở rộng danh mục từ bánh tráng sang các dòng bánh hạnh nhân, bánh đậu xanh truyền thống và đồ ăn vặt đóng gói ăn liền, nâng tổng số mã sản phẩm lên hơn 15+ SKU.',
      achievements: en ? [
        'Successfully formulated crispy almond cookies and smooth fresh mung bean cakes.',
        'Commissioned high-tech popcorn popping chamber with uniform caramel coating.',
        'Added specialized processing lines for lime leaf shredded chicken and garlic beef jerky.',
        'Re-engineered modern, convenient packaging ensuring long shelf life.',
      ] : ko ? [
        '바삭하고 고소한 아몬드 쿠키 및 부드러운 신선 녹두 케이크 독자 레시피 개발.',
        '고기술 캐러멜 코팅 팝콘 팽창 챔버 도입 및 가동.',
        '라임잎 닭고기 육포 및 마늘 돼지고기 육포 전문 가공 라인 증설.',
        '장기 보관성과 휴대성을 갖춘 현대적 감각의 패키징 리뉴얼 단행.',
      ] : zh ? [
        '成功研发香酥杏仁瓦片酥与细腻醇香新鲜绿豆糕独家配方。',
        '引进并投产高科技爆米花膨化舱，实现焦糖均匀包覆。',
        '增设柠檬叶风味手撕鸡肉干及焦香蒜味猪肉干专业精深加工线。',
        '产品包装全面升级，兼顾现代审美、便携体验与长效保鲜锁香。',
      ] : [
        'Nghiên cứu thành công công thức Bánh hạnh nhân giòn xốp và Bánh đậu xanh tươi thơm mịn.',
        'Đưa vào vận hành buồng nổ bắp rang bơ công nghệ cao, phủ caramel đều hạt.',
        'Bổ sung dây chuyền chế biến khô gà lá chanh, khô heo cháy tỏi chuẩn vị.',
        'Tái định vị bao bì sản phẩm sang phong cách hiện đại, tiện lợi, bảo quản dài lâu.',
      ],
      metric: en ? 'PRODUCT SKUs' : ko ? '제품 규격' : zh ? '产品品类' : 'SẢN PHẨM',
      metricVal: '15+',
      image: catBanhImg,
    },
    {
      id: 'year-2023', year: '2023',
      phase: en ? 'CHAPTER 03' : ko ? '제3장' : zh ? '第三章' : 'CHƯƠNG 03',
      theme: en ? 'NATIONAL RETAIL' : ko ? '전국 유통망 확장' : zh ? '全国渠道深耕' : 'PHỦ SÓNG TOÀN QUỐC',
      title: en ? 'Presence Across 3,000+ Outlets in Major Chains'
        : ko ? '전국 대형마트 및 편의점 3,000+ 개 매장 입점'
        : zh ? '进驻全国 3,000+ 家大型连锁超市及便利店'
        : 'Phủ Sóng 3.000+ Điểm Bán Tại Các Chuỗi Lớn',
      lead: en ? 'A strategic commercial leap bringing HAQ FOOD products onto shelves of Vietnam\'s leading retail conglomerates.'
        : ko ? '베트남 굴지의 대형 유통 채널 매대에 HAQ FOOD 제품을 진열하며 비즈니스의 획기적 도약을 달성했습니다.'
        : zh ? '实现商业战略大跨越，HAQ FOOD 系列产品全面进驻越南头部零售巨头货架。'
        : 'Tạo bước nhảy vọt về thương mại khi đưa sản phẩm HAQ FOOD lên quầy kệ của các tập đoàn bán lẻ hàng đầu.',
      desc: en ? 'HAQ FOOD became a trusted supplier for major Vietnamese retail systems. Our distribution network expanded rapidly nationwide, connecting high-quality snacks with millions of everyday consumers.'
        : ko ? 'HAQ FOOD는 베트남 최대 유통 그룹들의 신뢰받는 공급 파트너로 성장했습니다. 전국 매장으로 유통망이 급속 확장되어 매일 수백만 소비자에게 프리미엄 스낵을 공급하고 있습니다.'
        : zh ? 'HAQ FOOD 成为越南大型零售商超系统的信赖供应伙伴。全国分销网络迅猛拓展，让高品质的健康零食每天触达数百万大众消费者。'
        : 'HAQ FOOD trở thành đối tác cung ứng uy tín của các hệ thống bán lẻ lớn nhất Việt Nam. Mạng lưới phân phối mở rộng thần tốc khắp các tỉnh thành, đưa các sản phẩm chất lượng cao tiếp cận hàng triệu người tiêu dùng mỗi ngày.',
      achievements: en ? [
        'Executed nationwide supply contracts with WinMart, WinMart+, GO!, and Bach Hoa Xanh.',
        'Strong presence across 24/7 convenience store chains: Circle K, GS25, K-Market.',
        'Ensured large-scale, continuous, and stable supply capacity for B2B partners.',
        'Expanded nationwide distribution network and regional retail partnerships.',
      ] : ko ? [
        'WinMart, WinMart+, GO!, Bach Hoa Xanh과 전국 공식 납품 계약 체결.',
        'Circle K, GS25, K-Market 등 24시간 편의점 체인에 대대적 입점.',
        'B2B 파트너사를 위한 대량·연속·안정적 공급 역량 확보.',
        '전국 단위 유통망 및 지역 대리점 파트너십 지속 확대.',
      ] : zh ? [
        '与 WinMart、WinMart+、GO! 以及百货绿 (Bach Hoa Xanh) 签订全国直供协议。',
        '深度覆盖 24 小时便利店连锁系统：Circle K、GS25、K-Market 等。',
        '确保面向 B2B 合作伙伴的大批量、持续且稳定的供货保障能力。',
        '全面拓展覆盖全国各省市的渠道分销网络与区域经销商合作。',
      ] : [
        'Ký kết hợp đồng cung ứng toàn quốc với WinMart, WinMart+, GO! và Bách Hóa Xanh.',
        'Hiện diện mạnh mẽ trong các chuỗi cửa hàng tiện lợi 24/7: Circle K, GS25, K-Market.',
        'Đảm bảo năng lực cung ứng sản lượng lớn, liên tục và ổn định cho các đối tác B2B.',
        'Mở rộng mạng lưới phân phối và hệ thống đối tác đại lý trên toàn quốc.',
      ],
      metric: en ? 'OUTLETS' : ko ? '매장 수' : zh ? '零售终端' : 'ĐIỂM BÁN',
      metricVal: '3,000+',
      image: b2bImg,
    },
    {
      id: 'year-2024', year: '2024',
      phase: en ? 'CHAPTER 04' : ko ? '제4장' : zh ? '第四章' : 'CHƯƠNG 04',
      theme: en ? 'GLOBAL EXPORT' : ko ? '해외 수출' : zh ? '海外出口' : 'XUẤT KHẨU QUỐC TẾ',
      title: en ? 'Achieving ISO 22000 & Exporting to South Korea, Taiwan'
        : ko ? '국제 표준 ISO 22000 획득 및 한국, 대만 정식 수출'
        : zh ? '荣获 ISO 22000 国际认证与出口韩国、中国台湾'
        : 'Đạt Chuẩn ISO 22000 & Xuất Khẩu Hàn Quốc, Đài Loan',
      lead: en ? 'Validating Vietnamese food processing standards by passing stringent international partner inspections.'
        : ko ? '해외 파트너의 엄격한 검역과 규격을 통과하여 베트남 가공식품의 글로벌 신뢰도를 입증했습니다.'
        : zh ? '通过国际合作伙伴严苛检验，全面彰显越南现代食品精加工水平与信誉。'
        : 'Khẳng định uy tín thực phẩm chế biến Việt Nam vượt qua các tiêu chuẩn kiểm định nghiêm ngặt của đối tác quốc tế.',
      desc: en ? 'Following thorough audits of manufacturing workflows and sample archiving, HAQ FOOD earned ISO 22000:2018 and HACCP Codex certifications, shipping initial export containers to South Korea and Taiwan.'
        : ko ? '생산 공정 및 검체 보관 시스템에 대한 철저한 심사를 거쳐 ISO 22000:2018 및 HACCP Codex 인증을 획득했습니다. 한국과 대만 시장으로 첫 컨테이너 정식 수출을 성공적으로 진행했습니다.'
        : zh ? '通过对生产流程、环境卫生及样品留存追溯体系的全面严格审核，HAQ FOOD 荣获 ISO 22000:2018 及 HACCP Codex 国际双认证。公司首批集装箱正品正关顺利出口至韩国与中国台湾市场。'
        : 'Sau quá trình thẩm định toàn diện về quy trình sản xuất và lưu mẫu, HAQ FOOD đạt chứng nhận ISO 22000:2018 và HACCP Codex. Doanh nghiệp chính thức xuất khẩu những chuyến container đầu tiên sang Hàn Quốc và Đài Loan.',
      achievements: en ? [
        'Earned ISO 22000:2018 & HACCP Codex international food safety certifications.',
        'Officially exported baked cakes and crispy rice paper to South Korea & Taiwan.',
        'Standardized multilingual packaging and customs labeling conforming to export laws.',
        'Upgraded in-house QC lab for microbiological assays and lot-by-lot moisture testing.',
      ] : ko ? [
        '공인 시험기관으로부터 ISO 22000:2018 및 HACCP Codex 국제 인증 취득.',
        '구운 과자 및 건조 라이스페이퍼의 한국, 대만 정식 수출 완수.',
        '국제 무역 규격에 부합하는 다국어 라벨링 및 통관 표기 표준화.',
        '출고 로트별 미생물 및 수분 검사를 위한 자체 QC 연구소 고도화.',
      ] : zh ? [
        '荣获独立权威机构颁发的 ISO 22000:2018 与 HACCP Codex 国际食品安全认证。',
        '烘烤糕点与香脆米纸顺利正关出口至韩国及中国台湾。',
        '全面规范多语言外销包装与符合国际海关法规的追溯标签。',
        '升级企业内部 QC 质检实验室，逐批严控微生物与水分指标。',
      ] : [
        'Đạt chứng chỉ quốc tế ISO 22000:2018 & HACCP Codex từ tổ chức giám định độc lập.',
        'Xuất khẩu chính ngạch thành công các dòng bánh tráng & đồ ăn vặt sang Hàn Quốc & Đài Loan.',
        'Chuẩn hóa bao bì đa ngôn ngữ và tem nhãn hải quan theo quy định quốc tế.',
        'Nâng cấp phòng thí nghiệm nội bộ (QC Lab) kiểm tra vi sinh và độ ẩm từng lô.',
      ],
      metric: en ? 'MARKETS' : ko ? '수출국' : zh ? '出口国家与地区' : 'NƯỚC XUẤT KHẨU',
      metricVal: en ? '02 Countries' : ko ? '02개국' : zh ? '02个国家与地区' : '02 Nước',
      image: exportImg,
    },
    {
      id: 'year-2025-2026', year: '2025–2026',
      phase: en ? 'CHAPTER 05' : ko ? '제5장' : zh ? '第五章' : 'CHƯƠNG 05',
      theme: en ? 'AUTOMATION & SCALE' : ko ? '자동화 및 글로벌' : zh ? '自动化升级与宏图远瞻' : 'TỰ ĐỘNG HÓA & MỞ RỘNG',
      title: en ? 'Vietnam – China Trade Fair & OEM/ODM Expansion'
        : ko ? '베트남-중국 무역 박람회 참가 및 OEM/ODM 확대'
        : zh ? '亮相越中经贸博览会与全面拓展 OEM/ODM 智造'
        : 'Hội Chợ Giao Thương Việt – Trung & Mở Rộng OEM/ODM',
      lead: en ? 'Comprehensive modernization of technological infrastructure, international trade exhibitions, and supply chain expansion.'
        : ko ? '기술 인프라 전면 현대화, 국제 무역 박람회 참가 및 공급망 다각화 추진.'
        : zh ? '全面升级自动化基础设施，深度参与国际经贸展会，持续拓展全球供应链合作。'
        : 'Hiện đại hóa toàn diện hạ tầng kỹ thuật, tham gia hội chợ thương mại quốc tế và mở rộng chuỗi cung ứng.',
      desc: en ? 'HAQ FOOD continually invests in automated packaging systems and positive-pressure cleanrooms. Concurrently, participating in the Vietnam – China Trade Fair to scale OEM/ODM partnerships across Asia and targeting the Japanese market.'
        : ko ? '자동 계량 포장 시스템과 양압 클린룸 환경을 지속적으로 업그레이드하고 있습니다. 베트남-중국 무역 박람회에 참가하여 OEM/ODM 위탁 제조 파트너십을 체결하고 일본 및 동남아 시장 진출을 준비하고 있습니다.'
        : zh ? 'HAQ FOOD 持续投入自动定量包装流水线，严格管控正压洁净车间环境。同时亮相越中经贸博览会，面向亚洲及日本市场全面拓展专业 OEM/ODM 代工定制业务。'
        : 'HAQ FOOD liên tục đầu tư hệ thống tự động hóa cân đóng gói, kiểm soát môi trường phòng sạch áp suất dương. Doanh nghiệp tham gia Hội chợ Giao thương Việt – Trung để mở rộng dịch vụ gia công OEM/ODM và xúc tiến thị trường Nhật Bản.',
      achievements: en ? [
        'Participated in the Vietnam – China Trade Fair, establishing connections with 50+ B2B partners.',
        'Implemented automated sterile packaging lines controlling temperature and humidity.',
        'Offered turnkey OEM/ODM solutions for partner brands and regional F&B chains.',
        'Positioned toward building a sustainable high-tech agri-food ecosystem.',
      ] : ko ? [
        '베트남-중국 무역 박람회 참가 및 50여 개 이상의 B2B 바이어 상담 진행.',
        '온습도 자동 제어 무균 포장 라인 전면 가동.',
        'F&B 체인 및 브랜드 파트너 대상 턴키 OEM/ODM 솔루션 제공.',
        '지속 가능한 첨단 농식품 융합 생태계 비전 수립.',
      ] : zh ? [
        '参展越中经贸博览会，对接全球 50+ 优质 B2B 商业伙伴与海外买家。',
        '全面投产温湿度精密智控的全自动无菌包装生产线。',
        '为知名餐饮连锁与合作品牌提供从配方研发到成品交付的一站式 OEM/ODM 服务。',
        '锚定可持续发展的现代高科技农副产品深加工融合生态。',
      ] : [
        'Tham gia Hội chợ Giao thương Việt – Trung, kết nối hơn 50+ đối tác B2B quốc tế.',
        'Ứng dụng dây chuyền đóng gói vô trùng tự động kiểm soát độ ẩm và nhiệt độ.',
        'Cung cấp dịch vụ gia công trọn gói OEM/ODM cho các chuỗi F&B và thương hiệu đối tác.',
        'Định hướng xây dựng hệ sinh thái nông sản thực phẩm công nghệ cao bền vững.',
      ],
      metric: en ? 'STANDARD' : ko ? '기준' : zh ? '质管标准' : 'TIÊU CHUẨN',
      metricVal: '100% ISO',
      image: factoryImg,
    },
  ]
}
