import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Award, ShieldCheck, Globe2, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import factoryHqImg from '../assets/about/factory_hq.webp'
import labInspectionImg from '../assets/about/lab_inspection.webp'

const ABOUT_DATA = {
  vi: {
    eyebrow: '✦ Về HAQ Food ✦',
    heading: 'Doanh Nghiệp Thực Phẩm Việt — Từ Nội Địa Đến Quốc Tế',
    paragraph1:
      'Thành lập từ năm 2021 tại Thủ đô Hà Nội, CÔNG TY CỔ PHẦN HAQ HÀ NỘI là đơn vị tiên phong chuẩn hóa dòng sản phẩm ăn vặt truyền thống Việt Nam thành mặt hàng đóng gói chất lượng cao.',
    paragraph2:
      'Với quy trình sản xuất khép kín nghiêm ngặt đạt chuẩn ISO 22000 & HACCP, HAQ Food không ngừng sáng tạo để mang trọn hương vị tinh hoa ẩm thực đường phố vào từng bao bì chuẩn mực, tự hào đồng hành cùng các chuỗi bán lẻ hàng đầu và tự tin vươn ra thị trường quốc tế.',
    badges: [
      { label: 'Chứng nhận ISO 22000', icon: 'shield' },
      { label: 'Tiêu chuẩn HACCP', icon: 'award' },
      { label: 'Xuất khẩu Hàn Quốc · Đài Loan', icon: 'globe' },
    ],
    stats: [
      { num: '2021', label: 'Thành lập' },
      { num: '50+', label: 'Sản phẩm' },
      { num: '7+', label: 'Đối tác' },
      { num: '3', label: 'Thị trường' },
    ],
    cta: 'Tìm hiểu thêm về HAQ',
  },
  en: {
    eyebrow: '✦ About HAQ Food ✦',
    heading: 'Vietnamese Food Enterprise — From Domestic Heart to Global Reach',
    paragraph1:
      'Founded in 2021 in Hanoi, HAQ Hanoi Joint Stock Company is a pioneer in standardizing Vietnamese traditional snacks into high-standard, safe packaged delicacies.',
    paragraph2:
      'Driven by rigorous closed-loop production under ISO 22000 & HACCP standards, HAQ Food continually innovates to preserve authentic street culinary heritage within modern packaging, proudly partnering with premier supermarket chains and expanding overseas.',
    badges: [
      { label: 'ISO 22000 Certified', icon: 'shield' },
      { label: 'HACCP Standard', icon: 'award' },
      { label: 'Export: Korea · Taiwan', icon: 'globe' },
    ],
    stats: [
      { num: '2021', label: 'Founded' },
      { num: '50+', label: 'Products' },
      { num: '7+', label: 'Partners' },
      { num: '3', label: 'Markets' },
    ],
    cta: 'Discover our story',
  },
  ko: {
    eyebrow: '✦ HAQ 푸드 소개 ✦',
    heading: '베트남 대표 식품 기업 — 내수 1위에서 글로벌 무대로',
    paragraph1:
      '2021년 하노이에서 설립된 HAQ 하노이 주식회사는 베트남 전통 간식을 현대적인 고품질 표준 포장 식품으로 승화시킨 선도 기업입니다.',
    paragraph2:
      'ISO 22000 및 HACCP 국제 규격을 충족하는 첨단 위생 제조 공정을 바탕으로, 깊은 맛과 안전성을 동시에 담아내어 국내 대형 유통망 공급은 물론 한국·대만 등 글로벌 수출 시장을 성공적으로 개척하고 있습니다.',
    badges: [
      { label: 'ISO 22000 인증', icon: 'shield' },
      { label: 'HACCP 위생인증', icon: 'award' },
      { label: '한국 · 대만 수출 완료', icon: 'globe' },
    ],
    stats: [
      { num: '2021', label: '설립 연도' },
      { num: '50+', label: '제품 라인' },
      { num: '7+', label: '유통 파트너' },
      { num: '3', label: '수출 국가' },
    ],
    cta: '회사 소개 자세히 보기',
  },
  zh: {
    eyebrow: '✦ 关于 HAQ Food ✦',
    heading: '越南食品领军品牌 — 从本土精造迈向国际舞台',
    paragraph1:
      'HAQ 河内股份公司于 2021 年创立于首都河内，是致力于将越南传统风味休闲小吃标准化、高端包装化的行业先锋企业。',
    paragraph2:
      '依托 ISO 22000 与 HACCP 严格的闭环品控体系，HAQ 严选优质天然食材，在保留地道街头风味的同时赋予现代食品安全标准，产品全面进驻主流连锁零售体系并出口韩国、台湾等海外市场。',
    badges: [
      { label: 'ISO 22000 国际认证', icon: 'shield' },
      { label: 'HACCP 安全认证', icon: 'award' },
      { label: '远销韩国 · 台湾地区', icon: 'globe' },
    ],
    stats: [
      { num: '2021', label: '创立年份' },
      { num: '50+', label: '产品体系' },
      { num: '7+', label: '合作品牌' },
      { num: '3', label: '海外市场' },
    ],
    cta: '了解更多品牌历程',
  },
}

