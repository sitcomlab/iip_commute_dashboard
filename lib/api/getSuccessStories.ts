import directus, { successStoriesCollectionName } from '../directus'

export default async function getSuccessStoriesForCategory(category: string) {
  const { data } = await directus
    .items(successStoriesCollectionName)
    .readByQuery({
      filter: {
        category,
      },
      limit: 3,
    })

  return data
}
