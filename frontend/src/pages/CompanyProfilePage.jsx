import React from 'react'
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Box, Users, ChevronRight } from 'lucide-react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'
import { useReveal } from '../hooks/useReveal'

// Reusable Reveal Wrapper for scroll animations
function RevealBlock({ children, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export default function CompanyProfilePage() {
  const handleContactClick = () => {
    window.location.href = '/#contact'
  }

  return (
    <main id="top" className="bg-haq-bone min-h-screen font-inter selection:bg-haq-orange selection:text-white">
      <StickyNav />

      {/* 1. HERO SECTION (Bìa Catalogue) */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-haq-ink text-white overflow-hidden">
        {/* Background Texture/Pattern (Subtle) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
          <RevealBlock className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-16 bg-haq-orange" />
              <span className="font-mono text-sm tracking-[0.3em] uppercase text-haq-orange font-bold">
                Company Profile 2024
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05] text-white">
              CÔNG TY CỔ PHẦN <br className="hidden md:block" />
              <span className="text-haq-red">HAQ HÀ NỘI</span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white/70 leading-[1.6] max-w-3xl font-medium">
              Nhà sản xuất và phân phối thực phẩm ăn vặt chuyên nghiệp. Đối tác chiến lược của các hệ thống bán lẻ hàng đầu Việt Nam.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* 2. LỜI GIỚI THIỆU (Editorial Layout) */}
      <section className="py-24 md:py-32 bg-haq-bone">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-24">
            <RevealBlock className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink leading-[1.1] tracking-tight mb-6">
                  Từ truyền thống <br /> đến chuẩn mực <br /> <span className="text-haq-orange">quốc tế.</span>
                </h2>
                <div className="w-16 h-2 bg-haq-red mb-8" />
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-haq-ink/50 mt-8 md:mt-0">
                Thành lập 2024 (Tiền thân 2012)
              </div>
            </RevealBlock>
            
            <RevealBlock className="md:col-span-7">
              <div className="prose prose-lg prose-p:text-haq-ink/80 prose-p:leading-[1.8] prose-p:mb-6 max-w-none">
                <p className="text-xl font-medium text-haq-ink">
                  Với tiền thân là cơ sở sản xuất bánh kẹo truyền thống được thành lập từ năm 2012, đến năm 2024, Công ty Cổ phần HAQ Hà Nội chính thức ra đời mang theo khát vọng nâng tầm ẩm thực ăn vặt Việt Nam trên bản đồ phân phối hiện đại.
                </p>
                <p>
                  Chúng tôi nhận thức sâu sắc rằng, trong bối cảnh thị trường bán lẻ ngày càng khắt khe, chất lượng sản phẩm không chỉ là lời hứa mà phải được chứng minh bằng các tiêu chuẩn đo lường minh bạch. Tại HAQ Food, chúng tôi theo đuổi triết lý kinh doanh <strong>"An Toàn - Chất Lượng - Bền Vững"</strong>.
                </p>
                <p>
                  Sự kết hợp giữa công thức hương vị truyền thống đậm đà và hệ thống kiểm soát chất lượng đạt chuẩn quốc tế chính là chìa khóa giúp HAQ Food tự tin đồng hành cùng các chuỗi siêu thị, cửa hàng tiện lợi và đối tác phân phối B2B trên toàn quốc.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* 3. TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI */}
      <section className="py-24 md:py-32 bg-white border-y border-black/10">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <RevealBlock className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink tracking-tight mb-6">Định Hướng Phát Triển</h2>
            <p className="text-lg text-haq-ink/70">Kim chỉ nam cho mọi hoạt động nghiên cứu, sản xuất và phân phối tại HAQ Food.</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <RevealBlock className="bg-haq-bone p-10 md:p-14 border border-black/5 hover:border-haq-orange/30 transition-colors">
              <div className="w-14 h-14 bg-haq-orange text-white flex items-center justify-center rounded-xl shadow-lg mb-8">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-3xl text-haq-ink mb-4">Tầm Nhìn</h3>
              <p className="text-haq-ink/70 leading-[1.8] text-lg">
                Trở thành nhà sản xuất và đối tác phân phối tin cậy hàng đầu trong lĩnh vực thực phẩm ăn vặt đóng gói tại Việt Nam. Xây dựng thương hiệu bảo chứng cho chất lượng, an toàn vệ sinh và năng lực cung ứng vững vàng cho kênh bán lẻ hiện đại (MT).
              </p>
            </RevealBlock>

            {/* Mission */}
            <RevealBlock className="bg-haq-ink p-10 md:p-14 border border-black/5">
              <div className="w-14 h-14 bg-haq-red text-white flex items-center justify-center rounded-xl shadow-lg mb-8">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-3xl text-white mb-4">Sứ Mệnh</h3>
              <ul className="space-y-4 text-white/70 leading-[1.8] text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-haq-red shrink-0 mt-1" />
                  <span><strong>Đối với đối tác:</strong> Cung cấp giải pháp trọn gói, linh hoạt và ổn định (từ OEM/ODM đến hàng nhãn riêng).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-haq-red shrink-0 mt-1" />
                  <span><strong>Đối với người tiêu dùng:</strong> Mang lại trải nghiệm ẩm thực trọn vị, an toàn tuyệt đối cho sức khỏe.</span>
                </li>
              </ul>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* 4. NĂNG LỰC SẢN XUẤT & CHỨNG NHẬN (The Core) */}
      <section className="py-24 md:py-32 bg-haq-bone">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealBlock>
              <div className="font-mono text-xs tracking-[0.25em] uppercase text-haq-red font-bold mb-6">Năng lực cốt lõi</div>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink tracking-tight leading-[1.1] mb-8">
                Hệ thống sản xuất <br /> đạt chuẩn Quốc Tế.
              </h2>
              <p className="text-lg text-haq-ink/75 leading-[1.8] mb-10">
                Nhà máy sản xuất của HAQ Food được đầu tư bài bản, đáp ứng các tiêu chuẩn khắt khe nhất trong ngành công nghiệp thực phẩm. Chúng tôi minh bạch trong quy trình và tự hào sở hữu các chứng nhận uy tín.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-haq-ink">ISO</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-haq-ink">ISO 22000:2018</h4>
                    <p className="text-haq-ink/60 mt-2 leading-[1.6]">Hệ thống quản lý an toàn thực phẩm toàn diện. Kiểm soát chặt chẽ các mối nguy từ khâu nguyên liệu đầu vào đến khi thành phẩm đến tay khách hàng.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white border border-black/10 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-haq-ink text-sm">HACCP</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-haq-ink">Tiêu chuẩn HACCP</h4>
                    <p className="text-haq-ink/60 mt-2 leading-[1.6]">Phân tích mối nguy và điểm kiểm soát tới hạn. Đảm bảo mọi sản phẩm xuất xưởng đều đạt chuẩn vệ sinh an toàn thực phẩm mức cao nhất.</p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock className="relative">
              <div className="aspect-[4/5] bg-haq-ink p-8 flex flex-col justify-center">
                <Factory className="w-16 h-16 text-haq-orange mb-8" />
                <h3 className="font-heading font-bold text-4xl text-white mb-6">Giải pháp Gia công <br className="hidden sm:block" />OEM & ODM</h3>
                <p className="text-white/70 text-lg leading-[1.8] mb-8">
                  Với kinh nghiệm R&D và quy trình đóng gói linh hoạt, HAQ Food là đối tác gia công lý tưởng cho các doanh nghiệp muốn phát triển nhãn hàng riêng (Private Label).
                </p>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-haq-orange shrink-0" />
                    Tùy biến công thức hương vị theo yêu cầu
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-haq-orange shrink-0" />
                    Đa dạng quy cách đóng gói (Túi zip, hũ nhựa PET, hộp giấy)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-haq-orange shrink-0" />
                    Bảo mật thông tin khách hàng tuyệt đối
                  </li>
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* 5. MẠNG LƯỚI ĐỐI TÁC */}
      <section className="py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <RevealBlock className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-haq-ink tracking-tight mb-6">Mạng Lưới Đối Tác</h2>
            <p className="text-lg text-haq-ink/70">
              Sản phẩm của HAQ Food hiện đã có mặt tại các hệ thống siêu thị và cửa hàng tiện lợi lớn nhất Việt Nam, chứng minh sức hút của sản phẩm và năng lực cung ứng vững vàng của công ty.
            </p>
          </RevealBlock>

          <RevealBlock>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {['WinCommerce', 'Circle K', 'GS25', 'Kmart', 'Go!', 'Bách Hóa Xanh'].map((partner, index) => (
                <div key={index} className="group relative border border-black/10 p-8 md:p-10 flex flex-col items-start justify-between hover:bg-haq-ink hover:border-haq-ink transition-colors duration-500 min-h-[160px]">
                  <div className="w-2 h-2 rounded-full bg-haq-red mb-6 group-hover:bg-haq-orange transition-colors" />
                  <span className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-haq-ink/80 group-hover:text-white transition-colors">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* 6. CTA Cuối Trang */}
      <section className="py-24 md:py-32 bg-haq-red text-white text-center border-t-8 border-haq-orange">
        <div className="mx-auto max-w-3xl px-6">
          <RevealBlock>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight mb-8">
              Bắt đầu hợp tác cùng HAQ Food
            </h2>
            <p className="text-xl text-white/90 leading-[1.6] mb-12">
              Chúng tôi luôn sẵn sàng lắng nghe nhu cầu của bạn, cung cấp báo giá sỉ tốt nhất và thảo luận về các giải pháp OEM/ODM chuyên biệt.
            </p>
            <button 
              onClick={handleContactClick}
              className="inline-flex items-center gap-3 bg-white text-haq-ink px-10 py-5 text-lg font-bold hover:bg-haq-bone transition-colors shadow-2xl hover:shadow-none hover:translate-y-1 transform duration-300"
            >
              Yêu Cầu Báo Giá B2B <ArrowRight className="w-6 h-6 text-haq-orange" />
            </button>
          </RevealBlock>
        </div>
      </section>

      <Footer />
    </main>
  )
}
