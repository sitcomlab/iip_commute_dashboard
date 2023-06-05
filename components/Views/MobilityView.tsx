import Columns from '../Layout/Columns'
import AWMTile from '../Tiles/Mobility/AWM'
import BicycleChartTile from '../Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '../Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '../Tiles/Mobility/Bus'
import MasterplanTile from '../Tiles/Mobility/MasterplanTile'
import ModalSplitTile from '../Tiles/Mobility/ModalSplit'
import PassengerTile from '../Tiles/Mobility/PassengerTile'
import TrafficloadTile from '../Tiles/Mobility/TrafficloadTile'
import BaseView from './BaseView'

export default function MobilityView() {
  return (
    // @ts-expect-error Server Component
    <BaseView type="mobility">
      <Columns>
        {/* @ts-expect-error Server Component */}
        <BicycleChartTile />
        {/* @ts-expect-error Server Component */}
        <StadtradelnTile />
        <BusTile />
        {/* @ts-expect-error Server Component */}
        <AWMTile />
        <MasterplanTile />
        <PassengerTile />
      </Columns>
      {/* @ts-expect-error Server Component */}
      <ModalSplitTile />
      {/* @ts-expect-error Server Component */}
      <TrafficloadTile />
    </BaseView>
  )
}
