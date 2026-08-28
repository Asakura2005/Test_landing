import { useEffect, useRef, useState, useCallback } from 'react'

const SCROLL_THRESHOLD = 75 // Threshold px accumulated before triggering section jump
const NAV_LOCK_DURATION = 800 // Navigation lock in ms to prevent multiple section skips
const TOUCH_THRESHOLD = 50 // Minimum swipe distance in px on mobile

export function useSectionNavigation(options = {}) {
  const { headerHeight = 72, enabled = true } = options

  const [activeSectionId, setActiveSectionId] = useState('hero')
  const isNavigatingRef = useRef(false)
  const accumulatedDeltaRef = useRef(0)
  const lockTimerRef = useRef(null)
  const touchStartYRef = useRef(null)
  const touchStartXRef = useRef(null)

  // Get all registered sections in DOM order
  const getSections = useCallback(() => {
    return Array.from(document.querySelectorAll('[data-section]'))
  }, [])

  // Smooth scroll to a target section element
  const scrollToElement = useCallback((targetEl) => {
    if (!targetEl) return

    isNavigatingRef.current = true
    accumulatedDeltaRef.current = 0

    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    })

    const sectionId = targetEl.getAttribute('data-section') || ''
    if (sectionId) setActiveSectionId(sectionId)

    if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
    lockTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false
      accumulatedDeltaRef.current = 0
    }, NAV_LOCK_DURATION)
  }, [headerHeight])

  // Programmatic scroll to section by ID
  const scrollToSection = useCallback((sectionId) => {
    const el = document.querySelector(`[data-section="${sectionId}"]`)
    if (el) {
      scrollToElement(el)
    }
  }, [scrollToElement])

  // Find the currently active section based on viewport visibility
  const getCurrentSectionIndex = useCallback(() => {
    const sections = getSections()
    if (sections.length === 0) return -1

    const scrollYWithOffset = window.scrollY + headerHeight + 50
    let currentIndex = 0

    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].offsetTop
      if (scrollYWithOffset >= top) {
        currentIndex = i
      }
    }

    return currentIndex
  }, [getSections, headerHeight])

  // Wheel listener with threshold & map isolation
  useEffect(() => {
    if (!enabled) return

    const handleWheel = (e) => {
      // 1. Check if wheel event originated inside the map viewport / canvas
      const target = e.target
      if (target && (target.closest('[data-map-viewport="true"]') || target.closest('svg.mapSvg') || target.closest('[data-consume-wheel="true"]'))) {
        // Allow map's internal wheel zoom handler to operate exclusively
        accumulatedDeltaRef.current = 0
        return
      }

      // 2. If navigating lock is active, ignore further scroll triggers
      if (isNavigatingRef.current) {
        return
      }

      // 3. Accumulate deltaY
      accumulatedDeltaRef.current += e.deltaY

      // Reset accumulation after 250ms of inactivity
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
      lockTimerRef.current = setTimeout(() => {
        if (!isNavigatingRef.current) {
          accumulatedDeltaRef.current = 0
        }
      }, 250)

      // 4. Check if threshold reached
      if (Math.abs(accumulatedDeltaRef.current) >= SCROLL_THRESHOLD) {
        const direction = accumulatedDeltaRef.current > 0 ? 1 : -1
        const sections = getSections()
        if (sections.length === 0) return

        const currentIndex = getCurrentSectionIndex()
        const targetIndex = currentIndex + direction

        if (targetIndex >= 0 && targetIndex < sections.length) {
          e.preventDefault()
          scrollToElement(sections[targetIndex])
        } else {
          // At the boundary, reset accumulator
          accumulatedDeltaRef.current = 0
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [enabled, getSections, getCurrentSectionIndex, scrollToElement])

  // Touch Swipe listener for Mobile
  useEffect(() => {
    if (!enabled) return

    const handleTouchStart = (e) => {
      const target = e.target
      // If touch is inside map canvas, let map handle 1-finger pan and 2-finger pinch
      if (target && target.closest('[data-map-viewport="true"]')) {
        touchStartYRef.current = null
        touchStartXRef.current = null
        return
      }

      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY
        touchStartXRef.current = e.touches[0].clientX
      }
    }

    const handleTouchEnd = (e) => {
      if (touchStartYRef.current === null || isNavigatingRef.current) return

      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartYRef.current - touchEndY
      const deltaX = (touchStartXRef.current ?? touchEndX) - touchEndX

      touchStartYRef.current = null
      touchStartXRef.current = null

      // Only trigger vertical section swipe if vertical distance is greater than horizontal
      if (Math.abs(deltaY) > TOUCH_THRESHOLD && Math.abs(deltaY) > Math.abs(deltaX)) {
        const direction = deltaY > 0 ? 1 : -1
        const sections = getSections()
        if (sections.length === 0) return

        const currentIndex = getCurrentSectionIndex()
        const targetIndex = currentIndex + direction

        if (targetIndex >= 0 && targetIndex < sections.length) {
          scrollToElement(sections[targetIndex])
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enabled, getSections, getCurrentSectionIndex, scrollToElement])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = getSections()
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section')
            if (sectionId && !isNavigatingRef.current) {
              setActiveSectionId(sectionId)
            }
          }
        })
      },
      {
        rootMargin: `-${headerHeight}px 0px -40% 0px`,
        threshold: 0.2,
      }
    )

    sections.forEach((sec) => observer.observe(sec))

    return () => {
      sections.forEach((sec) => observer.unobserve(sec))
    }
  }, [getSections, headerHeight])

  return {
    activeSectionId,
    scrollToSection,
  }
}
