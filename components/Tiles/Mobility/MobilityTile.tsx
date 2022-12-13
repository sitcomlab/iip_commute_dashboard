import SvgBicycleIcon from '@/components/Icons/BicycleIcon'
import IconTile, { DataSourceProps } from '../Base/IconTile'

export type MobilityTileProps = DataSourceProps & {
  children: React.ReactElement | React.ReactElement[]
  title: string
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
}: MobilityTileProps) {
  return (
    <IconTile
      dataRetrieval={dataRetrieval}
      dataSource={dataSource}
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
