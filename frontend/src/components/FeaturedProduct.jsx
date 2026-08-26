import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Award, Sparkles, ShieldCheck } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import heroBanner1 from '../assets/herobanner/Gemini_Generated_Image_vplcvavplcvavplc.png'

export default function FeaturedProduct() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-32 bg-haq-bone relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Section Sub-heading & Label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
              02 / SẢN PHẨM TIÊU BIỂU (SIGNATURE PRODUCT)
            </span>
            <span className="h-px w-10 bg-haq-red" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-4">
            {/* Visual Column (Spans 7 cols) */}
            <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden shadow-xl bg-white border border-black/5 flex items-center justify-center p-4 sm:p-8">
              <img
                src={heroBanner1}
                alt="Bánh tráng trộn HAQ Signature"
                className="w-full h-auto max-h-[460px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 bg-haq-ink/90 backdrop-blur-xs text-haq-gold font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
                EST. 2021 SIGNATURE RECIPE
              </div>
            </div>

            {/* Content Column (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-8 sm:p-10 border border-black/5 shadow-2xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-haq-red uppercase mb-3">
                  <Award className="w-4 h-4" />
                  <span>SẢN PHẨM TIÊN PHONG</span>
                </div>

                <h2 className="font-heading font-black text-3xl sm:text-4xl text-haq-ink uppercase tracking-tight leading-tight">
                  BÁNH TRÁNG <br />
                  <span className="text-haq-red">TRỘN HAQ</span>
                </h2>

                <p className="mt-4 text-xs font-mono text-haq-ink/60 uppercase tracking-wider">
                  Khởi nguồn và làm nên thương hiệu từ năm 2021
                </p>

                <p className="mt-4 text-sm sm:text-base text-haq-ink/75 leading-relaxed">
                  Dòng sản phẩm tiên phong khởi đầu cho hành trình phát triển của HAQ FOOD. Được sản xuất trên dây chuyền sấy giòn khép kín đạt chuẩn ISO 22000 & HACCP, kết hợp topping bò khô, tôm khô và sốt gia vị đặc trưng mang đậm phong vị ẩm thực đường phố Việt.
                </p>

                {/* Key Product Attributes */}
                <div className="mt-6 space-y-2.5 pt-4 border-t border-black/5">
                  {[
                    'Dây chuyền sấy hiện đại khép kín an toàn vệ sinh thực phẩm.',
                    'Hương vị đậm đà nguyên bản – đa dạng phân loại sốt gia vị.',
                    'Đóng gói tiêu chuẩn bảo quản giòn lâu, tiện lợi mang đi.',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-haq-ink/80">
                      <CheckCircle2 className="w-4 h-4 text-haq-red shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-black/5 flex flex-wrap items-center gap-4">
                <Link
                  to="/san-pham"
                  className="group inline-flex items-center gap-2 bg-haq-red hover:bg-haq-ink text-white text-xs font-heading font-extrabold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-200 shadow-sm"
                >
                  <span>XEM CHI TIẾT SẢN PHẨM</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/lien-he"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-haq-ink/70 hover:text-haq-red transition-colors"
                >
                  <span>ĐẶT HÀNG SỈ / OEM →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
