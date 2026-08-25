import { useState } from 'react'
import { motion } from 'motion/react'
import { brand, text, surface, radii, motion as m } from '../design/tokens'

interface HabitRowProps {
  label: string
  completed?: boolean
  streak?: number
  onToggle?: (completed: boolean) => void
  interactive?: boolean
}

export function HabitRow({ label, completed: initial = false, streak, onToggle, interactive = true }: HabitRowProps) {
  const [done, setDone] = useState(initial)

  const toggle = () => {
    if (!interactive) return
    const next = !done
    setDone(next)
    onToggle?.(next)
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '12px 16px',
        background: done ? brand.primarySoft : surface.card,
        border: `1px solid ${done ? brand.primary + '30' : surface.border}`,
        borderRadius: radii.md,
        cursor: interactive ? 'pointer' : 'default',
        textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      <motion.div
        animate={{
          background: done ? brand.primary : 'transparent',
          borderColor: done ? brand.primary : text.tertiary,
        }}
        transition={m.quickSpring}
        style={{
          width: 22, height: 22, borderRadius: '6px',
          border: '2px solid', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >
        {done && (
          <motion.svg
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={m.quickSpring}
            width="12" height="12" viewBox="0 0 12 12" fill="none"
          >
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </motion.div>
      <span style={{
        fontSize: '0.9375rem',
        color: done ? text.tertiary : text.primary,
        textDecoration: done ? 'line-through' : 'none',
        transition: 'color 0.2s',
        flex: 1,
      }}>
        {label}
      </span>
      {streak !== undefined && streak > 0 && (
        <span style={{
          fontSize: '0.75rem', fontWeight: 600, color: brand.primary,
          background: brand.primarySoft, padding: '2px 8px', borderRadius: radii.full,
        }}>
          {streak}d
        </span>
      )}
    </motion.button>
  )
}
