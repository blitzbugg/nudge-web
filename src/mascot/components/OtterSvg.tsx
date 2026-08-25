import { motion } from 'motion/react'
import { otter as c, motion as m } from '../../design/tokens'
import type { OtterProps, OtterMood } from '../types'
import { moodConfigs } from '../states/configs'

/**
 * Original 2D otter mascot — built entirely from SVG primitives.
 *
 * Architecture:
 * - Single root <motion.svg> handles breathing + body scale
 * - Head group handles tilt + ear rotation
 * - Eye pupils receive cursor-tracking offsets
 * - All paths are hand-authored for a warm, organic feel
 *
 * OTTER, NOT TEDDY BEAR — the shape language that makes this read as an
 * otter instead of a bear:
 *   1. Body is a long, narrow, torpedo-ish oval (not a round teddy ball).
 *   2. Ears are tiny nubs tucked low against the skull, not big perched
 *      circles sticking off the top of the head.
 *   3. The muzzle patch is wide and flat, covering the whole lower face,
 *      with visible whisker pads — otters have broad, blunt faces.
 *   4. The tail is a thick, flattened rudder that tapers to a point,
 *      not a fluffy curled raccoon tail.
 *   5. Paws are paddle-shaped with faint digit lines / webbing hints.
 *
 * SVG coordinate space: 200 × 240 (viewBox).
 */
