import { MascotController } from '../mascot/components/MascotController'
import { text, surface } from '../design/tokens'
import { Button } from '../components/Button'
import { AnimatedElement } from '../components/AnimatedElement'

export function FinalCTA() {
  return (
    <>
      <section id="get" style={{ padding: '96px 24px', background: surface.page, textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <AnimatedElement>
            <div style={{ marginBottom: 24 }}>
              <MascotController size={140} mood="encouraging" />
            </div>
          </AnimatedElement>
          <AnimatedElement delay={0.1}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px', color: text.primary }}>
              Ready to give it a nudge?
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={0.2}>
            <p style={{ fontSize: '1rem', color: text.secondary, lineHeight: 1.6, margin: '0 0 32px', maxWidth: 420, marginInline: 'auto' }}>
              Start with one small thing. The rest follows.
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.3}>
            <Button size="lg" href="https://github.com/blitzbugg/nudge/releases/download/v1.0.0/nudge-v1.0.0.apk">Get Nudge</Button>
          </AnimatedElement>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 24px', borderTop: `1px solid ${surface.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16, maxWidth: 1120, margin: '0 auto',
      }}>
        <div>
          <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: text.primary }}>Nudge</span>
          <span style={{ fontSize: '0.8125rem', color: text.tertiary, marginLeft: 12 }}>Privacy-first habit tracking.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: '0.8125rem' }}>
          <a href="#privacy" style={{ color: text.secondary, textDecoration: 'none' }}>Privacy</a>
          <span style={{ color: text.tertiary }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  )
}
