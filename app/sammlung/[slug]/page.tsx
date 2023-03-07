import Columns from '@/components/Layout/Columns'
import SurveyTile from '@/components/Tiles/Survey'
import directus, { collectionsName, surveyCollectionName } from '@/lib/directus'
import embedRegistry from '@/utils/embedRegistry'
import { tileIdRegistry } from '@/utils/tileIdRegistry'
import { ID } from '@directus/sdk'
import { notFound } from 'next/navigation'
import getTilesBucket, { BaseTile } from '@/utils/fullWidthBucket'

// ISR
export async function generateStaticParams() {
  const { data } = await directus.items(collectionsName).readByQuery({
    fields: ['slug'],
    filter: {
      status: 'published',
    },
  })

  if (!data) {
    return [{ slug: undefined }]
  }

  return data.map(({ slug }) => ({
    slug,
  }))
}

const getCollection = async (collectionSlug: string) => {
  const { data } = await directus.items(collectionsName).readByQuery({
    filter: {
      slug: collectionSlug,
    },
    fields: ['tiles.*'],
    deep: {
      tiles: {},
    },
  })

  return data
}

const getTileComponent = async (tile: BaseTile) => {
  if (tile.collection === 'survey') {
    return await getSurveyTile(tile.item)
  }
  const Tile = getDataTile(tile.item)
  return <Tile key={tile.item} />
}

const getTileComponents = async (tiles: BaseTile[]) => {
  return Promise.all(
    tiles.map(async t => {
      return await getTileComponent(t)
    }),
  )
}

const getDataTile = (tileID: keyof typeof tileIdRegistry) => {
  return embedRegistry[tileIdRegistry[tileID]]
}

const getSurveyTile = async (surveyID: ID) => {
  const data = await directus.items(surveyCollectionName).readOne(surveyID)
  if (!data) {
    return <div key={surveyID} />
  }
  return (
    <SurveyTile
      answer={{
        percent: data.answer_percent,
        text: data.answer_text,
      }}
      key={surveyID}
      question={data.question}
    ></SurveyTile>
  )
}

export default async function Collection({
  params,
}: {
  params?: { slug: string }
}) {
  if (!params) {
    return notFound()
  }

  const { slug } = params

  if (!slug) {
    return notFound()
  }

  const collection = await getCollection(slug)

  if (!collection || !collection[0]) {
    return notFound()
  }

  const { tiles } = collection[0]

  const sortedTiles = tiles.sort((a, b) => a.sort - b.sort)

  // sort tiles into buckets indicating full width display or column display
  const tileBuckets = await getTilesBucket(sortedTiles)

  return (
    <div>
      {await Promise.all(
        tileBuckets.map(async ({ tiles, isFullWidth }, i) => {
          if (isFullWidth) {
            return await getTileComponents(tiles)
          }

          return <Columns key={i}>{await getTileComponents(tiles)}</Columns>
        }),
      )}
    </div>
  )
}
