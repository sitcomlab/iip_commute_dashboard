import { Directus, ID } from '@directus/sdk'

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

export const collectionsName = 'collections'
export const tileCollectionName = 'tiles'
export const successStoriesCollectionName = 'klima_success_stories'
export const surveyCollectionName = 'survey'

export type Collection = {
  id: ID
  status: 'draft' | 'archived' | 'published'
  title: string
  description?: string
  image: string
  tiles: {
    id: ID
    collections_id: ID
    tiles_id: string
  }[]
  surveys: {
    id: ID
    collections_id: ID
    survey_id: string
  }[]
}

export type Tile = {
  id: ID
  name: string
  group: any
  full_width: boolean
}

export type SuccessStory = {
  id: ID
  status: 'draft' | 'archived' | 'published'
  text: string
  link: string
  image?: string
  image_position: 'left' | 'right'
}

export type Survey = {
  id: ID
  status: 'draft' | 'archived' | 'published'
  question: string
  answer_percent: number
  answer_text: string
}

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DirectusCollection = {
  collections: Collection
  tiles: Tile
  klima_success_stories: SuccessStory
  survey: Survey
}

const directus = new Directus<DirectusCollection>(directusUrl)

export default directus

export function directusImage(image?: string) {
  if (!image) {
    return undefined
  }

  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}`
}
