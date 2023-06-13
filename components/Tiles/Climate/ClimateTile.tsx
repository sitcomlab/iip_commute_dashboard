import { MuensterIcon } from '@/components/Icons'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type ClimateTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows climate information
 * @param ClimateTileProps properties of the climate tile
 * @returns Climate Tile
 */
export default function ClimateTile({ children, ...props }: ClimateTileProps) {
  return (
    <IconTile {...props} icon={MuensterIcon} variant="climate">
      <>{children}</>
    </IconTile>
  )
}
