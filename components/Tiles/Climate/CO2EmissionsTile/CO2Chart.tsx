import useCO2Data from '@/hooks/useCO2Data'
import { parse } from 'date-fns'
import { SeriesOption } from 'echarts'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'

type CO2ChartProps = {
  showFuture?: boolean
}

const { theme } = resolveConfig(tailwindConfig)

export default function CO2Chart({ showFuture = false }: CO2ChartProps) {
  const data = useCO2Data()

  const withFuture = (baseData: number[][]) =>
    showFuture
      ? [
          ...baseData,
          [parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime(), 0],
        ]
      : baseData

  const prepareData = (key: keyof typeof data[0]) =>
    withFuture(
      data.map(e => [
        parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
        e[key],
      ]),
    )

  const series: SeriesOption[] = [
    {
      type: 'line',
      name: 'Verkehr',
      data: prepareData('Verkehr'),
      showSymbol: false,
      // @ts-ignore
      color: theme?.colors?.mobility.DEFAULT || '#34c17b',
      lineStyle: {
        width: 3,
      },
    },
    {
      type: 'line',
      name: 'Industrie',
      data: prepareData('Industrie'),
      showSymbol: false,
      // @ts-ignore
      color: theme?.colors?.primary.DEFAULT || '#005b79',
      lineStyle: {
        width: 3,
      },
    },
    {
      type: 'line',
      name: 'Gewerbe und Sonstiges',
      data: prepareData('Gewerbe + Sonstiges'),
      showSymbol: false,
      // @ts-ignore
      color: '#f3e500',
      lineStyle: {
        width: 3,
      },
    },
    {
      type: 'line',
      name: 'Private Haushalte',
      data: prepareData('Private Haushalte'),
      showSymbol: false,
      // @ts-ignore
      color: theme?.colors?.energy.DEFAULT || '#f28443',
      lineStyle: {
        width: 3,
      },
    },
  ]

  return (
    <ReactECharts
      option={{
        xAxis: {
          type: 'time',
          show: true,
        },
        yAxis: {
          type: 'value',
          min: '0',
          axisLabel: {
            formatter: (val: any) => (val / 1000).toFixed(0),
          },
        },
        series: series,
        legend: {
          show: true,
          bottom: 0,
          icon: 'circle',
          textStyle: {
            minMargin: 100,
          },
        },
        textStyle: {
          fontSize: 12,
        },
      }}
    />
  )
}
