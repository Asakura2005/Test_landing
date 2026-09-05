import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'
import { buildCategoryTree, DEFAULT_DB_CATEGORIES, resolveProductImage, filterProductsByDbCategory } from '../data/productCategories'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import { getCategories, getProducts } from '../services/supabase'
import { useLanguage, LANGUAGES } from '../context/LanguageContext'
import { getLocalizedCategory, getLocalizedProduct } from '../utils/i18nData'

export default function StickyNav() {
  const { t, language, setLanguage, switchLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)

  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === '/en' || location.pathname === '/ko'
  const isTransparent = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
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
    const fetchAll = async () => {
      try {
        const [cats, prods] = await Promise.all([
          getCategories().catch(() => []),
          getProducts().catch(() => [])
        ])
        if (cats && cats.length > 0) setDbCategories(cats)
        if (prods && prods.length > 0) setAllProducts(prods)
      } catch (err) {
        console.warn('Lỗi lấy data cho Header:', err)
      }
    }
    fetchAll()
  }, [])

  const categoryTree = useMemo(() => {
    const raw = buildCategoryTree(dbCategories)
    return raw.map(root => {
      const locRoot = getLocalizedCategory(root, language)
      if (locRoot.children && locRoot.children.length > 0) {
        locRoot.children = locRoot.children.map(c => getLocalizedCategory(c, language))
      }
      return locRoot
    })
  }, [dbCategories, language])

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

  const activePreviewCat = hoveredCategory || categoryTree[1] || categoryTree[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-black/80 via-black/35 to-transparent h-[72px] sm:h-[76px] flex items-center border-none shadow-none'
          : isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs h-[68px] sm:h-[72px] border-b border-haq-border flex items-center'
          : 'bg-white h-[72px] sm:h-[76px] border-b border-haq-border flex items-center'
      }`}
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 flex items-center justify-between w-full">
        {/* 1. Corporate Brand Logo */}
        <Link
          to={language === 'en' ? '/en' : language === 'ko' ? '/ko' : '/'}
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-haq-green-dark rounded-lg"
          title="HAQ FOOD"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-haq-border bg-white p-0.5 shrink-0 shadow-2xs">
            <img
              src={logoImg}
              alt="HAQ FOOD Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-extrabold text-xl sm:text-2xl tracking-tight leading-none transition-colors ${
              isTransparent ? 'text-white' : 'text-haq-ink'
            }`}>
              HAQ <span className="text-haq-green-dark">FOOD</span>
            </span>
          </div>
        </Link>


        {/* 2. Desktop Navigation (Standard Corporate Architecture) */}
        <nav
          aria-label="Thanh điều hướng chính"
          className="hidden md:flex items-center gap-7 lg:gap-9"
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
                className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-3xl shadow-xl border border-haq-border p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
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
                        className={`group block px-3.5 py-2.5 rounded-2xl transition-all ${
                          isSubActive
                            ? 'bg-haq-sage/30 border border-[#16A34A]/20 shadow-2xs'
                            : 'hover:bg-haq-sage/20'
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
                className="absolute top-full -left-20 lg:-left-16 mt-2 w-[680px] max-h-[calc(100vh-90px)] overflow-y-auto bg-white rounded-3xl shadow-xl border border-haq-border p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 scrollbar-none"
              >
                <div className="grid grid-cols-12 gap-5">
                  {/* Left Column: Dynamic Database Categories */}
                  <div className="col-span-7 border-r border-haq-border pr-5 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-heading font-bold tracking-wider text-haq-green-dark uppercase mb-2 border-b border-haq-border pb-1">
                        <span>{language === 'en' ? 'PRODUCT CATEGORIES' : language === 'ko' ? '제품 카테고리' : 'DANH MỤC SẢN PHẨM'}</span>
                      </div>

                      <div className="space-y-1 max-h-[250px] overflow-y-auto scrollbar-thin pr-1 pb-1">
                        {categoryTree.map((cat) => {
                          const isHovered = (hoveredCategory?.id === cat.id) || (!hoveredCategory && cat.id === categoryTree[0]?.id)
                          return (
                            <div key={cat.id} className="space-y-0.5">
                              <div
                                onMouseEnter={() => setHoveredCategory(cat)}
                                className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                                  isHovered ? 'bg-haq-sage/50 border border-[#16A34A]/25' : 'hover:bg-haq-sage/20'
                                }`}
                              >
                                <Link
                                  to={cat.slug === 'all' ? '/san-pham' : `/san-pham?category=${cat.slug}`}
                                  onClick={() => setActiveMenu(null)}
                                  className="flex-1 font-heading text-xs font-bold uppercase tracking-wider text-haq-ink hover:text-[#16A34A]"
                                >
                                  {cat.name}
                                </Link>
                              </div>

                              {/* Danh mục con (Subcategories) */}
                              {cat.children && cat.children.length > 0 && (
                                <div className="pl-3 pr-1 py-0.5 flex flex-wrap gap-1">
                                  {cat.children.map((child) => {
                                    const isChildHovered = hoveredCategory?.id === child.id || hoveredCategory?.slug === child.slug
                                    return (
                                      <Link
                                        key={child.id}
                                        to={`/san-pham?category=${cat.slug}&sub=${child.slug}`}
                                        onMouseEnter={() => setHoveredCategory(child)}
                                        onClick={() => setActiveMenu(null)}
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

                    <div className="pt-2.5 mt-2 border-t border-haq-border">
                      <Link
                        to="/san-pham"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-heading font-bold tracking-wide text-haq-green-dark hover:text-haq-green transition-colors"
                      >
                        <span>{language === 'en' ? 'View all products →' : language === 'ko' ? '전체 제품 보기 →' : 'Xem tất cả sản phẩm →'}</span>
                      </Link>
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

                      <div className="grid grid-cols-2 gap-2">
                        {(() => {
                          const filtered = filterProductsByDbCategory(
                            allProducts,
                            activePreviewCat?.slug || 'all',
                            null,
                            categoryTree
                          )
                          if (!filtered || filtered.length === 0) {
                            return (
                              <div className="col-span-2 text-center py-6 text-xs text-haq-text-secondary">
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
                                to={`/san-pham/${p.slug}`}
                                onClick={() => setActiveMenu(null)}
                                className="group flex flex-col items-center gap-1.5 p-1.5 rounded-xl hover:bg-haq-soft/60 transition-all"
                              >
                                <div className="w-13 h-13 rounded-full overflow-hidden border border-haq-border shadow-2xs shrink-0 bg-white flex items-center justify-center">
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
        <div className="hidden md:flex items-center gap-3.5">
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
            className="inline-flex items-center gap-2 bg-haq-green-dark hover:bg-haq-green text-white text-xs font-heading font-bold tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-md focus:outline-none"
          >
            <span>{t('nav.cta', 'LIÊN HỆ BÁO GIÁ')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Header: Compact Switcher + Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <div
            className="inline-flex items-center p-0.5 rounded-full bg-haq-soft border border-haq-border text-[10px] font-mono font-bold tracking-wider"
            role="group"
            aria-label="Mobile Language selection"
          >
            {LANGUAGES.map((lang, idx) => {
              const isActive = language === lang.code
              return (
                <React.Fragment key={lang.code}>
                  {idx > 0 && <span className="text-haq-border select-none text-[9px] px-0.5">|</span>}
                  <button
                    type="button"
                    onClick={() => switchLanguage(lang.code, navigate, location.pathname)}
                    className={`px-1.5 py-0.5 rounded-full text-[10px] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-haq-green-dark text-white font-bold'
                        : 'text-haq-text-secondary'
                    }`}
                    aria-pressed={isActive}
                  >
                    {lang.label}
                  </button>
                </React.Fragment>
              )
            })}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-haq-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] rounded-lg"
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Accordion) */}
      <div
        className={`md:hidden fixed inset-x-0 top-[68px] sm:top-[72px] bg-white border-b border-haq-border transition-all duration-500 ease-in-out z-30 overflow-hidden ${
          mobileOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-8 space-y-5 overflow-y-auto max-h-[85vh] scrollbar-thin font-sans">
          {/* VỀ CHÚNG TÔI */}
          <div className="border-b border-haq-border pb-3">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('ve-chung-toi')}
              className="w-full flex items-center justify-between py-2 text-[15px] font-heading font-bold text-[#16A34A] uppercase tracking-tight"
            >
              <span>{t('nav.about', 'VỀ CHÚNG TÔI')}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileAccordion === 've-chung-toi' ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                mobileAccordion === 've-chung-toi' ? 'max-h-60 mt-3 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4 space-y-3 py-1 text-xs text-haq-text-secondary">
                {aboutSubpages.map((sub, idx) => (
                  <Link
                    key={idx}
                    to={sub.path}
                    onClick={() => setMobileOpen(false)}
                    className="block font-bold text-haq-ink hover:text-[#16A34A] text-[13px] transition-colors"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SẢN PHẨM */}
          <div className="border-b border-haq-border pb-3">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('san-pham')}
              className="w-full flex items-center justify-between py-2 text-[15px] font-heading font-bold text-haq-ink uppercase tracking-tight"
            >
              <span>{language === 'en' ? 'PRODUCT CATEGORIES' : language === 'ko' ? '제품 카테고리' : 'DANH MỤC SẢN PHẨM'}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileAccordion === 'san-pham' ? 'rotate-180 text-[#16A34A]' : ''}`} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                mobileAccordion === 'san-pham' ? 'max-h-[400px] mt-3 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-4 space-y-4 py-1 text-xs text-haq-text-secondary overflow-y-auto scrollbar-none">
                {categoryTree.map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <Link
                      to={cat.slug === 'all' ? '/san-pham' : `/san-pham?category=${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block font-bold text-haq-ink hover:text-[#16A34A] text-[13px]"
                    >
                      {cat.name}
                    </Link>
                    {cat.children && cat.children.length > 0 && (
                      <div className="pl-3 space-y-2 border-l border-haq-border">
                        {cat.children.map((child) => (
                          <Link
                            key={child.id}
                            to={`/san-pham?category=${cat.slug}&sub=${child.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-0.5 text-haq-text-secondary hover:text-[#16A34A]"
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
                  className="inline-flex items-center gap-2 py-2 font-bold text-[#16A34A] pt-3 border-t border-haq-border w-full uppercase tracking-wider text-[11px]"
                >
                  <span>{language === 'en' ? 'VIEW ALL PRODUCTS' : language === 'ko' ? '전체 제품 보기' : 'XEM TẤT CẢ SẢN PHẨM'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* TIN TỨC & TUYỂN DỤNG */}
          <div className="border-b border-haq-border pb-3">
            <div className="py-2 text-[15px] font-heading font-bold text-haq-ink uppercase tracking-tight">
              {language === 'en' ? 'NEWS & CAREERS' : language === 'ko' ? '뉴스 & 채용' : 'TIN TỨC & TUYỂN DỤNG'}
            </div>
            <div className="pl-3 space-y-2 pt-1">
              <Link
                to={language === 'en' ? '/en/news' : language === 'ko' ? '/ko/news' : '/tin-tuc'}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm text-[#52665A] hover:text-[#0F5132] font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132]" />
                <span>{language === 'en' ? 'News & Media' : language === 'ko' ? '뉴스' : 'Tin tức'}</span>
              </Link>
              <Link
                to={language === 'en' ? '/en/careers' : language === 'ko' ? '/ko/careers' : '/tuyen-dung'}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm text-[#52665A] hover:text-[#0F5132] font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132]" />
                <span>{language === 'en' ? 'Careers & Recruitment' : language === 'ko' ? '채용 정보' : 'Tuyển dụng'}</span>
              </Link>
            </div>
          </div>

          {/* LIÊN HỆ & ĐỔI NGÔN NGỮ */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EBF3EC]/60 border border-haq-border">
              <span className="text-xs font-heading font-bold text-haq-ink uppercase">
                {t('common.switch_language', 'Ngôn ngữ')}:
              </span>
              <div
                className="inline-flex items-center p-0.5 rounded-full bg-white border border-haq-border text-xs font-mono font-bold tracking-wider"
                role="group"
                aria-label="Mobile Drawer Language selection"
              >
                {LANGUAGES.map((item, idx) => {
                  const isActive = language === item.code
                  return (
                    <React.Fragment key={item.code}>
                      {idx > 0 && <span className="text-haq-border select-none text-[10px] px-0.5">|</span>}
                      <button
                        type="button"
                        onClick={() => {
                          switchLanguage(item.code, navigate, location.pathname)
                          setMobileOpen(false)
                        }}
                        className={`px-2.5 py-1 rounded-full text-xs font-heading font-bold uppercase transition-all cursor-pointer ${
                          isActive
                            ? 'bg-haq-green-dark text-white shadow-2xs font-bold'
                            : 'text-haq-text-secondary hover:text-haq-ink'
                        }`}
                        aria-pressed={isActive}
                      >
                        {item.label}
                      </button>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            <Link
              to={language === 'en' ? '/en/contact' : language === 'ko' ? '/ko/contact' : '/lien-he'}
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-3 bg-haq-green-dark text-white py-4 rounded-2xl text-[13px] font-heading font-bold uppercase tracking-wider shadow-md hover:bg-haq-green active:scale-95 transition-all"
            >
              <span>{t('nav.cta', 'LIÊN HỆ BÁO GIÁ')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </header>
  )
}
