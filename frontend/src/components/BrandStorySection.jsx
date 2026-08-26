import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Factory, Award } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import factoryImg from '../assets/hero-factory.jpg'

export default function BrandStorySection() {
  const ref = useReveal()

  return (
    <section id="gioi-thieu" className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header Label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
              03 / ABOUT
            </span>
            <span className="h-px w-10 bg-haq-red" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Editorial Narrative (Spans 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-[1.1]">
                MỘT DOANH NGHIỆP THỰC PHẨM VIỆT NAM, <br />
                <span className="text-haq-red">TỪ THỊ TRƯỜNG TRONG NƯỚC</span> <br />
                ĐẾN QUỐC TẾ.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-haq-ink/80 leading-relaxed">
                <p>
                  <strong>CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> (thương hiệu <strong>HAQ FOOD</strong>) được thành lập năm 2021 tại Hà Nội, hoạt động chính trong lĩnh vực sản xuất và phân phối thực phẩm, đồ ăn vặt đóng gói và cung ứng thực phẩm cho thị trường nội địa & xuất khẩu.
                </p>
                <p>
                  Lấy chất lượng làm nền tảng cốt lõi, HAQ FOOD không ngừng đầu tư hoàn thiện quy trình kiểm soát khép kín đạt chuẩn <strong>ISO 22000</strong> và <strong>HACCP</strong>, mang đến sản phẩm an toàn, tiện lợi và đậm đà bản sắc ẩm thực Việt.
                </p>
              </div>

              {/* Verified Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                <div className="p-4 rounded-2xl bg-haq-bone border border-black/5">
                  <div className="flex items-center gap-2 text-haq-red font-mono font-bold text-xs uppercase mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ISO & HACCP</span>
                  </div>
                  <div className="text-xs text-haq-ink/70">
                    Kiểm soát chất lượng nghiêm ngặt từ nguyên liệu đến lưu mẫu.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-haq-bone border border-black/5">
                  <div className="flex items-center gap-2 text-haq-red font-mono font-bold text-xs uppercase mb-1">
                    <Factory className="w-4 h-4" />
                    <span>SẢN XUẤT QUY MÔ</span>
                  </div>
                  <div className="text-xs text-haq-ink/70">
                    Đảm bảo công suất lớn và nhận gia công OEM / ODM chuyên nghiệp.
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to="/gioi-thieu"
                  className="group inline-flex items-center gap-3 bg-haq-ink hover:bg-haq-red text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm"
                >
                  <span>KHÁM PHÁ HAQ FOOD</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Factory Facility Image (Spans 6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-haq-ink border border-black/5">
                <img
                  src={factoryImg}
                  alt="Nhà máy sản xuất HAQ FOOD đạt chuẩn ISO HACCP"
                  className="w-full h-full object-cover aspect-4/3 transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-black/5 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-heading font-black text-haq-ink uppercase">
                        HỆ THỐNG DÂY CHUYỀN KHÉP KÍN
                      </div>
                      <div className="text-[11px] font-mono text-haq-ink/60">
                        Kiểm soát từ nguồn nguyên liệu đến thành phẩm
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-haq-red/10 text-haq-red rounded-full font-mono text-[10px] font-bold">
                      ISO · HACCP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
