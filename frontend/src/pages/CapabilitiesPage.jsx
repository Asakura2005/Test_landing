import React, { useState, useMemo } from 'react'
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
import { useLanguage } from '../context/LanguageContext'

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

const RETAIL_PARTNERS = [
  { name: 'WinMart & WinMart+', logo: winmartLogo, note: 'Hệ thống siêu thị toàn quốc' },
  { name: 'GO! & Tops Market', logo: goLogo, note: 'Đại siêu thị & chuỗi bán lẻ' },
  { name: 'Circle K', logo: circleKLogo, note: 'Chuỗi cửa hàng tiện lợi 24/7' },
  { name: 'GS25', logo: gs25Logo, note: 'Chuỗi tiện lợi chuẩn Hàn Quốc' },
  { name: 'K-Market', logo: kmartLogo, note: 'Hệ thống thực phẩm xuất nhập khẩu' },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo, note: 'Chuỗi bán lẻ thực phẩm & tiêu dùng' },
]

export default function CapabilitiesPage() {
  const { t, language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)

  const qualitySteps = useMemo(() => [
    {
      step: '01',
      name: language === 'en' ? 'Raw Material Control' : language === 'ko' ? '원재료 입고 검사' : 'Kiểm soát Nguyên liệu',
      title: 'RAW MATERIAL CONTROL',
      desc: language === 'en'
        ? 'Sensory evaluation, moisture testing, pesticide residue and origin traceability checks for each lot of agri-produce, spices and packaging prior to warehousing.'
        : language === 'ko'
        ? '입고 전 모든 농산물, 향신료 및 포장재에 대해 관능 검사, 수분율 측정, 잔류물 및 원산지 이력 추적을 철저히 실시합니다.'
        : 'Đánh giá cảm quan, kiểm tra độ ẩm, dư lượng và nguồn gốc xuất xứ của từng lô nông sản, gia vị và bao bì trước khi nhập kho.',
      icon: ClipboardCheck,
    },
    {
      step: '02',
      name: language === 'en' ? 'Lab Testing & Safety' : language === 'ko' ? '연구소 안전성 검증' : 'Kiểm nghiệm Phòng Lab',
      title: 'LAB TESTING & SAFETY',
      desc: language === 'en'
        ? 'Microbiological analysis, heavy metal assays, and national technical food safety parameter verification.'
        : language === 'ko'
        ? '국가 기술 규격에 따라 미생물 수치, 중금속 및 식품 안전 위생 기준을 정밀 분석합니다.'
        : 'Xét nghiệm chỉ tiêu vi sinh, kim loại nặng và các tiêu chuẩn an toàn vệ sinh thực phẩm theo quy chuẩn kỹ thuật quốc gia.',
      icon: FlaskConical,
    },
    {
      step: '03',
      name: language === 'en' ? 'Closed Production' : language === 'ko' ? '밀폐형 클린 공정' : 'Chế biến Khép kín',
      title: 'CLOSED PRODUCTION',
      desc: language === 'en'
        ? 'Automated production inside positive-pressure cleanrooms, sterile protective suits, and precisely modulated drying temperatures.'
        : language === 'ko'
        ? '양압 클린룸 내 자동화 생산 라인, 무균 방호복 착용 및 정밀한 건조 온도 제어로 안전을 보장합니다.'
        : 'Quy trình sản xuất tự động trong phòng sạch, công nhân trang bị đồ bảo hộ vô trùng, kiểm soát nhiệt độ sấy chuẩn xác.',
      icon: Scale,
    },
    {
      step: '04',
      name: language === 'en' ? 'Batch Sample Storage' : language === 'ko' ? '로트별 검체 보관' : 'Lưu mẫu Từng lô',
      title: 'BATCH SAMPLE STORAGE',
      desc: language === 'en'
        ? 'Every production lot is archived in an independent inspection facility throughout shelf-life for 100% full traceability.'
        : language === 'ko'
        ? '출고되는 모든 생산 로트의 검체는 유통기한 동안 독립 검사 시설에 보관되어 철저한 역추적이 가능합니다.'
        : 'Mỗi lô thành phẩm xuất xưởng đều được lưu mẫu tại phòng kiểm định độc lập trong suốt hạn sử dụng để truy xuất nguồn gốc.',
      icon: Box,
    },
    {
      step: '05',
      name: language === 'en' ? 'Sealed Packaging & Distribution' : language === 'ko' ? '밀봉 포장 및 유통' : 'Đóng gói & Phân phối',
      title: 'SEALED PACKAGING',
      desc: language === 'en'
        ? 'Multi-layer barrier packaging, QR traceability, and clear expiry dates ready for supermarket distribution and international export.'
        : language === 'ko'
        ? '다층 방습 포장과 QR 이력 코드, 선명한 유통기한 표기로 대형 유통망 및 해외 수출에 즉각 대응합니다.'
        : 'Bao bì nhiều lớp chống ẩm, in mã QR truy xuất và hạn sử dụng rõ ràng, sẵn sàng cung ứng cho chuỗi bán lẻ và xuất khẩu.',
      icon: ShieldCheck,
    },
  ], [language])

  return (
    <div className="min-h-screen bg-haq-cream text-haq-ink font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* Sticky Header */}
      <StickyNav />

      {/* Floating Quick Contact */}
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px] pb-20">
        {/* 1. Subpage Hero Header */}
        <section className="bg-white border-b border-haq-border py-14 sm:py-20">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  {t('capabilities.badge', 'NĂNG LỰC DOANH NGHIỆP · CAPABILITIES')}
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-haq-ink uppercase tracking-tight leading-tight">
                {t('capabilities.title', 'NĂNG LỰC SẢN XUẤT & KIỂM SOÁT CHẤT LƯỢNG')}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed">
                {t('capabilities.subtitle', 'Hạ tầng nhà máy hiện đại đạt chuẩn ISO 22000 & HACCP, dây chuyền sấy giòn khép kín, phòng kiểm định độc lập và năng lực gia công OEM/ODM toàn diện cho đối tác.')}
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
                  alt={language === 'en' ? 'HAQ FOOD Manufacturing Plant' : language === 'ko' ? 'HAQ FOOD 제조 공장' : 'Nhà máy sản xuất HAQ FOOD'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-haq-red text-white text-xs font-mono font-bold uppercase px-3 py-1 rounded-full">
                  {language === 'en' ? 'AUTOMATED DRYING LINE' : language === 'ko' ? '자동 열풍 건조 라인' : 'DÂY CHUYỀN SẤY TỰ ĐỘNG'}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold text-haq-red uppercase tracking-widest">
                    01. {language === 'en' ? 'MANUFACTURING POWER' : language === 'ko' ? '제조 시설' : 'NĂNG LỰC NHÀ MÁY'}
                  </span>
                  <h2 className="font-heading font-black text-3xl text-haq-ink uppercase mt-1">
                    {t('capabilities.cleanroom_title', 'Dây Chuyền Khép Kín Chuẩn ISO 22000')}
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                    {t('capabilities.cleanroom_desc', 'Hệ thống máy sấy nhiệt đối lưu, buồng sấy nổ công nghệ cao và máy đóng gói nhiều lớp giúp bảo toàn hương vị tự nhiên và độ giòn đặc trưng của từng mẻ bánh.')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-5 rounded-2xl border border-haq-border">
                    <Cpu className="w-5 h-5 text-haq-red mb-2" />
                    <div className="font-heading font-black text-lg text-haq-ink">100%</div>
                    <div className="text-[11px] text-haq-text-secondary mt-0.5">
                      {language === 'en' ? 'Automated mixing & drying' : language === 'ko' ? '혼합 및 건조 공정 자동화' : 'Tự động hóa khâu trộn & sấy'}
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-haq-border">
                    <Factory className="w-5 h-5 text-haq-red mb-2" />
                    <div className="font-heading font-black text-lg text-haq-ink">
                      {language === 'en' ? 'CLEANROOM' : language === 'ko' ? '클린룸' : 'PHÒNG SẠCH'}
                    </div>
                    <div className="text-[11px] text-haq-text-secondary mt-0.5">
                      {language === 'en' ? 'Positive pressure sterile room' : language === 'ko' ? '양압 무균 청정 환경' : 'Vô trùng áp suất dương'}
                    </div>
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
                02. {language === 'en' ? 'QUALITY STANDARDS' : language === 'ko' ? '품질 관리' : 'TIÊU CHUẨN CHẤT LƯỢNG'}
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase mt-1">
                {t('capabilities.process_title', 'Quy Trình Kiểm Soát 5 Bước Nghiêm Ngặt')}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                {language === 'en'
                  ? 'Applying strict HACCP and ISO 22000 standards across every stage from raw ingredient selection to certified sample archiving.'
                  : language === 'ko'
                  ? '원료 선별부터 보관 검체 인증까지 모든 단계에 HACCP 및 ISO 22000 규격을 철저히 적용합니다.'
                  : 'Áp dụng quy chuẩn HACCP và ISO 22000 trong mọi công đoạn từ tuyển chọn nguyên liệu đến lưu mẫu bảo chứng.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-3">
                {qualitySteps.map((item, idx) => {
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
                    {language === 'en' ? `STEP ${qualitySteps[activeStep].step} / 05` : language === 'ko' ? `단계 ${qualitySteps[activeStep].step} / 05` : `BƯỚC ${qualitySteps[activeStep].step} / 05`}
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-haq-red uppercase">{qualitySteps[activeStep].title}</div>
                <h3 className="font-heading font-black text-xl text-haq-ink uppercase mt-1 mb-2">
                  {qualitySteps[activeStep].name}
                </h3>
                <p className="text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                  {qualitySteps[activeStep].desc}
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
                    03. {language === 'en' ? 'CONTRACT MANUFACTURING' : language === 'ko' ? 'OEM/ODM 제조' : 'GIA CÔNG THỰC PHẨM'}
                  </span>
                  <h2 className="font-heading font-black text-3xl text-haq-ink uppercase mt-1">
                    {t('capabilities.oem_title', 'Dịch Vụ Gia Công OEM / ODM Chuyên Nghiệp')}
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                    {t('capabilities.oem_desc', 'Đồng hành cùng các thương hiệu bán lẻ, chuỗi F&B và nhà phân phối phát triển các dòng sản phẩm bánh tráng và đồ ăn vặt đóng gói riêng.')}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-2xl border border-haq-border flex items-start gap-3">
                    <FileCheck className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-haq-ink uppercase">
                        {language === 'en' ? 'Regulatory Dossier & Lab Testing Assistance' : language === 'ko' ? '자가품질검사 및 신고 서류 지원' : 'Hỗ trợ hồ sơ tự công bố & Kiểm nghiệm'}
                      </h4>
                      <p className="text-xs text-haq-text-secondary mt-0.5">
                        {language === 'en' ? 'Comprehensive guidance on legal compliance, microbiological testing, and quality declaration.' : language === 'ko' ? '법적 행정 절차, 미생물 시험 및 품질 적합 인증을 전폭적으로 지원합니다.' : 'Tư vấn đầy đủ thủ tục pháp lý, kiểm nghiệm vi sinh và công bố chất lượng.'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-haq-border flex items-start gap-3">
                    <Boxes className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-haq-ink uppercase">
                        {language === 'en' ? 'Custom Packaging & Bespoke Seasoning Recipes' : language === 'ko' ? '포장 규격 및 맞춤형 시즈닝 개발' : 'Tùy biến bao bì & công thức gia vị'}
                      </h4>
                      <p className="text-xs text-haq-text-secondary mt-0.5">
                        {language === 'en' ? 'Flexible zipper pouch sizing, aluminum foil canisters, gift sets, and regional taste calibration.' : language === 'ko' ? '스탠딩 지퍼백, 알루미늄 캔, 선물용 박스 및 현지 맞춤형 풍미를 유연하게 제공합니다.' : 'Linh hoạt kích cỡ túi zip, hũ nắp nhôm, hộp quà tặng và khẩu vị vùng miền.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-16/10 rounded-3xl overflow-hidden shadow-xl border border-haq-border">
                <img
                  src={b2bImg}
                  alt={language === 'en' ? 'B2B Partnership with HAQ FOOD' : language === 'ko' ? 'HAQ FOOD B2B 협력' : 'Hợp tác B2B cùng HAQ FOOD'}
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
                04. {language === 'en' ? 'DISTRIBUTION & EXPORT' : language === 'ko' ? '유통 및 수출' : 'PHÂN PHỐI & XUẤT KHẨU'}
              </span>
              <h2 className="font-heading font-black text-3xl text-haq-ink uppercase mt-1">
                {language === 'en' ? 'Retail Network & International Export' : language === 'ko' ? '전국 유통망 및 해외 수출 네트워크' : 'Mạng Lưới Bán Lẻ & Xuất Khẩu Quốc Tế'}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-haq-text-secondary leading-relaxed">
                {language === 'en' ? 'Present across 3,000+ retail stores in Vietnam with official exports to South Korea and Taiwan.' : language === 'ko' ? '베트남 전역 3,000개 이상의 매장 입점 및 한국, 대만 정식 수출 진행 중.' : 'Hiện diện tại hơn 3.000 điểm bán lẻ tại Việt Nam và xuất khẩu chính ngạch sang Hàn Quốc, Đài Loan.'}
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
                    {language === 'en' ? 'Standardized International Pallet Packing' : language === 'ko' ? '국제 표준 팔레트 포장' : 'Đóng Gói Pallet Tiêu Chuẩn Quốc Tế'}
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
              {language === 'en' ? 'PARTNER WITH HAQ FOOD TODAY' : language === 'ko' ? 'HAQ FOOD와 함께하는 비즈니스 파트너십' : 'HỢP TÁC DOANH NGHIỆP CÙNG HAQ FOOD'}
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-white/70">
              {language === 'en' ? 'Contact our sales and OEM/ODM team directly to receive product catalogs and distributor policies.' : language === 'ko' ? '영업 및 OEM/ODM 담당 부서로 직접 문의하시면 카탈로그와 유통 정책을 안내해 드립니다.' : 'Liên hệ trực tiếp với bộ phận kinh doanh & OEM/ODM để nhận catalog và chính sách đại lý.'}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 bg-haq-red hover:bg-white hover:text-haq-ink text-white text-xs font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all"
              >
                <span>{t('capabilities.cta_contact', 'LIÊN HỆ HỢP TÁC →')}</span>
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
