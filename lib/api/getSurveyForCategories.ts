import directus, { surveyCollectionName } from '../directus'

export default async function getSurveysForCategory(category: string) {
  const { data } = await directus.items(surveyCollectionName).readByQuery({
    filter: {
      category,
    },
  })

  return data
}
