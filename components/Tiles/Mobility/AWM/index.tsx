import { Spacer } from '@/components/Elements/Spacer'
import MobilityTile from '../MobilityTile'
import AWMContent from './AWMContent'
import Title from '@/components/Elements/Title'
import getTileData from '@/lib/api/getTileData'

export default async function AWMTile() {
  const data = await getTileData('mobility-awm')
  const infoText = data?.info ?? ''

  return (
    <MobilityTile
      dataSource="awm Abfallwirtschaftsbetriebe Münster"
      embedId="mobility-awm"
      live
      subtitle="Anzahl der emissionsarm angetriebenen Müllfahrzeuge im Vergleich zu Fahrzeugen mit fossilem Antrieb"
      title="E-Mobilität awm"
    >
      <AWMContent />
      <Spacer size={'lg'} />
      <Title as="h5">{infoText}</Title>
    </MobilityTile>
  )
}
