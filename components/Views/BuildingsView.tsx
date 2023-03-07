import Columns from '../Layout/Columns'
import EcoProfitTile from '../Tiles/Buildings/EcoProfit'
import BaseView from './BaseView'

export default function BuildingsView() {
  return (
    <BaseView type="building">
      <Columns>
        <EcoProfitTile />
      </Columns>
    </BaseView>
  )
}
