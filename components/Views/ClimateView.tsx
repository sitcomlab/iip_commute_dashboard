import Columns from '../Layout/Columns'
import SectionHeader from '../Layout/SectionHeader'
import ClimateIndicesTile from '../Tiles/Climate/ClimateIndices'
import CO2EmissionsTile from '../Tiles/Climate/CO2EmissionsTile'
import ClimateDevelopmentTile from '../Tiles/Climate/Devlopment'
import WeatherTile from '../Tiles/Climate/WeatherTile'

export default function ClimateView() {
  return (
    <>
      <SectionHeader variant="climate" />

      <Columns>
        <WeatherTile />
        <ClimateDevelopmentTile />
      </Columns>
      <CO2EmissionsTile />
      <ClimateIndicesTile />
    </>
  )
}
