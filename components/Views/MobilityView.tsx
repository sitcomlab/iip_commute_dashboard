import Columns from '../Layout/Columns'
import BicycleChartTile from '../Tiles/Mobility/Bicycle/BicycleChartTile'
import BusTile from '../Tiles/Mobility/Bus'
import ModalSplitTile from '../Tiles/Mobility/ModalSplit'
import BikeInfrastructTile from '../Tiles/Mobility/BikeInfrastructTile'
import TrafficloadTile from '../Tiles/Mobility/TrafficloadTile'
import BaseView from './BaseView'


export default function MobilityView() {
  return (
    <BaseView type="mobility">
      <BikeInfrastructTile />
      <Columns>
        <BicycleChartTile />

        <BusTile />

      </Columns>

      <ModalSplitTile />

      <TrafficloadTile />
    </BaseView>
  )
}
