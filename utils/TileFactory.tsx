import EcoProfitTile from '@/components/Tiles/Buildings/EcoProfit'
import EnergyComsumptionTile from '@/components/Tiles/Buildings/EnergyConsumption'
import ClimateIndicesTile from '@/components/Tiles/Climate/ClimateIndices'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import GarbageTile from '@/components/Tiles/Climate/Garbage'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import EnergietraegerTile from '@/components/Tiles/Energy/EnergietraegerTile'
import PhotovoltTile from '@/components/Tiles/Energy/PhotovoltTile'
import WindEnergyTile from '@/components/Tiles/Energy/WindEnergyTile'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import StadtradelnTile from '@/components/Tiles/Mobility/Bicycle/Stadtradeln'
import BusTile from '@/components/Tiles/Mobility/Bus'
import ModalSplitTile from '@/components/Tiles/Mobility/ModalSplit'
import SuccessStoryTile, {
  SuccessStoryTileProps,
} from '@/components/Tiles/SuccessStory'
import SurveyTile, { SurveyTileProps } from '@/components/Tiles/Survey'
import {
  BuildingsTypes,
  ClimateTypes,
  EnergyTypes,
  MobilityTypes,
  TileTypePrefix,
} from '@/types/tile'

type TileTypeSuffix =
  | ClimateTypes
  | MobilityTypes
  | BuildingsTypes
  | EnergyTypes

type SuccessStoryTileType = 'successStory'
type SurveyTileType = 'survey'

export type TileType =
  | SuccessStoryTileType
  | SurveyTileType
  | `${TileTypePrefix}-${TileTypeSuffix}`

interface TileFactoryProps {
  type: TileType
  successStoryData?: SuccessStoryTileProps
  surveyData?: SurveyTileProps
}

export default function TileFactory({ type, ...props }: TileFactoryProps) {
  switch (type) {
    // ---- WEATHER ----
    case 'climate-weather':
      return <WeatherTile />
    case 'climate-co2':
      // @ts-expect-error Server Component
      return <CO2EmissionsTile />
    case 'climate-indices':
      // @ts-expect-error Server Component
      return <ClimateIndicesTile />
    case 'climate-development':
      return <ClimateDevelopmentTile />
    case 'climate-garbage':
      // @ts-expect-error Server Component
      return <GarbageTile />

    // ---- BUILDINGS ----
    case 'building-ecoProfit':
      return <EcoProfitTile />
    case 'building-energyConsumption':
      // @ts-expect-error Server Component
      return <EnergyComsumptionTile />

    // ---- ENERGY ----
    case 'energy-PV':
      return <PhotovoltTile />
    case 'energy-wind':
      return <WindEnergyTile />
    case 'energy-energietraeger':
      // @ts-expect-error Server Component
      return <EnergietraegerTile />

    // ---- MOBILITY ----
    case 'mobility-bicycle':
      return <BicycleChartTile />
    case 'mobility-stadtradeln':
      // @ts-expect-error Server Component
      return <StadtradelnTile />
    case 'mobility-bus':
      return <BusTile />
    case 'mobility-modalSplit':
      // @ts-expect-error Server Component
      return <ModalSplitTile />

    // ---- SURVEY ----
    case 'survey':
      if (!props.surveyData) {
        return null
      }
      return <SurveyTile {...props.surveyData} />

    // ---- SUCCESS-STORY ----
    case 'successStory':
      if (!props.successStoryData) {
        return null
      }
      return <SuccessStoryTile {...props.successStoryData} />

    default:
      return null
  }
}
