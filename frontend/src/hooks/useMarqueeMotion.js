import { useEffect, useRef } from 'react'

export function useMarqueeMotion(speed = 100) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    let frameId = 0
    let lastTime = performance.now()
    let offset = 0

    const step = (time) => {
      const delta = time - lastTime
      lastTime = time
      offset -= (speed * delta) / 1000

      const halfWidth = el.scrollWidth / 2
      if (Math.abs(offset) >= halfWidth) {
        offset = 0
      }

      el.style.transform = `translate3d(${offset}px, 0, 0)`
      frameId = window.requestAnimationFrame(step)
    }

    frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [speed])

  return ref
}
