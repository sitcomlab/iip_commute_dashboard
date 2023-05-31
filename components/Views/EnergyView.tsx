import Columns from '../Layout/Columns'
import EnergietraegerTile from '../Tiles/Energy/EnergietraegerTile'
import LanternsTile from '../Tiles/Energy/LanternsTile'
import PhotovoltTile from '../Tiles/Energy/PhotovoltTile'
import WindEnergyTile from '../Tiles/Energy/WindEnergyTile'
import BaseView from './BaseView'

export default function EnergyView() {
  return (
    // @ts-expect-error Server Component
    <BaseView type="energy">
      <Columns>
        <PhotovoltTile />
        <WindEnergyTile />
        {/* @ts-expect-error Server Component */}
        <EnergietraegerTile />
        <LanternsTile />
      </Columns>
    </BaseView>
  )
}
