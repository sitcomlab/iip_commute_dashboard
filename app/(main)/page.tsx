import Progress from '@/components/Charts/Progress'
import Collapsible from '@/components/Elements/Collapsible'
import MoreDetails from '@/components/Elements/MoreDetails'
import { Spacer } from '@/components/Elements/Spacer'
import StairStepBackground from '@/components/Elements/StairStepBackground'
import Title from '@/components/Elements/Title'
import Slider from '@/components/Inputs/Slider'
import ToggleGroup from '@/components/Inputs/ToggleGroup'
import InsightsContainer from '@/components/Insights/InsightsContainer'
import ChartTile from '@/components/Mobility/Bicycle/ChartTile'
import { BaseTile } from '@/components/Tiles/BaseTile'
import LiveBadge from '@/components/Tiles/LiveBadge'
import SuccessStoryTile from '@/components/Tiles/SuccessStoryTile'

export default function Home() {
  return (
    <div>
      <InsightsContainer />
      <StairStepBackground variant="secondary">
        <div className="container mx-auto p-12">
          <Title size="lg">Daten im Fokus</Title>
          <Collapsible trigger={<MoreDetails className="mt-4" />}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
              neque reprehenderit. Unde distinctio ipsa temporibus aliquam
              minima asperiores perferendis harum vel, vero, impedit ratione ut
              eligendi, tenetur sed accusantium nesciunt.
            </div>
          </Collapsible>
        </div>
      </StairStepBackground>
      <div className="container mx-auto p-12">
        <div className="gap-8 lg:columns-2">
          <ChartTile />

          <BaseTile footerCenterElement={<LiveBadge />}>
            <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
              porro magni beatae ad veritatis explicabo numquam quidem nisi
              eius! Nihil. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Mollitia cumque repellat officia sunt quibusdam ut, hic
              eaque quo! Expedita porro magni beatae ad veritatis explicabo
              numquam quidem nisi eius! Nihil. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Mollitia cumque repellat officia
              sunt quibusdam ut, hic eaque quo! Expedita porro magni beatae ad
              veritatis explicabo numquam quidem nisi eius! Nihil.
            </div>
            <Slider
              defaultValue={[2]}
              labels={['2000', '2010', '2020', '2030']}
              max={6}
              min={0}
            />
            <ToggleGroup
              items={[
                {
                  element: '2020',
                  value: '2020',
                },
                {
                  element: '2021',
                  value: '2021',
                },
                {
                  element: '2022',
                  value: '2022',
                },
              ]}
            />
          </BaseTile>

          <BaseTile footerCenterElement={<LiveBadge />}>
            <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
              porro magni beatae ad veritatis explicabo numquam quidem nisi
              eius! Nihil. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Mollitia cumque repellat officia sunt quibusdam ut, hic
              eaque quo! Expedita porro magni beatae ad veritatis explicabo
              numquam quidem nisi eius! Nihil. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Mollitia cumque repellat officia
              sunt quibusdam ut, hic eaque quo! Expedita porro magni beatae ad
              veritatis explicabo numquam quidem nisi eius! Nihil.
            </div>
            <Progress progress={42} />
          </BaseTile>

          <BaseTile>
            <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
              porro magni beatae ad veritatis explicabo numquam quidem nisi
              eius! Nihil.
            </div>
            <Progress progress={33} />
          </BaseTile>

          <BaseTile footerCenterElement={<LiveBadge />}>
            <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
            <div>Lorem ipsum</div>
            <Progress progress={42} />
          </BaseTile>
        </div>
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
      </div>
    </div>
  )
}
