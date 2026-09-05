import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import CapabilitiesPage from './pages/CapabilitiesPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import HeritagePage from './pages/HeritagePage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PolicyPage from './pages/PolicyPage.jsx'
import RefundPolicyPage from './pages/RefundPolicyPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import TermsOfServicePage from './pages/TermsOfServicePage.jsx'
import Admin from './pages/Admin.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

import { initPostHog, recordSessionVisit } from './services/posthog'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import SeoHead from './components/SeoHead'

// Scroll to top and track session visit ONLY on genuine page navigations
function RouteSync() {
  const { pathname } = useLocation()
  const { language, setLanguage } = useLanguage()
  const prevPathRef = useRef(pathname)

  // 1. Only scroll to top when user actually navigates to a new route
  useEffect(() => {
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

  return (
    <>
      <RouteSync />
      <SeoHead />
      <div className={`w-full overflow-x-hidden relative min-h-screen ${isAdmin ? 'bg-[#F4F8F4]' : 'bg-[#0C1E15]'}`}>
        <Routes>
          {/* ================= VIETNAMESE (Default) ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/ve-chung-toi" element={<CompanyProfilePage />} />
          <Route path="/ve-chung-toi/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/lich-su" element={<HistoryPage />} />
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
          <Route path="/en/lien-he" element={<ContactPage />} />

          {/* ================= KOREAN (B2B Korea) ================= */}
          <Route path="/ko" element={<Home />} />
          <Route path="/ko/about" element={<CompanyProfilePage />} />
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
          <Route path="/ko/lien-he" element={<ContactPage />} />

          {/* Legal & Policy Pages (Vietnamese) */}
          <Route path="/chinh-sach" element={<PolicyPage />} />
          <Route path="/chinh-sach-doi-tra-hoan-tien" element={<RefundPolicyPage />} />
          <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
          <Route path="/dieu-khoan-su-dung" element={<TermsOfServicePage />} />
          
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/company-profile" element={<Navigate to="/gioi-thieu" replace />} />

          {/* User convenience aliases (without hyphens) */}
          <Route path="/sanpham" element={<Navigate to="/san-pham" replace />} />
          <Route path="/gioithieu" element={<Navigate to="/gioi-thieu" replace />} />
          <Route path="/lienhe" element={<Navigate to="/lien-he" replace />} />
          <Route path="/tintuc" element={<Navigate to="/tin-tuc" replace />} />
          <Route path="/nangluc" element={<Navigate to="/nang-luc" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  useEffect(() => {
    initPostHog()
  }, [])

  return (
    <LanguageProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LanguageProvider>
  )
}
