import EnergyTile from '../EnergyTile'

// @ts-ignore
import PVData from '@/assets/data/pv-anlagen.csv'
import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import { format } from 'date-fns'
import PVAnlagenContent from './PVAnlagenContent'

export interface PVAnlagenDataType {
  AnzahlAnlagen: number
  Leistung: number
}

export default function PVAnlagenTile() {
  const [data] = PVData as PVAnlagenDataType[]

  return (
    <EnergyTile
      dataRetrieval={format(new Date(), 'dd.MM.yyyy')}
      dataSource={'Marktstammdatenregister'}
      embedId="energy-PVAnlagen"
      live
      title={
        <>
          <AnimatedNumber className="font-medium">
            {data.AnzahlAnlagen}
          </AnimatedNumber>{' '}
          PV-Anlagen
        </>
      }
    >
      <PVAnlagenContent></PVAnlagenContent>
    </EnergyTile>
  )
}
