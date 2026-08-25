export const DEMO_HABITS = [
  { id: '1', label: 'Read', type: 'boolean' as const, streak: 12 },
  { id: '2', label: 'Exercise', type: 'boolean' as const, streak: 5 },
  { id: '3', label: 'Meditate', type: 'boolean' as const, streak: 8 },
  { id: '4', label: 'Journal', type: 'boolean' as const, streak: 0 },
] as const

export const HABIT_TYPES = [
  {
    type: 'boolean',
    title: 'Simple check-off',
    description: 'Done or not. No complexity.',
    example: 'Read for 10 minutes',
    icon: '○',
  },
  {
    type: 'numeric',
    title: 'Track a number',
    description: 'Pages, minutes, reps — whatever you measure.',
    example: '30 push-ups',
    icon: '#',
  },
  {
    type: 'timer',
    title: 'Track time',
    description: 'Start, stop, record. That simple.',
    example: 'Study 60 minutes',
    icon: '◷',
  },
  {
    type: 'checklist',
    title: 'Break it down',
    description: 'Multi-step routines, one step at a time.',
    example: 'Morning routine',
    icon: '⋮',
  },
  {
    type: 'quit',
    title: 'Trackstinence',
    description: 'Count days since, not days missed.',
    example: 'No junk food',
    icon: '⊘',
  },
] as const

export const FEATURES = [
  {
    title: 'Local reminders',
    description: 'Gentle nudges from your device, not from the cloud.',
  },
  {
    title: 'Streaks',
    description: 'Visible feedback on your consistency. Not a scoreboard.',
  },
  {
    title: 'History',
    description: 'See your patterns over days, weeks, and months.',
  },
  {
    title: 'No account needed',
    description: 'Open the app. Start tracking. No sign-up wall.',
  },
] as const
