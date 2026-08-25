import React from 'react'
import StickyNav from '../components/StickyNav'
import Footer from '../components/Footer'

export default function PolicyPage() {
  return (
    <main className="bg-haq-cream min-h-screen flex flex-col">
      <StickyNav />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-haq-ink text-white">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
            Chính Sách <span className="text-haq-gold">& Điều Khoản</span>
          </h1>
        </div>
      </section>
      <section className="flex-1 py-20">
        <div className="mx-auto max-w-site px-6 md:px-12 text-center">
          <div className="bg-white border border-black/5 p-16 max-w-2xl mx-auto">
            <p className="text-haq-ink/50 text-lg font-medium">Nội dung chính sách sẽ được cập nhật sau.</p>
            <p className="text-haq-ink/30 text-sm mt-4">Bạn có thể chỉnh sửa nội dung tại file PolicyPage.jsx</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
