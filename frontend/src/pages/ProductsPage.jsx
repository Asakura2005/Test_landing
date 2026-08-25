import React from 'react'
import StickyNav from '../components/StickyNav'
import Products from '../components/Products'
import Footer from '../components/Footer'

export default function ProductsPage() {
  return (
    <main id="top" className="bg-haq-bone min-h-screen flex flex-col">
      <StickyNav />
      <div className="flex-1 pt-32">
        <Products />
      </div>
      <Footer />
    </main>
  )
}
