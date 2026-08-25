import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { Play } from 'lucide-react'

export default function VideoIntro() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-28 bg-haq-cream">
      <div className="mx-auto max-w-site px-6 md:px-12">
        <div ref={ref} className="reveal">
          {/* Video Embed Placeholder */}
          <div className="w-full aspect-[21/9] md:aspect-video bg-haq-ink rounded-[40px] overflow-hidden relative group cursor-pointer shadow-2xl">
            {/* Background image placeholder */}
            <img src="https://placehold.co/1920x1080/DAA520/1A1A1A?text=Video+Placeholder" alt="Video cover" className="w-full h-full object-cover opacity-80" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:border-white transition-all duration-300">
                 <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
