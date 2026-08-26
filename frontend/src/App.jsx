import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import CapabilitiesPage from './pages/CapabilitiesPage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import HeritagePage from './pages/HeritagePage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import PolicyPage from './pages/PolicyPage.jsx'
import Admin from './pages/Admin.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* VỀ CHÚNG TÔI Subpages */}
          <Route path="/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/ve-chung-toi" element={<CompanyProfilePage />} />
          <Route path="/ve-chung-toi/gioi-thieu" element={<CompanyProfilePage />} />
          <Route path="/lich-su" element={<HistoryPage />} />
          <Route path="/ve-chung-toi/lich-su" element={<HistoryPage />} />

          {/* Other Core Pages */}
          <Route path="/nang-luc" element={<CapabilitiesPage />} />
          <Route path="/san-pham" element={<ProductsPage />} />
          <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/chinh-sach" element={<PolicyPage />} />
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/company-profile" element={<Navigate to="/gioi-thieu" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}
