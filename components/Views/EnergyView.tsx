import Columns from '../Layout/Columns'
import SectionHeader from '../Layout/SectionHeader'
import PhotovoltTile from '../Tiles/Energy/PhotovoltTile'

export default function EnergyView() {
  return (
    <>
      <SectionHeader variant="energy" />

      <Columns>
        <PhotovoltTile />
      </Columns>
    </>
  )
}
