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

export default function Home() {
  return (
    <div className="min-h-screen bg-haq-cream text-haq-text-primary font-sans flex flex-col relative selection:bg-haq-red selection:text-white">
      {/* 0. Sticky Minimal Header */}
      <StickyNav />

      {/* Floating Quick Action Contacts */}
      <FloatingContactBar />

      <main className="flex-1">
        {/* 1. Hero Section (Cinematic Visual Impact) */}
        <Hero />

        {/* 2. Products Section (Asymmetric Editorial Gallery) */}
        <Products />

        {/* 3. About Section (Concise Brand Teaser) */}
        <BrandStatement />

        {/* 4. Quality & Capability (3 Core Pillars) */}
        <QuickStats />

        {/* 5. International & Brand Visual ("FROM VIETNAM TO ASIA") */}
        <BrandVisualSection />

        {/* 6. Final Partnership CTA */}
        <CtaBanner />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  )
}
