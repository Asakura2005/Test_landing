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

import factoryImg from '../assets/factory/factory_production.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import heroBanner1 from '../assets/herobanner/hero_banner_1.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'

import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'

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

  // Auto-detect active chapter on scroll
  const chapters = useMemo(() => getChapters(language), [language])

  useEffect(() => {
    const observers = []
    chapters.forEach((chap) => {
      const el = document.getElementById(chap.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveYear(chap.year) },
        { rootMargin: '-25% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [chapters])

  // Hero entrance
  const [heroReady, setHeroReady] = useState(false)
  useEffect(() => { setTimeout(() => setHeroReady(true), 100) }, [])

  const scrollToChapter = (id, year) => {
    setActiveYear(year)
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 140
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const credentials = useMemo(() => getCredentials(language), [language])
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
            HERO — Centered, text-focused, outline year range
            ═══════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#0C1E15] overflow-hidden py-28 sm:py-36 lg:py-44">
          {/* Large outline year watermark */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
            <span
              className={`font-heading font-extrabold text-[8rem] sm:text-[12rem] lg:text-[18rem] leading-none tracking-tighter transition-all duration-[2000ms] ${heroReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ WebkitTextStroke: '1.5px rgba(200,155,60,0.15)', WebkitTextFillColor: 'transparent' }}
            >
              2021
            </span>
          </div>

          <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12 text-center">
            <p className={`font-heading text-xs tracking-[0.3em] text-[#C89B3C] uppercase mb-6 transition-all duration-700 delay-300 ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              {t('history.badge', 'Lịch sử & Dấu mốc phát triển')}
            </p>

            <h1 className={`font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[0.95] transition-all duration-700 delay-500 ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-6'}`}>
              {language === 'en' ? (
                <>GROWTH JOURNEY<br /><span className="text-[#C89B3C]">2021 — 2026</span></>
              ) : language === 'ko' ? (
                <>성장의 여정<br /><span className="text-[#C89B3C]">2021 — 2026</span></>
              ) : (
                <>HÀNH TRÌNH TĂNG TRƯỞNG<br /><span className="text-[#C89B3C]">2021 — 2026</span></>
              )}
            </h1>

            <p className={`mt-6 text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-700 ${heroReady ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
              {t('history.subtitle', 'Từ xưởng sản xuất bánh tráng sấy giòn khép kín đầu tiên tại Hà Nội năm 2021, HAQ FOOD đã không ngừng đổi mới công nghệ, chuẩn hóa chất lượng quốc tế và mở rộng mạng lưới để đưa thực phẩm Việt chất lượng cao phủ sóng toàn quốc và vươn tầm xuất khẩu châu Á.')}
            </p>

            {/* Stats row */}
            <div className={`mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-white/10 pt-10 transition-all duration-700 delay-[900ms] ${heroReady ? 'opacity-100' : 'opacity-0'}`}>
              {[
                { val: '2021', label: language === 'en' ? 'Founded' : language === 'ko' ? '설립' : 'Thành lập' },
                { val: '15+', label: language === 'en' ? 'Products' : language === 'ko' ? '제품군' : 'Sản phẩm' },
                { val: '3,000+', label: language === 'en' ? 'Outlets' : language === 'ko' ? '매장' : 'Điểm bán' },
                { val: '02', label: language === 'en' ? 'Export Markets' : language === 'ko' ? '수출국' : 'Nước xuất khẩu' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">{s.val}</div>
                  <div className="text-[11px] text-white/40 mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STICKY YEAR NAV — Auto-highlights on scroll
            ═══════════════════════════════════════════════════════════ */}
        <div className="sticky top-[68px] sm:top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-haq-border shadow-xs">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex items-center gap-1.5 sm:gap-2 py-3 overflow-x-auto scrollbar-none">
              <Calendar className="w-3.5 h-3.5 text-haq-text-secondary shrink-0 mr-1" />
              {chapters.map((chap) => (
                <button
                  key={chap.year}
                  onClick={() => scrollToChapter(chap.id, chap.year)}
                  className={`px-4 py-2 rounded-full text-xs font-heading font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
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

        {/* ═══════════════════════════════════════════════════════════
            CHAPTERS — Alternating timeline with watermark years
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-haq-cream/40">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            {chapters.map((chap, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={chap.id} id={chap.id} className={`relative scroll-mt-36 ${idx > 0 ? 'mt-28 sm:mt-40' : ''}`}>
                  {/* Chapter divider dot */}
                  {idx > 0 && (
                    <div className="flex items-center gap-0 mb-16 sm:mb-20">
                      <div className="h-px flex-1 bg-haq-border" />
                      <div className="w-3 h-3 rounded-full bg-haq-red mx-4 shrink-0" />
                      <div className="h-px flex-1 bg-haq-border" />
                    </div>
                  )}

                  {/* Watermark year */}
                  <div className="absolute -top-4 sm:-top-8 right-0 lg:right-8 select-none pointer-events-none overflow-hidden" aria-hidden="true">
                    <Reveal delay={200} direction="none">
                      <span className="font-heading font-extrabold text-[7rem] sm:text-[10rem] lg:text-[14rem] leading-none text-haq-border/20 tracking-tighter">
                        {chap.year}
                      </span>
                    </Reveal>
                  </div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Image */}
                    <Reveal delay={100} direction={isEven ? 'left' : 'right'} className={isEven ? '' : 'lg:order-2'}>
                      <div className="relative rounded-2xl overflow-hidden group">
                        <img
                          src={chap.image}
                          alt={chap.title}
                          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        {/* Overlay badges */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                          <span className="bg-haq-red text-white font-heading font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                            {chap.year}
                          </span>
                          <span className="bg-white/90 backdrop-blur-sm text-haq-ink font-heading font-bold text-[10px] px-2.5 py-1 rounded-full hidden sm:inline">
                            {chap.phase}
                          </span>
                        </div>
                        {/* Bottom metric */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0C1E15]/80 to-transparent px-5 pb-4 pt-12">
                          <div className="flex items-end justify-between text-white">
                            <span className="text-[10px] uppercase tracking-wider text-white/60">{chap.metric}</span>
                            <span className="font-heading font-extrabold text-2xl text-[#C89B3C]">{chap.metricVal}</span>
                          </div>
                        </div>
                      </div>
                    </Reveal>

                    {/* Content */}
                    <div className={isEven ? '' : 'lg:order-1'}>
                      <Reveal delay={200}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                            {chap.phase}
                          </span>
                          <span className="h-px w-6 bg-haq-red/40" />
                          <span className="font-heading text-xs text-haq-text-secondary uppercase tracking-wider">
                            {chap.theme}
                          </span>
                        </div>
                      </Reveal>

                      <Reveal delay={300}>
                        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink leading-tight tracking-tight">
                          {chap.title}
                        </h3>
                      </Reveal>

                      <Reveal delay={400}>
                        <p className="mt-3 text-sm text-haq-red font-medium leading-relaxed border-l-2 border-haq-red/30 pl-4">
                          {chap.lead}
                        </p>
                      </Reveal>

                      <Reveal delay={500}>
                        <p className="mt-4 text-sm text-haq-text-secondary leading-[1.8]">
                          {chap.desc}
                        </p>
                      </Reveal>

                      {/* Achievements */}
                      <div className="mt-6 space-y-2.5">
                        {chap.achievements.map((ach, aIdx) => (
                          <Reveal key={aIdx} delay={600 + aIdx * 80} direction={isEven ? 'left' : 'right'}>
                            <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-haq-border/80">
                              <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                              <span className="text-xs text-haq-text-secondary leading-relaxed">{ach}</span>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CREDENTIALS — Clean horizontal cards
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-white border-t border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-haq-ink tracking-tight mb-4">
                {language === 'en' ? 'Standards & Certifications' : language === 'ko' ? '품질 관리 기준 및 인증' : 'Tiêu chuẩn & Chứng nhận'}
              </h2>
              <p className="text-sm text-haq-text-secondary max-w-lg mb-14">
                {language === 'en'
                  ? 'Guaranteeing consistent quality, food safety compliance, and long-term partnership integrity.'
                  : language === 'ko'
                  ? '균일한 품질과 식품 안전 위생을 보증하며 신뢰할 수 있는 비즈니스 협력을 약속합니다.'
                  : 'Bảo chứng cho chất lượng đồng nhất, an toàn vệ sinh thực phẩm và uy tín hợp tác bền vững.'}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-haq-border rounded-2xl overflow-hidden">
              {credentials.map((item, idx) => (
                <Reveal key={idx} delay={idx * 100} className="bg-white p-7">
                  <h3 className="font-heading font-bold text-lg text-haq-ink">{item.title}</h3>
                  <div className="font-heading text-xs font-bold text-haq-red uppercase mt-1 mb-3">{item.sub}</div>
                  <p className="text-xs text-haq-text-secondary leading-relaxed">{item.desc}</p>
                </Reveal>
              ))}
            </div>

            {/* Partner logos */}
            <Reveal delay={200}>
              <div className="mt-16 pt-12 border-t border-haq-border">
                <p className="text-center text-xs text-haq-text-secondary uppercase tracking-[0.2em] mb-8">
                  {language === 'en' ? 'Strategic Retail Partners' : language === 'ko' ? '전략적 유통 파트너' : 'Đối tác phân phối chiến lược'}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {PARTNERS.map((p, i) => (
                    <div key={i} className="h-16 sm:h-20 flex items-center justify-center rounded-xl bg-haq-cream/60 p-3 border border-haq-border/60">
                      <img src={p.logo} alt={p.name} className="max-h-8 sm:max-h-10 max-w-full object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA — Navigation to related pages
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-haq-cream/50 border-t border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal direction="left">
                <Link
                  to="/gioi-thieu"
                  className="group bg-white p-8 rounded-2xl border border-haq-border hover:border-haq-red/50 hover:shadow-lg transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider">
                      {language === 'en' ? 'Company Profile' : language === 'ko' ? '기업 소개' : 'Giới thiệu'}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-haq-ink group-hover:text-haq-red transition-colors mt-2">
                      {language === 'en' ? 'Corporate Overview & Mission' : language === 'ko' ? '기업 개요 및 비전' : 'Tổng quan doanh nghiệp & Sứ mệnh'}
                    </h3>
                    <p className="text-xs text-haq-text-secondary mt-3 leading-relaxed">
                      {language === 'en'
                        ? 'Discover our philosophy, vision, and core values.'
                        : language === 'ko'
                        ? 'HAQ FOOD의 경영 철학과 핵심 가치를 확인하세요.'
                        : 'Tìm hiểu triết lý kinh doanh và giá trị cốt lõi HAQ FOOD.'}
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold text-haq-red">
                    <span>{language === 'en' ? 'View profile' : language === 'ko' ? '기업 소개 보기' : 'Xem giới thiệu'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>

              <Reveal direction="right">
                <Link
                  to="/san-pham"
                  className="group bg-white p-8 rounded-2xl border border-haq-border hover:border-haq-red/50 hover:shadow-lg transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider">
                      {language === 'en' ? 'Products' : language === 'ko' ? '제품' : 'Sản phẩm'}
                    </span>
                    <h3 className="font-heading font-bold text-xl text-haq-ink group-hover:text-haq-red transition-colors mt-2">
                      {language === 'en' ? 'Product Catalog & Snack Lines' : language === 'ko' ? '제품 카탈로그 및 스낵 라인업' : 'Danh mục sản phẩm & Các dòng snack'}
                    </h3>
                    <p className="text-xs text-haq-text-secondary mt-3 leading-relaxed">
                      {language === 'en'
                        ? 'Explore our full range of Vietnamese snacks and dried foods.'
                        : language === 'ko'
                        ? '베트남 프리미엄 스낵 및 건조식품 전체 라인업을 확인하세요.'
                        : 'Khám phá đầy đủ các dòng bánh tráng, bánh nướng và nông sản sấy.'}
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold text-haq-red">
                    <span>{language === 'en' ? 'View products' : language === 'ko' ? '제품 보기' : 'Xem sản phẩm'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   DATA — Chapters (kept outside component for clarity)
   ═══════════════════════════════════════════════════════════════════ */
function getChapters(lang) {
  const vi = lang !== 'en' && lang !== 'ko'
  const en = lang === 'en'
  return [
    {
      id: 'year-2021', year: '2021',
      phase: en ? 'CHAPTER 01' : lang === 'ko' ? '제1장' : 'CHƯƠNG 01',
      theme: en ? 'ORIGINS & FOUNDATION' : lang === 'ko' ? '태동 및 기반 구축' : 'KHỞI NGUỒN & NỀN MÓNG',
      title: en ? 'Establishment & Operation of First Closed Drying Facility'
        : lang === 'ko' ? '회사 설립 및 1호 밀폐형 열풍 건조 공장 가동'
        : 'Thành lập Công ty & Vận hành Xưởng Sấy Giòn Khép Kín Đầu Tiên',
      lead: en ? 'Rooted in the ambition to modernize and standardize traditional Vietnamese snacks using clean drying technology.'
        : lang === 'ko' ? '청결 건조 기술로 베트남 전통 간식을 현대화하고 표준화하겠다는 비전으로 출발했습니다.'
        : 'Bắt đầu từ khát vọng hiện đại hóa và chuẩn hóa món ăn vặt truyền thống Việt Nam bằng công nghệ sấy sạch.',
      desc: en ? 'HAQ Hanoi Joint Stock Company was officially founded in Hanoi. The company invested in building a dedicated production plant with our first closed convection drying line, decisively solving food safety concerns and defining the HAQ FOOD brand.'
        : lang === 'ko' ? '베트남 하노이에 HAQ Hanoi Joint Stock Company가 공식 설립되었습니다. 당사는 제1호 밀폐형 대류 건조 라인을 구축하여 식품 위생 문제를 완벽히 해결하고 시장에서 HAQ FOOD 브랜드를 정립했습니다.'
        : 'Công ty Cổ phần HAQ Hà Nội chính thức được thành lập tại Thủ đô Hà Nội. Doanh nghiệp đầu tư xây dựng nhà xưởng với dây chuyền sấy giòn khép kín đầu tiên, giải quyết triệt để bài toán an toàn vệ sinh thực phẩm và định hình thương hiệu HAQ FOOD trên thị trường.',
      achievements: en ? [
        'Officially established legal entity HAQ Hanoi Joint Stock Company.',
        'Inaugurated clean rice paper drying facility with convection thermal system.',
        'Launched first flagship product line: Crispy dried rice paper in Beef, Shrimp & Sate flavors.',
        'Completed quality declaration and food safety certification under national standards.',
      ] : lang === 'ko' ? [
        'HAQ Hanoi Joint Stock Company 법인 공식 설립.',
        '대류 열풍 가열 시스템을 갖춘 라이스페이퍼 클린 건조 공장 준공.',
        '첫 핵심 라인업 출시: 소고기맛, 새우맛, 사테맛 바삭 건조 라이스페이퍼.',
        '국가 규격에 부합하는 품질 신고 및 식품 위생 안전 인증 완료.',
      ] : [
        'Chính thức thành lập pháp nhân Công ty Cổ phần HAQ Hà Nội.',
        'Khánh thành phân xưởng sấy bánh tráng sạch với hệ thống gia nhiệt đối lưu.',
        'Ra mắt dòng sản phẩm chủ lực đầu tiên: Bánh tráng sấy giòn vị Bò, Tôm & Sa tế.',
        'Hoàn thiện hồ sơ công bố chất lượng và an toàn thực phẩm theo quy chuẩn nhà nước.',
      ],
      metric: en ? 'FOUNDED' : lang === 'ko' ? '설립' : 'NĂNG KHỞI ĐẦU',
      metricVal: '2021',
      image: heroBanner1,
    },
    {
      id: 'year-2022', year: '2022',
      phase: en ? 'CHAPTER 02' : lang === 'ko' ? '제2장' : 'CHƯƠNG 02',
      theme: en ? 'R&D & EXPANSION' : lang === 'ko' ? 'R&D 혁신 및 다각화' : 'ĐỔI MỚI R&D & ĐA DẠNG HÓA',
      title: en ? 'R&D Investment & Expansion into 4 New Food Categories'
        : lang === 'ko' ? 'R&D 연구 투자 및 4대 신규 식품군 확장'
        : 'Đầu tư R&D & Mở Rộng 4 Nhóm Thực Phẩm Mới',
      lead: en ? 'Elevating heritage recipes combined with advanced baking and drying systems to satisfy diverse consumer tastes.'
        : lang === 'ko' ? '전통 비법에 현대적 제빵 및 건조 기술을 접목하여 소비자의 다채로운 입맛을 충족시켰습니다.'
        : 'Nâng tầm công thức gia truyền kết hợp thiết bị nướng và sấy hiện đại, đáp ứng đa dạng khẩu vị người tiêu dùng.',
      desc: en ? 'Heavily investing in our dedicated R&D lab to standardize clean agri-produce processing. HAQ FOOD broadened its catalog from rice paper to premium baked cookies, traditional mung bean cakes, and ready-to-eat dried meats, expanding to 15+ SKUs.'
        : lang === 'ko' ? 'R&D 전담 연구소에 과감히 투자하여 청정 농산물 가공 공정을 표준화했습니다. 라이스페이퍼에서 프리미엄 구운 과자, 전통 녹두과자, 건조 육류 간식으로 카테고리를 넓혀 총 15종 이상의 SKU를 구축했습니다.'
        : 'Đầu tư mạnh mẽ vào phòng nghiên cứu R&D, chuẩn hóa quy trình chế biến nông sản sạch. HAQ FOOD mở rộng danh mục từ bánh tráng sang các dòng bánh nướng thượng hạng, bánh đậu xanh truyền thống và đồ ăn khô ăn liền, nâng tổng số mã sản phẩm lên hơn 15+ SKU.',
      achievements: en ? [
        'Successfully formulated crispy almond cookies and smooth fresh mung bean cakes.',
        'Commissioned high-tech popcorn popping chamber with uniform caramel coating.',
        'Added specialized processing lines for lime leaf shredded chicken and garlic beef jerky.',
        'Re-engineered modern, convenient packaging ensuring long shelf life.',
      ] : lang === 'ko' ? [
        '바삭하고 고소한 아몬드 쿠키 및 부드러운 신선 녹두 케이크 독자 레시피 개발.',
        '고기술 캐러멜 코팅 팝콘 팽창 챔버 도입 및 가동.',
        '라임잎 닭고기 육포 및 마늘 돼지고기 육포 전문 가공 라인 증설.',
        '장기 보관성과 휴대성을 갖춘 현대적 감각의 패키징 리뉴얼 단행.',
      ] : [
        'Nghiên cứu thành công công thức Bánh hạnh nhân giòn xốp và Bánh đậu xanh tươi thơm mịn.',
        'Đưa vào vận hành buồng nổ bắp rang bơ công nghệ cao, phủ caramel đều hạt.',
        'Bổ sung dây chuyền chế biến khô gà lá chanh, khô heo cháy tỏi chuẩn vị.',
        'Tái định vị bao bì sản phẩm sang phong cách hiện đại, tiện lợi, bảo quản dài lâu.',
      ],
      metric: en ? 'PRODUCT SKUs' : lang === 'ko' ? '제품 규격' : 'SẢN PHẨM',
      metricVal: '15+',
      image: catBanhImg,
    },
    {
      id: 'year-2023', year: '2023',
      phase: en ? 'CHAPTER 03' : lang === 'ko' ? '제3장' : 'CHƯƠNG 03',
      theme: en ? 'NATIONAL RETAIL' : lang === 'ko' ? '전국 유통망 확장' : 'PHỦ SÓNG TOÀN QUỐC',
      title: en ? 'Presence Across 3,000+ Outlets in Major Chains'
        : lang === 'ko' ? '전국 대형마트 및 편의점 3,000+ 개 매장 입점'
        : 'Phủ Sóng 3.000+ Điểm Bán Tại Các Chuỗi Lớn',
      lead: en ? 'A strategic commercial leap bringing HAQ FOOD products onto shelves of Vietnam\'s leading retail conglomerates.'
        : lang === 'ko' ? '베트남 굴지의 대형 유통 채널 매대에 HAQ FOOD 제품을 진열하며 비즈니스의 획기적 도약을 달성했습니다.'
        : 'Tạo bước nhảy vọt về thương mại khi đưa sản phẩm HAQ FOOD lên quầy kệ của các tập đoàn bán lẻ hàng đầu.',
      desc: en ? 'HAQ FOOD became a trusted supplier for major Vietnamese retail systems. Our distribution network expanded rapidly nationwide, connecting high-quality snacks with millions of everyday consumers.'
        : lang === 'ko' ? 'HAQ FOOD는 베트남 최대 유통 그룹들의 신뢰받는 공급 파트너로 성장했습니다. 전국 매장으로 유통망이 급속 확장되어 매일 수백만 소비자에게 프리미엄 스낵을 공급하고 있습니다.'
        : 'HAQ FOOD trở thành đối tác cung ứng uy tín của các hệ thống bán lẻ lớn nhất Việt Nam. Mạng lưới phân phối mở rộng thần tốc khắp các tỉnh thành, đưa các sản phẩm chất lượng cao tiếp cận hàng triệu người tiêu dùng mỗi ngày.',
      achievements: en ? [
        'Executed nationwide supply contracts with WinMart, WinMart+, GO!, and Bach Hoa Xanh.',
        'Strong presence across 24/7 convenience store chains: Circle K, GS25, K-Market.',
        'Operated satellite warehouses and pallet-standard cold/dry logistics.',
        'Voted by consumers as one of the top preferred snack brands.',
      ] : lang === 'ko' ? [
        'WinMart, WinMart+, GO!, Bach Hoa Xanh과 전국 공식 납품 계약 체결.',
        'Circle K, GS25, K-Market 등 24시간 편의점 체인에 대대적 입점.',
        '팔레트 표준 보관 규격을 갖춘 거점 물류 네트워크 운영.',
        '소비자가 뽑은 베트남 최선호 간식 브랜드로 선정.',
      ] : [
        'Ký kết hợp đồng cung ứng toàn quốc với WinMart, WinMart+, GO! và Bách Hóa Xanh.',
        'Hiện diện mạnh mẽ trong các chuỗi cửa hàng tiện lợi 24/7: Circle K, GS25, K-Market.',
        'Vận hành mạng lưới kho bãi vệ tinh và logistics tiêu chuẩn lưu kho pallet.',
        'Được người tiêu dùng bình chọn là món ăn vặt được ưa chuộng hàng đầu.',
      ],
      metric: en ? 'OUTLETS' : lang === 'ko' ? '매장 수' : 'ĐIỂM BÁN',
      metricVal: '3,000+',
      image: b2bImg,
    },
    {
      id: 'year-2024', year: '2024',
      phase: en ? 'CHAPTER 04' : lang === 'ko' ? '제4장' : 'CHƯƠNG 04',
      theme: en ? 'GLOBAL EXPORT' : lang === 'ko' ? '해외 수출' : 'XUẤT KHẨU QUỐC TẾ',
      title: en ? 'Achieving ISO 22000 & Exporting to South Korea, Taiwan'
        : lang === 'ko' ? '국제 표준 ISO 22000 획득 및 한국, 대만 정식 수출'
        : 'Đạt Chuẩn ISO 22000 & Xuất Khẩu Hàn Quốc, Đài Loan',
      lead: en ? 'Validating Vietnamese food processing standards by passing stringent international partner inspections.'
        : lang === 'ko' ? '해외 파트너의 엄격한 검역과 규격을 통과하여 베트남 가공식품의 글로벌 신뢰도를 입증했습니다.'
        : 'Khẳng định uy tín thực phẩm chế biến Việt Nam vượt qua các tiêu chuẩn kiểm định nghiêm ngặt của đối tác quốc tế.',
      desc: en ? 'Following thorough audits of manufacturing workflows and sample archiving, HAQ FOOD earned ISO 22000:2018 and HACCP Codex certifications, shipping initial export containers to South Korea and Taiwan.'
        : lang === 'ko' ? '생산 공정 및 검체 보관 시스템에 대한 철저한 심사를 거쳐 ISO 22000:2018 및 HACCP Codex 인증을 획득했습니다. 한국과 대만 시장으로 첫 컨테이너 정식 수출을 성공적으로 진행했습니다.'
        : 'Sau quá trình thẩm định toàn diện về quy trình sản xuất và lưu mẫu, HAQ FOOD đạt chứng nhận ISO 22000:2018 và HACCP Codex. Doanh nghiệp chính thức xuất khẩu những chuyến container đầu tiên sang Hàn Quốc và Đài Loan.',
      achievements: en ? [
        'Earned ISO 22000:2018 & HACCP Codex international food safety certifications.',
        'Officially exported baked cakes and crispy rice paper to South Korea & Taiwan.',
        'Standardized multilingual packaging and customs labeling conforming to export laws.',
        'Upgraded in-house QC lab for microbiological assays and lot-by-lot moisture testing.',
      ] : lang === 'ko' ? [
        '공인 시험기관으로부터 ISO 22000:2018 및 HACCP Codex 국제 인증 취득.',
        '구운 과자 및 건조 라이스페이퍼의 한국, 대만 정식 수출 완수.',
        '국제 무역 규격에 부합하는 다국어 라벨링 및 통관 표기 표준화.',
        '출고 로트별 미생물 및 수분 검사를 위한 자체 QC 연구소 고도화.',
      ] : [
        'Đạt chứng chỉ quốc tế ISO 22000:2018 & HACCP Codex từ tổ chức giám định độc lập.',
        'Xuất khẩu chính ngạch thành công bánh nướng & bánh tráng sang Hàn Quốc & Đài Loan.',
        'Chuẩn hóa bao bì đa ngôn ngữ và tem nhãn hải quan theo quy định quốc tế.',
        'Nâng cấp phòng thí nghiệm nội bộ (QC Lab) kiểm tra vi sinh và độ ẩm từng lô.',
      ],
      metric: en ? 'MARKETS' : lang === 'ko' ? '수출국' : 'NƯỚC XUẤT KHẨU',
      metricVal: en ? '02 Countries' : lang === 'ko' ? '02개국' : '02 Nước',
      image: exportImg,
    },
    {
      id: 'year-2025-2026', year: '2025–2026',
      phase: en ? 'CHAPTER 05' : lang === 'ko' ? '제5장' : 'CHƯƠNG 05',
      theme: en ? 'AUTOMATION & SCALE' : lang === 'ko' ? '자동화 및 글로벌' : 'TỰ ĐỘNG HÓA & MỞ RỘNG',
      title: en ? 'Cleanroom Upgrades & Full-Service OEM/ODM Expansion'
        : lang === 'ko' ? '무균 클린룸 고도화 및 OEM/ODM 확대'
        : 'Nâng Cấp Phòng Sạch & Mở Rộng OEM/ODM',
      lead: en ? 'Comprehensive modernization of technological infrastructure, international trade exhibitions, and supply chain expansion.'
        : lang === 'ko' ? '기술 인프라 전면 현대화, 국제 무역 박람회 참가 및 공급망 다각화 추진.'
        : 'Hiện đại hóa toàn diện hạ tầng kỹ thuật, tham gia hội chợ thương mại quốc tế và mở rộng chuỗi cung ứng.',
      desc: en ? 'HAQ FOOD continually invests in automated packaging systems and positive-pressure cleanrooms. Concurrently, participating in international trade expos to scale OEM/ODM partnerships across Asia.'
        : lang === 'ko' ? '자동 계량 포장 시스템과 양압 클린룸 환경을 지속적으로 업그레이드하고 있습니다. 국제 무역 교역회에 참가하여 OEM/ODM 위탁 제조 파트너십을 체결하고 일본 및 동남아 시장 진출을 준비하고 있습니다.'
        : 'HAQ FOOD liên tục đầu tư hệ thống tự động hóa cân đóng gói, kiểm soát môi trường phòng sạch áp suất dương. Đồng thời tham gia các hội chợ giao thương quốc tế để mở rộng dịch vụ gia công OEM/ODM và tiếp cận thị trường mới.',
      achievements: en ? [
        'Participated in international trade fairs, establishing connections with 50+ B2B partners.',
        'Implemented automated sterile packaging lines controlling temperature and humidity.',
        'Offered turnkey OEM/ODM solutions for partner brands and regional F&B chains.',
        'Positioned toward building a sustainable high-tech agri-food ecosystem.',
      ] : lang === 'ko' ? [
        '국제 무역 박람회 참가 및 50여 개 이상의 B2B 바이어 상담 진행.',
        '온습도 자동 제어 무균 포장 라인 전면 가동.',
        'F&B 체인 및 브랜드 파트너 대상 턴키 OEM/ODM 솔루션 제공.',
        '지속 가능한 첨단 농식품 융합 생태계 비전 수립.',
      ] : [
        'Tham gia Hội chợ Giao thương Quốc tế, kết nối hơn 50+ đối tác B2B.',
        'Ứng dụng dây chuyền đóng gói vô trùng tự động kiểm soát độ ẩm và nhiệt độ.',
        'Cung cấp dịch vụ gia công trọn gói OEM/ODM cho các chuỗi F&B và thương hiệu đối tác.',
        'Định hướng xây dựng hệ sinh thái nông sản thực phẩm công nghệ cao bền vững.',
      ],
      metric: en ? 'STANDARD' : lang === 'ko' ? '기준' : 'TIÊU CHUẨN',
      metricVal: '100% ISO',
      image: factoryImg,
    },
  ]
}

function getCredentials(lang) {
  const en = lang === 'en', ko = lang === 'ko'
  return [
    {
      title: 'ISO 22000:2018',
      sub: en ? 'Food Safety System' : ko ? '식품안전경영시스템' : 'An Toàn Thực Phẩm',
      desc: en ? 'International standard controlling the entire chain from raw agricultural commodities to packaged goods.'
        : ko ? '농산물 원자재부터 완제품 포장까지 전체 가공 사슬을 엄격히 통제하는 국제 표준.'
        : 'Chứng chỉ quốc tế kiểm soát toàn bộ chuỗi chế biến từ nông sản thô đến thành phẩm đóng gói.',
    },
    {
      title: 'HACCP Codex',
      sub: en ? 'Hazard Analysis' : ko ? '위해요소중점관리' : 'Phân Tích Mối Nguy',
      desc: en ? 'Ensures elimination of all physical, chemical, and biological hazards throughout manufacturing.'
        : ko ? '제조 전 과정에서 물리적, 화학적, 생물학적 위해 요소를 철저히 예방합니다.'
        : 'Đảm bảo loại bỏ mọi rủi ro vật lý, hóa học và sinh học trong toàn bộ quá trình sản xuất.',
    },
    {
      title: en ? '3,000+ Shelves' : ko ? '3,000+ 매장' : '3.000+ Kệ Hàng',
      sub: en ? 'Retail Network' : ko ? '유통 파트너망' : 'Mạng Lưới Phân Phối',
      desc: en ? 'Trusted supplier for WinMart, GO!, Circle K, GS25, K-Market, and Bach Hoa Xanh.'
        : ko ? 'WinMart, GO!, Circle K, GS25, K-Market 및 Bach Hoa Xanh의 공식 납품 파트너.'
        : 'Nhà cung ứng tin cậy của WinMart, GO!, Circle K, GS25, K-Market và Bách Hóa Xanh.',
    },
    {
      title: en ? 'Official Export' : ko ? '해외 정식 수출' : 'Xuất Khẩu Chính Ngạch',
      sub: en ? 'Global Standards' : ko ? '글로벌 검역 통과' : 'Chinh Phục Thị Trường',
      desc: en ? 'Products inspected and officially exported to South Korea and Taiwan.'
        : ko ? '한국 및 대만 시장의 정밀 검역을 통과하여 정식 수출 진행.'
        : 'Sản phẩm đã được kiểm định và xuất khẩu sang Hàn Quốc và Đài Loan.',
    },
  ]
}
