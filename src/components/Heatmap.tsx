import { motion } from 'motion/react'
import { brand, surface } from '../design/tokens'
import { useState } from 'react'

interface DayData {
  date: string
  level: 0 | 1 | 2 | 3 | 4
  label?: string
}

interface HeatmapProps {
  weeks?: number
  data?: DayData[]
}

function generateSampleData(weeks: number): DayData[] {
  const data: DayData[] = []
  const now = new Date()
  const start = new Date(now)
  start.setDate(start.getDate() - weeks * 7 + 1)

  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const isFuture = d > now
    const dayOfWeek = d.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    let level: 0 | 1 | 2 | 3 | 4 = 0
    if (!isFuture) {
      const r = Math.random()
      if (isWeekend) {
        level = r > 0.6 ? (r > 0.85 ? 3 : r > 0.7 ? 2 : 1) : 0
      } else {
        level = r > 0.2 ? (r > 0.8 ? 4 : r > 0.6 ? 3 : r > 0.4 ? 2 : 1) : 0
      }
    }

    data.push({
      date: d.toISOString().slice(0, 10),
      level: isFuture ? 0 : level,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })
  }
  return data
}

const LEVEL_COLORS = [surface.muted, brand.primary + '25', brand.primary + '50', brand.primary + '80', brand.primary]

export function Heatmap({ weeks = 20, data }: HeatmapProps) {
  const [hovered, setHovered] = useState<DayData | null>(null)
  const days = data ?? generateSampleData(weeks)
  const cellSize = 12
  const gap = 3

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${weeks}, ${cellSize + gap}px)`,
        gridAutoRows: cellSize + gap,
        gap: `${gap}px`,
      }}>
        {days.map((day) => (
          <motion.div
            key={day.date}
            onMouseEnter={() => setHovered(day)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: cellSize, height: cellSize,
              borderRadius: '2px',
              background: LEVEL_COLORS[day.level],
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.4 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>
      {hovered && (
        <div style={{
          position: 'absolute', bottom: -32, left: 0,
          fontSize: '0.75rem', color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
        }}>
          {hovered.label}: {hovered.level === 0 ? 'No activity' : `${hovered.level} habit${hovered.level > 1 ? 's' : ''} completed`}
        </div>
      )}
    </div>
  )
}
