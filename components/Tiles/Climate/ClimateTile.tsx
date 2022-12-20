import { MuensterIcon } from '@/components/Icons'
import { EmbedTileProps } from '../Base/BaseTile'
import IconTile, { DataSourceProps } from '../Base/IconTile'

export type ClimateTileProps = DataSourceProps &
  EmbedTileProps & {
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
  dataSource,
  dataRetrieval,
  embedId,
}: ClimateTileProps) {
  return (
    <IconTile
      dataRetrieval={dataRetrieval}
      dataSource={dataSource}
      embedId={embedId}
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
