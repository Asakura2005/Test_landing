import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, PackageCheck } from 'lucide-react'
import { PRODUCT_CATEGORIES } from '../data/productCategories'

export default function Products() {
  const banhTrang = PRODUCT_CATEGORIES.find((c) => c.slug === 'banh-trang') || PRODUCT_CATEGORIES[1]
  const banh = PRODUCT_CATEGORIES.find((c) => c.slug === 'banh') || PRODUCT_CATEGORIES[2]
  const doAnVat = PRODUCT_CATEGORIES.find((c) => c.slug === 'do-an-vat') || PRODUCT_CATEGORIES[3]
  const doAnKho = PRODUCT_CATEGORIES.find((c) => c.slug === 'do-an-kho') || PRODUCT_CATEGORIES[4]

  return (
    <section
      id="san-pham"
      aria-label="Thế giới sản phẩm HAQ FOOD"
      className="relative bg-haq-bone py-20 sm:py-28 border-b border-black/5"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                DANH MỤC SẢN PHẨM · PRODUCT WORLD
              </span>
              <span className="h-px w-10 bg-haq-red" />
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-tight">
              HỆ SINH THÁI THỰC PHẨM <span className="text-haq-red">HAQ FOOD</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-haq-ink/75 max-w-xl leading-relaxed">
              Từ các dòng bánh tráng sấy giòn chủ lực đến bánh nướng thượng hạng và đồ ăn vặt đóng gói tiện lợi,
              đạt tiêu chuẩn an toàn thực phẩm ISO 22000 & HACCP.
            </p>
          </div>

          <div>
            <Link
              to="/san-pham"
              className="inline-flex items-center gap-2 bg-haq-ink hover:bg-haq-red text-white text-xs font-heading font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>XEM TẤT CẢ SẢN PHẨM</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Editorial Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Main Large Hero Tile: BÁNH TRÁNG (Col 7) */}
          <Link
            to={`/san-pham?category=${banhTrang.slug}`}
            className="lg:col-span-7 group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-black/5">
              <img
                src={banhTrang.image}
                alt={banhTrang.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-5 left-5 bg-haq-red text-white font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                SẢN PHẨM CHỦ LỰC 2021
              </div>
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-xs font-mono text-xs font-bold text-haq-ink px-3.5 py-1.5 rounded-full border border-black/5 shadow-2xs">
                ISO 22000
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  CATEGORY 01
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink group-hover:text-haq-red transition-colors uppercase mt-1.5 mb-3">
                  {banhTrang.name}
                </h3>
                <p className="text-xs sm:text-sm text-haq-ink/75 leading-relaxed max-w-lg">
                  {banhTrang.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                <span className="text-xs font-heading font-extrabold uppercase text-haq-red group-hover:underline flex items-center gap-1.5">
                  <span>Khám phá dòng bánh tráng</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono text-haq-ink/50">
                  Dây chuyền sấy giòn tự động
                </span>
              </div>
            </div>
          </Link>

          {/* Right Column: 3 Category Tiles (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            {/* Tile 2: BÁNH */}
            <Link
              to={`/san-pham?category=${banh.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex items-center gap-5"
            >
              <div className="w-28 sm:w-36 aspect-square rounded-2xl overflow-hidden bg-black/5 shrink-0">
                <img
                  src={banh.image}
                  alt={banh.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-wider">
                  CATEGORY 02 · XUẤT KHẨU
                </div>
                <h4 className="font-heading font-black text-lg text-haq-ink group-hover:text-haq-red transition-colors uppercase mt-1 truncate">
                  {banh.name}
                </h4>
                <p className="text-xs text-haq-ink/65 line-clamp-2 mt-1">
                  Bánh hạnh nhân & đậu xanh thượng hạng đạt chuẩn xuất khẩu châu Á.
                </p>
                <div className="mt-2 text-xs font-heading font-bold text-haq-red inline-flex items-center gap-1">
                  <span>Xem sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Tile 3: ĐỒ ĂN VẶT */}
            <Link
              to={`/san-pham?category=${doAnVat.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex items-center gap-5"
            >
              <div className="w-28 sm:w-36 aspect-square rounded-2xl overflow-hidden bg-black/5 shrink-0">
                <img
                  src={doAnVat.image}
                  alt={doAnVat.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-wider">
                  CATEGORY 03 · ĐỒ ĂN VẶT
                </div>
                <h4 className="font-heading font-black text-lg text-haq-ink group-hover:text-haq-red transition-colors uppercase mt-1 truncate">
                  {doAnVat.name}
                </h4>
                <p className="text-xs text-haq-ink/65 line-clamp-2 mt-1">
                  Bắp rang bơ sấy nổ công nghệ cao kết hợp bơ sữa caramel béo ngậy.
                </p>
                <div className="mt-2 text-xs font-heading font-bold text-haq-red inline-flex items-center gap-1">
                  <span>Xem sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Tile 4: ĐỒ ĂN KHÔ */}
            <Link
              to={`/san-pham?category=${doAnKho.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-black/20 shadow-2xs hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex items-center gap-5"
            >
              <div className="w-28 sm:w-36 aspect-square rounded-2xl overflow-hidden bg-black/5 shrink-0">
                <img
                  src={doAnKho.image}
                  alt={doAnKho.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-wider">
                  CATEGORY 04 · ĐỒ ĂN KHÔ
                </div>
                <h4 className="font-heading font-black text-lg text-haq-ink group-hover:text-haq-red transition-colors uppercase mt-1 truncate">
                  {doAnKho.name}
                </h4>
                <p className="text-xs text-haq-ink/65 line-clamp-2 mt-1">
                  Thịt bò và thịt heo sấy gia vị tự nhiên đậm đà, an toàn vệ sinh.
                </p>
                <div className="mt-2 text-xs font-heading font-bold text-haq-red inline-flex items-center gap-1">
                  <span>Xem sản phẩm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
