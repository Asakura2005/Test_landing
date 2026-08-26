import React, { useState, useRef, useEffect } from 'react'
import { X, Upload, Image as ImageIcon, Loader2, Bold, Italic, Heading2, Heading3, List, Quote, Link as LinkIcon, Check } from 'lucide-react'
import { createNews, updateNews, uploadNewsImage } from '../../services/supabase'

export default function NewsModal({ news, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Sự kiện công ty',
    summary: '',
    content: '',
    image_url: '',
    author: 'HAQ FOOD Media',
    is_pinned: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const [isUploadingEditorImg, setIsUploadingEditorImg] = useState(false)
  const editorRef = useRef(null)

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || '',
        slug: news.slug || '',
        category: news.category || 'Sự kiện công ty',
        summary: news.summary || '',
        content: news.content || '',
        image_url: news.image_url || '',
        author: news.author || 'HAQ FOOD Media',
        is_pinned: news.is_pinned || false
      })
      if (editorRef.current) {
        editorRef.current.innerHTML = news.content || ''
      }
    } else {
      setFormData({
        title: '',
        slug: '',
        category: 'Sự kiện công ty',
        summary: '',
        content: '',
        image_url: '',
        author: 'HAQ FOOD Media',
        is_pinned: false
      })
      if (editorRef.current) {
        editorRef.current.innerHTML = ''
      }
    }
  }, [news])

  // Auto generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9a-z-\s])/g, '')
        .replace(/(\s+)/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
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
      alert("Lỗi tải ảnh bìa: " + err.message)
    } finally {
      setIsUploadingCover(false)
    }
  }

  // Rich text formatting commands
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))
    }
  }

  // Insert image directly into editor and upload to Supabase Storage
  const handleEditorImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploadingEditorImg(true)
      const url = await uploadNewsImage(file)
      
      // Insert image tag at cursor
      const imgHtml = `<p><img src="${url}" alt="HAQ Food News Image" style="max-width:100%; border-radius:12px; margin: 16px auto; display:block;"/></p><p><br></p>`
      
      document.execCommand('insertHTML', false, imgHtml)
      if (editorRef.current) {
        setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))
      }
    } catch (err) {
      alert("Lỗi chèn ảnh vào bài viết: " + err.message)
    } finally {
      setIsUploadingEditorImg(false)
      // reset file input
      e.target.value = ''
    }
  }

  const handleEditorInput = () => {
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current.innerHTML }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!")
      return
    }

    try {
      setIsSubmitting(true)
      const payload = {
        ...formData,
        published_at: news?.published_at || new Date().toISOString()
      }

      if (news) {
        await updateNews(news.id, payload)
      } else {
        await createNews(payload)
      }
      onSave()
    } catch (err) {
      alert("Lỗi khi lưu bài viết: " + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between bg-haq-bone/50">
          <div>
            <h2 className="font-heading font-black text-xl text-haq-ink uppercase">
              {news ? 'Chỉnh sửa bài viết' : 'Viết bài tin tức mới'}
            </h2>
            <p className="text-xs text-haq-ink/60 mt-0.5">Trình soạn thảo trực quan tích hợp lưu trữ ảnh đám mây</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-haq-ink" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-haq-ink/70 mb-2">
                Tiêu đề bài viết <span className="text-haq-red">*</span>
              </label>
              <input 
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full bg-haq-bone/50 border border-black/10 px-4 py-3 rounded-xl text-haq-ink font-bold text-sm focus:outline-none focus:border-haq-red transition-colors"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-haq-ink/70 mb-2">
                Đường dẫn URL (Slug)
              </label>
              <input 
                type="text"
                required
                value={formData.slug}
                onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="duong-dan-bai-viet"
                className="w-full bg-haq-bone/50 border border-black/10 px-4 py-3 rounded-xl text-haq-ink font-mono text-xs focus:outline-none focus:border-haq-red transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-haq-ink/70 mb-2">
                Danh mục
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-haq-bone/50 border border-black/10 px-4 py-3 rounded-xl text-haq-ink font-semibold text-xs focus:outline-none focus:border-haq-red transition-colors"
              >
                <option value="Sự kiện công ty">Sự kiện công ty</option>
                <option value="Sản phẩm mới">Sản phẩm mới</option>
                <option value="Thông cáo báo chí">Thông cáo báo chí</option>
                <option value="Hoạt động sản xuất">Hoạt động sản xuất</option>
                <option value="Ẩm thực & Đời sống">Ẩm thực & Đời sống</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-haq-ink/70 mb-2">
                Tác giả / Ban truyền thông
              </label>
              <input 
                type="text"
                value={formData.author}
                onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full bg-haq-bone/50 border border-black/10 px-4 py-3 rounded-xl text-haq-ink font-semibold text-xs focus:outline-none focus:border-haq-red transition-colors"
              />
            </div>

            {/* Pinned Checkbox */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={formData.is_pinned}
                  onChange={e => setFormData(prev => ({ ...prev, is_pinned: e.target.checked }))}
                  className="w-5 h-5 accent-haq-red rounded cursor-pointer"
                />
                <span className="text-xs font-heading font-extrabold uppercase text-haq-ink">Ghim lên đầu trang chủ</span>
              </label>
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-haq-ink/70 mb-2">
              Tóm tắt ngắn (Hiển thị ở danh sách tin)
            </label>
            <textarea 
              rows={2}
              value={formData.summary}
              onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Nhập tóm tắt nội dung bài viết..."
              className="w-full bg-haq-bone/50 border border-black/10 px-4 py-3 rounded-xl text-haq-ink text-xs focus:outline-none focus:border-haq-red transition-colors resize-none"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-haq-ink/70 mb-2">
              Ảnh đại diện (Cover Image)
            </label>
            <div className="flex items-center gap-4">
              <div className="w-28 h-20 rounded-xl bg-haq-bone border border-black/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                {formData.image_url ? (
                  <img src={formData.image_url} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-haq-ink/20" />
                )}
              </div>
              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-haq-bone hover:bg-black/10 text-haq-ink font-bold text-xs cursor-pointer transition-colors border border-black/10">
                  {isUploadingCover ? <Loader2 className="w-4 h-4 animate-spin text-haq-red" /> : <Upload className="w-4 h-4" />}
                  <span>Tải ảnh bìa lên</span>
                  <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                </label>
                <p className="text-[11px] text-haq-ink/50 mt-1">Hỗ trợ JPG, PNG, WEBP (Tự động tải lên Supabase Storage)</p>
              </div>
            </div>
          </div>

          {/* WYSIWYG Rich Text Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-haq-ink/70">
                Nội dung chi tiết bài viết <span className="text-haq-red">*</span>
              </label>

              {/* Toolbar */}
              <div className="flex items-center gap-1 bg-haq-bone p-1 rounded-xl border border-black/10">
                <button type="button" onClick={() => formatText('bold')} title="In đậm" className="p-1.5 hover:bg-white rounded-lg transition-colors"><Bold className="w-4 h-4" /></button>
                <button type="button" onClick={() => formatText('italic')} title="In nghiêng" className="p-1.5 hover:bg-white rounded-lg transition-colors"><Italic className="w-4 h-4" /></button>
                <span className="w-px h-4 bg-black/10 mx-0.5" />
                <button type="button" onClick={() => formatText('formatBlock', '<h2>')} title="Tiêu đề H2" className="p-1.5 hover:bg-white rounded-lg transition-colors"><Heading2 className="w-4 h-4" /></button>
                <button type="button" onClick={() => formatText('formatBlock', '<h3>')} title="Tiêu đề H3" className="p-1.5 hover:bg-white rounded-lg transition-colors"><Heading3 className="w-4 h-4" /></button>
                <button type="button" onClick={() => formatText('insertUnorderedList')} title="Danh sách" className="p-1.5 hover:bg-white rounded-lg transition-colors"><List className="w-4 h-4" /></button>
                <button type="button" onClick={() => formatText('formatBlock', '<blockquote>')} title="Trích dẫn" className="p-1.5 hover:bg-white rounded-lg transition-colors"><Quote className="w-4 h-4" /></button>
                <span className="w-px h-4 bg-black/10 mx-0.5" />
                
                {/* Insert Image Button */}
                <label className="flex items-center gap-1 px-2 py-1 bg-haq-red text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-red-700 transition-colors">
                  {isUploadingEditorImg ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                  <span>Chèn ảnh</span>
                  <input type="file" accept="image/*" onChange={handleEditorImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Editable Content Area */}
            <div 
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              className="w-full min-h-[300px] bg-white border border-black/10 p-5 rounded-2xl focus:outline-none focus:border-haq-red text-haq-ink text-sm leading-relaxed prose max-w-none shadow-inner overflow-y-auto"
              style={{ wordBreak: 'break-word' }}
            />
            <p className="text-[11px] text-haq-ink/50 mt-1.5">
              💡 Mẹo: Bạn có thể nhấp nút <strong>"Chèn ảnh"</strong> ở thanh công cụ phía trên bất cứ lúc nào trong lúc viết để tải ảnh lên và chèn thẳng vào bài viết.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-black/5 hover:bg-black/10 text-haq-ink font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-haq-red hover:bg-red-700 text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{news ? 'Cập nhật bài viết' : 'Xuất bản bài viết'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}
