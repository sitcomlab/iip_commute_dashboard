import Columns from '@/components/Layout/Columns'
import SurveyTile from '@/components/Tiles/Survey'
import directus, {
  collectionsName,
  surveyCollectionName,
  tileCollectionName,
} from '@/lib/directus'
import embedRegistry from '@/utils/embedRegistry'
import { tileIdRegistry } from '@/utils/tileIdRegistry'
import { notFound } from 'next/navigation'

// ISR
export async function generateStaticParams() {
  const { data } = await directus.items(collectionsName).readByQuery({
    fields: ['id'],
    filter: {
      status: 'published',
    },
  })

  if (!data) {
    return
  }

  return data.map(({ id }) => ({
    id,
  }))
}

// revalidate each minute
export const revalidate = 60

const getCollection = async (collectionId: string) => {
  const data = await directus.items(collectionsName).readOne(collectionId, {
    fields: ['title', 'description', 'tiles.tiles_id', 'surveys.*'],
  })

  return data
}

const isFullWidth = async (tileId: string) => {
  const data = await directus.items(tileCollectionName).readOne(tileId, {
    fields: ['full_width'],
  })

  return data?.full_width === true
}

const getTileComponent = (tileID: keyof typeof tileIdRegistry) => {
  return embedRegistry[tileIdRegistry[tileID]]
}

const getSurvey = async (surveyID: string) => {
  return await directus.items(surveyCollectionName).readOne(surveyID)
}

export default async function Collection({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  if (!id) {
    return notFound()
  }

  const collection = await getCollection(id)

  if (!collection) {
    return notFound()
  }

  const { tiles, surveys } = collection

  const tileIDs = tiles.map(({ tiles_id }) => tiles_id)
  const surveyIDs = surveys.map(({ survey_id }) => survey_id)

  // super complex and probably overkill function to seperate fill width from normal tiles
  type TilesBucket = {
    tiles: string[]
    isFullWidth: boolean
  }
  let bucketIndex = 0
  const fullWidthIndex = await tileIDs.reduce(async function (aP, e) {
    const a = await aP
    if (!a[bucketIndex]) {
      a[bucketIndex] = {
        tiles: [],
        isFullWidth: false,
      }
    }
    if (!(await isFullWidth(e))) {
      a[bucketIndex].tiles.push(e)
    } else {
      bucketIndex++
      a[bucketIndex] = {
        tiles: [],
        isFullWidth: true,
      }
      a[bucketIndex].tiles.push(e)
      bucketIndex++
    }
    return a
  }, Promise.resolve<TilesBucket[]>([]))

  return (
    <>
      {fullWidthIndex.map(({ tiles, isFullWidth }, i) => {
        if (isFullWidth) {
          return tiles.map(t => {
            const Tile = getTileComponent(t)
            return <Tile key={t} />
          })
        }

        return (
          <Columns key={i}>
            {tiles.map(t => {
              const Tile = getTileComponent(t)
              return <Tile key={t} />
            })}
          </Columns>
        )
      })}
      <Columns>
        {await Promise.all(
          surveyIDs.map(async sID => {
            const data = await getSurvey(sID)
            if (!data) {
              return <></>
            }
            return (
              <SurveyTile
                answer={{
                  percent: data.answer_percent,
                  text: data.answer_text,
                }}
                key={sID}
                question={data.question}
              ></SurveyTile>
            )
          }),
        )}
      </Columns>
    </>
  )
}
