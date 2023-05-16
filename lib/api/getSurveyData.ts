import { SurveyTileProps } from '@/components/Tiles/Survey'
import directus, { surveyCollectionName } from '../directus'
import { ID } from '@directus/sdk'

export const getSurveyData = async (surveyID: ID) => {
  try {
    const data = await directus.items(surveyCollectionName).readOne(surveyID)
    const props: SurveyTileProps = {
      answer: {
        text: data?.answer_text ?? '',
        percent: data?.answer_percent ?? 0,
      },
      question: data?.question ?? '',
      id: data?.id ?? '',
    }
    return props
  } catch (e) {
    return undefined
  }
}
