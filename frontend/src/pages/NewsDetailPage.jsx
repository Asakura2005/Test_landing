import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Tag, 
  Globe, 
  ExternalLink, 
  Clock, 
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { getNewsBySlug, getNews } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'

const CATEGORY_MAP = {
  'Tất cả': { vi: 'Tất cả', en: 'All News', ko: '전체 소식' },
  'Tin tức': { vi: 'Tin tức', en: 'News', ko: '뉴스' },
  'Tuyển dụng': { vi: 'Tuyển dụng', en: 'Careers', ko: '채용' },
  'Thông cáo báo chí': { vi: 'Tin tức', en: 'News', ko: '뉴스' },
  'Thị trường & Xuất khẩu': { vi: 'Tin tức', en: 'News', ko: '뉴스' },
  'Sự kiện & Hoạt động': { vi: 'Tin tức', en: 'News', ko: '뉴스' },
  'Chứng nhận & Tiêu chuẩn': { vi: 'Tin tức', en: 'News', ko: '뉴스' },
  'Chính sách Đại lý': { vi: 'Tin tức', en: 'News', ko: '뉴스' },
  'Sản phẩm mới': { vi: 'Tin tức', en: 'News', ko: '뉴스' },
}

function getReadTime(item, language) {
  if (!item) return ''
  const text = `${item.title || ''} ${item.summary || ''} ${item.content || ''}`
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 220))
  if (language === 'en') return `${minutes} min read`
  if (language === 'ko') return `${minutes}분 읽기`
  return `${minutes} phút đọc`
}

