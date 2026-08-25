import { useState } from 'react'
import { motion } from 'motion/react'
import { MascotController } from '../mascot/components/MascotController'
import { brand, surface, text } from '../design/tokens'
import type { OtterMood } from '../mascot/types'

/**
 * Mascot Playground — isolated testing environment for the otter.
 */

const ALL_MOODS: OtterMood[] = [
  'idle', 'curious', 'happy', 'sleepy',
  'encouraging', 'surprised', 'thinking', 'celebrating',
]

const MOOD_DESCRIPTIONS: Record<OtterMood, string> = {
  idle: 'Default resting state with breathing and cursor tracking',
  curious: 'Ears perk, head tilts, eyes widen',
  happy: 'Squinty eyes, toothy smile, rosy cheeks',
  sleepy: 'Heavy lids, gentle sway, floating Z\'s',
  encouraging: 'Warm smile, subtle arm wave',
  surprised: 'Wide eyes, ears back, open mouth',
  thinking: 'Head tilted, mouth flat, contemplative',
  celebrating: 'Big smile, arms waving, rosy cheeks',
}

const MOOD_ICONS: Record<OtterMood, string> = {
  idle: '🌊',
  curious: '🔍',
  happy: '😊',
  sleepy: '💤',
  encouraging: '💪',
  surprised: '😲',
  thinking: '🤔',
  celebrating: '🎉',
}

export function MascotPlayground() {
  const [activeMood, setActiveMood] = useState<OtterMood | null>(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: surface.page,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      color: text.primary,
      padding: '2rem',
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: text.primary,
          margin: '0 0 0.5rem',
        }}>
          Otter Playground
        </h1>
        <p style={{ fontSize: '0.875rem', color: text.secondary, margin: 0 }}>
          Interactive mascot state testing environment
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: surface.card,
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <MascotController
          key={activeMood ?? 'auto'}
          mood={activeMood ?? undefined}
          size={280}
        />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.375rem 0.875rem',
          borderRadius: '999px',
          background: surface.muted,
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: text.secondary,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: activeMood ? brand.primary : '#94a3b8',
          }} />
          {activeMood ? MOOD_DESCRIPTIONS[activeMood] : 'Auto-playing ambient moods'}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          maxWidth: '700px',
          marginBottom: '2rem',
        }}
      >
        <StateButton
          label="Auto"
          icon="✨"
          isActive={activeMood === null}
          onClick={() => setActiveMood(null)}
        />
        {ALL_MOODS.map((m) => (
          <StateButton
            key={m}
            label={m}
            icon={MOOD_ICONS[m]}
            isActive={activeMood === m}
            onClick={() => setActiveMood(m)}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          background: surface.card,
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          maxWidth: '480px',
          width: '100%',
        }}
      >
        <h3 style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: text.tertiary,
          margin: '0 0 0.75rem',
        }}>
          Animation Diagnostics
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          color: text.secondary,
        }}>
          <DiagItem label="Cursor tracking" value="Active" />
          <DiagItem label="Breathing" value="Sinusoidal" />
          <DiagItem label="Blinking" value="Randomized" />
          <DiagItem label="Springs" value="Stiff: 120–200" />
          <DiagItem label="Reduced motion" value={typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Yes' : 'No'} />
          <DiagItem label="State machine" value={activeMood ? 'Manual' : 'Ambient'} />
        </div>
      </motion.div>

      <p style={{
        marginTop: '2rem',
        fontSize: '0.75rem',
        color: text.tertiary,
        textAlign: 'center',
        lineHeight: 1.6,
      }}>
        Move your cursor over the otter to see eye tracking.
        <br />
        Moods auto-cycle in ambient mode. Click a button to test individual moods.
      </p>
    </div>
  )
}

function StateButton({
  label, icon, isActive, onClick,
}: {
  label: string; icon: string; isActive: boolean; onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.5rem 1rem',
        borderRadius: '12px',
        border: `1.5px solid ${isActive ? brand.primary : 'transparent'}`,
        background: isActive ? brand.primarySoft : surface.muted,
        color: isActive ? brand.primary : text.secondary,
        fontSize: '0.8125rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        outline: 'none',
      }}
    >
      <span>{icon}</span>
      <span style={{ textTransform: 'capitalize' }}>{label}</span>
    </motion.button>
  )
}

function DiagItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>        <span style={{ color: text.tertiary }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  )
}
