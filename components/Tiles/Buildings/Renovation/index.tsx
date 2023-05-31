import Title from '@/components/Elements/Title'
import BuildingsTile from '../BuildingsTile'

// @ts-ignore
// import WindData from '@/assets/data/bestand-windanlagen.csv'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'
import getTileData from '@/lib/api/getTileData'

// interface WindDataType {
//   ZEIT: string
//   AnzahlAnlagen: number
//   AnzahlSolarModule: number
//   Bruttoleistung: number
//   Nettonennleistung: number
// }

export default async function RenovationTile() {
  // const [data] = WindData as WindDataType[]
  const data = await getTileData('building-renovation')
  const infoText = data?.info ?? ''

  return (
    <BuildingsTile
      dataRetrieval={format(new Date(), 'dd.MM.yyyy')}
      dataSource={'Stadt Münster'}
      embedId="building-renovation"
      title={
        <>
          <AnimatedNumber className="font-medium">{3469}</AnimatedNumber> t CO
          <sub>2</sub>
        </>
      }
    >
      <div>
        <Title as={'subtitle'}>{infoText}</Title>
      </div>
    </BuildingsTile>
  )
}
