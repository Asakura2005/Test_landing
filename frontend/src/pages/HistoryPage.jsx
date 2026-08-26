import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Milestone,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Store,
  Factory,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

import factoryImg from '../assets/factory/factory_production.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import catBanhImg from '../assets/categories/category_banh.jpg'

// Partners logos
import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'

const MILESTONES = [
  {
    year: '2021',
    phase: 'GIAI ĐOẠN 01',
    title: 'ĐẶT NỀN MÓNG & DÂY CHUYỀN KHÉP KÍN ĐẦU TIÊN',
    headline: 'Khởi nghiệp với khát vọng chuẩn hóa món ăn vặt truyền thống Việt Nam',
    desc: 'Thành lập Công ty Cổ phần HAQ Hà Nội. Đầu tư xây dựng dây chuyền sản xuất bánh tráng sấy giòn khép kín đầu tiên, đạt các chứng chỉ an toàn vệ sinh thực phẩm và ký kết hợp đồng phân phối với các đối tác thương mại.',
    highlights: [
      'Thành lập pháp nhân Công ty Cổ phần HAQ Hà Nội tại Thủ đô Hà Nội.',
      'Hoàn thiện xưởng chế biến bánh tráng sấy giòn với công nghệ sấy nhiệt sạch.',
      'Ra mắt dòng sản phẩm chủ lực: Bánh tráng sấy giòn vị bò, tôm & sa tế.',
    ],
    image: heroBanner1,
    icon: Factory,
    metric: 'NĂM THÀNH LẬP',
    metricVal: '2021',
  },
  {
    year: '2022',
    phase: 'GIAI ĐOẠN 02',
    title: 'R&D ĐA DẠNG HÓA SẢN PHẨM & MỞ RỘNG DANH MỤC',
    headline: 'Mở rộng hệ sinh thái thực phẩm đóng gói an toàn',
    desc: 'Đầu tư mạnh mẽ vào phòng R&D nhằm chuẩn hóa công thức gia truyền kết hợp công nghệ hiện đại. Ra mắt thêm 4 nhóm sản phẩm mới: Bánh hạnh nhân thượng hạng, Bánh đậu xanh tươi, Bắp rang bơ sấy nổ và Thịt khô ăn liền.',
    highlights: [
      'Nghiên cứu thành công công thức Bánh hạnh nhân giòn xốp và Đậu xanh tươi nguyên chất.',
      'Đưa vào vận hành buồng nổ bắp rang bơ công nghệ cao hạt tròn đều.',
      'Mở rộng danh mục lên hơn 15+ quy cách sản phẩm đóng gói.',
    ],
    image: catBanhImg,
    icon: Sparkles,
    metric: 'NHÓM SẢN PHẨM MỚI',
    metricVal: '+4 DÒNG',
  },
  {
    year: '2023',
    phase: 'GIAI ĐOẠN 03',
    title: 'BÙNG NỔ HỆ THỐNG PHÂN PHỐI HIỆN ĐẠI TOÀN QUỐC',
    headline: 'Phủ sóng hơn 3.000+ điểm bán tại các đại siêu thị và chuỗi tiện lợi',
    desc: 'HAQ FOOD tạo bước nhảy vọt về mạng lưới thương mại khi chính thức trở thành nhà cung cấp cho các tập đoàn bán lẻ hàng đầu tại Việt Nam: WinMart, GO!, Circle K, GS25, K-Market và Bách Hóa Xanh.',
    highlights: [
      'Ký kết hợp tác chiến lược cung ứng cho WinMart, GO! và chuỗi Circle K, GS25.',
      'Sản phẩm hiện diện tại hơn 3.000+ kệ hàng trên toàn quốc.',
      'Nâng cao năng lực logistics và kho vận lưu trữ pallet tiêu chuẩn.',
    ],
    image: b2bImg,
    icon: Store,
    metric: 'ĐIỂM BÁN PHỦ SÓNG',
    metricVal: '3.000+',
  },
  {
    year: '2024',
    phase: 'GIAI ĐOẠN 04',
    title: 'VƯƠN TẦM QUỐC TẾ — XUẤT KHẨU HÀN QUỐC & ĐÀI LOAN',
    headline: 'Khẳng định chất lượng thực phẩm Việt tại các thị trường khắt khe',
    desc: 'Vượt qua các vòng thẩm định kỹ thuật và tiêu chuẩn kiểm nghiệm nghiêm ngặt của đối tác ngoại, HAQ FOOD chính thức xuất khẩu các lô hàng chính ngạch đầu tiên sang thị trường Hàn Quốc và Đài Loan.',
    highlights: [
      'Đạt chứng nhận hệ thống quản lý an toàn thực phẩm ISO 22000:2018 & HACCP Codex.',
      'Xuất khẩu thành công các dòng bánh nướng và bánh tráng sang Hàn Quốc & Đài Loan.',
      'Chuẩn hóa bao bì đa ngôn ngữ theo quy chuẩn hải quan quốc tế.',
    ],
    image: exportImg,
    icon: Globe2,
    metric: 'THỊ TRƯỜNG CHÂU Á',
    metricVal: '02 QUỐC GIA',
  },
  {
    year: '2025–2026',
    phase: 'GIAI ĐOẠN 05',
    title: 'ĐỔI MỚI CÔNG NGHỆ & MỞ RỘNG GIAO THƯƠNG QUỐC TẾ',
    headline: 'Tự động hóa phòng sạch và xúc tiến thương mại toàn diện',
    desc: 'Tham gia Hội chợ Giao thương Quốc tế Việt - Trung, nâng cấp dây chuyền đóng gói vô trùng áp suất dương và mở rộng dịch vụ gia công OEM/ODM trọn gói cho các thương hiệu lớn.',
    highlights: [
      'Góp mặt tại các triển lãm thực phẩm và xúc tiến thương mại song phương.',
      'Đầu tư hệ thống kiểm soát nhiệt độ & độ ẩm tự động trong phòng sạch.',
      'Định hướng tiếp tục mở rộng sang thị trường Nhật Bản và khu vực Đông Nam Á.',
    ],
    image: factoryImg,
    icon: TrendingUp,
    metric: 'TIÊU CHUẨN KIỂM SOÁT',
    metricVal: '100% ISO',
  },
]

