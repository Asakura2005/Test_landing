import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

// Placeholder images for certificates and hero image
const CERT_LOGOS = [
  'https://placehold.co/80x80/white/DAA520?text=ISO',
  'https://placehold.co/80x80/white/DAA520?text=HACCP',
  'https://placehold.co/80x80/white/DAA520?text=FDA',
]

export default function AboutCompany() {
  const ref = useReveal()

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden font-sans border-t border-haq-border">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #16A34A 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-start max-w-xl">
            
            {/* 3 Pills from HAQ Values */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {['CHẤT LƯỢNG TIÊN PHONG', 'MINH BẠCH NGUỒN GỐC', 'ĐỔI MỚI CÔNG NGHỆ'].map((text, idx) => (
                <div key={idx} className="px-4 py-1.5 rounded-full border border-haq-border bg-haq-sage/30 text-[#0F5132] font-heading font-bold uppercase tracking-wider text-xs">
                  {text}
                </div>
              ))}
            </div>

            {/* Main Headline from HAQ */}
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-haq-ink leading-[1.15] mb-3 uppercase">
              CÔNG TY CỔ PHẦN <br/>
              <span className="text-[#16A34A]">HAQ HÀ NỘI</span>
            </h2>
            <h3 className="font-heading font-bold text-lg md:text-xl text-[#0F5132] mb-4">
              Chất lượng chuẩn mực — Đồng hành cùng ẩm thực Việt
            </h3>
            <p className="text-haq-text-secondary leading-relaxed mb-8 text-justify text-sm sm:text-base font-normal">
              HAQ Hà Nội được thành lập với tầm nhìn trở thành nhà sản xuất thực phẩm snack và bánh truyền thống hàng đầu. Chúng tôi đầu tư hệ thống máy sấy giòn hiện đại, kiểm soát nghiêm ngặt vệ sinh an toàn thực phẩm từ khâu tuyển chọn nguyên liệu nông sản Việt đến khi đóng gói thành phẩm hoàn thiện.
            </p>

            {/* Badges / Value Stats */}
            <div className="grid grid-cols-3 gap-3 w-full mb-8">
              <div className="p-3 bg-haq-sage/20 rounded-2xl border border-haq-border text-center">
                <span className="block font-heading font-extrabold text-lg text-[#16A34A]">ISO 22000</span>
                <span className="text-[11px] text-haq-text-secondary">Chuẩn Quốc Tế</span>
              </div>
              <div className="p-3 bg-haq-sage/20 rounded-2xl border border-haq-border text-center">
                <span className="block font-heading font-extrabold text-lg text-[#16A34A]">HACCP</span>
                <span className="text-[11px] text-haq-text-secondary">Kiểm Soát Rủi Ro</span>
              </div>
              <div className="p-3 bg-haq-sage/20 rounded-2xl border border-haq-border text-center">
                <span className="block font-heading font-extrabold text-lg text-[#16A34A]">OEM/ODM</span>
                <span className="text-[11px] text-haq-text-secondary">Gia Công Trọn Gói</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              to="/gioi-thieu" 
              className="group inline-flex items-center justify-center gap-2 bg-[#16A34A] text-white font-heading font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:bg-haq-green-dark transition-all shadow-md hover:shadow-lg"
            >
              <span>Khám phá năng lực cốt lõi</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Right Column: Image Composition */}
          <div className="relative h-[380px] md:h-[500px] w-full mt-6 lg:mt-0 flex items-center justify-center">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#16A34A]/10 rounded-full blur-3xl z-0"></div>
             
             <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-haq-border">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                  alt="Không gian sản xuất và nông sản HAQ FOOD"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-haq-border shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-heading font-bold text-[#16A34A] uppercase tracking-wider block">TIÊU CHUẨN XANH</span>
                      <span className="text-xs font-heading font-bold text-haq-ink uppercase">Nông sản sạch thuần Việt</span>
                    </div>
                    <span className="text-xs font-sans font-bold text-[#0F5132] bg-[#16A34A]/15 px-2.5 py-1 rounded-full">100% Tự Nhiên</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
