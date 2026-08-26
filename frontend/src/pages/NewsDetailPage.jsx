import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Share2, Tag } from 'lucide-react'
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
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-haq-red/20 border-t-haq-red rounded-full animate-spin" />
      </main>
    )
  }

  if (!news) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">404</h1>
        <p className="text-haq-ink/60 mb-8">Bài viết không tồn tại hoặc đã bị xóa.</p>
        <Link to="/tin-tuc" className="bg-haq-red text-white px-8 py-3 rounded-full font-bold">Quay lại trang tin</Link>
      </main>
    )
  }

  return (
    <main className="bg-white min-h-screen flex flex-col font-sans">
      <StickyNav />
      
      <article className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-haq-ink/50 text-xs font-bold uppercase tracking-widest hover:text-haq-red transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách tin
          </Link>
          
          <div className="mb-8">
            <span className="inline-block bg-haq-red text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {news.category}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-haq-ink leading-tight mb-6">
              {news.title}
            </h1>
            <div className="flex items-center gap-6 text-xs text-haq-ink/50 font-mono uppercase tracking-tight">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(news.published_at).toLocaleDateString('vi-VN')}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {news.author}</span>
            </div>
          </div>

          {news.image_url && (
            <img 
              src={news.image_url} 
              alt={news.title} 
              className="w-full h-auto rounded-[2rem] shadow-2xl mb-12"
            />
          )}

          <div 
            className="prose prose-lg prose-haq max-w-none text-haq-ink/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          <div className="mt-16 pt-8 border-t border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-haq-ink/50">
              <Tag className="w-4 h-4" /> {news.category}
            </div>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-haq-ink/50 hover:text-haq-red transition-colors">
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
