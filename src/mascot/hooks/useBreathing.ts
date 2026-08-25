import { useEffect, useState } from 'react'

/** Maximum vertical breathing offset in SVG units */
const BREATH_AMPLITUDE = 2.5

/**
 * Smooth, sinusoidal breathing animation.
 *
 * - ~3.5 second period for relaxed, calm breathing
 * - Returns a Y offset value that oscillates sinusoidally
 * - Respects prefers-reduced-motion: returns 0
 *
 * This is intentionally CSS-animation-free so it composes
 * cleanly with the motion spring system on the parent.
 */
export function useBreathing(isReducedMotion: boolean) {
  const [offset, setOffset] = useState(0)
  const [start] = useState(() => performance.now())

  useEffect(() => {
    if (isReducedMotion) {
      setOffset(0)
      return
    }

    let frame: number
    const PERIOD = 3500 // ms

    const tick = (now: number) => {
      const elapsed = now - start
      const phase = (elapsed % PERIOD) / PERIOD
      // Smooth sine wave: -1 to 1
      const wave = Math.sin(phase * Math.PI * 2)
      setOffset(wave * BREATH_AMPLITUDE)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isReducedMotion, start])

  return offset
}
