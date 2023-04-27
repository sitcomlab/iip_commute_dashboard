import { ReactECharts } from '@/components/Charts/ReactECharts'
import { BarSeriesOption } from 'echarts'

interface Props {
  data: BarSeriesOption['data']
}

export default function EnergyConsumptionChart({ data }: Props) {
  return (
    <ReactECharts
      option={{
        xAxis: {
          type: 'category',
          data: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            data,
            type: 'bar',
            color: '#837ef4',
            barWidth: '11px',
          },
        ],
      }}
    />
  )
}
