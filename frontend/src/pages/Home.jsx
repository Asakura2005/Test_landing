import React from 'react'
import StickyNav from '../components/StickyNav'
import Hero from '../components/Hero'
import AboutCompany from '../components/AboutCompany'
import Certifications from '../components/Certifications'
import Partners from '../components/Partners'
import Products from '../components/Products'
import LeadForm from '../components/LeadForm'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main id="top" className="bg-haq-bone">
      <StickyNav />
      <Hero />
      <AboutCompany />
      <div id="certs">
        <Certifications />
      </div>
      <Partners />
      <Products />
      <LeadForm />
      <Footer />
    </main>
  )
}
