import { BuildingIcon } from '@/components/Icons'
import { EmbedTileProps } from '../Base/BaseTile'
import IconTile, { DataSourceProps, IconTileProps } from '../Base/IconTile'

export type BuildingTileProps = DataSourceProps &
  EmbedTileProps &
  Pick<IconTileProps, 'children' | 'title' | 'subtitle' | 'live'>

/**
 * A tile that shows building information
 * @param BuildingTileProps properties of the building tile
 * @returns Building Tile
 */
export default function BuildingTile({
  children,
  live,
  title,
  subtitle,
  dataSource,
  dataRetrieval,
  embedId,
}: BuildingTileProps) {
  return (
    <IconTile
      dataRetrieval={dataRetrieval}
      dataSource={dataSource}
      embedId={embedId}
      icon={BuildingIcon}
      live={live}
      subtitle={subtitle}
      title={title}
      variant="building"
    >
      <>{children}</>
    </IconTile>
  )
}
