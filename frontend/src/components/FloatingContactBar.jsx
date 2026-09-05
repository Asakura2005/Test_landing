import React, { useState } from 'react'
import { Phone, MessageCircle, Mail, Sparkles, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function FloatingContactBar() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const contactItems = [
    {
      href: 'tel:02423235656',
      icon: Phone,
      label: '024 23 23 56 56',
      color: 'bg-haq-green-dark',
      title: language === 'en' ? 'Call Hotline' : 'Gọi Hotline',
    },
    {
      href: 'https://zalo.me/1361851474644984696',
      icon: null,
      label: 'Zalo OA: HAQ Hanoi',
      color: 'bg-[#0068FF]',
      title: 'Chat Zalo',
      text: 'Zalo',
    },
    {
      href: 'https://facebook.com',
      icon: null,
      label: 'Fanpage HAQ FOOD',
      color: 'bg-[#1877F2]',
      title: 'Facebook',
      text: 'f',
    },
    {
      href: 'mailto:info@haq.com.vn',
      icon: Mail,
      label: 'info@haq.com.vn',
      color: 'bg-[#16A34A]',
      title: 'Email',
    },
    {
      href: '/lien-he?type=oem',
      icon: Sparkles,
      label: 'B2B / OEM',
      color: 'bg-[#0C1E15]',
      title: 'B2B & OEM/ODM',
      extraClass: 'border border-white/20 text-[#C89B3C]',
    },
  ]

  return (
    <aside
      aria-label={language === 'en' ? 'Quick contact' : language === 'ko' ? '빠른 문의' : 'Liên hệ nhanh'}
      className="fixed right-3 sm:right-5 bottom-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* Collapsible Contact Items */}
      <div
        className={`flex flex-col items-center gap-2.5 transition-all duration-300 origin-bottom ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
        }`}
      >
        {contactItems.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`group relative flex items-center justify-center w-10 h-10 rounded-full text-white shadow-md hover:scale-110 transition-all duration-200 pointer-events-auto ${item.color} ${item.extraClass || ''}`}
            title={item.title}
          >
            {item.icon ? (
              <item.icon className="w-4.5 h-4.5" />
            ) : (
              <span className="font-heading font-bold text-xs">{item.text}</span>
            )}
            <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#0C1E15]/95 backdrop-blur-xs text-white text-[11px] font-heading font-medium rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-white/10">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Main Trigger Bubble (Bottom-right corner) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full text-white shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 pointer-events-auto ${
          isOpen ? 'bg-[#0C1E15]' : 'bg-[#0F5132]'
        }`}
        aria-label={isOpen ? 'Thu nhỏ liên hệ' : 'Mở liên hệ nhanh'}
        title={isOpen ? 'Thu nhỏ' : 'Liên hệ nhanh'}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#C89B3C] rounded-full border-2 border-white" />
          </>
        )}
      </button>
    </aside>
  )
}
