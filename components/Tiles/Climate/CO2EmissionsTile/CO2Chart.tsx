import useCO2Data from '@/hooks/useCO2Data'
import { parse } from 'date-fns'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import { SeriesOption } from 'echarts'

type CO2ChartProps = {
  showFuture?: boolean
}

export default function CO2Chart({ showFuture = false }: CO2ChartProps) {
  const data = useCO2Data()

  const transformdata = (baseData: any[]) =>
    showFuture
      ? [
          ...baseData,
          [parse('01-01-2030', 'dd-MM-yyyy', new Date()).getTime(), 0],
        ]
      : baseData

  const series: SeriesOption[] = [
    {
      type: 'line',
      name: 'Wärme',
      data: transformdata(
        data.map(e => [
          parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
          e.Wärme,
        ]),
      ),
      showSymbol: false,
    },
    {
      type: 'line',
      name: 'Strom',
      data: transformdata(
        data.map(e => [
          parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
          e.Strom,
        ]),
      ),
      showSymbol: false,
    },
    {
      type: 'line',
      name: 'Verkehr',
      data: transformdata(
        data.map(e => [
          parse(`01-01-${e.Jahr}`, 'dd-MM-yyyy', new Date()).getTime(),
          e.Verkehr,
        ]),
      ),
      showSymbol: false,
    },
  ]

  return (
    <ReactECharts
      option={{
        xAxis: {
          type: 'time',
        },
        yAxis: {
          type: 'value',
        },
        series: series,
        legend: {
          show: true,
        },
      }}
    />
  )
}
