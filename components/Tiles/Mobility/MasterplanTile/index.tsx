import Title from '@/components/Elements/Title'

// @ts-ignore
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'
import MobilityTile from '../MobilityTile'
import { Masterplan } from '@/components/Icons'

// interface PVDataType {
//   ZEIT: string
//   AnzahlAnlagen: number
//   AnzahlSolarModule: number
//   Bruttoleistung: number
//   Nettonennleistung: number
// }

export default function MasterplanTile() {
  // const [data] = PVData as PVDataType[]

  return (
    <MobilityTile
      dataRetrieval={format(new Date('2023-05-22T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource={'Stadt Münster'}
      embedId="mobility-masterplan"
      title={<>Unser Masterplan</>}
    >
      <div>
        <Title as={'subtitle'} className="pb-2">
          <span className="block md:hidden">
            Masterplan Mobilität Münster 2035+ wird aktuell entwickelt.
          </span>{' '}
        </Title>
        <div className="flex flex-row gap-6">
          <span>
            <Masterplan className="h-20 text-primary md:h-44" />
          </span>
          <Title as={'subtitle'}>
            <span className="hidden md:block">
              Masterplan Mobilität Münster 2035+ wird aktuell entwickelt.
            </span>{' '}
            Dabei werden über verschiedene Formate Münsteraner Bürger*innen
            beteiligt, die so{' '}
            <span className="text-mobility">
              <AnimatedNumber>{967}</AnimatedNumber> Ideen
            </span>{' '}
            einbringen konnten.
          </Title>
        </div>
      </div>
    </MobilityTile>
  )
}
