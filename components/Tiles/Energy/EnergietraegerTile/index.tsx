import getTileData from '@/lib/api/getTileData'
import EnergyTile from '../EnergyTile'
import EnergietraegerChart from './EnergietraegerChart'
import Title from '@/components/Elements/Title'
import { Spacer } from '@/components/Elements/Spacer'

export default async function EnergietraegerTile() {
  const data = await getTileData('energy-energietraeger')
  const infoText = data?.info ?? ''

  return (
    <EnergyTile
      dataSource={'Stadtwerke Münster'}
      embedId="energy-energietraeger"
      live
      subtitle={'Anteile am Stromverbrauch in Münster'}
      title={'Energieträger'}
    >
      <div className="h-[350px] md:h-[600px]">
        <EnergietraegerChart />
      </div>
      <Spacer />
      <Title as="h5" variant={'dark'}>
        {infoText}
      </Title>
    </EnergyTile>
  )
}
