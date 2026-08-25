/**
 * Nudge Design Tokens
 *
 * Color palette sourced from the Nudge mobile design system.
 * Website palette uses these exact values.
 */

// ── Brand ──────────────────────────────────────────────────
export const brand = {
  primary: '#5B5CE2',
  primaryDark: '#4B4CC7',
  primarySoft: '#EEF0FF',
  primaryLight: '#7273E8',
} as const

// ── Surface ────────────────────────────────────────────────
export const surface = {
  page: '#FAFAFA',
  card: '#FFFFFF',
  muted: '#F5F3F0',
  mutedDark: '#EDE9E3',
  border: '#E8EAED',
} as const

// ── Text ───────────────────────────────────────────────────
export const text = {
  primary: '#202124',
  secondary: '#5F6368',
  tertiary: '#9AA0A6',
  inverse: '#FFFFFF',
  brand: brand.primary,
} as const

// ── Semantic ───────────────────────────────────────────────
export const semantic = {
  success: '#1E8E3E',
  warning: '#F9AB00',
  error: '#D93025',
  streak: '#F29900',
} as const

// ── Otter ──────────────────────────────────────────────────
export const otter = {
  body: '#5C3D2E',
  bodyLight: '#7A5640',
  belly: '#D4C4A8',
  muzzle: '#C8B898',
  muzzleShadow: '#A89878',
  nose: '#2E1E14',
  earInner: '#B08870',
  eyeWhite: '#F0ECE4',
  pupil: '#1A1008',
  eyeHighlight: '#FFFFFF',
  whisker: '#8A7A68',
  paw: '#4A3020',
  pawPad: '#6B5040',
  webbing: '#5A4030',
  blush: '#C89080',
} as const

// ── Motion ─────────────────────────────────────────────────
export const motion = {
  spring: { stiffness: 200, damping: 18, mass: 0.8 } as const,
  softSpring: { stiffness: 120, damping: 14, mass: 1 } as const,
  quickSpring: { stiffness: 300, damping: 22, mass: 0.5 } as const,
  gentleSpring: { stiffness: 80, damping: 12, mass: 1.2 } as const,
  duration: { fast: 0.15, normal: 0.3, slow: 0.6, verySlow: 1.2 } as const,
} as const

// ── Spacing ────────────────────────────────────────────────
export const sp = {
  1: '4px', 2: '8px', 3: '12px', 4: '16px',
  5: '20px', 6: '24px', 8: '32px', 10: '40px',
  12: '48px', 16: '64px', 20: '80px', 24: '96px', 32: '128px',
} as const

// ── Typography ─────────────────────────────────────────────
export const font = {
  family: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  heading: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '-0.02em',
  lineHeight: { tight: 1.15, normal: 1.5, relaxed: 1.65 },
} as const

// ── Radii ──────────────────────────────────────────────────
export const radii = {
  sm: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px',
} as const
