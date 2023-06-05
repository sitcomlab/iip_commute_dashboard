import InsightsContainer from '@/components/Insights/InsightsContainer'
import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'
import directus, {
  mainPageName,
  successStoriesCollectionName,
  tileCollectionName,
} from '@/lib/directus'
import getTilesBucket, { BaseTile } from '@/utils/fullWidthBucket'
import { SurveyTileProps } from '@/components/Tiles/Survey'
import { SuccessStoryTileProps } from '@/components/Tiles/SuccessStory'
import TileFactory, { TileType } from '@/utils/TileFactory'
import { getSurveyData } from '@/lib/api/getSurveyData'
import { ID } from '@directus/sdk'
import ClimateView from '@/components/Views/ClimateView'
import MobilityView from '@/components/Views/MobilityView'
import BuildingsView from '@/components/Views/BuildingsView'
import EnergyView from '@/components/Views/EnergyView'

const getMainPageSettings = async () => {
  const data = await directus.items(mainPageName).readOne(1, {
    fields: ['tiles.*'],
    deep: {
      tiles: {},
    },
  })

  return data
}

const getTileType = async (tileID: string) => {
  const data = await directus.items(tileCollectionName).readOne(tileID)

  return data?.tile_id
}

const getSuccessStoryData = async (
  surveyID: ID,
): Promise<SuccessStoryTileProps> => {
  const data = await directus
    .items(successStoriesCollectionName)
    .readOne(surveyID)
  return {
    link: data?.link ?? '',
    text: data?.text ?? '',
    image: data?.image,
    imagePosition: data?.image_position,
    moreInfo: data?.details,
    id: data?.id ?? '',
  }
}

const getTileComponent = async (tile: BaseTile) => {
  let props:
    | { surveyData?: SurveyTileProps; successStoryData?: SuccessStoryTileProps }
    | undefined
  let type: TileType
  if (tile.collection === 'survey') {
    const surveyData = await getSurveyData(tile.item)
    props = { surveyData }
    type = 'survey'
  } else if (tile.collection === 'successStory') {
    const successStoryData = await getSuccessStoryData(tile.item)
    props = { successStoryData }
    type = 'successStory'
  } else {
    type = (await getTileType(tile.item as string)) as TileType
  }

  // @ts-expect-error Server Component
  return <TileFactory key={tile.item} type={type} {...props} />
}

const getTileComponents = async (tiles: BaseTile[]) => {
  return Promise.all(
    tiles.map(async t => {
      return await getTileComponent(t)
    }),
  )
}

export default async function Home() {
  const settings = await getMainPageSettings()

  const { tiles } = settings

  // const sortedTiles = tiles.sort((a, b) => a.sort - b.sort)

  // sort tiles into buckets indicating full width display or column display
  const tileBuckets = await getTilesBucket(tiles)

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
          <ClimateView />
          <MobilityView />
          <BuildingsView />
          <EnergyView />
        </Container>
      </AnimatedPage>
    </div>
  )
}

export const revalidate = 60
