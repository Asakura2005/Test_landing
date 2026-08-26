import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Search,
  Globe,
  Sparkles,
  ShieldCheck,
  Factory,
  Store,
  Compass,
  FileText,
} from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'
import SearchOverlay from './SearchOverlay'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import heroBanner2 from '../assets/herobanner/Gemini_Generated_Image_bbdxopbbdxopbbdx.png'
import heroBanner3 from '../assets/herobanner/Gemini_Generated_Image_pateylpateylpate.png'

const PRODUCT_CATEGORIES = [
  {
    id: 'banh-trang',
    name: 'Bánh Tráng & Bánh Tráng Trộn',
    slug: 'banh-trang',
    desc: 'Bánh tráng sấy giòn vị bò, tôm, phô mai & bánh tráng trộn chuẩn vị đường phố truyền thống.',
    image: heroBanner1,
    featured: 'Bánh tráng trộn HAQ 2021',
  },
  {
    id: 'banh',
    name: 'Bánh Đậu Xanh & Bánh Hạnh Nhân',
    slug: 'banh',
    desc: 'Dòng bánh thượng hạng thanh ngọt truyền thống, đạt chuẩn xuất khẩu sang thị trường châu Á.',
    image: heroBanner3,
    featured: 'Bánh đậu xanh thượng hạng',
  },
  {
    id: 'do-an-vat',
    name: 'Đồ Ăn Vặt & Bắp Rang Bơ',
    slug: 'do-an-vat',
    desc: 'Snack giòn rụm kết hợp công nghệ sấy hiện đại, đáp ứng tiêu chuẩn an toàn thực phẩm khắt khe.',
    image: heroBanner2,
    featured: 'Bắp rang bơ caramel / phô mai',
  },
  {
    id: 'do-an-kho',
    name: 'Thịt Khô Hảo Hạng',
    slug: 'do-an-kho',
    desc: 'Thịt sấy đậm đà hương vị tự nhiên, nguồn nguyên liệu tuyển chọn nghiêm ngặt có chứng nhận.',
    image: heroBanner1,
    featured: 'Bò khô hảo hạng HAQ',
  },
]

const ABOUT_LINKS = [
  { label: 'Tổng quan HAQ FOOD', path: '/#gioi-thieu', desc: 'Thành lập năm 2021 tại Hà Nội' },
  { label: 'Lịch sử hình thành (2021 - 2025)', path: '/#hanh-trinh', desc: 'Hành trình 5 năm bứt phá' },
  { label: 'Tầm nhìn & Sứ mệnh', path: '/#tam-nhin', desc: 'Vươn tầm thị trường châu Á' },
  { label: 'Giá trị cốt lõi', path: '/#tam-nhin', desc: '5 nguyên tắc Quality First' },
]

const CAPABILITY_LINKS = [
  { label: 'Năng lực sản xuất', path: '/#nang-luc', desc: 'Dây chuyền chế biến quy mô lớn' },
  { label: 'Chất lượng & Tiêu chuẩn', path: '/#nang-luc', desc: 'Chứng nhận ISO 22000 & HACCP' },
  { label: 'Dịch vụ OEM / ODM', path: '/#hop-tac', desc: 'Gia công theo yêu cầu đối tác' },
  { label: 'Logistics & Lưu mẫu', path: '/#nang-luc', desc: 'Kiểm soát nghiêm ngặt từng lô' },
]

const MARKET_LINKS = [
  { label: 'Thị trường Việt Nam', path: '/#thi-truong', desc: 'WinMart, GO!, Circle K, GS25...' },
  { label: 'Xuất khẩu Hàn Quốc', path: '/#thi-truong', desc: 'Thị trường tiêu chuẩn khắt khe' },
  { label: 'Xuất khẩu Đài Loan', path: '/#thi-truong', desc: 'Phân phối chính ngạch quốc tế' },
]

