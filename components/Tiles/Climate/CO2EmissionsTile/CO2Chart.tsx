import useCO2Data from '@/hooks/useCO2Data'
import { parse } from 'date-fns'
import { SeriesOption } from 'echarts'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
import Title from '@/components/Elements/Title'
import { Spacer } from '@/components/Elements/Spacer'
import useDevice from '@/hooks/useDevice'

type CO2ChartProps = {
  showFuture?: boolean
}

const { theme } = resolveConfig(tailwindConfig)

export default function CO2Chart({ showFuture = false }: CO2ChartProps) {
  const data = useCO2Data()
  const device = useDevice()

  const withFuture = (baseData: number[][]) =>
    showFuture
      ? [
          ...baseData,
          [parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime(), 0],
        ]
      : baseData

  const prepareData = (key: keyof (typeof data)[0]) =>
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
    <div className="flex h-full w-full flex-col">
      <div className="flex-1">
        <ReactECharts
          option={{
            grid: {
              top: 24,
              right: 0,
              bottom: 48,
              left: 80,
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
                  }).format(val / 1000)
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
            height: ['tablet', 'mobile'].includes(device) ? '200px' : '100%',
          }}
        />
      </div>
      <Spacer />
      <div className="ml-[80px] flex flex-wrap items-center gap-4">
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
