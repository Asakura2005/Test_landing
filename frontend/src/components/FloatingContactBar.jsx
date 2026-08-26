import React, { useState } from 'react'
import { Phone, MessageCircle, Mail, Globe, Sparkles, X, Plus, Share2 } from 'lucide-react'

export default function FloatingContactBar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const contactItems = [
    {
      href: 'tel:02423235656',
      icon: Phone,
      label: 'Hotline: 024 23 23 56 56',
      color: 'bg-haq-red',
      title: 'Gọi Hotline',
    },
    {
      href: 'https://zalo.me',
      icon: null,
      label: 'Chat Zalo tư vấn',
      color: 'bg-[#0068FF]',
      title: 'Chat Zalo',
      text: 'Zalo',
    },
    {
      href: 'https://facebook.com',
      icon: null,
      label: 'Fanpage HAQ FOOD',
      color: 'bg-[#1877F2]',
      title: 'Facebook HAQ FOOD',
      text: 'f',
    },
    {
      href: 'mailto:info@haq.com.vn',
      icon: Mail,
      label: 'info@haq.com.vn',
      color: 'bg-[#D97706]',
      title: 'Gửi Email hợp tác',
    },
    {
      href: '/lien-he',
      icon: Sparkles,
      label: 'Hợp tác B2B / OEM',
      color: 'bg-haq-ink',
      title: 'Hợp tác B2B & OEM/ODM',
      extraClass: 'border border-white/20 text-haq-gold',
    },
  ]

  return (
    <aside
      aria-label="Liên hệ nhanh"
      className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 md:top-1/2 z-50 flex flex-col items-center gap-2.5"
    >
      {/* Desktop View (Always Visible) */}
      <div className="hidden md:flex flex-col items-center gap-2.5">
        {contactItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`group relative flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg hover:scale-110 transition-all duration-300 ${item.color} ${item.extraClass || ''}`}
            title={item.title}
          >
            {item.icon ? (
              <item.icon className={`w-5 h-5 ${item.icon === Phone ? 'animate-pulse' : ''}`} />
            ) : (
              <span className="font-heading font-black text-sm tracking-tight">{item.text}</span>
            )}
            <span className="absolute right-full mr-3 px-3 py-1 bg-haq-ink text-white text-xs font-heading font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Mobile View (Collapsible Bubble) */}
      <div className="md:hidden relative flex flex-col items-center">
        {/* Expanded Items */}
        <div className={`flex flex-col items-center gap-3 mb-3 transition-all duration-300 origin-bottom ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'
        }`}>
          {contactItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`flex items-center justify-center w-11 h-11 rounded-full text-white shadow-md ${item.color} ${item.extraClass || ''}`}
            >
              {item.icon ? (
                <item.icon className="w-5 h-5" />
              ) : (
                <span className="font-heading font-black text-xs">{item.text}</span>
              )}
            </a>
          ))}
        </div>

        {/* Trigger Bubble */}
        <button
          onClick={toggleMenu}
          className={`w-13 h-13 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
            isOpen ? 'bg-haq-ink rotate-0' : 'bg-haq-red rotate-0'
          }`}
          aria-label="Menu liên hệ"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-haq-gold rounded-full border-2 border-white animate-ping" />
          )}
        </button>
      </div>
    </aside>
  )
}

