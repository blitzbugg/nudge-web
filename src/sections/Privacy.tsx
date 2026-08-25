import { motion } from 'motion/react'
import { MascotController } from '../mascot/components/MascotController'
import { text, surface, brand, radii } from '../design/tokens'
import { AnimatedElement } from '../components/AnimatedElement'
import { Shield, Smartphone, Eye, Database } from 'lucide-react'

const PRINCIPLES = [
  { icon: Smartphone, title: 'Stored locally', desc: 'Your habits live on your device. Not on our servers.' },
  { icon: Shield, title: 'No account required', desc: 'Open the app and start. No sign-up wall.' },
  { icon: Eye, title: 'No tracking', desc: 'We don\'t track your behavior or sell your data.' },
  { icon: Database, title: 'Your data, your device', desc: 'Export it, delete it, own it.' },
] as const

export function Privacy() {
  return (
    <section id="privacy" style={{ padding: '80px 24px', background: surface.card }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <AnimatedElement>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 8px', color: text.primary }}>
            Your habits are yours.
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={0.1}>
          <p style={{ fontSize: '1rem', color: text.secondary, textAlign: 'center', maxWidth: 480, lineHeight: 1.6, margin: '0 auto 48px' }}>
            Nudge respects your privacy by design. No cloud. No accounts. No ads.
          </p>
        </AnimatedElement>

        {/* Local-first visualization */}
        <AnimatedElement delay={0.15}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginBottom: 48, flexWrap: 'wrap',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: brand.primarySoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
              }}>
                <span style={{ fontSize: '1.25rem' }}>👤</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: text.secondary }}>You</span>
            </div>

            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="40" height="2" viewBox="0 0 40 2">
                <line x1="0" y1="1" x2="36" y2="1" stroke={brand.primary} strokeWidth="2" strokeDasharray="4 3" />
                <circle cx="38" cy="1" r="2" fill={brand.primary} />
              </svg>
            </motion.div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: brand.primarySoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
              }}>
                <span style={{ fontSize: '1.25rem' }}>📱</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: text.secondary }}>Nudge</span>
            </div>

            <div style={{ fontSize: '1.25rem', color: text.tertiary }}>×</div>

            <div style={{ textAlign: 'center', opacity: 0.3 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: surface.muted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
              }}>
                <span style={{ fontSize: '1.25rem' }}>☁️</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: text.tertiary, textDecoration: 'line-through' }}>Cloud</span>
            </div>

            <div style={{ marginLeft: 16 }}>
              <MascotController size={72} mood="sleepy" trackCursor={false} />
            </div>
          </div>
        </AnimatedElement>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {PRINCIPLES.map((p, i) => (
            <AnimatedElement key={p.title} delay={0.2 + i * 0.08}>
              <div style={{ padding: '24px', background: surface.page, borderRadius: radii.lg, border: `1px solid ${surface.border}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: brand.primarySoft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <p.icon size={18} color={brand.primary} />
                </div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 6px', color: text.primary }}>{p.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: text.secondary, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
