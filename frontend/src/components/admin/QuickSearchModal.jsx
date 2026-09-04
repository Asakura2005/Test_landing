import React, { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  Package, 
  Users, 
  MapPin, 
  FolderTree, 
  Newspaper, 
  ArrowRight, 
  Plus, 
  ExternalLink,
  Sparkles,
  Command,
  X
} from 'lucide-react'

export default function QuickSearchModal({ 
  isOpen, 
  onClose, 
  products = [], 
  leads = [], 
  onNavigateTab,
  onQuickAction
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setSearchTerm('')
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Filtered items
  const term = searchTerm.toLowerCase().trim()

  const matchedProducts = term ? products.filter(p => 
    p.name?.toLowerCase().includes(term) || 
    p.category?.toLowerCase().includes(term) ||
    p.slug?.toLowerCase().includes(term)
  ).slice(0, 4) : []

  const matchedLeads = term ? leads.filter(l => 
    l.full_name?.toLowerCase().includes(term) || 
    l.company?.toLowerCase().includes(term) ||
    l.phone?.includes(term) ||
    l.need?.toLowerCase().includes(term)
  ).slice(0, 4) : []

  const quickNav = [
    { id: 'dashboard', label: 'Bảng điều khiển Tổng quan', icon: Sparkles, tab: 'dashboard', category: 'Điều hướng' },
    { id: 'products', label: 'Quản lý Sản phẩm & Biến thể SKU', icon: Package, tab: 'products', category: 'Điều hướng' },
    { id: 'leads', label: 'Lead & Khách hàng B2B (CRM Pipeline)', icon: Users, tab: 'leads', category: 'Điều hướng' },
    { id: 'provinces', label: 'Bản đồ 34 Tỉnh thành & Vùng nguyên liệu', icon: MapPin, tab: 'provinces', category: 'Điều hướng' },
    { id: 'categories', label: 'Danh mục & Cụm ngành sản phẩm', icon: FolderTree, tab: 'categories', category: 'Điều hướng' },
    { id: 'news', label: 'Tin tức Doanh nghiệp & CMS B2B', icon: Newspaper, tab: 'news', category: 'Điều hướng' },
  ].filter(item => !term || item.label.toLowerCase().includes(term))

  const handleSelectNav = (tab) => {
    onNavigateTab(tab)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#11261B]/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D8E5DA] overflow-hidden flex flex-col max-h-[80vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 border-b border-[#D8E5DA] flex items-center gap-3 bg-[#F4F8F4]/50">
          <Search className="w-5 h-5 text-[#0F5132] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm sản phẩm, đối tác B2B, số điện thoại, tỉnh thành... (Esc để thoát)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none text-[#11261B] text-base placeholder-[#52665A] focus:outline-none focus:ring-0 font-body"
          />
          {searchTerm ? (
            <button onClick={() => setSearchTerm('')} className="p-1 text-gray-400 hover:text-gray-600 rounded">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#D8E5DA] text-[11px] font-mono text-[#52665A]">
              <span>ESC</span>
            </div>
          )}
        </div>

        {/* Search Results / Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Quick Actions Shortcuts */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#52665A] px-2 mb-2">
              Hành động nhanh
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose()
                  if (onQuickAction) onQuickAction('add-product')
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#D8E5DA] hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-[#0F5132] group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#11261B]">Tạo Sản Phẩm Mới</div>
                  <div className="text-[11px] text-[#52665A]">Kèm biến thể trọng lượng & thùng sỉ</div>
                </div>
              </button>

              <button
                onClick={() => {
                  onClose()
                  if (onQuickAction) onQuickAction('add-news')
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-[#D8E5DA] hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all group"
              >
                <div className="p-2 rounded-lg bg-amber-100 text-[#C89B3C] group-hover:bg-[#C89B3C] group-hover:text-white transition-colors">
                  <Newspaper className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#11261B]">Đăng Tin Doanh Nghiệp</div>
                  <div className="text-[11px] text-[#52665A]">Bài viết B2B, ISO, Hội chợ</div>
                </div>
              </button>
            </div>
          </div>

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#52665A] px-2 mb-2 flex items-center justify-between">
                <span>Sản phẩm tìm thấy ({matchedProducts.length})</span>
                <span className="text-[#0F5132] font-semibold text-[10px]">Catalog</span>
              </div>
              <div className="space-y-1">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectNav('products')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F4F8F4] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-[#0F5132]">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#11261B] group-hover:text-[#0F5132] transition-colors">{p.name}</div>
                        <div className="text-xs text-[#52665A] flex items-center gap-2">
                          <span>{p.category || 'Nông sản'}</span>
                          {p.is_pinned && <span className="text-amber-700 font-bold bg-amber-100/60 px-1.5 py-0.2 rounded text-[10px]">Ghim TOP</span>}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0F5132] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Leads */}
          {matchedLeads.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#52665A] px-2 mb-2 flex items-center justify-between">
                <span>Lead & Khách hàng ({matchedLeads.length})</span>
                <span className="text-red-600 font-semibold text-[10px]">CRM Leads</span>
              </div>
              <div className="space-y-1">
                {matchedLeads.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => handleSelectNav('leads')}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F4F8F4] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-50 text-red-600">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#11261B] group-hover:text-[#0F5132] transition-colors">
                          {l.full_name} <span className="text-xs text-[#52665A] font-normal">({l.phone})</span>
                        </div>
                        <div className="text-xs text-[#52665A] truncate max-w-md">
                          {l.company ? `${l.company} - ` : ''}{l.need}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Xem lead
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#52665A] px-2 mb-2">
              Các Module Quản Trị
            </div>
            <div className="space-y-1">
              {quickNav.map((nav) => {
                const IconComponent = nav.icon
                return (
                  <div
                    key={nav.id}
                    onClick={() => handleSelectNav(nav.tab)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#F4F8F4] text-[#0F5132] group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-[#11261B] group-hover:text-[#0F5132] transition-colors">
                        {nav.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#52665A] bg-[#F4F8F4] px-2 py-0.5 rounded border border-[#D8E5DA]">
                        Chuyển tab
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0F5132] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-[#F4F8F4] border-t border-[#D8E5DA] flex items-center justify-between text-xs text-[#52665A]">
          <div className="flex items-center gap-2">
            <span>Dùng phím</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D8E5DA] font-mono text-[10px]">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D8E5DA] font-mono text-[10px]">↓</kbd>
            <span>để di chuyển,</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D8E5DA] font-mono text-[10px]">Enter</kbd>
            <span>để chọn</span>
          </div>
          <span className="font-bold text-[#0F5132]">HAQ FOOD B2B Admin</span>
        </div>
      </div>
    </div>
  )
}
