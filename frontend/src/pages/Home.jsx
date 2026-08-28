import React from 'react'
import StickyNav from '../components/StickyNav'
import Hero from '../components/Hero'
import Products from '../components/Products'
import BrandStatement from '../components/BrandStatement'
import QuickStats from '../components/QuickStats'
import BrandVisualSection from '../components/BrandVisualSection'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'
import { useMagneticSectionScroll } from '../hooks/useMagneticSectionScroll'

export default function Home() {
  // Initialize Progressive Magnetic / Resistance Section Scroll
  useMagneticSectionScroll({ headerHeight: 72 })

  return (
    <div className="min-h-screen bg-haq-cream text-haq-text-primary font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* 0. Sticky Minimal Header */}
      <StickyNav />

      {/* Floating Quick Action Contacts */}
      <FloatingContactBar />

      <main className="flex-1">
        {/* 1. Hero Section (Cinematic Visual Impact) */}
        <section data-section="hero">
          <Hero />
        </section>

        {/* 2. Products / Fullscreen Vietnam Specialty Map */}
        <section data-section="specialty-map">
          <Products />
        </section>

        {/* 3. About Section (Concise Brand Teaser) */}
        <section data-section="brand-statement">
          <BrandStatement />
        </section>

        {/* 4. Quality & Capability (3 Core Pillars) */}
        <section data-section="quick-stats">
          <QuickStats />
        </section>

        {/* 5. International & Brand Visual ("FROM VIETNAM TO ASIA") */}
        <section data-section="brand-visual">
          <BrandVisualSection />
        </section>

        {/* 6. Final Partnership CTA */}
        <section data-section="cta-banner">
          <CtaBanner />
        </section>
      </main>

      {/* Corporate Footer */}
      <footer data-section="footer">
        <Footer />
      </footer>
    </div>
  )
}
