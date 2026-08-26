import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Newspaper, Search, ChevronRight, Hash } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { getNews } from '../services/supabase'

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Tất cả')

  const categories = ['Tất cả', 'Sự kiện công ty', 'Sản phẩm mới', 'Thông cáo báo chí', 'Hoạt động sản xuất', 'Ẩm thực & Đời sống']

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        const data = await getNews()
        setNews(data || [])
        setFilteredNews(data || [])
      } catch (err) {
        console.error("Error fetching news:", err)
        // Fallback to empty news if table doesn't exist
        setNews([])
        setFilteredNews([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchNews()
  }, [])

  useEffect(() => {
    if (activeCategory === 'Tất cả') {
      setFilteredNews(news)
    } else {
      setFilteredNews(news.filter(item => item.category === activeCategory))
    }
  }, [activeCategory, news])

  // Featured news is the pinned one, or the latest one
  const featuredNews = news.find(n => n.is_pinned) || news[0]
  const otherNews = filteredNews.filter(n => n.id !== (featuredNews?.id))

  return (
    <main className="bg-haq-cream min-h-screen flex flex-col font-sans">
      <StickyNav />

      {/* Header Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-haq-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-haq-red/5 -skew-x-12 transform translate-x-20" />
        <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-haq-red/20 border border-haq-red/30 rounded-full text-[10px] font-mono font-bold text-haq-red uppercase tracking-widest mb-6">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Trung tâm truyền thông HAQ FOOD</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-7xl tracking-tighter leading-none uppercase">
            Tin Tức & <span className="text-haq-red">Hoạt Động</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-medium italic">
            "Chia sẻ những giá trị văn hóa ẩm thực và hành trình phát triển bền vững của HAQ FOOD tới cộng đồng."
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-site px-6 md:px-12">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-haq-text-secondary">
              <div className="w-12 h-12 border-4 border-haq-red/20 border-t-haq-red rounded-full animate-spin mb-4" />
              <p className="font-mono text-xs uppercase tracking-widest">Đang kết nối thư viện tin tức...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="bg-white border border-haq-border rounded-3xl p-16 md:p-24 text-center shadow-sm max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-haq-cream rounded-full flex items-center justify-center mx-auto mb-8">
                <Newspaper className="w-10 h-10 text-haq-text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-haq-ink mb-4 uppercase">Thư viện tin tức đang chuẩn bị</h2>
              <p className="text-haq-text-secondary text-lg leading-relaxed max-w-lg mx-auto">
                Chúng tôi đang cập nhật những tin tức mới nhất về hoạt động sản xuất và sự kiện công ty. Quý khách vui lòng quay lại sau ít phút.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 mt-10 text-haq-red font-bold hover:underline">
                <span>Quay về trang chủ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              {/* Featured Article - Only show on 'Tất cả' */}
              {activeCategory === 'Tất cả' && featuredNews && (
                <div className="mb-20">
                  <div className="text-[10px] font-mono font-bold text-haq-red uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-haq-red" />
                    BÀI VIẾT NỔI BẬT
                  </div>
                  <Link 
                    to={`/tin-tuc/${featuredNews.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 hover:shadow-haq-red/5 transition-all duration-500 border border-haq-border"
                  >
                    <div className="lg:col-span-7 h-[300px] md:h-[450px] overflow-hidden relative">
                      <img 
                        src={featuredNews.image_url || 'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'} 
                        alt={featuredNews.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-haq-dark/60 to-transparent lg:hidden" />
                      <div className="absolute bottom-6 left-6 lg:hidden">
                        <span className="bg-haq-red text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                          {featuredNews.category}
                        </span>
                      </div>
                    </div>
                    <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                      <div className="hidden lg:block mb-6">
                        <span className="bg-haq-red/10 text-haq-red text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-haq-red/10">
                          {featuredNews.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-haq-text-secondary font-mono uppercase mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(featuredNews.published_at).toLocaleDateString('vi-VN')}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {featuredNews.author}</span>
                      </div>
                      <h2 className="font-heading font-black text-2xl md:text-3xl text-haq-ink leading-tight mb-6 group-hover:text-haq-red transition-colors">
                        {featuredNews.title}
                      </h2>
                      <p className="text-haq-text-secondary text-base leading-relaxed mb-8 line-clamp-3">
                        {featuredNews.summary}
                      </p>
                      <div className="mt-auto">
                        <div className="inline-flex items-center gap-3 font-heading font-black text-xs uppercase tracking-widest text-haq-ink group-hover:gap-5 transition-all">
                          <span>Đọc chi tiết bài viết</span>
                          <div className="w-10 h-10 rounded-full border border-haq-border flex items-center justify-center group-hover:bg-haq-red group-hover:border-haq-red group-hover:text-white transition-all">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Category Filter */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-haq-border pb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat 
                          ? 'bg-haq-dark text-white shadow-xl translate-y-[-2px]' 
                          : 'bg-white text-haq-text-secondary hover:text-haq-ink hover:bg-haq-cream border border-haq-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bài viết..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-haq-border rounded-full text-xs focus:outline-none focus:border-haq-red transition-colors placeholder:text-haq-text-secondary"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-haq-text-secondary" />
                </div>
              </div>

              {/* News Grid */}
              {otherNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {otherNews.map((item, idx) => (
                    <Link 
                      key={item.id} 
                      to={`/tin-tuc/${item.slug}`}
                      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-haq-border hover:border-haq-red hover:shadow-2xl transition-all duration-500 hover:translate-y-[-4px]"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={item.image_url || 'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 backdrop-blur-md text-haq-ink text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-haq-border shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-[10px] text-haq-text-secondary font-mono uppercase mb-4">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(item.published_at).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <h3 className="font-heading font-bold text-lg md:text-xl text-haq-ink leading-snug mb-4 group-hover:text-haq-red transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-haq-text-secondary text-sm leading-relaxed line-clamp-3 mb-6">
                          {item.summary}
                        </p>
                        <div className="mt-auto pt-6 border-t border-haq-border flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-haq-ink group-hover:text-haq-red transition-colors">
                          <span>Xem bài viết</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-haq-border">
                  <Hash className="w-12 h-12 text-haq-text-secondary mx-auto mb-4" />
                  <p className="text-haq-text-secondary font-medium">Không có bài viết nào trong danh mục này.</p>
                </div>
              )}

              {/* Newsletter / CTA */}
              <div className="mt-24 bg-haq-dark rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full animate-[spin_60s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-heading font-black text-2xl md:text-4xl uppercase tracking-tight mb-6">
                    Đừng bỏ lỡ những <span className="text-haq-red">tin tức mới nhất</span>
                  </h3>
                  <p className="text-white/60 mb-10 max-w-xl mx-auto text-base md:text-lg">
                    Để lại thông tin để nhận thông báo về các sản phẩm mới và sự kiện từ HAQ FOOD HÀ NỘI.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input 
                      type="email" 
                      placeholder="Email của bạn"
                      className="flex-1 bg-white/10 border border-white/20 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:border-haq-red transition-colors placeholder:text-white/30"
                    />
                    <button className="bg-haq-red text-white px-8 py-4 rounded-2xl font-heading font-black text-xs uppercase tracking-widest hover:bg-haq-red/90 transition-colors shadow-xl shadow-haq-red/20">
                      Đăng ký ngay
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}

