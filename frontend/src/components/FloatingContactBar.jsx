import React, { useState } from 'react'
import { Phone, MessageCircle, Mail, Globe, Sparkles, X, Plus, Share2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function FloatingContactBar() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const contactItems = [
    {
      href: 'tel:02423235656',
      icon: Phone,
      label: 'Hotline: 024 23 23 56 56',
      color: 'bg-haq-green-dark',
      title: language === 'en' ? 'Call Hotline (024 23 23 56 56)' : language === 'ko' ? '핫라인 전화 (024 23 23 56 56)' : 'Gọi Hotline (024 23 23 56 56)',
    },
    {
      href: 'https://zalo.me/1361851474644984696',
      icon: null,
      label: language === 'en' ? 'Zalo OA: HAQ Hanoi' : language === 'ko' ? 'Zalo OA: HAQ 하노이' : 'Zalo OA: HAQ Hà Nội',
      color: 'bg-[#0068FF]',
      title: language === 'en' ? 'Chat Zalo Business (HAQ Hanoi)' : language === 'ko' ? 'Zalo 비즈니스 채팅 (HAQ 하노이)' : 'Chat Zalo Doanh Nghiệp (HAQ Hà Nội)',
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
      color: 'bg-[#16A34A]',
      title: language === 'en' ? 'Email inquiry' : language === 'ko' ? '제휴 이메일 발송' : 'Gửi Email hợp tác',
    },
    {
      href: '/lien-he?type=oem',
      icon: Sparkles,
      label: language === 'en' ? 'B2B / OEM Partnership' : language === 'ko' ? 'B2B / OEM 제휴 문의' : 'Hợp tác B2B / OEM',
      color: 'bg-[#0C1E15]',
      title: language === 'en' ? 'B2B & OEM/ODM Inquiries' : language === 'ko' ? 'B2B 및 OEM/ODM 상담' : 'Hợp tác B2B & OEM/ODM',
      extraClass: 'border border-white/20 text-[#C89B3C]',
    },
  ]

  return (
    <aside
      aria-label={language === 'en' ? 'Quick contact' : language === 'ko' ? '빠른 문의' : 'Liên hệ nhanh'}
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
            className={`group relative flex items-center justify-center w-11 h-11 rounded-full text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ${item.color} ${item.extraClass || ''}`}
            title={item.title}
          >
            {item.icon ? (
              <item.icon className={`w-4.5 h-4.5 ${item.icon === Phone ? 'animate-pulse' : ''}`} />
            ) : (
              <span className="font-heading font-bold text-xs">{item.text}</span>
            )}
            <span className="absolute right-full mr-3 px-3.5 py-1.5 bg-[#0C1E15] text-white text-xs font-heading font-medium rounded-xl shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-white/10">
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* Mobile View (Collapsible Bubble) */}
      <div className="md:hidden relative flex flex-col items-center">
        {/* Expanded Items */}
        <div className={`flex flex-col items-center gap-2.5 mb-2.5 transition-all duration-300 origin-bottom ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'
        }`}>
          {contactItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white shadow-sm ${item.color} ${item.extraClass || ''}`}
            >
              {item.icon ? (
                <item.icon className="w-4.5 h-4.5" />
              ) : (
                <span className="font-heading font-bold text-xs">{item.text}</span>
              )}
            </a>
          ))}
        </div>

        {/* Trigger Bubble */}
        <button
          onClick={toggleMenu}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 cursor-pointer ${
            isOpen ? 'bg-[#0C1E15] rotate-0' : 'bg-[#0F5132] rotate-0'
          }`}
          aria-label="Menu liên hệ"
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#C89B3C] rounded-full border-2 border-white" />
          )}
        </button>
      </div>
    </aside>
  )
}

