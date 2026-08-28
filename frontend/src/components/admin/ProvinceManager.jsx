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

export default function ProvinceManager({ products: initialProducts = [], onProductsChange }) {
  const [provinces, setProvinces] = useState([])
  const [productsList, setProductsList] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(null)
  const [activeRegionFilter, setActiveRegionFilter] = useState('ALL') // 'ALL' | 'Miền Bắc' | 'Miền Trung' | 'Miền Nam'
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
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchSearch
    })
  }, [provinces, activeRegionFilter, searchQuery])

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
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 h-full overflow-y-auto bg-haq-cream">
      {/* Cột Danh sách tỉnh */}
      <div className="flex-1 bg-white border border-haq-border rounded-xl shadow-sm overflow-hidden flex flex-col min-w-0">
        
        {/* Header bar */}
        <div className="p-4 border-b border-haq-border bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 z-10">
          <div>
            <h2 className="font-bold text-lg text-haq-ink flex items-center gap-2">
              <Globe className="w-5 h-5 text-haq-red" /> Quản lý Bản đồ Đặc sản (34 Tỉnh/Thành)
            </h2>
            <p className="text-xs text-haq-text-secondary mt-0.5">
              Đang hiển thị {filteredProvinces.length}/{provinces.length} tỉnh thành (Nguồn dữ liệu: Supabase Single Source of Truth)
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-haq-text-secondary" />
            <input 
              type="text"
              placeholder="Tìm theo tên hoặc mã code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-haq-border rounded-lg focus:outline-none focus:border-haq-red bg-haq-cream/30"
            />
          </div>
        </div>

        {/* Region filter tabs */}
        <div className="flex border-b border-haq-border bg-haq-cream/40 px-4 py-2 gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'ALL', label: 'Tất cả vùng miền' },
            { id: 'Miền Bắc', label: 'Miền Bắc' },
            { id: 'Miền Trung', label: 'Miền Trung' },
            { id: 'Miền Nam', label: 'Miền Nam' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveRegionFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeRegionFilter === tab.id
                  ? 'bg-haq-ink text-white font-bold'
                  : 'bg-white text-haq-text-secondary border border-haq-border hover:bg-haq-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List content */}
        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-haq-ink/50">
              <RefreshCw className="w-8 h-8 animate-spin mb-4 text-haq-red" />
              <p>Đang tải danh sách tỉnh/thành & sản phẩm từ Supabase...</p>
            </div>
          ) : filteredProvinces.length === 0 ? (
            <div className="p-8 text-center text-haq-text-secondary border-2 border-dashed border-haq-border rounded-xl">
              Không tìm thấy tỉnh/thành nào phù hợp.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredProvinces.map(prov => {
                const assignedProds = getProvinceProducts(prov)
                const isSelected = isEditing === prov.id
                return (
                  <div 
                    key={prov.id || prov.code} 
                    className={`border rounded-xl p-4 transition-all ${
                      isSelected 
                        ? 'border-haq-red bg-red-50/20 shadow-md ring-1 ring-haq-red' 
                        : 'border-haq-border bg-white hover:bg-haq-cream/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs bg-haq-cream px-2 py-0.5 rounded text-haq-ink/70 border border-haq-border font-bold">
                            #{prov.sort_order ?? 0}
                          </span>
                          <h3 className="font-bold text-base text-haq-ink">{prov.name}</h3>
                          <span className="text-xs font-mono text-haq-text-secondary">({prov.code})</span>
                          
                          <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                            prov.region === 'Miền Bắc' ? 'bg-blue-100 text-blue-700' :
                            prov.region === 'Miền Trung' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {prov.region}
                          </span>

                          {!prov.is_active ? (
                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">ẨN TRÊN MAP</span>
                          ) : (
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">HIỆN TRÊN MAP</span>
                          )}
                        </div>

                        {/* Short Description */}
                        {prov.short_description && (
                          <p className="text-xs text-haq-text-secondary mt-1.5 line-clamp-1 italic">
                            "{prov.short_description}"
                          </p>
                        )}

                        {/* Description Story Preview */}
                        {prov.description && (
                          <p className="text-xs text-haq-ink/70 mt-1 line-clamp-2">
                            {prov.description}
                          </p>
                        )}

                        {/* Products list area */}
                        <div className="mt-3 pt-3 border-t border-haq-border/60">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-haq-ink uppercase tracking-wider flex items-center gap-1.5">
                              <Package className="w-3.5 h-3.5 text-haq-red" />
                              Sản phẩm tại {prov.name} ({assignedProds.length})
                            </span>

                            <button
                              type="button"
                              onClick={() => openAssignModal(prov)}
                              className="text-xs font-bold px-2.5 py-1 rounded bg-[#16A34A] text-white hover:bg-[#13863d] transition-all flex items-center gap-1 shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" /> Gán sản phẩm
                            </button>
                          </div>

                          {assignedProds.length === 0 ? (
                            <p className="text-xs text-haq-text-secondary italic py-1">
                              Chưa có sản phẩm nào. Bản đồ sẽ hiển thị Story Card dạng Empty State.
                            </p>
                          ) : (
                            <div className="grid sm:grid-cols-2 gap-2 mt-2">
                              {assignedProds.map((prod, idx) => (
                                <div 
                                  key={prod.id} 
                                  className="flex items-center justify-between gap-2 p-2 bg-haq-cream/40 border border-haq-border rounded-lg text-xs"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="font-mono font-bold text-[10px] text-haq-ink/60 bg-white px-1.5 py-0.5 rounded border border-haq-border shrink-0">
                                      {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    {prod.images && prod.images[0] ? (
                                      <img src={prod.images[0]} alt={prod.name} className="w-6 h-6 rounded object-cover shrink-0 border border-haq-border" />
                                    ) : null}
                                    <span className="font-medium text-haq-ink truncate" title={prod.name}>
                                      {prod.name}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePinned(prod.id, prod.is_pinned)}
                                      className={`p-1 rounded transition-colors ${
                                        prod.is_pinned 
                                          ? 'text-amber-500 bg-amber-50' 
                                          : 'text-haq-text-secondary/40 hover:text-amber-500'
                                      }`}
                                      title={prod.is_pinned ? "Đang ưu tiên đầu (Click để hủy)" : "Ghim ưu tiên đầu"}
                                    >
                                      <Star className={`w-3.5 h-3.5 ${prod.is_pinned ? 'fill-amber-500' : ''}`} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleUnassignProduct(prod.id, prod.name)}
                                      className="p-1 text-haq-text-secondary hover:text-red-600 rounded"
                                      title="Gỡ sản phẩm khỏi tỉnh này"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <button 
                          onClick={() => handleEdit(prov)} 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200" 
                          title="Sửa thông tin tỉnh"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleActive(prov)} 
                          className="p-2 text-haq-text-secondary hover:text-haq-red rounded-lg transition-colors" 
                          title={prov.is_active ? "Đang hiện - Click để ẩn" : "Đang ẩn - Click để hiện"}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(prov.id, prov.name, prov.code)} 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cột Form chỉnh sửa / Thêm mới */}
      <div className="w-full lg:w-[420px] shrink-0">
        <form onSubmit={handleSubmit} className="bg-white border border-haq-border rounded-xl shadow-sm p-5 sticky top-4">
          <div className="flex items-center justify-between mb-4 border-b border-haq-border pb-3">
            <h2 className="font-bold text-lg text-haq-red flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {isEditing ? 'Sửa Tỉnh / Thành' : 'Thêm Tỉnh / Thành'}
            </h2>
            {isEditing && (
              <button 
                type="button" 
                onClick={resetForm} 
                className="text-xs font-semibold text-haq-text-secondary hover:text-haq-red"
              >
                + Thêm mới
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Canonical Code */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-haq-ink flex justify-between">
                <span>Canonical Code (Slug) *</span>
                <span className="text-[10px] text-haq-text-secondary">Lowercase slug chuẩn</span>
              </label>
              <input 
                required 
                type="text" 
                value={formData.code} 
                onChange={e => setFormData({ ...formData, code: e.target.value })} 
                className="w-full border border-haq-border p-2 rounded text-sm font-mono focus:border-haq-red focus:outline-none bg-haq-cream/50" 
                placeholder="vd: tayninh, haiphong, hanoi"
              />
            </div>

            {/* Tên Tỉnh / Thành */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-haq-ink">Tên Tỉnh / Thành *</label>
              <input 
                required 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                className="w-full border border-haq-border p-2 rounded text-sm focus:border-haq-red focus:outline-none" 
                placeholder="vd: Tây Ninh, Hải Phòng, Hà Nội"
              />
            </div>

            {/* Vùng miền & Thứ tự */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-haq-ink">Vùng miền *</label>
                <select 
                  value={formData.region} 
                  onChange={e => setFormData({ ...formData, region: e.target.value })} 
                  className="w-full border border-haq-border p-2 rounded text-sm bg-haq-cream/40 focus:border-haq-red focus:outline-none"
                >
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Nam">Miền Nam</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-haq-ink">Thứ tự hiển thị</label>
                <input 
                  type="number" 
                  value={formData.sort_order} 
                  onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} 
                  className="w-full border border-haq-border p-2 rounded text-sm font-mono focus:border-haq-red focus:outline-none"
                />
              </div>
            </div>

            {/* Mô tả ngắn */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-haq-ink">Mô tả ngắn (Tagline)</label>
              <input 
                type="text" 
                value={formData.short_description} 
                onChange={e => setFormData({ ...formData, short_description: e.target.value })} 
                className="w-full border border-haq-border p-2 rounded text-sm focus:border-haq-red focus:outline-none" 
                placeholder="vd: Vùng đất thánh rực rỡ với nghệ thuật bánh tráng..."
              />
            </div>

            {/* Câu chuyện đặc sản & văn hóa (Story Card) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-haq-ink flex justify-between">
                <span>Câu chuyện Văn hóa & Đặc sản (Story Card)</span>
              </label>
              <textarea 
                rows={3} 
                value={formData.description} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                className="w-full border border-haq-border p-2 rounded text-sm focus:border-haq-red focus:outline-none"
                placeholder="Mô tả di sản ẩm thực của tỉnh khi người dùng click vào bản đồ..."
              />
            </div>

            {/* Ảnh đại diện tỉnh */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-haq-ink">Ảnh đại diện tỉnh (Tùy chọn)</label>
              <div className="flex items-center gap-3">
                {imagePreview ? (
                  <div className="relative w-16 h-16 rounded border border-haq-border overflow-hidden bg-white shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-bl text-[10px]"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded border border-dashed border-haq-border bg-haq-cream/50 flex items-center justify-center text-haq-text-secondary shrink-0">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-white border border-haq-border hover:bg-haq-cream cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> Chọn ảnh tải lên
                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                  </label>
                  <p className="text-[10px] text-haq-text-secondary mt-1">Ảnh định dạng JPG, PNG, WEBP</p>
                </div>
              </div>
            </div>

            {/* Trạng thái hiển thị */}
            <label className="flex items-center gap-2 cursor-pointer mt-2 bg-haq-cream p-3 rounded-lg border border-haq-border hover:bg-haq-cream/60">
              <input 
                type="checkbox" 
                checked={formData.is_active}
                onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-haq-red rounded border-haq-border focus:ring-haq-red"
              />
              <span className="text-xs font-semibold text-haq-ink">Kích hoạt hiển thị trên Bản đồ Đặc sản</span>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button 
              type="submit" 
              disabled={isSaving}
              className="w-full bg-haq-red text-white py-2.5 rounded font-bold hover:bg-haq-red/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {isSaving ? (
                <>Đang lưu...</>
              ) : isEditing ? (
                <><Check className="w-4 h-4" /> Cập nhật Tỉnh / Thành</>
              ) : (
                <><Plus className="w-4 h-4" /> Thêm mới Tỉnh / Thành</>
              )}
            </button>

            {isEditing && (
              <button 
                type="button" 
                onClick={resetForm} 
                className="w-full bg-haq-cream border border-haq-border text-haq-ink py-2 rounded text-xs font-semibold hover:bg-haq-cream/50 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-3.5 h-3.5" /> Hủy sửa
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ======================================================== */}
      {/* MODAL [+ GÁN SẢN PHẨM VÀO TỈNH] */}
      {/* ======================================================== */}
      {assignModalProvince && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white border border-haq-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-haq-border bg-haq-cream/30 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-haq-ink flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#16A34A]" />
                  Gán sản phẩm vào: <span className="text-[#16A34A]">{assignModalProvince.name}</span>
                </h3>
                <p className="text-xs text-haq-text-secondary mt-0.5">
                  Chọn các sản phẩm thuộc tỉnh {assignModalProvince.name} ({assignModalProvince.code}) để hiển thị trên Bản đồ Đặc sản.
                </p>
              </div>
              <button 
                onClick={closeAssignModal}
                className="p-1.5 text-haq-text-secondary hover:text-haq-ink rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-4 border-b border-haq-border bg-white">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-haq-text-secondary" />
                <input 
                  type="text"
                  placeholder="Tìm kiếm sản phẩm theo tên, slug, hoặc danh mục..."
                  value={modalSearchQuery}
                  onChange={e => setModalSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-haq-border rounded-lg focus:outline-none focus:border-[#16A34A] bg-haq-cream/20"
                />
              </div>
            </div>

            {/* Modal Product Checkbox List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {modalFilteredProducts.length === 0 ? (
                <div className="text-center py-8 text-haq-text-secondary text-sm">
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
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'border-[#16A34A] bg-emerald-50/30 shadow-xs' 
                          : 'border-haq-border bg-white hover:bg-haq-cream/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button type="button" className="text-[#16A34A] shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 fill-emerald-100" />
                          ) : (
                            <Square className="w-5 h-5 text-haq-text-secondary/60" />
                          )}
                        </button>

                        {prod.images && prod.images[0] ? (
                          <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 rounded-lg object-cover border border-haq-border shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-haq-cream border border-haq-border flex items-center justify-center text-haq-text-secondary shrink-0">
                            <Package className="w-5 h-5" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm text-haq-ink truncate">{prod.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-haq-text-secondary mt-0.5">
                            <span className="font-mono text-[11px]">/{prod.slug}</span>
                            {prod.category && <span>· {prod.category}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Other province warning badge */}
                      {isBelongsToOther && otherProv && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium shrink-0 ml-2">
                          Hiện tại: {otherProv.name}
                        </span>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-haq-border bg-haq-cream/30 flex items-center justify-between gap-3">
              <span className="text-xs text-haq-text-secondary">
                Đã chọn: <strong className="text-haq-ink">{selectedProductIds.length}</strong> sản phẩm
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeAssignModal}
                  disabled={isAssigning}
                  className="px-4 py-2 rounded-lg text-xs font-semibold border border-haq-border bg-white hover:bg-haq-cream transition-colors text-haq-ink"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSaveProductAssignments}
                  disabled={isAssigning}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#16A34A] text-white hover:bg-[#13863d] transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isAssigning ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  Lưu gán sản phẩm ({selectedProductIds.length})
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
