import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getAlternateHreflangUrls, getEquivalentRoute } from '../utils/routeI18n'

const SITE_ORIGIN = 'https://haq.com.vn'

const SEO_TITLES = {
  home: {
    vi: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI — HAQ FOOD Company Profile',
    en: 'HAQ FOOD HANOI JSC — Food Manufacturing, Export & B2B Distribution',
    ko: 'HAQ 하노이 주식회사 — 베트남 프리미엄 식품 제조 및 B2B 수출 전문 기업',
  },
  about: {
    vi: 'Giới Thiệu Doanh Nghiệp & Tầm Nhìn Chiến Lược | HAQ FOOD',
    en: 'Company Profile & Strategic Vision | HAQ FOOD Hanoi JSC',
    ko: '기업 소개 및 전략적 비전 | HAQ 하노이 주식회사',
  },
  history: {
    vi: 'Lịch Sử Phát Triển & Dấu Mốc 2021 — 2026 | HAQ FOOD',
    en: 'Development History & Key Milestones 2021 — 2026 | HAQ FOOD',
    ko: '연혁 및 주요 성장 성과 2021 — 2026 | HAQ FOOD',
  },
  capabilities: {
    vi: 'Năng Lực Sản Xuất & Tiêu Chuẩn Phòng Sạch ISO/HACCP | HAQ FOOD',
    en: 'Manufacturing Capabilities & Cleanroom Standards (ISO/HACCP) | HAQ FOOD',
    ko: '제조 역량 및 ISO/HACCP 클린룸 생산 설비 | HAQ FOOD',
  },
  products: {
    vi: 'Danh Mục Sản Phẩm & Nông Sản Sấy Sạch Cao Cấp | HAQ FOOD',
    en: 'Product Catalog & Premium Convective Dried Foods | HAQ FOOD',
    ko: '제품 소개 및 프리미엄 열풍 건조 스낵 카탈로그 | HAQ FOOD',
  },
  news: {
    vi: 'Tin Tức Hoạt Động & Xuất Khẩu Quốc Tế | HAQ FOOD',
    en: 'Corporate News & Global Export Updates | HAQ FOOD',
    ko: '기업 소식 및 글로벌 수출 뉴스 | HAQ FOOD',
  },
  contact: {
    vi: 'Kết Nối Doanh Nghiệp & Báo Giá Sỉ B2B / OEM | HAQ FOOD',
    en: 'B2B Partnership, OEM/ODM & Wholesale RFQ | HAQ FOOD',
    ko: 'B2B 제휴, OEM/ODM 수탁 생산 및 도매 견적 문의 | HAQ FOOD',
  },
}

const SEO_DESCRIPTIONS = {
  home: {
    vi: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI — nhà sản xuất và phân phối thực phẩm đóng gói đạt chuẩn ISO 22000 & HACCP. Giới thiệu công ty, năng lực sản xuất, sản phẩm OEM/ODM và báo giá sỉ B2B.',
    en: 'HAQ FOOD HANOI JSC — Certified ISO 22000 & HACCP food manufacturer and distributor in Vietnam. Explore our corporate profile, advanced convective drying capabilities, OEM/ODM solutions, and B2B catalog.',
    ko: 'HAQ 하노이 주식회사 — ISO 22000 및 HACCP 인증 베트남 가공식품 제조 및 유통 전문 기업. 기업 프로필, 첨단 열풍 건조 설비, OEM/ODM 맞춤 수탁 생산 및 B2B 도매 공급 안내.',
  },
  about: {
    vi: 'Tìm hiểu sứ mệnh, tầm nhìn và 5 giá trị văn hóa cốt lõi của HAQ FOOD trong hành trình nâng tầm nông sản Việt ra thị trường quốc tế.',
    en: 'Discover the mission, strategic vision, and 5 core pillars of HAQ FOOD in modernizing Vietnamese agricultural food processing for global export.',
    ko: '베트남 농산물의 가치를 글로벌 시장으로 확장하는 HAQ FOOD의 기업 사명, 미래 비전 및 5대 핵심 가치를 소개합니다.',
  },
  capabilities: {
    vi: 'Hệ thống nhà xưởng hiện đại, dây chuyền sấy giòn đối lưu khép kín và năng lực gia công thực phẩm OEM/ODM theo tiêu chuẩn xuất khẩu.',
    en: 'State-of-the-art manufacturing facility, closed-loop convective drying line, cleanrooms, and OEM/ODM private-label food processing capabilities.',
    ko: '최첨단 제조 공장, 밀폐식 대류 열풍 건조 라인, 클린룸 및 글로벌 수출 기준에 맞춘 식품 OEM/ODM 프라이빗 라벨 수탁 역량.',
  },
  contact: {
    vi: 'Liên hệ phòng kinh doanh B2B HAQ FOOD để nhận bảng giá đại lý toàn quốc, chính sách gia công OEM/ODM hoặc tư vấn xuất khẩu.',
    en: 'Contact the HAQ FOOD B2B Sales Department for nationwide distribution pricing, OEM/ODM private label consultations, or export inquiries.',
    ko: '전국 유통망 공급 단가, OEM/ODM 맞춤 제작 및 해외 수출 관련 상담은 HAQ FOOD B2B 전담 부서로 문의하시기 바랍니다.',
  },
}

function resolveSectionKey(pathname) {
  const p = pathname.toLowerCase().replace(/\/$/, '') || '/'
  if (p.includes('/about') || p.includes('/gioi-thieu') || p.includes('/ve-chung-toi')) return 'about'
  if (p.includes('/history') || p.includes('/lich-su')) return 'history'
  if (p.includes('/capabilities') || p.includes('/nang-luc')) return 'capabilities'
  if (p.includes('/products') || p.includes('/san-pham')) return 'products'
  if (p.includes('/news') || p.includes('/tin-tuc')) return 'news'
  if (p.includes('/contact') || p.includes('/lien-he')) return 'contact'
  return 'home'
}

export default function SeoHead() {
  const { pathname } = useLocation()
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document === 'undefined') return

    // 1. Update <html> lang attribute
    document.documentElement.lang = language

    // 2. Resolve section & update title
    const sectionKey = resolveSectionKey(pathname)
    const titleObj = SEO_TITLES[sectionKey] || SEO_TITLES.home
    document.title = titleObj[language] || titleObj.vi

    // 3. Update meta description
    const descObj = SEO_DESCRIPTIONS[sectionKey] || SEO_DESCRIPTIONS.home
    const metaDesc = descObj[language] || descObj.vi
    let descTag = document.querySelector('meta[name="description"]')
    if (!descTag) {
      descTag = document.createElement('meta')
      descTag.setAttribute('name', 'description')
      document.head.appendChild(descTag)
    }
    descTag.setAttribute('content', metaDesc)

    // 4. Update Canonical URL
    const canonicalHref = `${SITE_ORIGIN}${pathname}`
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalHref)

    // 5. Update hreflang alternate tags (vi, en, ko, x-default)
    const alternates = getAlternateHreflangUrls(pathname, SITE_ORIGIN)
    const hreflangConfigs = [
      { lang: 'vi', href: alternates.vi },
      { lang: 'en', href: alternates.en },
      { lang: 'ko', href: alternates.ko },
      { lang: 'x-default', href: alternates.xDefault },
    ]

    hreflangConfigs.forEach(({ lang, href }) => {
      let tag = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
      if (!tag) {
        tag = document.createElement('link')
        tag.setAttribute('rel', 'alternate')
        tag.setAttribute('hreflang', lang)
        document.head.appendChild(tag)
      }
      tag.setAttribute('href', href)
    })
  }, [pathname, language])

  return null
}
