import { useEffect, useRef, useState, useCallback } from 'react'

export type ScrollState = 'IDLE' | 'RESISTING' | 'SPRING_BACK' | 'COMMITTING' | 'LOCKED'

export interface MagneticScrollOptions {
  headerHeight?: number | (() => number)
  headerSelector?: string
  enabled?: boolean
  resistance?: number
  commitThreshold?: number
  maxPullOffset?: number
  springDuration?: number
  commitDuration?: number
  lockDuration?: number
  inactivityTimeout?: number
  desktopBreakpoint?: number // default 1024px
  sectionSelector?: string
  footerSelector?: string
}

// Easing functions
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t)

export function useMagneticSectionScroll(options: MagneticScrollOptions = {}) {
  const {
    headerHeight = 72,
    headerSelector,
    enabled = true,
    resistance = 0.35,
    commitThreshold = 60,
    maxPullOffset = 120,
    springDuration = 260,
    commitDuration = 480,
    lockDuration = 220,
    inactivityTimeout = 200,
    desktopBreakpoint = 1024,
    sectionSelector,
    footerSelector = '[data-section="footer"]',
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
  const scrollRafIdRef = useRef<number | null>(null)

  const activeSectionIdRef = useRef<string>('hero')
  const cachedTopsRef = useRef<number[]>([])
  const cachedFooterTopRef = useRef<number>(0)
  const cachedSecIdsRef = useRef<string[]>([])

  const setInternalState = (state: ScrollState) => {
    scrollStateRef.current = state
    setScrollState(state)
  }

  const setInternalActiveSectionId = (id: string) => {
    if (id && activeSectionIdRef.current !== id) {
      activeSectionIdRef.current = id
      setActiveSectionId(id)
    }
  }

  // Dynamic header height calculation
  const getHeaderHeight = useCallback((): number => {
    if (typeof headerHeight === 'function') {
      return headerHeight()
    }
    if (headerSelector) {
      const els = document.querySelectorAll<HTMLElement>(headerSelector)
      if (els.length > 0) {
        let total = 0
        els.forEach((el) => {
          total += el.offsetHeight
        })
        return total
      }
    }
    return typeof headerHeight === 'number' ? headerHeight : 72
  }, [headerHeight, headerSelector])

  // Query snap sections: customizable via sectionSelector, or default 6 home sections
  const getSnapSections = useCallback((): HTMLElement[] => {
    if (sectionSelector) {
      return Array.from(document.querySelectorAll<HTMLElement>(sectionSelector))
    }
    return Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-section="hero"], [data-section="specialty-map"], [data-section="brand-statement"], [data-section="quick-stats"], [data-section="brand-visual"], [data-section="cta-banner"]'
      )
    )
  }, [sectionSelector])

  // Measure and cache geometric section positions once to eliminate forced layout thrashing
  const recalculatePositions = useCallback(() => {
    const sections = getSnapSections()
    if (sections.length === 0) return

    const hHeight = getHeaderHeight()
    const tops: number[] = []
    const ids: string[] = []

    for (let i = 0; i < sections.length; i++) {
      if (i === 0) {
        tops.push(0)
      } else {
        const el = sections[i]
        const rect = el.getBoundingClientRect()
        tops.push(Math.max(0, Math.round(rect.top + window.scrollY - hHeight)))
      }
      const id = sections[i]?.getAttribute('data-section') || sections[i]?.id || ''
      ids.push(id)
    }

    cachedTopsRef.current = tops
    cachedSecIdsRef.current = ids

    const footerEl = document.querySelector<HTMLElement>(footerSelector)
    if (footerEl) {
      const rect = footerEl.getBoundingClientRect()
      cachedFooterTopRef.current = Math.max(0, Math.round(rect.top + window.scrollY - hHeight))
    } else {
      const lastSnap = sections[sections.length - 1]
      if (lastSnap) {
        const rect = lastSnap.getBoundingClientRect()
        cachedFooterTopRef.current = Math.max(
          0,
          Math.round(rect.top + window.scrollY + lastSnap.offsetHeight - hHeight)
        )
      } else {
        cachedFooterTopRef.current = 0
      }
    }
  }, [getSnapSections, getHeaderHeight, footerSelector])

  // Calculate target top for a snap section
  const getSectionTargetTop = useCallback(
    (index: number, sections: HTMLElement[], cachedHeaderHeight?: number): number => {
      if (cachedTopsRef.current.length > index && cachedTopsRef.current[index] !== undefined) {
        return cachedTopsRef.current[index]
      }
      const hHeight = cachedHeaderHeight !== undefined ? cachedHeaderHeight : getHeaderHeight()
      if (index <= 0 || !sections[index]) return 0
      const el = sections[index]
      const rect = el.getBoundingClientRect()
      const absoluteTop = rect.top + window.scrollY
      return Math.max(0, Math.round(absoluteTop - hHeight))
    },
    [getHeaderHeight]
  )

  // Get top position of Footer
  const getFooterTop = useCallback(
    (cachedHeaderHeight?: number): number => {
      if (cachedFooterTopRef.current > 0) {
        return cachedFooterTopRef.current
      }
      const hHeight = cachedHeaderHeight !== undefined ? cachedHeaderHeight : getHeaderHeight()
      const footerEl = document.querySelector<HTMLElement>(footerSelector)
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect()
        return Math.max(0, Math.round(rect.top + window.scrollY - hHeight))
      }
      const snapSections = getSnapSections()
      const lastSnap = snapSections[snapSections.length - 1]
      if (lastSnap) {
        const rect = lastSnap.getBoundingClientRect()
        return Math.max(0, Math.round(rect.top + window.scrollY + lastSnap.offsetHeight - hHeight))
      }
      return 0
    },
    [getHeaderHeight, footerSelector, getSnapSections]
  )

  // Synchronize current section index with actual scroll position
  const syncCurrentIndex = useCallback(() => {
    if (cachedTopsRef.current.length === 0) {
      recalculatePositions()
    }
    const tops = cachedTopsRef.current
    if (tops.length === 0) return

    const currentScroll = window.scrollY
    const footerTop = cachedFooterTopRef.current

    // If scroll is in the Footer zone
    if (currentScroll >= footerTop - 15) {
      currentSectionIndexRef.current = tops.length // Index = tops.length represents Footer
      baseScrollYRef.current = footerTop
      setInternalActiveSectionId('footer')
      return
    }

    let closestIndex = 0
    let minDiff = Infinity
    let closestTop = 0

    for (let i = 0; i < tops.length; i++) {
      const diff = Math.abs(currentScroll - tops[i])
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
        closestTop = tops[i]
      }
    }

    currentSectionIndexRef.current = closestIndex
    baseScrollYRef.current = closestTop

    const secId = cachedSecIdsRef.current[closestIndex] || ''
    if (secId) setInternalActiveSectionId(secId)
  }, [recalculatePositions])

  // RAF-throttled synchronize to prevent forced reflow and layout thrashing
  const scheduleSyncCurrentIndex = useCallback(() => {
    if (scrollRafIdRef.current !== null) return
    scrollRafIdRef.current = requestAnimationFrame(() => {
      scrollRafIdRef.current = null
      syncCurrentIndex()
    })
  }, [syncCurrentIndex])

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
              : sections[targetIndex]?.getAttribute('data-section') ||
                sections[targetIndex]?.id ||
                ''
          if (secId) setInternalActiveSectionId(secId)

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

