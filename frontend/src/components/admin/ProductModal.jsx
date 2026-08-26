import React, { useState, useEffect } from 'react'
import { X, Plus, Trash2, Pin, Upload, Image as ImageIcon } from 'lucide-react'
import { uploadProductImage, deleteProductImage, getCategories } from '../../services/supabase'

export default function ProductModal({ product, onClose, onSave, currentPinnedCount }) {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    en_name: '',
    description: '',
    tag: '',
    category: '', // for backward compatibility
    category_id: '',
    highlights: [''],
    is_pinned: false,
    images: [], // Global gallery
  })
  const [variants, setVariants] = useState([])
  const [galleryFiles, setGalleryFiles] = useState([]) // Files to be uploaded
  const [galleryPreviews, setGalleryPreviews] = useState([]) // URLs for preview
  const [imagesToDelete, setImagesToDelete] = useState([]) // URLs of old images to delete
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories()
        setCategories(data || [])
      } catch (err) {
        console.error("Lỗi tải danh mục:", err)
      }
    }
    fetchCats()
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
        highlights: product.highlights?.length ? product.highlights : [''],
        is_pinned: product.is_pinned || false,
        images: product.images || [],
      })
      setVariants(product.variants || [])
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

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants]
    newVariants[index][field] = value
    setVariants(newVariants)
  }

  const addVariant = () => {
    setVariants([...variants, { size: '', pack: '', shelf: '', moq: '' }])
  }

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  // --- Gallery Handlers ---
  const handleGalleryFiles = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setGalleryFiles([...galleryFiles, ...files])
      
      const previews = files.map(f => URL.createObjectURL(f))
      setGalleryPreviews([...galleryPreviews, ...previews])
    }
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
  // ------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate pinned count locally before sending to Admin
    if (formData.is_pinned && !product?.is_pinned && currentPinnedCount >= 6) {
      alert("Không thể ghim! Bạn đã ghim tối đa 6 sản phẩm. Vui lòng bỏ ghim sản phẩm khác trước.")
      return
    }

    setIsSaving(true)
    try {
      const slug = formData.slug || `product-${Date.now()}`
      
      // Xóa ảnh cũ bị đánh dấu xóa
      for (const url of imagesToDelete) {
        await deleteProductImage(url)
      }

      // Upload ảnh mới
      const newlyUploadedUrls = []
      for (const file of galleryFiles) {
        const newUrl = await uploadProductImage(file, slug)
        newlyUploadedUrls.push(newUrl)
      }

      // Gộp ảnh cũ còn giữ lại và ảnh mới
      const finalImages = [...formData.images, ...newlyUploadedUrls]

      const cleanedHighlights = formData.highlights.filter(h => h.trim() !== '')
      
      // Cleanup variants by removing old img if any still exists in local state
      const cleanedVariants = variants.map(v => {
        const { img, imgPreview, ...rest } = v
        return rest
      })

      await onSave({ ...formData, images: finalImages, highlights: cleanedHighlights }, cleanedVariants)
    } catch (err) {
      console.error(err)
      alert("Có lỗi xảy ra khi lưu: " + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-auto">
        <div className="flex items-center justify-between p-6 border-b border-haq-border">
          <h2 className="text-2xl font-bold">{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-8">
          
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Cột Trái: Thông tin chung & Gallery */}
            <div className="space-y-8">
              {/* Thông tin chung */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-haq-orange">1. Thông tin cơ bản</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Tên sản phẩm *</label>
                    <input required type="text" value={formData.name} onChange={handleNameChange} className="w-full border border-haq-border p-2 rounded" placeholder="Bánh Tráng Trộn" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Slug (URL) *</label>
                    <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-haq-border p-2 rounded" placeholder="banh-trang-tron" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Tên tiếng Anh (Tùy chọn)</label>
                    <input type="text" value={formData.en_name} onChange={e => setFormData({...formData, en_name: e.target.value})} className="w-full border border-haq-border p-2 rounded" placeholder="Mixed Rice Paper" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Danh mục (Category) *</label>
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
                      className="w-full border border-haq-border p-2 rounded bg-haq-cream"
                    >
                      <option value="">-- Chọn Danh mục (Mục Nhỏ) --</option>
                      {categories.filter(c => !c.parent_id).map(parent => (
                        <optgroup key={parent.id} label={`${parent.name} ${!parent.is_active ? '(Đang ẩn)' : ''}`}>
                          {categories.filter(child => child.parent_id === parent.id).map(child => (
                            <option key={child.id} value={child.id}>
                              {child.name} {!child.is_active ? '(Đang ẩn)' : ''}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Tag nổi bật (Tùy chọn)</label>
                    <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full border border-haq-border p-2 rounded" placeholder="Best Seller" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Mô tả</label>
                    <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-haq-border p-2 rounded" />
                  </div>
                  
                  <label className="flex items-center gap-2 bg-haq-cream px-4 py-3 rounded-lg cursor-pointer hover:bg-haq-cream/60 transition-colors border border-haq-border">
                    <input 
                      type="checkbox" 
                      checked={formData.is_pinned}
                      onChange={(e) => setFormData({...formData, is_pinned: e.target.checked})}
                      className="w-4 h-4 text-haq-red rounded border-haq-border focus:ring-haq-red"
                    />
                    <Pin className={`w-4 h-4 ${formData.is_pinned ? 'text-haq-red fill-haq-red' : 'text-haq-text-secondary/50'}`} />
                    <span className="text-sm font-semibold text-haq-ink">Ghim ra Trang chủ (Tối đa 6 sản phẩm)</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Cột Phải: Highlights & Variants */}
            <div className="space-y-8">
              
              {/* Thư viện ảnh chung */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-haq-red flex items-center gap-2">
                  <ImageIcon className="w-5 h-5"/> 2. Thư viện ảnh
                </h3>
                <div className="border border-haq-border p-4 rounded-lg bg-haq-cream/30">
                  
                  {/* Grid ảnh đã upload & Preview ảnh mới */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                    {/* Ảnh cũ từ DB */}
                    {formData.images.map((url, idx) => (
                      <div key={`old-${idx}`} className="relative aspect-square rounded-md overflow-hidden border border-haq-border bg-white group">
                        <img src={url} alt={`img-${idx}`} className="w-full h-full object-contain" />
                        <button type="button" onClick={() => removeExistingGalleryImage(idx)} className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {/* Ảnh mới đang preview */}
                    {galleryPreviews.map((url, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-md overflow-hidden border-2 border-haq-red/50 bg-white group">
                        <span className="absolute top-0 left-0 bg-haq-red text-white text-[10px] font-bold px-1 rounded-br z-10">NEW</span>
                        <img src={url} alt={`new-img-${idx}`} className="w-full h-full object-contain" />
                        <button type="button" onClick={() => removeNewGalleryImage(idx)} className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded hover:bg-red-50 shadow-sm z-10">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Nút Upload */}
                    <label className="aspect-square rounded-md border-2 border-dashed border-haq-border bg-white hover:bg-haq-cream/40 cursor-pointer flex flex-col items-center justify-center text-haq-text-secondary transition-colors">
                      <Upload className="w-6 h-6 mb-1" />
                      <span className="text-xs font-semibold">Tải ảnh</span>
                      <input type="file" multiple accept="image/*" onChange={handleGalleryFiles} className="hidden" />
                    </label>
                  </div>
                  <p className="text-xs text-haq-text-secondary italic">Bạn có thể chọn nhiều ảnh cùng lúc. Ảnh đầu tiên sẽ làm ảnh đại diện chính.</p>
                </div>
              </div>

              {/* Điểm nổi bật */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-haq-red">3. Điểm nổi bật (Highlights)</h3>
                <div className="space-y-3">
                  {formData.highlights.map((hl, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" value={hl} onChange={e => handleHighlightChange(index, e.target.value)} className="flex-1 border border-haq-border p-2 rounded" placeholder="Ví dụ: Vị gà lá chanh" />
                      <button type="button" onClick={() => removeHighlight(index)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addHighlight} className="text-sm flex items-center gap-1 text-haq-red font-semibold hover:underline">
                    <Plus className="w-4 h-4" /> Thêm điểm nổi bật
                  </button>
                </div>
              </div>

              {/* Variants */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-haq-red">4. Quy cách đóng gói (Variants)</h3>
                <div className="space-y-4">
                  {variants.map((v, index) => (
                    <div key={index} className="border border-haq-border bg-haq-cream/30 p-4 rounded-lg relative">
                      <button type="button" onClick={() => removeVariant(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1.5 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-2 gap-3 mr-6">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Kích cỡ (vd: 250g)</label>
                          <input required type="text" value={v.size} onChange={e => handleVariantChange(index, 'size', e.target.value)} className="w-full border border-haq-border p-2 rounded text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Đóng gói (vd: Hũ nhựa)</label>
                          <input type="text" value={v.pack} onChange={e => handleVariantChange(index, 'pack', e.target.value)} className="w-full border border-haq-border p-2 rounded text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">Hạn sử dụng (vd: 6 tháng)</label>
                          <input type="text" value={v.shelf} onChange={e => handleVariantChange(index, 'shelf', e.target.value)} className="w-full border border-haq-border p-2 rounded text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold">MOQ (vd: 50 thùng)</label>
                          <input type="text" value={v.moq} onChange={e => handleVariantChange(index, 'moq', e.target.value)} className="w-full border border-haq-border p-2 rounded text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addVariant} className="text-sm flex items-center gap-1 text-haq-red font-semibold hover:underline">
                    <Plus className="w-4 h-4" /> Thêm quy cách đóng gói
                  </button>
                </div>
              </div>

            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-haq-border bg-haq-cream rounded-b-xl">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded font-semibold text-haq-ink hover:bg-black/5">
            Hủy
          </button>
          <button onClick={handleSubmit} disabled={isSaving} className="px-8 py-2.5 rounded font-bold bg-haq-red text-white hover:bg-haq-red/90 disabled:opacity-50 flex items-center gap-2 shadow-md">
            {isSaving ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>
    </div>
  )
}
