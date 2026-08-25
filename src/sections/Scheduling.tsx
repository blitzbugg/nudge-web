import { useState } from 'react'
import { motion } from 'motion/react'
import { text, brand, surface } from '../design/tokens'
import { AnimatedElement } from '../components/AnimatedElement'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function Scheduling() {
  const [selected, setSelected] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]))
  const [interval, setInterval_] = useState(1)

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const summary = selected.size === 7 ? 'Every day' : selected.size === 0 ? 'No days selected'
    : `${selected.size} day${selected.size > 1 ? 's' : ''} per week`

  return (
    <section style={{ padding: '80px 24px', background: surface.card }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            Not every day? That's fine.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 480, lineHeight: 1.6, margin: '0 auto 48px' }}>
            Set the schedule that works for your life. Not someone else's.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Day picker */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: text.secondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Repeat on
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                {DAYS.map((d, i) => (
                  <motion.button
                    key={i}
                    onClick={() => toggle(i)}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: 44, height: 44, borderRadius: '50%', border: 'none',
                      background: selected.has(i) ? brand.primary : surface.muted,
                      color: selected.has(i) ? text.inverse : text.secondary,
                      fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                    title={DAY_NAMES[i]}
                  >
                    {d}
                  </motion.button>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: text.secondary, marginTop: 12 }}>{summary}</p>
            </div>

            {/* Interval picker */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: text.secondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Or every
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {[1, 2, 3, 7].map((n) => (
                  <motion.button
                    key={n}
                    onClick={() => setInterval_(n)}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: 44, height: 44, borderRadius: '50%', border: 'none',
                      background: interval === n ? brand.primary : surface.muted,
                      color: interval === n ? text.inverse : text.secondary,
                      fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>
              <p style={{ fontSize: '0.875rem', color: text.secondary, marginTop: 12 }}>
                {interval === 1 ? 'Every day' : `Every ${interval} days`}
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
