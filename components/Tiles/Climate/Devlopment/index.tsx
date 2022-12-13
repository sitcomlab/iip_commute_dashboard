import ClimateTile from '../ClimateTile'

// https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/monthly/kl/historical/monatswerte_KL_03404_18530101_19911231_hist.zip
// https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/monthly/kl/historical/monatswerte_KL_01766_19891001_20211231_hist.zip
// @ts-ignore
// import climHistory from '@/assets/data/climate/klima_history.csv'

// https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/monthly/kl/recent/monatswerte_KL_01766_akt.zip

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

export default function ClimateDevelopmentTile() {
  //   console.log(climRecent)

  //   const dwdHistoryData = climHistory as DWDMonthlyClimateMeasurement[]

  //   const historyData = dwdHistoryData.map(e => {
  //     const year = e.MESS_DATUM_BEGINN.toString().substring(0, 4)
  //     const month = e.MESS_DATUM_BEGINN.toString().substring(4, 6)
  //     const value = e.MO_TT // Monthly temperature averages in 2m above ground
  //     return { year, month, value }
  //   })

  //   const minYear = Math.min(...historyData.map(e => Number(e.year)))
  //   console.log(minYear)

  return (
    <ClimateTile dataSource="DWD" live title={'Klima'}>
      <p>Hello World</p>
    </ClimateTile>
  )
}
