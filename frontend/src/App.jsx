import React, { useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'

// Dynamic Route Splitting to avoid monolithic bundles and exclude Admin/heavy libraries from landing page
const CompanyProfilePage = lazy(() => import('./pages/CompanyProfilePage.jsx'))
const HistoryPage = lazy(() => import('./pages/HistoryPage.jsx'))
const CapabilitiesPage = lazy(() => import('./pages/CapabilitiesPage.jsx'))
const ProductsPage = lazy(() => import('./pages/ProductsPage.jsx'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage.jsx'))
const NewsPage = lazy(() => import('./pages/NewsPage.jsx'))
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const PolicyPage = lazy(() => import('./pages/PolicyPage.jsx'))
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage.jsx'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

import { initPostHog, recordSessionVisit, trackPageView } from './services/posthog'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import SeoHead from './components/SeoHead'
import ErrorBoundary from './components/ErrorBoundary'

// Scroll to top and track session visit ONLY on genuine page navigations
function RouteSync() {
  const { pathname } = useLocation()
  const { language, setLanguage } = useLanguage()
  const prevPathRef = useRef(pathname)

  // 1. Only scroll to top and track pageview when user actually navigates to a new route
  useEffect(() => {
    trackPageView(pathname)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-HFEZD7WF4E', {
        page_path: pathname,
        page_location: window.location.href,
      })
    }
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      window.scrollTo(0, 0)
      recordSessionVisit()
    }
  }, [pathname])

  // 2. Sync language from URL prefix on direct page load or external URL change
  useEffect(() => {
    if (pathname.startsWith('/en')) {
      if (language !== 'en') setLanguage('en')
    } else if (pathname.startsWith('/ko')) {
      if (language !== 'ko') setLanguage('ko')
    } else if (pathname.startsWith('/zh')) {
      if (language !== 'zh') setLanguage('zh')
    } else if (!pathname.startsWith('/admin')) {
      const saved = localStorage.getItem('haq_language')
      if (!saved && language !== 'vi') {
        setLanguage('vi')
      }
    }
  }, [pathname]) // Intentionally omit 'language' so language switching never causes re-triggering

  return null
}

