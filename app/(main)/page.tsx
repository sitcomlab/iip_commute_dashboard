import InsightsContainer from '@/components/Insights/InsightsContainer'
import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'

import BaseView from '@/components/Views/BaseView'
import Columns from '@/components/Layout/Columns'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import PhotovoltTile from '@/components/Tiles/Energy/PhotovoltTile'
import EnergietraegerTile from '@/components/Tiles/Energy/EnergietraegerTile'
import WindEnergyTile from '@/components/Tiles/Energy/WindEnergyTile'
import TrafficloadTile from '@/components/Tiles/Mobility/TrafficloadTile'
import BusTile from '@/components/Tiles/Mobility/Bus'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import EnergyComsumptionTile from '@/components/Tiles/Buildings/EnergyConsumption'

// const getMainPageSettings = async () => {
//   const data = await directus.items(mainPageName).readOne(1, {
//     fields: ['tiles.*'],
//     deep: {
//       tiles: {},
//     },
//   })

//   return data
// }

// const getTileType = async (tileID: string) => {
//   const data = await directus.items(tileCollectionName).readOne(tileID)

//   return data?.tile_id
// }

// const getSuccessStoryData = async (
//   surveyID: ID,
// ): Promise<SuccessStoryTileProps> => {
//   const data = await directus
//     .items(successStoriesCollectionName)
//     .readOne(surveyID)
//   return {
//     link: data?.link ?? '',
//     text: data?.text ?? '',
//     image: data?.image,
//     imagePosition: data?.image_position,
//     moreInfo: data?.details,
//     id: data?.id ?? '',
//   }
// }

// const getTileComponent = async (tile: BaseTile) => {
//   let props:
//     | { surveyData?: SurveyTileProps; successStoryData?: SuccessStoryTileProps }
//     | undefined
//   let type: TileType
//   if (tile.collection === 'survey') {
//     const surveyData = await getSurveyData(tile.item)
//     props = { surveyData }
//     type = 'survey'
//   } else if (tile.collection === 'successStory') {
//     const successStoryData = await getSuccessStoryData(tile.item)
//     props = { successStoryData }
//     type = 'successStory'
//   } else {
//     type = (await getTileType(tile.item as string)) as TileType
//   }

//
//   return <TileFactory key={tile.item} type={type} {...props} />
// }

// const getTileComponents = async (tiles: BaseTile[]) => {
//   return Promise.all(
//     tiles.map(async t => {
//       return await getTileComponent(t)
//     }),
//   )
// }

export default async function Home() {
  // const settings = await getMainPageSettings()

  // const { tiles } = settings

  // const sortedTiles = tiles.sort((a, b) => a.sort - b.sort)

  // sort tiles into buckets indicating full width display or column display
  // const tileBuckets = await getTilesBucket(tiles)

  return (
    <div className="-translate-y-52">
      <AnimatedPage>
        <InsightsContainer />
        <Container>
          {/* {await Promise.all(
            tileBuckets.map(async ({ tiles, isFullWidth }, i) => {
              if (isFullWidth) {
                return await getTileComponents(tiles)
              }

              return <Columns key={i}>{await getTileComponents(tiles)}</Columns>
            }),
          )} */}
          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="climate"
          >
            <CO2EmissionsTile />
            <Columns>
              <WeatherTile />
              <ClimateDevelopmentTile />
            </Columns>
          </BaseView>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="energy"
          >
            <Columns>
              <PhotovoltTile />
              <WindEnergyTile />
              <EnergietraegerTile />
            </Columns>
          </BaseView>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="mobility"
          >
            <TrafficloadTile />
            <Columns>
              <BusTile />
              <BicycleChartTile />
            </Columns>
          </BaseView>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="building"
          >
            <EnergyComsumptionTile />
          </BaseView>
        </Container>
      </AnimatedPage>
    </div>
  )
}

export const revalidate = 60
