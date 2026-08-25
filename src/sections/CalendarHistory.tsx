import { text, surface } from '../design/tokens'
import { AnimatedElement } from '../components/AnimatedElement'
import { Calendar } from '../components/Calendar'
import { MascotController } from '../mascot/components/MascotController'

export function CalendarHistory() {
  return (
    <section style={{ padding: '80px 24px', background: surface.card }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            See your patterns.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 480, lineHeight: 1.6, margin: '0 auto 48px' }}>
            Your history is yours. Review it anytime.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 320, width: '100%' }}>
              <Calendar />
            </div>
            <div style={{ textAlign: 'center' }}>
              <MascotController size={100} mood="thinking" trackCursor={false} />
              <p style={{ fontSize: '0.8125rem', color: text.secondary, marginTop: 12, lineHeight: 1.5 }}>
                Tap any day to see details.
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
