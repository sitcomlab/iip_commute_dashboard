import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import Collapsible from '@/components/Elements/Collapsible'
import MoreDetails from '@/components/Elements/MoreDetails'
import { Spacer } from '@/components/Elements/Spacer'
import StairStepBackground from '@/components/Layout/StairStepBackground'
import Title from '@/components/Elements/Title'
import InsightsContainer from '@/components/Insights/InsightsContainer'
import ChartTile from '@/components/Tiles/Mobility/Bicycle/ChartTile'
import SuccessStoryTile from '@/components/Tiles/Base/SuccessStoryTile'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import Container from '@/components/Layout/Container'
import Columns from '@/components/Layout/Columns'

export default function Home() {
  return (
    <div>
      <InsightsContainer />
      <StairStepBackground variant="secondary">
        <Container>
          <Title size="lg">Daten im Fokus</Title>
          <Collapsible trigger={<MoreDetails className="mt-4" />}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              neque reprehenderit. Unde distinctio ipsa temporibus aliquam
              minima asperiores perferendis harum vel, vero, impedit ratione ut
              eligendi, tenetur sed accusantium nesciunt.
            </div>
          </Collapsible>
        </Container>
      </StairStepBackground>
      <Container>
        <Columns>
          <ChartTile />
          <WeatherTile />
        </Columns>
        <CO2EmissionsTile />
        <Spacer />
        <SuccessStoryTile
          endImage={
            <img src="https://www.stadt-muenster.de/fileadmin/user_upload/stadt-muenster/obm/pics/vorschau-lewe-lambertikirchplatz-m.jpg" />
          }
        >
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
            porro magni beatae ad veritatis explicabo numquam quidem nisi eius!
            Nihil.
          </div>
        </SuccessStoryTile>
      </Container>
    </div>
  )
}
