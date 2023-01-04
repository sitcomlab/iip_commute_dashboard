import SvgBicycleIcon from '@/components/Icons/BicycleIcon'
import { EmbedTileProps } from '../Base/BaseTile'
import IconTile, { DataSourceProps } from '../Base/IconTile'

export type MobilityTileProps = DataSourceProps &
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
export default function MobilityTile({
  children,
  live,
  title,
  subtitle,
  dataSource,
  dataRetrieval,
  embedId,
}: MobilityTileProps) {
  return (
    <IconTile
      dataRetrieval={dataRetrieval}
      dataSource={dataSource}
      embedId={embedId}
      icon={SvgBicycleIcon}
      live={live}
      subtitle={subtitle}
      title={title}
      variant="mobility"
    >
      <>{children}</>
    </IconTile>
  )
}
