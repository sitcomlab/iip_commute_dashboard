import EnergyTile from '../EnergyTile'
import EnergietraegerChart from './EnergietraegerChart'

export default function EnergietraegerTile() {
  return (
    <EnergyTile
      dataSource={'Stadtwerke Münster'}
      embedId="energy-energietraeger"
      live
      title={'Energieträger'}
    >
      <div className="h-[600px]">
        <EnergietraegerChart />
      </div>
    </EnergyTile>
  )
}
