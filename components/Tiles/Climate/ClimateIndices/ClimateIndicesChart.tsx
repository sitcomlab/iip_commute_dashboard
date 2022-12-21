'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import climateIndicesData from '@/assets/data/climate_indices.json'
import { SeriesOption } from 'echarts'
import { parse } from 'date-fns'

type ClimateIndex = {
  dwd_station_id: number
  eistage: number
  frosttage: number
  heisse_tage: number
  observation_type: string
  sommertage: number
  timestamp: string
  tropennaechte: number
}

const SCATTER_SYMBOL_SIZE = 7
const data = climateIndicesData as ClimateIndex[]
const getSeries = (property: keyof ClimateIndex) =>
  data.map(e => [
    parse(e.timestamp, 'yyyy-MM-dd HH:mm:ssXXX', new Date()),
    e[property],
  ])

export default function ClimateIndicesChart() {
  const series: SeriesOption[] = [
    {
      name: 'Eistage',
      type: 'scatter',
      symbolSize: SCATTER_SYMBOL_SIZE,
      data: getSeries('eistage'),
    },
    {
      name: 'Frosttage',
      type: 'scatter',
      symbolSize: SCATTER_SYMBOL_SIZE,
      data: getSeries('frosttage'),
    },
    {
      name: 'Heiße Tage',
      type: 'scatter',
      symbolSize: SCATTER_SYMBOL_SIZE,
      data: getSeries('heisse_tage'),
    },
    {
      name: 'Sommertage',
      type: 'scatter',
      symbolSize: SCATTER_SYMBOL_SIZE,
      data: getSeries('sommertage'),
    },
    {
      name: 'Tropennächte',
      type: 'scatter',
      symbolSize: SCATTER_SYMBOL_SIZE,
      data: getSeries('tropennaechte'),
    },
  ]

  return (
    <ReactECharts
      option={{
        series,
        xAxis: {
          type: 'time',
        },
        yAxis: {
          type: 'value',
          min: 1,
        },
        legend: {
          show: true,
          bottom: 0,
          icon: 'circle',
        },
        textStyle: {
          fontSize: 12,
        },
      }}
      renderer="canvas"
    />
  )
}
