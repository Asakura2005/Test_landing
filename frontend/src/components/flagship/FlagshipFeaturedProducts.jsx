import React, { useState } from 'react'
import { ArrowRight, BookOpen, Download, FileText, CheckCircle2 } from 'lucide-react'

const ALL_PRODUCTS = [
  {
    id: 1,
    category: 'banh-trang',
    badge: 'BÁNH TRÁNG TRỘN',
    badgeClass: 'bg-emerald-500/15 text-emerald-800',
    weight: '90G',
    image: '/assets/stitch/product_showcase_1.png',
    origin: 'Hương Vị Tây Ninh',
    name: 'Bánh Tráng Trộn Cuộn Khô Mực - 90G',
    desc: 'Bánh tráng cuộn giòn rụm kết hợp mực tươi rim cay ngọt, sấy tiệt trùng hiện đại giữ trọn độ thơm ngậy.',
    shelfLife: 'Hạn dùng: 06 tháng',
    packaging: 'Thùng: 30 gói',
    flavor: 'Mực Rim Cay Ngọt',
  },
  {
    id: 2,
    category: 'banh-trang',
    badge: 'BÁN CHẠY NHẤT',
    badgeClass: 'bg-[#fe932c]/15 text-[#c25e00]',
    weight: '100G',
    image: '/assets/stitch/product_showcase_2.png',
    origin: 'Hương Vị Tây Ninh',
    name: 'Bánh Tráng Trộn Sợi Sa Tế Tôm - 100G',
    desc: 'Sợi bánh phơi sương tơi dai vừa chuẩn, thấm đẫm sa tế tôm cay béo nồng nàn và hành phi giòn tan.',
    shelfLife: 'Hạn dùng: 06 tháng',
    packaging: 'Thùng: 30 gói',
    flavor: 'Sa Tế Cay Tôm',
  },
  {
    id: 3,
    category: 'banh-trang',
    badge: 'BÁNH TRÁNG CUỘN',
    badgeClass: 'bg-emerald-500/15 text-emerald-800',
    weight: '100G',
    image: '/assets/stitch/product_showcase_3.png',
    origin: 'Hương Vị Tây Ninh',
    name: 'Bánh Tráng Cuộn Gà Lá Chanh - 100G',
    desc: 'Gà xé cay thoảng hương thơm thảo mộc lá chanh non, sấy vô trùng cuốn bánh dẻo giòn tan rụm.',
    shelfLife: 'Hạn dùng: 06 tháng',
    packaging: 'Thùng: 30 gói',
    flavor: 'Gà Xé Lá Chanh',
  },
  {
    id: 4,
    category: 'bap-no',
    badge: 'CÔNG NGHỆ CAO',
    badgeClass: 'bg-[#fe932c] text-white',
    weight: 'Hũ / Túi',
    image: '/assets/stitch/product_showcase_4.png',
    origin: 'Hạt Bắp Non-GMO',
    name: 'Bắp Rang Bơ Nổ Phô Mai Caramel',
    desc: 'Hạt bắp tuyển chọn sấy nổ bung tròn tơi xốp, áo đều lớp bơ thực vật hoặc bột phô mai hảo hạng.',
    shelfLife: 'Hạn dùng: 09 tháng',
    packaging: 'Đóng hũ & túi zip',
    flavor: 'Phô Mai & Bơ Sữa',
  },
]

export default function FlagshipFeaturedProducts({ onOpenRfq }) {
  const [activeTab, setActiveTab] = useState('ALL')

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (activeTab === 'ALL') return true
    if (activeTab === 'BANH_TRANG') return p.category === 'banh-trang'
    if (activeTab === 'BAP_NO') return p.category === 'bap-no'
    return true
  })

  return (
    <section
      id="he-sinh-thai-san-pham"
      aria-label="Danh Mục Thực Phẩm & Đồ Ăn Vặt Cao Cấp"
      className="py-16 sm:py-24 bg-[#FAF9F6] text-[#131b2e]"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-[#e2e7ff]/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c]" />
              <span>DANH MỤC THỰC PHẨM &amp; ĐỒ ĂN VẶT CAO CẤP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c1e15] tracking-tight">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-[#52665a] text-xs sm:text-sm lg:text-base mt-2">
              Được yêu thích hàng đầu tại hơn 10.000 điểm bán toàn quốc. Ứng dụng quy trình sấy vô trùng công nghệ cao, cam kết không chất bảo quản độc hại.
            </p>
          </div>

          {/* Product Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs shadow-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'ALL'
                  ? 'bg-[#003527] text-white shadow-md'
                  : 'bg-white hover:bg-neutral-100 text-[#52665a]'
              }`}
            >
              Tất Cả Sản Phẩm
            </button>
            <button
              onClick={() => setActiveTab('BANH_TRANG')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'BANH_TRANG'
                  ? 'bg-[#003527] text-white shadow-md'
                  : 'bg-white hover:bg-neutral-100 text-[#52665a]'
              }`}
            >
              Bánh Tráng Sấy Giòn HOKI
            </button>
            <button
              onClick={() => setActiveTab('BAP_NO')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'BAP_NO'
                  ? 'bg-[#003527] text-white shadow-md'
                  : 'bg-white hover:bg-neutral-100 text-[#52665a]'
              }`}
            >
              Bắp Rang Nổ Công Nghệ Cao
            </button>
          </div>
        </div>

        {/* 4 Column Luxury Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 sm:pt-10">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-neutral-200/80 hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative bg-[#f4f7f4] p-6 flex items-center justify-center overflow-hidden h-60 sm:h-64">
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full font-bold text-[10px] sm:text-[11px] uppercase tracking-wider ${prod.badgeClass}`}>
                    {prod.badge}
                  </span>
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded bg-white/90 text-neutral-600 text-[11px] font-mono shadow-sm">
                    {prod.weight}
                  </span>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    width="260"
                    height="260"
                    loading="lazy"
                    className="h-44 sm:h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6">
                  <div className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">
                    {prod.origin}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0c1e15] group-hover:text-emerald-800 transition-colors mt-1 leading-snug line-clamp-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#52665a] mt-2 line-clamp-2 leading-relaxed">
                    {prod.desc}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-[11px] text-[#707974]">
                    <span className="px-2 py-0.5 rounded bg-neutral-100">{prod.shelfLife}</span>
                    <span className="px-2 py-0.5 rounded bg-neutral-100">{prod.packaging}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-[#b45309]">{prod.flavor}</span>
                <button
                  onClick={() => (onOpenRfq ? onOpenRfq(prod.name) : null)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-[#fe932c] group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>Nhận báo giá</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Catalog Download Master Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#00281d] to-[#003527] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-[#fe932c]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 sm:gap-5 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#fe932c] text-white flex items-center justify-center shrink-0 shadow-lg">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h4 className="text-lg sm:text-2xl font-bold">
                Tải Toàn Bộ Hồ Sơ Danh Mục Sản Phẩm
              </h4>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                (HAQ Food B2B Product Catalog 2025 • Đầy đủ quy cách đóng gói, thông số thùng &amp; giá sỉ)
              </p>
            </div>
          </div>

          <a
            href="/assets/stitch/logo_haq.png"
            download="HAQ_FOOD_Catalog_2025.png"
            onClick={(e) => {
              if (onOpenRfq) {
                // Also optionally trigger RFQ modal
              }
            }}
            className="inline-flex items-center gap-2.5 bg-white text-[#003527] hover:bg-[#fe932c] hover:text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all shadow-lg shrink-0 relative z-10 cursor-pointer"
          >
            <span>Tải Catalog B2B (PDF 18MB)</span>
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
