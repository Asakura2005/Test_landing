import React, { useState, useEffect, useMemo } from 'react'
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
  Eye,
  Pencil
} from 'lucide-react'
import { uploadProductImage, deleteProductImage, getCategories, getProvinces } from '../../services/supabase'
import { PRODUCT_IMAGE_MAP } from '../../data/productCategories'

const DEFAULT_SHELF_LIFE_RECOMMENDATIONS = [
  '6 tháng',
  '9 tháng',
  '12 tháng',
  '180 ngày kể từ ngày sản xuất',
  '6-12 tháng kể từ ngày sản xuất',
  '24 tháng'
]

const DEFAULT_CERT_RECOMMENDATIONS = [
  'ISO 22000:2018',
  'HACCP',
  'OCOP 4 Sao',
  'OCOP 3 Sao',
  'VSATTP',
  'Halal',
  'FDA'
]

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
    ingredients: '',
    shelf_life: '6-12 tháng kể từ ngày sản xuất',
    certifications: 'ISO 22000:2018, HACCP, OCOP 4 Sao, VSATTP',
    box_spec: '',
    images: [],
    shopee_url: '',
    lazada_url: '',
    tiktok_url: '',
    facebook_url: '',
  })

  // Variants State (Đồng bộ chuẩn với bảng product_variants trong DB: size, img)
  const [variants, setVariants] = useState([
    { size: '100g', img: '' },
    { size: '250g', img: '' },
    { size: '500g', img: '' },
  ])

  // Variant Image Picker modal state
  const [activeVariantImageIndex, setActiveVariantImageIndex] = useState(null)
  const [variantCustomUrl, setVariantCustomUrl] = useState('')
  const [isUploadingVariantImg, setIsUploadingVariantImg] = useState(false)

  // Gallery files state
  const [galleryFiles, setGalleryFiles] = useState([])
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])

  // Recommended Shelf Life State (Lưu localStorage, cho phép thêm, sửa, xoá)
  const [shelfLifeOptions, setShelfLifeOptions] = useState(() => {
    try {
      const saved = localStorage.getItem('haq_shelf_life_recommendations')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {}
    return DEFAULT_SHELF_LIFE_RECOMMENDATIONS
  })
  const [isAddingShelfLife, setIsAddingShelfLife] = useState(false)
  const [newShelfLifeInput, setNewShelfLifeInput] = useState('')
  const [editingShelfLifeIdx, setEditingShelfLifeIdx] = useState(null)
  const [editingShelfLifeText, setEditingShelfLifeText] = useState('')

  // Recommended Certifications State (Lưu localStorage, cho phép thêm, sửa, xoá)
  const [certOptions, setCertOptions] = useState(() => {
    try {
      const saved = localStorage.getItem('haq_cert_recommendations')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {}
    return DEFAULT_CERT_RECOMMENDATIONS
  })
  const [isAddingCert, setIsAddingCert] = useState(false)
  const [newCertInput, setNewCertInput] = useState('')
  const [editingCertIdx, setEditingCertIdx] = useState(null)
  const [editingCertText, setEditingCertText] = useState('')

  const saveShelfLifeOptions = (newList) => {
    setShelfLifeOptions(newList)
    try {
      localStorage.setItem('haq_shelf_life_recommendations', JSON.stringify(newList))
    } catch (e) {}
  }

  const addShelfLifeOption = (val) => {
    const text = (typeof val === 'string' ? val : newShelfLifeInput).trim()
    if (!text) return
    if (!shelfLifeOptions.includes(text)) {
      const updated = [...shelfLifeOptions, text]
      saveShelfLifeOptions(updated)
    }
    setFormData(prev => ({ ...prev, shelf_life: text }))
    setNewShelfLifeInput('')
    setIsAddingShelfLife(false)
  }

  const updateShelfLifeOption = (index) => {
    const text = editingShelfLifeText.trim()
    if (!text) return
    const oldVal = shelfLifeOptions[index]
    const updated = [...shelfLifeOptions]
    updated[index] = text
    saveShelfLifeOptions(updated)
    setFormData(prev => ({
      ...prev,
      shelf_life: prev.shelf_life === oldVal ? text : prev.shelf_life
    }))
    setEditingShelfLifeIdx(null)
  }

  const removeShelfLifeOption = (itemToRemove) => {
    const updated = shelfLifeOptions.filter(item => item !== itemToRemove)
    saveShelfLifeOptions(updated)
  }

  const saveCertOptions = (newList) => {
    setCertOptions(newList)
    try {
      localStorage.setItem('haq_cert_recommendations', JSON.stringify(newList))
    } catch (e) {}
  }

  const addCertOption = (val) => {
    const text = (typeof val === 'string' ? val : newCertInput).trim()
    if (!text) return
    if (!certOptions.includes(text)) {
      const updated = [...certOptions, text]
      saveCertOptions(updated)
    }
    setFormData(prev => {
      const current = (prev.certifications || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
      if (!current.includes(text)) {
        return { ...prev, certifications: [...current, text].join(', ') }
      }
      return prev
    })
    setNewCertInput('')
    setIsAddingCert(false)
  }

  const updateCertOption = (index) => {
    const text = editingCertText.trim()
    if (!text) return
    const oldVal = certOptions[index]
    const updated = [...certOptions]
    updated[index] = text
    saveCertOptions(updated)
    setFormData(prev => {
      const current = (prev.certifications || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
      const mapped = current.map(c => c === oldVal ? text : c)
      return { ...prev, certifications: mapped.join(', ') }
    })
    setEditingCertIdx(null)
  }

  const removeCertOption = (itemToRemove) => {
    const updated = certOptions.filter(item => item !== itemToRemove)
    saveCertOptions(updated)
  }

  // Danh sách ảnh có sẵn để gán cho biến thể (kết hợp thư viện ảnh sản phẩm + ảnh các biến thể khác + ảnh map cục bộ)
  const availableGalleryImages = useMemo(() => {
    const list = []
    if (Array.isArray(formData.images)) {
      formData.images.forEach(img => {
        if (img && !list.includes(img)) list.push(img)
      })
    }
    variants.forEach(v => {
      if (v.img && !list.includes(v.img)) list.push(v.img)
    })
    if (formData.slug && PRODUCT_IMAGE_MAP[formData.slug]) {
      const mapped = PRODUCT_IMAGE_MAP[formData.slug]
      if (!list.includes(mapped)) list.push(mapped)
    }
    return list
  }, [formData.images, variants, formData.slug])

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
      let shopeeUrl = ''
      let lazadaUrl = ''
      let tiktokUrl = ''
      let facebookUrl = ''
      if (product.box_spec && typeof product.box_spec === 'string' && product.box_spec.trim().startsWith('{')) {
        try {
          const parsed = JSON.parse(product.box_spec)
          shopeeUrl = parsed.shopee || ''
          lazadaUrl = parsed.lazada || ''
          tiktokUrl = parsed.tiktok || ''
          facebookUrl = parsed.facebook || ''
        } catch (e) {}
      }

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
        ingredients: product.ingredients || '',
        shelf_life: product.shelf_life !== undefined && product.shelf_life !== null ? product.shelf_life : '',
        certifications: product.certifications !== undefined && product.certifications !== null ? product.certifications : '',
        box_spec: product.box_spec || '',
        images: Array.isArray(product.images) ? product.images : [],
        shopee_url: shopeeUrl,
        lazada_url: lazadaUrl,
        tiktok_url: tiktokUrl,
        facebook_url: facebookUrl,
      })
      if (product.variants && product.variants.length > 0) {
        setVariants(product.variants.map(v => ({
          id: v.id,
          size: v.size || v.name || '',
          img: v.img || ''
        })))
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
    setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v))
  }

  const addVariantRow = () => {
    setVariants([
      ...variants, 
      { size: 'Khối lượng mới', img: '' }
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
    
    if (!formData.name?.trim()) {
      alert("Vui lòng nhập Tên sản phẩm ở Tab 1 (Thông Tin Cơ Bản)!")
      setActiveModalTab('basic')
      return
    }

    const validVariants = variants.filter(v => v.size && v.size.trim() !== '')
    if (validVariants.length === 0) {
      alert("Vui lòng nhập ít nhất một quy cách/trọng lượng (ví dụ: 100g, 250g) ở Tab 2!")
      setActiveModalTab('variants')
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

      const marketplaceObj = {
        shopee: formData.shopee_url?.trim() || '',
        lazada: formData.lazada_url?.trim() || '',
        tiktok: formData.tiktok_url?.trim() || '',
        facebook: formData.facebook_url?.trim() || ''
      }

      await onSave({ 
        ...formData, 
        box_spec: JSON.stringify(marketplaceObj),
        images: finalImages, 
        highlights: cleanedHighlights 
      }, validVariants)

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
            2. Quy Cách Đóng Gói ({variants.length} quy cách)
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
                        Ghim sản phẩm nổi bật của tỉnh này
                      </div>
                      <div className="text-[10px] text-[#52665A]">Ưu tiên hiển thị đầu tiên (chủ lực) khi xem tỉnh này trên bản đồ</div>
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

              {/* LIÊN KẾT SÀN TMĐT & MẠNG XÃ HỘI */}
              <div className="pt-4 border-t border-[#D8E5DA] space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#11261B] flex items-center gap-1.5">
                    <Link className="w-3.5 h-3.5 text-[#0F5132]" />
                    Liên Kết Sàn TMĐT & Mạng Xã Hội (Shopee, Lazada, TikTok Shop, Facebook)
                  </h4>
                  <p className="text-[11px] text-[#52665A] mt-0.5">
                    Hiển thị các nút pill bên dưới mục "Khối lượng tịnh" để khách hàng bấm mua lẻ trực tiếp. (Nếu để trống hệ thống sẽ tự tìm kiếm theo tên sản phẩm)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Shopee */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold flex items-center gap-1.5 text-[#EE4D2D]">
                      <span className="w-2 h-2 rounded-full bg-[#EE4D2D]"></span>
                      Link Shopee
                    </label>
                    <input 
                      type="url" 
                      value={formData.shopee_url} 
                      onChange={e => setFormData({ ...formData, shopee_url: e.target.value })} 
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#EE4D2D]"
                      placeholder="https://shopee.vn/..." 
                    />
                  </div>

                  {/* Lazada */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold flex items-center gap-1.5 text-[#0F146D]">
                      <span className="w-2 h-2 rounded-full bg-[#0F146D]"></span>
                      Link Lazada
                    </label>
                    <input 
                      type="url" 
                      value={formData.lazada_url} 
                      onChange={e => setFormData({ ...formData, lazada_url: e.target.value })} 
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F146D]"
                      placeholder="https://www.lazada.vn/..." 
                    />
                  </div>

                  {/* TikTok Shop */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold flex items-center gap-1.5 text-black">
                      <span className="w-2 h-2 rounded-full bg-black"></span>
                      Link TikTok Shop
                    </label>
                    <input 
                      type="url" 
                      value={formData.tiktok_url} 
                      onChange={e => setFormData({ ...formData, tiktok_url: e.target.value })} 
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-black"
                      placeholder="https://www.tiktok.com/@haqfood..." 
                    />
                  </div>

                  {/* Facebook */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold flex items-center gap-1.5 text-[#1877F2]">
                      <span className="w-2 h-2 rounded-full bg-[#1877F2]"></span>
                      Link Facebook
                    </label>
                    <input 
                      type="url" 
                      value={formData.facebook_url} 
                      onChange={e => setFormData({ ...formData, facebook_url: e.target.value })} 
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#1877F2]"
                      placeholder="https://facebook.com/..." 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VARIANT PRICE MATRIX */}
          {activeModalTab === 'variants' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#11261B]">Biến Thể Khối Lượng Sản Phẩm</h3>
                  <p className="text-xs text-[#52665A]">Thêm các khối lượng (VD: 100g, 250g, 500g...) và gán ảnh riêng tương ứng</p>
                </div>
                <button
                  type="button"
                  onClick={addVariantRow}
                  className="px-3.5 py-2 rounded-xl bg-[#0F5132] text-white text-xs font-bold hover:bg-[#16A34A] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Thêm Khối Lượng
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#D8E5DA]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F4F8F4] border-b border-[#D8E5DA] text-[11px] uppercase tracking-wider text-[#52665A]">
                      <th className="p-3 font-bold w-32">Ảnh biến thể</th>
                      <th className="p-3 font-bold">Khối lượng / Kích cỡ *</th>
                      <th className="p-3 font-bold text-center w-16">Xóa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8E5DA]">
                    {variants.map((v, i) => (
                      <tr key={i} className="hover:bg-[#F4F8F4]/50 transition-colors">
                        <td className="p-2.5">
                          {v.img ? (
                            <div className="flex items-center gap-2">
                              <div 
                                onClick={() => setActiveVariantImageIndex(i)}
                                className="relative group w-11 h-11 rounded-lg border border-[#D8E5DA] bg-white overflow-hidden shrink-0 cursor-pointer shadow-2xs hover:border-[#0F5132]"
                                title="Bấm để đổi ảnh cho biến thể này"
                              >
                                <img src={v.img} alt={v.size} className="w-full h-full object-contain p-0.5" />
                                <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[9px] font-bold">
                                  Đổi
                                </div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <button
                                  type="button"
                                  onClick={() => setActiveVariantImageIndex(i)}
                                  className="text-[11px] text-[#0F5132] font-semibold hover:underline text-left cursor-pointer whitespace-nowrap"
                                >
                                  Đổi ảnh
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleVariantChange(i, 'img', '')}
                                  className="text-[10px] text-red-500 hover:underline text-left cursor-pointer whitespace-nowrap"
                                >
                                  Xóa ảnh
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setActiveVariantImageIndex(i)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-dashed border-[#0F5132]/40 hover:border-[#0F5132] text-[#0F5132] hover:bg-[#F4F8F4] text-xs font-semibold transition-all whitespace-nowrap cursor-pointer"
                              title="Gán ảnh riêng cho quy cách này"
                            >
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span>+ Gán ảnh</span>
                            </button>
                          )}
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            required
                            value={v.size || ''}
                            onChange={e => handleVariantChange(i, 'size', e.target.value)}
                            placeholder="VD: 100g, 250g, 500g, 1100g..."
                            className="w-full p-2.5 rounded-lg border border-[#D8E5DA] font-semibold text-xs bg-white focus:outline-none focus:border-[#0F5132]"
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
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Chứng nhận chất lượng</label>
                    {formData.certifications && (
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, certifications: '' }))}
                        className="text-[11px] text-red-500 hover:underline font-medium cursor-pointer"
                      >
                        Xóa trắng
                      </button>
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={formData.certifications ?? ''} 
                    onChange={e => setFormData(prev => ({ ...prev, certifications: e.target.value }))} 
                    placeholder="VD: ISO 22000:2018, HACCP, OCOP 4 Sao, VSATTP"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  />
                  {/* Quick Select & Editable Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {certOptions.map((cert, idx) => {
                      const currentList = (formData.certifications || '')
                        .split(',')
                        .map(s => s.trim())
                        .filter(Boolean)
                      const isSelected = currentList.includes(cert)

                      if (editingCertIdx === idx) {
                        return (
                          <div key={idx} className="inline-flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#0F5132] shadow-xs">
                            <input
                              type="text"
                              autoFocus
                              value={editingCertText}
                              onChange={e => setEditingCertText(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  updateCertOption(idx)
                                } else if (e.key === 'Escape') {
                                  setEditingCertIdx(null)
                                }
                              }}
                              className="px-2 py-0.5 text-[11px] w-28 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => updateCertOption(idx)}
                              className="px-2 py-0.5 bg-[#0F5132] text-white text-[10px] font-bold rounded hover:bg-[#16A34A] cursor-pointer"
                            >
                              Lưu
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingCertIdx(null)}
                              className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      }

                      return (
                        <div 
                          key={idx}
                          className={`group inline-flex items-center text-[11px] rounded-lg border transition-all ${
                            isSelected 
                              ? 'bg-[#0F5132] text-white border-[#0F5132] shadow-xs' 
                              : 'bg-white text-[#52665A] border-[#D8E5DA] hover:border-[#0F5132] hover:text-[#0F5132]'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => {
                                const current = (prev.certifications || '')
                                  .split(',')
                                  .map(s => s.trim())
                                  .filter(Boolean)
                                let updated
                                if (current.includes(cert)) {
                                  updated = current.filter(c => c !== cert)
                                } else {
                                  updated = [...current, cert]
                                }
                                return { ...prev, certifications: updated.join(', ') }
                              })
                            }}
                            className="px-2.5 py-1 font-medium cursor-pointer"
                            title={`Bấm để ${isSelected ? 'bỏ chọn' : 'thêm'} "${cert}"`}
                          >
                            {isSelected ? `✓ ${cert}` : `+ ${cert}`}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingCertIdx(idx)
                              setEditingCertText(cert)
                            }}
                            className={`px-1 py-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                              isSelected ? 'text-emerald-200 hover:text-white' : 'text-gray-400 hover:text-[#0F5132]'
                            }`}
                            title="Sửa tên chứng nhận này"
                          >
                            <Pencil className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeCertOption(cert)
                            }}
                            className={`pr-1.5 pl-0.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                              isSelected ? 'text-emerald-200 hover:text-white' : 'text-gray-400 hover:text-red-600'
                            }`}
                            title="Xóa chứng nhận này khỏi danh sách gợi ý"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )
                    })}

                    {/* Form thêm gợi ý chứng nhận mới */}
                    {isAddingCert ? (
                      <div className="inline-flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#0F5132] shadow-xs">
                        <input
                          type="text"
                          autoFocus
                          value={newCertInput}
                          onChange={e => setNewCertInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addCertOption()
                            } else if (e.key === 'Escape') {
                              setIsAddingCert(false)
                              setNewCertInput('')
                            }
                          }}
                          placeholder="VD: VietGAP, FDA..."
                          className="px-2 py-0.5 text-[11px] w-28 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => addCertOption()}
                          className="px-2 py-0.5 bg-[#0F5132] text-white text-[10px] font-bold rounded hover:bg-[#16A34A] cursor-pointer"
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingCert(false)
                            setNewCertInput('')
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingCert(true)}
                        className="text-[11px] px-2.5 py-1 rounded-lg border border-dashed border-[#0F5132]/60 text-[#0F5132] bg-[#F4F8F4]/60 hover:bg-[#F4F8F4] font-semibold transition-all flex items-center gap-1 cursor-pointer"
                        title="Thêm chứng nhận mới vào danh sách gợi ý"
                      >
                        <Plus className="w-3 h-3" /> Thêm gợi ý
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Hạn sử dụng</label>
                    {formData.shelf_life && (
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, shelf_life: '' }))}
                        className="text-[11px] text-red-500 hover:underline font-medium cursor-pointer"
                      >
                        Xóa trắng
                      </button>
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={formData.shelf_life ?? ''} 
                    onChange={e => setFormData(prev => ({ ...prev, shelf_life: e.target.value }))} 
                    placeholder="VD: 6-12 tháng kể từ ngày sản xuất"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  />
                  {/* Quick Select & Editable Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {shelfLifeOptions.map((item, idx) => {
                      const isSelected = formData.shelf_life === item

                      if (editingShelfLifeIdx === idx) {
                        return (
                          <div key={idx} className="inline-flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#0F5132] shadow-xs">
                            <input
                              type="text"
                              autoFocus
                              value={editingShelfLifeText}
                              onChange={e => setEditingShelfLifeText(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  updateShelfLifeOption(idx)
                                } else if (e.key === 'Escape') {
                                  setEditingShelfLifeIdx(null)
                                }
                              }}
                              className="px-2 py-0.5 text-[11px] w-28 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => updateShelfLifeOption(idx)}
                              className="px-2 py-0.5 bg-[#0F5132] text-white text-[10px] font-bold rounded hover:bg-[#16A34A] cursor-pointer"
                            >
                              Lưu
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingShelfLifeIdx(null)}
                              className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      }

                      return (
                        <div 
                          key={idx}
                          className={`group inline-flex items-center text-[11px] rounded-lg border transition-all ${
                            isSelected 
                              ? 'bg-[#0F5132] text-white border-[#0F5132] shadow-xs' 
                              : 'bg-white text-[#52665A] border-[#D8E5DA] hover:border-[#0F5132] hover:text-[#0F5132]'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, shelf_life: item }))}
                            className="px-2.5 py-1 font-medium cursor-pointer"
                            title={`Bấm để chọn "${item}"`}
                          >
                            {isSelected ? `✓ ${item}` : item}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingShelfLifeIdx(idx)
                              setEditingShelfLifeText(item)
                            }}
                            className={`px-1 py-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                              isSelected ? 'text-emerald-200 hover:text-white' : 'text-gray-400 hover:text-[#0F5132]'
                            }`}
                            title="Sửa mốc gợi ý này"
                          >
                            <Pencil className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeShelfLifeOption(item)
                            }}
                            className={`pr-1.5 pl-0.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                              isSelected ? 'text-emerald-200 hover:text-white' : 'text-gray-400 hover:text-red-600'
                            }`}
                            title="Xóa mốc này khỏi danh sách gợi ý"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )
                    })}

                    {/* Form thêm gợi ý hạn sử dụng mới */}
                    {isAddingShelfLife ? (
                      <div className="inline-flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#0F5132] shadow-xs">
                        <input
                          type="text"
                          autoFocus
                          value={newShelfLifeInput}
                          onChange={e => setNewShelfLifeInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addShelfLifeOption()
                            } else if (e.key === 'Escape') {
                              setIsAddingShelfLife(false)
                              setNewShelfLifeInput('')
                            }
                          }}
                          placeholder="VD: 180 ngày..."
                          className="px-2 py-0.5 text-[11px] w-24 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => addShelfLifeOption()}
                          className="px-2 py-0.5 bg-[#0F5132] text-white text-[10px] font-bold rounded hover:bg-[#16A34A] cursor-pointer"
                        >
                          Lưu
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingShelfLife(false)
                            setNewShelfLifeInput('')
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingShelfLife(true)}
                        className="text-[11px] px-2.5 py-1 rounded-lg border border-dashed border-[#0F5132]/60 text-[#0F5132] bg-[#F4F8F4]/60 hover:bg-[#F4F8F4] font-semibold transition-all flex items-center gap-1 cursor-pointer"
                        title="Thêm mốc mới vào danh sách gợi ý"
                      >
                        <Plus className="w-3 h-3" /> Thêm gợi ý
                      </button>
                    )}

                    {/* Nút lưu nhanh giá trị đang gõ vào danh sách gợi ý */}
                    {formData.shelf_life && !shelfLifeOptions.includes(formData.shelf_life.trim()) && (
                      <button
                        type="button"
                        onClick={() => addShelfLifeOption(formData.shelf_life.trim())}
                        className="text-[10px] px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 font-medium transition-all flex items-center gap-1 cursor-pointer"
                        title="Lưu giá trị đang nhập vào danh sách gợi ý"
                      >
                        <Plus className="w-2.5 h-2.5" /> Lưu "{formData.shelf_life.length > 15 ? formData.shelf_life.slice(0, 15) + '...' : formData.shelf_life}" vào gợi ý
                      </button>
                    )}
                  </div>
                </div>


                <div className="space-y-1.5 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Hướng dẫn bảo quản & Vận chuyển</label>
                    <span className="text-[11px] text-[#52665A]">Nhấn Enter để xuống dòng (mỗi dòng hiển thị một mục riêng)</span>
                  </div>
                  <textarea 
                    rows={3} 
                    value={formData.storage_guide} 
                    onChange={e => setFormData({ ...formData, storage_guide: e.target.value })} 
                    placeholder="VD:&#10;Sản phẩm nên sử dụng ngay sau khi mở bao bì.&#10;Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp&#10;Tránh côn trùng và nhiệt độ cao..." 
                    className="w-full p-4 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132] leading-relaxed resize-y"
                  />
                </div>
              </div>

              {/* Thành phần nguyên liệu */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#11261B]">Thành phần nguyên liệu</label>
                <textarea 
                  rows={3} 
                  value={formData.ingredients} 
                  onChange={e => setFormData({ ...formData, ingredients: e.target.value })} 
                  className="w-full p-4 rounded-xl border border-[#D8E5DA] bg-[#F4F8F4]/40 text-xs focus:outline-none focus:border-[#0F5132]"
                  placeholder="VD: Cốm nếp khô (65%), đường kính, đậu xanh, nước sạch, dầu thực vật, dừa sợi, nước hoa bưởi thiên nhiên..."
                />
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
              className="px-5 py-2.5 rounded-xl border border-[#D8E5DA] text-xs font-bold text-[#52665A] hover:bg-[#F4F8F4] transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#16A34A] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Đang lưu vào Cloud...' : 'Lưu Thông Tin Sản Phẩm'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal gán ảnh riêng cho biến thể / quy cách */}
      {activeVariantImageIndex !== null && variants[activeVariantImageIndex] && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn"
          onClick={() => setActiveVariantImageIndex(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-[#D8E5DA] space-y-5 animate-scaleUp font-body text-[#11261B]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D8E5DA] pb-3">
              <div>
                <h4 className="text-sm font-bold text-[#11261B] font-heading">
                  Gán ảnh cho quy cách: <span className="text-[#0F5132]">{variants[activeVariantImageIndex]?.size || `#${activeVariantImageIndex + 1}`}</span>
                </h4>
                <p className="text-[11px] text-[#52665A]">
                  Ảnh này sẽ hiển thị khi khách chọn quy cách khối lượng tương ứng
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveVariantImageIndex(null)}
                className="p-1.5 text-[#52665A] hover:text-[#11261B] hover:bg-[#F4F8F4] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Selected Preview */}
            {variants[activeVariantImageIndex]?.img && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F4F8F4] border border-[#D8E5DA]">
                <div className="w-14 h-14 rounded-lg bg-white border border-[#D8E5DA] overflow-hidden p-1 shrink-0">
                  <img 
                    src={variants[activeVariantImageIndex].img} 
                    alt="Current variant" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-[#11261B] block">Ảnh hiện tại</span>
                  <span className="text-[10px] text-[#52665A] truncate block">{variants[activeVariantImageIndex].img}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleVariantChange(activeVariantImageIndex, 'img', '')
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer"
                >
                  Gỡ ảnh
                </button>
              </div>
            )}

            {/* Option 1: Chọn từ thư viện Gallery đã tải */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#11261B] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#0F5132]" />
                1. Chọn từ thư viện ảnh ({availableGalleryImages.length} ảnh)
              </label>
              {availableGalleryImages && availableGalleryImages.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1 border border-[#D8E5DA] rounded-xl bg-[#F4F8F4]/40 custom-scrollbar">
                  {availableGalleryImages.map((imgUrl, idx) => {
                    const isSelected = variants[activeVariantImageIndex]?.img === imgUrl
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          handleVariantChange(activeVariantImageIndex, 'img', imgUrl)
                          setActiveVariantImageIndex(null)
                        }}
                        className={`relative aspect-square rounded-xl border-2 overflow-hidden group transition-all p-1 bg-white hover:border-[#0F5132] cursor-pointer ${
                          isSelected ? 'border-[#0F5132] ring-2 ring-[#0F5132]/30 shadow-xs' : 'border-[#D8E5DA]'
                        }`}
                        title="Bấm để chọn ảnh này cho quy cách"
                      >
                        <img src={imgUrl} alt={`gallery-${idx}`} className="w-full h-full object-contain" />
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-[#0F5132] text-white p-0.5 rounded-full shadow-xs">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#52665A] italic p-2 bg-[#F4F8F4] rounded-lg border border-dashed border-[#D8E5DA]">
                  Chưa có ảnh trong thư viện. Bạn có thể tải file ảnh trực tiếp bên dưới.
                </p>
              )}
            </div>

            {/* Option 2: Tải file ảnh mới từ thiết bị */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#11261B] flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#0F5132]" />
                2. Tải file ảnh mới từ thiết bị
              </label>
              <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-[#0F5132]/40 hover:border-[#0F5132] bg-[#F4F8F4]/60 hover:bg-[#F4F8F4] cursor-pointer text-xs font-bold text-[#0F5132] transition-colors">
                <Upload className="w-4 h-4" />
                <span>{isUploadingVariantImg ? 'Đang tải ảnh lên...' : 'Chọn file ảnh để tải lên cho quy cách này'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploadingVariantImg}
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0]
                      try {
                        setIsUploadingVariantImg(true)
                        const slug = formData.slug || `variant-${Date.now()}`
                        const uploadedUrl = await uploadProductImage(file, slug)
                        handleVariantChange(activeVariantImageIndex, 'img', uploadedUrl)
                        // Tự động bổ sung vào formData.images để Tab 4 cũng có ảnh này
                        if (!formData.images.includes(uploadedUrl)) {
                          setFormData(prev => ({
                            ...prev,
                            images: [...prev.images, uploadedUrl]
                          }))
                        }
                        setActiveVariantImageIndex(null)
                      } catch (err) {
                        console.error("Lỗi upload ảnh variant:", err)
                        alert("Không thể tải ảnh: " + err.message)
                      } finally {
                        setIsUploadingVariantImg(false)
                        e.target.value = ''
                      }
                    }
                  }}
                />
              </label>
            </div>

            {/* Option 3: Nhập URL ảnh */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#11261B] flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-[#0F5132]" />
                3. Hoặc nhập trực tiếp URL ảnh
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={variantCustomUrl}
                  onChange={e => setVariantCustomUrl(e.target.value)}
                  placeholder="Dán link ảnh (https://...)"
                  className="flex-1 p-2 rounded-xl border border-[#D8E5DA] text-xs bg-white focus:outline-none focus:border-[#0F5132]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!variantCustomUrl.trim()) return
                    const url = variantCustomUrl.trim()
                    handleVariantChange(activeVariantImageIndex, 'img', url)
                    if (!formData.images.includes(url)) {
                      setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, url]
                      }))
                    }
                    setVariantCustomUrl('')
                    setActiveVariantImageIndex(null)
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#0F5132] text-white text-xs font-bold hover:bg-[#16A34A] transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-[#D8E5DA] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveVariantImageIndex(null)}
                className="px-4 py-2 text-xs font-bold text-[#52665A] hover:text-[#11261B] hover:bg-[#F4F8F4] rounded-xl transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