export default function HistoryPage() {
  const [selectedYear, setSelectedYear] = useState('2021')
  const currentMilestone = MILESTONES.find((m) => m.year === selectedYear) || MILESTONES[0]

  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* 1. Executive Milestone Hero */}
        <section className="bg-haq-ink text-white py-16 sm:py-24 border-b border-black/10 relative overflow-hidden">
          {/* Subtle Tech Coordinate Grid Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
                VỀ CHÚNG TÔI · LỊCH SỬ PHÁT TRIỂN
              </span>
              <span className="h-px w-10 bg-haq-gold" />
            </div>

            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight max-w-4xl">
              HÀNH TRÌNH TĂNG TRƯỞNG & <br />
              <span className="text-haq-red">DẤU MỐC ĐỘT PHÁ</span>
            </h1>

            <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/75 max-w-2xl leading-relaxed">
              Khởi đầu từ năm 2021 tại Hà Nội, HAQ FOOD không ngừng đầu tư công nghệ, chuẩn hóa chất lượng và mở rộng mạng lưới để đưa thực phẩm Việt chất lượng cao vươn tầm châu Á.
            </p>

            {/* Quick Metrics Strip */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
              <div>
                <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">NĂM THÀNH LẬP</div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-haq-gold mt-1">2021</div>
              </div>
              <div>
                <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">ĐIỂM BÁN LẺ</div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">3.000+</div>
              </div>
              <div>
                <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">XUẤT KHẨU</div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-haq-red mt-1">02 NƯỚC</div>
              </div>
              <div>
                <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">TIÊU CHUẨN</div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">ISO 22000</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Corporate Timeline Scrubber */}
        <section className="bg-white border-b border-black/10 py-6 sticky top-[68px] sm:top-[72px] z-30 shadow-xs">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-mono font-bold text-haq-ink/40 uppercase mr-3 shrink-0 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-haq-red" />
                <span>CHỌN MỐC THỜI GIAN:</span>
              </span>

              {MILESTONES.map((item) => {
                const isSelected = selectedYear === item.year
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setSelectedYear(item.year)}
                    className={`px-5 py-2.5 rounded-full text-xs font-heading font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-haq-red text-white shadow-sm scale-102'
                        : 'bg-haq-bone text-haq-ink/75 hover:bg-black/5 hover:text-haq-ink'
                    }`}
                  >
                    <span>{item.year}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-haq-ink/50'
                    }`}>
                      {item.phase}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 3. Detailed Milestone Showcase (Selected Phase) */}
        <section className="py-16 sm:py-24 bg-haq-bone border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Visual Asset */}
              <div className="lg:col-span-6 relative aspect-16/10 rounded-3xl overflow-hidden shadow-xl border border-black/10 bg-haq-ink">
                <img
                  src={currentMilestone.image}
                  alt={currentMilestone.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-haq-red text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                  {currentMilestone.phase} · NĂM {currentMilestone.year}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs font-mono text-xs font-bold text-haq-ink px-3 py-1 rounded-full border border-black/5">
                  {currentMilestone.metric}: {currentMilestone.metricVal}
                </div>
              </div>

              {/* Right Column: Narrative & Highlights */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-heading font-black text-4xl sm:text-5xl text-haq-red">
                      {currentMilestone.year}
                    </span>
                    <span className="h-px flex-1 bg-black/10" />
                  </div>

                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink uppercase leading-snug">
                    {currentMilestone.title}
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm font-mono font-bold text-haq-red/90 uppercase tracking-wider">
                    {currentMilestone.headline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
                  {currentMilestone.desc}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 pt-2">
                  {currentMilestone.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-black/5">
                      <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                      <span className="text-xs text-haq-ink/80 leading-relaxed font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Complete Chronological Corporate Timeline List (Swiss Grid Style) */}
        <section className="py-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                TIMELINE ARCHITECTURE
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                Toàn Cảnh Các Dấu Mốc Lịch Sử
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-ink/70">
                Theo dõi quá trình chuyển mình của HAQ FOOD qua từng mốc thời gian cụ thể.
              </p>
            </div>

            <div className="space-y-6">
              {MILESTONES.map((item, idx) => {
                const isSelected = selectedYear === item.year
                return (
                  <div
                    key={item.year}
                    onClick={() => setSelectedYear(item.year)}
                    className={`cursor-pointer p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-haq-bone border-haq-red shadow-md scale-[1.01]'
                        : 'bg-white border-black/10 hover:border-black/25 hover:bg-haq-bone/40'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-3">
                        <span className="font-heading font-black text-4xl sm:text-5xl text-haq-red block">
                          {item.year}
                        </span>
                        <span className="font-mono text-xs font-bold text-haq-ink/50 uppercase tracking-widest">
                          {item.phase}
                        </span>
                      </div>

                      <div className="lg:col-span-7 space-y-2">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-haq-ink uppercase">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-haq-ink/70 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="lg:col-span-2 text-right lg:text-right">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase text-haq-red group-hover:text-haq-ink"
                        >
                          <span>CHI TIẾT</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 5. Navigation Bridge to Overview & Capabilities */}
        <section className="py-16 bg-haq-bone border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/gioi-thieu"
                className="group bg-white p-8 rounded-3xl border border-black/5 hover:border-haq-red shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                    CHUYÊN MỤC TIẾP THEO
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink group-hover:text-haq-red transition-colors uppercase">
                    01. Giới thiệu Tổng quan & Sứ mệnh
                  </h3>
                  <p className="text-xs text-haq-ink/70 mt-2 leading-relaxed">
                    Tìm hiểu triết lý kinh doanh, tầm nhìn chiến lược và 5 giá trị văn hóa cốt lõi của HAQ FOOD.
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red">
                  <span>XEM GIỚI THIỆU TỔNG QUAN →</span>
                </div>
              </Link>

              <Link
                to="/nang-luc"
                className="group bg-white p-8 rounded-3xl border border-black/5 hover:border-haq-red shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                    HẠ TẦNG KỸ THUẬT
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink group-hover:text-haq-red transition-colors uppercase">
                    Năng lực Sản xuất & Chất lượng ISO 22000
                  </h3>
                  <p className="text-xs text-haq-ink/70 mt-2 leading-relaxed">
                    Khám phá dây chuyền khép kín, quy trình kiểm soát 5 bước và dịch vụ gia công OEM/ODM.
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red">
                  <span>XEM TRANG NĂNG LỰC →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  )
}
