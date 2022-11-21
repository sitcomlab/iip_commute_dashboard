import Progress from '@/components/Charts/Progress'
import { Spacer } from '@/components/Elements/Spacer'
import { BaseTile } from '@/components/Tiles/BaseTile'
import LiveBadge from '@/components/Tiles/LiveBadge'
import SuccessStoryTile from '@/components/Tiles/SuccessStoryTile'

export default function Home() {
  return (
    <div>
      <div className="gap-8 md:columns-2">
        <BaseTile>
          <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
            porro magni beatae ad veritatis explicabo numquam quidem nisi eius!
            Nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Mollitia cumque repellat officia sunt quibusdam ut, hic eaque quo!
            Expedita porro magni beatae ad veritatis explicabo numquam quidem
            nisi eius! Nihil.
          </div>
          <Progress progress={33} />
        </BaseTile>

        <BaseTile footerCenterElement={<LiveBadge />}>
          <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
            porro magni beatae ad veritatis explicabo numquam quidem nisi eius!
            Nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Mollitia cumque repellat officia sunt quibusdam ut, hic eaque quo!
            Expedita porro magni beatae ad veritatis explicabo numquam quidem
            nisi eius! Nihil. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Mollitia cumque repellat officia sunt quibusdam ut, hic eaque
            quo! Expedita porro magni beatae ad veritatis explicabo numquam
            quidem nisi eius! Nihil.
          </div>
          <Progress progress={42} />
        </BaseTile>

        <BaseTile footerCenterElement={<LiveBadge />}>
          <h1 className="text-6xl font-bold text-green-500">Hello World</h1>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            cumque repellat officia sunt quibusdam ut, hic eaque quo! Expedita
            porro magni beatae ad veritatis explicabo numquam quidem nisi eius!
            Nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Mollitia cumque repellat officia sunt quibusdam ut, hic eaque quo!
            Expedita porro magni beatae ad veritatis explicabo numquam quidem
            nisi eius! Nihil. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Mollitia cumque repellat officia sunt quibusdam ut, hic eaque
            quo! Expedita porro magni beatae ad veritatis explicabo numquam
            quidem nisi eius! Nihil.
          </div>
          <Progress progress={42} />
        </BaseTile>

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
  )
}
