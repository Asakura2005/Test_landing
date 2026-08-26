import React from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  ShieldCheck,
  Target,
  Compass,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Sparkles,
  Milestone,
  CheckCircle,
  FileCheck,
  Scale,
  HeartHandshake,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

import factoryImg from '../assets/factory/factory_production.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import labImg from '../assets/quality/quality_control_lab.jpg'

const FACT_SHEET = [
  { label: 'TÊN DOANH NGHIỆP', value: 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI', sub: 'HAQ FOOD HANOI JSC' },
  { label: 'NĂM THÀNH LẬP', value: '2021', sub: 'Thủ đô Hà Nội, Việt Nam' },
  { label: 'LĨNH VỰC HOẠT ĐỘNG', value: 'SẢN XUẤT & PHÂN PHỐI THỰC PHẨM', sub: 'Bánh tráng, bánh nướng, đồ ăn vặt đóng gói' },
  { label: 'TIÊU CHUẨN QUẢN LÝ', value: 'ISO 22000:2018 & HACCP', sub: 'Kiểm nghiệm & lưu mẫu từng lô hàng' },
  { label: 'MẠNG LƯỚI PHÂN PHỐI', value: '3.000+ ĐIỂM BÁN', sub: 'WinMart, GO!, Circle K, GS25, Bách Hóa Xanh' },
  { label: 'THỊ TRƯỜNG QUỐC TẾ', value: 'HÀN QUỐC & ĐÀI LOAN', sub: 'Xuất khẩu chính ngạch tiêu chuẩn cao' },
]

const CORE_VALUES = [
  {
    num: '01',
    name: 'QUALITY FIRST',
    title: 'Chất Lượng Là Sinh Mệnh',
    desc: 'Không bao giờ thỏa hiệp với chất lượng. Mọi nguyên liệu nông sản và quy trình sấy giòn đều được kiểm soát khắt khe trước khi đến tay người tiêu dùng.',
    icon: Award,
  },
  {
    num: '02',
    name: 'TRANSPARENCY',
    title: 'Minh Bạch Toàn Diện',
    desc: 'Minh bạch nguồn gốc xuất xứ nông sản, quy trình công bố chất lượng, chỉ tiêu dinh dưỡng và quy chuẩn lưu mẫu bảo chứng theo quy định pháp luật.',
    icon: FileCheck,
  },
  {
    num: '03',
    name: 'INNOVATION',
    title: 'Đổi Mới Sáng Tạo',
    desc: 'Liên tục nghiên cứu R&D, ứng dụng công nghệ sấy nổ và sấy đối lưu hiện đại nhằm nâng tầm hương vị truyền thống Việt Nam phù hợp với xu hướng tiêu dùng mới.',
    icon: Sparkles,
  },
  {
    num: '04',
    name: 'SUSTAINABLE PARTNERSHIP',
    title: 'Hợp Tác Bền Vững',
    desc: 'Đồng hành tin cậy, tôn trọng cam kết và tối ưu hiệu quả kinh doanh cùng các chuỗi bán lẻ, nhà phân phối và đối tác gia công OEM/ODM.',
    icon: HeartHandshake,
  },
  {
    num: '05',
    name: 'CUSTOMER-CENTRIC',
    title: 'Lấy Khách Hàng Làm Trọng Tâm',
    desc: 'Lắng nghe phản hồi từ thị trường để không ngừng cải tiến mẫu mã bao bì tiện lợi, hương vị thơm ngon và mang lại sự an tâm tuyệt đối.',
    icon: Users,
  },
]

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Navigation Header */}
      <StickyNav />

      {/* Floating Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* 1. Executive Corporate Hero */}
        <section className="bg-haq-ink text-white py-16 sm:py-24 border-b border-black/10 relative overflow-hidden">
          {/* Technical Grid Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-gold uppercase">
                  VỀ CHÚNG TÔI · TỔNG QUAN DOANH NGHIỆP
                </span>
                <span className="h-px w-10 bg-haq-gold" />
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
                CÔNG TY CỔ PHẦN HAQ HÀ NỘI <br />
                <span className="text-haq-red">KIẾN TẠO CHUẨN MỰC THỰC PHẨM VIỆT</span>
              </h1>

              <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed font-normal">
                HAQ FOOD là doanh nghiệp sản xuất và phân phối thực phẩm đóng gói hàng đầu tại Việt Nam,
                tiên phong ứng dụng quy trình quản lý chất lượng quốc tế ISO 22000 & HACCP, mang hương vị Việt chất lượng cao vươn tầm thế giới.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Corporate Fact Sheet (Data Grid Style) */}
        <section className="bg-white py-16 sm:py-20 border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
              <div>
                <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                  DATA SHEET
                </span>
                <h2 className="font-heading font-black text-2xl text-haq-ink uppercase mt-0.5">
                  Bảng Dữ Liệu Doanh Nghiệp
                </h2>
              </div>
              <span className="text-xs font-mono text-haq-ink/50 uppercase hidden sm:block">
                HAQ FOOD CORPORATE METRICS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FACT_SHEET.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-haq-bone border border-black/5 hover:border-haq-red/20 transition-all flex flex-col justify-between"
                >
                  <div className="font-mono text-[10px] font-bold text-haq-ink/50 uppercase tracking-wider mb-2">
                    {item.label}
                  </div>
                  <div className="font-heading font-black text-lg sm:text-xl text-haq-ink uppercase tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs text-haq-ink/65 mt-2 pt-3 border-t border-black/5">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Strategic Vision & Mission (Tech-Enterprise Symmetrical Layout) */}
        <section className="py-20 bg-haq-bone border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Vision Card */}
              <div className="lg:col-span-6 bg-white p-8 sm:p-12 rounded-3xl border border-black/10 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-haq-bone flex items-center justify-center text-haq-red mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                    STRATEGIC VISION
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-haq-ink uppercase mt-2 mb-4">
                    Tầm Nhìn Chiến Lược
                  </h3>
                  <p className="text-xs sm:text-sm text-haq-ink/75 leading-relaxed">
                    Trở thành thương hiệu dẫn đầu trong ngành thực phẩm ăn liền và đồ ăn vặt đóng gói cao cấp tại Việt Nam;
                    tiên phong đưa nông sản và món ăn truyền thống được chuẩn hóa vươn tới các thị trường quốc tế phát triển như Hàn Quốc, Đài Loan và Đông Nam Á.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-black/5 font-mono text-[11px] text-haq-ink/50 font-bold uppercase">
                  VƯƠN TẦM THỊ TRƯỜNG CHÂU Á
                </div>
              </div>

              {/* Mission Card */}
              <div className="lg:col-span-6 bg-haq-ink text-white p-8 sm:p-12 rounded-3xl border border-black/10 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-haq-gold mb-6">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-haq-gold uppercase tracking-widest">
                    CORPORATE MISSION
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase mt-2 mb-4">
                    Sứ Mệnh Doanh Nghiệp
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Kiến tạo trải nghiệm ẩm thực an toàn, tiện lợi và đậm đà bản sắc.
                    HAQ FOOD cam kết chuẩn hóa từ nông sản đầu vào đến công nghệ chế biến hiện đại, mang lại giá trị gia tăng bền vững cho người tiêu dùng, đối tác và người nông dân.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 font-mono text-[11px] text-haq-gold font-bold uppercase">
                  AN TOÀN · TIỆN LỢI · BẢN SẮC
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 5 Core Values System (Structural Pillars) */}
        <section className="py-24 sm:py-32 bg-white border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-16">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  CULTURE & INTEGRITY
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                5 GIÁ TRỊ CỐT LÕI KIẾN TẠO THƯƠNG HIỆU
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-haq-ink/70 max-w-2xl leading-relaxed">
                Những nguyên tắc định hình văn hóa doanh nghiệp, chỉ đạo mọi quyết định sản xuất và chuẩn mực hợp tác của HAQ FOOD.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_VALUES.map((val) => {
                const Icon = val.icon
                return (
                  <div
                    key={val.num}
                    className="p-8 rounded-3xl bg-haq-bone border border-black/5 hover:border-haq-red/20 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-heading font-black text-3xl text-haq-red">
                          {val.num}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-haq-ink shadow-2xs">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-haq-ink/50 mb-1">
                        {val.name}
                      </div>
                      <h3 className="font-heading font-black text-lg text-haq-ink uppercase">
                        {val.title}
                      </h3>
                      <p className="mt-3 text-xs text-haq-ink/75 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 5. Navigation Bridge to History & Capabilities */}
        <section className="py-16 bg-haq-bone border-b border-black/5">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/lich-su"
                className="group bg-white p-8 rounded-3xl border border-black/5 hover:border-haq-red shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] font-bold text-haq-red uppercase tracking-widest mb-1">
                    CHUYÊN MỤC TIẾP THEO
                  </div>
                  <h3 className="font-heading font-black text-xl text-haq-ink group-hover:text-haq-red transition-colors uppercase">
                    02. Lịch Sử & Hành Trình (2021 — 2026)
                  </h3>
                  <p className="text-xs text-haq-ink/70 mt-2 leading-relaxed">
                    Khám phá các bước ngoặt phát triển sản phẩm, hệ thống bán lẻ và hành trình xuất khẩu sang Hàn Quốc, Đài Loan.
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-haq-red">
                  <span>XEM DẤU MỐC LỊCH SỬ →</span>
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
                    Năng Lực Sản Xuất & Kiểm Soát Chất Lượng
                  </h3>
                  <p className="text-xs text-haq-ink/70 mt-2 leading-relaxed">
                    Khám phá dây chuyền khép kín, quy trình kiểm soát 5 bước ISO 22000 & HACCP và dịch vụ gia công OEM/ODM.
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
