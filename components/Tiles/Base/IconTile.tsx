import { Spacer } from '@/components/Elements/Spacer'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { SVGProps } from 'react'
import { BaseTile } from './BaseTile'
import LiveBadge from './LiveBadge'

const iconTileTitleStyle = cva('text-4xl md:text-6xl font-light', {
  variants: {
    variant: {
      primary: 'text-primary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type DataSourceProps = {
  dataRetrieval?: string
  dataSource: string
}

export type IconTileProps = VariantProps<typeof iconTileTitleStyle> &
  DataSourceProps & {
    children: React.ReactElement | React.ReactElement[]
    title: string | React.ReactElement
    icon: (_props: SVGProps<SVGSVGElement>) => JSX.Element
    subtitle?: string
    live?: boolean
  }

/**
 * A tile that shows mobility information
 * @param MobilityTileProps properties of the mobility tile
 * @returns Mobility Tile
 */
export default function IconTile({
  children,
  live,
  title,
  icon,
  subtitle,
  variant,
  dataRetrieval,
  dataSource,
}: IconTileProps) {
  const Icon = icon

  return (
    <BaseTile
      footerCenterElement={live ? <LiveBadge variant={variant} /> : undefined}
      variant={variant}
    >
      <div
        className={cx('flex justify-between', iconTileTitleStyle({ variant }))}
      >
        <span>{title}</span>
        <Icon className="h-10 w-12" />
      </div>
      <span className="text-lg md:text-xl">{subtitle}</span>
      <Spacer />
      <>{children}</>
      <Spacer />
      <div className="flex space-x-2 text-xs text-primary">
        <span className="font-semibold">
          Datenstand: {dataRetrieval ?? (live ? 'live' : 'undefined')}
        </span>
        <span>Quelle: {dataSource}</span>
      </div>
    </BaseTile>
  )
}
