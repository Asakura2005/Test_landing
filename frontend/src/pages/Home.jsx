import React from 'react'
import StickyNav from '../components/StickyNav'
import Hero from '../components/Hero'
import TrustMarquee from '../components/TrustMarquee'
import Products from '../components/Products'
import DbFeaturedProducts from '../components/flagship/DbFeaturedProducts'
import FlagshipOemCapabilities from '../components/flagship/FlagshipOemCapabilities'
import PartnersScroll from '../components/PartnersScroll'
import Footer from '../components/Footer'
import FloatingContactBar from '../components/FloatingContactBar'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#11261B] font-body flex flex-col relative selection:bg-[#16A34A] selection:text-white scroll-smooth">
      {/* 1. Thanh điều hướng chính */}
      <StickyNav />

      {/* 2. Thanh liên hệ nhanh nổi */}
      <FloatingContactBar />

      <main className="flex-1 w-full overflow-x-hidden">
        {/* 3. Banner Hero của User (Carousel ảnh thật kết hợp thiết kế Stitch) */}
        <section data-section="hero" className="pt-[72px] lg:pt-0">
          <Hero />
        </section>

        {/* 4. Dải Tín Hiệu Tín Nhiệm & Chứng Chỉ ISO */}
        <TrustMarquee />

        {/* 5. Bản Đồ Hệ Sinh Thái Nông Sản & Vùng Nguyên Liệu GIS Bố Cục Chuẩn Stitch */}
        <Products />

        {/* 6. Sản Phẩm Nổi Bật Lấy Từ Database Thật & Banner Tải Catalog 2025 */}
        <DbFeaturedProducts />

        {/* 7. 4 Trụ Cột Năng Lực OBM & ODM (Chuẩn Stitch) */}
        <FlagshipOemCapabilities />

        {/* 8. Dải Đối Tác Chuỗi Siêu Thị Bán Lẻ */}
        <PartnersScroll />
      </main>

      {/* 9. Chân Trang Doanh Nghiệp */}
      <footer data-section="footer">
        <Footer />
      </footer>
    </div>
  )
}
