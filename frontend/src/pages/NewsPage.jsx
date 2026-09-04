import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Newspaper, Search, Hash, X, Globe, ChevronRight } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { getNews } from '../services/supabase'

const CATEGORIES = [
  'Tất cả',
  'Thông cáo báo chí',
  'Thị trường & Xuất khẩu',
  'Sự kiện & Hoạt động',
  'Chứng nhận & Tiêu chuẩn',
  'Chính sách Đại lý',
  'Sản phẩm mới'
]

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        const data = await getNews()
        // Chỉ lấy các bài viết đã xuất bản
        const publishedData = (data || []).filter(item => !item.status || item.status === 'published')
        setNews(publishedData)
      } catch (err) {
        console.error("Error fetching news:", err)
        setNews([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchNews()
  }, [])

  // Danh sách bài viết sau khi lọc theo chuyên mục & từ khóa tìm kiếm
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchCategory = activeCategory === 'Tất cả' || item.category === activeCategory
      const matchSearch = !searchQuery.trim() || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.summary?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.author?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.source_name?.toLowerCase().includes(searchQuery.toLowerCase().trim())
      return matchCategory && matchSearch
    })
  }, [news, activeCategory, searchQuery])

  // Bài viết tiêu điểm lớn bên trái Hero (Bài ghim hoặc bài mới nhất)
  const heroMain = useMemo(() => {
    if (activeCategory !== 'Tất cả' || searchQuery.trim()) return null
    return news.find(n => n.is_pinned) || news[0] || null
  }, [news, activeCategory, searchQuery])

  // 3 Bài viết phụ hiển thị cột dọc bên phải Hero
  const heroSides = useMemo(() => {
    if (!heroMain || activeCategory !== 'Tất cả' || searchQuery.trim()) return []
    return news.filter(n => n.id !== heroMain.id).slice(0, 3)
  }, [news, heroMain, activeCategory, searchQuery])

  // Danh sách bài viết hiển thị ở lưới 3 cột bên dưới
  const gridArticles = useMemo(() => {
    return filteredNews
  }, [filteredNews])

  return (
    <main className="bg-haq-cream min-h-screen flex flex-col font-sans text-haq-ink">
      <StickyNav />

      {/* ============================================================ */}
      {/* 1. HERO BANNER & TOP FEATURED SECTION (BỐ CỤC NỔI BẬT) */}
      {/* ============================================================ */}
      <section className="pt-32 pb-12 md:pt-36 md:pb-16 bg-haq-dark text-white relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-haq-dark pointer-events-none" />
        <div className="absolute -top-40 right-0 w-96 h-96 bg-haq-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-site px-4 sm:px-6 md:px-12 relative z-10">
          
          {/* Header Title */}
          <div className="mb-8 md:mb-10 text-left">
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase text-white">
              Tin Tức & Truyền Thông
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl font-normal">
              Cập nhật tin tức thị trường, hoạt động doanh nghiệp và câu chuyện nông sản HAQ FOOD.
            </p>
          </div>

          {/* Featured Split Layout: 1 Bài lớn trái (60%) + 3 Bài nhỏ phải (40%) */}
          {heroMain && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* CỘT TRÁI: 1 Bài viết tiêu điểm lớn */}
              <div className={`${heroSides.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
                <Link
                  to={`/tin-tuc/${heroMain.slug}`}
                  className="group relative block w-full h-[360px] sm:h-[420px] md:h-[460px] rounded-2xl overflow-hidden shadow-xl border border-white/10"
                >
                  <img
                    src={heroMain.image_url || 'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'}
                    alt={heroMain.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end text-left">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/80 uppercase mb-2">
                      <span className="bg-haq-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {heroMain.category}
                      </span>
                      <span>•</span>
                      <span>{new Date(heroMain.published_at).toLocaleDateString('vi-VN')}</span>
                      {heroMain.source_name && (
                        <>
                          <span>•</span>
                          <span className="text-amber-400 font-semibold">Nguồn: {heroMain.source_name}</span>
                        </>
                      )}
                    </div>

                    <h2 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white uppercase leading-snug group-hover:text-haq-red transition-colors line-clamp-2 mb-3">
                      {heroMain.title}
                    </h2>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider group-hover:text-haq-red group-hover:translate-x-1 transition-all">
                      <span>Xem thêm</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* CỘT PHẢI: 3 Bài viết phụ xếp dọc */}
              {heroSides.length > 0 && (
                <div className="lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-4">
                  {heroSides.map((item) => (
                    <Link
                      key={item.id}
                      to={`/tin-tuc/${item.slug}`}
                      className="group flex items-center gap-3 sm:gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex-1"
                    >
                      {/* Thumbnail nhỏ bên trái */}
                      <div className="w-28 sm:w-36 h-20 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-black/30">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Thông tin bên phải */}
                      <div className="min-w-0 flex-1 text-left flex flex-col justify-center">
                        <div className="text-[10px] text-white/60 font-mono uppercase mb-1">
                          {new Date(item.published_at).toLocaleDateString('vi-VN')} • {item.category}
                        </div>
                        <h3 className="font-heading font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug group-hover:text-haq-red transition-colors">
                          {item.title}
                        </h3>
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-haq-red uppercase tracking-wider group-hover:underline">
                          <span>Xem thêm</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BODY CONTENT SECTION (BỘ LỌC DẠNG PILL & LƯỚI 3 CỘT) */}
      {/* ============================================================ */}
      <section className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-site px-4 sm:px-6 md:px-12">

          {/* ============================================================ */}
          {/* CATEGORY FILTER PILLS (CĂN GIỮA CÂN ĐỐI CHUẨN MẪU) */}
          {/* ============================================================ */}
          <div className="mb-12">
            {/* Thanh Pills căn giữa */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat)
                      setSearchQuery('')
                    }}
                    className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-xs ${
                      isActive 
                        ? 'bg-haq-red text-white border border-haq-red shadow-md scale-102' 
                        : 'bg-white text-haq-red border border-haq-red/40 hover:bg-haq-red/5 hover:border-haq-red'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Thanh Tìm kiếm tinh gọn phía dưới các nút phân loại */}
            <div className="mt-6 flex justify-center">
              <div className="relative w-full max-w-md">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bài viết theo từ khóa..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-haq-border rounded-full text-xs sm:text-sm focus:outline-none focus:border-haq-red shadow-xs transition-colors placeholder:text-gray-400"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-haq-text-secondary">
              <div className="w-10 h-10 border-4 border-haq-red/20 border-t-haq-red rounded-full animate-spin mb-4" />
              <p className="font-mono text-xs uppercase tracking-widest">Đang tải tin tức...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="bg-white border border-haq-border rounded-3xl p-12 md:p-16 text-center shadow-xs max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-haq-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-8 h-8 text-haq-text-secondary" />
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-black text-haq-ink mb-3 uppercase">Chưa có bài viết</h2>
              <p className="text-haq-text-secondary text-sm leading-relaxed max-w-md mx-auto mb-6">
                Hệ thống đang được cập nhật các nội dung tin tức mới nhất. Quý khách vui lòng quay lại sau.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 text-haq-red text-xs font-bold uppercase tracking-wider hover:underline">
                <span>Về trang chủ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* LƯỚI BÀI VIẾT 3 CỘT (CLEAN 3-COLUMN GRID) */}
              {gridArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {gridArticles.map((item) => (
                    <Link
                      key={item.id}
                      to={`/tin-tuc/${item.slug}`}
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-haq-border hover:border-haq-red/40 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Ảnh đại diện tỷ lệ đẹp 16:10 */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/95 backdrop-blur-xs text-haq-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-haq-border shadow-xs">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Nội dung thẻ */}
                      <div className="p-5 sm:p-6 flex flex-col flex-1 text-left">
                        {/* Meta: Ngày đăng + Nguồn */}
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-haq-text-secondary font-mono uppercase mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-haq-red" /> 
                            {new Date(item.published_at).toLocaleDateString('vi-VN')}
                          </span>
                          {item.source_name ? (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-haq-red font-semibold">
                                <Globe className="w-3 h-3" /> {item.source_name}
                              </span>
                            </>
                          ) : (
                            <>
                              <span>•</span>
                              <span>{item.author || 'HAQ FOOD'}</span>
                            </>
                          )}
                        </div>

                        {/* Tiêu đề bài viết */}
                        <h3 className="font-heading font-bold text-base sm:text-lg text-haq-ink uppercase leading-snug group-hover:text-haq-red transition-colors line-clamp-2 mb-2.5">
                          {item.title}
                        </h3>

                        {/* Tóm tắt ngắn */}
                        {item.summary && (
                          <p className="text-haq-text-secondary text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                            {item.summary}
                          </p>
                        )}

                        {/* Nút Xem thêm */}
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-haq-red group-hover:translate-x-0.5 transition-transform">
                          <span>Xem thêm</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* Empty state when filtering / searching */
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-haq-border max-w-md mx-auto">
                  <Hash className="w-8 h-8 text-haq-text-secondary mx-auto mb-2.5" />
                  <p className="text-haq-text-secondary text-xs sm:text-sm mb-4">
                    Không tìm thấy bài viết nào trong chuyên mục "{activeCategory}".
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('Tất cả')
                      setSearchQuery('')
                    }}
                    className="px-4 py-2 rounded-full bg-haq-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-haq-red transition-colors"
                  >
                    Xem tất cả bài viết
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}

