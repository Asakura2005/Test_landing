import React, { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, Package, Sparkles } from 'lucide-react'
import { getProducts } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'
import { useAnalytics } from '../hooks/useAnalytics'
import { getLocalizedProduct } from '../utils/i18nData'
import { getProductDetailUrl, getProductsPageUrl, getHomeUrl } from '../utils/routeI18n'

export default function SearchOverlay({ isOpen, onClose }) {
  const { t, language } = useLanguage()
  const { trackProductClick, trackProductSearch } = useAnalytics()
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      getProducts().then((data) => {
        if (data) setProducts(data)
      })
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const filtered = products.filter((p) => {
      const loc = getLocalizedProduct(p, language)
      return (
        p.name?.toLowerCase().includes(q) ||
        p.en_name?.toLowerCase().includes(q) ||
        loc.name?.toLowerCase().includes(q) ||
        loc.description?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.categories?.name?.toLowerCase().includes(q)
      )
    })
    setResults(filtered)
  }, [query, products, language])

  if (!isOpen) return null

  const handleSelect = (item) => {
    trackProductClick(item, 'search_overlay')
    onClose()
    if (item.slug) {
      navigate(getProductDetailUrl(item.slug, language))
    } else {
      navigate(getProductsPageUrl(language))
    }
  }

  const QUICK_LINKS = [
    {
      label: language === 'en' ? 'HAQ Mixed Rice Paper' : language === 'ko' ? 'HAQ 비빔 라이스페이퍼' : language === 'zh' ? 'HAQ 拌米纸' : 'Bánh tráng trộn HAQ',
      path: getProductsPageUrl(language),
    },
    {
      label: language === 'en' ? 'Green Bean Cake' : language === 'ko' ? '녹두 케이크' : language === 'zh' ? '传统绿豆糕' : 'Bánh đậu xanh',
      path: getProductsPageUrl(language),
    },
    {
      label: language === 'en' ? 'Almond Pastry' : language === 'ko' ? '아몬드 페이스트리' : language === 'zh' ? '香酥杏仁饼' : 'Bánh hạnh nhân',
      path: getProductsPageUrl(language),
    },
    {
      label: language === 'en' ? 'OEM/ODM Solutions' : language === 'ko' ? 'OEM/ODM 솔루션' : language === 'zh' ? 'OEM/ODM 代工方案' : 'Năng lực OEM/ODM',
      path: `${getHomeUrl(language)}#nang-luc`,
    },
    {
      label: language === 'en' ? 'Distribution Network' : language === 'ko' ? '유통 네트워크' : language === 'zh' ? '分销与出口网络' : 'Hệ thống phân phối',
      path: `${getHomeUrl(language)}#thi-truong`,
    },
  ]

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={language === 'en' ? 'Search HAQ FOOD products' : language === 'ko' ? 'HAQ FOOD 제품 검색' : language === 'zh' ? '搜索 HAQ FOOD 产品' : 'Tìm kiếm sản phẩm HAQ FOOD'}
      className="fixed inset-0 z-[10000] flex items-start justify-center pt-2 sm:pt-4 md:pt-20 px-2 sm:px-4 md:px-6 bg-black/70 backdrop-blur-sm transition-opacity font-sans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl border border-haq-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-5 sm:p-6 border-b border-haq-border flex items-center gap-4">
          <Search className="w-6 h-6 text-[#16A34A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? 'Search products, categories, HAQ FOOD specs...'
                : language === 'ko'
                ? '제품, 카테고리, HAQ FOOD 정보 검색...'
                : language === 'zh'
                ? '搜索产品、品类及 HAQ FOOD 商业资讯...'
                : 'Tìm kiếm sản phẩm, danh mục, thông tin HAQ FOOD...'
            }
            className="flex-1 text-base sm:text-lg font-heading font-bold text-haq-ink outline-none placeholder:text-haq-text-secondary bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-haq-text-secondary hover:text-haq-ink cursor-pointer"
              aria-label={language === 'en' ? 'Clear' : language === 'ko' ? '지우기' : language === 'zh' ? '清空' : 'Xóa nội dung'}
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="min-w-10 min-h-10 flex items-center justify-center px-3 py-1.5 rounded-full bg-haq-sage/40 hover:bg-[#16A34A] hover:text-white text-xs font-heading font-bold uppercase text-haq-green-dark transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">ESC</span>
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[40vh] md:max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() ? (
            <div>
              <div className="text-xs font-heading font-bold tracking-wider text-haq-text-secondary uppercase mb-3">
                {language === 'en'
                  ? `SEARCH RESULTS (${results.length})`
                  : language === 'ko'
                  ? `검색 결과 (${results.length})`
                  : language === 'zh'
                  ? `搜索结果 (${results.length})`
                  : `KẾT QUẢ TÌM KIẾM (${results.length})`}
              </div>
              {results.length > 0 ? (
                <div className="divide-y divide-haq-border">
                  {results.map((item) => {
                    const locItem = getLocalizedProduct(item, language)
                    const itemImg = item.image_url || locItem.images?.[0] || locItem.variants?.[0]?.img || locItem.image || ''
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(locItem)}
                        data-product-click="true"
                        data-product-id={item.id}
                        data-product-slug={item.slug || item.id}
                        data-product-name={locItem.name}
                        data-product-canonical-name={locItem.canonical_name || item.name}
                        data-product-category={locItem.canonical_category || locItem.categories?.name || 'HAQ FOOD'}
                        data-product-price={item.price_min || item.variants?.[0]?.price || 0}
                        data-product-location="search_overlay"
                        className="py-3 px-3 rounded-2xl hover:bg-haq-sage/20 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-haq-sage/30 overflow-hidden flex items-center justify-center p-1 border border-haq-border">
                            {itemImg ? (
                              <img
                                src={itemImg}
                                alt={locItem.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-haq-text-secondary" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-heading font-bold text-haq-ink group-hover:text-[#16A34A] transition-colors">
                              {locItem.name}
                            </div>
                            <div className="text-xs text-haq-text-secondary line-clamp-1 font-normal">
                              {locItem.categories?.name || 'HAQ FOOD'}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-haq-text-secondary group-hover:text-[#16A34A] group-hover:translate-x-1 transition-all" />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-10 text-haq-text-secondary text-sm">
                  {language === 'en' ? (
                    <>No results found for "<strong>{query}</strong>".</>
                  ) : language === 'ko' ? (
                    <>"<strong>{query}</strong>"에 대한 검색 결과가 없습니다.</>
                  ) : language === 'zh' ? (
                    <>未找到与 "<strong>{query}</strong>" 相关的匹配结果。</>
                  ) : (
                    <>Không tìm thấy kết quả phù hợp cho "<strong>{query}</strong>".</>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-xs font-heading font-bold tracking-wider text-haq-text-secondary uppercase mb-3">
                {language === 'en'
                  ? 'QUICK SEARCH'
                  : language === 'ko'
                  ? '빠른 검색'
                  : language === 'zh'
                  ? '热门快捷检索'
                  : 'TÌM KIẾM NHANH'}
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_LINKS.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onClose()
                      navigate(link.path)
                    }}
                    className="px-3.5 py-2 rounded-xl bg-haq-sage/20 hover:bg-[#16A34A] hover:text-white text-xs font-heading font-bold text-haq-ink transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-[#16A34A] group-hover:text-white" />
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent
}
