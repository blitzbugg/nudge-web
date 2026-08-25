import { useEffect, useRef, useState } from 'react'

/**
 * Tracks how far through an element the user has scrolled.
 * Returns 0 (element top at viewport bottom) to 1 (element bottom at viewport top).
 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.max(0, Math.min(1, 1 - rect.bottom / (rect.height + vh)))
      setProgress(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { ref, progress }
}
