import { motion } from 'motion/react'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { ReactNode } from 'react'

interface AnimatedElementProps {
  children: ReactNode
  /** Delay in seconds */
  delay?: number
  /** Animation direction */
  direction?: 'up' | 'down' | 'none'
  /** className */
  className?: string
}

/**
 * Wraps children in a scroll-triggered fade-in.
 * Respects prefers-reduced-motion.
 */
export function AnimatedElement({
  children,
  delay = 0,
  direction = 'up',
  className,
}: AnimatedElementProps) {
  const { ref, isInView } = useInView()
  const reduced = useReducedMotion()

  const yOffset = direction === 'none' ? 0 : direction === 'up' ? 24 : -24

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : yOffset }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
