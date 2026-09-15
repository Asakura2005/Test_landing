'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Newspaper,
  Briefcase,
  ChevronRight,
  Clock,
  Bookmark,
  Mail,
  ArrowRight,
} from 'lucide-react'
import StickyNav from '@/components/StickyNav'
import Footer from '@/components/Footer'
import FloatingContactBar from '@/components/FloatingContactBar'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedNews } from '@/utils/i18nData'
import { getHomeUrl } from '@/utils/routeI18n'
import { isPublishedArticle } from '@/utils/newsFilter'

function getReadTime(item: any, language: string) {
  const text = `${item.title || ''} ${item.summary || ''} ${item.content || ''}`
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 220))
  if (language === 'en') return `${minutes} min read`
  if (language === 'ko') return `${minutes}분 읽기`
  if (language === 'zh') return `${minutes} 分钟阅读`
  return `${minutes} phút đọc`
}

interface NewsListingClientProps {
  initialNews?: any[]
  defaultTab?: 'tin-tuc' | 'tuyen-dung'
}

export default function NewsListingClient({
  initialNews = [],
  defaultTab = 'tin-tuc',
}: NewsListingClientProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'tin-tuc' | 'tuyen-dung'>(defaultTab)

  const publishedNews = useMemo(() => {
    return (initialNews || []).filter((item) => isPublishedArticle(item))
  }, [initialNews])

  const newsArticles = useMemo(() => {
    return publishedNews
      .filter((item) => item.category !== 'Tuyển dụng')
      .sort((a, b) => {
        if (Boolean(b.is_pinned) !== Boolean(a.is_pinned)) {
          return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
        }
        return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime()
      })
  }, [publishedNews])

  const recruitmentArticles = useMemo(() => {
    return publishedNews
      .filter((item) => item.category === 'Tuyển dụng')
      .sort((a, b) => {
        if (Boolean(b.is_pinned) !== Boolean(a.is_pinned)) {
          return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
        }
        return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime()
      })
  }, [publishedNews])

  const fallbackImage =
    'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&q=80'
  const fallbackCareerImage =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80'

  const currentList = activeTab === 'tuyen-dung' ? recruitmentArticles : newsArticles

  return (
    <main className="bg-[#FAF9F6] min-h-screen flex flex-col font-sans text-[#11261B] pt-[72px] sm:pt-[76px]">
      <StickyNav />
      <FloatingContactBar />

      {/* Header section */}
      <section className="pt-10 sm:pt-14 pb-8 sm:pb-10 border-b border-[#E2E8E4] bg-white">
        <div className="mx-auto max-w-site px-4 sm:px-6 md:px-12 text-center">
          <p className="font-heading text-xs tracking-[0.2em] text-[#0F5132] uppercase mb-2">
            HAQ FOOD · BẢN TIN DOANH NGHIỆP
          </p>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#0F5132] tracking-tight uppercase mb-4">
            {activeTab === 'tuyen-dung'
              ? language === 'en'
                ? 'CAREERS'
                : language === 'ko'
                ? '채용'
                : language === 'zh'
                ? '人才招聘'
                : 'TUYỂN DỤNG'
              : language === 'en'
              ? 'NEWS'
              : language === 'ko'
              ? '뉴스'
              : language === 'zh'
              ? '新闻动态'
              : 'TIN TỨC'}
          </h1>
          <p className="text-xs sm:text-sm text-[#52665A] max-w-xl mx-auto leading-relaxed">
            {activeTab === 'tuyen-dung'
              ? language === 'en'
                ? 'Discover dynamic career opportunities and join the HAQ FOOD family.'
                : language === 'ko'
                ? 'HAQ FOOD와 함께 성장할 열정적인 인재를 기다립니다.'
                : language === 'zh'
                ? '加入 HAQ FOOD，与专业现代的食品制造团队携手共创未来。'
                : 'Cơ hội nghề nghiệp và phát triển năng lực tại nhà máy sản xuất thực phẩm chuẩn ISO 22000 & HACCP.'
              : language === 'en'
              ? 'Stay updated with our latest corporate announcements, market insights, and industry events.'
              : language === 'ko'
              ? 'HAQ FOOD의 최신 소식, 제품 출시 및 전시회 일정을 확인하세요.'
              : language === 'zh'
              ? '随时了解 HAQ FOOD 的最新企业动态、行业合作与品牌故事。'
              : 'Cập nhật tin tức thị trường thực phẩm, hoạt động sản xuất, hợp tác OEM/ODM và câu chuyện thương hiệu.'}
          </p>

          {/* Quick tab switch buttons */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('tin-tuc')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'tin-tuc'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'bg-[#FAF9F6] text-[#52665A] hover:bg-gray-200 border border-[#E2E8E4]'
              }`}
            >
              {language === 'en' ? 'News' : language === 'ko' ? '뉴스' : language === 'zh' ? '新闻' : 'Tin tức'} ({newsArticles.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tuyen-dung')}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'tuyen-dung'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'bg-[#FAF9F6] text-[#52665A] hover:bg-gray-200 border border-[#E2E8E4]'
              }`}
            >
              {language === 'en' ? 'Careers' : language === 'ko' ? '채용' : language === 'zh' ? '招聘' : 'Tuyển dụng'} ({recruitmentArticles.length})
            </button>
          </div>
        </div>
      </section>

      {/* Grid of articles */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="mx-auto max-w-site px-4 sm:px-6 md:px-12">
          {currentList.length === 0 ? (
            <div className="bg-white border border-[#E2E8E4] rounded-2xl p-10 md:p-14 text-center shadow-xs max-w-xl mx-auto">
              <div className="w-14 h-14 bg-[#FAF9F6] border border-[#E2E8E4] rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'tuyen-dung' ? (
                  <Briefcase className="w-7 h-7 text-gray-400" />
                ) : (
                  <Newspaper className="w-7 h-7 text-gray-400" />
                )}
              </div>
              <h2 className="text-lg md:text-xl font-heading font-bold text-[#11261B] mb-2 uppercase">
                {activeTab === 'tuyen-dung'
                  ? language === 'en'
                    ? 'No Current Openings'
                    : language === 'ko'
                    ? '현재 채용 공고가 없습니다'
                    : language === 'zh'
                    ? '暂无最新招聘岗位'
                    : 'Chưa có thông báo tuyển dụng mới'
                  : language === 'en'
                  ? 'No Articles Yet'
                  : language === 'ko'
                  ? '등록된 기사가 없습니다'
                  : language === 'zh'
                  ? '暂无最新文章'
                  : 'Chưa có bài viết mới'}
              </h2>
              <p className="text-[#52665A] text-xs leading-relaxed max-w-md mx-auto mb-6 font-light">
                {activeTab === 'tuyen-dung'
                  ? language === 'en'
                    ? 'HAQ FOOD currently has no active recruitment postings. Interested candidates are welcome to send CV to tuyendung@haq.com.vn.'
                    : language === 'ko'
                    ? '현재 채용 중인 직무가 없습니다. 입사를 희망하시는 분은 tuyendung@haq.com.vn으로 이력서를 보내주시기 바랍니다.'
                    : language === 'zh'
                    ? 'HAQ FOOD 目前暂无公开招聘岗位。有意向者欢迎将个人简历发送至 tuyendung@haq.com.vn 纳入人才储备。'
                    : 'Hiện tại HAQ FOOD chưa có đợt tuyển dụng mới. Quý ứng viên quan tâm có thể gửi CV về email phòng Nhân sự để được lưu hồ sơ ưu tiên.'
                  : language === 'en'
                  ? 'Content is currently being updated. Please check back soon.'
                  : language === 'ko'
                  ? '소식이 업데이트 중입니다. 잠시 후 다시 확인해 주십시오.'
                  : language === 'zh'
                  ? '系统正在更新最新资讯，请稍后再次访问。'
                  : 'Hệ thống đang cập nhật các nội dung mới nhất. Quý khách vui lòng quay lại sau.'}
              </p>
              {activeTab === 'tuyen-dung' ? (
                <a
                  href="mailto:tuyendung@haq.com.vn?subject=Hồ sơ ứng tuyển nhân sự HAQ FOOD"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F5132] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#14532D] transition-colors shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>
                    {language === 'en'
                      ? 'Email CV to tuyendung@haq.com.vn'
                      : language === 'ko'
                      ? '이메일로 이력서 보내기: tuyendung@haq.com.vn'
                      : language === 'zh'
                      ? '发送简历至: tuyendung@haq.com.vn'
                      : 'Gửi CV về: tuyendung@haq.com.vn'}
                  </span>
                </a>
              ) : (
                <Link
                  href={getHomeUrl(language)}
                  className="inline-flex items-center gap-1.5 text-[#0F5132] text-xs font-bold uppercase tracking-wider hover:underline"
                >
                  <span>
                    {language === 'en'
                      ? 'Back to homepage'
                      : language === 'ko'
                      ? '홈으로 돌아가기'
                      : language === 'zh'
                      ? '返回首页'
                      : 'Về trang chủ'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {currentList.map((rawItem) => {
                const item = getLocalizedNews(rawItem, language)
                const detailSlug = item.slug || String(item.id)
                const detailPath =
                  activeTab === 'tuyen-dung'
                    ? language === 'zh'
                      ? `/zh/careers/${detailSlug}`
                      : language === 'en'
                      ? `/en/careers/${detailSlug}`
                      : language === 'ko'
                      ? `/ko/careers/${detailSlug}`
                      : `/tuyen-dung/${detailSlug}`
                    : language === 'zh'
                    ? `/zh/news/${detailSlug}`
                    : language === 'en'
                    ? `/en/news/${detailSlug}`
                    : language === 'ko'
                    ? `/ko/news/${detailSlug}`
                    : `/tin-tuc/${detailSlug}`

                return (
                  <Link
                    key={item.id}
                    href={detailPath}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E2E8E4] hover:border-[#0F5132]/40 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border-b border-[#E2E8E4]/60">
                      <img
                        src={item.image_url || (activeTab === 'tuyen-dung' ? fallbackCareerImage : fallbackImage)}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="bg-[#0F5132] text-white text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                          {activeTab === 'tuyen-dung'
                            ? language === 'en'
                              ? 'Careers'
                              : language === 'ko'
                              ? '채용'
                              : language === 'zh'
                              ? '人才招聘'
                              : 'Tuyển dụng'
                            : item.category ||
                              (language === 'en'
                                ? 'News'
                                : language === 'ko'
                                ? '뉴스'
                                : language === 'zh'
                                ? '新闻动态'
                                : 'Tin tức')}
                        </span>
                      </div>
                      {item.is_pinned && (
                        <div className="absolute top-2.5 right-2.5">
                          <span className="bg-[#16A34A] text-white text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                            <Bookmark className="w-2.5 h-2.5 fill-current" />
                            {activeTab === 'tuyen-dung'
                              ? language === 'en'
                                ? 'Urgent'
                                : language === 'ko'
                                ? '긴급'
                                : language === 'zh'
                                ? '急招'
                                : 'Gấp'
                              : language === 'en'
                              ? 'Featured'
                              : language === 'ko'
                              ? '주목'
                              : language === 'zh'
                              ? '焦点'
                              : 'Tiêu điểm'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      {/* Date & Reading time */}
                      <div className="flex items-center gap-2 text-[10px] text-[#52665A] font-mono uppercase mb-2">
                        <span className="flex items-center gap-1 text-[#0F5132] font-semibold">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.published_at || item.created_at).toLocaleDateString(
                            language === 'en'
                              ? 'en-US'
                              : language === 'ko'
                              ? 'ko-KR'
                              : language === 'zh'
                              ? 'zh-CN'
                              : 'vi-VN'
                          )}
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

                      {/* Title */}
                      <h3 className="font-heading font-bold text-sm sm:text-base text-[#11261B] uppercase leading-snug group-hover:text-[#0F5132] transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>

                      {/* Summary */}
                      {item.summary && (
                        <p className="text-[#52665A] text-xs leading-relaxed font-light line-clamp-2 mb-4">
                          {item.summary}
                        </p>
                      )}

                      {/* Link action */}
                      <div className="mt-auto pt-3 border-t border-[#E2E8E4]/60 flex items-center justify-between text-xs font-semibold text-[#0F5132] group-hover:translate-x-0.5 transition-transform">
                        <span>
                          {activeTab === 'tuyen-dung'
                            ? language === 'en'
                              ? 'View Details & Apply'
                              : language === 'ko'
                              ? '상세보기 및 지원'
                              : language === 'zh'
                              ? '查看详情与应聘'
                              : 'Xem chi tiết & Ứng tuyển'
                            : language === 'en'
                            ? 'Read story'
                            : language === 'ko'
                            ? '기사 읽기'
                            : language === 'zh'
                            ? '阅读全文'
                            : 'Đọc bài viết'}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
