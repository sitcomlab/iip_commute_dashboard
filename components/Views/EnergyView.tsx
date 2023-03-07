import Columns from '../Layout/Columns'
import PhotovoltTile from '../Tiles/Energy/PhotovoltTile'
import WindEnergyTile from '../Tiles/Energy/WindEnergyTile'
import BaseView from './BaseView'

export default function EnergyView() {
  return (
    <BaseView type="energy">
      <Columns>
        <PhotovoltTile />
        <WindEnergyTile />
      </Columns>
    </BaseView>
  )
}
