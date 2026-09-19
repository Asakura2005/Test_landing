import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Package, PhoneCall } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { getHomeUrl, getProductsPageUrl, getContactUrl } from '../utils/routeI18n'

const I18N = {
  vi: {
    code: '404',
    title: 'Không tìm thấy trang',
    desc: 'Đường dẫn bạn đang truy cập không tồn tại, đã bị gỡ bỏ hoặc đã thay đổi địa chỉ.',
    backHome: 'Về trang chủ',
    exploreProducts: 'Xem danh mục sản phẩm',
    contactSupport: 'Liên hệ hỗ trợ',
    pageTitle: '404 - Không tìm thấy trang | HAQ FOOD',
  },
  en: {
    code: '404',
    title: 'Page Not Found',
    desc: 'The link you are looking for might have been removed, renamed, or is temporarily unavailable.',
    backHome: 'Back to Home',
    exploreProducts: 'Explore Products',
    contactSupport: 'Contact Support',
    pageTitle: '404 - Page Not Found | HAQ FOOD',
  },
  ko: {
    code: '404',
    title: '페이지를 찾을 수 없습니다',
    desc: '요청하신 페이지가 삭제되었거나 이름이 변경되어 현재 사용할 수 없습니다.',
    backHome: '홈으로 돌아가기',
    exploreProducts: '제품 목록 보기',
    contactSupport: '고객 지원 문의',
    pageTitle: '404 - 페이지를 찾을 수 없습니다 | HAQ FOOD',
  },
  zh: {
    code: '404',
    title: '页面未找到',
    desc: '您访问的页面可能已被删除、更名或暂时不可用。',
    backHome: '返回首页',
    exploreProducts: '浏览产品目录',
    contactSupport: '联系客户支持',
    pageTitle: '404 - 页面未找到 | HAQ FOOD',
  },
}

export default function NotFoundPage() {
  const { language } = useLanguage()
  const langKey = I18N[language] ? language : 'vi'
  const text = I18N[langKey]

  useEffect(() => {
    // 1. Set page title
    document.title = text.pageTitle

    // 2. CRITICAL FOR GOOGLE SEARCH CONSOLE:
    // Set robots to noindex, nofollow to prevent GSC "Soft 404" errors
    let robotsMeta = document.querySelector('meta[name="robots"]')
    const originalRobots = robotsMeta ? robotsMeta.getAttribute('content') : 'index, follow, max-image-preview:large'

    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow')

    // Remove any canonical tag on 404 pages as recommended by Google Search Central
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    const originalCanonical = canonicalLink ? canonicalLink.getAttribute('href') : null
    if (canonicalLink) canonicalLink.remove()

    return () => {
      // Restore normal indexing on navigation away
      if (robotsMeta) {
        robotsMeta.setAttribute('content', originalRobots || 'index, follow, max-image-preview:large')
      }
      if (originalCanonical) {
        let restored = document.querySelector('link[rel="canonical"]')
        if (!restored) {
          restored = document.createElement('link')
          restored.setAttribute('rel', 'canonical')
          restored.setAttribute('href', originalCanonical)
          document.head.appendChild(restored)
        }
      }
    }
  }, [text])

  return (
    <div className="min-h-screen bg-haq-cream text-haq-text-primary font-sans flex flex-col selection:bg-haq-green selection:text-white">
      <StickyNav />

      <main className="flex-1 flex items-center justify-center pt-28 pb-20 px-6">
        <div className="max-w-xl w-full text-center bg-white rounded-3xl border border-haq-border p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Large Stylized 404 Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 font-mono text-xs font-bold uppercase tracking-widest border border-red-200 mb-6">
            Error {text.code}
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-haq-text-primary tracking-tight mb-4">
            {text.title}
          </h1>

          <p className="text-base sm:text-lg text-haq-text-secondary mb-8 leading-relaxed max-w-md mx-auto">
            {text.desc}
          </p>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={getHomeUrl(language)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#16A34A] hover:bg-[#13863d] text-white font-heading font-bold rounded-full transition-all shadow-md hover:shadow-lg active:scale-98"
            >
              <Home className="w-4 h-4" />
              <span>{text.backHome}</span>
            </Link>

            <Link
              to={getProductsPageUrl(language)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-haq-cream hover:bg-[#EFE8D8] text-haq-text-primary border border-haq-border font-heading font-semibold rounded-full transition-all active:scale-98"
            >
              <Package className="w-4 h-4 text-[#16A34A]" />
              <span>{text.exploreProducts}</span>
            </Link>

            <Link
              to={getContactUrl(language)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-haq-text-secondary hover:text-haq-text-primary border border-haq-border font-heading font-medium rounded-full transition-all active:scale-98"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{text.contactSupport}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
