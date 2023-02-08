import Columns from '../Layout/Columns'
import SectionHeader from '../Layout/SectionHeader'
import EcoProfitTile from '../Tiles/Buildings/EcoProfit'

export default function BuildingsView() {
  return (
    <>
      <SectionHeader variant="building" />

      <Columns>
        <EcoProfitTile />
      </Columns>
    </>
  )
}
