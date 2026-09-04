import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  Factory,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Award,
  ChevronRight,
  ChevronLeft,
  Package,
  Layers,
  Users,
  Sprout,
  Handshake,
  Heart,
  Leaf,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

// Image assets (using high-end commercial assets & about bento grid)
import factoryImg from '../assets/factory/factory_production.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import catDoAnKhoImg from '../assets/categories/category_do_an_kho.jpg'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

import factoryHqImg from '../assets/about/factory_hq.jpg'
import riceFieldImg from '../assets/about/rice_field.jpg'
import labInspectionImg from '../assets/about/lab_inspection.jpg'
import cargoExportImg from '../assets/about/cargo_export.jpg'

const FACT_SHEET = [
  { label: 'TÊN DOANH NGHIỆP', value: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI', sub: 'HAQ FOOD HANOI JSC' },
  { label: 'NĂM THÀNH LẬP', value: 'EST. 2021', sub: 'Khởi đầu tại Thủ đô Hà Nội' },
  { label: 'TRỤ SỞ CHÍNH', value: 'HANOI, VIETNAM', sub: 'Trung tâm R&D và vận hành' },
  { label: 'LĨNH VỰC HOẠT ĐỘNG', value: 'FOOD MANUFACTURING & DISTRIBUTION', sub: 'Sản xuất & phân phối thực phẩm chế biến đóng gói' },
  { label: 'MÔ HÌNH HỢP TÁC', value: 'OEM / ODM SOLUTIONS', sub: 'Gia công & thiết kế sản phẩm theo yêu cầu' },
  { label: 'THỊ TRƯỜNG HIỆN DIỆN', value: 'VIETNAM · SOUTH KOREA · TAIWAN', sub: 'Phân phối nội địa & xuất khẩu chính ngạch' },
]

const CORE_PILLARS = [
  {
    icon: Leaf,
    tag: 'NGUỒN NGUYÊN LIỆU',
    title: 'TỰ NHIÊN',
    desc: 'Từ nông sản Việt Nam',
  },
  {
    icon: Factory,
    tag: 'QUY TRÌNH',
    title: 'KHÉP KÍN',
    desc: 'Sản xuất sấy sạch hiện đại',
  },
  {
    icon: ShieldCheck,
    tag: 'KIỂM SOÁT CHẤT LƯỢNG',
    title: 'NGHIÊM NGẶT',
    desc: 'Đảm bảo an toàn thực phẩm',
  },
  {
    icon: Globe2,
    tag: 'ĐỊNH HƯỚNG',
    title: 'TOÀN CẦU',
    desc: 'Đưa ẩm thực Việt ra thế giới',
  },
]

const CORE_VALUES = [
  {
    key: 'TÂM',
    title: 'ĐẠO ĐỨC & LƯƠNG TÂM NGHỀ NGHIỆP',
    tagline: 'Đặt chất lượng và trách nhiệm lên trước.',
    desc: 'Chúng tôi hiểu rằng thực phẩm đi trực tiếp vào cơ thể người dùng. Mọi sản phẩm xuất xưởng đều được kiểm soát với tinh thần trách nhiệm cao nhất, như chính món ăn chuẩn bị cho gia đình.',
    number: '01',
  },
  {
    key: 'TÍN',
    title: 'CHÍNH TRỰC & CAM KẾT VỮNG BỀN',
    tagline: 'Giữ trọn cam kết với khách hàng và đối tác.',
    desc: 'Xây dựng mối quan hệ dựa trên sự minh bạch, tôn trọng hợp đồng, đúng tiến độ giao hàng và giữ vững phẩm chất sản phẩm qua từng lô xuất xưởng.',
    number: '02',
  },
  {
    key: 'TINH',
    title: 'TINH HOA & ĐỔI MỚI LIÊN TỤC',
    tagline: 'Không ngừng hoàn thiện sản phẩm, quy trình và giá trị nông sản Việt.',
    desc: 'Ứng dụng công nghệ sấy sạch đối lưu, chuẩn hóa công thức chế biến truyền thống, nâng cao giá trị gia tăng cho nguồn nông sản địa phương.',
    number: '03',
  },
]

const MANUFACTURING_CAPABILITIES = [
  {
    num: '01',
    title: 'PRODUCTION',
    vn: 'SẢN XUẤT KHÉP KÍN',
    desc: 'Dây chuyền sấy giòn đối lưu hiện đại, kiểm soát nhiệt độ và độ ẩm chính xác để giữ trọn hương vị và dinh dưỡng tự nhiên.',
  },
  {
    num: '02',
    title: 'QUALITY CONTROL',
    vn: 'KIỂM SOÁT CHẤT LƯỢNG',
    desc: 'Quy trình KCS nghiêm ngặt từng công đoạn từ nguyên liệu đầu vào, sơ chế đến thành phẩm cuối cùng.',
  },
  {
    num: '03',
    title: 'PACKAGING',
    vn: 'ĐÓNG GÓI TIÊU CHUẨN',
    desc: 'Công nghệ đóng gói màng nhôm phức hợp chân không, bảo quản tối ưu sản phẩm trong điều kiện khí hậu nhiệt đới và xuất khẩu.',
  },
  {
    num: '04',
    title: 'EXPORT',
    vn: 'XUẤT KHẨU CHÍNH NGẠCH',
    desc: 'Đáp ứng đầy đủ tiêu chuẩn kiểm định khắt khe phục vụ thị trường nội địa và quốc tế (Hàn Quốc, Đài Loan).',
  },
]

const PRODUCTION_PROCESS = [
  { step: '01', title: 'Tuyển chọn nông sản', desc: 'Lựa chọn nguyên liệu nông sản Việt Nam đạt chuẩn chất lượng.' },
  { step: '02', title: 'Sơ chế & làm sạch', desc: 'Quy trình rửa sạch, gọt cắt và khử trùng trong môi trường kiểm soát.' },
  { step: '03', title: 'Chế biến & tẩm ướp', desc: 'Phối trộn gia vị công thức độc quyền, giữ nguyên hương vị truyền thống.' },
  { step: '04', title: 'Sấy giòn khép kín', desc: 'Ứng dụng công nghệ sấy đối lưu tiên tiến, giữ màu sắc và độ giòn tự nhiên.' },
  { step: '05', title: 'Kiểm tra KCS', desc: 'Sàng lọc tạp chất, kiểm tra độ ẩm, độ giòn và cảm quan vi sinh.' },
  { step: '06', title: 'Đóng gói hút chân không', desc: 'Đóng gói màng nhôm bảo quản kín khí, in hạn sử dụng và mã vạch.' },
  { step: '07', title: 'Lưu kho & Phân phối', desc: 'Bảo quản kho tiêu chuẩn xuất xưởng nội địa và xuất khẩu quốc tế.' },
]

const PRODUCT_CATEGORIES = [
  {
    title: 'HOKI',
    subtitle: 'Vietnamese Rice Paper Snacks',
    desc: 'Dòng sản phẩm bánh tráng sấy giòn cao cấp, hương vị đậm đà nguyên bản Việt Nam.',
    img: catBanhTrangImg,
    badge: 'SIGNATURE SNACK',
  },
  {
    title: 'BAKED FOOD',
    subtitle: 'Traditional Vietnamese Baked Snacks',
    desc: 'Bánh nướng thủ công kết hợp công nghệ hiện đại, thơm ngon và an toàn tuyệt đối.',
    img: catBanhImg,
    badge: 'TRADITIONAL RECIPE',
  },
  {
    title: 'DRIED FOOD',
    subtitle: 'Vietnamese Agricultural Ingredients',
    desc: 'Nông sản sấy khô giữ nguyên dưỡng chất, phục vụ tiêu dùng trong nước và công nghiệp thực phẩm.',
    img: catDoAnKhoImg,
    badge: 'RAW & PROCESSED',
  },
]

const COMMITMENTS = [
  {
    num: '01',
    category: 'CONSUMER',
    title: 'Người Tiêu Dùng',
    focus: 'Chất lượng, an toàn thực phẩm và sự minh bạch.',
    desc: 'Kiểm soát chặt chẽ quy trình sản xuất theo tiêu chuẩn áp dụng tại doanh nghiệp. Minh bạch thành phần, nguồn gốc xuất xứ và mang đến trải nghiệm ăn vặt thơm ngon, an tâm.',
    icon: Heart,
  },
  {
    num: '02',
    category: 'PARTNER',
    title: 'Đối Tác & Khách Hàng B2B',
    focus: 'Chất lượng ổn định, tiến độ và khả năng hợp tác OEM/ODM.',
    desc: 'Cung cấp giải pháp gia công thực phẩm linh hoạt, đảm bảo tính đồng đều của thành phẩm và hỗ trợ tối đa chuỗi cung ứng cho các hệ thống siêu thị, đại lý.',
    icon: Handshake,
  },
  {
    num: '03',
    category: 'PEOPLE',
    title: 'Đội Ngũ Nhân Sự',
    focus: 'Môi trường làm việc an toàn, tôn trọng và phát triển năng lực.',
    desc: 'Xây dựng môi trường lao động văn minh, trang bị đầy đủ bảo hộ an toàn thực phẩm và tạo điều kiện nâng cao tay nghề cho từng cán bộ công nhân viên.',
    icon: Users,
  },
  {
    num: '04',
    category: 'AGRICULTURE',
    title: 'Nông Sản Việt',
    focus: 'Nâng cao giá trị nông sản và phát triển chuỗi cung ứng bền vững.',
    desc: 'Ưu tiên kết nối và sử dụng các nguồn nguyên liệu nông sản trong nước, ứng dụng công nghệ chế biến hiện đại để gia tăng giá trị thương mại cho nông sản Việt.',
    icon: Sprout,
  },
]

export default function CompanyProfilePage() {
  const [selectedCapability, setSelectedCapability] = useState(null)

  const CapabilityModal = ({ capability, onClose }) => {
    if (!capability) return null
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div 
          className="absolute inset-0 bg-haq-deep-black/90 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-haq-cream rounded-full hover:bg-haq-border transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 rotate-90 text-haq-ink" />
          </button>
          
          <div className="lg:w-1/2 relative bg-[#0C1E15] aspect-square lg:aspect-auto">
            <img 
              src={factoryImg} 
              alt={capability.vn} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="font-heading font-extrabold text-6xl text-[#C89B3C] opacity-40">{capability.num}</span>
              <h3 className="font-heading font-extrabold text-3xl text-white uppercase mt-2">{capability.vn}</h3>
            </div>
          </div>

          <div className="lg:w-1/2 p-8 sm:p-12 overflow-y-auto">
            <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">{capability.title}</span>
            <div className="h-1 w-12 bg-haq-red mt-2 mb-6" />
            
            <div className="space-y-6 text-haq-text-secondary leading-relaxed font-normal">
              <p className="text-lg font-medium text-haq-ink">{capability.desc}</p>
              <p>
                Tại HAQ FOOD, chúng tôi áp dụng các tiêu chuẩn vận hành công nghiệp tiên tiến nhất để đảm bảo tính đồng nhất của từng mẻ hàng. 
                Hệ thống kiểm soát nhiệt độ và độ ẩm được chuẩn hóa, giúp duy trì cấu trúc giòn xốp đặc trưng và bảo quản trọn vẹn dinh dưỡng tự nhiên của nông sản.
              </p>
              <div className="pt-6 border-t border-haq-border">
                <h4 className="font-heading font-bold uppercase text-haq-ink mb-3 text-xs tracking-wider">Thông số kỹ thuật tiêu chuẩn:</h4>
                <ul className="grid grid-cols-2 gap-4 text-xs font-heading uppercase font-medium text-haq-ink">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red" /> ISO 22000:2018
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red" /> HACCP CODEX
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red" /> OEM/ODM READY
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-haq-red" /> KCS INDEPENDENT
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col relative selection:bg-haq-red/20 selection:text-haq-red">
      {/* Interactive Modal */}
      {selectedCapability && (
        <CapabilityModal 
          capability={selectedCapability} 
          onClose={() => setSelectedCapability(null)} 
        />
      )}

      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact Bar */}
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">
        {/* =========================================================================
            HERO: BENTO PHOTO COLLAGE & HEADLINE
            ========================================================================= */}
        <section className="bg-white text-haq-ink pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-haq-border relative overflow-hidden">
          {/* Subtle ambient glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-haq-red/5 via-[#C89B3C]/5 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
          
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Headline, Subtitle, Description, CTA */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                {/* Metadata Header Eyebrow */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="font-heading text-xs font-bold tracking-wider text-[#C89B3C] uppercase">
                    HAQ FOOD · GIỚI THIỆU DOANH NGHIỆP
                  </span>
                  <span className="h-px w-8 sm:w-14 bg-[#C89B3C]/40" />
                  <span className="font-heading text-xs text-haq-text-secondary uppercase">
                    HANOI, VIETNAM
                  </span>
                </div>

                {/* Giant Monolithic Headline */}
                <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-haq-ink tracking-tight uppercase leading-[0.95]">
                  HAQ FOOD
                </h1>
                
                {/* Subtitle / Tagline */}
                <p className="mt-4 font-heading text-sm sm:text-base font-bold tracking-wider text-haq-red uppercase">
                  VIETNAMESE FOOD MANUFACTURER & EXPORTER
                </p>

                {/* Description */}
                <p className="mt-5 text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                  Công ty Cổ phần HAQ Hà Nội là doanh nghiệp sản xuất và phân phối thực phẩm chế biến đóng gói tại Việt Nam. Chúng tôi kết hợp nguồn nông sản địa phương với quy trình sản xuất sấy sạch khép kín, hướng tới tiêu chuẩn an toàn và nâng tầm giá trị ẩm thực Việt.
                </p>

                {/* CTA Button */}
                <div className="mt-7 sm:mt-8">
                  <a
                    href="#tong-quan"
                    className="inline-flex items-center gap-3 bg-haq-red hover:bg-haq-red/90 text-white px-7 py-3.5 rounded-full font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>TÌM HIỂU VỀ HAQ FOOD</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Bento-Style 5-Photo Collage */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                  {/* Left Column of Bento: Factory HQ + Product Lineup */}
                  <div className="sm:col-span-7 flex flex-col gap-3 sm:gap-4">
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={factoryHqImg}
                        alt="HAQ FOOD Modern Factory"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                    <div className="relative aspect-16/10 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={heroBanner1}
                        alt="HAQ FOOD Snack Products"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                  </div>

                  {/* Right Column of Bento: Rice Field + Lab Inspection + Cargo Ship */}
                  <div className="sm:col-span-5 flex flex-col gap-3 sm:gap-4">
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={riceFieldImg}
                        alt="Cánh đồng nông sản Việt Nam"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={labInspectionImg}
                        alt="Kiểm soát chất lượng phòng sạch"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                    <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-haq-border shadow-sm group">
                      <img
                        src={cargoExportImg}
                        alt="Xuất khẩu thực phẩm"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CORE PILLARS BAR (4 VALUE CARDS)
            ========================================================================= */}
        <section className="py-8 sm:py-10 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {CORE_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <div 
                    key={i} 
                    className="bg-haq-cream/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-haq-border flex items-center gap-4 hover:bg-white hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-haq-border bg-white flex items-center justify-center text-haq-red shrink-0 group-hover:border-haq-red transition-colors shadow-2xs">
                      <Icon className="w-6 h-6 text-haq-red" strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className="block text-[10px] sm:text-[11px] font-heading font-bold text-[#C89B3C] uppercase tracking-wider">
                        {pillar.tag}
                      </span>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-haq-ink uppercase leading-tight mt-0.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-haq-text-secondary mt-1 font-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            01 — COMPANY FACT SHEET / WHO WE ARE (ĐẶT LÊN TRƯỚC THEO CHUẨN B2B)
            ========================================================================= */}
        <section id="tong-quan" className="py-20 sm:py-28 bg-haq-cream/40 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-haq-border gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                  01 — TỔNG QUAN DOANH NGHIỆP · WHO WE ARE
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-haq-ink uppercase mt-2">
                  Doanh Nghiệp Sản Xuất Thực Phẩm Chuyên Nghiệp
                </h2>
              </div>
              <div className="font-heading text-xs text-haq-text-secondary uppercase font-medium">
                HAQ FOOD HANOI JSC · CORPORATE PROFILE
              </div>
            </div>

            {/* Editorial Fact Sheet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {FACT_SHEET.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 sm:p-8 rounded-2xl border border-haq-border flex flex-col justify-between hover:border-haq-red/50 hover:shadow-md transition-all shadow-2xs group"
                >
                  <div>
                    <div className="font-heading text-[11px] font-bold text-[#C89B3C] uppercase tracking-wider mb-3">
                      {item.label}
                    </div>
                    <div className="font-heading font-bold text-lg text-haq-ink uppercase tracking-tight leading-snug group-hover:text-haq-red transition-colors">
                      {item.value}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-haq-border text-xs text-haq-text-secondary font-normal">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 — BRAND STORY & CORE VALUES (CÂU CHUYỆN & GIÁ TRỊ CỐT LÕI)
            ========================================================================= */}
        <section id="story" className="py-20 sm:py-32 bg-white border-b border-haq-border relative overflow-hidden">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Eyebrow + Huge Headline */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                    02 ── CÂU CHUYỆN THƯƠNG HIỆU
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-5xl text-haq-ink uppercase tracking-tight leading-[1.1]">
                  MỖI SẢN PHẨM <br />
                  ĐỀU BẮT ĐẦU <br />
                  <span className="text-haq-red">TỪ TỰ NHIÊN</span>
                </h2>
              </div>

              {/* Right Column: Company Story */}
              <div className="lg:col-span-7 space-y-6 text-haq-text-secondary text-base sm:text-lg leading-relaxed pt-1">
                <p className="font-medium text-haq-ink">
                  Chúng tôi tin rằng thực phẩm ngon phải bắt đầu từ nguyên liệu tốt, quy trình đúng và con người có trách nhiệm. HAQ FOOD không ngừng đổi mới để mang đến những sản phẩm tiện lợi, an toàn và giữ trọn hương vị truyền thống Việt Nam.
                </p>
                <p className="text-sm sm:text-base text-haq-text-secondary font-normal">
                  Chúng tôi xây dựng chuỗi giá trị khép kín từ khâu tuyển chọn nguyên liệu tươi sạch tại các vùng nông nghiệp trọng điểm cho đến dây chuyền sấy giòn đối lưu và đóng gói tiệt trùng, phục vụ khách hàng tiêu dùng và xuất khẩu.
                </p>
              </div>
            </div>

            {/* Bottom Large Image about ingredients / production */}
            <div className="mt-14 relative aspect-21/9 rounded-3xl overflow-hidden shadow-md border border-haq-border group">
              <img
                src={factoryImg}
                alt="HAQ FOOD Production & Ingredients"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/80 via-[#0C1E15]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <div className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider font-bold">
                    NGUỒN NGUYÊN LIỆU & SẢN XUẤT
                  </div>
                  <div className="font-heading font-extrabold text-lg sm:text-2xl uppercase mt-1">
                    Kết Hợp Nông Sản Bản Địa & Công Nghệ Sấy Sạch
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values: TÂM - TÍN - TINH */}
            <div className="mt-16 pt-12 border-t border-haq-border">
              <div className="mb-8">
                <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                  TRIẾT LÝ VẬN HÀNH
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink uppercase mt-1">
                  Giá Trị Cốt Lõi HAQ FOOD
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {CORE_VALUES.map((val) => (
                  <div 
                    key={val.key}
                    className="p-7 rounded-2xl bg-haq-cream/40 border border-haq-border flex flex-col justify-between shadow-2xs hover:border-haq-red/40 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-heading font-extrabold text-3xl text-haq-red">
                          {val.key}
                        </span>
                        <span className="font-heading text-xs font-bold text-[#C89B3C]">
                          {val.number}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-base text-haq-ink uppercase mb-2">
                        {val.title}
                      </h4>
                      <div className="text-xs font-heading font-semibold text-haq-red mb-3">
                        {val.tagline}
                      </div>
                      <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            03 — MANUFACTURING CAPABILITY & FACTORY STANDARDS (GỘP LIỀN MẠCH NỀN TỐI)
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#0C1E15] text-white border-b border-white/10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            {/* Phân đoạn A: Năng lực sản xuất */}
            <div className="max-w-3xl mb-14">
              <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                03 — NĂNG LỰC SẢN XUẤT & NHÀ MÁY · OUR CAPABILITY
              </span>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-2 leading-tight">
                TỪ NGUYÊN LIỆU <br />
                <span className="text-[#C89B3C]">ĐẾN THÀNH PHẨM CHUẨN MỰC.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/75 font-normal">
                Năng lực sản xuất toàn diện từ khâu sơ chế, chế biến nhiệt, sấy giòn đến đóng gói tiêu chuẩn xuất khẩu.
              </p>
            </div>

            {/* 4 Capabilities Grid (Click to open modal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MANUFACTURING_CAPABILITIES.map((cap) => (
                <div
                  key={cap.num}
                  onClick={() => setSelectedCapability(cap)}
                  className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-haq-red hover:bg-white/10 transition-all group cursor-pointer shadow-lg"
                >
                  <div>
                    <div className="font-heading font-extrabold text-5xl text-[#C89B3C] mb-6 group-hover:scale-105 transition-transform">
                      {cap.num}
                    </div>
                    <div className="font-heading text-xs font-bold text-white/60 uppercase tracking-wider mb-1">
                      {cap.title}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white uppercase mb-4">
                      {cap.vn}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                      {cap.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-white/10 font-heading text-[10px] text-[#C89B3C] uppercase font-semibold flex items-center justify-between">
                    <span>HAQ INDUSTRIAL SPEC</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-haq-red group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Phân đoạn B: Tiêu chuẩn kiểm soát chất lượng & Hình ảnh nhà máy */}
            <div className="mt-20 pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider">
                  TIÊU CHUẨN VẬN HÀNH & KCS
                </span>

                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase leading-tight">
                  CHUẨN HÓA <br />
                  <span className="text-[#C89B3C]">CHẤT LƯỢNG ĐỒNG NHẤT.</span>
                </h3>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                  Nhà máy sản xuất HAQ FOOD được đầu tư đồng bộ với hệ thống máy móc sấy đối lưu, phòng pha chế nguyên liệu vô trùng và kho lưu trữ tiêu chuẩn.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C89B3C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold uppercase text-white text-sm">Vệ Sinh An Toàn Thực Phẩm Tuyệt Đối</h4>
                      <p className="text-xs text-white/60 mt-0.5 font-normal">Quy trình kiểm soát nghiêm ngặt từ trang phục công nhân đến khu vực chế biến.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C89B3C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold uppercase text-white text-sm">Độ Đồng Đều Sản Phẩm Cao</h4>
                      <p className="text-xs text-white/60 mt-0.5 font-normal">Công nghệ tự động hóa kiểm soát nhiệt độ sấy, đảm bảo chất lượng đồng nhất giữa các lô.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C89B3C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold uppercase text-white text-sm">Kiểm Tra KCS Độc Lập</h4>
                      <p className="text-xs text-white/60 mt-0.5 font-normal">Mọi lô hàng trước khi xuất kho đều phải vượt qua bài kiểm tra cảm quan và vi sinh.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src={factoryHqImg}
                    alt="Nhà máy và kiểm soát chất lượng HAQ"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider font-bold">
                      TIÊU CHUẨN CÔNG NGHIỆP
                    </div>
                    <div className="font-heading font-extrabold text-xl text-white uppercase mt-1">
                      Hệ Thống Nhà Máy & Vận Hành Chuẩn Mực
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 — PRODUCTION PROCESS: 7-STAGE ENTERPRISE PIPELINE
            ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            {/* Clean Corporate Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider block mb-2">
                04 — TIÊU CHUẨN SẢN XUẤT KHÉP KÍN
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase tracking-tight">
                Quy Trình Sản Xuất 7 Công Đoạn
              </h2>
              <p className="mt-3 text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                Hệ thống vận hành liên hoàn kiểm soát nhiệt ẩm và an toàn vệ sinh thực phẩm nghiêm ngặt từ khâu nguyên liệu đầu vào đến thành phẩm đóng gói xuất xưởng.
              </p>
            </div>

            {/* Desktop: Continuous 7-Stage Process Streamline */}
            <div className="hidden lg:block relative">
              {/* Process Track Line connecting all 7 stages */}
              <div className="absolute top-5 left-8 right-8 h-[2px] bg-haq-border z-0" />

              <div className="grid grid-cols-7 gap-4 relative z-10">
                {PRODUCTION_PROCESS.map((proc) => (
                  <div key={proc.step} className="group flex flex-col">
                    {/* Stage Number Node */}
                    <div className="w-10 h-10 rounded-full border-2 border-haq-border bg-white text-haq-ink group-hover:border-haq-red group-hover:bg-haq-red group-hover:text-white font-heading font-extrabold text-sm flex items-center justify-center mb-6 transition-all shadow-2xs">
                      {proc.step}
                    </div>

                    {/* Step Card */}
                    <div className="bg-haq-cream/30 group-hover:bg-white p-5 rounded-2xl border border-haq-border group-hover:border-haq-red/40 group-hover:shadow-md transition-all flex flex-col flex-1">
                      <h3 className="font-heading font-bold text-sm text-haq-ink uppercase mb-2 leading-snug group-hover:text-haq-red transition-colors">
                        {proc.title}
                      </h3>
                      <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                        {proc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile & Tablet: Connected Vertical Timeline */}
            <div className="lg:hidden relative border-l-2 border-haq-red/30 ml-4 pl-6 space-y-6">
              {PRODUCTION_PROCESS.map((proc) => (
                <div key={proc.step} className="relative">
                  {/* Step Marker Node */}
                  <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 border-haq-red bg-white text-haq-red font-heading font-bold text-xs flex items-center justify-center shadow-xs">
                    {proc.step}
                  </div>

                  {/* Step Card */}
                  <div className="bg-haq-cream/30 p-4 rounded-xl border border-haq-border">
                    <h3 className="font-heading font-bold text-sm text-haq-ink uppercase mb-1">
                      {proc.title}
                    </h3>
                    <p className="text-xs text-haq-text-secondary leading-relaxed font-normal">
                      {proc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            05 — PRODUCTS SHOWCASE (3 NHÓM SẢN PHẨM VỚI ẢNH CHUẨN)
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-haq-cream/30 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-haq-border gap-4">
              <div>
                <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                  05 — DANH MỤC SẢN PHẨM · PRODUCT GROUPS
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-haq-ink uppercase mt-2">
                  Danh Mục Sản Phẩm Tiêu Biểu
                </h2>
              </div>
              <Link
                to="/san-pham"
                className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red hover:text-haq-red/80 font-semibold cursor-pointer"
              >
                <span>XEM TẤT CẢ SẢN PHẨM</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PRODUCT_CATEGORIES.map((prod, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 sm:p-8 rounded-2xl border border-haq-border flex flex-col justify-between hover:shadow-xl hover:border-haq-red/50 transition-all group"
                >
                  <div>
                    <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-6 border border-haq-border bg-haq-cream/20">
                      <img
                        src={prod.img}
                        alt={prod.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-heading text-[10px] font-bold uppercase tracking-wider bg-haq-red text-white px-2.5 py-1 rounded shadow-xs">
                          {prod.badge}
                        </span>
                      </div>
                    </div>

                    <div className="font-heading text-xs font-bold text-[#C89B3C] uppercase tracking-wider mb-1">
                      {prod.subtitle}
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-haq-ink uppercase mb-3">
                      {prod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-haq-border flex items-center justify-between">
                    <Link
                      to="/san-pham"
                      className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-ink group-hover:text-haq-red transition-colors"
                    >
                      <span>KHÁM PHÁ CHI TIẾT</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            06 — EXPORT / GLOBAL PRESENCE
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-white border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="font-heading text-xs font-bold text-white uppercase tracking-wider bg-haq-red px-3 py-1 rounded">
                  06 — XUẤT KHẨU QUỐC TẾ · GLOBAL EXPORT
                </span>

                <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-haq-ink uppercase leading-tight">
                  TỪ VIỆT NAM <br />
                  <span className="text-haq-red">VƯƠN RA THẾ GIỚI.</span>
                </h2>

                <p className="text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                  HAQ FOOD định hướng phát triển mạnh mẽ trên thị trường quốc tế, đưa các sản phẩm nông sản chế biến đậm đà bản sắc Việt Nam đến với đối tác và người tiêu dùng toàn cầu.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-haq-border">
                  <div className="bg-haq-cream/50 p-4 rounded-xl border border-haq-border shadow-2xs text-center">
                    <div className="font-heading text-[10px] text-haq-text-secondary uppercase font-medium">NỘI ĐỊA</div>
                    <div className="font-heading font-bold text-base text-haq-ink mt-0.5">VIỆT NAM</div>
                  </div>
                  <div className="bg-haq-cream/50 p-4 rounded-xl border border-haq-border shadow-2xs text-center">
                    <div className="font-heading text-[10px] text-haq-text-secondary uppercase font-medium">ĐÔNG BẮC Á</div>
                    <div className="font-heading font-bold text-base text-haq-red mt-0.5">HÀN QUỐC</div>
                  </div>
                  <div className="bg-haq-cream/50 p-4 rounded-xl border border-haq-border shadow-2xs text-center">
                    <div className="font-heading text-[10px] text-haq-text-secondary uppercase font-medium">ĐÔNG Á</div>
                    <div className="font-heading font-bold text-base text-[#C89B3C] mt-0.5">ĐÀI LOAN</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-xl border border-haq-border group">
                  <img
                    src={exportImg}
                    alt="Xuất khẩu thực phẩm toàn cầu"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="font-heading text-xs text-[#C89B3C] uppercase tracking-wider font-bold">
                      PHÂN PHỐI QUỐC TẾ
                    </div>
                    <div className="font-heading font-bold text-lg uppercase mt-1">
                      Mạng Lưới Phân Phối Chính Ngạch & Đối Tác B2B
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07 — RESPONSIBILITY (CAM KẾT TRÁCH NHIỆM DOANH NGHIỆP)
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-haq-cream/30 border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider">
                07 — TRÁCH NHIỆM DOANH NGHIỆP · RESPONSIBILITY
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-haq-ink uppercase mt-2">
                Trách Nhiệm Phát Triển Bền Vững
              </h2>
              <p className="mt-2 text-sm text-haq-text-secondary font-normal">
                Cam kết dài hạn đối với người tiêu dùng, đối tác, nhân sự và nông sản Việt Nam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COMMITMENTS.map((comm) => {
                const Icon = comm.icon
                return (
                  <div
                    key={comm.num}
                    className="p-8 sm:p-10 rounded-2xl bg-white border border-haq-border flex flex-col justify-between shadow-2xs hover:border-haq-red/50 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-heading text-xs font-bold text-haq-red uppercase tracking-wider bg-haq-cream px-3 py-1 rounded shadow-2xs border border-haq-border">
                          {comm.num} · {comm.category}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-haq-cream flex items-center justify-center text-haq-red shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-2xl text-haq-ink uppercase mb-2">
                        {comm.title}
                      </h3>

                      <div className="font-heading text-xs font-bold text-haq-red mb-4 border-l-2 border-haq-red pl-3">
                        {comm.focus}
                      </div>

                      <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed font-normal">
                        {comm.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL CTA SECTION (HỢP TÁC & ĐỒNG HÀNH)
            ========================================================================= */}
        <section className="py-24 sm:py-36 bg-[#0C1E15] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <span className="font-heading text-xs font-bold tracking-wider text-[#C89B3C] uppercase">
                HỢP TÁC & ĐỒNG HÀNH · PARTNERSHIP
              </span>

              <h2 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white uppercase leading-[1.0] tracking-tight">
                CÙNG KIẾN TẠO <br />
                <span className="text-[#C89B3C]">GIÁ TRỊ NÔNG SẢN VIỆT</span> <br />
                VƯƠN TẦM.
              </h2>

              <p className="text-xs sm:text-base text-white/75 max-w-xl mx-auto leading-relaxed font-normal">
                Chúng tôi luôn sẵn sàng đồng hành cùng các đối tác phân phối, chuỗi bán lẻ và doanh nghiệp có nhu cầu gia công OEM/ODM thực phẩm chất lượng cao.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/lien-he"
                  className="w-full sm:w-auto px-8 py-4 bg-haq-red text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-haq-red/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>LIÊN HỆ VỚI HAQ FOOD</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/san-pham"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>KHÁM PHÁ SẢN PHẨM</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  )
}
