import React, { useState, useEffect, useMemo } from 'react'
import { Plus, Edit2, Trash2, Check, X, RefreshCw, MapPin, Upload, Image as ImageIcon, Search, Package, Star, ArrowUp, ArrowDown, CheckSquare, Square, Globe } from 'lucide-react'
import { 
  getProvinces, 
  createProvince, 
  updateProvince, 
  deleteProvince, 
  uploadProvinceImage, 
  deleteProvinceImage, 
  assignProductProvince,
  assignMultipleProductsToProvince,
  toggleProductPinned,
  getProducts
} from '../../services/supabase'

export default function ProvinceManager({ products: initialProducts = [], onProductsChange, isReadOnly = false }) {
  const [provinces, setProvinces] = useState([])
  const [productsList, setProductsList] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeRegionFilter, setActiveRegionFilter] = useState('ALL') // 'ALL' | 'Miền Bắc' | 'Miền Trung' | 'Miền Nam'
  const [visibilityFilter, setVisibilityFilter] = useState('ALL') // 'ALL' | 'ACTIVE' | 'HIDDEN'
  const [searchQuery, setSearchQuery] = useState('')
  
  // Modal [+ GÁN SẢN PHẨM] state
  const [assignModalProvince, setAssignModalProvince] = useState(null)
  const [modalSearchQuery, setModalSearchQuery] = useState('')
  const [selectedProductIds, setSelectedProductIds] = useState([])
  const [isAssigning, setIsAssigning] = useState(false)

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    region: 'Miền Nam',
    short_description: '',
    description: '',
    image: '',
    sort_order: 0,
    is_active: true
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [provData, prodData] = await Promise.all([
        getProvinces(false),
        getProducts()
      ])
      setProvinces(provData || [])
      if (prodData && Array.isArray(prodData)) {
        setProductsList(prodData)
        if (onProductsChange) onProductsChange(prodData)
      }
    } catch (err) {
      console.warn("Lỗi tải dữ liệu tỉnh / sản phẩm:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      region: 'Miền Nam',
      short_description: '',
      description: '',
      image: '',
      sort_order: provinces.length + 1,
      is_active: true
    })
    setIsEditing(null)
    setImageFile(null)
    setImagePreview('')
  }

  const handleEdit = (prov) => {
    setIsEditing(prov.id)
    setFormData({
      code: prov.code || '',
      name: prov.name || '',
      region: prov.region || 'Miền Nam',
      short_description: prov.short_description || '',
      description: prov.description || '',
      image: prov.image || '',
      sort_order: prov.sort_order ?? 0,
      is_active: prov.is_active ?? true
    })
    setImageFile(null)
    setImagePreview(prov.image || '')
  }

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData(prev => ({ ...prev, image: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên tỉnh/thành!")
      return
    }
    if (!formData.code.trim()) {
      alert("Vui lòng nhập canonical code!")
      return
    }

    const cleanCode = formData.code.toLowerCase().trim().replace(/[^a-z0-9]/g, '')

    setIsSaving(true)
    try {
      let finalImageUrl = formData.image

      if (imageFile) {
        if (formData.image) {
          await deleteProvinceImage(formData.image)
        }
        finalImageUrl = await uploadProvinceImage(imageFile, cleanCode)
      }

      const payload = {
        code: cleanCode,
        name: formData.name.trim(),
        region: formData.region,
        short_description: formData.short_description.trim() || null,
        description: formData.description.trim() || null,
        image: finalImageUrl || null,
        sort_order: Number(formData.sort_order) || 0,
        is_active: formData.is_active
      }

      if (isEditing) {
        await updateProvince(isEditing, payload)
      } else {
        await createProvince(payload)
      }

      await fetchData()
      resetForm()
      setIsDrawerOpen(false)
    } catch (err) {
      alert("Lỗi khi lưu tỉnh/thành: " + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id, name, provCode) => {
    const assigned = productsList.filter(p => p.province_id === id || p.province_code === provCode)
    if (assigned.length > 0) {
      alert(`Tỉnh/thành "${name}" đang có ${assigned.length} sản phẩm liên kết.\n\nVui lòng chuyển sản phẩm sang tỉnh khác hoặc TẮT TRẠNG THÁI (Ngừng hiển thị) thay vì xóa.`)
      return
    }

    if (!window.confirm(`Bạn có chắc muốn xóa tỉnh/thành "${name}"? Thao tác này có thể ảnh hưởng đến hiển thị bản đồ.`)) return

    try {
      await deleteProvince(id)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  const toggleActive = async (prov) => {
    try {
      await updateProvince(prov.id, { is_active: !prov.is_active })
      await fetchData()
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái: " + err.message)
    }
  }

  // Unassign product
  const handleUnassignProduct = async (prodId, prodName) => {
    if (!window.confirm(`Bạn có muốn gỡ sản phẩm "${prodName}" khỏi tỉnh này?`)) return
    try {
      await assignProductProvince(prodId, null)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi gỡ sản phẩm: " + err.message)
    }
  }

  // Toggle Pinned / Featured Product
  const handleTogglePinned = async (prodId, currentPinned) => {
    try {
      await toggleProductPinned(prodId, !currentPinned)
      await fetchData()
    } catch (err) {
      alert("Lỗi khi cập nhật nổi bật: " + err.message)
    }
  }

  // Open Modal [+ GÁN SẢN PHẨM]
  const openAssignModal = (prov) => {
    setAssignModalProvince(prov)
    setModalSearchQuery('')
    // Pre-select products currently in this province
    const currentProvProds = productsList.filter(p => p.province_id === prov.id).map(p => p.id)
    setSelectedProductIds(currentProvProds)
  }

  const closeAssignModal = () => {
    setAssignModalProvince(null)
    setSelectedProductIds([])
    setModalSearchQuery('')
  }

  const toggleProductSelection = (productId) => {
    setSelectedProductIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSaveProductAssignments = async () => {
    if (!assignModalProvince) return

    setIsAssigning(true)
    try {
      const provinceId = assignModalProvince.id
      const currentlyAssigned = productsList.filter(p => p.province_id === provinceId).map(p => p.id)

      // 1. Products to ADD to this province
      const toAdd = selectedProductIds.filter(id => !currentlyAssigned.includes(id))
      // 2. Products to REMOVE from this province
      const toRemove = currentlyAssigned.filter(id => !selectedProductIds.includes(id))

      if (toAdd.length > 0) {
        await assignMultipleProductsToProvince(toAdd, provinceId)
      }

      if (toRemove.length > 0) {
        for (const remId of toRemove) {
          await assignProductProvince(remId, null)
        }
      }

      await fetchData()
      closeAssignModal()
    } catch (err) {
      alert("Lỗi khi cập nhật gán sản phẩm: " + err.message)
    } finally {
      setIsAssigning(false)
    }
  }

  // Filter provinces
  const filteredProvinces = useMemo(() => {
    return provinces.filter(p => {
      const matchRegion = activeRegionFilter === 'ALL' || p.region === activeRegionFilter
      const matchVisibility = visibilityFilter === 'ALL' || 
        (visibilityFilter === 'ACTIVE' && p.is_active !== false) ||
        (visibilityFilter === 'HIDDEN' && p.is_active === false)
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchVisibility && matchSearch
    })
  }, [provinces, activeRegionFilter, visibilityFilter, searchQuery])

  // Get products for a province
  const getProvinceProducts = (prov) => {
    return productsList
      .filter(p => p.province_id === prov.id || p.province_code === prov.code)
      .sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0))
  }

  // Modal filtered products
  const modalFilteredProducts = useMemo(() => {
    return productsList.filter(p => {
      if (!modalSearchQuery) return true
      const q = modalSearchQuery.toLowerCase()
      return (
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.slug && p.slug.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      )
    })
  }, [productsList, modalSearchQuery])

  return (
    <div className="space-y-4 pb-12 font-sans text-gray-800 antialiased">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#E2E8E4]">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Bản đồ đặc sản
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý tỉnh thành, vùng miền và sản phẩm đặc sản.
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
            <span>{provinces.length} tỉnh / thành</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">
              {provinces.filter(p => p.is_active !== false).length}/{provinces.length} đang hiển thị
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={fetchData} 
            className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-[#E2E8E4] bg-white text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
            title="Làm mới dữ liệu"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#0F5132]' : ''}`} />
            <span>Làm mới</span>
          </button>

          {!isReadOnly && (
            <button 
              onClick={() => {
                resetForm()
                setIsDrawerOpen(true)
              }} 
              className="px-3.5 py-2 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> 
              <span>+ Thêm tỉnh / thành</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. COMPACT SEARCH & FILTER TOOLBAR */}
      <div className="bg-white p-3 rounded-lg border border-[#E2E8E4]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Tìm tỉnh / thành, mã tỉnh..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors"
            />
          </div>

          {/* Filter by Region */}
          <div>
            <select
              value={activeRegionFilter}
              onChange={e => setActiveRegionFilter(e.target.value)}
              className="w-full h-10 px-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-800 font-medium focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors cursor-pointer"
            >
              <option value="ALL">Tất cả vùng miền ({provinces.length})</option>
              <option value="Miền Bắc">Miền Bắc ({provinces.filter(p => p.region === 'Miền Bắc').length})</option>
              <option value="Miền Trung">Miền Trung ({provinces.filter(p => p.region === 'Miền Trung').length})</option>
              <option value="Miền Nam">Miền Nam ({provinces.filter(p => p.region === 'Miền Nam').length})</option>
            </select>
          </div>

          {/* Filter by Visibility Status */}
          <div>
            <select
              value={visibilityFilter}
              onChange={e => setVisibilityFilter(e.target.value)}
              className="w-full h-10 px-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-800 font-medium focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors cursor-pointer"
            >
              <option value="ALL">Tất cả trạng thái hiển thị</option>
              <option value="ACTIVE">Đang hiển thị trên bản đồ</option>
              <option value="HIDDEN">Đang ẩn</option>
            </select>
          </div>

          {/* Quick Stats Summary */}
          <div className="flex items-center justify-between px-3 text-xs text-gray-500 bg-gray-50/80 rounded-md border border-[#E2E8E4]">
            <span>Khớp lọc:</span>
            <span className="font-semibold text-gray-900">{filteredProvinces.length} tỉnh thành</span>
          </div>

        </div>
      </div>

      {/* 3. PROVINCE LIST / TABLE */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-[#E2E8E4] p-12 flex flex-col items-center justify-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mb-3 text-[#0F5132]" />
          <p className="text-xs font-medium">Đang tải danh sách tỉnh thành & đặc sản...</p>
        </div>
      ) : filteredProvinces.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#E2E8E4] p-12 text-center">
          <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-900">Không tìm thấy tỉnh/thành phù hợp</h3>
          <p className="text-xs text-gray-500 mt-1 mb-3">Thử thay đổi từ khóa tìm kiếm hoặc đặt lại các bộ lọc vùng miền.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveRegionFilter('ALL'); setVisibilityFilter('ALL'); }} 
            className="text-xs font-semibold text-[#0F5132] hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-[#E2E8E4] bg-white overflow-hidden shadow-2xs">
          
          {/* Mobile View: Compact Province Cards */}
          <div className="md:hidden divide-y divide-[#E2E8E4]">
            {filteredProvinces.map((prov, index) => {
              const assignedProds = getProvinceProducts(prov)
              const isSelected = isEditing === prov.id
              const isActive = prov.is_active !== false

              return (
                <div key={prov.id || prov.code} className={`p-3 space-y-2.5 ${isSelected ? 'bg-emerald-50/30' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-gray-400 font-semibold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className="font-semibold text-sm text-gray-900">{prov.name}</h4>
                      <span className="text-[11px] font-mono text-gray-400">({prov.code})</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                      isActive ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {isActive ? 'Hiển thị' : 'Ẩn'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div>
                      <span className="font-medium text-gray-700">{prov.region}</span>
                      <span className="mx-1.5">•</span>
                      <span>{assignedProds.length} sản phẩm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isReadOnly && (
                        <button
                          onClick={() => openAssignModal(prov)}
                          className="text-xs font-semibold text-emerald-700 hover:underline"
                        >
                          Gán SP
                        </button>
                      )}
                      {!isReadOnly && (
                        <button
                          onClick={() => {
                            handleEdit(prov)
                            setIsDrawerOpen(true)
                          }}
                          className="text-xs font-semibold text-gray-900 hover:underline"
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

          {/* Desktop & Tablet Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F7F8F6] border-b border-[#E2E8E4] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 w-12 text-center">STT</th>
                  <th className="py-2.5 px-3">Tỉnh / Thành</th>
                  <th className="py-2.5 px-3 w-28">Mã tỉnh</th>
                  <th className="py-2.5 px-3 w-32">Vùng miền</th>
                  <th className="py-2.5 px-3 w-40">Sản phẩm</th>
                  <th className="py-2.5 px-3 w-28 text-center">Hiển thị</th>
                  <th className="py-2.5 px-3 w-20 text-center">Thứ tự</th>
                  <th className="py-2.5 px-4 w-32 text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2E8E4] text-xs">
                {filteredProvinces.map((prov, index) => {
                  const assignedProds = getProvinceProducts(prov)
                  const isSelected = isEditing === prov.id
                  const isActive = prov.is_active !== false

                  return (
                    <tr 
                      key={prov.id || prov.code} 
                      className={`hover:bg-gray-50/80 transition-colors ${isSelected ? 'bg-emerald-50/30' : ''}`}
                    >
                      {/* STT */}
                      <td className="py-2.5 px-3 w-12 text-center font-mono text-gray-400 font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </td>

                      {/* Tên Tỉnh / Thành */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5">
                          {prov.image ? (
                            <img src={prov.image} alt={prov.name} className="w-7 h-7 rounded object-cover border border-[#E2E8E4] shrink-0" />
                          ) : (
                            <div className="w-7 h-7 rounded bg-gray-100 border border-[#E2E8E4] flex items-center justify-center text-gray-400 shrink-0">
                              <MapPin className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="font-semibold text-xs text-gray-900">
                              {prov.name}
                            </span>
                            {prov.short_description && (
                              <p className="text-[11px] text-gray-400 truncate max-w-xs">
                                {prov.short_description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Mã tỉnh */}
                      <td className="py-2.5 px-3 w-28 font-mono text-xs text-gray-500">
                        {prov.code}
                      </td>

                      {/* Vùng miền */}
                      <td className="py-2.5 px-3 w-32">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {prov.region}
                        </span>
                      </td>

                      {/* Sản phẩm gán */}
                      <td className="py-2.5 px-3 w-40">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-semibold ${assignedProds.length > 0 ? 'text-[#0F5132]' : 'text-gray-400'}`}>
                            {assignedProds.length} sản phẩm
                          </span>
                          {!isReadOnly && (
                            <button
                              onClick={() => openAssignModal(prov)}
                              className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold hover:underline cursor-pointer"
                              title="Gán hoặc bỏ gán sản phẩm cho tỉnh này"
                            >
                              Gán SP
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Hiển thị switch */}
                      <td className="py-2.5 px-3 w-28 text-center">
                        {isReadOnly ? (
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${
                            isActive 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-gray-400'}`} />
                            {isActive ? 'Hiển thị' : 'Ẩn'}
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleActive(prov)}
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                              isActive 
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                            }`}
                            title={isActive ? "Bấm để ẩn khỏi bản đồ" : "Bấm để hiển thị trên bản đồ"}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-gray-400'}`} />
                            {isActive ? 'Hiển thị' : 'Ẩn'}
                          </button>
                        )}
                      </td>

                      {/* Thứ tự */}
                      <td className="py-2.5 px-3 w-20 text-center font-mono text-xs text-gray-600">
                        {prov.sort_order ?? 0}
                      </td>

                      {/* Thao tác */}
                      <td className="py-2.5 px-4 w-32 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {!isReadOnly && (
                            <>
                              <button 
                                onClick={() => {
                                  handleEdit(prov)
                                  setIsDrawerOpen(true)
                                }} 
                                className="p-1 text-[#0F5132] hover:bg-emerald-50 rounded transition-colors cursor-pointer" 
                                title="Chỉnh sửa tỉnh / thành"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDelete(prov.id, prov.name, prov.code)} 
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer" 
                                title="Xóa tỉnh"
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

          {/* Footer stats */}
          <div className="px-4 py-3 bg-[#F7F8F6] border-t border-[#E2E8E4] flex items-center justify-between text-xs text-gray-500">
            <span>Tổng cộng: <strong>{filteredProvinces.length}</strong> tỉnh / thành</span>
            <span>Hiển thị tất cả trên 1 trang</span>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 4. PROVINCE EDIT / CREATE DRAWER */}
      {/* ======================================================== */}
      {isDrawerOpen && !isReadOnly && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-2xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E2E8E4] animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E2E8E4] flex items-center justify-between bg-gray-50/80">
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  {isEditing ? 'Chỉnh sửa tỉnh / thành' : 'Thêm mới tỉnh / thành'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Cập nhật thông tin địa lý và câu chuyện đặc sản vùng miền.
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsDrawerOpen(false)
                  resetForm()
                }}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body Form */}
            <form id="province-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              
              {/* Canonical Code */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800 flex justify-between">
                  <span>Mã tỉnh / Slug *</span>
                  <span className="text-[10px] text-gray-400 font-normal">Lowercase slug</span>
                </label>
                <input 
                  required 
                  type="text" 
                  value={formData.code} 
                  onChange={e => setFormData({ ...formData, code: e.target.value })} 
                  className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] bg-gray-50/50 font-mono text-gray-900 focus:outline-none focus:border-[#0F5132] focus:bg-white" 
                  placeholder="vd: hanoi, tayninh, haiphong"
                />
              </div>

              {/* Tên Tỉnh / Thành */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Tên Tỉnh / Thành *</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]" 
                  placeholder="vd: Hà Nội, Tây Ninh, Hải Phòng"
                />
              </div>

              {/* Vùng miền & Thứ tự */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">Vùng miền *</label>
                  <select 
                    value={formData.region} 
                    onChange={e => setFormData({ ...formData, region: e.target.value })} 
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] bg-white text-gray-900 focus:outline-none focus:border-[#0F5132] cursor-pointer"
                  >
                    <option value="Miền Bắc">Miền Bắc</option>
                    <option value="Miền Trung">Miền Trung</option>
                    <option value="Miền Nam">Miền Nam</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">Thứ tự hiển thị</label>
                  <input 
                    type="number" 
                    value={formData.sort_order} 
                    onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} 
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Tagline / Mô tả ngắn</label>
                <input 
                  type="text" 
                  value={formData.short_description} 
                  onChange={e => setFormData({ ...formData, short_description: e.target.value })} 
                  className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]" 
                  placeholder="vd: Vùng đất thánh rực rỡ với nghệ thuật làm bánh tráng..."
                />
              </div>

              {/* Story Description */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Mô tả câu chuyện di sản đặc sản</label>
                <textarea 
                  rows={3} 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  className="w-full p-2.5 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]" 
                  placeholder="Mô tả văn hóa ẩm thực khi người dùng click xem tỉnh..."
                />
              </div>

              {/* Ảnh đại diện */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Ảnh đại diện tỉnh (Tùy chọn)</label>
                <div className="flex items-center gap-3">
                  {imagePreview ? (
                    <div className="relative w-14 h-14 rounded-md border border-[#E2E8E4] overflow-hidden bg-gray-50 shrink-0">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={removeImage}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-bl text-[9px]"
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-md border border-dashed border-[#E2E8E4] bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-[#E2E8E4] hover:bg-gray-50 cursor-pointer text-gray-700">
                      <Upload className="w-3.5 h-3.5" /> Chọn ảnh tải lên
                      <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Active Toggle */}
              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input 
                  type="checkbox" 
                  checked={formData.is_active} 
                  onChange={e => setFormData({ ...formData, is_active: e.target.checked })} 
                  className="w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500"
                />
                <span className="font-medium text-gray-800">Hiển thị trên Bản đồ Đặc sản</span>
              </label>

            </form>

            {/* Drawer Footer Actions */}
            <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-end gap-2">
              <button 
                type="button" 
                onClick={() => {
                  setIsDrawerOpen(false)
                  resetForm()
                }} 
                className="px-3 py-1.5 rounded-md border border-[#E2E8E4] bg-white text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Hủy
              </button>

              <button 
                type="submit" 
                form="province-form"
                disabled={isSaving} 
                className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSaving ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Lưu thay đổi</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. MODAL GÁN SẢN PHẨM VÀO TỈNH THÀNH */}
      {/* ======================================================== */}
      {assignModalProvince && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-fadeIn">
          <div className="bg-white border border-[#E2E8E4] rounded-lg shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-[#E2E8E4] bg-gray-50/80 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#0F5132]" />
                  Sản phẩm tại {assignModalProvince.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Chọn các sản phẩm thuộc tỉnh {assignModalProvince.name} ({assignModalProvince.code}) để gán vào bản đồ.
                </p>
              </div>
              <button 
                onClick={closeAssignModal}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-3 border-b border-[#E2E8E4] bg-white">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Tìm kiếm sản phẩm theo tên, SKU hoặc danh mục..."
                  value={modalSearchQuery}
                  onChange={e => setModalSearchQuery(e.target.value)}
                  className="w-full h-8.5 pl-8.5 pr-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 focus:outline-none focus:border-[#0F5132] focus:bg-white"
                />
              </div>
            </div>

            {/* Modal Product Checkbox List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs">
              {modalFilteredProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">
                  Không tìm thấy sản phẩm nào phù hợp với từ khóa.
                </div>
              ) : (
                modalFilteredProducts.map(prod => {
                  const isChecked = selectedProductIds.includes(prod.id)
                  const isBelongsToOther = prod.province_id && prod.province_id !== assignModalProvince.id
                  const otherProv = isBelongsToOther ? provinces.find(p => p.id === prod.province_id) : null

                  return (
                    <div 
                      key={prod.id}
                      onClick={() => toggleProductSelection(prod.id)}
                      className={`flex items-center justify-between p-2 rounded-md border cursor-pointer transition-colors ${
                        isChecked 
                          ? 'border-[#0F5132] bg-emerald-50/40' 
                          : 'border-[#E2E8E4] bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by parent div
                          className="w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500 cursor-pointer"
                        />

                        {prod.images && prod.images[0] ? (
                          <img src={prod.images[0]} alt={prod.name} className="w-8 h-8 rounded object-cover border border-[#E2E8E4] shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded bg-gray-100 border border-[#E2E8E4] flex items-center justify-center text-gray-400 shrink-0">
                            <Package className="w-4 h-4" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <h4 className="font-semibold text-xs text-gray-900 truncate">{prod.name}</h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                            <span className="font-mono">/{prod.slug}</span>
                            {prod.category && <span>• {prod.category}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Other province warning badge */}
                      {isBelongsToOther && otherProv && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-medium shrink-0 ml-2">
                          Đang ở: {otherProv.name}
                        </span>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-[#E2E8E4] bg-gray-50 flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-500">
                Đã chọn: <strong className="text-gray-900">{selectedProductIds.length}</strong> sản phẩm
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeAssignModal}
                  disabled={isAssigning}
                  className="px-3 py-1.5 rounded-md border border-[#E2E8E4] bg-white hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSaveProductAssignments}
                  disabled={isAssigning}
                  className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isAssigning ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Lưu gán ({selectedProductIds.length})</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
