import { motion } from 'motion/react'
import { MascotController } from '../mascot/components/MascotController'
import { brand, text } from '../design/tokens'
import { Button } from '../components/Button'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 48px', position: 'relative',
    }}>
      {/* Otter — the protagonist */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 32 }}
      >
        <MascotController size={180} />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700,
          letterSpacing: '-0.03em', lineHeight: 1.1, textAlign: 'center',
          color: text.primary, margin: '0 0 12px',
        }}
      >
        Build small.
        <br />
        <span style={{ color: brand.primary }}>Stay consistent.</span>
      </motion.h1>

      {/* Supporting copy */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)', color: text.secondary,
          textAlign: 'center', maxWidth: 440, lineHeight: 1.6, margin: '0 0 32px',
        }}
      >
        A privacy-first habit tracker designed to help you keep track of the small things that matter.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Button size="lg" id="get" href="https://github.com/blitzbugg/nudge/releases/download/v1.0.0/nudge-v1.0.0.apk">Get Nudge</Button>
        <Button size="lg" variant="secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
          See how it works
        </Button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{ position: 'absolute', bottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
      >
        <span style={{ fontSize: '0.6875rem', color: text.tertiary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} color={text.tertiary} />
        </motion.div>
      </motion.div>
    </section>
  )
}
