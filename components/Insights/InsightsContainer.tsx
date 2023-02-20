import directus, { collectionsName } from '@/lib/directus'
import withSuspense from '@/utils/withSuspense'
import Container from '../Layout/Container'
import InsightsTile from './InsightsTile'

const getInsightsData = async () => {
  const { data } = await directus.items(collectionsName).readByQuery({
    fields: ['id', 'title', 'image'],
    filter: {
      status: 'published',
    },
    limit: 3,
  })

  return data
}

// const getTile = async (relationId: number) => {
//   const { data } = await directus.items(tileCollectionRelation).readByQuery({
//     f
//   })

//   return data
// }

async function InsightsContainer() {
  const insights = await getInsightsData()

  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0 -z-10 h-1/3 w-full bg-primary-light"></div>
      <Container>
        <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row ">
          {insights?.map(({ id, title, image }) => (
            <div className="flex-1 self-stretch" key={id}>
              <InsightsTile
                image={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}`}
                link={`/sammlung/${id}`}
                title={title}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

const Fallback = (
  <div className="relative w-full">
    <Container>
      <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="h-96 w-full flex-1 animate-pulse self-stretch rounded-KD bg-zinc-100" />
        <div className="h-96 w-full flex-1 animate-pulse self-stretch rounded-KD bg-zinc-100" />
        <div className="h-96 w-full flex-1 animate-pulse self-stretch rounded-KD bg-zinc-100" />
      </div>
    </Container>
  </div>
)

export default withSuspense(InsightsContainer, Fallback)
