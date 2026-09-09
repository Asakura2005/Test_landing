import React, { useState, useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useLanguage } from '../context/LanguageContext'

import factoryImg from '../assets/factory/factory_production.jpg'
import heroBanner1 from '../assets/herobanner/hero_banner_1.jpg'
import factoryHqImg from '../assets/about/factory_hq.jpg'
import riceFieldImg from '../assets/about/rice_field.jpg'
import labInspectionImg from '../assets/about/lab_inspection.jpg'
import VisionSection from '../components/VisionSection'
import Partners from '../components/Partners'

/* ─── Reveal ────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.unobserve(el) } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── Section divider ───────────────────────────────────── */
function SectionLabel({ vi }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-8 bg-[#16A34A]" />
      <span className="font-heading text-xs font-bold tracking-[0.15em] text-haq-text-secondary uppercase">{vi}</span>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════
   COMPANY PROFILE PAGE
   ═════════════════════════════════════════════════════════════ */
export default function CompanyProfilePage() {
  const { t, language } = useLanguage()

  return (
    <div className="min-h-screen bg-white text-haq-ink font-sans flex flex-col">
      <StickyNav />
      <FloatingContactBar />

      <main className="flex-1 pt-[72px] sm:pt-[76px]">

        {/* ════════════════════════════════════════════════════════
            HERO BANNER
            ════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#0C1E15] overflow-hidden">
          {/* Background */}
          <img src={heroBanner1} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E15] via-[#0C1E15]/50 to-[#0C1E15]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1E15]/60 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto max-w-site px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28">
            <p className="font-heading text-[11px] font-bold tracking-[0.3em] text-[#16A34A] uppercase mb-5">
              Giới thiệu doanh nghiệp
            </p>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] text-white leading-[1.12] tracking-tight uppercase max-w-3xl">
              Công ty Cổ phần<br />
              <span className="text-[#16A34A]">HAQ Hà Nội</span>
            </h1>
            <div className="h-[2px] w-16 bg-[#16A34A] mt-6 mb-6" />
            <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-medium italic">
              "Chất lượng là cốt lõi của thương hiệu"
            </p>
            <p className="mt-2 text-sm text-white/35 max-w-lg">
              Sản xuất & phân phối thực phẩm chế biến đóng gói chuẩn vị Việt — Phục vụ thị trường nội địa & xuất khẩu quốc tế.
            </p>
          </div>

          {/* Stats bar */}
          <div className="relative z-10 border-t border-white/10 bg-[#0C1E15]/50 backdrop-blur-sm">
            <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-0">
                {[
                  { value: '2021', label: 'Năm thành lập' },
                  { value: '7+', label: 'Chuỗi bán lẻ quốc gia' },
                  { value: '02', label: 'Thị trường xuất khẩu' },
                  { value: 'ISO · HACCP', label: 'Tiêu chuẩn xưởng & QC' },
                ].map((s, i) => (
                  <div key={i} className={`text-center ${i > 0 ? 'sm:border-l sm:border-white/10' : ''}`}>
                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">{s.value}</div>
                    <div className="font-heading text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.15em] text-white/35 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            01 · LỜI NGỎ
            ════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-[#FAFAF8] border-b border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl border border-haq-border p-6 sm:p-10 lg:p-14 relative overflow-hidden">
                  {/* Green accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16A34A] rounded-l-2xl" />

                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-haq-ink uppercase tracking-tight mb-6">
                    Kính gửi Quý Đối Tác & Khách Hàng!
                  </h2>

                  <div className="space-y-4 text-sm sm:text-[15px] text-haq-ink leading-[1.85]">
                    <p>
                      Trong bối cảnh thị trường thực phẩm ngày càng đòi hỏi sự an toàn – minh bạch – chất lượng, <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> được thành lập với mong muốn mang đến những sản phẩm đồ ăn vặt chuẩn vị Việt, đáp ứng tiêu chuẩn vệ sinh an toàn thực phẩm và phù hợp khẩu vị đa dạng của người tiêu dùng hiện đại.
                    </p>
                    <p>
                      Với quan điểm xuyên suốt <em>"Chất lượng là cốt lõi của thương hiệu"</em>, HAQ Hà Nội không ngừng cải tiến quy trình, nâng cao năng lực sản xuất và đa dạng hoá sản phẩm.
                    </p>
                    <p className="text-[#0F5132] font-medium">
                      Chúng tôi tự hào là đối tác tin cậy của nhiều hệ thống bán lẻ lớn trên toàn quốc và từng bước khẳng định vị thế tại thị trường quốc tế.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-haq-border flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-haq-text-secondary">Trân trọng,</p>
                      <p className="font-heading font-bold text-sm text-haq-ink uppercase tracking-wide mt-1">
                        Ban Lãnh Đạo — Công ty Cổ phần HAQ Hà Nội
                      </p>
                    </div>
                    <span className="text-xs text-haq-text-secondary">Hà Nội, Việt Nam</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            02 · TỔNG QUAN DOANH NGHIỆP
            ════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <SectionLabel number="01" vi="Tổng quan" en="Company Overview" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
              {/* Left: Text + facts */}
              <div className="lg:col-span-3">
                <Reveal>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink tracking-tight leading-tight mb-5">
                    Công ty Cổ phần HAQ Hà Nội
                  </h2>
                  <p className="text-sm sm:text-[15px] text-haq-text-secondary leading-[1.85] mb-8">
                    Thành lập từ năm 2021 tại Thủ đô Hà Nội, Công ty Cổ phần HAQ Hà Nội là đơn vị sản xuất và phân phối thực phẩm chế biến đóng gói. Doanh nghiệp làm chủ công nghệ sấy sạch đối lưu, tập trung vào các dòng bánh tráng sấy giòn, bánh nướng truyền thống và nông sản sấy, phục vụ hệ thống siêu thị, đại lý trên toàn quốc và thị trường xuất khẩu.
                  </p>
                </Reveal>

                {/* Corporate facts table */}
                <Reveal delay={100}>
                  <table className="w-full text-sm border-t border-haq-border">
                    <tbody>
                      {[
                        ['Tên pháp nhân', 'CÔNG TY CỔ PHẦN HAQ HÀ NỘI'],
                        ['Năm thành lập', '2021'],
                        ['Trụ sở chính', 'Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Cầu Giấy, Hà Nội'],
                        ['Hotline', '024 23 23 56 56'],
                        ['Email', 'info@haq.com.vn'],
                        ['Lĩnh vực', 'Sản xuất – phân phối thực phẩm đóng gói; đồ ăn vặt; OEM/ODM'],
                        ['Thị trường', 'Việt Nam · Hàn Quốc · Đài Loan (Mục tiêu: Nhật Bản & Châu Á)'],
                        ['Chứng nhận', 'ISO 22000 · HACCP'],
                      ].map(([k, v], i) => (
                        <tr key={i} className="border-b border-haq-border/50">
                          <td className="py-3 pr-4 font-heading font-bold text-[11px] text-haq-text-secondary uppercase tracking-wider align-top w-28 sm:w-36">{k}</td>
                          <td className="py-3 text-haq-ink leading-relaxed">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Reveal>
              </div>

              {/* Right: Photos */}
              <div className="lg:col-span-2 space-y-4">
                <Reveal delay={150}>
                  <div className="rounded-xl overflow-hidden">
                    <img src={factoryHqImg} alt="Cơ sở sản xuất HAQ FOOD" className="w-full aspect-[4/3] object-cover" />
                  </div>
                </Reveal>
                <div className="grid grid-cols-2 gap-4">
                  <Reveal delay={250}>
                    <div className="rounded-xl overflow-hidden">
                      <img src={riceFieldImg} alt="Vùng nguyên liệu" className="w-full aspect-square object-cover" />
                    </div>
                  </Reveal>
                  <Reveal delay={300}>
                    <div className="rounded-xl overflow-hidden">
                      <img src={labInspectionImg} alt="Kiểm soát chất lượng" className="w-full aspect-square object-cover" />
                    </div>
                  </Reveal>
                </div>
                <Reveal delay={350}>
                  <p className="text-[11px] text-haq-text-secondary leading-relaxed">
                    Cơ sở sản xuất HAQ FOOD tại Hà Nội — Quy trình kiểm soát khép kín từ tuyển chọn nguyên liệu, chế biến sấy sạch đối lưu đến đóng gói bao bì màng nhôm.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* 3 năng lực cốt lõi */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-haq-border rounded-xl overflow-hidden border border-haq-border">
              {[
                { num: '01', title: 'Sấy Sạch Đối Lưu Khép Kín', desc: 'Ứng dụng công nghệ sấy tuần hoàn nhiệt kín, kiểm soát chính xác nhiệt độ và độ ẩm, giữ trọn độ giòn xốp tự nhiên mà không tồn dư dầu chiên.' },
                { num: '02', title: 'Liên Kết Nông Sản Bản Địa', desc: 'Ưu tiên kết nối và thu mua nguồn nông sản Việt Nam sạch, rõ ràng nguồn gốc xuất xứ, kiểm nghiệm định kỳ các chỉ tiêu vi sinh và an toàn thực phẩm.' },
                { num: '03', title: 'Gia Công OEM / ODM Linh Hoạt', desc: 'Hỗ trợ đối tác chuỗi bán lẻ và xuất khẩu từ khâu R&D phát triển hương vị, gửi mẫu thử, thiết kế quy cách đóng gói đến hoàn tất hồ sơ tự công bố.' },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-white p-6 sm:p-8 h-full">
                    <span className="font-heading text-2xl font-extrabold text-haq-border">{c.num}</span>
                    <h4 className="font-heading font-bold text-sm text-haq-ink mt-3 mb-2 uppercase tracking-wide">{c.title}</h4>
                    <p className="text-sm text-haq-text-secondary leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════
            03 · TẦM NHÌN · SỨ MỆNH · GIÁ TRỊ CỐT LÕI
            ════════════════════════════════════════════════════════ */}
        <VisionSection />


        {/* ════════════════════════════════════════════════════════
            LỢI THẾ CẠNH TRANH & ĐỊNH HƯỚNG CHIẾN LƯỢC
            ════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-[#FAFAF8] border-t border-haq-border">
          <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
            <SectionLabel number="05" vi="Năng lực & Cam kết" en="Competitive Advantages" />

            <Reveal>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-haq-ink uppercase tracking-tight mb-10">
                Lợi thế cạnh tranh & Cam kết chiến lược
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-haq-border border border-haq-border rounded-xl overflow-hidden">

              {/* Cột 1: Lợi thế */}
              <div className="bg-white p-6 sm:p-10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-haq-border">
                  <div>
                    <span className="font-heading text-[10px] font-bold text-[#16A34A] uppercase tracking-[0.2em] block">Năng lực vượt trội</span>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-haq-ink uppercase tracking-tight mt-0.5">Lợi thế cạnh tranh</h3>
                  </div>
                  <span className="font-heading font-black text-3xl text-haq-border">01</span>
                </div>
                <ul className="space-y-4">
                  {[
                    { t: 'Chất Lượng Ổn Định – Giá Cạnh Tranh', d: 'Quy trình sấy đối lưu kiểm soát nhiệt độ nghiêm ngặt, đảm bảo độ đồng đều cao và giá thành tối ưu.' },
                    { t: 'Sản Phẩm Đa Dạng – Gia Công OEM/ODM', d: 'Nghiên cứu khẩu vị riêng, tùy biến bao bì và hoàn thiện hồ sơ tự công bố cho từng đối tác bán lẻ.' },
                    { t: 'Đội Ngũ Am Hiểu Thị Trường', d: 'Đội ngũ chuyên môn giàu kinh nghiệm ngành hàng tiêu dùng nhanh (FMCG) và thương mại thực phẩm.' },
                    { t: 'Hệ Thống Phân Phối Rộng Khắp', d: 'Hiện diện tại WinMart, Big C, GO!, Circle K, GS25, Kmart, Bách Hóa Xanh trên toàn quốc.' },
                    { t: 'Kinh Nghiệm Xuất Khẩu Quốc Tế', d: 'Đã xuất khẩu chính ngạch sang Hàn Quốc, Đài Loan và đang chuẩn bị tiêu chuẩn thâm nhập Nhật Bản.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 py-2 border-b border-haq-border/40 last:border-b-0">
                      <span className="font-heading font-bold text-xs text-[#16A34A] shrink-0 mt-0.5 w-5">0{i + 1}.</span>
                      <div>
                        <h4 className="font-heading font-bold text-[13px] text-haq-ink uppercase tracking-wide">{item.t}</h4>
                        <p className="text-[11px] text-haq-text-secondary leading-relaxed mt-0.5">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cột 2: Cam kết */}
              <div className="bg-[#FAF9F5] p-6 sm:p-10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-haq-border">
                  <div>
                    <span className="font-heading text-[10px] font-bold text-[#C89B3C] uppercase tracking-[0.2em] block">Tầm nhìn dài hạn</span>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-haq-ink uppercase tracking-tight mt-0.5">Cam kết & Định hướng</h3>
                  </div>
                  <span className="font-heading font-black text-3xl text-haq-border">02</span>
                </div>
                <ul className="space-y-4">
                  {[
                    { t: 'Sản Phẩm An Toàn – Minh Bạch – Đạt Chuẩn', d: 'Truy xuất 100% nguồn gốc nông sản, lưu mẫu đối chứng và tuân thủ tuyệt đối tiêu chuẩn ISO/HACCP.' },
                    { t: 'Đổi Mới & Phát Triển Sản Phẩm Mới', d: 'Nghiên cứu các dòng snack dinh dưỡng mới, ít dầu chiên, phù hợp lối sống năng động hiện đại.' },
                    { t: 'Tối Ưu Vận Hành & Logistics', d: 'Chuẩn hóa quy trình xuất kho minh bạch, duy trì độ tươi mới và hạn dùng tối ưu cho đối tác.' },
                    { t: 'Hướng Tới Chuẩn Thị Trường Nhật Bản', d: 'Nâng cấp phòng sạch và kiểm nghiệm vi sinh nhằm đáp ứng các yêu cầu kiểm dịch khắt khe của Nhật Bản.' },
                    { t: 'Đầu Tư Thương Hiệu Bền Vững', d: 'Đồng hành cùng nông dân bản địa, tham gia các hội chợ giao thương quốc tế lan tỏa ẩm thực Việt.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 py-2 border-b border-haq-border/40 last:border-b-0">
                      <span className="font-heading font-bold text-xs text-[#C89B3C] shrink-0 mt-0.5 w-5">0{i + 1}.</span>
                      <div>
                        <h4 className="font-heading font-bold text-[13px] text-haq-ink uppercase tracking-wide">{item.t}</h4>
                        <p className="text-[11px] text-haq-text-secondary leading-relaxed mt-0.5">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  )
}
