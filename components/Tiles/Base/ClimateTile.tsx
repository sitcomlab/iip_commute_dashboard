import { Spacer } from '@/components/Elements/Spacer'
import { BaseTile, BaseTileProps } from './BaseTile'
import LiveBadge from './LiveBadge'

export type ClimateTileProps = {
  children: React.ReactElement | React.ReactElement[]
  title: string | React.ReactElement
  subtitle?: string
  live?: boolean
} & BaseTileProps

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
  ...props
}: ClimateTileProps) {
  return (
    <BaseTile
      footerCenterElement={live ? <LiveBadge variant="climate" /> : undefined}
      variant="climate"
      {...props}
    >
      <span className="text-6xl font-light text-climate">{title}</span>
      <br />
      <span className="text-xl">{subtitle}</span>
      <Spacer />
      <>{children}</>
    </BaseTile>
  )
}
