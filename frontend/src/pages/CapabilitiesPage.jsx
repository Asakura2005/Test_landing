import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Factory,
  Cpu,
  FlaskConical,
  Boxes,
  Handshake,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  Scale,
  Box,
  Truck,
  Globe2,
  Store,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

import factoryImg from '../assets/factory/factory_production.jpg'
import labImg from '../assets/quality/quality_control_lab.jpg'
import b2bImg from '../assets/business/b2b_partnership.jpg'
import distributionImg from '../assets/distribution/distribution_export.jpg'

// Partners logos
import winmartLogo from '../assets/pictures_doitac/winmart.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'

const QUALITY_STEPS = [
  {
    step: '01',
    name: 'Kiểm soát Nguyên liệu',
    title: 'RAW MATERIAL CONTROL',
    desc: 'Đánh giá cảm quan, kiểm tra độ ẩm, dư lượng và nguồn gốc xuất xứ của từng lô nông sản, gia vị và bao bì trước khi nhập kho.',
    icon: ClipboardCheck,
  },
  {
    step: '02',
    name: 'Kiểm nghiệm Phòng Lab',
    title: 'LAB TESTING & SAFETY',
    desc: 'Xét nghiệm chỉ tiêu vi sinh, kim loại nặng và các tiêu chuẩn an toàn vệ sinh thực phẩm theo quy chuẩn kỹ thuật quốc gia.',
    icon: FlaskConical,
  },
  {
    step: '03',
    name: 'Chế biến Khép kín',
    title: 'CLOSED PRODUCTION',
    desc: 'Quy trình sản xuất tự động trong phòng sạch, công nhân trang bị đồ bảo hộ vô trùng, kiểm soát nhiệt độ sấy chuẩn xác.',
    icon: Scale,
  },
  {
    step: '04',
    name: 'Lưu mẫu Từng lô',
    title: 'BATCH SAMPLE STORAGE',
    desc: 'Mỗi lô thành phẩm xuất xưởng đều được lưu mẫu tại phòng kiểm định độc lập trong suốt hạn sử dụng để truy xuất nguồn gốc.',
    icon: Box,
  },
  {
    step: '05',
    name: 'Đóng gói & Phân phối',
    title: 'SEALED PACKAGING',
    desc: 'Bao bì nhiều lớp chống ẩm, in mã QR truy xuất và hạn sử dụng rõ ràng, sẵn sàng cung ứng cho chuỗi bán lẻ và xuất khẩu.',
    icon: ShieldCheck,
  },
]

const RETAIL_PARTNERS = [
  { name: 'WinMart & WinMart+', logo: winmartLogo, note: 'Hệ thống siêu thị toàn quốc' },
  { name: 'GO! & Tops Market', logo: goLogo, note: 'Đại siêu thị & chuỗi bán lẻ' },
  { name: 'Circle K', logo: circleKLogo, note: 'Chuỗi cửa hàng tiện lợi 24/7' },
  { name: 'GS25', logo: gs25Logo, note: 'Chuỗi tiện lợi chuẩn Hàn Quốc' },
  { name: 'K-Market', logo: kmartLogo, note: 'Hệ thống thực phẩm xuất nhập khẩu' },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo, note: 'Chuỗi bán lẻ thực phẩm & tiêu dùng' },
]

