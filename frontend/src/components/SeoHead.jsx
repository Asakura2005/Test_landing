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
    zh: '河内 HAQ 股份公司 — 越南优质食品制造、出口与 B2B 批发定制 (HAQ FOOD)',
  },
  about: {
    vi: 'Giới Thiệu Doanh Nghiệp & Tầm Nhìn Chiến Lược | HAQ FOOD',
    en: 'Company Profile & Strategic Vision | HAQ FOOD Hanoi JSC',
    ko: '기업 소개 및 전략적 비전 | HAQ 하노이 주식회사',
    zh: '企业简介与战略愿景 | HAQ FOOD 河内股份公司',
  },
  history: {
    vi: 'Lịch Sử Phát Triển & Dấu Mốc 2021 — 2026 | HAQ FOOD',
    en: 'Development History & Key Milestones 2021 — 2026 | HAQ FOOD',
    ko: '연혁 및 주요 성장 성과 2021 — 2026 | HAQ FOOD',
    zh: '发展历程与关键里程碑 2021 — 2026 | HAQ FOOD',
  },
  capabilities: {
    vi: 'Năng Lực Sản Xuất & Tiêu Chuẩn ISO/HACCP | HAQ FOOD',
    en: 'Manufacturing Capabilities & Cleanroom Standards (ISO/HACCP) | HAQ FOOD',
    ko: '제조 역량 및 ISO/HACCP 클린룸 생산 설비 | HAQ FOOD',
    zh: '制造产能与 ISO/HACCP 洁净车间生产标准 | HAQ FOOD',
  },
  products: {
    vi: 'Danh Mục Sản Phẩm & Nông Sản Sấy Sạch Cao Cấp | HAQ FOOD',
    en: 'Product Catalog & Premium Convective Dried Foods | HAQ FOOD',
    ko: '제품 소개 및 프리미엄 열풍 건조 스낵 카탈로그 | HAQ FOOD',
    zh: '产品目录与热风干燥休闲食品系列 | HAQ FOOD',
  },
  news: {
    vi: 'Tin Tức Hoạt Động & Xuất Khẩu Quốc Tế | HAQ FOOD',
    en: 'Corporate News & Global Export Updates | HAQ FOOD',
    ko: '기업 소식 및 글로벌 수출 뉴스 | HAQ FOOD',
    zh: '企业动态与全球出口资讯 | HAQ FOOD',
  },
  contact: {
    vi: 'Kết Nối Doanh Nghiệp & Báo Giá Sỉ B2B / OEM | HAQ FOOD',
    en: 'B2B Partnership, OEM/ODM & Wholesale RFQ | HAQ FOOD',
    ko: 'B2B 제휴, OEM/ODM 수탁 생산 및 도매 견적 문의 | HAQ FOOD',
    zh: '商务合作、OEM/ODM 代工与批发询价 | HAQ FOOD',
  },
  careers: {
    vi: 'Cơ Hội Nghề Nghiệp & Tuyển Dụng Nhân Sự | HAQ FOOD',
    en: 'Careers & Job Opportunities | HAQ FOOD Hanoi JSC',
    ko: '채용 정보 및 인재 영입 | HAQ FOOD',
    zh: '人才招聘与职业发展机会 | HAQ FOOD',
  },
  policy: {
    vi: 'Chính Sách Chất Lượng & Công Bố Sản Phẩm | HAQ FOOD',
    en: 'Quality Policies & Product Declarations | HAQ FOOD',
    ko: '품질 정책 및 제품 정보 공시 | HAQ FOOD',
    zh: '质量政策与产品公开声明 | HAQ FOOD',
  },
  privacy: {
    vi: 'Chính Sách Bảo Mật Thông Tin | HAQ FOOD',
    en: 'Privacy Policy | HAQ FOOD Hanoi JSC',
    ko: '개인정보 처리방침 | HAQ FOOD',
    zh: '隐私政策声明 | HAQ FOOD',
  },
  terms: {
    vi: 'Điều Khoản Sử Dụng Dịch Vụ & Website | HAQ FOOD',
    en: 'Terms of Service | HAQ FOOD Hanoi JSC',
    ko: '이용 약관 | HAQ FOOD',
    zh: '网站使用条款 | HAQ FOOD',
  },
  refund: {
    vi: 'Chính Sách Đổi Trả & Hoàn Tiền B2B | HAQ FOOD',
    en: 'Return & Refund Policy | HAQ FOOD Hanoi JSC',
    ko: '교환 및 환불 정책 | HAQ FOOD',
    zh: '退换货与退款政策 | HAQ FOOD',
  },
}

