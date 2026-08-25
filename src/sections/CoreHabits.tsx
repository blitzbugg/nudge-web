import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { MascotController } from '../mascot/components/MascotController'
import { text, surface } from '../design/tokens'
import { AnimatedElement } from '../components/AnimatedElement'
import { HabitRow } from '../components/HabitRow'
import { ProgressRing } from '../components/ProgressRing'
import { DEMO_HABITS } from '../data/demo'

export function CoreHabits() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [otterMood, setOtterMood] = useState<'idle' | 'happy' | 'celebrating'>('idle')

  const handleToggle = useCallback((id: string, done: boolean) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: done }
      const count = Object.values(next).filter(Boolean).length
      if (count === DEMO_HABITS.length) {
        setOtterMood('celebrating')
        setTimeout(() => setOtterMood('idle'), 3000)
      } else if (done) {
        setOtterMood('happy')
        setTimeout(() => setOtterMood('idle'), 2000)
      }
      return next
    })
  }, [])

  const done = Object.values(completed).filter(Boolean).length
  const total = DEMO_HABITS.length

  return (
    <section style={{ padding: '80px 24px', background: surface.card }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            Your little steps
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 480, lineHeight: 1.6, margin: '0 auto 48px' }}>
            Check things off as you go. The otter notices.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Phone mockup */}
            <div style={{
              width: 280, background: surface.page, borderRadius: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)',
              border: `1px solid ${surface.border}`, overflow: 'hidden',
            }}>
              <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${surface.border}` }}>
                <p style={{ fontSize: '0.75rem', color: text.tertiary, margin: 0 }}>Today</p>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DEMO_HABITS.map((h) => (
                  <HabitRow key={h.id} label={h.label} completed={completed[h.id]} streak={h.streak}
                    onToggle={(d) => handleToggle(h.id, d)} />
                ))}
              </div>
              <div style={{ padding: '12px 20px', borderTop: `1px solid ${surface.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: text.tertiary }}>{done} of {total} done</span>
                <ProgressRing progress={total > 0 ? done / total : 0} size={32} strokeWidth={3} />
              </div>
            </div>

            {/* Otter reacting */}
            <motion.div animate={{ y: done === total ? -8 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
              <MascotController size={130} mood={otterMood} trackCursor={false} />
            </motion.div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
