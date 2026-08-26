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
    <span ref={ref} className="font-heading font-extrabold text-4xl md:text-5xl text-haq-green-dark">
      {formattedCount}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useReveal()

  return (
    <section className="py-20 md:py-28 bg-white border-t border-haq-border font-sans">
      <div className="mx-auto max-w-site px-6 md:px-12">
        <div ref={ref} className="reveal">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-heading text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-1">
              CON SỐ BIẾT NÓI
            </span>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-haq-ink uppercase tracking-tight">
              QUY MÔ & TĂNG TRƯỞNG BỀN VỮNG
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="relative bg-haq-sage/20 rounded-3xl p-6 pt-10 text-center border border-haq-border hover:-translate-y-1.5 transition-all duration-300 shadow-2xs hover:shadow-lg hover:bg-white hover:border-[#16A34A]/40">
                  {/* Overlapping Icon */}
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-haq-border mx-auto mb-4 text-[#16A34A]">
                    <Icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  
                  <div className="mb-2">
                    <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  </div>
                  <h3 className="font-heading font-bold text-sm uppercase text-haq-ink mb-1">{stat.label}</h3>
                  <p className="text-haq-text-secondary font-normal text-xs leading-relaxed">
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
