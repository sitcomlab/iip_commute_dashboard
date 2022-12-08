import { MuensterIcon } from '@/components/Icons'
import IconTile from '../Base/IconTile'

export type ClimateTileProps = {
  children: React.ReactElement | React.ReactElement[]
  title: string | React.ReactElement
  subtitle?: string
  live?: boolean
}

/**
 * A tile that shows mobility information
 * @param MobilityTileProps properties of the mobility tile
 * @returns Mobility Tile
 */
export default function ClimateTile({
  children,
  live,
  title,
  subtitle,
}: ClimateTileProps) {
  return (
    <IconTile
      icon={MuensterIcon}
      live={live}
      subtitle={subtitle}
      title={title}
      variant="climate"
    >
      <>{children}</>
    </IconTile>
  )
}
