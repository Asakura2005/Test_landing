import React from 'react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'

export default function HeritagePage() {
  return (
    <main className="bg-haq-cream min-h-screen flex flex-col">
      <StickyNav />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-haq-ink text-white">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
            HAQ <span className="text-haq-gold">Heritage</span>
          </h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl">
            Di sản và giá trị văn hóa truyền thống của HAQ Food.
          </p>
        </div>
      </section>
      <section className="flex-1 py-20">
        <div className="mx-auto max-w-site px-6 md:px-12 text-center">
          <div className="bg-white border border-haq-border rounded-3xl p-16 max-w-2xl mx-auto shadow-xs">
            <p className="text-haq-text-secondary text-lg font-medium">Nội dung trang Heritage sẽ được cập nhật sau.</p>
            <p className="text-haq-text-secondary/40 text-sm mt-4">Bạn có thể chỉnh sửa nội dung tại file HeritagePage.jsx</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
