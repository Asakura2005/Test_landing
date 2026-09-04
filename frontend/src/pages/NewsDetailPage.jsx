import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Share2, Tag, Globe, ExternalLink } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { getNewsBySlug } from '../services/supabase'

export default function NewsDetailPage() {
  const { slug } = useParams()
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
        <p className="text-haq-text-secondary mb-8">Bài viết không tồn tại hoặc đã bị xóa.</p>
        <Link to="/tin-tuc" className="bg-haq-red text-white px-8 py-3 rounded-full font-heading font-bold uppercase tracking-wider hover:bg-haq-red/90 transition-colors">Quay lại trang tin</Link>
      </main>
    )
  }

  return (
    <main className="bg-haq-cream min-h-screen flex flex-col font-sans text-haq-ink">
      <StickyNav />
      
      <article className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-haq-text-secondary text-xs font-mono font-bold uppercase tracking-widest hover:text-haq-red transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách tin
          </Link>
          
          <div className="mb-8">
            <span className="inline-block bg-haq-red text-white text-[10px] font-heading font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {news.category}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-haq-ink leading-tight mb-6 uppercase">
              {news.title}
            </h1>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-haq-text-secondary font-mono uppercase tracking-tight">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-haq-red" /> 
                {new Date(news.published_at).toLocaleDateString('vi-VN')}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-haq-red" /> 
                {news.author || 'HAQ FOOD'}
              </span>
              {(news.source_name || news.source_url) && (
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-haq-red" />
                  Nguồn: {news.source_url ? (
                    <a 
                      href={news.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-haq-red hover:underline font-bold inline-flex items-center gap-1 normal-case tracking-normal"
                    >
                      {news.source_name || 'Bài viết gốc'}
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
                  Nguồn bài viết & trích dẫn: <strong className="text-haq-ink font-semibold">{news.source_name || 'Báo chí & Truyền thông'}</strong>
                </span>
              </div>
              {news.source_url && (
                <a
                  href={news.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-haq-red hover:underline font-semibold inline-flex items-center gap-1"
                >
                  Xem bài viết gốc <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}



          <div className="mt-8 pt-8 border-t border-haq-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-haq-text-secondary">
              <Tag className="w-4 h-4 text-haq-red" /> {news.category}
            </div>
            <button className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-haq-text-secondary hover:text-haq-red transition-colors">
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
