import { Button } from '../Elements/Button'
import { Spacer } from '../Elements/Spacer'
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
      <h1 className="text-lg font-semibold text-primary">Erfolgsgeschichte</h1>
      <Spacer />
      <>{children}</>
    </BaseTile>
  )
}
