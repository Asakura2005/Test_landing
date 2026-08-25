import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe2, Store } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Hero from '../components/Hero'
import Products from '../components/Products'
import LeadForm from '../components/LeadForm'
import Footer from '../components/Footer'
import HeritageTimeline from '../components/HeritageTimeline'
import { useReveal } from '../hooks/useReveal'
import factoryImg from '../assets/hero-factory.jpg'
import bachHoaXanhLogo from '../assets/pictures_doitac/bach_hoa_xanh.png'
import circleKLogo from '../assets/pictures_doitac/circle_k.png'
import goLogo from '../assets/pictures_doitac/go!.png'
import gs25Logo from '../assets/pictures_doitac/gs25.png'
import kmartLogo from '../assets/pictures_doitac/kmart.png'
import winmartLogo from '../assets/pictures_doitac/winmart.png'

const PARTNERS = [winmartLogo, goLogo, circleKLogo, gs25Logo, kmartLogo, bachHoaXanhLogo]

function Eyebrow({ children }) {
  return <div className="flex items-center gap-3 mb-5"><span className="h-px w-10 bg-haq-red" /><span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-haq-red">{children}</span></div>
}

function BrandStory() {
  const ref = useReveal()
  return (
    <section id="cau-chuyen" className="bg-haq-bone py-24 md:py-32">
      <div ref={ref} className="reveal mx-auto grid max-w-site gap-12 px-6 md:px-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <Eyebrow>Câu chuyện HAQ</Eyebrow>
          <h2 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-haq-ink md:text-5xl">Từ hương vị Việt đến chuẩn mực phân phối hiện đại.</h2>
          <p className="mt-7 max-w-xl text-lg leading-[1.8] text-haq-ink/70">HAQ Hà Nội phát triển những sản phẩm ăn vặt tiện lợi, an toàn và giàu hương vị; được sản xuất theo quy trình kiểm soát nghiêm ngặt để đến gần hơn với người tiêu dùng trong nước và quốc tế.</p>
          <Link to="/gioi-thieu" className="group mt-9 inline-flex items-center gap-3 border-b-2 border-haq-red pb-2 font-heading font-bold text-haq-ink hover:text-haq-red">Khám phá câu chuyện thương hiệu <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
        </div>
        <div className="relative min-h-[360px] overflow-hidden bg-haq-ink md:min-h-[480px]">
          <img src={factoryImg} alt="Hoạt động sản xuất tại HAQ Hà Nội" className="absolute inset-0 h-full w-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-haq-ink via-haq-ink/15 to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-sm p-7 text-white md:p-10"><span className="font-mono text-xs uppercase tracking-[0.18em] text-haq-gold">Chất lượng mỗi ngày</span><p className="mt-3 font-heading text-2xl font-bold leading-tight">Tận tâm trong từng công đoạn sản xuất.</p></div>
        </div>
      </div>
    </section>
  )
}

function TrustBand() {
  const ref = useReveal()
  const facts = [['2021', 'Năm thành lập'], ['ISO', 'Hệ thống quản lý'], ['HACCP', 'An toàn thực phẩm'], ['02', 'Thị trường quốc tế']]
  return <section className="bg-haq-red text-white"><div ref={ref} className="reveal mx-auto grid max-w-site grid-cols-2 divide-x divide-y divide-white/15 px-6 md:grid-cols-4 md:px-12">{facts.map(([value, label]) => <div key={label} className="p-7 md:p-10"><div className="font-heading text-3xl font-extrabold text-haq-gold md:text-4xl">{value}</div><div className="mt-2 text-sm text-white/75">{label}</div></div>)}</div></section>
}

function DistributionPreview() {
  const ref = useReveal()
  return <section id="phan-phoi" className="bg-white py-24 md:py-32"><div ref={ref} className="reveal mx-auto max-w-site px-6 md:px-12"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><Eyebrow>Hệ thống phân phối</Eyebrow><h2 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-haq-ink md:text-5xl">Có mặt tại các hệ thống bán lẻ lớn.</h2></div><p className="max-w-2xl text-lg leading-[1.8] text-haq-ink/70">Năng lực cung ứng linh hoạt giúp HAQ đồng hành cùng đối tác từ hệ thống cửa hàng tiện lợi đến kênh siêu thị hiện đại.</p></div><div className="relative mt-12 overflow-hidden py-3"><div className="distribution-marquee flex w-max items-center gap-12 pr-12 sm:gap-20 sm:pr-20">{[...PARTNERS, ...PARTNERS].map((logo, index) => <img key={index} src={logo} alt={index < PARTNERS.length ? 'Logo đối tác phân phối của HAQ' : ''} aria-hidden={index >= PARTNERS.length} className="h-24 w-40 shrink-0 object-contain mix-blend-multiply sm:w-48" />)}</div><div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" /><div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" /></div><div className="mt-12 grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-3"><div className="flex items-center gap-3"><Store className="h-5 w-5 text-haq-red" /><span className="font-semibold text-haq-ink">Kênh bán lẻ hiện đại</span></div><div className="flex items-center gap-3"><Globe2 className="h-5 w-5 text-haq-red" /><span className="font-semibold text-haq-ink">Hàn Quốc · Đài Loan</span></div><Link to="/gioi-thieu#phan-phoi" className="group inline-flex items-center gap-2 font-heading font-bold text-haq-red sm:justify-self-end">Xem hệ thống phân phối <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link></div></div></section>
}

export default function Home() {
  return (
    <main id="top" className="bg-haq-cream min-h-screen flex flex-col relative">
      <StickyNav />
      <HeritageTimeline />
      
      <div id="hero"><Hero /></div>
      <BrandStory />
      <TrustBand />
      <div id="san-pham"><Products /></div>
      <DistributionPreview />
      <div id="lien-he"><LeadForm /></div>
      <Footer />
    </main>
  )
}