export default function AboutHAQ() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const data = ABOUT_DATA[language] || ABOUT_DATA.vi

  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const leftEl = leftRef.current
    const rightEl = rightRef.current
    if (!leftEl || !rightEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', '-translate-x-12', 'translate-x-12')
            entry.target.classList.add('opacity-100', 'translate-x-0')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(leftEl)
    observer.observe(rightEl)

    return () => observer.disconnect()
  }, [])

  const handleNavigateAbout = () => {
    navigate(language === 'vi' ? '/gioi-thieu' : language === 'en' ? '/en/about' : language === 'ko' ? '/ko/about' : '/zh/about')
  }

  const renderBadgeIcon = (iconType) => {
    if (iconType === 'shield') return <ShieldCheck className="w-3.5 h-3.5 text-haq-green shrink-0" />
    if (iconType === 'award') return <Award className="w-3.5 h-3.5 text-gold shrink-0" />
    return <Globe2 className="w-3.5 h-3.5 text-haq-green shrink-0" />
  }

  return (
    <section
      className="relative w-full py-10 lg:py-16 bg-warm-cream border-t-2 border-gold-pale overflow-hidden"
    >
      {/* Subtle background ambient gradient */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-haq-green/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0">
          {/* ─────────────────────────────────────────────────────────────
              LEFT SIDE: Images composition with gold offset frame
          ───────────────────────────────────────────────────────────── */}
          <div
            ref={leftRef}
            className="lg:col-span-6 relative transition-all duration-1000 ease-out opacity-0 -translate-x-12 pr-4 sm:pr-8 lg:pr-0"
          >
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Gold offset frame behind main image */}
              <div
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full rounded-2xl border-2 border-gold/40 -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-soft-cream border border-haq-border/60">
                <img
                  src={factoryHqImg}
                  alt="HAQ Food Factory & International Standard Facility"
                  loading="lazy"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating mini image overlapping bottom-right */}
              <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-4 w-36 sm:w-44 aspect-[4/3] rounded-xl overflow-hidden shadow-xl border-3 border-warm-cream bg-soft-cream z-20 group">
                <img
                  src={labInspectionImg}
                  alt="HAQ Food Quality Inspection"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT SIDE: Elevated white card overlapping into image area
          ───────────────────────────────────────────────────────────── */}
          <div
            ref={rightRef}
            className="lg:col-span-6 relative z-30 transition-all duration-1000 ease-out opacity-0 translate-x-12 lg:-ml-8"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-haq-border/70">
              {/* Eyebrow */}
              <div className="text-gold font-semibold uppercase tracking-widest text-[11px] md:text-xs mb-2">
                {data.eyebrow}
              </div>

              {/* Heading */}
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-haq-ink leading-tight">
                {data.heading}
              </h2>

              {/* Gold subtle accent bar */}
              <div className="w-12 h-0.5 bg-gold my-3.5 rounded-full" />

              {/* Body Text */}
              <div className="space-y-2.5 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                <p>{data.paragraph1}</p>
                <p>{data.paragraph2}</p>
              </div>

              {/* Badge pills */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                {data.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-warm-bg border border-gold/30 text-xs font-semibold text-haq-ink shadow-sm"
                  >
                    {renderBadgeIcon(badge.icon)}
                    <span>{badge.label}</span>
                  </span>
                ))}
              </div>

              {/* Mini Stats Grid (4 columns) */}
              <div className="grid grid-cols-4 gap-2 pt-6 mt-8 border-t border-haq-border/70">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <span className="block font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-haq-green-dark">
                      {stat.num}
                    </span>
                    <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-haq-text-secondary mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA link */}
              <div className="mt-8 pt-6 border-t border-haq-border/50 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleNavigateAbout}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-haq-green-dark hover:text-haq-green transition-colors duration-200 cursor-pointer group"
                >
                  <span>{data.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
