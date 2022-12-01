import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { BaseTile, ImageProps } from './BaseTile'

export type SuccessStoryTileProps = {
  children: React.ReactElement | React.ReactElement[]
} & ImageProps

/**
 * A tile that represents a success story
 * @param SuccessStoryTileProps properties of the success story tile
 * @returns SuccessStoryTileProps
 */
export default function SuccessStoryTile({
  children,
  ...props
}: SuccessStoryTileProps) {
  return (
    <BaseTile
      footerCenterElement={<Button>Weitere Informationen</Button>}
      variant="successStory"
      {...props}
    >
      <Title variant="inverse">Erfolgsgeschichte</Title>
      <Spacer />
      <>{children}</>
    </BaseTile>
  )
}
