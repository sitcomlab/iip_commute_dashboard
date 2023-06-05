import getSurveysForCategory from '@/lib/api/getSurveyForCategories'
import { GoToButton } from '../Elements/GoToButton'
import { Spacer } from '../Elements/Spacer'
import SectionHeader from '../Layout/SectionHeader'
import Columns from '../Layout/Columns'
import SurveyTile from '../Tiles/Survey'
import getSuccessStoriesForCategory from '@/lib/api/getSuccessStories'
import SuccessStoryTile from '../Tiles/SuccessStory'

interface ViewProps {
  type: 'climate' | 'mobility' | 'energy' | 'building'
  children: React.ReactNode | React.ReactNode[]
}

const categoryID = {
  climate: '8f6f89ac-d6bf-4e6c-8445-d1503075963a',
  mobility: '4fa0c731-13d7-4ce9-8407-91a8a71da1cb',
  energy: '0c7620c0-7d0c-45e7-b801-0bc44715f731',
  building: '84ff5cfe-184a-41dd-885d-ff9c2c8c9dcf',
}

export default async function BaseView({ type, children }: ViewProps) {
  const surveys = await getSurveysForCategory(categoryID[type])
  const success = await getSuccessStoriesForCategory(categoryID[type])

  return (
    <>
      <SectionHeader variant={type} />
      {children}
      {surveys && (
        <Columns>
          {surveys.map(survey => (
            <SurveyTile
              answer={{
                text: survey.answer_text,
                percent: survey.answer_percent,
              }}
              dataRetrieval={survey.dataRetrieval}
              dataSource={survey.dataSource}
              id={survey.id}
              key={survey.id}
              question={survey.question}
              title={survey.title}
            />
          ))}
        </Columns>
      )}
      {success && (
        <>
          {success.map(success => (
            <SuccessStoryTile
              id={success.id}
              image={success.image}
              imagePosition={success.image_position}
              key={success.id}
              link={success.link}
              moreInfo={success.details}
              text={success.text}
            />
          ))}
        </>
      )}
      <Spacer size={'sm'} />
      <GoToButton type={type} />
      <Spacer size={'xl'} />
    </>
  )
}
