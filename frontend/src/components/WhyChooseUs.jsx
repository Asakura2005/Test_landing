import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Factory, Sparkles, Building2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const PARTNER_BENEFITS = [
  {
    num: '01',
    code: 'OEM / ODM',
    title: 'Gia Công Sản Phẩm Theo Yêu Cầu',
    desc: 'Tùy biến công thức, quy cách đóng gói và in ấn bao bì theo nhận diện thương hiệu riêng của đối tác.',
  },
  {
    num: '02',
    code: 'LARGE ORDERS',
    title: 'Đáp Ứng Đơn Hàng Lớn & Liên Tục',
    desc: 'Năng lực sản xuất quy chuẩn đảm bảo cung ứng khối lượng lớn ổn định, đúng tiến độ cho các chuỗi bán lẻ.',
  },
  {
    num: '03',
    code: 'QUALITY FIRST',
    title: 'Tiêu Chuẩn ISO 22000 & HACCP',
    desc: 'Kiểm soát chặt chẽ từng lô hàng từ nguồn nguyên liệu đến lưu mẫu truy xuất, đảm bảo chất lượng đồng nhất.',
  },
  {
    num: '04',
    code: 'EXPORT READY',
    title: 'Kinh Nghiệm Phân Phối & Xuất Khẩu',
    desc: 'Đã xuất khẩu sang Hàn Quốc và Đài Loan, am hiểu thủ tục kiểm định và tiêu chuẩn đóng gói quốc tế.',
  },
]

export default function WhyChooseUs() {
  const ref = useReveal()
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section id="hop-tac" className="py-20 md:py-32 bg-white relative border-t border-black/10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-12">
        <div ref={ref} className="reveal flex flex-col">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-haq-red uppercase">
                  06 / PARTNERSHIP
                </span>
                <span className="h-px w-10 bg-haq-red" />
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-haq-ink tracking-tight uppercase leading-tight">
                TÌM KIẾM MỘT <br />
                <span className="text-haq-red">ĐỐI TÁC THỰC PHẨM?</span>
              </h2>
            </div>
            <div>
              <p className="text-sm sm:text-base text-haq-ink/75 max-w-md leading-relaxed mb-4">
                HAQ FOOD có năng lực sản xuất theo yêu cầu OEM/ODM và đáp ứng các đơn hàng lớn, liên tục.
              </p>
              <Link
                to="/lien-he"
                className="group inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider text-haq-red border-b-2 border-haq-red pb-0.5 hover:text-haq-ink hover:border-haq-ink transition-colors"
              >
                <span>TRAO ĐỔI VỚI HAQ FOOD</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Interactive Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Benefits List */}
            <div className="lg:col-span-7 space-y-3">
              {PARTNER_BENEFITS.map((item, idx) => {
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
            <div className="hidden lg:flex lg:col-span-5 bg-haq-ink text-white rounded-3xl p-8 sticky top-28 border border-black/5 shadow-xl flex-col justify-between min-h-[360px]">
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                  <span className="font-mono text-4xl font-black text-haq-gold">
                    {PARTNER_BENEFITS[activeIdx].num}
                  </span>
                  <span className="font-mono text-xs font-bold tracking-widest text-white/50 uppercase">
                    {PARTNER_BENEFITS[activeIdx].code}
                  </span>
                </div>

                <h4 className="font-heading font-black text-2xl text-white uppercase leading-snug">
                  {PARTNER_BENEFITS[activeIdx].title}
                </h4>

                <p className="mt-6 text-sm text-white/75 leading-relaxed">
                  {PARTNER_BENEFITS[activeIdx].desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-haq-gold">
                <span>HỢP TÁC BỀN VỮNG</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
