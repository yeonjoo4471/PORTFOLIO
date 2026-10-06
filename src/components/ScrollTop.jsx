import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function ScrollTop() {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.state?.scrollTo

    if (targetId) {
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(targetId)

        target?.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        })
      })

      return () => {
        cancelAnimationFrame(frame)
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [location.key])

  return null
}