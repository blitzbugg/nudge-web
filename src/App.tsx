import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { ProductIntro } from './sections/ProductIntro'
import { CoreHabits } from './sections/CoreHabits'
import { HabitTypes } from './sections/HabitTypes'
import { Scheduling } from './sections/Scheduling'
import { StreaksProgress } from './sections/StreaksProgress'
import { CalendarHistory } from './sections/CalendarHistory'
import { Analytics } from './sections/Analytics'
import { Privacy } from './sections/Privacy'
import { FinalCTA } from './sections/FinalCTA'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <ProductIntro />
        <CoreHabits />
        <HabitTypes />
        <Scheduling />
        <StreaksProgress />
        <CalendarHistory />
        <Analytics />
        <Privacy />
        <FinalCTA />
      </main>
    </>
  )
}

export default App
