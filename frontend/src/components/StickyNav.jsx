import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'
import { PRODUCT_CATEGORIES } from '../data/productCategories'

const ABOUT_LINKS = [
  { label: 'Tổng quan HAQ FOOD', path: '/#gioi-thieu', desc: 'Thành lập năm 2021 tại Hà Nội' },
  { label: 'Lịch sử phát triển', path: '/#hanh-trinh', desc: 'Hành trình 2021 - 2025' },
  { label: 'Tầm nhìn & Sứ mệnh', path: '/#tam-nhin', desc: 'Vươn tầm thị trường châu Á' },
  { label: 'Giá trị cốt lõi', path: '/#tam-nhin', desc: '5 nguyên tắc Quality First' },
]

const CAPABILITY_LINKS = [
  { label: 'Năng lực sản xuất', path: '/#nang-luc', desc: 'Dây chuyền chế biến khép kín' },
  { label: 'Chất lượng & an toàn', path: '/#nang-luc', desc: 'Chứng nhận ISO 22000 & HACCP' },
  { label: 'OEM / ODM', path: '/#hop-tac', desc: 'Gia công theo yêu cầu đối tác' },
  { label: 'Logistics & phân phối', path: '/#nang-luc', desc: 'Kiểm soát và lưu mẫu từng lô' },
]