const SEO_DESCRIPTIONS = {
  home: {
    vi: 'HAQ FOOD — Nhà sản xuất & gia công thực phẩm đóng gói chuẩn ISO 22000, HACCP. Cung cấp sỉ B2B và OEM/ODM uy tín, chất lượng toàn quốc.',
    en: 'HAQ FOOD HANOI JSC — Certified ISO 22000 & HACCP food manufacturer and distributor in Vietnam. Explore our corporate profile, advanced convective drying capabilities, OEM/ODM solutions, and B2B catalog.',
    ko: 'HAQ 하노이 주식회사 — ISO 22000 및 HACCP 인증 베트남 가공식품 제조 및 유통 전문 기업. 기업 프로필, 첨단 열풍 건조 설비, OEM/ODM 맞춤 수탁 생산 및 B2B 도매 공급 안내.',
    zh: '河内 HAQ 股份公司 — 荣获 ISO 22000 与 HACCP 认证的越南包装食品制造与分销商。探索企业概况、先进热风干燥产能、OEM/ODM 定制解决方案及 B2B 批发目录。',
  },
  about: {
    vi: 'Tìm hiểu sứ mệnh, tầm nhìn và 5 giá trị văn hóa cốt lõi của HAQ FOOD trong hành trình nâng tầm nông sản Việt ra thị trường quốc tế.',
    en: 'Discover the mission, strategic vision, and 5 core pillars of HAQ FOOD in modernizing Vietnamese agricultural food processing for global export.',
    ko: '베트남 농산물의 가치를 글로벌 시장으로 확장하는 HAQ FOOD의 기업 사명, 미래 비전 및 5대 핵심 가치를 소개합니다.',
    zh: '了解 HAQ FOOD 的企业使命、战略愿景与五大核心价值观，携手将越南优质农产品推向国际市场。',
  },
  capabilities: {
    vi: 'Hệ thống nhà xưởng hiện đại, dây chuyền sấy giòn khép kín và năng lực gia công thực phẩm OEM/ODM theo tiêu chuẩn xuất khẩu.',
    en: 'State-of-the-art manufacturing facility, closed-loop clean drying line, cleanrooms, and OEM/ODM private-label food processing capabilities.',
    ko: '최첨단 제조 공장, 밀폐식 청정 건조 라인, 클린룸 및 글로벌 수출 기준에 맞춘 식품 OEM/ODM 프라이빗 라벨 수탁 역량.',
    zh: '现代化生产园区、全封闭洁净干燥生产线、ISO 级洁净车间及符合国际出口标准的食品 OEM/ODM 代工定制能力。',
  },
  contact: {
    vi: 'Liên hệ phòng kinh doanh B2B HAQ FOOD để nhận bảng giá đại lý toàn quốc, chính sách gia công OEM/ODM hoặc tư vấn xuất khẩu.',
    en: 'Contact the HAQ FOOD B2B Sales Department for nationwide distribution pricing, OEM/ODM private label consultations, or export inquiries.',
    ko: '전국 유통망 공급 단가, OEM/ODM 맞춤 제작 및 해외 수출 관련 상담은 HAQ FOOD B2B 전담 부서로 문의하시기 바랍니다.',
    zh: '联系 HAQ FOOD B2B 商务部，获取全国经销代理批发报价、OEM/ODM 自有品牌代工咨询及进出口业务对接。',
  },
  careers: {
    vi: 'Gia nhập đội ngũ HAQ FOOD — môi trường làm việc năng động, đãi ngộ cạnh tranh trong ngành sản xuất thực phẩm và xuất khẩu nông sản sạch.',
    en: 'Join HAQ FOOD Hanoi JSC — dynamic work environment and competitive compensation in food manufacturing and agricultural export.',
    ko: 'HAQ FOOD와 함께 성장할 인재를 모집합니다. 식품 가공 및 농산물 수출 분야의 역동적인 근무 환경과 복지 혜택.',
    zh: '加入 HAQ FOOD 河内股份公司 — 充满活力的工作环境，在食品制造与优质农产品出口领域提供极具竞争力的福利待遇。',
  },
  policy: {
    vi: 'Thông tin công bố chất lượng sản phẩm, hồ sơ tự công bố và tiêu chuẩn an toàn thực phẩm ISO 22000 & HACCP của HAQ FOOD.',
    en: 'Product quality declarations, self-declaration dossiers, and ISO 22000 & HACCP food safety standards of HAQ FOOD.',
    ko: 'HAQ FOOD의 제품 품질 공시, 자체 신고 서류 및 ISO 22000 & HACCP 식품 안전 기준 안내.',
    zh: 'HAQ FOOD 产品质量声明、自我公开备案文件及 ISO 22000 与 HACCP 食品安全标准。',
  },
  privacy: {
    vi: 'Chính sách bảo mật thông tin khách hàng, đối tác và cam kết bảo vệ dữ liệu doanh nghiệp của CÔNG TY CỔ PHẦN HAQ HÀ NỘI.',
    en: 'Privacy policy and data protection commitments for clients and partners of HAQ FOOD Hanoi JSC.',
    ko: 'HAQ 하노이 주식회사의 고객 및 파트너 개인정보 보호 정책과 데이터 보안 서약.',
    zh: '河内 HAQ 股份公司客户及商业伙伴隐私保护政策与数据安全承诺。',
  },
  terms: {
    vi: 'Điều khoản sử dụng website, quyền và nghĩa vụ của đối tác B2B khi giao dịch cùng CÔNG TY CỔ PHẦN HAQ HÀ NỘI.',
    en: 'Terms and conditions governing the use of haq.com.vn and B2B partner commercial transactions.',
    ko: 'haq.com.vn 웹사이트 이용 약관 및 B2B 거래 파트너의 권리와 의무 안내.',
    zh: 'haq.com.vn 网站使用条款及 B2B 合作客户商业往来权责说明。',
  },
  refund: {
    vi: 'Quy định đổi trả hàng hóa, hoàn tiền và bảo hành sản phẩm thực phẩm dành cho đại lý và nhà phân phối của HAQ FOOD.',
    en: 'Return, refund, and product warranty terms for authorized distributors and B2B partners of HAQ FOOD.',
    ko: 'HAQ FOOD 공인 대리점 및 유통 파트너를 위한 반품, 환불 및 품질 보증 규정.',
    zh: '面向 HAQ FOOD 授权经销商及分销合作伙伴的退换货、退款及产品质保规定。',
  },
}

