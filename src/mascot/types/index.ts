/**
 * Mascot types — mood, pose, animation dimensions.
 *
 * The otter has three independent axes:
 * - **mood**: emotional state (how it feels)
 * - **pose**: physical posture (how it's positioned)
 * - **animation**: what it's currently doing
 *
 * This separation lets the same otter be "curious" while "sitting"
 * and "idle" — or "happy" while "standing" and "waving".
 */

// ── Mood ───────────────────────────────────────────────────
export type OtterMood =
  | 'idle'
  | 'curious'
  | 'happy'
  | 'sleepy'
  | 'encouraging'
  | 'surprised'
  | 'thinking'
  | 'celebrating'

// ── Pose ───────────────────────────────────────────────────
export type OtterPose =
  | 'sitting'
  | 'standing'
  | 'lying'
  | 'walking'

// ── Animation ──────────────────────────────────────────────
export type OtterAnimation =
  | 'idle'
  | 'blinking'
  | 'wave'
  | 'stretch'
  | 'nudge'
  | 'peek'

// ── Combined state (what the SVG actually renders) ─────────
export interface OtterState {
  mood: OtterMood
  pose: OtterPose
  animation: OtterAnimation
}

/** Default state */
export const defaultOtterState: OtterState = {
  mood: 'idle',
  pose: 'sitting',
  animation: 'idle',
}

// ── Props ──────────────────────────────────────────────────

/** High-level props — what consumers use */
export interface OtterProps {
  /** Emotional mood */
  mood?: OtterMood
  /** Physical posture */
  pose?: OtterPose
  /** Current animation */
  animation?: OtterAnimation
  /** Optional size in px (default 320) */
  size?: number
  /** Additional CSS class */
  className?: string
  /** Whether cursor tracking is enabled (default true) */
  trackCursor?: boolean
  /** Optional: override eye offset (for custom compositions) */
  eyeOffset?: { x: number; y: number }
  /** Optional: override breathing offset */
  breathingOffset?: number
  /** Optional: override blink progress */
  blinkProgress?: number
}

/** Configuration for the mascot controller */
export interface MascotControllerProps extends OtterProps {}

// ── Internal animation config ──────────────────────────────
export interface MoodConfig {
  /** Body scale adjustments */
  bodyScale: { x: number; y: number }
  /** Eye openness multiplier (0 = closed, 1 = normal, >1 = wide) */
  eyeOpenness: number
  /** Mouth type to render */
  mouthType: 'neutral' | 'smile' | 'open' | 'sleepy' | 'teeth' | 'oh'
  /** Ear rotation in degrees */
  earRotation: number
  /** Head tilt in degrees */
  headTilt: number
  /** Whether blush is visible */
  showBlush: boolean
  /** Whether zzz particles show */
  showSleepyParticles: boolean
}

// ── Legacy compat ──────────────────────────────────────────
/** @deprecated Use OtterMood instead */
export type MascotState = OtterMood