/**
 * Helper: Detects whether a DOM node is inside a scrollable child panel (e.g. Product Detail Panel / Modal / Card)
 * that currently possesses scrollable content (scrollHeight > clientHeight + 1).
 * Uses fast element matching instead of walking ancestor chain with window.getComputedStyle.
 */
function findScrollableParent(target: HTMLElement | null): HTMLElement | null {
  if (!target) return null
  const candidate = target.closest<HTMLElement>('[data-scrollable-panel], .overflow-y-auto, .overflow-auto')
  if (candidate && candidate.scrollHeight > candidate.clientHeight + 1) {
    return candidate
  }
  return null
}

    const handleWheel = (e: WheelEvent) => {
      if (!mediaQuery.matches) return

      const sections = getSnapSections()
      if (sections.length === 0) return

      const footerTop = getFooterTop()
      const currentY = window.scrollY

      const target = e.target as HTMLElement | null

      // 1. MAP ISOLATION: Map zoom consumes wheel exclusively when directly over map SVG / canvas
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

      // 2. BOUNDARY-AWARE PRODUCT DETAIL / INTERNAL SCROLLABLE PANEL HANDLING:
      // Product Detail panel/modal has its own internal scrollbar.
      // - If panel can continue scrolling in the wheel direction -> allow native scroll (do NOT preventDefault)
      // - If panel reaches boundary (top on wheel UP, bottom on wheel DOWN) or has no overflow:
      //   -> allow wheel event to propagate to Magnetic Section Scroll
      const scrollablePanel = findScrollableParent(target)
      if (scrollablePanel) {
        const scrollTop = scrollablePanel.scrollTop
        const clientHeight = scrollablePanel.clientHeight
        const scrollHeight = scrollablePanel.scrollHeight

        // Tolerance for subpixel floating point values
        const atTop = scrollTop <= 1.5
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1.5

        const isScrollingDown = e.deltaY > 0
        const isScrollingUp = e.deltaY < 0

        if ((isScrollingDown && !atBottom) || (isScrollingUp && !atTop)) {
          // Panel CAN continue scrolling internally in this direction
          if (scrollStateRef.current === 'RESISTING') {
            startSpringBack()
          }
          return // Consume wheel inside panel, DO NOT engage Magnetic Section Scroll
        }

        // When atTop (wheel UP) or atBottom (wheel DOWN), do NOT return!
        // Release wheel control so Magnetic Section Scroll takes over seamlessly.
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
        scheduleSyncCurrentIndex()
      }
    }

    const handleResize = () => {
      if (mediaQuery.matches) {
        recalculatePositions()
        scheduleSyncCurrentIndex()
      }
    }

    const attachDesktopListeners = () => {
      if (isListening) return
      isListening = true
      recalculatePositions()
      syncCurrentIndex()
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
      window.addEventListener('load', handleResize)
    }

    const detachDesktopListeners = () => {
      if (!isListening) return
      isListening = false
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
      if (scrollRafIdRef.current !== null) {
        cancelAnimationFrame(scrollRafIdRef.current)
        scrollRafIdRef.current = null
      }
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
      if (scrollRafIdRef.current !== null) {
        cancelAnimationFrame(scrollRafIdRef.current)
        scrollRafIdRef.current = null
      }
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
    recalculatePositions,
    syncCurrentIndex,
    scheduleSyncCurrentIndex,
    startCommitTransition,
    startSpringBack,
  ])

  // Programmatic smooth commit by numerical index
  const scrollToIndex = useCallback(
    (index: number) => {
      const sections = getSnapSections()
      if (index < 0 || index > sections.length) return

      if (window.matchMedia(`(min-width: ${desktopBreakpoint}px)`).matches) {
        startCommitTransition(index)
      } else {
        let targetScroll = 0
        if (index === sections.length) {
          targetScroll = getFooterTop()
        } else {
          targetScroll = getSectionTargetTop(index, sections)
        }
        window.scrollTo({ top: targetScroll, behavior: 'smooth' })
      }
    },
    [getSnapSections, desktopBreakpoint, startCommitTransition, getFooterTop, getSectionTargetTop]
  )

  // Programmatic smooth commit by section ID
  const scrollToSectionId = useCallback(
    (id: string) => {
      const sections = getSnapSections()
      const foundIdx = sections.findIndex(
        (el) => el.getAttribute('data-section') === id || el.id === id
      )
      if (foundIdx !== -1) {
        scrollToIndex(foundIdx)
      } else if (id === 'footer') {
        scrollToIndex(sections.length)
      }
    },
    [getSnapSections, scrollToIndex]
  )

  return {
    activeSectionId,
    scrollState,
    scrollToIndex,
    scrollToSectionId,
  }
}
