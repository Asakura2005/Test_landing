import React, { useState, useEffect, useMemo } from 'react'
import { Plus, Edit2, Trash2, Check, X, RefreshCw, ChevronRight, ChevronDown, Folder, Layers, Search, MapPin, Package } from 'lucide-react'
import { getCategories, createCategory, updateCategory, deleteCategory, getProvinces } from '../../services/supabase'

export default function CategoryManager({ products = [] }) {
  const [categories, setCategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('categories') // 'categories' | 'regions'
  const [searchQuery, setSearchQuery] = useState('')
  const [collapsedParents, setCollapsedParents] = useState({})
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sort_order: 0,
    is_active: true,
    parent_id: '',
    description: ''
  })
  
  const [isSubCategory, setIsSubCategory] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [catData, provData] = await Promise.all([
        getCategories(),
        getProvinces(false)
      ])
      setCategories(catData || [])
      setProvinces(provData || [])
    } catch (err) {
      console.error(err)
      alert("Lỗi tải danh mục / vùng miền: " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
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

  const handleOpenAdd = (parentCat = null) => {
    resetForm()
    if (parentCat) {
      setIsSubCategory(true)
      setFormData(prev => ({
        ...prev,
        parent_id: parentCat.id
      }))
    } else {
      setIsSubCategory(false)
    }
    setIsDrawerOpen(true)
  }

  const handleEdit = (category) => {
    setIsEditing(category.id)
    setIsSubCategory(!!category.parent_id)
    setFormData({
      name: category.name,
      slug: category.slug,
      sort_order: category.sort_order ?? 0,
      is_active: category.is_active ?? true,
      parent_id: category.parent_id || '',
      description: category.description || ''
    })
    setIsDrawerOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.name.trim()) {
        alert("Vui lòng nhập tên danh mục!")
        return
      }

      setIsSaving(true)
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
      await fetchData()
      resetForm()
      setIsDrawerOpen(false)
    } catch (err) {
      if (err.message && err.message.includes('categories_slug_key')) {
        alert("Đường dẫn (slug) này đã bị trùng với một danh mục khác. Vui lòng kiểm tra lại slug.")
      } else {
        alert("Lỗi khi lưu: " + err.message)
      }
    } finally {
      setIsSaving(false)
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

    const productsInCat = products.filter(p => p.category_id === id || p.category === name)
    if (productsInCat.length > 0) {
      alert(`Danh mục "${name}" đang có ${productsInCat.length} sản phẩm liên kết.\n\nVui lòng chuyển sản phẩm sang danh mục khác hoặc TẮT TRẠNG THÁI (Ngừng hiển thị) thay vì xóa.`)
      return
    }

    if (!window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) return

    try {
      await deleteCategory(id)
      await fetchData()
      if (selectedCategoryId === id) setSelectedCategoryId(null)
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  const toggleActive = async (category) => {
    try {
      await updateCategory(category.id, { is_active: !category.is_active })
      await fetchData()
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái: " + err.message)
    }
  }

  const toggleCollapse = (parentId) => {
    setCollapsedParents(prev => ({
      ...prev,
      [parentId]: !prev[parentId]
    }))
  }

  const parentCategories = categories.filter(c => !c.parent_id)
  
  // Tree building with search filter
  const categoryTree = useMemo(() => {
    return parentCategories
      .map(parent => {
        const children = categories.filter(c => c.parent_id === parent.id).sort((a,b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        const parentMatches = !searchQuery || parent.name.toLowerCase().includes(searchQuery.toLowerCase()) || parent.slug.toLowerCase().includes(searchQuery.toLowerCase())
        const filteredChildren = children.filter(child => 
          !searchQuery || child.name.toLowerCase().includes(searchQuery.toLowerCase()) || child.slug.toLowerCase().includes(searchQuery.toLowerCase())
        )
        const hasMatchingChildren = filteredChildren.length > 0

        if (!searchQuery || parentMatches || hasMatchingChildren) {
          return {
            ...parent,
            children: searchQuery ? (parentMatches ? children : filteredChildren) : children,
            isMatch: parentMatches || hasMatchingChildren
          }
        }
        return null
      })
      .filter(Boolean)
      .sort((a,b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  }, [categories, parentCategories, searchQuery])

  // Region breakdown
  const regionBreakdown = useMemo(() => {
    const regions = ['Miền Bắc', 'Miền Trung', 'Miền Nam']
    return regions.map((regionName, idx) => {
      const regionProvs = provinces.filter(p => p.region === regionName)
      const activeCount = regionProvs.filter(p => p.is_active !== false).length
      return {
        id: idx + 1,
        name: regionName,
        totalProvinces: regionProvs.length,
        activeProvinces: activeCount,
        provinces: regionProvs
      }
    })
  }, [provinces])

  // Count total products in category
  const getProductCountForCat = (catId, catName) => {
    return products.filter(p => p.category_id === catId || p.category === catName).length
  }

  const getProductCountForParent = (parent) => {
    const directCount = getProductCountForCat(parent.id, parent.name)
    const children = categories.filter(c => c.parent_id === parent.id)
    const childrenCount = children.reduce((sum, c) => sum + getProductCountForCat(c.id, c.name), 0)
    return directCount + childrenCount
  }

  return (
    <div className="space-y-4 pb-12 font-sans text-gray-800 antialiased">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#E2E8E4]">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Danh mục & Vùng miền
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý danh mục sản phẩm và phân nhóm vùng miền.
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
            <span>{parentCategories.length} mục lớn</span>
            <span>•</span>
            <span>{categories.length - parentCategories.length} mục nhỏ</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">
              {categories.filter(c => c.is_active !== false).length}/{categories.length} đang hiển thị
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={fetchData} 
            className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-[#E2E8E4] bg-white text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
            title="Làm mới danh mục"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#0F5132]' : ''}`} />
            <span>Làm mới</span>
          </button>

          <button 
            onClick={() => handleOpenAdd(null)} 
            className="px-3.5 py-2 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> 
            <span>+ Thêm danh mục</span>
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION TABS & SEARCH */}
      <div className="bg-white p-3 rounded-lg border border-[#E2E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Switch View Tabs */}
        <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-md border border-gray-200">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cây danh mục sản phẩm ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('regions')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'regions'
                ? 'bg-white text-gray-900 shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Phân nhóm vùng miền (3 miền)
          </button>
        </div>

        {/* Search for Category tab */}
        {activeTab === 'categories' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-8.5 pl-9 pr-3 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:bg-white transition-colors"
            />
          </div>
        )}
      </div>

      {/* 3. MAIN TAB CONTENT */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-[#E2E8E4] p-12 flex flex-col items-center justify-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mb-3 text-[#0F5132]" />
          <p className="text-xs font-medium">Đang tải danh mục & phân nhóm...</p>
        </div>
      ) : activeTab === 'categories' ? (
        
        /* TAB 1: CATEGORY TREE TABLE */
        <div className="rounded-lg border border-[#E2E8E4] bg-white overflow-hidden shadow-2xs">
          {categoryTree.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Folder className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-gray-900">Không tìm thấy danh mục nào</h3>
              <p className="text-xs text-gray-400 mt-1 mb-3">Tạo mục lớn đầu tiên để bắt đầu phân loại sản phẩm.</p>
              <button 
                onClick={() => handleOpenAdd(null)} 
                className="text-xs font-semibold text-[#0F5132] hover:underline"
              >
                + Thêm mục lớn mới
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F7F8F6] border-b border-[#E2E8E4] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 w-10 text-center"></th>
                    <th className="py-2.5 px-3">Tên danh mục / Cấu trúc phân cấp</th>
                    <th className="py-2.5 px-3 w-32">Phân loại</th>
                    <th className="py-2.5 px-3 w-28 text-center">Sản phẩm</th>
                    <th className="py-2.5 px-3 w-28 text-center">Hiển thị</th>
                    <th className="py-2.5 px-3 w-20 text-center">Thứ tự</th>
                    <th className="py-2.5 px-4 w-36 text-right">Thao tác</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E2E8E4] text-xs">
                  {categoryTree.map((parent) => {
                    const isCollapsed = !!collapsedParents[parent.id]
                    const totalProducts = getProductCountForParent(parent)
                    const isSelected = selectedCategoryId === parent.id
                    const isParentActive = parent.is_active !== false

                    return (
                      <React.Fragment key={parent.id}>
                        {/* PARENT ROW */}
                        <tr 
                          onClick={() => setSelectedCategoryId(parent.id)}
                          className={`group transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-emerald-50/50' 
                              : 'bg-gray-50/40 hover:bg-gray-100/60'
                          }`}
                        >
                          {/* Expand/Collapse Toggle */}
                          <td className="py-2.5 px-3 w-10 text-center">
                            {parent.children && parent.children.length > 0 ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleCollapse(parent.id)
                                }}
                                className="p-1 text-gray-500 hover:text-gray-900 rounded hover:bg-gray-200 transition-colors"
                              >
                                {isCollapsed ? (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>
                            ) : (
                              <span className="inline-block w-3.5 h-3.5 text-gray-300">•</span>
                            )}
                          </td>

                          {/* Category Name & Slug */}
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-gray-900">
                                {parent.name}
                              </span>
                              <span className="font-mono text-[11px] text-gray-400">
                                /{parent.slug}
                              </span>
                            </div>
                            {parent.description && (
                              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 max-w-md">
                                {parent.description}
                              </p>
                            )}
                          </td>

                          {/* Category Type */}
                          <td className="py-2.5 px-3 w-32">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              Mục lớn
                            </span>
                          </td>

                          {/* Product Count */}
                          <td className="py-2.5 px-3 w-28 text-center font-mono font-semibold text-gray-700">
                            {totalProducts} SP
                          </td>

                          {/* Visibility Toggle */}
                          <td className="py-2.5 px-3 w-28 text-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleActive(parent)
                              }}
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                                isParentActive 
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                              }`}
                              title={isParentActive ? "Click để ẩn danh mục" : "Click để hiển thị"}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isParentActive ? 'bg-emerald-600' : 'bg-gray-400'}`} />
                              {isParentActive ? 'Hiển thị' : 'Ẩn'}
                            </button>
                          </td>

                          {/* Sort Order */}
                          <td className="py-2.5 px-3 w-20 text-center font-mono text-gray-500">
                            {parent.sort_order ?? 0}
                          </td>

                          {/* Actions */}
                          <td className="py-2.5 px-4 w-36 text-right">
                            <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                              <button 
                                onClick={() => handleOpenAdd(parent)} 
                                className="p-1 text-gray-500 hover:text-[#0F5132] hover:bg-emerald-50 rounded transition-colors" 
                                title="Thêm mục nhỏ trực thuộc"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleEdit(parent)} 
                                className="p-1 text-[#0F5132] hover:bg-emerald-50 rounded transition-colors" 
                                title="Sửa mục lớn"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDelete(parent.id, parent.name, true)} 
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                                title="Xóa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* CHILD ROWS (Tree view with indentation) */}
                        {!isCollapsed && parent.children && parent.children.map((child, cIdx) => {
                          const childProducts = getProductCountForCat(child.id, child.name)
                          const isChildSelected = selectedCategoryId === child.id
                          const isChildActive = child.is_active !== false
                          const isLast = cIdx === parent.children.length - 1

                          return (
                            <tr 
                              key={child.id}
                              onClick={() => setSelectedCategoryId(child.id)}
                              className={`transition-colors cursor-pointer ${
                                isChildSelected 
                                  ? 'bg-emerald-50/40' 
                                  : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              {/* Indent connector */}
                              <td className="py-2.5 px-3 w-10 text-center text-gray-300 font-mono text-xs">
                                {isLast ? '└──' : '├──'}
                              </td>

                              {/* Child Name & Slug */}
                              <td className="py-2.5 px-3 pl-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-xs text-gray-800">
                                    {child.name}
                                  </span>
                                  <span className="font-mono text-[10px] text-gray-400">
                                    /{child.slug}
                                  </span>
                                </div>
                              </td>

                              {/* Category Type */}
                              <td className="py-2.5 px-3 w-32">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                  Mục nhỏ
                                </span>
                              </td>

                              {/* Product Count */}
                              <td className="py-2.5 px-3 w-28 text-center font-mono text-gray-600">
                                {childProducts} SP
                              </td>

                              {/* Visibility */}
                              <td className="py-2.5 px-3 w-28 text-center">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleActive(child)
                                  }}
                                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                                    isChildActive 
                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                                  }`}
                                >
                                  {isChildActive ? 'Hiển thị' : 'Ẩn'}
                                </button>
                              </td>

                              {/* Sort Order */}
                              <td className="py-2.5 px-3 w-20 text-center font-mono text-gray-400">
                                {child.sort_order ?? 0}
                              </td>

                              {/* Actions */}
                              <td className="py-2.5 px-4 w-36 text-right">
                                <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                                  <button 
                                    onClick={() => handleEdit(child)} 
                                    className="p-1 text-[#0F5132] hover:bg-emerald-50 rounded transition-colors" 
                                    title="Sửa mục nhỏ"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(child.id, child.name, false)} 
                                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                                    title="Xóa"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer stats */}
          <div className="px-4 py-3 bg-[#F7F8F6] border-t border-[#E2E8E4] flex items-center justify-between text-xs text-gray-500">
            <span>Tổng cộng: <strong>{parentCategories.length}</strong> mục lớn, <strong>{categories.length - parentCategories.length}</strong> mục nhỏ</span>
            <span>Hiển thị phân cấp theo thứ tự ưu tiên</span>
          </div>

        </div>

      ) : (

        /* TAB 2: REGION MANAGEMENT TABLE */
        <div className="rounded-lg border border-[#E2E8E4] bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F7F8F6] border-b border-[#E2E8E4] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-4 w-16 text-center">STT</th>
                  <th className="py-2.5 px-4">Vùng miền</th>
                  <th className="py-2.5 px-4 w-36 text-center">Số tỉnh / thành</th>
                  <th className="py-2.5 px-4 w-36 text-center">Trạng thái</th>
                  <th className="py-2.5 px-4 w-32 text-center">Thứ tự</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8E4] text-xs">
                {regionBreakdown.map((r, idx) => (
                  <tr key={r.name} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 w-16 text-center font-mono text-gray-400 font-medium">
                      0{idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#0F5132]" />
                        <span className="font-semibold text-sm text-gray-900">{r.name}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Gồm các tỉnh: {r.provinces.slice(0, 4).map(p => p.name).join(', ')}{r.provinces.length > 4 ? '...' : ''}
                      </p>
                    </td>
                    <td className="py-3 px-4 w-36 text-center font-mono font-semibold text-gray-800">
                      {r.totalProvinces} tỉnh
                    </td>
                    <td className="py-3 px-4 w-36 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {r.activeProvinces}/{r.totalProvinces} hiển thị
                      </span>
                    </td>
                    <td className="py-3 px-4 w-32 text-center font-mono text-gray-500">
                      {idx + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-[#F7F8F6] border-t border-[#E2E8E4] text-xs text-gray-500">
            Dữ liệu tỉnh thành thuộc vùng miền được quản lý đồng bộ tại mục <strong>Bản đồ đặc sản</strong>.
          </div>
        </div>

      )}

      {/* ======================================================== */}
      {/* 4. ADD / EDIT CATEGORY DRAWER */}
      {/* ======================================================== */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-2xs animate-fadeIn">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#E2E8E4] animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E2E8E4] flex items-center justify-between bg-gray-50/80">
              <div>
                <h3 className="font-bold text-sm text-gray-900">
                  {isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Phân cấp danh mục sản phẩm phục vụ bộ lọc và SEO.
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

            {/* Drawer Form Body */}
            <form id="category-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              
              {/* Category Type Toggle */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Loại danh mục</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100/80 rounded-md border border-gray-200">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsSubCategory(false)
                      setFormData(prev => ({ ...prev, parent_id: '' }))
                    }}
                    className={`py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      !isSubCategory 
                        ? 'bg-white text-gray-900 shadow-2xs' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mục lớn (Cha)
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsSubCategory(true)
                      if (!formData.parent_id && parentCategories.length > 0) {
                        setFormData(prev => ({ ...prev, parent_id: parentCategories[0].id }))
                      }
                    }}
                    className={`py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                      isSubCategory 
                        ? 'bg-white text-gray-900 shadow-2xs' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mục nhỏ (Con)
                  </button>
                </div>
              </div>

              {/* Parent Category Selector (Only for subcategory) */}
              {isSubCategory && (
                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">Danh mục cha *</label>
                  <select 
                    required 
                    value={formData.parent_id} 
                    onChange={e => setFormData({ ...formData, parent_id: e.target.value })} 
                    className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] bg-white text-gray-900 focus:outline-none focus:border-[#0F5132] cursor-pointer"
                  >
                    <option value="">-- Chọn danh mục cha --</option>
                    {parentCategories.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Category Name */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Tên danh mục *</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={handleNameChange} 
                  className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]" 
                  placeholder="VD: Bánh Tráng, Bắp Rang Bơ..." 
                />
              </div>

              {/* Slug */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800 flex justify-between">
                  <span>Slug (Đường dẫn URL SEO) *</span>
                  <span className="text-[10px] text-gray-400 font-normal">Tự động sinh</span>
                </label>
                <input 
                  required 
                  type="text" 
                  value={formData.slug} 
                  onChange={e => setFormData({ ...formData, slug: e.target.value })} 
                  className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] bg-gray-50/50 font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]" 
                  placeholder="banh-trang" 
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-800">Thứ tự hiển thị</label>
                <input 
                  type="number" 
                  value={formData.sort_order} 
                  onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} 
                  className="w-full h-9 px-3 rounded-md border border-[#E2E8E4] font-mono text-gray-900 focus:outline-none focus:border-[#0F5132]" 
                />
                <p className="text-[10px] text-gray-400">Số nhỏ hơn sẽ được ưu tiên hiển thị trước.</p>
              </div>

              {/* Story / Description (Only for Parent Categories) */}
              {!isSubCategory && (
                <div className="space-y-1">
                  <label className="font-semibold text-gray-800">Mô tả / Câu chuyện (Banner & SEO)</label>
                  <textarea 
                    rows={3} 
                    value={formData.description} 
                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                    className="w-full p-2.5 rounded-md border border-[#E2E8E4] text-gray-900 focus:outline-none focus:border-[#0F5132]"
                    placeholder="Mô tả tóm tắt đặc trưng của dòng danh mục này..."
                  />
                </div>
              )}

              {/* Active Toggle */}
              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input 
                  type="checkbox" 
                  checked={formData.is_active}
                  onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-[#0F5132] rounded focus:ring-emerald-500"
                />
                <span className="font-medium text-gray-800">Hiển thị danh mục trên Website & Bộ lọc</span>
              </label>

            </form>

            {/* Drawer Footer */}
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
                form="category-form"
                disabled={isSaving} 
                className="px-4 py-1.5 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSaving ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>{isEditing ? 'Lưu thay đổi' : 'Thêm danh mục'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