export default function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(PRODUCT_CATEGORIES[0])
  const [searchOpen, setSearchOpen] = useState(false)
  const [lang, setLang] = useState('VN')

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

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location.pathname])

  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(menuKey)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 180)
  }

  const toggleMobileAccordion = (key) => {
    setMobileAccordion(mobileAccordion === key ? null : key)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white py-4 border-b border-black/5'
        }`}
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo HAQ FOOD */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-haq-red rounded-lg"
          >
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg overflow-hidden border border-black/5 bg-white p-0.5 shrink-0 shadow-2xs">
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
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-haq-ink/60 uppercase mt-0.5">
                HAQ HANOI JSC · EST. 2021
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Hierarchy */}
          <nav
            aria-label="Thanh điều hướng chính"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            onMouseLeave={handleMouseLeave}
          >
            {/* 1. TRANG CHỦ */}
            <Link
              to="/"
              className="px-3 py-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-ink hover:text-haq-red transition-colors"
            >
              TRANG CHỦ
            </Link>

            {/* 2. GIỚI THIỆU (Submenu) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('gioi-thieu')}
            >
              <button
                aria-expanded={activeMenu === 'gioi-thieu'}
                aria-haspopup="true"
                className={`px-3 py-2 text-xs font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1 transition-colors ${
                  activeMenu === 'gioi-thieu' ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
                }`}
              >
                <span>GIỚI THIỆU</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'gioi-thieu' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'gioi-thieu' && (
                <div
                  onMouseEnter={() => handleMouseEnter('gioi-thieu')}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-black/10 p-3 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {ABOUT_LINKS.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.path}
                      onClick={() => setActiveMenu(null)}
                      className="block p-2.5 rounded-xl hover:bg-haq-bone transition-colors group"
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

            {/* 3. SẢN PHẨM (Visual Mega Menu) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('san-pham')}
            >
              <button
                aria-expanded={activeMenu === 'san-pham'}
                aria-haspopup="true"
                className={`px-3 py-2 text-xs font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1 transition-colors ${
                  activeMenu === 'san-pham' ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
                }`}
              >
                <span>SẢN PHẨM</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'san-pham' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'san-pham' && (
                <div
                  onMouseEnter={() => handleMouseEnter('san-pham')}
                  className="absolute top-full -left-20 xl:-left-12 mt-2 w-[720px] bg-white rounded-3xl shadow-2xl border border-black/10 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Column: Categories List */}
                    <div className="col-span-6 border-r border-black/10 pr-6 space-y-2">
                      <div className="text-[11px] font-mono font-bold tracking-widest text-haq-red uppercase mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>DANH MỤC SẢN PHẨM</span>
                      </div>

                      {PRODUCT_CATEGORIES.map((cat) => (
                        <div
                          key={cat.id}
                          onMouseEnter={() => setHoveredCategory(cat)}
                          onClick={() => {
                            setActiveMenu(null)
                            navigate('/san-pham')
                          }}
                          className={`p-3 rounded-2xl cursor-pointer transition-all ${
                            hoveredCategory.id === cat.id
                              ? 'bg-haq-bone border-haq-red/20 shadow-xs'
                              : 'hover:bg-haq-bone/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-heading font-black uppercase ${
                              hoveredCategory.id === cat.id ? 'text-haq-red' : 'text-haq-ink'
                            }`}>
                              {cat.name}
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 ${
                              hoveredCategory.id === cat.id ? 'text-haq-red' : 'text-black/20'
                            }`} />
                          </div>
                          <p className="text-[11px] text-haq-ink/60 mt-1 line-clamp-1">
                            {cat.desc}
                          </p>
                        </div>
                      ))}

                      <div className="pt-3 border-t border-black/5">
                        <Link
                          to="/san-pham"
                          onClick={() => setActiveMenu(null)}
                          className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red hover:text-haq-ink transition-colors"
                        >
                          <span>XEM TẤT CẢ SẢN PHẨM →</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Visual Product Preview Card */}
                    <div className="col-span-6 flex flex-col justify-between bg-haq-bone rounded-2xl p-5 border border-black/5">
                      <div>
                        <div className="text-[10px] font-mono font-bold tracking-widest text-haq-ink/50 uppercase mb-2">
                          FEATURED PREVIEW
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
                        <p className="text-xs text-haq-ink/70 mt-1 leading-relaxed">
                          {hoveredCategory.desc}
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

            {/* 4. NĂNG LỰC (Submenu) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('nang-luc')}
            >
              <button
                aria-expanded={activeMenu === 'nang-luc'}
                aria-haspopup="true"
                className={`px-3 py-2 text-xs font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1 transition-colors ${
                  activeMenu === 'nang-luc' ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
                }`}
              >
                <span>NĂNG LỰC</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'nang-luc' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'nang-luc' && (
                <div
                  onMouseEnter={() => handleMouseEnter('nang-luc')}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-black/10 p-3 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {CAPABILITY_LINKS.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.path}
                      onClick={() => setActiveMenu(null)}
                      className="block p-2.5 rounded-xl hover:bg-haq-bone transition-colors group"
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

            {/* 5. THỊ TRƯỜNG (Submenu) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('thi-truong')}
            >
              <button
                aria-expanded={activeMenu === 'thi-truong'}
                aria-haspopup="true"
                className={`px-3 py-2 text-xs font-heading font-extrabold uppercase tracking-wider inline-flex items-center gap-1 transition-colors ${
                  activeMenu === 'thi-truong' ? 'text-haq-red' : 'text-haq-ink hover:text-haq-red'
                }`}
              >
                <span>THỊ TRƯỜNG</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'thi-truong' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'thi-truong' && (
                <div
                  onMouseEnter={() => handleMouseEnter('thi-truong')}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-black/10 p-3 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {MARKET_LINKS.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.path}
                      onClick={() => setActiveMenu(null)}
                      className="block p-2.5 rounded-xl hover:bg-haq-bone transition-colors group"
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

            {/* 6. TIN TỨC */}
            <a
              href="/#tin-tuc"
              className="px-3 py-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-ink hover:text-haq-red transition-colors"
            >
              TIN TỨC
            </a>

            {/* 7. LIÊN HỆ */}
            <Link
              to="/lien-he"
              className="px-3 py-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-ink hover:text-haq-red transition-colors"
            >
              LIÊN HỆ
            </Link>
          </nav>

          {/* Right Utilities: Search Icon + Lang Switch + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-haq-bone text-haq-ink/70 hover:text-haq-red transition-colors"
              title="Tìm kiếm sản phẩm"
              aria-label="Tìm kiếm sản phẩm"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'VN' ? 'EN' : 'VN')}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-haq-ink/70 hover:text-haq-red hover:bg-haq-bone transition-colors"
              title="Chuyển ngôn ngữ"
            >
              {lang}
            </button>

            {/* High-conversion CTA: TRỞ THÀNH ĐỐI TÁC → */}
            <Link
              to="/lien-he"
              className="inline-flex items-center gap-2 bg-haq-red hover:bg-haq-ink text-white text-xs font-heading font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-md"
            >
              <span>TRỞ THÀNH ĐỐI TÁC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-haq-ink"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-haq-ink"
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Accordion Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-black/10 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-heading font-black text-haq-ink uppercase"
            >
              TRANG CHỦ
            </Link>

            {/* Accordion: GIỚI THIỆU */}
            <div className="border-t border-black/5 pt-2">
              <button
                onClick={() => toggleMobileAccordion('gioi-thieu')}
                className="w-full flex items-center justify-between py-2 text-sm font-heading font-black text-haq-ink uppercase"
              >
                <span>GIỚI THIỆU</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'gioi-thieu' ? 'rotate-180' : ''}`} />
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
            <div className="border-t border-black/5 pt-2">
              <button
                onClick={() => toggleMobileAccordion('san-pham')}
                className="w-full flex items-center justify-between py-2 text-sm font-heading font-black text-haq-ink uppercase text-haq-red"
              >
                <span>SẢN PHẨM</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'san-pham' ? 'rotate-180' : ''}`} />
              </button>
              {mobileAccordion === 'san-pham' && (
                <div className="pl-4 space-y-2 py-2 text-xs text-haq-ink/75">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to="/san-pham"
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
            <div className="border-t border-black/5 pt-2">
              <button
                onClick={() => toggleMobileAccordion('nang-luc')}
                className="w-full flex items-center justify-between py-2 text-sm font-heading font-black text-haq-ink uppercase"
              >
                <span>NĂNG LỰC</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'nang-luc' ? 'rotate-180' : ''}`} />
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

            {/* Accordion: THỊ TRƯỜNG */}
            <div className="border-t border-black/5 pt-2">
              <button
                onClick={() => toggleMobileAccordion('thi-truong')}
                className="w-full flex items-center justify-between py-2 text-sm font-heading font-black text-haq-ink uppercase"
              >
                <span>THỊ TRƯỜNG</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'thi-truong' ? 'rotate-180' : ''}`} />
              </button>
              {mobileAccordion === 'thi-truong' && (
                <div className="pl-4 space-y-2 py-2 text-xs text-haq-ink/75">
                  {MARKET_LINKS.map((item, idx) => (
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

            <a
              href="/#tin-tuc"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-heading font-black text-haq-ink uppercase border-t border-black/5"
            >
              TIN TỨC
            </a>

            <Link
              to="/lien-he"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-heading font-black text-haq-ink uppercase border-t border-black/5"
            >
              LIÊN HỆ
            </Link>

            <div className="pt-4 border-t border-black/10">
              <Link
                to="/lien-he"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-haq-red text-white py-3 rounded-full text-xs font-heading font-black uppercase tracking-wider"
              >
                <span>TRỞ THÀNH ĐỐI TÁC</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Overlay Modal */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
