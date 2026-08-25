import type { OtterMood, MoodConfig } from '../types'

/**
 * Mood configurations — the visual identity of each emotional state.
 * Tuned for subtle, organic feel. Nothing exaggerated.
 */
export const moodConfigs: Record<OtterMood, MoodConfig> = {
  idle: {
    bodyScale: { x: 1, y: 1 },
    eyeOpenness: 1,
    mouthType: 'neutral',
    earRotation: 0,
    headTilt: 0,
    showBlush: false,
    showSleepyParticles: false,
  },

  curious: {
    bodyScale: { x: 1.01, y: 0.99 },
    eyeOpenness: 1.15,
    mouthType: 'oh',
    earRotation: -8,
    headTilt: -4,
    showBlush: false,
    showSleepyParticles: false,
  },

  happy: {
    bodyScale: { x: 1.03, y: 0.97 },
    eyeOpenness: 0.35,
    mouthType: 'teeth',
    earRotation: 5,
    headTilt: 3,
    showBlush: true,
    showSleepyParticles: false,
  },

  sleepy: {
    bodyScale: { x: 0.99, y: 1.02 },
    eyeOpenness: 0.08,
    mouthType: 'sleepy',
    earRotation: 10,
    headTilt: 6,
    showBlush: false,
    showSleepyParticles: true,
  },

  encouraging: {
    bodyScale: { x: 1.02, y: 0.98 },
    eyeOpenness: 1,
    mouthType: 'smile',
    earRotation: -3,
    headTilt: -2,
    showBlush: true,
    showSleepyParticles: false,
  },

  surprised: {
    bodyScale: { x: 0.97, y: 1.04 },
    eyeOpenness: 1.3,
    mouthType: 'oh',
    earRotation: -12,
    headTilt: 0,
    showBlush: false,
    showSleepyParticles: false,
  },

  thinking: {
    bodyScale: { x: 1, y: 1 },
    eyeOpenness: 0.85,
    mouthType: 'neutral',
    earRotation: -4,
    headTilt: -6,
    showBlush: false,
    showSleepyParticles: false,
  },

  celebrating: {
    bodyScale: { x: 1.04, y: 0.96 },
    eyeOpenness: 0.3,
    mouthType: 'teeth',
    earRotation: 6,
    headTilt: 4,
    showBlush: true,
    showSleepyParticles: false,
  },
}

/** Valid mood transitions */
export const validMoodTransitions: Record<OtterMood, OtterMood[]> = {
  idle: ['curious', 'happy', 'sleepy', 'encouraging', 'surprised', 'thinking'],
  curious: ['idle', 'happy', 'surprised', 'thinking'],
  happy: ['idle', 'celebrating', 'encouraging'],
  sleepy: ['idle'],
  encouraging: ['idle', 'happy'],
  surprised: ['idle', 'curious', 'happy'],
  thinking: ['idle', 'curious', 'happy'],
  celebrating: ['idle', 'happy', 'encouraging'],
}

/** Ambient moods — what the otter randomly cycles through when idle */
export const ambientMoods: OtterMood[] = [
  'curious',
  'happy',
  'sleepy',
  'thinking',
  'surprised',
]
