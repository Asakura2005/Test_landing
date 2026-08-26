import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'

const NAV_ITEMS = [
  { label: 'TRANG CHỦ', path: '/' },
  { label: 'GIỚI THIỆU', path: '/#gioi-thieu' },
  { label: 'SẢN PHẨM', path: '/#san-pham' },
  { label: 'NĂNG LỰC', path: '/#nang-luc' },
  { label: 'THỊ TRƯỜNG', path: '/#thi-truong' },
  { label: 'TIN TỨC', path: '/#tin-tuc' },
  { label: 'LIÊN HỆ', path: '/lien-he' },
]

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lang, setLang] = useState('VN')
  const location = useLocation()

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

  const isCurrentActive = (item) => {
    if (item.path === '/') {
      return location.pathname === '/' && !location.hash
    }
    if (item.path.includes('#')) {
      const [path, hash] = item.path.split('#')
      const currentPath = location.pathname
      return (currentPath === path || (path === '' && currentPath === '/')) && location.hash === `#${hash}`
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
          <div className="flex items-center gap-6 xl:gap-8">
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
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isCurrentActive(item)
                return (
                  <a
                    key={item.label}
                    href={item.path}
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
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Right: Language & Partner CTA */}
          <div className="hidden xl:flex items-center gap-4">
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

            {/* CTA Button: ĐỐI TÁC */}
            <Link
              to="/lien-he"
              className="group inline-flex items-center gap-2 bg-haq-red hover:bg-haq-ink text-white text-xs font-heading font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs"
            >
              <span>ĐỐI TÁC</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/lien-he"
              className="bg-haq-red text-white text-[11px] font-heading font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full"
            >
              ĐỐI TÁC
            </Link>
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
        <div className="fixed inset-0 z-40 xl:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-[68px] right-0 bottom-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-black/5 overflow-y-auto">
            <div className="space-y-1">
              <div className="pb-3 mb-3 border-b border-black/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-haq-ink/50 uppercase">
                  HAQ FOOD MENU
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
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3 px-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wide transition-colors ${
                      active
                        ? 'bg-haq-red/10 text-haq-red font-black'
                        : 'text-haq-ink/80 hover:bg-haq-bone hover:text-haq-red'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </a>
                )
              })}
            </div>

            <div className="pt-6 border-t border-black/10 space-y-4">
              <Link
                to="/lien-he"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-haq-red text-white py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:bg-haq-ink transition-colors shadow-xs"
              >
                <span>HỢP TÁC DOANH NGHIỆP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-haq-ink/60 space-y-1">
                <p>Địa chỉ: <strong>30 Ng. 1 Phạm Tuấn Tài, Nghĩa Đô, Hà Nội</strong></p>
                <p>Hotline: <strong className="text-haq-ink font-mono">024 23 23 56 56</strong></p>
                <p>Email: <strong className="text-haq-ink">info@haq.com.vn</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
