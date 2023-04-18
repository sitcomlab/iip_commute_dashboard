import ClimateTile from '../ClimateTile'
import WeatherTileContent from './WeatherTileContent'

export default function WeatherTile() {
  return (
    <ClimateTile
      dataSource="DWD"
      embedId={'climate-weather'}
      live
      title={
        <span>
          <span className="font-medium">Wetter</span> aktuell
        </span>
      }
    >
      <WeatherTileContent />
    </ClimateTile>
  )
}
