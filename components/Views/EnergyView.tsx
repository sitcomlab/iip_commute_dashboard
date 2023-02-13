import Columns from '../Layout/Columns'
import SectionHeader from '../Layout/SectionHeader'
import PhotovoltTile from '../Tiles/Energy/PhotovoltTile'
import WindEnergyTile from '../Tiles/Energy/WindEnergyTile'

export default function EnergyView() {
  return (
    <>
      <SectionHeader variant="energy" />

      <Columns>
        <PhotovoltTile />
        <WindEnergyTile />
      </Columns>
    </>
  )
}
