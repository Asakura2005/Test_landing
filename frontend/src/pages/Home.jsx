import React from 'react'
import StickyNav from '../components/StickyNav'
import FloatingContactBar from '../components/FloatingContactBar'
import Hero from '../components/Hero'
import BrandStatement from '../components/BrandStatement'
import Products from '../components/Products'
import FeaturedProduct from '../components/FeaturedProduct'
import JourneyTimeline from '../components/JourneyTimeline'
import CapabilitiesSection from '../components/CapabilitiesSection'
import QuickStats from '../components/QuickStats'
import Partners from '../components/Partners'
import WhyChooseUs from '../components/WhyChooseUs'
import NewsSection from '../components/NewsSection'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-haq-bone text-haq-ink font-sans selection:bg-haq-red selection:text-white flex flex-col relative">
      {/* 00 / HEADER: Minimalist Sticky Header with Product Mega Menu */}
      <StickyNav />

      {/* Floating Quick Contact Widget */}
      <FloatingContactBar />

      <main className="flex-1">
        {/* 01 / HERO: Full-Bleed Banner Slider */}
        <Hero />

        {/* 02 / BRAND STATEMENT: Chất lượng là cốt lõi của thương hiệu */}
        <BrandStatement />

        {/* 03 / PRODUCT WORLD: Asymmetric Editorial Product Gallery */}
        <Products />

        {/* 04 / SIGNATURE PRODUCT: Bánh Tráng Trộn HAQ 2021 */}
        <FeaturedProduct />

        {/* 05 / STORY OF HAQ: Hành trình phát triển 2021 - 2025 */}
        <JourneyTimeline />

        {/* 06 / MANUFACTURING POWER: Năng lực sản xuất công nghiệp & Dây chuyền tự động */}
        <CapabilitiesSection />

        {/* 07 / QUALITY & SAFETY: Quy trình kiểm soát 5 bước ISO 22000 & HACCP */}
        <QuickStats />

        {/* 08 / DISTRIBUTION & EXPORT: Phủ sóng toàn quốc & Xuất khẩu Châu Á */}
        <Partners />

        {/* 09 / B2B PARTNERSHIP: Nền tảng hợp tác B2B & Gia công OEM / ODM */}
        <WhyChooseUs />

        {/* 10 / EDITORIAL NEWS: Tin tức & Hoạt động thương mại */}
        <NewsSection />

        {/* 11 / FINAL CTA: Kêu gọi hành động hợp tác */}
        <CtaBanner />
      </main>

      {/* 12 / FOOTER: Corporate Sitemapped Footer */}
      <Footer />
    </div>
  )
}
