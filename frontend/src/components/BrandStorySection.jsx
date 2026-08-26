import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Factory, Award } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import factoryImg from '../assets/hero-factory.jpg'

export default function BrandStorySection() {
  const ref = useReveal()

  return (
    <section id="gioi-thieu" className="py-20 md:py-32 bg-white relative border-t border-haq-border">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header Label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-heading text-xs font-bold tracking-wider text-[#16A34A] uppercase">
              03 / VỀ CHÚNG TÔI · ABOUT US
            </span>
            <span className="h-px w-10 bg-[#16A34A]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Editorial Narrative (Spans 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-[1.1]">
                DOANH NGHIỆP THỰC PHẨM VIỆT NAM, <br />
                <span className="text-[#16A34A]">TỪ THỊ TRƯỜNG TRONG NƯỚC</span> <br />
                ĐẾN QUỐC TẾ.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-haq-text-secondary leading-relaxed font-normal">
                <p>
                  <strong className="font-semibold text-haq-ink">CÔNG TY CỔ PHẦN HAQ HÀ NỘI</strong> (thương hiệu <strong className="font-semibold text-haq-ink">HAQ FOOD</strong>) được thành lập năm 2021 tại Thủ đô Hà Nội, hoạt động chính trong lĩnh vực sản xuất và phân phối thực phẩm chế biến, đồ ăn vặt đóng gói và cung ứng cho thị trường nội địa & xuất khẩu.
                </p>
                <p>
                  Lấy chất lượng làm nền tảng cốt lõi, HAQ FOOD không ngừng đầu tư hoàn thiện quy trình kiểm soát khép kín đạt chuẩn <strong className="font-semibold text-haq-ink">ISO 22000</strong> và <strong className="font-semibold text-haq-ink">HACCP</strong>, mang đến sản phẩm an toàn, tiện lợi và đậm đà bản sắc nông sản Việt.
                </p>
              </div>

              {/* Verified Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-haq-border">
                <div className="p-4 rounded-2xl bg-haq-sage border border-haq-border">
                  <div className="flex items-center gap-2 text-[#16A34A] font-heading font-bold text-xs uppercase mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                    <span>ISO & HACCP</span>
                  </div>
                  <div className="text-xs text-haq-text-secondary font-normal">
                    Kiểm soát chất lượng nghiêm ngặt từ nguyên liệu đến lưu mẫu.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-haq-sage border border-haq-border">
                  <div className="flex items-center gap-2 text-[#16A34A] font-heading font-bold text-xs uppercase mb-1">
                    <Factory className="w-4 h-4 text-[#16A34A]" />
                    <span>SẢN XUẤT QUY MÔ</span>
                  </div>
                  <div className="text-xs text-haq-text-secondary font-normal">
                    Đảm bảo công suất lớn và nhận gia công OEM / ODM chuyên nghiệp.
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to="/gioi-thieu"
                  className="group inline-flex items-center gap-3 bg-[#16A34A] hover:bg-[#13863d] text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span>KHÁM PHÁ HAQ FOOD</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: Factory Facility Image (Spans 6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl bg-haq-pine border border-haq-border">
                <img
                  src={factoryImg}
                  alt="Nhà máy sản xuất HAQ FOOD đạt chuẩn ISO HACCP"
                  className="w-full h-full object-cover aspect-4/3 transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-haq-border shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-heading font-bold text-haq-ink uppercase">
                        HỆ THỐNG DÂY CHUYỀN KHÉP KÍN
                      </div>
                      <div className="text-[11px] font-heading font-normal text-haq-text-secondary">
                        Kiểm soát từ nguồn nguyên liệu đến thành phẩm
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-haq-sage text-haq-green-dark border border-haq-border rounded-full font-heading text-[10px] font-bold">
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
