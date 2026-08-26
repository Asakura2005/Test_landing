import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import factoryImg from '../assets/hero-factory.jpg'

const FEATURED_ARTICLE = {
  id: 1,
  title: 'HAQ FOOD Không Ngừng Nâng Cao Chất Lượng Sản Phẩm Và Chuẩn Mực Dây Chuyền Sản Xuất',
  category: 'HOẠT ĐỘNG DOANH NGHIỆP',
  date: '15/01/2026',
  image: factoryImg,
  description:
    'Đầu tư dây chuyền sấy giòn tự động hóa khép kín và hoàn thiện quy trình kiểm soát chất lượng chuẩn ISO 22000 & HACCP nhằm đáp ứng tối đa nhu cầu của các chuỗi bán lẻ lớn.',
  slug: 'nang-cao-chat-luong-san-pham',
}

const SECONDARY_ARTICLES = [
  {
    id: 2,
    title: 'Mở Rộng Hệ Thống Phân Phối Tại Các Chuỗi Đại Siêu Thị Toàn Quốc',
    category: 'MẠNG LƯỚI BÁN LẺ',
    date: '08/01/2026',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop',
    description:
      'Sản phẩm HAQ FOOD gia tăng độ phủ sóng trên kệ hàng của WinMart, GO!, Circle K, GS25, Kmart và Bách Hóa Xanh.',
    slug: 'mo-rong-he-thong-phan-phoi',
  },
  {
    id: 3,
    title: 'Xúc Tiến Thương Mại Và Quảng Bá Đồ Ăn Vặt Việt Nam Đến Thị Trường Quốc Tế',
    category: 'XUẤT KHẨU & HỘI CHỢ',
    date: '20/12/2025',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
    description:
      'Tích cực giới thiệu các món bánh tráng sấy giòn đặc trưng của Việt Nam tại các hội chợ giao thương quốc tế.',
    slug: 'xuc-tien-thuong-mai',
  },
]

export default function NewsSection() {
  const ref = useReveal()

  return (
    <section id="tin-tuc" className="py-20 md:py-32 bg-white relative">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  04 / LATEST NEWS
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase">
                TIN TỨC & HOẠT ĐỘNG
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/70 max-w-md leading-relaxed">
              Cập nhật thông tin mới nhất về hoạt động kinh doanh, năng lực sản xuất và sự kiện thương mại nổi bật của HAQ FOOD.
            </p>
          </div>

          {/* Magazine News Grid (1 Big Featured + 2 Stacked) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Big Featured Article (Spans 7 cols) */}
            <article className="lg:col-span-7 group bg-haq-bone rounded-3xl overflow-hidden border border-black/5 hover:border-black/15 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-haq-ink">
                  <img
                    src={FEATURED_ARTICLE.image}
                    alt={FEATURED_ARTICLE.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-haq-ink font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-black/5 shadow-2xs">
                    {FEATURED_ARTICLE.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-haq-ink/50 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-haq-red" />
                    <span>{FEATURED_ARTICLE.date}</span>
                  </div>

                  <h3 className="font-heading font-black text-xl sm:text-2xl text-haq-ink group-hover:text-haq-red transition-colors leading-snug">
                    {FEATURED_ARTICLE.title}
                  </h3>

                  <p className="mt-4 text-sm text-haq-ink/75 leading-relaxed line-clamp-3">
                    {FEATURED_ARTICLE.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <Link
                  to="/tin-tuc"
                  className="group/link inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red border-b-2 border-haq-red pb-1"
                >
                  <span>ĐỌC TOÀN BỘ BÀI VIẾT</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>

            {/* Right: 2 Stacked Articles (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {SECONDARY_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="group bg-haq-bone rounded-2xl p-6 border border-black/5 hover:border-black/15 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between flex-1"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-haq-red bg-haq-red/10 px-2.5 py-0.5 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-[11px] font-mono text-haq-ink/50">
                        {article.date}
                      </span>
                    </div>

                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-haq-ink group-hover:text-haq-red transition-colors leading-snug">
                      {article.title}
                    </h4>

                    <p className="mt-2.5 text-xs sm:text-sm text-haq-ink/70 leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-heading font-bold text-haq-ink/70 group-hover:text-haq-red">
                    <span className="uppercase tracking-wider text-[11px]">Chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/tin-tuc"
              className="group inline-flex items-center gap-3 bg-haq-ink hover:bg-haq-red text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>XEM TẤT CẢ TIN TỨC</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
