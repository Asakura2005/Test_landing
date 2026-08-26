import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  PackageCheck,
  Factory,
  Truck,
  Handshake,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const REASONS = [
  {
    icon: ShieldCheck,
    title: 'Chất Lượng Ổn Định',
    desc: 'Quy trình kiểm soát chuẩn ISO & HACCP, đồng đều trong từng lô hàng sản xuất.',
  },
  {
    icon: PackageCheck,
    title: 'Sản Phẩm Đa Dạng',
    desc: 'Danh mục phong phú từ bánh tráng sấy giòn, bánh tráng trộn đến đồ ăn vặt đóng gói.',
  },
  {
    icon: Factory,
    title: 'Năng Lực Sản Xuất Lớn',
    desc: 'Dây chuyền hiện đại, đáp ứng liên tục các đơn hàng số lượng lớn của chuỗi phân phối.',
  },
  {
    icon: Truck,
    title: 'Mạng Lưới 63 Tỉnh Thành',
    desc: 'Hiện diện tại các hệ thống siêu thị, cửa hàng tiện lợi và mở rộng xuất khẩu quốc tế.',
  },
  {
    icon: Handshake,
    title: 'Chính Sách Hợp Tác Linh Hoạt',
    desc: 'Cam kết đồng hành bền vững cùng nhà phân phối, đại lý và đối tác OEM/ODM.',
  },
  {
    icon: TrendingUp,
    title: 'Định Hướng Phát Triển Dài Hạn',
    desc: 'Không ngừng đầu tư R&D nâng cao chất lượng vì sự hài lòng của người tiêu dùng.',
  },
]

export default function WhyChooseUs() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-32 bg-haq-bone relative">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  B2B TRUST & VALUE
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-haq-ink tracking-tight uppercase">
                VÌ SAO LỰA CHỌN <br />
                <span className="text-haq-red">HAQ FOOD?</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/70 max-w-md leading-relaxed">
              Chúng tôi xây dựng niềm tin từ chất lượng thực tế, năng lực cung ứng chuẩn mực và sự thấu hiểu thị hiếu người tiêu dùng Việt Nam.
            </p>
          </div>

          {/* 6 Value Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {REASONS.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-black/5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-haq-red/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-haq-red" />
                    </div>
                    <h3 className="font-heading font-extrabold text-lg text-haq-ink leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-haq-ink/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-mono font-bold text-haq-ink/40">
                    <span>HAQ COMMITMENT</span>
                    <span className="text-haq-red font-bold">✓</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 sm:mt-16 text-center">
            <Link
              to="/lien-he"
              className="group inline-flex items-center gap-3 bg-haq-red hover:bg-haq-ink text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>ĐĂNG KÝ HỢP TÁC PHÂN PHỐI</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
