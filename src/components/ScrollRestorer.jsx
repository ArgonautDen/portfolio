// ScrollRestorer.jsx
// Помести в src/components/ или прямо в App.jsx как внутреннюю функцию.
//
// Читает location.state.scrollTo после навигации и плавно скроллит
// к нужной секции. Работает с любым id на странице.

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollRestorer() {
  const location = useLocation()

  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return

    // Небольшая задержка — даём React отрендерить страницу
    const timer = setTimeout(() => {
      const el = document.getElementById(target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 80)

    return () => clearTimeout(timer)
  }, [location])

  return null
}
