import React, { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import logoImg from '../assets/logo-haq.jpg'

const NAV_LINKS = [
  { label: 'Bảo chứng', href: '#certs' },
  { label: 'Đối tác', href: '#partners' },
  { label: 'Sản phẩm', href: '#products' },
  { label: 'Liên hệ', href: '#lead' },
]

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="sticky-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-haq-bone/90 backdrop-blur-md border-b border-black/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-site px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={logoImg}
            alt="HAQ FOOD Logo"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.25em] text-haq-ink/70 hover:text-haq-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Phone + mobile menu toggle */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+84901234567"
            className="hidden sm:flex items-center gap-2 font-heading font-bold text-sm text-haq-ink hover:text-haq-orange transition-colors"
          >
            <Phone className="w-4 h-4" strokeWidth={2} />
            024 23 23 56 56
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-haq-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-haq-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-haq-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-haq-bone/95 backdrop-blur-md border-b border-black/10 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-mono text-sm uppercase tracking-[0.25em] text-haq-ink/70 hover:text-haq-orange transition-colors border-b border-black/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel: 024 23 23 56 56"
            className="flex items-center gap-2 pt-4 font-heading font-bold text-sm text-haq-orange"
          >
            <Phone className="w-4 h-4" strokeWidth={2} />
            024 23 23 56 56
          </a>
        </div>
      )}
    </nav>
  )
}