export default function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(PRODUCT_CATEGORIES[1] || PRODUCT_CATEGORIES[0])

  const timeoutRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on page change
  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location.pathname, location.search])

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(menuKey)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 140)
  }

  const toggleMobileAccordion = (key) => {
    setMobileAccordion(mobileAccordion === key ? null : key)
  }

  const isProductsActive = location.pathname.startsWith('/san-pham')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs h-[68px] sm:h-[72px] border-b border-black/5 flex items-center'
          : 'bg-white h-[72px] sm:h-[76px] border-b border-black/5 flex items-center'
      }`}
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 flex items-center justify-between w-full">
        {/* 1. Logo HAQ FOOD (Click to go Home) */}
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded-lg"
          title="HAQ FOOD - Trang chủ"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg overflow-hidden border border-black/5 bg-white p-0.5 shrink-0">
            <img
              src={logoImg}
              alt="HAQ FOOD Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-haq-ink leading-none">
              HAQ <span className="text-haq-red">FOOD</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-haq-ink/50 uppercase mt-0.5">
              EST. 2021
            </span>
          </div>
        </Link>

        {/* 2. Clean Desktop Navigation (Only 4 Primary Links + 1 CTA) */}
        <nav
          aria-label="Thanh điều hướng chính"
          className="hidden md:flex items-center gap-6 lg:gap-8"
          onMouseLeave={handleMouseLeave}
        >
          {/* GIỚI THIỆU (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('gioi-thieu')}
          >
            <button
              type="button"
              aria-expanded={activeMenu === 'gioi-thieu'}
              aria-haspopup="true"
              onClick={() => navigate('/gioi-thieu')}
              className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
                activeMenu === 'gioi-thieu' || location.pathname === '/gioi-thieu'
                  ? 'text-haq-red'
                  : 'text-haq-ink hover:text-haq-red'
              }`}
            >
              <span>GIỚI THIỆU</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'gioi-thieu' ? 'rotate-180 text-haq-red' : 'text-haq-ink/50'}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
                activeMenu === 'gioi-thieu' || location.pathname === '/gioi-thieu' ? 'w-full' : 'w-0'
              }`} />
            </button>

            {activeMenu === 'gioi-thieu' && (
              <div
                onMouseEnter={() => handleMouseEnter('gioi-thieu')}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-black/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {ABOUT_LINKS.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => setActiveMenu(null)}
                    className="block p-2.5 rounded-xl hover:bg-haq-bone transition-colors group focus:outline-none focus:bg-haq-bone"
                  >
                    <div className="text-xs font-heading font-bold text-haq-ink group-hover:text-haq-red transition-colors">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-haq-ink/50 mt-0.5">
                      {item.desc}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* SẢN PHẨM (Product Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('san-pham')}
          >
            <button
              type="button"
              aria-expanded={activeMenu === 'san-pham'}
              aria-haspopup="true"
              aria-current={isProductsActive ? 'page' : undefined}
              onClick={() => navigate('/san-pham')}
              className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
                activeMenu === 'san-pham' || isProductsActive ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
              }`}
            >
              <span>SẢN PHẨM</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'san-pham' ? 'rotate-180 text-haq-red' : 'text-haq-ink/50'}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
                activeMenu === 'san-pham' || isProductsActive ? 'w-full' : 'w-0'
              }`} />
            </button>

            {activeMenu === 'san-pham' && (
              <div
                onMouseEnter={() => handleMouseEnter('san-pham')}
                className="absolute top-full -left-20 lg:-left-16 mt-2 w-[700px] bg-white rounded-3xl shadow-2xl border border-black/10 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Column: Categories List */}
                  <div className="col-span-6 border-r border-black/10 pr-6 space-y-1.5">
                    <div className="text-[11px] font-mono font-bold tracking-widest text-haq-red uppercase mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>DANH MỤC SẢN PHẨM</span>
                    </div>

                    {PRODUCT_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={cat.slug === 'all' ? '/san-pham' : `/san-pham?category=${cat.slug}`}
                        onMouseEnter={() => setHoveredCategory(cat)}
                        onClick={() => setActiveMenu(null)}
                        className={`block p-2.5 rounded-2xl cursor-pointer transition-all focus:outline-none ${
                          hoveredCategory.id === cat.id
                            ? 'bg-haq-bone border-haq-red/20 shadow-2xs'
                            : 'hover:bg-haq-bone/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-heading font-extrabold uppercase ${
                            hoveredCategory.id === cat.id ? 'text-haq-red' : 'text-haq-ink'
                          }`}>
                            {cat.name}
                          </span>
                          <ArrowRight className={`w-3.5 h-3.5 ${
                            hoveredCategory.id === cat.id ? 'text-haq-red' : 'text-black/20'
                          }`} />
                        </div>
                        <p className="text-[11px] text-haq-ink/60 mt-0.5 line-clamp-1">
                          {cat.desc}
                        </p>
                      </Link>
                    ))}

                    <div className="pt-3 border-t border-black/5">
                      <Link
                        to="/san-pham"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red hover:text-haq-ink transition-colors"
                      >
                        <span>XEM TẤT CẢ SẢN PHẨM →</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Product Preview Card */}
                  <div className="col-span-6 flex flex-col justify-between bg-haq-bone rounded-2xl p-5 border border-black/5">
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-widest text-haq-ink/50 uppercase mb-2">
                        SẢN PHẨM TIÊU BIỂU
                      </div>
                      <div className="aspect-16/9 rounded-xl overflow-hidden bg-white shadow-2xs mb-3">
                        <img
                          src={hoveredCategory.image}
                          alt={hoveredCategory.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <h4 className="font-heading font-black text-sm text-haq-ink uppercase">
                        {hoveredCategory.featured}
                      </h4>
                      <p className="text-xs text-haq-ink/70 mt-1 leading-relaxed line-clamp-2">
                        {hoveredCategory.featuredDesc || hoveredCategory.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-haq-red font-bold">
                      <span>TIÊU CHUẨN ISO & HACCP</span>
                      <span>HAQ FOOD</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NĂNG LỰC (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('nang-luc')}
          >
            <button
              type="button"
              aria-expanded={activeMenu === 'nang-luc'}
              aria-haspopup="true"
              className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
                activeMenu === 'nang-luc' ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
              }`}
            >
              <span>NĂNG LỰC</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'nang-luc' ? 'rotate-180 text-haq-red' : 'text-haq-ink/50'}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${activeMenu === 'nang-luc' ? 'w-full' : 'w-0'}`} />
            </button>

            {activeMenu === 'nang-luc' && (
              <div
                onMouseEnter={() => handleMouseEnter('nang-luc')}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-black/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {CAPABILITY_LINKS.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => setActiveMenu(null)}
                    className="block p-2.5 rounded-xl hover:bg-haq-bone transition-colors group focus:outline-none focus:bg-haq-bone"
                  >
                    <div className="text-xs font-heading font-bold text-haq-ink group-hover:text-haq-red transition-colors">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-haq-ink/50 mt-0.5">
                      {item.desc}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* TIN TỨC */}
          <Link
            to="/tin-tuc"
            aria-current={location.pathname === '/tin-tuc' ? 'page' : undefined}
            className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
              location.pathname === '/tin-tuc' ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
            }`}
          >
            <span>TIN TỨC</span>
            <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
              location.pathname === '/tin-tuc' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
        </nav>

        {/* 3. Single Minimal CTA: LIÊN HỆ → */}
        <div className="hidden md:flex items-center">
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-2 bg-haq-ink hover:bg-haq-red text-white text-xs font-heading font-extrabold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red"
          >
            <span>LIÊN HỆ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-haq-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded-lg"
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Accordion) */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-black/10 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Accordion: GIỚI THIỆU */}
          <div className="border-b border-black/5 pb-2">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('gioi-thieu')}
              className="w-full flex items-center justify-between py-2 text-sm font-heading font-black text-haq-ink uppercase"
            >
              <span>GIỚI THIỆU</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'gioi-thieu' ? 'rotate-180 text-haq-red' : ''}`} />
            </button>
            {mobileAccordion === 'gioi-thieu' && (
              <div className="pl-4 space-y-2 py-2 text-xs text-haq-ink/75">
                {ABOUT_LINKS.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 hover:text-haq-red"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Accordion: SẢN PHẨM */}
          <div className="border-b border-black/5 pb-2">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('san-pham')}
              className="w-full flex items-center justify-between py-2 text-sm font-heading font-black text-haq-red uppercase"
            >
              <span>SẢN PHẨM</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'san-pham' ? 'rotate-180' : ''}`} />
            </button>
            {mobileAccordion === 'san-pham' && (
              <div className="pl-4 space-y-2 py-2 text-xs text-haq-ink/75">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.slug === 'all' ? '/san-pham' : `/san-pham?category=${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 hover:text-haq-red"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link
                  to="/san-pham"
                  onClick={() => setMobileOpen(false)}
                  className="block py-1 font-bold text-haq-red pt-2"
                >
                  XEM TẤT CẢ SẢN PHẨM →
                </Link>
              </div>
            )}
          </div>

          {/* Accordion: NĂNG LỰC */}
          <div className="border-b border-black/5 pb-2">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('nang-luc')}
              className="w-full flex items-center justify-between py-2 text-sm font-heading font-black text-haq-ink uppercase"
            >
              <span>NĂNG LỰC</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'nang-luc' ? 'rotate-180 text-haq-red' : ''}`} />
            </button>
            {mobileAccordion === 'nang-luc' && (
              <div className="pl-4 space-y-2 py-2 text-xs text-haq-ink/75">
                {CAPABILITY_LINKS.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 hover:text-haq-red"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* TIN TỨC */}
          <div className="border-b border-black/5 pb-2">
            <Link
              to="/tin-tuc"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-heading font-black text-haq-ink uppercase"
            >
              TIN TỨC
            </Link>
          </div>

          {/* Single Mobile CTA */}
          <div className="pt-4">
            <Link
              to="/lien-he"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-haq-red text-white py-3 rounded-full text-xs font-heading font-black uppercase tracking-wider shadow-sm"
            >
              <span>LIÊN HỆ →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
