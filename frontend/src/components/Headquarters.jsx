import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { MapPin, ArrowRight } from 'lucide-react'

export default function Headquarters() {
  const ref = useReveal()

  return (
    <section id="nha-may" className="py-20 md:py-28 bg-white relative overflow-hidden font-sans border-t border-haq-border">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#16A34A 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="mx-auto max-w-site px-6 md:px-12 relative z-10">
        <div ref={ref} className="reveal">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Image (Factory) */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#16A34A]/10 rounded-[40px] transform -rotate-3 z-0"></div>
              <div className="relative z-10 bg-white border border-haq-border rounded-[32px] overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
                  alt="Nhà máy HAQ FOOD"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Text */}
            <div className="flex flex-col items-start text-left">
              <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider mb-2">
                HỆ THỐNG CƠ SỞ VẬT CHẤT
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-haq-ink leading-tight mb-6">
                TRỤ SỞ CHÍNH & <br/>
                <span className="text-[#16A34A]">NHÀ MÁY HAQ FOOD</span>
              </h2>
              
              <div className="flex items-start gap-4 mb-8 text-haq-text-secondary">
                <MapPin className="w-6 h-6 text-[#16A34A] shrink-0 mt-1" />
                <p className="text-base md:text-lg leading-relaxed font-normal">
                  Số 30, Ngõ 1 Phạm Tuấn Tài, Phường Nghĩa Đô, Thành Phố Hà Nội, Việt Nam.
                </p>
              </div>

              <a 
                href="https://maps.app.goo.gl/yAYkH7bYurLEtenP7" 
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-[#16A34A] text-white font-heading font-bold text-base px-8 py-3.5 rounded-full hover:bg-haq-green-dark transition-colors shadow-md hover:shadow-lg"
              >
                <span>Xem trên Google Maps</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
