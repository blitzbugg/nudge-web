import { AnimatedElement } from '../components/AnimatedElement'
import { text, surface, radii } from '../design/tokens'
import { FEATURES } from '../data/demo'

export function ProductIntro() {
  return (
    <section id="features" style={{ padding: '80px 24px', background: surface.page }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            One place for the habits you actually want to keep.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 520, lineHeight: 1.6, margin: '0 auto 48px' }}>
            Nudge tracks what you do, not who you are. No accounts, no cloud, no noise.
          </p>
        </AnimatedElement>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <AnimatedElement key={f.title} delay={0.15 + i * 0.08}>
              <div style={{ padding: '24px', background: surface.card, borderRadius: radii.lg, border: `1px solid ${surface.border}` }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 6px', color: text.primary }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: text.secondary, lineHeight: 1.5, margin: 0 }}>{f.description}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
