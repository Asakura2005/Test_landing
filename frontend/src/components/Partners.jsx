import React from 'react'

const PARTNER_NAMES = [
  'WinCommerce',
  'Circle K',
  'GS25',
  'Kmart',
  'Go!',
  'Bách Hóa Xanh'
]

function PartnerLogo({ name }) {
  return (
    <div className="flex items-center justify-center min-w-[260px] px-8 h-24 shrink-0">
      <span className="font-heading font-extrabold text-2xl md:text-3xl text-haq-ink/30 tracking-tight select-none">
        {name}
      </span>
    </div>
  )
}

export default function Partners() {
  const track = [...PARTNER_NAMES, ...PARTNER_NAMES]

  return (
    <section id="partners" className="bg-white py-20 md:py-24 border-y border-black/10 overflow-hidden">
      <div className="mx-auto max-w-site px-6 md:px-12 mb-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-haq-gold" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-ink/60">
            Mạng Lưới Phân Phối
          </span>
        </div>
        <h2 className="mt-4 font-heading font-extrabold text-2xl md:text-3xl text-haq-ink tracking-[-0.02em] max-w-2xl">
          Đối tác chiến lược của các hệ thống bán lẻ hiện đại hàng đầu Việt Nam.
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="partners-marquee flex w-max animate-partners-marquee will-change-transform">
          {track.map((name, i) => (
            <PartnerLogo key={`${name}-${i}`} name={name} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>
    </section>
  )
}
