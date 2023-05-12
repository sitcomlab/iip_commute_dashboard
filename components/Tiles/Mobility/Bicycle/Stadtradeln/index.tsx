import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import MobilityTile from '@/components/Tiles/Mobility/MobilityTile'
import ChartContainer from './ChartContainer'
import getTileData from '@/lib/api/getTileData'

export default async function StadtradelnTile() {
  const data = await getTileData('mobility-stadtradeln')
  const infoText = data?.info ?? ''

  return (
    <MobilityTile
      dataRetrieval="01.01.2022"
      dataSource="Stadtradeln"
      embedId="mobility-stadtradeln"
      subtitle="auf der Überholspur"
      title="Stadtradeln"
    >
      <ChartContainer />
      <Spacer />
      <Title as="h5">{infoText}</Title>
    </MobilityTile>
  )
}
