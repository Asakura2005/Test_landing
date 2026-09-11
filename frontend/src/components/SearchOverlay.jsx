import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, Package, Sparkles } from 'lucide-react'
import { getProducts } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedProduct } from '../utils/i18nData'
import { getProductDetailUrl, getProductsPageUrl, getHomeUrl } from '../utils/routeI18n'

export default function SearchOverlay({ isOpen, onClose }) {
  const { t, language } = useLanguage()
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
    const filtered = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.en_name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.categories?.name?.toLowerCase().includes(q)
    )
    setResults(filtered)
  }, [query, products])

  if (!isOpen) return null

  const handleSelect = (item) => {
    onClose()
    if (item.slug) {
      navigate(getProductDetailUrl(item.slug, language))
    } else {
      navigate(getProductsPageUrl(language))
    }
  }

  const QUICK_LINKS = [
    { label: language === 'en' ? 'HAQ Mixed Rice Paper' : language === 'ko' ? 'HAQ 비빔 라이스페이퍼' : 'Bánh tráng trộn HAQ', path: getProductsPageUrl(language) },
    { label: language === 'en' ? 'Green Bean Cake' : language === 'ko' ? '녹두 케이크' : 'Bánh đậu xanh', path: getProductsPageUrl(language) },
    { label: language === 'en' ? 'Almond Pastry' : language === 'ko' ? '아몬드 페이스트리' : 'Bánh hạnh nhân', path: getProductsPageUrl(language) },
    { label: language === 'en' ? 'OEM/ODM Solutions' : language === 'ko' ? 'OEM/ODM 솔루션' : 'Năng lực OEM/ODM', path: `${getHomeUrl(language)}#nang-luc` },
    { label: language === 'en' ? 'Distribution Network' : language === 'ko' ? '유통 네트워크' : 'Hệ thống phân phối', path: `${getHomeUrl(language)}#thi-truong` },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm sản phẩm HAQ FOOD"
      className="fixed inset-0 z-[60] flex items-start justify-center pt-2 sm:pt-4 md:pt-20 px-2 sm:px-4 md:px-6 bg-black/60 backdrop-blur-sm transition-opacity font-sans"
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
            placeholder="Tìm kiếm sản phẩm, danh mục, thông tin HAQ FOOD..."
            className="flex-1 text-base sm:text-lg font-heading font-bold text-haq-ink outline-none placeholder:text-haq-text-secondary bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-haq-text-secondary hover:text-haq-ink cursor-pointer"
              aria-label="Xóa nội dung"
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
                KẾT QUẢ TÌM KIẾM ({results.length})
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
                  Không tìm thấy kết quả phù hợp cho "<strong>{query}</strong>".
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-xs font-heading font-bold tracking-wider text-haq-text-secondary uppercase mb-3">
                TÌM KIẾM NHANH
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
}
