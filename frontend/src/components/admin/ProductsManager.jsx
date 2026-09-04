import React, { useState, useMemo } from 'react'
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Pin, 
  Edit2, 
  Copy, 
  Trash2, 
  MapPin, 
  Layers, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Sparkles,
  ArrowUpDown,
  FileSpreadsheet,
  CheckSquare,
  Square,
  ExternalLink,
  Flame
} from 'lucide-react'
import { getProductViewsMap } from '../../services/posthog'

export default function ProductsManager({
  products = [],
  isLoading = false,
  onRefresh,
  onOpenCreateModal,
  onOpenEditModal,
  onDuplicateProduct,
  onDeleteProduct,
  onTogglePin,
  onToggleActive,
  currentPinnedCount = 0,
  isReadOnly = false
}) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProvince, setSelectedProvince] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all') // 'all' | 'in_stock' | 'out_of_stock' | 'pinned'

  // Batch Select State
  const [selectedProductIds, setSelectedProductIds] = useState([])

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Derived filter lists
  const categoryOptions = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean))
    return ['all', ...Array.from(cats)]
  }, [products])

  const provinceOptions = useMemo(() => {
    const provs = new Set(products.map(p => p.provinces?.name).filter(Boolean))
    return ['all', ...Array.from(provs)]
  }, [products])

  const viewsMap = useMemo(() => getProductViewsMap(), [products])

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    const list = products.filter(p => {
      // 1. Search Query
      const matchSearch = !searchQuery ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.variants?.some(v => v.sku?.toLowerCase().includes(searchQuery.toLowerCase()))

      // 2. Category Filter
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory

      // 3. Province Filter
      const matchProvince = selectedProvince === 'all' || p.provinces?.name === selectedProvince

      // 4. Status Filter
      let matchStatus = true
      if (selectedStatus === 'pinned') {
        matchStatus = Boolean(p.is_pinned)
      } else if (selectedStatus === 'in_stock') {
        matchStatus = p.is_active !== false
      } else if (selectedStatus === 'out_of_stock') {
        matchStatus = p.is_active === false
      }

      return matchSearch && matchCategory && matchProvince && matchStatus
    })

    // If "most_viewed" filter selected, sort from highest to lowest views
    if (selectedStatus === 'most_viewed') {
      return [...list].sort((a, b) => {
        const vA = viewsMap[a.slug] || viewsMap[a.id] || 0
        const vB = viewsMap[b.slug] || viewsMap[b.id] || 0
        return vB - vA
      })
    }

    return list
  }, [products, searchQuery, selectedCategory, selectedProvince, selectedStatus, viewsMap])

  // Pagination Slice
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

  // Checkbox selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProductIds(paginatedProducts.map(p => p.id))
    } else {
      setSelectedProductIds([])
    }
  }

  const handleSelectOne = (id) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const isAllSelected = paginatedProducts.length > 0 && paginatedProducts.every(p => selectedProductIds.includes(p.id))

  // Batch actions
  const handleBulkDelete = async () => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa ${selectedProductIds.length} sản phẩm đã chọn?`)) return
    for (const id of selectedProductIds) {
      await onDeleteProduct(id, 'sản phẩm đã chọn')
    }
    setSelectedProductIds([])
  }

  const handleBulkExportExcel = () => {
    const exportCount = selectedProductIds.length || filteredProducts.length
    alert(`Đang xuất dữ liệu ${exportCount} sản phẩm ra file Excel bảng giá B2B...`)
  }

  // Format price helper
  const getFormattedPriceRange = (product) => {
    if (!product.variants || product.variants.length === 0) {
      return 'Liên hệ báo giá'
    }
    const prices = product.variants
      .map(v => v.wholesale_price || v.price)
      .filter(p => typeof p === 'number' && p > 0)

    if (prices.length === 0) return 'Liên hệ báo giá'
    const min = Math.min(...prices)
    const max = Math.max(...prices)

    if (min === max) {
      return `${min.toLocaleString('vi-VN')}đ`
    }
    return `Từ ${min.toLocaleString('vi-VN')}đ - ${max.toLocaleString('vi-VN')}đ`
  }

  return (
    <div className="space-y-4 pb-12 font-sans text-gray-800 antialiased">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#E2E8E4]">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {isReadOnly ? 'Tra Cứu Danh Mục Sản Phẩm & Bảng Giá Sỉ' : 'Sản phẩm & Biến thể'}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý sản phẩm, SKU và thông tin bán hàng.
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
            <span>{products.length} sản phẩm</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{currentPinnedCount}/6 sản phẩm ghim trang chủ</span>
            <span>•</span>
            <span>{products.reduce((acc, p) => acc + (p.variants?.length || 1), 0)} SKUs</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={onRefresh} 
            className="p-2 rounded-md border border-[#E2E8E4] bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
            title="Làm mới dữ liệu"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#0F5132]' : ''}`} />
          </button>

          {!isReadOnly && (
            <button 
              onClick={onOpenCreateModal} 
              className="px-3.5 py-2 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> 
              <span>+ Thêm sản phẩm</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. COMPACT SEARCH & FILTERS TOOLBAR */}
      <div className="bg-white p-3 rounded-lg border border-[#E2E8E4] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, SKU..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 pl-9 pr-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors"
            />
          </div>

          {/* Filter by Category */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 px-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-800 font-medium focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors cursor-pointer"
            >
              <option value="all">Tất cả danh mục ({products.length})</option>
              {categoryOptions.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filter by Origin Province */}
          <div>
            <select
              value={selectedProvince}
              onChange={e => { setSelectedProvince(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 px-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-800 font-medium focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors cursor-pointer"
            >
              <option value="all">Tất cả tỉnh thành</option>
              {provinceOptions.filter(p => p !== 'all').map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={e => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 px-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-800 font-medium focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="in_stock">Còn hàng</option>
              <option value="out_of_stock">Hết hàng / Ẩn</option>
              <option value="pinned">Đã ghim trang chủ ({currentPinnedCount})</option>
              <option value="most_viewed">Xem nhiều nhất</option>
            </select>
          </div>

        </div>

        {/* 9. BULK ACTIONS TOOLBAR (Only shown when items selected) */}
        {selectedProductIds.length > 0 && (
          <div className="px-3 py-2 rounded-md bg-emerald-50/80 border border-emerald-200 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
              <CheckSquare className="w-4 h-4 text-[#0F5132]" />
              <span>{selectedProductIds.length} sản phẩm đã chọn</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkExportExcel}
                className="px-2.5 py-1 rounded-md bg-white border border-[#E2E8E4] text-xs font-medium text-gray-800 hover:bg-gray-50 transition-colors"
              >
                Xuất Excel ({selectedProductIds.length})
              </button>
              {!isReadOnly && (
                <button
                  onClick={handleBulkDelete}
                  className="px-2.5 py-1 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa ({selectedProductIds.length})
                </button>
              )}
              <button
                onClick={() => setSelectedProductIds([])}
                className="text-xs text-gray-600 hover:text-gray-900 px-2 cursor-pointer"
              >
                Bỏ chọn
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. PRODUCT TABLE (DESKTOP) & PRODUCT CARDS (MOBILE) */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-[#E2E8E4] p-12 flex flex-col items-center justify-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mb-3 text-[#0F5132]" />
          <p className="text-xs font-medium">Đang tải danh sách sản phẩm & biến thể...</p>
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#E2E8E4] p-12 text-center">
          <Package className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-900">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-xs text-gray-500 mt-1 mb-3">Thử thay đổi từ khóa tìm kiếm hoặc đặt lại các bộ lọc danh mục/tỉnh thành.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedProvince('all'); setSelectedStatus('all'); }} 
            className="text-xs font-semibold text-[#0F5132] hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-[#E2E8E4] bg-white overflow-hidden shadow-2xs">
          
          {/* Mobile View: Product List Cards (Hidden on md+) */}
          <div className="md:hidden divide-y divide-[#E2E8E4]">
            {paginatedProducts.map((p) => {
              const mainImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null
              const isSelected = selectedProductIds.includes(p.id)
              const isActive = p.is_active !== false
              const viewsCount = Number(viewsMap[p.slug] || viewsMap[p.id] || 0)

              return (
                <div key={p.id} className={`p-3 space-y-2.5 ${isSelected ? 'bg-emerald-50/30' : ''}`}>
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleSelectOne(p.id)}
                      className="mt-1 w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="w-12 h-12 rounded-md bg-gray-100 border border-[#E2E8E4] overflow-hidden shrink-0 flex items-center justify-center">
                      {mainImage ? (
                        <img src={mainImage} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-semibold text-xs text-gray-900 truncate">{p.name}</h4>
                        {p.is_pinned && (
                          <Pin className="w-3.5 h-3.5 text-amber-600 fill-amber-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono truncate">/{p.slug}</div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-[#0F5132]">
                          {getFormattedPriceRange(p)}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isActive ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-gray-400'}`} />
                          {isActive ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                    <div>{p.category || 'Chế biến'} • {p.provinces?.name || 'Toàn quốc'}</div>
                    <div className="flex items-center gap-2">
                      <a 
                        href={`/san-pham/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-600 hover:text-gray-900 font-medium"
                      >
                        Xem
                      </a>
                      {!isReadOnly && (
                        <button
                          onClick={() => onOpenEditModal(p)}
                          className="text-[#0F5132] font-semibold"
                        >
                          Sửa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop & Tablet Table View (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F7F8F6] border-b border-[#E2E8E4] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 w-10 text-center">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-2.5 px-2 w-12 text-center">Ghim</th>
                  <th className="py-2.5 px-3">Sản phẩm</th>
                  <th className="py-2.5 px-3 w-40">Danh mục / Tỉnh</th>
                  <th className="py-2.5 px-3 w-36">Giá sỉ tham chiếu</th>
                  <th className="py-2.5 px-3 w-24 text-center">Lượt xem</th>
                  <th className="py-2.5 px-3 w-28 text-center">Trạng thái</th>
                  <th className="py-2.5 px-4 w-28 text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2E8E4] text-xs">
                {paginatedProducts.map((p) => {
                  const mainImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null
                  const isSelected = selectedProductIds.includes(p.id)
                  const isActive = p.is_active !== false
                  const viewsCount = Number(viewsMap[p.slug] || viewsMap[p.id] || 0)

                  return (
                    <tr 
                      key={p.id} 
                      className={`hover:bg-gray-50/80 transition-colors ${isSelected ? 'bg-emerald-50/30' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-2.5 px-3 w-10 text-center">
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(p.id)}
                          className="w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>

                      {/* Ghim Button */}
                      <td className="py-2.5 px-2 w-12 text-center">
                        {isReadOnly ? (
                          <span className={`inline-block p-1 ${p.is_pinned ? 'text-amber-600' : 'text-gray-300'}`}>
                            <Pin className={`w-3.5 h-3.5 ${p.is_pinned ? 'fill-amber-600' : ''}`} />
                          </span>
                        ) : (
                          <button 
                            onClick={() => onTogglePin(p)} 
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              p.is_pinned 
                                ? 'text-amber-600 hover:bg-amber-50' 
                                : 'text-gray-300 hover:text-amber-600 hover:bg-gray-100'
                            }`}
                            title={p.is_pinned ? "Bỏ ghim khỏi trang chủ" : "Ghim lên trang chủ"}
                          >
                            <Pin className={`w-3.5 h-3.5 ${p.is_pinned ? 'fill-amber-600' : ''}`} />
                          </button>
                        )}
                      </td>

                      {/* Product Name & Small Thumbnail (40-48px) */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-gray-100 border border-[#E2E8E4] overflow-hidden shrink-0 flex items-center justify-center">
                            {mainImage ? (
                              <img src={mainImage} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0 max-w-sm">
                            <div className="font-semibold text-xs text-gray-900 truncate">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-gray-400 font-mono truncate">
                              /{p.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category / Province */}
                      <td className="py-2.5 px-3 w-40">
                        <div className="text-xs text-gray-800 font-medium truncate">
                          {p.category || 'Nông sản chế biến'}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate">
                          {p.provinces?.name || 'Toàn quốc'}
                        </div>
                      </td>

                      {/* Wholesale Price Reference */}
                      <td className="py-2.5 px-3 w-36 whitespace-nowrap">
                        <span className="font-mono font-medium text-xs text-[#0F5132]">
                          {getFormattedPriceRange(p)}
                        </span>
                      </td>

                      {/* Views Count Column */}
                      <td className="py-2.5 px-3 w-24 text-center">
                        <span className="font-mono text-xs text-gray-700 font-medium">
                          {viewsCount.toLocaleString()}
                        </span>
                      </td>

                      {/* Status Column */}
                      <td className="py-2.5 px-3 w-28 text-center">
                        {isReadOnly ? (
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${
                            isActive 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-gray-400'}`} />
                            {isActive ? 'Còn hàng' : 'Hết hàng'}
                          </span>
                        ) : (
                          <button
                            onClick={() => onToggleActive && onToggleActive(p)}
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                              isActive 
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                            }`}
                            title={isActive ? "Chuyển sang Hết hàng / Ẩn" : "Kích hoạt Còn hàng"}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-gray-400'}`} />
                            {isActive ? 'Còn hàng' : 'Hết hàng'}
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-4 w-28 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a 
                            href={`/san-pham/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors" 
                            title="Xem chi tiết trên website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          {!isReadOnly && (
                            <>
                              <button 
                                onClick={() => onOpenEditModal(p)} 
                                className="p-1 text-[#0F5132] hover:bg-emerald-50 rounded transition-colors cursor-pointer" 
                                title="Chỉnh sửa sản phẩm"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => onDuplicateProduct(p)} 
                                className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors cursor-pointer" 
                                title="Nhân bản"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => onDeleteProduct(p.id, p.name)} 
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer" 
                                title="Xóa sản phẩm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* 10. FOOTER PAGINATION */}
          <div className="px-4 py-3 bg-[#F7F8F6] border-t border-[#E2E8E4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>Hiển thị</span>
              <select
                value={itemsPerPage}
                onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="px-2 py-1 rounded border border-[#E2E8E4] bg-white font-medium text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                <option value={50}>50 / trang</option>
              </select>
              <span>trên tổng số <strong>{filteredProducts.length}</strong> sản phẩm</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1.5 rounded border border-[#E2E8E4] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#0F5132] text-white'
                      : 'bg-white border border-[#E2E8E4] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-1.5 rounded border border-[#E2E8E4] bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
