import React from 'react'
import StickyNav from '../components/StickyNav'
import FloatingContactBar from '../components/FloatingContactBar'
import Hero from '../components/Hero'
import Products from '../components/Products'
import FeaturedProduct from '../components/FeaturedProduct'
import BrandStorySection from '../components/BrandStorySection'
import QuickStats from '../components/QuickStats'
import CapabilitiesSection from '../components/CapabilitiesSection'
import Partners from '../components/Partners'
import WhyChooseUs from '../components/WhyChooseUs'
import NewsSection from '../components/NewsSection'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans selection:bg-haq-red selection:text-white flex flex-col relative">
      {/* 00: Minimalist Sticky Header with Product Mega Menu */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1">
        {/* 01 / HERO: Full-Bleed 100% Banner Slider */}
        <Hero />

        {/* 02 / SẢN PHẨM: Product Discovery (Asymmetric Editorial Grid) */}
        <Products />

        {/* 03 / SIGNATURE PRODUCT: Bánh Tráng Trộn HAQ 2021 */}
        <FeaturedProduct />

        {/* 04 / ABOUT: Doanh nghiệp thực phẩm Việt Nam */}
        <BrandStorySection />

        {/* 05 / TRUST & QUALITY: ISO · HACCP · Quality Control · Transparency */}
        <QuickStats />

        {/* 06 / CAPABILITY: 5-Step Process & Production Power */}
        <CapabilitiesSection />

        {/* 07 / MARKET: Domestic Chains & Global Export */}
        <Partners />

        {/* 08 / PARTNERSHIP: B2B & OEM/ODM Dedicated Section */}
        <WhyChooseUs />

        {/* 09 / NEWS: Real Corporate News & Trade Activities */}
        <NewsSection />

        {/* 10 / FINAL CTA: Sẵn Sàng Đồng Hành Cùng HAQ FOOD? */}
        <CtaBanner />
      </main>

      {/* 11 / FOOTER: Clean Sitemapped Corporate Footer */}
      <Footer />
    </div>
  )
}
