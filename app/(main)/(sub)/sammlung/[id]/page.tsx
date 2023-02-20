import Columns from '@/components/Layout/Columns'
import directus, { collectionsName } from '@/lib/directus'
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
    fields: ['title', 'description', 'tiles.tiles_id'],
  })

  return data
}

const getTileComponent = (tileID: keyof typeof tileIdRegistry) => {
  return embedRegistry[tileIdRegistry[tileID]]
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

  const { title, description, tiles } = collection

  return (
    <Columns>
      {tiles &&
        tiles.map(t => {
          const Tile = getTileComponent(t.tiles_id)
          return <Tile key={t.tiles_id} />
        })}
    </Columns>
  )
}
