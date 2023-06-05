import Columns from '../Layout/Columns'
import ClimateIndicesTile from '../Tiles/Climate/ClimateIndices'
import CO2EmissionsTile from '../Tiles/Climate/CO2EmissionsTile'
import ClimateDevelopmentTile from '../Tiles/Climate/Devlopment'
import GarbageTile from '../Tiles/Climate/Garbage'
import WeatherTile from '../Tiles/Climate/WeatherTile'
import DataCountTile from '../Tiles/Data/DataCountTile'
import BaseView from './BaseView'

export default function ClimateView() {
  return (
    // @ts-expect-error Server Component
    <BaseView type="climate">
      <Columns>
        <WeatherTile />
        <ClimateDevelopmentTile />
      </Columns>
      {/* @ts-expect-error Server Component */}
      <CO2EmissionsTile />
      {/* @ts-expect-error Server Component */}
      <ClimateIndicesTile />
      {/* @ts-expect-error Server Component */}
      <GarbageTile />
      {/* @ts-expect-error Server Component */}
      <DataCountTile />
    </BaseView>
  )
}
