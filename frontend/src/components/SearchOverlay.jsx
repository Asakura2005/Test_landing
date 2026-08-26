import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, Package, Sparkles } from 'lucide-react'
import { getProducts } from '../services/supabase'

export default function SearchOverlay({ isOpen, onClose }) {
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
        p.description?.toLowerCase().includes(q) ||
        p.categories?.name?.toLowerCase().includes(q)
    )
    setResults(filtered)
  }, [query, products])

  if (!isOpen) return null

  const handleSelect = (item) => {
    onClose()
    if (item.slug) {
      navigate(`/san-pham/${item.slug}`)
    } else {
      navigate('/san-pham')
    }
  }

  const QUICK_LINKS = [
    { label: 'Bánh tráng trộn HAQ', path: '/san-pham' },
    { label: 'Bánh đậu xanh', path: '/san-pham' },
    { label: 'Bánh hạnh nhân', path: '/san-pham' },
    { label: 'Năng lực OEM/ODM', path: '/#nang-luc' },
    { label: 'Hệ thống phân phối', path: '/#thi-truong' },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm sản phẩm HAQ FOOD"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-haq-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-5 sm:p-6 border-b border-haq-border flex items-center gap-4">
          <Search className="w-6 h-6 text-haq-red shrink-0" />
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
              className="p-1 text-haq-text-secondary hover:text-haq-ink"
              aria-label="Xóa nội dung"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-haq-cream hover:bg-haq-red hover:text-white text-xs font-mono font-bold uppercase text-haq-ink transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {query.trim() ? (
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-haq-text-secondary uppercase mb-3">
                KẾT QUẢ TÌM KIẾM ({results.length})
              </div>
              {results.length > 0 ? (
                <div className="divide-y divide-haq-border">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="py-3 px-3 rounded-xl hover:bg-haq-cream transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-haq-cream overflow-hidden flex items-center justify-center p-1 border border-haq-border">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-haq-text-secondary" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-heading font-bold text-haq-ink group-hover:text-haq-red transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-haq-text-secondary line-clamp-1">
                            {item.categories?.name || 'HAQ FOOD'}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-haq-text-secondary group-hover:text-haq-red group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-haq-text-secondary text-sm">
                  Không tìm thấy kết quả phù hợp cho "<strong>{query}</strong>".
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-haq-text-secondary uppercase mb-3">
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
                    className="px-3.5 py-2 rounded-xl bg-haq-cream hover:bg-haq-red hover:text-white text-xs font-heading font-bold text-haq-ink transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-haq-red group-hover:text-white" />
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
