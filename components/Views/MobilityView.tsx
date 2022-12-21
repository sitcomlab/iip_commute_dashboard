import Columns from '../Layout/Columns'
import SectionHeader from '../Layout/SectionHeader'
import BicycleChartTile from '../Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '../Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '../Tiles/Mobility/Bus'

export default function MobilityView() {
  return (
    <>
      <SectionHeader variant="mobility" />
      <Columns>
        <BicycleChartTile />
        <StadtradelnTile />
        <BusTile />
      </Columns>
    </>
  )
}
