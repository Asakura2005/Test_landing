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
    lockDuration = 600,
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
        '[data-section="hero"], [data-section="featured-products"], [data-section="specialty-map"], [data-section="about-haq"], [data-section="global-cta"]'
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

  // Calculate target top for a snap section dynamically from DOM
  const getSectionTargetTop = useCallback(
    (index: number, sections: HTMLElement[], cachedHeaderHeight?: number): number => {
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
  // Uses RANGE-BASED detection: you're in section N when scrollY is between tops[N] and tops[N+1]
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

    // Range-based: find which section range [tops[i], tops[i+1]) contains currentScroll
    let foundIndex = 0
    for (let i = tops.length - 1; i >= 0; i--) {
      if (currentScroll >= tops[i] - 15) {
        foundIndex = i
        break
      }
    }

    currentSectionIndexRef.current = foundIndex
    baseScrollYRef.current = tops[foundIndex]

    const secId = cachedSecIdsRef.current[foundIndex] || ''
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

          pullOffsetRef.current = 0
          setInternalState('LOCKED')
          if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
          lockTimerRef.current = setTimeout(() => {
            pullOffsetRef.current = 0
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
    let resizeObserver: ResizeObserver | null = null

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
      const scrollablePanel = findScrollableParent(target)
      if (scrollablePanel) {
        const scrollTop = scrollablePanel.scrollTop
        const clientHeight = scrollablePanel.clientHeight
        const scrollHeight = scrollablePanel.scrollHeight

        const atTop = scrollTop <= 1.5
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1.5

        const isScrollingDown = e.deltaY > 0
        const isScrollingUp = e.deltaY < 0

        if ((isScrollingDown && !atBottom) || (isScrollingUp && !atTop)) {
          if (scrollStateRef.current === 'RESISTING') {
            startSpringBack()
          }
          return
        }
      }

      // 2. FOOTER NATURAL SCROLL ZONE:
      if (currentY >= footerTop - 15) {
        if (e.deltaY > 0 || currentY > footerTop + 10) {
          if (scrollStateRef.current !== 'IDLE') {
            setInternalState('IDLE')
          }
          pullOffsetRef.current = 0
          return
        }

        if (e.deltaY < 0) {
          e.preventDefault()

          if (scrollStateRef.current === 'LOCKED' || scrollStateRef.current === 'COMMITTING') {
            pullOffsetRef.current = 0
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
            startCommitTransition(sections.length - 1)
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

      // 3. SNAP SECTIONS ZONE
      if (scrollStateRef.current === 'LOCKED' || scrollStateRef.current === 'COMMITTING') {
        e.preventDefault()
        pullOffsetRef.current = 0
        return
      }

      const currentIndex = currentSectionIndexRef.current
      const currentSection = sections[currentIndex]

      // ──── TALL SECTION HANDLING ────
      // If current section is taller than viewport, allow free scroll within it.
      // Only engage magnetic snap at section boundaries (top/bottom).
      if (currentSection) {
        const sectionRect = currentSection.getBoundingClientRect()
        const hHeight = getHeaderHeight()
        const viewportH = window.innerHeight - hHeight
        const sectionH = currentSection.offsetHeight

        if (sectionH > viewportH + 50) {
          // Section taller than viewport → allow internal scroll
          const sectionTop = sectionRect.top + window.scrollY - hHeight
          const sectionBottom = sectionTop + sectionH
          const atSectionTop = currentY <= sectionTop + 5
          const atSectionBottom = currentY + viewportH >= sectionBottom - 5

          const scrollingDown = e.deltaY > 0
          const scrollingUp = e.deltaY < 0

          // Can still scroll inside section → let it scroll freely
          if ((scrollingDown && !atSectionBottom) || (scrollingUp && !atSectionTop)) {
            if (scrollStateRef.current === 'RESISTING') {
              startSpringBack()
            }
            return // Native free scroll inside tall section
          }

          // At boundary → engage magnetic snap
          if ((scrollingDown && atSectionBottom) || (scrollingUp && atSectionTop)) {
            e.preventDefault()

            if (scrollStateRef.current === 'SPRING_BACK' && animFrameIdRef.current) {
              cancelAnimationFrame(animFrameIdRef.current)
            }

            baseScrollYRef.current = scrollingDown
              ? sectionBottom - viewportH
              : sectionTop

            const isAtTopBoundary = currentIndex === 0 && scrollingUp
            let damping = 1 - Math.min(0.8, Math.abs(pullOffsetRef.current) / (maxPullOffset * 1.5))
            if (isAtTopBoundary) damping *= 0.15

            const delta = e.deltaY * resistance * damping
            pullOffsetRef.current = Math.max(-maxPullOffset, Math.min(maxPullOffset, pullOffsetRef.current + delta))

            const visualY = baseScrollYRef.current + pullOffsetRef.current
            window.scrollTo(0, Math.max(0, visualY))
            setInternalState('RESISTING')

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
            return
          }
        }
      }

      // ──── STANDARD 100VH SECTION SNAP (original logic) ────
      e.preventDefault()

      if (scrollStateRef.current === 'SPRING_BACK' && animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }

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

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          recalculatePositions()
        })
        resizeObserver.observe(document.body)
      }
    }

    const detachDesktopListeners = () => {
      if (!isListening) return
      isListening = false
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
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
