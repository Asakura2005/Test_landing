import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
} from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { useReveal } from '../hooks/useReveal'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import winmartLogo from '../assets/pictures_doitac/winmart.png'

const COMPANY_FACTS = [
  ['Năm thành lập', '2021'],
  ['Lĩnh vực', 'Sản xuất - phân phối thực phẩm'],
  ['Thị trường', 'Việt Nam, Hàn Quốc, Đài Loan'],
  ['Chứng nhận', 'ISO - HACCP'],
]

const TIMELINE = [
  ['2021', 'Thành lập công ty; hoàn thiện dây chuyền sản xuất bánh tráng trộn và bắt đầu ký kết hợp đồng với nhiều đơn vị khách hàng.'],
  ['2022', 'Mở rộng sản phẩm: bánh đậu xanh, bánh hạnh nhân, bắp rang bơ, thịt khô.'],
  ['2023', 'Phủ sóng tại GO!, WinMart, Circle K, GS25, Kmart, Bách Hóa Xanh và các hệ thống bán lẻ lớn.'],
  ['2024', 'Xuất khẩu sang Hàn Quốc và Đài Loan.'],
  ['2025', 'Tham gia Hội chợ Giao thương Việt - Trung.'],
]

const VALUES = [
  'Chất lượng là nền tảng - Quality First.',
  'Minh bạch quy trình - Transparency.',
  'Đổi mới sản phẩm - Innovation.',
  'Hợp tác bền vững - Sustainable Partnership.',
  'Lấy khách hàng làm trung tâm - Customer-centric Approach.',
]

const CAPABILITIES = [
  'Nhà xưởng đạt ISO - HACCP.',
  'Kiểm soát chặt chẽ từ nguyên liệu đến lưu mẫu.',
  'Có khả năng đáp ứng đơn hàng lớn và liên tục.',
  'Nhận sản xuất theo yêu cầu đối tác (OEM/ODM).',
  'Quy trình xuất kho và logistics minh bạch.',
]

const DOMESTIC_PARTNERS = [
  { name: 'WinMart', logo: winmartLogo },
  { name: 'GO!', logo: goLogo },
  { name: 'Circle K', logo: circleKLogo },
  { name: 'GS25', logo: gs25Logo },
  { name: 'Kmart', logo: kmartLogo },
  { name: 'Bách Hóa Xanh', logo: bachHoaXanhLogo },
]

const INTERNATIONAL_MARKETS = [
  { country: 'Hàn Quốc', code: 'kr' },
  { country: 'Đài Loan', code: 'tw' },
]

function RevealBlock({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function SectionEyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-10 bg-haq-red" />
      <span className="font-mono text-xs tracking-[0.22em] uppercase text-haq-red">{children}</span>
    </div>
  )
}

