import React, { useState, useEffect, useMemo } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  RefreshCw, 
  Pin, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  User, 
  Search, 
  ExternalLink,
  CheckCircle2,
  Clock,
  EyeOff
} from 'lucide-react'
import { getNews, deleteNews, updateNews } from '../../services/supabase'
import NewsModal from './NewsModal'

const CATEGORY_OPTIONS = [
  'Tất cả chuyên mục',
  'Tin tức',
  'Tuyển dụng'
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'published', label: 'Đã xuất bản' },
  { value: 'draft', label: 'Bản nháp' },
  { value: 'hidden', label: 'Đã ẩn' }
]

export default function NewsManager({ 
  autoOpenCreate = false, 
  onResetAutoOpen = null,
  canManage = true,
  isReadOnly = false 
}) {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState(null)
  
  // Tự động mở modal khi có trigger từ Topbar
  useEffect(() => {
    if (autoOpenCreate && canManage) {
      setEditingNews(null)
      setIsModalOpen(true)
      if (onResetAutoOpen) onResetAutoOpen()
    }
  }, [autoOpenCreate, onResetAutoOpen, canManage])
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tất cả chuyên mục')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const fetchNewsData = async () => {
    try {
      setIsLoading(true)
      const data = await getNews()
      setNews(data || [])
    } catch (err) {
      console.error("fetchNewsData error:", err)
      const errorMsg = err.message || ''
      if (errorMsg.includes('relation "news" does not exist') || errorMsg.includes('public.news') || errorMsg.includes('schema cache')) {
        setNews([])
      } else {
        alert("Lỗi tải tin tức: " + errorMsg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNewsData()
  }, [])

  const handleDelete = async (id, title) => {
    if (!canManage) return
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return
    try {
      await deleteNews(id)
      await fetchNewsData()
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  const togglePin = async (item) => {
    if (!canManage) return
    try {
      await updateNews(item.id, { is_pinned: !item.is_pinned })
      await fetchNewsData()
    } catch (err) {
      alert("Lỗi khi đổi trạng thái ghim: " + err.message)
    }
  }

  const openNewModal = () => {
    if (!canManage) return
    setEditingNews(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingNews(item)
    setIsModalOpen(true)
  }

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      // Search
      const matchesSearch = !searchQuery ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author?.toLowerCase().includes(searchQuery.toLowerCase())

      // Category
      const matchesCategory = 
        selectedCategory === 'Tất cả chuyên mục' ||
        (selectedCategory === 'Tuyển dụng' 
          ? item.category === 'Tuyển dụng' 
          : (item.category === 'Tin tức' || item.category !== 'Tuyển dụng'))

      // Status (default to published if status column not set)
      const itemStatus = item.status || 'published'
      const matchesStatus = selectedStatus === 'all' || itemStatus === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [news, searchQuery, selectedCategory, selectedStatus])

  const pinnedCount = useMemo(() => news.filter(n => n.is_pinned).length, [news])

  const renderStatusBadge = (status = 'published') => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Bản nháp
          </span>
        )
      case 'hidden':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Đã ẩn
          </span>
        )
      case 'published':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Đã xuất bản
          </span>
        )
    }
  }

  return (
    <div className="space-y-4 pb-12 font-sans text-gray-800 antialiased">
      
      {/* 1. COMPACT PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-[#E2E8E4]">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Tin tức & Truyền thông
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý bài viết, tin tức và nội dung truyền thông của HAQ FOOD.
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
            <span>Tổng cộng: <strong className="text-gray-800 font-semibold">{news.length}</strong> bài viết</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">{pinnedCount} bài ghim nổi bật</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={fetchNewsData} 
            className="p-2 rounded-md border border-[#E2E8E4] bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
            title="Làm mới danh sách"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#0F5132]' : ''}`} />
          </button>

          {canManage && (
            <button 
              onClick={openNewModal}
              className="px-3.5 py-2 rounded-md bg-[#0F5132] hover:bg-[#14532D] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> 
              <span>+ Viết bài mới</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. COMPACT SEARCH & FILTERS TOOLBAR */}
      <div className="bg-white p-3 rounded-lg border border-[#E2E8E4]">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Left: Search & Filters */}
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            
            {/* Search input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm bài viết theo tiêu đề, chuyên mục..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-[#E2E8E4] bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:bg-white"
              />
            </div>

            {/* Category select */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="py-1.5 px-2.5 text-xs rounded-md border border-[#E2E8E4] bg-white text-gray-700 focus:outline-none focus:border-[#0F5132]"
            >
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Status select */}
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="py-1.5 px-2.5 text-xs rounded-md border border-[#E2E8E4] bg-white text-gray-700 focus:outline-none focus:border-[#0F5132]"
            >
              {STATUS_OPTIONS.map(st => (
                <option key={st.value} value={st.value}>{st.label}</option>
              ))}
            </select>
          </div>

          {/* Right: Counter */}
          <div className="text-xs text-gray-500 whitespace-nowrap text-right shrink-0">
            Hiển thị: <strong className="text-gray-900 font-semibold">{filteredNews.length}</strong> bài viết
          </div>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-[#E2E8E4] p-12 flex flex-col items-center justify-center text-gray-500">
          <RefreshCw className="w-6 h-6 animate-spin mb-2 text-[#0F5132]" />
          <p className="text-xs font-medium">Đang tải danh sách bài viết...</p>
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="bg-white border border-[#E2E8E4] rounded-lg p-12 text-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">Chưa có bài viết</h3>
          <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
            Bắt đầu tạo bài viết đầu tiên cho HAQ FOOD.
          </p>
          <button 
            onClick={openNewModal}
            className="bg-[#0F5132] text-white px-4 py-2 rounded-md font-semibold text-xs hover:bg-[#14532D] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Viết bài mới</span>
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#E2E8E4] rounded-lg shadow-xs overflow-hidden">
          
          {/* DESKTOP TABLE (Hidden on Mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-[#E2E8E4] text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-2.5 px-3 w-12 text-center">Ghim</th>
                  <th className="py-2.5 px-3 min-w-[320px]">Bài viết</th>
                  <th className="py-2.5 px-3 min-w-[140px]">Chuyên mục</th>
                  <th className="py-2.5 px-3 min-w-[110px]">Trạng thái</th>
                  <th className="py-2.5 px-3 min-w-[100px]">Ngày đăng</th>
                  <th className="py-2.5 px-3 w-20 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8E4] text-xs">
                {filteredNews.map(item => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-gray-50/70 transition-colors group ${item.is_pinned ? 'bg-amber-50/30' : ''}`}
                  >
                    {/* GHIM */}
                    <td className="py-3 px-3 text-center align-middle">
                      <button 
                        onClick={() => togglePin(item)}
                        className={`p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer ${
                          item.is_pinned ? 'text-amber-600' : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title={item.is_pinned ? "Bỏ ghim" : "Ghim bài viết nổi bật"}
                      >
                        <Pin className={`w-3.5 h-3.5 ${item.is_pinned ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* BÀI VIẾT (Thumbnail + Title + Author + Slug) */}
                    <td className="py-3 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        {/* Thumbnail (72x48px) */}
                        <div className="w-[72px] h-[48px] rounded border border-gray-200 bg-gray-100 overflow-hidden shrink-0">
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt="" 
                              className="w-full h-full object-cover" 
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="min-w-0 flex-1">
                          <button
                            onClick={() => openEditModal(item)}
                            className="font-medium text-xs sm:text-[13px] text-gray-900 hover:text-[#0F5132] transition-colors line-clamp-1 text-left block"
                            title={item.title}
                          >
                            {item.title}
                          </button>
                          
                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px] text-gray-500">
                            <span className="truncate max-w-[110px]">{item.author || 'HAQ Media'}</span>
                            {item.source_name && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-[#0F5132] font-semibold truncate max-w-[130px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                                  Nguồn: {item.source_name}
                                </span>
                              </>
                            )}
                            <span className="text-gray-300">•</span>
                            <span className="font-mono text-gray-400 truncate max-w-[140px]" title={`/${item.slug}`}>
                              /{item.slug}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* CHUYÊN MỤC */}
                    <td className="py-3 px-3 align-middle">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap ${
                        item.category === 'Tuyển dụng'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                          : 'bg-emerald-50 text-[#0F5132] border border-emerald-200'
                      }`}>
                        {item.category === 'Tuyển dụng' ? 'Tuyển dụng' : 'Tin tức'}
                      </span>
                    </td>

                    {/* TRẠNG THÁI */}
                    <td className="py-3 px-3 align-middle whitespace-nowrap">
                      {renderStatusBadge(item.status)}
                    </td>

                    {/* NGÀY ĐĂNG */}
                    <td className="py-3 px-3 align-middle text-gray-500 font-mono text-[11px] whitespace-nowrap">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString('vi-VN') : '-'}
                    </td>

                    {/* THAO TÁC */}
                    <td className="py-3 px-3 align-middle text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                          title={canManage ? "Chỉnh sửa bài viết" : "Xem chi tiết bài viết"}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {canManage && (
                          <button 
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Xóa bài viết"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS (Visible on Mobile only) */}
          <div className="md:hidden divide-y divide-[#E2E8E4]">
            {filteredNews.map(item => (
              <div key={item.id} className="p-3.5 space-y-2.5">
                <div className="flex gap-3">
                  <div className="w-[72px] h-[48px] rounded border border-gray-200 bg-gray-100 overflow-hidden shrink-0">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="font-semibold text-xs text-gray-900 hover:text-[#0F5132] line-clamp-2 text-left"
                    >
                      {item.title}
                    </button>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500 font-mono">
                      <span>/{item.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-[#0F5132] border border-emerald-200 px-1.5 py-0.5 rounded text-[10px] font-medium">
                      {item.category || 'Tin tức'}
                    </span>
                    {renderStatusBadge(item.status)}
                  </div>

                  <div className="flex items-center gap-1">
                    {canManage && (
                      <button 
                        onClick={() => togglePin(item)}
                        className={`p-1.5 rounded hover:bg-gray-100 ${
                          item.is_pinned ? 'text-amber-600' : 'text-gray-300'
                        }`}
                        title={item.is_pinned ? "Bỏ ghim" : "Ghim"}
                      >
                        <Pin className={`w-3.5 h-3.5 ${item.is_pinned ? 'fill-amber-500' : ''}`} />
                      </button>
                    )}
                    <button 
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 rounded"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {canManage && (
                      <button 
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 4. CMS EDITOR MODAL */}
      {isModalOpen && (
        <NewsModal 
          news={editingNews}
          isReadOnly={!canManage}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            setIsModalOpen(false)
            fetchNewsData()
          }}
        />
      )}
    </div>
  )
}
