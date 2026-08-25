import { useState } from 'react'
import { motion } from 'motion/react'
import { brand, text } from '../design/tokens'

interface CalendarDay {
  date: number
  completed: boolean
  partial?: boolean
  scheduled: boolean
  isCurrentMonth: boolean
}

interface CalendarProps {
  month?: string
  year?: number
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function generateMonth(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const days: CalendarDay[] = []

  // Previous month padding
  const prevDays = new Date(year, month, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ date: prevDays - i, completed: false, scheduled: false, isCurrentMonth: false })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const isPast = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const isWeekend = new Date(year, month, d).getDay() === 0 || new Date(year, month, d).getDay() === 6
    const completed = isPast ? (isWeekend ? Math.random() > 0.4 : Math.random() > 0.15) : false
    const partial = !completed && isPast && Math.random() > 0.6
    days.push({ date: d, completed, partial, scheduled: true, isCurrentMonth: true })
  }

  // Next month padding
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: i, completed: false, scheduled: false, isCurrentMonth: false })
  }

  return days
}

export function Calendar({ month, year }: CalendarProps) {
  const now = new Date()
  const m = month ? ['January','February','March','April','May','June','July','August','September','October','November','December'].indexOf(month) : now.getMonth()
  const y = year ?? now.getFullYear()
  const [selected, setSelected] = useState<number | null>(null)
  const days = generateMonth(y, m)

  return (
    <div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '2px', textAlign: 'center',
      }}>
        {DAYS.map((d, i) => (
          <div key={i} style={{ fontSize: '0.6875rem', fontWeight: 600, color: text.tertiary, padding: '4px 0' }}>
            {d}
          </div>
        ))}
        {days.map((day, i) => (
          <motion.button
            key={i}
            onClick={() => day.isCurrentMonth && setSelected(day.date)}
            whileHover={day.isCurrentMonth ? { scale: 1.15 } : undefined}
            style={{
              width: 32, height: 32, borderRadius: '8px', border: 'none', cursor: day.isCurrentMonth ? 'pointer' : 'default',
              background: !day.isCurrentMonth ? 'transparent'
                : selected === day.date ? brand.primary
                : day.completed ? brand.primarySoft
                : day.partial ? brand.primarySoft + '80'
                : 'transparent',
              color: !day.isCurrentMonth ? 'transparent'
                : selected === day.date ? text.inverse
                : day.completed ? brand.primary
                : text.tertiary,
              fontSize: '0.8125rem', fontWeight: day.completed ? 600 : 400,
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {day.date}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
