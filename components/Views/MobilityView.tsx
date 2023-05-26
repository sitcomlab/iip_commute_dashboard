import Columns from '../Layout/Columns'
import BicycleChartTile from '../Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '../Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '../Tiles/Mobility/Bus'
import MasterplanTile from '../Tiles/Mobility/MasterplanTile'
import ModalSplitTile from '../Tiles/Mobility/ModalSplit'
import BaseView from './BaseView'

export default function MobilityView() {
  return (
    // @ts-expect-error Server Component
    <BaseView type="mobility">
      <Columns>
        <BicycleChartTile />
        {/* @ts-expect-error Server Component */}
        <StadtradelnTile />
        <BusTile />
        <MasterplanTile />
      </Columns>
      {/* @ts-expect-error Server Component */}
      <ModalSplitTile />
    </BaseView>
  )
}
