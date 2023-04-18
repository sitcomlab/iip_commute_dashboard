import { BicycleIcon } from '@/components/Icons'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type MobilityTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows Mobility information
 * @param MobilityTileProps properties of the mobility tile
 * @returns Mobility Tile
 */
export default function MobilityTile({
  children,
  ...props
}: MobilityTileProps) {
  return (
    // @ts-expect-error Server Component
    <IconTile {...props} icon={BicycleIcon} variant="mobility">
      <>{children}</>
    </IconTile>
  )
}
