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
  Award,
  FileCheck,
  Building2,
  PackageCheck,
  Handshake,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

import factoryImg from '../assets/factory/factory_production.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import labImg from '../assets/quality/quality_control_lab.jpg'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'

// Retail Partners logos
import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'

const CHAPTERS = [
  {
    id: 'year-2021',
    year: '2021',
    phase: 'CHƯƠNG 01',
    theme: 'KHỞI NGUỒN & ĐẶT NỀN MÓNG',
    title: 'Thành lập Công ty & Vận hành Xưởng Sấy Giòn Khép Kín Đầu Tiên',
    lead: 'Bắt đầu từ khát vọng hiện đại hóa và chuẩn hóa món ăn vặt truyền thống Việt Nam bằng công nghệ sấy sạch.',
    desc: 'Công ty Cổ phần HAQ Hà Nội chính thức được thành lập tại Thủ đô Hà Nội. Doanh nghiệp đầu tư xây dựng nhà xưởng với dây chuyền sấy giòn khép kín đầu tiên, giải quyết triệt để bài toán an toàn vệ sinh thực phẩm và định hình thương hiệu HAQ FOOD trên thị trường.',
    achievements: [
      'Chính thức thành lập pháp nhân Công ty Cổ phần HAQ Hà Nội.',
      'Khánh thành phân xưởng sấy bánh tráng sạch với hệ thống gia nhiệt đối lưu.',
      'Ra mắt dòng sản phẩm chủ lực đầu tiên: Bánh tráng sấy giòn vị Bò, Tôm & Sa tế.',
      'Hoàn thiện hồ sơ công bố chất lượng và an toàn thực phẩm theo quy chuẩn nhà nước.',
    ],
    metric: 'NĂM THÀNH LẬP',
    metricVal: '2021',
    subMetric: 'XƯỞNG SẤY ĐẦU TIÊN',
    image: heroBanner1,
    icon: Factory,
    highlightBadge: 'NỀN MÓNG VỮNG CHẮC',
  },
  {
    id: 'year-2022',
    year: '2022',
    phase: 'CHƯƠNG 02',
    theme: 'ĐỔI MỚI R&D & ĐA DẠNG HÓA SẢN PHẨM',
    title: 'Đầu tư Nghiên cứu Phát triển & Mở Rộng 4 Nhóm Thực Phẩm Mới',
    lead: 'Nâng tầm công thức gia truyền kết hợp thiết bị nướng và sấy hiện đại, đáp ứng đa dạng khẩu vị người tiêu dùng.',
    desc: 'Đầu tư mạnh mẽ vào phòng nghiên cứu R&D, chuẩn hóa quy trình chế biến nông sản sạch. HAQ FOOD mở rộng danh mục từ bánh tráng sang các dòng bánh nướng thượng hạng, bánh đậu xanh truyền thống và đồ ăn khô ăn liền, nâng tổng số mã sản phẩm lên hơn 15+ SKU.',
    achievements: [
      'Nghiên cứu thành công công thức Bánh hạnh nhân giòn xốp và Bánh đậu xanh tươi thơm mịn.',
      'Đưa vào vận hành buồng nổ bắp rang bơ công nghệ cao, phủ caramel đều hạt.',
      'Bổ sung dây chuyền chế biến khô gà lá chanh, khô heo cháy tỏi chuẩn vị.',
      'Tái định vị bao bì sản phẩm sang phong cách hiện đại, tiện lợi, bảo quản dài lâu.',
    ],
    metric: 'QUY CÁCH SẢN PHẨM',
    metricVal: '15+ SKUs',
    subMetric: '4 DÒNG CHỦ LỰC',
    image: catBanhImg,
    icon: Sparkles,
    highlightBadge: 'ĐỔI MỚI SẢN PHẨM',
  },
  {
    id: 'year-2023',
    year: '2023',
    phase: 'CHƯƠNG 03',
    theme: 'BÙNG NỔ MẠNG LƯỚI PHÂN PHỐI QUỐC GIA',
    title: 'Phủ Sóng 3.000+ Điểm Bán Tại Các Đại Siêu Thị & Chuỗi Tiện Lợi',
    lead: 'Tạo bước nhảy vọt về thương mại khi đưa sản phẩm HAQ FOOD lên quầy kệ của các tập đoàn bán lẻ hàng đầu.',
    desc: 'HAQ FOOD trở thành đối tác cung ứng uy tín của các hệ thống bán lẻ lớn nhất Việt Nam. Mạng lưới phân phối mở rộng thần tốc khắp các tỉnh thành, đưa các sản phẩm bánh tráng và đồ ăn vặt chất lượng cao tiếp cận hàng triệu người tiêu dùng mỗi ngày.',
    achievements: [
      'Ký kết hợp đồng cung ứng toàn quốc với WinMart, WinMart+, GO! và Bách Hóa Xanh.',
      'Hiện diện mạnh mẽ trong các chuỗi cửa hàng tiện lợi 24/7: Circle K, GS25, K-Market.',
      'Vận hành mạng lưới kho bãi vệ tinh và logistics tiêu chuẩn lưu kho pallet.',
      'Được người tiêu dùng bình chọn là món ăn vặt được ưa chuộng hàng đầu.',
    ],
    metric: 'ĐIỂM BÁN PHỦ SÓNG',
    metricVal: '3.000+',
    subMetric: '6 HỆ THỐNG ĐẠI SIÊU THỊ',
    image: b2bImg,
    icon: Store,
    highlightBadge: 'PHỦ SÓNG TOÀN QUỐC',
  },
  {
    id: 'year-2024',
    year: '2024',
    phase: 'CHƯƠNG 04',
    theme: 'VƯƠN TẦM CHÂU Á — XUẤT KHẨU CHÍNH NGẠCH',
    title: 'Đạt Chuẩn Quốc Tế ISO 22000 & Xuất Khẩu Hàn Quốc, Đài Loan',
    lead: 'Khẳng định uy tín thực phẩm chế biến Việt Nam vượt qua các tiêu chuẩn kiểm định nghiêm ngặt của đối tác quốc tế.',
    desc: 'Sau quá trình thẩm định toàn diện về quy trình sản xuất và lưu mẫu, HAQ FOOD đạt chứng nhận hệ thống quản lý an toàn thực phẩm ISO 22000:2018 và HACCP Codex. Doanh nghiệp chính thức xuất khẩu những chuyến container đầu tiên sang thị trường Hàn Quốc và Đài Loan.',
    achievements: [
      'Đạt chứng chỉ quốc tế ISO 22000:2018 & HACCP Codex từ tổ chức giám định độc lập.',
      'Xuất khẩu chính ngạch thành công các lô hàng bánh nướng & bánh tráng sang Hàn Quốc & Đài Loan.',
      'Chuẩn hóa bao bì đa ngôn ngữ và tem nhãn hải quan theo quy định quốc tế.',
      'Nâng cấp phòng thí nghiệm nội bộ (QC Lab) kiểm tra vi sinh và độ ẩm từng lô xuất xưởng.',
    ],
    metric: 'THỊ TRƯỜNG QUỐC TẾ',
    metricVal: '02 NƯỚC',
    subMetric: 'ISO 22000 & HACCP',
    image: exportImg,
    icon: Globe2,
    highlightBadge: 'VƯƠN TẦM QUỐC TẾ',
  },
  {
    id: 'year-2025-2026',
    year: '2025–2026',
    phase: 'CHƯƠNG 05',
    theme: 'TỰ ĐỘNG HÓA CÔNG NGHỆ & GIAO THƯƠNG QUỐC TẾ',
    title: 'Nâng Cấp Phòng Sạch Vô Trùng & Mở Rộng Hợp Tác Gia Công OEM/ODM',
    lead: 'Hiện đại hóa toàn diện hạ tầng kỹ thuật, tham gia hội chợ thương mại quốc tế và mở rộng chuỗi cung ứng.',
    desc: 'HAQ FOOD liên tục đầu tư hệ thống tự động hóa cân đóng gói, kiểm soát môi trường phòng sạch áp suất dương. Đồng thời, doanh nghiệp tham gia các hội chợ giao thương quốc tế Việt - Trung để mở rộng dịch vụ gia công OEM/ODM và tiếp cận các thị trường mới như Nhật Bản và Đông Nam Á.',
    achievements: [
      'Tham gia Hội chợ Giao thương Quốc tế Việt - Trung, kết nối hơn 50+ đối tác B2B.',
      'Ứng dụng dây chuyền đóng gói vô trùng tự động kiểm soát độ ẩm và nhiệt độ.',
      'Cung cấp dịch vụ gia công trọn gói OEM/ODM cho các chuỗi F&B và thương hiệu đối tác.',
      'Định hướng xây dựng hệ sinh thái nông sản thực phẩm công nghệ cao bền vững.',
    ],
    metric: 'TIÊU CHUẨN KIỂM SOÁT',
    metricVal: '100% ISO',
    subMetric: 'OEM / ODM TRỌN GÓI',
    image: factoryImg,
    icon: TrendingUp,
    highlightBadge: 'HƯỚNG TỚI TƯƠNG LAI',
  },
]

