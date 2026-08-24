import React from 'react'
import { useReveal } from '../hooks/useReveal'

const VALUES = [
  'Chất lượng là nền tảng – Quality First.',
  'Minh bạch quy trình – Transparency.',
  'Đổi mới sản phẩm – Innovation.',
  'Hợp tác bền vững – Sustainable Partnership.',
  'Lấy khách hàng làm trung tâm – Customer-centric Approach.',
]

const TIMELINE = [
  { year: '2021', text: 'Thành lập công ty; hoàn thiện dây chuyền bánh tráng trộn và ký kết khách hàng đầu tiên.' },
  { year: '2022', text: 'Mở rộng sang bánh đậu xanh, bánh hạnh nhân, bắp rang bơ và thịt khô.' },
  { year: '2023', text: 'Phủ sóng tại Go, WinMart, Circle K, GS25, Kmart, Bách Hóa Xanh.' },
  { year: '2024', text: 'Xuất khẩu sang Hàn Quốc và Đài Loan.' },
  { year: '2025', text: 'Tham gia Hội chợ Giao thương Việt – Trung.' },
]

const DISTRIBUTION = [
  'WinMart', 'Big C – GO!', 'Circle K',
  'GS25', 'Kmart', 'Bách Hóa Xanh',
]

export default function AboutCompany() {
  const ref = useReveal()

  return (
    <section className="bg-white py-24 md:py-32 border-y border-black/10">
      <div className="mx-auto max-w-site px-6 md:px-12">
        <div ref={ref} className="reveal grid grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-haq-red" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-red">
                Về HAQ Hà Nội
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-haq-ink">
              CÔNG TY CỔ PHẦN HAQ HÀ NỘI
            </h2>
            <p className="mt-6 text-lg leading-[1.7] text-haq-ink/70 max-w-xl">
              HAQ Hà Nội được thành lập trong bối cảnh thị trường thực phẩm ngày càng yêu cầu cao
              về an toàn thực phẩm, tính minh bạch, chất lượng sản phẩm và sự đa dạng về khẩu vị.
              Công ty hướng tới các sản phẩm đồ ăn vặt mang hương vị Việt Nam, phù hợp nhu cầu của
              người tiêu dùng hiện đại và các đối tác phân phối B2B.
            </p>
            <p className="mt-4 text-lg leading-[1.7] text-haq-ink/70 max-w-xl">
              Triết lý xuyên suốt của doanh nghiệp là <strong>“Chất lượng là cốt lõi của thương hiệu”</strong>.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ['Thành lập', '2021'],
                ['Thị trường', 'VN · KR · TW'],
                ['Chứng nhận', 'ISO · HACCP'],
                ['Mô hình', 'OEM · ODM'],
              ].map(([label, value]) => (
                <div key={label} className="border border-black/10 p-4 bg-haq-bone/40">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-haq-ink/50">{label}</div>
                  <div className="mt-2 font-heading font-extrabold text-xl text-haq-ink">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-black/10 p-6 bg-haq-bone/50">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-orange">Tầm nhìn</div>
                <p className="mt-3 text-haq-ink/75 leading-[1.7]">
                  Trở thành doanh nghiệp tiên phong và dẫn đầu trong lĩnh vực sản xuất – phân phối đồ ăn vặt tại Việt Nam;
                  mở rộng sang Nhật Bản, Hàn Quốc và các quốc gia châu Á.
                </p>
              </div>
              <div className="border border-black/10 p-6 bg-haq-bone/50">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-orange">Sứ mệnh</div>
                <p className="mt-3 text-haq-ink/75 leading-[1.7]">
                  Mang đến các sản phẩm ngon – an toàn – đạt chuẩn, đáp ứng nhu cầu ngày càng cao của người tiêu dùng.
                </p>
              </div>
            </div>

            <div className="border border-black/10 p-6 bg-haq-bone/50">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-orange">Giá trị cốt lõi</div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {VALUES.map((v) => (
                  <div key={v} className="bg-white border border-black/5 px-4 py-3 text-sm leading-relaxed text-haq-ink/80">
                    {v}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/10 p-6 bg-haq-bone/50">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-orange">Năng lực sản xuất</div>
              <ul className="mt-4 grid md:grid-cols-2 gap-3 text-haq-ink/75">
                {[
                  'Nhà xưởng đạt ISO – HACCP.',
                  'Kiểm soát chặt chẽ từ nguyên liệu đến lưu mẫu.',
                  'Có khả năng đáp ứng đơn hàng lớn và liên tục.',
                  'Nhận sản xuất theo yêu cầu đối tác (OEM/ODM).',
                  'Quy trình xuất kho và logistics minh bạch.',
                  'Chất lượng ổn định – giá cạnh tranh.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-haq-orange shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-black/10 p-6 bg-haq-bone/50">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-red">Mốc phát triển</div>
            <div className="mt-5 space-y-4">
              {TIMELINE.map((item) => (
                <div key={item.year} className="grid grid-cols-[72px_1fr] gap-4 items-start">
                  <div className="font-heading font-extrabold text-2xl text-haq-ink">{item.year}</div>
                  <p className="text-haq-ink/75 leading-[1.7]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black/10 p-6 bg-haq-bone/50">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-haq-red">Hệ thống phân phối</div>
            <p className="mt-4 text-haq-ink/75 leading-[1.7]">
              HAQ Hà Nội hiện diện tại nhiều chuỗi bán lẻ lớn trong nước và đang mở rộng sang thị trường quốc tế
              như Hàn Quốc, Đài Loan; đồng thời hướng tới Nhật Bản và các thị trường châu Á tiêu chuẩn cao.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {DISTRIBUTION.map((item) => (
                <span key={item} className="px-4 py-2 bg-white border border-black/10 text-sm text-haq-ink/80">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 text-haq-ink/75 leading-[1.7]">
              Công ty là đối tác của nhiều hệ thống như WinCommerce, Circle K, GS25, Kmart, GO!, WinMart,
              Big C và Bách Hóa Xanh.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
