import BusTile from '@/components/Tiles/Mobility/Bus'
import BikeInfrastructTile from '@/components/Tiles/Mobility/BikeInfrastructTile'

import {
  BuildingsTypes,
  MobilityTypes,
  TileTypePrefix,
} from '@/types/tile'
import { ID } from '@directus/sdk'
import WeatherTile from '@/components/Tiles/Mobility/WeatherTile'

type TileTypeSuffix =
  | MobilityTypes
  | BuildingsTypes
  | ID

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

/**
 * The TileFactory is a helper function to create tiles dynamically.
 *
 * @param param TileFactoryProps
 * @returns Tile
 */
export default async function TileFactory({
  type,
  ...props
}: TileFactoryProps) {
  if (type.startsWith('survey')) {
    const [_, id] = type.split('survey-')
    if (props.surveyData) {
      return <></>
    }
    const data = await getSurveyData(id)
    if (!data) {
      return null
    }
    return <></>
  }

  if (type.startsWith('successStory')) {
    const [_, id] = type.split('successStory-')
    if (props.successStoryData) {
      return <></>
    }
    const data = await getSuccessStoryData(id)
    if (!data) {
      return null
    }
    return <></>
  }

  switch (type) {

    // ---- MOBILITY ----
    case 'mobility-bicycleInfrastructure':
      return <BikeInfrastructTile />
    case 'mobility-bus':
      return <BusTile />

    case 'mobility-bike-osnabrueck':
      return <BikeInfrastructTile city="osnabrueck"/>
    case 'mobility-bike-muenster':
      return <BikeInfrastructTile city="muenster"/>
    case 'mobility-weatherTile-muenster':
      return <WeatherTile lat="51.962" lon="7.627"/>
    case 'mobility-weatherTile-muenster':
      return <WeatherTile lat="52.279" lon="8.047"/>

    default:
      return null
  }
}
