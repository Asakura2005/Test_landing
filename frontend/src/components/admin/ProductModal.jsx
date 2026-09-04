import React, { useState, useEffect } from 'react'
import { 
  X, 
  Plus, 
  Trash2, 
  Pin, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  Check, 
  Layers, 
  FileText, 
  Award, 
  DollarSign, 
  Sparkles,
  Link,
  ShieldCheck,
  Package,
  Save,
  HelpCircle,
  Eye
} from 'lucide-react'
import { uploadProductImage, deleteProductImage, getCategories, getProvinces } from '../../services/supabase'

export default function ProductModal({ product, onClose, onSave, currentPinnedCount = 0 }) {
  const [activeModalTab, setActiveModalTab] = useState('basic') // 'basic' | 'variants' | 'specs' | 'gallery'
  const [categories, setCategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [customImageUrl, setCustomImageUrl] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    en_name: '',
    description: '',
    tag: '',
    category: '',
    category_id: '',
    province_id: '',
    highlights: [''],
    is_pinned: false,
    is_active: true,
    storage_guide: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp',
    shelf_life: '6-12 tháng kể từ ngày sản xuất',
    certifications: 'ISO 22000:2018, HACCP, OCOP 4 Sao, VSATTP',
    box_spec: 'Thùng carton 5 lớp (50 gói/thùng), bọc màng co',
    images: [],
  })

  // Variants State
  const [variants, setVariants] = useState([
    { name: 'Gói 100g', sku: '', price: 25000, wholesale_price: 18000, unit: 'gói', weight: '100g', min_order: 50, shelf: '6 tháng' },
    { name: 'Gói 250g', sku: '', price: 55000, wholesale_price: 40000, unit: 'gói', weight: '250g', min_order: 30, shelf: '6 tháng' },
    { name: 'Thùng 5kg (Bán sỉ)', sku: '', price: 950000, wholesale_price: 720000, unit: 'thùng', weight: '5kg', min_order: 5, shelf: '12 tháng' },
  ])

  // Gallery files state
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catsData, provsData] = await Promise.all([
          getCategories().catch(() => []),
          getProvinces(true).catch(() => [])
        ])
        setCategories(catsData || [])
        setProvinces(provsData || [])
      } catch (err) {
        console.error("Lỗi tải danh mục/tỉnh thành:", err)
      }
    }
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (product) {
      setFormData({
        slug: product.slug || '',
        name: product.name || '',
        en_name: product.en_name || '',
        description: product.description || '',
        tag: product.tag || '',
        category: product.category || '',
        category_id: product.category_id || '',
        province_id: product.province_id || '',
        highlights: product.highlights?.length ? product.highlights : [''],
        is_pinned: product.is_pinned || false,
        is_active: product.is_active !== undefined ? product.is_active : true,
        storage_guide: product.storage_guide || 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp',
        shelf_life: product.shelf_life || '6-12 tháng kể từ ngày sản xuất',
        certifications: product.certifications || 'ISO 22000:2018, HACCP, OCOP 4 Sao, VSATTP',
        box_spec: product.box_spec || 'Thùng carton 5 lớp (50 gói/thùng), bọc màng co',
        images: Array.isArray(product.images) ? product.images : [],
      })
      if (product.variants && product.variants.length > 0) {
        setVariants(product.variants)
      }
    }
  }, [product])

  const generateSlug = (text) => {
    if (!text) return ''
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      slug: product ? prev.slug : generateSlug(name)
    }))
  }

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...formData.highlights]
    newHighlights[index] = value
    setFormData({ ...formData, highlights: newHighlights })
  }

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ''] })
  }

  const removeHighlight = (index) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index)
    if (newHighlights.length === 0) newHighlights.push('')
    setFormData({ ...formData, highlights: newHighlights })
  }

  // Variant operations
  const handleVariantChange = (index, field, value) => {
    const newVars = [...variants]
    newVars[index][field] = value
    setVariants(newVars)
  }

  const addVariantRow = () => {
    setVariants([
      ...variants, 
      { name: 'Quy cách mới', sku: '', price: 0, wholesale_price: 0, unit: 'gói', weight: '', min_order: 10, shelf: '6 tháng' }
    ])
  }

  const removeVariantRow = (index) => {
    if (variants.length <= 1) {
      alert("Sản phẩm cần có ít nhất một quy cách/biến thể.")
      return
    }
    setVariants(variants.filter((_, i) => i !== index))
  }

  // Gallery Handlers
  const handleGalleryFiles = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setGalleryFiles([...galleryFiles, ...files])
      const previews = files.map(f => URL.createObjectURL(f))
      setGalleryPreviews([...galleryPreviews, ...previews])
    }
  }

  const handleAddImageUrl = (e) => {
    e.preventDefault()
    if (!customImageUrl.trim()) return
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, customImageUrl.trim()]
    }))
    setCustomImageUrl('')
  }

  const removeNewGalleryImage = (index) => {
    const newFiles = [...galleryFiles]
    newFiles.splice(index, 1)
    setGalleryFiles(newFiles)

    const newPreviews = [...galleryPreviews]
    newPreviews.splice(index, 1)
    setGalleryPreviews(newPreviews)
  }

  const removeExistingGalleryImage = (index) => {
    const newImages = [...formData.images]
    const removedUrl = newImages.splice(index, 1)[0]
    setFormData({ ...formData, images: newImages })
    setImagesToDelete([...imagesToDelete, removedUrl])
  }

  const setAsThumbnail = (index) => {
    const newImages = [...formData.images]
    const [selected] = newImages.splice(index, 1)
    newImages.unshift(selected)
    setFormData({ ...formData, images: newImages })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate max 6 pins
    if (formData.is_pinned && !product?.is_pinned && currentPinnedCount >= 6) {
      alert("Không thể ghim! Bạn đã ghim tối đa 6 sản phẩm. Vui lòng bỏ ghim sản phẩm khác trước.")
      return
    }

    setIsSaving(true)
    try {
      const slug = formData.slug || `product-${Date.now()}`
      
      // Delete marked images
      for (const url of imagesToDelete) {
        await deleteProductImage(url)
      }

      // Upload new files
      const newlyUploadedUrls = []
      for (const file of galleryFiles) {
        const newUrl = await uploadProductImage(file, slug)
        newlyUploadedUrls.push(newUrl)
      }

      const finalImages = [...formData.images, ...newlyUploadedUrls]
      const cleanedHighlights = formData.highlights.filter(h => h && h.trim() !== '')

      await onSave({ 
        ...formData, 
        images: finalImages, 
        highlights: cleanedHighlights 
      }, variants)

      onClose()
    } catch (err) {
      console.error(err)
      alert("Có lỗi xảy ra khi lưu: " + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#11261B]/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl my-auto border border-[#D8E5DA] flex flex-col max-h-[92vh] overflow-hidden animate-scaleUp text-[#11261B] font-body"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#D8E5DA] flex items-center justify-between bg-[#F4F8F4]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5132] text-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/10">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold font-heading text-[#11261B]">
                {product ? `Chỉnh sửa: ${product.name}` : 'Thêm Sản Phẩm B2B Mới'}
              </h2>
              <p className="text-xs text-[#52665A]">
                Cập nhật thông số tiêu chuẩn, ma trận giá sỉ và chứng nhận xuất khẩu
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-2 text-[#52665A] hover:text-[#11261B] hover:bg-white rounded-xl transition-colors border border-transparent hover:border-[#D8E5DA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D8E5DA] bg-white px-6 gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveModalTab('basic')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeModalTab === 'basic'
                ? 'border-[#0F5132] text-[#0F5132]'
                : 'border-transparent text-[#52665A] hover:text-[#11261B]'
            }`}
          >
            <FileText className="w-4 h-4" />
            1. Thông Tin Cơ Bản
          </button>

          <button
            type="button"
            onClick={() => setActiveModalTab('variants')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeModalTab === 'variants'
                ? 'border-[#0F5132] text-[#0F5132]'
                : 'border-transparent text-[#52665A] hover:text-[#11261B]'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. Ma Trận Biến Thể & Giá Sỉ ({variants.length} SKU)
          </button>

          <button
            type="button"
            onClick={() => setActiveModalTab('specs')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeModalTab === 'specs'
                ? 'border-[#0F5132] text-[#0F5132]'
                : 'border-transparent text-[#52665A] hover:text-[#11261B]'
            }`}
          >
            <Award className="w-4 h-4" />
            3. Thông Số & Chứng Nhận (OCOP/ISO)
          </button>

          <button
            type="button"
            onClick={() => setActiveModalTab('gallery')}
            className={`py-3.5 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeModalTab === 'gallery'
                ? 'border-[#0F5132] text-[#0F5132]'
                : 'border-transparent text-[#52665A] hover:text-[#11261B]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            4. Thư Viện Ảnh ({formData.images.length + galleryFiles.length})
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: BASIC INFO */}
          {activeModalTab === 'basic' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Tên sản phẩm *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={handleNameChange} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs font-semibold focus:outline-none focus:border-[#0F5132]"
                    placeholder="VD: Bánh Tráng Phơi Sương Trảng Bàng" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Slug (Đường dẫn tĩnh SEO) *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.slug} 
                    onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 font-mono text-xs focus:outline-none focus:border-[#0F5132]"
                    placeholder="banh-trang-phoi-suong-trang-bang" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Danh mục (Category) *</label>
                  <select 
                    required 
                    value={formData.category_id || ''} 
                    onChange={e => {
                      const selectedCat = categories.find(c => c.id === e.target.value)
                      setFormData({
                        ...formData, 
                        category_id: e.target.value,
                        category: selectedCat ? selectedCat.name : ''
                      })
                    }} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs font-semibold focus:outline-none focus:border-[#0F5132]"
                  >
                    <option value="">-- Chọn Danh mục Phân Loại --</option>
                    {categories.filter(c => !c.parent_id).map(parent => (
                      <optgroup key={parent.id} label={parent.name}>
                        {categories.filter(child => child.parent_id === parent.id).map(child => (
                          <option key={child.id} value={child.id}>{child.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Tỉnh thành xuất xứ đặc sản</label>
                  <select 
                    value={formData.province_id || ''} 
                    onChange={e => setFormData({ ...formData, province_id: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs font-semibold focus:outline-none focus:border-[#0F5132]"
                  >
                    <option value="">-- Chọn Tỉnh Thành Xuất Xứ --</option>
                    {provinces.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.region || 'Đặc sản'})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Tag Nổi Bật (Huy hiệu)</label>
                  <input 
                    type="text" 
                    value={formData.tag} 
                    onChange={e => setFormData({ ...formData, tag: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                    placeholder="VD: OCOP 4 Sao, Bán chạy, Xuất khẩu EU" 
                  />
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 cursor-pointer hover:bg-emerald-50/50 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.is_pinned} 
                      onChange={e => setFormData({ ...formData, is_pinned: e.target.checked })} 
                      className="w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-[#11261B] flex items-center gap-1.5">
                        <Pin className="w-3.5 h-3.5 text-[#C89B3C] fill-[#C89B3C]" />
                        Ghim nổi bật TOP 6 trang chủ
                      </div>
                      <div className="text-[10px] text-[#52665A]">Hiện tại đã ghim: {currentPinnedCount}/6 sản phẩm</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Mô tả tổng quan sản phẩm</label>
                <textarea 
                  rows={4} 
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  className="w-full p-4 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  placeholder="Giới thiệu về nguồn gốc nguyên liệu, hương vị đặc trưng và lợi thế khi kinh doanh phân phối sỉ..."
                />
              </div>
            </div>
          )}

          {/* TAB 2: VARIANT PRICE MATRIX */}
          {activeModalTab === 'variants' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#11261B]">Ma Trận Quy Cách Đóng Gói & Giá Sỉ B2B</h3>
                  <p className="text-xs text-[#52665A]">Hỗ trợ nhiều phân loại: Túi 100g, Hũ 250g, Thùng carton 5kg cho đại lý</p>
                </div>
                <button
                  type="button"
                  onClick={addVariantRow}
                  className="px-3.5 py-2 rounded-xl bg-[#0F5132] text-white text-xs font-bold hover:bg-[#16A34A] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Thêm Quy Cách / SKU
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#D8E5DA]">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F4F8F4] border-b border-[#D8E5DA] text-[11px] uppercase tracking-wider text-[#52665A]">
                      <th className="p-3 font-bold">Tên Quy Cách / Trọng Lượng</th>
                      <th className="p-3 font-bold">Mã SKU</th>
                      <th className="p-3 font-bold">Giá Lẻ Tham Chiếu</th>
                      <th className="p-3 font-bold">Giá Sỉ Đại Lý</th>
                      <th className="p-3 font-bold">Đơn Vị</th>
                      <th className="p-3 font-bold">MOQ (Đơn Tối Thiểu)</th>
                      <th className="p-3 font-bold text-center">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8E5DA]">
                    {variants.map((v, i) => (
                      <tr key={i} className="hover:bg-[#F4F8F4]/50 transition-colors">
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={v.name || ''}
                            onChange={e => handleVariantChange(i, 'name', e.target.value)}
                            placeholder="Gói 250g"
                            className="w-full p-2 rounded-lg border border-[#D8E5DA] font-semibold text-xs bg-white focus:outline-none focus:border-[#0F5132]"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={v.sku || ''}
                            onChange={e => handleVariantChange(i, 'sku', e.target.value)}
                            placeholder="HAQ-BT-250"
                            className="w-28 p-2 rounded-lg border border-[#D8E5DA] font-mono text-xs bg-white focus:outline-none focus:border-[#0F5132]"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="number"
                            value={v.price || ''}
                            onChange={e => handleVariantChange(i, 'price', Number(e.target.value))}
                            className="w-24 p-2 rounded-lg border border-[#D8E5DA] font-mono text-xs bg-white focus:outline-none focus:border-[#0F5132]"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="number"
                            value={v.wholesale_price || ''}
                            onChange={e => handleVariantChange(i, 'wholesale_price', Number(e.target.value))}
                            className="w-24 p-2 rounded-lg border border-[#D8E5DA] font-mono text-xs font-bold text-[#0F5132] bg-white focus:outline-none focus:border-[#0F5132]"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={v.unit || 'gói'}
                            onChange={e => handleVariantChange(i, 'unit', e.target.value)}
                            className="w-16 p-2 rounded-lg border border-[#D8E5DA] text-xs bg-white text-center focus:outline-none focus:border-[#0F5132]"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="number"
                            value={v.min_order || 10}
                            onChange={e => handleVariantChange(i, 'min_order', Number(e.target.value))}
                            className="w-20 p-2 rounded-lg border border-[#D8E5DA] font-mono text-xs bg-white focus:outline-none focus:border-[#0F5132]"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => removeVariantRow(i)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SPECS & CERTIFICATIONS */}
          {activeModalTab === 'specs' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Chứng nhận chất lượng</label>
                  <input 
                    type="text" 
                    value={formData.certifications} 
                    onChange={e => setFormData({ ...formData, certifications: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Hạn sử dụng</label>
                  <input 
                    type="text" 
                    value={formData.shelf_life} 
                    onChange={e => setFormData({ ...formData, shelf_life: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Quy cách đóng thùng B2B</label>
                  <input 
                    type="text" 
                    value={formData.box_spec} 
                    onChange={e => setFormData({ ...formData, box_spec: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Hướng dẫn bảo quản & Vận chuyển</label>
                  <input 
                    type="text" 
                    value={formData.storage_guide} 
                    onChange={e => setFormData({ ...formData, storage_guide: e.target.value })} 
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  />
                </div>
              </div>

              {/* USP Highlights List */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Điểm nổi bật (USP Bullet Points)</label>
                  <button type="button" onClick={addHighlight} className="text-xs font-bold text-[#0F5132] hover:underline flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Thêm điểm nổi bật
                  </button>
                </div>
                {formData.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={h} 
                      onChange={e => handleHighlightChange(i, e.target.value)} 
                      placeholder="VD: Không chất bảo quản, 100% nguyên liệu tự nhiên" 
                      className="flex-1 px-4 py-2 rounded-xl border border-[#D8E5DA] text-xs bg-[#F4F8F4]/40 focus:outline-none focus:border-[#0F5132]"
                    />
                    <button type="button" onClick={() => removeHighlight(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: IMAGE GALLERY */}
          {activeModalTab === 'gallery' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Add image by URL */}
              <div className="p-4 rounded-2xl border border-[#D8E5DA] bg-[#F4F8F4]/40 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="url"
                  placeholder="Dán đường dẫn ảnh trực tiếp (https://...)"
                  value={customImageUrl}
                  onChange={e => setCustomImageUrl(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-[#D8E5DA] bg-white text-xs focus:outline-none focus:border-[#0F5132]"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-[#0F5132] text-white text-xs font-bold rounded-xl hover:bg-[#16A34A] transition-colors"
                >
                  Thêm URL Ảnh
                </button>
              </div>

              {/* Upload local files */}
              <div>
                <label className="border-2 border-dashed border-[#D8E5DA] hover:border-[#0F5132] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-white transition-colors">
                  <Upload className="w-8 h-8 text-[#0F5132] mb-2" />
                  <span className="text-xs font-bold text-[#11261B]">Tải ảnh từ máy tính lên Cloud</span>
                  <span className="text-[10px] text-[#52665A] mt-1">Hỗ trợ JPG, PNG, WEBP độ phân giải cao</span>
                  <input type="file" multiple accept="image/*" onChange={handleGalleryFiles} className="hidden" />
                </label>
              </div>

              {/* Image list preview */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#11261B]">Danh sách ảnh sản phẩm (Kéo hoặc bấm để chọn ảnh đại diện)</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} className="relative group rounded-2xl border border-[#D8E5DA] overflow-hidden bg-white aspect-square shadow-sm">
                      <img src={imgUrl} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute top-2 left-2 bg-[#0F5132] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">
                          Ảnh Đại Diện
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsThumbnail(idx)}
                            className="p-2 bg-white text-[#0F5132] rounded-lg text-xs font-bold hover:bg-emerald-50"
                            title="Đặt làm ảnh chính"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeExistingGalleryImage(idx)}
                          className="p-2 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
                          title="Xóa ảnh"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {galleryPreviews.map((previewUrl, idx) => (
                    <div key={`new-${idx}`} className="relative group rounded-2xl border border-emerald-300 overflow-hidden bg-white aspect-square shadow-sm">
                      <img src={previewUrl} alt={`New upload ${idx}`} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        Ảnh Mới Tải
                      </span>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeNewGalleryImage(idx)}
                          className="p-2 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Drawer Footer Buttons */}
          <div className="pt-4 border-t border-[#D8E5DA] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#D8E5DA] text-xs font-bold text-[#52665A] hover:bg-[#F4F8F4] transition-colors"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#16A34A] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Đang lưu vào Cloud...' : 'Lưu Thông Tin Sản Phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
