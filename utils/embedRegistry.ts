import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '@/components/Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '@/components/Tiles/Mobility/Bus'

type EmbedRegistry = {
  [key: string]: () => JSX.Element | Promise<JSX.Element>
}

const embedRegistry = {
  wetter: WeatherTile,
  klima: ClimateDevelopmentTile,
  CO2: CO2EmissionsTile,
  radlerinnen: BicycleChartTile,
  bus: BusTile,
  stadtradeln: StadtradelnTile,
}

export default embedRegistry