function AppRoutes() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  const isProductRoute = pathname.includes('/san-pham') || pathname.includes('/products')
  const containerBg = isAdmin ? 'bg-[#F4F8F4]' : isProductRoute ? 'bg-haq-cream' : 'bg-[#FAF9F6]'

  return (
    <>
      <RouteSync />
      <SeoHead />
      <div className={`w-full overflow-x-clip relative min-h-screen ${containerBg}`}>
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6]" />}>
            <Routes>
              {/* ================= VIETNAMESE (Default) ================= */}
              <Route path="/" element={<Home />} />
            <Route path="/gioi-thieu" element={<CompanyProfilePage />} />
            <Route path="/ho-so-cong-ty" element={<Navigate to="/gioi-thieu" replace />} />
            <Route path="/ve-chung-toi" element={<CompanyProfilePage />} />
            <Route path="/ve-chung-toi/gioi-thieu" element={<CompanyProfilePage />} />
            <Route path="/lich-su" element={<HistoryPage />} />
            <Route path="/di-san" element={<Navigate to="/lich-su" replace />} />
            <Route path="/heritage" element={<Navigate to="/lich-su" replace />} />
            <Route path="/ve-chung-toi/lich-su" element={<HistoryPage />} />
            <Route path="/nang-luc" element={<CapabilitiesPage />} />
            <Route path="/san-pham" element={<ProductsPage />} />
            <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
            <Route path="/tuyen-dung" element={<NewsPage defaultTab="tuyen-dung" />} />
            <Route path="/tuyen-dung/:slug" element={<NewsDetailPage />} />
            <Route path="/lien-he" element={<ContactPage />} />

            {/* ================= ENGLISH (B2B International) ================= */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/about" element={<CompanyProfilePage />} />
            <Route path="/en/company-profile" element={<Navigate to="/en/about" replace />} />
            <Route path="/en/history" element={<HistoryPage />} />
            <Route path="/en/capabilities" element={<CapabilitiesPage />} />
            <Route path="/en/products" element={<ProductsPage />} />
            <Route path="/en/products/:slug" element={<ProductDetailPage />} />
            <Route path="/en/news" element={<NewsPage />} />
            <Route path="/en/news/:slug" element={<NewsDetailPage />} />
            <Route path="/en/careers" element={<NewsPage defaultTab="tuyen-dung" />} />
            <Route path="/en/careers/:slug" element={<NewsDetailPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            <Route path="/en/policy" element={<PolicyPage />} />
            <Route path="/en/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/en/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/en/refund-policy" element={<RefundPolicyPage />} />

            {/* English Aliases for backward compatibility */}
            <Route path="/en/gioi-thieu" element={<CompanyProfilePage />} />
            <Route path="/en/gioi-thieu/*" element={<CompanyProfilePage />} />
            <Route path="/en/san-pham" element={<ProductsPage />} />
            <Route path="/en/san-pham/:slug" element={<ProductDetailPage />} />
            <Route path="/en/lien-he" element={<ContactPage />} />

            {/* ================= KOREAN (B2B Korea) ================= */}
            <Route path="/ko" element={<Home />} />
            <Route path="/ko/about" element={<CompanyProfilePage />} />
            <Route path="/ko/company-profile" element={<Navigate to="/ko/about" replace />} />
            <Route path="/ko/history" element={<HistoryPage />} />
            <Route path="/ko/capabilities" element={<CapabilitiesPage />} />
            <Route path="/ko/products" element={<ProductsPage />} />
            <Route path="/ko/products/:slug" element={<ProductDetailPage />} />
            <Route path="/ko/news" element={<NewsPage />} />
            <Route path="/ko/news/:slug" element={<NewsDetailPage />} />
            <Route path="/ko/careers" element={<NewsPage defaultTab="tuyen-dung" />} />
            <Route path="/ko/careers/:slug" element={<NewsDetailPage />} />
            <Route path="/ko/contact" element={<ContactPage />} />
            <Route path="/ko/policy" element={<PolicyPage />} />
            <Route path="/ko/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/ko/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/ko/refund-policy" element={<RefundPolicyPage />} />

            {/* Korean Aliases for backward compatibility */}
            <Route path="/ko/gioi-thieu" element={<CompanyProfilePage />} />
            <Route path="/ko/gioi-thieu/*" element={<CompanyProfilePage />} />
            <Route path="/ko/san-pham" element={<ProductsPage />} />
            <Route path="/ko/san-pham/:slug" element={<ProductDetailPage />} />
            <Route path="/ko/lien-he" element={<ContactPage />} />

            {/* ================= CHINESE (B2B China & Global Chinese) ================= */}
            <Route path="/zh" element={<Home />} />
            <Route path="/zh/about" element={<CompanyProfilePage />} />
            <Route path="/zh/company-profile" element={<Navigate to="/zh/about" replace />} />
            <Route path="/zh/history" element={<HistoryPage />} />
            <Route path="/zh/capabilities" element={<CapabilitiesPage />} />
            <Route path="/zh/products" element={<ProductsPage />} />
            <Route path="/zh/products/:slug" element={<ProductDetailPage />} />
            <Route path="/zh/news" element={<NewsPage />} />
            <Route path="/zh/news/:slug" element={<NewsDetailPage />} />
            <Route path="/zh/careers" element={<NewsPage defaultTab="tuyen-dung" />} />
            <Route path="/zh/careers/:slug" element={<NewsDetailPage />} />
            <Route path="/zh/contact" element={<ContactPage />} />
            <Route path="/zh/policy" element={<PolicyPage />} />
            <Route path="/zh/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/zh/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/zh/refund-policy" element={<RefundPolicyPage />} />

            {/* Chinese Aliases for backward compatibility */}
            <Route path="/zh/gioi-thieu" element={<CompanyProfilePage />} />
            <Route path="/zh/gioi-thieu/*" element={<CompanyProfilePage />} />
            <Route path="/zh/san-pham" element={<ProductsPage />} />
            <Route path="/zh/san-pham/:slug" element={<ProductDetailPage />} />
            <Route path="/zh/lien-he" element={<ContactPage />} />

          {/* Legal & Policy Pages (Vietnamese) */}
          <Route path="/chinh-sach" element={<PolicyPage />} />
          <Route path="/chinh-sach-doi-tra-hoan-tien" element={<RefundPolicyPage />} />
          <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
          <Route path="/dieu-khoan-su-dung" element={<TermsOfServicePage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/company-profile" element={<Navigate to="/gioi-thieu" replace />} />

          {/* User convenience aliases (without hyphens) */}
          <Route path="/sanpham" element={<Navigate to="/san-pham" replace />} />
          <Route path="/gioithieu" element={<Navigate to="/gioi-thieu" replace />} />
          <Route path="/lienhe" element={<Navigate to="/lien-he" replace />} />
          <Route path="/tintuc" element={<Navigate to="/tin-tuc" replace />} />
          <Route path="/nangluc" element={<Navigate to="/nang-luc" replace />} />

          {/* Legacy & Direct English path redirects to canonical Vietnamese URLs */}
          <Route path="/contact" element={<Navigate to="/lien-he" replace />} />
          <Route path="/privacy-policy" element={<Navigate to="/chinh-sach-bao-mat" replace />} />
          <Route path="/refund-policy" element={<Navigate to="/chinh-sach-doi-tra-hoan-tien" replace />} />
          <Route path="/terms-of-service" element={<Navigate to="/dieu-khoan-su-dung" replace />} />
          <Route path="/policy" element={<Navigate to="/chinh-sach" replace />} />
          <Route path="/about" element={<Navigate to="/gioi-thieu" replace />} />
          <Route path="/products" element={<Navigate to="/san-pham" replace />} />
          <Route path="/news" element={<Navigate to="/tin-tuc" replace />} />
          <Route path="/careers" element={<Navigate to="/tuyen-dung" replace />} />
          <Route path="/capabilities" element={<Navigate to="/nang-luc" replace />} />
          <Route path="/history" element={<Navigate to="/lich-su" replace />} />

          <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}

export default function App() {
  useEffect(() => {
    // Non-blocking deferred PostHog initialization
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = window.requestIdleCallback(() => initPostHog(), { timeout: 2000 })
        return () => window.cancelIdleCallback(handle)
      } else {
        const timer = setTimeout(() => initPostHog(), 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  return (
    <LanguageProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LanguageProvider>
  )
}
