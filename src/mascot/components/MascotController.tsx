import { useMemo } from 'react'
import { useBlinking } from '../hooks/useBlinking'
import { useBreathing } from '../hooks/useBreathing'
import { useEyeTracking } from '../hooks/useEyeTracking'
import { useMascotStateMachine } from '../hooks/useMascotStateMachine'
import { OtterSvg } from './OtterSvg'
import type { MascotControllerProps } from '../types'

/**
 * MascotController — the public API for a living otter.
 *
 * Composes:
 * - useEyeTracking → spring-animated pupil offsets from cursor
 * - useBlinking → organic randomized blink cycle
 * - useBreathing → sinusoidal breathing offset
 * - useMascotStateMachine → emotional mood management
 * - OtterSvg → the rendered character
 *
 * Usage:
 *   <MascotController />
 *   <MascotController mood="happy" size={240} />
 *   <MascotController trackCursor={false} />
 */
export function MascotController({
  mood: moodProp,
  size = 320,
  className,
  trackCursor = true,
  eyeOffset: eyeOffsetProp,
  breathingOffset: breathingOffsetProp,
  blinkProgress: blinkProgressProp,
}: MascotControllerProps) {
  // ── Reduced motion detection ──
  const isReduced = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // ── Animation hooks (only when not overridden by props) ──
  const eyeOffset = useEyeTracking(trackCursor && !isReduced)
  const blinkProgress = useBlinking(isReduced)
  const breathingOffset = useBreathing(isReduced)

  // ── State machine (only when mood is not externally controlled) ──
  const { mood: autoMood } = useMascotStateMachine(
    moodProp ?? 'idle',
  )

  const mood = moodProp ?? autoMood

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <OtterSvg
        mood={mood}
        eyeOffset={eyeOffsetProp ?? eyeOffset}
        breathingOffset={breathingOffsetProp ?? breathingOffset}
        blinkProgress={blinkProgressProp ?? blinkProgress}
        size={size}
      />
    </div>
  )
}

// Re-export hooks for external consumers
export { useMascotStateMachine } from '../hooks/useMascotStateMachine'
