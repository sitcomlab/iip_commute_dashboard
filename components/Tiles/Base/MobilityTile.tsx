import { Spacer } from '@/components/Elements/Spacer'
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
      footerCenterElement={live ? <LiveBadge variant="mobility" /> : undefined}
      variant="mobility"
      {...props}
    >
      <span className="text-6xl font-light text-green-500">{title}</span>
      <br />
      <span className="text-xl">{subtitle}</span>
      <Spacer />
      <>{children}</>
    </BaseTile>
  )
}
