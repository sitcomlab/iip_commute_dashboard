import directus, { insightsCollectionName } from '@/lib/directus'
import { use } from 'react'
import Container from '../Layout/Container'
import InsightsTile from './InsightsTile'

const getInsightsData = async () => {
  const { data } = await directus.items(insightsCollectionName).readByQuery({
    filter: {
      status: 'published',
    },
    limit: 3,
  })
  return data
}

export default function InsightsContainer() {
  const insights = use(getInsightsData())

  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-0 -z-10 h-1/3 w-full bg-primary-light"></div>
      <Container>
        <div className="flex w-full flex-col items-center justify-between space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
          {insights?.map(({ id, title, link, image }) => (
            <div className="flex-1 self-stretch" key={id}>
              <InsightsTile
                image={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}`}
                link={link}
                title={title}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
