import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { MapPin, ArrowRight } from 'lucide-react'

export default function Headquarters() {
  const ref = useReveal()

  return (
    <section id="nha-may" className="py-20 md:py-28 bg-haq-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#DAA520 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div ref={ref} className="reveal">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Image (Factory) */}
            <div className="relative">
              <div className="absolute -inset-4 bg-haq-gold/20 rounded-[40px] transform -rotate-3 z-0"></div>
              <div className="relative z-10 bg-haq-bone rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3]">
                <div className="absolute inset-0 flex items-center justify-center bg-haq-gold-dark/10">
                  <span className="text-haq-gold-dark font-heading font-bold">Ảnh Nhà Máy HAQ FOOD</span>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="flex flex-col items-start text-left">
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-haq-red leading-tight mb-6">
                TRỤ SỞ CHÍNH <br/>
                NHÀ MÁY HAQ FOOD
              </h2>
              
              <div className="flex items-start gap-4 mb-8 text-haq-ink/80">
                <MapPin className="w-6 h-6 text-haq-red shrink-0 mt-1" />
                <p className="text-lg leading-relaxed font-medium">
                  Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam.
                </p>
              </div>

              <a 
                href="https://maps.google.com" 
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-haq-red text-white font-heading font-bold text-base px-8 py-3 rounded-full hover:bg-haq-gold-dark hover:text-haq-ink transition-colors shadow-lg"
              >
                Xem bản đồ
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
