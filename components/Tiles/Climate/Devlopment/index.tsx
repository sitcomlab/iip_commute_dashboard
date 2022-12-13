import ClimateTile from '../ClimateTile'

//@ts-ignore
import rawClimateData from '@/assets/data/climate_muenster.csv'
import RadarChart from './RadarChart'

type DWDMonthlyClimateMeasurement = {
  STATIONS_ID: number
  MESS_DATUM_BEGINN: number
  MESS_DATUM_ENDE: number
  QN_4: number
  MO_N: number
  MO_TT: number
  MO_TX: number
  MO_TN: number
  MO_FK: number
  MX_TX: number
  MX_FX: number
  MX_TN: number
  MO_SD_S: number
  QN_6: number
  MO_RR: number
  MX_RS: number
  eor: string
}

const climateData = rawClimateData as DWDMonthlyClimateMeasurement[]

const climateTemperature = climateData.map(e => ({
  year: e.MESS_DATUM_BEGINN.toString().substring(0, 4),
  month: e.MESS_DATUM_BEGINN.toString().substring(4, 6),
  value: e.MO_TT,
}))

const climateYears = climateTemperature.reduce(
  (
    a: {
      [key: string]: {
        [key: string]: number
      }
    },
    o,
  ) => ({
    ...a,
    [o.year]: {
      // @ts-ignore
      ...a[o.year],
      [o.month]: o.value,
    },
  }),
  {},
)

export default function ClimateDevelopmentTile() {
  return (
    <ClimateTile dataSource="DWD" live title={'Klima'}>
      <div className="h-96 w-full rounded bg-white">
        <div className="h-full w-full">
          <RadarChart data={climateYears} />
        </div>
      </div>
    </ClimateTile>
  )
}
