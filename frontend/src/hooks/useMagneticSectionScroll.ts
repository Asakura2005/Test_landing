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
  desktopBreakpoint?: number // default 1024px
}

// Easing functions
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t)

export function useMagneticSectionScroll(options: MagneticScrollOptions = {}) {
  const {
    headerHeight = 72,
    enabled = true,
    resistance = 0.35,
    commitThreshold = 60,
    maxPullOffset = 120,
    springDuration = 260,
    commitDuration = 480,
    lockDuration = 220,
    inactivityTimeout = 200,
    desktopBreakpoint = 1024,
  } = options

  const [activeSectionId, setActiveSectionId] = useState<string>('hero')
  const [scrollState, setScrollState] = useState<ScrollState>('IDLE')

  const scrollStateRef = useRef<ScrollState>('IDLE')
  const currentSectionIndexRef = useRef<number>(0)
  const pullOffsetRef = useRef<number>(0)
  const baseScrollYRef = useRef<number>(0)

  const animFrameIdRef = useRef<number | null>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null)

  const setInternalState = (state: ScrollState) => {
    scrollStateRef.current = state
    setScrollState(state)
  }

  // Query all 6 100vh snap sections: Hero, Specialty Map, Brand Statement, Quick Stats, Brand Visual, CtaBanner
  const getSnapSections = useCallback((): HTMLElement[] => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-section="hero"], [data-section="specialty-map"], [data-section="brand-statement"], [data-section="quick-stats"], [data-section="brand-visual"], [data-section="cta-banner"]'
      )
    )
  }, [])

  // Calculate target top for a snap section
  const getSectionTargetTop = useCallback(
    (index: number, sections: HTMLElement[]): number => {
      if (index <= 0 || !sections[index]) return 0
      const el = sections[index]
      const rect = el.getBoundingClientRect()
      const absoluteTop = rect.top + window.scrollY
      return Math.max(0, Math.round(absoluteTop - headerHeight))
    },
    [headerHeight]
  )

  // Get top position of Footer
  const getFooterTop = useCallback((): number => {
    const footerEl = document.querySelector<HTMLElement>('[data-section="footer"]')
    if (footerEl) {
      const rect = footerEl.getBoundingClientRect()
      return Math.max(0, Math.round(rect.top + window.scrollY - headerHeight))
    }
    const snapSections = getSnapSections()
    const lastSnap = snapSections[snapSections.length - 1]
    if (lastSnap) {
      const rect = lastSnap.getBoundingClientRect()
      return Math.max(0, Math.round(rect.top + window.scrollY + lastSnap.offsetHeight - headerHeight))
    }
    return 0
  }, [headerHeight, getSnapSections])

  // Synchronize current section index with actual scroll position
  const syncCurrentIndex = useCallback(() => {
    const sections = getSnapSections()
    if (sections.length === 0) return

    const currentScroll = window.scrollY
    const footerTop = getFooterTop()

    // If scroll is in the Footer zone
    if (currentScroll >= footerTop - 15) {
      currentSectionIndexRef.current = sections.length // Index = sections.length represents Footer
      baseScrollYRef.current = footerTop
      setActiveSectionId('footer')
      return
    }

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
  }, [getSnapSections, getSectionTargetTop, getFooterTop])

  // Spring back animation
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

  // Transition to specific snap target index
  const startCommitTransition = useCallback(
    (targetIndex: number) => {
      const sections = getSnapSections()
      const footerTop = getFooterTop()

      if (targetIndex < 0 || targetIndex > sections.length) {
        startSpringBack()
        return
      }

      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)

      setInternalState('COMMITTING')

      const startScroll = window.scrollY
      let targetScroll = 0
      if (targetIndex === sections.length) {
        targetScroll = footerTop
      } else {
        targetScroll = getSectionTargetTop(targetIndex, sections)
      }

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
          window.scrollTo(0, targetScroll)
          currentSectionIndexRef.current = targetIndex
          baseScrollYRef.current = targetScroll
          pullOffsetRef.current = 0

          const secId =
            targetIndex === sections.length
              ? 'footer'
              : sections[targetIndex]?.getAttribute('data-section') || ''
          if (secId) setActiveSectionId(secId)

          setInternalState('LOCKED')
          if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
          lockTimerRef.current = setTimeout(() => {
            setInternalState('IDLE')
          }, lockDuration)
        }
      }

      animFrameIdRef.current = requestAnimationFrame(animate)
    },
    [getSnapSections, getSectionTargetTop, getFooterTop, commitDuration, lockDuration, startSpringBack]
  )

  useEffect(() => {
    if (!enabled) return

    // Media query for desktop viewport isolation (>= 1024px)
    const mediaQuery = window.matchMedia(`(min-width: ${desktopBreakpoint}px)`)

    let isListening = false

    const handleWheel = (e: WheelEvent) => {
      if (!mediaQuery.matches) return

      const sections = getSnapSections()
      if (sections.length === 0) return

      const footerTop = getFooterTop()
      const currentY = window.scrollY

      // 1. MAP ISOLATION: Map zoom consumes wheel exclusively
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.closest('[data-map-viewport="true"]') ||
          target.closest('svg.mapSvg') ||
          target.closest('[data-consume-wheel="true"]'))
      ) {
        if (scrollStateRef.current === 'RESISTING') {
          startSpringBack()
        }
        return
      }

      // 2. FOOTER NATURAL SCROLL ZONE:
      if (currentY >= footerTop - 15) {
        // If scrolling DOWN, or scrolling UP inside the footer:
        if (e.deltaY > 0 || currentY > footerTop + 10) {
          // 100% Native free scroll inside Footer
          if (scrollStateRef.current !== 'IDLE') {
            setInternalState('IDLE')
          }
          pullOffsetRef.current = 0
          return
        }

        // If user is at top edge of Footer (currentY <= footerTop + 10) and scrolls UP:
        if (e.deltaY < 0) {
          e.preventDefault()

          if (scrollStateRef.current === 'LOCKED' || scrollStateRef.current === 'COMMITTING') {
            return
          }

          if (scrollStateRef.current === 'SPRING_BACK' && animFrameIdRef.current) {
            cancelAnimationFrame(animFrameIdRef.current)
          }

          baseScrollYRef.current = footerTop
          const delta = e.deltaY * resistance * 0.8
          pullOffsetRef.current = Math.max(-maxPullOffset, Math.min(0, pullOffsetRef.current + delta))

          const visualY = baseScrollYRef.current + pullOffsetRef.current
          window.scrollTo(0, Math.max(0, visualY))
          setInternalState('RESISTING')

          if (Math.abs(pullOffsetRef.current) >= commitThreshold) {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
            startCommitTransition(sections.length - 1) // Commit back up to CtaBanner (Index 5)
            return
          }

          if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
          inactivityTimerRef.current = setTimeout(() => {
            if (scrollStateRef.current === 'RESISTING') {
              if (Math.abs(pullOffsetRef.current) >= commitThreshold) {
                startCommitTransition(sections.length - 1)
              } else {
                startSpringBack()
              }
            }
          }, inactivityTimeout)
          return
        }
      }

      // 3. 100VH SECTIONS ZONE (HERO -> MAP -> GIỚI THIỆU -> NĂNG LỰC -> TẦM NHÌN QUỐC TẾ -> CTA BANNER)
      if (scrollStateRef.current === 'LOCKED' || scrollStateRef.current === 'COMMITTING') {
        e.preventDefault()
        return
      }

      e.preventDefault()

      if (scrollStateRef.current === 'SPRING_BACK' && animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }

      const currentIndex = currentSectionIndexRef.current
      if (currentIndex < sections.length) {
        baseScrollYRef.current = getSectionTargetTop(currentIndex, sections)
      } else {
        baseScrollYRef.current = footerTop
      }

      const isAtTopBoundary = currentIndex === 0 && e.deltaY < 0
      let damping = 1 - Math.min(0.8, Math.abs(pullOffsetRef.current) / (maxPullOffset * 1.5))
      if (isAtTopBoundary) damping *= 0.15

      const delta = e.deltaY * resistance * damping
      pullOffsetRef.current = Math.max(-maxPullOffset, Math.min(maxPullOffset, pullOffsetRef.current + delta))

      const visualY = baseScrollYRef.current + pullOffsetRef.current
      window.scrollTo(0, Math.max(0, visualY))
      setInternalState('RESISTING')

      // Check threshold
      if (Math.abs(pullOffsetRef.current) >= commitThreshold) {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
        const direction = pullOffsetRef.current > 0 ? 1 : -1
        const nextIndex = currentIndex + direction

        if (nextIndex >= 0 && nextIndex <= sections.length) {
          startCommitTransition(nextIndex)
        } else {
          startSpringBack()
        }
        return
      }

      // Inactivity debounce
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = setTimeout(() => {
        if (scrollStateRef.current === 'RESISTING') {
          if (Math.abs(pullOffsetRef.current) >= commitThreshold) {
            const direction = pullOffsetRef.current > 0 ? 1 : -1
            const nextIndex = currentIndex + direction
            if (nextIndex >= 0 && nextIndex <= sections.length) {
              startCommitTransition(nextIndex)
            } else {
              startSpringBack()
            }
          } else {
            startSpringBack()
          }
        }
      }, inactivityTimeout)
    }

    const handleScroll = () => {
      if (scrollStateRef.current === 'IDLE' && mediaQuery.matches) {
        syncCurrentIndex()
      }
    }

    const attachDesktopListeners = () => {
      if (isListening) return
      isListening = true
      syncCurrentIndex()
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', syncCurrentIndex)
    }

    const detachDesktopListeners = () => {
      if (!isListening) return
      isListening = false
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', syncCurrentIndex)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
      pullOffsetRef.current = 0
      setInternalState('IDLE')
    }

    // Dynamic breakpoint watcher
    const handleBreakpointChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        attachDesktopListeners()
      } else {
        detachDesktopListeners()
      }
    }

    // Initial check
    if (mediaQuery.matches) {
      attachDesktopListeners()
    }

    // Modern and legacy event listener support for matchMedia
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleBreakpointChange)
    } else {
      mediaQuery.addListener(handleBreakpointChange)
    }

    return () => {
      detachDesktopListeners()
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleBreakpointChange)
      } else {
        mediaQuery.removeListener(handleBreakpointChange)
      }
    }
  }, [
    enabled,
    desktopBreakpoint,
    resistance,
    maxPullOffset,
    commitThreshold,
    inactivityTimeout,
    getSnapSections,
    getSectionTargetTop,
    getFooterTop,
    syncCurrentIndex,
    startCommitTransition,
    startSpringBack,
  ])

  return {
    activeSectionId,
    scrollState,
  }
}
