import React, { useEffect } from 'react'
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
import { FloatingLanguageSwitcher } from './components/LanguageSwitcher'

// Scroll to top, track session visit, and sync language from URL prefix
function RouteSync() {
  const { pathname } = useLocation()
  const { setLanguage } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
    recordSessionVisit()

    if (pathname.startsWith('/en')) {
      setLanguage('en')
    } else if (pathname.startsWith('/ko')) {
      setLanguage('ko')
    }
  }, [pathname, setLanguage])

  return null
}

function AppRoutes() {
  return (
    <>
      <RouteSync />
      <div className="w-full overflow-x-hidden relative">
        <FloatingLanguageSwitcher />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* VỀ CHÚNG TÔI Subpages */}
          <Route path="/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/ve-chung-toi" element={<CompanyProfilePage />} />
          <Route path="/ve-chung-toi/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/lich-su" element={<HistoryPage />} />
          <Route path="/ve-chung-toi/lich-su" element={<HistoryPage />} />

          {/* Multilingual Prefix Routes */}
          <Route path="/en" element={<Home />} />
          <Route path="/en/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/en/gioi-thieu/*" element={<CompanyProfilePage />} />
          <Route path="/en/san-pham" element={<ProductsPage />} />
          <Route path="/en/lien-he" element={<ContactPage />} />

          <Route path="/ko" element={<Home />} />
          <Route path="/ko/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/ko/gioi-thieu/*" element={<CompanyProfilePage />} />
          <Route path="/ko/san-pham" element={<ProductsPage />} />
          <Route path="/ko/lien-he" element={<ContactPage />} />

          {/* Other Core Pages */}
          <Route path="/nang-luc" element={<CapabilitiesPage />} />
          <Route path="/san-pham" element={<ProductsPage />} />
          <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          
          {/* Legal & Policy Pages */}
          <Route path="/chinh-sach" element={<PolicyPage />} />
          <Route path="/chinh-sach-doi-tra-hoan-tien" element={<RefundPolicyPage />} />
          <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
          <Route path="/dieu-khoan-su-dung" element={<TermsOfServicePage />} />
          
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/company-profile" element={<Navigate to="/gioi-thieu" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </Router>
  )
}

