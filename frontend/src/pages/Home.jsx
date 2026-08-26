import React from 'react'
import StickyNav from '../components/StickyNav'
import Hero from '../components/Hero'
import BrandStorySection from '../components/BrandStorySection'
import QuickStats from '../components/QuickStats'
import Products from '../components/Products'
import FeaturedProduct from '../components/FeaturedProduct'
import JourneyTimeline from '../components/JourneyTimeline'
import CapabilitiesSection from '../components/CapabilitiesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import Partners from '../components/Partners'
import VisionSection from '../components/VisionSection'
import NewsSection from '../components/NewsSection'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

export default function Home() {
  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans selection:bg-haq-red selection:text-white flex flex-col relative">
      {/* 00: Sticky Header & Navigation */}
      <StickyNav />

      {/* Floating Quick-Contact Bar (Right side) */}
      <FloatingContactBar />

      <main className="flex-1">
        {/* Full-Bleed 100% Edge-to-Edge Hero Banner Slider */}
        <Hero />

        {/* 01 / ABOUT HAQ FOOD: Corporate Introduction */}
        <BrandStorySection />

        {/* Trust Statistics Strip: 2021 | ISO | HACCP | 03 Markets */}
        <QuickStats />

        {/* 02 / PRODUCTS: Key Products Asymmetric Editorial Grid */}
        <Products />

        {/* 03 / SIGNATURE PRODUCT: Bánh Tráng Trộn HAQ Spotlight */}
        <FeaturedProduct />

        {/* 04 / OUR JOURNEY: Timeline 2021 - 2025 */}
        <JourneyTimeline />

        {/* 05 / PRODUCTION: Manufacturing Capability & 5-Step Process */}
        <CapabilitiesSection />

        {/* 06 / WHY HAQ: 5 Competitive Advantages */}
        <WhyChooseUs />

        {/* 07 / DISTRIBUTION: Domestic & International Networks */}
        <Partners />

        {/* 08 / FUTURE: Asia Vision & Core Values Flow */}
        <VisionSection />

        {/* 09 / NEWS: Real Corporate Activities */}
        <NewsSection />

        {/* B2B & OEM/ODM Partnership CTA */}
        <CtaBanner />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  )
}