const CREDENTIALS = [
  {
    title: 'ISO 22000:2018',
    sub: 'Hệ Thống Quản Lý An Toàn Thực Phẩm',
    desc: 'Chứng chỉ quốc tế kiểm soát nghiêm ngặt toàn bộ chuỗi chế biến từ nông sản thô đến thành phẩm đóng gói.',
    icon: Award,
  },
  {
    title: 'HACCP Codex Alimentarius',
    sub: 'Phân Tích Mối Nguy & Điểm Kiểm Soát Tới Hạn',
    desc: 'Đảm bảo loại bỏ mọi rủi ro về vật lý, hóa học và sinh học trong toàn bộ quá trình sản xuất.',
    icon: ShieldCheck,
  },
  {
    title: '3.000+ Kệ Hàng Bán Lẻ',
    sub: 'Mạng Lưới Đối Tác Chiến Lược',
    desc: 'Nhà cung ứng tin cậy của WinMart, GO!, Circle K, GS25, K-Market và Bách Hóa Xanh.',
    icon: Store,
  },
  {
    title: 'Xuất Khẩu Chính Ngạch',
    sub: 'Chinh Phục Thị Trường Khó Tính',
    desc: 'Sản phẩm đã được kiểm định và xuất khẩu sang thị trường Hàn Quốc và Đài Loan.',
    icon: Globe2,
  },
]

