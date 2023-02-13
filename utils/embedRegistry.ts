import EcoProfitTile from '@/components/Tiles/Buildings/EcoProfit'
import ClimateIndicesTile from '@/components/Tiles/Climate/ClimateIndices'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import PhotovoltTile from '@/components/Tiles/Energy/PhotovoltTile'
import WindEnergyTile from '@/components/Tiles/Energy/WindEnergyTile'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '@/components/Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '@/components/Tiles/Mobility/Bus'
import ModalSplitTile from '@/components/Tiles/Mobility/ModalSplit'

const embedRegistry = {
  wetter: WeatherTile,
  klima: ClimateDevelopmentTile,
  CO2: CO2EmissionsTile,
  radlerinnen: BicycleChartTile,
  bus: BusTile,
  stadtradeln: StadtradelnTile,
  klimakenntage: ClimateIndicesTile,
  modalsplit: ModalSplitTile,
  ecoProfit: EcoProfitTile,
  photovolt: PhotovoltTile,
  windenergy: WindEnergyTile,
}

export default embedRegistry
