import { useCallback, useEffect, useRef, useState } from 'react'
import type { OtterMood } from '../types'
import { moodConfigs } from '../states/configs'
import { canTransition, randomAmbientMood } from '../states/machine'

const AMBIENT_DELAY_MIN = 5000
const AMBIENT_DELAY_MAX = 12000

/**
 * Manages the otter's emotional mood with automatic idle transitions.
 *
 * Architecture:
 * 1. The controller holds the current mood
 * 2. An ambient timer periodically triggers random transitions from idle
 * 3. External consumers can request explicit mood changes via `setMood`
 * 4. Non-idle moods auto-return to idle after a configurable duration
 *
 * Duration per mood comes from moodConfigs (configurable, not magic numbers).
 */
export function useMascotStateMachine(initialMood: OtterMood = 'idle') {
  const [mood, setMood] = useState<OtterMood>(initialMood)
  const moodRef = useRef(mood)
  const returnTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const ambientTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const isReducedRef = useRef(false)
  const isPausedRef = useRef(false)

  // Keep ref in sync
  moodRef.current = mood

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

  const clearTimers = useCallback(() => {
    clearTimeout(returnTimer.current)
    clearTimeout(ambientTimer.current)
  }, [])

  // Schedule auto-return to idle (for non-idle moods)
  const scheduleReturnToIdle = useCallback(
    (fromMood: OtterMood) => {
      // Use a base duration, slightly randomized for naturalness
      const base = moodConfigs[fromMood]
        ? 3000
        : 4000
      const jitter = Math.random() * 1500
      returnTimer.current = setTimeout(() => {
        if (!isPausedRef.current) {
          setMood('idle')
        }
      }, base + jitter)
    },
    [],
  )

  // Schedule next ambient event while idle
  const scheduleAmbient = useCallback(() => {
    const delay =
      AMBIENT_DELAY_MIN + Math.random() * (AMBIENT_DELAY_MAX - AMBIENT_DELAY_MIN)
    ambientTimer.current = setTimeout(() => {
      if (isPausedRef.current || isReducedRef.current) return
      const next = randomAmbientMood()
      if (canTransition('idle', next)) {
        setMood(next)
        scheduleReturnToIdle(next)
      } else {
        scheduleAmbient()
      }
    }, delay)
  }, [scheduleReturnToIdle])

  // React to mood changes
  useEffect(() => {
    clearTimers()

    if (isReducedRef.current) {
      setMood('idle')
      return
    }

    if (mood === 'idle') {
      scheduleAmbient()
    } else {
      scheduleReturnToIdle(mood)
    }

    return clearTimers
  }, [mood, clearTimers, scheduleAmbient, scheduleReturnToIdle])

  /** Request a specific mood — user intent overrides the machine */
  const setMoodExplicit = useCallback(
    (target: OtterMood) => {
      clearTimers()
      setMood(target)
    },
    [clearTimers],
  )

  /** Pause ambient transitions (useful when section is not visible) */
  const pause = useCallback(() => {
    isPausedRef.current = true
    clearTimers()
  }, [clearTimers])

  /** Resume ambient transitions */
  const resume = useCallback(() => {
    isPausedRef.current = false
    if (moodRef.current === 'idle') {
      scheduleAmbient()
    }
  }, [scheduleAmbient])

  return { mood, setMood: setMoodExplicit, pause, resume } as const
}
