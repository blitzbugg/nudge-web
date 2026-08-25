import { useCallback, useEffect, useRef, useState } from 'react'

const BLINK_DURATION = 180 // ms
const BLINK_INTERVAL_MIN = 2500
const BLINK_INTERVAL_MAX = 6000

/**
 * Natural, organic blinking.
 *
 * - Randomized intervals (2.5–6 seconds)
 * - 180ms blink duration
 * - Triangle curve: 0→1→0
 * - Respects prefers-reduced-motion
 *
 * Uses refs for scheduling to avoid circular dependency issues.
 */
export function useBlinking(isReducedMotion: boolean) {
  const [blinkProgress, setBlinkProgress] = useState(0)
  const frameRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const isReducedRef = useRef(isReducedMotion)
  isReducedRef.current = isReducedMotion

  const runBlink = useCallback(() => {
    if (isReducedRef.current) return

    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / BLINK_DURATION, 1)

      // Triangle curve: 0 → 1 → 0
      const progress = t < 0.5 ? t * 2 : 2 - t * 2
      setBlinkProgress(progress)

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setBlinkProgress(0)
        // Schedule next blink
        const delay =
          BLINK_INTERVAL_MIN +
          Math.random() * (BLINK_INTERVAL_MAX - BLINK_INTERVAL_MIN)
        timerRef.current = setTimeout(runBlink, delay)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (isReducedMotion) {
      setBlinkProgress(0)
      clearTimeout(timerRef.current)
      cancelAnimationFrame(frameRef.current)
      return
    }

    // Start first blink after a short delay
    const delay =
      BLINK_INTERVAL_MIN +
      Math.random() * (BLINK_INTERVAL_MAX - BLINK_INTERVAL_MIN)
    timerRef.current = setTimeout(runBlink, delay)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(frameRef.current)
    }
  }, [isReducedMotion, runBlink])

  return blinkProgress
}
