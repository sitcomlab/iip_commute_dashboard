import useCO2Data from '@/hooks/useCO2Data'
import { parse } from 'date-fns'
import { SeriesOption } from 'echarts'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
import Title from '@/components/Elements/Title'
import { Spacer } from '@/components/Elements/Spacer'
import useDevice from '@/hooks/useDevice'
import { linearRegression } from 'simple-statistics'
import { useWindowSize } from 'react-use'

type CO2ChartProps = {
  showFuture?: boolean
  mode: 'co2' | 'endenergie'
}

const { theme } = resolveConfig(tailwindConfig)

export default function CO2Chart({ showFuture = false, mode }: CO2ChartProps) {
  const data = useCO2Data(mode)
  const device = useDevice()
  const { width } = useWindowSize()

  /**
   * Adds the future data to the data
   * @param baseData The base data
   * @returns The data with the future data
   */
  const withFuture = (baseData: number[][]) => {
    const { m, b } = linearRegression(baseData)
    const x = parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime()

    const y = showFuture ? m * x + b : 0
    return [
      ...baseData,
      [parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime(), y],
    ]
  }

  /**
   * Prepares the data for the chart
   * @param key The key to prepare
   * @returns The prepared data
   */
  const prepareData = (key: keyof (typeof data)[0]) => {
    if (mode === 'endenergie') {
      return data.map(e => [
        parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
        e[key],
      ])
    }

    return withFuture(
      data.map(e => [
        parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
        e[key],
      ]),
    )
  }

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
    <div className="flex h-full w-full flex-col">
      <div className="flex-1">
        <ReactECharts
          option={{
            grid: {
              top: 24,
              right: 0,
              bottom: 48,
              left: ['mobile', 'tablet'].includes(device) ? 40 : 80,
            },
            xAxis: {
              type: 'time',
              show: true,
              max: parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime(),
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: (val: any) => {
                  if (val === 0) {
                    return ''
                  }
                  return new Intl.NumberFormat('de-DE', {
                    maximumFractionDigits: 0,
                  }).format(val / (mode === 'co2' ? 1000 : 1))
                },
              },
            },
            series: series,
            legend: {
              show: false,
            },
          }}
          renderer="svg"
          style={{
            height: width < 1024 ? '200px' : '100%',
          }}
        />
      </div>
      <Spacer />
      <div className="flex flex-wrap items-center gap-4 md:ml-[80px]">
        {series.map((s, i) => (
          <div className="flex min-w-[8rem] items-center gap-2" key={i}>
            <div
              className="h-1 w-8 rounded-full"
              style={{ backgroundColor: s.color as string }}
            ></div>
            <Title as="h5" variant={'primary'}>
              {s.name}
            </Title>
          </div>
        ))}
      </div>
    </div>
  )
}
