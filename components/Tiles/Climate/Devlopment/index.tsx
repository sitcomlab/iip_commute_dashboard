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

// use these to calculate monthly averages

// const before1900Data = climateTemperature.filter(e => Number(e.year) < 1900)

// const monthAvg = new Array(12)
//   .fill(1)
//   .map((e, i) => i + 1)
//   .reduce(
//     (a: any, e) => ({
//       ...a,
//       [Number(e)]:
//         before1900Data
//           .filter(d => Number(d.month) === e)
//           .reduce((sum, mv) => sum + mv.value, 0) /
//         before1900Data.filter(d => Number(d.month) === e).length,
//     }),
//     {},
//   )

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
      [Number(o.month)]: o.value,
    },
  }),
  {},
)

export default function ClimateDevelopmentTile() {
  return (
    <ClimateTile dataSource="DWD" live title={'Klima'}>
      <div className="h-96 w-full">
        <div className="h-full w-full">
          <RadarChart data={climateYears} />
        </div>
      </div>
    </ClimateTile>
  )
}
