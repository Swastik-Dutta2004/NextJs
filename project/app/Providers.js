'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'

export default function Providers({ children }) {
  const pathname = usePathname()

  // Initialize PostHog once
  useEffect(() => {
    posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_KEY,
      {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      }
    )
  }, [])

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      posthog.capture('$pageview')
    }
  }, [pathname])

  return children
}
