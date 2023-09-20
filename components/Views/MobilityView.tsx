import Columns from '../Layout/Columns'
import AWMTile from '../Tiles/Mobility/AWM'
import BicycleChartTile from '../Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '../Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '../Tiles/Mobility/Bus'
import MasterplanTile from '../Tiles/Mobility/MasterplanTile'
import ModalSplitTile from '../Tiles/Mobility/ModalSplit'
import BikeInfrastructTile from '../Tiles/Mobility/BikeInfrastructTile'
import PassengerTile from '../Tiles/Mobility/PassengerTile'
import TrafficloadTile from '../Tiles/Mobility/TrafficloadTile'
import BaseView from './BaseView'


export default function MobilityView() {
  return (
    <BaseView type="mobility">
      <BikeInfrastructTile />
      <Columns>
        <BicycleChartTile />

        <StadtradelnTile />
        <BusTile />

        <AWMTile />
      </Columns>
      <Columns>
        <MasterplanTile />
        <PassengerTile />
      </Columns>

      <ModalSplitTile />

      <TrafficloadTile />
    </BaseView>
  )
}
