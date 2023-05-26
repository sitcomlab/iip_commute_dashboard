import Columns from '../Layout/Columns'
import EcoProfitTile from '../Tiles/Buildings/EcoProfit'
import EnergyComsumptionTile from '../Tiles/Buildings/EnergyConsumption'
import RenovationTile from '../Tiles/Buildings/Renovation'
import BaseView from './BaseView'

export default function BuildingsView() {
  return (
    // @ts-expect-error Server Component
    <BaseView type="building">
      <Columns>
        <EcoProfitTile />
        {/* @ts-expect-error Server Component */}
        <RenovationTile />
      </Columns>
      {/* @ts-expect-error Server Component */}
      <EnergyComsumptionTile />
    </BaseView>
  )
}
