import { Directus, ID } from '@directus/sdk'

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

export const insightsCollectionName = 'klima_insights'

export type Insights = {
  id: ID
  status: 'draft' | 'archived' | 'published'
  title: string
  link: string
  image: string
}

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DirectusCollection = {
  klima_insights: Insights
}

const directus = new Directus<DirectusCollection>(directusUrl)

export default directus