export default function CapabilitiesPage() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact */}
      <FloatingContactBar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        {/* 1. Subpage Hero Header */}
        <section className="bg-white border-b border-haq-border py-14 sm:py-20">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  NĂNG LỰC DOANH NGHIỆP · CAPABILITIES
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-haq-ink uppercase tracking-tight leading-tight">
                NĂNG LỰC SẢN XUẤT & <br />
                <span className="text-haq-red">KIỂM SOÁT CHẤT LƯỢNG</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed">
                Hạ tầng nhà máy hiện đại đạt chuẩn ISO 22000 & HACCP, dây chuyền sấy giòn khép kín,
                phòng kiểm định độc lập và năng lực gia công OEM/ODM toàn diện cho đối tác.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Manufacturing Power & Cleanroom (Factory) */}
        <section id="nha-may" className="py-20 border-b border-haq-border bg-haq-cream">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 relative aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border border-haq-border">
                <img
                  src={factoryImg}
                  alt="Nhà máy sản xuất HAQ FOOD"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-haq-red text-white text-xs font-mono font-bold uppercase px-3 py-1 rounded-full">
                  DÂY CHUYỀN SẤY TỰ ĐỘNG
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                    01. NĂNG LỰC NHÀ MÁY
                  </span>
                  <h2 className="font-heading font-black text-3xl text-haq-ink uppercase mt-1">
                    Dây Chuyền Khép Kín Chuẩn ISO 22000
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                    Hệ thống máy sấy nhiệt đối lưu, buồng sấy nổ công nghệ cao và máy đóng gói nhiều lớp giúp bảo toàn hương vị tự nhiên và độ giòn đặc trưng của từng mẻ bánh.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-5 rounded-2xl border border-haq-border">
                    <Cpu className="w-5 h-5 text-haq-red mb-2" />
                    <div className="font-heading font-black text-lg text-haq-ink">100%</div>
                    <div className="text-[11px] text-haq-text-secondary mt-0.5">Tự động hóa khâu trộn & sấy</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-haq-border">
                    <Factory className="w-5 h-5 text-haq-red mb-2" />
                    <div className="font-heading font-black text-lg text-haq-ink">PHÒNG SẠCH</div>
                    <div className="text-[11px] text-haq-text-secondary mt-0.5">Vô trùng áp suất dương</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 5-Step Quality Process (ISO 22000 / HACCP) */}
        <section id="chat-luong" className="py-20 border-b border-haq-border bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-14">
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                02. TIÊU CHUẨN CHẤT LƯỢNG
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                Quy Trình Kiểm Soát 5 Bước Nghiêm Ngặt
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                Áp dụng quy chuẩn HACCP và ISO 22000 trong mọi công đoạn từ tuyển chọn nguyên liệu đến lưu mẫu bảo chứng.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-3">
                {QUALITY_STEPS.map((item, idx) => {
                  const isActive = activeStep === idx
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${
                        isActive
                          ? 'bg-haq-cream border-haq-red shadow-md scale-[1.01]'
                          : 'bg-white border-haq-border hover:bg-haq-cream/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-xs ${
                        isActive ? 'bg-haq-red text-white' : 'bg-haq-cream text-haq-text-secondary'
                      }`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-[10px] font-bold text-haq-red uppercase">{item.title}</div>
                        <div className="font-heading font-bold text-sm text-haq-ink uppercase">{item.name}</div>
                      </div>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-haq-red" />}
                    </button>
                  )
                })}
              </div>

              <div className="lg:col-span-6 bg-haq-cream rounded-3xl p-6 sm:p-8 border border-haq-border shadow-lg">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6 bg-haq-soft">
                  <img
                    src={labImg}
                    alt="Phòng Lab kiểm nghiệm HAQ"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-haq-red text-white font-mono text-xs font-bold px-3 py-1 rounded-full">
                    BƯỚC {QUALITY_STEPS[activeStep].step} / 05
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-haq-red uppercase">{QUALITY_STEPS[activeStep].title}</div>
                <h3 className="font-heading font-black text-xl text-haq-ink uppercase mt-1 mb-2">
                  {QUALITY_STEPS[activeStep].name}
                </h3>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  {QUALITY_STEPS[activeStep].desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OEM / ODM Partnership Platform */}
        <section id="oem-odm" className="py-20 border-b border-haq-border bg-haq-cream">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                    03. GIA CÔNG THỰC PHẨM
                  </span>
                  <h2 className="font-heading font-black text-3xl text-haq-ink uppercase mt-1">
                    Dịch Vụ Gia Công OEM / ODM Chuyên Nghiệp
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                    Đồng hành cùng các thương hiệu bán lẻ, chuỗi F&B và nhà phân phối phát triển các dòng sản phẩm bánh tráng và đồ ăn vặt đóng gói riêng.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-2xl border border-haq-border flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-haq-ink uppercase">Hỗ trợ hồ sơ tự công bố & Kiểm nghiệm</h4>
                      <p className="text-xs text-haq-text-secondary mt-0.5">Tư vấn đầy đủ thủ tục pháp lý, kiểm nghiệm vi sinh và công bố chất lượng.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-haq-border flex items-start gap-3">
                    <Boxes className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-haq-ink uppercase">Tùy biến bao bì & công thức gia vị</h4>
                      <p className="text-xs text-haq-text-secondary mt-0.5">Linh hoạt kích cỡ túi zip, hũ nắp nhôm, hộp quà tặng và khẩu vị vùng miền.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-16/10 rounded-3xl overflow-hidden shadow-xl border border-haq-border">
                <img
                  src={b2bImg}
                  alt="Hợp tác B2B cùng HAQ FOOD"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Distribution & Logistics */}
        <section id="phan-phoi" className="py-20 border-b border-haq-border bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                04. PHÂN PHỐI & XUẤT KHẨU
              </span>
              <h2 className="font-heading font-black text-3xl text-haq-ink uppercase mt-1">
                Mạng Lưới Bán Lẻ & Xuất Khẩu Quốc Tế
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                Hiện diện tại hơn 3.000 điểm bán lẻ tại Việt Nam và xuất khẩu chính ngạch sang Hàn Quốc, Đài Loan.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {RETAIL_PARTNERS.map((partner, idx) => (
                <div key={idx} className="bg-haq-cream p-4 rounded-2xl border border-haq-border flex flex-col items-center justify-center text-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 max-w-[100px] object-contain mb-2"
                  />
                  <div className="text-[11px] font-heading font-bold text-haq-ink uppercase">{partner.name}</div>
                </div>
              ))}
            </div>

            <div className="relative aspect-21/9 rounded-3xl overflow-hidden border border-haq-border shadow-lg">
              <img
                src={distributionImg}
                alt="Kho vận xuất khẩu HAQ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-haq-dark/80 via-transparent to-transparent flex items-end p-6 sm:p-10 text-white">
                <div>
                  <div className="font-mono text-xs font-bold text-haq-gold uppercase">LOGISTICS & EXPORT</div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl uppercase mt-1">
                    Đóng Gói Pallet Tiêu Chuẩn Quốc Tế
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Contact CTA */}
        <section className="py-16 bg-haq-dark text-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 text-center max-w-2xl">
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase">
              HỢP TÁC DOANH NGHIỆP CÙNG HAQ FOOD
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-white/70">
              Liên hệ trực tiếp với bộ phận kinh doanh & OEM/ODM để nhận catalog và chính sách đại lý.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 bg-haq-red hover:bg-white hover:text-haq-ink text-white text-xs font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all"
              >
                <span>LIÊN HỆ HỢP TÁC →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
