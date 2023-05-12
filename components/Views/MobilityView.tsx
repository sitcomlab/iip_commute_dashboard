import Columns from '../Layout/Columns'
import BicycleChartTile from '../Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '../Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '../Tiles/Mobility/Bus'
import ModalSplitTile from '../Tiles/Mobility/ModalSplit'
import BaseView from './BaseView'

export default function MobilityView() {
  return (
    <BaseView type="mobility">
      <Columns>
        <BicycleChartTile />
        <StadtradelnTile />
        <BusTile />
      </Columns>
      {/* @ts-expect-error Server Component */}
      <ModalSplitTile />
    </BaseView>
  )
}
