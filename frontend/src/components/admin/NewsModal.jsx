import React, { useState, useRef, useEffect } from 'react'
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Loader2, 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  List, 
  Quote, 
  Link as LinkIcon, 
  Globe, 
  Search, 
  FileText, 
  Pin,
  Save,
  Code,
  Calendar,
  User,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import { createNews, updateNews, uploadNewsImage } from '../../services/supabase'

const CATEGORY_OPTIONS = [
  'Thị trường & Xuất khẩu',
  'Sự kiện & Hoạt động',
  'Chứng nhận & Tiêu chuẩn',
  'Chính sách Đại lý',
  'Sản phẩm mới',
  'Thông cáo báo chí'
]

const getInitialFormData = (item) => ({
  title: item?.title || item?.name || '',
  slug: item?.slug || '',
  category: item?.category || 'Thị trường & Xuất khẩu',
  status: item?.status || 'published', // 'published' | 'draft' | 'hidden'
  summary: item?.summary || item?.excerpt || item?.description || '',
  content: item?.content || item?.body || item?.details || '',
  image_url: item?.image_url || item?.image || item?.thumbnail || '',
  author: item?.author || 'Ban Truyền Thông HAQ FOOD',
  source_name: item?.source_name || item?.source || '',
  source_url: item?.source_url || item?.original_url || '',
  is_pinned: Boolean(item?.is_pinned),
  published_at: item?.published_at ? item.published_at.substring(0, 10) : new Date().toISOString().substring(0, 10),
  meta_title: item?.meta_title || item?.title || item?.name || '',
  meta_description: item?.meta_description || item?.summary || item?.excerpt || item?.description || '',
  meta_keywords: item?.meta_keywords || 'nông sản sạch, bánh tráng xuất khẩu, báo giá sỉ haq food'
})

