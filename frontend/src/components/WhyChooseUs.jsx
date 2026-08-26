import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const ADVANTAGES = [
  {
    num: '01',
    code: 'QUALITY',
    title: 'Chất Lượng Ổn Định – Giá Cạnh Tranh',
    desc: 'Kiểm soát nghiêm ngặt theo tiêu chuẩn ISO & HACCP, đảm bảo từng lô sản phẩm đồng nhất về hương vị và an toàn với chi phí tối ưu.',
  },
  {
    num: '02',
    code: 'FLEXIBILITY',
    title: 'Sản Phẩm Đa Dạng – Gia Công Theo Yêu Cầu',
    desc: 'Danh mục phong phú nhiều phân khúc và năng lực OEM/ODM linh hoạt đáp ứng mọi yêu cầu riêng biệt của đối tác.',
  },
  {
    num: '03',
    code: 'MARKET KNOWLEDGE',
    title: 'Đội Ngũ Am Hiểu Thị Trường',
    desc: 'Nắm bắt sâu sắc thị hiếu người tiêu dùng Việt Nam và xu hướng ẩm thực ăn vặt hiện đại để không ngừng đổi mới.',
  },
  {
    num: '04',
    code: 'DISTRIBUTION',
    title: 'Hệ Thống Phân Phối Rộng Khắp',
    desc: 'Hiện diện vững chắc tại các hệ thống siêu thị, đại siêu thị và chuỗi cửa hàng tiện lợi hàng đầu trên cả nước.',
  },
  {
    num: '05',
    code: 'EXPORT',
    title: 'Kinh Nghiệm Xuất Khẩu Quốc Tế',
    desc: 'Đã xuất khẩu thành công sang các thị trường tiêu chuẩn khắt khe như Hàn Quốc & Đài Loan, mở đường vươn xa châu Á.',
  },
]

export default function WhyChooseUs() {
  const ref = useReveal()
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  06 / WHY HAQ
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase">
                ĐIỀU GÌ TẠO NÊN <br />
                <span className="text-haq-red">HAQ FOOD?</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed">
              5 lợi thế cạnh tranh cốt lõi khẳng định vị thế và năng lực hợp tác chiến lược của HAQ FOOD với các đối tác lớn.
            </p>
          </div>

          {/* Interactive Typography & Value List */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive List */}
            <div className="lg:col-span-7 space-y-3">
              {ADVANTAGES.map((item, idx) => {
                const isActive = activeIdx === idx
                return (
                  <div
                    key={item.num}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className={`p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isActive
                        ? 'bg-haq-bone border-haq-red/30 shadow-md'
                        : 'bg-white border-black/5 hover:border-black/15 hover:bg-haq-bone/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`font-mono text-lg font-black ${isActive ? 'text-haq-red' : 'text-haq-ink/40'}`}>
                          {item.num}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-widest text-haq-ink/40 uppercase block">
                            {item.code}
                          </span>
                          <h3 className={`font-heading font-extrabold text-base sm:text-lg ${isActive ? 'text-haq-ink' : 'text-haq-ink/80'}`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <span className={`text-sm ${isActive ? 'text-haq-red font-bold' : 'text-black/20'}`}>
                        →
                      </span>
                    </div>

                    {/* Mobile visible desc if active */}
                    {isActive && (
                      <p className="lg:hidden mt-3 pt-3 border-t border-black/5 text-xs text-haq-ink/70 leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right: Active Detail Poster Box */}
            <div className="hidden lg:flex lg:col-span-5 bg-haq-ink text-white rounded-3xl p-8 sticky top-28 border border-black/5 shadow-xl flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <span className="font-mono text-4xl font-black text-haq-gold">
                    {ADVANTAGES[activeIdx].num}
                  </span>
                  <span className="font-mono text-xs font-bold tracking-widest text-white/50 uppercase">
                    {ADVANTAGES[activeIdx].code}
                  </span>
                </div>

                <h4 className="font-heading font-black text-2xl text-white uppercase leading-snug">
                  {ADVANTAGES[activeIdx].title}
                </h4>

                <p className="mt-6 text-sm text-white/75 leading-relaxed">
                  {ADVANTAGES[activeIdx].desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-haq-gold">
                <span>HAQ COMPETITIVE ADVANTAGE</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 sm:mt-16 text-center">
            <Link
              to="/lien-he"
              className="group inline-flex items-center gap-3 bg-haq-red hover:bg-haq-ink text-white text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>HỢP TÁC CÙNG HAQ FOOD</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
