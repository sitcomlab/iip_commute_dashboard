import { ReactECharts } from '@/components/Charts/ReactECharts'
import { Spinner } from '@/components/Elements/Spinner'
import {
  BarSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  SeriesOption,
} from 'echarts'
import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config.js'

const { theme } = resolveConfig(tailwindConfig)

const colors = {
  muenster: {
    // @ts-ignore
    color: theme?.colors?.mobility.DEFAULT || '#34c17b',
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconGreen.svg').default.src
    }`,
  },
  other: {
    // @ts-ignore
    color: theme?.colors?.buildings.DEFAULT || '#6060d6',
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconPurple.svg').default.src
    }`,
  },
}

type StadtradelnData = {
  name: string
  data: {
    year: number
    km: number
  }[]
}

type ChartProps = {
  compare: boolean
  data: StadtradelnData
  other?: StadtradelnData
}

const getSeries = (data: StadtradelnData, color: string, symbol: string) => {
  const lineSeries: LineSeriesOption = {
    data: data.data.map(({ year, km }) => [year, km]),
    type: 'line',
    lineStyle: {
      opacity: 0,
    },
    symbol: 'none',
    itemStyle: {},
    smooth: 0.2,
  }

  const barSeries: BarSeriesOption = {
    data: data.data.map(({ year, km }) => [year, km]),
    type: 'bar',
    barWidth: 3,
    zlevel: 10,
    itemStyle: {
      color: color,
      borderRadius: [2, 2, 0, 0],
    },
    barGap: 2,
    xAxisIndex: 1,
    label: {
      formatter: () => 'X',
      position: 'top',
    },
  }

  const barIcons: PictorialBarSeriesOption = {
    data: data.data.map(({ year, km }) => [year, km]),
    type: 'pictorialBar',
    symbol: symbol,
    symbolSize: [61, 61],
    symbolOffset: [0, -60],
    symbolRotate: 15,
    barWidth: 3,
    barGap: 2,
    symbolPosition: 'end',
    xAxisIndex: 1,
    zlevel: 20,
  }

  return [lineSeries, barSeries, barIcons]
}

export default function Chart({ data, other }: ChartProps) {
  const [series, setSeries] = useState<SeriesOption[]>()

  useEffect(() => {
    if (!data) {
      return
    }

    setSeries(getSeries(data, colors.muenster.color, colors.muenster.symbol))
  }, [data])

  useEffect(() => {
    if (!other) {
      setSeries(getSeries(data, colors.muenster.color, colors.muenster.symbol))
      return
    }

    setSeries([
      ...getSeries(data, colors.muenster.color, colors.muenster.symbol),
      ...getSeries(other, colors.other.color, colors.other.symbol),
    ])
  }, [other])

  if (!data) {
    return <Spinner />
  }

  return (
    <ReactECharts
      option={{
        grid: {
          left: '20%',
          right: '10%',
          top: '20%',
          bottom: '10%',
        },
        xAxis: [
          {
            // hidden xaxis for lines
            type: 'category',
            axisTick: undefined,
            boundaryGap: false,
            position: 'bottom',
            show: false,
          },
          {
            // xaxis for bars
            type: 'category',
            axisTick: undefined,
            position: 'bottom',
            name: 'Jahr',
          },
        ],
        yAxis: {
          type: 'value',
          interval: 250000,
          name: 'km',
          max: 2000000,
          axisLabel: {
            formatter: (value: number) =>
              value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
          },
        },
        series,
      }}
      settings={{
        notMerge: true,
      }}
    />
  )
}
