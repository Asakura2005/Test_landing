import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const MARQUEE_DATA = {
  vi: [
    'ISO 22000 & HACCP',
    'Nhà Máy Chuẩn Quốc Tế',
    '50+ Sản Phẩm',
    'Xuất Khẩu Hàn Quốc · Đài Loan',
    '7+ Chuỗi Bán Lẻ Đối Tác',
    'Giải Pháp OEM / ODM',
    'Since 2021 · Hà Nội',
  ],
  en: [
    'ISO 22000 & HACCP Certified',
    'International Standard Facility',
    '50+ Premium SKUs',
    'Export to Korea · Taiwan',
    '7+ Retail Chain Partners',
    'OEM / ODM Solutions',
    'Since 2021 · Hanoi',
  ],
  ko: [
    'ISO 22000 & HACCP 인증',
    '국제 표준 제조 공장',
    '50개 이상 제품군',
    '한국 · 대만 수출',
    '7개 이상 대형 유통 파트너',
    'OEM / ODM 맞춤 솔루션',
    'Since 2021 · 하노이',
  ],
  zh: [
    'ISO 22000 & HACCP 认证',
    '国际标准化工厂',
    '50+ 款优质产品',
    '出口韩国 · 台湾地区',
    '7+ 零售连锁合作品牌',
    'OEM / ODM 专业代工',
    'Since 2021 · 河内',
  ],
}

export default function TrustMarquee() {
  const { language } = useLanguage()
  const items = MARQUEE_DATA[language] || MARQUEE_DATA.vi

  // Render one set of items with gold diamond separators
  const renderItemSet = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center shrink-0 space-x-6 sm:space-x-8 pr-6 sm:pr-8">
      {items.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <span className="text-xs font-semibold uppercase tracking-wider text-white/70 whitespace-nowrap transition-colors duration-200 hover:text-white/80 select-none">
            {item}
          </span>
          <span
            className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0 opacity-70"
            aria-hidden="true"
          />
        </React.Fragment>
      ))}
    </div>
  )

  return (
    <section
      aria-label="HAQ Food Trust Signals"
      className="relative w-full overflow-hidden bg-deep border-b-2 border-gold-pale py-2.5 z-20 group"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {renderItemSet('track-1')}
        {renderItemSet('track-2')}
      </div>
    </section>
  )
}
