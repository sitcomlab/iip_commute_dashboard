import Columns from '@/components/Layout/Columns'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '@/components/Tiles/Mobility/Bicycle/Stadtradeln'

export default function Climate() {
  return (
    <>
      <Columns>
        <BicycleChartTile />
        <StadtradelnTile />
      </Columns>
    </>
  )
}
