import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'
import { getCategories } from '../services/supabase'

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [categories, setCategories] = useState([])
  const location = useLocation()

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories()
        if (data) setCategories(data.filter(c => c.is_active && !c.parent_id))
      } catch (err) {
        console.error("Lỗi fetch danh mục Header:", err)
      }
    }
    fetchCats()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const NavLink = ({ to, label, hasDropdown }) => {
    const active = isActive(to) || (hasDropdown && activeDropdown === hasDropdown)
    return (
      <Link 
        to={to} 
        className={`uppercase font-heading font-bold text-[13px] px-4 py-1.5 transition-all duration-200 border border-transparent whitespace-nowrap ${
          active 
            ? 'text-haq-gold border-haq-gold rounded-full' 
            : 'text-white/90 hover:text-haq-gold hover:border-haq-gold hover:rounded-full'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <nav
      id="sticky-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-haq-red ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto max-w-site px-4 md:px-8 h-20 relative flex items-center justify-between lg:justify-center">
        
        {/* Mobile menu toggle */}
        <button className="lg:hidden p-2 text-white z-20" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Desktop Left Nav */}
        <div className="hidden lg:flex flex-1 items-center justify-end pr-28 xl:pr-36 gap-1 xl:gap-3 h-full z-10">
          <NavLink to="/" label="Trang Chủ" />
          
          {/* Dropdown Giới Thiệu */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink to="/gioi-thieu" label="Giới Thiệu" hasDropdown="about" />
            {activeDropdown === 'about' && (
              <div className="absolute top-[85%] left-0 w-64 bg-haq-cream shadow-xl py-2 rounded-sm border border-black/5">
                <a href="/gioi-thieu#gioi-thieu" className="block px-5 py-2.5 text-[15px] text-haq-brown hover:text-haq-red transition-colors border-b border-black/5">Giới thiệu về HAQ</a>
                <a href="/gioi-thieu#hanh-trinh" className="block px-5 py-2.5 text-[15px] text-haq-brown hover:text-haq-red transition-colors border-b border-black/5">Hành trình phát triển</a>
                <a href="/gioi-thieu#nang-luc" className="block px-5 py-2.5 text-[15px] text-haq-brown hover:text-haq-red transition-colors border-b border-black/5">Năng lực sản xuất</a>
                <a href="/gioi-thieu#phan-phoi" className="block px-5 py-2.5 text-[15px] text-haq-brown hover:text-haq-red transition-colors">Hệ thống phân phối</a>
              </div>
            )}
          </div>
          
          {/* Dropdown Sản Phẩm */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink to="/san-pham" label="Sản Phẩm" hasDropdown="products" />
            {activeDropdown === 'products' && categories.length > 0 && (
              <div className="absolute top-[85%] left-0 w-60 bg-haq-cream shadow-xl py-2 rounded-sm border border-black/5">
                {categories.map((cat, index) => (
                  <Link 
                    key={cat.id} 
                    to="/san-pham" 
                    className={`block px-5 py-2.5 text-[15px] text-haq-brown hover:text-haq-red transition-colors ${index !== categories.length - 1 ? 'border-b border-black/5' : ''}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Logo — overlapping circle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[110px] w-[110px] bg-haq-red rounded-b-full flex items-center justify-center shadow-lg border-b-4 border-haq-gold/30 z-20 overflow-hidden">
          <Link to="/" className="flex items-center justify-center w-[96px] h-[96px] p-2 bg-white rounded-full mt-1 shadow-inner">
            <img src={logoImg} alt="HAQ FOOD Logo" className="w-[85%] h-[85%] object-contain" />
          </Link>
        </div>

        {/* Desktop Right Nav */}
        <div className="hidden lg:flex flex-1 items-center justify-start pl-28 xl:pl-36 gap-1 xl:gap-3 h-full z-10">
          <NavLink to="/tin-tuc" label="Tin Tức & Tuyển Dụng" />
          <NavLink to="/lien-he" label="Liên Hệ" />
          
          <div className="flex items-center ml-2 xl:ml-5 gap-4">
            <button className="text-white hover:text-haq-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-haq-gold transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2.5 bg-haq-gold text-haq-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>

        {/* Mobile Right Icons */}
        <div className="lg:hidden flex items-center gap-4 z-20">
          <button className="text-white hover:text-haq-gold">
            <Search className="w-6 h-6" />
          </button>
          <button className="text-white hover:text-haq-gold relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-haq-gold text-haq-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-haq-red border-t border-white/10 shadow-lg flex flex-col z-40 pb-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="px-6 py-4 font-heading font-bold text-sm uppercase border-b border-white/10 text-white hover:text-haq-gold">Trang Chủ</Link>
          <Link to="/gioi-thieu" onClick={() => setMenuOpen(false)} className="px-6 py-4 font-heading font-bold text-sm uppercase border-b border-white/10 text-white hover:text-haq-gold">Giới Thiệu</Link>
          <div className="flex flex-col border-b border-white/10">
            <Link to="/san-pham" onClick={() => setMenuOpen(false)} className="px-6 py-4 font-heading font-bold text-sm uppercase text-white hover:text-haq-gold">Sản Phẩm</Link>
            {categories.length > 0 && (
              <div className="pl-10 pr-6 pb-4 flex flex-col gap-3">
                {categories.map(cat => (
                  <Link key={cat.id} to="/san-pham" onClick={() => setMenuOpen(false)} className="text-white/80 text-sm hover:text-haq-gold">
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/tin-tuc" onClick={() => setMenuOpen(false)} className="px-6 py-4 font-heading font-bold text-sm uppercase border-b border-white/10 text-white hover:text-haq-gold">Tin Tức & Tuyển Dụng</Link>
          <Link to="/lien-he" onClick={() => setMenuOpen(false)} className="px-6 py-4 font-heading font-bold text-sm uppercase text-white hover:text-haq-gold">Liên Hệ</Link>
        </div>
      )}
    </nav>
  )
}
