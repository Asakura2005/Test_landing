import React, { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Globe, Store, MapPin, Package } from 'lucide-react'

const STATS = [
  { 
    icon: Globe,
    number: 5, 
    suffix: '+', 
    label: 'Quốc gia',
    desc: 'Quốc gia có mặt sản phẩm HAQ Food' 
  },
  { 
    icon: Store,
    number: 5, 
    suffix: '+', 
    label: 'Chuỗi siêu thị',
    desc: 'Chuỗi siêu thị & cửa hàng tiện lợi phân phối' 
  },
  { 
    icon: MapPin,
    number: 30, 
    suffix: '+', 
    label: 'Điểm bán',
    desc: 'Điểm bán khắp cả nước' 
  },
  { 
    icon: Package,
    number: 2.1, 
    suffix: ' triệu +', 
    label: 'Sản phẩm',
    desc: 'Đơn vị sản phẩm bán ra hàng tháng' 
  }
]

function AnimatedNumber({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 2000
          const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            // Handle float numbers
            if (target % 1 !== 0) {
              setCount((progress * target).toFixed(1))
            } else {
              setCount(Math.floor(progress * target))
            }
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  // Format large numbers with comma
  const formattedCount = Number(count).toLocaleString('en-US')

  return (
    <span ref={ref} className="font-heading font-extrabold text-5xl md:text-6xl text-haq-red">
      {formattedCount}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-32 bg-haq-cream">
      <div className="mx-auto max-w-site px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="relative bg-white rounded-3xl p-8 pt-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-black/5 hover:-translate-y-2 transition-transform duration-300">
                  {/* Overlapping Icon */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-haq-cream">
                    <Icon className="w-8 h-8 text-haq-red" strokeWidth={1.5} />
                  </div>
                  
                  <div className="mb-3">
                    <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-haq-ink/60 font-medium text-sm leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
