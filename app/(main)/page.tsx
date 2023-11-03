import Container from '@/components/Layout/Container'

import AnimatedPage from '@/components/Layout/AnimatedPage'

import BaseView from '@/components/Views/BaseView'
import Columns from '@/components/Layout/Columns'
import BusTile from '@/components/Tiles/Mobility/Bus'

export default async function Home() {
  return (
    <div className="-translate-y-52">
      <AnimatedPage>
        <Container>

          <BaseView
            showGoToButton={true}
            showSuccessStories={false}
            showSurveys={false}
            type="mobility"
          >
            <Columns>
              <BusTile />
            </Columns>
          </BaseView>

        </Container>
      </AnimatedPage>
    </div>
  )
}

export const revalidate = 10
