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
    <section className="relative py-20 md:py-32 bg-haq-cream overflow-hidden">
      {/* Background texture (optional, trying to match the subtle paper texture) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #DAA520 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-start max-w-xl">
            
            {/* 3 Pills from HAQ Values */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['CHẤT LƯỢNG', 'MINH BẠCH', 'ĐỔI MỚI'].map((text, idx) => (
                <div key={idx} className="px-6 py-2 rounded-full border border-haq-red text-haq-red font-heading font-bold uppercase tracking-wider text-sm md:text-base">
                  {text}
                </div>
              ))}
            </div>

            {/* Main Headline from HAQ */}
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-5xl text-haq-red leading-[1.1] mb-4 uppercase">
              Công Ty Cổ Phần HAQ Hà Nội
            </h2>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-haq-ink/80 mb-6">
              Chất lượng là cốt lõi của thương hiệu
            </h3>
            <p className="text-haq-ink/70 leading-relaxed mb-10 text-justify">
              HAQ Hà Nội được thành lập trong bối cảnh thị trường thực phẩm ngày càng yêu cầu cao về an toàn, tính minh bạch và sự đa dạng khẩu vị. Chúng tôi hướng tới các sản phẩm đồ ăn vặt mang hương vị Việt Nam, phù hợp nhu cầu của người tiêu dùng hiện đại.
            </p>

            {/* Certifications */}
            <div className="flex items-center gap-4 mb-12">
              {CERT_LOGOS.map((src, i) => (
                <img key={i} src={src} alt="Chứng nhận" className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-full border border-haq-border shadow-sm bg-white" />
              ))}
              <div className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-full border border-haq-red bg-white flex items-center justify-center p-2 text-center text-haq-red font-bold text-xs shadow-sm">
                OEM<br/>ODM
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              to="/gioi-thieu" 
              className="group inline-flex items-center justify-center gap-2 bg-haq-red text-white font-heading font-bold text-lg px-8 py-4 rounded-full hover:bg-haq-gold-dark hover:text-haq-ink transition-colors shadow-lg"
            >
              Khám phá năng lực cốt lõi
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

          {/* Right Column: Image Composition */}
          <div className="relative h-[400px] md:h-[600px] w-full mt-10 lg:mt-0 flex items-center justify-center">
             {/* Abstract Red/Gold Clouds Background (Placeholder logic) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-haq-red/5 rounded-full blur-3xl z-0"></div>
             
             {/* The actual composite image would go here. Using a placeholder container for now. */}
             <div className="relative z-10 w-full h-full flex items-end justify-center">
                {/* 
                  To truly clone the BBM look, you'd insert a transparent PNG here 
                  that contains the Chef, the clouds, and the products.
                */}
                <div className="w-[90%] h-[90%] bg-haq-gold-dark/20 border-2 border-dashed border-haq-gold-dark/50 rounded-2xl flex flex-col items-center justify-center text-haq-ink/50 text-center p-6">
                  <span className="font-heading font-bold text-xl mb-2 text-haq-brown">Khu vực ghép ảnh tĩnh</span>
                  <p className="text-sm">Thay thế khối này bằng file PNG chứa hình Nghệ nhân, Sản phẩm và Đám mây đỏ/vàng theo phong cách HAQ.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
