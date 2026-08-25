import React from 'react'
import StickyNav from '../components/StickyNav'
import LeadForm from '../components/LeadForm'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <main className="bg-haq-cream min-h-screen flex flex-col">
      <StickyNav />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-haq-ink text-white">
        <div className="mx-auto max-w-site px-6 md:px-12">
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
            Liên Hệ <span className="text-haq-gold">Với Chúng Tôi</span>
          </h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
          </p>
        </div>
      </section>
      <LeadForm />
      <Footer />
    </main>
  )
}
