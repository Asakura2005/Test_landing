import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, ArrowRight } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'

const NAV_ITEMS = [
  { label: 'TRANG CHỦ', path: '/' },
  { label: 'GIỚI THIỆU', path: '/gioi-thieu' },
  { label: 'SẢN PHẨM', path: '/san-pham' },
  { label: 'NĂNG LỰC', path: '/gioi-thieu#nang-luc' },
  { label: 'TIN TỨC', path: '/tin-tuc' },
  { label: 'LIÊN HỆ', path: '/lien-he' },
]

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [lang, setLang] = useState('VN')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchOpen(false)
      navigate(`/san-pham?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const isCurrentActive = (item) => {
    if (item.path === '/') {
      return location.pathname === '/' && !location.hash
    }
    if (item.path.includes('#')) {
      const [path, hash] = item.path.split('#')
      return location.pathname === path && location.hash === `#${hash}`
    }
    return location.pathname === item.path
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'h-[68px] bg-white/95 backdrop-blur-md shadow-xs border-b border-black/5'
            : 'h-[74px] bg-white/90 backdrop-blur-xs border-b border-black/5'
        }`}
      >
        <div className="mx-auto max-w-site h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-6 xl:gap-10">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-md p-1 bg-white border border-black/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <img
                  src={logoImg}
                  alt="HAQ FOOD Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-base sm:text-lg tracking-tight text-haq-ink leading-none">
                  HAQ <span className="text-haq-red">FOOD</span>
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest text-haq-ink/50 uppercase mt-0.5">
                  EST. 2021
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => {
                const active = isCurrentActive(item)
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`relative px-3 py-1.5 font-heading text-[13px] tracking-wider uppercase font-bold transition-colors ${
                      active
                        ? 'text-haq-red'
                        : 'text-haq-ink/75 hover:text-haq-red'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-haq-red rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right: Search, Language & Contact CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-haq-ink/60 hover:text-haq-ink transition-colors rounded-full hover:bg-black/5"
              title="Tìm kiếm sản phẩm"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center text-xs font-mono font-bold text-haq-ink/60 bg-haq-bone px-2.5 py-1 rounded-full border border-black/5">
              <button
                onClick={() => setLang('VN')}
                className={`transition-colors ${lang === 'VN' ? 'text-haq-red font-black' : 'hover:text-haq-ink'}`}
              >
                VN
              </button>
              <span className="mx-1 text-black/20">|</span>
              <button
                onClick={() => setLang('EN')}
                className={`transition-colors ${lang === 'EN' ? 'text-haq-red font-black' : 'hover:text-haq-ink'}`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Link
              to="/lien-he"
              className="group inline-flex items-center gap-2 bg-haq-red hover:bg-haq-ink text-white text-xs font-heading font-extrabold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs"
            >
              <span>LIÊN HỆ</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-haq-ink/70 hover:text-haq-red"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-haq-ink hover:text-haq-red"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-[68px] right-0 bottom-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-black/5 overflow-y-auto">
            <div className="space-y-1">
              <div className="pb-3 mb-3 border-b border-black/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-haq-ink/50 uppercase">
                  DANH MỤC MENU
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                  <button
                    onClick={() => setLang('VN')}
                    className={lang === 'VN' ? 'text-haq-red font-black' : 'text-haq-ink/50'}
                  >
                    VN
                  </button>
                  <span className="text-black/20">/</span>
                  <button
                    onClick={() => setLang('EN')}
                    className={lang === 'EN' ? 'text-haq-red font-black' : 'text-haq-ink/50'}
                  >
                    EN
                  </button>
                </div>
              </div>

              {NAV_ITEMS.map((item) => {
                const active = isCurrentActive(item)
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3 px-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wide transition-colors ${
                      active
                        ? 'bg-haq-red/10 text-haq-red font-black'
                        : 'text-haq-ink/80 hover:bg-haq-bone hover:text-haq-red'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                )
              })}
            </div>

            <div className="pt-6 border-t border-black/10 space-y-4">
              <Link
                to="/lien-he"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-haq-red text-white py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:bg-haq-ink transition-colors shadow-xs"
              >
                <span>LIÊN HỆ HỢP TÁC</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-haq-ink/60 space-y-1">
                <p>Hotline: <strong className="text-haq-ink font-mono">024 23 23 56 56</strong></p>
                <p>Email: <strong className="text-haq-ink">info@haq.com.vn</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-black/10 z-10">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="font-heading font-bold text-base text-haq-ink">
                Tìm Kiếm Sản Phẩm & Tin Tức
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-md text-haq-ink/50 hover:text-haq-ink hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-haq-ink/40" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Nhập tên sản phẩm (bánh tráng, bánh đậu xanh, bắp rang bơ...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-28 py-3.5 bg-haq-bone rounded-xl border border-black/10 text-sm font-medium text-haq-ink focus:outline-none focus:border-haq-red focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-haq-red text-white text-xs font-heading font-bold px-4 py-2 rounded-lg hover:bg-haq-ink transition-colors"
                >
                  Tìm Kiếm
                </button>
              </div>
            </form>
            <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 text-xs text-haq-ink/60">
              <span>Gợi ý:</span>
              {['Bánh tráng sấy giòn', 'Bánh tráng trộn sợi', 'Bánh đậu xanh', 'Bánh hạnh nhân'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag)
                    setSearchOpen(false)
                    navigate(`/san-pham?q=${encodeURIComponent(tag)}`)
                  }}
                  className="bg-black/5 hover:bg-haq-red/10 hover:text-haq-red px-2.5 py-1 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
