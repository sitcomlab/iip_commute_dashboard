import MobilityTile from '../MobilityTile'
import AWMContent from './AWMContent'

export default function AWMTile() {
  return (
    <MobilityTile
      dataSource="awm Abfallwirtschaftsbetriebe Münster"
      embedId="mobility-awm"
      live
      subtitle="Anzahl der emissionsarm angetriebenen Müllfahrzeuge im Vergleich zu Fahrzeugen mit fossilem Antrieb"
      title="E-Mobilität awm"
    >
      <AWMContent />
    </MobilityTile>
  )
}
