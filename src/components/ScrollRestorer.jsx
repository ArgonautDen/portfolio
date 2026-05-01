import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollRestorer() {
  const location = useLocation()
  const scrollTo = location.state?.scrollTo

  useEffect(() => {
    if (scrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTo)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [location.pathname, scrollTo])

  return null
}