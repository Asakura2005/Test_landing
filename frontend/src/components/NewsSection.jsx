import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import heroFactoryImg from '../assets/hero-factory.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catDoAnVatImg from '../assets/categories/category_do_an_vat.jpg'

const FEATURED_NEWS = {
  id: 'hoi-cho-xuc-tien-thuong-mai-viet-trung-2025',
  title: 'HAQ FOOD Tham Gia Hội Chợ Xúc Tiến Thương Mại Nông Sản Quốc Tế 2025',
  date: '24/02/2025',
  excerpt: 'Giới thiệu các dòng sản phẩm bánh tráng sấy giòn công nghệ cao và bánh hạnh nhân đạt chuẩn xuất khẩu tới hơn 500 đối tác và nhà nhập khẩu quốc tế.',
  category: 'SỰ KIỆN & XÚC TIẾN',
  image: heroFactoryImg,
}

const SIDE_NEWS = [
  {
    id: 'nang-cap-day-chuyen-say-nong-2025',
    title: 'HAQ FOOD Đầu Tư Mở Rộng Hệ Thống Máy Sấy Tự Động Đạt Chuẩn ISO 22000',
    date: '15/01/2025',
    category: 'CÔNG NGHỆ & SẢN XUẤT',
    image: catDoAnVatImg,
  },
  {
    id: 'mo-rong-xuat-khau-sang-thi-truong-dai-loan',
    title: 'Đơn Hàng Xuất Khẩu Bánh Hạnh Nhân & Bánh Đậu Xanh Sang Thị Trường Đài Loan',
    date: '08/01/2025',
    category: 'XUẤT KHẨU',
    image: catBanhImg,
  },
]

export default function NewsSection() {
  return (
    <section
      id="tin-tuc"
      aria-label="Tin tức hoạt động HAQ FOOD"
      className="relative bg-white py-20 sm:py-28 border-b border-haq-border overflow-hidden"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                TIN TỨC & HOẠT ĐỘNG · EDITORIAL NEWS
              </span>
              <span className="h-px w-10 bg-haq-red" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
              HOẠT ĐỘNG <span className="text-haq-red">DOANH NGHIỆP</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary max-w-xl leading-relaxed">
              Cập nhật tin tức xúc tiến thương mại, hợp tác quốc tế và nâng cấp công nghệ sản xuất của HAQ FOOD.
            </p>
          </div>

          <div>
            <Link
              to="/tin-tuc"
              className="inline-flex items-center gap-2 bg-haq-cream hover:bg-haq-soft text-haq-ink text-xs font-heading font-extrabold uppercase tracking-wider px-6 py-3 rounded-full transition-all border border-haq-border"
            >
              <span>XEM TẤT CẢ TIN TỨC</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Magazine Grid (1 Large Featured News + 2 Side Stories) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Featured Article (Col 7) */}
          <div className="lg:col-span-7 group bg-haq-cream rounded-3xl overflow-hidden border border-haq-border hover:border-haq-red shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-16/9 overflow-hidden bg-haq-soft">
              <img
                src={FEATURED_NEWS.image}
                alt={FEATURED_NEWS.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-haq-red text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {FEATURED_NEWS.category}
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-haq-text-secondary mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{FEATURED_NEWS.date}</span>
                </div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-haq-ink group-hover:text-haq-red transition-colors uppercase leading-snug">
                  {FEATURED_NEWS.title}
                </h3>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed mt-3">
                  {FEATURED_NEWS.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-haq-border">
                <Link
                  to={`/tin-tuc/${FEATURED_NEWS.id}`}
                  className="inline-flex items-center gap-2 text-xs font-heading font-extrabold text-haq-red uppercase group-hover:underline"
                >
                  <span>ĐỌC BÀI VIẾT CHI TIẾT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2 Side Articles (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {SIDE_NEWS.map((item) => (
              <div
                key={item.id}
                className="group bg-haq-cream rounded-3xl p-6 border border-haq-border hover:border-haq-red shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-haq-text-secondary mb-2">
                    <span className="text-haq-red font-bold uppercase">{item.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-base text-haq-ink group-hover:text-haq-red transition-colors uppercase leading-snug mt-1">
                    {item.title}
                  </h4>
                </div>

                <div className="mt-4 pt-4 border-t border-haq-border">
                  <Link
                    to={`/tin-tuc/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-haq-ink group-hover:text-haq-red transition-colors uppercase"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
