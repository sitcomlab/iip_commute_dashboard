import Progress from '@/components/Charts/Progress'
import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import { Spinner } from '@/components/Elements/Spinner'
import { BaseTile } from '@/components/Tiles/BaseTile'
import SuccessStoryTile from '@/components/Tiles/SuccessStoryTile'

export default function Home() {
  return (
    <div>
      <Button>Hello World</Button>
      <Spacer />
      <Spinner />
      <Spacer />
      <BaseTile>
        <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
          porro magni beatae ad veritatis explicabo numquam quidem nisi eius!
          Nihil.
        </div>
        <Progress progress={33} />
      </BaseTile>
      <Spacer size="lg" />
      <BaseTile
        startImage={
          <img src="https://www.stadt-muenster.de/fileadmin/user_upload/stadt-muenster/obm/pics/vorschau-lewe-lambertikirchplatz-m.jpg" />
        }
      >
        <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
          porro magni beatae ad veritatis explicabo numquam quidem nisi eius!
          Nihil.
        </div>
        <Progress progress={42} />
      </BaseTile>
      <Spacer size="lg" />
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
  )
}
