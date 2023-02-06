import { Spacer } from '@/components/Elements/Spacer'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, SVGProps } from 'react'
import { BaseTile, EmbedTileProps } from './BaseTile'
import LiveBadge from './LiveBadge'

const iconTileTitleStyle = cva('text-4xl md:text-6xl font-light', {
  variants: {
    variant: {
      primary: 'text-primary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
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
  DataSourceProps &
  EmbedTileProps & {
    children: React.ReactElement | React.ReactElement[]
    title?: string | React.ReactElement
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    subtitle?: string
    live?: boolean
  }

/**
 * A tile that has an icon on top right
 * @param IconTileProps properties of the Icon tile
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
  embedId,
}: IconTileProps) {
  const Icon = icon

  return (
    <BaseTile
      embedId={embedId}
      footerCenterElement={live ? <LiveBadge variant={variant} /> : undefined}
      variant={variant}
    >
      <>
        {title && (
          <div
            className={cx(
              'flex justify-between',
              iconTileTitleStyle({ variant }),
            )}
          >
            <span>{title}</span>
            <Icon className="h-10 w-12" />
          </div>
        )}
        {subtitle && <span className="text-lg md:text-xl">{subtitle}</span>}
        {(title || subtitle) && <Spacer />}
      </>
      <>
        {!title && !subtitle && (
          <div className={cx('relative', iconTileTitleStyle({ variant }))}>
            <Icon className=" absolute top-0 right-0 h-10 w-12" />
          </div>
        )}
      </>

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
