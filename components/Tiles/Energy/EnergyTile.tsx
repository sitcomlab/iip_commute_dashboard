import { EnergyIcon } from '@/components/Icons'
import IconTile, { IconTileProps } from '../Base/IconTile'

export type EnergyTileProps = Omit<IconTileProps, 'variant' | 'icon'>

/**
 * A tile that shows Energy information
 * @param EnergyTileProps properties of the Energy tile
 * @returns Energy Tile
 */
export default function EnergyTile({ children, ...props }: EnergyTileProps) {
  return (
    // @ts-expect-error Server Component
    <IconTile {...props} icon={EnergyIcon} variant="energy">
      <>{children}</>
    </IconTile>
  )
}
