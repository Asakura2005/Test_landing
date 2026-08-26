import React, { useEffect } from 'react'
import StickyNav from '../components/StickyNav'
import Hero from '../components/Hero'
import QuickStats from '../components/QuickStats'
import BrandStorySection from '../components/BrandStorySection'
import Products from '../components/Products'
import FeaturedProduct from '../components/FeaturedProduct'
import CapabilitiesSection from '../components/CapabilitiesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import Partners from '../components/Partners'
import NewsSection from '../components/NewsSection'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function Home() {
  // Handle hash scrolling if navigating with anchor
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <div className="bg-white min-h-screen flex flex-col selection:bg-haq-red selection:text-white">
      {/* 1. Header & Navigation */}
      <StickyNav />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Quick Brand Statistics Strip */}
        <QuickStats />

        {/* 4. Brand Story Section (50/50 Layout) */}
        <BrandStorySection />

        {/* 5. Product Catalog & Categories */}
        <Products />

        {/* 6. Featured Flagship Product Spotlight */}
        <FeaturedProduct />

        {/* 7. Corporate Capabilities (4 Pillars) */}
        <CapabilitiesSection />

        {/* 8. B2B Trust & Why HAQ FOOD */}
        <WhyChooseUs />

        {/* 9. Retail & Distribution Partners (Monochrome) */}
        <Partners />

        {/* 10. News & Corporate Activities */}
        <NewsSection />

        {/* 11. Final Pre-Footer Call to Action */}
        <CtaBanner />
      </main>

      {/* 12. Corporate 4-Column Footer */}
      <Footer />
    </div>
  )
}
