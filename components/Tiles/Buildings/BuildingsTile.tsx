import { BuildingIcon } from '@/components/Icons'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type BuildingTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows building information
 * @param BuildingTileProps properties of the building tile
 * @returns Building Tile
 */
export default function BuildingTile({
  children,
  ...props
}: BuildingTileProps) {
  return (
    // @ts-expect-error Server Component
    <IconTile {...props} icon={BuildingIcon} variant="building">
      <>{children}</>
    </IconTile>
  )
}