export default function NewsModal({ news, onClose, onSave }) {
  const [formData, setFormData] = useState(() => getInitialFormData(news))
  const [isHtmlMode, setIsHtmlMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const [isUploadingEditorImg, setIsUploadingEditorImg] = useState(false)
  
  const editorRef = useRef(null)

  // Sync formData when news prop changes
  useEffect(() => {
    if (news) {
      setFormData(getInitialFormData(news))
    }
  }, [news])

  // Synchronize editor innerHTML with formData.content
  useEffect(() => {
    if (!isHtmlMode && editorRef.current) {
      const targetContent = formData.content || ''
      if (editorRef.current.innerHTML !== targetContent) {
        editorRef.current.innerHTML = targetContent
      }
    }
  }, [formData.content, isHtmlMode, news])

  // Auto generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')

    setFormData(prev => ({
      ...prev,
      title,
      slug: news ? prev.slug : slug,
      meta_title: prev.meta_title ? prev.meta_title : title
    }))
  }

  // Cover image upload
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploadingCover(true)
      const url = await uploadNewsImage(file)
      setFormData(prev => ({ ...prev, image_url: url }))
    } catch (err) {
      alert("Lỗi tải ảnh đại diện: " + err.message)
    } finally {
      setIsUploadingCover(false)
    }
  }

  // Rich text formatting commands
  const formatText = (command, value = null) => {
    if (isHtmlMode) return
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))
    }
  }

  // Insert image directly into editor
  const handleEditorImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploadingEditorImg(true)
      const url = await uploadNewsImage(file)
      const imgHtml = `<p><img src="${url}" alt="HAQ Food News Image" style="max-width:100%; border-radius:6px; margin: 16px auto; display:block; border: 1px solid #E5E7EB;"/></p><p><br></p>`
      if (isHtmlMode) {
        setFormData(prev => ({ ...prev, content: (prev.content || '') + '\n' + imgHtml }))
      } else {
        document.execCommand('insertHTML', false, imgHtml)
        if (editorRef.current) {
          setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))
        }
      }
    } catch (err) {
      alert("Lỗi chèn ảnh vào bài viết: " + err.message)
    } finally {
      setIsUploadingEditorImg(false)
      e.target.value = ''
    }
  }

  const handleEditorInput = () => {
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))
    }
  }

  const toggleHtmlMode = () => {
    if (!isHtmlMode && editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))
    }
    setIsHtmlMode(!isHtmlMode)
  }

  const handleSave = async (forcedStatus = null) => {
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!")
      return
    }

    try {
      setIsSubmitting(true)
      const finalContent = isHtmlMode
        ? formData.content
        : (editorRef.current ? editorRef.current.innerHTML : formData.content)

      const targetStatus = forcedStatus || formData.status || 'published'

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formData.category,
        status: targetStatus,
        summary: formData.summary,
        content: finalContent,
        image_url: formData.image_url,
        author: formData.author,
        is_pinned: formData.is_pinned,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.summary,
        meta_keywords: formData.meta_keywords,
        published_at: formData.published_at ? new Date(formData.published_at).toISOString() : new Date().toISOString()
      }

      if (news?.id) {
        await updateNews(news.id, payload)
      } else {
        await createNews(payload)
      }
      onSave()
      onClose()
    } catch (err) {
      console.error("NewsModal save error:", err)
      alert("Lỗi khi lưu bài viết: " + (err.message || 'Vui lòng kiểm tra lại kết nối'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const metaDescLength = (formData.meta_description || formData.summary || '').length
  const metaTitleLength = (formData.meta_title || formData.title || '').length

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn font-sans text-gray-800">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden border border-gray-200"
        onClick={e => e.stopPropagation()}
      >
        {/* 1. COMPACT MODAL TOPBAR */}
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#0F5132] text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 leading-tight">
                {news ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
              </h2>
              <p className="text-[11px] text-gray-500">
                Hệ thống quản trị nội dung CMS — HAQ FOOD
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-xs font-medium text-gray-600 hover:bg-gray-200/70 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSave('draft')}
              className="px-3 py-1.5 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Lưu bản nháp
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSave('published')}
              className="px-4 py-1.5 rounded bg-[#0F5132] hover:bg-[#14532D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{news ? 'Cập nhật bài viết' : 'Xuất bản'}</span>
                </>
              )}
            </button>
            <button 
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors ml-1"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. TWO-COLUMN CMS BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* ============================================================ */}
            {/* LEFT / MAIN COLUMN (approx 65% / 8 cols) */}
            {/* ============================================================ */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Tiêu đề bài viết */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tiêu đề bài viết <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Nhập tiêu đề bài viết..."
                  className="w-full px-3.5 py-2 text-sm font-semibold rounded border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F5132] focus:ring-1 focus:ring-[#0F5132]"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Đường dẫn tĩnh (Slug)
                </label>
                <div className="flex items-center rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-500 focus-within:border-[#0F5132] focus-within:bg-white">
                  <span className="text-gray-400 font-mono text-[11px] select-none">/tin-tuc/</span>
                  <input 
                    type="text"
                    required
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="flex-1 bg-transparent border-0 p-0 text-xs font-mono text-gray-800 focus:outline-none"
                    placeholder="duong-dan-bai-viet"
                  />
                </div>
              </div>

              {/* Tóm tắt ngắn (Lead Paragraph) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tóm tắt ngắn (Lead / Excerpt)
                </label>
                <textarea 
                  rows={2}
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Đoạn mở đầu ngắn gọn tóm tắt nội dung bài viết..."
                  className="w-full px-3 py-2 text-xs rounded border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0F5132]"
                />
              </div>

              {/* Nội dung chi tiết (Rich Editor) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Nội dung bài viết
                  </label>
                  <button
                    type="button"
                    onClick={toggleHtmlMode}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Code className="w-3 h-3 text-[#0F5132]" />
                    <span>{isHtmlMode ? 'Soạn thảo trực quan' : 'Sửa mã HTML'}</span>
                  </button>
                </div>

                {/* Editor Container */}
                <div className="border border-gray-300 rounded overflow-hidden bg-white">
                  
                  {/* Formatting Toolbar */}
                  {!isHtmlMode && (
                    <div className="bg-gray-50 px-2 py-1.5 border-b border-gray-200 flex flex-wrap items-center gap-1 text-xs">
                      <button 
                        type="button" 
                        onClick={() => formatText('bold')} 
                        className="p-1.5 hover:bg-gray-200/70 rounded text-gray-700 font-bold" 
                        title="In đậm (Ctrl+B)"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => formatText('italic')} 
                        className="p-1.5 hover:bg-gray-200/70 rounded text-gray-700" 
                        title="In nghiêng (Ctrl+I)"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-4 bg-gray-300 mx-1" />
                      <button 
                        type="button" 
                        onClick={() => formatText('formatBlock', '<h2>')} 
                        className="px-2 py-1 hover:bg-gray-200/70 rounded text-gray-700 font-bold text-[11px]" 
                        title="Tiêu đề H2"
                      >
                        H2
                      </button>
                      <button 
                        type="button" 
                        onClick={() => formatText('formatBlock', '<h3>')} 
                        className="px-2 py-1 hover:bg-gray-200/70 rounded text-gray-700 font-bold text-[11px]" 
                        title="Tiêu đề H3"
                      >
                        H3
                      </button>
                      <div className="w-px h-4 bg-gray-300 mx-1" />
                      <button 
                        type="button" 
                        onClick={() => formatText('insertUnorderedList')} 
                        className="p-1.5 hover:bg-gray-200/70 rounded text-gray-700" 
                        title="Danh sách gạch đầu dòng"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => formatText('formatBlock', '<blockquote>')} 
                        className="p-1.5 hover:bg-gray-200/70 rounded text-gray-700" 
                        title="Khối trích dẫn"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-4 bg-gray-300 mx-1" />
                      
                      {/* Insert Image Button */}
                      <label 
                        className="p-1.5 hover:bg-gray-200/70 rounded cursor-pointer flex items-center gap-1 text-[#0F5132] font-medium" 
                        title="Chèn ảnh vào nội dung"
                      >
                        {isUploadingEditorImg ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <ImageIcon className="w-3.5 h-3.5" />
                        )}
                        <span className="text-[11px]">{isUploadingEditorImg ? 'Đang tải...' : 'Chèn ảnh'}</span>
                        <input type="file" accept="image/*" onChange={handleEditorImageUpload} className="hidden" />
                      </label>
                    </div>
                  )}

                  {/* ContentEditable Visual Area */}
                  <div 
                    ref={editorRef}
                    contentEditable={!isHtmlMode}
                    onInput={handleEditorInput}
                    className={`p-4 min-h-[300px] max-h-[460px] overflow-y-auto focus:outline-none prose prose-sm max-w-none text-gray-800 ${isHtmlMode ? 'hidden' : 'block'}`}
                    placeholder="Bắt đầu nhập nội dung bài viết..."
                  />

                  {/* Raw HTML Code Area */}
                  {isHtmlMode && (
                    <textarea
                      rows={14}
                      value={formData.content}
                      onChange={e => setFormData({ ...formData, content: e.target.value })}
                      placeholder="<p>Nhập mã HTML bài viết tại đây...</p>"
                      className="w-full p-3 font-mono text-xs text-gray-800 bg-gray-50 focus:outline-none focus:bg-white min-h-[300px] resize-y"
                    />
                  )}
                </div>
              </div>

            </div>

            {/* ============================================================ */}
            {/* RIGHT SIDEBAR (approx 35% / 4 cols) */}
            {/* ============================================================ */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Box 1: Thông tin xuất bản */}
              <div className="p-3.5 rounded border border-gray-200 bg-gray-50/50 space-y-3">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Thông tin xuất bản
                </h3>

                {/* Trạng thái */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Trạng thái
                  </label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
                  >
                    <option value="published">Đã xuất bản</option>
                    <option value="draft">Bản nháp</option>
                    <option value="hidden">Đã ẩn</option>
                  </select>
                </div>

                {/* Chuyên mục */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Chuyên mục
                  </label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
                  >
                    {CATEGORY_OPTIONS.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tác giả */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Tác giả
                  </label>
                  <input 
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
                    placeholder="HAQ Media"
                  />
                </div>

                {/* Ngày đăng */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Ngày đăng
                  </label>
                  <input 
                    type="date"
                    value={formData.published_at}
                    onChange={e => setFormData({ ...formData, published_at: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 font-mono focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                {/* Ghim bài viết */}
                <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={formData.is_pinned} 
                    onChange={e => setFormData({ ...formData, is_pinned: e.target.checked })} 
                    className="w-4 h-4 text-[#0F5132] rounded border-gray-300 focus:ring-[#0F5132]"
                  />
                  <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Pin className={`w-3.5 h-3.5 ${formData.is_pinned ? 'text-amber-600 fill-amber-500' : 'text-gray-400'}`} />
                    Ghim bài viết lên đầu trang
                  </span>
                </label>
              </div>

              {/* Box 2: Nguồn tin & Bản quyền báo chí */}
              <div className="p-3.5 rounded border border-gray-200 bg-gray-50/50 space-y-3">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#0F5132]" />
                  Nguồn tin & Trích dẫn
                </h3>

                {/* Tên cơ quan báo chí / Nguồn tin */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Tên cơ quan báo / Nguồn trích dẫn
                  </label>
                  <input 
                    type="text"
                    value={formData.source_name}
                    onChange={e => setFormData({ ...formData, source_name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
                    placeholder="vd: Báo Dân Trí, VnExpress, Bộ Công Thương, HAQ Media..."
                  />
                </div>

                {/* Link bài báo gốc */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Link bài viết gốc (URL)
                  </label>
                  <input 
                    type="url"
                    value={formData.source_url}
                    onChange={e => setFormData({ ...formData, source_url: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
                    placeholder="https://dantri.com.vn/..."
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Hiển thị liên kết trích dẫn nguồn minh bạch trên website và tối ưu uy tín SEO.
                  </p>
                </div>
              </div>

              {/* Box 3: Ảnh đại diện (Featured Image) */}
              <div className="p-3.5 rounded border border-gray-200 bg-gray-50/50 space-y-2.5">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Ảnh đại diện (Thumbnail)
                </h3>

                {formData.image_url ? (
                  <div className="relative w-full h-32 rounded border border-gray-200 bg-gray-100 overflow-hidden group">
                    <img src={formData.image_url} alt="Cover Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                      className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-600 text-white rounded text-xs transition-colors"
                      title="Gỡ ảnh"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-24 rounded border border-dashed border-gray-300 bg-white flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-5 h-5 mb-1" />
                    <span className="text-[11px]">Chưa có ảnh đại diện</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="w-full py-1.5 px-3 bg-white border border-gray-300 hover:border-[#0F5132] rounded text-xs font-medium text-gray-700 cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                    {isUploadingCover ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-[#0F5132]" />}
                    <span>{isUploadingCover ? 'Đang tải lên...' : 'Tải file từ máy'}</span>
                    <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                  </label>
                  
                  <input
                    type="url"
                    placeholder="Hoặc dán URL ảnh trực tiếp (https://...)"
                    value={formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-2.5 py-1 text-[11px] rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>
              </div>

              {/* Box 3: Cấu hình SEO */}
              <div className="p-3.5 rounded border border-gray-200 bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#0F5132]" />
                    Tối ưu SEO
                  </h3>
                </div>

                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-gray-600">
                      Meta Title
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {metaTitleLength}/70
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={e => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder={formData.title || 'Tiêu đề SEO Google'}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-gray-600">
                      Meta Description
                    </label>
                    <span className={`text-[10px] font-mono ${metaDescLength > 160 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                      {metaDescLength}/160
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.meta_description}
                    onChange={e => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder={formData.summary || 'Mô tả hiển thị trên Google Search...'}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                {/* Compact Google SERP Snippet Preview */}
                <div className="p-2.5 rounded bg-white border border-gray-200 text-left font-sans space-y-0.5">
                  <div className="text-[11px] text-gray-600 truncate">
                    haqfood.vn › tin-tuc › {formData.slug || 'slug'}
                  </div>
                  <div className="text-xs font-medium text-[#1a0dab] line-clamp-1">
                    {formData.meta_title || formData.title || 'Tiêu đề bài viết'} — HAQ FOOD
                  </div>
                  <div className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                    {formData.meta_description || formData.summary || 'Nội dung tóm tắt bài viết trên HAQ FOOD...'}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
