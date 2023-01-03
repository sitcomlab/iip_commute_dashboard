import { SeriesOption } from 'echarts'
import { ReactECharts } from '../../../../components/Charts/ReactECharts'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../tailwind.config'
import React from 'react'

type ExtremeWeatherChartProps = {
  //   showFuture?: boolean
}

const { theme } = resolveConfig(tailwindConfig)

export default function CO2Chart({}: ExtremeWeatherChartProps) {
  const series: SeriesOption[] = [
    {
      type: 'bar',
      name: 'Verkehr',
      data: [0, 1, 2],
      // @ts-ignore
      color: theme?.colors?.mobility.DEFAULT || '#34c17b',
      //   barStyle: {
      //     width: 3,
      //   },
    },
    // {
    //   type: 'line',
    //   name: 'Industrie',
    //   data: prepareData('Industrie'),
    //   showSymbol: false,
    //   // @ts-ignore
    //   color: theme?.colors?.primary.DEFAULT || '#005b79',
    //   lineStyle: {
    //     width: 3,
    //   },
    // },
    // {
    //   type: 'line',
    //   name: 'Gewerbe und Sonstiges',
    //   data: prepareData('Gewerbe + Sonstiges'),
    //   showSymbol: false,
    //   // @ts-ignore
    //   color: '#f3e500',
    //   lineStyle: {
    //     width: 3,
    //   },
    // },
    // {
    //   type: 'line',
    //   name: 'Private Haushalte',
    //   data: prepareData('Private Haushalte'),
    //   showSymbol: false,
    //   // @ts-ignore
    //   color: theme?.colors?.energy.DEFAULT || '#f28443',
    //   lineStyle: {
    //     width: 3,
    //   },
    // },
  ]

  return (
    <ReactECharts
      option={{
        xAxis: {
          max: 'dataMax',
        },
        yAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
        },
        series: series,
      }}
    />
  )
}
