import { useEffect, useRef, useState, useCallback } from 'react'

export type ScrollState = 'IDLE' | 'RESISTING' | 'SPRING_BACK' | 'COMMITTING' | 'LOCKED'

export interface MagneticScrollOptions {
  headerHeight?: number
  enabled?: boolean
  resistance?: number
  commitThreshold?: number
  maxPullOffset?: number
  springDuration?: number
  commitDuration?: number
  lockDuration?: number
  inactivityTimeout?: number
}

// Cubic ease out for smooth commit transition
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)

// Soft ease out for spring back
const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t)

export function useMagneticSectionScroll(options: MagneticScrollOptions = {}) {
  const {
    headerHeight = 72,
    enabled = true,
    resistance = 0.35,
    commitThreshold = 65,
    maxPullOffset = 130,
    springDuration = 280,
    commitDuration = 480,
    lockDuration = 220,
    inactivityTimeout = 220,
  } = options

  const [activeSectionId, setActiveSectionId] = useState<string>('hero')
  const [scrollState, setScrollState] = useState<ScrollState>('IDLE')

  // Refs for tracking animation & physics state
  const scrollStateRef = useRef<ScrollState>('IDLE')
  const currentSectionIndexRef = useRef<number>(0)
  const pullOffsetRef = useRef<number>(0)
  const baseScrollYRef = useRef<number>(0)
  
  const animFrameIdRef = useRef<number | null>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null)

  const touchStartYRef = useRef<number | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const isTouchActiveRef = useRef<boolean>(false)

  const setInternalState = (state: ScrollState) => {
    scrollStateRef.current = state
    setScrollState(state)
  }

  // Get all registered sections in DOM order
  const getSections = useCallback((): HTMLElement[] => {
    return Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
  }, [])

  // Calculate precise top position of section i
  const getSectionTargetTop = useCallback((index: number, sections: HTMLElement[]): number => {
    if (index <= 0 || !sections[index]) return 0
    const el = sections[index]
    const rect = el.getBoundingClientRect()
    const absoluteTop = rect.top + window.scrollY
    return Math.max(0, Math.round(absoluteTop - headerHeight))
  }, [headerHeight])

  // Initialize and synchronize current section index with actual scroll position
  const syncCurrentIndex = useCallback(() => {
    const sections = getSections()
    if (sections.length === 0) return

    const currentScroll = window.scrollY
    let closestIndex = 0
    let minDiff = Infinity

    for (let i = 0; i < sections.length; i++) {
      const top = getSectionTargetTop(i, sections)
      const diff = Math.abs(currentScroll - top)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
      }
    }

    currentSectionIndexRef.current = closestIndex
    baseScrollYRef.current = getSectionTargetTop(closestIndex, sections)
    
    const secId = sections[closestIndex]?.getAttribute('data-section') || ''
    if (secId) setActiveSectionId(secId)
  }, [getSections, getSectionTargetTop])

  // Spring Back Animation (Smoothly restore to base section position)
  const startSpringBack = useCallback(() => {
    if (scrollStateRef.current === 'COMMITTING' || scrollStateRef.current === 'LOCKED') return

    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)

    setInternalState('SPRING_BACK')
    const startScroll = window.scrollY
    const targetScroll = baseScrollYRef.current
    const distance = targetScroll - startScroll

    if (Math.abs(distance) < 1) {
      window.scrollTo(0, targetScroll)
      pullOffsetRef.current = 0
      setInternalState('IDLE')
      return
    }

    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / springDuration)
      const eased = easeOutQuad(progress)

      const nextY = startScroll + distance * eased
      window.scrollTo(0, nextY)

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(animate)
      } else {
        window.scrollTo(0, targetScroll)
        pullOffsetRef.current = 0
        setInternalState('IDLE')
      }
    }

    animFrameIdRef.current = requestAnimationFrame(animate)
  }, [springDuration])

  // Continuous Commit Transition (Seamlessly glide to next/prev section from current position)
  const startCommitTransition = useCallback((direction: 1 | -1) => {
    const sections = getSections()
    if (sections.length === 0) {
      startSpringBack()
      return
    }

    const nextIndex = currentSectionIndexRef.current + direction

    // Boundary check
    if (nextIndex < 0 || nextIndex >= sections.length) {
      startSpringBack()
      return
    }

    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)

    setInternalState('COMMITTING')

    const startScroll = window.scrollY
    const targetScroll = getSectionTargetTop(nextIndex, sections)
    const distance = targetScroll - startScroll
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / commitDuration)
      const eased = easeOutCubic(progress)

      const nextY = startScroll + distance * eased
      window.scrollTo(0, nextY)

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(animate)
      } else {
        // Arrival at target section
        window.scrollTo(0, targetScroll)
        currentSectionIndexRef.current = nextIndex
        baseScrollYRef.current = targetScroll
        pullOffsetRef.current = 0

        const secId = sections[nextIndex]?.getAttribute('data-section') || ''
        if (secId) setActiveSectionId(secId)

        // Lock briefly to absorb leftover inertia
        setInternalState('LOCKED')
        if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
        lockTimerRef.current = setTimeout(() => {
          setInternalState('IDLE')
        }, lockDuration)
      }
    }

    animFrameIdRef.current = requestAnimationFrame(animate)
  }, [getSections, getSectionTargetTop, commitDuration, lockDuration, startSpringBack])

  // Mouse Wheel Event Listener
  useEffect(() => {
    if (!enabled) return

    // Sync on mount
    syncCurrentIndex()

    const handleWheel = (e: WheelEvent) => {
      // 1. MAP ISOLATION: If pointer is inside VietnamSpecialtyMap or canvas
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.closest('[data-map-viewport="true"]') ||
          target.closest('svg.mapSvg') ||
          target.closest('[data-consume-wheel="true"]'))
      ) {
        // Map consumes wheel for zoom -> spring back any pending pull
        if (scrollStateRef.current === 'RESISTING') {
          startSpringBack()
        }
        return
      }

      // 2. If locked or committing, block scroll to prevent multi-section skips
      if (scrollStateRef.current === 'LOCKED' || scrollStateRef.current === 'COMMITTING') {
        e.preventDefault()
        return
      }

      e.preventDefault()

      // If we were in SPRING_BACK, cancel it and resume user control seamlessly
      if (scrollStateRef.current === 'SPRING_BACK' && animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }

      const sections = getSections()
      const currentIndex = currentSectionIndexRef.current
      const isAtTopBoundary = currentIndex === 0 && e.deltaY < 0
      const isAtBottomBoundary = currentIndex === sections.length - 1 && e.deltaY > 0

      // Damping factor
      let damping = 1 - Math.min(0.8, Math.abs(pullOffsetRef.current) / (maxPullOffset * 1.5))
      if (isAtTopBoundary || isAtBottomBoundary) {
        damping *= 0.15 // Heavy rubber-band resistance at boundaries
      }

      const delta = e.deltaY * resistance * damping
      pullOffsetRef.current = Math.max(-maxPullOffset, Math.min(maxPullOffset, pullOffsetRef.current + delta))

      // Direct, glitch-free window scroll position during resistance
      const visualY = baseScrollYRef.current + pullOffsetRef.current
      window.scrollTo(0, Math.max(0, visualY))
      setInternalState('RESISTING')

      // Check if threshold reached immediately
      if (Math.abs(pullOffsetRef.current) >= commitThreshold) {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
        const direction = pullOffsetRef.current > 0 ? 1 : -1
        startCommitTransition(direction)
        return
      }

      // Inactivity debounce: if user stops scrolling before threshold, spring back
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = setTimeout(() => {
        if (scrollStateRef.current === 'RESISTING') {
          if (Math.abs(pullOffsetRef.current) >= commitThreshold) {
            const direction = pullOffsetRef.current > 0 ? 1 : -1
            startCommitTransition(direction)
          } else {
            startSpringBack()
          }
        }
      }, inactivityTimeout)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('resize', syncCurrentIndex)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', syncCurrentIndex)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
    }
  }, [
    enabled,
    resistance,
    maxPullOffset,
    commitThreshold,
    inactivityTimeout,
    getSections,
    syncCurrentIndex,
    startCommitTransition,
    startSpringBack,
  ])

  // Mobile Touch Swipe Listener
  useEffect(() => {
    if (!enabled) return

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.closest('[data-map-viewport="true"]') ||
          target.closest('svg.mapSvg') ||
          target.closest('[data-consume-wheel="true"]'))
      ) {
        touchStartYRef.current = null
        touchStartXRef.current = null
        isTouchActiveRef.current = false
        return
      }

      if (e.touches.length === 1 && scrollStateRef.current !== 'LOCKED' && scrollStateRef.current !== 'COMMITTING') {
        if (scrollStateRef.current === 'SPRING_BACK' && animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current)
        }
        touchStartYRef.current = e.touches[0].clientY
        touchStartXRef.current = e.touches[0].clientX
        isTouchActiveRef.current = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouchActiveRef.current || touchStartYRef.current === null) return

      if (scrollStateRef.current === 'LOCKED' || scrollStateRef.current === 'COMMITTING') {
        if (e.cancelable) e.preventDefault()
        return
      }

      const currentY = e.touches[0].clientY
      const currentX = e.touches[0].clientX
      const diffY = touchStartYRef.current - currentY
      const diffX = (touchStartXRef.current ?? currentX) - currentX

      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 8) {
        if (e.cancelable) e.preventDefault()

        const sections = getSections()
        const currentIndex = currentSectionIndexRef.current
        const isAtTopBoundary = currentIndex === 0 && diffY < 0
        const isAtBottomBoundary = currentIndex === sections.length - 1 && diffY > 0

        let touchDamping = 0.55 * (1 - Math.min(0.8, Math.abs(diffY) / (maxPullOffset * 1.5)))
        if (isAtTopBoundary || isAtBottomBoundary) {
          touchDamping *= 0.2
        }

        const offset = diffY * touchDamping
        pullOffsetRef.current = Math.max(-maxPullOffset, Math.min(maxPullOffset, offset))

        const visualY = baseScrollYRef.current + pullOffsetRef.current
        window.scrollTo(0, Math.max(0, visualY))
        setInternalState('RESISTING')
      }
    }

    const handleTouchEnd = () => {
      if (!isTouchActiveRef.current) return
      isTouchActiveRef.current = false
      touchStartYRef.current = null
      touchStartXRef.current = null

      if (scrollStateRef.current === 'RESISTING') {
        if (Math.abs(pullOffsetRef.current) >= commitThreshold * 0.75) {
          const direction = pullOffsetRef.current > 0 ? 1 : -1
          startCommitTransition(direction)
        } else {
          startSpringBack()
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [
    enabled,
    maxPullOffset,
    commitThreshold,
    getSections,
    startCommitTransition,
    startSpringBack,
  ])

  // Programmatic scroll helper
  const scrollToSection = useCallback((sectionId: string) => {
    const sections = getSections()
    const targetIdx = sections.findIndex(s => s.getAttribute('data-section') === sectionId)
    if (targetIdx !== -1) {
      const targetTop = getSectionTargetTop(targetIdx, sections)
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
      currentSectionIndexRef.current = targetIdx
      baseScrollYRef.current = targetTop
      setActiveSectionId(sectionId)
    }
  }, [getSections, getSectionTargetTop])

  return {
    activeSectionId,
    scrollState,
    scrollToSection,
  }
}
