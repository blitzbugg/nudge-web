import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  /** CSS class name */
  className?: string
  /** Background color override */
  background?: string
  /** Use night/dark background */
  dark?: boolean
  /** Minimal vertical padding */
  compact?: boolean
  /** id for anchor navigation */
  id?: string
}

/**
 * Consistent section wrapper.
 * Provides standard padding, max-width, and vertical rhythm.
 */
export function Section({
  children,
  className = '',
  background,
  dark = false,
  compact = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        background: dark
          ? 'var(--color-night-sky)'
          : background ?? 'var(--color-surface-page)',
        color: dark ? 'var(--color-text-inverse, #FAF9F7)' : 'var(--color-text-primary)',
        padding: compact ? '4rem 1.5rem' : '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {children}
      </div>
    </section>
  )
}
