import SvgBicycleIcon from '@/components/Icons/BicycleIcon'
import IconTile from '../Base/IconTile'

export type MobilityTileProps = {
  children: React.ReactElement | React.ReactElement[]
  title: string
  subtitle?: string
  live?: boolean
}

/**
 * A tile that shows mobility information
 * @param MobilityTileProps properties of the mobility tile
 * @returns Mobility Tile
 */
export default function MobilityTile({
  children,
  live,
  title,
  subtitle,
}: MobilityTileProps) {
  return (
    <IconTile
      icon={SvgBicycleIcon}
      live={live}
      subtitle={subtitle}
      title={title}
      variant="mobility"
    >
      <>{children}</>
    </IconTile>
  )
}
