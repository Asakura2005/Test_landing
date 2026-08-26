import React from 'react'
import { Phone, MessageCircle, Mail, Globe, Sparkles } from 'lucide-react'

export default function FloatingContactBar() {
  return (
    <aside
      aria-label="Liên hệ nhanh"
      className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2.5"
    >
      {/* Hotline Button */}
      <a
        href="tel:02423235656"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-haq-red text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-haq-red/40"
        title="Gọi Hotline: 024 23 23 56 56"
      >
        <Phone className="w-5 h-5 animate-pulse" />
        <span className="absolute right-full mr-3 px-3 py-1 bg-haq-ink text-white text-xs font-heading font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          Hotline: 024 23 23 56 56
        </span>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0068FF] text-white shadow-lg hover:scale-110 transition-all duration-300"
        title="Chat Zalo"
      >
        <span className="font-heading font-black text-[13px] tracking-tight">Zalo</span>
        <span className="absolute right-full mr-3 px-3 py-1 bg-haq-ink text-white text-xs font-heading font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          Chat Zalo tư vấn
        </span>
      </a>

      {/* Facebook Button */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1877F2] text-white shadow-lg hover:scale-110 transition-all duration-300"
        title="Facebook HAQ FOOD"
      >
        <span className="font-heading font-black text-base">f</span>
        <span className="absolute right-full mr-3 px-3 py-1 bg-haq-ink text-white text-xs font-heading font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          Fanpage HAQ FOOD
        </span>
      </a>

      {/* Email / Liên hệ */}
      <a
        href="mailto:info@haq.com.vn"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D97706] text-white shadow-lg hover:scale-110 transition-all duration-300"
        title="Gửi Email hợp tác"
      >
        <Mail className="w-5 h-5" />
        <span className="absolute right-full mr-3 px-3 py-1 bg-haq-ink text-white text-xs font-heading font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          info@haq.com.vn
        </span>
      </a>

      {/* B2B OEM/ODM Partner */}
      <a
        href="/lien-he"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-haq-ink text-haq-gold shadow-lg hover:scale-110 transition-all duration-300 border border-white/20"
        title="Hợp tác B2B & OEM/ODM"
      >
        <Sparkles className="w-5 h-5" />
        <span className="absolute right-full mr-3 px-3 py-1 bg-haq-ink text-white text-xs font-heading font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          Hợp tác B2B / OEM
        </span>
      </a>
    </aside>
  )
}
