'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { SeriesOption } from 'echarts'

export default function RadarChart({
  data,
}: {
  data: {
    [x: string]: {
      [key: string]: number
    }
  }
}) {
  const series: SeriesOption = {
    name: 'Climate',
    type: 'radar',
    data: Object.keys(data).map(y => {
      const year = data[y]
      return {
        value: Object.keys(year)
          .map(m => year[m])
          .reverse(),
        name: y,
        areaStyle: {
          color: 'blue',
          opacity: 0.01,
        },
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          opacity: 0,
        },
      }
    }),
  }

  return (
    <ReactECharts
      option={{
        radar: {
          shape: 'circle',

          indicator: [
            { name: 'Jan' },
            { name: 'Feb' },
            { name: 'Mar' },
            { name: 'Apr' },
            { name: 'May' },
            { name: 'Jun' },
            { name: 'Jul' },
            { name: 'Aug' },
            { name: 'Sep' },
            { name: 'Oct' },
            { name: 'Nov' },
            { name: 'Dec' },
          ].reverse(),
        },
        series: series,
      }}
    />
  )
}
