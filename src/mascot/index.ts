// Public API for the mascot module
export { MascotController } from './components/MascotController'
export { OtterSvg } from './components/OtterSvg'
export { useMascotStateMachine } from './hooks/useMascotStateMachine'
export { useEyeTracking } from './hooks/useEyeTracking'
export { useBlinking } from './hooks/useBlinking'
export { useBreathing } from './hooks/useBreathing'
export type {
  OtterMood,
  OtterPose,
  OtterAnimation,
  OtterState,
  OtterProps,
  MascotControllerProps,
} from './types'
