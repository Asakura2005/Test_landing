import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Search,
  Phone,
  MessageCircle,
  Globe,
} from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'
import { buildCategoryTree, DEFAULT_DB_CATEGORIES, resolveProductImage, filterProductsByDbCategory } from '../data/productCategories'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import { getCategories, getProducts } from '../services/supabase'
import { useLanguage, LANGUAGES } from '../context/LanguageContext'
import { getLocalizedCategory, getLocalizedProduct } from '../utils/i18nData'
import SearchOverlay from './SearchOverlay'

// Bộ đệm bộ nhớ (in-memory cache) cho danh mục và sản phẩm trên Header nhằm tăng tốc độ tải trang
let cachedNavData = {
  categories: null,
  products: null,
  timestamp: 0,
}
const NAV_CACHE_TTL = 5 * 60 * 1000 // 5 phút

export default function StickyNav() {
  const { t, language, setLanguage, switchLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)
  const [mobileProductSubAccordion, setMobileProductSubAccordion] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024
    }
    return false
  })

  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === '/en' || location.pathname === '/ko'

  // Detect mobile viewport for header transparency
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mql.matches)
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // Tự động đóng mobile drawer khi chuyển trang
  useEffect(() => {
    setMobileOpen(false)
    setMobileAccordion(null)
    setMobileProductSubAccordion(null)
  }, [location.pathname])

  // Khóa cuộn trang hoàn toàn trên mobile khi mobile drawer mở (chống lướt nền trên iOS/Android)
  useEffect(() => {
    if (!mobileOpen) return

    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0
    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPosition = document.body.style.position
    const originalBodyTop = document.body.style.top
    const originalBodyWidth = document.body.style.width
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalHtmlOverscroll = document.documentElement.style.overscrollBehavior

    // Khóa chặt body và html, cố định tại vị trí scroll hiện tại
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.setAttribute('data-mobile-nav-open', 'true')

    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.position = originalBodyPosition
      document.body.style.top = originalBodyTop
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = originalBodyWidth
      document.body.removeAttribute('data-mobile-nav-open')

      document.documentElement.style.overflow = originalHtmlOverflow
      document.documentElement.style.overscrollBehavior = originalHtmlOverscroll

      // Khôi phục chính xác vị trí cuộn trang trước khi mở drawer
      window.scrollTo(0, scrollY)
    }
  }, [mobileOpen])

  // Khi mở drawer mobile hoặc mở tìm kiếm, header luôn có nền trắng đồng bộ
  // Trên mobile, header luôn solid (không trong suốt) để banner nằm bên dưới
  const isTransparent = isHomePage && !isScrolled && !mobileOpen && !isMobile

  // Tối ưu hóa lắng nghe thanh cuộn với requestAnimationFrame và passive listener
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [dbCategories, setDbCategories] = useState(DEFAULT_DB_CATEGORIES)
  const [allProducts, setAllProducts] = useState([])
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const timeoutRef = useRef(null)
  const navigate = useNavigate()

  const aboutSubpages = useMemo(() => {
    if (language === 'en') {
      return [
        {
          title: 'CORPORATE OVERVIEW',
          desc: 'Brand declaration, strategic vision, mission & 5 core cultural values.',
          path: '/en/about',
          badge: 'OVERVIEW',
        },
        {
          title: 'HISTORY & MILESTONES',
          desc: 'Milestones 2021 — 2026, technology turning points & Asian export growth.',
          path: '/en/history',
          badge: '2021 - 2026',
        },
        {
          title: 'MANUFACTURING & QUALITY',
          desc: 'Closed convective drying line, cleanroom, ISO 22000 & HACCP, OEM/ODM solutions.',
          path: '/en/capabilities',
          badge: 'ISO & HACCP',
        },
      ]
    }
    if (language === 'ko') {
      return [
        {
          title: '기업 개요',
          desc: '브랜드 선언, 전략적 비전, 사명 및 5대 핵심 문화 가치.',
          path: '/ko/about',
          badge: '개요',
        },
        {
          title: '연혁 및 주요 성과',
          desc: '2021 — 2026 성장 발자취, 기술 혁신 및 아시아 시장 수출 확대.',
          path: '/ko/history',
          badge: '2021 - 2026',
        },
        {
          title: '제조 역량 및 설비',
          desc: '밀폐식 대류 건조 라인, 클린룸, ISO 22000 & HACCP 인증, OEM/ODM 맞춤 생산.',
          path: '/ko/capabilities',
          badge: 'ISO & HACCP',
        },
      ]
    }
    return [
      {
        title: 'GIỚI THIỆU TỔNG QUAN',
        desc: 'Tuyên ngôn thương hiệu, Tầm nhìn chiến lược, Sứ mệnh & 5 Giá trị văn hóa cốt lõi.',
        path: '/gioi-thieu',
        badge: 'TỔNG QUAN',
      },
      {
        title: 'LỊCH SỬ & DẤU MỐC',
        desc: 'Dấu mốc phát triển 2021 — 2026, các bước ngoặt công nghệ & xuất khẩu châu Á.',
        path: '/lich-su',
        badge: '2021 - 2026',
      },
      {
        title: 'CƠ SỞ SẢN XUẤT & CHẤT LƯỢNG',
        desc: 'Dây chuyền sấy giòn khép kín, phòng sạch, tiêu chuẩn ISO 22000 & HACCP, giải pháp OEM/ODM.',
        path: '/nang-luc',
        badge: 'ISO & HACCP',
      },
    ]
  }, [language])

  useEffect(() => {
    let isMounted = true
    const now = Date.now()
    if (cachedNavData.categories && cachedNavData.products && (now - cachedNavData.timestamp < NAV_CACHE_TTL)) {
      setDbCategories(cachedNavData.categories)
      setAllProducts(cachedNavData.products)
      return
    }

    const fetchAll = async () => {
      try {
        const [cats, prods] = await Promise.all([
          getCategories().catch(() => []),
          getProducts().catch(() => [])
        ])
        if (!isMounted) return
        if (cats && cats.length > 0) {
          setDbCategories(cats)
          cachedNavData.categories = cats
        }
        if (prods && prods.length > 0) {
          setAllProducts(prods)
          cachedNavData.products = prods
        }
        cachedNavData.timestamp = Date.now()
      } catch (err) {
        console.warn('Lỗi lấy data cho Header:', err)
      }
    }
    fetchAll()
    return () => { isMounted = false }
  }, [])

  const categoryTree = useMemo(() => {
    const raw = buildCategoryTree(dbCategories)
    return raw.map(root => {
      const locRoot = getLocalizedCategory(root, language)
      const children = Array.isArray(locRoot?.children)
        ? locRoot.children.map(c => getLocalizedCategory(c, language))
        : []
      return {
        ...locRoot,
        children,
      }
    })
  }, [dbCategories, language])

  useEffect(() => {
    if (categoryTree && categoryTree.length > 1 && !hoveredCategory) {
      setHoveredCategory(categoryTree[1])
    }
  }, [categoryTree, hoveredCategory])

  // Khóa cuộn trang nền khi mở mobile drawer
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location.pathname, location.search])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setMobileOpen(false)
        setIsSearchOpen(false)
      } else if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen(prev => !prev)
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
    }, 250)
  }

  const toggleMobileAccordion = (key) => {
    setMobileAccordion(mobileAccordion === key ? null : key)
  }

  const isAboutActive =
    location.pathname === '/gioi-thieu' ||
    location.pathname === '/en/about' ||
    location.pathname === '/ko/about' ||
    location.pathname === '/ve-chung-toi' ||
    location.pathname === '/lich-su' ||
    location.pathname === '/en/history' ||
    location.pathname === '/ko/history' ||
    location.pathname === '/nang-luc' ||
    location.pathname === '/en/capabilities' ||
    location.pathname === '/ko/capabilities' ||
    location.pathname.startsWith('/ve-chung-toi/')
  const isProductsActive =
    location.pathname.startsWith('/san-pham') ||
    location.pathname.startsWith('/en/products') ||
    location.pathname.startsWith('/ko/products')
  const isNewsActive =
    location.pathname.startsWith('/tin-tuc') ||
    location.pathname.startsWith('/tuyen-dung') ||
    location.pathname.startsWith('/en/news') ||
    location.pathname.startsWith('/en/careers') ||
    location.pathname.startsWith('/ko/news') ||
    location.pathname.startsWith('/ko/careers')
  const isContactActive =
    location.pathname.startsWith('/lien-he') ||
    location.pathname.startsWith('/en/contact') ||
    location.pathname.startsWith('/ko/contact')

  const homePath = language === 'en' ? '/en' : language === 'ko' ? '/ko' : '/'
  const contactPath = language === 'en' ? '/en/contact' : language === 'ko' ? '/ko/contact' : '/lien-he'
  const newsPath = language === 'en' ? '/en/news' : language === 'ko' ? '/ko/news' : '/tin-tuc'
  const careersPath = language === 'en' ? '/en/careers' : language === 'ko' ? '/ko/careers' : '/tuyen-dung'

  const getProductsPath = (categorySlug, subSlug) => {
    const base = language === 'en' ? '/en/products' : language === 'ko' ? '/ko/products' : '/san-pham'
    if (!categorySlug || categorySlug === 'all') return base
    if (subSlug) return `${base}?category=${categorySlug}&sub=${subSlug}`
    return `${base}?category=${categorySlug}`
  }

  const handleMapClick = (e) => {
    setMobileOpen(false)
    if (isHomePage) {
      e.preventDefault()
      const el = document.querySelector('[data-section="specialty-map"]')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(homePath)
      setTimeout(() => {
        const el = document.querySelector('[data-section="specialty-map"]')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 350)
    }
  }

  const activePreviewCat = hoveredCategory || categoryTree[1] || categoryTree[0]

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 ${mobileOpen ? 'z-[100]' : 'z-40'} transition-all duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-black/80 via-black/35 to-transparent h-[72px] sm:h-[76px] flex items-center border-none shadow-none'
          : isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs h-[72px] sm:h-[76px] border-b border-haq-border flex items-center'
          : 'bg-white h-[72px] sm:h-[76px] border-b border-haq-border flex items-center'
      }`}
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 flex items-center justify-between w-full relative z-40">
        {/* 1. Corporate Brand Logo */}
        <Link
          to={language === 'en' ? '/en' : language === 'ko' ? '/ko' : '/'}
          className="hidden lg:flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-green-dark rounded-lg shrink-0"
          title="HAQ FOOD"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-haq-border bg-white p-0.5 shrink-0 shadow-2xs">
            <img
              src={logoImg}
              alt="HAQ FOOD Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col shrink-0">
            <span className={`font-heading font-extrabold text-xl sm:text-2xl tracking-tight leading-none transition-colors whitespace-nowrap ${
              isTransparent ? 'text-white' : 'text-haq-ink'
            }`}>
              HAQ FOOD
            </span>
          </div>
        </Link>


        {/* 2. Desktop Navigation (Standard Corporate Architecture) */}
        <nav
          aria-label="Thanh điều hướng chính"
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          onMouseLeave={handleMouseLeave}
        >
          {/* VỀ CHÚNG TÔI (Mega Dropdown 3 Chuyên Mục Con) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('ve-chung-toi')}
          >
            <button
              type="button"
              aria-expanded={activeMenu === 've-chung-toi'}
              aria-haspopup="true"
              onClick={() => navigate('/gioi-thieu')}
              className={`relative py-2 text-sm font-heading font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-green-dark rounded cursor-pointer ${
                activeMenu === 've-chung-toi' || isAboutActive
                  ? (isTransparent ? 'text-[#16A34A] font-bold' : 'text-haq-green-dark font-bold')
                  : (isTransparent ? 'text-white/90 hover:text-white' : 'text-haq-ink hover:text-haq-green-dark')
              }`}
            >
              <span>{t('nav.about', 'Về chúng tôi')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 've-chung-toi' ? 'rotate-180 text-haq-green-dark' : (isTransparent ? 'text-white/70' : 'text-haq-text-secondary')}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-green-dark transition-all duration-200 ${
                activeMenu === 've-chung-toi' || isAboutActive ? 'w-full' : 'w-0'
              }`} />
            </button>

            {activeMenu === 've-chung-toi' && (
              <div
                onMouseEnter={() => handleMouseEnter('ve-chung-toi')}
                className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-3xl shadow-xl border border-haq-border p-3 z-50 animate-in fade-in duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
              >
                <div className="text-[11px] font-heading font-bold tracking-wider text-haq-green-dark uppercase px-3 py-1.5 mb-1 border-b border-haq-border">
                  <span>{language === 'en' ? 'HAQ FOOD CORPORATE PROFILE' : language === 'ko' ? 'HAQ FOOD 기업 프로필' : 'HỒ SƠ DOANH NGHIỆP HAQ FOOD'}</span>
                </div>

                <div className="grid grid-cols-1 gap-1 pt-1">
                  {aboutSubpages.map((sub, idx) => {
                    const isSubActive = location.pathname === sub.path
                    return (
                      <Link
                        key={idx}
                        to={sub.path}
                        onClick={() => {
                          setActiveMenu(null)
                          window.scrollTo(0, 0)
                        }}
                        className={`group block px-3.5 py-2.5 rounded-2xl border transition-colors ${
                          isSubActive
                            ? 'bg-haq-sage/30 border-[#16A34A]/20 shadow-2xs'
                            : 'border-transparent hover:bg-haq-sage/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-heading font-bold uppercase tracking-tight ${
                            isSubActive ? 'text-[#16A34A]' : 'text-haq-ink group-hover:text-[#16A34A]'
                          }`}>
                            {sub.title}
                          </span>
                          <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                            isSubActive ? 'text-[#16A34A]' : 'text-haq-text-secondary group-hover:text-[#16A34A]'
                          }`} />
                        </div>
                      </Link>
                    )
                  })}
                </div>

              </div>
            )}
          </div>

          {/* SẢN PHẨM (Dynamic Database Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('san-pham')}
          >
            <Link
              to={language === 'en' ? '/en/products' : language === 'ko' ? '/ko/products' : '/san-pham'}
              aria-current={isProductsActive ? 'page' : undefined}
              className={`relative py-2 text-sm font-heading font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-green-dark rounded ${
                activeMenu === 'san-pham' || isProductsActive
                  ? (isTransparent ? 'text-[#16A34A] font-bold' : 'text-haq-green-dark font-bold')
                  : (isTransparent ? 'text-white/90 hover:text-white' : 'text-haq-ink hover:text-haq-green-dark')
              }`}
            >
              <span>{t('nav.products', 'Sản phẩm')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'san-pham' ? 'rotate-180 text-haq-green-dark' : (isTransparent ? 'text-white/70' : 'text-haq-text-secondary')}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-green-dark transition-all duration-200 ${
                activeMenu === 'san-pham' || isProductsActive ? 'w-full' : 'w-0'
              }`} />
            </Link>

            {activeMenu === 'san-pham' && (
              <div
                onMouseEnter={() => handleMouseEnter('san-pham')}
                className="absolute top-full -left-20 lg:-left-16 mt-2 w-[680px] bg-white rounded-3xl shadow-xl border border-haq-border p-5 z-50 animate-in fade-in duration-150 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
              >
                <div className="grid grid-cols-12 gap-5">
                  {/* Left Column: Dynamic Database Categories */}
                  <div className="col-span-7 border-r border-haq-border pr-5 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-heading font-bold tracking-wider text-haq-green-dark uppercase mb-2 border-b border-haq-border pb-1">
                        <span>{language === 'en' ? 'PRODUCT CATEGORIES' : language === 'ko' ? '제품 카테고리' : 'DANH MỤC SẢN PHẨM'}</span>
                      </div>

                      <div className="space-y-1">
                        {categoryTree.map((cat) => {
                          const isHovered = (hoveredCategory?.id === cat.id) || (!hoveredCategory && cat.id === categoryTree[0]?.id)
                          return (
                            <div key={cat.id} className="space-y-0.5">
                              <Link
                                to={cat.slug === 'all' ? (language === 'en' ? '/en/products' : language === 'ko' ? '/ko/products' : '/san-pham') : `${language === 'en' ? '/en/products' : language === 'ko' ? '/ko/products' : '/san-pham'}?category=${cat.slug}`}
                                onClick={() => {
                                  setActiveMenu(null)
                                  window.scrollTo(0, 0)
                                }}
                                onMouseEnter={() => setHoveredCategory(cat)}
                                className={`px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-between group/cat ${
                                  isHovered ? 'bg-haq-sage/50 border-[#16A34A]/25' : 'border-transparent hover:bg-haq-sage/20'
                                }`}
                              >
                                <span className={`flex-1 font-heading text-xs font-bold uppercase tracking-wider transition-colors ${
                                  isHovered ? 'text-haq-green-dark' : 'text-haq-ink group-hover/cat:text-[#16A34A]'
                                }`}>
                                  {cat.name}
                                </span>
                              </Link>

                              {/* Danh mục con (Subcategories) */}
                              {cat.children && cat.children.length > 0 && (
                                <div className="pl-3 pr-1 py-0.5 flex flex-wrap gap-1">
                                  {cat.children.map((child) => {
                                    const isChildHovered = hoveredCategory?.id === child.id || hoveredCategory?.slug === child.slug
                                    return (
                                      <Link
                                        key={child.id}
                                        to={`${language === 'en' ? '/en/products' : language === 'ko' ? '/ko/products' : '/san-pham'}?category=${cat.slug}&sub=${child.slug}`}
                                        onMouseEnter={() => setHoveredCategory(child)}
                                        onClick={() => {
                                          setActiveMenu(null)
                                          window.scrollTo(0, 0)
                                        }}
                                        className={`inline-flex items-center gap-1 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-md transition-colors border ${
                                          isChildHovered
                                            ? 'bg-haq-green-dark text-white border-haq-green-dark shadow-2xs'
                                            : 'text-haq-ink/80 hover:text-haq-green-dark bg-haq-soft hover:bg-haq-green/10 border-haq-border'
                                        }`}
                                      >
                                        <span>↳ {child.name}</span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Showcase of Category Products */}
                  <div className="col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-heading font-bold tracking-wider text-haq-green-dark uppercase mb-2 flex items-center justify-between border-b border-haq-border pb-1">
                        <span>{language === 'en' ? 'FEATURED PRODUCTS' : language === 'ko' ? '대표 상품' : 'SẢN PHẨM NỔI BẬT'}</span>
                        <Link
                          to={`/san-pham?category=${activePreviewCat?.slug || 'all'}`}
                          onClick={() => setActiveMenu(null)}
                          className="text-[10px] text-[#16A34A] hover:underline"
                        >
                          {language === 'en' ? 'View all →' : language === 'ko' ? '전체 보기 →' : 'Xem tất cả →'}
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 min-h-[170px] content-start">
                        {(() => {
                          const filtered = filterProductsByDbCategory(
                            allProducts,
                            activePreviewCat?.slug || 'all',
                            null,
                            categoryTree
                          )
                          if (!filtered || filtered.length === 0) {
                            return (
                              <div className="col-span-2 flex items-center justify-center h-[160px] text-xs text-haq-text-secondary">
                                {language === 'en' ? 'Updating items...' : language === 'ko' ? '업데이트 중...' : 'Đang cập nhật...'}
                              </div>
                            )
                          }
                          return filtered.slice(0, 4).map((p) => {
                            const localizedProd = getLocalizedProduct(p, language)
                            const imgSrc = resolveProductImage(p, hoveredCategory?.slug)
                            return (
                              <Link
                                key={p.id}
                                to={language === 'en' ? `/en/products/${p.slug}` : language === 'ko' ? `/ko/products/${p.slug}` : `/san-pham/${p.slug}`}
                                onClick={() => setActiveMenu(null)}
                                className="group flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-haq-soft/60 transition-colors"
                              >
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-haq-border shadow-2xs shrink-0 bg-white flex items-center justify-center">
                                  <img
                                    src={imgSrc}
                                    alt={localizedProd.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.onerror = null
                                      e.currentTarget.src = catBanhTrangImg
                                    }}
                                  />
                                </div>
                                <span className="text-[10px] font-heading font-semibold text-haq-ink text-center line-clamp-1 group-hover:text-[#16A34A] transition-colors">
                                  {localizedProd.name}
                                </span>
                              </Link>
                            )
                          })
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TIN TỨC & TUYỂN DỤNG (Dropdown Menu) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('tin-tuc-tuyen-dung')}
          >
            <button
              type="button"
              aria-expanded={activeMenu === 'tin-tuc-tuyen-dung'}
              aria-haspopup="true"
              onClick={() => navigate(language === 'en' ? '/en/news' : language === 'ko' ? '/ko/news' : '/tin-tuc')}
              className={`relative py-2 text-sm font-heading font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-green-dark rounded cursor-pointer ${
                activeMenu === 'tin-tuc-tuyen-dung' || isNewsActive
                  ? (isTransparent ? 'text-[#16A34A] font-bold' : 'text-haq-green-dark font-bold')
                  : (isTransparent ? 'text-white/90 hover:text-white' : 'text-haq-ink hover:text-haq-green-dark')
              }`}
            >
              <span>{t('nav.news', 'Tin tức & Tuyển dụng')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'tin-tuc-tuyen-dung' ? 'rotate-180 text-haq-green-dark' : (isTransparent ? 'text-white/70' : 'text-haq-text-secondary')}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-green-dark transition-all duration-200 ${
                activeMenu === 'tin-tuc-tuyen-dung' || isNewsActive ? 'w-full' : 'w-0'
              }`} />
            </button>

            {activeMenu === 'tin-tuc-tuyen-dung' && (
              <div
                onMouseEnter={() => handleMouseEnter('tin-tuc-tuyen-dung')}
                className="absolute top-full left-0 mt-2 w-[240px] bg-white rounded-3xl shadow-xl border border-haq-border p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="text-[11px] font-heading font-bold tracking-wider text-haq-green-dark uppercase px-3 py-1.5 mb-1 border-b border-haq-border">
                  <span>{language === 'en' ? 'UPDATES & CAREERS' : language === 'ko' ? '소식 및 채용' : 'THÔNG TIN & TUYỂN DỤNG'}</span>
                </div>

                <div className="grid grid-cols-1 gap-1 pt-1">
                  <Link
                    to={language === 'en' ? '/en/news' : language === 'ko' ? '/ko/news' : '/tin-tuc'}
                    onClick={() => {
                      setActiveMenu(null)
                      window.scrollTo(0, 0)
                    }}
                    className={`group block px-3.5 py-2.5 rounded-2xl transition-all ${
                      (location.pathname.startsWith('/tin-tuc') && !location.pathname.startsWith('/tuyen-dung')) || location.pathname.startsWith('/en/news') || location.pathname.startsWith('/ko/news')
                        ? 'bg-haq-sage/30 border border-[#16A34A]/20 shadow-2xs'
                        : 'hover:bg-haq-sage/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-heading font-bold uppercase text-haq-ink group-hover:text-[#16A34A]">
                        {t('nav.news_only', 'Tin tức')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-haq-text-secondary group-hover:text-[#16A34A] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>

                  <Link
                    to={language === 'en' ? '/en/careers' : language === 'ko' ? '/ko/careers' : '/tuyen-dung'}
                    onClick={() => {
                      setActiveMenu(null)
                      window.scrollTo(0, 0)
                    }}
                    className={`group block px-3.5 py-2.5 rounded-2xl transition-all ${
                      location.pathname.startsWith('/tuyen-dung') || location.pathname.startsWith('/en/careers') || location.pathname.startsWith('/ko/careers')
                        ? 'bg-haq-sage/30 border border-[#16A34A]/20 shadow-2xs'
                        : 'hover:bg-haq-sage/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-heading font-bold uppercase text-haq-ink group-hover:text-[#16A34A]">
                        {t('nav.careers', 'Tuyển dụng')}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-haq-text-secondary group-hover:text-[#16A34A] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* LIÊN HỆ */}
          <Link
            to={language === 'en' ? '/en/contact' : language === 'ko' ? '/ko/contact' : '/lien-he'}
            aria-current={isContactActive ? 'page' : undefined}
            className={`relative py-2 text-sm font-heading font-semibold tracking-wide transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-green-dark rounded ${
              isContactActive
                ? (isTransparent ? 'text-[#16A34A] font-bold' : 'text-haq-green-dark font-bold')
                : (isTransparent ? 'text-white/90 hover:text-white' : 'text-haq-ink hover:text-haq-green-dark')
            }`}
          >
            <span>{t('nav.contact', 'Liên hệ')}</span>
            <span className={`absolute bottom-0 left-0 h-0.5 bg-haq-green-dark transition-all duration-200 ${
              isContactActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
        </nav>

        {/* 3. CTA & Header B2B Language Switcher (Desktop) */}
        <div className="hidden lg:flex items-center gap-3.5 shrink-0">
          {/* Minimal B2B Segmented Switcher */}
          <div
            className={`inline-flex items-center p-0.5 rounded-full text-xs font-mono font-bold tracking-wider transition-colors ${
              isTransparent
                ? 'bg-black/30 border border-white/20 text-white'
                : 'bg-haq-soft/80 border border-haq-border'
            }`}
            role="group"
            aria-label="Language selection"
          >
            {LANGUAGES.map((lang, idx) => {
              const isActive = language === lang.code
              return (
                <React.Fragment key={lang.code}>
                  {idx > 0 && <span className={`${isTransparent ? 'text-white/30' : 'text-haq-border'} select-none text-[10px] px-0.5`}>|</span>}
                  <button
                    type="button"
                    onClick={() => switchLanguage(lang.code, navigate, location.pathname)}
                    className={`px-2 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-haq-green-dark text-white shadow-2xs font-bold'
                        : (isTransparent ? 'text-white/80 hover:text-white' : 'text-haq-text-secondary hover:text-haq-ink')
                    }`}
                    aria-pressed={isActive}
                  >
                    {lang.label}
                  </button>
                </React.Fragment>
              )
            })}
          </div>

          <Link
            to={language === 'en' ? '/en/contact' : language === 'ko' ? '/ko/contact' : '/lien-he'}
            className="inline-flex items-center gap-2 bg-haq-green-dark hover:bg-haq-green text-white text-xs font-heading font-bold tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-md focus:outline-none shrink-0"
          >
            <span>{t('nav.cta', 'LIÊN HỆ BÁO GIÁ')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Header: Logo + Brand on left, Search & Hamburger on right */}
        <div className="flex lg:hidden items-center justify-between w-full h-full">
          {/* Left: Brand Logo & Title */}
          <Link
            to={homePath}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 focus:outline-none py-1 shrink-0"
            title="HAQ FOOD"
          >
            <div className="h-9 w-9 rounded-xl overflow-hidden border border-haq-border bg-white p-0.5 shadow-2xs shrink-0 flex items-center justify-center">
              <img src={logoImg} alt="HAQ FOOD Logo" className="h-full w-full object-contain" />
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-haq-ink whitespace-nowrap">
              HAQ FOOD
            </span>
          </Link>

          {/* Right: Search & Hamburger Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                setIsSearchOpen(true)
              }}
              className="w-10 h-10 flex items-center justify-center text-haq-ink hover:text-haq-green-dark hover:bg-haq-sage/30 active:scale-95 transition-all rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] cursor-pointer"
              aria-label={language === 'en' ? 'Search' : language === 'ko' ? '검색' : 'Tìm kiếm'}
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(prev => !prev)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] cursor-pointer ${
                mobileOpen
                  ? 'bg-haq-sage/60 text-haq-green-dark'
                  : 'text-haq-ink hover:text-haq-green-dark hover:bg-haq-sage/30'
              }`}
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Full-Screen Menu (Bao Minh Heritage Reference Style) */}
    {typeof document !== 'undefined' && createPortal(
      <>
        {/* Backdrop on tablet/desktop */}
        <div
          className={`fixed inset-0 bg-black/70 backdrop-blur-xs z-[9998] transition-opacity duration-300 lg:hidden touch-none ${
            mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileOpen(false)}
          onTouchMove={(e) => e.preventDefault()}
          aria-hidden="true"
        />

        {/* Full-Screen Branded Panel */}
        <div
          className={`fixed inset-0 h-screen h-[100dvh] w-full z-[9999] shadow-2xl flex flex-col transition-all duration-300 ease-out lg:hidden select-none overscroll-contain ${
            mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
          style={{
            backgroundColor: '#0C1E15',
            backgroundImage: 'radial-gradient(ellipse at 50% 0%, #164027 0%, #0C1E15 75%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* 1. Header Bar: Hotline on Left, Circular Emblem in Center, Search & Close 'X' on Right */}
          <div 
            className="px-4 sm:px-6 h-[72px] sm:h-[76px] flex items-center justify-between shrink-0 relative touch-none"
            onTouchMove={(e) => e.preventDefault()}
          >
            {/* Left: Quick Phone Hotline */}
            <div className="flex items-center gap-1 z-10">
              <a
                href="tel:02423235656"
                className="w-10 h-10 flex items-center justify-center text-amber-300 hover:text-white active:scale-95 transition-all rounded-xl bg-white/10 hover:bg-white/15 border border-amber-400/30 cursor-pointer"
                aria-label="Gọi hotline 024 2323 5656"
                title="024 2323 5656"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Center: Prominent Circular Brand Emblem */}
            <Link
              to={homePath}
              onClick={() => setMobileOpen(false)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center focus:outline-none group z-10"
              title="HAQ FOOD"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 shadow-2xl border-2 border-amber-400/80 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105">
                <img
                  src={logoImg}
                  alt="HAQ FOOD Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Right: Search & Close Button 'X' (placed at exact same coordinates as closed hamburger) */}
            <div className="flex items-center gap-1 z-10">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setIsSearchOpen(true)
                }}
                className="w-10 h-10 flex items-center justify-center text-white/90 hover:text-white active:scale-95 transition-all rounded-xl hover:bg-white/10 cursor-pointer"
                aria-label={language === 'en' ? 'Search' : language === 'ko' ? '검색' : 'Tìm kiếm'}
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-amber-300 hover:text-white active:scale-95 transition-all rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 cursor-pointer"
                aria-label="Đóng menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Gold Accent Divider Line */}
          <div className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent shrink-0" />

          {/* 2. Scrollable Menu Body (Heritage Category Accordions) */}
          <div 
            className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-1 custom-scrollbar text-white overscroll-contain touch-pan-y"
            data-mobile-menu-scrollable="true"
          >
            {/* TRANG CHỦ */}
            <div className="border-b border-amber-400/20 pb-0.5">
              <Link
                to={homePath}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between py-2 sm:py-2.5 text-base font-heading font-bold uppercase tracking-wide transition-colors ${
                  isHomePage ? 'text-amber-300' : 'text-amber-200/90 hover:text-amber-300'
                }`}
              >
                <span>{t('nav.home', 'Trang Chủ')}</span>
              </Link>
            </div>

            {/* GIỚI THIỆU ▾ */}
            <div className="border-b border-amber-400/20 pb-0.5">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('gioi-thieu')}
                className="w-full flex items-center justify-between py-2 sm:py-2.5 text-base font-heading font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer text-left uppercase tracking-wide"
              >
                <span>{language === 'en' ? 'About Us' : language === 'ko' ? '회사 소개' : 'Giới Thiệu'}</span>
                <span className={`text-xs transition-transform duration-300 ${mobileAccordion === 'gioi-thieu' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Sub-items */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileAccordion === 'gioi-thieu' ? 'max-h-72 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-3 space-y-1.5 border-l border-amber-400/30 ml-1">
                  {aboutSubpages.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={sub.path}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 text-sm text-white/85 hover:text-white font-medium transition-colors"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* SẢN PHẨM ▾ */}
            <div className="border-b border-amber-400/20 pb-0.5">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('san-pham')}
                className="w-full flex items-center justify-between py-2 sm:py-2.5 text-base font-heading font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer text-left uppercase tracking-wide"
              >
                <span>{language === 'en' ? 'Products' : language === 'ko' ? '제품 소개' : 'Sản Phẩm'}</span>
                <span className={`text-xs transition-transform duration-300 ${mobileAccordion === 'san-pham' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Product categories sub-accordion */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileAccordion === 'san-pham' ? 'max-h-[680px] opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-3 space-y-1.5 border-l border-amber-400/30 ml-1">
                  {/* Link all */}
                  <Link
                    to={getProductsPath('all')}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-1.5 text-sm text-emerald-300 hover:text-emerald-200 font-bold transition-colors"
                  >
                    <span>{language === 'en' ? 'Explore all products →' : language === 'ko' ? '모든 제품 둘러보기 →' : 'Xem tất cả sản phẩm →'}</span>
                  </Link>

                  {categoryTree.filter(c => c.slug !== 'all').map((cat) => {
                    const isCatOpen = mobileProductSubAccordion === cat.slug
                    const hasChildren = cat.children && cat.children.length > 0

                    return (
                      <div key={cat.id} className="py-1">
                        {hasChildren ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setMobileProductSubAccordion(isCatOpen ? null : cat.slug)}
                              className="w-full flex items-center justify-between py-1 text-sm font-semibold text-white/95 hover:text-amber-200 cursor-pointer text-left"
                            >
                              <span>{cat.name}</span>
                              <span className={`text-[10px] text-white/60 transition-transform duration-200 ${isCatOpen ? 'rotate-180 text-amber-300' : ''}`}>
                                ▼
                              </span>
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-200 ${
                                isCatOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'
                              }`}
                            >
                              <div className="pl-3 space-y-1 border-l border-white/20 ml-1 py-1">
                                <Link
                                  to={getProductsPath(cat.slug)}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1 text-xs text-amber-200/90 hover:text-white font-medium"
                                >
                                  {language === 'en' ? `All in ${cat.name}` : `Toàn bộ ${cat.name}`}
                                </Link>
                                {cat.children.map((child) => (
                                  <Link
                                    key={child.id}
                                    to={getProductsPath(cat.slug, child.slug)}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-1 text-xs text-white/75 hover:text-white font-normal"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <Link
                            to={getProductsPath(cat.slug)}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-sm text-white/85 hover:text-white font-medium"
                          >
                            {cat.name}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* BẢN ĐỒ ĐẶC SẢN 34 VÙNG */}
            <div className="border-b border-amber-400/20 pb-0.5">
              <a
                href={`${homePath}#specialty-map`}
                onClick={handleMapClick}
                className="flex items-center justify-between py-2 sm:py-2.5 text-base font-heading font-bold text-amber-300 hover:text-amber-200 transition-colors uppercase tracking-wide cursor-pointer"
              >
                <span>{language === 'en' ? 'Vietnam Specialty Map' : language === 'ko' ? '베트남 특산물 지도' : 'Bản Đồ Đặc Sản 34 Vùng'}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  34 VÙNG
                </span>
              </a>
            </div>

            {/* TIN TỨC & TUYỂN DỤNG ▾ */}
            <div className="border-b border-amber-400/20 pb-0.5">
              <button
                type="button"
                onClick={() => toggleMobileAccordion('tin-tuc-tuyen-dung')}
                className="w-full flex items-center justify-between py-2 sm:py-2.5 text-base font-heading font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer text-left uppercase tracking-wide"
              >
                <span>{language === 'en' ? 'News & Careers' : language === 'ko' ? '뉴스 & 채용' : 'Tin Tức & Tuyển Dụng'}</span>
                <span className={`text-xs transition-transform duration-300 ${mobileAccordion === 'tin-tuc-tuyen-dung' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileAccordion === 'tin-tuc-tuyen-dung' ? 'max-h-36 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-3 space-y-1.5 border-l border-amber-400/30 ml-1">
                  <Link
                    to={newsPath}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-white/85 hover:text-white font-medium transition-colors"
                  >
                    {language === 'en' ? 'News & Media' : language === 'ko' ? '뉴스 & 미디어' : 'Tin tức & Hoạt động'}
                  </Link>
                  <Link
                    to={careersPath}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 text-sm text-white/85 hover:text-white font-medium transition-colors"
                  >
                    {language === 'en' ? 'Careers & Recruitment' : language === 'ko' ? '채용 정보' : 'Cơ hội nghề nghiệp & Tuyển dụng'}
                  </Link>
                </div>
              </div>
            </div>

            {/* LIÊN HỆ */}
            <div className="border-b border-amber-400/20 pb-0.5">
              <Link
                to={contactPath}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-2 sm:py-2.5 text-base font-heading font-bold text-amber-300 hover:text-amber-200 transition-colors uppercase tracking-wide"
              >
                <span>{t('nav.contact', 'Liên Hệ')}</span>
              </Link>
            </div>

            {/* Bottom Quick Contact & Actions */}
            <div className="pt-5 pb-8 space-y-3">
              {/* Language Switcher Bar */}
              <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/10 border border-white/15">
                <div className="flex items-center gap-2 text-white/80 text-xs font-heading font-semibold">
                  <Globe className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{language === 'vi' ? 'Ngôn ngữ' : language === 'en' ? 'Language' : '언어'}</span>
                </div>
                <div className="flex items-center gap-1">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => switchLanguage(item.code, navigate, location.pathname)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                        language === item.code
                          ? 'bg-amber-400 text-[#0C1E15] shadow-xs'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{item.code === 'vi' ? '🇻🇳 VN' : item.code === 'en' ? '🇬🇧 EN' : '🇰🇷 KO'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone + Zalo */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:02423235656"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-heading font-bold tracking-tight active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>024 23 23 56 56</span>
                </a>
                <a
                  href="https://zalo.me/1361851474644984696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0068FF]/20 hover:bg-[#0068FF]/30 text-white border border-[#0068FF]/40 text-xs font-heading font-bold tracking-tight active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <span>Chat Zalo OA</span>
                </a>
              </div>

              {/* CTA Button */}
              <Link
                to={contactPath}
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider shadow-lg active:scale-[0.98] transition-all"
              >
                <span>{t('nav.cta', 'LIÊN HỆ BÁO GIÁ')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[10px] text-center text-white/50 font-mono tracking-tight pt-1">
                ISO 22000:2018 • HACCP • FDA EXPORT STANDARD
              </p>
            </div>
          </div>
        </div>
      </>,
      document.body
    )}

    {/* Global Search Overlay */}
    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
