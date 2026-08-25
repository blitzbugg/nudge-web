import type { OtterMood } from '../types'
import { validMoodTransitions, ambientMoods } from './configs'

/**
 * Deterministic state machine for otter moods.
 */
export function canTransition(from: OtterMood, to: OtterMood): boolean {
  return validMoodTransitions[from].includes(to)
}

/** Pick a random ambient mood for idle variation */
export function randomAmbientMood(): OtterMood {
  return ambientMoods[Math.floor(Math.random() * ambientMoods.length)]
}
