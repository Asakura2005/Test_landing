import React from 'react'
import Home from './pages/Home.jsx'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return path === '/company-profile' ? <CompanyProfilePage /> : <Home />
}
