import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'
import { buildCategoryTree, DEFAULT_DB_CATEGORIES } from '../data/productCategories'
import { getCategories } from '../services/supabase'

const ABOUT_LINKS = [
  { label: 'Tổng quan HAQ FOOD', path: '/gioi-thieu#gioi-thieu', desc: 'Thành lập năm 2021 tại Hà Nội' },
  { label: 'Hành trình phát triển', path: '/gioi-thieu#hanh-trinh', desc: 'Dấu mốc 2021 - 2025' },
  { label: 'Tầm nhìn & Sứ mệnh', path: '/gioi-thieu#dinh-huong', desc: 'Vươn tầm thị trường châu Á' },
]

const CAPABILITY_LINKS = [
  { label: 'Năng lực sản xuất', path: '/nang-luc#nha-may', desc: 'Dây chuyền sấy giòn khép kín' },
  { label: 'Tiêu chuẩn chất lượng', path: '/nang-luc#chat-luong', desc: 'Chứng nhận ISO 22000 & HACCP' },
  { label: 'Gia công OEM / ODM', path: '/nang-luc#oem-odm', desc: 'Sản xuất theo yêu cầu đối tác' },
  { label: 'Mạng lưới phân phối', path: '/nang-luc#phan-phoi', desc: '3.000+ điểm bán & xuất khẩu' },
]

