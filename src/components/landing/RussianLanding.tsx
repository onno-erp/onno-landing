import { Hero } from '../Hero'
import { LandingSections } from '../LandingSections'
import { RussianPriceComparison } from './RussianPriceComparison'

export function RussianLanding() {
  return (
    <>
      <Hero />
      <LandingSections intro={<RussianPriceComparison />} />
    </>
  )
}
