import { Directus, ID } from '@directus/sdk'

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

export const insightsCollectionName = 'klima_insights'
export const successStoriesCollectionName = 'klima_success_stories'

export type Insights = {
  id: ID
  status: 'draft' | 'archived' | 'published'
  title: string
  link: string
  image: string
}

export type SuccessStory = {
  id: ID
  status: 'draft' | 'archived' | 'published'
  text: string
  link: string
  image?: string
  image_position: 'left' | 'right'
}

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DirectusCollection = {
  klima_insights: Insights
  klima_success_stories: SuccessStory
}

const directus = new Directus<DirectusCollection>(directusUrl)

export default directus

export function directusImage(image?: string) {
  if (!image) {
    return undefined
  }

  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}`
}
