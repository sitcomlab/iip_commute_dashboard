import WeatherTile from '@/components/Tiles/Climate/WeatherTile'
import { Spacer } from '@/components/Elements/Spacer'
import InsightsContainer from '@/components/Insights/InsightsContainer'
import BicycleChartTile from '@/components/Tiles/Mobility/Bicycle/BicycleChartTile'
import CO2EmissionsTile from '@/components/Tiles/Climate/CO2EmissionsTile'
import Container from '@/components/Layout/Container'
import Columns from '@/components/Layout/Columns'
import SuccessStoryTile from '@/components/Tiles/SuccessStory'
import directus, {
  directusImage,
  successStoriesCollectionName,
  surveyCollectionName,
} from '@/lib/directus'
import AnimatedPage from '@/components/Layout/AnimatedPage'
import StadtradelnTile from '@/components/Tiles/Mobility/Bicycle/Stadtradeln'
import SurveyTile from '@/components/Tiles/Survey'
import BusTile from '@/components/Tiles/Mobility/Bus'
import ClimateDevelopmentTile from '@/components/Tiles/Climate/Devlopment'
import SectionHeader from '@/components/Layout/SectionHeader'

export default async function Home() {
  const { data: successStories } = await directus
    .items(successStoriesCollectionName)
    .readByQuery({
      filter: {
        status: 'published',
      },
      limit: 2,
    })

  const { data: surveys } = await directus
    .items(surveyCollectionName)
    .readByQuery({
      filter: {
        status: 'published',
      },
      limit: 2,
    })

  return (
    <AnimatedPage>
      <InsightsContainer />
      <Container>
        <SectionHeader variant="climate" />

        <Columns>
          <WeatherTile />
          <ClimateDevelopmentTile />
        </Columns>
        <CO2EmissionsTile />
        <Columns>
          {surveys && surveys[0] && (
            <SurveyTile
              answer={{
                percent: surveys[0].answer_percent,
                text: surveys[0].answer_text,
              }}
              question={surveys[0].question}
            />
          )}
        </Columns>
        <SectionHeader variant="mobility" />
        <Columns>
          <BicycleChartTile />
          <StadtradelnTile />
          <BusTile />
          {surveys && surveys[1] && (
            <SurveyTile
              answer={{
                percent: surveys[1].answer_percent,
                text: surveys[1].answer_text,
              }}
              question={surveys[1].question}
            />
          )}
        </Columns>
        <Spacer />
        {successStories && successStories[0] && (
          <SuccessStoryTile
            image={directusImage(successStories[0].image)}
            imagePosition={successStories[0].image_position}
            link={successStories[0].link}
            text={successStories[0].text}
          ></SuccessStoryTile>
        )}
        {successStories && successStories[1] && (
          <SuccessStoryTile
            image={directusImage(successStories[1].image)}
            imagePosition={successStories[1].image_position}
            link={successStories[1].link}
            text={successStories[1].text}
          ></SuccessStoryTile>
        )}
      </Container>
    </AnimatedPage>
  )
}
