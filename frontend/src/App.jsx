import React from 'react'
import Home from './pages/Home.jsx'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path.startsWith('/admin')) return <Admin />
  if (path === '/company-profile') return <CompanyProfilePage />
  return <Home />
}