export default function NewsDetailPage() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const [news, setNews] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true)
        const [articleData, allNewsData] = await Promise.all([
          getNewsBySlug(slug),
          getNews().catch(() => [])
        ])
        
        setNews(articleData)

        // Lọc bài viết liên quan
        if (articleData && allNewsData && Array.isArray(allNewsData)) {
          const published = allNewsData.filter(
            item => (!item.status || item.status === 'published') && item.id !== articleData.id
          )
          // Ưu tiên cùng chuyên mục, sau đó đến các bài mới nhất
          const sameCategory = published.filter(item => item.category === articleData.category)
          const otherCategory = published.filter(item => item.category !== articleData.category)
          const combined = [...sameCategory, ...otherCategory].slice(0, 3)
          setRelatedNews(combined)
        }
      } catch (err) {
        console.error("Error fetching article:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticle()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: news?.title, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0F5132]/20 border-t-[#0F5132] rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#52665A]">
            {language === 'en' ? 'Loading article...' : language === 'ko' ? '기사 불러오는 중...' : 'Đang tải bài viết...'}
          </span>
        </div>
      </main>
    )
  }

  if (!news) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-heading font-black text-[#11261B] mb-2 uppercase">404</h1>
        <p className="text-[#52665A] text-sm mb-6 font-light">
          {language === 'en'
            ? 'Article not found or has been moved.'
            : language === 'ko'
            ? '기사가 존재하지 않거나 삭제되었습니다.'
            : 'Bài viết không tồn tại hoặc đã được chuyển sang địa chỉ khác.'}
        </p>
        <Link 
          to="/tin-tuc" 
          className="bg-[#0F5132] hover:bg-[#14532D] text-white px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Back to news' : language === 'ko' ? '뉴스 목록으로' : 'Quay lại trang tin tức'}</span>
        </Link>
      </main>
    )
  }

  const fallbackImage = 'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'

  return (
    <main className="bg-[#FAF9F6] min-h-screen flex flex-col font-sans text-[#11261B]">
      <StickyNav />
      
      <article className="pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          
          {/* Back Link & Breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <Link 
              to={news?.category === 'Tuyển dụng' 
                ? (language === 'en' ? '/en/careers' : language === 'ko' ? '/ko/careers' : '/tuyen-dung')
                : (language === 'en' ? '/en/news' : language === 'ko' ? '/ko/news' : '/tin-tuc')} 
              className="inline-flex items-center gap-1.5 text-[#52665A] hover:text-[#0F5132] text-xs font-medium transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>
                {news?.category === 'Tuyển dụng'
                  ? (language === 'en' ? 'Back to careers' : language === 'ko' ? '채용 목록으로' : 'Quay lại danh sách tuyển dụng')
                  : (language === 'en' ? 'Back to news' : language === 'ko' ? '뉴스 목록으로' : 'Quay lại danh sách tin tức')}
              </span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#52665A] hover:text-[#0F5132] transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-md border border-[#E2E8E4]"
              title="Chia sẻ bài viết"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#0F5132]" />
                  <span className="text-[#0F5132] font-semibold">{language === 'en' ? 'Copied!' : language === 'ko' ? '복사됨!' : 'Đã sao chép!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Share' : language === 'ko' ? '공유' : 'Chia sẻ'}</span>
                </>
              )}
            </button>
          </div>
          
          {/* Header Metadata & Title */}
          <header className="mb-8 text-left border-b border-[#E2E8E4] pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#0F5132] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-2xs">
                {CATEGORY_MAP[news.category]?.[language] || news.category}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-mono text-[#52665A] flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                {getReadTime(news, language)}
              </span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[#11261B] leading-tight mb-4">
              {news.title}
            </h1>

            {/* Author, Date & Source */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#52665A] font-mono">
              <span className="flex items-center gap-1.5 text-[#0F5132] font-semibold">
                <Calendar className="w-3.5 h-3.5" /> 
                {new Date(news.published_at).toLocaleDateString(language === 'en' ? 'en-US' : language === 'ko' ? 'ko-KR' : 'vi-VN')}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gray-400" /> 
                {news.author || 'Ban Truyền thông HAQ FOOD'}
              </span>
              {(news.source_name || news.source_url) && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#0F5132]" />
                    <span>{language === 'en' ? 'Source: ' : language === 'ko' ? '출처: ' : 'Nguồn: '}</span>
                    {news.source_url ? (
                      <a 
                        href={news.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0F5132] hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        {news.source_name || (language === 'en' ? 'Original article' : language === 'ko' ? '원문 기사' : 'Bài viết gốc')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <strong className="text-[#11261B] font-semibold">{news.source_name}</strong>
                    )}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {news.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden bg-white border border-[#E2E8E4] shadow-2xs">
              <img 
                src={news.image_url} 
                alt={news.title} 
                className="w-full h-auto max-h-[520px] object-cover"
              />
            </div>
          )}

          {/* Excerpt Summary if present */}
          {news.summary && (
            <div className="mb-8 p-4 sm:p-5 rounded-xl bg-white border-l-3 border-[#0F5132] border-y border-r border-[#E2E8E4] text-[#11261B] text-sm sm:text-base font-normal leading-relaxed italic">
              "{news.summary}"
            </div>
          )}

          {/* Content Body (Rich Text) */}
          <div 
            className="prose prose-base sm:prose-lg max-w-none text-[#11261B] leading-relaxed bg-white p-6 sm:p-10 md:p-12 rounded-2xl border border-[#E2E8E4] shadow-2xs font-light text-left"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Source & Citation Footer Box */}
          {(news.source_name || news.source_url) && (
            <div className="mt-6 px-5 py-3.5 rounded-xl bg-white border border-[#E2E8E4] flex flex-wrap items-center justify-between gap-3 text-xs text-[#52665A]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0F5132] shrink-0" />
                <span>
                  {language === 'en' ? 'Citation source: ' : language === 'ko' ? '인용 출처: ' : 'Nguồn bài viết & trích dẫn: '}
                  <strong className="text-[#11261B] font-semibold">{news.source_name || 'Báo chí & Truyền thông'}</strong>
                </span>
              </div>
              {news.source_url && (
                <a
                  href={news.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0F5132] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>{language === 'en' ? 'Open original source' : language === 'ko' ? '원문 열기' : 'Xem nguồn gốc'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Recruitment How to Apply Box */}
          {news.category === 'Tuyển dụng' && (
            <div className="mt-8 p-6 sm:p-8 bg-[#EBF3EC]/60 border border-[#0F5132]/25 rounded-2xl">
              <h3 className="text-sm sm:text-base font-heading font-bold text-[#11261B] mb-2 uppercase tracking-wide">
                {language === 'en' ? 'HOW TO APPLY' : language === 'ko' ? '지원 방법' : 'CÁCH THỨC ỨNG TUYỂN & NỘP HỒ SƠ'}
              </h3>
              <p className="text-xs sm:text-sm text-[#52665A] leading-relaxed mb-4">
                {language === 'en'
                  ? 'Interested candidates are welcome to send CV/resume to: hr@haqfood.com (Subject: [Position - Full Name]). Or contact hotline 0969 516 888 for immediate consultation.'
                  : language === 'ko'
                  ? '지원 희망자는 이력서를 hr@haqfood.com으로 보내주시기 바랍니다 (제목: [지원분야 - 성명]). 문의 전화: 0969 516 888'
                  : 'Ứng viên quan tâm vui lòng gửi CV về email: hr@haqfood.com (Tiêu đề: [Vị trí ứng tuyển - Họ và tên]). Hoặc liên hệ hotline 0969 516 888 để được giải đáp trực tiếp.'}
              </p>
              <a
                href="mailto:hr@haqfood.com?subject=Ứng tuyển vị trí tại HAQ FOOD"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5132] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
              >
                <span>{language === 'en' ? 'Send CV to HR' : language === 'ko' ? '이메일로 지원하기' : 'Gửi CV ứng tuyển qua Email'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Bottom Bar: Tags & Share */}
          <div className="mt-8 pt-6 border-t border-[#E2E8E4] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#52665A]">
              <Tag className="w-3.5 h-3.5 text-[#0F5132]" /> 
              <span>{CATEGORY_MAP[news.category]?.[language] || news.category}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#52665A] hover:text-[#0F5132] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Share article' : language === 'ko' ? '기사 공유' : 'Chia sẻ bài viết'}</span>
            </button>
          </div>

          {/* ============================================================ */}
          {/* RELATED ARTICLES (BÀI VIẾT LIÊN QUAN) */}
          {/* ============================================================ */}
          {relatedNews.length > 0 && (
            <div className="mt-14 sm:mt-18 pt-10 border-t border-[#E2E8E4]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0F5132]" />
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#11261B] uppercase tracking-tight">
                    {language === 'en' ? 'Related Articles' : language === 'ko' ? '관련 기사' : 'Bài viết liên quan'}
                  </h3>
                </div>
                <Link to="/tin-tuc" className="text-xs font-medium text-[#0F5132] hover:underline inline-flex items-center gap-1">
                  <span>{language === 'en' ? 'View all' : language === 'ko' ? '모두 보기' : 'Xem tất cả'}</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {relatedNews.map(item => (
                  <Link
                    key={item.id}
                    to={`/tin-tuc/${item.slug}`}
                    className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#E2E8E4] hover:border-[#0F5132]/40 hover:shadow-sm transition-all duration-300 text-left"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={item.image_url || fallbackImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-white/95 backdrop-blur-xs text-[#0F5132] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-[#E2E8E4]">
                          {CATEGORY_MAP[item.category]?.[language] || item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#52665A] block mb-1">
                          {new Date(item.published_at).toLocaleDateString(language === 'en' ? 'en-US' : language === 'ko' ? 'ko-KR' : 'vi-VN')}
                        </span>
                        <h4 className="font-heading font-semibold text-xs sm:text-sm text-[#11261B] group-hover:text-[#0F5132] transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#E2E8E4]/60 flex items-center justify-between text-[11px] font-semibold text-[#0F5132]">
                        <span>{language === 'en' ? 'Read' : language === 'ko' ? '읽기' : 'Đọc tiếp'}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

      <Footer />
    </main>
  )
}
