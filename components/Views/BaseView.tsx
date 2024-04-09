import { GoToButton } from '../Elements/GoToButton'
import { Spacer } from '../Elements/Spacer'
import SectionHeader from '../Layout/SectionHeader'
//import Columns from '../Layout/Columns'

interface ViewProps {
  type: 'mobility' | 'münster' | 'osnabrück' | 'lübeck'
  children: React.ReactNode | React.ReactNode[]
  showSuccessStories?: boolean
  showSurveys?: boolean
  showGoToButton?: boolean
}

// TODO: read from directus
const categoryID = {
  mobility: '4fa0c731-13d7-4ce9-8407-91a8a71da1cb',
}

export default async function BaseView({
  type,
  children,
  showGoToButton = false,
}: ViewProps) {
  return (
    <>
      <SectionHeader variant={type} />
      {children}

      {showGoToButton && (
        <>
          <Spacer size={'sm'} />
          <GoToButton type={type} />
        </>
      )}
      <Spacer size={'xl'} />
    </>
  )
}
