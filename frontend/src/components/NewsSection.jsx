import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import factoryImg from '../assets/hero-factory.jpg'

const FEATURED_ARTICLE = {
  id: 1,
  title: 'HAQ FOOD Tham Gia Hội Chợ Giao Thương Việt – Trung 2025: Thúc Đẩy Mở Rộng Thị Trường',
  category: 'XÚC TIẾN THƯƠNG MẠI',
  date: '2025',
  image: factoryImg,
  description:
    'Sự kiện xúc tiến thương mại quan trọng mở ra cơ hội kết nối cung ứng, đưa các món ăn vặt đặc trưng của HAQ FOOD tiếp cận các đối tác phân phối khu vực và quốc tế.',
  slug: 'hoi-cho-giao-thuong-viet-trung',
}

const SECONDARY_ARTICLES = [
  {
    id: 2,
    title: 'Xuất Khẩu Thành Công Sang Thị Trường Hàn Quốc & Đài Loan',
    category: 'HOẠT ĐỘNG XUẤT KHẨU',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop',
    description:
      'Các sản phẩm bánh tráng sấy giòn và đồ ăn vặt HAQ FOOD đáp ứng đầy đủ tiêu chuẩn kiểm định an toàn thực phẩm khắt khe của các đối tác quốc tế.',
    slug: 'xuat-khau-han-quoc-dai-loan',
  },
  {
    id: 3,
    title: 'Chuẩn Hóa Quy Trình Sản Xuất Khép Kín Đạt Chuẩn ISO & HACCP',
    category: 'NĂNG LỰC SẢN XUẤT',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    description:
      'Đầu tư đồng bộ công nghệ sấy và kiểm soát chất lượng từ khâu nguyên liệu đến lưu mẫu từng lô hàng sản xuất.',
    slug: 'chuan-hoa-quy-trinh-san-xuat',
  },
]

export default function NewsSection() {
  const ref = useReveal()

  return (
    <section id="tin-tuc" className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  07 / NEWS
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase">
                TIN TỨC & SỰ KIỆN DOANH NGHIỆP
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              Các hoạt động thương mại, xúc tiến xuất khẩu và cột mốc phát triển nổi bật của HAQ FOOD.
            </p>
          </div>

          {/* Editorial News Grid (1 Featured + 2 Stacked) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Big Featured Article (Spans 7 cols) */}
            <article className="lg:col-span-7 group bg-haq-bone rounded-3xl overflow-hidden border border-black/5 hover:border-black/15 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-haq-ink">
                  <img
                    src={FEATURED_ARTICLE.image}
                    alt={FEATURED_ARTICLE.title}
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-haq-ink font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-black/5 shadow-2xs">
                    {FEATURED_ARTICLE.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-haq-ink/50 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-haq-red" />
                    <span>NĂM {FEATURED_ARTICLE.date}</span>
                  </div>

                  <h3 className="font-heading font-black text-xl sm:text-2xl text-haq-ink group-hover:text-haq-red transition-colors leading-snug">
                    {FEATURED_ARTICLE.title}
                  </h3>

                  <p className="mt-4 text-sm text-haq-ink/75 leading-relaxed">
                    {FEATURED_ARTICLE.description}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <Link
                  to="/tin-tuc"
                  className="group/link inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red border-b-2 border-haq-red pb-1"
                >
                  <span>XEM CHI TIẾT</span>
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
                        NĂM {article.date}
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
        </div>
      </div>
    </section>
  )
}
