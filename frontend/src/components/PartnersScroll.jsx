import React from 'react'

/**
 * PartnersScroll Component
 * Auto-scrolling partners logo/name strip with seamless infinite loop.
 * Top and bottom borders (border-haq-border), white background.
 */
const PARTNER_NAMES = [
  'WinMart',
  'GO!',
  'Circle K',
  'GS25',
  'LOTTE',
  'K-Market',
  'Bách Hoá Xanh',
]

export default function PartnersScroll() {
  return (
    <section
      aria-label="Đối tác phân phối"
      className="w-full bg-white border-y border-haq-border py-6 overflow-hidden select-none relative"
    >
      <div className="relative w-full overflow-hidden flex">
        {/* Horizontal Infinite Marquee Track */}
        <div
          className="flex shrink-0 items-center justify-around gap-12 sm:gap-16 md:gap-24 w-max animate-marquee hover:[animation-play-state:paused]"
          style={{ willChange: 'transform' }}
        >
          {/* First set of partners */}
          {PARTNER_NAMES.map((partner, index) => (
            <span
              key={`partner-1-${index}`}
              className="text-lg font-extrabold text-haq-ink opacity-30 hover:opacity-60 transition-opacity duration-200 cursor-pointer whitespace-nowrap tracking-wide"
            >
              {partner}
            </span>
          ))}

          {/* Duplicated set for seamless loop */}
          {PARTNER_NAMES.map((partner, index) => (
            <span
              key={`partner-2-${index}`}
              aria-hidden="true"
              className="text-lg font-extrabold text-haq-ink opacity-30 hover:opacity-60 transition-opacity duration-200 cursor-pointer whitespace-nowrap tracking-wide"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
