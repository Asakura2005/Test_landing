import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Share2, Tag, Globe, ExternalLink } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { getNewsBySlug } from '../services/supabase'
import { useLanguage } from '../context/LanguageContext'

const CATEGORY_MAP = {
  'Tất cả': { vi: 'Tất cả', en: 'All News', ko: '전체 소식' },
  'Thông cáo báo chí': { vi: 'Thông cáo báo chí', en: 'Press Release', ko: '보도자료' },
  'Thị trường & Xuất khẩu': { vi: 'Thị trường & Xuất khẩu', en: 'Market & Export', ko: '시장 및 수출' },
  'Sự kiện & Hoạt động': { vi: 'Sự kiện & Hoạt động', en: 'Events & Activities', ko: '이벤트 및 hoạt động' },
  'Chứng nhận & Tiêu chuẩn': { vi: 'Chứng nhận & Tiêu chuẩn', en: 'Certifications & Standards', ko: '인증 및 표준' },
  'Chính sách Đại lý': { vi: 'Chính sách Đại lý', en: 'Dealer Policy', ko: '대리점 정책' },
  'Sản phẩm mới': { vi: 'Sản phẩm mới', en: 'New Products', ko: '신제품' },
}

export default function NewsDetailPage() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const [news, setNews] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true)
        const data = await getNewsBySlug(slug)
        setNews(data)
      } catch (err) {
        console.error("Error fetching article:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-haq-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-haq-red/20 border-t-haq-red rounded-full animate-spin" />
      </main>
    )
  }

  if (!news) {
    return (
      <main className="min-h-screen bg-haq-cream flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-heading font-black text-haq-ink uppercase mb-4">404</h1>
        <p className="text-haq-text-secondary mb-8">
          {language === 'en'
            ? 'Article not found or has been removed.'
            : language === 'ko'
            ? '기사가 존재하지 않거나 삭제되었습니다.'
            : 'Bài viết không tồn tại hoặc đã bị xóa.'}
        </p>
        <Link to="/tin-tuc" className="bg-haq-red text-white px-8 py-3 rounded-full font-heading font-bold uppercase tracking-wider hover:bg-haq-red/90 transition-colors">
          {language === 'en' ? 'Back to news list' : language === 'ko' ? '뉴스 목록으로 돌아가기' : 'Quay lại trang tin'}
        </Link>
      </main>
    )
  }

  return (
    <main className="bg-haq-cream min-h-screen flex flex-col font-sans text-haq-ink">
      <StickyNav />
      
      <article className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-haq-text-secondary text-xs font-mono font-bold uppercase tracking-widest hover:text-haq-red transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Back to news list' : language === 'ko' ? '뉴스 목록으로 돌아가기' : 'Quay lại danh sách tin'}</span>
          </Link>
          
          <div className="mb-8">
            <span className="inline-block bg-haq-red text-white text-[10px] font-heading font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {CATEGORY_MAP[news.category]?.[language] || news.category}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-haq-ink leading-tight mb-6 uppercase">
              {news.title}
            </h1>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-haq-text-secondary font-mono uppercase tracking-tight">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-haq-red" /> 
                {new Date(news.published_at).toLocaleDateString(language === 'en' ? 'en-US' : language === 'ko' ? 'ko-KR' : 'vi-VN')}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-haq-red" /> 
                {news.author || 'HAQ FOOD'}
              </span>
              {(news.source_name || news.source_url) && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-haq-red" />
                  {language === 'en' ? 'Source: ' : language === 'ko' ? '출처: ' : 'Nguồn: '}
                  {news.source_url ? (
                    <a 
                      href={news.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-haq-red hover:underline font-bold inline-flex items-center gap-1 normal-case tracking-normal"
                    >
                      {news.source_name || (language === 'en' ? 'Original Article' : language === 'ko' ? '원문 기사' : 'Bài viết gốc')}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="normal-case tracking-normal font-semibold text-haq-ink">{news.source_name}</span>
                  )}
                </span>
              )}
            </div>
          </div>

          {news.image_url && (
            <img 
              src={news.image_url} 
              alt={news.title} 
              className="w-full h-auto rounded-3xl shadow-xl mb-12 border border-haq-border"
            />
          )}

          <div 
            className="prose prose-lg prose-haq max-w-none text-haq-ink/90 leading-relaxed bg-white p-8 md:p-12 rounded-3xl border border-haq-border shadow-xs"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {(news.source_name || news.source_url) && (
            <div className="mt-4 px-6 py-3.5 rounded-2xl bg-white border border-haq-border flex flex-wrap items-center justify-between gap-3 text-xs text-haq-text-secondary">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-haq-red shrink-0" />
                <span>
                  {language === 'en' ? 'Article source & citation: ' : language === 'ko' ? '출처 및 인용: ' : 'Nguồn bài viết & trích dẫn: '}
                  <strong className="text-haq-ink font-semibold">{news.source_name || (language === 'en' ? 'Press & Media' : language === 'ko' ? '언론 및 미디어' : 'Báo chí & Truyền thông')}</strong>
                </span>
              </div>
              {news.source_url && (
                <a
                  href={news.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-haq-red hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>{language === 'en' ? 'View original article' : language === 'ko' ? '원문 기사 보기' : 'Xem bài viết gốc'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-haq-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-haq-text-secondary">
              <Tag className="w-4 h-4 text-haq-red" /> {CATEGORY_MAP[news.category]?.[language] || news.category}
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: news.title, url: window.location.href }).catch(() => {})
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert(language === 'en' ? 'Link copied to clipboard!' : language === 'ko' ? '링크가 클립보드에 복사되었습니다!' : 'Đã sao chép liên kết vào bộ nhớ tạm!')
                }
              }}
              className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-haq-text-secondary hover:text-haq-red transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'en' ? 'Share' : language === 'ko' ? '공유' : 'Chia sẻ'}</span>
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
