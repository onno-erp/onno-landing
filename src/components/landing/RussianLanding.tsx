import { Hero } from '../Hero'
import { LandingSections } from '../LandingSections'
import { RussianModernTeams } from './RussianModernTeams'
import { RussianWhatIsOnno } from './RussianWhatIsOnno'

export function RussianLanding() {
  return (
    <>
      <Hero />
      <RussianWhatIsOnno />
      <RussianModernTeams />
      <LandingSections ctaOnly />
    </>
  )
}
