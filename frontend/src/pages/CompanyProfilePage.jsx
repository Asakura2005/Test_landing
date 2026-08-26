import React, { useState } from 'react'
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
  Package,
  Layers,
  Users,
  Sprout,
  Handshake,
  Heart,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

// Image assets
import factoryImg from '../assets/factory/factory_production.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import exportImg from '../assets/distribution/distribution_export.jpg'
import heroFactoryImg from '../assets/hero-factory.jpg'
import catBanhImg from '../assets/categories/category_banh.jpg'
import catBanhTrangImg from '../assets/categories/category_banh_trang.jpg'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

const FACT_SHEET = [
  { label: 'TÊN DOANH NGHIỆP', value: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI', sub: 'HAQ FOOD HANOI JSC' },
  { label: 'NĂM THÀNH LẬP', value: 'EST. 2021', sub: 'Khởi đầu tại Thủ đô Hà Nội' },
  { label: 'TRỤ SỞ CHÍNH', value: 'HANOI, VIETNAM', sub: 'Trung tâm R&D và vận hành' },
  { label: 'LĨNH VỰC HOẠT ĐỘNG', value: 'FOOD MANUFACTURING & DISTRIBUTION', sub: 'Sản xuất & phân phối thực phẩm đóng gói' },
  { label: 'MÔ HÌNH HỢP TÁC', value: 'OEM / ODM SOLUTIONS', sub: 'Gia công & thiết kế sản phẩm theo yêu cầu' },
  { label: 'THỊ TRƯỜNG HIỆN DIỆN', value: 'VIETNAM · SOUTH KOREA · TAIWAN', sub: 'Phân phối nội địa & xuất khẩu chính ngạch' },
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
  const [activeValue, setActiveValue] = useState(0)

  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* =========================================================================
            01 — HERO: CINEMATIC FOOD ENTERPRISE
            ========================================================================= */}
        <section className="bg-haq-ink text-white pt-16 sm:pt-24 pb-20 sm:pb-28 border-b border-black/10 relative overflow-hidden">
          {/* Subtle Geometric Texture Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            {/* Metadata Header Breadcrumb */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
                HAQ FOOD · ABOUT US
              </span>
              <span className="h-px w-12 bg-white/20" />
              <span className="font-mono text-xs text-white/50 uppercase">
                HANOI, VIETNAM
              </span>
            </div>

            {/* Giant Monolithic Headline */}
            <div className="max-w-5xl">
              <h1 className="font-heading font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.95]">
                HAQ FOOD
              </h1>
              <p className="mt-4 font-mono text-sm sm:text-lg lg:text-xl font-bold tracking-wider text-haq-gold uppercase">
                Vietnamese Food Manufacturer & Exporter
              </p>
              <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/75 max-w-3xl leading-relaxed font-normal">
                Công ty Cổ phần HAQ Hà Nội là doanh nghiệp sản xuất và phân phối thực phẩm chế biến đóng gói tại Việt Nam. 
                Chúng tôi kết hợp nguồn nông sản địa phương với quy trình sản xuất sấy sạch khép kín, hướng tới chuẩn mực an toàn và nâng tầm giá trị ẩm thực Việt.
              </p>
            </div>

            {/* Cinematic Hero Imagery Mosaic */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={heroBanner1}
                  alt="HAQ FOOD Manufacturing & Products"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <div className="font-mono text-[10px] sm:text-xs text-haq-gold uppercase tracking-widest">
                      CHẾ BIẾN NÔNG SẢN SẠCH
                    </div>
                    <div className="font-heading font-black text-lg sm:text-2xl uppercase mt-1">
                      Dây Chuyền Sản Xuất Sấy Giòn Khép Kín
                    </div>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-xs text-white/60 uppercase">
                    EST. 2021
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
                <div className="relative aspect-4/3 lg:aspect-auto rounded-3xl overflow-hidden border border-white/10 shadow-lg group">
                  <img
                    src={catBanhImg}
                    alt="Sản phẩm Bánh nướng & Đậu xanh"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-mono text-[10px] text-white/70 uppercase">DANH MỤC SẢN PHẨM</div>
                    <div className="font-heading font-black text-sm sm:text-base uppercase mt-0.5">
                      Bánh Nướng & Đậu Xanh Tươi
                    </div>
                  </div>
                </div>

                <div className="relative aspect-4/3 lg:aspect-auto rounded-3xl overflow-hidden border border-white/10 shadow-lg group">
                  <img
                    src={exportImg}
                    alt="Xuất khẩu thực phẩm"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-mono text-[10px] text-white/70 uppercase">THỊ TRƯỜNG XUẤT KHẨU</div>
                    <div className="font-heading font-black text-sm sm:text-base uppercase mt-0.5">
                      Hàn Quốc & Đài Loan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            02 — BRAND PHILOSOPHY: EDITORIAL STATEMENT
            ========================================================================= */}
        <section className="py-24 sm:py-36 bg-white border-b border-black/5 relative overflow-hidden">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Asymmetric Large Typography Statement */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                    BRAND PHILOSOPHY
                  </span>
                  <span className="h-px w-10 bg-haq-red" />
                </div>

                <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-haq-ink uppercase leading-[1.05] tracking-tight">
                  “MỖI SẢN PHẨM <br />
                  ĐỀU BẮT ĐẦU TỪ <br />
                  <span className="text-haq-red">MỘT TRÁCH NHIỆM.”</span>
                </h2>

                <div className="pt-2 border-l-2 border-haq-ink/20 pl-6 space-y-4">
                  <p className="text-sm sm:text-base lg:text-lg text-haq-ink/80 leading-relaxed font-medium">
                    Chúng tôi tin rằng chất lượng thực phẩm không chỉ nằm ở tiêu chuẩn sản xuất, mà bắt đầu từ cách doanh nghiệp lựa chọn nguyên liệu, kiểm soát từng công đoạn và giữ trọn trách nhiệm với người tiêu dùng.
                  </p>
                  <p className="text-xs sm:text-sm text-haq-ink/65 leading-relaxed">
                    Tại HAQ FOOD, mỗi mẻ bánh tráng sấy giòn hay từng chiếc bánh nướng đều được xem là lời cam kết thực chất về sự tử tế, an toàn và nâng niu hương vị ẩm thực Việt Nam.
                  </p>
                </div>
              </div>

              {/* Right Cinematic Editorial Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 aspect-4/5 bg-haq-bone group">
                  <img
                    src={factoryImg}
                    alt="Quy trình sản xuất trách nhiệm"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-haq-gold mb-1">
                      RESPONSIBLE MANUFACTURING
                    </div>
                    <div className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                      Kiểm soát an toàn thực phẩm theo quy trình và tiêu chuẩn kỹ thuật nghiêm ngặt.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            03 — WHO WE ARE: CORPORATE FACT SHEET
            ========================================================================= */}
        <section className="py-20 sm:py-28 bg-haq-bone border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-black/10 gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  CORPORATE FACT SHEET
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                  Hồ Sơ Doanh Nghiệp
                </h2>
              </div>
              <div className="font-mono text-xs text-haq-ink/50 uppercase">
                HAQ FOOD DATA SPECIFICATION
              </div>
            </div>

            {/* Clean Editorial Corporate Data Sheet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FACT_SHEET.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-black/5 shadow-2xs hover:border-haq-red/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-[10px] font-bold text-haq-ink/40 uppercase tracking-widest mb-3">
                      {item.label}
                    </div>
                    <div className="font-heading font-black text-base sm:text-lg text-haq-ink uppercase tracking-tight leading-snug">
                      {item.value}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/5 text-xs text-haq-ink/60 font-medium">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 — VISION & MISSION: ASYMMETRICAL TWO HALVES
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-white border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                STRATEGIC DIRECTION
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase mt-1">
                Tầm Nhìn & Sứ Mệnh Chiến Lược
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Vision Half */}
              <div className="lg:col-span-6 bg-haq-bone p-8 sm:p-12 rounded-3xl border border-black/5 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-haq-red uppercase">
                      OUR VISION
                    </span>
                    <span className="font-mono text-xs text-haq-ink/40 uppercase">01 / TẦM NHÌN</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink uppercase leading-snug mb-6">
                    Xây dựng HAQ trở thành thương hiệu thực phẩm có năng lực cạnh tranh quốc tế.
                  </h3>

                  <p className="text-sm text-haq-ink/75 leading-relaxed">
                    Xây dựng HAQ trở thành một thương hiệu thực phẩm Việt Nam có năng lực cạnh tranh trên thị trường quốc tế, hướng tới phát triển hệ sinh thái nông sản chế biến bền vững.
                  </p>
                </div>

                <div className="mt-10 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono font-bold text-haq-ink/60 uppercase">
                  <span>MỤC TIÊU DÀI HẠN</span>
                  <span className="text-haq-red">NÔNG SẢN VIỆT BỀN VỮNG</span>
                </div>
              </div>

              {/* Mission Half */}
              <div className="lg:col-span-6 bg-haq-ink text-white p-8 sm:p-12 rounded-3xl border border-black/10 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-haq-gold uppercase">
                      OUR MISSION
                    </span>
                    <span className="font-mono text-xs text-white/40 uppercase">02 / SỨ MỆNH</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase leading-snug mb-6">
                    Kiến tạo chuỗi giá trị thực phẩm sạch, an toàn và minh bạch.
                  </h3>

                  <p className="text-sm text-white/80 leading-relaxed">
                    Kiến tạo chuỗi giá trị thực phẩm sạch, an toàn và minh bạch; đồng hành cùng người nông dân và mang đến những sản phẩm tiện lợi, chất lượng cho người tiêu dùng.
                  </p>
                </div>

                <div className="mt-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-haq-gold uppercase">
                  <span>CAM KẾT HÀNH ĐỘNG</span>
                  <span>AN TOÀN · MINH BẠCH</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            05 — CORE VALUES: TÂM — TÍN — TINH
            ========================================================================= */}
        <section className="py-24 sm:py-36 bg-haq-bone border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  CORE VALUES
                </span>
                <span className="h-px w-8 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase">
                TÂM — TÍN — TINH
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-ink/65 max-w-xl">
                Ba trụ cột văn hóa định hình cách chúng tôi vận hành sản xuất, ứng xử với đối tác và phục vụ người tiêu dùng.
              </p>
            </div>

            {/* Editorial Core Values Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {CORE_VALUES.map((val, idx) => (
                <div
                  key={val.key}
                  className="bg-white p-8 sm:p-10 rounded-3xl border border-black/5 shadow-2xs hover:shadow-xl hover:border-haq-red/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Giant Monolithic Character */}
                    <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-black/5">
                      <span className="font-heading font-black text-6xl sm:text-7xl text-haq-ink group-hover:text-haq-red transition-colors">
                        {val.key}
                      </span>
                      <span className="font-mono text-xs font-bold text-haq-ink/40">
                        {val.number}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                      {val.title}
                    </div>
                    <h3 className="font-heading font-black text-lg text-haq-ink uppercase mt-1 mb-4 leading-snug">
                      "{val.tagline}"
                    </h3>

                    <p className="text-xs sm:text-sm text-haq-ink/70 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/5 font-mono text-[11px] text-haq-ink/40 uppercase">
                    HAQ CORPORATE DNA
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            06 — OUR 4 COMMITMENTS: EDITORIAL NARRATIVE
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-white border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                OUR COMMITMENTS
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink uppercase mt-1">
                4 Cam Kết Trách Nhiệm
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-ink/65">
                Các nguyên tắc định hướng trách nhiệm của HAQ FOOD đối với từng nhóm đối tượng đồng hành.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COMMITMENTS.map((comm) => {
                const Icon = comm.icon
                return (
                  <div
                    key={comm.num}
                    className="p-8 sm:p-10 rounded-3xl bg-haq-bone border border-black/5 hover:border-haq-red/20 transition-all flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                          {comm.num} · {comm.category}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-haq-ink shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="font-heading font-black text-2xl text-haq-ink uppercase mb-2">
                        {comm.title}
                      </h3>

                      <div className="font-mono text-xs font-bold text-haq-ink/80 mb-4 border-l-2 border-haq-red pl-3">
                        {comm.focus}
                      </div>

                      <p className="text-xs sm:text-sm text-haq-ink/70 leading-relaxed">
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
            07 — FROM VIETNAM TO ASIA: CINEMATIC VISUAL
            ========================================================================= */}
        <section className="py-24 sm:py-32 bg-haq-ink text-white border-b border-black/10 relative overflow-hidden">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Text */}
              <div className="lg:col-span-5 space-y-6">
                <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-[0.2em]">
                  MARKET EXPANSION
                </span>

                <h2 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase leading-tight">
                  FROM VIETNAM <br />
                  <span className="text-haq-red">TO ASIA</span>
                </h2>

                <div className="font-mono text-sm font-bold text-white/90 uppercase tracking-wider">
                  Vietnam · South Korea · Taiwan
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Từ nền tảng thị trường nội địa vững chắc, HAQ FOOD từng bước đáp ứng các yêu cầu kiểm định và xuất khẩu chính ngạch các dòng sản phẩm bánh nướng, bánh tráng sấy sang thị trường Hàn Quốc và Đài Loan.
                </p>

                <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-mono text-[10px] text-white/50 uppercase">NỘI ĐỊA</div>
                    <div className="font-heading font-black text-lg text-white mt-0.5">VIỆT NAM</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/50 uppercase">ĐÔNG BẮC Á</div>
                    <div className="font-heading font-black text-lg text-haq-gold mt-0.5">HÀN QUỐC</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/50 uppercase">ĐÔNG Á</div>
                    <div className="font-heading font-black text-lg text-haq-red mt-0.5">ĐÀI LOAN</div>
                  </div>
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-7">
                <div className="relative aspect-16/10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                  <img
                    src={exportImg}
                    alt="Xuất khẩu thực phẩm sang châu Á"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                      TIÊU CHUẨN XUẤT KHẨU CHÂU Á
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            08 — QUALITY STANDARDS & CREDENTIALS
            ========================================================================= */}
        <section className="py-20 sm:py-28 bg-white border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                QUALITY & STANDARDS
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                Tiêu Chuẩn Quản Lý Chất Lượng
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-ink/65">
                Áp dụng các hệ thống quản lý an toàn thực phẩm được công nhận trong ngành sản xuất.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              <div className="p-8 rounded-3xl bg-haq-bone border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-haq-red mb-6 shadow-2xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink uppercase">
                    ISO 22000:2018
                  </h3>
                  <div className="font-mono text-xs font-bold text-haq-red uppercase mt-1 mb-3">
                    HỆ THỐNG QUẢN LÝ AN TOÀN THỰC PHẨM
                  </div>
                  <p className="text-xs text-haq-ink/70 leading-relaxed">
                    Kiểm soát toàn diện chuỗi sản xuất từ khâu tiếp nhận nguyên liệu, chế biến nhiệt đến đóng gói thành phẩm.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-haq-bone border border-black/5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-haq-red mb-6 shadow-2xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink uppercase">
                    HACCP CODEX
                  </h3>
                  <div className="font-mono text-xs font-bold text-haq-red uppercase mt-1 mb-3">
                    KIỂM SOÁT ĐIỂM TỚI HẠN
                  </div>
                  <p className="text-xs text-haq-ink/70 leading-relaxed">
                    Phân tích mối nguy và xác định các điểm kiểm soát tới hạn trong quy trình sấy và chế biến nhiệt.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-haq-ink text-white flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] text-haq-gold uppercase tracking-widest mb-2">
                    CƠ SỞ VẬT CHẤT & KỸ THUẬT
                  </div>
                  <h3 className="font-heading font-black text-xl text-white uppercase leading-snug">
                    Tìm Hiểu Chi Tiết Cơ Sở Sản Xuất
                  </h3>
                  <p className="text-xs text-white/75 mt-3 leading-relaxed">
                    Khám phá dây chuyền sản xuất sấy giòn khép kín, phòng thí nghiệm kiểm tra chất lượng và giải pháp gia công OEM/ODM.
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <Link
                    to="/nang-luc"
                    className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-gold hover:text-white transition-colors"
                  >
                    <span>XEM NĂNG LỰC SẢN XUẤT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09 — TIMELINE MILESTONE TEASER
            ========================================================================= */}
        <section className="py-20 sm:py-28 bg-haq-bone border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-black/10 gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  TIMELINE MILESTONES
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                  Các Mốc Phát Triển Chính
                </h2>
              </div>
              <Link
                to="/lich-su"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase text-haq-red hover:underline"
              >
                <span>XEM LỊCH SỬ CÔNG TY CHI TIẾT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-2xs">
                <div className="font-heading font-black text-4xl text-haq-red mb-2">2021</div>
                <div className="font-mono text-xs font-bold text-haq-ink/50 uppercase mb-3">FOUNDATION</div>
                <h3 className="font-heading font-black text-base text-haq-ink uppercase mb-2">
                  Thành lập & Vận hành Xưởng Sấy Đầu Tiên
                </h3>
                <p className="text-xs text-haq-ink/70 leading-relaxed">
                  Thành lập Công ty Cổ phần HAQ Hà Nội, đầu tư dây chuyền sấy giòn khép kín và ra mắt dòng Bánh tráng sấy giòn.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-2xs">
                <div className="font-heading font-black text-4xl text-haq-ink mb-2">2026</div>
                <div className="font-mono text-xs font-bold text-haq-ink/50 uppercase mb-3">GROWTH</div>
                <h3 className="font-heading font-black text-base text-haq-ink uppercase mb-2">
                  Mở Rộng Danh Mục & Xuất Khẩu Châu Á
                </h3>
                <p className="text-xs text-haq-ink/70 leading-relaxed">
                  Phát triển 15+ SKU sản phẩm, đạt chuẩn ISO 22000 & HACCP, xuất khẩu chính ngạch sang Hàn Quốc và Đài Loan.
                </p>
              </div>

              <div className="bg-haq-ink text-white p-8 rounded-3xl border border-black/10 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="font-heading font-black text-4xl text-haq-gold mb-2">FUTURE</div>
                  <div className="font-mono text-xs font-bold text-white/40 uppercase mb-3">NEXT CHAPTER</div>
                  <h3 className="font-heading font-black text-base text-white uppercase mb-2">
                    Tự Động Hóa & Hệ Sinh Thái Nông Sản
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Nâng cấp công nghệ phòng sạch, mở rộng dịch vụ OEM/ODM và xúc tiến thương mại quốc tế.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10">
                  <Link
                    to="/lich-su"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-haq-gold hover:text-white"
                  >
                    <span>CHI TIẾT LỊCH SỬ →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10 — FINAL CTA: BRAND CALL TO ACTION
            ========================================================================= */}
        <section className="py-24 sm:py-36 bg-haq-ink text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
                PARTNERSHIP & COLLABORATION
              </span>

              <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-white uppercase leading-[1.0] tracking-tight">
                LET’S BUILD <br />
                <span className="text-haq-red">SOMETHING GOOD</span> <br />
                TOGETHER.
              </h2>

              <p className="text-xs sm:text-base text-white/75 max-w-xl mx-auto leading-relaxed">
                Chúng tôi luôn sẵn sàng đồng hành cùng các đối tác phân phối, chuỗi bán lẻ và doanh nghiệp có nhu cầu gia công OEM/ODM thực phẩm chất lượng cao.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/lien-he"
                  className="w-full sm:w-auto px-8 py-4 bg-haq-red text-white text-xs sm:text-sm font-heading font-black uppercase tracking-wider rounded-xl shadow-lg hover:bg-haq-red-dark hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <span>HỢP TÁC CÙNG HAQ</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/san-pham"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white text-xs sm:text-sm font-heading font-black uppercase tracking-wider rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
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
