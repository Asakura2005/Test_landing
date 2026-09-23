import React, { useState } from 'react'
import { Globe, MapPin, Sparkles, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react'

const REGIONS = {
  tayninh: {
    id: 'tayninh',
    name: 'Tây Ninh',
    badge: 'Thánh Địa Bánh Tráng & Muối Tôm',
    code: 'VN-TN-72',
    zone: 'Miền Nam - Đông Nam Bộ',
    title: 'ĐẶC SẢN TÂY NINH - NGUỒN GỐC & VÙNG NGUYÊN LIỆU',
    desc: 'Tây Ninh được mệnh danh là thánh địa ẩm thực của bánh tráng phơi sương Trảng Bàng và muối tôm trứ danh. HAQ Food đã chuẩn hóa công nghệ sấy giòn khép kín vô trùng hiện đại, giữ vẹn nguyên hương vị cay cay ngọt dịu của mực tôm tươi kết hợp độ giòn xốp ròn rã đạt tiêu chuẩn xuất khẩu chính ngạch sang Mỹ, Nhật Bản và Hàn Quốc.',
    products: [
      {
        name: 'Bánh Tráng Trộn Cuộn Khô Mực - 90G',
        weight: '90G',
        tag: 'Bestseller',
        tagColor: 'bg-[#fe932c]',
        flavor: 'Vị Mực Cay Ngọt',
        image: '/assets/stitch/product_showcase_1.png',
        desc: 'Mực rim thơm cay ngọt phủ trên từng thớ bánh tráng cuốn sấy giòn rụm béo thơm.',
      },
      {
        name: 'Bánh Tráng Trộn Sợi Sa Tế Tôm - 100g',
        weight: '100G',
        tag: 'Chuẩn Vị',
        tagColor: 'bg-emerald-600',
        flavor: 'Sa Tế Tôm Nồng',
        image: '/assets/stitch/product_showcase_2.png',
        desc: 'Sợi bánh mềm dai xốt sa tế cay nồng, ruốc tôm sấy thơm nức mũi.',
      },
      {
        name: 'Bánh Tráng Cuộn Gà Lá Chanh - 100G',
        weight: '100G',
        tag: 'Độc Đáo',
        tagColor: 'bg-amber-600',
        flavor: 'Gà Cay Thanh Nhẹ',
        image: '/assets/stitch/product_showcase_3.png',
        desc: 'Gà xé cay thơm hương lá chanh tươi, giòn tan đa tầng kích thích vị giác.',
      },
    ],
  },
  hanoi: {
    id: 'hanoi',
    name: 'Hà Nội',
    badge: 'Trung Tâm R&D & Tổng Bộ Cung Ứng',
    code: 'VN-HN-01',
    zone: 'Miền Bắc',
    title: 'HÀ NỘI - TRỤ SỞ ĐIỀU HÀNH & PHÁT TRIỂN CÔNG THỨC (R&D)',
    desc: 'Thủ đô Hà Nội là trung tâm nghiên cứu phát triển (R&D) của HAQ Food. Nơi quy tụ đội ngũ chuyên gia ẩm thực hàng đầu, liên tục tinh chỉnh công thức, thử nghiệm mẫu bắt trend trong 72 giờ và điều phối mạng lưới nhà máy đối tác toàn quốc.',
    products: [
      {
        name: 'Bánh Đậu Xanh Tươi Truyền Thống - Hộp Quà',
        weight: '180G',
        tag: 'Di Sản',
        tagColor: 'bg-emerald-600',
        flavor: 'Ngọt Dịu Thanh Mát',
        image: '/assets/stitch/product_showcase_1.png',
        desc: 'Hạt đậu xanh tuyển chọn nghiền mịn, lưu giữ hương vị thanh tao truyền thống.',
      },
      {
        name: 'Bánh Tráng Trộn Sợi Sa Tế Tôm - 100g',
        weight: '100G',
        tag: 'Bán Chạy',
        tagColor: 'bg-[#fe932c]',
        flavor: 'Sa Tế Đậm Đà',
        image: '/assets/stitch/product_showcase_2.png',
        desc: 'Công thức xốt độc quyền điều vị phù hợp thị hiếu tiêu dùng cả 3 miền.',
      },
      {
        name: 'Bắp Rang Bơ Nổ Phô Mai Caramel',
        weight: '120G',
        tag: 'Công Nghệ Cao',
        tagColor: 'bg-amber-600',
        flavor: 'Bơ Sữa Phô Mai',
        image: '/assets/stitch/product_showcase_4.png',
        desc: 'Đóng gói hũ tiện lợi, chuẩn phân phối chuỗi siêu thị tiện ích hiện đại.',
      },
    ],
  },
  dongnai: {
    id: 'dongnai',
    name: 'Đồng Nai',
    badge: 'Vùng Nông Sản Bắp Hạt Sạch Non-GMO',
    code: 'VN-DN-39',
    zone: 'Miền Nam - Đông Nam Bộ',
    title: 'ĐỒNG NAI - VÙNG NGUYÊN LIỆU NÔNG SẢN & BẮP NỔ CÔNG NGHỆ CAO',
    desc: 'Vùng đất Đồng Nai trù phú cung cấp nguồn bắp hạt sạch Non-GMO đạt chuẩn quốc tế. HAQ Food ứng dụng dây chuyền sấy nổ khí nóng vô trùng hiện đại, giúp hạt bắp bung tròn đều đặn, giòn xốp tự nhiên mà không ngấm dầu chiên.',
    products: [
      {
        name: 'Bắp Rang Bơ Nổ Phô Mai Caramel',
        weight: 'Hũ 120G',
        tag: 'Bestseller',
        tagColor: 'bg-[#fe932c]',
        flavor: 'Phô Mai Caramel',
        image: '/assets/stitch/product_showcase_4.png',
        desc: 'Hạt bắp Non-GMO nổ bung giòn tan, áo lớp caramel thơm lừng hảo hạng.',
      },
      {
        name: 'Bánh Tráng Trộn Cuộn Khô Mực - 90G',
        weight: '90G',
        tag: 'Đặc Sản',
        tagColor: 'bg-emerald-600',
        flavor: 'Mực Cay Thơm',
        image: '/assets/stitch/product_showcase_1.png',
        desc: 'Kết hợp tinh hoa ẩm thực đường phố vào quy cách đóng gói xuất khẩu.',
      },
      {
        name: 'Bánh Tráng Cuộn Gà Lá Chanh - 100G',
        weight: '100G',
        tag: 'Thảo Mộc',
        tagColor: 'bg-amber-600',
        flavor: 'Gà Cay Lá Chanh',
        image: '/assets/stitch/product_showcase_3.png',
        desc: 'Thịt gà xé sợi tẩm ướp đậm vị thảo mộc lá chanh truyền thống.',
      },
    ],
  },
}

export default function FlagshipTerroirMap({ onOpenRfq, onToggleGisMap }) {
  const [activeRegionKey, setActiveRegionKey] = useState('tayninh')
  const [activeFilter, setActiveFilter] = useState('ALL')

  const region = REGIONS[activeRegionKey] || REGIONS.tayninh

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    if (filter === 'BAC') setActiveRegionKey('hanoi')
    else if (filter === 'NAM') setActiveRegionKey('tayninh')
    else if (filter === 'TRUNG') setActiveRegionKey('tayninh')
    else setActiveRegionKey('tayninh')
  }

  return (
    <section
      id="he-sinh-thai-dac-san"
      aria-label="Bản Đồ Nguồn Gốc & Hệ Sinh Thái Nông Sản"
      className="py-16 sm:py-24 bg-[#011e16] text-white relative overflow-hidden"
    >
      {/* Background Ambient Glow & Grid lines */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-700/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#fe932c]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#fe932c] text-xs font-bold uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Bản Đồ Nguồn Gốc &amp; Hệ Sinh Thái Nông Sản Quốc Gia</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              HỆ SINH THÁI ĐẶC SẢN &amp; <br />
              <span className="gold-shimmer">BẢN ĐỒ VÙNG NGUYÊN LIỆU</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm lg:text-base mt-3 leading-relaxed font-light">
              Mỗi sản phẩm HAQ Food mang trong mình căn cước địa lý rõ ràng: từ thổ nhưỡng trù phú Tây Ninh, cao nguyên Đồng Nai đến thủ phủ nghiên cứu Hà Nội. Chọn từng vùng để khám phá chuỗi giá trị và quy cách xuất khẩu.
            </p>
          </div>

          {/* Region Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleFilterClick('ALL')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-gradient-to-r from-[#fe932c] to-[#ea580c] text-white shadow-lg shadow-[#fe932c]/30'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              Toàn Quốc
            </button>
            <button
              onClick={() => handleFilterClick('BAC')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === 'BAC'
                  ? 'bg-gradient-to-r from-[#fe932c] to-[#ea580c] text-white shadow-lg shadow-[#fe932c]/30'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              Miền Bắc (Hà Nội)
            </button>
            <button
              onClick={() => handleFilterClick('NAM')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === 'NAM'
                  ? 'bg-gradient-to-r from-[#fe932c] to-[#ea580c] text-white shadow-lg shadow-[#fe932c]/30'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              Miền Nam (Tây Ninh • Đồng Nai)
            </button>
          </div>
        </div>

        {/* 2 Columns Exhibition Layout: Interactive Vietnam Map (Left) & Showcase Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 sm:pt-10 items-stretch">
          {/* LEFT COLUMN: Artistic Stylized Vietnam Vector Map (5 cols) */}
          <div className="lg:col-span-5 bg-white/[0.04] backdrop-blur-2xl rounded-3xl p-5 sm:p-7 border border-white/10 flex flex-col justify-between relative shadow-2xl overflow-hidden group">
            {/* Map Tools Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-20">
              <div className="flex items-center gap-2 text-xs text-[#b0f0d6] bg-emerald-950/70 border border-emerald-500/30 px-3 py-1.5 rounded-lg shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-medium text-[11px] sm:text-xs">Chạm điểm sáng để đổi vùng</span>
              </div>
              {onToggleGisMap && (
                <button
                  onClick={onToggleGisMap}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white/90 hover:text-white transition-colors cursor-pointer"
                  title="Mở rộng bản đồ GIS chi tiết"
                >
                  <Layers className="w-3.5 h-3.5 text-[#fe932c]" />
                  <span className="text-[11px] font-semibold">Bản đồ GIS</span>
                </button>
              )}
            </div>

            {/* Stylized S-Shaped Vietnam SVG Container with Radar Wave Pings */}
            <div className="relative w-full h-[460px] sm:h-[540px] flex items-center justify-center my-3">
              <svg
                className="w-full h-full max-h-[540px] object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                fill="none"
                viewBox="0 0 400 650"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Vietnam Landmass Silhouette */}
                <path
                  d="M120 40 C140 30, 180 35, 195 55 C210 70, 220 85, 205 105 C190 125, 160 135, 150 150 C145 160, 155 180, 175 210 C195 240, 215 270, 230 300 C240 320, 245 350, 240 380 C235 410, 220 435, 200 460 C185 480, 175 495, 160 515 C150 530, 140 550, 125 565 C115 575, 95 570, 90 550 C85 530, 100 510, 115 490 C130 470, 145 440, 155 410 C165 380, 165 350, 150 320 C135 290, 120 250, 115 210 C110 170, 115 130, 125 90 Z"
                  fill="url(#vietnamGradient)"
                  opacity="0.95"
                  stroke="#10b981"
                  strokeWidth="1.8"
                />
                {/* Paracel & Spratly Islands (Hoàng Sa & Trường Sa) */}
                <g opacity="0.85">
                  <circle cx="310" cy="280" fill="#fe932c" r="4" />
                  <circle cx="322" cy="275" fill="#ffdcc3" r="3" />
                  <circle cx="328" cy="290" fill="#fe932c" r="3" />
                  <text fill="#95d3ba" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="9" fontWeight="700" letterSpacing="1" x="235" y="260">
                    QUẦN ĐẢO HOÀNG SA
                  </text>
                  <circle cx="280" cy="485" fill="#fe932c" r="4" />
                  <circle cx="295" cy="498" fill="#ffdcc3" r="3.5" />
                  <circle cx="310" cy="515" fill="#fe932c" r="3" />
                  <text fill="#95d3ba" fontFamily="'Be Vietnam Pro', sans-serif" fontSize="9" fontWeight="700" letterSpacing="1" x="230" y="470">
                    QUẦN ĐẢO TRƯỜNG SA
                  </text>
                </g>
                <defs>
                  <linearGradient id="vietnamGradient" x1="100" x2="250" y1="40" y2="580" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#064e3b" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#003527" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#002117" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* HOTSPOT 1: HÀ NỘI */}
              <div
                onClick={() => setActiveRegionKey('hanoi')}
                className={`absolute top-[14%] left-[34%] group cursor-pointer transition-transform hover:scale-110 z-20 ${
                  activeRegionKey === 'hanoi' ? 'scale-110 z-30' : ''
                }`}
              >
                <div className="relative flex items-center">
                  <span className="flex h-5 w-5 relative items-center justify-center">
                    <span className="radar-ring w-6 h-6 border-2 border-emerald-400 bg-emerald-400/20" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white shadow-[0_0_10px_#10b981]" />
                  </span>
                  <div className={`ml-2 px-3 py-1 rounded-lg border shadow-xl whitespace-nowrap text-[11px] font-bold text-white flex items-center gap-1.5 transition-all ${
                    activeRegionKey === 'hanoi'
                      ? 'bg-emerald-900/95 border-emerald-400 ring-2 ring-emerald-400/50'
                      : 'bg-[#002117]/90 border-emerald-500/40'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Hà Nội (HQ &amp; R&amp;D)</span>
                  </div>
                </div>
              </div>

              {/* HOTSPOT 2: ĐỒNG NAI */}
              <div
                onClick={() => setActiveRegionKey('dongnai')}
                className={`absolute top-[65%] left-[45%] group cursor-pointer transition-transform hover:scale-110 z-20 ${
                  activeRegionKey === 'dongnai' ? 'scale-110 z-30' : ''
                }`}
              >
                <div className="relative flex items-center">
                  <span className="flex h-5 w-5 relative items-center justify-center">
                    <span className="radar-ring w-6 h-6 border-2 border-amber-400 bg-amber-400/20" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-white shadow-[0_0_10px_#f59e0b]" />
                  </span>
                  <div className={`ml-2 px-3 py-1 rounded-lg border shadow-xl whitespace-nowrap text-[11px] font-bold text-white flex items-center gap-1.5 transition-all ${
                    activeRegionKey === 'dongnai'
                      ? 'bg-amber-900/95 border-amber-400 ring-2 ring-amber-400/50'
                      : 'bg-[#002117]/90 border-amber-500/40'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Đồng Nai (Bắp Nổ Sạch)</span>
                  </div>
                </div>
              </div>

              {/* HOTSPOT 3: TÂY NINH (ACTIVE SPOTLIGHT) */}
              <div
                onClick={() => setActiveRegionKey('tayninh')}
                className={`absolute top-[76%] left-[28%] cursor-pointer z-30 ${
                  activeRegionKey === 'tayninh' ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div className="relative flex items-center">
                  <span className="flex h-7 w-7 relative items-center justify-center">
                    <span className="radar-ring w-10 h-10 border-2 border-[#fe932c] bg-[#fe932c]/30" />
                    <span className="radar-ring w-14 h-14 border border-[#fe932c]/50 delay-500" />
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-tr from-[#fe932c] to-yellow-300 border-2 border-white shadow-[0_0_20px_#fe932c] flex items-center justify-center text-[10px] font-black text-black">
                      ✓
                    </span>
                  </span>
                  <div className={`ml-2.5 px-3.5 py-1.5 rounded-xl text-white font-extrabold text-xs tracking-wider shadow-[0_0_20px_rgba(254,147,44,0.5)] border flex items-center gap-2 transition-all ${
                    activeRegionKey === 'tayninh'
                      ? 'bg-gradient-to-r from-[#fe932c] to-[#ea580c] border-white/40 ring-2 ring-[#fe932c]/60'
                      : 'bg-[#002117]/90 border-[#fe932c]/60'
                  }`}>
                    <span>TÂY NINH</span>
                    <span className="text-[9px] bg-black/40 px-1.5 py-0.5 rounded text-white uppercase font-bold">
                      Thủ Phủ
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 ml-6 sm:ml-8 bg-black/80 backdrop-blur-md border border-[#fe932c]/40 text-[#ffdcc3] text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap font-medium flex items-center gap-1">
                  <span>★ Đặc sản Bánh Tráng Phơi Sương</span>
                </div>
              </div>

              {/* HOTSPOT 4: BẾN TRE */}
              <div
                onClick={() => setActiveRegionKey('tayninh')}
                className="absolute top-[86%] left-[32%] group cursor-pointer transition-transform hover:scale-110 z-20"
              >
                <div className="relative flex items-center">
                  <span className="flex h-4 w-4 relative items-center justify-center">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400 border border-white shadow" />
                  </span>
                  <div className="ml-2 px-2 py-0.5 rounded-md bg-[#002117]/80 border border-teal-500/30 text-[10px] text-white/80 font-semibold whitespace-nowrap">
                    Bến Tre (Dừa &amp; Nông Sản)
                  </div>
                </div>
              </div>
            </div>

            {/* Map Footnote */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c] animate-ping" />
                <span>
                  Vùng đang chọn: <strong className="text-white">{region.name} ({region.badge})</strong>
                </span>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Terroir Story Card & 3 Featured Products (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Terroir Story Card */}
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/15 relative overflow-hidden shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-[#fe932c] text-white font-bold text-xs uppercase tracking-wider shadow-md">
                    {region.badge}
                  </span>
                  <span className="text-xs text-white/60 font-mono tracking-wider">MÃ VÙNG: {region.code}</span>
                </div>
                {/* Region Quick Switcher */}
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setActiveRegionKey('tayninh')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      activeRegionKey === 'tayninh' ? 'bg-[#fe932c] text-white shadow' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Tây Ninh
                  </button>
                  <button
                    onClick={() => setActiveRegionKey('dongnai')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      activeRegionKey === 'dongnai' ? 'bg-[#fe932c] text-white shadow' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Đồng Nai
                  </button>
                  <button
                    onClick={() => setActiveRegionKey('hanoi')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      activeRegionKey === 'hanoi' ? 'bg-[#fe932c] text-white shadow' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Hà Nội
                  </button>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {region.title}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed mt-2.5 font-light">
                {region.desc}
              </p>
            </div>

            {/* 3 Featured Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {region.products.map((prod, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl rounded-2xl p-4 border border-white/15 hover:border-[#fe932c] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="w-full h-40 sm:h-44 rounded-xl bg-white/10 overflow-hidden flex items-center justify-center p-3 relative mb-3 border border-white/10">
                      <span className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full ${prod.tagColor} text-white font-bold text-[10px] uppercase shadow`}>
                        {prod.tag}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white/90 text-[10px] font-mono">
                        {prod.weight}
                      </span>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        width="300"
                        height="300"
                        loading="lazy"
                        className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] text-[#ffdcc3] font-bold tracking-wider uppercase">
                      Đặc Sản {region.name}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ffdcc3] transition-colors mt-0.5 leading-snug line-clamp-2">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-white/70 mt-1.5 line-clamp-2 leading-relaxed font-light">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#fe932c]">{prod.flavor}</span>
                    <button
                      onClick={() => (onOpenRfq ? onOpenRfq(prod.name) : null)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-[#ffdcc3] group-hover:translate-x-1 transition-all cursor-pointer"
                    >
                      <span>Báo giá</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