function resolveSectionKey(pathname) {
  const p = pathname.toLowerCase().replace(/\/$/, '') || '/'
  if (p.includes('/about') || p.includes('/gioi-thieu') || p.includes('/ve-chung-toi')) return 'about'
  if (p.includes('/history') || p.includes('/lich-su')) return 'history'
  if (p.includes('/capabilities') || p.includes('/nang-luc')) return 'capabilities'
  if (p.includes('/products') || p.includes('/san-pham')) return 'products'
  if (p.includes('/careers') || p.includes('/tuyen-dung')) return 'careers'
  if (p.includes('/news') || p.includes('/tin-tuc')) return 'news'
  if (p.includes('/contact') || p.includes('/lien-he')) return 'contact'
  if (p.includes('/privacy-policy') || p.includes('/chinh-sach-bao-mat')) return 'privacy'
  if (p.includes('/terms-of-service') || p.includes('/dieu-khoan-su-dung')) return 'terms'
  if (p.includes('/refund-policy') || p.includes('/chinh-sach-doi-tra')) return 'refund'
  if (p.includes('/policy') || p.includes('/chinh-sach')) return 'policy'
  return 'home'
}

function setMetaTag(attr, key, content) {
  if (!content || typeof document === 'undefined') return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function SeoHead() {
  const { pathname } = useLocation()
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document === 'undefined') return

    const updateSeo = () => {
      const activePath = typeof window !== 'undefined' ? window.location.pathname : pathname
      const rawClean = (activePath || '/').replace(/\/+$/, '')
      const cleanPath = rawClean.length === 0 ? '/' : rawClean

      // 1. Update <html> lang attribute
      document.documentElement.lang = language === 'zh' ? 'zh-Hans' : language

      // 2. Robots tag handling: Exclude /admin from indexing & cleanly remove canonical/hreflang tags
      if (cleanPath.startsWith('/admin')) {
        setMetaTag('name', 'robots', 'noindex, nofollow')
        const existingCanonical = document.querySelector('link[rel="canonical"]')
        if (existingCanonical) existingCanonical.remove()
        const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]')
        existingAlternates.forEach(tag => tag.remove())
        return
      }

      setMetaTag('name', 'robots', 'index, follow')

      // 3. Determine the language represented by this URL path
      let routeLang = 'vi'
      if (cleanPath.startsWith('/en/') || cleanPath === '/en') routeLang = 'en'
      else if (cleanPath.startsWith('/ko/') || cleanPath === '/ko') routeLang = 'ko'
      else if (cleanPath.startsWith('/zh/') || cleanPath === '/zh') routeLang = 'zh'

      // 4. Resolve section & update title & OpenGraph (skip detail pages which manage their own dynamic SEO & Schema)
      const isDetailPage = /^\/(en|ko|zh)?\/?(san-pham|products|tin-tuc|news|tuyen-dung|careers)\/[^/]+$/i.test(cleanPath)
      if (!isDetailPage) {
        const sectionKey = resolveSectionKey(cleanPath)
        const titleObj = SEO_TITLES[sectionKey] || SEO_TITLES.home
        const pageTitle = titleObj[language] || titleObj.vi
        document.title = pageTitle

        // Update meta description & OG / Twitter
        const descObj = SEO_DESCRIPTIONS[sectionKey] || SEO_DESCRIPTIONS.home
        const metaDesc = descObj[language] || descObj.vi
        const pageUrl = `${SITE_ORIGIN}${cleanPath}`
        const fallbackImage = 'https://haq.com.vn/favicon.jpg'

        setMetaTag('name', 'description', metaDesc)
        setMetaTag('property', 'og:title', pageTitle)
        setMetaTag('property', 'og:description', metaDesc)
        setMetaTag('property', 'og:type', 'website')
        setMetaTag('property', 'og:url', pageUrl)
        setMetaTag('property', 'og:image', fallbackImage)

        setMetaTag('name', 'twitter:card', 'summary_large_image')
        setMetaTag('name', 'twitter:title', pageTitle)
        setMetaTag('name', 'twitter:description', metaDesc)
        setMetaTag('name', 'twitter:image', fallbackImage)
      }

      // 5. Update Canonical URL (Points to the official canonical path for the current route language, resolving aliases)
      const canonicalPath = getEquivalentRoute(cleanPath, routeLang)
      const canonicalHref = `${SITE_ORIGIN}${canonicalPath === '/' ? '/' : canonicalPath}`
      let canonicalLink = document.querySelector('link[rel="canonical"]')
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalLink)
      }
      canonicalLink.setAttribute('href', canonicalHref)

      // 6. Update hreflang alternate tags (vi, en, ko, zh-Hans, x-default)
      const alternates = getAlternateHreflangUrls(cleanPath, SITE_ORIGIN)
      const hreflangConfigs = [
        { lang: 'vi', href: alternates.vi },
        { lang: 'en', href: alternates.en },
        { lang: 'ko', href: alternates.ko },
        { lang: 'zh-Hans', href: alternates.zh || alternates.zhHans },
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
    }

    updateSeo()

    window.addEventListener('haq_lang_changed', updateSeo)
    return () => window.removeEventListener('haq_lang_changed', updateSeo)
  }, [pathname, language])

  return null
}
