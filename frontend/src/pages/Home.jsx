import React from 'react'
import StickyNav from '../components/StickyNav'
import FloatingContactBar from '../components/FloatingContactBar'
import Hero from '../components/Hero'
import Products from '../components/Products'
import FeaturedProduct from '../components/FeaturedProduct'
import BrandStorySection from '../components/BrandStorySection'
import QuickStats from '../components/QuickStats'
import JourneyTimeline from '../components/JourneyTimeline'
import CapabilitiesSection from '../components/CapabilitiesSection'
import Partners from '../components/Partners'
import WhyChooseUs from '../components/WhyChooseUs'
import VisionSection from '../components/VisionSection'
import NewsSection from '../components/NewsSection'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans selection:bg-haq-red selection:text-white flex flex-col relative">
      {/* 00: Sticky Header with Visual Mega Menu & Search */}
      <StickyNav />

      {/* Floating Quick-Contact Bar (Right side) */}
      <FloatingContactBar />

      <main className="flex-1">
        {/* 00 / HERO: Full-Bleed 100% Edge-to-Edge Banner Slider */}
        <Hero />

        {/* 01 / SẢN PHẨM: Product Discovery Category Tiles (Directly after Hero) */}
        <Products />

        {/* 02 / SẢN PHẨM TIÊU BIỂU: Signature Product Spotlight */}
        <FeaturedProduct />

        {/* 03 / DOANH NGHIỆP: About HAQ FOOD Storytelling & Factory */}
        <BrandStorySection />

        {/* Trust Statistics Strip: 2021 | ISO | HACCP | 03 Markets */}
        <QuickStats />

        {/* 04 / HÀNH TRÌNH: Timeline 2021 - 2025 */}
        <JourneyTimeline />

        {/* 05 / NĂNG LỰC SẢN XUẤT: 5 Pillars & 5-Step Process */}
        <CapabilitiesSection />

        {/* 06 / MẠNG LƯỚI PHÂN PHỐI: Domestic Chains & Global Markets */}
        <Partners />

        {/* 07 / HỢP TÁC DOANH NGHIỆP: B2B & OEM/ODM Dedicated Section */}
        <WhyChooseUs />

        {/* 08 / TẦM NHÌN & GIÁ TRỊ: Asia Expansion & Core Values */}
        <VisionSection />

        {/* 09 / TIN TỨC HOẠT ĐỘNG: Real Corporate Activities */}
        <NewsSection />

        {/* 10 / PRE-FOOTER CTA: Sẵn Sàng Đồng Hành Cùng HAQ FOOD */}
        <CtaBanner />
      </main>

      {/* 11 / FOOTER: Comprehensive Information Architecture Sitemap */}
      <Footer />
    </div>
  )
}