export default function HistoryPage() {
  const [activeYear, setActiveYear] = useState('2021')

  const scrollToChapter = (id, year) => {
    setActiveYear(year)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -140
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* 1. Bibica-Style Executive Milestone Hero */}
        <section className="bg-haq-dark text-white py-18 sm:py-28 border-b border-haq-border relative overflow-hidden">
          {/* Subtle Tech Coordinate Grid Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
                  VỀ CHÚNG TÔI · LỊCH SỬ & DẤU MỐC PHÁT TRIỂN
                </span>
                <span className="h-px w-10 bg-haq-gold" />
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
                HÀNH TRÌNH TĂNG TRƯỞNG & <br />
                <span className="text-haq-red">DẤU MỐC ĐỘT PHÁ (2021 — 2026)</span>
              </h1>

              <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl leading-relaxed">
                Từ xưởng sản xuất bánh tráng sấy giòn khép kín đầu tiên tại Hà Nội năm 2021, 
                HAQ FOOD đã không ngừng đổi mới công nghệ, chuẩn hóa chất lượng quốc tế và mở rộng mạng lưới để đưa thực phẩm Việt chất lượng cao phủ sóng toàn quốc và vươn tầm xuất khẩu châu Á.
              </p>

              {/* Quick Metrics Strip */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/15 pt-8">
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">NĂM KHỞI ĐẦU</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-haq-gold mt-1">2021</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Thành lập tại Hà Nội</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">DANH MỤC SẢN PHẨM</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">15+</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Quy cách đóng gói</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">ĐIỂM BÁN LẺ</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">3.000+</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Kệ hàng trên toàn quốc</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">XUẤT KHẨU NGOẠI</div>
                  <div className="font-heading font-black text-3xl sm:text-4xl text-haq-red mt-1">02 NƯỚC</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Hàn Quốc & Đài Loan</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Sticky Interactive Milestone Scrubber (Navigating Timeline) */}
        <section className="bg-white border-b border-haq-border py-4 sticky top-[68px] sm:top-[72px] z-30 shadow-xs backdrop-blur-md bg-white/95">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-mono font-bold text-haq-text-secondary uppercase mr-2 shrink-0 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-haq-red" />
                <span>CHỌN MỐC THỜI GIAN:</span>
              </span>

              {CHAPTERS.map((item) => {
                const isSelected = activeYear === item.year
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => scrollToChapter(item.id, item.year)}
                    className={`px-4 py-2 rounded-full text-xs font-heading font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-haq-red text-white shadow-sm scale-102'
                        : 'bg-haq-cream text-haq-text-secondary hover:bg-haq-cream/50 hover:text-haq-ink'
                    }`}
                  >
                    <span>{item.year}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-haq-soft text-haq-text-secondary'
                    }`}>
                      {item.phase}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* 3. Bibica-Style Alternating Chapters of Growth (Trục Lịch Sử Trực Quan) */}
        <section className="py-20 sm:py-28 bg-haq-cream">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  JOURNEY & MILESTONES
                </span>
                <span className="h-px w-8 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase">
                5 DẤU MỐC CHIẾN LƯỢC KIẾN TẠO THƯƠNG HIỆU
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                Khám phá chi tiết từng giai đoạn phát triển, các bước ngoặt mở rộng sản phẩm và thành tựu thương mại của HAQ FOOD.
              </p>
            </div>

            {/* Alternating Chapters Container */}
            <div className="space-y-20 sm:space-y-28 relative">
              {/* Central Vertical Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-12 bottom-12 left-1/2 w-0.5 bg-haq-border -translate-x-1/2" />

              {CHAPTERS.map((chap, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={chap.year}
                    id={chap.id}
                    className="relative scroll-mt-24 sm:scroll-mt-36"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
                      {/* Visual Media Column */}
                      <div className="lg:col-span-6">
                        <div className="relative aspect-video lg:aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-haq-border bg-haq-dark group">
                          <img
                            src={chap.image}
                            alt={chap.title}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-haq-dark/80 via-transparent to-transparent" />
                          
                          {/* Year Badge Overlay */}
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-haq-red text-white font-heading font-black text-[10px] sm:text-sm uppercase px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-md flex items-center gap-2">
                            <span>{chap.year}</span>
                            <span className="text-[9px] sm:text-[10px] font-mono opacity-80 hidden sm:inline">· {chap.phase}</span>
                          </div>

                          {/* Highlight Badge */}
                          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white">
                            <span className="font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg border border-white/10">
                              {chap.highlightBadge}
                            </span>
                            <span className="font-mono text-[9px] sm:text-xs font-bold text-haq-gold">
                              {chap.metric}: {chap.metricVal}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Narrative Column */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-mono text-[10px] sm:text-xs font-bold text-haq-red uppercase tracking-widest">
                              {chap.phase} · {chap.theme}
                            </span>
                          </div>

                          <h3 className="font-heading font-black text-xl sm:text-3xl text-haq-ink uppercase leading-snug">
                            {chap.title}
                          </h3>

                          <p className="mt-2 text-[11px] sm:text-sm font-mono font-bold text-haq-text-secondary leading-relaxed border-l-2 border-haq-red pl-3">
                            {chap.lead}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                          {chap.desc}
                        </p>

                        {/* Achievements Checklist (Bibica Style) */}
                        <div className="space-y-2 pt-1">
                          {chap.achievements.map((ach, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-haq-border shadow-2xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-haq-red shrink-0 mt-0.5" />
                              <span className="text-[11px] sm:text-xs text-haq-text-secondary leading-relaxed font-medium">
                                {ach}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </section>

        {/* 4. Credentials & Achievements Showcase (Học Hỏi Bibica) */}
        <section className="py-20 sm:py-24 bg-white border-y border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-4 border-b border-haq-border gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  CREDENTIALS & STANDARDS
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                  Nền Tảng Tiêu Chuẩn & Chứng Nhận Quốc Tế
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-haq-text-secondary max-w-md">
                Bảo chứng cho chất lượng đồng nhất, an toàn vệ sinh thực phẩm và uy tín hợp tác bền vững.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CREDENTIALS.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-haq-cream border border-haq-border hover:border-haq-red transition-all flex flex-col justify-between shadow-2xs hover:shadow-md"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-haq-red mb-4 shadow-2xs border border-haq-border">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-black text-lg text-haq-ink uppercase">
                        {item.title}
                      </h3>
                      <div className="font-mono text-[11px] font-bold text-haq-red uppercase mt-1 mb-2">
                        {item.sub}
                      </div>
                      <p className="text-xs text-haq-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Strategic Retail Partners Grid */}
            <div className="mt-14 pt-10 border-t border-haq-border">
              <div className="text-center mb-8">
                <span className="font-mono text-xs font-bold text-haq-text-secondary uppercase tracking-widest">
                  MẠNG LƯỚI ĐỐI TÁC PHÂN PHỐI CHIẾN LƯỢC TOÀN QUỐC
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
                {[
                  { name: 'WinMart', logo: winmartLogo },
                  { name: 'GO!', logo: goLogo },
                  { name: 'Circle K', logo: circleKLogo },
                  { name: 'GS25', logo: gs25Logo },
                  { name: 'K-Market', logo: kmartLogo },
                  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
                ].map((partner, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-haq-cream h-20 rounded-2xl p-4 flex items-center justify-center border border-haq-border hover:border-haq-red transition-all shadow-2xs"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Navigation Bridge to Overview & Capabilities */}
        <section className="py-16 bg-haq-cream border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/gioi-thieu"
                className="group bg-white p-8 rounded-3xl border border-haq-border hover:border-haq-red shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                    CHUYÊN MỤC LIÊN QUAN
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink group-hover:text-haq-red transition-colors uppercase">
                    01. Giới Thiệu Tổng Quan & Sứ Mệnh
                  </h3>
                  <p className="text-xs text-haq-text-secondary mt-2 leading-relaxed">
                    Tìm hiểu triết lý kinh doanh, tầm nhìn chiến lược và 5 giá trị văn hóa cốt lõi của HAQ FOOD.
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red">
                  <span>XEM GIỚI THIỆU TỔNG QUAN →</span>
                </div>
              </Link>

              <Link
                to="/nang-luc"
                className="group bg-white p-8 rounded-3xl border border-haq-border hover:border-haq-red shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                    HẠ TẦNG KỸ THUẬT
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink group-hover:text-haq-red transition-colors uppercase">
                    03. Cơ Sở Sản Xuất & Tiêu Chuẩn Chất Lượng
                  </h3>
                  <p className="text-xs text-haq-text-secondary mt-2 leading-relaxed">
                    Khám phá dây chuyền sấy giòn khép kín, quy trình kiểm soát 5 bước ISO 22000 và giải pháp OEM/ODM.
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red">
                  <span>XEM CƠ SỞ SẢN XUẤT →</span>
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
