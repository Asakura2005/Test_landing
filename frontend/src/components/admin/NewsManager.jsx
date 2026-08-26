import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, RefreshCw, Pin, FileText, Image as ImageIcon, Calendar, User } from 'lucide-react'
import { getNews, deleteNews, updateNews } from '../../services/supabase'
import NewsModal from './NewsModal'

export default function NewsManager() {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState(null)

  const fetchNewsData = async () => {
    try {
      setIsLoading(true)
      const data = await getNews()
      setNews(data || [])
    } catch (err) {
      console.error(err)
      // If table doesn't exist yet, we handle it gracefully
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
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return
    try {
      await deleteNews(id)
      await fetchNewsData()
    } catch (err) {
      alert("Lỗi khi xóa: " + err.message)
    }
  }

  const togglePin = async (item) => {
    try {
      await updateNews(item.id, { is_pinned: !item.is_pinned })
      await fetchNewsData()
    } catch (err) {
      alert("Lỗi khi đổi trạng thái ghim: " + err.message)
    }
  }

  const openNewModal = () => {
    setEditingNews(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingNews(item)
    setIsModalOpen(true)
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-black/10 p-4 md:p-6 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-heading font-bold text-2xl text-haq-ink uppercase tracking-tight">Quản lý Tin tức</h1>
          <p className="text-sm text-haq-ink/60 mt-1">Quản lý bài viết, sự kiện và tin tức công ty</p>
        </div>
        <button 
          onClick={openNewModal}
          className="bg-haq-red text-white px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> <span className="hidden md:inline">Viết bài mới</span>
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-haq-bone/30">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-haq-ink/50">
            <RefreshCw className="w-8 h-8 animate-spin mb-4 text-haq-red" />
            <p className="font-mono text-xs uppercase tracking-widest">Đang kết nối cơ sở dữ liệu...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white border border-black/10 rounded-2xl p-16 text-center shadow-sm max-w-2xl mx-auto mt-10">
            <div className="w-20 h-20 bg-haq-bone rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-haq-ink/20" />
            </div>
            <h3 className="text-xl font-heading font-black text-haq-ink mb-3 uppercase">Chưa có bài viết nào</h3>
            <p className="text-haq-ink/60 mb-8 leading-relaxed">
              Hệ thống tin tức đã sẵn sàng. Hãy bắt đầu chia sẻ những hoạt động mới nhất của HAQ FOOD tới khách hàng và đối tác.
            </p>
            <button 
              onClick={openNewModal}
              className="bg-haq-ink text-white px-8 py-3 rounded-xl font-bold hover:bg-haq-red transition-all shadow-md active:scale-95"
            >
              + Viết bài đầu tiên
            </button>
          </div>
        ) : (
          <div className="bg-white border border-black/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-haq-bone border-b border-black/10 text-[11px] uppercase tracking-widest text-haq-ink/60 font-mono">
                    <th className="p-4 w-[60px] text-center">Ghim</th>
                    <th className="p-4 min-w-[300px]">Bài viết</th>
                    <th className="p-4">Danh mục</th>
                    <th className="p-4">Ngày đăng</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {news.map(item => (
                    <tr key={item.id} className={`hover:bg-black/[0.01] transition-colors group ${item.is_pinned ? 'bg-red-50/30' : ''}`}>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => togglePin(item)}
                          className={`p-2 rounded-full transition-all ${item.is_pinned ? 'text-haq-red bg-red-100/50 shadow-sm' : 'text-black/10 hover:text-haq-ink/40'}`}
                          title={item.is_pinned ? "Bỏ ghim" : "Ghim bài viết"}
                        >
                          <Pin className={`w-4.5 h-4.5 ${item.is_pinned ? 'fill-haq-red' : ''}`} />
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg bg-haq-bone overflow-hidden flex-shrink-0 border border-black/5">
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-haq-ink/20" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-heading font-bold text-haq-ink text-sm sm:text-base line-clamp-1 group-hover:text-haq-red transition-colors">
                              {item.title}
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-haq-ink/50 font-mono uppercase tracking-tight">
                              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {item.author || 'HAQ Admin'}</span>
                              <span className="text-black/10">|</span>
                              <span className="line-clamp-1">{item.slug}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block bg-haq-bone px-2.5 py-1 rounded-full text-[10px] font-bold text-haq-ink/70 uppercase tracking-wider">
                          {item.category || 'Tin tức'}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-haq-ink/60 font-mono">
                        {item.published_at ? new Date(item.published_at).toLocaleDateString('vi-VN') : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openEditModal(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id, item.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <NewsModal 
          news={editingNews}
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
