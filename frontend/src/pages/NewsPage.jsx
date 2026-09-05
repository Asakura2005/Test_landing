import React, { useState, useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  Newspaper, 
  Briefcase, 
  ChevronRight, 
  Clock, 
  Bookmark,
  Mail,
  ArrowRight
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { getNews } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'

// Ước tính thời gian đọc bài viết
function getReadTime(item, language) {
  const text = `${item.title || ''} ${item.summary || ''} ${item.content || ''}`
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 220))
  if (language === 'en') return `${minutes} min read`
  if (language === 'ko') return `${minutes}분 읽기`
  return `${minutes} phút đọc`
}

export default function NewsPage({ defaultTab }) {
  const { language } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()

  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Xác định tab hiện tại: 'tin-tuc' hoặc 'tuyen-dung'
  const isCareersUrl = defaultTab === 'tuyen-dung' || 
    location.pathname.includes('tuyen-dung') || 
    location.pathname.includes('careers')

  const [activeTab, setActiveTab] = useState(isCareersUrl ? 'tuyen-dung' : 'tin-tuc')

  useEffect(() => {
    if (isCareersUrl) {
      setActiveTab('tuyen-dung')
    } else {
      setActiveTab('tin-tuc')
    }
  }, [isCareersUrl, location.pathname])



  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true)
        const data = await getNews()
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

  // Phân loại: Tin tức & Tuyển dụng, sắp xếp theo thời gian mới nhất
  const newsArticles = useMemo(() => {
    return news
      .filter(item => item.category !== 'Tuyển dụng')
      .sort((a, b) => {
        if (b.is_pinned !== a.is_pinned) return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
        return new Date(b.published_at || 0) - new Date(a.published_at || 0)
      })
  }, [news])

  const recruitmentArticles = useMemo(() => {
    return news
      .filter(item => item.category === 'Tuyển dụng')
      .sort((a, b) => {
        if (b.is_pinned !== a.is_pinned) return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
        return new Date(b.published_at || 0) - new Date(a.published_at || 0)
      })
  }, [news])

  const fallbackImage = 'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'
  const fallbackCareerImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80'

  const currentList = activeTab === 'tuyen-dung' ? recruitmentArticles : newsArticles

  return (
    <main className="bg-[#FAF9F6] min-h-screen flex flex-col font-sans text-[#11261B]">
      <StickyNav />

      {/* ============================================================ */}
      {/* 1. TIÊU ĐỀ TRANG TỐI GIẢN (THEO MẪU BÁNH BẢO MINH) */}
      {/* ============================================================ */}
      <section className="pt-28 sm:pt-32 pb-8 sm:pb-10">
        <div className="mx-auto max-w-site px-4 sm:px-6 md:px-12 text-center">
          
          {/* Tiêu đề căn giữa lớn, rõ ràng */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#0F5132] tracking-tight uppercase">
            {activeTab === 'tuyen-dung' 
              ? (language === 'en' ? 'CAREERS' : language === 'ko' ? '채용' : 'TUYỂN DỤNG')
              : (language === 'en' ? 'NEWS' : language === 'ko' ? '뉴스' : 'TIN TỨC')
            }
          </h1>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. LƯỚI BÀI VIẾT 3 CỘT (ĐƠN GIẢN, GỌN GÀNG) */}
      {/* ============================================================ */}
      <section className="pb-16 sm:pb-24 flex-1">
        <div className="mx-auto max-w-site px-4 sm:px-6 md:px-12">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#52665A]">
              <div className="w-8 h-8 border-3 border-[#0F5132]/20 border-t-[#0F5132] rounded-full animate-spin mb-3" />
              <p className="font-mono text-xs uppercase tracking-widest">
                {language === 'en' ? 'Loading...' : language === 'ko' ? '불러오는 중...' : 'Đang tải...'}
              </p>
            </div>
          ) : currentList.length === 0 ? (
            /* Khi chưa có bài viết */
            <div className="bg-white border border-[#E2E8E4] rounded-2xl p-10 md:p-14 text-center shadow-2xs max-w-xl mx-auto">
              <div className="w-14 h-14 bg-[#FAF9F6] border border-[#E2E8E4] rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'tuyen-dung' ? (
                  <Briefcase className="w-7 h-7 text-gray-400" />
                ) : (
                  <Newspaper className="w-7 h-7 text-gray-400" />
                )}
              </div>
              <h2 className="text-lg md:text-xl font-heading font-bold text-[#11261B] mb-2 uppercase">
                {activeTab === 'tuyen-dung'
                  ? (language === 'en' ? 'No Current Openings' : language === 'ko' ? '현재 채용 공고가 없습니다' : 'Chưa có thông báo tuyển dụng mới')
                  : (language === 'en' ? 'No Articles Yet' : language === 'ko' ? '등록된 기사가 없습니다' : 'Chưa có bài viết mới')}
              </h2>
              <p className="text-[#52665A] text-xs leading-relaxed max-w-md mx-auto mb-6 font-light">
                {activeTab === 'tuyen-dung'
                  ? (language === 'en'
                    ? 'HAQ FOOD currently has no active recruitment postings. Interested candidates are welcome to send CV to hr@haqfood.com.'
                    : language === 'ko'
                    ? '현재 채용 중인 직무가 없습니다. 입사를 희망하시는 분은 hr@haqfood.com으로 이력서를 보내주시기 바랍니다.'
                    : 'Hiện tại HAQ FOOD chưa có đợt tuyển dụng mới. Quý ứng viên quan tâm có thể gửi CV về email phòng Nhân sự để được lưu hồ sơ ưu tiên.')
                  : (language === 'en'
                    ? 'Content is currently being updated. Please check back soon.'
                    : language === 'ko'
                    ? '소식이 업데이트 중입니다. 잠시 후 다시 확인해 주십시오.'
                    : 'Hệ thống đang cập nhật các nội dung mới nhất. Quý khách vui lòng quay lại sau.')}
              </p>
              {activeTab === 'tuyen-dung' ? (
                <a 
                  href="mailto:hr@haqfood.com?subject=Hồ sơ ứng tuyển nhân sự HAQ FOOD"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5132] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#14532D] transition-colors shadow-2xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>{language === 'en' ? 'Email CV to hr@haqfood.com' : language === 'ko' ? '이메일로 이력서 보내기' : 'Gửi CV về: hr@haqfood.com'}</span>
                </a>
              ) : (
                <Link to="/" className="inline-flex items-center gap-1.5 text-[#0F5132] text-xs font-bold uppercase tracking-wider hover:underline">
                  <span>{language === 'en' ? 'Back to homepage' : language === 'ko' ? '홈으로 돌아가기' : 'Về trang chủ'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ) : (
            /* Lưới 3 cột bài viết chuẩn theo mẫu */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {currentList.map((item) => (
                <Link
                  key={item.id}
                  to={`/tin-tuc/${item.slug}`}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#E2E8E4] hover:border-[#0F5132]/40 hover:shadow-md transition-all duration-300 text-left"
                >
                  {/* Ảnh bài viết */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border-b border-[#E2E8E4]/60">
                    <img
                      src={item.image_url || (activeTab === 'tuyen-dung' ? fallbackCareerImage : fallbackImage)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-[#0F5132] text-white text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
                        {activeTab === 'tuyen-dung' 
                          ? (language === 'en' ? 'Careers' : language === 'ko' ? '채용' : 'Tuyển dụng')
                          : (item.category || 'Tin tức')}
                      </span>
                    </div>
                    {item.is_pinned && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="bg-[#C89B3C] text-white text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
                          <Bookmark className="w-2.5 h-2.5 fill-current" />
                          {activeTab === 'tuyen-dung' ? 'Gấp' : 'Tiêu điểm'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Nội dung bài viết */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    {/* Ngày đăng */}
                    <div className="flex items-center gap-2 text-[10px] text-[#52665A] font-mono uppercase mb-2">
                      <span className="flex items-center gap-1 text-[#0F5132] font-semibold">
                        <Calendar className="w-3 h-3" /> 
                        {new Date(item.published_at).toLocaleDateString(language === 'en' ? 'en-US' : language === 'ko' ? 'ko-KR' : 'vi-VN')}
                      </span>
                      {activeTab === 'tin-tuc' && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gray-400">
                            <Clock className="w-3 h-3" />
                            {getReadTime(item, language)}
                          </span>
                        </>
                      )}
                      {activeTab === 'tuyen-dung' && item.author && (
                        <>
                          <span>•</span>
                          <span className="text-gray-400">{item.author}</span>
                        </>
                      )}
                    </div>

                    {/* Tiêu đề bài viết */}
                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#11261B] uppercase leading-snug group-hover:text-[#0F5132] transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>

                    {/* Tóm tắt ngắn */}
                    {item.summary && (
                      <p className="text-[#52665A] text-xs leading-relaxed font-light line-clamp-2 mb-4">
                        {item.summary}
                      </p>
                    )}

                    {/* Nút Xem chi tiết */}
                    <div className="mt-auto pt-3 border-t border-[#E2E8E4]/60 flex items-center justify-between text-xs font-semibold text-[#0F5132] group-hover:translate-x-0.5 transition-transform">
                      <span>
                        {activeTab === 'tuyen-dung' 
                          ? (language === 'en' ? 'View Details & Apply' : language === 'ko' ? '상세보기 및 지원' : 'Xem chi tiết & Ứng tuyển')
                          : (language === 'en' ? 'Read story' : language === 'ko' ? '기사 읽기' : 'Đọc bài viết')
                        }
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
