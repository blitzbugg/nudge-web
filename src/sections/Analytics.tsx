import { text, surface, brand, radii } from '../design/tokens'
import { AnimatedElement } from '../components/AnimatedElement'
import { Heatmap } from '../components/Heatmap'

export function Analytics() {
  return (
    <section style={{ padding: '80px 24px', background: surface.page }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            Reflect, not obsess.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 480, lineHeight: 1.6, margin: '0 auto 48px' }}>
            See completion rates, weekly patterns, and your activity over time.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <div style={{
            maxWidth: 720, margin: '0 auto', padding: 32, background: surface.card,
            borderRadius: radii.lg, border: `1px solid ${surface.border}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: text.primary, margin: 0 }}>Activity</h3>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: '0.6875rem', color: text.tertiary }}>Less</span>
                {[surface.muted, brand.primary + '25', brand.primary + '50', brand.primary + '80', brand.primary].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />
                ))}
                <span style={{ fontSize: '0.6875rem', color: text.tertiary }}>More</span>
              </div>
            </div>
            <Heatmap weeks={20} />
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
