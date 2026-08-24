import React, { useState, useEffect } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'

export default function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    en_name: '',
    description: '',
    tag: '',
    highlights: [''],
  })
  const [variants, setVariants] = useState([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        slug: product.slug || '',
        name: product.name || '',
        en_name: product.en_name || '',
        description: product.description || '',
        tag: product.tag || '',
        highlights: product.highlights?.length ? product.highlights : [''],
      })
      setVariants(product.variants || [])
    }
  }, [product])

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
    setVariants([...variants, { size: '', img: '', shelf: '', pack: '', moq: '' }])
  }

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Clean up highlights
      const cleanedHighlights = formData.highlights.filter(h => h.trim() !== '')
      await onSave({ ...formData, highlights: cleanedHighlights }, variants)
    } catch (err) {
      console.error(err)
      alert("Có lỗi xảy ra khi lưu: " + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-auto">
        <div className="flex items-center justify-between p-6 border-b border-black/10">
          <h2 className="text-2xl font-bold">{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-8">
          
          {/* Thông tin chung */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-haq-orange">1. Thông tin chung</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold">Tên sản phẩm *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-black/20 p-2 rounded" placeholder="Bánh Tráng Trộn" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Slug (URL) *</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-black/20 p-2 rounded" placeholder="banh-trang-tron" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Tên tiếng Anh (Tùy chọn)</label>
                <input type="text" value={formData.en_name} onChange={e => setFormData({...formData, en_name: e.target.value})} className="w-full border border-black/20 p-2 rounded" placeholder="Mixed Rice Paper" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold">Tag nổi bật (Tùy chọn)</label>
                <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full border border-black/20 p-2 rounded" placeholder="Best Seller" />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-sm font-semibold">Mô tả</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-black/20 p-2 rounded" />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-haq-orange">2. Điểm nổi bật (Highlights)</h3>
            <div className="space-y-3">
              {formData.highlights.map((hl, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={hl} onChange={e => handleHighlightChange(index, e.target.value)} className="flex-1 border border-black/20 p-2 rounded" placeholder="Ví dụ: Vị truyền thống" />
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
            <h3 className="font-bold text-lg mb-4 text-haq-orange">3. Quy cách & Đóng gói (Variants)</h3>
            <div className="space-y-6">
              {variants.map((v, index) => (
                <div key={index} className="border border-black/10 bg-haq-bone/30 p-4 rounded-lg relative">
                  <button type="button" onClick={() => removeVariant(index)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mr-8">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Kích cỡ (vd: 250g)</label>
                      <input required type="text" value={v.size} onChange={e => handleVariantChange(index, 'size', e.target.value)} className="w-full border border-black/20 p-2 rounded text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Đóng gói (vd: Hũ nhựa)</label>
                      <input type="text" value={v.pack} onChange={e => handleVariantChange(index, 'pack', e.target.value)} className="w-full border border-black/20 p-2 rounded text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Hạn sử dụng (vd: 6 tháng)</label>
                      <input type="text" value={v.shelf} onChange={e => handleVariantChange(index, 'shelf', e.target.value)} className="w-full border border-black/20 p-2 rounded text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">MOQ (vd: 50 thùng)</label>
                      <input type="text" value={v.moq} onChange={e => handleVariantChange(index, 'moq', e.target.value)} className="w-full border border-black/20 p-2 rounded text-sm" />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs font-semibold">Link Hình ảnh (URL)</label>
                      <input type="url" value={v.img} onChange={e => handleVariantChange(index, 'img', e.target.value)} className="w-full border border-black/20 p-2 rounded text-sm" placeholder="https://..." />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addVariant} className="text-sm flex items-center gap-1 text-haq-red font-semibold hover:underline">
                <Plus className="w-4 h-4" /> Thêm quy cách đóng gói
              </button>
            </div>
          </div>

        </form>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-black/10 bg-haq-bone">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded font-semibold text-haq-ink hover:bg-black/5">
            Hủy
          </button>
          <button onClick={handleSubmit} disabled={isSaving} className="px-6 py-2 rounded font-semibold bg-haq-red text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
            {isSaving ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>
    </div>
  )
}
