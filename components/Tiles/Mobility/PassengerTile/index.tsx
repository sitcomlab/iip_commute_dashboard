// @ts-ignore
import { format } from 'date-fns'
import MobilityTile from '../MobilityTile'
import PassengerContent from './PassengerContent'

// interface PVDataType {
//   ZEIT: string
//   AnzahlAnlagen: number
//   AnzahlSolarModule: number
//   Bruttoleistung: number
//   Nettonennleistung: number
// }

export default function PassengerTile() {
  return (
    <MobilityTile
      dataRetrieval={format(new Date('2023-05-22T00:00:00.000Z'), 'dd.MM.yyyy')}
      dataSource={'Stadtwerke Münster'}
      embedId="mobility-masterplan"
      subtitle={'Entwicklung der Fahrgastzahlen in den letzten Jahren'}
      title={'ÖPNV'}
    >
      <PassengerContent></PassengerContent>
    </MobilityTile>
  )
}
