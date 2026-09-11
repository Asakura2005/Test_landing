import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { VietnamSpecialtyMap } from './VietnamSpecialtyMap/VietnamSpecialtyMap'

export default function Products() {
  return (
    <div
      id="vietnam-specialty-map"
      className="w-full bg-white border-b border-haq-border relative flex flex-col justify-center py-0 lg:h-[calc(100vh-72px)] overflow-hidden"
    >
      <div id="san-pham" className="w-full h-full max-w-[1440px] mx-auto px-0 sm:px-4 lg:px-8 flex flex-col">
        {/* Fullscreen Interactive Vietnam Specialty Map Experience */}
        <VietnamSpecialtyMap className="w-full h-full flex-1 min-h-0" />
      </div>
    </div>
  )
}
