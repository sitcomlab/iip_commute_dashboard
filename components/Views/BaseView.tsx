import { GoToButton } from '../Elements/GoToButton'
import { Spacer } from '../Elements/Spacer'

interface ViewProps {
  type: 'climate' | 'mobility' | 'energy' | 'building'
  children: React.ReactNode | React.ReactNode[]
}

export default function BaseView({ type, children }: ViewProps) {
  return (
    <>
      {/* <SectionHeader variant={type} /> */}
      {children}
      <Spacer size={'sm'} />
      <GoToButton type={type} />
      <Spacer size={'xl'} />
    </>
  )
}
