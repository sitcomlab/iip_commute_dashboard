import InsightsContainer from '@/components/Insights/InsightsContainer'
import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'

import BaseView from '@/components/Views/BaseView'
import Columns from '@/components/Layout/Columns'
import TrafficloadTile from '@/components/Tiles/Mobility/TrafficloadTile'
import BusTile from '@/components/Tiles/Mobility/Bus'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'

export default async function Home() {
  return (
    <div className="-translate-y-52">
      <AnimatedPage>
        <InsightsContainer />
        <Container>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="mobility"
          >
            <TrafficloadTile />
            <Columns>
              <BusTile />
              <BicycleChartTile />
            </Columns>
          </BaseView>

        </Container>
      </AnimatedPage>
    </div>
  )
}

export const revalidate = 10
