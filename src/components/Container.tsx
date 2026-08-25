import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  /** Narrower width for text-heavy content */
  narrow?: boolean
}

/**
 * Centered container with max-width.
 */
export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: narrow ? '680px' : '1120px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}
