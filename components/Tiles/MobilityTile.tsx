import { Spacer } from '../Elements/Spacer'
import { BaseTile, BaseTileProps } from './BaseTile'
import LiveBadge from './LiveBadge'

export type MobilityTileProps = {
  children: React.ReactElement | React.ReactElement[]
  title: string
  subtitle?: string
  live?: boolean
} & BaseTileProps

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
  ...props
}: MobilityTileProps) {
  return (
    <BaseTile
      footerCenterElement={live ? <LiveBadge /> : undefined}
      variant="mobility"
      {...props}
    >
      <h1 className="text-6xl font-light text-green-500">{title}</h1>
      <h3 className="text-xl">{subtitle}</h3>
      <Spacer />
      <>{children}</>
    </BaseTile>
  )
}
