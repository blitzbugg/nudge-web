import { motion } from 'motion/react'

interface ProgressRingProps {
  progress: number // 0-1
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  color = 'var(--brand)',
  trackColor = 'var(--border)',
  label,
}: ProgressRingProps) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - progress)

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      {label && (
        <span style={{
          position: 'absolute', fontSize: size > 60 ? '1rem' : '0.75rem',
          fontWeight: 700, color: 'var(--text)',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}
