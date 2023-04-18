import 'server-only'

import { Spacer } from '@/components/Elements/Spacer'
import Title from '@/components/Elements/Title'
import { cva, cx, VariantProps } from 'class-variance-authority'
import { ForwardRefExoticComponent, SVGProps } from 'react'
import { BaseTile, EmbedTileProps } from './BaseTile'
import LiveBadge from './LiveBadge'
import directus, { tileCollectionName } from '@/lib/directus'

const iconTileTitleStyle = cva('', {
  variants: {
    variant: {
      primary: 'text-primary',
      mobility: 'text-mobility',
      successStory: 'text-primary',
      climate: 'text-climate',
      building: 'text-buildings',
      energy: 'text-energy',
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
    subtitle?: string | React.ReactElement
    icon:
      | ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
      | ((_props: SVGProps<SVGSVGElement>) => JSX.Element)
    live?: boolean
  }

async function getTileData(id: string) {
  const { data } = await directus.items(tileCollectionName).readByQuery({
    filter: {
      tile_id: id,
    },
  })

  return data?.[0]
}

/**
 * A tile that has an icon on top right
 * @param IconTileProps properties of the Icon tile
 * @returns Mobility Tile
 */
export default async function IconTile({
  children,
  live,
  title,
  subtitle,
  icon,
  variant,
  dataRetrieval,
  dataSource,
  embedId,
}: IconTileProps) {
  const Icon = icon

  const data = await getTileData(embedId!)

  return (
    <BaseTile
      embedId={embedId}
      footerCenterElement={live ? <LiveBadge variant={variant} /> : undefined}
      moreInfo={data?.details}
      source={data?.data_url}
      variant={variant}
    >
      <>
        {title && (
          <div className={'flex justify-between'}>
            <div className="flex flex-wrap items-center justify-start gap-x-4">
              <Title
                as={'h1'}
                className={cx('min-w-max', iconTileTitleStyle({ variant }))}
              >
                {title}
              </Title>
              {subtitle && (
                <Title
                  as={'subtitle'}
                  className="2xl:max-w-[50%]"
                  color={'dark'}
                >
                  {subtitle}
                </Title>
              )}
            </div>
            <Icon
              className={cx(
                'h-[50px] w-auto flex-shrink-0 opacity-40',
                iconTileTitleStyle({ variant }),
              )}
            />
          </div>
        )}
        {(title || subtitle) && <Spacer />}
      </>
      <>
        {!title && !subtitle && (
          <div className={cx('relative', iconTileTitleStyle({ variant }))}>
            <Icon className=" absolute right-0 top-0 h-[50px] w-auto opacity-40" />
          </div>
        )}
      </>

      <>{children}</>
      <Spacer />
      <div className="flex space-x-2 text-xs text-primary">
        <Title as="h7" className="font-semibold">
          Datenstand: {dataRetrieval ?? (live ? 'live' : 'undefined')}
        </Title>
        <Title as="h7">Quelle: {dataSource}</Title>
      </div>
    </BaseTile>
  )
}
