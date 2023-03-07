import ClimateTile from '../ClimateTile'
import RadarChart, { AvgTempData } from './RadarChart'
import climateHistoryData from '@/assets/data/climate_history.json'

type ClimateHistoryRecord = {
  observation_type: string
  dwd_station_id: number
  wmo_station_id: any
  timestamp: string
  monthly_temperature: number
  temperature_deviation: number
}

const data = climateHistoryData as ClimateHistoryRecord[]

const climateYears = data.reduce((a: AvgTempData, o) => {
  const year = new Date(o.timestamp).getFullYear()
  const month = new Date(o.timestamp).getMonth()
  return {
    ...a,
    [year]: {
      ...a[year],
      [month]: o.temperature_deviation,
    },
  }
}, {})

export default function ClimateDevelopmentTile() {
  return (
    <ClimateTile dataSource="DWD" embedId="klima" live title={'Klima'}>
      <div className="h-[600px] w-full">
        <div className="h-full w-full">
          <RadarChart data={climateYears} />
        </div>
      </div>
    </ClimateTile>
  )
}