export default function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)

  const [dbCategories, setDbCategories] = useState(DEFAULT_DB_CATEGORIES)
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const timeoutRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories()
        if (data && data.length > 0) {
          setDbCategories(data)
        }
      } catch (err) {
        console.warn('Lỗi lấy danh mục cho Header:', err)
      }
    }
    fetchCats()
  }, [])

  const categoryTree = useMemo(() => {
    return buildCategoryTree(dbCategories)
  }, [dbCategories])

  useEffect(() => {
    if (categoryTree && categoryTree.length > 1 && !hoveredCategory) {
      setHoveredCategory(categoryTree[1])
    }
  }, [categoryTree, hoveredCategory])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location.pathname, location.search])

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
  const isAboutActive = location.pathname.startsWith('/gioi-thieu')
  const isCapabilitiesActive = location.pathname.startsWith('/nang-luc')
  const isNewsActive = location.pathname.startsWith('/tin-tuc')
  const isContactActive = location.pathname.startsWith('/lien-he')

  const activePreviewCat = hoveredCategory || categoryTree[1] || categoryTree[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs h-[68px] sm:h-[72px] border-b border-black/5 flex items-center'
          : 'bg-white h-[72px] sm:h-[76px] border-b border-black/5 flex items-center'
      }`}
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 flex items-center justify-between w-full">
        {/* 1. Corporate Brand Logo */}
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

        {/* 2. Desktop Navigation (5 Essential Items) */}
        <nav
          aria-label="Thanh điều hướng chính"
          className="hidden md:flex items-center gap-6 lg:gap-8"
          onMouseLeave={handleMouseLeave}
        >
          {/* GIỚI THIỆU */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('gioi-thieu')}
          >
            <Link
              to="/gioi-thieu"
              aria-current={isAboutActive ? 'page' : undefined}
              className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
                activeMenu === 'gioi-thieu' || isAboutActive
                  ? 'text-haq-red'
                  : 'text-haq-ink hover:text-haq-red'
              }`}
            >
              <span>GIỚI THIỆU</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'gioi-thieu' ? 'rotate-180 text-haq-red' : 'text-haq-ink/50'}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
                activeMenu === 'gioi-thieu' || isAboutActive ? 'w-full' : 'w-0'
              }`} />
            </Link>

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

          {/* SẢN PHẨM (Dynamic Database Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('san-pham')}
          >
            <Link
              to="/san-pham"
              aria-current={isProductsActive ? 'page' : undefined}
              className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
                activeMenu === 'san-pham' || isProductsActive ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
              }`}
            >
              <span>SẢN PHẨM</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'san-pham' ? 'rotate-180 text-haq-red' : 'text-haq-ink/50'}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
                activeMenu === 'san-pham' || isProductsActive ? 'w-full' : 'w-0'
              }`} />
            </Link>

            {activeMenu === 'san-pham' && (
              <div
                onMouseEnter={() => handleMouseEnter('san-pham')}
                className="absolute top-full -left-20 lg:-left-16 mt-2 w-[740px] bg-white rounded-3xl shadow-2xl border border-black/10 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Column: Dynamic Database Categories */}
                  <div className="col-span-7 border-r border-black/10 pr-6 space-y-2 max-h-[420px] overflow-y-auto scrollbar-thin">
                    <div className="text-[11px] font-mono font-bold tracking-widest text-haq-red uppercase mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>DANH MỤC SẢN PHẨM</span>
                      </div>
                      <span className="text-[10px] text-haq-ink/50 font-normal">HAQ FOOD CATALOG</span>
                    </div>

                    {categoryTree.map((cat) => {
                      const isHovered = activePreviewCat?.id === cat.id
                      return (
                        <div key={cat.id} className="space-y-1">
                          <Link
                            to={cat.slug === 'all' ? '/san-pham' : `/san-pham?category=${cat.slug}`}
                            onMouseEnter={() => setHoveredCategory(cat)}
                            onClick={() => setActiveMenu(null)}
                            className={`block p-2.5 rounded-2xl cursor-pointer transition-all focus:outline-none ${
                              isHovered
                                ? 'bg-haq-bone border-haq-red/20 shadow-2xs'
                                : 'hover:bg-haq-bone/60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-heading font-extrabold uppercase ${
                                isHovered ? 'text-haq-red' : 'text-haq-ink'
                              }`}>
                                {cat.name}
                              </span>
                              <ArrowRight className={`w-3.5 h-3.5 ${
                                isHovered ? 'text-haq-red' : 'text-black/20'
                              }`} />
                            </div>
                            <p className="text-[11px] text-haq-ink/60 mt-0.5 line-clamp-1">
                              {cat.desc}
                            </p>
                          </Link>

                          {/* Subcategories (e.g. Bánh tráng sấy / Bánh tráng trộn) */}
                          {cat.children && cat.children.length > 0 && (
                            <div className="pl-4 pr-1 py-1 flex flex-wrap gap-1.5">
                              {cat.children.map((child) => (
                                <Link
                                  key={child.id}
                                  to={`/san-pham?category=${cat.slug}&sub=${child.slug}`}
                                  onMouseEnter={() => setHoveredCategory(child)}
                                  onClick={() => setActiveMenu(null)}
                                  className="inline-flex items-center gap-1 text-[11px] font-heading font-bold text-haq-ink/75 hover:text-haq-red bg-haq-bone/70 hover:bg-haq-red/10 px-2.5 py-1 rounded-lg transition-colors border border-black/5"
                                >
                                  <span>↳ {child.name}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}

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

                  {/* Right Column: Preview Card */}
                  <div className="col-span-5 flex flex-col justify-between bg-haq-bone rounded-2xl p-5 border border-black/5">
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-widest text-haq-ink/50 uppercase mb-2">
                        SẢN PHẨM TIÊU BIỂU
                      </div>
                      <div className="aspect-16/10 rounded-xl overflow-hidden bg-white shadow-2xs mb-3 border border-black/5">
                        <img
                          src={activePreviewCat.image}
                          alt={activePreviewCat.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <h4 className="font-heading font-black text-sm text-haq-ink uppercase">
                        {activePreviewCat.featured || activePreviewCat.name}
                      </h4>
                      <p className="text-xs text-haq-ink/70 mt-1 leading-relaxed line-clamp-2">
                        {activePreviewCat.featuredDesc || activePreviewCat.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-haq-red font-bold">
                      <span>ISO 22000 & HACCP</span>
                      <span>HAQ FOOD</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NĂNG LỰC */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('nang-luc')}
          >
            <Link
              to="/nang-luc"
              aria-current={isCapabilitiesActive ? 'page' : undefined}
              className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
                activeMenu === 'nang-luc' || isCapabilitiesActive
                  ? 'text-haq-red'
                  : 'text-haq-ink hover:text-haq-red'
              }`}
            >
              <span>NĂNG LỰC</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'nang-luc' ? 'rotate-180 text-haq-red' : 'text-haq-ink/50'}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
                activeMenu === 'nang-luc' || isCapabilitiesActive ? 'w-full' : 'w-0'
              }`} />
            </Link>

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
            aria-current={isNewsActive ? 'page' : undefined}
            className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
              isNewsActive ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
            }`}
          >
            <span>TIN TỨC</span>
            <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
              isNewsActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>

          {/* LIÊN HỆ (Nav link) */}
          <Link
            to="/lien-he"
            aria-current={isContactActive ? 'page' : undefined}
            className={`relative py-2 text-xs lg:text-[13px] font-heading font-extrabold uppercase tracking-wider transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-red rounded ${
              isContactActive ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
            }`}
          >
            <span>LIÊN HỆ</span>
            <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-red transition-all duration-200 ${
              isContactActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
        </nav>

        {/* 3. CTA: LIÊN HỆ → */}
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
          {/* GIỚI THIỆU */}
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
                <Link
                  to="/gioi-thieu"
                  onClick={() => setMobileOpen(false)}
                  className="block py-1 font-bold text-haq-red"
                >
                  Trang Giới thiệu Doanh nghiệp →
                </Link>
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

          {/* SẢN PHẨM */}
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
              <div className="pl-4 space-y-3 py-2 text-xs text-haq-ink/75">
                {categoryTree.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <Link
                      to={cat.slug === 'all' ? '/san-pham' : `/san-pham?category=${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block font-bold text-haq-ink hover:text-haq-red py-0.5"
                    >
                      {cat.name}
                    </Link>
                    {cat.children && cat.children.length > 0 && (
                      <div className="pl-3 space-y-1 border-l border-black/10">
                        {cat.children.map((child) => (
                          <Link
                            key={child.id}
                            to={`/san-pham?category=${cat.slug}&sub=${child.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-0.5 text-haq-ink/70 hover:text-haq-red"
                          >
                            ↳ {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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

          {/* NĂNG LỰC */}
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
                <Link
                  to="/nang-luc"
                  onClick={() => setMobileOpen(false)}
                  className="block py-1 font-bold text-haq-red"
                >
                  Trang Năng lực Sản xuất & Chất lượng →
                </Link>
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

          {/* LIÊN HỆ */}
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
