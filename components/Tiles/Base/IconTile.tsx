import { Spacer } from '@/components/Elements/Spacer'
import { cva, VariantProps } from 'class-variance-authority'
import { SVGProps } from 'react'
import { BaseTile } from './BaseTile'
import LiveBadge from './LiveBadge'

const iconTileTitleStyle = cva('text-6xl font-light', {
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

export type IconTileProps = VariantProps<typeof iconTileTitleStyle> & {
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
}: IconTileProps) {
  const Icon = icon

  return (
    <BaseTile
      footerCenterElement={live ? <LiveBadge variant={variant} /> : undefined}
      variant={variant}
    >
      <div className="flex justify-between">
        <span className={iconTileTitleStyle({ variant })}>{title}</span>
        <Icon className="h-10 w-12" />
      </div>
      <br />
      <span className="text-xl">{subtitle}</span>
      <Spacer />
      <>{children}</>
    </BaseTile>
  )
}
