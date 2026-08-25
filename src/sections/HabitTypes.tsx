import { useState } from 'react'
import { motion } from 'motion/react'
import { text, brand, surface, radii } from '../design/tokens'
import { AnimatedElement } from '../components/AnimatedElement'
import { HABIT_TYPES } from '../data/demo'

export function HabitTypes() {
  const [active, setActive] = useState(0)

  return (
    <section style={{ padding: '80px 24px', background: surface.page }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            Not every habit is the same.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 480, lineHeight: 1.6, margin: '0 auto 48px' }}>
            Nudge supports five types. Pick what fits.
          </p>
        </AnimatedElement>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {HABIT_TYPES.map((t, i) => (
            <AnimatedElement key={t.type} delay={0.15 + i * 0.06}>
              <motion.button
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '8px 16px', borderRadius: radii.full, border: `1.5px solid ${active === i ? brand.primary : surface.border}`,
                  background: active === i ? brand.primarySoft : surface.card,
                  color: active === i ? brand.primary : text.secondary,
                  fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {t.title}
              </motion.button>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement delay={0.3}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: 480, margin: '0 auto', padding: 32, background: surface.card,
              borderRadius: radii.lg, border: `1px solid ${surface.border}`, textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>{HABIT_TYPES[active].icon}</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: '0 0 8px', color: text.primary }}>{HABIT_TYPES[active].title}</h3>
            <p style={{ fontSize: '0.9375rem', color: text.secondary, lineHeight: 1.5, margin: '0 0 16px' }}>{HABIT_TYPES[active].description}</p>
            <div style={{
              fontSize: '0.875rem', color: brand.primary, background: brand.primarySoft,
              padding: '8px 16px', borderRadius: radii.md, display: 'inline-block', fontWeight: 500,
            }}>
              {HABIT_TYPES[active].example}
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </section>
  )
}
