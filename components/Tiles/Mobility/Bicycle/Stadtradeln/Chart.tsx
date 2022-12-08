import stadtradelnData from '@/assets/data/stadtradeln.json'
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

type StadtradelnData = {
  [key: string]: {
    name: string
    data: {
      year: number
      km: number
    }[]
  }
}

const colors: {
  [key: keyof StadtradelnData]: {
    color: string
    symbol: string
  }
} = {
  muenster: {
    // @ts-ignore
    color: theme?.colors?.mobility.DEFAULT || '#34c17b',
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconGreen.svg').default.src
    }`,
  },
  konstanz: {
    // @ts-ignore
    color: theme?.colors?.buildings.DEFAULT || '#6060d6',
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconPurple.svg').default.src
    }`,
  },
  mannheim: {
    // @ts-ignore
    color: theme?.colors?.energy.DEFAULT || '#f28443',
    symbol: `image://${
      require('@/assets/icons/Bicycle/BicycleIconOrange.svg').default.src
    }`,
  },
}

type ChartProps = {
  compare: boolean
}

const getSeries = (data: StadtradelnData) => {
  const lineSeries: LineSeriesOption[] = Object.keys(data).map(k => ({
    data: data[k].data.map(({ year, km }) => [year, km]),
    type: 'line',
    areaStyle: {
      color: '#34c17b',
      opacity: 0.08,
    },
    lineStyle: {
      opacity: 0,
    },
    symbol: 'none',
    itemStyle: {},
    smooth: 0.2,
  }))

  const barSeries: BarSeriesOption[] = Object.keys(data).map(k => ({
    data: data[k].data.map(({ year, km }) => [year, km]),
    type: 'bar',
    barWidth: 3,
    zlevel: 10,
    itemStyle: {
      color: colors[k].color,
    },
    barGap: 2,
    xAxisIndex: 1,
    label: {
      formatter: () => 'X',
      position: 'top',
    },
  }))

  const barIcons: PictorialBarSeriesOption[] = Object.keys(data).map(k => ({
    data: data[k].data.map(({ year, km }) => [year, km]),
    type: 'pictorialBar',
    symbol: colors[k].symbol,
    symbolSize: [32, 32],
    symbolOffset: [0, -30],
    symbolRotate: 15,
    barWidth: 3,
    barGap: 2,
    symbolPosition: 'end',
    xAxisIndex: 1,
    zlevel: 20,
  }))

  return [...lineSeries, ...barSeries, ...barIcons]
}

export default function Chart({ compare }: ChartProps) {
  const [data, setData] = useState<StadtradelnData>()
  const [series, setSeries] = useState<SeriesOption[]>()

  useEffect(() => {
    if (compare) {
      setData(stadtradelnData)
    } else {
      setData({ muenster: stadtradelnData.muenster })
    }
  }, [compare])

  useEffect(() => {
    if (!data) {
      return
    }

    setSeries(getSeries(data))
  }, [data])

  if (!data) {
    return <Spinner />
  }

  return (
    <ReactECharts
      option={{
        grid: {
          left: '15%',
          right: '10%',
          top: '10%',
          bottom: '5%',
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
