import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Check, X, RefreshCw, ChevronRight } from 'lucide-react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/supabase'

export default function CategoryManager({ products = [] }) {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sort_order: 0,
    is_active: true,
    parent_id: '',
    description: ''
  })
  
  const [isSubCategory, setIsSubCategory] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const data = await getCategories()
      setCategories(data || [])
    } catch (err) {
      console.error(err)
      alert("Lỗi tải danh mục: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

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

  const ensureUniqueSlug = (baseSlug, currentId = null) => {
    let cleanSlug = generateSlug(baseSlug) || 'danh-muc'
    let uniqueSlug = cleanSlug
    let counter = 1
    
    // Check if another category (excluding the current one being edited) already has this slug
    while (categories.some(c => c.slug === uniqueSlug && c.id !== currentId)) {
      uniqueSlug = `${cleanSlug}-${counter}`
      counter++
    }
    return uniqueSlug
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      sort_order: categories.length,
      is_active: true,
      parent_id: '',
      description: ''
    })
    setIsEditing(null)
    setIsSubCategory(false)
  }

  const handleEdit = (category) => {
    setIsEditing(category.id)
    setIsSubCategory(!!category.parent_id)
    setFormData({
      name: category.name,
      slug: category.slug,
      sort_order: category.sort_order,
      is_active: category.is_active,
      parent_id: category.parent_id || '',
      description: category.description || ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.name.trim()) {
        alert("Vui lòng nhập tên danh mục!")
        return
      }

      // Auto ensure unique slug and valid format
      const finalSlug = ensureUniqueSlug(formData.slug || formData.name, isEditing)

      const payload = {
        name: formData.name.trim(),
        slug: finalSlug,
        sort_order: Number(formData.sort_order) || 0,
        is_active: formData.is_active,
        parent_id: isSubCategory && formData.parent_id ? formData.parent_id : null,
        description: !isSubCategory ? (formData.description || null) : null
      }

      if (isEditing) {
        await updateCategory(isEditing, payload)
      } else {
        await createCategory(payload)
      }
      await fetchCategories()
      resetForm()
    } catch (err) {
      if (err.message && err.message.includes('categories_slug_key')) {
        alert("Đường dẫn (slug) này đã bị trùng với một danh mục khác. Vui lòng kiểm tra lại slug.")
      } else {
        alert("Lỗi khi lưu: " + err.message)
      }
    }
  }

  const handleDelete = async (id, name, isParent) => {
    if (isParent) {
      const hasChildren = categories.some(c => c.parent_id === id)
      if (hasChildren) {
        alert(`Mục lớn "${name}" đang có các mục nhỏ.\n\nVui lòng xoá hoặc di chuyển các mục nhỏ trước khi xoá mục lớn này.`)
        return
      }
    }

    const productsInCat = products.filter(p => p.category_id === id)
    if (productsInCat.length > 0) {
      alert(`Danh mục "${name}" đang có ${productsInCat.length} sản phẩm.\n\nVui lòng chuyển sản phẩm sang danh mục khác hoặc TẮT TRẠNG THÁI (Ngừng hiển thị) thay vì xóa.`)
      return
    }

    if (!window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) return

    try {
      await deleteCategory(id)
      await fetchCategories()
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  const toggleActive = async (category) => {
    try {
      await updateCategory(category.id, { is_active: !category.is_active })
      await fetchCategories()
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái: " + err.message)
    }
  }

  const parentCategories = categories.filter(c => !c.parent_id)
  
  // Xây dựng cây danh mục để hiển thị
  const categoryTree = parentCategories.map(parent => ({
    ...parent,
    children: categories.filter(c => c.parent_id === parent.id).sort((a,b) => a.sort_order - b.sort_order)
  })).sort((a,b) => a.sort_order - b.sort_order)


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-haq-ink/50">
        <RefreshCw className="w-8 h-8 animate-spin mb-4 text-haq-orange" />
        <p>Đang tải danh mục...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 h-full overflow-y-auto bg-haq-cream">
      {/* Cột Danh sách */}
      <div className="flex-1 bg-white border border-haq-border rounded-xl shadow-sm overflow-hidden flex flex-col min-w-0">
        <div className="p-4 border-b border-haq-border bg-white flex justify-between items-center sticky top-0 z-10">
          <h2 className="font-bold text-lg text-haq-ink">Cây Danh mục</h2>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {categories.length === 0 ? (
            <div className="p-8 text-center text-haq-text-secondary border-2 border-dashed border-haq-border rounded-xl">
              Chưa có danh mục nào. Hãy thêm Mục Lớn đầu tiên.
            </div>
          ) : (
            <div className="space-y-4">
              {categoryTree.map(parent => (
                <div key={parent.id} className="border border-haq-border rounded-xl overflow-hidden bg-white shadow-sm">
                  {/* Parent Row */}
                  <div className="flex items-center justify-between p-4 bg-haq-cream/30 border-b border-haq-border hover:bg-haq-cream/60 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-haq-cream px-2 py-0.5 rounded text-haq-ink/70 border border-haq-border">{parent.sort_order}</span>
                        <h3 className="font-bold text-lg text-haq-ink truncate">{parent.name}</h3>
                        {!parent.is_active && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">ẨN</span>}
                      </div>
                      <p className="text-xs text-haq-text-secondary mt-1 truncate">{parent.slug}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-xs font-semibold text-haq-text-secondary hidden md:inline">Mục lớn</span>
                      <button onClick={() => toggleActive(parent)} className="p-2 text-haq-text-secondary hover:text-haq-red rounded transition-colors" title={parent.is_active ? "Đang hiện - Click để ẩn" : "Đang ẩn - Click để hiện"}>
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEdit(parent)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Sửa">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(parent.id, parent.name, true)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Children Rows */}
                  {parent.children.length > 0 && (
                    <div className="divide-y divide-haq-border">
                      {parent.children.map(child => {
                        const productCount = products.filter(p => p.category_id === child.id).length;
                        return (
                          <div key={child.id} className="flex items-center justify-between p-3 pl-10 hover:bg-haq-cream/30 transition-colors group">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <ChevronRight className="w-4 h-4 text-haq-border" />
                              <span className="font-mono text-xs text-haq-text-secondary">{child.sort_order}</span>
                              <div className="flex flex-col">
                                <span className="font-semibold text-haq-ink text-sm">{child.name}</span>
                                <span className="text-[10px] text-haq-text-secondary">{child.slug}</span>
                              </div>
                              {!child.is_active && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold ml-2">ẨN</span>}
                            </div>
                            <div className="flex items-center gap-3 ml-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="inline-block bg-haq-cream border border-haq-border text-haq-ink font-bold text-xs px-2 py-1 rounded" title={`${productCount} sản phẩm`}>
                                {productCount} sp
                              </span>
                              <button onClick={() => toggleActive(child)} className="p-1.5 text-haq-text-secondary hover:text-haq-red rounded transition-colors">
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleEdit(child)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDelete(child.id, child.name, false)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {parent.children.length === 0 && (
                    <div className="p-3 pl-12 text-xs text-haq-text-secondary italic bg-haq-cream/20">
                      Chưa có mục nhỏ nào.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cột Form */}
      <div className="w-full lg:w-96 shrink-0">
        <form onSubmit={handleSubmit} className="bg-white border border-haq-border rounded-xl shadow-sm p-5 sticky top-4">
          <div className="flex items-center justify-between mb-4 border-b border-haq-border pb-3">
            <h2 className="font-bold text-lg text-haq-red">
              {isEditing ? 'Sửa Danh mục' : 'Thêm Danh mục mới'}
            </h2>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setIsSubCategory(false)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${!isSubCategory ? 'bg-haq-ink text-white' : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/60'}`}
              >
                Mục Lớn
              </button>
              <button 
                type="button"
                onClick={() => setIsSubCategory(true)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${isSubCategory ? 'bg-haq-ink text-white' : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/60'}`}
              >
                Mục Nhỏ
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {isSubCategory && (
              <div className="space-y-1">
                <label className="text-sm font-semibold">Thuộc Mục Lớn *</label>
                <select 
                  required 
                  value={formData.parent_id} 
                  onChange={e => setFormData({...formData, parent_id: e.target.value})} 
                  className="w-full border border-haq-border p-2.5 rounded text-sm focus:border-haq-red focus:outline-none bg-haq-cream"
                >
                  <option value="">-- Chọn Mục Lớn --</option>
                  {parentCategories.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold">Tên danh mục *</label>
              <input required type="text" value={formData.name} onChange={handleNameChange} className="w-full border border-haq-border p-2.5 rounded text-sm focus:border-haq-red focus:outline-none" placeholder="VD: Bánh Truyền Thống" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold">Slug (Đường dẫn) *</label>
              <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border border-haq-border p-2.5 rounded text-sm focus:border-haq-red focus:outline-none" placeholder="banh-truyen-thong" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold">Thứ tự hiển thị</label>
              <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} className="w-full border border-haq-border p-2.5 rounded text-sm focus:border-haq-red focus:outline-none" />
              <p className="text-[11px] text-haq-text-secondary mt-1 font-mono">Số nhỏ xếp trước.</p>
            </div>

            {!isSubCategory && (
              <div className="space-y-1">
                <label className="text-sm font-semibold">Câu chuyện / Mô tả (Cho Banner)</label>
                <textarea 
                  rows={4} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="w-full border border-haq-border p-2.5 rounded text-sm focus:border-haq-red focus:outline-none"
                  placeholder="Kế thừa di sản ẩm thực bánh kẹo truyền thống..."
                />
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer mt-4 bg-haq-cream p-3 rounded-lg border border-haq-border hover:bg-haq-cream/50">
              <input 
                type="checkbox" 
                checked={formData.is_active}
                onChange={e => setFormData({...formData, is_active: e.target.checked})}
                className="w-4 h-4 text-haq-red rounded border-haq-border focus:ring-haq-red"
              />
              <span className="text-sm font-semibold text-haq-ink">Hiển thị trên Website</span>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button type="submit" className="w-full bg-haq-red text-white py-2.5 rounded font-bold hover:bg-haq-red/90 transition-colors flex items-center justify-center gap-2">
              {isEditing ? <><Check className="w-4 h-4" /> Cập nhật</> : <><Plus className="w-4 h-4" /> Thêm mới</>}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="w-full bg-haq-cream border border-haq-border text-haq-ink py-2.5 rounded font-semibold hover:bg-haq-cream/50 transition-colors flex items-center justify-center gap-2">
                <X className="w-4 h-4" /> Hủy sửa
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
