import ClimateTile from '../ClimateTile'
import LiveTileContent from './LiveTileContent'

export default function WeatherTile() {
  return (
    <ClimateTile
      dataSource="Deutscher Wetterdienst"
      embedId={'climate-weather'}
      live
      title={'Zeit aktuell'}
    >
      <LiveTileContent />
    </ClimateTile>
  )
}
