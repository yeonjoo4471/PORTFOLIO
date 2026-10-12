import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export default function ScrollTop() {
  const location = useLocation()
  const isInitialRun = useRef(true)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const navigationEntry = window.performance.getEntriesByType('navigation')[0]

    const isReload = isInitialRun.current && navigationEntry?.type === 'reload'

    const targetId = location.state?.scrollTo

    isInitialRun.current = false

    const clearScrollTarget = () => {
      const historyState = window.history.state ?? {}

      window.history.replaceState(
        {
          ...historyState,
          usr: null,
        },
        '',
        `${window.location.pathname}${window.location.search}`,
      )
    }

    if (isReload) {
      clearScrollTarget()

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      })

      return
    }

    if (targetId) {
      const timer = window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        })

        clearScrollTarget()
      }, 0)

      return () => window.clearTimeout(timer)
    }

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state, '', `${window.location.pathname}${window.location.search}`,
      )
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [
    location.key,
    location.pathname,
    location.state?.scrollTo,
  ])

  return null
}