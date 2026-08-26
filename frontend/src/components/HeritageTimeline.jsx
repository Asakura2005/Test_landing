import React, { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Trang Chủ' },
  { id: 'cau-chuyen', label: 'Câu Chuyện HAQ' },
  { id: 'san-pham', label: 'Sản Phẩm' },
  { id: 'phan-phoi', label: 'Phân Phối' },
  { id: 'lien-he', label: 'Liên Hệ / Báo Giá' }
]

export default function HeritageTimeline() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const elementTop = top + window.scrollY
          const elementBottom = bottom + window.scrollY
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(section.id)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Trigger once on mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80 // offset for StickyNav
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center font-sans">
      {SECTIONS.map((section, index) => {
        const isActive = activeSection === section.id
        const isPast = SECTIONS.findIndex(s => s.id === activeSection) > index
        
        return (
          <div key={section.id} className="relative flex items-center group cursor-pointer" onClick={() => scrollTo(section.id)}>
            {/* The line connecting nodes */}
            {index !== SECTIONS.length - 1 && (
              <div 
                className={`absolute left-1.5 top-3 w-[2px] h-8 transition-colors duration-500 ${
                  isPast || isActive ? 'bg-[#16A34A]' : 'bg-haq-border'
                }`}
              />
            )}
            
            {/* The Node (Rounded circle for clean modern look) */}
            <div 
              className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                isActive 
                  ? 'bg-[#16A34A] border-[#16A34A] scale-125 shadow-[0_0_10px_rgba(22,163,74,0.5)]' 
                  : isPast
                    ? 'bg-[#0F5132] border-[#0F5132]'
                    : 'bg-white border-haq-border hover:border-[#16A34A]'
              }`}
            />
            
            {/* The Label */}
            <div 
              className={`absolute left-8 whitespace-nowrap transition-all duration-300 pointer-events-none ${
                isActive 
                  ? 'opacity-100 translate-x-0 font-bold text-[#16A34A] text-xs' 
                  : 'opacity-0 -translate-x-2 font-medium text-haq-text-secondary text-xs group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-haq-ink'
              }`}
            >
              {section.label}
            </div>
            
            {/* Spacer for next item */}
            <div className="h-8 w-full" />
          </div>
        )
      })}
    </div>
  )
}
