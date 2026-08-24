import React from 'react'
import Home from './pages/Home.jsx'
import CompanyProfilePage from './pages/CompanyProfilePage.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  let content = <Home />
  if (path.startsWith('/admin')) content = <Admin />
  if (path === '/company-profile') content = <CompanyProfilePage />

  return (
    <div className="w-full overflow-x-hidden">
      {content}
    </div>
  )
}
