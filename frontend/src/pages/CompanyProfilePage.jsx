import React from 'react'
import StickyNav from '../components/StickyNav'
import AboutCompany from '../components/AboutCompany'
import Footer from '../components/Footer'

export default function CompanyProfilePage() {
  return (
    <main id="top" className="bg-haq-bone min-h-screen">
      <StickyNav />
      <section className="pt-28 pb-10 border-b border-black/10 bg-haq-bone">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-haq-red" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-haq-red">
                Company Profile
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-[-0.03em] leading-[0.95] text-haq-ink">
              CÔNG TY CỔ PHẦN HAQ HÀ NỘI
            </h1>
            <p className="mt-6 text-lg text-haq-ink/70 leading-[1.7] max-w-2xl">
              Trang giới thiệu công ty, năng lực sản xuất, hệ thống phân phối và định hướng phát triển
              dành cho đối tác, khách hàng B2B và thị trường quốc tế.
            </p>
          </div>
        </div>
      </section>
      <AboutCompany />
      <Footer />
    </main>
  )
}
