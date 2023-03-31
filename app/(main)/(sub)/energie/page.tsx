import Columns from '@/components/Layout/Columns'
import PhotovoltTile from '@/components/Tiles/Energy/PhotovoltTile'
import WindEnergyTile from '@/components/Tiles/Energy/WindEnergyTile'

export default function Energie() {
  return (
    <>
      <Columns>
        <PhotovoltTile />
        <WindEnergyTile />
      </Columns>
    </>
  )
}
