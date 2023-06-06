'use client'

import InsightsTile from './InsightsTile'
import { directusImage } from '@/lib/directus'
import useDevice from '@/hooks/useDevice'
import Carousel from '../Elements/Carousel'

const pages = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
}

const padding = {
  desktop: '82px',
  tablet: '16px',
  mobile: '16px',
}

type Insight = {
  image: string
  slug?: string | undefined
  title: string
}

export default function InsightsCarousel({
  insights,
}: {
  insights: Insight[]
}) {
  const device = useDevice()

  return (
    <Carousel
      arrows={device != 'desktop'}
      options={{
        gap: '1.5rem',
        padding: padding[device],
        perPage: pages[device],
      }}
    >
      {insights?.map(({ slug, title, image }) => (
        <InsightsTile
          image={directusImage(image)}
          key={slug}
          link={`/sammlung/${slug}`}
          title={title}
        />
      ))}
    </Carousel>
  )
}
