import { useCallback, useEffect, useState } from 'react'

/**
 * Tracks the global mouse / pointer position in viewport coordinates.
 * Returns the position relative to the center of the viewport
 * normalized to a -1…1 range on each axis.
 *
 * Returns {0, 0} when prefers-reduced-motion is active or on touch devices
 * where cursor tracking is meaningless.
 */
export function useMousePosition() {
  const [normalized, setNormalized] = useState({ x: 0, y: 0 })
  const [isReduced, setIsReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isReduced) return
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      setNormalized({ x: nx, y: ny })
    },
    [isReduced],
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return normalized
}
