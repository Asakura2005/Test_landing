'use client'

import React, { useEffect } from 'react'
import { LanguageProvider } from '../context/LanguageContext'
import { initPostHog } from '../services/posthog'
import ErrorBoundary from './ErrorBoundary'

export function Providers({ children }: { children: React.ReactNode }) {
  // Non-blocking deferred PostHog initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = (window as any).requestIdleCallback(() => initPostHog(), { timeout: 2000 })
        return () => (window as any).cancelIdleCallback(handle)
      } else {
        const timer = setTimeout(() => initPostHog(), 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  return (
    <LanguageProvider>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </LanguageProvider>
  )
}

export default Providers