export function OtterSvg({
  mood = 'idle',
  size = 320,
  className,
  eyeOffset = { x: 0, y: 0 },
  breathingOffset = 0,
  blinkProgress = 0,
}: OtterProps) {
  const vw = 200
  const vh = 240
  const config = moodConfigs[mood]

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vw} ${vh}`}
      width={size}
      height={size * (vh / vw)}
      className={className}
      role="img"
      aria-label="Nudge the otter mascot"
      initial={false}
      animate={{
        y: breathingOffset,
        scaleX: config.bodyScale.x,
        scaleY: config.bodyScale.y,
      }}
      transition={m.softSpring}
      style={{ transformOrigin: '100px 165px' }}
    >
      {/* ── Tail (thick, flat, tapering rudder — not a fluffy curl) ── */}
      <motion.g
        animate={{
          rotate: mood === 'idle' || mood === 'thinking' ? [0, 4, 0] : 0,
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '118px 195px' }}
      >
        <path
          d="M112 190
             C130 188, 150 194, 163 208
             C174 220, 178 232, 172 236
             C165 240, 152 232, 140 220
             C128 208, 116 200, 112 190 Z"
          fill={c.body}
        />
        <path
          d="M116 196
             C130 197, 144 204, 154 214
             C160 220, 162 226, 158 228
             C152 230, 142 224, 133 216
             C123 208, 116 202, 116 196 Z"
          fill={c.belly}
          opacity={0.35}
        />
      </motion.g>

      {/* ── Body (long, narrow torpedo shape) ── */}
      <g>
        <path
          d="M100 118
             C124 118, 140 138, 140 168
             C140 196, 128 214, 100 216
             C72 214, 60 196, 60 168
             C60 138, 76 118, 100 118 Z"
          fill={c.body}
        />
        <ellipse cx="100" cy="176" rx="26" ry="42" fill={c.belly} />
        <ellipse cx="110" cy="150" rx="14" ry="24" fill={c.belly} opacity={0.25} />
      </g>

      {/* ── Left arm (short, paddle-shaped) ── */}
      <motion.g
        animate={
          mood === 'encouraging' || mood === 'celebrating'
            ? { rotate: [-8, -26, -8], y: [0, -3, 0] }
            : { rotate: 0 }
        }
        transition={
          mood === 'encouraging' || mood === 'celebrating'
            ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
            : m.spring
        }
        style={{ transformOrigin: '64px 165px' }}
      >
        <path
          d="M64 162 C54 165, 44 172, 41 181 C38 190, 45 195, 54 191
             C63 187, 68 172, 64 162Z"
          fill={c.paw}
        />
        <g stroke={c.body} strokeWidth={1} strokeLinecap="round" opacity={0.4}>
          <line x1="44" y1="184" x2="40" y2="189" />
          <line x1="49" y1="188" x2="46" y2="193" />
        </g>
      </motion.g>

      {/* ── Right arm (short, paddle-shaped) ── */}
      <motion.g
        animate={
          mood === 'encouraging' || mood === 'celebrating'
            ? { rotate: [8, 26, 8], y: [0, -3, 0] }
            : { rotate: 0 }
        }
        transition={
          mood === 'encouraging' || mood === 'celebrating'
            ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }
            : m.spring
        }
        style={{ transformOrigin: '136px 165px' }}
      >
        <path
          d="M136 162 C146 165, 156 172, 159 181 C162 190, 155 195, 146 191
             C137 187, 132 172, 136 162Z"
          fill={c.paw}
        />
        <g stroke={c.body} strokeWidth={1} strokeLinecap="round" opacity={0.4}>
          <line x1="156" y1="184" x2="160" y2="189" />
          <line x1="151" y1="188" x2="154" y2="193" />
        </g>
      </motion.g>

      {/* ── Feet (wide webbed paddles, not round teddy feet) ── */}
      <g>
        <path d="M68 212 Q78 224, 90 214 Q84 226, 70 226 Q60 224, 68 212 Z" fill={c.paw} />
        <path d="M132 212 Q122 224, 110 214 Q116 226, 130 226 Q140 224, 132 212 Z" fill={c.paw} />
        <g stroke={c.body} strokeWidth={1} strokeLinecap="round" opacity={0.35}>
          <line x1="75" y1="218" x2="72" y2="224" />
          <line x1="82" y1="219" x2="80" y2="225" />
          <line x1="125" y1="218" x2="128" y2="224" />
          <line x1="118" y1="219" x2="120" y2="225" />
        </g>
      </g>

      {/* ── Head (wide, flat-topped, blunt — not a round ball) ── */}
      <motion.g
        animate={{ rotate: config.headTilt }}
        transition={m.softSpring}
        style={{ transformOrigin: '100px 100px' }}
      >
        {/* Head shape: flatter crown, wide cheeks/jowls */}
        <path
          d="M100 58
             C128 58, 148 76, 150 100
             C152 122, 136 142, 100 142
             C64 142, 48 122, 50 100
             C52 76, 72 58, 100 58 Z"
          fill={c.body}
        />

        {/* Wide flat muzzle patch — covers most of the lower face */}
        <ellipse cx="100" cy="114" rx="40" ry="26" fill={c.muzzle} />

        {/* Whisker pads */}
        <ellipse cx="76" cy="120" rx="9" ry="7" fill={c.muzzle} />
        <ellipse cx="124" cy="120" rx="9" ry="7" fill={c.muzzle} />

        {/* Blush */}
        {config.showBlush && (
          <>
            <motion.ellipse
              cx="60" cy="108" rx="9" ry="6"
              fill={c.blush}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={m.softSpring}
            />
            <motion.ellipse
              cx="140" cy="108" rx="9" ry="6"
              fill={c.blush}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={m.softSpring}
            />
          </>
        )}

        {/* Ears: tiny nubs low on the skull, tucked close — not perched bear ears */}
        <Ear cx={54} cy={88} rotation={config.earRotation} />
        <Ear cx={146} cy={88} rotation={-config.earRotation} />

        {/* Eyes: small, set forward, close together */}
        <Eye
          cx={82} cy={94}
          pupilX={eyeOffset.x} pupilY={eyeOffset.y}
          blinkProgress={blinkProgress}
          openness={config.eyeOpenness}
          isSquinting={mood === 'happy' || mood === 'celebrating'}
        />
        <Eye
          cx={118} cy={94}
          pupilX={eyeOffset.x} pupilY={eyeOffset.y}
          blinkProgress={blinkProgress}
          openness={config.eyeOpenness}
          isSquinting={mood === 'happy' || mood === 'celebrating'}
        />

        {/* Nose: broad and triangular, not a round bear button */}
        <path d="M100 108 L108 116 Q100 122, 92 116 Z" fill={c.nose} />
        <ellipse cx="98" cy="112" rx="1.8" ry="1.3" fill="white" opacity={0.3} />

        {/* Mouth */}
        <Mouth mood={mood} />

        {/* Whiskers */}
        <Whiskers />

        {/* Sleepy particles */}
        {config.showSleepyParticles && <SleepyParticles />}
      </motion.g>
    </motion.svg>
  )
}

// ─── Ear (small, low, tucked-in nub) ──────────────────────
function Ear({ cx, cy, rotation }: { cx: number; cy: number; rotation: number }) {
  return (
    <motion.g
      animate={{ rotate: rotation }}
      transition={m.spring}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <circle cx={cx} cy={cy} r={9} fill={c.body} />
      <circle cx={cx} cy={cy} r={4.5} fill={c.earInner} />
    </motion.g>
  )
}

// ─── Eye ───────────────────────────────────────────────────
interface EyeProps {
  cx: number
  cy: number
  pupilX: number
  pupilY: number
  blinkProgress: number
  openness: number
  isSquinting: boolean
}

function Eye({ cx, cy, pupilX, pupilY, blinkProgress, openness, isSquinting }: EyeProps) {
  const eyeRadius = 9
  const scaleY = Math.max(0.02, (1 - blinkProgress) * openness)
  const squintScale = isSquinting ? 0.55 : 1

  return (
    <g>
      <motion.ellipse
        cx={cx} cy={cy}
        rx={eyeRadius} ry={eyeRadius}
        fill={c.eyeWhite}
        stroke={c.body}
        strokeWidth={1.5}
        animate={{ scaleY: scaleY * squintScale }}
        transition={m.spring}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {scaleY > 0.1 && (
        <motion.g animate={{ x: pupilX, y: pupilY }} transition={m.spring}>
          <circle cx={cx} cy={cy} r={4.5} fill={c.pupil} />
          <circle cx={cx} cy={cy} r={2.7} fill="#1a0f08" />
          <circle cx={cx - 1.3} cy={cy - 1.8} r={1.6} fill={c.eyeHighlight} />
          <circle cx={cx + 0.9} cy={cy + 0.9} r={0.7} fill={c.eyeHighlight} opacity={0.6} />
        </motion.g>
      )}
    </g>
  )
}

// ─── Mouth ─────────────────────────────────────────────────
function Mouth({ mood }: { mood: OtterMood }) {
  switch (mood) {
    case 'happy':
    case 'celebrating':
      return (
        <motion.path
          d="M88 126 Q100 138, 112 126"
          fill="none"
          stroke={c.nose}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )
    case 'surprised':
    case 'curious':
      return (
        <motion.ellipse
          cx="100" cy="127"
          rx="3.5" ry="4.5"
          fill={c.nose}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={m.spring}
        />
      )
    case 'sleepy':
      return (
        <path
          d="M92 126 Q96 128, 100 126 Q104 124, 108 126"
          fill="none"
          stroke={c.nose}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )
    case 'encouraging':
      return (
        <motion.path
          d="M88 126 Q100 136, 112 126"
          fill="none"
          stroke={c.nose}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )
    case 'thinking':
      return (
        <path
          d="M92 126 Q100 123, 108 126"
          fill="none"
          stroke={c.nose}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )
    default:
      return (
        <path
          d="M90 125 Q100 131, 110 125"
          fill="none"
          stroke={c.nose}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )
  }
}

// ─── Whiskers ──────────────────────────────────────────────
function Whiskers() {
  return (
    <g opacity={0.4} stroke={c.whisker} strokeWidth={1} strokeLinecap="round">
      <line x1="76" y1="116" x2="52" y2="110" />
      <line x1="76" y1="122" x2="50" y2="121" />
      <line x1="76" y1="128" x2="52" y2="132" />
      <line x1="124" y1="116" x2="148" y2="110" />
      <line x1="124" y1="122" x2="150" y2="121" />
      <line x1="124" y1="128" x2="148" y2="132" />
    </g>
  )
}

// ─── Sleepy Z particles ────────────────────────────────────
function SleepyParticles() {
  return (
    <g>
      {[
        { x: 148, y: 66, size: 8, delay: 0 },
        { x: 158, y: 50, size: 10, delay: 0.4 },
        { x: 165, y: 32, size: 12, delay: 0.8 },
      ].map((p, i) => (
        <motion.text
          key={i}
          x={p.x} y={p.y}
          fontSize={p.size}
          fill={c.body}
          fontFamily="sans-serif"
          fontWeight="bold"
          opacity={0}
          animate={{ y: [p.y, p.y - 12], opacity: [0, 0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        >
          z
        </motion.text>
      ))}
    </g>
  )
} 