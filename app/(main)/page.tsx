import InsightsContainer from '@/components/Insights/InsightsContainer'
import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'
import ClimateView from '@/components/Views/ClimateView'
import MobilityView from '@/components/Views/MobilityView'
import BuildingsView from '@/components/Views/BuildingsView'
import EnergyView from '@/components/Views/EnergyView'

export default async function Home() {
  return (
    <div className="-translate-y-52">
      <AnimatedPage>
        <InsightsContainer />
        <Container>
          <ClimateView />
          <MobilityView />
          <BuildingsView />
          <EnergyView />
        </Container>
      </AnimatedPage>
    </div>
  )
}

export const revalidate = 60
