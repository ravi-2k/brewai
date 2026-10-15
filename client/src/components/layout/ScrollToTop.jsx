import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router keeps the scroll position when changing pages; this resets it.
// (Skipped when the URL has a #hash so "Explore tools" anchor links still work.)
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
