import { TileType } from '@/utils/TileFactory'
import { Directus, ID } from '@directus/sdk'

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

export const collectionsName = 'collections'
export const tileCollectionName = 'tiles'
export const surveyCollectionName = 'survey'
export const successStoriesCollectionName = 'successStory'

export type DirectusStatus = 'draft' | 'archived' | 'published'

export type Collection = {
  id: ID
  status: DirectusStatus
  title: string
  description?: string
  image: string
  slug?: string
  tiles: {
    id: ID
    collections_id: ID
    item: ID
    collection: typeof tileCollectionName | typeof surveyCollectionName
    sort: number
  }[]
}

export type Tile = {
  id: ID
  name: string
  group: any
  full_width: boolean
  tile_id: TileType
  details: string
  data_url: string
  info: string
}

export type SuccessStory = {
  id: ID
  status: DirectusStatus
  text: string
  link: string
  image?: string
  image_position: 'left' | 'right'
}

export type Survey = {
  id: ID
  status: DirectusStatus
  question: string
  answer_percent: number
  answer_text: string
  category: string
}

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DirectusCollection = {
  collections: Collection
  tiles: Tile
  successStory: SuccessStory
  survey: Survey
}

const directus = new Directus<DirectusCollection>(directusUrl)

export default directus

export function directusImage(image: string) {
  return `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image}`
}
