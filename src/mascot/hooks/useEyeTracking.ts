import { useEffect, useRef, useState } from 'react'

const MAX_OFFSET = 5
const STIFFNESS = 120
const DAMPING = 14
const MASS = 0.6

/**
 * Spring-animated eye tracking from cursor position.
 *
 * Runs a single rAF loop that reads the latest mouse target from a ref
 * and simulates spring physics. Produces smooth, organic pupil offsets.
 *
 * Respects prefers-reduced-motion: returns {0, 0}.
 */
export function useEyeTracking(trackCursor: boolean) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const stateRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const isReducedRef = useRef(false)

  // Track reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    isReducedRef.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      isReducedRef.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Mouse listener
  useEffect(() => {
    if (!trackCursor) return

    const onMove = (e: MouseEvent) => {
      if (isReducedRef.current) return
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [trackCursor])

  // Spring physics loop
  useEffect(() => {
    if (!trackCursor || isReducedRef.current) return

    let frame: number
    const dt = 0.016

    const tick = () => {
      const s = stateRef.current
      const t = targetRef.current

      // X
      const fx = -STIFFNESS * (s.x - t.x)
      s.vx += (fx - DAMPING * s.vx) / MASS * dt
      s.x += s.vx * dt

      // Y
      const fy = -STIFFNESS * (s.y - t.y)
      s.vy += (fy - DAMPING * s.vy) / MASS * dt
      s.y += s.vy * dt

      setEyeOffset({
        x: Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, s.x * MAX_OFFSET)),
        y: Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, s.y * MAX_OFFSET)),
      })

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [trackCursor])

  return eyeOffset
}
