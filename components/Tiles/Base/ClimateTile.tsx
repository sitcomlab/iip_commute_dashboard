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
      <h1 className="text-6xl font-light text-sky-500">{title}</h1>
      <h3 className="text-xl">{subtitle}</h3>
      <Spacer />
      <>{children}</>
    </BaseTile>
  )
}
