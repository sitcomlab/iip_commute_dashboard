import Columns from '@/components/Layout/Columns'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import ClimateIndicesTile from '@/components/Tiles/Climate/ClimateIndices'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import GarbageTile from '@/components/Tiles/Climate/Garbage'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'

export default function Climate() {
  return (
    <>
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
    </>
  )
}