function CountryFlag({ code, country }) {
  if (code === 'kr') {
    return (
      <svg viewBox="0 0 30 20" className="h-5 w-[30px] shrink-0 rounded-sm shadow-sm" role="img" aria-label={`Cờ ${country}`}>
        <rect width="30" height="20" fill="#fff" />
        <g transform="rotate(33 15 10)" fill="none" stroke="#1a1a1a" strokeWidth="1.15" strokeLinecap="square">
          <path d="M4 4h5M4 6h5M4 8h5M21 12h5M21 14h5M21 16h5" />
          <path d="M21 4h5M21 8h5M4 12h5M4 16h5" />
        </g>
        <path d="M15 6a4 4 0 0 1 0 8 2 2 0 0 0 0-4 2 2 0 0 1 0-4" fill="#cd2e3a" />
        <path d="M15 14a4 4 0 0 1 0-8 2 2 0 0 0 0 4 2 2 0 0 1 0 4" fill="#0f64b3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 30 20" className="h-5 w-[30px] shrink-0 rounded-sm shadow-sm" role="img" aria-label={`Cờ ${country}`}>
      <rect width="30" height="20" fill="#d91023" />
      <rect width="14" height="10" fill="#012169" />
      <g fill="#fff" transform="translate(7 5)">
        <path d="M0-4.1 0.78-1.22 2.9-2.9 1.22-.78 4.1 0 1.22.78 2.9 2.9.78 1.22 0 4.1-.78 1.22-2.9 2.9-1.22.78-4.1 0-1.22-.78-2.9-2.9-.78-1.22Z" />
        <circle r="1.7" fill="#012169" />
      </g>
    </svg>
  )
}

export default function CompanyProfilePage() {
  return (
    <main id="top" className="bg-haq-bone min-h-screen font-inter selection:bg-haq-orange selection:text-white">
      <StickyNav />

      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-haq-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
          <RevealBlock className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-16 bg-haq-orange" />
              <span className="font-mono text-sm tracking-[0.25em] uppercase text-haq-orange font-bold">Giới thiệu doanh nghiệp</span>
            </div>
            <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] text-white">
              CÔNG TY CỔ PHẦN<br />
              <span className="text-haq-red">HAQ HÀ NỘI</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white/70 leading-[1.6] max-w-3xl font-medium">
              Sản xuất - phân phối thực phẩm; cung cấp đồ ăn vặt đóng gói và các sản phẩm thực phẩm.
            </p>
          </RevealBlock>
        </div>
      </section>

      <section id="gioi-thieu" className="scroll-mt-24 py-24 md:py-32 bg-haq-bone">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            <RevealBlock className="lg:col-span-5">
              <SectionEyebrow>Về HAQ Hà Nội</SectionEyebrow>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink leading-[1.1] tracking-tight">
                Chất lượng là cốt lõi của thương hiệu.
              </h2>
              <div className="w-16 h-2 bg-haq-red mt-8" />
            </RevealBlock>
            <RevealBlock className="lg:col-span-7 text-lg text-haq-ink/75 leading-[1.85] space-y-6">
              <p>HAQ Hà Nội được thành lập trong bối cảnh thị trường thực phẩm ngày càng yêu cầu cao về an toàn thực phẩm, tính minh bạch, chất lượng sản phẩm và sự đa dạng về khẩu vị.</p>
              <p>Công ty được thành lập với mong muốn cung cấp các sản phẩm đồ ăn vặt mang hương vị Việt Nam, đồng thời đáp ứng các tiêu chuẩn về vệ sinh an toàn thực phẩm và phù hợp với nhu cầu đa dạng của người tiêu dùng hiện đại.</p>
              <p>Từ triết lý này, HAQ Hà Nội tập trung liên tục cải tiến quy trình, nâng cao năng lực sản xuất và đa dạng hóa sản phẩm; đồng thời từng bước mở rộng vị thế tại thị trường quốc tế.</p>
            </RevealBlock>
          </div>

          <RevealBlock className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 border border-black/10 bg-black/10 gap-px">
            {COMPANY_FACTS.map(([label, value]) => (
              <div key={label} className="bg-white p-6 md:p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-haq-ink/50">{label}</div>
                <div className="mt-3 font-heading font-bold text-lg md:text-xl text-haq-ink leading-snug">{value}</div>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      <section id="hanh-trinh" className="scroll-mt-24 py-24 md:py-32 bg-white border-y border-black/10">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <RevealBlock className="max-w-3xl">
            <SectionEyebrow>Hành trình phát triển</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink tracking-tight">Các dấu mốc của HAQ Hà Nội</h2>
          </RevealBlock>
          <div className="mt-14 max-w-4xl space-y-4">
            {TIMELINE.map(([year, text]) => (
              <RevealBlock key={year} className="grid grid-cols-[86px_1fr] md:grid-cols-[132px_1fr] gap-5 md:gap-8 items-start bg-haq-bone border border-black/5 p-6 md:p-8">
                <div className="font-heading font-extrabold text-3xl md:text-4xl text-haq-orange">{year}</div>
                <p className="text-haq-ink/80 leading-[1.75] pt-1">{text}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <section id="dinh-huong" className="scroll-mt-24 py-24 md:py-32 bg-haq-bone">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <RevealBlock className="text-center max-w-3xl mx-auto mb-16">
            <SectionEyebrow>Định hướng phát triển</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink tracking-tight">Tầm nhìn, sứ mệnh và giá trị cốt lõi</h2>
          </RevealBlock>
          <div className="grid lg:grid-cols-2 gap-8">
            <RevealBlock className="bg-white p-8 md:p-12 border border-black/5">
              <Globe2 className="w-12 h-12 text-haq-orange mb-7" strokeWidth={1.6} />
              <h3 className="font-heading font-bold text-3xl text-haq-ink mb-4">Tầm nhìn</h3>
              <p className="text-haq-ink/70 leading-[1.8] text-lg">Trở thành doanh nghiệp tiên phong và dẫn đầu trong lĩnh vực sản xuất - phân phối đồ ăn vặt tại Việt Nam; mở rộng sang các thị trường tiêu chuẩn cao như Nhật Bản, Hàn Quốc và các quốc gia châu Á.</p>
            </RevealBlock>
            <RevealBlock className="bg-haq-ink p-8 md:p-12 border border-black/5">
              <Building2 className="w-12 h-12 text-haq-orange mb-7" strokeWidth={1.6} />
              <h3 className="font-heading font-bold text-3xl text-white mb-4">Sứ mệnh</h3>
              <p className="text-white/75 leading-[1.8] text-lg">Mang đến các sản phẩm ngon - an toàn - đạt chuẩn, đáp ứng nhu cầu ngày càng cao của người tiêu dùng.</p>
            </RevealBlock>
          </div>
          <RevealBlock className="mt-8 bg-white border border-black/5 p-8 md:p-12">
            <h3 className="font-heading font-bold text-3xl text-haq-ink mb-8">Giá trị cốt lõi</h3>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
              {VALUES.map((value) => (
                <div key={value} className="flex items-start gap-3 text-haq-ink/80 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-haq-red shrink-0 mt-0.5" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      <section id="nang-luc" className="scroll-mt-24 py-24 md:py-32 bg-white border-y border-black/10">
        <div className="mx-auto max-w-site px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <RevealBlock>
            <SectionEyebrow>Năng lực sản xuất</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink tracking-tight leading-[1.1]">Nền tảng sản xuất và kiểm soát chất lượng</h2>
            <div className="mt-10 space-y-5">
              {CAPABILITIES.map((item) => (
                <div key={item} className="flex gap-4 text-lg text-haq-ink/75 leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-haq-red shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
          <RevealBlock className="bg-haq-ink text-white p-8 md:p-12">
            <Factory className="w-14 h-14 text-haq-orange mb-8" strokeWidth={1.5} />
            <h3 className="font-heading font-bold text-3xl md:text-4xl">Sản xuất theo yêu cầu đối tác</h3>
            <p className="mt-6 text-white/75 text-lg leading-[1.8]">HAQ Hà Nội nhận sản xuất theo yêu cầu đối tác (OEM/ODM).</p>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {['ISO', 'HACCP'].map((cert) => (
                <div key={cert} className="border border-white/20 p-5">
                  <ShieldCheck className="w-6 h-6 text-haq-orange mb-4" />
                  <div className="font-heading font-bold text-xl">{cert}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      <section id="phan-phoi" className="scroll-mt-24 py-24 md:py-32 bg-haq-bone">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <RevealBlock className="max-w-3xl">
            <SectionEyebrow>Hệ thống phân phối</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink tracking-tight">Thị trường trong nước và quốc tế</h2>
            <p className="mt-6 text-lg text-haq-ink/70 leading-[1.8]">HAQ Hà Nội phân phối sản phẩm tới các hệ thống bán lẻ lớn và đưa sản phẩm ra thị trường Hàn Quốc, Đài Loan.</p>
          </RevealBlock>
          <RevealBlock className="mt-14">
            <div className="flex items-center justify-between gap-5 mb-8">
              <div className="flex items-center gap-3"><Store className="w-6 h-6 text-haq-red" /><h3 className="font-heading font-bold text-2xl text-haq-ink">Thị trường trong nước</h3></div>
              <span className="hidden sm:block font-mono text-[10px] tracking-[0.16em] uppercase text-haq-ink/45">Đối tác phân phối</span>
            </div>
            <div className="relative overflow-hidden py-2">
              <div className="distribution-marquee flex w-max items-center gap-12 pr-12 sm:gap-20 sm:pr-20">
                {[...DOMESTIC_PARTNERS, ...DOMESTIC_PARTNERS].map((partner, index) => (
                  <div key={`${partner.name}-${index}`} aria-hidden={index >= DOMESTIC_PARTNERS.length} className="flex h-24 w-40 shrink-0 items-center justify-center sm:w-48">
                    <img src={partner.logo} alt={index < DOMESTIC_PARTNERS.length ? `Logo ${partner.name}` : ''} className="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-haq-bone via-haq-bone/90 to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-haq-bone via-haq-bone/90 to-transparent sm:w-24" />
            </div>
            <div className="mt-12 grid gap-7 border-t border-black/10 pt-8 lg:grid-cols-[0.9fr_1.1fr_auto] lg:items-center">
              <div className="flex items-center gap-3 text-haq-ink">
                <Globe2 className="w-6 h-6 text-haq-red" />
                <h3 className="font-heading font-bold text-2xl">Thị trường quốc tế</h3>
              </div>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {INTERNATIONAL_MARKETS.map(({ country, code }) => (
                  <li key={country} className="flex items-center gap-3 text-lg font-medium text-haq-ink/80">
                    <CountryFlag code={code} country={country} />
                    <span>{country}</span>
                  </li>
                ))}
              </ul>
              <p className="max-w-sm text-sm leading-relaxed text-haq-ink/60 lg:text-right">Định hướng dài hạn: mở rộng sang Nhật Bản và các thị trường châu Á có tiêu chuẩn cao.</p>
            </div>
          </RevealBlock>
        </div>
      </section>

      <section id="lien-he" className="scroll-mt-24 py-24 md:py-28 bg-haq-ink text-white">
        <div className="mx-auto max-w-site px-6 md:px-12 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <RevealBlock>
            <SectionEyebrow>Thông tin liên hệ</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight">CÔNG TY CỔ PHẦN HAQ HÀ NỘI</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-6 text-white/75">
              <div className="flex gap-3"><MapPin className="w-5 h-5 text-haq-gold shrink-0 mt-1" /><span>Tổ 6, Phường Cầu Giấy, Thành phố Hà Nội, Việt Nam</span></div>
              <a href="tel:02423235656" className="flex gap-3 hover:text-white"><Phone className="w-5 h-5 text-haq-gold shrink-0 mt-1" /><span>024 23 23 56 56</span></a>
              <a href="mailto:info@haq.com.vn" className="flex gap-3 hover:text-white"><Mail className="w-5 h-5 text-haq-gold shrink-0 mt-1" /><span>info@haq.com.vn</span></a>
            </div>
          </RevealBlock>
          <Link to="/lien-he" className="inline-flex items-center justify-center gap-3 min-h-[54px] px-8 bg-haq-orange text-haq-ink font-heading font-bold hover:bg-white transition-colors">
            Liên hệ với chúng tôi <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
