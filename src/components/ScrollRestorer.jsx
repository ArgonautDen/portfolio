import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollRestorer() {
  const location = useLocation()
  const scrollTo = location.state?.scrollTo

  useEffect(() => {
    if (scrollTo) {
      // Элемент уже в DOM (keep-alive), таймаут только для плавности
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTo)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50) // было 80 — уменьшили, элемент уже есть
      return () => clearTimeout(timer)
    } else {
      // Скролл наверх при переходе на страницу проекта
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    // BFCache — перезапуск видео после возврата кнопкой браузера
    const handlePageShow = (e) => {
      if (e.persisted) {
        document.querySelectorAll('video').forEach(video => {
          video.play().catch(() => {})
        })
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [location.pathname, scrollTo])

  return null
}