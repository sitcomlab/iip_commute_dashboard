import Columns from '@/components/Layout/Columns'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '@/components/Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '@/components/Tiles/Mobility/Bus'
import ModalSplitTile from '@/components/Tiles/Mobility/ModalSplit'

export default function Climate() {
  return (
    <>
      <Columns>
        <BicycleChartTile />
        {/* @ts-expect-error Server Component */}
        <StadtradelnTile />
        <BusTile />
      </Columns>
      {/* @ts-expect-error Server Component */}
      <ModalSplitTile />
    </>
  )
}
