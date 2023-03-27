'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import InsightsTile from './InsightsTile'
import { directusImage } from '@/lib/directus'
import '@splidejs/react-splide/css'
import useDevice from '@/hooks/useDevice'

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
    <Splide
      options={{
        arrows: false,
        gap: '1.5rem',
        padding: padding[device],
        pagination: false,
        perPage: pages[device],
      }}
    >
      {insights?.map(({ slug, title, image }) => (
        <SplideSlide key={slug}>
          <InsightsTile
            image={directusImage(image)}
            link={`/sammlung/${slug}`}
            title={title}
          />
        </SplideSlide>
      ))}
    </Splide>
  )
}
