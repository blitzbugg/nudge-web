import { text, brand, surface, radii, semantic } from '../design/tokens'
import { AnimatedElement } from '../components/AnimatedElement'
import { ProgressRing } from '../components/ProgressRing'

const STATS = [
  { label: 'Current streak', value: '12', unit: 'days', color: semantic.streak },
  { label: 'Longest streak', value: '28', unit: 'days', color: brand.primary },
  { label: 'This week', value: '85', unit: '%', color: semantic.success },
  { label: 'Total completions', value: '347', unit: '', color: text.primary },
]

export function StreaksProgress() {
  return (
    <section style={{ padding: '80px 24px', background: surface.page }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            Streaks are feedback, not a grade.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 520, lineHeight: 1.6, margin: '0 auto 48px' }}>
            See your consistency. Missed a day? That's okay. Start again.
          </p>
        </AnimatedElement>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, maxWidth: 640, margin: '0 auto' }}>
          {STATS.map((s, i) => (
            <AnimatedElement key={s.label} delay={0.15 + i * 0.08}>
              <div style={{
                padding: '24px 16px', background: surface.card, borderRadius: radii.lg,
                border: `1px solid ${surface.border}`, textAlign: 'center',
              }}>
                <div style={{ marginBottom: 12 }}>
                  <ProgressRing
                    progress={s.unit === '%' ? parseInt(s.value) / 100 : parseInt(s.value) / 50}
                    size={56} strokeWidth={4} color={s.color}
                    label={s.value + s.unit}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: text.secondary, margin: 0, fontWeight: 500 }}>{s.label}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
